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
import de.must.util.MustCalendar;
import de.must.util.StringFunctions;

import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Hashtable;

/**
 * Handles the specific MS SQL Server dialect.
 * Completes the work of DataObject.
 * @author Christoph Mueller
 * @see DataObject
 */
public class MSSQLServerDialect extends SqlDialect {

  private static final DateFormat dateFormatyyyyMMdd = new SimpleDateFormat("yyyyMMdd");

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
      switch (columnType[i-1]) {
      case -7:
        original.put(columnNames[i-1].toUpperCase(), new Boolean(false));
        workedOn.put(columnNames[i-1].toUpperCase(), new Boolean(false));
        break;
      case -1: // MS Access memo
        original.put(columnNames[i-1].toUpperCase(), "");
        workedOn.put(columnNames[i-1].toUpperCase(), "");
        break;
      case 1:
        original.put(columnNames[i-1].toUpperCase(), "");
        workedOn.put(columnNames[i-1].toUpperCase(), "");
        break;
      case 2:
        original.put(columnNames[i-1].toUpperCase(), new Double(0));
        workedOn.put(columnNames[i-1].toUpperCase(), new Double(0));
        break;
      case 3: // AS/400 7P0
        original.put(columnNames[i-1].toUpperCase(), new Integer(0));
        workedOn.put(columnNames[i-1].toUpperCase(), new Integer(0));
        break;
      case 4:
        original.put(columnNames[i-1].toUpperCase(), new Integer(0));
        workedOn.put(columnNames[i-1].toUpperCase(), new Integer(0));
        break;
      case 5:
        original.put(columnNames[i-1].toUpperCase(), new Integer(0));
        workedOn.put(columnNames[i-1].toUpperCase(), new Integer(0));
        break;
      case 7:
        original.put(columnNames[i-1].toUpperCase(), new Float(0));
        workedOn.put(columnNames[i-1].toUpperCase(), new Float(0));
        break;
      case 8:
        original.put(columnNames[i-1].toUpperCase(), new Double(0));
        workedOn.put(columnNames[i-1].toUpperCase(), new Double(0));
        // original.put(columnNames[i-1].toUpperCase(), new BigDecimal(0));
        // workedOn.put(columnNames[i-1].toUpperCase(), new BigDecimal(0));
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
      case 93:
        // we want these null values in this case of Date
        original.remove(columnNames[i-1].toUpperCase());
        workedOn.remove(columnNames[i-1].toUpperCase());
        break;
      case 2005: // text
        original.put(columnNames[i-1].toUpperCase(), "");
        workedOn.put(columnNames[i-1].toUpperCase(), "");
        break;
      default:
        Logger.getInstance().info(getClass(), "unsupported columnType: " + columnType[i-1] + " at column " + columnNames[i-1]);
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
    Double doubleValue;
    String textValue;
    java.sql.Date dateValue;
    java.sql.Timestamp timestampValue;
    for (int i = 1; i <= columnCount; i++) {
      Logger.getInstance().debug(getClass(), "loading " + columnNames[i-1] + " as type " + columnType[i-1]);
      switch (columnType[i-1]) {
      case -7:
        boolean boolValue = getRowBoolean(rs, columnNames[i-1]);
        original.put(columnNames[i-1].toUpperCase(), new Boolean(boolValue));
        workedOn.put(columnNames[i-1].toUpperCase(), new Boolean(boolValue));
        break;
      case -1:
        textValue = getRowString(rs, columnNames[i-1]);
        if (textValue == null) textValue = "";
        original.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        workedOn.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        break;
      case 1:
        textValue = getRowString(rs, columnNames[i-1]);
        if (textValue == null) textValue = "";
        original.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        workedOn.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        break;
      case 2: // type number
        doubleValue = new Double(getRowDouble(rs, columnNames[i-1]));
        original.put(columnNames[i-1].toUpperCase(), doubleValue);
        workedOn.put(columnNames[i-1].toUpperCase(), doubleValue);
        break;
      case 3: // AS/400 7P0
        Integer intValue = new Integer(getRowInt(rs, columnNames[i-1]));
        original.put(columnNames[i-1].toUpperCase(), intValue);
        workedOn.put(columnNames[i-1].toUpperCase(), intValue);
        break;
      case 4:
        try {
          int value = rs.getInt(columnNames[i-1]);
          intValue = new Integer(value);
          original.put(columnNames[i-1].toUpperCase(), intValue);
          workedOn.put(columnNames[i-1].toUpperCase(), intValue);
        }
        catch (SQLException e) {
          // Logger.getInstance().error(getClass(), e);
        }
        break;
      case 5:
        try {
          int value = rs.getInt(columnNames[i-1]);
          intValue = new Integer(value);
          original.put(columnNames[i-1].toUpperCase(), intValue);
          workedOn.put(columnNames[i-1].toUpperCase(), intValue);
        }
        catch (SQLException e) {
          // Logger.getInstance().error(getClass(), e);
        }
        break;
      case 7:
        Float floatValue = new Float(getRowFloat(rs, columnNames[i-1]));
        original.put(columnNames[i-1].toUpperCase(), floatValue);
        workedOn.put(columnNames[i-1].toUpperCase(), floatValue);
        break;
      case 8:
        doubleValue = new Double(getRowDouble(rs, columnNames[i-1]));
        original.put(columnNames[i-1].toUpperCase(), doubleValue);
        workedOn.put(columnNames[i-1].toUpperCase(), doubleValue);
        /* BigDecimalValue = getRowBigDecimal(rs, columnNames[i-1]);
        if (BigDecimalValue == null) BigDecimalValue = new BigDecimal(0);
        original.put(columnNames[i-1].toUpperCase(), BigDecimalValue);
        workedOn.put(columnNames[i-1].toUpperCase(), BigDecimalValue); */
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
      case 93: // timestamp
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
      case 2005: // text
        textValue = getRowString(rs, columnNames[i-1]);
        if (textValue == null) textValue = "";
        original.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        workedOn.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        break;
      default:
        Logger.getInstance().info(getClass(), "unsupported columnType: " + columnType[i-1] + " at column " + columnNames[i-1]);
      }
    }
  }

