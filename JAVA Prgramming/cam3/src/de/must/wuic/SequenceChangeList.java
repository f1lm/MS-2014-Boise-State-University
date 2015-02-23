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

package de.must.wuic;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.DefaultListModel;
import javax.swing.JList;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.ListSelectionModel;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

import de.must.middle.ImageResource;

public class SequenceChangeList extends JPanel {
  
  private JList<String> list;
  private DefaultListModel<String> model;
  private MustButton buttonUp;
  private MustButton buttonDn;
  
  public SequenceChangeList(DefaultListModel<String> model, ImageResource imageResource) {
    this.model = model;
    list = new JList<String>(model);
    list.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
    JScrollPane scrollPane = new JScrollPane(list);
    scrollPane.setPreferredSize(new Dimension(150, 200));
    add(scrollPane);
    buttonUp = MustButton.create("Up24.gif", "Up", imageResource);
    buttonDn = MustButton.create("Down24.gif", "Dn", imageResource);
    JPanel buttonPanel = new JPanel();
    buttonPanel.setLayout(new BorderLayout());
    buttonPanel.add(buttonUp, BorderLayout.NORTH);
    buttonPanel.add(buttonDn, BorderLayout.SOUTH);
    add(buttonPanel);
    buttonUp.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        switchItem(-1);
      }
    });
    buttonDn.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        switchItem(1);
      }
    });
    list.addListSelectionListener(new ListSelectionListener() {
      public void valueChanged(ListSelectionEvent e) {
        controlEnabling();
      }
    });
    controlEnabling();
  }
  
  public void setSortButtonsVisible(boolean b) {
    buttonUp.setVisible(b);
    buttonDn.setVisible(b);
  }
  
  public JList<String> getList() {
    return list;
  }
  
  private void switchItem(int offset) {
    int sel = list.getSelectedIndex();
    String elementToSwitchWith = (String)model.getElementAt(sel + offset);
    model.setElementAt((String)model.getElementAt(sel), sel + offset);
    model.setElementAt(elementToSwitchWith, sel);
    list.setSelectedIndex(sel + offset);
    controlEnabling();
  }
  
  private void controlEnabling() {
    buttonUp.setEnabled(list.getSelectedIndex() > 0);
    buttonDn.setEnabled(list.getSelectedIndex() >= 0 && list.getSelectedIndex() < list.getModel().getSize()-1);
  }

}
