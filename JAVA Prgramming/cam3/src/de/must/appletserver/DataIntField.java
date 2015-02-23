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

import de.must.dataobj.*;
import de.must.middle.GlobalStd;

/**
 * Database connected text input field for integer values.
 * @author Christoph Mueller
 */
public class DataIntField extends MustIntField implements Storable {

  protected DataObject assignedDataObject;
  protected String columnName;
  protected int defaultValue = 0;
  private String loadValue = "";
  protected String editBeginValue = "";
  private boolean required = false;
  private boolean showZero = false;

  /**
   * Constructs a database connected text input field for integer values.
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   */
  public DataIntField(SessionData sessionData, DataObject dO, String columnName) {
    super(sessionData);
    int columnLength = dO.getColumnLength(columnName);
    if (columnLength > 0) {
      String maxValueString = "";
      for (int i = 1; i <= columnLength; i++) {
        maxValueString += "9";
      }
      if (maxValueString.length() >= String.valueOf(Integer.MAX_VALUE).length());
      else setMaxValue(Integer.parseInt(maxValueString));
    }
    assignedDataObject = dO;
    this.columnName = columnName;
    showZero = showZeroValueByDefault;
    if (GlobalStd.readOnly) setEditable(false);
  }

 /**
   * Returns the assigned data object.
   * @return the assigned data object
   */
  public DataObject getAssignedDataObject() {
    return assignedDataObject;
  }

 /**
   * Sets the default value.
   * @param newDefaultValue the new default value.
   */
  public void setDefaultValue(int newDefaultValue) {
    this.defaultValue = newDefaultValue;
  }

 /**
   * Sets zero values to be shown or not.
   * @param newShowZero if true, zero is represented by "0",
   * if false, zero is represented by ""
   */
  public void setShowZero(boolean newShowZero) {
    this.showZero = newShowZero;
  }

 /**
   * Determines whether input is required (mandatory).
   * @param required if true, input is mandatory; otherwise, input is not mandatory
   */
  public void setRequired(boolean required) {
    this.required = required;
  }

  /**
   * Sets the int as edit begin value which causes isModified to return false
   * as long as user doesn't change the value.
   * @param newIntValue the new integer value
   */
  public void setIntAsEditBeginValue(int newIntValue) {
    setIntValue(newIntValue);
    editBeginValue = getText();
  }

  /**
   * Sets the text as edit begin value which causes isModified to return false
   * as long as user doesn't change the value.
   * @param newText the new text
   */
  public void setTextAsEditBeginValue(String text) {
    setText(text);
    editBeginValue = text;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    int loadInt = assignedDataObject.getInt(columnName);
    Integer iv = new Integer(loadInt);
    loadValue = iv.toString();
    if (loadInt == 0 & assignedDataObject.getMode() == DataObject.INSERTMODE) loadValue = new Integer(defaultValue).toString();
    if (!showZero & loadInt == 0) loadValue = "";
    setText(loadValue);
    editBeginValue = loadValue;
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
    return(!getText().equals(editBeginValue));
  }

  public boolean isToSave() {
    return(!getText().equals(loadValue));
  }
  
  /**
   * Indicates whether the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {
    if (required & getIntValue() == 0) return true;
    return false;
  }

//------------------------------------------------------------------------------

//  private Vector<ComponentModificationListener> componentModificationListeners;
//
//  /**
//   * Adds a component modification listener to this component.
//   * Needed e.g. for data components depending from a sublist.
//   * @param l component modification listener to add
//   */
//  public synchronized void addComponentModificationListener(ComponentModificationListener l) {
//    Vector<ComponentModificationListener> v = componentModificationListeners == null ? new Vector<ComponentModificationListener>(2) : new Vector<ComponentModificationListener> (componentModificationListeners);
//    if (!v.contains(l)) {
//      v.addElement(l);
//      componentModificationListeners = v;
//    }
//  }
//
//  /**
//   * Removes a component modification listener to this component.
//   * Needed e.g. for data components depending from a sublist.
//   * @param l component modification listener to add
//   * @see DataList
//   */
//  public synchronized void removeComponentModificationListener(ComponentModificationListener l) {
//    if (componentModificationListeners != null && componentModificationListeners.contains(l)) {
//      Vector<ComponentModificationListener> v = new Vector<ComponentModificationListener> (componentModificationListeners);
//      v.removeElement(l);
//      componentModificationListeners = v;
//    }
//  }
//
//  private void fireComponentModified() {
//    if (componentModificationListeners != null) {
//      Vector<ComponentModificationListener> listeners = componentModificationListeners;
//      int count = listeners.size();
//      for (int i = 0; i < count; i++) {
//        listeners.elementAt(i).componentModified(new ComponentModifiedEvent());
//      }
//    }
//  }

//------------------------------------------------------------------------------

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    String[] idCol = assignedDataObject.getIdentifyTemplate().getIdentifyColumnNames();
    if (!(idCol.length == 1 && columnName.equals(idCol[0]))) { // method "copy" must not change unique key name! For any other methods it is not needed to save from frame.
      if (this.getText().equals("")) {
        assignedDataObject.setInt(columnName, 0);
      } else {
        assignedDataObject.setInt(columnName, this.getIntValue());
      }
    }
  }

 /**
   * Releases external resources.
   */
  public void free() {
  }

}

