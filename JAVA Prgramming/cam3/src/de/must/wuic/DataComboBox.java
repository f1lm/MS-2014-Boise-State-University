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

import java.awt.event.*;
import java.util.*;

/**
 * Combo box whose content is filled by a database table and which is linked to
 * another database table which contains the key for the selected entry.
 * @author Christoph Mueller
 */
public class DataComboBox extends HalfDataComboBox implements DataComponent, ItemListener {

  private DataObject assignedDataObject;
  private String assignedColumnName;
  private boolean required = false;
  private boolean eventTriggeredRefillMode = false;
  private boolean encoded = true; // by default, we store pointer
  private String editBeginValueString;

 /**
   * Constructs a new combo box for unencoded assignment.
   * The value you see is what is stored in the database.
   * This is the simple value assignment like pure MS Access applications.
   * Not really relational but nevertheless popular.
   * @param assignedDataObject the data object to trigger the selection
   * @param assignedColumnName the name of the column the text field is to assign to
   * @param sourceDataObject the source data object
   */
  public DataComboBox(DataObject assignedDataObject, String assignedColumnName, DataObject sourceDataObject) {
    super(sourceDataObject, assignedColumnName, null, "",  0);
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = assignedColumnName;
    encoded = false;
    if (GlobalStd.readOnly) setEditable(false);
  }

 /**
   * Constructs a new combo box for encoded assignment.
   * Not the value you see is stored in the database, but its identifier.
   * @param assignedDataObject the data object to trigger the selection
   * @param assignedColumnName the name of the column the text field is to assign to
   * @param sourceDataObject the source data object
   * @param visibleColumnName the name of the column to be displayed
   */
  public DataComboBox(DataObject assignedDataObject, String assignedColumnName, DataObject sourceDataObject, String visibleColumnName) {
    super(sourceDataObject, visibleColumnName);
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = assignedColumnName;
    if (GlobalStd.readOnly) setEditable(false);
  }

 /**
   * Constructs a new combo box for encoded assignment.
   * @param assignedDataObject the data object to assign to
   * @param assignedColumnName the name of the column the text field is to assign to
   * @param sourceDataObject the source data object
   * @param visibleColumnName the name of the column to be displayed
   * @param orderByColumnName the sorting column name of the content data object
   * @param nameForNoChoice the expression to be used to indicate "no choice"
   */
  public DataComboBox(DataObject assignedDataObject, String assignedColumnName, DataObject sourceDataObject, String visibleColumnName, String orderByColumnName, String nameForNoChoice) {
    super(sourceDataObject, visibleColumnName, orderByColumnName, nameForNoChoice);
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = assignedColumnName;
    if (GlobalStd.readOnly) setEditable(false);
  }

 /**
   * Constructs a new combo box for encoded assignment.
   * @param assignedDataObject the data object to assign to
   * @param assignedColumnName the name of the column the text field is to assign to
   * @param sourceDataObject the data object to fill the content
   * @param visibleColumnName the name of the column to be displayed
   * @param orderByColumnName the sorting column name of the content data object
   * @param nameForNoChoice the expression to be used to indicate "no choice"
   * @param width the width of the component - if 0 it's automatically sized
   */
  public DataComboBox(DataObject assignedDataObject, String assignedColumnName, DataObject sourceDataObject, String visibleColumnName, String orderByColumnName, String nameForNoChoice, int width) {
    super(sourceDataObject, visibleColumnName, orderByColumnName, nameForNoChoice, width);
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = assignedColumnName;
    if (GlobalStd.readOnly) setEditable(false);
  }

 /**
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
   * Indicates whether the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isContentValid() {
    if (getSelectedIdentifier() == null) return false; // editable + user input is not in list
    else return true;
  }

  /**
   * Indicates whether the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {
    if (required & !isSpecialChoice()) return true;
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
  	if (encoded) {
	    switch (contentDataObject.getIdentifyTemplate().getIdentifyType()) {
	    case IdentifyTemplate.IDENTIFIED_BY_INT:
	      try {
	        editBeginValue = new Identifier(assignedDataObject.getInt(assignedColumnName));
	        setSelectedIdentifier(editBeginValue);
	      }
	      catch (Exception e) {
	        de.must.io.Logger.getInstance().info(getClass(), e + "bei " + contentDataObject.getTableName());
	      }
	      break;
	    case IdentifyTemplate.IDENTIFIED_BY_STRING:
	      try {
	        editBeginValue = new Identifier(assignedDataObject.getText(assignedColumnName));
	        setSelectedIdentifier(editBeginValue);
	      }
	      catch (Exception e) {
	        de.must.io.Logger.getInstance().info(getClass(), e + "bei " + contentDataObject.getTableName());
	      }
	      break;
	    }
  	} else { // not encoded
  		editBeginValueString = assignedDataObject.getText(assignedColumnName);
  		if (editBeginValueString.length() == 0) setSelectedItem(nameForNoChoice);
  		else {
  		  // in this case we cannot guaranty the ComboBox contains the value, so we check first
  			boolean included = false;
  			for (int i = 0; i < getItemCount(); i++) {
  				if (getItemAt(i).equals(editBeginValueString)) {
  				  included = true;
  				  break;
  				}
			  }
  			if (included) {
  			  setSelectedItem(editBeginValueString);
  			} else {
  				setSelectedItem(nameForNoChoice);
  			}
  		}
  	}
  }

  /**
   * Selects the item to be used to indicate "no special choice" and indicates that this is the begin of editing so that isModified returns false.
   */
  public void setNoSpecialChoiceAsEditBeginValue() {
    setNoSpecialChoice();
    if (encoded) {
      switch (contentDataObject.getIdentifyTemplate().getIdentifyType()) {
      case IdentifyTemplate.IDENTIFIED_BY_INT:
        editBeginValue = new Identifier(0);
        break;
      case IdentifyTemplate.IDENTIFIED_BY_STRING:
        editBeginValue = new Identifier("");
        break;
      }
    } else { // not encoded
      editBeginValueString = "";
    }
  }

