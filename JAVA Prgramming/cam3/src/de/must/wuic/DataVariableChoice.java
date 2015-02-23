/*
 * Copyright (c) 2001-2009 Christoph Mueller. All rights reserved.
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
import de.must.util.KeyValuePair;
import java.util.*;

/**
 * @author Christoph Mueller
 */
public class DataVariableChoice extends VariableChoice implements DataComponent {

  private DataObject assignedDataObject;
  private String columnName;
  private String defaultValue = "";
  private String editBeginValue = "";
  private boolean required = false;

  /**
   * Constructs a new DataVariableChoice.
   * @param content the content to assign to
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   */
  public DataVariableChoice(String[][] content, DataObject dO, String columnName) {
    this(content, dO, columnName, false);
  }

  /**
   * Constructs a new DataVariableChoice.
   * @param content the content to assign to
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   * @param noChoicePossible if true, an item is offered which represents the "no choice"
   */
  public DataVariableChoice(String[][] content, DataObject dO, String columnName, boolean noChoicePossible) {
    this(content, dO, columnName, false, false);
  }

  /**
   * Constructs a new DataVariableChoice.
   * @param content the content to assign to
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   * @param noChoicePossible if true, an item is offered which represents the "no choice"
   * @param suppressKey whether or not keys should be suppressed in ComboBox
   */
  public DataVariableChoice(String[][] content, DataObject dO, String columnName, boolean noChoicePossible, boolean suppressKey) {
    super(content, noChoicePossible, suppressKey);
    assignedDataObject = dO;
    this.columnName = columnName;
    if (GlobalStd.readOnly) setEditable(false);
  }

  /**
   * Constructs a new DataVariableChoice.
   * @param content the content to assign to
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   */
  public DataVariableChoice(KeyValuePair[] Content, DataObject dO, String columnName) {
    super(Content);
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
   *
   * @param newDefaultValue sets the default value.
   */
  public void setDefaultValue(String newDefaultValue) {
    this.defaultValue = newDefaultValue;
  }

  /**
   * Sets the flag that determines whether or not this component is editable.
   * This means: value may be changed by user. It does not mean, that user may type in 
   * characters. To allow this, use setEditableForUserTyping.
   * If the flag is set to true, this component becomes user editable.
   * If the flag is set to false, the cannot change the text of this text
   * component.
   * @param editable a flag indicating whether this component should be user editable
   * @see VariableChoice#setEditableForUserTyping(boolean)
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

  /**
   * Selects all input of the component, if it is supported - e.g. in JTextField.
   * Allows easy new input, because the previous value is reseted when the
   * first key stroke occurs.
   */
  public void selectAll() {
  }

  /**
   * Selects the item by index as edit begin value which causes isModified to
   * return false as long as user select another item.
   * @param anIndex the index of the item to select
   */
  public void setSelectedIndexAsEditBeginValue(int anIndex) {
    super.setSelectedIndex(anIndex);
    editBeginValue = getSelectedItemKey();
  }

  /**
   * Selects the item by key as edit begin value which causes isModified to
   * return false as long as user select another item.
   * @param key the key of the item to select
   */
  public void setSelectedItemKeyAsEditBeginValue(String key) {
    editBeginValue = key;
    super.setSelectedItemKey(key);
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    editBeginValue = assignedDataObject.getText(columnName).trim();
    if (editBeginValue.equals("") & assignedDataObject.getMode() == DataObject.INSERTMODE) {
      editBeginValue = defaultValue;
    }
    if (editBeginValue.length() == 0) setSelectedIndex(0);
    else setSelectedItemKey(editBeginValue);
  }

  /**
   * Indicates whether the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled() {
    return getSelectedItemKey().trim().length() > 0;
  }

  /**
   * Sets the default value (if no date could be loaded from database).
   * @param specialEditBeginValue the new initial value of the date field
   */
  public void setEditBeginValue(String specialeditBeginValue) { // new input default
    editBeginValue = specialeditBeginValue;
    this.setSelectedItemKey(editBeginValue);
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    return(!getSelectedItemKey().trim().equals(editBeginValue.trim()));
  }

  @Override
  public boolean isToSave() {
    return isModified(); // fast solution - checking load value is better
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
    assignedDataObject.setText(columnName, getSelectedItemKey());
  }

 /**
   * Releases external resources.
   */
  public void free() {
  }

}
