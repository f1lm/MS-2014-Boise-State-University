/*
 * Copyright (c) 2012 Christoph Mueller. All rights reserved.
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

import java.util.Hashtable;
import java.util.Vector;

public class MustTableModel {
  
  private String[] columnNames;
  private Vector<Object[]> data;
  private boolean[] columnEditable;
  private Hashtable<String, Boolean> editableOutlier;

  public MustTableModel(String[] columnNames) {
    this.columnNames = columnNames;
    data = new Vector<Object[]>();
    columnEditable = new boolean[columnNames.length];
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

  public Vector<Object[]> getData() {
    return data;
  }
  
  public void removeAll() {
    data.clear();
    editableOutlier = null;
  }
  
  /**
   * Adds a row with an identifier.
   * @param visualItems  the cell values if the row
   */
  public void addRow(Object[] visualItems) {
    data.add(visualItems);
  }

  public void buildRemoteViewNewContent(ToAppletWriter out) {
    
  }
  
  /**
   * Returns the number of rows in this data table.
   * @return the number of rows in the model
   */
  public int getRowCount() {
    return data.size();
  }
  
  /**
   * Sets the object value for the cell at <code>column</code> and
   * <code>row</code>.  <code>aValue</code> is the new value.  This method
   * will generate a <code>tableChanged</code> notification.
   * @param value  the new value; this can be null
   * @param row  the row whose value is to be changed
   * @param column  the column whose value is to be changed
   */
  public void setValueAt(Object value, int row, int column) {
    data.elementAt(row)[column] = value;
  }

  /**
   * Returns an attribute value for the cell at <code>row</code>
   * and <code>column</code>.
   * @param row  the row whose value is to be queried
   * @param column  the column whose value is to be queried
   * @return the value Object at the specified cell
   */
  public Object getValueAt(int row, int column) {
    return data.elementAt(row)[column];
  }
  
  public boolean isCellEditable(int row, int column) {
    if (editableOutlier != null) {
      Boolean editable = editableOutlier.get(row + "-" + column);
      if (editable != null) {
        return editable.booleanValue();
      }
    }
    return columnEditable[column];
  }

}
