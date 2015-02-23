/*
 * Copyright (c) 2001-2010 Christoph Mueller. All rights reserved.
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

import java.util.Iterator;
import java.util.Vector;

/**
 * A Dialog is an invokable that can produce a markup language user interface,
 * read user input and process user request.
 * @author Christoph Mueller
 */
public abstract class Dialog implements Invokable {

  public static final String NAME_FOR_OK_ACTION = "ok";
  public static final String NAME_FOR_CANCEL_ACTION = "cancel";
  public static final String NAME_FOR_BACK_ACTION = "back";
  public static final String NAME_FOR_LIST_ACTION = "list";
  public static final String NAME_FOR_NEW_ENTRY_ACTION = "new";
  public static final String NAME_FOR_HELP_ACTION = "help/german";
  public static final String NAME_FOR_CLOSE_ACTION = "close";
  public static final String NAME_FOR_DIALOG_NBR = "dialogNbr";

  protected SessionData sessionData;
  private int dialogNumber;
  private String title;
  private String subTitle;
  private HelpContext helpContext;
  protected MustButton okButton;
  protected MustButton cancelButton;
  protected MustButton backButton;
  protected Vector<MustButton> additionalButtons;
  private String scriptToExecute;
  protected boolean processComplete; // to indicate that no default is to process any more
  protected int stackMovement;
  private boolean destroyed = false;

  /**
   * Constructs a new dialog.
   * @param sessionData the session's public data
   */
  public Dialog(SessionData sessionData) {
    this.sessionData = sessionData;
    okButton = new MustButton(sessionData.getFrameworkResourceString("TEXT_OK_BUTTON"), NAME_FOR_OK_ACTION);
    cancelButton = new MustButton(sessionData.getFrameworkResourceString("TEXT_CANCEL_BUTTON"), NAME_FOR_CANCEL_ACTION);
    if (!sessionData.isMobile()) {
      backButton = new MustButton(sessionData.getFrameworkResourceString("TEXT_BACK_BUTTON"), NAME_FOR_BACK_ACTION);
    }
  }

  public Class<? extends Invokable> getInvokableInAdvance() {
    return null;
  }
  
  /**
   * Initializes the invokable in order to reuse the component without garbage
   * from the previous use.
   */
  public void init() {
    stackMovement = 0;
    dialogNumber = -7;
  }

  /**
   * Appends an additional button next to the standard buttons.
   * @param button the button to append
   */
  public void appendAdditionalButton(MustButton button) {
    if (additionalButtons  == null) additionalButtons = new Vector<MustButton>();
    additionalButtons.add(button);
  }
  
  /**
   * Returns additional buttons to be displayed from the layout manager
   * @return additional buttons to be displayed from the layout manager
   */
  public Vector<MustButton> getAdditionalButtons() {
    return additionalButtons;
  }

  /**
   * Returns the header as a markup tag sequence.
   * @return the header as a markup tag sequence
   */
  protected String getHeader() {
    String tagSequence = "<html>";
    tagSequence += "<head>";
    tagSequence += "   <title>" + sessionData.applicationTitle + "</title>";
    tagSequence += "   <meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">";
    // tagSequence += "   <meta name=\"GENERATOR\" content=\"" + generator + " [www.must.de]\">";
    tagSequence += "</head>";
    tagSequence += "<body text=\"#000000\" bgcolor=\"#C0C0C0\" link=\"#000000\" vlink=\"#000000\" alink=\"#000000\">";
    tagSequence += getScriptToExecute();
    // tagSequence += "<body text=\"#00CC00\" bgcolor=\"#000000\" link=\"#00CC00\" vlink=\"#00CC00\" alink=\"#00CC00\">";
    tagSequence += "<font face=\"Arial,Helvetica\">";
    // tagSequence += "<basefont size=-1><font face=\"Arial,Helvetica\">";
    return tagSequence;
  }

