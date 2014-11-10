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
import de.must.util.StringFunctions;

import java.sql.*;
import java.text.NumberFormat;
import java.util.Hashtable;
import java.util.Locale;

/**
 * Super class for all database specific operations. Each database defines its
 * own subclass to handle their typical sql dialects. The specific dialect is
 * loaded when DataObject is created.
 * @author Christoph Mueller
 * @see ConnectionHolder
 * @see DataObject
 */
public abstract class SqlDialect {

  protected DataObject dataObject;
  private AbstractAttribute[] attributes;
  
  protected void setDataObject(DataObject dataObject) {
    this.dataObject = dataObject;
  }

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
  public abstract void initRow(ResultSet rs, Hashtable<String, Object> Original, Hashtable<String, Object> WorkedOn, String entity, int columnCount, String[] ColumnNames, int[] ColumnType, int[] ColumnScale);
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
  public abstract void loadRow(ResultSet rs, Hashtable<String, Object> Original, Hashtable<String, Object> WorkedOn, String entity, int columnCount, String[] ColumnNames, int[] ColumnType, int[] ColumnScale);
  public abstract void fillInsertStatementWithValues(PreparedStatement statementForInsertion, Hashtable<String, Object> original, Hashtable<String, Object> workedOn, String entity, int columnCount, String[] columnNames, int[] columnType, int[] columnScale, String columnNameOfRecordingDate, String columnNameOfRecordingUser, String recordingUser) throws SQLException;
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
  public abstract String getUpdatePhrase(Hashtable<String, Object> Original, Hashtable<String, Object> WorkedOn, String entity, int columnCount, String[] ColumnNames, int[] ColumnType, int[] ColumnScale);
  /**
   * Unifies the table name.
   * @param tableName the table name to unify
   * @return the unified table name
   */
  public abstract String unifyTableName(String tableName);
  /**
   * Unifies the column name.
   * @param columnName the column name to unify
   * @return the unified column name
   */
  public abstract String unifyColumnName(String columnName);
  /**
   * Returns the specific variant how date values are compared.
   * @param dateString the DateString to be prepared
   * @return the prepared String for data comparison
   */
  public abstract String getSqlCompareString(de.must.util.DateString dateString);
  /**
   * Returns the specific variant how date values are compared.
   * @param date the date value to be prepared
   * @return the prepared String for data comparison
   */
  public abstract String getSqlCompareString(Date date);
  
  /**
   * Returns the compare fragment for exact date comparison regardless their time parts in where conditions.
   * In case of overriding, Be advised that using date functions may cause performance leaks,
   * therefore prefer BETWEEN. 
   * @param columnName  the name of the column containing the date value (which may include time parts!)
   * @param date  the date to compare to
   * @return the applicable fragment for exact comparison regardless their time parts 
   */
  public String getWhereConditionFragementForExactDateComparison(String columnName, Date date) {
    String scs = (new DateString(date)).getSqlCompareString();
    return columnName + " BETWEEN '" + scs + " 00:00:00' AND '" + scs + " 23:59:59'";
  }
  
  /**
   * Returns the specific variant how boolean values are compared.
   * @param b the boolean value to be prepared
   * @return the prepared String for boolean comparison
   */
  public String getSqlCompareString(boolean b) {
    if (b) return "true";
    else return "false";
  }
  
  
  /**
   * Returns the value of a column as boolean.
   * @param columnName the name of the column
   * @param original the buffer of original values of the row
   * @return the value of a column
   */
  public abstract boolean getBoolean(String ColumnName, Hashtable<String, Object> Original);
  /**
   * Sets the value of the specified column.
   * @param columnName the name of the column to be set
   * @param boolValue the value the column shall be set to
   * @param workedOn the buffer of worked on values of the row
   */
  public abstract void setBoolean(String ColumnName, boolean boolValue, Hashtable<String, Object> WorkedOn);
  
  /**
   * Converts String values before sending to database. Needed if databases comes in trouble with control bytes like e.g. "\n", 
   * Override it if necessary.
   * @param value the value to transform
   * @return the transformed value
   */
  public String transformStringWhenSaving(String columnName, String value) {
    return value;
  }

