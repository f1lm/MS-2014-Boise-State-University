/*
 * Copyright (c) 2004-2014 Christoph Mueller. All rights reserved.
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

package de.must.systems.iseries;

import java.awt.Frame;
import java.beans.PropertyVetoException;

import com.ibm.as400.access.AS400;
import com.ibm.as400.access.AS400SecurityException;

import de.must.io.Logger;
import de.must.util.Callback;
import de.must.wuic.MustPasswordField;
import de.must.wuic.MustTextField;
import de.must.wuic.ParameterDialog;

/**
 * Signon validation and dialog. Checks whether the given specification is complete and valid.
 * Requests user input for a valid sign on. 
 * @author Christoph Mueller
 */
public class ISeriesSignon extends ParameterDialog {
  
  private MustTextField system;
  private MustTextField userId;
  private MustPasswordField passwordTextField;
  private boolean successful;
  private AS400 as400;
  private Callback callbackInCaseOfPasswordChange;
  private PasswordChangeDialog pwdDialog;
  
  /**
   * Constructs a iSeries Signon class.
   */
  public ISeriesSignon() {
    this(null);
  }
  
  /**
   * Constructs a iSeries Signon class.
   * @param ownerFrame the frame who owns the dialog
   */
  public ISeriesSignon(Frame ownerFrame) {
    super(ownerFrame);
    newPanel();
    setTitle(getTranslation("TEXT_SIGNON_TO_THE_SERVER"));
    system = createTextField(getTranslation("TEXT_SYSTEM"), 10);
    system.setCapitalization(true);
    userId = createTextField(getTranslation("TEXT_USER_ID"), 10); userId.setMaxChars(10);
    userId.setCapitalization(true);
    passwordTextField = createPasswordField(getTranslation("TEXT_PASSWORD"), 10);
    creationEnding();
    setSize(200, (int)getSize().getHeight());
  }
  
  /**
   * Sets the system and sets editable to false if filled.
   * @param system the system to use
   */
  public void setSystem(String system) {
    this.system.setText(system);
    if (system.length() > 0) {
      this.system.setEditable(false);
    }
  }
  
  /**
   * Sets the user ID.
   * @param userId the user ID
   */
  public void setUserId(String userId) {
    this.userId.setText(userId);
  }
  
  /**
   * Sets the password.
    * @param password user's password
   */
  public void setPassword(String password) {
    this.passwordTextField.setText(password);
  }
  
  /**
   * Sets connection properties and checks if they are valid. Only if invalid,
   * the dialog to enter valid signon specification.
   * @param system the system to use
   * @param userId the user ID
   * @param password user's password
   */
  public void showIfNecessary(String system, String userId, String password) {
    setSystem(system);
    setUserId(userId);
    setPassword(password);
    if (maySignonBeBypassed(system, userId, password)) {
        successful = true;
    } else {
      setVisible(true);
    }
  }
  
  public void showIfNecessaryAndConnect(String system, String userId, String password) {
    showIfNecessaryAndConnect(system, userId, password, null);
  }
  
  public void showIfNecessaryAndConnect(String system, String userId, String password, Callback callback) {
    setSystem(system);
    setUserId(userId);
    setPassword(password);
    callbackInCaseOfPasswordChange = callback;
    if (connect(system, userId, password)) {
      successful = true;
    } else {
      successful = false;
      setVisible(true);
    }
  }
  
  private boolean maySignonBeBypassed(String system, String userId, String password) {
    if (system.length() == 0) return false;
    if (userId.length() == 0) return false;
    if (password.length() == 0) return false;
    as400 = new AS400(system);
    try {
      if (!as400.validateSignon(userId, password)) {
        return false;
      }
    } catch (java.net.UnknownHostException uhe) {
      return false;
    } catch (Exception e) {
      return false;
    }
    return true;
  }
  
