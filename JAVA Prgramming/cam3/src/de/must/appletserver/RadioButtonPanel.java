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

package de.must.appletserver;

import de.must.applet.Constants;
import de.must.middle.ApplConstStd;
import de.must.util.KeyValuePair;

public class RadioButtonPanel extends MustInputField implements ActionInterpreter {
  
  protected String[] keys;
  protected String[] labels;
  protected String defaultValue;
  protected boolean required = false;
  private RemoteItemListener itemListener;
  protected String value;
  protected String editBeginValue = "";
  
  public RadioButtonPanel(SessionData sessionData, String[] keys, String[] labels) {
    super(sessionData);
    this.keys = keys;
    this.labels = labels;
  }
  
  public RadioButtonPanel(SessionData sessionData, KeyValuePair[] content) {
    super(sessionData);
    this.keys = new String[content.length];
    defaultValue = keys[0];
  }

  /**
   * Sets the item listener (unique).
   * @param l the item listener
   */
  public void addItemListener(RemoteItemListener l) {
    itemListener = l;
  }
  
//  public void setEnabled(int index, boolean b) {
//    rb[index].setEnabled(b);
//  }
//  
  public void setSelectedItem(int index) {
    value = keys[index];
  }
  
  public int getSelectedItem() {
    for (int i = 0; i < keys.length; i++) {
      if (keys[i].equals(value)) return i;
    }
    return -1;
  }

  public void setSelectedKeyAsEditBeginValue(String key) {
    editBeginValue = key;
    setSelectedKey(key);
  }

  public void setSelectedKey(String key) {
    value = key;
  }

  public String getSelectedKey() {
    return value;
  }

  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    String fetchedValue = (String)request.getParameter(name);
    if (fetchedValue != null) {
      value = fetchedValue;
    }
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    String keyString = keys[0];
    for (int i = 1; i < keys.length; i++) {
      keyString += ApplConstStd.MAIN_SEPARATOR + keys[i];
    }
    String meaningString = labels[0];
    for (int i = 1; i < labels.length; i++) {
      meaningString += ApplConstStd.MAIN_SEPARATOR + labels[i];
    }
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TODO_TAG_BEGIN + Constants.CREATE_RADIOBUTTONS + Constants.TODO_TAG_END);
    out.println(Constants.ID_TAG_BEGIN + name + Constants.ID_TAG_END);
    out.println(Constants.VARIANT1_TAG_BEGIN + keyString + Constants.VARIANT1_TAG_END);
    out.println(Constants.VARIANT2_TAG_BEGIN + meaningString + Constants.VARIANT2_TAG_END);
    if (itemListener != null) {
      out.println(Constants.VARIANT3_TAG_BEGIN + Constants.ITEM_LISTENER + Constants.VARIANT3_TAG_END);
    }
    out.println(Constants.ACTION_END_TAG);
    super.buildRemoteView(out);
    setValues(out);
  }

  @Override
  public void setValues(ToAppletWriter out) {
    out.setValue(name, value);
  }

  @Override
  public boolean perform(String action) {
    if (Constants.ACTION_ITEM_SELECTED.equals(action)) {
      if (itemListener != null) {
        itemListener.itemStateChanged();
      }
      
    }
    return false;
  }

  @Override
  public void destroy() {
  }

  /**
   * Indicates whether the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled() {
    return true;
  }

  public boolean isModified() {
    return(!getSelectedKey().trim().equals(editBeginValue.trim()));
  }
  
  public boolean isValid() {
    return true;
  }

  /**
   * Indicates whether the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isContentValid() {
    return true;
  }

  /**
   * Indicates whether the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {
    return false;
  }

  @Override
  public void selectAll() {
    // not needed here
  }

  @Override
  public void requestFocus() {
    // not needed here
  }
  
}
