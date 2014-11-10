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

import java.util.Vector;

import de.must.dataobj.*;
import javax.swing.table.*;

/**
 * The model for DataMultChoice.
 * @author Christoph Mueller
 * @see DataMultChoice
 */
public class DataMultChoiceModel extends AbstractTableModel {

  private DataObject rootDataObject;
  private DataObject keyDataObject; // assigned DataObject with keys for multiple choice
  private AssoDataObject assoDataObject; // assigned DataObject that contains association between identifier and keys
  private Identifier rootIdentifier;
  private MustTextField identifyTextField;
  private int rows;

  private String[] columnNames; // (= database column labels)
  private String[] fieldNames;  // (= database column names)
  private Object[][] data;
  private Object[][] oriData;  // original Data
  private Identifier[] identifiers;
  private String order = "";
  private boolean copyMode;

  /**
   * Constructs a new data multiple choice model.
   * @param rootDataObject the main data object which is the entity that is to be assigned
   * to one or more keys
   * @param keyDataObject the key containing data object, e.g. a group
   * @param assoDataObject the relational entity data object
   * @param fieldNames the columns of the key database table
   * @param columnNames the column name of the display grid
   */
  public DataMultChoiceModel(DataObject rootDataObject, DataObject keyDataObject, AssoDataObject assoDataObject, String[] fieldNames, String[] columnNames) {
    int i;
    this.rootDataObject = rootDataObject;
    this.keyDataObject = keyDataObject;
    this.assoDataObject = assoDataObject;
    this.fieldNames = fieldNames;
    this.columnNames = new String[columnNames.length + 1];
    this.columnNames[0] = "J/N";
    for (i=0; i < columnNames.length; i++) {
      this.columnNames[i+1] = columnNames[i];
    }
    if (keyDataObject.getIndices().length > 1) {
      order += keyDataObject.getIndices()[1].getIndexItems()[0].getFieldName();
      for (i = 1; i < keyDataObject.getIndices()[1].getIndexItems().length; i++) {
        order += ", " + keyDataObject.getIndices()[1].getIndexItems()[i].getFieldName();
      }
    } else if (keyDataObject.getIndices().length > 0) {
      order += keyDataObject.getIndices()[0].getIndexItems()[0].getFieldName();
      for (i = 1; i < keyDataObject.getIndices()[0].getIndexItems().length; i++) {
        order += ", " + keyDataObject.getIndices()[0].getIndexItems()[i].getFieldName();
      }
    }
    loadKeys(null);
  }

  /**
   * Returns the root data object.
   * @return the root data object
   */
  public DataObject getRootDataObject() {
    return rootDataObject;
  }
  
  /**
   * Causes a reload, shortened by a where condition.
   * @param whereCondition the where condition to shorten the content
   */
  public void reload(String whereCondition) {
    loadKeys(whereCondition);
  }

  private void loadKeys(String whereCondition) {
    this.rows = getItemCount(whereCondition);
    data = new Object[rows][fieldNames.length + 1];
    oriData = new Object[rows][fieldNames.length + 1];
    identifiers = new Identifier[rows];
    int i, j;
    String queryExpression = "select * from " + keyDataObject.getTableName();
    if (whereCondition != null) {
      queryExpression += " where " + whereCondition;
    }
    if (!order.equals("")) {
      queryExpression += " order by " + order;
    }
    keyDataObject.openQuery(queryExpression);
    i = -1;
    while (keyDataObject.nextRow()) {
      i++;
      data[i][0] = new Boolean(false);
      oriData[i][0] = new Boolean(false);
      identifiers[i] = keyDataObject.getIdentifier();
      for (j=0; j < fieldNames.length; j++) {
        data[i][j+1] = keyDataObject.getObject(fieldNames[j]);
        oriData[i][j+1] = keyDataObject.getObject(fieldNames[j]);
      }
    }
  }

  /**
   * Loads values from database.
   */
  public void loadValue() {
  	copyMode = false;
    rootIdentifier = rootDataObject.getIdentifier();
    if (rootIdentifier == null) return; // may occur if a DataPropertyAdminstration instance is build but not used, yet.
    int i;
    for (i=0; i < rows; i++) {
      if (assoDataObject.isLinked(rootIdentifier, identifiers[i])) {
        data[i][0] = new Boolean(true);
        oriData[i][0] = new Boolean(true);
      }
      else {
        data[i][0] = new Boolean(false);
        oriData[i][0] = new Boolean(false);
      }
    }
    fireTableDataChanged();
  }

  /**
   * Sets the copy mode and the new root identifier.
   * @param newRootIdentifier the new root identifier
   */
  public void setCopyModeAndNewRootIdentifier(Identifier newRootIdentifier) {
  	copyMode = true;
    this.rootIdentifier = newRootIdentifier;
  }
  
