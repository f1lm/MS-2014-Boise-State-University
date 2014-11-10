/*
 * Copyright (c) 2007-2012 Christoph Mueller. All rights reserved.
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
import java.io.IOException;

import com.ibm.as400.access.AS400;
import com.ibm.as400.access.AS400SecurityException;

import de.must.io.Logger;
import de.must.wuic.MustPasswordField;
import de.must.wuic.ParameterDialog;

/**
 * Password change dialog
 * TODO check automatic call / as400.getPasswordExpirationDate()
 * @author Christoph Mueller
 */
public class PasswordChangeDialog extends ParameterDialog {
  
  private AS400 as400;
  private MustPasswordField passwordOld;
  private MustPasswordField passwordNew;
  private MustPasswordField passwordNew2;
  private boolean successful;
  
  public PasswordChangeDialog(Frame ownerFrame, AS400 as400) {
    super(ownerFrame);
    this.as400 = as400;
    newPanel();
    setTitle(getTranslation("TEXT_PASSWORD_CHANGE"));
    passwordOld = createPasswordField(getTranslation("TEXT_OLD_PASSWORD"), 10);
    passwordNew = createPasswordField(getTranslation("TEXT_NEW_PASSWORD"), 10);
    passwordNew2 = createPasswordField(getTranslation("TEXT_NEW_PASSWORD_REPEAT"), 10);
    creationEnding();
  }

  protected boolean isInputAccepted() {
    successful = false;
    if (passwordOld.getPasswordText().length() == 0) {
      setMessageToKeep(getTranslation("TEXT_MISSING_PASSWORD"));
      passwordOld.requestFocus();
      return false;
    }
    if (passwordNew.getPasswordText().length() == 0) {
      setMessageToKeep(getTranslation("TEXT_MISSING_PASSWORD"));
      passwordNew.requestFocus();
      return false;
    }
    if (passwordNew2.getPasswordText().length() == 0) {
      setMessageToKeep(getTranslation("TEXT_MISSING_PASSWORD"));
      passwordNew2.requestFocus();
      return false;
    }
    if (!passwordNew2.getPasswordText().equals(passwordNew.getPasswordText())) {
      setMessageToKeep(getTranslation("TEXT_PASSWORD_DIFFERENT"));
      passwordNew2.requestFocus();
      return false;
    }
    if (!super.isInputAccepted()) return false;
    try {
      as400.changePassword(passwordOld.getPasswordText(), passwordNew.getPasswordText());
    } catch (AS400SecurityException e) {
      Logger.getInstance().error(e);
      passwordOld.requestFocus();
      setMessageToKeep(e.getMessage());
      return false;
    } catch (IOException e) {
      Logger.getInstance().error(e);
      setMessageToKeep(e.getMessage());
      return false;
    }
    successful = true;
    return true;
  }

  protected void act() {
  }
  
  public boolean isSuccessful() {
    return successful;
  }
  
  public String getNewPassword() {
    return passwordNew.getPasswordText();
  }
  
}
