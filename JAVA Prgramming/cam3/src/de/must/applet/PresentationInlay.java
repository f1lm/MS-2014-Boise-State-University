/*
 * Copyright (c) 2011-2012 Christoph Mueller. All rights reserved.
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

import de.must.wuic.MustButton;

/**
 * Inlay for presenting detailed information.
 * @author Christoph Mueller
 */
public class PresentationInlay extends InputInlay {
  
  protected MustButton buttonOk;

  public PresentationInlay(String title) {
    super(title);
    buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), Constants.ACTION_OK, this);
    panelButtons.add(buttonOk);
    add(panelButtons, BorderLayout.SOUTH);
    AppletGlobal.getInstance().getApplet().getRootPane().setDefaultButton(buttonOk);
  }

  @Override
  protected String getTabElementId() {
    return Constants.PRESENTATION;
  }

  @Override
  public void focusGained(FocusEvent e) {
  }

  @Override
  public void focusLost(FocusEvent e) {
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    generalActionBeginnung();
    String actCommand = e.getActionCommand();
    if (actCommand.equals(Constants.ACTION_OK)) {
      boolean result = contactServer(Constants.ACTION_OK);
      if (result) {
        hideGUI();
      }
      if (!result && messageReceiver != null) {
        messageReceiver.setStatus(veto.message);
      }
    } else {
      contactServer(actCommand);
    }
    generalActionEnding();
  }

}
