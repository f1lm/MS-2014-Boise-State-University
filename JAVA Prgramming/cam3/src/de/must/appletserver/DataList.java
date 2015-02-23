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

import de.must.applet.Constants;
import de.must.dataobj.*;
import de.must.util.StringFunctions;

import java.util.*;

/**
 * Component to sub-select sub-items of an entity. Registered data components will
 * be reloaded, when the selection changes.
 * @author Christoph Mueller
 */
public class DataList extends RemoteElement implements Storable, DataChangeListener {
  
  class Row {
    public Identifier identifier;
    public String visibleItem;
    public Row(Identifier identifier, String visibleItem) {
      this.identifier = identifier;
      this.visibleItem = visibleItem;
    }
  }

  private DataObject assignedDataObject;
  private String assignedColumnName;
  private DataObject sourceDataObject;
  private String visibleColumnName;
  private String orderBy;
  private Vector<Row> rows;
  private Vector<Storable> storables;
  // private Presentable[] presentables;
  private boolean internalItemStateChange = false;
  private Identifier selectedIdentifier = null;
  protected boolean buildDone = false;

  /**
   * Constructs a new data list.
   * @param assignedDataObject the data object to trigger the selection
   * @param assignedColumnName the name of the column the text field is to assign to
   * @param sourceDataObject the source data object
   * @param visibleColumnName the visible column name
   */
  public DataList(SessionData sessionData, DataObject assignedDataObject, String assignedColumnName, DataObject sourceDataObject, String visibleColumnName) {
    this(sessionData, assignedDataObject, assignedColumnName, sourceDataObject, visibleColumnName, null);
  }

  /**
   * Constructs a new data list.
   * @param assignedDataObject the data object to trigger the selection
   * @param assignedColumnName the name of the column the text field is to assign to
   * @param sourceDataObject the source data object
   * @param visibleColumnName the visible column name
   * @param orderBy the sorting column name of the content data object
   */
  public DataList(SessionData sessionData,  DataObject assignedDataObject, String assignedColumnName, DataObject sourceDataObject, String visibleColumnName, String orderBy) {
    super(sessionData);
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = assignedColumnName;
    this.visibleColumnName = visibleColumnName;
    this.sourceDataObject = sourceDataObject;
    this.sourceDataObject = sourceDataObject;
    this.orderBy = orderBy;
//    setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
  }

  /**
   * Returns the assigned data object.
   * @return the assigned data object
   */
  public DataObject getAssignedDataObject() {
    return assignedDataObject;
  }

  /**
   * Returns the content data object.
   * @return the content data object
   */
  public DataObject getSourceDataObject() {
    return sourceDataObject;
  }

  /**
   * Sets the flag that determines whether or not this component is editable.
   * If the flag is set to true, this component becomes user editable.
   * If the flag is set to false, the cannot change the text of this text
   * component.
   * @param editable a flag indicating whether this component should be user editable
   */
  public void setEditable(boolean editable) {
//    setEnabled(editable);
  }

  /**
   * Indicates whether the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isContentValid() {
    return true;
  }

  /**
   * Selects all input of the component, if it is supported - e.g. in JTextField.
   * Allows easy new input, because the previous value is reseted when the
   * first key stroke occurs.
   */
  public void selectAll() { // DataComponent standard
  }

  /**
   * Assigns the components to be dependent on this data list.
   * @param storables the components to be dependent on this data list
   */
  public void setDataComponents(Vector<Storable> storables) {
    this.storables = storables;
  }

//  /**
//   * Assigns the presentables to be dependent on this data list. All these
//   * presentables will be asked to load their values as soon as the list's
//   * selection changes.
//   * @param newPresentables the presentables to be dependent on this data list
//   */
//  public void setPresentables(Presentable[] newPresentables) {
//    this.presentables = newPresentables;
//  }

  /**
   * Sets the visible column name.
   * @param visibleColumnName the column name to be used to be displayed as
   * content of the combo box
   */
  public void setVisibleColumnName(String visibleColumnName) {
    this.visibleColumnName = visibleColumnName;
  }

  /**
   * Returns the visible column name.
   * @return the visible column name
   */
  public String getVisibleColumnName() {
    return visibleColumnName;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    int itemCount = -1;
    internalItemStateChange = true;
    if (orderBy == null) {
      sourceDataObject.select(visibleColumnName , assignedColumnName + " = " + assignedDataObject.getInt(assignedColumnName));
    } else {
      sourceDataObject.select(visibleColumnName , assignedColumnName + " = " + assignedDataObject.getInt(assignedColumnName), orderBy);
    }
    rows = new Vector<Row>();
    while(sourceDataObject.nextRow()) {
      itemCount++;
      Identifier currentIdentifier = sourceDataObject.getIdentifier();
      if (itemCount == 0) {
        selectedIdentifier = currentIdentifier;
      }
      String listEntry = sourceDataObject.getText(visibleColumnName);
      rows.add(new Row(currentIdentifier, listEntry));
    }
    sourceDataObject.closeQuery();
    rows.add(new Row(new Identifier(Identifier.REPRESENTATIVE_FOR_NEW_ENTRY), getTranslation("TEXT_NEW_ENTRY")));
    if (itemCount == -1) {
      sourceDataObject.newRow();
      selectedIdentifier = new Identifier(Identifier.REPRESENTATIVE_FOR_NEW_ENTRY);
    } else {
      sourceDataObject.load(selectedIdentifier);
    }
    refreshDependendComponents();
    internalItemStateChange = false;
  }
  
