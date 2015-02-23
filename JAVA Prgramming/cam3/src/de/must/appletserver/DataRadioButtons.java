/*
 * Copyright (c) 2011 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.*;
import de.must.util.KeyValuePair;

/**
 * A database connected group of radio buttons.
 * @author Christoph Mueller
 */
public class DataRadioButtons extends RadioButtonPanel implements Storable {

  private static final int STORE_AS_STRING = 0;
  private static final int STORE_AS_INT = 1;
  private int storeType = STORE_AS_STRING;
  
  private DataObject assignedDataObject;
  private String columnName;

  /**
   * Constructs a new group of radio buttons.
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   * @param keys the valid keys to be stored in the assigned table
   * @param meaning the meaning of the keys to be displayed as check text
   */
  public DataRadioButtons(SessionData sessionData, DataObject dO, String columnName, int[] keys, String[] meaning) {
    this(sessionData, dO, columnName, getStringKeys(keys), meaning);
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
  public DataRadioButtons(SessionData sessionData, DataObject dO, String columnName, String[] keys, String[] meaning) {
    super(sessionData, keys, meaning);
    assignedDataObject = dO;
    this.columnName = columnName;
    defaultValue = keys[0];
  }

  /**
   * Constructs a new group of radio buttons.
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   * @param content the content described by an array of KeyValuePair
   */
  public DataRadioButtons(SessionData sessionData, DataObject dO, String columnName, KeyValuePair[] content) {
    super(sessionData, content);
    assignedDataObject = dO;
    this.columnName = columnName;
    this.keys = new String[content.length];
    defaultValue = keys[0];
  }

 /**
   * Returns the assigned data object.
   * @return the assigned data object
   */
  public DataObject getAssignedDataObject() {
    return assignedDataObject;
  }

// /**
//   * Sets the flag that determines whether or not this component is editable.
//   * If the flag is set to true, this component becomes user editable.
//   * If the flag is set to false, the cannot change the text of this text
//   * component.
//   * @param editable a flag indicating whether this component should be user editable
//   */
//  public void setEditable(boolean editable) {
//    for (int i = 0; i < keys.length; i++) {
//      checks[i].setEnabled(editable);
//    }
//  }

 /**
   * Determines whether input is required (mandatory).
   * @param required if true, input is mandatory; otherwise, input is not mandatory
   */
  public void setRequired(boolean required) {
    this.required = required;
  }

  /**
   * Selects all input of the component, if it is supported - e.g. in JTextField.
   * Allows easy new input, because the previous value is reset when the
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
    value = editBeginValue;
    if (editBeginValue.trim().equals("") & assignedDataObject.getMode() == DataObject.INSERTMODE) editBeginValue = defaultValue;
  }

//------------------------------------------------------------------------------

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    switch (storeType) {
    case STORE_AS_STRING:
      assignedDataObject.setText(columnName, value);
      break;
    case STORE_AS_INT:
      assignedDataObject.setInt(columnName, Integer.parseInt(value));
      break;
    }  
  }

 /**
   * Releases external resources.
   */
  public void free() {
  }

}
