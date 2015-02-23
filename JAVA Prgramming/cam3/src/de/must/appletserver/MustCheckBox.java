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
import de.must.util.Miscellaneous;

public class MustCheckBox extends RemoteElement implements ActionInterpreter {
  
  protected String label;
  private RemoteItemListener itemListener;
  protected boolean editable;
  protected boolean value;

  public MustCheckBox(SessionData sessionData, String label) {
    super(sessionData);
    this.label = Miscellaneous.getReplacement(label);
  }

  /**
   * Sets the item listener (unique).
   * @param l the item listener
   */
  public void addItemListener(RemoteItemListener l) {
    itemListener = l;
  }
  
  /**
   * Sets the flag that determines whether or not this component is editable.
   * This means: value may be changed by user. It does not mean, that user may type in 
   * characters. To allow this, use setEditableForUserTyping.
   * If the flag is set to true, this component becomes user editable.
   * If the flag is set to false, the cannot change the text of this text
   * component.
   * @param editable a flag indicating whether this component should be user editable
   * @see #setEditableForUserTyping
   */
  public void setEditable(boolean editable) {
    this.editable = editable;
    // super.setEditable(editableForUserTyping && editable);
  }
  
  public void setSelected(boolean selected) {
    value = selected;
  }

  @Override
  public void setValues(ToAppletWriter out) {
    out.setValue(name, Boolean.toString(value));
    super.setValues(out);
  }
  
  /**
   * Returns the label of the check box.
   * @return the label of the check box
   */
  public String getText() {
    return label;
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    beginAction(out);
    out.println(Constants.TODO_TAG_BEGIN + Constants.CREATE_CHECKBOX + Constants.TODO_TAG_END);
    out.println(Constants.LABEL_BEGIN + label + Constants.LABEL_END);
    out.println(Constants.VALUE_TAG_BEGIN + Boolean.toString(value) + Constants.VALUE_TAG_END);
    if (itemListener != null) {
      out.println(Constants.VARIANT3_TAG_BEGIN + Constants.ITEM_LISTENER + Constants.VARIANT3_TAG_END);
    }
    endAction(out);
    super.buildRemoteView(out);
  }

  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    String fetchedValue = (String)request.getParameter(name);
    if (fetchedValue != null) {
      value = Boolean.parseBoolean(fetchedValue);
    }
  }
  
  @Override
  public boolean perform(String action) {
    if (Constants.ACTION_ITEM_SELECTED.equals(action) && name.equals(sessionData.actionSource)) {
      if (itemListener != null) {
        itemListener.itemStateChanged();
        return true;
      }
    }
    return false;
  }

  public boolean isSelected() {
    return value;
  }

  @Override
  public void selectAll() {
    // not necessary here
  }

  @Override
  public void requestFocus() {
    // not necessary here
  }

  @Override
  public void destroy() {
  }

}
