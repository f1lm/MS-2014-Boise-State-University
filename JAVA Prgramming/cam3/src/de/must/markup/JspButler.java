/*
 * Copyright (c) 2001-2003 Christoph Mueller. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * THIS SOFTWARE IS PROVIDED BY CHRISTOPH MUELLER ``AS IS'' AND ANY
 * EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CHRISTOPH MUELLER OR
 * HIS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 */

package de.must.markup;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;

import de.must.io.Logger;

import java.io.IOException;
import java.util.Enumeration;

/**
 * Butler for JavaServerPages. Try to put as much as you can outside the JSP
 * and into a butler class. In simple cases, you don't need more.
 * Anyhow, it's good to use butler classes via JspSession classes.
 * Why is it called butler? Just bean may be everything! This butler bean is
 * a kind of server of the JSP which makes its live easy - just like a butler
 * of a real person.
 * @see JspSessionStd
 * @author Christoph Mueller
 */
public abstract class JspButler {

  public static final boolean verbose = false;
  
  /** @see TabButtonGroup#fetchYourValueFromRequest */
  public static final String HIDDEN_PANEL_FIELD = "<input type=\"hidden\" name=" + "\"panel\" value=\"default\">";

  /**
   * An object that provides to represent a button with go back functionality.
   * This is not the same thing as history back function. Instead the button
   * supports to go back to the page that called the current page the first time.
   * Use it like that:
   * <pre></code>
   * <%=butler.backButton%>
   * <code></pre>
   */
  public BackButton backButton;

  protected SessionData sessionData;
  private boolean closeWindowIfNoPreviousURIisAvailable;
  private boolean windowIsToClose;
  private boolean invalidated;
  private long lastUse;
  private boolean firstHandleAfterInit;
  private int lastDialogNbrOfThisButler;
  private int windowNbr = 0;
  private int comeInDialogNbr;
  private String thisURI;
  private String previousURI;
  private boolean toRun;
  private HttpServletResponse currentlyHandledResponse;
  private boolean firstJspAccessAfterForeignPreparation;
  private String informationToBeShownModal;
  private String uriToGo;
  private boolean userChanges;
  private String fieldNameToReceiveFocus; 

  /**
   * Constructs a new JSP butler with the session's public data as specified.
   * @param sessionData the session's public data
   */
  public JspButler(SessionData sessionData) {
    this.sessionData = sessionData;
    backButton = new BackButton(sessionData);
    lastUse = System.currentTimeMillis();
  }

  /**
   * Returns the closeWindowIfNoPreviousURIisAvailable.
   * @return boolean
   */
  public boolean isCloseWindowIfNoPreviousURIisAvailable() {
    return closeWindowIfNoPreviousURIisAvailable;
  }

  /**
   * Sets the closeWindowIfNoPreviousURIisAvailable.
   * @param closeWindowIfNoPreviousURIisAvailable The closeWindowIfNoPreviousURIisAvailable to set
   */
  public void setCloseWindowIfNoPreviousURIisAvailable(boolean closeWindowIfNoPreviousURIisAvailable) {
    this.closeWindowIfNoPreviousURIisAvailable =
      closeWindowIfNoPreviousURIisAvailable;
  }

  /**
   * Returns the window number
   * @return the window number
   */
  public int getWindowNbr() {
    return windowNbr;
  }

  /**
   * Sets the windowNbr.
   * @param windowNbr The windowNbr to set
   */
  public void setWindowNbr(int windowNbr) {
    this.windowNbr = windowNbr;
  }

  /**
   * Indicates that the butler has been prepared from outside, e.g. by another 
   * butler. Avoids the handle method to be called.
   * Useful e.g. for continued load from a calling butler.
   * Sample: if the calling butler did already cause the called butler to refresh
   * all objects, there's no need to do it again. Also, there are no values to 
   * be fetched from the request.
   */
  public void setForeignPreparationFlag() {
    firstJspAccessAfterForeignPreparation = true;
  }

  /**
   * Called by SessionStd if the previous butler class was different.
   * @see JspSessionStd#getButler
   */
  public void init() {
    // de.must.io.Logger.getInstance().info(getClass(), "Initializing " + this.getClass().getName());
    firstHandleAfterInit = true;
  }

