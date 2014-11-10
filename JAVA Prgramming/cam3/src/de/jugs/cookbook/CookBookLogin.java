//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.markup.*;
import de.must.util.Crypt;

/**
 * @author Christoph Mueller
 */
public final class CookBookLogin extends LoginDialog {

  private DoUser doUser;

  public CookBookLogin(SessionData sessionData) {
    super(sessionData);
    doUser = new DoUser(sessionData);
    setSubTitle("(use \"standard\", \"org\" or \"admin\" with same password)<p>\n");
    setHelpContext("Operate", "Login");
  }

  protected boolean isLoginAccepted() {
    if (userIdField.getText().equals("")) {
      setMessageToKeep("Enter a user ID");
      return false;
    }
    doUser.select("UserNi, UserId, GroupId, Password, UserState", "UserId = '" + userIdField.getText() + "'");
    if (!doUser.nextRow()) {
      doUser.closeQuery();
      setMessageToKeep(sessionData.getResourceString("TEXT_LOGIN_FAILED"));
      return false;
    }
    doUser.closeQuery();
    String storedPassword = doUser.getText("Password");
    if (Global.getInstance().encryptPasswords) storedPassword = Crypt.decrypt(storedPassword);
    if (!passwordField.getText().equals(storedPassword)) {
      setMessageToKeep(sessionData.getResourceString("TEXT_LOGIN_FAILED"));
      return false;
    }
    return true;
  }

  protected String getUserGroup() {
    return doUser.getText("GroupId");
  }

  protected Class<? extends Invokable> getClassToInvokeIfLoginIsRootInvokable() {
    return MainMenu.class;
  }

}
