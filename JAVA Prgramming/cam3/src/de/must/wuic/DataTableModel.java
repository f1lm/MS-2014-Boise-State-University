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

import de.must.dataobj.*;
import de.must.util.*;

import java.util.Locale;

/**
 * Data table model as used by DataTableAdminstration.
 * @see DataTableAdministration
 * @author Christoph Mueller
 */
public class DataTableModel extends IdentifyTableModel {

  private String tableName;
  private DataObject aDO; // assigned DataObject
  private Callback callbackBeforeSaving;

  /**
   * Constructs a new data table model.
   * @param dO the assigned data object
   * @param fieldNames the grid field names = database column names
   * @param columnNames the grid column names = database column labels
   */
  public DataTableModel(Locale locale, DataObject dO, String[] fieldNames, String[] columnNames) {
    this(locale, dO, fieldNames, columnNames, 1); // the secondary index is usually the index for listing
  }

  /**
   * Constructs a new data table model.
   * @param dO the assigned data object
   * @param fieldNames the grid field names = database column names
   * @param columnNames the grid column names = database column labels
   * @param sortIndexNbr the number of the database index to be used for sorting
   */
  public DataTableModel(Locale locale, DataObject dO, String[] fieldNames, String[] columnNames, int sortIndexNbr) {
    this(locale, dO,  fieldNames, columnNames, "");
    int i;
    int orderElements;
    Index sortIndex = dO.getIndices()[sortIndexNbr];
    orderElements = sortIndex.getIndexItems().length;
    this.order = sortIndex.getIndexItems()[0].getFieldName();
    for (i = 1; i < orderElements; i++) {
      this.order += ", " + sortIndex.getIndexItems()[i].getFieldName();
    }
  }

  /**
   * Constructs a new data table model.
   * @param dO the assigned data object
   * @param fieldNames the grid field names = database column names
   * @param columnNames the grid column names = database column labels
   * @param order the fields for the order by clause
   */
  public DataTableModel(Locale locale, DataObject dO, String[] fieldNames, String[] columnNames, String order) {
    super(WuicGlobal.getInstance(locale));
    this.locale = locale;
    this.aDO = dO;
    this.tableName = dO.getTableName();
    this.fieldNames = fieldNames;
    this.columnNames = columnNames;
    this.order = order;
    int rows = getNumberOfExistingRows() + 20;
    if (rows < 50) rows = 50;
    data = new Object[rows][fieldNames.length];
    oriData = new Object[rows][fieldNames.length];
    identifier = new Identifier[rows];
    fieldTypes = new int[rows];
    delMark = new boolean[rows];
  }
  
  public void setCallbackBeforeSaving(Callback callbackBeforeSaving) {
    this.callbackBeforeSaving = callbackBeforeSaving;
  }

  /**
   * Returns the assigned data object.
   * @return the assigned data object
   */
  public DataObject getAssignedDataObject() {
    return aDO;
  }

  /**
   * Returns the number of existing rows.
   * @return the number of existing rows
   */
  private int getNumberOfExistingRows() {
    aDO.openQuery("select * from " + tableName);
    int numberOfExistingRows = 0;
    while (aDO.nextRow()) {
      numberOfExistingRows++;
    }
    aDO.closeQuery();
    return numberOfExistingRows; 
  }

