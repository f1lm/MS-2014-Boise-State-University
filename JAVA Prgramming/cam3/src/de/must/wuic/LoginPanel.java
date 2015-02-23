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
package de.must.wuic;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.JRootPane;
import javax.swing.SwingUtilities;

import de.must.middle.FrameworkTextResource;
import de.must.util.Callback;

public class LoginPanel extends AttributeList {

  private MustTextField userId;
  private MustPasswordField password;
  private MustButton login;
  
  public LoginPanel(JRootPane rootPane, FrameworkTextResource frameworkTextResource, Callback callback) {
    this(rootPane, frameworkTextResource, callback, 20, 20);
  }
  
  public LoginPanel(JRootPane rootPane, FrameworkTextResource frameworkTextResource, final Callback callback, int idLength, int pwdLength) {
    userId = new MustTextField(idLength);
    userId.setMaxChars(idLength);
    append(frameworkTextResource.getResourceString("TEXT_USER_ID"), userId);
    userId.addKeyListener(new KeyListener() {
      public void keyTyped(KeyEvent e) {}
      public void keyReleased(KeyEvent e) {
        controlLoginButtonEnabling();
      }
      public void keyPressed(KeyEvent e) {}
    });
    password = new MustPasswordField(pwdLength); 
    append(frameworkTextResource.getResourceString("TEXT_PASSWORD"), password);
    password.addKeyListener(new KeyListener() {
      public void keyTyped(KeyEvent e) {}
      public void keyReleased(KeyEvent e) {
        controlLoginButtonEnabling();
      }
      public void keyPressed(KeyEvent e) {}
    });
    login = new MustButton(frameworkTextResource.getResourceString("TEXT_USER_LOGIN"));
    append("", login);
    login.setEnabled(false);
    rootPane.setDefaultButton(login);
    login.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        callback.callback();
      }
    });
    SwingUtilities.invokeLater(new Runnable() {
      public void run() {
        userId.requestFocus();
      }
    });
  }
  
  private void controlLoginButtonEnabling() {
    login.setEnabled(getUserId().length() > 0 && getPassword().length() > 0);
  }
  
  public String getUserId() {
    return userId.getText();
  }
  
  public String getPassword() {
    return password.getPasswordText();
  }
  
}
