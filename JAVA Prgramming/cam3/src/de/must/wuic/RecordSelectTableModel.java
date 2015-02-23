/*
 * Copyright (c) 1999-2012 Christoph Mueller. All rights reserved.
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

import java.util.Hashtable;
import java.util.Vector;

import de.must.dataobj.*;

import javax.swing.JTable;
import javax.swing.table.*;

/**
 * A table model with identifiers. May be used to select a row and identify the record by the stored identifier.
 * @author Christoph Mueller
 */
public class RecordSelectTableModel extends MustTableModel {

  private TableRowSorter<TableModel> tableRowSorter;
  private Vector<Identifier> identifiers;
  private String[] columnNames;
  private boolean[] columnEditable;
  private Hashtable<String, Boolean> editableOutlier;

  public RecordSelectTableModel(String[] columnNames) {
    super(columnNames);
    this.columnNames = columnNames;
    columnEditable = new boolean[columnNames.length];
    identifiers = new Vector<Identifier>();
  }
  
  /**
   * Sets the flag if the column is editable in general for all rows.
   * @param column  the index of the column to set
   * @param editable  whether or not the column is editable in general
   */
  public void setColumnEditable(int column, boolean editable) {
    columnEditable[column] = editable;
  }

  /**
   * Sets the flag if the cell is editable.
   * For now, this will not work in combination with {@link #removeRow(int)}
   * @param row  the index of the row to set
   * @param column  the index of the column to set
   * @param editable  whether or not the column is editable in general
   */
  public void setCellEditable(int row, int column, boolean editable) {
    if (editableOutlier == null) editableOutlier = new Hashtable<String, Boolean>();
    editableOutlier.put(row + "-" + column, new Boolean(editable));
  }

  /**
   * Activates standard row sorting. 
   * @param table  the table to be sorting-enabled
   */
  public void setRowSorter(JTable table) {
    setRowSorter(table, new TableRowSorter<TableModel>());
  }

  /**
   * Activates row sorting with the TableRowSorter as specified.
   * @param table  the table to be sorting-enabled
   * @param tableRowSorter  the TableRowSorter to use
   */
  public void setRowSorter(JTable table, TableRowSorter<TableModel> tableRowSorter) {
    this.tableRowSorter = tableRowSorter;
    tableRowSorter.setModel(this);
    table.setRowSorter(tableRowSorter);
  }
  
  /**
   * Returns the used TableRowSorter.
   * @return the used TableRowSorter
   */
  public TableRowSorter<TableModel> getRowSorter() {
    return tableRowSorter;
  }
  
  public void resetSort() {
    if (tableRowSorter != null) tableRowSorter.setSortKeys(null);
  }

  /**
   * Clears the table including the associated identifiers.
   */
  public void removeAll() {
    resetSort();
    int rows = getDataVector().size();
    if (rows > 0) {
      getDataVector().removeAllElements();
      fireTableRowsDeleted(0, rows-1);
    }
    identifiers.removeAllElements();
    editableOutlier = null;
  }

  @Override
  public void removeRow(int rowIndex) {
    int dataRow = rowIndex;
    if (tableRowSorter != null) dataRow = tableRowSorter.convertRowIndexToModel(rowIndex);
    super.removeRow(dataRow);
    identifiers.remove(dataRow);
  }

  /**
   * Return the identifier of the row as specified.
   * @param row  the row's index
   * @return the identifier of the row as specified
   */
  public Identifier getIdentifier(int row) {
    if (row < 0) return null;
    if (row >= getRowCount()) return null;
    if (tableRowSorter != null) return identifiers.get(tableRowSorter.convertRowIndexToModel(row));
    else return identifiers.get(row);
  }

  @Override
  public boolean isCellEditable(int row, int column) {
    if (editableOutlier != null) {
      Boolean editable = editableOutlier.get(row + "-" + column);
      if (editable != null) {
        return editable.booleanValue();
      }
    }
    return columnEditable[column];
  }

  /**
   * Returns the value for the cell at <code>columnIndex</code> and
   * <code>rowIndex</code> as shown, e.g. after using rowsort functionality.
   * @param rowIndex  the row whose value is to be queried
   * @param columnIndex  the column whose value is to be queried
   * @return  the value Object at the specified cell
   */
  public Object getValueAsShownAt(int row, int col) {
    int realRow = row;
    if (tableRowSorter != null) realRow = tableRowSorter.convertRowIndexToModel(row);
    return getValueAt(realRow, col);
  }

//------------------------------------------------------------------------------

  /**
   * Adds a row with an identifier.
   * @param visualItems  the cell values if the row
   * @param identifier  the identifier of the database table row
   */
  public void addIndexedRow(Object[] visualItems, Identifier identifier) {
    addRow(visualItems);
    identifiers.add(identifier);
  }

  /**
   * Inserts a new row the model.
   * @param visualItems the cell values if the row
   * @param identifier the identifier to insert
   * @param itemIndex index (position of the identifier to insert)
   * @param maxRows the maximum of rows to be hold in the array - last item will vanish if size > maxRows
   */
  public void addIndexedRowInFirstLine(Object[] visualItems, Identifier identifier, int maxRows) {
    insertRow(0, visualItems);
    identifiers.insertElementAt(identifier, 0);
  }

  /**
   * Updates the values of one row.
   * @param visualItems  the cell values to be updated
   * @param rowIndex  the row's index
   */
  public void updateRow(Object[] visualItems, int rowIndex) {
    for (int i=0; i < visualItems.length; i++) {
      if (visualItems[i] != null) {
        setValueAt(visualItems[i], tableRowSorter.convertRowIndexToModel(rowIndex), i);
      }
    }
  }

}