  public int getSize() {
    return rows.size();
  }

  public void setSelectedIndex(int index) {
    if (!internalItemStateChange) {
      loadSelection(rows.elementAt(index).identifier);
      refreshDependendComponents();
    }
  }
  
  /**
   * Called when list selection changes to refresh registered dependent
   * data components to reload themselves.
   * @param e the list selection event
   */
  public void setSelected(Identifier identifier) {
    if (!internalItemStateChange && !identifier.equals(sourceDataObject.getIdentifier())) {
      loadSelection(identifier);
      refreshDependendComponents();
    }
  }

  private void loadSelection(Identifier identifier) {
    if (identifier.isRepresentativeForNewEntry()) {
      sourceDataObject.newRow();
    } else {
      sourceDataObject.load(identifier);
    }
    selectedIdentifier = identifier;
  }
  
  public Identifier getSelectedIdentifier() {
    return selectedIdentifier;
  }

  private void refreshDependendComponents() {
    Iterator<Storable> iterator = storables.iterator();
    while (iterator.hasNext()) {
      Storable storable = iterator.next();
      if (storable.getAssignedDataObject().equals(sourceDataObject) && storable != this) {
        storable.loadValue();
      }
    }
//    if (presentables != null) {
//      for (i = 0; i < presentables.length; i++) {
//        presentables[i].loadValue();
//      }
//    }
  }

  /**
   * Indicates whether the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled() {
    return false;
  }
  
  public int getItemCount() {
    return rows.size();
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    return false;
  }

//  @Override
  public boolean isToSave() {
    return isModified();
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
  }

 /**
   * Determines whether input is required (mandatory).
   * @param required if true, input is mandatory; otherwise, input is not mandatory
   */
  public void setRequired(boolean required) {}

  /**
   * Indicates whether the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {
    return false;
  }

 /**
   * Releases external resources.
   */
  public void free() {
  }

  /**
   * Called from data objects when data have been changed.
   * Used for synchronization of data presentations.
   * @param e the data change event that happened.
   */
  public void DataChangePerformed(DataChangedEvent e) {
    // de.must.io.Logger.getInstance().info(getClass(), "ComboBox informiert zu Änderungen in " + e.getEntityName());
    /* if (e.getEntityName().equals(sourceDataObject.getEntityName()) & e.getChangeType() == e.SUMMARY) {
      String currentSelection = getSelectedItem();
      refill();
      // select(currentSelection);
    } */
  }

  @Override
  public void setToolTipText(String toolTipText) {
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    if (!buildDone) {
      out.println(Constants.ACTION_BEGIN_TAG);
      out.println(Constants.TODO_TAG_BEGIN + Constants.CREATE_SUBLIST_TAB + Constants.TODO_TAG_END);
      out.println(Constants.ID_TAG_BEGIN + name + Constants.ID_TAG_END);
      out.println(Constants.ACTION_END_TAG);
      buildDone = true;
    }
    // super.buildRemoteView(out);
  }

  @Override
  public void setValues(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TODO_TAG_BEGIN + Constants.CLEAR_SUBLIST + Constants.TODO_TAG_END);
    out.println(Constants.ID_TAG_BEGIN + name + Constants.ID_TAG_END);
    out.println(Constants.ACTION_END_TAG);
    Iterator<Row> iterator = rows.iterator();
    while (iterator.hasNext()) {
      Row row = iterator.next();
      out.println(Constants.ACTION_BEGIN_TAG);
      out.println(Constants.TODO_TAG_BEGIN + Constants.ADD_SUBLIST_ITEM + Constants.TODO_TAG_END);
      out.println(Constants.ID_TAG_BEGIN + row.identifier + Constants.ID_TAG_END);
      out.println(Constants.VALUE_TAG_BEGIN + StringFunctions.replaceAll(row.visibleItem, "\n", Constants.NEW_LINE) + Constants.VALUE_TAG_END);
      out.println(Constants.ACTION_END_TAG);
    }
    out.setValue(name, selectedIdentifier.toString());
  }

  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
  }

  @Override
  public void destroy() {
  }

  @Override
  public boolean isValid() {
    return true; // always
  }

  @Override
  public void requestFocus() {
    // not necessary here
  }

}
