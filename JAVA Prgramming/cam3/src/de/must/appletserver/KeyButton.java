/*
 * Copyright (c) 2011 Christoph Mueller. All rights reserved.
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

package de.must.appletserver;

import java.lang.reflect.Constructor;

import de.must.io.Logger;

/**
 * @author Christoph Mueller
 */
public class KeyButton extends MustButton {

  private static String getOpenImageName() {
    String openImageName = "Open16.gif";
//    if (???.getFontSize() >= 16) {
//      openImageName = "Open24.gif";
//    }
    return openImageName;
  }

  private SessionData sessionData;
  private Class<? extends DataTableAdministration> keyClass;
  // private DataTableAdministration dta;

  public KeyButton(SessionData sessionData, Class<? extends DataTableAdministration> keyClass) {
    super(getOpenImageName(), "...", MustButton.TYPE_IN_SEQUENCE);
    this.sessionData = sessionData;
    this.keyClass = keyClass;
    setToolTipText(sessionData.getFrameworkResourceString("TEXT_KEY_EXTENSION"));
  }
  
  @Override
  public void performAction() {
    /* if (dta == null)*/ try {
      Class<?>[] intArgsClass = new Class[] {SessionData.class};
      Object[] intArgs = new Object[] {sessionData};
      Constructor<? extends DataTableAdministration> intArgsConstructor;
      intArgsConstructor = keyClass.getConstructor(intArgsClass);
      /*dta = (DataTableAdministration) */ intArgsConstructor.newInstance(intArgs);
    }
    catch (Exception exc) {
      Logger.getInstance().error(getClass(), exc);
    }
  }

}
