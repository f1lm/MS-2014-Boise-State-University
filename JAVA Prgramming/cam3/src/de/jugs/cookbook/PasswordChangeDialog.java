package de.jugs.cookbook;

import de.must.markup.*;
import de.must.util.Crypt;

public class PasswordChangeDialog extends PasswordChangeDialogStd {

  private DoUser doUser;

  public PasswordChangeDialog(SessionData sessionData){
    super(sessionData);
    doUser = new DoUser(sessionData);
  }

  protected boolean isInputAccepted(String enteredOldPassword) {
  	String currentPassword;
    doUser.select("UserId, Password", "UserId = '" + sessionData.loggedInUser.getUserName() + "'");
    if (!doUser.nextRow()) {
      doUser.closeQuery();
      System.out.println("User not found in PasswordChangeDialog !?!");
      return false;
    }
    currentPassword = doUser.getText("Password");
    if (Global.getInstance().encryptPasswords) currentPassword = Crypt.decrypt(currentPassword);
    doUser.closeQuery();
    if (!enteredOldPassword.equals(currentPassword)) {
      setMessageToKeep(sessionData.getResourceString("TEXT_OLD_PASSWORD_INCORRECT"));
      return false;
    }
  	return true;
  }
  
  /**
   * Sets the new password.
   * @param newPassword the new password
   */
  protected void setNewPassword(String newPassword) {
    String storedPassword = newPassword;
    if (Global.getInstance().encryptPasswords) storedPassword = Crypt.encrypt(storedPassword);
    doUser.setText("Password", storedPassword);
    doUser.update();
  }
  
}
