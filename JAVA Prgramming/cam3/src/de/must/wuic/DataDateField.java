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
import de.must.util.*;
import java.util.*;

/**
 * @author Christoph Mueller
 */
public class DataDateField extends MustDateField implements DataComponent {

  private DataObject assignedDataObject;
  private String columnName;
  private String loadValue = "";
  private String editBeginValue = "";
  private boolean required = false;

 /**
   * Constructs a new database connected date field.
   * @param dataObject the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   */
  public DataDateField(DataObject dataObject, String columnName) {
    super();
    assignedDataObject = dataObject;
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
   * Determines whether input is required (mandatory).
   * @param required if true, input is mandatory; otherwise, input is not mandatory
   */
  public void setRequired(boolean required) {
    this.required = required;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    java.sql.Date loadDate = assignedDataObject.getDate(columnName);
    if (loadDate == null) loadValue = "";
    else {
      DateString DateString1 = new DateString(GlobalStd.locale, loadDate);
      loadValue = DateString1.getEditableDateString();
    }
    setText(loadValue);
    editBeginValue = loadValue;
  }

 /**
   * Sets the default value (if no date could be loaded from database).
   * @param specialEditBeginValue the new initial value of the date field
   */
  public void setEditBeginValue(String specialEditBeginValue) { // new input default
    editBeginValue = specialEditBeginValue;
    setText(editBeginValue);
  }

 /**
  * Sets the components value to a string representing the current date.
  */
  public void setTodayValue() {
    setTodayValue(GlobalStd.locale);
  }

 /**
  * Sets the components value to a string representing the current date.
  * @param locale the locale for formatting aspects
  */
  public void setTodayValue(Locale locale) {
    super.setTodayValue(locale);
    editBeginValue = getText();
  }

  /**
   * Indicates whether the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled() {
    return(!getText().trim().equals(""));
  }

  @Override
  public boolean isModified() {
    return(!getText().equals(editBeginValue));
  }

  @Override
  public boolean isToSave() {
    return(!getText().equals(loadValue));
  }

  /**
   * Indicates whether the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {
    return false;
  }

  /**
   * Invoked when a key has been released. Used to fire a component modified event.
   * @param e the key event
   */
  public void keyReleased(java.awt.event.KeyEvent e) {
    if (isModified()) fireComponentModified();
    super.keyReleased(e);
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
    String dateText = getText();
    if (dateText.equals("")) assignedDataObject.setDate(columnName, null);
    else assignedDataObject.setDate(columnName, getSqlDate());
  }

 /**
   * Releases external resources.
   */
  public void free() {
  }

}
