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

package de.must.applet;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.FocusEvent;
import java.io.IOException;
import java.util.Vector;

import de.must.io.Logger;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.MustButton;

public class EnterInputInlay extends InputInlay {
  
  private MustButton enterButton;

  public EnterInputInlay(String title) {
    super(title);
    enterButton = new MustButton("Enter", Constants.ACTION_LIST, this);
    enterButton.setVisible(false);
    add(enterButton, BorderLayout.SOUTH);
    AppletGlobal.getInstance().getApplet().getRootPane().setDefaultButton(enterButton);
  }
  
  @Override
  public void focusGained(FocusEvent e) {
    AppletGlobal.getInstance().getApplet().getRootPane().setDefaultButton(enterButton);
  }

  @Override
  public void focusLost(FocusEvent e) {
  }

  /**
   * Controls action events like button pressed.
   * @param e the action event to be interpreted
   */
  public void actionPerformed(ActionEvent e) {
    generalActionBeginnung();
    perform(e.getActionCommand());
    generalActionEnding();
  }
  
  public boolean perform(String command) {
    Vector<KeyValuePairAlpha> params = getSynchParams();
    params.add(new KeyValuePairAlpha(Constants.TAB_OR_WINDOW_ID, tabIdAndLabel));
    params.add(new KeyValuePairAlpha(Constants.TAB_ELEMENT, Constants.SEARCH));
    params.add(new KeyValuePairAlpha(Constants.ACTION, command));
    try {
      AppletGlobal.getInstance().contactServer(params);
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
      return false;
    }
    return true;
  }

}
