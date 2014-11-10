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

package de.must.applet;

import de.must.util.KeyValuePairAlpha;
import de.must.wuic.*;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowEvent;
import java.util.Hashtable;
import java.util.Vector;

import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JSplitPane;

/**
 * Option dialog with list of items to select for execution.
 * @see Constants#DIALOG_FOR_OPTIONS_WITH_LIST_SELECTION
 * @author Christoph Mueller
 */
public class RemOptionDialogWithListSelection extends RemOptionDialog {

  private JSplitPane jSplitPane1 = new JSplitPane(JSplitPane.VERTICAL_SPLIT);
  private RemAttributeList attributeList;
  /** Reminder of components to be found by their ID for further actions like value settings */
  private Hashtable<String, Identified> idComp = new Hashtable<String, Identified>();
  private RemUniversalTable table;

  public RemOptionDialogWithListSelection() {
    attributeList = new RemAttributeList("single", idComp, this);
    // tableModel = new TableModel(columnNames);
    table = new RemUniversalTable();
    table.setColumnEditable(0);
    statusLabel = new MustStatusLabel();
    jSplitPane1.setTopComponent(new JScrollPane(attributeList));
    JPanel bottomCompPanel = new JPanel();
    bottomCompPanel.setLayout(new BorderLayout());
    bottomCompPanel.add(new JScrollPane(table), BorderLayout.CENTER);
    bottomCompPanel.add(panelBottom, BorderLayout.SOUTH);
    jSplitPane1.setBottomComponent(bottomCompPanel);
    
    // getRootPane().setDefaultButton(inlayPanel.buttonOk);
    MustButton buttonSelectAll = new MustButton(getTranslation("TEXT_SELECT_ALL"));
    panelButtons.add(buttonSelectAll);
    buttonSelectAll.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        for (int i = 0; i < table.tableModel.getRowCount(); i++) {
          table.tableModel.setValueAt(true, i, 0);
        }
      }
    });
    MustButton buttonDeselectAll = new MustButton(getTranslation("TEXT_DESELECT_ALL"));
    panelButtons.add(buttonDeselectAll);
    buttonDeselectAll.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        for (int i = 0; i < table.tableModel.getRowCount(); i++) {
          table.tableModel.setValueAt(false, i, 0);
        }
      }
    });
    setContentPane(jSplitPane1);
    // tableModel.setRowSorter(table);
  }

  @Override
  public void perform(Action action) {
    if (Constants.SET_HEADER.equals(action.toDo)) {
      setTitle(action.value);
    } else if (Constants.SET_MESSAGE_TO_KEEP.equals(action.toDo)) {
      statusLabel.setRemainStatus(action.value);
    } else if (table != null && table.perform(action)) {
      // done by delegation
    } else {
      attributeList.perform(action);
    }
    super.perform(action);
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
    params.add(new KeyValuePairAlpha(Constants.ACTION, e.getActionCommand()));
    setCursor(waitCursor);
    boolean result = contactServer(params);
    setCursor(defaultCursor);
    if (result && (
      Constants.ACTION_OK.equals(e.getActionCommand())
    || Constants.ACTION_CANCEL.equals(e.getActionCommand()) 
    )) {
      setVisible(false);
      AppletGlobal.getInstance().currentDialog = null;
    }
  }

  @Override
  public boolean contactServer(Vector<KeyValuePairAlpha> params) {
    attributeList.extendParams(params);
    table.extendParams(params);
    return super.contactServer(params);
  }

  @Override
  public void windowClosing(WindowEvent e) {
    super.windowClosing(e);
    AppletGlobal.getInstance().currentDialog = null;
  }

  @Override
  public void closeInstance() {
    contactServer(Constants.ACTION_CANCEL);
    super.closeInstance();
  }

}
