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
import java.util.Hashtable;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSplitPane;

import de.must.wuic.MustStatusLabel;

public class FreeCenterGUI extends CenterGUI {
  
  private JSplitPane jSplitPane;
  private JSplitPane jSplitPane2;
  private JLabel rightAppelation;
  private Hashtable<String, InputInlay> inlays = new Hashtable<String, InputInlay>();
  
  public FreeCenterGUI(String title, MustStatusLabel messageReceiver) {
    super(title, messageReceiver);
    jSplitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT);
    jSplitPane2 = new JSplitPane(JSplitPane.VERTICAL_SPLIT);
    setLayout(new BorderLayout());
    add(jSplitPane);
    jSplitPane.setLeftComponent(jSplitPane2);
    jSplitPane.setRightComponent(new JPanel()); // dummy
  }
  
  @Override
  protected boolean perform(Action action) {
    if (Constants.CREATE_SPLIT_TOP_AREA.equals(action.toDo)) {
      EnterInputInlay enterInputInlay = new EnterInputInlay(title);
      jSplitPane2.setTopComponent(enterInputInlay);
      inlays.put(action.concerningSubLevel1, enterInputInlay);
    } else if (Constants.CREATE_SPLIT_BOTTOM_AREA.equals(action.toDo)) {
      ListInlay listInlay = new ListInlay(title);
      listInlay.buttonProperties.setVisible(false);
      listInlay.buttonDelete.setVisible(false);
      listInlay.buttonCopy.setVisible(false);
      jSplitPane2.setBottomComponent(listInlay);
      inlays.put(action.concerningSubLevel1, listInlay);
    } else if (Constants.CREATE_SPLIT_RIGHT_AREA.equals(action.toDo)) {
      JPanel rightPanel = new JPanel();
      rightPanel.setLayout(new BorderLayout());
      ListInlay listInlay = new ListInlay(title);
      listInlay.buttonProperties.setVisible(false);
      listInlay.buttonDelete.setVisible(false);
      listInlay.buttonCopy.setVisible(false);
      rightAppelation = new JLabel();
      rightPanel.add(rightAppelation, BorderLayout.NORTH);
      rightPanel.add(listInlay, BorderLayout.CENTER);
      jSplitPane.setRightComponent(rightPanel);
      inlays.put(action.concerningSubLevel1, listInlay);
    } else if (Constants.SET_VALUE.equals(action.toDo) && "rightheader".equals(action.id)) {
      if (rightAppelation != null) rightAppelation.setText(action.value);
    } else {
      inlays.get(action.concerningSubLevel1).perform(action);
    }
    return true;
  }
  
}
