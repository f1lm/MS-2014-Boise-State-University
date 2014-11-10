/*
 * Copyright (c) 1999-2013 Christoph Mueller. All rights reserved.
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

import de.must.io.Logger;

/**
 * Utility to provide attribute matching from one row to another.
 * Dedicated to good old COBOL benefits.  ;-)
 * @author Christoph Mueller
 */
public class DataUtil {

  /**
   * Copies matching attributes from one table row to another.
   * @param doFrom the source data object
   * @param doTo the target data object
   */
  public static void moveCorr(DataObject doFrom, DataObject doTo) {
    moveCorr(doFrom, doTo, null);
  }
  
  /**
   * Copies matching attributes from one table row to another.
   * @param doFrom the source data object
   * @param doTo the target data object
   * @param columnNameToExclude the name of the column not be copied
   */
  public static void moveCorr(DataObject doFrom, DataObject doTo, String columnNameToExclude) {
    DataObject leadingTypeDo = doFrom;
    if (!(doFrom.getSqlDialect() instanceof MSAccessDialect) && doTo.getSqlDialect() instanceof MSAccessDialect) {
      leadingTypeDo = doTo; // by now, MS Access definitions are working fine
    }
    for (int i = 0; i < doFrom.getColumnCount(); i++) {
      String columnName = doFrom.getColumnName(i);
      boolean isToExclude = columnNameToExclude != null && columnName.equals(columnNameToExclude);
      if (!isToExclude && doTo.isColumnContained(columnName)) {
        // de.must.io.Logger.getInstance().info(getClass(), columnName + ": " + doFrom.getObject(columnName));
        switch (leadingTypeDo.getColumnType(i)) {
        case -7:
          doTo.setBoolean(columnName, doFrom.getBoolean(columnName));
          break;
        case -1:
          doTo.setText(columnName, doFrom.getText(columnName));
          break;
        case 1:
          if (doFrom.getObject(columnName) instanceof Boolean) { // MySQL
            doTo.setBoolean(columnName, doFrom.getBoolean(columnName));
          } else {
            String fromText = doFrom.getText(columnName);
            if (fromText != null) {
              doTo.setText(columnName, fromText);
            }
          }
          break;
        case 2:
          doTo.setDouble(columnName, doFrom.getDouble(columnName));
          break;
        case 3:
          doTo.setInt(columnName, doFrom.getInt(columnName));
          break;
        case 4:
          doTo.setInt(columnName, doFrom.getInt(columnName));
          break;
        case 5:
          doTo.setInt(columnName, doFrom.getInt(columnName));
          break;
        case 6:
          doTo.setFloat(columnName, doFrom.getFloat(columnName));
          break;
        case 7:
          doTo.setFloat(columnName, doFrom.getFloat(columnName));
          break;
        case 8:
          if (doTo.getColumnType(columnName) == 4) {
            // doTo.setInt(columnName, doFrom.getBigDecimal(columnName).intValue());
            doTo.setInt(columnName, (int)doFrom.getDouble(columnName));
          }
          else {
            //doTo.setBigDecimal(columnName, doFrom.getBigDecimal(columnName));
            doTo.setDouble(columnName, doFrom.getDouble(columnName));
          }
          break;
        case 12:
          doTo.setText(columnName, doFrom.getText(columnName));
          break;
        case 91:
          doTo.setDate(columnName, doFrom.getDate(columnName));
          break;
        case 92: // MySQL Time
          doTo.setTime(columnName, doFrom.getTime(columnName));
          break;
        case 93:
          doTo.setDate(columnName, doFrom.getDate(columnName));
          break;
        case 2005: // SQL Server Memo
          doTo.setText(columnName, doFrom.getText(columnName));
          break;
        default:
          doTo.setObject(columnName, doFrom.getObject(columnName));
          de.must.io.Logger.getInstance().info(DataUtil.class, "unknown ColumnType: " + doFrom.getColumnType(i) + " in DataUtil ");
        }
      }
    }
  }

  public static void moveCorr(DataTextObjectWithDelimiterAndLabels doFrom, DataObject doTo) {
    for (int i = 0; i < doTo.getColumnCount(); i++) {
      String columnName = doTo.getColumnName(i);
      if (doTo.isColumnContained(columnName)) {
        // de.must.io.Logger.getInstance().info(getClass(), columnName + ": " + doFrom.getObject(columnName));
        switch (doTo.getColumnType(i)) {
        case -7:
          doTo.setBoolean(columnName, doFrom.getBoolean(columnName));
          break;
        case -1:
          doTo.setText(columnName, doFrom.getText(columnName));
          break;
        case 1:
          if (doFrom.getObject(columnName) instanceof Boolean) { // MySQL
            doTo.setBoolean(columnName, doFrom.getBoolean(columnName));
          } else {
            doTo.setText(columnName, doFrom.getText(columnName));
          }
          break;
        case 2:
          doTo.setDouble(columnName, doFrom.getDouble(columnName));
          break;
        case 3:
          doTo.setInt(columnName, doFrom.getInt(columnName));
          break;
        case 4:
          doTo.setInt(columnName, doFrom.getInt(columnName));
          break;
        case 5:
          doTo.setInt(columnName, doFrom.getInt(columnName));
          break;
        case 6:
          try {
            doTo.setFloat(columnName, doFrom.getFloat(columnName));
          } catch (NumberFormatException e) { // column is not available, text empty
            Logger.getInstance().error(DataUtil.class, e);
          }
          break;
        case 7:
          try {
            doTo.setFloat(columnName, doFrom.getFloat(columnName));
          } catch (NumberFormatException e) { // column is not available, text empty
            Logger.getInstance().error(DataUtil.class, e);
          }
          break;
        case 8:
          if (doTo.getColumnType(columnName) == 4) {
            // doTo.setInt(columnName, doFrom.getBigDecimal(columnName).intValue());
            try {
              doTo.setInt(columnName, (int)doFrom.getDouble(columnName));
            } catch (NumberFormatException e) { // column is not available, text empty
              Logger.getInstance().error(DataUtil.class, e);
            }
          }
          else {
            //doTo.setBigDecimal(columnName, doFrom.getBigDecimal(columnName));
            try {
              doTo.setDouble(columnName, doFrom.getDouble(columnName));
            } catch (NumberFormatException e) { // column is not available, text empty
              Logger.getInstance().error(DataUtil.class, e);
            }
          }
          break;
        case 12:
          doTo.setText(columnName, doFrom.getText(columnName));
          break;
        case 91:
          doTo.setDate(columnName, doFrom.getDate(columnName));
          break;
        case 92: // MySQL Time
          doTo.setTime(columnName, doFrom.getTime(columnName));
          break;
        case 93:
          doTo.setDate(columnName, doFrom.getDate(columnName));
          break;
        case 2005: // SQL Server Memo
          doTo.setText(columnName, doFrom.getText(columnName));
          break;
        default:
          doTo.setObject(columnName, doFrom.getObject(columnName));
          de.must.io.Logger.getInstance().info(DataUtil.class, "unknown ColumnType: " + doTo.getColumnType(i) + " in DataUtil ");
        }
      }
    }
  }

  private DataUtil() {
  }

}
