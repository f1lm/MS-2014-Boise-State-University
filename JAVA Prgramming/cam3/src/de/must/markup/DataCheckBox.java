/*
 * Copyright (c) 2001 Christoph Mueller. All rights reserved.
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

package de.must.markup;

import de.must.dataobj.*;

/**
 * CheckBox with mechanism to make input permanent.
 * @author Christoph Mueller
 */
public class DataCheckBox extends MustCheckBox implements Storable {

  private DataObject assignedDataObject;
  private String trueString;
  private String falseString;
  private boolean editBeginValue = false;

  /**
   * Constructs a new data check box
   * @param assignedDataObject the assigned data object
   * @param columnName the triggering column's name
   * @param checkText the right-most label
   */
  public DataCheckBox(DataObject assignedDataObject, String columnName, String checkText) {
    super(columnName, checkText);
    this.assignedDataObject = assignedDataObject;
  }

  public DataCheckBox(DataObject assignedDataObject, String columnName, String checkText, String trueString, String falseString) {
    super(columnName, checkText);
    this.assignedDataObject = assignedDataObject;
    this.trueString = trueString;
    this.falseString = falseString;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    if (trueString == null) {
      editBeginValue = assignedDataObject.getBoolean(name);
    } else {
      editBeginValue = assignedDataObject.getText(name).trim().equals(trueString);
    }
    this.setSelected(editBeginValue);
  }

  /**
   * Returns true if the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
 public boolean isModified() {
    return(this.isSelected() != editBeginValue);
  }

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    if (trueString == null) {
      assignedDataObject.setBoolean(name, isSelected());
    } else {
      if (isSelected()) {
        assignedDataObject.setText(name, trueString);
      } else {
        assignedDataObject.setText(name, falseString);
      }
    }
  }

}
