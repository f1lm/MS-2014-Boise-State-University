/*
 * Copyright (c) 1999-2013 Christoph Mueller. All rights reserved.
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
import de.must.util.KeyValuePair;
import de.must.util.KeyValuePairAlpha;

import javax.swing.*;
import java.util.*;

/**
 * A database connected group of radio buttons.
 * @author Christoph Mueller
 */
public class DataTextCheck extends JPanel implements DataComponent {

  private static final int STORE_AS_STRING = 0;
  private static final int STORE_AS_INT = 1;
  private int storeType = STORE_AS_STRING;
  
  private ButtonGroup Group = new ButtonGroup();
  private JRadioButton[] checks;
  private String[] keys;
  private DataObject assignedDataObject;
  private String columnName;
  private String defaultValue;
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
    assignedDataObject = dO;
    this.columnName = columnName;
    this.keys = keys;
    setLayout(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 5, 0));
    checks = new JRadioButton[keys.length];
    for (int i = 0; i < keys.length; i++) {
      checks[i] = new JRadioButton(meaning[i], false);
      Group.add(checks[i]);
      this.add(checks[i]);
    }
    checks[0].setSelected(true);
    defaultValue = keys[0];
  }

  /**
   * Constructs a new group of radio buttons.
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   * @param content the content described by an array of KeyValuePair
   */
  public DataTextCheck(DataObject dO, String columnName, KeyValuePair[] content) {
    assignedDataObject = dO;
    this.columnName = columnName;
    this.keys = new String[content.length];
    setLayout(new java.awt.FlowLayout(java.awt.FlowLayout.LEFT, 5, 0));
    checks = new JRadioButton[keys.length];
    for (int i = 0; i < keys.length; i++) {
      keys[i] = content[i].getKey();
      checks[i] = new JRadioButton(content[i].getValue(), false);
      Group.add(checks[i]);
      this.add(checks[i]);
    }
    checks[0].setSelected(true);
    defaultValue = keys[0];
  }

  public DataTextCheck(DataObject dO, String columnName, DataObject sourceDataObject, String keyColumnName, String visibleColumnName) {
    this(dO, columnName, getContentArray(sourceDataObject, keyColumnName, visibleColumnName));
  }
  
  private static KeyValuePairAlpha[] getContentArray(DataObject sourceDataObject, String keyColumnName, String visibleColumnName) {
    sourceDataObject.select("*", (WhereCondition)null, "position, " + visibleColumnName);
    Vector<KeyValuePairAlpha> content = new Vector<KeyValuePairAlpha>();
    content.add(new KeyValuePairAlpha("", "?"));
    while (sourceDataObject.nextRow()) {
      content.add(new KeyValuePairAlpha(sourceDataObject.getText(keyColumnName), sourceDataObject.getText(visibleColumnName)));
    }
    sourceDataObject.closeQuery();
    return content.toArray(new KeyValuePairAlpha[content.size()]);
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
    for (int i = 0; i < keys.length; i++) {
      checks[i].setEnabled(editable);
    }
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
    if (editBeginValue.trim().equals("") & assignedDataObject.getMode() == DataObject.INSERTMODE) editBeginValue = defaultValue;
    for (int i = 0; i < keys.length; i++) {
      if (keys[i].trim().equals(editBeginValue.trim())) {
        checks[i].setSelected(true);
      }
      else {
        checks[i].setSelected(false);  // no deselect(all) allowed!
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
    for (int i = 0; i < keys.length; i++) {
      if (checks[i].getModel().isSelected()) {
        if (!keys[i].trim().equals(editBeginValue.trim())) return true;
      }
    }
    return false;
  }

  @Override
  public boolean isToSave() {
    return isModified(); // fast solution - checking load value is better
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
    switch (storeType) {
    case STORE_AS_STRING:
      for (int i = 0; i < keys.length; i++) {
        if (checks[i].getModel().isSelected()) {
          assignedDataObject.setText(columnName, keys[i]);
        }
      }
      break;
    case STORE_AS_INT:
      for (int i = 0; i < keys.length; i++) {
        if (checks[i].getModel().isSelected()) {
          assignedDataObject.setInt(columnName, Integer.parseInt(keys[i]));
        }
      }
      break;
    }  
  }

 /**
   * Releases external resources.
   */
  public void free() {
  }

}
