/*
 * Copyright (c) 2011-2014 Christoph Mueller. All rights reserved.
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

package de.must.appletserver;

import java.sql.Time;
import java.util.Vector;

import de.must.applet.Constants;

/**
 * Inquiry history with to navigate through former inquiries.
 * @author Christoph Mueller
 */
public class InquiryHistory {
  
  class Snapshot {
    Time time;
    Vector<String> values = new Vector<String>(); 
  }
  
  private Vector<MustTextField> textFields = new Vector<MustTextField>();
  private Vector<MustComboBox> comboBoxes = new Vector<MustComboBox>();
  private Vector<MustCheckBox> checks = new Vector<MustCheckBox>();
  private Vector<RadioButtonPanel> rbp = new Vector<RadioButtonPanel>();
  private Vector<CleartextClassification> classis = new Vector<CleartextClassification>();
  private Vector<Snapshot> history = new Vector<Snapshot>();
  private int index;
  private boolean ignoreSnapshot;
  
  /**
   * Constructs a new InquiryHistory. 
   */
  public InquiryHistory() {
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
      for (int i = 0; i < textFields.size(); i++) {
        snapshot.values.add(valueIndex, textFields.get(i).getText());
        valueIndex++;
      }
      for (int i = 0; i < comboBoxes.size(); i++) {
        snapshot.values.add(valueIndex, (String)comboBoxes.get(i).getSelectedItem());
        valueIndex++;
      }
      for (MustCheckBox check : checks) {
        snapshot.values.add(valueIndex, check.isSelected()?"true":"false");
        valueIndex++;
      }
      for (RadioButtonPanel rb : rbp) {
        snapshot.values.add(valueIndex, rb.getSelectedKey());
        valueIndex++;
      }
      for (CleartextClassification classi : classis) {
        snapshot.values.add(valueIndex, Integer.toString(classi.getSelectedInternalNumber()));
        valueIndex++;
      }
      history.add(snapshot);
      index = history.size() - 1;
    }
  }
  
  protected void synchronizeForward() {
    if (index < history.size()-1 ) {
      index++;
      recoverSnapshot();
    }
  }

  protected void synchronizeBackward() {
    if (index > 0 ) {
      index--;
      recoverSnapshot();
    }
  }
  
  private void recoverSnapshot() {
    int valueIndex = 0;
    for (int i = 0; i < textFields.size(); i++) {
      textFields.get(i).setText(history.get(index).values.get(valueIndex));
      valueIndex++;
    }
    for (int i = 0; i < comboBoxes.size(); i++) {
      comboBoxes.get(i).setSelectedItem(history.get(index).values.get(valueIndex));
      valueIndex++;
    }
    for (MustCheckBox check : checks) {
      check.setSelected("true".equals(history.get(index).values.get(valueIndex)));
      valueIndex++;
    }
    for (RadioButtonPanel rb : rbp) {
      rb.setSelectedKey(history.get(index).values.get(valueIndex));
      valueIndex++;
    }
    for (CleartextClassification classi : classis) {
      classi.setSelectedInternalNumber(Integer.valueOf(history.get(index).values.get(valueIndex)));
      valueIndex++;
    }
  }
  
  public void setVisible(boolean aFlag) {
    // ui.setVisible(aFlag);
  }
  
  public void clear() {
    history.clear();
    index = 0;
  }
  
  public void updateRemoteView(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.CONCERNING_SUBLEVEL1_BEGIN_TAG + Constants.SEARCH + Constants.CONCERNING_SUBLEVEL1_END_TAG);
    out.println(Constants.TODO_TAG_BEGIN + Constants.SET_INQUIRY_HISTORY + Constants.TODO_TAG_END);
    out.println(Constants.VARIANT1_TAG_BEGIN + history.size() + Constants.VARIANT1_TAG_END);
    out.println(Constants.VARIANT2_TAG_BEGIN + index + Constants.VARIANT2_TAG_END);
    out.println(Constants.ACTION_END_TAG);
  }

}