  /**
   * To be called by the JSP before any output was created. It's recommended
   * to do it via include afterbf.inc, which means after butler fetch.
   * <pre><code>
   * <% if (butler.handlingCausesReturn(request, response)) return;%>
   * </code></pre>
   * @return true if there is no need to build the page - e.g. because a
   * redirect was caused.
   */
  public boolean handlingCausesReturn(HttpServletRequest request,
                     HttpServletResponse response)
    throws IOException, ServletException {
    de.must.io.Logger.getInstance().debug(getClass(), "handle request with parameters: ");
    if (verbose) {
      showParameters(request);
    }
    lastUse = System.currentTimeMillis();
    fieldNameToReceiveFocus = null;
    if (sessionData.loginJspName != null && sessionData.loggedInUser == null && request.getServletPath().indexOf(sessionData.loginJspName) == -1) {
      sessionData.afterLoginJspName = request.getContextPath() + request.getServletPath() + getParameterTail(request);
      response.sendRedirect(response.encodeRedirectURL(appendWindowNbr(sessionData.loginJspName)));
      return true;
    }
    if(firstJspAccessAfterForeignPreparation) { 
      // the butler has already been prepared, e.g. by a previous butler,
      // no further preparation is to be done. Just let the JSP access the 
      // already prepared objects.
      de.must.io.Logger.getInstance().debug(getClass(), "foreign preparation case");
      firstJspAccessAfterForeignPreparation = false;
      setMessageToKeep(null); // initialize message buffer, we don't want to redisplay old messages.
      increaseDialogNbrInSessionData();
      return false; // no preparation by the butler necessary and the butler should not try to interpret input cause there is no input available
    }
    GeneralizedRequest generalizedRequest = new GeneralizedRequest(request);
    sessionData.request = generalizedRequest; // not really necessary, because application developers have full access to the request in the butler. Anyway, this allows access to the request in the same way as a pure servlet application developer is used to. 
    String comeInDialogNbrParameter = generalizedRequest.getParameter("dialognbr"); 
		if (comeInDialogNbrParameter != null) {
			comeInDialogNbr = Integer.parseInt(comeInDialogNbrParameter);
			de.must.io.Logger.getInstance().debug(getClass(), "incomming dialog nbr " + comeInDialogNbr + " as prepared?: " + isExactDialogSequence());
		} else {
			comeInDialogNbr = -1;
			de.must.io.Logger.getInstance().debug(getClass(), "Dialog sequence may not be checked - missing hidden field dialognbr"); // sample case: return from sub page  
		}
    currentlyHandledResponse = response;
    if (firstHandleAfterInit) {
      thisURI = sessionData.getCurrentURI(windowNbr);
      previousURI = sessionData.getPreviousURI(windowNbr);
      backButton.setVisible(previousURI != null);
    }
    firstHandleAfterInit = false;
    backButton.fetchYourValueFromRequest(generalizedRequest);
    if (backButton.wasPressed()) {
      sessionData.lastRedirectingButler = this;
      response.sendRedirect(response.encodeRedirectURL(appendWindowNbr(previousURI)));
      return true;
    }
    informationToBeShownModal = null;
    setToRun(true);
    uriToGo = null;
    handle(generalizedRequest);
    if (uriToGo != null) {
      sessionData.lastRedirectingButler = this;
      response.sendRedirect(response.encodeRedirectURL(appendWindowNbr(uriToGo)));
      return true;
    }
		increaseDialogNbrInSessionData();
    return false;
    }
  
  private String getParameterTail(HttpServletRequest request) {
    StringBuffer tail = new StringBuffer();
    Enumeration<String> parmEnum = request.getParameterNames();
    while (parmEnum.hasMoreElements()) {
			String parmName = parmEnum.nextElement();
			if (tail.length() == 0) tail.append('?'); 
      else tail.append('&');
      tail.append(parmName + "=" + request.getParameter(parmName));
		}
    return tail.toString();
  }
  
  private String appendWindowNbr(String uriToGoTo) {
    // if the window number isn't set, window separating isn't ordered
    if (windowNbr > 0) {
      char separator;
      if (uriToGoTo.indexOf('?') != -1) {
        separator = '&';
      } else {
        separator = '?';
      }
      return uriToGoTo + separator + "windownbr=" + windowNbr;
    } else {
      return uriToGoTo;
    }
  }
  
