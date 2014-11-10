/*
 * Copyright (c) 2008 Christoph Mueller. All rights reserved.
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

package de.must.wuic;

import java.awt.Frame;

import de.must.wuic.MustPasswordField;
import de.must.wuic.MustTextField;
import de.must.wuic.ParameterDialog;

/**
 * Signon validation and dialog. Checks whether the given specification is complete and valid.
 * Requests user input for a valid sign on. 
 * @author Christoph Mueller
 */
public class UserPasswordDialog extends ParameterDialog {
  
  public interface Checker {
    public boolean isInputAccepted();
  }
  
  private MustTextField userId;
  private MustPasswordField passwordTextField;
  private Checker checker;
  private boolean successful;
  
  /**
   * Constructs a iSeries Signon class.
   * @param ownerFrame the frame who owns the dialog
   */
  public UserPasswordDialog(Frame ownerFrame) {
    super(ownerFrame);
    newPanel();
    setTitle(getTranslation("TEXT_USER_LOGIN"));
    userId = createTextField(getTranslation("TEXT_USER_ID"), 20); userId.setMaxChars(20);
    passwordTextField = createPasswordField(getTranslation("TEXT_PASSWORD"), 20);
    creationEnding();
  }

  public void setChecker(Checker checker) {
    this.checker = checker;
  }
  
  protected boolean isInputAccepted() {
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
    if (!checker.isInputAccepted()) {
      setMessageToKeep(getTranslation("TEXT_USER_OR_PASSWORD_INVALID"));
      return false;
    }
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
  
}
