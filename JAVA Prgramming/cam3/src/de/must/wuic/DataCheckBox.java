/*
 * Copyright (c) 1999-2009 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.*;
import de.must.middle.GlobalStd;

import java.util.*;

/**
 * @author Christoph Mueller
 */
public class DataCheckBox extends MustCheckBox implements DataComponent {

  private DataObject assignedDataObject;
  private String columnName;
  private boolean loadValue;
  private boolean editBeginValue;
  private boolean required = false;

 /**
   * @param dO the data object to assign to
   * @param columnName the triggering column's name
   */
  public DataCheckBox(DataObject dO, String columnName) {
    this(dO, columnName, columnName);
  }

 /**
   * @param dO the data object to assign to
   * @param columnName the triggering column's name
   * @param label the the triggering column's label
   */
  public DataCheckBox(DataObject dO, String columnName, String label) {
    super(label);
    assignedDataObject = dO;
    this.columnName = columnName;
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
   * Sets the flag that determines whether or not this component is editable.
   * If the flag is set to true, this component becomes user editable.
   * If the flag is set to false, the cannot change the text of this text
   * component.
   * @param editable a flag indicating whether this component should be user editable
   */
  public void setEditable(boolean editable) {
    this.setEnabled(editable);
  }

 /**
   * Determines whether input is required (mandatory).
   * @param required if true, input is mandatory; otherwise, input is not mandatory
   */
  public void setRequired(boolean required) {
    this.required = required;
  }

  /**
   * Sets the CheckBox to selected and indicates that it's the initial value
   * before editing.
   * Thus, we are not asked to cancel edit if we didn't change the value.
   * @param selected true if the checkbox is to be selected.
   */
  public void setEditBeginSelected(boolean selected) {
    setSelected(selected);
    editBeginValue = selected;
  }

 /**
   * Returns always true.
   * @return always true
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
    loadValue = assignedDataObject.getBoolean(columnName);
    this.setSelected(loadValue);
    editBeginValue = loadValue;
  }

  /**
   * Indicates whether the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled() {
    return(this.isSelected());
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    return(isSelected() != editBeginValue);
  }

  @Override
  public boolean isToSave() {
    return(isSelected() != loadValue);
  }

//------------------------------------------------------------------------------

  private Vector<ComponentModificationListener> componentModificationListeners;

  /**
   * Adds a component modification listener to this component.
   * Needed e.g. for data components depending from a sublist.
   * @param l component modification listener to add
   */
  public synchronized void addComponentModificationListener(ComponentModificationListener l) {
    Vector<ComponentModificationListener> v = componentModificationListeners == null ? new Vector<ComponentModificationListener>(2) : new Vector<ComponentModificationListener> (componentModificationListeners);
    if (!v.contains(l)) {
      v.addElement(l);
      componentModificationListeners = v;
    }
  }

  /**
   * Removes a component modification listener to this component.
   * Needed e.g. for data components depending from a sublist.
   * @param l component modification listener to add
   * @see DataList
   */
  public synchronized void removeComponentModificationListener(ComponentModificationListener l) {
    if (componentModificationListeners != null && componentModificationListeners.contains(l)) {
      Vector<ComponentModificationListener> v = new Vector<ComponentModificationListener> (componentModificationListeners);
      v.removeElement(l);
      componentModificationListeners = v;
    }
  }

  private void fireComponentModified() {
    if (componentModificationListeners != null) {
      Vector<ComponentModificationListener> listeners = componentModificationListeners;
      int count = listeners.size();
      for (int i = 0; i < count; i++) {
        listeners.elementAt(i).componentModified(new ComponentModifiedEvent());
      }
    }
  }

//------------------------------------------------------------------------------

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    assignedDataObject.setBoolean(columnName, this.isSelected());
  }

 /**
   * Releases external resources.
   */
  public void free() {
  }

}