  /**
   * Sets copy mode and the text field which will contain the identify value when it's time to save.
   * @param identifyTextField the text field which will contain the identify value when it's time to save
   */
  public void setCopyModeAndIdentifyTextField(MustTextField identifyTextField) {
    copyMode = true;
    this.identifyTextField = identifyTextField;
  }
  
  /**
   * Sets the text field which will contain the identify value when it's time to save.
   * @param identifyTextField the text field which will contain the identify value when it's time to save
   */
  public void setIdentifyTextField(MustTextField identifyTextField) {
    this.identifyTextField = identifyTextField;
  }
  
  /**
   * Returns the number of items.
   * @return the number of items
   */
  public int getItemCount(String whereCondition) {
    int itemCount;
    String queryExpression = "select * from " + keyDataObject.getTableName();
    if (whereCondition != null) {
      queryExpression += " where " + whereCondition;
    }
    keyDataObject.openQuery(queryExpression);
    itemCount = 0;
    while (keyDataObject.nextRow()) {
      itemCount++;
    }
    return itemCount;
  }

  /**
   * Saves all values.
   * @return true if any value has changed
   */
  public void saveValue() { // singular because of unique handling DataComponent!
    // fireTableDataChanged();  no use!
    if (rootIdentifier == null && identifyTextField != null) {
      rootIdentifier = new Identifier(identifyTextField.getText());
    }
    int i;
    for (i=0; i < rows; i++) {
      // de.must.io.Logger.getInstance().info(getClass(), identifiers[i]);
      if (isRowToUpdate(i)) {
        saveRow(i);
      }
    }
  }

  /**
   * Returns true if the specified row has to be updated.
   * In case of copy mode the row has to be updated if it is checked.
   * In update or insert mode the row has to be updated if the current state differs from
   * the original state.
   * @param row the row to check
   * @return true if the specified row has to be updated
   */
  private boolean isRowToUpdate(int row) {
    if (copyMode) return ((Boolean)data[row][0]).booleanValue();
    else return isRowModified(row);
  }

  private void saveRow(int i) {
    Object tempObj = data[i][0];
    Boolean tempBoolean = (Boolean)tempObj;
    boolean tempB = tempBoolean.booleanValue();
    // de.must.io.Logger.getInstance().info(getClass(), tempB);
    if (tempB) {
      assoDataObject.link(rootIdentifier, identifiers[i]);
    }
    else {
      assoDataObject.unlink(rootIdentifier, identifiers[i]);
    }
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    int i;
    for (i=0; i < rows; i++) {
      if (isRowModified(i)) return true;
    }
    return false;
  }

  /**
   * Returns true if the specified row has changed.
   * @param row the row to check
   * @return true if the specified row has changed
   */
  public boolean isRowModified(int row) {
    int j;
    for (j=0; j < fieldNames.length; j++) {
      if (!data[row][j].equals(oriData[row][j])) return true;
    }
    return false;
  }

  /**
   * Returns the number of column - 1.
   * @return the number of column - 1
   */
  public int getColumnCount() {
    return columnNames.length;
  }

  /**
   * Returns the number of rows - 1.
   * @return the number of rows - 1
   */
  public int getRowCount() {
    return data.length;
  }

  /**
   * Returns the column name of the specified column.
   * @param col the column index
   * @return the column name of the specified column
   */
  public String getColumnName(int col) {
    return columnNames[col];
  }

  /**
   * Sets the column name of the specified column.
   * @param col the column index
   * @param columnName the new column name
   */
  public void setColumnName(int col, String columnName) {
    columnNames[col] = columnName;
  }

  /**
   * Returns the cell object.
   * @param row the row index
   * @param col the column index
   * @return the cell object
   */
  public Object getValueAt(int row, int col) {
    return data[row][col];
  }
  
  public Vector<Identifier> getSelectedIdentifiers() {
    Vector<Identifier> result = new Vector<Identifier>();
    for (int i = 0; i < rows; i++) {
      Object tempObj = data[i][0];
      if (((Boolean)tempObj).booleanValue()) {
        result.add(identifiers[i]);
      }
    }
    return result;
  }

  public void setSelectedIdentifiers(Vector<Identifier> identifiers) {
    for (int i = 0; i < rows; i++) {
      if (identifiers.contains(this.identifiers[i])) {
        data[i][0] = new Boolean(true);
      }
    }
  }

  /**
   * Returns the column class of the specified column
   * @param c the column index
   * @return the column class of the specified column
   */
  public Class<?> getColumnClass(int c) {
    return getValueAt(0, c).getClass();
  }

  /**
   * Returns true if the cell is editable.
   * @param row the row index
   * @param col the column index
   * @return true if the cell is editable
   */
  public boolean isCellEditable(int row, int col) {
    if (col == 0) return true;
    return false;
  }

  /**
   * Sets a cell's value.
   * @param value the new value of the cell
   * @param row the row index
   * @param col the column index
   */
  public void setValueAt(Object value, int row, int col) {
    data[row][col] = value;
    fireTableCellUpdated(row, col);
  }
  
}
