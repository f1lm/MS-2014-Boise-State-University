/*
 * Copyright (c) 2004-2013 Christoph Mueller. All rights reserved.
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

import java.awt.FlowLayout;
import java.awt.event.ActionListener;

import javax.swing.ButtonGroup;
import javax.swing.JPanel;
import javax.swing.JRadioButton;

public class RadioButtonPanel extends JPanel {
  
  protected String[] keys;
  protected String[] labels;
  protected ButtonGroup group = new ButtonGroup();
  protected JRadioButton[] rb;
  protected String editBeginValue = "";
  
  public RadioButtonPanel(String[] keys, String[] labels) {
    this.keys = keys;
    this.labels = labels;
    ((FlowLayout)getLayout()).setHgap(0);
    ((FlowLayout)getLayout()).setVgap(0);
    rb = new JRadioButton[labels.length];
    for (int i = 0; i < labels.length; i++) {
      rb[i] = new JRadioButton(labels[i]);
      group.add(rb[i]);
      add(rb[i]);
    }
  }
  
  public void setToolTipText(int index, String text) {
    rb[index].setToolTipText(text);
  }
  
  @Override
  public void setEnabled(boolean enabled) {
    super.setEnabled(enabled);
    for (JRadioButton radioButton : rb) {
      radioButton.setEnabled(enabled);
    }
  }

  public void setEnabled(int index, boolean b) {
    rb[index].setEnabled(b);
  }
  
  public void setSelectedItem(int index) {
    rb[index].setSelected(true);
  }
  
  public int getSelectedItem() {
    for (int i = 0; i < rb.length; i++) {
      if (rb[i].isSelected()) return i;
    }
    return -1;
  }

  public void setSelectedKeyAsEditBeginValue(String key) {
    editBeginValue = key;
    setSelectedKey(key);
  }

  public void setSelectedKey(String key) {
    for (int i = 0; i < rb.length; i++) {
      if (keys[i].trim().equals(key.trim())) {
        rb[i].setSelected(true);
        break;
      }
    }
  }

  public String getSelectedKey() {
    for (int i = 0; i < rb.length; i++) {
      if (rb[i].isSelected()) return keys[i];
    }
    return "";
  }

  public void addActionListener(ActionListener l) {
    for (int i = 0; i < rb.length; i++) {
      rb[i].addActionListener(l);
    }
  }
  
  public boolean isModified() {
    return(!getSelectedKey().trim().equals(editBeginValue.trim()));
  }
  
}
