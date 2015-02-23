/*
 * Copyright (c) 2010 Christoph Mueller. All rights reserved.
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
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Time;
import java.util.Locale;
import java.util.Vector;

import javax.swing.JPanel;

import de.must.util.Callback;

/**
 * Inquiry history with user interface to navigate through former inquiries.
 * @author Christoph Mueller
 */
public class InquiryHistory {
  
  class Snapshot {
    Time time;
    Vector<String> values = new Vector<String>(); 
  }
  
  private Callback callback;
  private Vector<MustTextField> textFields = new Vector<MustTextField>();
  private Vector<MustComboBox> comboBoxes = new Vector<MustComboBox>();
  private Vector<MustCheckBox> checks = new Vector<MustCheckBox>();
  private Vector<RadioButtonPanel> rbp = new Vector<RadioButtonPanel>();
  private Vector<CleartextClassification> classis = new Vector<CleartextClassification>();
  private Vector<Snapshot> history = new Vector<Snapshot>();
  private int index;
  private JPanel ui = new JPanel();
  private MustButton buttonBack ;
  private MustButton buttonForward;
  private boolean ignoreSnapshot;
  
  /**
   * Constructs a new InquiryHistory. 
   * @param callback the callback for navigation events
   */
  public InquiryHistory(Locale locale, Callback callback) {
    this.callback = callback;
    ui.setLayout(new FlowLayout(FlowLayout.LEFT, 0, 0));
    buttonBack = MustButton.create("Back24.gif", "<");
    buttonBack.setToolTipText(WuicGlobal.getInstance(locale).getResourceString("TEXT_PREVIOUS_INQUIRY"));
    ui.add(buttonBack);
    buttonBack.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        synchronizeBackward();
        ignoreSnapshot = true;
        InquiryHistory.this.callback.callback();
        ignoreSnapshot = false;
      }
    });
    buttonForward = MustButton.create("Forward24.gif", ">");
    buttonForward.setToolTipText(WuicGlobal.getInstance(locale).getResourceString("TEXT_NEXT_INQUIRY"));
    ui.add(buttonForward);
    buttonForward.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        synchronizeForward();
        ignoreSnapshot = true;
        InquiryHistory.this.callback.callback();
        ignoreSnapshot = false;
      }
    });
    controlEnabling();
  }
  
  /**
   * Returns the user interface for navigation.
   * @return the user interface for navigation
   */
  public JPanel getUI() {
    return ui;
  }
  
  /**
   * Registers a text field to be recovered by inquiry history.
   * @param textField the text field to register
   */
  public void register(MustTextField textField) {
    textFields.add(textField);
  }
  
  /**
   * Registers a combobox to be recovered by inquiry history.
   * @param textField the combobox to register
   */
  public void register(MustComboBox comboBox) {
    comboBoxes.add(comboBox);
  }
  
  public void register(MustCheckBox check) {
    checks.add(check);
  }
  
  public void register(RadioButtonPanel radioButtonPanel) {
    rbp.add(radioButtonPanel);
  }
  
  public void register(CleartextClassification classi) {
    classis.add(classi);
  }
  
  /**
   * Adds a snapshot of an inquiry condition.
   */
  public void addSnapshot() {
    if (!ignoreSnapshot) {
      int valueIndex = 0;
      Snapshot snapshot = new Snapshot();
      for (MustTextField textField : textFields) {
        snapshot.values.add(valueIndex, textField.getText());
        valueIndex++;
      }
      for (MustComboBox comboBox : comboBoxes) {
        snapshot.values.add(valueIndex, (String)comboBox.getSelectedItem());
        valueIndex++;
      }
      for (MustCheckBox check : checks) {
        snapshot.values.add(valueIndex, Boolean.toString(check.isSelected()));
        valueIndex++;
      }
      for (RadioButtonPanel radioButtonPanel : rbp) {
        snapshot.values.add(valueIndex, radioButtonPanel.getSelectedKey());
        valueIndex++;
      }
      for (CleartextClassification classi : classis) {
        snapshot.values.add(valueIndex, Integer.toString(classi.getSelectedInternalNumber()));
        valueIndex++;
      }
      history.add(snapshot);
      index = history.size() - 1;
      controlEnabling();
    }
  }
  
  private void synchronizeForward() {
    if (index < history.size()-1 ) {
      index++;
      recoverSnapshot();
    }
  }

  private void synchronizeBackward() {
    if (index > 0 ) {
      index--;
      recoverSnapshot();
    }
  }
  
  private void recoverSnapshot() {
    int valueIndex = 0;
    for (MustTextField textField : textFields) {
      textField.setText(history.get(index).values.get(valueIndex));
      valueIndex++;
    }
    for (MustComboBox comboBox : comboBoxes) {
      comboBox.setSelectedItem(history.get(index).values.get(valueIndex));
      valueIndex++;
    }
    for (MustCheckBox check : checks) {
      check.setSelected(Boolean.parseBoolean(history.get(index).values.get(valueIndex)));
      valueIndex++;
    }
    for (RadioButtonPanel radioButtonPanel : rbp) {
      radioButtonPanel.setSelectedKey(history.get(index).values.get(valueIndex));
      valueIndex++;
    }
    for (CleartextClassification classi : classis) {
      classi.setSelectedInternalNumber(Integer.parseInt(history.get(index).values.get(valueIndex)));
      valueIndex++;
    }
    controlEnabling();
  }
  
  public void setVisible(boolean aFlag) {
    ui.setVisible(aFlag);
  }
  
  public void clear() {
    history.clear();
    index = 0;
    controlEnabling();
  }
  
  private void controlEnabling() {
    buttonBack.setEnabled(index > 0);
    buttonForward.setEnabled(index < history.size()-1);
  }

}