  public void fillInsertStatementWithValues(PreparedStatement statementForInsertion, Hashtable<String, Object> original, Hashtable<String, Object> workedOn, String entity, int columnCount, String[] columnNames, int[] columnType, int[] columnScale, String columnNameOfRecordingDate, String columnNameOfRecordingUser, String recordingUser) throws SQLException {
    Integer workedOnInteger;
    Double workedOnDouble;
    String workedOnText;
    java.sql.Date workedOnDate;
    java.sql.Timestamp workedOnTimestamp;
    for (int i = 1; i <= columnCount; i++) try {
      switch (columnType[i-1]) {
      case -7:
        Boolean workedOnBoolean = (Boolean)workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnBoolean.booleanValue()) statementForInsertion.setString(i, "1");
        else statementForInsertion.setString(i, "0");
        break;
      case -1: // MS Access memo
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
        break;
      case 1:
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnText.trim().equals("") & recordingUser != null) {
          if (columnNames[i-1].equals(columnNameOfRecordingUser)) {
            workedOnText = recordingUser;
          }
        }
        statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
        break;
      case 2:
        workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setDouble(i, workedOnDouble.doubleValue()); 
        break;
      case 3: // AS/400 7P0
        workedOnInteger = (Integer)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setInt(i, workedOnInteger.intValue()); 
        break;
      case 4:
        workedOnInteger = (Integer)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setInt(i, workedOnInteger.intValue()); 
        break;
      case 5:
        Long workedOnLong = (Long)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setLong(i, workedOnLong.longValue()); 
        break;
      case 7:
        Float workedOnFloat = (Float)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setFloat(i, workedOnFloat.floatValue()); 
        break;
      case 8:
        workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setDouble(i, workedOnDouble.doubleValue()); 
        break;
      case 9:
        break;
      case 12:
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnText.trim().equals("") & recordingUser != null) {
          if (columnNames[i-1].equals(columnNameOfRecordingUser)) {
            workedOnText = recordingUser;
          }
        }
        statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
        break;
      case 91: // date
        workedOnDate = (java.sql.Date)workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnDate != null) {
          statementForInsertion.setDate(i, workedOnDate); 
        } else {
          if (columnNames[i-1].equals(columnNameOfRecordingDate)) {
            statementForInsertion.setDate(i, DataObject.getStaticRecordingDate()); 
          } else {
            statementForInsertion.setDate(i, null);
          }
        }
        break;
      case 93: // timestamp
        workedOnTimestamp = (Timestamp)workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnTimestamp != null) {
          statementForInsertion.setTimestamp(i, workedOnTimestamp); 
        } else {
          if (columnNames[i-1].equals(columnNameOfRecordingDate)) {
            statementForInsertion.setTimestamp(i, new Timestamp(MustCalendar.getTodaySqlDate().getTime()));
          } else {
            statementForInsertion.setTimestamp(i, null);
          }
        }
        break;
      case 2005: // text
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnText.trim().equals("") & recordingUser != null) {
          if (columnNames[i-1].equals(columnNameOfRecordingUser)) {
            workedOnText = recordingUser;
          }
        }
        statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
        break;
      default:
        Logger.getInstance().info(getClass(), "unsupported columnType: " + columnType[i-1] + " at column " + columnNames[i-1]);
      }
    } catch(ClassCastException cce) {
      Logger.getInstance().info(getClass(), columnNames[i-1] + " not castable as type " + columnType[i-1]);
      Logger.getInstance().error(getClass(), cce);
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
    int countUpdateColumns = 0;
    StringBuffer updateStatement = new StringBuffer("update " + entity + " set ");
    for (int i = 1; i <= columnCount; i++) {
      switch (columnType[i-1]) {
      case -7:
        Boolean originalBoolean = (Boolean)original.get(columnNames[i-1].toUpperCase());
        Boolean workedOnBoolean = (Boolean)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnBoolean.equals(originalBoolean)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          if (workedOnBoolean.booleanValue()) updateStatement.append(columnNames[i-1] + " = 1");
          else updateStatement.append(" " + columnNames[i-1] + " = 0");
        }
        break;
      case -1: // MS Access memo
        originalText = (String)original.get(columnNames[i-1].toUpperCase());
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = \'" + sqlSecure(workedOnText) + "\'");
        }
        break;
      case 1:
        originalText = (String)original.get(columnNames[i-1].toUpperCase());
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = \'" + sqlSecure(workedOnText) + "\'");
        }
        break;
      case 2:
        originalDouble = (Double)original.get(columnNames[i-1].toUpperCase());
        workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnDouble.equals(originalDouble)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = " + workedOnDouble.toString());
        }
        break;
      case 3: // AS/400 7P0
        originalInteger = (Integer)original.get(columnNames[i-1].toUpperCase());
        workedOnInteger = (Integer)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnInteger.equals(originalInteger)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = " + workedOnInteger.toString());
        }
        break;
      case 4:
        originalInteger = (Integer)original.get(columnNames[i-1].toUpperCase());
        workedOnInteger = (Integer)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnInteger.equals(originalInteger)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = " + workedOnInteger.toString());
        }
        break;
      case 5:
        Long originalLong = (Long)original.get(columnNames[i-1].toUpperCase());
        Long workedOnLong = (Long)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnLong.equals(originalLong)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = " + workedOnLong.toString());
        }
        break;
      case 7:
        Float originalFloat = (Float)original.get(columnNames[i-1].toUpperCase());
        Float workedOnFloat = (Float)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnFloat.equals(originalFloat)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = " + workedOnFloat.toString());
        }
        break;
      case 8:
        originalDouble = (Double)original.get(columnNames[i-1].toUpperCase());
        workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnDouble.equals(originalDouble)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = " + workedOnDouble.toString());
        }
        /* originalBigDecimal = (BigDecimal)original.get(columnNames[i-1].toUpperCase());
        workedOnBigDecimal = (BigDecimal)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnBigDecimal.equals(originalBigDecimal)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ";
          updateStatement.append(columnNames[i-1] + " = " + workedOnBigDecimal.toString();
        } */
        break;
      case 12:
        originalText = (String)original.get(columnNames[i-1].toUpperCase());
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = \'" + sqlSecure(workedOnText) + "\'");
        }
        break;
      case 91: // date