  private void showParameters(HttpServletRequest request) {
    Enumeration<String> e = request.getParameterNames();
    while (e.hasMoreElements()) {
      String name = e.nextElement();
      String value = request.getParameter(name);
      Logger.getInstance().info(getClass(), name + " = " + value);
    }
  }

	/**
	 * Increases the dialog number in session data.
   * Called to separate dialog steps. Thus, it may be verified whether the
   * incoming data belong to the butler's HTML output.
	 * @see #isExactDialogSequence
	 */
	protected void increaseDialogNbrInSessionData() {
		sessionData.dialogNbr++;
		lastDialogNbrOfThisButler = sessionData.dialogNbr;
	}

  /**
   * Returns an array of chummy butlers - used to exclude them from reducing 
   * butler cache. E.g. you may declare these butlers as friends: 
   * - the sequence of all butlers in stack calling you
   * - all butlers you are calling to avoid unwanted initialization
   * @return an array of chummy butlers
   */
  protected Class<?>[] getButlerFriends() {
    return null;
  }

  /**
   * React on user input and prepare objects to be visualized in the JSP via 
   * this method. E.g you may ask an OK button, if it's pressed. Or you may load
   * data into a group of storables.
   * @param request the request to be handled
   */
  protected abstract void handle(GeneralizedRequest request);
  
  /**
	 * Returns the nbr of the session's current dialog sequence. This nbr may be
	 * stored in a hidden field named "dialognbr" to verify whether the incoming
	 * request parameters belong to the butler or not.
	 * @return the nbr of the session's current dialog sequence
	 * @see #isExactDialogSequence
	 */
	public int getDialogNbr() {
  	return sessionData.dialogNbr;
  }

  /**
	 * Returns true if the request comes from exactly the last preparation of this 
	 * butler. Tastes like "do you feel responsible to deal incoming data?".
	 * Needs a hidden field in JSP as follows:
	 * <pre><code>
	 * <input type="hidden" name="dialognbr" value="<%= butler.getDialogNbr() %>">
	 * </code></pre>
	 * @return true if the request comes from exactly the last preparation of this 
	 * butler
	 */
	protected boolean isExactDialogSequence() {
  	return comeInDialogNbr == lastDialogNbrOfThisButler;
  }

  /**
   * Set's the toRun flag. This is an opportunity to exit loops if the
   * JSP response isn't needed any more.
   * @param newToRun whether the butler's activitiy is to continue or not.
   */
  public void setToRun(boolean newToRun) {
    toRun = newToRun;
  }

  /**
   * Returns the toRun flag. This is an opportunity to exit loops if the
   * JSP response isn't needed any more.
   * @return toRun whether the butler's activitiy is to continue or not.
   */
  public boolean isToRun() {
    return toRun;
  }

  /**
   * Set's the URI to go next.
   * @param newUriToGo the URI to go next.
   */
  protected void setUriToGo(String newUriToGo) {
    uriToGo = newUriToGo;
  }

  public boolean isPreviousURIAvailable() {
    return previousURI != null;
  }

  /**
   * Causes the butler to return to the previous page.
   * This is not idententical with the previous page in document history!
   * It's the page which called the current page for the first time.
   * Sample: If you have been searching for records, you found more than one
   * matching records, you might view details repeatedly. Neverthless, the
   * list's back button will lead you to the serach criteria input page.
   */
  protected void goBack() {
    if (previousURI != null) {
      sessionData.lastRedirectingButler = this;
      setUriToGo(previousURI); return;
    } else {
      if (closeWindowIfNoPreviousURIisAvailable) {
        windowIsToClose = true;
        invalidate();
      } else {
        de.must.io.Logger.getInstance().info(getClass(), "Couldn't cancel - previousURI not available");
      }
    }
  }

  /**
   * Returns the URI of the current served page.
   * @return the URI of the current served page
   */
  public String getURI() {
    return thisURI;
  }

  /**
   * Returns the URI of the previous served page.
   * @return the URI of the previous served page
   */
  public String getPreviousURI() {
    return previousURI;
  }

