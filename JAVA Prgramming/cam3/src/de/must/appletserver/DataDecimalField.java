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
import de.must.middle.GlobalStd;

/**
 * Database connected text input field for decimal values.
 * @author Christoph Mueller
 */
public class DataDecimalField extends MustDecimalField implements Storable {

  private DataObject assignedDataObject;
  private String columnName;
  private double defaultValue = 0;
  protected double loadValue;

  /**
   * Constructs a database connected text input field for decimal values.
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   */
  public DataDecimalField(SessionData sessionData, DataObject dO, String columnName) {
    super(sessionData);
    assignedDataObject = dO;
    this.columnName = columnName;
    if (GlobalStd.readOnly) setEditable(false);
  }

 /**
   * Sets the default value.
   * @param newDefaultValue the new default value.
   */
  public void setDefaultValue(double newDefaultValue) {
    this.defaultValue = newDefaultValue;
  }

 /**
   * Returns the assigned data object.
   * @return the assigned data object
   */
  public DataObject getAssignedDataObject() {
    return assignedDataObject;
  }

  /**
   * Sets the double as edit begin value which causes isModified to return false
   * as long as user doesn't change the value.
   * @param newDoubleValue the new double value
   */
  public void setDoubleAsEditBeginValue(double newDoubleValue) {
    setDoubleValue(newDoubleValue);
    String editBeginText = decimalFieldFormat.format(newDoubleValue);
    this.setText(editBeginText);
    try {
      editBeginValue = getDoubleValue();
      if (editBeginValue == 0 & assignedDataObject.getMode() == DataObject.INSERTMODE) {
        this.setText(defaultValue);
        editBeginValue = defaultValue;
      }
    } catch (Exception ex) {}
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    loadValue = assignedDataObject.getDouble(columnName);
    setDoubleAsEditBeginValue(loadValue);
   }

  /**
   * Indicates whether the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {
//    if (this.isRequired() & this.getText().trim().equals("")) return true;
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

  public boolean isToSave() {
    try {
      double dv = getDoubleValue();
      return (dv != loadValue);
    }
    catch (Exception ex) {
      return true;
    }
  }
  
  /**
   * Stores the component's value.
   */
  public void saveValue() {
    try {
      double dv = getDoubleValue();
      assignedDataObject.setDouble(columnName, dv);
    }
    catch (Exception ex) {
      de.must.io.Logger.getInstance().error(getClass(), ex);
    }
  }

 /**
   * Releases external resources.
   */
  public void free() {
  }

}
