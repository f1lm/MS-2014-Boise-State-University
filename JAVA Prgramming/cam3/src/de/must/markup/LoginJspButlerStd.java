/*
 * Copyright (c) 2003 Christoph Mueller. All rights reserved.
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
 * Standard functionality for login butlers.
 * @author Christoph Mueller
 */
public abstract class LoginJspButlerStd extends JspButler {

  protected class AcceptedUser {
    private String userName;
    private String password;
    private String userGroup;
    public AcceptedUser(String userName, String password) {
      this(userName, password, null);
    }
    public AcceptedUser(String userName, String password, String userGroup) {
      this.userName = userName;
      this.password = password;
      this.userGroup = userGroup;
    }
    public String getUserName() {
      return userName;
    }
		public String getPassword() {
			return password;
		}
		public String getUserGroup() {
			return userGroup;
		}
  }

  protected AcceptedUser[] acceptedUsers;
  private AcceptedUser checkedUser;

  private GroupOfMarkupables markupables;
  
  public MustTextField userIdField;
  public MustPasswordField passwordField;
  public OkButton okButton;
  public CancelButton cancelButton;
  
  private String standardLoggedInJsp;

	/**
	 * Constructor for LoginJspButler.
	 * @param sessionData
	 */
	public LoginJspButlerStd(SessionData sessionData) {
		super(sessionData);
    standardLoggedInJsp = getLoggedInURI(); // default JSP
    markupables = new GroupOfMarkupables(sessionData);
    userIdField = markupables.createTextField(40);
    passwordField = markupables.createPasswordField(40);
    okButton = markupables.createOkButton(sessionData);
    cancelButton = markupables.createCancelButton(sessionData);
	}

	/**
	 * @see de.must.markup.JspButler#handle(de.must.markup.GeneralizedRequest)
	 */
	protected void handle(GeneralizedRequest request) {
    markupables.fetchValuesFromRequest(request);
    if (isExactDialogSequence()) {
      if (okButton.wasPressed()) {
        if (isLoginAccepted() & isUserNotDeniedByListOfAcceptedUsers()) {
          if (checkedUser != null) {
            sessionData.loggedInUser = new LoggedInUser(checkedUser.getUserName(), checkedUser.getUserGroup());
          } else {
            sessionData.loggedInUser = new LoggedInUser(userIdField.getText(), null);
          }
          if (sessionData.afterLoginJspName != null) {
            setUriToGo(sessionData.afterLoginJspName);
            sessionData.afterLoginJspName = null;
          } else {
            setUriToGo(standardLoggedInJsp);
          }
          // we don't want a go back to the login or any previous JSP!
          sessionData.setPreviousURI(null, getWindowNbr(request));
          sessionData.setCurrentURI(null, getWindowNbr(request));
          userIdField.setText("");
        } else {
          setMessageToKeep("Login invalid");
        }
        passwordField.setText("");
      }
    }
	}
  
  private int getWindowNbr(GeneralizedRequest request) {
    int windowNbr;
    String windowNbrParam = request.getParameter("windownbr");
    de.must.io.Logger.getInstance().debug(getClass(), "looked for windownbr " + windowNbrParam);
    if (windowNbrParam == null) windowNbr = 0;
    else windowNbr = Integer.parseInt(windowNbrParam);
    de.must.io.Logger.getInstance().debug(getClass(), "found window nbr " + windowNbr);
    return windowNbr;
  }

  /**
   * Returns true if the login data is correct. Check your user database or
   * LDAP or whatever and return true, if you find the user input is Ok.
   * @return true if the login data is correct
   */
  protected abstract boolean isLoginAccepted();
  
  private boolean isUserNotDeniedByListOfAcceptedUsers() {
    checkedUser = null;
    if (acceptedUsers == null) return true; // no limitation by array of accapted users
    for (int i = 0; i < acceptedUsers.length; i++) {
      if (acceptedUsers[i].getUserName().equals(userIdField.getText())
       && acceptedUsers[i].getPassword().equals(passwordField.getText())
      ) {
        checkedUser = acceptedUsers[i];
        return true;
      }
    }
    return false;
  }

  protected abstract String getLoggedInURI();

  // protected abstract String getLoggedOffURI();

}
