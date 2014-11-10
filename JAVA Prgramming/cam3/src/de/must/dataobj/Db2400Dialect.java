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

import de.must.io.Logger;
import de.must.util.DateString;
import de.must.util.MustCalendar;
import de.must.util.StringFunctions;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Hashtable;

/**
 * Handles the specific DB2-AS400 dialect.
 * Completes the work of DataObject.
 * @author Christoph Mueller
 * @see DataObject
 */
public class Db2400Dialect extends SqlDialect {
  
  private static final String VERTICAL_SPACING_SYMBOL = "~";
  private static final String TRUE_STRING = "J";
  private static final String FALSE_STRING = "N";

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
        if (columnScale[i-1] > 0) {
          original.put(columnNames[i-1].toUpperCase(), new Double(0));
          workedOn.put(columnNames[i-1].toUpperCase(), new Double(0));
        } else {
          original.put(columnNames[i-1].toUpperCase(), new Integer(0));
          workedOn.put(columnNames[i-1].toUpperCase(), new Integer(0));
        }
        break;
      case 3: // AS/400 7P0
        if (columnScale[i-1] > 0) {
          original.put(columnNames[i-1].toUpperCase(), new Double(0));
          workedOn.put(columnNames[i-1].toUpperCase(), new Double(0));
        } else {
          original.put(columnNames[i-1].toUpperCase(), new Integer(0));
          workedOn.put(columnNames[i-1].toUpperCase(), new Integer(0));
        }
        break;
      case 4:
        original.put(columnNames[i-1].toUpperCase(), new Integer(0));
        workedOn.put(columnNames[i-1].toUpperCase(), new Integer(0));
        break;
      case 5:
        if (isKnownAsBoolean(columnNames[i-1])) {
          original.put(columnNames[i-1].toUpperCase(), new Boolean(false));
          workedOn.put(columnNames[i-1].toUpperCase(), new Boolean(false));
        } else {
          original.put(columnNames[i-1].toUpperCase(), new Long(0));
          workedOn.put(columnNames[i-1].toUpperCase(), new Long(0));
        }
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
      case 92: // time
        // we want these null values in this case of Time
        original.remove(columnNames[i-1].toUpperCase());
        workedOn.remove(columnNames[i-1].toUpperCase());
        break;
      case 93:
        // we want these null values in this case of Date
        original.remove(columnNames[i-1].toUpperCase());
        workedOn.remove(columnNames[i-1].toUpperCase());
        break;
      default:
        Logger.getInstance().info(getClass(), "unsupported columnType: " + columnType[i-1]);
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
    String textValue;
    java.sql.Date dateValue;
    java.sql.Time timeValue;
    java.sql.Timestamp timestampValue;
    double doubleValue;
    Double doubleObject;
    for (int i = 1; i <= columnCount; i++) {
      Logger.getInstance().debug(getClass(), "loading " + columnNames[i-1] + " as " + columnType[i-1]);
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
        textValue = transformVerticalSpacingWhenLaoding(textValue);
        original.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        workedOn.put(columnNames[i-1].toUpperCase(), StringFunctions.rtrim(textValue));
        break;
      case 2:
        if (columnScale[i-1] > 0) {
          // Logger.getInstance().info(getClass(), "loading " + columnNames[i-1] + " as " + columnType[i-1] + " with scale " + columnScale[i-1]);
          doubleValue = getRowDouble(rs, columnNames[i-1]);
          doubleObject = new Double(doubleValue);
          original.put(columnNames[i-1].toUpperCase(), doubleObject);
          workedOn.put(columnNames[i-1].toUpperCase(), doubleObject);
        } else {
          Integer intValue = new Integer(getRowInt(rs, columnNames[i-1]));
          original.put(columnNames[i-1].toUpperCase(), intValue);
          workedOn.put(columnNames[i-1].toUpperCase(), intValue);
        }
        break;
      case 3: // AS/400 7P0 10P0 etc.
        if (columnScale[i-1] > 0) {
          // Logger.getInstance().info(getClass(), "loading " + columnNames[i-1] + " as " + columnType[i-1] + " with scale " + columnScale[i-1]);
          doubleValue = getRowDouble(rs, columnNames[i-1]);
          doubleObject = new Double(doubleValue);
          original.put(columnNames[i-1].toUpperCase(), doubleObject);
          workedOn.put(columnNames[i-1].toUpperCase(), doubleObject);
        } else {
          Integer intValue = new Integer(getRowInt(rs, columnNames[i-1]));
          original.put(columnNames[i-1].toUpperCase(), intValue);
          workedOn.put(columnNames[i-1].toUpperCase(), intValue);
        }
        break;
      case 4:
        Integer intValue = new Integer(getRowInt(rs, columnNames[i-1]));
        original.put(columnNames[i-1].toUpperCase(), intValue);
        workedOn.put(columnNames[i-1].toUpperCase(), intValue);
        break;
      case 5:
        Long longValue = new Long(getRowLong(rs, columnNames[i-1]));
        if (isKnownAsBoolean(columnNames[i-1])) {
          boolean booleanValue = longValue.longValue() != 0;
          original.put(columnNames[i-1].toUpperCase(), new Boolean(booleanValue));
          workedOn.put(columnNames[i-1].toUpperCase(), new Boolean(booleanValue));
        } else {
          original.put(columnNames[i-1].toUpperCase(), longValue);
          workedOn.put(columnNames[i-1].toUpperCase(), longValue);
        }
        break;
      case 7:
        Float floatValue = new Float(getRowFloat(rs, columnNames[i-1]));
        original.put(columnNames[i-1].toUpperCase(), floatValue);
        workedOn.put(columnNames[i-1].toUpperCase(), floatValue);
        break;
      case 8:
        doubleObject = new Double(getRowDouble(rs, columnNames[i-1]));
        original.put(columnNames[i-1].toUpperCase(), doubleObject);
        workedOn.put(columnNames[i-1].toUpperCase(), doubleObject);
        break;
      case 12:
        textValue = getRowString(rs, columnNames[i-1]);
        if (textValue == null) textValue = "";
        textValue = transformVerticalSpacingWhenLaoding(textValue);
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
      case 93:
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
        Logger.getInstance().info(getClass(), "unsupported columnType: " + columnType[i-1]);
      }
    }
  }
  
  public void fillInsertStatementWithValues(PreparedStatement statementForInsertion, Hashtable<String, Object> original, Hashtable<String, Object> workedOn, String entity, int columnCount, String[] columnNames, int[] columnType, int[] columnScale, String columnNameOfRecordingDate, String columnNameOfRecordingUser, String recordingUser) throws SQLException {
    Integer workedOnInteger;
    Long workedOnLong;
    Double workedOnDouble;
    String workedOnText;
    java.sql.Date workedOnDate;
    java.sql.Time workedOnTime;
    java.sql.Timestamp workedOnTimestamp;
    for (int i = 1; i <= columnCount; i++) try {
      Logger.getInstance().debug(getClass(), columnNames[i-1] + columnType[i-1]);
      switch (columnType[i-1]) {
      case -7:
        Boolean workedOnBoolean = (Boolean)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setBoolean(i, workedOnBoolean.booleanValue()); 
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
        int maxLength = dataObject.getColumnLength(columnNames[i-1]);
        if (workedOnText.length() > maxLength) {
          workedOnText = workedOnText.substring(0, maxLength);
        }
        statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
        break;
      case 2: // AS/400 4P0
        if (columnScale[i-1] > 0) {
          workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
          statementForInsertion.setDouble(i, workedOnDouble.doubleValue()); 
        } else {
          workedOnInteger = (Integer)workedOn.get(columnNames[i-1].toUpperCase());
          statementForInsertion.setInt(i, workedOnInteger.intValue()); 
        }
        break;
      case 3: // AS/400 7P0
        if (columnScale[i-1] > 0) {
          workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
          statementForInsertion.setDouble(i, workedOnDouble.doubleValue()); 
        } else {
          workedOnInteger = (Integer)workedOn.get(columnNames[i-1].toUpperCase());
          if (workedOnInteger.intValue() == 0 && columnNames[i-1].equals(columnNameOfRecordingDate)) {
            statementForInsertion.setInt(i, getIntDateValue(DataObject.getStaticRecordingDate())); 
          } else {
            statementForInsertion.setInt(i, workedOnInteger.intValue()); 
          }
        }
        break;
      case 4:
        workedOnInteger = (Integer)workedOn.get(columnNames[i-1].toUpperCase());
        statementForInsertion.setInt(i, workedOnInteger.intValue());
        break;
      case 5:
        if (isKnownAsBoolean(columnNames[i-1])) {
          workedOnBoolean = (Boolean)workedOn.get(columnNames[i-1].toUpperCase());
          statementForInsertion.setLong(i, (workedOnBoolean.booleanValue()?1:0)); 
        } else {
          workedOnLong = (Long)workedOn.get(columnNames[i-1].toUpperCase());
          statementForInsertion.setLong(i, workedOnLong.longValue()); 
        }
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
            statementForInsertion.setDate(i, null); // if not: The number of parameter values set or registered does not match the number of parameters.
          }
        }
        break;
      case 92: // time
        workedOnTime = (java.sql.Time)workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnTime != null) {
          statementForInsertion.setTime(i, workedOnTime); 
        } else {
          statementForInsertion.setTime(i, null);
        }
        break;
      case 93:
        workedOnTimestamp = (Timestamp)workedOn.get(columnNames[i-1].toUpperCase());
        if (workedOnTimestamp != null) {
          statementForInsertion.setTimestamp(i, workedOnTimestamp); 
        } else {
          if (columnNames[i-1].equals(columnNameOfRecordingDate)) {
            statementForInsertion.setTimestamp(i, new Timestamp(MustCalendar.getTodaySqlDate().getTime())); 
          } else {
            statementForInsertion.setTimestamp(i, null); // if not: The number of parameter values set or registered does not match the number of parameters.
          }
        }
        break;
      default:
        Logger.getInstance().info(getClass(), "unsupported columnType: " + columnType[i-1] + " at column " + columnNames[i-1]);
      }
    } catch(ClassCastException cce) {
      Logger.getInstance().info(getClass(), columnNames[i-1] + " not castable as type " + columnType[i-1]);
      Logger.getInstance().error(getClass(), cce);
    }
  }
  
  public String transformStringWhenSaving(String columnName, String value) {
    char[] chars = value.toCharArray();
    for (int i = 0; i < chars.length; i++) {
      // for example '•' is causing [SQL0332] Zeichenumsetzung zwischen CCSID 65535 und CCSID 273 ungültig.
      if (chars[i] == '•') chars[i] = '-';
      if (chars[i] == '…') chars[i] = ' ';
    }
    return transformVerticalSpacingWhenSaving(columnName, String.valueOf(chars));
  }
  
  /**
   * Replaces all vertical spacings by a symbol.
   * @param value the value to be checked
   * @return the transformed value
   */
  private String transformVerticalSpacingWhenLaoding(String value) {
    return value.replaceAll(VERTICAL_SPACING_SYMBOL, "\n");
  }

  /**
   * Compresses column value and replaces all vertical spacings by a symbol.
   * @param columnName the name of the column to be transformed
   * @param columnValue the column value
   * @return the transformed value
   */
  protected String transformVerticalSpacingWhenSaving(String columnName, String columnValue) {
    String result = compress(columnName, columnValue);
    result = result.replaceAll("\n", "~");
    return result;
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
    Long originalLong;
    Long workedOnLong;
    Double originalDouble;
    Double workedOnDouble;
    String originalText;
    String workedOnText;
    java.sql.Date originalDate;
    java.sql.Date workedOnDate;
    java.sql.Time originalTime;
    java.sql.Time workedOnTime;
    int countUpdateColumns = 0;
    String updateStatement = "update " + entity + " set ";
    for (int i = 1; i <= columnCount; i++) {
      switch (columnType[i-1]) {
      case -7:
        Boolean originalBoolean = (Boolean)original.get(columnNames[i-1].toUpperCase());
        Boolean workedOnBoolean = (Boolean)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnBoolean.equals(originalBoolean)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement += ", ";
          if (workedOnBoolean.booleanValue()) updateStatement += columnNames[i-1] + " = 1";
          else updateStatement += " " + columnNames[i-1] + " = 0";
        }
        break;
      case -1: // MS Access memo
        originalText = (String)original.get(columnNames[i-1].toUpperCase());
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement += ", ";
          updateStatement += columnNames[i-1] + " = \'" + sqlSecure(transformStringWhenSaving(columnNames[i-1], workedOnText)) + "\'";
        }
        break;
      case 1:
        originalText = (String)original.get(columnNames[i-1].toUpperCase());
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement += ", ";
          updateStatement += columnNames[i-1] + " = \'" + sqlSecure(transformStringWhenSaving(columnNames[i-1], workedOnText)) + "\'";
        }
        break;
      case 2:
        if (columnScale[i-1] > 0) {
          workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
          originalDouble = (Double)original.get(columnNames[i-1].toUpperCase());
          if (!workedOnDouble.equals(originalDouble)) {
            // Logger.getInstance().info(getClass(), columnNames[i-1]);
            if (++countUpdateColumns > 1) updateStatement += ", ";
            updateStatement += columnNames[i-1] + " = " + getSQLFormat(workedOnDouble);
          }
        } else {
          originalInteger = (Integer)original.get(columnNames[i-1].toUpperCase());
          workedOnInteger = (Integer)workedOn.get(columnNames[i-1].toUpperCase());
          if (!workedOnInteger.equals(originalInteger)) {
            // Logger.getInstance().info(getClass(), columnNames[i-1]);
            if (++countUpdateColumns > 1) updateStatement += ", ";
            updateStatement += columnNames[i-1] + " = " + workedOnInteger.toString();
          }
        }
        break;
      case 3: // AS/400 7P0, 10P0, 5P2
        if (columnScale[i-1] > 0) {
          workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
          originalDouble = (Double)original.get(columnNames[i-1].toUpperCase());
          if (!workedOnDouble.equals(originalDouble)) {
            // Logger.getInstance().info(getClass(), columnNames[i-1]);
            if (++countUpdateColumns > 1) updateStatement += ", ";
            updateStatement += columnNames[i-1] + " = " + getSQLFormat(workedOnDouble);
          }
        } else {
          originalInteger = (Integer)original.get(columnNames[i-1].toUpperCase());
          workedOnInteger = (Integer)workedOn.get(columnNames[i-1].toUpperCase());
          if (!workedOnInteger.equals(originalInteger)) {
            // Logger.getInstance().info(getClass(), columnNames[i-1]);
            if (++countUpdateColumns > 1) updateStatement += ", ";
            updateStatement += columnNames[i-1] + " = " + workedOnInteger.toString();
          }
        }
        break;
      case 4:
        originalInteger = (Integer)original.get(columnNames[i-1].toUpperCase());
        workedOnInteger = (Integer)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnInteger.equals(originalInteger)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement += ", ";
          updateStatement += columnNames[i-1] + " = " + workedOnInteger.toString();
        }
        break;
      case 5:
        if (isKnownAsBoolean(columnNames[i-1])) {
          originalBoolean = (Boolean)original.get(columnNames[i-1].toUpperCase());
          workedOnBoolean = (Boolean)workedOn.get(columnNames[i-1].toUpperCase());
          if (!workedOnBoolean.equals(originalBoolean)) {
            if (++countUpdateColumns > 1) updateStatement += ", ";
            updateStatement +=columnNames[i-1] + " = " 
            + (workedOnBoolean.booleanValue()?1:0);
          }  
        } else {
          originalLong = (Long)original.get(columnNames[i-1].toUpperCase());
          workedOnLong = (Long)workedOn.get(columnNames[i-1].toUpperCase());
          if (!workedOnLong.equals(originalLong)) {
            // Logger.getInstance().info(getClass(), columnNames[i-1]);
            if (++countUpdateColumns > 1) updateStatement += ", ";
            updateStatement += columnNames[i-1] + " = " + workedOnLong.toString();
          }
        }
        break;
      case 7:
        Float originalFloat = (Float)original.get(columnNames[i-1].toUpperCase());
        Float workedOnFloat = (Float)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnFloat.equals(originalFloat)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement += ", ";
          updateStatement += columnNames[i-1] + " = " + workedOnFloat.toString();
        }
        break;
      case 8:
        originalDouble = (Double)original.get(columnNames[i-1].toUpperCase());
        workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
        if (!workedOnDouble.equals(originalDouble)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement += ", ";
          updateStatement += columnNames[i-1] + " = " + getSQLFormat(workedOnDouble);
        }
        break;
      case 12:
        originalText = (String)original.get(columnNames[i-1].toUpperCase());
        workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
        if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
          // Logger.getInstance().info(getClass(), columnNames[i-1]);
          if (++countUpdateColumns > 1) updateStatement += ", ";
          updateStatement += columnNames[i-1] + " = \'" + sqlSecure(transformStringWhenSaving(columnNames[i-1], workedOnText)) + "\'";
        }
        break;
      case 91: // date
        originalDate = (java.sql.Date)original.get(columnNames[i-1].toUpperCase());
        workedOnDate = (java.sql.Date)workedOn.get(columnNames[i-1].toUpperCase());
        boolean isToUpdate = false;
        if (workedOnDate == null & originalDate != null) isToUpdate = true;
        if (workedOnDate != null & originalDate == null) isToUpdate = true;
        if (workedOnDate != null & originalDate != null) {
           isToUpdate = !workedOnDate.equals(originalDate);
        }
        if (isToUpdate) {
          if (workedOnDate == null) {
            if (++countUpdateColumns > 1) updateStatement += ", ";
            updateStatement += columnNames[i-1] + " = NULL";
          }
          else {
          if (++countUpdateColumns > 1) updateStatement += ", ";
            updateStatement += columnNames[i-1] + " = " + getDbExpression(workedOnDate);
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
            if (++countUpdateColumns > 1) updateStatement += ", ";
            updateStatement +=  columnNames[i-1] + " = NULL";
          }
          else {
          if (++countUpdateColumns > 1) updateStatement += ", ";
          updateStatement += columnNames[i-1] + " = " + getDbExpression(workedOnTime);
          }
        }
        break;
      case 93:
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
            if (++countUpdateColumns > 1) updateStatement += ", ";
            updateStatement += columnNames[i-1] + " = NULL";
          }
          else {
          if (++countUpdateColumns > 1) updateStatement += ", ";
            updateStatement += columnNames[i-1] + " = " + getDbExpression(workedOnDate);
          }
        }
        break;
      default:
      }
    }
    if (countUpdateColumns == 0) return null;
    else return updateStatement;
  }

  /**
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
   * @param dateString the DateString to be prepared
   * @return the prepared String for data comparison
   */
  public String getSqlCompareString(de.must.util.DateString dateString) {
    return "Date('" + dateString.getSqlCompareString() + "')"; 
  }

  @Override
  public String getWhereConditionFragementForExactDateComparison(String columnName, Date date) {
    return columnName + " = " + getSqlCompareString(date);
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
    Object columnObject = original.get(unifyColumnName(columnName));
    if (columnObject == null) {
      Logger.getInstance().info(getClass(), "Column " + unifyColumnName(columnName) +  " not available in " + this.getClass().getName());
      return false;
    }
    if (columnObject instanceof Double) {
      Double dv = (Double)columnObject;
      return (dv.intValue() != 0);
    } else if (columnObject instanceof Long) {
      Long lv = (Long)columnObject;
      return (lv.intValue() != 0);
    } else if (columnObject instanceof Integer) {
      Integer iv = (Integer)columnObject;
      return (iv.intValue() != 0);
    } else if (columnObject instanceof Boolean) {
      Boolean cb = (Boolean)columnObject;
      return cb.booleanValue();
    } else if (columnObject instanceof String) {
      String text = (String)columnObject;
      return TRUE_STRING.equals(text);
    } else {
      Logger.getInstance().info(getClass(), "Column " + unifyColumnName(columnName) +  " not converted to boolean in " + getClass().getName());
      return false;
    }
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
    Object formerObject = workedOn.get(unifyColumnName(columnName));
    if (formerObject instanceof Boolean) {
      workedOn.put(columnName.toUpperCase(), new Boolean(boolValue));
    } else {
      if (boolValue) {
        if (formerObject instanceof String) {
          workedOn.put(unifyColumnName(columnName), TRUE_STRING);
        }
      }
      else {
        if (formerObject instanceof String) {
          workedOn.put(unifyColumnName(columnName), FALSE_STRING);
        }
      }
    }
  }

  /**
   * Returns the specific create statement string of the specified table
   * @param tableName the name of the table to be created
   * @param attributes the attribute of the table to be created
   * @return the create statement string
   */
  public static String getCreateStatement(String tableName, AbstractAttribute[] attributes) {
    // tpyes see http://www.utexas.edu/its/unix/reference/oracledocs/v92/B10501_01/win.920/a97252/ch2.htm
    String createStatement = "create table " + tableName + " (";
    int lastPos = attributes.length - 1;
    for (int i = 0; i <= lastPos; i++) {
      createStatement += attributes[i].getFieldName() + " ";
      switch (attributes[i].getType()) {
      case AbstractAttribute.LOGICAL:
        createStatement += "smallint";
        break;
      case AbstractAttribute.MEMO:
        createStatement += "long varchar(32700)";
        break;
      case AbstractAttribute.DECIMAL:
        createStatement += "decimal(" + attributes[i].getLength() + ", "  + attributes[i].getScale() + ")";
        break;
      case AbstractAttribute.NUMBER:
        if (attributes[i].getScale() > 0) {
          createStatement += "decimal(" + attributes[i].getLength() + ", "  + attributes[i].getScale() + ")";
        } else {
          createStatement += "integer";
        }
        break;
      case AbstractAttribute.INTEGER:
        createStatement += "integer";
        break;
      case AbstractAttribute.BIGINT:
        createStatement += "bigint";
        break;
      case AbstractAttribute.FLOAT:
        createStatement += "float";
        break;
      case AbstractAttribute.CHAR:
        createStatement += "char(" + attributes[i].getLength() + ")";
        break;
      case AbstractAttribute.VARCHAR:
        if (attributes[i].getLength() > 4000) {
          createStatement += "long varchar(" + attributes[i].getLength() + ")";
        } else {
          createStatement += "varchar(" + attributes[i].getLength() + ")";
        }
        break;
      case AbstractAttribute.DATE:
        createStatement += "date";
        break;
      case AbstractAttribute.TIMESTAMP:
        createStatement += "timestamp";
        break;
      case AbstractAttribute.TIME:
        createStatement += "time";
        break;
      }
      if (i < lastPos) createStatement += ", ";
    }
    createStatement += ")";
    return createStatement;
  }

}