  /**
   * Returns the footer as a markup tag sequence.
   * @return the footer as a markup tag sequence
   */
  protected String getFooter() {
    // String tagSequence = "</font></basefont>";
    String tagSequence = "</font>";
    // if (footerTagSequence != null) tagSequence += footerTagSequence;
    tagSequence += "</body>";
    tagSequence += "</html>";
    return tagSequence;
  }
  
  /**
   * Returns the tag sequence to represent the OK button.
	 * @return the tag sequence to represent the OK button
	 */
	public String getOkButtonTagSequence() {
    return okButton.getCreationTag();
  }

  /**
   * Returns the tag sequence to represent the cancel button.
   * @return the tag sequence to represent the cancel button
   */
  public String getCancelButtonTagSequence() {
    if (cancelButton != null) return cancelButton.getCreationTag();
    else return "";
  }

  /**
   * Returns the tag sequence to represent the back button.
   * @return the tag sequence to represent the back button
   */
  public String getBackButtonTagSequence() {
    if (backButton != null) return backButton.getCreationTag();
    else return "";
  }

  /**
   * Returns the script to execute as a markup tag sequence.
   * @return the script to execut as a markup tag sequence
   */
  protected String getScriptToExecuteSequence() {
    String scriptToExecute = null;
    String informationToBeShownModal = null;
    scriptToExecute = getScriptToExecute();
    informationToBeShownModal = sessionData.messageForNextDialog;
    if (scriptToExecute == null && informationToBeShownModal == null) return "";
    String script = "<script LANGUAGE=\"JavaScript\">\n<!--\n";
    if (scriptToExecute != null) script += scriptToExecute + "\n";
    if (informationToBeShownModal != null) {
      script += "function showModal() {\n";
      script += "  alert(\"" + informationToBeShownModal + "\");\n";
      script += "}\n";
      script += "setTimeout(\"showModal()\", 1);\n";
    }
    script += "//-->\n</script>";
    return script;
  }

  /**
   * Returns true if the dialog accepts to be canceled.
   * @return true if the dialog accepts to be canceled
   */
  public boolean isCancelable() {
    return true;
  }

  /**
   * Returns true if the dialog fits to the qualification set in the previous output.
   * Technique to avoid desynchronization, e.g. via used browser back functions.
   * @param request the request to compare dialog steps
   * @return true if the dialog fits to the qualification set in the previous output
   */
  public boolean isSuitableDialog(GeneralizedRequest request) {
    // checking POST variant
    String planedDialogNbrString = request.getParameter(NAME_FOR_DIALOG_NBR);
    if (planedDialogNbrString != null) {
      int planedDialogNbr = Integer.parseInt(planedDialogNbrString);
      if (sessionData.dialogNbr == planedDialogNbr) return true; // regular case
      if (dialogNumber == planedDialogNbr) return true; // case browser back functionality
    }
    return false;
  }

  @Override
  public void beforeOutput() {
  }

  @Override
  public void afterOutput() {
    dialogNumber = sessionData.dialogNbr;
  }

  /**
   * Causes the invokable to delegate this function to all embedded markupables
   * to fetch their current value as edited by the user from the request.
   * @param request the request from where the values are to be fetched
   * @see Markupable#fetchYourValueFromRequest
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    if (okButton != null) okButton.fetchYourValueFromRequest(request);
    if (cancelButton != null) cancelButton.fetchYourValueFromRequest(request);
    if (backButton != null) backButton.fetchYourValueFromRequest(request);
    if (additionalButtons != null) {
      Iterator<MustButton> iterator = additionalButtons.iterator();
      while (iterator.hasNext()) {
        MustButton button = iterator.next();
        button.fetchYourValueFromRequest(request);
      }
    }
  }
  
  /**
   * Returns true if the request is of method "POST" - useful
   * to check default Buttons.
	 * @param request the request to check
	 * @return true if the request is of method "POST"
	 */
	protected boolean isPost(GeneralizedRequest request) {
    return request.getStandardRequest().getMethod().equalsIgnoreCase("POST");
  }