//        originalDate = (java.sql.Date)original.get(columnNames[i-1].toUpperCase());
//        workedOnDate = (java.sql.Date)workedOn.get(columnNames[i-1].toUpperCase());
//        boolean isToUpdate = false;
//        if (workedOnDate == null & originalDate != null) isToUpdate = true;
//        if (workedOnDate != null & originalDate == null) isToUpdate = true;
//        if (workedOnDate != null & originalDate != null) {
//           isToUpdate = !workedOnDate.equals(originalDate);
//        }
//        if (isToUpdate) {
//          if (workedOnDate == null) {
//            if (++countUpdateColumns > 1) updateStatement.append(", ");
//            updateStatement.append(columnNames[i-1] + " = NULL");
//          }
//          else {
//          if (++countUpdateColumns > 1) updateStatement.append(", ");
//            updateStatement.append(columnNames[i-1] + " = " + getDbExpression(workedOnDate));
//          }
//        }
        break;
      case 93: // timestamp
//        originalTimestamp = (java.sql.Timestamp)original.get(columnNames[i-1].toUpperCase());
//        workedOnTimestamp = (java.sql.Timestamp)workedOn.get(columnNames[i-1].toUpperCase());
//        isToUpdate = false;
//        if (workedOnTimestamp == null & originalTimestamp != null) isToUpdate = true;
//        if (workedOnTimestamp != null & originalTimestamp == null) isToUpdate = true;
//        if (workedOnTimestamp != null & originalTimestamp != null) {
//           isToUpdate = !workedOnTimestamp.equals(originalTimestamp);
//        }
//        if (isToUpdate) {
//          if (workedOnTimestamp == null) {
//            if (++countUpdateColumns > 1) updateStatement.append(", ");
//            updateStatement.append(columnNames[i-1] + " = NULL");
//          }
//          else {
//          if (++countUpdateColumns > 1) updateStatement.append(", ");
//            updateStatement.append(columnNames[i-1] + " = " + getDbExpression(workedOnTimestamp));
//          }
//        }
        break;
      case 2005:
        originalText = (String)original.get(columnNames[i-1].toUpperCase());
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement.append(", ");
          updateStatement.append(columnNames[i-1] + " = \'" + sqlSecure(workedOnText) + "\'");
        }
        break;
      default:
        Logger.getInstance().info(getClass(), "unsupported columnType: " + columnType[i-1] + " at column " + columnNames[i-1]);
      }
    }
    if (countUpdateColumns == 0) return null;
    else return updateStatement.toString();
  }

  /**
   * @param sqlDate the date to be formatted  
   * @return the specific variant of setting a date value
   */
  public static String getDbExpression(java.sql.Date sqlDate) {
    return "\'" + sqlDate + "\'";
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
  public String unifyTableName(String tableName) {
    return tableName;
  }

  /**
   * Unifies the column name.
   * @param columnName the column name to unify
   * @return the unified column name
   */
  public String unifyColumnName(String columnName) {
    return columnName.toUpperCase();
  }

  /**
   * Returns the specific variant how date values are compared.
   * @param dataString the DateString to be prepared
   * @return the prepared String for data comparison
   */
  public String getSqlCompareString(de.must.util.DateString dateString) {
    // return "CAST('" + dateString.getSqlCompareString() + "' AS DATETIME)";
    // return "CONVERT(char(8), " + dateString.getISOString() + "" + ", 112)"; // should search without time aspects, but lower / greater function is not tested, yet
    return "CAST(CONVERT(char(8), " + dateString.getISOString() + "" + ", 112) AS DATETIME)";
  }

  public String getSqlCompareString(Date date) {
    // return "CAST('" + dateFormatyyyyMMdd.format(date) + "' AS DATETIME)";
    // return "CONVERT(char(8), " + dateFormatyyyyMMdd.format(date) + "" + ", 112)"; // should search without time aspects, but lower / greater function is not tested, yet
    return "CAST(CONVERT(char(8), " + dateFormatyyyyMMdd.format(date) + "" + ", 112) AS DATETIME)";
  }

  @Override
  public String getWhereConditionFragementForExactDateComparison(String columnName, Date date) {
    return columnName + " = " + getSqlCompareString(date);
  }
  
  @Override
  public String getSqlCompareString(boolean b) {
    if (b) return "1";
    else return "0";
  }
  
  /**
   * Returns the value of a column as boolean.
   * @param columnName the name of the column
   * @param original the buffer of original values of the row
   * @return the value of a column
   */
  public boolean getBoolean(String columnName, Hashtable<String, Object> original) {
    Boolean cb = (Boolean)original.get(columnName.toUpperCase());
    if (cb == null) Logger.getInstance().info(getClass(), "Column " + unifyColumnName(columnName) +  " not available");
    return cb.booleanValue();
  }

  /**
   * Returns the value of a column as boolean in a worked on state -
   * it might already been modified and differ from the original value.
   * @param columnName the name of the column
   * @param workedOn the buffer of worked on values of the row
   * @return the actual value of a column
   */
  public boolean getWorkedOnBoolean(String columnName, Hashtable<String, Object> workedOn) {
    Boolean cb = (Boolean)workedOn.get(columnName.toUpperCase());
    if (cb == null) Logger.getInstance().info(getClass(), "Column " + unifyColumnName(columnName) +  " not available");
    return cb.booleanValue();
  }

  /**
   * Sets the value of the specified column.
   * @param columnName the name of the column to be set
   * @param boolValue the value the column shall be set to
   * @param workedOn the buffer of worked on values of the row
   */
  public void setBoolean(String columnName, boolean boolValue, Hashtable<String, Object> workedOn) {
    workedOn.put(columnName.toUpperCase(), new Boolean(boolValue));
  }

  /**
   * Returns the specific create statement string of the specified table
   * @param tableName the name of the table to be created
   * @param attributes the attribute of the table to be created
   * @return the create statement string
   */
  public static String getCreateStatement(String tableName, AbstractAttribute[] attributes) {
    StringBuffer createStatement = new StringBuffer("create table " + tableName + " (");
    int lastPos = attributes.length - 1;
    for (int i = 0; i <= lastPos; i++) {
      createStatement.append(attributes[i].getFieldName() + " ");
      switch (attributes[i].getType()) {
      case AbstractAttribute.LOGICAL:
        createStatement.append("Bit");
        break;
      case AbstractAttribute.MEMO:
        createStatement.append("text");
        break;
      case AbstractAttribute.DECIMAL:
        createStatement.append("numeric");
        int length = attributes[i].getLength();
        int scale = attributes[i].getScale();
        if (length != 0) {
          createStatement.append("(" + length);
          if (scale != 0) createStatement.append(", " + scale);
          createStatement.append(")");
        }
        break;
      case AbstractAttribute.NUMBER:
        if (attributes[i].getScale() > 0 || attributes[i].getLength() > 10) {
          createStatement.append("numeric");
        } else {
          createStatement.append("integer");
        }
        break;
      case AbstractAttribute.INTEGER:
        createStatement.append("integer");
        break;
      case AbstractAttribute.BIGINT:
        createStatement.append("bigint");
        break;
      case AbstractAttribute.FLOAT:
        createStatement.append("float");
        break;
      case AbstractAttribute.CHAR:
        createStatement.append("char(" + attributes[i].getLength() + ")");
        break;
      case AbstractAttribute.VARCHAR:
        createStatement.append("varchar(" + attributes[i].getLength() + ")");
        break;
      case AbstractAttribute.DATE:
        createStatement.append("Datetime");
        break;
      case AbstractAttribute.TIMESTAMP:
        createStatement.append("Datetime"); // http://www.sqlteam.com/article/timestamps-vs-datetime-data-types: The SQL Server timestamp data type has nothing to do with times or dates.
        break;
      case AbstractAttribute.TIME:
        createStatement.append("integer"); // (time not supported)
        break;
      }
      if (i < lastPos) createStatement.append(", ");
    }
    createStatement.append(")");
    return createStatement.toString();
  }

  @Override
	protected String getRowString(ResultSet rs, String columnName) {
		return super.getRowString(rs, columnName);
	}

  @Override
	protected Time getRowTime(ResultSet rs, int columnNbr) {
		return super.getRowTime(rs, columnNbr);
	}

}
