/*
 * Copyright (c) 2010 Christoph Mueller. All rights reserved.
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

package de.must.dataobj;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.sql.Date;
import java.sql.Timestamp;

import de.must.io.CSVExport;
import de.must.io.Logger;

/**
 * Change log standard stuff.
 * @author Christoph Mueller
 */
public abstract class ChangeLogStd {
  
  public static final String INSERT_ID = "new";
  public static final String UPDATE_ID = "update";
  public static final String DELETE_ID = "delete";
  public static final char VALUE_SEPARATOR = '|';

  private PrintStream loggingFileStream;
  private String colChanges;

  /**
   * Creates a new change log. Some platforms, in particular, allow a file to be opened
   * for writing by only one at a time.
   */
  public ChangeLogStd(String loggingFilePath) {
    try {
      FileOutputStream fos = new FileOutputStream(loggingFilePath, true);
      loggingFileStream = new PrintStream(fos);
    } catch (FileNotFoundException e) {
      Logger.getInstance().error(getClass(), e);
    }
  }

  /**
   * Logs current changes of a data object.
   * @param dataObject the data object, whose changes are to be logged
   */
  public void log(DataObject dataObject) {
    colChanges = "";
    for (int i = 0; i < dataObject.getColumnCount(); i++) {
      String colName = dataObject.getColumnName(i);
      Object ori = dataObject.getOriginalOf(colName);
      Object wo = dataObject.getWorkedOnOf(colName);
      if (ori == null && wo == null) {} // no change
      else {
        String oriStringValue = getStringValue(ori);
        String newStringValue = getStringValue(wo);
        if (!oriStringValue.equals(newStringValue)) {
          addCol(colName, oriStringValue, newStringValue);
        }
      }
    }
    if (colChanges.length() > 0) {
      String preInfo = "";
      preInfo += (new Timestamp(System.currentTimeMillis())).toString();
      preInfo += CSVExport.COLUMN_SEPARATOR + System.getProperty("user.name");
      preInfo += CSVExport.COLUMN_SEPARATOR + dataObject.getTableName();
      if (dataObject.getMode() == DataObject.INSERTMODE) {
        preInfo += CSVExport.COLUMN_SEPARATOR + INSERT_ID;
      } else if (dataObject.getMode() == DataObject.UPDATEMODE) {
        preInfo += CSVExport.COLUMN_SEPARATOR + UPDATE_ID;
      }
      String identifier = "";
      if (dataObject.getIdentifier() != null) identifier = dataObject.getIdentifier().toString();
      preInfo += CSVExport.COLUMN_SEPARATOR + identifier;
      log(preInfo + colChanges);
    }
  }
  
  /**
   * Logs current deletion of a data object.
   * @param dataObject the data object, whose deletions are to be logged
   */
  public void logDeletion(DataObject dataObject) {
    String preInfo = "";
    preInfo += (new Timestamp(System.currentTimeMillis())).toString();
    preInfo += CSVExport.COLUMN_SEPARATOR + System.getProperty("user.name");
    preInfo += CSVExport.COLUMN_SEPARATOR + dataObject.getTableName();
    preInfo += CSVExport.COLUMN_SEPARATOR + DELETE_ID;
    String identifier = "";
    if (dataObject.getIdentifier() != null) identifier = dataObject.getIdentifier().toString();
    preInfo += CSVExport.COLUMN_SEPARATOR + identifier;
    log(preInfo);
  }
  
  /**
   * Logs current deletion of a data object.
   * @param tableName the name of the table
   * @param sql the SQL used for deletion
   */
  public void logDeletion(String tableName, String sql) {
    String preInfo = "";
    preInfo += (new Timestamp(System.currentTimeMillis())).toString();
    preInfo += CSVExport.COLUMN_SEPARATOR + System.getProperty("user.name");
    preInfo += CSVExport.COLUMN_SEPARATOR + tableName;
    preInfo += CSVExport.COLUMN_SEPARATOR + DELETE_ID;
    preInfo += CSVExport.COLUMN_SEPARATOR + "<SQL>";
    preInfo += CSVExport.COLUMN_SEPARATOR + sql;
    log(preInfo);
  }
  
  private String getStringValue(Object obj) {
    if (obj == null) {
      return "";
    } else if (obj instanceof String) {
      return (String)obj;
    } else if (obj instanceof Integer) {
      return ((Integer)obj).toString();
    } else if (obj instanceof Double) {
      return ((Double)obj).toString();
    } else if (obj instanceof Date) {
      return ((Date)obj).toString();
    } else if (obj instanceof Timestamp) {
      return ((Timestamp)obj).toString();
    } else return obj.toString();
  }
  
  private void addCol(String colName, String oldColValue, String newColValue) {
    colChanges += CSVExport.COLUMN_SEPARATOR + csvSecure(getColChangePart(colName, oldColValue, newColValue));
  }
  
  private String csvSecure(String column) {
    return CSVExport.csvSecure(column, new char[]{VALUE_SEPARATOR});
  }
  
  protected String getColChangePart(String colName, String oldColValue, String newColValue) {
    return colName + VALUE_SEPARATOR + replaceValueSeperator(oldColValue) + VALUE_SEPARATOR + replaceValueSeperator(newColValue);
  }
  
  private String replaceValueSeperator(String colValue) {
    return colValue.replace(VALUE_SEPARATOR, '/');
  }
  
  private void log(String info) {
    if (loggingFileStream != null) {
      loggingFileStream.println(info);
    }
  }
  
  @Override
  protected void finalize() throws Throwable {
    if (loggingFileStream != null) {
      loggingFileStream.close();
    }
    super.finalize();
  } 

}
