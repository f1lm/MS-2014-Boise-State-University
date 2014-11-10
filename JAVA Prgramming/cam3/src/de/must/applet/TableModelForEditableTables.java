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

package de.must.applet;

import java.util.Iterator;
import java.util.Vector;

import de.must.util.KeyValuePairAlpha;
import de.must.wuic.RecordSelectTableModel;

public class TableModelForEditableTables extends RecordSelectTableModel {

  public static final String getParamKey(int row, int col) {
    return "Cell" + Constants.ELEMENT_DELIMITER + row + Constants.ELEMENT_DELIMITER + col;
  }
  
  protected Object[][] oriData;  // original Data
  protected Vector<Integer> editableColumns; // entire column is editable
  
  public TableModelForEditableTables(String[] columnNames) {
    this(columnNames, null);
  }
  
  public TableModelForEditableTables(String[] columnNames, Vector<Integer> editableColumns) {
    super(columnNames);
    this.editableColumns = editableColumns;
  }
  
  public void setColumnEditable(int column) {
    editableColumns.add(new Integer(column));
  }
  
  public void setEditBeginState() {
    oriData = new Object[getRowCount()][getColumnCount()];
    for (int i = 0; i < oriData.length; i++) {
      for (int j = 0; j < oriData[i].length; j++) {
        oriData[i][j] = getValueAt(i, j);
      }
    }
  }

  @Override
  public boolean isCellEditable(int row, int column) {
    if (editableColumns != null) {
      Iterator<Integer> iterator = editableColumns.iterator();
      while (iterator.hasNext()) {
        if (iterator.next().intValue() == column) return true;
      }
    }
    return super.isCellEditable(row, column);
  }

  public void extendParams(Vector<KeyValuePairAlpha> params) {
    for (int i = 0; i < oriData.length; i++) {
      for (int j = 0; j < oriData[i].length; j++) {
        if (isCellChanged(i, j)) {
          params.add(new KeyValuePairAlpha(getParamKey(i, j), String.valueOf(getValueAt(i, j))));
        }
      }
    }
  }
  
  private boolean isCellChanged(int row, int column) {
    Object value = getValueAt(row, column);
    Object oriValue = oriData[row][column];
    if (value == null && oriValue != null) return true;
    if (value != null && oriValue == null) return true;
    if (value != null && oriValue != null && !value.equals(oriValue)) return true;
    return false;
  }
  
}