  private boolean connect(String system, String userId, String password) {
    if (system.length() == 0) return false;
    if (userId.length() == 0) return false;
    if (password.length() == 0) return false;
    as400 = new AS400(system);
    try {
      if (!as400.authenticate(userId, password)) {
        return false;
      }
    } catch (java.net.UnknownHostException uhe) {
      return false;
    } catch (com.ibm.as400.access.AS400SecurityException secE) {
      if (secE.getReturnCode() == AS400SecurityException.PASSWORD_EXPIRED) {
        try {
          as400.setUserId(userId);
        } catch (PropertyVetoException e1) {
          Logger.getInstance().error(getClass(), e1);
        }
        pwdDialog = new PasswordChangeDialog(ownerFrame, as400);
        pwdDialog.setVisible(true);
        if (pwdDialog.isSuccessful()) {
          try {
            passwordTextField.setText(pwdDialog.getNewPassword());
            boolean success = as400.authenticate(userId, pwdDialog.getNewPassword());
            if (success) callbackInCaseOfPasswordChange.callback();
            return success;
          } catch (Exception e) {
            Logger.getInstance().error(getClass(), e);
          }
        } else {
          return false;
        }
      }
      return false;
    } catch (Exception e) {
      return false;
    }
    return true;
  }
  
  /* (non-Javadoc)
   * @see java.awt.Component#setVisible(boolean)
   */
  public void setVisible(boolean b) {
    if (system.isEnabled() && system.getText().length() == 0) system.requestFocus();
    else if (userId.isEnabled() && userId.getText().length() == 0) userId.requestFocus();
    else if (passwordTextField.isEnabled() && passwordTextField.getPasswordText().length() == 0) passwordTextField.requestFocus();
    super.setVisible(b);
  }
  
  protected boolean isInputAccepted() {
    if (getSystemName().length() == 0) {
      setMessageToKeep(getTranslation("TEXT_MISSING_System"));
      system.requestFocus();
      return false;
    }
    if (getUserId().length() == 0) {
      setMessageToKeep(getTranslation("TEXT_MISSING_USER_ID"));
      userId.requestFocus();
      return false;
    }
    if (getPasswordText().length() == 0) {
      setMessageToKeep(getTranslation("TEXT_MISSING_PASSWORD"));
      passwordTextField.requestFocus();
      return false;
    }
    setMessage(getTranslation("TEXT_CHECK") + "..."); 
    setCursor(waitCursor);
    as400 = new AS400(getSystemName());
    try {
      if (!as400.validateSignon(getUserId(), getPasswordText())) {
        setMessageToKeep(getTranslation("TEXT_USER_OR_PASSWORD_INVALID"));
        successful = false;
        return false;
      }
    } catch (java.net.UnknownHostException uhe) {
      setMessageToKeep(getTranslation("TEXT_UNKNOWN_HOST"));
      successful = false;
      system.setEditable(true);
      setCursor(defaultCursor);
      return false;
    } catch (com.ibm.as400.access.AS400SecurityException secE) {
      if (secE.getReturnCode() == AS400SecurityException.PASSWORD_EXPIRED) {
        setMessageToKeep(secE.getMessage());
        try {
          as400.setUserId(userId.getText());
        } catch (PropertyVetoException e) {
          Logger.getInstance().error(getClass(), e);
        }
        pwdDialog = new PasswordChangeDialog(ownerFrame, as400);
        pwdDialog.setVisible(true);
        if (pwdDialog.isSuccessful()) {
          passwordTextField.setText(pwdDialog.getNewPassword());
          successful = true;
          return true;
        } else return false;
      } else {
        Logger.getInstance().error(getClass(), secE);
        setMessageToKeep(secE.getMessage());
        return false;
      }
    } catch (java.net.ConnectException e) {
      Logger.getInstance().error(getClass(), e);
      setMessageToKeep(e.getMessage());
      successful = false;
      system.setEditable(true);
      setCursor(defaultCursor);
      return false;
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
      setMessageToKeep(e.getMessage());
      setCursor(defaultCursor);
      return false;
    }
    successful = true;
    setCursor(defaultCursor);
    return super.isInputAccepted();
  }

  protected void act() {
  }
  
  /**
   * Returns true if signon was successful  
   * @return true if signon was successful
   */
  public boolean wasSuccessful() {
    return successful;
  }
  
  /**
   * Returns the used sytem name 
   * @return the used sytem name
   */
  public String getSystemName() {
    return system.getText();
  }
  
  /**
   * Returns the used user ID
   * @return the used user ID
   */
  public String getUserId() {
    return userId.getText();
  }
  
  /**
   * Returns the used password
   * @return the used password
   */
  public String getPasswordText() {
    return passwordTextField.getPasswordText();
  }
  
  /**
   * Returns the AS400 - may be used to access e.g. data queues.
   * @return the AS400
   * @see com.ibm.as400.access.DataQueue(AS400 system, String path)
   */
  public AS400 getAS400 () {
    return as400;
  }
  
  public void setAS400(AS400 as400) {
    this.as400 = as400;
  }

}
