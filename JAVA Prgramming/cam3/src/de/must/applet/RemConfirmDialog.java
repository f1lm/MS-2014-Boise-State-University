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

import de.must.io.Logger;
import de.must.util.KeyValuePairAlpha;
import de.must.util.StringFunctions;
import de.must.wuic.MustButton;
import de.must.wuic.MustTextArea;

import java.awt.*;
import java.awt.event.*;
import java.io.IOException;
import java.util.Vector;

public class RemConfirmDialog extends OutputDialog {

  private MustTextArea infoArea;
  protected MustButton buttonCancel;
  private String actionYes;
  private String actionNo;

  public RemConfirmDialog(String titleOfCallingMainTab, String titleOfCallingSubTab) {
    super(titleOfCallingMainTab, titleOfCallingSubTab);
    infoArea = new MustTextArea(5, 60, 9999999);
    infoArea.setEditable(false);
    add(infoArea, BorderLayout.CENTER);
    buttonCancel = new MustButton(getTranslation("TEXT_CANCEL_BUTTON"), Constants.ACTION_CANCEL, this);    
    panelButtons.add(buttonCancel);
    creationEnding();
  }
  
  public void setAction(String actionYes, String actionNo) {
    this.actionYes = actionYes;
    this.actionNo = actionNo;
  }

  @Override
  public void perform(Action action) {
    setTitle(action.variant1);
    setHeaderText(action.variant2);
    infoArea.setText(StringFunctions.replaceAll(action.value, Constants.NEW_LINE, "\n"));
    super.perform(action);
  }

  /**
   * Controls action events like button pressed.
   * @param e the action event to be interpreted
   */
  public void actionPerformed(ActionEvent e) {
    generalActionBeginnung();
    Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
    params.add(new KeyValuePairAlpha(Constants.TAB_OR_WINDOW_ID, titleOfCallingMainTab));
    if (titleOfCallingSubTab != null) {
      params.add(new KeyValuePairAlpha(Constants.TAB_ELEMENT, titleOfCallingSubTab));
    }
    if (buttonOk.equals(e.getSource())) {
      params.add(new KeyValuePairAlpha(Constants.ACTION, actionYes));
    } else {
      params.add(new KeyValuePairAlpha(Constants.ACTION, actionNo));
    }
    try {
      closeInstance();
      AppletGlobal.getInstance().contactServer(params);
    } catch (IOException e2) {
      Logger.getInstance().error(getClass(), e2);
    }
    generalActionEnding();
  }

}