  /**
   * Returns the boolean value of the specified column.
   * @param rs the result set
   * @param columnNbr the number of the column
   * @return the value of the column
   */
  protected boolean getRowBoolean(ResultSet rs, int columnNbr) {
    try {
      return rs.getBoolean(columnNbr);
    }
    catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowBoolean of " + columnNbr + " caught " + e2);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowBoolean of " + columnNbr + " caught " + e);
    }
    return false;
  }

  /**
   * Returns the float value of the specified column.
   * @param rs the result set
   * @param columnNbr the number of the column
   * @return the value of the column
   */
  protected float getRowFloat(ResultSet rs, int columnNbr) {
    try {
      return rs.getFloat(columnNbr);
    }
    catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowInt of " + columnNbr + " caught " + e2);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowInt of " + columnNbr + " caught " + e);
    }
    return 0;
  }

  /**
   * Returns the int value of the specified column.
   * @param rs the result set
   * @param columnNbr the number of the column
   * @return the value of the column
   */
  protected int getRowInt(ResultSet rs, int columnNbr) {
    try {
      return rs.getInt(columnNbr);
    }
    catch (SQLException e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    return 0;
  }

  /**
   * Returns the long value of the specified column.
   * @param rs the result set
   * @param columnNbr the number of the column
   * @return the value of the column
   */
  protected long getRowLong(ResultSet rs, int columnNbr) {
    try {
      return rs.getLong(columnNbr);
    }
    catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowInt of " + columnNbr + " caught " + e2);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowInt of " + columnNbr + " caught " + e);
    }
    return 0;
  }

  /**
   * Returns the date value of the specified column.
   * @param rs the result set
   * @param columnNbr the number of the column
   * @return the value of the column
   */
  protected java.sql.Date getRowDate(ResultSet rs, int columnNbr) {
    try {
      return rs.getDate(columnNbr);
    }
    /* catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowDate caught " + e2);
    } */
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowDate caught " + e + " / columnNbr: " + columnNbr);
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    return null;
  }

  /**
   * Returns the time value of the specified column.
   * @param rs the result set
   * @param columnNbr the number of the column
   * @return the value of the column
   */
  protected java.sql.Time getRowTime(ResultSet rs, int columnNbr) {
    try {
      return rs.getTime(columnNbr);
    }
    /* catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowDate caught " + e2);
    } */
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowDate caught " + e + " / columnNbr: " + columnNbr);
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    return null;
  }

  /**
   * Returns the String value of the specified column.
   * @param rs the result set
   * @param columnNbr the number of the column
   * @return the value of the column
   */
  protected String getRowString(ResultSet rs, int columnNbr) {
    try {
      return rs.getString(columnNbr);
    }
    catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowString of " + columnNbr + " caught " + e2);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowString of " + columnNbr + " caught " + e);
    }
    return null;
  }

  /**
   * Returns the double value of the specified column.
   * @param rs the result set
   * @param columnNbr the number of the column
   * @return the value of the column
   */
  protected double getRowDouble(ResultSet rs, int columnNbr) {
    try {
      return rs.getDouble(columnNbr);
    }
    catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowDouble of " + columnNbr + " caught " + e2);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowDouble of " + columnNbr + " caught " + e);
    }
    return 0;
  }

  /**
   * Returns the boolean value of the specified column.
   * @param rs the result set
   * @param columnName the name of the column
   * @return the value of the column
   */
  protected boolean getRowBoolean(ResultSet rs, String columnName) {
    try {
      return rs.getBoolean(columnName);
    }
    catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowBoolean of " + columnName + " caught " + e2);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowBoolean of " + columnName + " caught " + e);
    }
    return false;
  }

  /**
   * Returns the float value of the specified column.
   * @param rs the result set
   * @param columnName the name of the column
   * @return the value of the column
   */
  protected float getRowFloat(ResultSet rs, String columnName) {
    try {
      return rs.getFloat(columnName);
    }
    catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowInt of " + columnName + " caught " + e2);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowInt of " + columnName + " caught " + e);
    }
    return 0;
  }

  /**
   * Returns the int value of the specified column.
   * @param rs the result set
   * @param columnName the name of the column
   * @return the value of the column
   */
  protected int getRowInt(ResultSet rs, String columnName) {
    try {
      return rs.getInt(columnName);
    }
    catch (SQLException e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    return 0;
  }

  /**
   * Returns the long value of the specified column.
   * @param rs the result set
   * @param columnName the name of the column
   * @return the value of the column
   */
  protected long getRowLong(ResultSet rs, String columnName) {
    try {
      return rs.getLong(columnName);
    }
    catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowInt of " + columnName + " caught " + e2);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowInt of " + columnName + " caught " + e);
    }
    return 0;
  }

  /**
   * Returns the date value of the specified column.
   * @param rs the result set
   * @param columnName the name of the column
   * @return the value of the column
   */
  protected java.sql.Date getRowDate(ResultSet rs, String columnName) {
    try {
      return rs.getDate(columnName);
    }
    /* catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowDate caught " + e2);
    } */
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowDate caught " + e + " / columnName: " + columnName);
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    return null;
  }

  /**
   * Returns the time value of the specified column.
   * @param rs the result set
   * @param columnName the name of the column
   * @return the value of the column
   */
  protected java.sql.Time getRowTime(ResultSet rs, String columnName) {
    try {
      return rs.getTime(columnName);
    }
    /* catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowDate caught " + e2);
    } */
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowTime caught " + e + " / columnName: " + columnName);
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    return null;
  }

  /**
   * Returns the timestamp value of the specified column.
   * @param rs the result set
   * @param columnName the name of the column
   * @return the value of the column
   */
  protected java.sql.Timestamp getRowTimestamp(ResultSet rs, String columnName) {
    try {
      return rs.getTimestamp(columnName);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowTimestamp caught " + e + " / columnName: " + columnName);
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    return null;
  }

  /**
   * Returns the String value of the specified column.
   * @param rs the result set
   * @param columnName the name of the column
   * @return the value of the column
   */
  protected String getRowString(ResultSet rs, String columnName) {
    try {
      return rs.getString(columnName);
    }
    catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowString of " + columnName + " caught " + e2);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowString of " + columnName + " caught " + e);
    }
    return null;
  }

  /**
   * Returns the double value of the specified column.
   * @param rs the result set
   * @param columnName the name of the column
   * @return the value of the column
   */
  protected double getRowDouble(ResultSet rs, String columnName) {
    try {
      return rs.getDouble(columnName);
    }
    catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowDouble of " + columnName + " caught " + e2);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "getRowDouble of " + columnName + " caught " + e);
    }
    return 0;
  }

  /**
   * Returns a double as a string in a way it is accepted at sql updates.
   * @param doubleObj the double value to be formatted
   * @return a double as a string in a way it is accepted at sql updates
   */
  public String getSQLFormat(Double doubleObj) {
    NumberFormat formatter = NumberFormat.getInstance(Locale.US);
    String formattedDouble = formatter.format(doubleObj);
    formattedDouble = StringFunctions.replaceAll(formattedDouble, ",", "");
    return formattedDouble;
  }

  /**
   * Replaces ' by '' to avoid sql error while inserting or updating.
   * @param stringField the String to modify
   * @return the modified String
   */
  protected String sqlSecure(String stringField) {
    if (stringField.indexOf('\'') == -1) return stringField;
    int i, j;
    char[] oldChars = stringField.toCharArray();
    char[] newChars = new char[stringField.length() * 2];
    j = -1;
    for (i = 0; i < stringField.length(); i++) {
      j++;
      if (oldChars[i] == '\'') {
        newChars[j] = '\'';
        newChars[++j] = '\'';
      }
      else {
        newChars[j] = oldChars[i];
      }
    }
    return new String(newChars, 0, j+1);
  }
  
  /**
   * Compresses the column value to its maximum length as specified in database.
   * @param columnName the name of the column to be compressed
   * @param columnValue the column value to be compressed
   * @return the compressed value
   */
  protected String compress(String columnName, String columnValue) {
    String result = columnValue;
    int columnLength = dataObject.getColumnLength(columnName);
    if (columnValue.length() > columnLength) result = columnValue.substring(0, columnLength);
    return result;
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

  /**
   * Sets the list of attributes. Helpful to determine things that may not be
   * determined by meta data like column type.
   * @param the attributes of the data object.
   */
  protected void setAttributes(AbstractAttribute[] attributes) {
    this.attributes = attributes;
  }

  /**
   * Checks whether or not the specified column is of type boolean by 
   * evaluating the attributes of the data object if available.
   * @param columnName the name of the column to be checked as boolean type
   * @return true if the specified column is of type boolean
   */
  protected boolean isKnownAsBoolean(String columnName) {
    if (attributes == null) return false;
    for (int i = 0; i < attributes.length; i++) {
      if (attributes[i].getFieldName().equalsIgnoreCase(columnName)) {
        return attributes[i].getType() == AbstractAttribute.BOOLEAN;
      }
    }
    return false;
  }

  public static int getIntDateValue(java.sql.Date dateValue) {
    if (dateValue == null) return 0;
    else {
      String dateString = dateValue.toString();
      String year = dateString.substring(0, 4);
      String month = dateString.substring(5, 7);
      String day = dateString.substring(8, 10);
      return Integer.parseInt(year + month + day);
    }
  }

}
