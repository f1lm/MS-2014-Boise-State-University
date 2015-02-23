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
 * Text input field for integer values with mechanism to make input permanent.
 * @author Christoph Mueller
 */
  public class DataIntField extends MustIntField implements Storable {

  private DataObject assignedDataObject;
  protected int defaultValue = 0;
  protected String editBeginValue = "";
  private boolean showZero = false;

  /**
   * Constructs a new integer text field with the specified name and assigned data object.
   * @param name the name of the field to be used for markup parameters
   * @param assignedDataObject the assigned data object
   */
  public DataIntField(String name, DataObject assignedDataObject) {
    super(name);
    this.assignedDataObject = assignedDataObject;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    int loadInt = assignedDataObject.getInt(name);
    Integer iv = new Integer(loadInt);
    editBeginValue = iv.toString();
    if (!showZero & loadInt == 0) editBeginValue = "";
    if (loadInt == 0 & assignedDataObject.getMode() == DataObject.INSERTMODE) editBeginValue = new Integer(defaultValue).toString();
    this.setText(editBeginValue);
  }

  /**
   * Indicates whether the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled() {
    return(!this.getText().trim().equals(""));
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    return(!this.getText().equals(editBeginValue));
  }

  /**
   * Returns true if the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {
    return false;
  }

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    String[] idCol = assignedDataObject.getIdentifyTemplate().getIdentifyColumnNames();
    if (!(idCol.length == 1 && name.equals(idCol[0]))) { // method "copy" must not change unique key name! For any other methods it is not needed to save from frame.
      if (this.getText().equals("")) {
        assignedDataObject.setInt(name, 0);
      } else {
        assignedDataObject.setInt(name, this.getIntValue());
      }
    }
  }

}
