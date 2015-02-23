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

import javax.swing.JPanel;

import de.must.io.Logger;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.MustButton;

public class SearchInlay extends InputInlay {
  
  private SearchListDetailGroup group;
  protected MustButton buttonList;
  protected MustButton buttonNew;
  protected InquiryHistory inquiryHistory;
    
  public SearchInlay(SearchListDetailGroup group) {
    super(group.tabIdAndLabel);
    this.group = group;
    buttonList = new MustButton(getTranslation("TEXT_LIST_BUTTON"), Constants.ACTION_LIST, this);
    buttonNew = new MustButton(getTranslation("TEXT_NEW_ENTRY"), Constants.ACTION_NEW_ENTRY, this);
    panelButtons = new JPanel();
    panelButtons.add(buttonList);
    inquiryHistory = new InquiryHistory(getLocale(), group);
    panelButtons.add(inquiryHistory.getUI());
    panelButtons.add(buttonNew);
    add(panelButtons, BorderLayout.SOUTH);
    AppletGlobal.getInstance().getApplet().getRootPane().setDefaultButton(buttonList);
  }

  public void setReadOnly() {
    buttonNew.setVisible(false);
  }
  
  @Override
  protected String getTabElementId() {
    return Constants.SEARCH;
  }

  @Override
  public void focusGained(FocusEvent e) {
    AppletGlobal.getInstance().getApplet().getRootPane().setDefaultButton(buttonList);
  }

  @Override
  public void focusLost(FocusEvent e) {
  }

  @Override
  public void perform(Action action) {
    if (Constants.SET_INQUIRY_HISTORY.equals(action.toDo)) {
      inquiryHistory.perform(action);
    } else if (Constants.SET_LISTBUTTONLABEL.equals(action.toDo)) {
      buttonList.setText(action.value);
    } else if (Constants.SET_READ_ONLY.equals(action.toDo)) {
      setReadOnly();
    } else {
      super.perform(action);
    } 
  }

  /**
   * Controls action events like button pressed.
   * @param e the action event to be interpreted
   */
  public void actionPerformed(ActionEvent e) {
    generalActionBeginnung();
    act(e.getActionCommand());
    generalActionEnding();
  }

  protected boolean act(String command) {
    if (Constants.ACTION_NEW_ENTRY.equals(command) && group.propertyAdmin != null && !group.propertyAdmin.isCancelAllowed()) {
      return false;
    }
    return perform(command);
  }
  
  public boolean perform(String command) {
    Vector<KeyValuePairAlpha> params = getSynchParams();
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
