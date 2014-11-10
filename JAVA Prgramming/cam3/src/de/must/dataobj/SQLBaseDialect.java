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
import de.must.util.DateString;
import de.must.util.StringFunctions;

import java.math.BigDecimal;
import java.sql.*;
import java.util.Hashtable;

/**
 * Handles the specific MS SQL Server dialect.
 * Completes the work of DataObject.
 * @author Christoph Mueller
 * @see DataObject
 */
public class SQLBaseDialect extends SqlDialect {

  @Override
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
     case 2: // Oracle number
       original.put(columnNames[i-1].toUpperCase(), new Double(0));
       workedOn.put(columnNames[i-1].toUpperCase(), new Double(0));
       break;
     case 3: // AS/400 7P0 / Oracle
       original.put(columnNames[i-1].toUpperCase(), new Integer(0));
       workedOn.put(columnNames[i-1].toUpperCase(), new Integer(0));
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
       original.put(columnNames[i-1].toUpperCase(), new Float(0));
       workedOn.put(columnNames[i-1].toUpperCase(), new Float(0));
       break;
     case 7:
       original.put(columnNames[i-1].toUpperCase(), new Float(0));
       workedOn.put(columnNames[i-1].toUpperCase(), new Float(0));
       break;
     case 8: // Oracle number via ODBC
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
     case 93:
       // we want these null values in this case of Date
       original.remove(columnNames[i-1].toUpperCase());
       workedOn.remove(columnNames[i-1].toUpperCase());
       break;
     default:
       Logger.getInstance().info(getClass(), "unsupported columnType: " + columnType[i-1] + " at column " + columnNames[i-1]);
     }
   }
 }

 @Override 
 public void loadRow(ResultSet rs, Hashtable<String, Object> original, Hashtable<String, Object> workedOn, String entity, int columnCount, String[] columnNames, int[] columnType, int[] columnScale) {
   Integer intValue;
   Long longValue;
   double doubleValue;
   Double DoubleValue;
   String textValue;
   java.sql.Date dateValue;
   for (int i = 1; i <= columnCount; i++) {
     Logger.getInstance().debug(getClass(), "loading " + columnNames[i-1] + ", type " + columnType[i-1]);
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
     case 2: // Oracle number (direct JDBC?)
       doubleValue = getRowDouble(rs, columnNames[i-1]);
       Logger.getInstance().debug(getClass(), "getRowDouble of " + columnNames[i-1] + " returns " + doubleValue);
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
     case 3: // Oracle number (ODBC?)
       doubleValue = getRowDouble(rs, columnNames[i-1]);
       Logger.getInstance().debug(getClass(), "getRowDouble of " + columnNames[i-1] + " returns " + doubleValue);
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
     case 5:
       longValue = new Long(getRowLong(rs, columnNames[i-1]));
       original.put(columnNames[i-1].toUpperCase(), longValue);
       workedOn.put(columnNames[i-1].toUpperCase(), longValue);
       break;
     case 6:
       float elementaryFloat = getRowFloat(rs, columnNames[i-1]);
       Logger.getInstance().debug(getClass(), "getRowFloat of " + columnNames[i-1] + " returns " + elementaryFloat);
       Float floatObject = new Float(elementaryFloat);
       original.put(columnNames[i-1].toUpperCase(), floatObject);
       workedOn.put(columnNames[i-1].toUpperCase(), floatObject);
       break;
     case 7:
       elementaryFloat = getRowFloat(rs, columnNames[i-1]);
       Logger.getInstance().debug(getClass(), "getRowFloat of " + columnNames[i-1] + " returns " + elementaryFloat);
       floatObject = new Float(elementaryFloat);
       original.put(columnNames[i-1].toUpperCase(), floatObject);
       workedOn.put(columnNames[i-1].toUpperCase(), floatObject);
       break;
     case 8: // Oracle number via ODBC
       DoubleValue = new Double(getRowDouble(rs, columnNames[i-1]));
       Logger.getInstance().debug(getClass(), "getRowDouble of " + columnNames[i-1] + " returns " + DoubleValue);
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
     case 93:
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
     default:
       Logger.getInstance().info(getClass(), "unsupported columnType: " + columnType[i-1] + " at column " + columnNames[i-1]);
     }
   }
 }
 
 @Override
 public boolean getBoolean(String columnName, Hashtable<String, Object> original) {
   Object columnObject = original.get(unifyColumnName(columnName));
   if (columnObject == null) {
     de.must.io.Logger.getInstance().info(getClass(), "Column " + unifyColumnName(columnName) +  " not available in " + this.getClass().getName());
     return false;
   }
   if (columnObject instanceof Double) {
     Double dv = (Double)columnObject;
     return (dv.intValue() != 0);
   } else if (columnObject instanceof Integer) {
     Integer iv = (Integer)columnObject;
     return (iv.intValue() != 0);
//   } else if (columnObject instanceof Character) {
//     Character cv = (Character)columnObject;
//     return (cv.charValue() == '1');
   } else if (columnObject instanceof String) {
     String sv = (String)columnObject;
     return (sv.equals("1"));
   }
   de.must.io.Logger.getInstance().info(getClass(), "Column " + unifyColumnName(columnName) +  " not converted to boolean in " + this.getClass().getName());
   return false;
 }

 @Override
 public void setBoolean(String columnName, boolean boolValue, Hashtable<String, Object> workedOn) {
   Class<?> formerClass = workedOn.get(unifyColumnName(columnName)).getClass();
   if (boolValue) {
     if (formerClass.equals(Integer.class)) {
       workedOn.put(unifyColumnName(columnName), new Integer(1));
     } else if (formerClass.equals(Double.class)) {
         workedOn.put(unifyColumnName(columnName), new Double(1));
     } else if (formerClass.equals(String.class)) {
       workedOn.put(unifyColumnName(columnName), "1");
     }
   }
   else {
     if (formerClass.equals(Integer.class)) {
       workedOn.put(unifyColumnName(columnName), new Integer(0));
     } else if (formerClass.equals(Double.class)) {
       workedOn.put(unifyColumnName(columnName), new Double(0));
     } else if (formerClass.equals(String.class)) {
       workedOn.put(unifyColumnName(columnName), "");
     }
   }
 }

 @Override
 public void fillInsertStatementWithValues(PreparedStatement statementForInsertion, Hashtable<String, Object> original, Hashtable<String, Object> workedOn, String entity, int columnCount, String[] columnNames, int[] columnType, int[] columnScale, String columnNameOfRecordingDate, String columnNameOfRecordingUser, String recordingUser) throws SQLException {
   Integer workedOnInteger;
   Double workedOnDouble;
   String workedOnText;
   for (int i = 1; i <= columnCount; i++) {
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
       // let's avoid ORA-12899 and cut too long content like other DBs 
       workedOnText = limitTextContent(columnNames[i-1], workedOnText); 
       statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
       break;
     case 2: // Oracle number
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
       workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
       statementForInsertion.setDouble(i, workedOnDouble.doubleValue()); 
       break;
     case 6:
       Float workedOnFloat = (Float)workedOn.get(columnNames[i-1].toUpperCase());
       statementForInsertion.setFloat(i, workedOnFloat.floatValue()); 
       break;
     case 7:
       workedOnFloat = (Float)workedOn.get(columnNames[i-1].toUpperCase());
       statementForInsertion.setFloat(i, workedOnFloat.floatValue()); 
       break;
     case 8: // Oracle number via ODBC
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
       // let's avoid ORA-12899 and cut too long content like other DBs 
       workedOnText = limitTextContent(columnNames[i-1], workedOnText); 
       statementForInsertion.setString(i, transformStringWhenSaving(columnNames[i-1], workedOnText)); 
       break;
     case 91: // DATE
       Object workedOnDateObject = workedOn.get(columnNames[i-1].toUpperCase());
       if (workedOnDateObject != null) {
         if (workedOnDateObject instanceof java.sql.Time) {
           statementForInsertion.setTime(i, (java.sql.Time)workedOnDateObject);
         } else if (workedOnDateObject instanceof java.sql.Timestamp) {
           statementForInsertion.setTimestamp(i, (java.sql.Timestamp)workedOnDateObject);
         } else {
           statementForInsertion.setDate(i, (java.sql.Date)workedOnDateObject);
         }
       } else {
         if (columnNames[i-1].equals(columnNameOfRecordingDate)) {
           statementForInsertion.setDate(i, DataObject.getStaticRecordingDate()); 
         } else {
           statementForInsertion.setDate(i, null);
         }
       }
       break;
     case 93:
       workedOnDateObject = workedOn.get(columnNames[i-1].toUpperCase());
       if (workedOnDateObject != null) {
         if (workedOnDateObject instanceof java.sql.Time) {
           statementForInsertion.setTime(i, (java.sql.Time)workedOnDateObject);
         } else if (workedOnDateObject instanceof java.sql.Timestamp) {
           statementForInsertion.setTimestamp(i, (java.sql.Timestamp)workedOnDateObject);
         } else {
           statementForInsertion.setDate(i, (java.sql.Date)workedOnDateObject);
         }
       } else {
         if (columnNames[i-1].equals(columnNameOfRecordingDate)) {
           statementForInsertion.setDate(i, DataObject.getStaticRecordingDate()); 
         } else {
           statementForInsertion.setDate(i, null);
         }
       }
       break;
     default:
       Logger.getInstance().info(getClass(), "unsupported columnType: " + columnType[i-1] + " at column " + columnNames[i-1]);
     }
   }
 }

 /**
  * Limit text content that it fits into the field.
  * @param columnName the name of the column to limit
  * @param workedOnText the text to limit
  * @return the limited text
  */
 private String limitTextContent(String columnName, String workedOnText) {
   // TODO check double byte effects (ä, ö and so on) - whether we have to limit more
   Integer maxFieldSizeInteger = (Integer)dataObject.maxFieldSize.get(columnName.toUpperCase());
   if (maxFieldSizeInteger != null && maxFieldSizeInteger.intValue() > 0 && workedOnText.length() > maxFieldSizeInteger.intValue()) {
     workedOnText = workedOnText.substring(0, maxFieldSizeInteger.intValue());
   }
   return workedOnText;
 }

 @Override
 public String getUpdatePhrase(Hashtable<String, Object> original, Hashtable<String, Object> workedOn, String entity, int columnCount, String[] columnNames, int[] columnType, int[] columnScale) {
   Object workedOnColumnObject;
   Integer originalInteger;
   Integer workedOnInteger;
   Double originalDouble;
   Double workedOnDouble;
   Long originalLong;
   Long workedOnLong;
   String originalText;
   String workedOnText;
   java.sql.Date originalDate;
   java.sql.Date workedOnDate;
   int countUpdateColumns = 0;
   String updateStatement = "update " + entity + " set ";
   for (int i = 1; i <= columnCount; i++) {
     switch (columnType[i-1]) {
     case -7:
       Boolean originalBoolean = (Boolean)original.get(columnNames[i-1].toUpperCase());
       Boolean workedOnBoolean = (Boolean)workedOn.get(columnNames[i-1].toUpperCase());
       if (!workedOnBoolean.equals(originalBoolean)) {
         // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
         if (++countUpdateColumns > 1) updateStatement += ", ";
         if (workedOnBoolean.booleanValue()) updateStatement += columnNames[i-1] + " = 1";
         else updateStatement += " " + columnNames[i-1] + " = 0";
       }
       break;
     case -1: // MS Access memo
       originalText = (String)original.get(columnNames[i-1].toUpperCase());
       workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
       if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
         // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
         if (++countUpdateColumns > 1) updateStatement += ", ";
         updateStatement += columnNames[i-1] + " = \'" + sqlSecure(workedOnText) + "\'";
       }
       break;
     case 1:
       originalText = (String)original.get(columnNames[i-1].toUpperCase());
       workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
       if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
         // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
         // let's avoid ORA-12899 and cut too long content like other DBs 
         workedOnText = limitTextContent(columnNames[i-1], workedOnText); 
         if (++countUpdateColumns > 1) updateStatement += ", ";
         updateStatement += columnNames[i-1] + " = \'" + sqlSecure(workedOnText) + "\'";
       }
       break;
     case 2: // Oracle number
       workedOnColumnObject = workedOn.get(columnNames[i-1].toUpperCase());
       if (workedOnColumnObject instanceof BigDecimal) {
         workedOnDouble = new Double(((BigDecimal)workedOnColumnObject).doubleValue());
       } else {
         workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
       }
       originalDouble = (Double)original.get(columnNames[i-1].toUpperCase());
       if (!workedOnDouble.equals(originalDouble)) {
         // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
         if (++countUpdateColumns > 1) updateStatement += ", ";
         updateStatement += columnNames[i-1] + " = " + workedOnDouble.toString();
       }
       break;
     case 3: // double
       workedOnColumnObject = workedOn.get(columnNames[i-1].toUpperCase());
       if (workedOnColumnObject instanceof BigDecimal) {
         workedOnDouble = new Double(((BigDecimal)workedOnColumnObject).doubleValue());
       } else {
         workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
       }
       originalDouble = (Double)original.get(columnNames[i-1].toUpperCase());
       if (!workedOnDouble.equals(originalDouble)) {
         // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
         if (++countUpdateColumns > 1) updateStatement += ", ";
         updateStatement += columnNames[i-1] + " = " + workedOnDouble.toString();
       }
       break;
     case 4:
       originalInteger = (Integer)original.get(columnNames[i-1].toUpperCase());
       workedOnInteger = (Integer)workedOn.get(columnNames[i-1].toUpperCase());
       if (!workedOnInteger.equals(originalInteger)) {
         // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
         if (++countUpdateColumns > 1) updateStatement += ", ";
         updateStatement += columnNames[i-1] + " = " + workedOnInteger.toString();
       }
       break;
     case 5:
       originalLong = (Long)original.get(columnNames[i-1].toUpperCase());
       workedOnLong = (Long)workedOn.get(columnNames[i-1].toUpperCase());
       if (!workedOnLong.equals(originalLong)) {
         // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
         if (++countUpdateColumns > 1) updateStatement += ", ";
         updateStatement += columnNames[i-1] + " = " + workedOnLong.toString();
       }
       break;
     case 6:
       Float originalFloat = (Float)original.get(columnNames[i-1].toUpperCase());
       Float workedOnFloat = (Float)workedOn.get(columnNames[i-1].toUpperCase());
       if (!workedOnFloat.equals(originalFloat)) {
         // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
         if (++countUpdateColumns > 1) updateStatement += ", ";
         updateStatement += columnNames[i-1] + " = " + workedOnFloat.toString();
       }
       break;
     case 7:
       originalFloat = (Float)original.get(columnNames[i-1].toUpperCase());
       workedOnFloat = (Float)workedOn.get(columnNames[i-1].toUpperCase());
       if (!workedOnFloat.equals(originalFloat)) {
         // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
         if (++countUpdateColumns > 1) updateStatement += ", ";
         updateStatement += columnNames[i-1] + " = " + workedOnFloat.toString();
       }
       break;
     case 8: // Oracle number via ODBC
       if (columnScale[i-1] == 0) {
         originalDouble = (Double)original.get(columnNames[i-1].toUpperCase());
         workedOnDouble = (Double)workedOn.get(columnNames[i-1].toUpperCase());
         if (!workedOnDouble.equals(originalDouble)) {
           // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
           if (++countUpdateColumns > 1) updateStatement += ", ";
           updateStatement += columnNames[i-1] + " = " + workedOnDouble.toString();
         }
       } else {
         BigDecimal originalBigDecimal = (BigDecimal)original.get(columnNames[i-1].toUpperCase());
         BigDecimal workedOnBigDecimal = (BigDecimal)workedOn.get(columnNames[i-1].toUpperCase());
         if (!workedOnBigDecimal.equals(originalBigDecimal)) {
           // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1]);
           if (++countUpdateColumns > 1) updateStatement += ", ";
           updateStatement += columnNames[i-1] + " = " + workedOnBigDecimal.toString();
         }
       }
       break;
     case 12:
       originalText = (String)original.get(columnNames[i-1].toUpperCase());
       workedOnText = (String)workedOn.get(columnNames[i-1].toUpperCase());
       if (!StringFunctions.rtrim(workedOnText).equals(originalText)) {
         // de.must.io.Logger.getInstance().info(getClass(), columnNames[i-1] + " modified");
         // let's avoid ORA-12899 and cut too long content like other DBs 
         workedOnText = limitTextContent(columnNames[i-1], workedOnText); 
         if (++countUpdateColumns > 1) updateStatement += ", ";
         updateStatement += columnNames[i-1] + " = \'" + sqlSecure(workedOnText) + "\'";
       }
       break;
     case 91: // DATE
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
     case 93:
       Object oriObj = original.get(columnNames[i-1].toUpperCase());
       Object woObj = workedOn.get(columnNames[i-1].toUpperCase());
       if (oriObj instanceof java.sql.Date) {
         originalDate = (java.sql.Date)oriObj;
       } else {
         if (oriObj == null) {
           originalDate = null;
         } else {
           java.sql.Timestamp timestamp = (java.sql.Timestamp)oriObj;
           originalDate = new java.sql.Date(timestamp.getTime());
         }
       }
       if (woObj instanceof java.sql.Date) {
         workedOnDate = (java.sql.Date)woObj;
       } else {
         if (woObj == null) {
           workedOnDate = null;
         } else {
           java.sql.Timestamp timestamp = (java.sql.Timestamp)woObj;
           workedOnDate = new java.sql.Date(timestamp.getTime());
         }
       }
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
           // access: updateStatement += columnNames[i-1] + " = \'" + workedOnDate + "\'";
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

 @Override
 public String unifyTableName(String tableName) {
   return tableName.toUpperCase();
 }

 @Override
 public String unifyColumnName(String columnName) {
   return columnName.toUpperCase();
 }

 @Override
 public String getSqlCompareString(de.must.util.DateString dateString) {
   return dateString.getSqlCompareString();
 }

 @Override
 public String getSqlCompareString(Date date) {
   return getSqlCompareString(new DateString(date));
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
   int length;
   int scale;
   String createStatement = "create table " + tableName + " (";
   int lastPos = attributes.length - 1;
   for (int i = 0; i <= lastPos; i++) {
     createStatement += attributes[i].getFieldName() + " ";
     switch (attributes[i].getType()) {
     case AbstractAttribute.LOGICAL:
       createStatement += "DECIMAL(1)";
       break;
     case AbstractAttribute.MEMO:
       length = attributes[i].getLength();
       createStatement += "long varchar";
       break;
     case AbstractAttribute.DECIMAL:
       createStatement += "number";
       break;
     case AbstractAttribute.INTEGER:
       createStatement += "number";
       break;
     case AbstractAttribute.BIGINT:
       createStatement += "number";
       break;
     case AbstractAttribute.FLOAT:
       createStatement += "double";
       break;
     case AbstractAttribute.NUMBER:
       createStatement += "DECIMAL";
       length = attributes[i].getLength();
       scale = attributes[i].getScale();
       if (length != 0) {
         createStatement += "(" + length;
         if (scale != 0) createStatement += ", " + scale;
         createStatement += ")";
       }
       break;
     case AbstractAttribute.CHAR:
       createStatement += "char(" + attributes[i].getLength() + ")";
       break;
     case AbstractAttribute.VARCHAR:
       length = attributes[i].getLength();
       if (length > 4000) length = 4000;
       createStatement += "varchar(" + length + ")";
       break;
     case AbstractAttribute.DATE:
       createStatement += "date";
       break;
     case AbstractAttribute.TIMESTAMP:
       createStatement += "date";
       break;
     case AbstractAttribute.TIME:
       createStatement += "date";
       break;
     default:
       Logger.getInstance().info(OracleDialect.class, "unsupported columnType: " + attributes[i].getType() + " at column " + attributes[i].getFieldName());
       break;
     }
     if (indices.length > 0) {
       for (int j = 0; j < indices[0].getIndexItems().length; j++) {
         if (indices[0].getIndexItems()[j].getFieldName().equals(attributes[i].getFieldName())) {
           createStatement += " NOT NULL";
         }
       }
     }
     if (i < lastPos) createStatement += ", ";
   }
   if (indices.length > 0 && indices[0] != null && indices[0].getOccurrence()==Index.UNIQUE) {
     createStatement += ", PRIMARY KEY(";
     for (int i = 0; i < indices[0].getIndexItems().length; i++) {
       if (i > 0) createStatement += ", ";
       createStatement += indices[0].getIndexItems()[i].getFieldName();
     }
     createStatement += ")";
   }
   createStatement += ")";
   return createStatement;
 }

 /**
  * Returns the specific create index statement string of the specified table
  * @param tableName the name of the table to be indexed
  * @param index the index to be created
  * @return the create index statement string
  */
 public static String getCreateIndexStatement(String tableName, Index index, String indexName) {
   String createIndexStatement;
     if (index.getOccurrence()==Index.UNIQUE) {
       createIndexStatement = "create unique index ";
     }
     else {
       createIndexStatement = "create index ";
     }
     createIndexStatement += indexName + " on " + tableName + " (";
     int countIndexItems = index.getIndexItems().length;
     for (int j = 0; j < countIndexItems; j++) {
       createIndexStatement += index.getIndexItems()[j].getFieldName();
       if (j < countIndexItems -1) createIndexStatement += ", ";
     }
     createIndexStatement += ")";
   return createIndexStatement;
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
   return "";
 }
 
}
