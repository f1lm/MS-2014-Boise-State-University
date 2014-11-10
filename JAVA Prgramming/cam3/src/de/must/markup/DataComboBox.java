/*
 * Copyright (c) 2001-2002 Christoph Mueller. All rights reserved.
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

package de.must.markup;

import de.must.dataobj.*;

/**
 * A database connected combo box. By assigning a key column name, entries
 * are selected automaticly and key values are modified, if a different user
 * user selection occurred.
 * @author Christoph Mueller
 */
public class DataComboBox extends HalfDataComboBox implements Storable {

  private DataObject assignedDataObject;
  private String assignedColumnName;
  protected Identifier editBeginValue;
  protected String editBeginSelected;

  /**
   * Creates a database connected and dynamically data filled combo box.
   * @param sessionData the session's public data
   * @param assignedDataObject the data object to trigger the selection
   * @param name the name of the combo box
   * @param contentDataObject the data object to fill the content
   * @param visibleColumnName the name of the column to be displayed
   * @return the created database connected combo box
   */
  public DataComboBox(SessionData sessionData, DataObject assignedDataObject, String name, DataObject contentDataObject, String visibleColumnName) {
    super(sessionData, name, contentDataObject, visibleColumnName);
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = name;
  }

  /**
   * Creates a database connected and dynamically data filled combo box.
   * @param sessionData the session's public data
   * @param assignedDataObject the data object to trigger the selection
   * @param name the name of the combo box
   * @param contentDataObject the data object to fill the content
   * @param visibleColumnName the name of the column to be displayed
   * @param label the label of the combo box
   * @param orderByColumnName the sorting column name of the content data object
   * @param nameForNoChoice the expression to be used to indicate "no choice"
   */
   public DataComboBox(SessionData sessionData, DataObject assignedDataObject, String name, DataObject contentDataObject, String visibleColumnName, String label, String orderByColumnName, String nameForNoChoice) {
    super(sessionData, name, contentDataObject, visibleColumnName, orderByColumnName, nameForNoChoice);
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = name;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    // de.must.io.Logger.getInstance().info(getClass(), "DataComboBox loads " + assignedColumnName);
    switch (contentDataObject.getIdentifyTemplate().getIdentifyType()) {
    case IdentifyTemplate.IDENTIFIED_BY_INT:
      try {
        editBeginValue = new Identifier(assignedDataObject.getInt(assignedColumnName));
        this.setSelectedIdentifier(editBeginValue);
        editBeginSelected = selected;
      }
      catch (Exception e) {
        de.must.io.Logger.getInstance().info(getClass(), e + "bei " + contentDataObject.getTableName());
      }
      break;
    case IdentifyTemplate.IDENTIFIED_BY_STRING:
      try {
        editBeginValue = new Identifier(assignedDataObject.getText(assignedColumnName));
        this.setSelectedIdentifier(editBeginValue);
        editBeginSelected = selected;
      }
      catch (Exception e) {
        de.must.io.Logger.getInstance().info(getClass(), e + "bei " + contentDataObject.getTableName());
      }
      break;
    }
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    try {
      return (!selected.equals(editBeginSelected));
    } catch (NullPointerException npe) {
      de.must.io.Logger.getInstance().info(getClass(), "editBeginSelected: " + editBeginSelected);
      de.must.io.Logger.getInstance().info(getClass(), "selected: " + selected);
      de.must.io.Logger.getInstance().error(getClass(), npe);
      return true;
    }
  }

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    switch (contentDataObject.getIdentifyTemplate().getIdentifyType()) {
    case IdentifyTemplate.IDENTIFIED_BY_INT:
      try {
        Identifier selectedIdentifier = getSelectedIdentifier();
        assignedDataObject.setInt(assignedColumnName, selectedIdentifier.getIntIdentifier());
      }
      catch (Exception e) {
        de.must.io.Logger.getInstance().error(getClass(), e);
      }
      break;
    case IdentifyTemplate.IDENTIFIED_BY_STRING:
      try {
        Identifier selectedIdentifier = getSelectedIdentifier();
        assignedDataObject.setText(assignedColumnName, selectedIdentifier.getStringIdentifier());
      }
      catch (Exception e) {
        de.must.io.Logger.getInstance().error(getClass(), e);
      }
      break;
    }
  }

}
