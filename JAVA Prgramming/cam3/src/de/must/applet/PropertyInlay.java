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
import java.util.Enumeration;

import de.must.wuic.DiSaveCancelReturnD;
import de.must.wuic.MustButton;
import de.must.wuic.MustDialog;
import de.must.wuic.StandardDialog;

/**
 * Inlay for detailed user input.
 * @author Christoph Mueller
 */
public class PropertyInlay extends InputInlay {
  
  protected MustButton buttonOk;
  protected MustButton buttonCancel;
  protected boolean mayBeCanceledIfModifiedWithoutConfirmation;
  
  public PropertyInlay() {
    this(null);
  }
  
  public PropertyInlay(String title) {
    super(title);
    buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), Constants.ACTION_OK, this);
    buttonCancel = new MustButton(getTranslation("TEXT_CANCEL_BUTTON"), Constants.ACTION_CANCEL, this);    
    buttonOk.setPreferredWidth(70);
    fillButtonPanel();
    add(panelButtons, BorderLayout.SOUTH);
    AppletGlobal.getInstance().getApplet().getRootPane().setDefaultButton(buttonOk);
  }
  
  private void fillButtonPanel() {
    panelButtons.add(buttonOk);
    panelButtons.add(buttonCancel);
  }

  @Override
  protected String getTabElementId() {
    return Constants.DETAIL;
  }

  @Override
  public void perform(Action action) {
    if (Constants.CLEAR_DETAILS.equals(action.toDo)) {
      panelButtons.removeAll();
      fillButtonPanel();
    }
    super.perform(action);
  }

  @Override
  public void focusGained(FocusEvent e) {
    AppletGlobal.getInstance().getApplet().getRootPane().setDefaultButton(buttonOk);
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
    setCursor(MustDialog.waitCursor);
    String actCommand = e.getActionCommand();
    if (actCommand.equals(Constants.ACTION_OK)) {
      okButtonAction();
    } else if (actCommand.equals(Constants.ACTION_CANCEL)) {
      if (isCancelAllowed()) {
        boolean result = contactServer(Constants.ACTION_CANCEL);
        if (result) {
          hideGUI();
        }
        if (!result && messageReceiver != null) {
          messageReceiver.setStatus(veto.message);
        }
      }
    } else {
      contactServer(actCommand);
    }
    setCursor(MustDialog.defaultCursor);
    generalActionEnding();
  }

  public boolean isCancelAllowed() {
//    recoveredIdentifier = null;
//    if (administrationMode == MODE_VIRGIN) return true;
    if (mayBeCanceledIfModifiedWithoutConfirmation) return true;
    if (!isVisible()) return true;
    if (!isModified()) return true;
    switch (StandardDialog.saveCancelReturnDecision(null)) {
      case DiSaveCancelReturnD.DECISION_SAVE:
        return okButtonAction();
      case DiSaveCancelReturnD.DECISION_CANCEL:
        generalActionBeginnung();
        return true;
       case DiSaveCancelReturnD.DECISION_RETURN:
//         recoveredIdentifier = lastRevisionIdentifier;
         requestFocus();
         return false;
    }
    return true;
  }

  /**
   * Does all the things necessary when user pushes OK button and returns true if 
   * there was nothing rejected. Returning false means the regular OK button action 
   * has not been done to the end, e.g. because data input has not been accepted. 
   * @return true if there was nothing rejected
   */
  protected boolean okButtonAction() {
    boolean result = contactServer(Constants.ACTION_OK);
    if (result) {
      hideGUI();
    }
    if (!result && messageReceiver != null) {
      messageReceiver.setRemainStatus(veto.message);
      if (veto.soundToPlay != null) AppletGlobal.getInstance().playSound(veto.soundToPlay);
    }
    return result;
  }
  
  private boolean isModified() {
    Enumeration<RemoteGUIComponent> valueContainers = rgcs.elements();
    while (valueContainers.hasMoreElements()) {
      RemoteGUIComponent valueContainer = valueContainers.nextElement();
      if (valueContainer.isModified()) {
        return true;
      }
    }
    return false;
  }
  
}
