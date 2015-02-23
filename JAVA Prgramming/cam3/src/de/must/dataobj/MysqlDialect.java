/*
 * Copyright (c) 1999-2014 Christoph Mueller. All rights reserved.
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

import de.must.util.DateString;
import de.must.util.MustCalendar;
import de.must.util.StringFunctions;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.Hashtable;
import java.math.BigDecimal;

 /**
  * Handles the specific MySQL dialect.
  * Completes the work of DataObject.
  * @author Christoph Mueller
  * @see DataObject
  */
 public class MysqlDialect extends SqlDialect {

  public static final char BOOLEAN_TRUE_CHAR = 'Y';
  public static final char BOOLEAN_FALSE_CHAR = 'N';
  public static final String BOOLEAN_TRUE_STRING = String.valueOf(BOOLEAN_TRUE_CHAR);
  public static final String BOOLEAN_FALSE_STRING = String.valueOf(BOOLEAN_FALSE_CHAR);

  /**
   * Initializes a row. Needed to prepare an insert statement.
   * @param rs the used result set
   * @param original the buffer of original values (before changing values)
   * @param workedOn the buffer of worked on values (after changing values)
   * @param entity the table name
   * @param columnCount the number of the regarded columns
   * @param columnNames the names of the regarded columns
   * @param columnType the types of the regarded columns
   * @param columnScale the scales of the regarded columns
   */
  public void initRow(ResultSet rs, Hashtable<String, Object> original, Hashtable<String, Object> workedOn, String entity, int columnCount, String[] columnNames, int[] columnType, int[] columnScale) {
    for (int i = 1; i <= columnCount; i++) {
      // de.must.io.Logger.getInstance().info(getClass(), "initializing " + columnNames[i-1] + ", it's column type " + columnType[i-1]);
      switch (columnType[i-1]) {
      case -10: // MySQL 5.5 Memo ODBC
        original.put(columnNames[i-1].toUpperCase(), "");
        workedOn.put(columnNames[i-1].toUpperCase(), "");
        break;
      case -9: // MySQL ODBC 5.1 Driver
        original.put(columnNames[i-1].toUpperCase(), "");
        workedOn.put(columnNames[i-1].toUpperCase(), "");
        break;
      case -8: // MySQL ODBC 5.1 Driver
        original.put(columnNames[i-1].toUpperCase(), "");
        workedOn.put(columnNames[i-1].toUpperCase(), "");
        break;
      case Types.BIT: // -7 - MySQL probably ODBC / since 2011-09-21 regular JDBC too?
        original.put(columnNames[i-1].toUpperCase(), new Boolean(false));
        workedOn.put(columnNames[i-1].toUpperCase(), new Boolean(false));
        break;
      case -1: // MySQL "TEXT"
        original.put(columnNames[i-1].toUpperCase(), "");
        workedOn.put(columnNames[i-1].toUpperCase(), "");
        break;
      case 1:
        if (isKnownAsBoolean(columnNames[i-1])) {
          original.put(columnNames[i-1].toUpperCase(), new Boolean(false));
          workedOn.put(columnNames[i-1].toUpperCase(), new Boolean(false));
        } else {
          original.put(columnNames[i-1].toUpperCase(), "");
          workedOn.put(columnNames[i-1].toUpperCase(), "");
        }
        break;
      case 2:
        original.put(columnNames[i-1].toUpperCase(), new Float(0));
        workedOn.put(columnNames[i-1].toUpperCase(), new Float(0));
        break;
      case 3: // AS/400 7P0 / Oracle
        original.put(columnNames[i-1].toUpperCase(), new Double(0));
        workedOn.put(columnNames[i-1].toUpperCase(), new Double(0));
        break;
      case 4:
        original.put(columnNames[i-1].toUpperCase(), new Integer(0));
        workedOn.put(columnNames[i-1].toUpperCase(), new Integer(0));
        break;
      case 5:
        original.put(columnNames[i-1].toUpperCase(), new Long(0));
        workedOn.put(columnNames[i-1].toUpperCase(), new Long(0));
        break;
      case 6:
        original.put(columnNames[i-1].toUpperCase(), new Double(0));
        workedOn.put(columnNames[i-1].toUpperCase(), new Double(0));
        break;
      case 7:
        original.put(columnNames[i-1].toUpperCase(), new Float(0));
        workedOn.put(columnNames[i-1].toUpperCase(), new Float(0));
        break;
      case 8:
        original.put(columnNames[i-1].toUpperCase(), new Double(0));
        workedOn.put(columnNames[i-1].toUpperCase(), new Double(0));
        break;
      case 12:
        original.put(columnNames[i-1].toUpperCase(), "");
        workedOn.put(columnNames[i-1].toUpperCase(), "");
        break;
      case 91: // date
        // we want these null values in this case of Date
        original.remove(columnNames[i-1].toUpperCase());
        workedOn.remove(columnNames[i-1].toUpperCase());
        break;
      case 92: // time
        // we want these null values in this case of Time
        original.remove(columnNames[i-1].toUpperCase());
        workedOn.remove(columnNames[i-1].toUpperCase());
        break;
      case 93: // datetime / timestamp
        // we want these null values in this case of Date
        original.remove(columnNames[i-1].toUpperCase());
        workedOn.remove(columnNames[i-1].toUpperCase());
        break;
      default:
        de.must.io.Logger.getInstance().info(getClass(), "unsupported columnType: " + columnType[i-1] +  " at column " + columnNames[i-1]);
      }
    }
  }

  /**
   * Loads the row's values into buffers for random access.
   * @param rs the used result set
   * @param original the buffer of original values (before changing values)
   * @param workedOn the buffer of worked on values (after changing values)
   * @param entity the table name
   * @param columnCount the number of the regarded columns
   * @param columnNames the names of the regarded columns
   * @param columnType the types of the regarded columns
   * @param columnScale the scales of the regarded columns
   */
  public void loadRow(ResultSet rs, Hashtable<String, Object> original, Hashtable<String, Object> workedOn, String entity, int columnCount, String[] columnNames, int[] columnType, int[] columnScale) {
    Integer intValue;
    double doubleValue;
    Double DoubleValue;
    String textValue;
    boolean booleanValue;
    java.sql.Date dateValue;
    java.sql.Time timeValue;
    java.sql.Timestamp timestampValue;
    for (int i = 1; i <= columnCount; i++) {
      de.must.io.Logger.getInstance().debug(getClass(), "loading " + columnNames[i-1] + ", it's column type " + columnType[i-1]);
      switch (columnType[i-1]) {
      case -10: // MySQL 5.5 Memo ODBC
        textValue = getRowString(rs, columnNames[i-1]);
        if (textValue == null) textValue = "";
        original.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        workedOn.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        break;
      case -9: // MySQL ODBC 5.1 Driver
        textValue = getRowString(rs, columnNames[i-1]);
        if (textValue == null) textValue = "";
        original.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        workedOn.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        break;
      case -8: // MySQL ODBC 5.1 Driver
        textValue = getRowString(rs, columnNames[i-1]);
        if (textValue == null) textValue = "";
        original.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        workedOn.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        break;
      case Types.BIT: // -7 - MySQL probably ODBC / since 2011-09-21 regular JDBC too?
        boolean boolValue = getRowBoolean(rs, columnNames[i-1]);
        original.put(columnNames[i-1].toUpperCase(), new Boolean(boolValue));
        workedOn.put(columnNames[i-1].toUpperCase(), new Boolean(boolValue));
        break;
      case -5: // count(fieldName)
        intValue = new Integer(getRowInt(rs, columnNames[i-1]));
        original.put(columnNames[i-1].toUpperCase(), intValue);
        workedOn.put(columnNames[i-1].toUpperCase(), intValue);
        break;
      case -1:
        textValue = getRowString(rs, columnNames[i-1]);
        if (textValue == null) textValue = "";
        original.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        workedOn.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        break;
      case 1: // char (+ enum)
        textValue = getRowString(rs, columnNames[i-1]);
        if (isKnownAsBoolean(columnNames[i-1])) {
          if (textValue == null) booleanValue = false;
          else booleanValue = textValue.equals(BOOLEAN_TRUE_STRING);
          original.put(columnNames[i-1].toUpperCase(), new Boolean(booleanValue));
          workedOn.put(columnNames[i-1].toUpperCase(), new Boolean(booleanValue));
        } else {
          if (textValue == null) textValue = "";
          original.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
          workedOn.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        }
        break;
      case 2:
        Long longValue = new Long(getRowLong(rs, columnNames[i-1]));
        original.put(columnNames[i-1].toUpperCase(), longValue);
        workedOn.put(columnNames[i-1].toUpperCase(), longValue);
        break;
      case 3: // Oracle number
        doubleValue = getRowDouble(rs, columnNames[i-1]);
        if (columnScale[i-1] == 0) {
          DoubleValue = new Double(doubleValue);
          original.put(columnNames[i-1].toUpperCase(), DoubleValue);
          workedOn.put(columnNames[i-1].toUpperCase(), DoubleValue);
        } else {
          BigDecimal bigDecimalValue = new BigDecimal(doubleValue);
          bigDecimalValue.setScale(columnScale[i-1]);
          original.put(columnNames[i-1].toUpperCase(), bigDecimalValue);
          workedOn.put(columnNames[i-1].toUpperCase(), bigDecimalValue);
        }
        break;
      case 4:
        intValue = new Integer(getRowInt(rs, columnNames[i-1]));
        original.put(columnNames[i-1].toUpperCase(), intValue);
        workedOn.put(columnNames[i-1].toUpperCase(), intValue);
        break;
      case 5: // smallint
        intValue = new Integer(getRowInt(rs, columnNames[i-1]));
        original.put(columnNames[i-1].toUpperCase(), intValue);
        workedOn.put(columnNames[i-1].toUpperCase(), intValue);
        break;
      case 6:
        DoubleValue = new Double(getRowDouble(rs, columnNames[i-1]));
        original.put(columnNames[i-1].toUpperCase(), DoubleValue);
        workedOn.put(columnNames[i-1].toUpperCase(), DoubleValue);
        break;
      case 7:
        Float floatValue = new Float(getRowFloat(rs, columnNames[i-1]));
        original.put(columnNames[i-1].toUpperCase(), floatValue);
        workedOn.put(columnNames[i-1].toUpperCase(), floatValue);
        break;
      case 8:
        DoubleValue = new Double(getRowDouble(rs, columnNames[i-1]));
        original.put(columnNames[i-1].toUpperCase(), DoubleValue);
        workedOn.put(columnNames[i-1].toUpperCase(), DoubleValue);
        break;
      case 12:
        textValue = getRowString(rs, columnNames[i-1]);
        if (textValue == null) textValue = "";
        original.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        workedOn.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        break;
      case 91: // date
        dateValue = getRowDate(rs, columnNames[i-1]);
        if (dateValue != null) {
          original.put(columnNames[i-1].toUpperCase(), dateValue);
          workedOn.put(columnNames[i-1].toUpperCase(), dateValue);
        }
        else {
          original.remove(columnNames[i-1].toUpperCase());
          workedOn.remove(columnNames[i-1].toUpperCase());
        }
        break;
      case 92: // time
        timeValue = getRowTime(rs, columnNames[i-1]);
        if (timeValue != null) {
          original.put(columnNames[i-1].toUpperCase(), timeValue);
          workedOn.put(columnNames[i-1].toUpperCase(), timeValue);
        }
        else {
          original.remove(columnNames[i-1].toUpperCase());
          workedOn.remove(columnNames[i-1].toUpperCase());
        }
        break;
      case 93: // datetime / timestamp
        timestampValue = getRowTimestamp(rs, columnNames[i-1]);
        if (timestampValue != null) {
          original.put(columnNames[i-1].toUpperCase(), timestampValue);
          workedOn.put(columnNames[i-1].toUpperCase(), timestampValue);
        }
        else {
          original.remove(columnNames[i-1].toUpperCase());
          workedOn.remove(columnNames[i-1].toUpperCase());
        }
        break;
      default:
        de.must.io.Logger.getInstance().info(getClass(), "unsupported columnType: " + columnType[i-1] + " at column " + columnNames[i-1]);
      }
    }
  }

  // Variant with get by column number. But we avoid different modes if we can.
  // Remember we sometimes want to access unknown database tables!
  /* public void loadRow(ResultSet rs, Hashtable<String, Object> original, Hashtable<String, Object> workedOn, String entity, int columnCount, String[] columnNames, int[] columnType, int[] columnScale) {
    Integer intValue;
    double doubleValue;
    Double DoubleValue;
    String textValue;
    boolean booleanValue;
    java.sql.Date dateValue;
    java.sql.Time timeValue;
    for (int i = 1; i <= columnCount; i++) {
      de.must.io.Logger.getInstance().info(getClass(), "loading " + columnNames[i-1] + ", it's column type " + columnType[i-1]);
      switch (columnType[i-1]) {
      case -10:
        textValue = getRowString(rs, i);
        if (textValue == null) textValue = "";
        original.put(columnNames[i-1].toUpperCase(), textValue);
        workedOn.put(columnNames[i-1].toUpperCase(), textValue);
        break;
      case -1:
        textValue = getRowString(rs, i);
        if (textValue == null) textValue = "";
        original.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        workedOn.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        break;
      case 1: // char (+ enum)
        textValue = getRowString(rs, i);
        if (isKnownAsBoolean(columnNames[i-1])) {
          if (textValue == null) booleanValue = false;
          else booleanValue = textValue.equals(BOOLEAN_TRUE_STRING);
          original.put(columnNames[i-1].toUpperCase(), new Boolean(booleanValue));
          workedOn.put(columnNames[i-1].toUpperCase(), new Boolean(booleanValue));
        } else {
          if (textValue == null) textValue = "";
          original.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
          workedOn.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        }
        break;
      case 2:
        Long longValue = new Long(getRowLong(rs, i));
        if (longValue == null) longValue = new Long(0);
        original.put(columnNames[i-1].toUpperCase(), longValue);
        workedOn.put(columnNames[i-1].toUpperCase(), longValue);
        break;
      case 3: // Oracle number
        doubleValue = getRowDouble(rs, i);
        if (columnScale[i-1] == 0) {
          DoubleValue = new Double(doubleValue);
          original.put(columnNames[i-1].toUpperCase(), DoubleValue);
          workedOn.put(columnNames[i-1].toUpperCase(), DoubleValue);
        } else {
          BigDecimal bigDecimalValue = new BigDecimal(doubleValue);
          bigDecimalValue.setScale(columnScale[i-1]);
          original.put(columnNames[i-1].toUpperCase(), bigDecimalValue);
          workedOn.put(columnNames[i-1].toUpperCase(), bigDecimalValue);
        }
        break;
      case 4:
        intValue = new Integer(getRowInt(rs, i));
        if (intValue == null) intValue = new Integer(0);
        original.put(columnNames[i-1].toUpperCase(), intValue);
        workedOn.put(columnNames[i-1].toUpperCase(), intValue);
        break;
      case 5:
        longValue = new Long(getRowLong(rs, i));
        if (longValue == null) longValue = new Long(0);
        original.put(columnNames[i-1].toUpperCase(), longValue);
        workedOn.put(columnNames[i-1].toUpperCase(), longValue);
        break;
      case 7:
        Float floatValue = new Float(getRowFloat(rs, i));
        if (floatValue == null) floatValue = new Float(0);
        original.put(columnNames[i-1].toUpperCase(), floatValue);
        workedOn.put(columnNames[i-1].toUpperCase(), floatValue);
        break;
      case 8:
        DoubleValue = new Double(getRowDouble(rs, i));
        if (DoubleValue == null) DoubleValue = new Double(0);
        original.put(columnNames[i-1].toUpperCase(), DoubleValue);
        workedOn.put(columnNames[i-1].toUpperCase(), DoubleValue);
        break;
      case 12:
        textValue = getRowString(rs, i);
        if (textValue == null) textValue = "";
        original.put(columnNames[i-1].toUpperCase(), textValue);
        workedOn.put(columnNames[i-1].toUpperCase(), textValue);
        break;
      case 91: // date
        dateValue = getRowDate(rs, i);
        if (dateValue != null) {
          original.put(columnNames[i-1].toUpperCase(), dateValue);
          workedOn.put(columnNames[i-1].toUpperCase(), dateValue);
        }
        else {
          original.remove(columnNames[i-1]);
          workedOn.remove(columnNames[i-1]);
        }
        break;
      case 92: // Time
        timeValue = getRowTime(rs, i);
        if (timeValue != null) {
          original.put(columnNames[i-1].toUpperCase(), timeValue);
          workedOn.put(columnNames[i-1].toUpperCase(), timeValue);
        }
        else {
          original.remove(columnNames[i-1]);
          workedOn.remove(columnNames[i-1]);
        }
        break;
      case 93:
        dateValue = getRowDate(rs, i);
        if (dateValue != null) {
          original.put(columnNames[i-1].toUpperCase(), dateValue);
          workedOn.put(columnNames[i-1].toUpperCase(), dateValue);
        }
        else {
          original.remove(columnNames[i-1].toUpperCase());
          workedOn.remove(columnNames[i-1].toUpperCase());
        }
        break;
      default:
        de.must.io.Logger.getInstance().info(getClass(), "unsupported columnType: " + columnType[i-1] + " at column " + columnNames[i-1]);
      }
    }
  } */

  public void fillInsertStatementWithValues(PreparedStatement statementForInsertion, Hashtable<String, Object> original, Hashtable<String, Object> workedOn, String entity, int columnCount, String[] columnNames, int[] columnType, int[] columnScale, String columnNameOfRecordingDate, String columnNameOfRecordingUser, String recordingUser) throws SQLException {
    Integer workedOnInteger;
    Double workedOnDouble;
    String workedOnText;
    Boolean workedOnBoolean;
    java.sql.Date workedOnDate;
    java.sql.Time workedOnTime;
    java.sql.Timestamp workedOnTimestamp;
    for (int i = 1; i <= columnCount; i++) {
      switch (columnType[i-1]) {
      case -10: // MySQL 5.5 Memo ODBC
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnText.trim().equals("") & recordingUser != null) {
          if (columnNames[i-1].equals(columnNameOfRecordingUser)) {
            workedOnText = recordingUser;
          }
        }
        statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
        break;
      case Types.NVARCHAR: // -9, MySQL ODBC 5.1 Driver
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
        break;
      case Types.ROWID: // -8, MySQL ODBC 5.1 Driver
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
        break;
      case Types.BIT: // -7 - MySQL probably ODBC / since 2011-09-21 regular JDBC too?
        workedOnBoolean = (Boolean)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setBoolean(i, workedOnBoolean.booleanValue());
        break;
      case Types.LONGVARCHAR: // -1, MySQL "TEXT"
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
        break;
      case Types.CHAR: // 1, char, enum
        if (isKnownAsBoolean(columnNames[i-1])) {
          workedOnBoolean = (Boolean)workedOn.get(columnNames[i-1].toUpperCase());
          statementForInsertion.setString(i, (workedOnBoolean.booleanValue()?String.valueOf(BOOLEAN_TRUE_CHAR):String.valueOf(BOOLEAN_FALSE_CHAR))); 
        } else {
          workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
          if (workedOnText.trim().equals("") & recordingUser != null) {
            if (columnNames[i-1].equals(columnNameOfRecordingUser)) {
              workedOnText = recordingUser;
            }
          }
          statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
        }
        break;
      case Types.NUMERIC: // 2
        Long workedOnLong = (Long)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setLong(i, workedOnLong.longValue()); 
        break;
      case Types.DECIMAL: // 3, AS/400 7P0
        workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setDouble(i, workedOnDouble.doubleValue()); 
        break;
      case Types.INTEGER: // 4
        Object workedOnValue = workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnValue instanceof String) { // enum Y N
          workedOnText = (String)workedOnValue;
          statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
        } else {
          workedOnInteger = (Integer)workedOn.get(columnNames[i-1].toUpperCase());
          statementForInsertion.setInt(i, workedOnInteger.intValue()); 
        }
        break;
      case Types.SMALLINT: // 5, smallint
        workedOnInteger = (Integer)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setInt(i, workedOnInteger.intValue()); 
        break;
      case Types.FLOAT: // 6
        workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setDouble(i, workedOnDouble.doubleValue()); 
        break;
      case Types.REAL: // 7
        Float workedOnFloat = (Float)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setFloat(i, workedOnFloat.floatValue()); 
        break;
      case Types.DOUBLE: // 8
        workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setDouble(i, workedOnDouble.doubleValue()); 
        break;
      case Types.VARCHAR: // 12
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnText.trim().equals("") & recordingUser != null) {
          if (columnNames[i-1].equals(columnNameOfRecordingUser)) {
            workedOnText = recordingUser;
          }
        }
        statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
        break;
      case Types.DATE: // 91, date
        workedOnDate = (java.sql.Date)workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnDate != null) {
          statementForInsertion.setDate(i, workedOnDate); 
        } else {
          if (columnNames[i-1].equals(columnNameOfRecordingDate)) {
            statementForInsertion.setDate(i, DataObject.getStaticRecordingDate()); 
          } else {
            statementForInsertion.setDate(i, null); // if not: java.lang.NullPointerException at org.gjt.mm.mysql.Buffer.writeStringNoNull(Buffer.java:354) at org.gjt.mm.mysql.PreparedStatement.execute(PreparedStatement.java:1043)
          }
        }
        break;
      case Types.TIME: // 92, time
        workedOnTime = (java.sql.Time)workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnTime != null) {
          statementForInsertion.setTime(i, workedOnTime); 
        } else {
          statementForInsertion.setTime(i, null); // sonst vermutlich auch hier java.lang.NullPointerException at org.gjt.mm.mysql.Buffer.writeStringNoNull(Buffer.java:354) at org.gjt.mm.mysql.PreparedStatement.execute(PreparedStatement.java:1043)
        }
        break;
      case Types.TIMESTAMP: // 93, datetime / timestamp
        workedOnTimestamp = (Timestamp)workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnTimestamp != null) {
          statementForInsertion.setTimestamp(i, workedOnTimestamp); 
        } else {
          if (columnNames[i-1].equals(columnNameOfRecordingDate)) {
            statementForInsertion.setTimestamp(i, new Timestamp(MustCalendar.getTodaySqlDate().getTime()));
          } else {
            statementForInsertion.setTimestamp(i, null); // sonst vermutlich auch hier java.lang.NullPointerException at org.gjt.mm.mysql.Buffer.writeStringNoNull(Buffer.java:354) at org.gjt.mm.mysql.PreparedStatement.execute(PreparedStatement.java:1043)
          }
        }
        break;
      default:
        de.must.io.Logger.getInstance().info(getClass(), "unknown columnType: " + columnType[i-1] +  " at column " + columnNames[i-1] + ", trying text...");
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
      }
    }
  }

  /**
   * Returns the update statement string.
   * @param original the buffer of original values (before changing values)
   * @param workedOn the buffer of worked on values (after changing values)
   * @param entity the table name
   * @param columnCount the number of the regarded columns
   * @param columnNames the names of the regarded columns
   * @param columnType the types of the regarded columns
   * @param columnScale the scales of the regarded columns
   * @return the update statement string
   */
  public String getUpdatePhrase(Hashtable<String, Object> original, Hashtable<String, Object> workedOn, String entity, int columnCount, String[] columnNames, int[] columnType, int[] columnScale) {
    Integer originalInteger;
    Integer workedOnInteger;
    Double originalDouble;
    Double workedOnDouble;
    String originalText;
    String workedOnText;
    Boolean originalBoolean;
    Boolean workedOnBoolean;
    java.sql.Date originalDate;
    java.sql.Date workedOnDate;
    java.sql.Time originalTime;
    java.sql.Time workedOnTime;
    java.sql.Timestamp originalTimestamp;
    java.sql.Timestamp workedOnTimestamp;
    boolean isToUpdate;
    int countUpdateColumns = 0;
    StringBuffer updateStatement = new StringBuffer("update " + entity + " set ");
    for (int i = 1; i <= columnCount; i++) {
      switch (columnType[i-1]) {
      case -10: // MySQL 5.5 Memo ODBC
        originalText = (String)original.get(columnNames[i-1].toUpperCase());
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
          // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1] + " modified");
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = \'" + sqlSecure(workedOnText) + "\'");
        }
        break;
      case -9: // MySQL ODBC 5.1 Driver
        originalText = (String)original.get(columnNames[i-1].toUpperCase());
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
          // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = \'" + sqlSecure(workedOnText) + "\'");
        }
        break;
      case -8: // MySQL ODBC 5.1 Driver
        originalText = (String)original.get(columnNames[i-1].toUpperCase());
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
          // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = \'" + sqlSecure(workedOnText) + "\'");
        }
        break;
      case Types.BIT: // -7 - MySQL probably ODBC / since 2011-09-21 regular JDBC too?
        originalBoolean = (Boolean)original.get(columnNames[i-1].toUpperCase());
        workedOnBoolean = (Boolean)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnBoolean.equals(originalBoolean)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          if (workedOnBoolean.booleanValue()) updateStatement.append(columnNames[i-1] + " = 1");
          else updateStatement.append(" " + columnNames[i-1] + " = 0");
        }
        break;
      case -1: // MySQL "TEXT"
        originalText = (String)original.get(columnNames[i-1].toUpperCase());
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
          // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = \'" + sqlSecure(workedOnText) + "\'");
        }
        break;
      case 1:
        if (isKnownAsBoolean(columnNames[i-1])) {
          originalBoolean = (Boolean)original.get(columnNames[i-1].toUpperCase());
          workedOnBoolean = (Boolean)workedOn.get(columnNames[i-1].toUpperCase());
          if (!workedOnBoolean.equals(originalBoolean)) {
            if (++countUpdateColumns > 1) updateStatement.append(", ");
            updateStatement.append(columnNames[i-1] + " = \'" 
            + (workedOnBoolean.booleanValue()?BOOLEAN_TRUE_CHAR:BOOLEAN_FALSE_CHAR) 
            + "\'");
          }  
        } else {
          originalText = (String)original.get(columnNames[i-1].toUpperCase());
          workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
          if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
            // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
            if (++countUpdateColumns > 1) updateStatement.append(", ");
            updateStatement.append(columnNames[i-1] + " = \'" + sqlSecure(workedOnText) + "\'");
          }
        }
        break;
      case 2:
        Long originalLong = (Long)original.get(columnNames[i-1].toUpperCase());
        Long workedOnLong = (Long)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnLong.equals(originalLong)) {
          // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = " + workedOnLong.toString());
        }
        break;
      case 3: // double
        Object WorkedOnColumnObject = workedOn.get(columnNames[i-1].toUpperCase());
        if (WorkedOnColumnObject instanceof BigDecimal) {
          workedOnDouble = new Double(((BigDecimal)WorkedOnColumnObject).doubleValue());
        } else {
          workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
        }
        originalDouble = (Double)original.get(columnNames[i-1].toUpperCase());
        if (!workedOnDouble.equals(originalDouble)) {
          // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = " + getSQLFormat(workedOnDouble));
        }
        break;
      case 4:
        originalInteger = (Integer)original.get(columnNames[i-1].toUpperCase());
        Object workedOnValue = workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnValue instanceof String) { // enum Y N
          workedOnText = (String)workedOnValue;
            if (++countUpdateColumns > 1) updateStatement.append(", ");
            updateStatement.append(columnNames[i-1] + " = '" + workedOnText + "'");
        } else {
          workedOnInteger = (Integer)workedOnValue;
          if (!workedOnInteger.equals(originalInteger)) {
            // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
            if (++countUpdateColumns > 1) updateStatement.append(", ");
            updateStatement.append(columnNames[i-1] + " = " + workedOnInteger.toString());
          }
        }
        break;
      case 5:
        originalInteger = (Integer)original.get(columnNames[i-1].toUpperCase());
        workedOnInteger = (Integer)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnInteger.equals(originalInteger)) {
          // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = " + workedOnInteger.toString());
        }
        break;
      case 6:
        if (columnScale[i-1] == 0) {
          originalDouble = (Double)original.get(columnNames[i-1].toUpperCase());
          workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
          if (!workedOnDouble.equals(originalDouble)) {
            if (++countUpdateColumns > 1) updateStatement.append(", ");
            updateStatement.append(columnNames[i-1] + " = " + getSQLFormat(workedOnDouble));
          }
        } else {
          originalDouble = (Double)original.get(columnNames[i-1].toUpperCase());
          workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
          if (!workedOnDouble.equals(originalDouble)) {
            if (++countUpdateColumns > 1) updateStatement.append(", ");
            updateStatement.append(columnNames[i-1] + " = " + getSQLFormat(workedOnDouble));
          }
        }
        break;
      case 7:
        Float originalFloat = (Float)original.get(columnNames[i-1].toUpperCase());
        Float workedOnFloat = (Float)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnFloat.equals(originalFloat)) {
          // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = " + workedOnFloat.toString());
        }
        break;
      case 8:
        // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
        if (columnScale[i-1] == 0) {
          originalDouble = (Double)original.get(columnNames[i-1].toUpperCase());
          workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
          if (!workedOnDouble.equals(originalDouble)) {
            // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
            if (++countUpdateColumns > 1) updateStatement.append(", ");
            updateStatement.append(columnNames[i-1] + " = " + getSQLFormat(workedOnDouble));
          }
        } else {
          originalDouble = (Double)original.get(columnNames[i-1].toUpperCase());
          workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
          if (!workedOnDouble.equals(originalDouble)) {
            // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
            if (++countUpdateColumns > 1) updateStatement.append(", ");
            updateStatement.append(columnNames[i-1] + " = " + getSQLFormat(workedOnDouble));
          }
        }
        break;
      case 12:
        originalText = (String)original.get(columnNames[i-1].toUpperCase());
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
          // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1] + " modified");
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = \'" + sqlSecure(workedOnText) + "\'");
        }
        break;
      case 91: // date
        originalDate = (java.sql.Date)original.get(columnNames[i-1].toUpperCase());
        workedOnDate = (java.sql.Date)workedOn.get(columnNames[i-1].toUpperCase());
        isToUpdate = false;
        if (workedOnDate == null & originalDate != null) isToUpdate = true;
        if (workedOnDate != null & originalDate == null) isToUpdate = true;
        if (workedOnDate != null & originalDate != null) {
           isToUpdate = !workedOnDate.equals(originalDate);
        }
        if (isToUpdate) {
          if (workedOnDate == null) {
            if (++countUpdateColumns > 1) updateStatement.append(", ");
            updateStatement.append(columnNames[i-1] + " = NULL");
          }
          else {
          if (++countUpdateColumns > 1) updateStatement.append(", ");
            // access: updateStatement.append(columnNames[i-1] + " = \'" + workedOnDate + "\'";
            updateStatement.append(columnNames[i-1] + " = " + getDbExpression(workedOnDate));
          }
        }
        break;
      case 92: // time
        originalTime = (java.sql.Time)original.get(columnNames[i-1].toUpperCase());
        workedOnTime = (java.sql.Time)workedOn.get(columnNames[i-1].toUpperCase());
        isToUpdate = false;
        if (workedOnTime == null & originalTime != null) isToUpdate = true;
        if (workedOnTime != null & originalTime == null) isToUpdate = true;
        if (workedOnTime != null & originalTime != null) {
           isToUpdate = !workedOnTime.equals(originalTime);
        }
        if (isToUpdate) {
          if (workedOnTime == null) {
            if (++countUpdateColumns > 1) updateStatement.append(", ");
            updateStatement.append(columnNames[i-1] + " = NULL");
          }
          else {
          if (++countUpdateColumns > 1) updateStatement.append(", ");
            updateStatement.append(columnNames[i-1] + " = " + getDbExpression(workedOnTime));
          }
        }
        break;
      case 93: // timestamp
        originalTimestamp = (java.sql.Timestamp)original.get(columnNames[i-1].toUpperCase());
        workedOnTimestamp = (java.sql.Timestamp)workedOn.get(columnNames[i-1].toUpperCase());
        isToUpdate = false;
        if (workedOnTimestamp == null & originalTimestamp != null) isToUpdate = true;
        if (workedOnTimestamp != null & originalTimestamp == null) isToUpdate = true;
        if (workedOnTimestamp != null & originalTimestamp != null) {
           isToUpdate = !workedOnTimestamp.equals(originalTimestamp);
        }
        if (isToUpdate) {
          if (workedOnTimestamp == null) {
            if (++countUpdateColumns > 1) updateStatement.append(", ");
            updateStatement.append(columnNames[i-1] + " = NULL");
          }
          else {
          if (++countUpdateColumns > 1) updateStatement.append(", ");
            updateStatement.append(columnNames[i-1] + " = " + getDbExpression(workedOnTimestamp));
          }
        }
        break;
      default:
      }
    }
    if (countUpdateColumns == 0) return null;
    else return updateStatement.toString();
  }

  /**
   * Returns the database specific expression of the date as specified.
   * @param sqlDate the date to be formatted  
   * @return the specific variant of setting a date value
   */
  public static String getDbExpression(java.sql.Date sqlDate) {
    return "\'" + sqlDate + "\'";
  }

  /**
   * Returns the database specific expression of the time as specified.
   * @param sqlTime the time to be formatted  
   * @return the specific variant of setting a time value
   */
  public static String getDbExpression(java.sql.Time sqlTime) {
    return "\'" + sqlTime.toString() + "\'";
  }

  /**
   * Returns the database specific expression of the timestamp as specified.
   * @param timeStamp the time stamp to be formatted  
   * @return the database specific expression of the timestamp
   */
  public static String getDbExpression(java.sql.Timestamp timeStamp) {
    return "\'" + de.must.util.MustTimestamp.getJDBCEscapeFormat(timeStamp) + "\'";
  }

  /**
   * Unifies the table name.
   * @param tableName the table name to unify
   * @return the unified table name
   */
  public String unifyTableName(String TableName) {
    // do NOT upper case in MySQL!
    return TableName;
  }

  /**
   * Unifies the column name.
   * @param columnName the column name to unify
   * @return the unified column name
   */
  public String unifyColumnName(String columnName) {
    // do NOT upper case in MySQL!
    return columnName;
  }

  /**
   * Returns the specific variant how date values are compared.
   * @param dateString the DateString to be prepared
   * @return the prepared String for data comparison
   */
  public String getSqlCompareString(de.must.util.DateString dateString) {
    return "'" + dateString.getSqlCompareString() + "'";
  }

  /**
   * Returns the specific variant how date values are compared.
   * @param date the date value to be prepared
   * @return the prepared String for data comparison
   */
  public String getSqlCompareString(Date date) {
    return getSqlCompareString(new DateString(date));
  }
  
  @Override
  public String getSqlCompareString(boolean b) {
    if (b) return "'" + BOOLEAN_TRUE_CHAR + "'";
    else return "'" + BOOLEAN_FALSE_CHAR + "'";
  }
  
  /**
   * Returns the value of a column as boolean.
   * @param columnName the name of the column
   * @param original the buffer of original values of the row
   * @return the value of a column
   */
  public boolean getBoolean(String columnName, Hashtable<String, Object> original) {
    Object value = original.get(columnName.toUpperCase());
    if (value == null) {
      de.must.io.Logger.getInstance().info(getClass(), "Column " + unifyColumnName(columnName) +  " not available");
      return false;
    }
    if (value instanceof Boolean) {
      return ((Boolean)value).booleanValue();
    }
    if (value instanceof String) {
      String stringValue = (String)value;
      if (stringValue.equals(String.valueOf(BOOLEAN_TRUE_CHAR))) return true;
      if (stringValue.equals(String.valueOf(BOOLEAN_FALSE_CHAR))) return false;
      de.must.io.Logger.getInstance().info(getClass(), "Column " + unifyColumnName(columnName) +  " not boolean");
      return false;
    }
    if (value instanceof Integer) {
      Integer integerValue = (Integer)value;
      de.must.io.Logger.getInstance().info(getClass(), "Column " + unifyColumnName(columnName) +  " expected " + BOOLEAN_TRUE_CHAR + " or " + BOOLEAN_FALSE_CHAR + " but found " + integerValue);
      return (integerValue.intValue() != 0);
    }
    de.must.io.Logger.getInstance().info(getClass(), "Column " + unifyColumnName(columnName) +  " not castable");
    return false;
  }

  /**
   * Returns the value of a column as boolean in a worked on state -
   * it might already been modified and differ from the original value.
   * @param columnName the name of the column
   * @param workedOn the buffer of worked on values of the row
   * @return the actual value of a column
   */
  public boolean getWorkedOnBoolean(String columnName, Hashtable<String, Object> workedOn) {
    Object value = workedOn.get(columnName.toUpperCase());
    if (value == null) {
      de.must.io.Logger.getInstance().info(getClass(), "Column " + unifyColumnName(columnName) +  " not available");
      return false;
    }
    if (value instanceof String) {
      String stringValue = (String)value;
      if (stringValue.equals(String.valueOf(BOOLEAN_TRUE_CHAR))) return true;
      if (stringValue.equals(String.valueOf(BOOLEAN_FALSE_CHAR))) return false;
      de.must.io.Logger.getInstance().info(getClass(), "Column " + unifyColumnName(columnName) +  " not boolean");
      return false;
    }
    if (value instanceof Integer) {
      Integer integerValue = (Integer)value;
      de.must.io.Logger.getInstance().info(getClass(), "Column " + unifyColumnName(columnName) +  " expected " + BOOLEAN_TRUE_CHAR + " or " + BOOLEAN_FALSE_CHAR + " but found " + integerValue);
      return (integerValue.intValue() != 0);
    }
    de.must.io.Logger.getInstance().info(getClass(), "Column " + unifyColumnName(columnName) +  " not castable");
    return false;
  }

  /**
   * Sets the value of the specified column.
   * @param columnName the name of the column to be set
   * @param boolValue the value the column shall be set to
   * @param workedOn the buffer of worked on values of the row
   */
  public void setBoolean(String columnName, boolean boolValue, Hashtable<String, Object> workedOn) {
    Object previousValue = workedOn.get(columnName.toUpperCase());
    // de.must.io.Logger.getInstance().info(getClass(), "previousValue.getClass(): " + previousValue.getClass().getName());
    if (previousValue instanceof Boolean) {
      workedOn.put(columnName.toUpperCase(), new Boolean(boolValue));
      return;
    }
    if (previousValue instanceof String) { 
      if (boolValue) workedOn.put(columnName.toUpperCase(), String.valueOf(BOOLEAN_TRUE_CHAR));
      else workedOn.put(columnName.toUpperCase(), String.valueOf(BOOLEAN_FALSE_CHAR));
      return;
    }
    if (previousValue instanceof Integer) {
      if (boolValue) workedOn.put(columnName.toUpperCase(), new Integer(1));
      else workedOn.put(columnName.toUpperCase(), new Integer(0));
      return;
    } 
    de.must.io.Logger.getInstance().info(getClass(), "Could not set boolean for " + columnName);
  }

  public static String getCreateStatement(EntityInfo entityInfo) {
    return getCreateStatement(entityInfo.getTableName(), entityInfo.getAttributes(), entityInfo.getIndices());
  }

  /**
   * Returns the specific create statement string of the specified table
   * @param tableName the name of the table to be created
   * @param attributes the attribute of the table to be created
   * @return the create statement string
   */
  public static String getCreateStatement(String tableName, AbstractAttribute[] attributes, Index[] indices) {
    StringBuffer createStatement = new StringBuffer("create table " + tableName + " (");
    int lastPos = attributes.length - 1;
    for (int i = 0; i <= lastPos; i++) {
      createStatement.append(attributes[i].getFieldName() + " ");
      switch (attributes[i].getType()) {
      case AbstractAttribute.LOGICAL:
        createStatement.append("enum(' ', 'N','Y') default 'N'");
        break;
      case AbstractAttribute.MEMO:
        createStatement.append("TEXT");
        break;
      case AbstractAttribute.DECIMAL:
        int length = attributes[i].getLength();
        int scale = attributes[i].getScale();
        createStatement.append("DOUBLE");
        if (length > 0) {
          createStatement.append("(" + length);
          if (scale != 0) createStatement.append(", " + scale);
          createStatement.append(")");
        }
        break;
      case AbstractAttribute.INTEGER:
        createStatement.append("INTEGER");
        break;
      case AbstractAttribute.BIGINT:
        createStatement.append("BIGINT");
        break;
      case AbstractAttribute.FLOAT:
        createStatement.append("DOUBLE");
        break;
      case AbstractAttribute.NUMBER:
        length = attributes[i].getLength();
        scale = attributes[i].getScale();
        if (scale != 0) {
          createStatement.append("DOUBLE");
          createStatement.append("(" + length);
          if (scale != 0) createStatement.append(", " + scale);
          createStatement.append(")");
        } else {
          createStatement.append("INTEGER");
          if (length != 0) {
          createStatement.append("(" + length + ")");
          }
        }
        break;
      case AbstractAttribute.CHAR:
        createStatement.append("char(" + attributes[i].getLength() + ")");
        break;
      case AbstractAttribute.VARCHAR:
        if (attributes[i].getLength() > 254) {
          createStatement.append("TEXT");
        } else {
          createStatement.append("varchar(" + attributes[i].getLength() + ")");
        }
        break;
      case AbstractAttribute.DATE:
        createStatement.append("date");
        break;
      case AbstractAttribute.TIME:
        createStatement.append("time");
        break;
      case AbstractAttribute.TIMESTAMP:
        createStatement.append("timestamp");
        break;
      case AbstractAttribute.DATETIME:
        createStatement.append("datetime");
        break;
      }
      if (isPartOfPrimaryKey(attributes[i].getFieldName(), indices)) {
        createStatement.append(" NOT NULL");
      }
      if (i < lastPos) createStatement.append(", ");
    }
    if (indices.length > 0 && indices[0].getOccurrence()==Index.UNIQUE) {
      createStatement.append(", Constraint " +  tableName  + "1 PRIMARY KEY(");
      for (int i = 0; i < indices[0].getIndexItems().length; i++) {
        if (i > 0) createStatement.append(", ");
        createStatement.append(indices[0].getIndexItems()[i].getFieldName());
      }
      createStatement.append(")");
    }
    createStatement.append(")");
    // de.must.io.Logger.getInstance().info(getClass(), createStatement);
    return createStatement.toString();
  }

  /**
   * Returns the specific create index statement string of the specified table
   * @param tableName the name of the table to be indexed
   * @param index the index to be created
   * @return the create index statement string
   */
  public static String getCreateIndexStatement(String tableName, Index index, String indexName) {
    StringBuffer createIndexStatement;
      if (index.getOccurrence()==Index.UNIQUE) {
        createIndexStatement = new StringBuffer("create unique index ");
      }
      else {
        createIndexStatement = new StringBuffer("create index ");
      }
      createIndexStatement.append(indexName + " on " + tableName + " (");
      int countIndexItems = index.getIndexItems().length;
      for (int j = 0; j < countIndexItems; j++) {
        createIndexStatement.append(index.getIndexItems()[j].getFieldName());
        if (j < countIndexItems -1) createIndexStatement.append(", ");
      }
      createIndexStatement.append(")");
    return createIndexStatement.toString();
  }

  private static boolean isPartOfPrimaryKey(String fieldName, Index[] indices) {
    if (indices.length == 0) return false;
    if (indices[0].getOccurrence()!=Index.UNIQUE) return false;
    for (int i = 0; i < indices[0].getIndexItems().length; i++) {
      if (indices[0].getIndexItems()[i].getFieldName().equals(fieldName)) return true ;
    }
    return false;
  }

  /**
   * Returns the limitation fragment of the SQL statement.
   * @param limit maximum of entries to be put into the result set
   * @param offset the number of records that don't have to be read anymore
   * @return the limitation fragment
   */
  protected String getLimitationFragment(int limit, int offset) {
    if (offset == 0) return "LIMIT " + limit;
    return "LIMIT " + offset + "," + limit;
  }

	/* (non-Javadoc)
	 * @see de.must.dataobj.SqlDialect#sqlSecure(java.lang.String)
	 */
	protected String sqlSecure(String stringField) {
    if (stringField.indexOf('\'') == -1 && stringField.indexOf('\\') == -1) return stringField;
    int i, j;
    char[] oldChars = stringField.toCharArray();
    char[] newChars = new char[stringField.length() * 2];
    j = -1;
    for (i = 0; i < stringField.length(); i++) {
      j++;
      if (oldChars[i] == '\'') {
        newChars[j] = '\'';
        newChars[++j] = '\'';
      } else if (oldChars[i] == '\\') {
        newChars[j] = '\\';
        newChars[++j] = '\\';
      } else {
        newChars[j] = oldChars[i];
      }
    }
    return new String(newChars, 0, j+1);
	}

}