  /**
   * Loads values from database.
   * @param filterCondition the content's filter condition - may be null.
   */
  public void loadValues(String filterCondition) {
    int i, j;
    prepareFieldInis();
    for (i=0; i < delMark.length; i++) {
      delMark[i] = false;
    }
    String queryExpression = "select * from " + tableName;
    if (filterCondition != null) {
      queryExpression += " where " + filterCondition;
    }
    if (!order.equals("")) {
      queryExpression += " order by " + order;
    }
    aDO.openQuery(queryExpression);
    i = -1;
    while (aDO.nextRow()) {
      i++; j = -1;
      identifier[i] = aDO.getIdentifier();
      for (j=0; j < fieldNames.length; j++) {
        int columnType = aDO.getColumnType(fieldNames[j]);
        if (columnType == 91 || columnType == 93) {
          java.sql.Date tempDate = aDO.getDate(fieldNames[j]);
          if (tempDate == null) {
            data[i][j] = "";
            oriData[i][j] = "";
          } else {
            DateString tempDateString =  new DateString(tempDate);
            data[i][j] = tempDateString.getEditableDateString();
            oriData[i][j] = tempDateString.getEditableDateString();
          }
        } else if (columnType == 2) { // e.g. Oracle number
          data[i][j] = new Integer(aDO.getInt(fieldNames[j]));
          oriData[i][j] = new Integer(aDO.getInt(fieldNames[j]));
        } else if (columnType == 8) { // e.g. Oracle number via ODBC
          data[i][j] = new Integer(aDO.getInt(fieldNames[j]));
          oriData[i][j] = new Integer(aDO.getInt(fieldNames[j]));
        } else {
          Object object = aDO.getObject(fieldNames[j]);
          if (object != null) {
            data[i][j] = object;
            oriData[i][j] = object;
          } else {
            data[i][j] = fieldInis[j];;
            oriData[i][j] = fieldInis[j];;
          }
        }
      }
    }
    aDO.closeQuery();
    // initializing the rest of the table
    int k;
    for (k=i+1; k < data.length; k++) {
      identifier[k] = null;
      for (j=0; j < fieldNames.length; j++) {
        data[k][j] = fieldInis[j];
        oriData[k][j] = fieldInis[j];
      }
    }
  }

  private void prepareFieldInis() {
    if (fieldInis != null) return;
    fieldInis = new Object[fieldNames.length];
    for (int j = 0; j < fieldNames.length; j++) {
      fieldTypes[j] = aDO.getColumnType(fieldNames[j]);
      switch (fieldTypes[j]) {
      case -7:
        fieldInis[j] = new Boolean(false);
        break;
      case 1:
        fieldInis[j] = "";
        break;
      case 2:
        // fieldInis[j] = new Double(0); Oracle number should be treated as integer
        fieldInis[j] = new Integer(0); 
        break;
      case 3: // AS/400 7P0
        fieldInis[j] = new Integer(0);
        break;
      case 4:
        fieldInis[j] = new Integer(0);
        break;
      case 5:
        fieldInis[j] = new Long(0);
        break;
      case 7:
        fieldInis[j] = new Float(0);
        break;
      case 8: // Oracle number via ODBC
        fieldInis[j] = new Integer(0); 
        break;
      case 12:
        fieldInis[j] = new String("");
        break;
      case 91: // MySQL date
        fieldInis[j] = new String("");
        break;
      case 93:
        fieldInis[j] = new String("");
        break;
      }
    }
  }

  /**
   * Saves the edited entries. Insert or update cases are treated automatically.
   * @return true if any savings had to be made
   */
  public boolean saveValues() {
    // fireTableDataChanged();  no use!
    lastModifiedRow = this.getLastModifiedRow();
    boolean isChanged = false;
    int i;
    for (i=0; i < delMark.length; i++) {
      if (isRowModified(i)) {
        isChanged = true;
        if (delMark[i]) aDO.delete(identifier[i]);
        else saveRow(i);
      }
    }
    return isChanged;
  }

  private void saveRow(int i) {
    int j;
    if (identifier[i] == null) {
      aDO.newRow();
      aDO.allocateNewIdentifier();
    }
    else {
      aDO.load(identifier[i]);
    }
    for (j=0; j < fieldNames.length; j++) {
      switch (aDO.getColumnType(fieldNames[j])) {
      case 2:
        aDO.setDouble(fieldNames[j], Double.valueOf(data[i][j].toString()).intValue());
        break;
      case 4:
        aDO.setInt(fieldNames[j], Integer.valueOf(data[i][j].toString()).intValue());
        break;
      case 8: // Oracle number via ODBC
        aDO.setDouble(fieldNames[j], Double.valueOf(data[i][j].toString()).intValue());
        break;
      case 91: // MySQL date
        DateString temp = new DateString((String)data[i][j]);
        aDO.setDate(fieldNames[j], temp.getSqlDate());
        break;
      case 93:
        temp = new DateString((String)data[i][j]);
        aDO.setDate(fieldNames[j], temp.getSqlDate());
        break;
      default:
        aDO.setObject(fieldNames[j], data[i][j]);
        // de.must.io.Logger.getInstance().info(getClass(), data[i][j]);
        // de.must.io.Logger.getInstance().info(getClass(), oriData[i][j]);
      }
    }
    if (callbackBeforeSaving != null) {
      callbackBeforeSaving.callback();
    }
    aDO.save(i != lastModifiedRow);
  }

}
