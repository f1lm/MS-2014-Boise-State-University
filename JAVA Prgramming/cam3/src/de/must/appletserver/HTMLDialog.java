/*
 * Copyright (c) 2012 Christoph Mueller. All rights reserved.
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

package de.must.appletserver;

import java.util.Vector;

/**
 * A dialog for stuff that cannot be done by an unsigned applet,
 * e.g. file upload.
 * @author Christoph Mueller
 */
public abstract class HTMLDialog {
  
  public static final String NAME_FOR_OK_ACTION = "ok";
  public static final String NAME_FOR_CANCEL_ACTION = "cancel";

  protected SessionData sessionData;
  private String title;
  protected boolean buildDone;
  private Vector<String> errorMessages = new Vector<String>();
  protected boolean okButtonPressed;
  protected boolean cancelButtonPressed;

  /**
   * Constructs a new dialog.
   * @param sessionData the session's public data
   */
  public HTMLDialog(SessionData sessionData) {
    this.sessionData = sessionData;
    sessionData.openHTMLDialogs.put(getDialogId(), this);
    sessionData.newHTMLDialog = getDialogId();
  }
  
  protected String getDialogId() {
    return getClass().getSimpleName();
  }
  
  /**
   * Sets the dialogs's title.
   * @param newTitle the title of the dialog
   */
  public void setTitle(String newTitle) {
    this.title = newTitle;
  }

  /**
   * Returns the dialogs's title.
   * @return the dialogs's title.
   */
  public String getTitle() {
    return title;
  }

  public void buildRemoteView(ToAppletWriter out) {
    if (!buildDone) {
      writeInitialRemoteView(out);
      buildDone = true;
    } else if (okButtonPressed) {
      if (errorMessages.size() > 0) {
        writeHeader(out);
        for (String message : errorMessages) {
          out.println(message + "<br />\n");
        }
        out.println("<br />\n");
        out.println("<a href=\"javascript:history.go(-1)\">");
        out.println("<font size=+1><b>");
        out.println(sessionData.getFrameworkResourceString("TEXT_RETURN_TO_CORRECT"));
        out.println("</b></font><p>");
        out.println("</a>");
        writeFooter(out);
      } else {
        sessionData.openHTMLDialogs.remove(getDialogId());
        writeHeader(out);
        out.println(getCloseScript());
        out.println("<font size=+1><b>");
        out.println(sessionData.getFrameworkResourceString("TEXT_COMPLETE_SO_CLOSE"));
        out.println("</b></font><p>");
        writeFooter(out);
      }
    } else if (cancelButtonPressed) {
      sessionData.openHTMLDialogs.remove(getDialogId());
      writeHeader(out);
      out.println(getCloseScript());
      out.println("<font size=+1><b>");
      out.println(sessionData.getFrameworkResourceString("TEXT_CANCELED_SO_CLOSE"));
      out.println("</b></font><p>");
      writeFooter(out);
    }
    errorMessages.clear();
  }
  
  public void addErrorMessage(String message) {
    errorMessages.add(message);
  }
  
  public boolean hasErrorMessages() {
    return errorMessages.size() > 0;
  }
  
  /**
   * Return the closing script.
   * @return the closing script
   */
  protected String getCloseScript() {
    StringBuffer script = new StringBuffer("<script LANGUAGE=\"JavaScript\">\n<!--\n");
    script.append("function dealayedClosing() {\n");
    script.append("  window.close()\n");
    script.append("}\n");
    script.append("setTimeout(\"dealayedClosing()\", 2000);\n");
    script.append("//-->\n</script>");
    return script.toString();
  }

  public abstract void writeInitialRemoteView(ToAppletWriter out);
  
  public boolean isBuildDone() {
    return buildDone;
  }

  protected void writeHeader(ToAppletWriter out) {
    out.println("<html>");
    out.println("<head>");
    out.println("   <title>" + getTitle() + "</title>");
    out.println("   <meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">");
    out.println("</head>");
    out.println("<body text=\"#000000\" bgcolor=\"#C0C0C0\" link=\"#000000\" vlink=\"#000000\" alink=\"#000000\">");
    out.println("<font face=\"Arial,Helvetica\">");
  }

  protected void writeFooter(ToAppletWriter out) {
    out.println("</font>");
    out.println("</body>");
    out.println("</html>");
  }
  
  /**
   * Causes the invokable to delegate this function to all embedded markupables
   * to fetch their current value as edited by the user from the request.
   * @param request the request from where the values are to be fetched
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    okButtonPressed = request.getParameter(NAME_FOR_OK_ACTION) != null;
    cancelButtonPressed = request.getParameter(NAME_FOR_CANCEL_ACTION) != null;
   }
  
  /**
   * Processes the user's request.
   * @param request
   */
  public void process(GeneralizedRequest request) {
    if (okButtonPressed) {
      act(request);
    }
  }
  
  /**
   * Do stuff associated to OK Button.
   * @param request
   */
  protected abstract void act(GeneralizedRequest request);

}
