package de.must.markup;

public abstract class PasswordChangeDialogStd extends PropertyAdministration {

  protected MustPasswordField passwordOld;
  protected MustPasswordField passwordNew1;
  protected MustPasswordField passwordNew2;

  public PasswordChangeDialogStd(SessionData sessionData){
    super(sessionData);
    setTitle("Passwort ändern");
    passwordOld = new MustPasswordField("pwdold", "", 10, 10);
    currentAttributeList.append("Altes Password", passwordOld);
    passwordNew1 = new MustPasswordField("pwdnew1", "", 10, 10);
    currentAttributeList.append("Neues Password", passwordNew1);
    passwordNew2 = new MustPasswordField("pwdnew2", "", 10, 10);
    currentAttributeList.append("Neues Password (Wiederholung)", passwordNew2);
  }

  /**
   * Called by the session.
   * @param request the http request.
   */
  public void process(GeneralizedRequest request) {
    super.process(request);
    if (request.getParameter(NAME_FOR_OK_ACTION) != null) {
      if (isInputAcceptedTotally()) {
      	setNewPassword(passwordNew1.getText());
        passwordOld.setText("");
        passwordNew1.setText("");
        passwordNew2.setText("");
        setStackMovement(-1);
      }
      return;
    }
    if (request.getParameter(NAME_FOR_CANCEL_ACTION) != null) {
      setStackMovement(-1);
      return;
    }
    return;
  }

  /**
   * Returns true if input data is correct.
   * @return true if the input data is correct
   */
  private boolean isInputAcceptedTotally() {
    if (sessionData.loggedInUser == null) {
      setMessageToKeep(sessionData.getFrameworkResourceString("TEXT_NOT_LOGGED_IN_YET"));
      return false;
    }
  	if (passwordOld.getText().trim().length() == 0) {
  		setMessageToKeep(sessionData.getFrameworkResourceString("TEXT_OLD_PASSWORD_REQUIRED"));
  		return false;
  	}
  	if (passwordNew1.getText().trim().length() == 0) {
  		setMessageToKeep(sessionData.getFrameworkResourceString("TEXT_NEW_PASSWORD_REQUIRED"));
  		return false;
  	}
  	if (passwordNew2.getText().trim().length() == 0) {
  		setMessageToKeep(sessionData.getFrameworkResourceString("TEXT_NEW_PASSWORD_REQUIRED"));
  		return false;
  	}
  	if (!passwordNew2.getText().equals(passwordNew1.getText())) {
  		setMessageToKeep(sessionData.getFrameworkResourceString("TEXT_NEW_PASSWORDS_NOT_EQUAL"));
  		return false;
  	}
  	return isInputAccepted(passwordOld.getText());
  }

  /**
   * Returns true if input data is correct.
   * @return true if the input data is correct
   */
  protected abstract boolean isInputAccepted(String enteredOldPassword);

  /**
   * Sets the new password.
   * @param newPassword the new password
   */
  protected abstract void setNewPassword(String newPassword);

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

}