  /**
   * Encodes the specified URL for use in the sendRedirect method or, if
   * encoding is not needed, returns the URL unchanged. The implementation of
   * this method includes the logic to determine whether the session ID needs
   * to be encoded in the URL. Because the rules for making this determination
   * can differ from those used to decide whether to encode a normal link,
   * this method is separate from the encodeURL method.
   * @param the url to be encoded
   * @return the encoded URL if encoding is needed; the unchanged URL otherwise
   */
  public java.lang.String encodeRedirectURL(java.lang.String url) {
    return currentlyHandledResponse.encodeRedirectURL(url);
  }

  /**
   * Informs the user about an exception.
   * @param exc exception the user should be informed about
   */
  protected void informUserAbout(Exception exc) {
  	String message = exc.getMessage();
  	if (message == null) message = "An exception without message occurred.";
    setMessageToKeep(message);
  }
  
  /**
   * Sets the focus on the input field - needs client JavaScript to set the focus.
   * Sample:
   * <pre><code>
function shallIsetFocus() {
<% if (butler.getFieldNameToReceiveFocus() != null) { %>
 for (var i = 0; i < window.document.forms[0].elements.length; i++) {
  var e = window.document.forms[0].elements[i];
  if (e.name == "<%=butler.getFieldNameToReceiveFocus()%>") {
   e.focus();
   break;
  }
 }
<% } %>
}
...
<body onload="shallIsetFocus()">
   * </code></pre>
   * @param field Sets the focus on the input field
   * @see #getFieldNameToReceiveFocus()
   */
  protected void setFocusOn(MustInputField field) {
    fieldNameToReceiveFocus = field.getName();
  }
  
  /**
   * Returns the name of the field to receive the focus.
   * @return the name of the field to receive the focus
   */
  public String getFieldNameToReceiveFocus() {
    return fieldNameToReceiveFocus;
  }

  /**
   * Sets the message to be read by the user.
   * @param messageToKeep the message for the user
   */
  protected void setMessageToKeep(String message) {
    this.informationToBeShownModal = message;
  }

  /**
   * Returns the JavaScript to be executed.
   * @return the JavaScript to be executed
   */
  public String getScriptToExecute() {
    StringBuffer script = new StringBuffer();
    script.append("<script LANGUAGE=\"JavaScript\">\n<!--\n");
    if (informationToBeShownModal != null) {
      script.append("function showModal() {\n");
      script.append( "  alert(\"" + getAlertableString(informationToBeShownModal) + "\");\n");
      script.append("}\n");
      script.append("setTimeout(\"showModal()\", 1);\n");
    }
    if (windowIsToClose) {
      script.append("window.close()\n");
    }
    script.append("//-->\n</script>");
    return script.toString();
  }

  /**
   * Raturns a string which may be used in a JavaScript alert function.
   * @param stringToBeAlerted the string to be alerted
   * @return a string which may be used in a JavaScript alert function
   */
  public String getAlertableString(String stringToBeAlerted) {
    char[] charArray = stringToBeAlerted.toCharArray();
    StringBuffer alertableString = new StringBuffer();
    for (int i = 0; i < charArray.length; i++) {
      if (charArray[i] == '"') alertableString.append("'");
      else if (charArray[i] == '\n') alertableString.append(" - ");
      else alertableString.append(charArray[i]);
    }
    return alertableString.toString();
  }

  /**
   * Sets the flag indicating that user changed something since last OK or Cancel.
   * @param whether or not user changed something since last OK or Cancel.
   */
  public void setUserChangesSinceLastOkOrCancel(boolean userChanges) {
  	this.userChanges = userChanges;
  }

  /**
   * Returns true if user changed something since last OK or Cancel.
   * @return true if user changed something since last OK or Cancel
   */
  public boolean didUserChangeSomethingSinceLastOkOrCancel() {
  	return userChanges;
  }
  
	/**
   * Returns the last usage of the butler as current time in millis;
	 * @return the last usage of the butler as current time in millis
	 */
	public long getLastUse() {
		return lastUse;
	}
  
  /**
	 * Invalidates the butler to remove it from cache. Since multiple windows per
   * session may be provided by separate butlers, database cursors may be opened
   * numerously. To avoid cursor exception, override this method and call free()
   * for each used data object. Although the garbage collector does this job too,
   * it may be not determistic enough.
	 */
	protected void invalidate() {
    invalidated = true;
  }

	/**
   * Return true if the butler has been invalidated. Used to remove it from cache.
	 * @return rue if the butler has been invalidated
	 */
	public boolean isInvalidated() {
		return invalidated;
	}

}
