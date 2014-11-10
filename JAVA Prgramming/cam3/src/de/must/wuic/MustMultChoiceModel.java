/*
 * Copyright (c) 1999-2007 Christoph Mueller. All rights reserved.
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
import javax.swing.table.*;

/**
 * @author Christoph Mueller
 */
public class MustMultChoiceModel extends AbstractTableModel {

  private DataObject keyDataObject; // assigned DataObject with keys for multiple choice
  private int columns;
  private int rows;

  private DataComboBox[][] dataComboBoxes;
  private String[] columnNames;
  private String[] fieldNames;
  private Object[][] data;
  private Object[][] oriData;  // original Data
  private int[] identifyValueInt;
  private int[] fieldTypes;
  private String uniqueKeyName;
  private String order = "";
  private int rowCount;

  /**
   *
   * @param keyDataObject
   * @param fieldNames
   * @param columnNames
   */
  public MustMultChoiceModel(DataObject keyDataObject, String[] fieldNames, String[] columnNames) {
    int i;
    this.keyDataObject = keyDataObject;
    this.fieldNames = fieldNames;
    this.columnNames = new String[columnNames.length + 1];
    this.columnNames[0] = "J/N";
    for (i=0; i < columnNames.length; i++) {
      this.columnNames[i+1] = columnNames[i];
    }
    this.uniqueKeyName = keyDataObject.getUniqueKeyName();
    if (keyDataObject.getIndices().length > 1) {
      order += keyDataObject.getIndices()[1].getIndexItems()[0].getFieldName();
      for (i = 1; i < keyDataObject.getIndices()[1].getIndexItems().length; i++) {
        order += ", " + keyDataObject.getIndices()[1].getIndexItems()[i].getFieldName();
      }
    }
    this.rows = getItemCount();
    data = new Object[rows][fieldNames.length + 1];
    oriData = new Object[rows][fieldNames.length + 1];
    identifyValueInt = new int[rows];
    fieldTypes = new int[rows];
    loadKeys();
  }

  /**
   *
   */
  private void loadKeys() {
    int i, j;
    String queryExpression = "select * from " + keyDataObject.getTableName();
    if (!order.equals("")) {
      queryExpression += " order by " + order;
    }
    keyDataObject.openQuery(queryExpression);
    i = -1;
    while (keyDataObject.nextRow()) {
      i++;
      data[i][0] = new Boolean(false);
      oriData[i][0] = new Boolean(false);
      identifyValueInt[i] = keyDataObject.getInt(uniqueKeyName);
      for (j=0; j < fieldNames.length; j++) {
        data[i][j+1] = keyDataObject.getObject(fieldNames[j]);
        oriData[i][j+1] = keyDataObject.getObject(fieldNames[j]);
      }
    }
    rowCount = i;
  }

  /**
   *
   * @return
   */
  public int getItemCount() {
    int itemCount;
    String queryExpression = "select * from " + keyDataObject.getTableName();
    keyDataObject.openQuery(queryExpression);
    itemCount = 0;
    while (keyDataObject.nextRow()) {
      itemCount++;
    }
    return itemCount;
  }

  /**
   *
   * @return
   */
  public boolean isModified() {
    int i;
    for (i=0; i < rows; i++) {
      if (isRowModified(i)) return true;
    }
    return false;
  }

  /**
   *
   * @param row
   * @return
   */
  public boolean isRowModified(int row) {
    int j;
    for (j=0; j < fieldNames.length; j++) {
      if (!data[row][j].equals(oriData[row][j])) return true;
    }
    return false;
  }

  /**
   *
   * @return
   */
  public int getColumnCount() {
    return columnNames.length;
  }

  /**
   *
   * @return
   */
  public int getRowCount() {
    return data.length;
  }

  /**
   *
   * @param col
   * @return
   */
  public String getColumnName(int col) {
    return columnNames[col];
  }
  /**
   *
   * @param col
   * @param columnName
   */
  public void setColumnName(int col, String columnName) {
    columnNames[col] = columnName;
  }

  /**
   *
   * @param row
   * @param col
   * @return
   */
  public Object getValueAt(int row, int col) {
    return data[row][col];
  }

  /**
   *
   * @param c
   * @return
   */
  public Class<?> getColumnClass(int c) {
    return getValueAt(0, c).getClass();
  }

  /*
   * Don't need to implement this method unless your table's editable.
   *
   * @param row
   * @param col
   * @return
   */
  public boolean isCellEditable(int row, int col) {
    if (col == 0) return true;
    return false;
  }

  /*
   * Don't need to implement this method unless your table's data can change.
   * @param value
   * @param row
   * @param col
   * @return
   */
  public void setValueAt(Object value, int row, int col) {
    data[row][col] = value;
    fireTableCellUpdated(row, col);
  }

  // public int[] getSelectedIdentifiers() {
  // }

  /**
   *
   * @param columnName
   * @return
   */
  public String getSelectedIdentifierCondition(String columnName) {
    String condition = "";
    int i = -1;
    while (++i <= rowCount) {
      // de.must.io.Logger.getInstance().info(getClass(), data[i][0]);
      if (((Boolean)data[i][0]).booleanValue() == true) {
        // de.must.io.Logger.getInstance().info(getClass(), data[i][1]);
        if (!condition.equals("")) condition += " or ";
        condition += columnName + " = " + identifyValueInt[i];
      }
    }
    return condition;
  }

}