 /**
   * Sets the default value (if no date could be loaded from database).
   * @param specialEditBeginValue the new initial value of the date field
   */
  public void setEditBeginValue(Identifier specialEditBeginValue) { // new input default
    editBeginValue = specialEditBeginValue;
    setSelectedIdentifier(editBeginValue);
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
  	if (encoded) {
	    try {
	      Identifier selectedIdentifier = identifierTable.getIdentifier(getSelectedItem());
	      if (selectedIdentifier == null) return true; // editable + user input is not in list
	      return (!selectedIdentifier.equals(editBeginValue));
	    }
	    catch (Exception e) {
	      de.must.io.Logger.getInstance().info(getClass(), "getSelectedItem(): " + getSelectedItem());
	      de.must.io.Logger.getInstance().error(getClass(), e);
	      return false;
	    }
  	} else {
  	  if (editBeginValueString.length() == 0 & getSelectedItem().equals(nameForNoChoice)) return false;
  		return !getSelectedItem().equals(editBeginValueString);
  	}
  }

  @Override
  public boolean isToSave() {
    return isModified(); // fast solution - checking load value is better
  }
  
  /* public void mousePressed(java.awt.event.MouseEvent e) {}
  public void mouseExited(java.awt.event.MouseEvent e) {}
  public void mouseEntered(java.awt.event.MouseEvent e) {}
  public void mouseClicked(java.awt.event.MouseEvent e) {}
  public void mouseReleased(java.awt.event.MouseEvent e) {
    if (isModified()) fireComponentModified();
  }  */

  /**
   * Invoked when an item state has been released. Used to fire a component modified event.
   * @param e the key event
   */
  public void itemStateChanged(java.awt.event.ItemEvent e) {
    if (eventTriggeredRefillMode) return; // not caused by user!
    if (isModified()) fireComponentModified();
  }

  /**
   * Invoked when a key has been released. Used to fire a component modified event.
   * @param e the key event
   */
  public void keyReleased(java.awt.event.KeyEvent e) {
    if (isModified()) fireComponentModified();
  }

//------------------------------------------------------------------------------

  private Vector<ComponentModificationListener> componentModificationListeners;

  /**
   * Adds a component modification listener to this component.
   * Needed e.g. for data components depending from a sublist.
   * @param l component modification listener to add
   */
  public synchronized void addComponentModificationListener(ComponentModificationListener l) {
    addItemListener(this);
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
    removeItemListener(this);
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
  	if (encoded) {
	    switch (contentDataObject.getIdentifyTemplate().getIdentifyType()) {
	    case IdentifyTemplate.IDENTIFIED_BY_INT:
	      try {
	        Identifier selectedIdentifier = (Identifier)identifierTable.getIdentifier(getSelectedItem());
	        assignedDataObject.setInt(assignedColumnName, selectedIdentifier.getIntIdentifier());
	      }
	      catch (Exception e) {
	        de.must.io.Logger.getInstance().error(getClass(), e);
	      }
	      break;
	    case IdentifyTemplate.IDENTIFIED_BY_STRING:
	      try {
	        Identifier selectedIdentifier = (Identifier)identifierTable.getIdentifier(getSelectedItem());
	        assignedDataObject.setText(assignedColumnName, selectedIdentifier.getStringIdentifier());
	      }
	      catch (Exception e) {
	        de.must.io.Logger.getInstance().error(getClass(), e);
	      }
	      break;
	    }
  	} else {
	    assignedDataObject.setText(assignedColumnName, (String)getSelectedItem());
  	}
  }

  /**
   * Invoked when data have been changed. Used to fire a component modified event.
   * @param e the key event
   */
  public void DataChangePerformed(DataChangedEvent e) {
    // de.must.io.Logger.getInstance().info(getClass(), "ComboBox informiert zu Änderungen in " + e.getEntityName());
    if (e.getEntityName().equals(contentDataObject.getTableName()) & e.getSequenceType() != DataChangedEvent.NOT_THE_LAST_OF_A_SEQUENCE_TYPE) {
      refill();
    }
  }

  private void refill() {
    try {
      Identifier identifier = getSelectedIdentifier();
      String currentSelection = (String)getSelectedItem();
      eventTriggeredRefillMode = true;
      fill();
      if (!setSelectedIdentifier(identifier)) {
        setSelectedItem(currentSelection);
      }
      eventTriggeredRefillMode = false;
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
  }

 /**
   * Releases external resources.
   */
  public void free() {
    super.free();
  }

  /**
   * Called by the garbage collector.
   */
  protected void finalize() throws Throwable {
    free();
    // de.must.io.Logger.getInstance().info(getClass(), "finalize called in " +  getClass().getName());
    super.finalize();
  }


}

