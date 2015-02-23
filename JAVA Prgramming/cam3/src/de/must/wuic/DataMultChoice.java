/*
 * Copyright (c) 1999-2010 Christoph Mueller. All rights reserved.
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

import javax.swing.*;
import javax.swing.table.*;

import java.sql.SQLException;
import java.util.*;

/**
 * A database connected component to assign multiple keys via checkbox list.
 * @author Christoph Mueller
 */
public class DataMultChoice implements DataComponent, ContextHelp {

  protected JTable table;
  protected DataMultChoiceModel model;
  private String helpTopic;
  private String helpTarget;
  private boolean required = false;
  private DataObject keyDataObject;
  private String lastReloadWhereCondition = null;
  private DataChangeListener dataChangeListener; // no weak reference!

  /**
   * Constructs a new database connected multiple choice component.
   * @param root the main data object which is the entity that is to be assigned
   * to one or more keys
   * @param key the key containing data object, e.g. a group
   * @param link the relational entity data object
   * @param keyColumns the columns of the key table to be displayed
   * @param keyHeaders the headers of the table which represents the keys
   */
  public DataMultChoice(DataObject root, DataObject key, AssoDataObject link, String[] keyColumns, String[] keyHeaders) {
    this.keyDataObject = key;
    model = new DataMultChoiceModel(
      root,
      key,
      link,
      keyColumns,
      keyHeaders
    );
    table = new JTable(model);
    if (GlobalStd.readOnly) setEditable(false);
    // setPreferedColumnSize(new int[] {0, 50});
    keyDataObject.addDataChangeListener(dataChangeListener = new DataChangeListener() {
      public void DataChangePerformed(DataChangedEvent e) {
        if (e.getEntityName().equals(keyDataObject.getTableName()) && e.getSequenceType() != DataChangedEvent.NOT_THE_LAST_OF_A_SEQUENCE_TYPE && isConnectionOpen()) { // e.g. connection may be closed after user changed database - the windows are closed and not used any more but still existing until garbage collection
          Vector<Identifier> identifiers = model.getSelectedIdentifiers();
          reload(lastReloadWhereCondition);
          loadValue();
          model.setSelectedIdentifiers(identifiers);
        }
      }
    });
  }

    private boolean isConnectionOpen() {
      try {
        return !keyDataObject.getConnection().isClosed();
      } catch (SQLException e) {
        return false;
      }
    }
    
  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   */
  public void setHelpContext(String helpTopic) {
    setHelpContext(helpTopic, null);
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   * @param helpTarget the context help's target
   */
  public void setHelpContext(String helpTopic, String helpTarget) {
    this.helpTopic = helpTopic;
    this.helpTarget = helpTarget;
  }

  /**
   * @return the topic of the component's help context
   */
  public String getHelpTopic() {
    return helpTopic;
  }

  /**
   * @return the target of the component's help context
   */
  public String getHelpTarget() {
    return helpTarget;
  }

  /**
   * Returns the assigned data object.
   * @return the assigned data object
   */
  public DataObject getAssignedDataObject() {
    return model.getRootDataObject();
  }

  public void setToolTipText(String text) {
    table.setToolTipText(text);
  }
  
  /**
   * Returns the table e.g. to be added to a viewport.
   * @return the table e.g. to be added to a viewport
   */
  public JTable getTable() {
    return table;
  }

  /**
   * Sets the preferred column sizes of the table.
   * @param cs contains the sizes of the visible columns from left to right
   */
  public void setPreferedColumnSize(int[] cs) {
    TableColumn column = null;
    for (int i = 0; i < cs.length; i++) {
      column = table.getColumnModel().getColumn(i);
      if (cs[i] != 0) {
         column.setMinWidth(cs[i]);
         column.setMaxWidth(cs[i]);
         // column.setPreferredWidth(cs[i]);
      }
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
   * Causes a reload, shortened by a where condition.
   * @param whereCondition the where condition to shorten the content
   */
  public void reload(String whereCondition) {
    model.reload(whereCondition);
    lastReloadWhereCondition = whereCondition;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    model.loadValue();
  }

  /**
   * Sets the copy mode and the new root identifier.
   * @param newRootIdentifier the new root identifier
   */
  public void setCopyModeAndNewRootIdentifier(Identifier newRootIdentifier) {
    model.setCopyModeAndNewRootIdentifier(newRootIdentifier);
  }

  /**
   * Sets copy mode and the text field which will contain the identify value when it's time to save.
   * @param identifyTextField the text field which will contain the identify value when it's time to save
   */
  public void setCopyModeAndIdentifyTextField(MustTextField identifyTextField) {
    model.setCopyModeAndNewRootIdentifier(null);
    model.setCopyModeAndIdentifyTextField(identifyTextField);
  }

  /**
   * Sets the text field which will contain the identify value when it's time to save.
   * @param identifyTextField the text field which will contain the identify value when it's time to save
   */
  public void setIdentifyTextField(MustTextField identifyTextField) {
    model.setIdentifyTextField(identifyTextField);
  }
  
  /**
   * Invoked when a key has been released. Used to fire a component modified event.
   * @param e the key event
   */
  public void keyReleased(java.awt.event.KeyEvent e) {
    if (isModified()) fireComponentModified();
    // super.keyReleased(e);
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
    model.saveValue();
  }

  /**
   * Indicates whether the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isContentValid() {return true;}

  /**
   * Indicates whether the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {return false;}

  /**
   * Indicates whether the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled() {return true;}

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {return model.isModified();}

  @Override
  public boolean isToSave() {
    return isModified(); // fast solution - checking load value is better
  }
  
  /**
   * Selects all input of the component, if it is supported - e.g. in JTextField.
   * Allows easy new input, because the previous value is reseted when the
   * first key stroke occurs.
   */
  public void selectAll() {}

  /**
   * Set focus on the receiving component if isRequestFocusEnabled returns true.   */
  public void requestFocus() {}

 /**
   * Sets the flag that determines whether or not this component is editable.
   * If the flag is set to true, this component becomes user editable.
   * If the flag is set to false, the cannot change the text of this text
   * component.
   * @param editable a flag indicating whether this component should be user editable
   */
  public void setEditable(boolean editable) {}

  /**
   * Releases external resources.
   */
  public void free() {
  }

}
