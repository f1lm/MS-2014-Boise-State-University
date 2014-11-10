/*
 * Copyright (c) 2001-2008 Christoph Mueller. All rights reserved.
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

/**
 * @author Christoph Mueller
 */
public abstract class LoginDialog extends PropertyAdministration {

  protected MustTextField userIdField;
  protected MustPasswordField passwordField;

  /**
   * Constructs a new login dialog
   * @param sessionData the session's public data
   */
  public LoginDialog(SessionData sessionData) {
    super(sessionData);
    setTitle(sessionData.getFrameworkResourceString("TEXT_LOGIN")); //$NON-NLS-1$
    userIdField = new MustTextField("User", "", 10, 10); //$NON-NLS-1$ //$NON-NLS-2$
    currentAttributeList.append(sessionData.getFrameworkResourceString("TEXT_USER"), userIdField); //$NON-NLS-1$
    passwordField = new MustPasswordField("Password", "", 10, 10); //$NON-NLS-1$ //$NON-NLS-2$
    currentAttributeList.append(sessionData.getFrameworkResourceString("TEXT_PASSWORD"), passwordField); //$NON-NLS-1$
  }

  /**
   * Initializes the invokable in order to reuse the component without garbage
   * from the previous use.
   */
  public void init() {
    setStackMovement(0);
  }

  /**
   * Not needed here.
   * @param submitter not needed here
   */
  public void setSubmitter(Invokable submitter) {
    // this.submitter = submitter;
  }

  /**
   * Not needed here.
   * @return not needed here
   */
  public Submission getSubmission() {
    return null;
  }

  /**
   * Returns a comment to be displayed between Header "Login" and user input field.
   * Override it to give user a hint how to login.
   * @return a comment to be displayed between Header "Login" and user input field
   */
  protected String getLoginHint() {
    return null;
  }

  private String getCoreTagSequence() {
    String tagSequence = "";
    tagSequence += currentAttributeList.getTagSequence();
    return tagSequence;
  }

  /**
   * Called by the session.
   * @param request the http request.
   */
  public void process(GeneralizedRequest request) {
    super.process(request);
    if (request.getParameter(NAME_FOR_OK_ACTION) != null) {
      if (isLoginAccepted()) {
        sessionData.loggedInUser = new LoggedInUser(userIdField.getText(), getUserGroup());
        userIdField.setText("");
        passwordField.setText("");
        if (sessionData.stackPointer == 0) {
          sessionData.classToInvokeNext = getClassToInvokeIfLoginIsRootInvokable();
          // setStackMovement(1);
          setStackMovement(99); // replace root and put classToInvokeNext at its place
        } else {
          setStackMovement(-1);
        }
      } else {
      }
      return;
    }
    if (request.getParameter(NAME_FOR_CANCEL_ACTION) != null) {
      if (sessionData.stackPointer == 0) {
        sessionData.sessionClosingRequested = true;
      } else {
        setStackMovement(-1);
      }
      return;
    }
    return;
  }

  /**
   * Returns the class, which is to invoke if the login dialog is the first
   * dialog in stack. This may be the e.g. MainMenu.class.
   * @return
   */
  protected abstract Class<? extends Invokable> getClassToInvokeIfLoginIsRootInvokable();

  /**
   * Returns true if the login data is correct. Check your user database or
   * LDAP or whatever and return true, if you find the user input is Ok.
   * @return true if the login data is correct
   */
  protected abstract boolean isLoginAccepted();

  /**
   * Returns the group of logged in user.
   * @return the group of logged in user
   */
  protected abstract String getUserGroup();

}
