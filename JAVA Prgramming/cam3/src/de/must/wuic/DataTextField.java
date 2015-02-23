/*
 * Copyright (c) 1999-2011 Christoph Mueller. All rights reserved.
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
import de.must.util.StringFunctions;

import java.awt.event.*;
import java.util.*;

/**
 * Database table cell assigned text edit field. The column is assigned via constructor.
 * The row is dynamically assigned by method <code>{@link #loadValue}</code>.
 * After editing the new value may be restored by method <code>{@link #saveValue}</code>.
 * @author Christoph Mueller
 */
public class DataTextField extends MustTextField implements DataTextComponent {

  private DataObject assignedDataObject;
  private String columnName;
  private String loadValue = "";

  /**
   * Constructs a new database assigned text field with the specified length
   * (used for size and max length), data object and column name.
   * @param length of the text field - size relevant
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   */
  public DataTextField(int length, DataObject dO, String columnName) {
    this(length, length, dO, columnName);
  }

  /**
   * Constructs a new database assigned text field with the specified length
   * (size), max chars, data object and column name.
   * @param length of the text field - size relevant
   * @param maxChars input control relevant max character length of the text field
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   */
  public DataTextField(int length, int maxChars, DataObject dO, String columnName) {
    super(length, maxChars, true);
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
   * Loads the component's database stored value.
   */
  public void loadValue() {
    loadValue = StringFunctions.rtrim(assignedDataObject.getText(columnName));  // type char has following blanks, this may cause problems while modiyfing copies
    setTextAsEditBeginValue(loadValue);
  }
  
  @Override
  public boolean isToSave() {
    return(!getText().equals(loadValue));
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
  public void selectAll() {
    super.selectAll();
    // (better: background color) if (getText().length() == 0) setCaretColor(Color.red);
  }

  /**
   * Invoked when a key has been released. Used to fire a component modified event.
   * @param e the key event
   */
  public void keyReleased(KeyEvent e) {
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
    assignedDataObject.setText(columnName, getText());
  }

 /**
   * Releases external resources.
   */
  public void free() {
  }

}
