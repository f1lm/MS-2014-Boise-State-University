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

import java.util.Locale;

import javax.swing.table.AbstractTableModel;

import de.must.dataobj.Identifier;
import de.must.middle.FrameworkTextResource;
import de.must.util.DateString;

public class IdentifyTableModel extends AbstractTableModel {

  protected Locale locale;
  protected FrameworkTextResource frameworkTextResource;
  protected String[] columnNames;
  protected String[] fieldNames;
  protected Object[] fieldInis;  // initialize-values
  protected int[] fieldTypes;
  protected Object[][] data;
  protected Object[][] oriData;  // original Data
  protected Identifier[] identifier;
  protected boolean[] delMark;
  protected String order;
  protected int lastModifiedRow;
  
  public IdentifyTableModel(FrameworkTextResource frameworkTextResource) {
    this.frameworkTextResource = frameworkTextResource;
  }
  
  public IdentifyTableModel(String[] columnNames, Identifier[] identifier, Object[][] data, FrameworkTextResource frameworkTextResource) {
    this.columnNames = columnNames;
    this.identifier = identifier;
    this.data = data;
    this.frameworkTextResource = frameworkTextResource;
    oriData = new Object[data.length][columnNames.length];
    for (int i = 0; i < data.length; i++) {
      for (int j = 0; j < data[i].length; j++) {
        oriData[i][j] = data[i][j];
      }
    }
    delMark = new boolean[data.length];
  }

  private IdentifyTableModel(int rowCount, int columnCount) {
    columnNames = new String[columnCount];
    fieldNames = new String[columnCount];
    fieldInis = new Object[columnCount];
    data = new Object[rowCount][columnCount];
    oriData = new Object[rowCount][columnCount];
  }
  
  /**
   * Returns the identifier of the specified row
   * @param row the regarded row
   * @return the identifier of the specified row
   */
  public Identifier getIdentifier(int row) {
    return identifier[row];
  }

  /**
   * Marks the row for being deleted with next OK button press.
   * @param row the row to be deleted
   */
  public void markForDeletion(int row) {
    if (row > -1 & row < identifier.length && identifier[row] != null) {
      delMark[row] = true;
      data[row][0] = "- " + getTranslation("TEXT_REMOVED") + " -";
      fireTableCellUpdated(row, 0);
    }
  }

  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey) {
    return frameworkTextResource.getResourceString(resourceKey);
  }

  /**
   * Returns true if input is accepted.
   * @return true if input is accepted
   */
  public boolean isInputAccepted(TableAdministration dta) {
    int i;
    for (i=0; i < data.length; i++) {
      if (!isRowAccepted(i)) {
        dta.select(i);
        return false;
      }
    }
    return true;
  }

  private boolean isRowAccepted(int i) {
    for (int j=0; j < fieldNames.length; j++) {
      if (!delMark[i]) {
        switch (fieldTypes[j]) {
        case 91:
          if (!((String)data[i][j]).equals("")) {
            DateString temp = new DateString((String)data[i][j]);
            if (!temp.isValid()) return false;
          }
        case 93:
          if (!((String)data[i][j]).equals("")) {
            DateString temp = new DateString((String)data[i][j]);
            if (!temp.isValid()) return false;
          }
        }
      }
    }
    return true;
  }

  /**
   * Returns true if any row was modified by the user.
   * @return true if any row was modified by the user
   */
  public boolean isModified() {
    int i;
    for (i=0; i < data.length; i++) {
      if (isRowModified(i)) return true;
    }
    return false;
  }

  /**
   * Returns true if the row was modified by the user.
   * @param row the regarded row
   * @return true if any row was modified by the user
   */
  public boolean isRowModified(int row) {
    int j;
    for (j=0; j <  data[row].length; j++) {
      Object value = data[row][j];
      Object oriValue = oriData[row][j];
      if (value == null && oriValue != null) return true;
      if (value != null && oriValue == null) return true;
      if (value != null && oriValue != null && !value.equals(oriValue)) return true;
    }
    return false;
  }
  
  /**
   * Returns true if row is marked for deletion by user.
   * @param row the row to check
   * @return true if row is marked for deletion by user
   */
  public boolean isToDelete(int row) {
    return delMark[row]; 
  }

  /**
   * Returns the index of the last modified row in the grid.
   * @return the index of the last modified row in the grid
   */
  public int getLastModifiedRow() {
    int i;
    for (i=data.length; i > 0; i--) {
      if (isRowModified(i-1)) return i-1;
    }
    return -1;
  }

  /**
   * Returns the number of columns - 1
   * @return the number of columns - 1
   */
  public int getColumnCount() {
    return columnNames.length;
  }

  /**
   * Returns the number of rows - 1
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

  @Override
  public Class<?> getColumnClass(int columnIndex) {
    for (int i = 0; i < data.length; i++) {
      Object value = getValueAt(i, columnIndex);
      if (value != null) {
        return value.getClass();
      }
    }
    return super.getColumnClass(columnIndex); // no value, no class known
  }

  /**
   * Returns true if the cell is editable.
   * @param row the row index
   * @param col the column index
   * @return true if the cell is editable
   */
  public boolean isCellEditable(int row, int col) {
    return true;
  }
  
  public boolean isMarkedForDeletion(int row) {
    return delMark[row];
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