  /**
   * Processes the user's request.
   * @param request
   */
  public void process(GeneralizedRequest request) {
    processComplete = false;
    scriptToExecute = null;
    stackMovement = 0;
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   */
  public void setHelpContext(String helpTopic) {
    this.helpContext = new HelpContext(helpTopic);
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

  /**
   * Sets the dialogs's subtitle.
   * @param newTitle the subtitle of the dialog
   */
  public void setSubTitle(String newSubTitle) {
    this.subTitle = newSubTitle;
  }

  /**
   * Returns the dialogs's title.
   * @return the dialogs's title.
   */
  public String getSubTitle() {
    return subTitle;
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   * @param helpTarget the context help's target
   */
  public void setHelpContext(String helpTopic, String helpTarget) {
    this.helpContext = new HelpContext(helpTopic, helpTarget);
  }

  /**
   * Returns the component's help context.
   * @return the component's help context
   */
  public HelpContext getHelpContext() {
    return helpContext;
  }

  /**
   * Sets the message to be read by the user.
   * @param messageToKeep the message for the user
   */
  public void setMessageToKeep(String messageToKeep) {
    sessionData.messageForNextDialog = messageToKeep;
  }

  /**
   * Sets the message to be read by the user if there is no message, yet.
   * Does nothing if a message is already set.
   * @param messageToKeep the message for the user
   */
  protected void setMessageToKeepIfNotAlreadySet(String messageToKeep) {
    if (sessionData.messageForNextDialog == null) sessionData.messageForNextDialog = messageToKeep;
  }

  /**
   * Sets the script to be executed at the next user contact.
   * @param newScriptToExecute the script to execute
   */
  public void setScriptToExecute(String newScriptToExecute) {
    scriptToExecute = newScriptToExecute;
  }

  /**
   * Returns the script to be executed at the next user contact.
   * @return the script to be executed
   */
  public String getScriptToExecute() {
    return scriptToExecute;
  }

  /**
   * Sets the stack movement. 0 means stay in the same tier,
   * -1 means go one step back in stack,
   * 1 means go one step deeper in stack. Last one needs SessionData.classToInvokeNext
   * @param newStackMovement
   * @see SessionData#classToInvokeNext
   */
  public void setStackMovement(int newStackMovement) {
    stackMovement = newStackMovement;
  }

  /**
   * Returns the stack movement.
   * @return the stack movement
   */
  public int getStackMovement() {
    return stackMovement;

  }

  /**
   * Destroys the frame. This may include
   * <ul>
   * <li>deregistering as main instance of a frame of this class</li>
   * <li>freeing used data components especially those with listeners, particularly those which are registered in static vectors</li>
   * </ul>
   * After the frame has been destroyed, it is not usable any more!
   * Override free to add further destruction and don't forget to call 
   * super.free() at the end.
   * @see #free()
   */
  public final void destroy() {
    if (destroyed) return; // already done - thus, we don't have to carefully avoid multiple calls
    free();
    destroyed = true;
  }
  
  /**
   * Frees (releases) references caused by this frame, particularly static 
   * register entries. To be called via destroy() to prevent multiple call.
   * Override it to do additional releases and don't forget to call 
   * super.free() at the end.
   * @see #destroy()
   */
  protected void free() {
  }

  /**
   * Called by the garbage collector. Calls free if the frame has not already
   * been destroyed.
   * Override free to add further releases and don't forget to call 
   * super.free() at the end.
   * @see #free()
   * @see #destroy()
   */
  protected final void finalize() throws Throwable {
    de.must.io.Logger.getInstance().debug(getClass(), "finalizing " + getClass().getName() + " / already destroyed = " + destroyed);
    if (!destroyed) free();
    super.finalize();
  }

}
