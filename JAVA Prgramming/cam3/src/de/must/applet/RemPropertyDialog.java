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

import de.must.wuic.MustStatusLabel;

import java.awt.*;
import java.awt.event.*;

public class RemPropertyDialog extends BasicAppletDialog implements /*ContextHelp,*/ WindowListener {

  private PropertyInlay inlayPanel;
  private MustStatusLabel statusLabel;

  public RemPropertyDialog() {
    inlayPanel = new PropertyInlay();
    inlayPanel.mayBeCanceledIfModifiedWithoutConfirmation = true;
    statusLabel = new MustStatusLabel();
    inlayPanel.setMessageReceiver(statusLabel);
    add(inlayPanel, BorderLayout.CENTER); // no scroll pane here, it's already in inlay!
    add(statusLabel, BorderLayout.SOUTH);
    getRootPane().setDefaultButton(inlayPanel.buttonOk);
  }

  @Override
  public void perform(Action action) {
    if (Constants.SET_HEADER.equals(action.toDo)) {
      setTitle(action.value);
    } else if (Constants.SET_MESSAGE_TO_KEEP.equals(action.toDo)) {
      statusLabel.setRemainStatus(action.value);
    } else {
      inlayPanel.perform(action);
    }
    super.perform(action);
  }

  @Override
  public void closeInstance() {
    contactServer(Constants.ACTION_CANCEL);
    super.closeInstance();
  }

}
