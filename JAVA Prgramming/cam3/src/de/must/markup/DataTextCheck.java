/*
 * Copyright (c) 1999-2002 Christoph Mueller. All rights reserved.
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
 * A database connected group of radio buttons.
 * @author Christoph Mueller
 */
public class DataTextCheck extends RadioButtonGroup implements Storable {

  private static final int STORE_AS_STRING = 0;
  private static final int STORE_AS_INT = 1;
  private int storeType = STORE_AS_STRING;
  
  private String[] keys;
  private DataObject assignedDataObject;
  private String columnName;
  private String defaultValue = "";
  private String editBeginValue;
  private boolean required = false;

  /**
   * Constructs a new group of radio buttons.
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   * @param keys the valid keys to be stored in the assigned table
   * @param meaning the meaning of the keys to be displayed as check text
   */
  public DataTextCheck(DataObject dO, String columnName, int[] keys, String[] meaning) {
    this(dO, columnName, getStringKeys(keys), meaning);
    storeType = STORE_AS_INT;
  }

  private static synchronized String[] getStringKeys(int[] keys) {
    String[] stringKeys = new String[keys.length];
    for (int i = 0; i < keys.length; i++) {
			stringKeys[i] = String.valueOf(keys[i]);
		}
    return stringKeys;
  }

  /**
   * Constructs a new group of radio buttons.
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   * @param keys the valid keys to be stored in the assigned table
   * @param meaning the meaning of the keys to be displayed as check text
   */
  public DataTextCheck(DataObject dO, String columnName, String[] keys, String[] meaning) {
    super(columnName, meaning, keys);
    assignedDataObject = dO;
    this.columnName = columnName;
    this.keys = keys;
  }

 /**
   * Returns the assigned data object.
   * @return the assigned data object
   */
  public DataObject getAssignedDataObject() {
    return assignedDataObject;
  }

 /**
   * Determines whether input is required (mandatory).
   * @param required if true, input is mandatory; otherwise, input is not mandatory
   */
  public void setRequired(boolean required) {
    this.required = required;
  }

  /**
   * Selects all input of the component, if it is supported - e.g. in JTextField.
   * Allows easy new input, because the previous value is reseted when the
   * first key stroke occurs.
   */
  public void selectAll() {
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    switch (storeType) {
    case STORE_AS_STRING:
      editBeginValue = assignedDataObject.getText(columnName);
      break;
    case STORE_AS_INT:
      editBeginValue = String.valueOf(assignedDataObject.getInt(columnName));
      break;
    }  
    if (editBeginValue.trim().equals("") & assignedDataObject.getMode() == DataObject.INSERTMODE) editBeginValue = defaultValue;
    setSelectedIndex(-1);
    for (int i = 0; i < keys.length; i++) {
      if (keys[i].trim().equals(editBeginValue.trim())) {
        setSelectedIndex(i);
      }
    }
  }

  /**
   * Indicates whether the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled() {
    return true;
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    String currentValue = null;
    if (getSelectedIndex() != -1) {
      currentValue = keys[getSelectedIndex()];
    }
    return !currentValue.equals(editBeginValue);
  }

  /**
   * Indicates whether the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isValid() {
    return true;
  }

  /**
   * Indicates whether the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {
    return false;
  }

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    String currentValue = null;
    if (getSelectedIndex() != -1) {
      currentValue = keys[getSelectedIndex()];
      switch (storeType) {
      case STORE_AS_STRING:
        assignedDataObject.setText(columnName, currentValue);
        break;
      case STORE_AS_INT:
        assignedDataObject.setInt(columnName, Integer.parseInt(currentValue));
        break;
      }  
    }
  }

}
