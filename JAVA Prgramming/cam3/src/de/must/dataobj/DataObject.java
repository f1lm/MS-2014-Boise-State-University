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
import de.must.middle.GlobalStd;
import de.must.util.*;

import java.sql.*;
import java.sql.Date;
import java.text.DecimalFormat;
import java.util.*;
import java.lang.ref.WeakReference;

/**
 * The central class to read and write to database tables.
 * Define your table in a database independent way as shown in the samples
 * (subclasses). The subclasses should contain the table name, a list of
 * attributes and indices and use them for the construction of this class.
 * When data is read, it is buffered in two hashtables, original and workedOn.
 * Changes are synchronized in hashtable workedOn. To get the appropriate
 * update statement, the values of original and workedOn are compared, and the
 * specific SQL dialect will provide the update statement.
 * Attributes and indices are required for database specific table creation and
 * for knowing how to update the row. Therefore, at least the primary key should
 * be described in attributes and indices.
 * @see SqlDialect
 * @author Christoph Mueller
 */
public abstract class DataObject implements EntityInfo, DataObjectConstructionDetails {

  private static ChangeLogStd changeLog;
  private static DoChangeLog doChangeLog;
  
  public static void setChangeLog(ChangeLogStd newChangeLog) {
    changeLog = newChangeLog;
  }
  
  public static void setDoChangeLog(DoChangeLog newDoChangeLog) {
    doChangeLog = newDoChangeLog;
  }
  
  private SqlDialect sqlDialect;
  private int maxRowDemo = 50;

  private static int databaseType = ConnectionHolder.MS_ACCESS;

  private int mode;
  public static final int INSERTMODE = 0;
  public static final int UPDATEMODE = 1;

  private static final int META_NONE = 0;
  private static final int META_ALL = 1;
  private static final int META_INDIVIDUAL = 2;
  private int metaMode = META_NONE;
  private int lastMetaMode = META_NONE;

  private boolean silentUpdate = false;
  private boolean readBigDecimalAsInt = false;

  private String columnNameOfRecordingDate = "ErfassDat";
  private String columnNameOfRecordingUser = "ErfassAnw";
  private static java.sql.Date staticRecordingDate = MustCalendar.getTodaySqlDate(); 
  private static String staticRecordingUserName;

  private Logger logger = Logger.getInstance();
  private Connection connection;
  private IdManager assignedIdManager;
  private Statement primaryStatement;
  private PreparedStatement statementForRowCount;
  private PreparedStatement statementForPirmaryKeyAccess;
  private PreparedStatement statementForLoadMetaData;
  private PreparedStatement statementForPrimaryKeyDelete;
  private PreparedStatement statementForInsertion;
  private String lastColumnsUsedByPreparedStatement;
  private IdentifyTemplate identifyTemplate;
  private Identifier identifier;
  private ResultSet rs;
  private ResultSetMetaData metaData;
  private int columnCount;
  private int currentColumn = 0;
  protected String[] columnNames;
  protected int[] columnType;
  private int[] columnScale;
  private PreparedStatement[] columnPrepStat;
  protected Hashtable<String, Integer> htColumnType = new Hashtable<String, Integer>();
  protected Hashtable<String, Integer> maxFieldSize = new Hashtable<String, Integer>();
  protected Hashtable<String, Object> original = new Hashtable<String, Object>();
  private Hashtable<String, Object> workedOn = new Hashtable<String, Object>();
  private Class<?> dataChangeSender = null;
  private int sequenceType;
  private SQLException queryException;
  private String failedQueryExpression;
  private boolean hashtablesDirty;
  private Vector<WeakReference<DataObject>> coDataObjects;
  private Exception lastException;

  /**
   * Returns the staticRecordingDate.
   * @return the staticRecordingDate
   */
  public static java.sql.Date getStaticRecordingDate() {
    return staticRecordingDate;
  }

  /**
   * Sets the staticRecordingDate
   * @param staticRecordingDate the staticRecordingDate to set.
   */
  public static void setStaticRecordingDate(java.sql.Date newStaticRecordingDate) {
    staticRecordingDate = newStaticRecordingDate;
  }

  /**
   * Constructs a new DataObject with the specified DB connection details.
   * @param dataObjectConstructionDetails the DB connection details to use
   */
  protected DataObject(DataObjectConstructionDetails dataObjectConstructionDetails) {
    this((dataObjectConstructionDetails != null?dataObjectConstructionDetails.getConnection():null));
    if (dataObjectConstructionDetails != null) setIdManager(dataObjectConstructionDetails.getIdManager());
  }

  /**
   * Constructs a new DataObject with the specified global objects of the
   * individual application. Thus, sharing the ID manager is enabled.
   * @param newConnection the connection to the database to use
   * @param maxColumns the maximum number of columns for cache dimensioning
   */
  protected DataObject(DataObjectConstructionDetails dataObjectConstructionDetails, int maxColumns) {
    this((dataObjectConstructionDetails != null?dataObjectConstructionDetails.getConnection():null), maxColumns);
    if (dataObjectConstructionDetails != null) setIdManager(dataObjectConstructionDetails.getIdManager());
  }

  /**
   * Constructs a new DataObject with the specified connection and the name of the
   * unique key to process updates.
   * @param newConnection the connection to the database to use
   * @param uniqueKeyName the name of the unique key field
   */
  protected DataObject(Connection newConnection, String uniqueKeyName) {
    this(newConnection, new IdentifyTemplate(new String[] {uniqueKeyName}, new int[] {IdentifyTemplate.IDENTIFIED_BY_INT}));
  }

  /**
   * Constructs a new DataObject with the specified connection and identify template
   * @param newConnection the connection to the database to use
   * @param identifyTemplate the identify template to build where conditions when loading entries by identifier
   */
  protected DataObject(Connection newConnection, IdentifyTemplate identifyTemplate) {
    this(newConnection);
    this.identifyTemplate = identifyTemplate;
  }

  /**
   * Constructs a new DataObject with the specified connection. If available,
   * the primary key is analyzed and set. Otherwise to process updates the
   * single record has to be identified by a free formulated condition.
   * To get static entity information only, you may create the data object
   * with connection = null.
   * @param connection the connection to the database to use
   */
  protected DataObject(Connection connection) {
    this(connection, 200);
  }
  
  /**
   * Constructs a new DataObject with the specified connection. If available,
   * the primary key is analyzed and set. Otherwise to process updates the
   * single record has to be identified by a free formulated condition.
   * To get static entity information only, you may create the data object
   * with connection = null.
   * @param connection the connection to the database to use
   * @param maxColumns the maximum number of columns for cache capacity
   */
  protected DataObject(Connection connection, int maxColumns) {
    this.connection = connection;
    columnNames = new String[maxColumns];
    columnType = new int[maxColumns];
    columnScale = new int[maxColumns];
    columnPrepStat = new PreparedStatement[maxColumns];
    if (getIndices() != null && getIndices().length > 0 && getIndices()[0].isUnique() && getAttributes() != null) {
      identifyTemplate = new IdentifyTemplate(getIndices()[0], getAttributes());
    }
    if (connection != null) {
      databaseType = ConnectionHolder.getDatabaseType(connection);
      sqlDialect = ConnectionHolder.getSqlDialect(connection);
      sqlDialect.setDataObject(this);
      sqlDialect.setAttributes(getAttributes());
    }
  }

  /**
   * Sets the database connection, which may become necessary in context with connection pooling.
   * Sample: when connections are taken back each time a web page is finished, the new page of the 
   * session may have a different connection.
   * @param connection the new connection
   */
  public void setConnection(Connection connection) {
    if (connection.equals(this.connection)) return; // no change
    this.connection = connection;
  }

  /**
   * Sets the specified boolean to indicate whether insert and update should
   * be done with or without firing data change events.
   * Useful for batch jobs with many updates or inserts.
   * @param newSilentUpdate the boolean to be set, if true insert and update is done silently
   */
  public void setSilentUpdate(boolean newSilentUpdate) {
    silentUpdate = newSilentUpdate;
  }

  /**
   * Indicates if column type BigDecimal should be read as int.
   * Used for primary key standardization.
   * @param newReadBigDecimalAsInt a boolean value, true if BigDecimal should
   * be read as int.
   */
  public void setReadBigDecimalAsInt(boolean newReadBigDecimalAsInt) {
    readBigDecimalAsInt = newReadBigDecimalAsInt;
  }

  /**
   * Sets the column name of the recording date. When records are inserted and
   * this column name is found, it's automatically filled with the actual date.
   * @param newColumnNameOfRecordingDate the name of the column which is to be
   * filled with the recording date.
   */
  protected void setColumnNameOfRecordingDate(String newColumnNameOfRecordingDate) {
    columnNameOfRecordingDate = newColumnNameOfRecordingDate;
  }

  /**
   * Sets the column name of the recording user. When records are inserted and
   * this column name is found, it's automatically filled with the name of the
   * recording user.
   * @param columnNameOfRecordingUser the name of the column which is to be
   * filled by the recording user
   * @param recordingUser the name of the recording user
   */
  protected void setRecordingUser(String columnNameOfRecordingUser, String newRecordingUser) {
    this.columnNameOfRecordingUser = columnNameOfRecordingUser;
    staticRecordingUserName = newRecordingUser;
  }

  /**
   * Sets the name of the recording user.
   * @param recordingUser the name of the recording user
   */
  public static void setRecordingUser(String newRecordingUser) {
    staticRecordingUserName = newRecordingUser;
  }

/******************************************************************************* 
 * info
 ******************************************************************************/

  /**
   * Returns the used connection. Thus, we can pass construction details from
   * one DataObject to another via <code>new MyDataObject(this)</code>.
   * @return the used connection
   * @see de.must.dataobj.DataObjectConstructionDetails#getConnection()
   */
  public Connection getConnection() {
    return connection;
  }

  /**
   * Returns the SQL dialect class. Thus, e.g. WhereCondition is able to format
   * the date as needed by the specific database driver.
   * @return the SQL dialect class
   * @see WhereCondtion
   */
  // only visible by the package
  SqlDialect getSqlDialect() {
    return sqlDialect;
  }

  /**
   * Returns the used Id Manager.
   * @return the used Id Manager
   * @see de.must.dataobj.DataObjectConstructionDetails#getIdManager()
   */
  public IdManager getIdManager() {
    return assignedIdManager;
  }

  /**
   * Returns the description of the specified field.
   * @param field the name of the field which description should be returned
   * @return the description of the specified field
   */
  public String getDescription(String field) {
    if (getAttributes() == null) return null;
    for (AbstractAttribute attribute : getAttributes()) {
      if (attribute.getFieldName().equals(field)) {
        return attribute.getDescription();
      }
    }
    return null;
  }

  /**
   * Retrieves the internal description the specified column.
   * @param columnName the name of the column
   * @param atrributes an attribute array where the column is to be found
   * @return the description of the column or the column name itself if the
   * column was not found.
   */
  public String getDescription(String columnName, AbstractAttribute[] atrributes) {
    for (AbstractAttribute attribute : atrributes) {
      if (attribute.getFieldName().equals(columnName)) {
        return attribute.getDescription();
      }
    }
    return columnName;
  }

/*******************************************************************************
Methods to list data / prove existence
*******************************************************************************/

  /**
   * Indicates, whether a record exists, whose column's value is equals the
   * specified value.
   * @param columnName the name of the column to check
   * @param columnValue the value of the column to be found
   * @return true if the column value was found
   */
  public boolean contains(String columnName, String columnValue) {
    String queryExpression = "select " +  unifyColumnName(columnName) + " from " + getTableName() + " where " +  unifyColumnName(columnName) + " = \'" + columnValue + "\'";
    return isQueryFindingRecords(queryExpression);
  }

  /**
   * Indicates, whether a record exists, whose column's value is equals the
   * specified value.
   * @param columnName the name of the column to check
   * @param identifier the value of the column to be found
   * @return true if the column value was found
   */
  public boolean contains(String columnName, Identifier identifier) {
    return contains(columnName, identifier.getIntIdentifier());
  }

  /**
   * Indicates, whether a record exists, whose column's value is equals the
   * specified value.
   * @param columnName the name of the column to check
   * @param columnValue the value of the column to be found
   * @return true if the column value was found
   */
  public boolean contains(String columnName, int columnValue) {
    String queryExpression = "select " +  unifyColumnName(columnName) + " from " + getTableName() + " where " +  unifyColumnName(columnName) + " = "  + columnValue;
    return isQueryFindingRecords(queryExpression);
  }

  /**
   * Indicates, whether a record exists, whose column's value is equals the
   * specified date.
   * @param columnName the name of the date column to check
   * @param columnValue the date value to be found
   * @return true if the column value was found
   */
  public boolean contains(String columnName, java.sql.Date columnValue) {
    String queryExpression = "select " +  unifyColumnName(columnName) + " from " + getTableName() + " where " +  unifyColumnName(columnName) + " = " + getSqlCompareString(columnValue);
    return isQueryFindingRecords(queryExpression);
  }

  /**
   * Returns the date in the way the database dialect expects it in the where clause.
   * @param date the date to format
   * @return the date as the database expects it in where conditions
   */
  public String getSqlCompareString(java.sql.Date date) {
    return sqlDialect.getSqlCompareString(date);
  }

  public String getSqlCompareString(boolean b) {
    return sqlDialect.getSqlCompareString(b);
  }

  /**
   * Indicates, whether a where condition will find results.
   * @param whereCondition the where condition to be checked
   * @return true if the condition will return results
   */
  public boolean isAvailable(String whereCondition) {
    return isAvailable(whereCondition, "*");
  }

  /**
   * Indicates, whether a where condition will find results.
   * @param whereCondition the where condition to be checked
   * @param fieldSelection the names of the fields/columns to be used in the
   * check statement
   * @return true if the condition will return results
   */
  public boolean isAvailable(String whereCondition, String fieldSelection) {
    String queryExpression = "select " + unifyColumnName(getKeyExtendedFieldSelection(fieldSelection)) + " from " + getTableName() + " where " + whereCondition;
    return isQueryFindingRecords(queryExpression);
  }

  /**
   * Indicates, whether a query expression will find results.
   * @param queryExpression the query expression to check
   * @return true if the query will return results
   */
  private boolean isQueryFindingRecords(String queryExpression) {
    boolean found = false;
    openQuery(queryExpression);
    try {
      if (rs.next()) found = true;
      currentColumn = 0;
    }
    catch (SQLException e2) {
      logger.error(e2);
    }
    catch (Exception e) {
      logger.error(e);
    }
    closeQuery();
    return found;
  }

  public int getRowCount() {
    String queryString = null;
    try {
      if (statementForRowCount == null) {
        queryString = "select count(" + identifyTemplate.getIdentifyColumnNames()[0] + ") from " + getTableName();
        statementForRowCount = connection.prepareStatement(queryString);
      }
      rs = statementForRowCount.executeQuery();
      if (rs.next()) return rs.getInt(1);
      else return 0;
    }
    catch (SQLException e2) {
      if (connection == null) logger.info(getClass(), "No connection to DB!");
      logger.info(getClass(), queryString);
      logger.error(getClass(), e2);
      statementForRowCount = null; // AS400 relevant since approximately 2010 / avoid 'Function sequence error' next time
      logger.info(getClass(), "statementForRowCount has been forced to be rebuilt");
    }
    return 0;
  }

  /**
   * Returns the number of items which fit the where condition.
   * @param whereCondition the condition to reduce the result set
   * @return the number of items which fit the where condition
   */
  public int getNbrOfFittingItems(WhereCondition whereCondition) {
    return getNbrOfFittingItems(null, whereCondition);
  }
  
  /**
   * Returns the number of items which fit the where condition.
   * @param whereCondition the condition to reduce the result set
   * @return the number of items which fit the where condition
   */
  public int getNbrOfFittingItems(String whereCondition) {
    return getNbrOfFittingItems(null, whereCondition);
  }
  
  /**
   * Returns the number of items which fit the where condition.
   * @param selectionFieldName the name of the fields to be used for the search.
   * @param whereCondition the condition to reduce the result set
   * @return the number of items which fit the where condition
   */
  public int getNbrOfFittingItems(String selectionFieldName, WhereCondition whereCondition) {
    return getNbrOfFittingItems(selectionFieldName, whereCondition.toString());
  }
  
  /**
   * Returns the number of items which fit the where condition.
   * @param selectionFieldName the name of the fields to be used for the search.
   * @param whereCondition the condition to reduce the result set
   * @return the number of items which fit the where condition
   */
  public int getNbrOfFittingItems(String selectionFieldName, String whereCondition) {
    int counter = 0;
    if (selectionFieldName == null && getIdentifyTemplate() != null && getIdentifyTemplate().getIdentifyColumnNames().length > 0) {
      selectionFieldName = getIdentifyTemplate().getIdentifyColumnNames()[0];
    }
    if (selectionFieldName != null) {
      select(selectionFieldName, whereCondition);
    } else{
      select("*", whereCondition);
    }
    while(nextRow()) {
      counter++;
    }
    closeQuery();
    return counter;
  }
  
  /**
   * Returns the maximum value of all rows for the specified field.
   * @param numericFieldName the name of the numeric field to be queried.
   * @return the maximum value of all rows for the specified field
   */
  public int getMaxIntValue(String intFieldName) {
    // to do: dialect specific optimizing without reading the entire table
    int max = 0;
    select("*");
    while(nextRow()) {
      int currentInt = getInt(intFieldName);
      if (currentInt > max) max = currentInt;
    }
    closeQuery();
    return max;
  }
  
  /**
   * Returns the identify value (primary key value) of the record to be found
   * by a specified selection.
   * @param selectionFieldName the name of the fields to be used for the search.
   * @param selectionValue the value of the field to be found.
   * @return the identify value (primary key value) of the first record, which
   * is meant to be the unique result in this context.
   */
  public Identifier getIdentifier(String selectionFieldName, String selectionValue) {
    String queryExpression = "select " + unifyColumnName(getKeyExtendedFieldSelection(selectionFieldName)) + " from " + getTableName() + " where " + selectionFieldName + " = \'" + selectionValue + "\'";
    if (!openQuery(queryExpression)) return null;
    if (!nextRow()) return null;
    closeQuery();
    return getIdentifier();
  }

  /**
   * Invokes a database query for following record requests via
   * <code>nextRow()</code>.
   * Always invoke <code>{@link #closeQuery}</code> to release table handle in
   * the end.
   * @param fieldSelection the fields to be selected
   * @return true if no exception occurred
   * @see #openQuery
   * @see #closeQuery
   */
  public boolean select(String fieldSelection) {
    String queryExpression = "select " + unifyColumnName(getKeyExtendedFieldSelection(fieldSelection)) + " from " + getTableName();
    return openQuery(queryExpression);
  }

  /**
   * Invokes a database query for following record requests via
   * <code>nextRow()</code> for streaming.
   * This means, no other query may be done with the same connection while the
   * query is used. 
   * Always invoke <code>{@link #closeQuery}</code> to release table handle in
   * the end.
   * @param fieldSelection the fields to be selected
   * @return true if no exception occurred
   * @see #openQuery
   * @see #closeQuery
   */
  public boolean selectForStreaming(String fieldSelection) {
    String queryExpression = "select " + unifyColumnName(getKeyExtendedFieldSelection(fieldSelection)) + " from " + getTableName();
    return openQuery(queryExpression, true);
  }

  /**
   * Invokes a database query for following record requests via
   * <code>nextRow()</code>.
   * Always invoke <code>{@link #closeQuery}</code> to release table handle in the end.
   * @param fieldSelection a sequence of field names to be accessed, separated
   * by comma
   * @param whereCondition the condition to reduce the result set
   * @return true if no exception occurred
   * @see #openQuery
   * @see #closeQuery
   */
  public boolean select(String fieldSelection, WhereCondition whereCondition) {
    return select(fieldSelection, whereCondition.toString());
  }

  /**
   * Invokes a database query for following record requests via
   * <code>nextRow()</code>.
   * Always invoke <code>{@link #closeQuery}</code> to release table handle in the end.
   * <pre>
   * public boolean isDeletionAllowed(Identifier identifier) {
   *   if (doMedien == null) doMedien = new DoMedien();
   *   doMedien.select("MedienNi, KatalogNi", "KatalogNi = " + identifier.getIntIdentifier());
   *   while (doMedien.nextRow()) {
   *     if (!doMedien.isDeletionAllowed(doMedien.getIdentifier())) {
   *       doMedien.closeQuery();
   *       return false;
   *     }
   *   }
   *   doMedien.closeQuery();
   *   return true;
   * }
   * </pre>
   * @param fieldSelection a sequence of field names to be accessed, separated
   * by comma
   * @param whereCondition the condition to reduce the result set
   * @return true if no exception occurred
   * @see #openQuery
   * @see #closeQuery
   */
  public boolean select(String fieldSelection, String whereCondition) {
    StringBuffer queryExpression = new StringBuffer("select " + unifyColumnName(getKeyExtendedFieldSelection(fieldSelection)) + " from " + getTableName());
    if (whereCondition != null && !whereCondition.trim().equals("")) queryExpression.append(" where " + whereCondition);
    return openQuery(queryExpression.toString());
  }

  /**
   * Invokes a database query for following record requests via
   * <code>nextRow()</code>.
   * Always invoke <code>{@link #closeQuery}</code> to release table handle in
   * the end.
   * @param fieldSelection a sequence of field names to be accessed, separated
   * by comma
   * @param whereCondition the condition to reduce the result set
   * @param orderByFields the fields to be used for the order by clause, separated
   * by comma
   * @return true if no exception occurred
   * @see #openQuery
   * @see #closeQuery
   */
  public boolean select(String fieldSelection, WhereCondition whereCondition, String orderByFields) {
    return select(fieldSelection, (whereCondition!= null?whereCondition.toString():null), orderByFields);
  }

  /**
   * Invokes a database query for following record requests via
   * <code>nextRow()</code>.
   * Always invoke <code>{@link #closeQuery}</code> to release table handle in
   * the end.
   * @param fieldSelection a sequence of field names to be accessed, separated
   * by comma
   * @param whereCondition the condition to reduce the result set
   * @param orderByFields the fields to be used for the order by clause, separated
   * by comma
   * @return true if no exception occurred
   * @see #openQuery
   * @see #closeQuery
   */
  public boolean select(String fieldSelection, String whereCondition, String orderByFields) {
    StringBuffer queryExpression = new StringBuffer("select " + unifyColumnName(getKeyExtendedFieldSelection(fieldSelection)) + " from " + getTableName());
    if (whereCondition != null && !whereCondition.toString().equals("")) queryExpression.append(" where " + whereCondition);
    if (orderByFields != null && orderByFields.trim().length() > 0) {
      queryExpression.append(" order by " + unifyColumnName(orderByFields));
    }
    return openQuery(queryExpression.toString());
  }

  /**
   * Invokes a database query for following record requests via
   * <code>nextRow()</code>.
   * Always invoke <code>{@link #closeQuery}</code> to release table handle in
   * the end.
   * @param fieldSelection a sequence of field names to be accessed, separated
   * by comma
   * @param whereCondition the condition to reduce the result set
   * @param orderByFields the fields to be used for the order by clause, separated
   * by comma
   * @param limit maximum of entries to be put into the result set  - supported by MySQL only
   * @return true if no exception occurred
   * @see #openQuery
   * @see #closeQuery
   */
  public boolean select(String fieldSelection, String whereCondition, String orderByFields, int limit) {
    return select(fieldSelection, whereCondition, orderByFields, limit, 0);
  }

  /**
   * Invokes a database query for following record requests via
   * <code>nextRow()</code>.
   * Always invoke <code>{@link #closeQuery}</code> to release table handle in
   * the end.
   * @param fieldSelection a sequence of field names to be accessed, separated
   * by comma
   * @param whereCondition the condition to reduce the result set
   * @param orderByFields the fields to be used for the order by clause, separated
   * by comma
   * @param limit maximum of entries to be put into the result set - supported by MySQL only
   * @param offset the number of records that don't have to be read anymore  - supported by MySQL only
   * @return true if no exception occurred
   * @see #openQuery
   * @see #closeQuery
   */
  public boolean select(String fieldSelection, String whereCondition, String orderByFields, int limit, int offset) {
    StringBuffer queryExpression = new StringBuffer("select " + unifyColumnName(getKeyExtendedFieldSelection(fieldSelection)) + " from " + getTableName());
    if (whereCondition != null && !whereCondition.toString().equals("")) queryExpression.append(" where " + whereCondition);
    if (orderByFields != null) queryExpression.append(" order by " + unifyColumnName(orderByFields));
    queryExpression.append(" " + sqlDialect.getLimitationFragment(limit, offset));
    return openQuery(queryExpression.toString());
  }

  /**
   * Returns the extended field selection including all primary key fields.
   * @param fieldSelection the field selection with or without primary key fields
   * @return the field selection with primary key fields
   */
  protected String getKeyExtendedFieldSelection(String fieldSelection) {
    if (fieldSelection.trim().equals("*")) return fieldSelection;
    if (identifyTemplate == null) return fieldSelection;
    StringBuffer extendedFieldSelection = new StringBuffer(fieldSelection);
    for (String keyColumn : identifyTemplate.getIdentifyColumnNames()) {
      if (fieldSelection.indexOf(keyColumn) < 0) {
        extendedFieldSelection.append(", " + keyColumn);
      }
    }
    return extendedFieldSelection.toString();
  }

  /**
   * Starts a select statement for searching a value in all available and
   * castable columns.
   * @param textToFind the text to be found globally
   * @return true if no exception occurred
   */
  public boolean searchGlobal(String textToFind) {
    return searchGlobal(textToFind, null);
  }

  /**
   * Starts a select statement for searching a value in all available and
   * castable columns.
   * @param textToFind the text to be found globally
   * @param additionalCondition additional where conditions to be combined with
   * the global search
   * @return true if no exception occurred
   */
  public boolean searchGlobal(String textToFind, String additionalCondition) {
    return select("*", getGlobalWhereCondition(textToFind, additionalCondition));
  }

  /**
   * Gets the global where condition for searching a value in all available and
   * castable columns.
   * @param textToFind the text to be found globally
   * @return the where condition for the global search
   */
  public String getGlobalWhereCondition(String textToFind) {
    return getGlobalWhereCondition(textToFind, null);
  }

  /**
   * Returns the global where condition for searching a value in all available and
   * castable columns.
   * @param textToFind the text to be found globally
   * @param additionalCondition additional where conditions to be combined with
   * the global search
   * @return the where condition for the global search
   */
  public String getGlobalWhereCondition(String textToFind, String additionalCondition) {
    int i;
    StringBuffer whereCondition = new StringBuffer();
    select("*", null, null, 1);// to get all fields of the table, but only 1 record if supported (e.g. MySQL)
    closeQuery();
    if (additionalCondition != null && !additionalCondition.equals("")) whereCondition.append("(");
    try {
      int intToFind = Integer.valueOf(textToFind).intValue();
      for (i = 0; i < columnCount; i++) {
        if (columnType[i] == 3
        |   columnType[i] == 4
        |   columnType[i] == 5
        |   columnType[i] == 6
        |   columnType[i] == 7
        |   columnType[i] == 8) {
          if (whereCondition != null && !whereCondition.toString().equals("") && !whereCondition.toString().equals("(")) whereCondition.append(" or ");
          whereCondition.append(columnNames[i]);
          whereCondition.append(" = " + intToFind);
        } 
      }
    } catch (Exception e) {}
    DateString dateString = new DateString(textToFind);
    if (dateString.isValid()) {
      for (i = 0; i < columnCount; i++) {
        if (columnType[i] == 91
        |   columnType[i] == 93) {
          int minYear = 1753; // SQL Server
          if (dateString.getYearAsInt() >= minYear) {
            if (whereCondition != null && !whereCondition.toString().equals("") && !whereCondition.toString().equals("(")) whereCondition.append(" or ");
            whereCondition.append(columnNames[i]);
            whereCondition.append(" = " + sqlDialect.getSqlCompareString(dateString));
          }
        }
      }
    }
    for (i = 0; i < columnCount; i++) {
      if (columnType[i] == -1
      |   columnType[i] == 1
      |   columnType[i] == 12
      |   columnType[i] == 2005 // SQL Server Memo
      ) {
        if (whereCondition != null && !whereCondition.toString().equals("") && !whereCondition.toString().equals("(")) whereCondition.append(" or ");
        whereCondition.append(columnNames[i]);
        whereCondition.append(" like \'%" + sqlSecure(textToFind) + "%\'");
      }
    }
    if (additionalCondition != null && !additionalCondition.equals("")) whereCondition.append(") and (" + additionalCondition + ")");
    return whereCondition.toString();
  }

  /**
   * Invokes a database query for following record requests via
   * <code>nextRow()</code>. If possible, it is recommended to use the
   * <code>select()</code> methods instead.
   * Always invoke <code>{@link #closeQuery}</code> to release table handle in
   * the end.
   * @param queryString query string to be executed
   * @return true if no exception occurred
   * @see #closeQuery
   */
  public boolean openQuery(String queryString) {
    return openQuery(queryString, false);
  }

  private boolean openQuery(String queryString, boolean streamingMode) {
    queryException = null;
    failedQueryExpression = null;
    try {
      metaMode = META_INDIVIDUAL;
      if (primaryStatement != null) { // forgotten closeQuery e.g.
        primaryStatement.close(); // Calling the method close on a Statement object that is already closed has no effect. 
      }
      if (streamingMode) { // forward and read only
        // for MySQL: download mysql-connector-java-3.0.10-stable.zip (GPL!) from http://www.mysql.com/downloads/api-jdbc-stable.html to get it working
        primaryStatement = connection.createStatement(ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY);
        if (databaseType == ConnectionHolder.MYSQL) primaryStatement.setFetchSize(Integer.MIN_VALUE);
      } else {
        primaryStatement = connection.createStatement();
      }
      rs = primaryStatement.executeQuery(queryString);
      loadMetaData();
      lastMetaMode = metaMode;
      hashtablesDirty = true; // maybe different (less) columns 
      return true;
    }
    catch (SQLException sqle) {
      queryException = sqle;
      failedQueryExpression = queryString;
      logger.info(getClass(), queryString);
      logger.error(getClass(), sqle);
      return false;
    }
  }

  /**
   * Loads the next row according to the previous select statement.
   * @return true if another record is found
   * @see #select
   */
  public boolean nextRow() {
    // no good idea to return if rs == null: 
    // you don't get any hint about programming failures / synch problems 
    // if (rs == null) return false; // missing select case
    try {
      if (!rs.next()) return false;
      currentColumn = 0;
    }
    catch (SQLException e2) {
      logger.error(e2);
      return false;
    }
    loadRow();
    return true;
  }

  /**
   * Closes the query as opened by select or openQuery statements. The result
   * set will be closed.
   * @see #select
   * @see #openQuery
   */
  public void closeQuery() {
    try {
      rs.close();
      primaryStatement.close();
    }
    catch (SQLException e2) {
      logger.error(e2);
    }
    catch (Exception e) {
      logger.error(e);
    }
    rs = null;
    primaryStatement = null;
  }

  /**
   * Closes result set if it is not null.
   */
  private void closeResultsetIfNotNull() {
    if (rs != null) {
      try {
        rs.close();
        if (primaryStatement != null) primaryStatement.close();
      }
      catch (Exception e) {
        logger.info(getClass(), "Couldn't close ResultSet");
        logger.error(getClass(), e);
      }
      rs = null;
      primaryStatement = null;
    }
  }

  /**
   * Returns the queryException.
   * @return SQLException
   */
  public SQLException getQueryException() {
    return queryException;
  }

  /**
   * Returns the failed query expression.
   * @return the failed query expression
   */
  public String getFailedQueryExpression() {
    return failedQueryExpression;
  }

/*******************************************************************************
Methods to identify a single row
*******************************************************************************/

  /**
   * Sets the identify value (primary key) of the row to select.
   * @param identifyValueInt the value of the primary key to be selected
   */
  public void setIdentityValue(int identifyValueInt) {
    setIdentifier(new Identifier(identifyValueInt));
  }

  /**
   * Sets the identify value (primary key) of the row to select.
   * @param identifyValueLong the value of the primary key to be selected
   */
  public void setIdentityValue(long identifyValueLong) {
    setIdentifier(new Identifier(identifyValueLong));
  }

  /**
   * Sets the identify value (primary key) of the row to select.
   * @param identifyString the value of the primary key to be selected
   */
  public void setIdentityValue(String identifyString) {
    setIdentifier(new Identifier(identifyString));
  }

  /**
   * Sets the identifier (primary key) of the row to select.
   * @param identifyValueLong the value of the primary key to be selected
   */
  public void setIdentifier(Identifier newIdentifier) {
    this.identifier = newIdentifier;
  }

/*******************************************************************************
Methods to prepare and execute insertion
*******************************************************************************/

  /**
   * Prepares an insert by initializing a new row plus allocating a new primary
   * key value.
   */
  public void newRowWithNextIdentifierAllocation() {
    newRow();
    allocateNewIdentifier();
  }

  /**
   * Prepares an insert by initializing a new row.
   */
  public void newRow() {
    String queryExpression = null;
    metaMode = META_ALL;
    identifier = null;
    mode = INSERTMODE;
    closeResultsetIfNotNull();
    try {
      if (lastMetaMode != META_ALL) {
        if (statementForLoadMetaData == null) {
          if (sqlDialect instanceof MysqlDialect) {
            queryExpression = "select * from " + getTableName() + " where 1 = 0"; // MySQL takes a lot of time if the result is big
          } else {
            queryExpression = "select * from " + getTableName(); // DB2/400 likes that
          }
          statementForLoadMetaData = connection.prepareStatement(queryExpression);
        }
        rs = statementForLoadMetaData.executeQuery();
        loadMetaData();
      }
      initRow();
      lastMetaMode = META_ALL;
    }
    catch (SQLException e2) {
      if (connection == null) logger.info(getClass(), "No connection to DB!");
      logger.info(getClass(), queryExpression);
      logger.error(getClass(), e2);
    }
    catch (Exception e) {
      logger.info(getClass(), queryExpression);
      logger.error(getClass(), e);
    }
    closeResultsetIfNotNull();
  }

  /**
   * Sets the ID manager.
   * @param newIdManager the new ID manager to use
   */
  public void setIdManager(IdManager newIdManager) {
    assignedIdManager = newIdManager;
  }

  /**
   * Allocates a new row identifier (primary key).
   * @return
   */
  public Identifier allocateNewIdentifier() {
    if (identifyTemplate.getIdentifyType() != IdentifyTemplate.IDENTIFIED_BY_INT) return null;
    if (assignedIdManager == null) assignedIdManager = new IdManager(connection);
    Identifier newIdentifier = assignedIdManager.getNewIdentifier(getEntityId());
    setIdInclOriginal(identifyTemplate.getIdentifyColumnNames()[0], newIdentifier);
    return newIdentifier;
  }
  
  /**
   * Returns the entity id. By default, this is equals the table name. Override it to use a different id.
   * @return the entity id
   */
  protected String getEntityId() {
    return getTableName();
  }

  /**
   * Sets the identifier of the current row to the specified value. This is done
   * for the original value, too. This makes sense for producing a copy of a
   * certain row.
   * @param columnName
   * @param newIdentifyValueInt
   */
  public void setIdInclOriginal(String columnName, Identifier newIdentifier) {
    identifier = newIdentifier;
    switch (identifyTemplate.getIdentifyType()) {
    case IdentifyTemplate.IDENTIFIED_BY_LONG:
      putIntoOriginal(columnName, new Long(identifier.getLongIdentifier()));
      putIntoWorkedOn(columnName, new Long(identifier.getLongIdentifier()));
      break;
    default:
      Object columnObject = getOriginalOf(unifyColumnName(columnName));
      if (columnObject == null) {
        logger.warn(unifyColumnName(columnName) + " not available in setIdInclOriginal");
      }
      if (columnObject instanceof Integer) {
        putIntoOriginal(columnName, new Integer(identifier.getIntIdentifier()));
        putIntoWorkedOn(columnName, new Integer(identifier.getIntIdentifier()));
      } else if (columnObject instanceof Double) { // Oracle default
        putIntoOriginal(columnName, new Double(identifier.getIntIdentifier()));
        putIntoWorkedOn(columnName, new Double(identifier.getIntIdentifier()));
      } else if (columnObject instanceof Float) { // Oracle option
        putIntoOriginal(columnName, new Float(identifier.getIntIdentifier()));
        putIntoWorkedOn(columnName, new Float(identifier.getIntIdentifier()));
      } else {
        logger.info(getClass(), "setIdInclOriginal " + unifyColumnName(columnName) + " of type " + columnObject.getClass().getName() + " not supported");
      }
    }
  }

  /**
   * Inserts the prepared row in the database.
   * @see #newRow
   */
  public void insert() {
    try {
      if (statementForInsertion == null) buildInsertStatement();
      sqlDialect.fillInsertStatementWithValues(statementForInsertion, original, workedOn, getTableName(), columnCount, columnNames, columnType, columnScale, columnNameOfRecordingDate, columnNameOfRecordingUser, staticRecordingUserName);
      statementForInsertion.executeUpdate();
      if (identifier == null) determineInsertIdentifier();
      if (!silentUpdate) {
        fireDataChanged(new DataChangedEvent(getTableName(), DataChangedEvent.INSERTION_MODE, sequenceType, dataChangeSender, identifier));
      }
      if (changeLog != null) changeLog.log(this);
      if (doChangeLog != null) doChangeLog.log(this);
    } catch (SQLException e) {
      logger.error(e);
      statementForInsertion = null; // AS400 relevant since approximately 2010 / avoid 'Function sequence error' next time
      logger.info(getClass(), "statementForInsertion has been forced to be rebuilt");
    }
  }
  
  private void buildInsertStatement() {
    String insertStatementPart1 = "insert into " + getTableName() + " (";
    String insertStatementPart2 = " values(";
    for (int i = 1; i <= columnCount; i++) {
      if (i > 1) insertStatementPart1 += ", ";
      if (i > 1) insertStatementPart2 += ", ";
      insertStatementPart1 += columnNames[i-1];
      insertStatementPart2 += "?";
    }
    insertStatementPart1 += ")";
    insertStatementPart2 += ")";
    try {
      statementForInsertion = connection.prepareStatement(insertStatementPart1 + " " + insertStatementPart2);
    } catch (SQLException e) {
      logger.info(getClass(), insertStatementPart1 + " " + insertStatementPart2);
      logger.error(getClass(), e);
    }
  }

  private void determineInsertIdentifier() {
    if (identifyTemplate == null) return; // e.g. work files without index
    String[] columnNames = identifyTemplate.getIdentifyColumnNames();
    Object[] items = new Object[columnNames.length];
    for (int i = 0; i < columnNames.length; i++) {
      items[i]  = getWorkedOnObject(columnNames[i]);
    }
    identifier = new Identifier(items);
  }

/*******************************************************************************
Methods to load and update data
*******************************************************************************/

  /**
   * Loads a row as specified by the primary key.
   * @param identifyInt the primary key value of the row to load
   * @return true if the wished row was found
   */
  public boolean load(int identifyInt) {
    return load(new Identifier(identifyInt));
  }

  /**
   * Loads a row as specified by the primary key.
   * @param identifyInt the primary key value of the row to load
   * @param columns the names of the columns to be part of result set, separated
   * @return true if the wished row was found
   */
  public boolean load(int identifyInt, String columns) {
    return load(new Identifier(identifyInt), columns);
  }

  /**
   * Loads a row as specified by the primary key.
   * @param identifyLong the primary key value of the row to load
   * @return true if the wished row was found
   */
  public boolean load(long identifyLong) {
    return load(new Identifier(identifyLong));
  }

  /**
   * Loads a row as specified by the primary key.
   * @param identifyString the primary key value of the row to load
   * @return true if the wished row was found
   */
  public boolean load(String identifyString) {
    return load(new Identifier(identifyString));
  }

  /**
   * Loads a row as specified by the primary key.
   * @param identifier the primary key value of the row to load
   * @return true if the wished row was found
   */
  public boolean load(Identifier identifier) {
    setIdentifier(identifier);
    return load();
  }

  /**
   * Loads a row as specified by the primary key .
   * @param newIdentifyValueInt the primary key value of the row to load
   * @param columns the names of the columns to be part of result set, separated
   * by comma
   * @return true if the wished row was found
   */
  public boolean load(Identifier identifier, String columns) {
    setIdentifier(identifier);
    return loadColumns(columns);
  }

  /**
   * Loads a row as specified by the primary key previously specified by
   * <code>{@link #setIdentityValue}</code>
   * @return
   * @see #setIdentityValue
   */
  public boolean load() {
    return loadColumns("*");
  }

  /**
   * Loads a row as specified by the primary key previously specified by
   * <code>{@link #setIdentityValue}</code>
   * @param columns the names of the columns to be part of result set, separated
   * by comma
   * @return
   * @see #setIdentityValue
   */
  public synchronized boolean loadColumns(String columns) {
    if (sqlDialect instanceof OracleDialect && htColumnType.size() == 0) {
      Identifier remindIdentifier = getIdentifier();
      newRow(); // only to get meta data before first load because of char special set in prepared statement
      setIdentifier(remindIdentifier);
    }
    boolean rowFound = false;
    mode = UPDATEMODE;
    if (columns.equals("*")) metaMode = META_ALL;
    else metaMode = META_INDIVIDUAL;
    String columnsToLoad = getKeyExtendedFieldSelection(columns);
    String queryString = null;
    try {
      if (statementForPirmaryKeyAccess == null || lastColumnsUsedByPreparedStatement == null || !columnsToLoad.equals(lastColumnsUsedByPreparedStatement)) {
        queryString = "select " + columnsToLoad + " from " + getTableName() + identifyTemplate.getIdentifyConditionForPreparedStatements();
        statementForPirmaryKeyAccess = connection.prepareStatement(queryString);
        lastColumnsUsedByPreparedStatement = columnsToLoad;
      }
      identifyTemplate.setIdentifier(statementForPirmaryKeyAccess, identifier, getIdentFieldLengthsIfNeeded());
      rs = statementForPirmaryKeyAccess.executeQuery();
      rowFound = rs.next();
      if (lastMetaMode != META_ALL || metaMode != META_ALL) {
        loadMetaData(); // yes, we want to load meta data even if rs.next() returned false!
        lastMetaMode = metaMode;
      }
      if (rowFound) loadRow();
    }
    catch (SQLException e2) {
      if (connection == null) logger.info(getClass(), "No connection to DB!");
      logger.info(getClass(), queryString);
      logger.error(getClass(), e2);
      statementForPirmaryKeyAccess = null; // AS400 relevant since approximately 2010 / avoid 'Function sequence error' next time
      logger.info(getClass(), "statementForPirmaryKeyAccess has been forced to be rebuilt");
    }
    catch (Exception e) {
      logger.info(getClass(), queryString);
      logger.error(getClass(), e);
      statementForPirmaryKeyAccess = null; // AS400 relevant since approximately 2010 / avoid 'Function sequence error' next time 
      logger.info(getClass(), "statementForPirmaryKeyAccess has been forced to be rebuilt");
    }
    closeResultsetIfNotNull();
    return rowFound;
  }

  /**
   * Determines the length of the identifier fields if needed.
   * @return the length of the identifier fields or null if not needed.
   */
  private int[] getIdentFieldLengthsIfNeeded() {
    int[] lengths = null;
    boolean needed = false;
    if (sqlDialect instanceof OracleDialect) {
      String[] idNames = identifyTemplate.getIdentifyColumnNames();
      for (int i = 0; i < idNames.length; i++) {
        if (getColumnType(idNames[i]) == 1) needed = true;
      }
    }    
    if (needed) {
      String[] idNames = identifyTemplate.getIdentifyColumnNames();
      lengths = new int[idNames.length];
      for (int i = 0; i < idNames.length; i++) {
        lengths[i] = getColumnLength(idNames[i]);
      }
    }
    return lengths;
  }

  /**
   * Saves the current row. Insert or update is distinguished automatically.
   * @param dataChangeSender the class who causes the data change.
   * @param sequenceType the type of the save sequence which may be
   * <code>{@link DataChangedEvent#SINGLE_TYPE}</code>,
   * <code>{@link DataChangedEvent#NOT_THE_LAST_OF_A_SEQUENCE_TYPE}</code> or
   * <code>{@link DataChangedEvent#SUMMARY_TYPE}</code>
   * @see DataChangedEvent
   */
  public void save(Class<?> dataChangeSender, int sequenceType) {
    this.dataChangeSender = dataChangeSender;
    this.sequenceType = sequenceType;
    save();
    this.dataChangeSender = null;
  }

  /**
   * Saves the current row and indicates if further save calls will follow.
   * Insert or update is distinguished automatically.
   * @param furtherSaveIsPending true to indicate that further save calls will follow
   */
  public void save(boolean furtherSaveIsPending) {
    if (furtherSaveIsPending) {
      sequenceType = DataChangedEvent.NOT_THE_LAST_OF_A_SEQUENCE_TYPE;
    }
    save();
    sequenceType = DataChangedEvent.SINGLE_TYPE;
  }

  /**
   * Saves the current row. Insert or update is distinguished automatically.
   * @return true if any database modification occurred
   */
  public boolean save() {
    switch (mode) {
    case INSERTMODE:
      insert();
      return true;
    case UPDATEMODE:
      return update();
    default:
      logger.info(getClass(), "wrong mode in DataObject");
      return false;
    }
  }

  /**
   * Quick update or insert of a single column in a single row.
   * @param newIdentifyValueString the primary key
   * @param columnName the name of the column
   * @param columnValue the value of the column
   */
  public void updateOrInsert(String identifyString, String columnName, String columnValue) {
    updateOrInsert(new Identifier(identifyString), columnName, columnValue);
  }

  /**
   * Quick update or insert of a single column in a single row.
   * @param newIdentifyValueString the primary key
   * @param columnName the name of the column
   * @param columnValue the value of the column
   */
  public synchronized void updateOrInsert(Identifier identifier, String columnName, String columnValue) {
    if (load(identifier)) {
      setText(columnName, columnValue);
      update();
    }
    else {
      initRow();
      setText(getUniqueKeyName(), identifier.getStringIdentifier());
      setText(columnName, columnValue);
      insert();
    }
  }

  /**
   * Updates the current row if necessary and returns true if update occurred.
   */
  public boolean update() {
    lastException = null;
    if (GlobalStd.readOnly) return false;
    boolean change = false;
    String currentStatement = null;
    String updateStatement = sqlDialect.getUpdatePhrase(original, workedOn, getTableName(), columnCount, columnNames, columnType, columnScale);
    // if any changes occurred:
    try {
      if (updateStatement != null) {
        updateStatement += getWhereClause();
        currentStatement = updateStatement;
        Logger.getInstance().debug(getClass(), updateStatement);
        Statement tempStatement = connection.createStatement();
        tempStatement.executeUpdate(updateStatement.toString());
        tempStatement.close();
        change = true;
      }
      if (databaseType == ConnectionHolder.MS_SQL_SERVER) {
        // there might be various date formats, therefore we use prepared statements
        currentStatement = null;
        if (performSingleUpdate()) change = true;
      }
      if (change && !silentUpdate) {
        fireDataChanged(new DataChangedEvent(getTableName(), DataChangedEvent.UPDATE_MODE, sequenceType, dataChangeSender, identifier));
      }
      if (changeLog != null) changeLog.log(this);
      if (doChangeLog != null) doChangeLog.log(this);
   }
    catch (SQLException e) {
      lastException = e;
      if (currentStatement != null) logger.info(getClass(), currentStatement);
      logger.error(e);
    }
    return change;
  }
  
  private boolean performSingleUpdate() throws SQLException {
    boolean change = false;
    for (int i = 1; i <= columnCount; i++) {
      switch (columnType[i-1]) {
      case 91: // date
        Date originalDate = (Date)original.get(columnNames[i-1].toUpperCase());
        Date workedOnDate = (Date)workedOn.get(columnNames[i-1].toUpperCase());
        boolean isToUpdate = false;
        if (workedOnDate == null & originalDate != null) isToUpdate = true;
        if (workedOnDate != null & originalDate == null) isToUpdate = true;
        if (workedOnDate != null & originalDate != null) {
           isToUpdate = !workedOnDate.equals(originalDate);
        }
        if (isToUpdate) {
          if (columnPrepStat[i-1] == null) buildUpdateStatement(i-1);
          columnPrepStat[i-1].setDate(1, workedOnDate);
          identifyTemplate.setIdentifier(columnPrepStat[i-1], identifier, getIdentFieldLengthsIfNeeded(), 1);
          columnPrepStat[i-1].executeUpdate();
          change = true;
        }
        break;
      case 93: // timestamp
        Timestamp originalTimestamp = (java.sql.Timestamp)original.get(columnNames[i-1].toUpperCase());
        Timestamp workedOnTimestamp = (java.sql.Timestamp)workedOn.get(columnNames[i-1].toUpperCase());
        isToUpdate = false;
        if (workedOnTimestamp == null & originalTimestamp != null) isToUpdate = true;
        if (workedOnTimestamp != null & originalTimestamp == null) isToUpdate = true;
        if (workedOnTimestamp != null & originalTimestamp != null) {
           isToUpdate = !workedOnTimestamp.equals(originalTimestamp);
        }
        if (isToUpdate) {
          if (columnPrepStat[i-1] == null) buildUpdateStatement(i-1);
          columnPrepStat[i-1].setTimestamp(1, workedOnTimestamp);
          identifyTemplate.setIdentifier(columnPrepStat[i-1], identifier, getIdentFieldLengthsIfNeeded(), 1);
          columnPrepStat[i-1].executeUpdate();
          change = true;
        }
        break;
      }
    }
    return change;
  }

  private void buildUpdateStatement(int columnIndex) {
    String updateStatement = "update " + getTableName() + " set ";
    updateStatement += columnNames[columnIndex];
    updateStatement += " = ?";
    String updStat = updateStatement+ identifyTemplate.getIdentifyConditionForPreparedStatements();
    try {
      columnPrepStat[columnIndex] = connection.prepareStatement(updStat);
    } catch (SQLException e) {
      logger.info(getClass(), updStat);
      logger.error(getClass(), e);
    }
  }

  /**
   * Makes all changes made since the previous commit/rollback permanent and
   * releases any database locks currently held by the Connection. 
   * Doesn't do anything, if auto-commit is used.
   * @exception SQLException if a database access error occurs
   */
  public void commitIfNotAutoCommit() {
    try {
      if (!connection.getAutoCommit()) connection.commit();
    }
    catch (SQLException e2) {
      logger.error(e2);
    }
  }

  /**
   * Drops all changes made since the previous commit/rollback and releases any 
   * database locks currently held by this Connection.
   * @exception SQLException if a database access error occurs
   */
  public void rollbackIfNotAutoCommit() {
    try {
      if (!connection.getAutoCommit()) connection.rollback();
    }
    catch (SQLException e2) {
      logger.error(e2);
    }
  }

/*******************************************************************************
shared methods
*******************************************************************************/

  private void loadMetaData() {
    for (int i = 0; i < columnNames.length; i++) {
      columnNames[i] = null; // clear for contains check
    }
    try {
      metaData = rs.getMetaData();
      int singleHtColumnType;
      columnCount = 0;
      int columnCountByMetaData = metaData.getColumnCount();
      for (int i = 1; i <= columnCountByMetaData; i++) {
        String columnName = metaData.getColumnName(i);
        if (contains(columnNames, columnName)) {
          // duplicate names may be caused by select * with joins over multiple tables - we prevent "no data found" this way 
        } else {
          columnCount++;
          columnNames[columnCount-1] = columnName;
//          logger.info(getClass(), "columnName: " + columnNames[columnCount-1]);
//          logger.info(getClass(), "ColumnLabel: " + metaData.getColumnLabel(i));  // on AS/400 == columnName :-((
//          logger.info(getClass(), "Precision: " + metaData.getPrecision(i));
//          logger.info(getClass(), "ColumnDisplaySize: " + metaData.getColumnDisplaySize(i));
//          logger.info(getClass(), "getSchemaName: " + metaData.getSchemaName(i)); // DB2/400 & MySQL = nothing
          singleHtColumnType = metaData.getColumnType(i);
          if (readBigDecimalAsInt & singleHtColumnType == 8) singleHtColumnType = 4;
          columnType[columnCount-1] = singleHtColumnType;
          if (singleHtColumnType == 8
          || (databaseType == ConnectionHolder.DB2_400 && (singleHtColumnType == 2 || singleHtColumnType == 3))) {
            columnScale[columnCount-1] = metaData.getScale(i);
          }
          htColumnType.put(unifyColumnName(columnNames[columnCount-1]), new Integer(singleHtColumnType));
          if (sqlDialect instanceof MysqlDialect && (singleHtColumnType == -1 | singleHtColumnType == 1 | singleHtColumnType == 12)) {
            maxFieldSize.put(unifyColumnName(columnNames[columnCount-1]), new Integer(getColumnDisplaySize(i)));
          } else {
            maxFieldSize.put(unifyColumnName(columnNames[columnCount-1]), new Integer(metaData.getPrecision(i)));
          }
        }
      }
    }
    catch (SQLException e2) {
      logger.error(e2);
    }
    if (sqlDialect instanceof SQLiteDialect) {
      fillTypeAndLengthByStaticDefintion();
    }
  }
  
  private void fillTypeAndLengthByStaticDefintion() {
    AbstractAttribute[] attributes = getAttributes();
    for (int i = 0; i < attributes.length; i++) {
      boolean found = false;
      int j = 0;
      while (j < columnCount) {
        if (columnNames[j].equalsIgnoreCase(attributes[i].getFieldName())) {
          found = true;
          try {
            maxFieldSize.put(unifyColumnName(columnNames[j]), new Integer(getColumnDisplaySize(j+1)));
          } catch (SQLException e) {
            Logger.getInstance().error(getClass(), e);
          }
          columnScale[j] = attributes[i].getScale();
          break;
        }
        j++;
      }
      if (!found) {
        columnCount++;
        j = columnCount - 1;
        columnNames[j] = attributes[i].getFieldName();
        columnType[j] = attributes[i].getType();
        maxFieldSize.put(unifyColumnName(columnNames[j]), new Integer(attributes[i].getLength()));
        columnScale[j] = attributes[i].getScale();
      }
      switch (attributes[i].getType()) {
      case AbstractAttribute.LOGICAL:
        columnType[j] = -7;
        break;
      case AbstractAttribute.MEMO:
        columnType[j] = 12;
        break;
      case AbstractAttribute.DECIMAL:
        columnType[j] = 2;
        break;
      case AbstractAttribute.NUMBER:
        if (attributes[i].getScale() > 0 || attributes[i].getLength() > 10) {
          columnType[j] = 2;
        } else {
          columnType[j] = 4;
        }
        break;
      case AbstractAttribute.INTEGER:
        columnType[j] = 4;
        break;
      case AbstractAttribute.BIGINT:
        columnType[j] = 4;
        break;
      case AbstractAttribute.FLOAT:
        columnType[j] = 7;
        break;
      case AbstractAttribute.CHAR:
        columnType[j] = 12;
        break;
      case AbstractAttribute.VARCHAR:
        if (attributes[i].getLength() > 254) {
          columnType[j] = 12;
        } else {
          columnType[j] = 12;
        }
        break;
      case AbstractAttribute.DATE:
        columnType[j] = 91;
        break;
      case AbstractAttribute.TIMESTAMP:
        columnType[j] = 93;
        break;
      case AbstractAttribute.TIME:
        columnType[j] = 4;
        break;
      }
      htColumnType.put(unifyColumnName(columnNames[j]), new Integer(columnType[j]));
    }
  }
  
  private boolean contains(String[] array, String item) {
    for (int i = 0; i < array.length; i++) {
      if (array[i] != null && array[i].equals(item)) return true;
    }
    return false;
  }

  private int getColumnDisplaySize(int columnIndex) throws SQLException {
    // logger.info(getClass(), "getting static size of column " + columnIndex);
    String columnNameToCheck = columnNames[columnIndex - 1];
    int displaySize;
    if (getAttributes() != null) {
      for (int i = 0; i < getAttributes().length; i++) {
        if (getAttributes()[i].getFieldName().equalsIgnoreCase(columnNameToCheck)) {
          displaySize = getAttributes()[i].getLength();
          if (displaySize != 0) return displaySize;
        }
      }
    }
    displaySize = metaData.getColumnDisplaySize(columnIndex);
    if (displaySize != 0) {
      // logger.info(getClass(), "ColumnDisplaySize of " + columnNameToCheck + " is " + displaySize);
      return displaySize;
    }
    logger.info(getClass(), "The database didn't support getColumnDisplaySize for " + columnNameToCheck);
    logger.info(getClass(), "Using fixed column display size.");
    return 40; // default size
  }

  private void initRow() {
    sqlDialect.initRow(rs, original, workedOn, getTableName(), columnCount, columnNames, columnType, columnScale);
  }

  private void loadRow() {
    if (hashtablesDirty) {
      original.clear(); // maybe we have different (less) columns, don't provide old values!
      workedOn.clear();
      hashtablesDirty = false;
    }
    sqlDialect.loadRow(rs, original, workedOn, getTableName(), columnCount, columnNames, columnType, columnScale);
    updateIdentifier();
    mode = UPDATEMODE;
    fireDataSelected();
  }

  protected void updateIdentifier() {
    if (identifyTemplate == null) return;
    Logger.getInstance().debug(getClass(), "Updating identifier of table " + getTableName() + " with length " + identifyTemplate.getIdentifyColumnNames().length);
    String[] columnNames = identifyTemplate.getIdentifyColumnNames();
    Object[] items = new Object[columnNames.length];
    try {
      for (int i = 0; i < columnNames.length; i++) {
        Object value = getObject(columnNames[i]);
        Logger.getInstance().debug(getClass(), "Field " + columnNames[i] + " has got value " + value);
        items[i] = value;
      }
      identifier = new Identifier(items);
    }
    catch (Exception e) {} // method contains doesn't load identifiers
  }

  /**
   * Unifies the table name to avoid errors of any kind.
   * @param tableName the name of the table to unify
   * @return the unified table name
   */
  public String unifyTableName(String tableName) {
    return sqlDialect.unifyTableName(tableName);
  }

  /**
   * Unifies the column name to avoid errors of any kind.
   * @param columnName the name of the column to unify
   * @return the unified column name
   */
  public String unifyColumnName(String columnName) {
    return sqlDialect.unifyColumnName(columnName);
  }

  /**
   * Returns the where condition to identify the current row without the word
   * "where".
   * Needed to remind the current rows unique key if no primary key is available.
   * @return the where condition to identify the current row
   */
  public String getIdentifyWhereCondition() {
    StringBuffer whereCondition = new StringBuffer();
    String columnName;
    int identifyIndex = 0;
    int j;
    for (j = 0; j < getIndices()[identifyIndex].getIndexItems().length; j++) {
      if (!whereCondition.toString().equals("")) whereCondition.append(" and ");
      columnName = getIndices()[identifyIndex].getIndexItems()[j].getFieldName();
      // logger.info(getClass(), columnName);
      // logger.info(getClass(), getColumnType(columnName));
      switch (getColumnType(columnName)) {
      // case Attribute.INTEGER:
      case -1:
        whereCondition.append(columnName + " = \'" + getText(columnName) + "\'");
        break;
      case 1:
        whereCondition.append(columnName + " = \'" + getText(columnName) + "\'");
        break;
      case 3:
        whereCondition.append(columnName + " = " + getInt(columnName));
        break;
      case 4:
        whereCondition.append(columnName + " = " + getInt(columnName));
        break;
      // case Attribute.CHAR:
      case 12:
        whereCondition.append(columnName + " = \'" + getText(columnName) + "\'");
        break;
      default:
        return null;
      }
    }
    return whereCondition.toString();
  }

  /**
   * Returns the where clause to identify the current row including the word
   * "where".
   * Needed for update and deletion of the current row.
   * @return the where clause to identify the current row
   */
  private String getWhereClause() {
    StringBuffer whereClause = new StringBuffer(" where ");
    whereClause.append(identifier.getIdentifyCondition(identifyTemplate));
    return whereClause.toString();
  }

  /**
   * Replaces ' by '' to avoid SQL error while inserting or updating.
   */
  public String sqlSecure(String stringField) {
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

/*******************************************************************************
Methods for data exchange between objects
*******************************************************************************/

  /**
   * Sets the column pointer to 0.
   */
  public void resetColumnPointer() {
    currentColumn = 0;
  }

  /**
   * Increases the column pointer.
   * @return false if no further columns are available
   */
  public boolean nextColumn() {
    if (currentColumn < columnCount) {
      currentColumn++;
      return true;
    }
    return false;
  }

  /**
   * Returns the name of the current column.
   * @return the name of the current column
   */
  public String getColumnName() {
    return (columnNames[currentColumn-1]);
  }

  /**
   * Returns the label of the current column.
   * @return the label of the current column
   */
  public String getColumnLabel() {
    return (columnNames[currentColumn-1]); // so far we don't have further information about column labels
  }

  /**
   * Returns the type of the current column.
   * @return the type of the current column
   */
  public int getColumnType() {
    return getColumnType(columnNames[currentColumn-1]);
  }

  /**
   * Returns the type of the specified column.
   * @param columnName the name of the column
   * @return the type of the column
   */
  public int getColumnType(String columnName) {
    Integer ct;
    try {
      ct = (Integer)htColumnType.get(unifyColumnName(columnName));
      if (ct != null) { // NullPointerException in next line will not be caught by instructions below!?!
        return ct.intValue();
      } else {
        logger.info(getClass(), "Column " + columnName + " not in " + getTableName());
        return 0;
      }
    }
    catch (Exception e) {
      logger.info(getClass(), "Column " + columnName + " not in " + getTableName());
      logger.error(getClass(), e);
    }
    return 0;
  }

  /**
   * Returns the type of the specified column.
   * @param columnName the name of the column
   * @return the type of the  column
   */
  public int getColumnLength(String columnName) {
    Integer cl = (Integer)maxFieldSize.get(unifyColumnName(columnName));
    if (cl == null) {
      if (getColumnType(unifyColumnName(columnName)) == -1) return 63000;
      else return 20;
    }
    return cl.intValue();
  }

  /**
   * Returns the scale of the current column.
   * @return the scale of the current column
   */
  public int getColumnScale() {
    return columnScale[currentColumn-1];
  }

  /**
   * Returns the value of a column as an object.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public Object getObject(String columnName) {
    Object requestedObject = getOriginalOf(unifyColumnName(columnName));
    if (requestedObject != null) return requestedObject;
    switch (getColumnType(columnName)) {
    case -7:
      return new Boolean(false);
    case -1:
      return "";
    case 1:
      return "";
    case 2:
      return new Double(0); 
    case 3: // AS/400 7P0
      return new Integer(0);
    case 4:
      return new Integer(0);
    case 5:
      return new Long(0);
    case 6:
      return new Float(0);
    case 7:
      return new Float(0);
    case 12:
      return "";
    case 91: // date
      return null;
    case 92: // time
      return null;
    case 93: // timestamp
      return null;
    }
    return null;
  }

  /**
   * Sets the value of a column.
   * @param columnName the name of the column
   * @param newObject the new value of the column to set
   */
  public void setObject(String columnName, Object newObject) {
    putIntoWorkedOn(columnName, newObject);
  }

  /**
   * Returns the worked on value of a column as an object.
   * @param columnName the name of the column
   * @return the value of the column
   */
  private Object getWorkedOnObject(String columnName) {
    Object requestedObject = getWorkedOnOf(unifyColumnName(columnName));
    if (requestedObject != null) return requestedObject;
    switch (getColumnType(columnName)) {
    case -7:
      return new Boolean(false);
    case -1:
      return "";
    case 1:
      return "";
    /* case 2:
      return new BigDecimal(0); */
    case 3: // AS/400 7P0
      return new Integer(0);
    case 4:
      return new Integer(0);
    case 5:
      return new Long(0);
    case 7:
      return new Float(0);
    case 12:
      return "";
    case 91: // date
      return new Integer(0);
    case 92:
      return new Time(0);
    case 93:
      return new Integer(0);
    }
    return null;
  }

  /**
   * Gets the value of the specified column as text.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public String getText(String columnName) {
    Object columnObject = getOriginalOf(unifyColumnName(columnName));
    if (columnObject == null) {
      logger.warn("Column " + unifyColumnName(columnName) +  " not available in " + getClass().getName());
      return null; // yes, I decided not to hide runtime errors by using return ""!
    }
    if (columnObject instanceof String) {
      return (String)columnObject;
    }
    logger.warn("Column " + unifyColumnName(columnName) +  " is not String");
    return columnObject.toString();
  }

  /**
   * Gets the value of the specified column as text. There will be no warning
   * shown if the object type is not text castable.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public String getTextNoMatterWhatTypeOfColumn(String columnName) {
    Object columnObject = getOriginalOf(unifyColumnName(columnName));
    if (columnObject == null) {
      int columnType = getColumnType(unifyColumnName(columnName));
      if (columnType != 91 && columnType != 93) { // date may be null
        logger.warn("Column " + unifyColumnName(columnName) +  " not available in " + getClass().getName());
      }
      return null;
    }
    return columnObject.toString();
  }

  /**
   * Gets the value of the specified column as text in a worked on state -
   * it might already been modified and differ from the original value.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public String getWorkedOnText(String columnName) {
    Object columnObject = getWorkedOnOf(unifyColumnName(columnName));
    if (columnObject == null) {
      logger.warn("Column " + unifyColumnName(columnName) +  " not available in " + getClass().getName());
      return null;
    }
    if (columnObject instanceof String) {
      return (String)columnObject;
    }
    logger.warn("Column " + unifyColumnName(columnName) +  " is not String");
    return columnObject.toString();
  }

  /**
   * Sets the text of the specified column.
   * @param columnName the name of the column to be modified
   * @param text the new value of the column
   */
  public void setText(String columnName, String text) {
    int columnLength = 0;
    Integer cl = (Integer)maxFieldSize.get(unifyColumnName(columnName));
    if (cl != null) columnLength = cl.intValue();
    if (columnLength > 0 && text.length() > columnLength) {
      text = text.substring(0, columnLength); // avoid java.sql.DataTruncation, caused by e.g. SQL Server
    }
    putIntoWorkedOn(unifyColumnName(columnName), text);
  }

  /**
   * Gets the value of the specified column as float.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public float getFloat(String columnName) {
    Float cv = (Float)getOriginalOf(unifyColumnName(columnName));
    if (cv == null) logger.warn("Column " + unifyColumnName(columnName) +  " not available");
    return cv.floatValue();
  }

  /**
   * Sets the value of the specified column.
   * @param columnName the name of the column to be modified
   * @param floatValue the new value of the column
   */
  public void setFloat(String columnName, float floatValue) {
    putIntoWorkedOn(unifyColumnName(columnName), new Float(floatValue));
  }

  /**
   * Gets the value of the specified column as double.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public double getDouble(String columnName) {
    Object columnObject = getOriginalOf(unifyColumnName(columnName));
    if (columnObject == null) {
      logger.warn("Column " + unifyColumnName(columnName) +  " not available");
      return 0;
    }
    if (columnObject instanceof Integer) {
      return ((Integer)columnObject).doubleValue();
    } else if (columnObject instanceof Float) { // e.g. Oracle
      return ((Float)columnObject).doubleValue();
    } else {
      Double cv = null;
      try {
        cv = (Double)columnObject;
      } catch (java.lang.ClassCastException e) {
        logger.info(getClass(), unifyColumnName(columnName) + " not double, it's " + columnObject.getClass());
        logger.error(getClass(), e);
      }
      return cv.doubleValue();
    }
  }

  /**
   * Gets the value of the specified column as double in a worked on state -
   * it might already been modified and differ from the original value.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public double getWorkedOnDouble(String columnName) {
    Object columnObject = getWorkedOnOf(unifyColumnName(columnName));
    if (columnObject == null) {
      logger.warn("Column " + unifyColumnName(columnName) +  " not available in " + getClass().getName());
      return 0;
    }
    if (columnObject instanceof Double) { // e.g. Oracle NUMBER
      return ((Double)columnObject).doubleValue();
    } else if (columnObject instanceof Float) { // e.g. Oracle
      return ((Float)columnObject).doubleValue();
    } else if (columnObject instanceof Integer) {
      return ((Integer)columnObject).doubleValue();
    }
    return 0;
  }

  /**
   * Sets the value of the specified column.
   * @param columnName the name of the column to be modified
   * @param doubleValue the new value of the column
   */
  public void setDouble(String columnName, double doubleValue) {
    setDouble(columnName, new Double(doubleValue));
  }

  /**
   * Sets the value of the specified column.
   * @param columnName the name of the column to be modified
   * @param doubleValue the new value of the column
   */
  public void setDouble(String columnName, Double doubleValue) {
    Object columnObject = getOriginalOf(unifyColumnName(columnName));
    if (columnObject == null) {
      logger.warn(unifyColumnName(columnName) + " not available in setDouble");
    }
    if (columnObject instanceof Integer) {
      putIntoWorkedOn(unifyColumnName(columnName), new Integer(doubleValue.intValue()));
    } else if (columnObject instanceof Float) {
      putIntoWorkedOn(unifyColumnName(columnName), new Float(doubleValue.floatValue()));
    } else {
      putIntoWorkedOn(unifyColumnName(columnName), doubleValue);
    }
  }

  /**
   * Gets the value of the specified column as int.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public int getInt(String columnName) {
    Object columnObject = getOriginalOf(unifyColumnName(columnName));
    if (columnObject == null) {
      logger.warn("Column " + unifyColumnName(columnName) +  " not available in " + getClass().getName());
      return 0;
    }
    if (columnObject instanceof Double) { // e.g. Oracle NUMBER
      Double dv = null;
      try {
        dv = (Double)columnObject;
        return dv.intValue();
      } catch (java.lang.ClassCastException e) {
        logger.error(e);
      }
    } else if (columnObject instanceof Float) { // e.g. Oracle
      Float fv = null;
      try {
        fv = (Float)columnObject;
        return fv.intValue();
      } catch (java.lang.ClassCastException e) {
        logger.error(e);
      }
    } else if (columnObject instanceof Integer) {
      Integer iv = null;
      try {
        iv = (Integer)columnObject;
        return iv.intValue();
      } catch (java.lang.ClassCastException e) {
        logger.error(e);
      }
    }
    return 0;
  }

  private DecimalFormat integerLikeDecimalFormat = new DecimalFormat();
  /**
   * Gets the value of the specified Integer containing column as String with
   * zero suppression.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public String getIntAsStringZeroSuppressed(String columnName) {
    Object originalObject = getOriginalOf(unifyColumnName(columnName));
    if (originalObject == null) logger.warn("Column " + unifyColumnName(columnName) +  " not available");
    if (originalObject instanceof Double) {
      integerLikeDecimalFormat.setMaximumFractionDigits(0);
      integerLikeDecimalFormat.setGroupingUsed(false);
      return integerLikeDecimalFormat.format((Double)originalObject);
    } else {
      int value = ((Integer)originalObject).intValue();
      if (value == 0) return "";
      else return String.valueOf(value);
    }
  }

  /**
   * Gets the value of the specified column as int in a worked on state -
   * it might already been modified and differ from the original value.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public int getWorkedOnInt(String columnName) {
    Object columnObject = getWorkedOnOf(unifyColumnName(columnName));
    if (columnObject == null) {
      logger.warn("Column " + unifyColumnName(columnName) +  " not available in " + getClass().getName());
      return 0;
    }
    if (columnObject instanceof Double) { // e.g. Oracle NUMBER
      return ((Double)columnObject).intValue();
    } else if (columnObject instanceof Float) { // e.g. Oracle
      return ((Float)columnObject).intValue();
    } else if (columnObject instanceof Integer) {
      return ((Integer)columnObject).intValue();
    }
    return 0;
  }

  /**
   * Sets the value of the specified column.
   * @param columnName the name of the column to be modified
   * @param intValue the new value of the column
   */
  public void setInt(String columnName, int intValue) {
    Object columnObject = getOriginalOf(unifyColumnName(columnName));
    if (columnObject == null) {
      logger.warn(unifyColumnName(columnName) + " not available in setInt");
    } else {
      if (columnObject instanceof Integer) {
        putIntoWorkedOn(unifyColumnName(columnName), new Integer(intValue));
      } else if (columnObject instanceof Double) {
        putIntoWorkedOn(unifyColumnName(columnName), new Double(intValue));
      } else if (columnObject instanceof Float) {
        putIntoWorkedOn(unifyColumnName(columnName), new Float(intValue));
      } else {
        logger.info(getClass(), "setInt " + unifyColumnName(columnName) + " of type " + columnObject.getClass().getName() + " not supported");
      }
    }
  }

  /**
   * Gets the value of the specified column as long.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public long getLong(String columnName) {
    Long cv = (Long)getOriginalOf(unifyColumnName(columnName));
    return cv.longValue();
  }

  /**
   * Sets the value of the specified column.
   * @param columnName the name of the column to be modified
   * @param longValue the new value of the column
   */
  public void setLong(String columnName, long longValue) {
    putIntoWorkedOn(unifyColumnName(columnName), new Long(longValue));
  }

  public String getDateFormattedWithShortYear(String columnName) {
    java.sql.Date date = getDate(columnName);
    if (date != null) return (new DateString(date)).getEditableDateStringShort();
    else return "";
  }
  
  /**
   * Gets the value of the specified column as date.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public java.sql.Date getDate(String columnName) {
    Object dateObject = getOriginalOf(unifyColumnName(columnName));
    if (dateObject == null) return null;
    switch (getColumnType(unifyColumnName(columnName))) {
    case 91:
      return (java.sql.Date)dateObject;
    case 93:
      if (dateObject instanceof java.sql.Date) { // elder Oracle e.g.
        return (java.sql.Date)dateObject;
      }
      java.sql.Timestamp timestamp = (java.sql.Timestamp)dateObject;
      return new java.sql.Date(timestamp.getTime());
    case 3:
      Integer cv = (Integer)dateObject;
      return getDate(cv);
    case 4:
      cv = (Integer)dateObject;
      return getDate(cv);
    }
    return null;
  }

  protected java.sql.Date getDate(Integer intDate) {
    String dateString = null;
    String year;
    String month;
    String day;
    if (intDate.intValue() == 0) return null;
    try {
      dateString = intDate.toString();
      year = dateString.substring(0, 4);
      month = dateString.substring(4, 6);
      day = dateString.substring(6, 8);
      return java.sql.Date.valueOf(year + "-" + month + "-" + day);
    }
    catch (Exception e) {
      try {
        if (dateString.length() == 5) dateString = "0" + dateString;
        if (dateString.length() == 4) dateString = "00" + dateString;
        if (dateString.length() == 3) dateString = "000" + dateString;
        year = dateString.substring(0, 2);
        month = dateString.substring(2, 4);
        day = dateString.substring(4, 6);
        return java.sql.Date.valueOf(getCentury(year) + year + "-" + month + "-" + day);
      }
      catch (Exception e2) {
        return null;
      }
    }
  }

  private String getCentury(String year) {
    if (year.compareTo("20") > 0) return "19";
    else return "20";
  }

  /**
   * Gets the value of the specified column as date in a worked on state -
   * it might already been modified and differ from the original value.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public java.sql.Date getWorkedOnDate(String columnName) {
    switch (getColumnType(unifyColumnName(columnName))) {
    case 91:
      return (java.sql.Date)getWorkedOnOf(unifyColumnName(columnName));
    case 93:
      if (getWorkedOnOf(unifyColumnName(columnName)) != null) {
        return new java.sql.Date(((java.sql.Timestamp)getWorkedOnOf(unifyColumnName(columnName))).getTime());
      } else  return null;
    case 3:
      Integer cv = (Integer)getWorkedOnOf(unifyColumnName(columnName));
      if (cv.intValue() == 0) return null;
      try {
        String dateString = cv.toString();
        String year = dateString.substring(0, 4);
        String month = dateString.substring(4, 6);
        String day = dateString.substring(6, 8);
        return java.sql.Date.valueOf(year + "-" + month + "-" + day);
      }
      catch (Exception e) {
        return null;
      }
    case 4:
      cv = (Integer)getWorkedOnOf(unifyColumnName(columnName));
      if (cv.intValue() == 0) return null;
      try {
        String dateString = cv.toString();
        String year = dateString.substring(0, 4);
        String month = dateString.substring(4, 6);
        String day = dateString.substring(6, 8);
        return java.sql.Date.valueOf(year + "-" + month + "-" + day);
      }
      catch (Exception e) {
        return null;
      }
    }
    return null;
  }

  /**
   * Sets the value of the specified column.
   * @param columnName the name of the column to be modified
   * @param dateValue the new value of the column
   */
  public void setDate(String columnName, java.sql.Date dateValue) {
    int columnType = getColumnType(unifyColumnName(columnName));
    switch (columnType) {
    case 91: // mysql / dbase
      if (dateValue == null) workedOn.remove(unifyColumnName(columnName));
      else {
        putIntoWorkedOn(unifyColumnName(columnName), dateValue);
      }
      break;
    case 93: // MS Access
      if (dateValue == null) workedOn.remove(unifyColumnName(columnName));
      else {
        putIntoWorkedOn(unifyColumnName(columnName), new java.sql.Timestamp(dateValue.getTime()));
      }
      break;
    case 3:
      putDateIntoIntegerWorkedOn(columnName, dateValue);
      break;
    case 4:
      putDateIntoIntegerWorkedOn(columnName, dateValue);
      break;
    default:
      Logger.getInstance().info(getClass(), "unsupported columnType: " + columnType + " at column " + columnName);
    }
  }

  private void putDateIntoIntegerWorkedOn(String columnName, java.sql.Date dateValue) {
    if (dateValue == null) putIntoWorkedOn(unifyColumnName(columnName), new Integer(0));
    else {
      String dateString = dateValue.toString();
      String year = dateString.substring(0, 4);
      String month = dateString.substring(5, 7);
      String day = dateString.substring(8, 10);
      putIntoWorkedOn(unifyColumnName(columnName), Integer.valueOf(year + month + day));
    }
  }
  
  /**
   * Returns the value of the specified column as time.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public java.sql.Time getTime(String columnName) {
    Integer value;
    Double doubleObject;
    switch (getColumnType(unifyColumnName(columnName))) {
    case 2: // Oracle NUMBER 6/0
      doubleObject = (Double)getOriginalOf(unifyColumnName(columnName));
      return new MustTime(doubleObject.intValue()); 
    case 4: // MS Access workaround via integer
      value = (Integer)getOriginalOf(unifyColumnName(columnName));
      return new MustTime(value.intValue()); 
    default:
      return (java.sql.Time)getOriginalOf(unifyColumnName(columnName));
    }
  }

  /**
   * Gets the value of the specified column as time in a worked on state -
   * it might already been modified and differ from the original value.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public java.sql.Time getWorkedOnTime(String columnName) {
    Integer value;
    Double doubleObject;
    switch (getColumnType(unifyColumnName(columnName))) {
    case 2: // Oracle NUMBER 6/0
      doubleObject = (Double)getWorkedOnOf(unifyColumnName(columnName));
      return new MustTime(doubleObject.intValue()); 
    case 4: // MS Access workaround via integer
      value = (Integer)getWorkedOnOf(unifyColumnName(columnName));
      return new MustTime(value.intValue()); 
    default:
      return (java.sql.Time)getWorkedOnOf(unifyColumnName(columnName));
    }
  }

  /**
   * Sets the value of the specified column.
   * @param columnName the name of the column to be modified
   * @param dateValue the new value of the column
   */
  public void setTime(String columnName, java.sql.Time timeValue) {
    switch (getColumnType(unifyColumnName(columnName))) {
    case 2: // Oracle NUMBER 6/0
      if (timeValue == null) putIntoWorkedOn(unifyColumnName(columnName), new Double(0));
      else {
        putIntoWorkedOn(unifyColumnName(columnName), new Double((double)de.must.util.MustTime.getIntegerEquivalent(timeValue)));
      }
      break;
    case 4: // MS Access workaround via integer
      if (timeValue == null) putIntoWorkedOn(unifyColumnName(columnName), new Integer(0));
      else {
        putIntoWorkedOn(unifyColumnName(columnName), new Integer(de.must.util.MustTime.getIntegerEquivalent(timeValue)));
      }
      break;
    default:
      if (timeValue == null) workedOn.remove(unifyColumnName(columnName));
      else {
        putIntoWorkedOn(unifyColumnName(columnName), timeValue);
      }
    }
  }

  /**
   * Returns the value of the specified column as Timestamp.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public java.sql.Timestamp getTimestamp(String columnName) {
    return (java.sql.Timestamp)getOriginalOf(unifyColumnName(columnName));
  }

  /**
   * Gets the value of the specified column as Timestamp in a worked on state -
   * it might already been modified and differ from the original value.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public java.sql.Timestamp getWorkedOnTimestamp(String columnName) {
    return (java.sql.Timestamp)getWorkedOnOf(unifyColumnName(columnName));
  }

  /**
   * Sets the value of the specified column.
   * @param columnName the name of the column to be modified
   * @param dateValue the new value of the column
   */
  public void setTimestamp(String columnName, java.sql.Timestamp timestampValue) {
    if (timestampValue == null) workedOn.remove(unifyColumnName(columnName));
    else putIntoWorkedOn(unifyColumnName(columnName), timestampValue);
  }

  /**
   * Gets the value of the specified column as boolean.
   * @param columnName the name of the column
   * @return the value of the column
   */
  public boolean getBoolean(String columnName) {
    return sqlDialect.getBoolean(columnName, original);
  }

  /**
   * Gets the value of the specified column as boolean in a worked on state -
   * it might already been modified and differ from the original value.
   * @param columnName the name of the column
   * @return the value of the column
   */
  protected boolean getWorkedOnBoolean(String columnName) {
    return sqlDialect.getBoolean(columnName, workedOn);
    /* Boolean cb = (Boolean)getWorkedOnOf(unifyColumnName(columnName));
    if (cb == null) logger.warn("Column " + unifyColumnName(columnName) +  " not available");
    return cb.booleanValue();  */
  }

   /**
   * Sets the value of the specified column.
   * @param columnName the name of the column to be modified
   * @param boolValue the new value of the column
   */
 public void setBoolean(String columnName, boolean boolValue) {
    sqlDialect.setBoolean(columnName, boolValue, workedOn);
    // putIntoWorkedOn(unifyColumnName(columnName), new Boolean(boolValue));
  }

/*******************************************************************************
Methods for deleting
*******************************************************************************/

  /**
   * Checks of deletion of a row is allowed. Meant to be overridden by subclasses
   * to keep data consistent.
   * @param identifyValueString the primary key of the row to be checked
   * @return false if deletion should be rejected
   */
  public boolean isDeletionAllowed(Identifier identifier) {
    return true; // override this method if necessary!
  }

  /**
   * Deletes a row by primary key.
   * @param newIdentifyValueInt the primary key of the row to be deleted
   * @return true if no error occurred
   */
  public boolean delete(Identifier identifier) {
    setIdentifier(identifier);
    return delete();
  }

  /**
   * Deletes the currently accessed row, e.g. a row found by nextRow().
   * @return true if no error occurred
   */
  public boolean delete() {
    if (GlobalStd.readOnly) return false;
    String deletePhrase = null;
    try {
      if (statementForPrimaryKeyDelete == null) {
        deletePhrase = "delete from " + getTableName() + identifyTemplate.getIdentifyConditionForPreparedStatements();
        statementForPrimaryKeyDelete = connection.prepareStatement(deletePhrase);
      }
      identifyTemplate.setIdentifier(statementForPrimaryKeyDelete, identifier, getIdentFieldLengthsIfNeeded());
      statementForPrimaryKeyDelete.execute();
      if (!silentUpdate) {
        fireDataChanged(new DataChangedEvent(getTableName(), DataChangedEvent.DELETION_MODE, sequenceType, dataChangeSender, identifier));
      }
      if (changeLog != null) changeLog.logDeletion(this);
      if (doChangeLog != null) doChangeLog.logDeletion(this);
    }
    catch (SQLException e) {
      logger.info(getClass(), deletePhrase);
      logger.error(getClass(), e);
      return false;
    }
    return true;
  }

  /**
   * Deletes rows by a free formulated condition. Handle with care! It should
   * stay protected and be secured by responsible subclass methods.
   * @param whereCondition the condition to select the rows to delete
   * @return true if no error occurred
   */
  protected boolean deleteFreeConditioned(String whereCondition) {
    StringBuffer deleteStatement = new StringBuffer("delete from " + getTableName());
    if (!whereCondition.equals("ALL")) deleteStatement.append(" where " + whereCondition);
    try {
      Statement tempStatement = connection.createStatement();
      tempStatement.execute(deleteStatement.toString());
      tempStatement.close();
      if (changeLog != null) changeLog.logDeletion(getTableName(), deleteStatement.toString());
      if (doChangeLog != null) doChangeLog.logFreeSQLStatement(this, deleteStatement.toString());
    }
    catch (SQLException e) {
      logger.info(getClass(), deleteStatement);
      logger.error(getClass(), e);
      return false;
    }
    return true;
  }

/*******************************************************************************
Information about the object
*******************************************************************************/

  /**
   * Returns the maximum allowed rows to insert.
   * @param licenceType the license type
   * @return the number of rows that may be inserted
   */
  public int getmaxRow(int licenceType) {
    switch (licenceType) {
    case Licence.DEMO_LICENCE:
      return maxRowDemo;
    case Licence.PROFESSIONAL_DEMO_LICENCE:
      return maxRowDemo;
    // case Licence.LIGHT_LICENCE:
    //   return maxRowLight;
    case Licence.STANDARD_LICENCE:
      return 999999999;
    default:
      return 999999999;
    }
  }

  /**
   * Returns the name of the primary key.
   * @return the name of the primary key
   */
  public String getUniqueKeyName() {
    return getIdentifyTemplate().getIdentifyColumnNames()[0];
  }

  /**
   * Returns the number of available columns.
   * @return the number of available columns
   */
  public int getColumnCount() {
    return columnCount;
  }

  /**
   * Returns the column name of the indicated array position.
   * @param columnPointer the array index
   * @return the name of the column
   */
  public String getColumnName(int columnPointer) {
    return (columnNames[columnPointer]);
  }

  /**
   * Returns the column type of the indicated array position.
   * @param columnPointer the array index
   * @return the type of the column
   */
  public int getColumnType(int columnPointer) {
    return (columnType[columnPointer]);
  }

  /**
   * Returns the identify template.
   * @return the identify template
   */
  public IdentifyTemplate getIdentifyTemplate() {
    return identifyTemplate;
  }

  /**
   * Returns the int primary key of the current row.
   * @return the int primary key of the current row
   */
  public int getIdentifyValueInt() {
    if (identifier == null) return 0;
    return getIdentifier().getIntIdentifier();
  }

  /**
   * Returns the identifier (primary key) of the current row.
   * @return the identifier (primary key) of the current row
   */
  public Identifier getIdentifier() {
    return identifier;
  }

  /**
   * Returns the current column pointer.
   * @return the current column pointer
   */
  public int getMode() {
    return mode;
  }

  /**
   * Checks if the specified column is in the currently watched result set.
   * @param columnName the name of the column to be checked
   * @return true if the specified column is in the currently watched result set
   */
  public boolean isColumnContained(String columnName) {
    for (int i = 1; i <= columnCount; i++) {
      if (columnNames[i-1].equals(columnName)) return true;
    }
    return false;
  }

  /**
   * Checks if there have been any modifications made on the current row.
   * @return true if there have been any modifications made on the current row
   */
  public boolean isModified() {
    for (int i = 1; i <= columnCount; i++) {
      if (isModifiedColumn(columnNames[i-1])) return true;       
    }
    return false;
  }

  /**
   * Checks if there have been any modifications made on the current row.
   * @return true if there have been any modifications made on the current row
   */
  public boolean isModifiedColumn(String columnName) {
    Object original = getOriginalOf(columnName);
    if (original == null) { // date e.g.
      return getWorkedOnOf(columnName) != null;
    } else {
      return !original.equals(getWorkedOnOf(columnName));
    }
  }
  
  private void putIntoOriginal(String columnName, Object object) {
    original.put(columnName.toUpperCase(), object);
  }

  private void putIntoWorkedOn(String columnName, Object object) {
    workedOn.put(columnName.toUpperCase(), object);
  }

  protected Object getOriginalOf(String columnName) {
    return original.get(columnName.toUpperCase());
  }

  protected Object getWorkedOnOf(String columnName) {
    return workedOn.get(columnName.toUpperCase());
  }

/*******************************************************************************
Events
*******************************************************************************/

  /**
   * Data change listener - static because there are usually multiple 
   * instances of a data object to the same table in use. Thus, listeners are
   * informed about changes, no matter which instance was used for changes.
   * To prevent garbage accumulation this vector is build with weak references
   * only.
   */
  private static Vector<WeakReference<DataChangeListener>> dataChangeListeners;

  /**
   * Adds the specified ThreadDoneListener to receive data changed events from
   * any entity.
   * @see DataChangedEvent
   */
  public synchronized void addDataChangeListener(DataChangeListener listener) {
    if (dataChangeListeners == null) dataChangeListeners = new Vector<WeakReference<DataChangeListener>>();
    else cleanDataChangeListeners();
    dataChangeListeners.add(new WeakReference<DataChangeListener>(listener));
    Logger.getInstance().debug(getClass(), "addDataChangeListener " + listener.getClass().getName() + " - # now " + dataChangeListeners.size());
  }
  
  private void cleanDataChangeListeners() {
    String remaining = "";
    if (dataChangeListeners != null) {
      Iterator<WeakReference<DataChangeListener>> listenerIterator = dataChangeListeners.iterator();
      while (listenerIterator.hasNext()) {
        WeakReference<DataChangeListener> ref = listenerIterator.next();
        Object refObject = ref.get();
        if (refObject == null) {
          listenerIterator.remove();
        } else {
          if (remaining.length() > 0) remaining += ", ";
          remaining += refObject.getClass().getName();
        }
      }  
    }
    Logger.getInstance().debug(getClass(), "remaining DataChangeListeners after cleaning: " + remaining + " (= " + dataChangeListeners.size() + ")");
  }

  /**
   * Removes the specified ThreadDoneListener to receive data changed events
   * from any entity.
   * @see DataChangedEvent
   */
  public synchronized void removeDataChangeListener(DataChangeListener listener) {
    if (dataChangeListeners != null) {
      Iterator<WeakReference<DataChangeListener>> listenerIterator = dataChangeListeners.iterator();
      while (listenerIterator.hasNext()) {
        WeakReference<DataChangeListener> ref = listenerIterator.next();
        Object refObject = ref.get();
        if (refObject == null || refObject.equals(listener)) {
          listenerIterator.remove();
        }
      }  
      Logger.getInstance().debug(getClass(), "number of DataChangeListeners after removal: " + dataChangeListeners.size());
    }
  }

  /**
   * Notifies all listeners that have registered interest for notification on
   * this event type. The specified data changed event is passed.
   * @see #addDataChangeListener
   * @see DataChangedEvent
   */
  public synchronized void fireDataChanged(DataChangedEvent e) {
    logDebug("firing DataChangedEvents");
    if (dataChangeListeners != null) {
      Vector<WeakReference<DataChangeListener>> listenersCopy = new Vector<WeakReference<DataChangeListener>>(dataChangeListeners); // to avoid java.util.ConcurrentModificationException
      ListIterator<WeakReference<DataChangeListener>> listenerList = listenersCopy.listIterator();
      while (listenerList.hasNext()) {
        WeakReference<DataChangeListener> ref = listenerList.next();
        Object refObject = ref.get();
        if (refObject != null) {
          logDebug("DataChangedEvent --> " + refObject.getClass().getName());
          ((DataChangeListener)refObject).DataChangePerformed(e);
        // } else {
          // listenerList.remove(); to avoid java.util.ConcurrentModificationException - cleaning is done each addDataChangeListener
        }
      }  
    }
  }

//------------------------------------------------------------------------------

  private Vector<DataSelectionListener> dataSelectionListeners;

  /**
   * Adds the specified DataSelectionListener to receive data selection events
   * from this entity.
   * @see DataSelectionEvent
   */
  public synchronized void addDataSelectionListener(DataSelectionListener l) {
    Vector<DataSelectionListener> v = dataSelectionListeners == null ? new Vector<DataSelectionListener>(2) : new Vector<DataSelectionListener>(dataSelectionListeners);
    if (!v.contains(l)) {
      v.addElement(l);
      dataSelectionListeners = v;
    }
  }

  /**
   * Removes the specified DataSelectionListener to receive data selection events
   * from this entity.
   * @see DataSelectionEvent
   */
  public synchronized void removeDataSelectionListener(DataSelectionListener l) {
    if (dataSelectionListeners != null && dataSelectionListeners.contains(l)) {
      Vector<DataSelectionListener> v = new Vector<DataSelectionListener>(dataSelectionListeners);
      v.removeElement(l);
      dataSelectionListeners = v;
    }
  }

  private void fireDataSelected() {
    // logger.info(getClass().getName());
    fireDataSelected(new DataSelectionEvent(this));
  }

  private void fireDataSelected(DataSelectionEvent e) {
    if (dataSelectionListeners != null) {
      // logger.info(getClass(), "Firing from " + getClass().getName());
      Vector<DataSelectionListener> listeners = dataSelectionListeners;
      int count = listeners.size();
      for (int i = 0; i < count; i++) {
        // logger.info(getClass(), "Firing to " + listeners.elementAt(i).getClass().getName());
        ((DataSelectionListener) listeners.elementAt(i)).DataSelectionPerformed(e);
      }
    }
  }
  
  /**
   * Registers a DataObject as Co-DataObject
   * @param dataObject the Co-DataObject
   * @return the passed DataObject for easy declaration
   */
  protected DataObject register(DataObject dataObject) {
    if (coDataObjects == null) {
      coDataObjects = new Vector<WeakReference<DataObject>>();
    }
    coDataObjects.add(new WeakReference<DataObject>(dataObject));
    return dataObject;
  }

  /**
   * Logs a message as a debug information.
   * @param text the message to log
   */
  protected void logDebug(String text) {
    Logger.getInstance().debug(getClass(), text);
  }

  /**
   * Logs a message as information.
   * @param text the message to log
   */
  protected void logInfo(String text) {
    logger.info(getClass(), text);
  }

  /**
   * Logs a message as an error.
   * @param throwable the exception to log
   */
  protected void logError(Throwable throwable) {
    logger.error(throwable);
  }

  /**
   * Logs a message as an error.
   * @param text the message to log
   */
  protected void logError(String text) {
    logger.error(text);
  }

  /**
   * Logs a message as an error.
   * @param text the message to log
   * @param throwable the exception to log
   */
  protected void logError(String text, Throwable throwable) {
    logger.error(text, throwable);
  }
  
  /**
   * Return the last exception occurring in update(). 
   * @return the last exception occurring in update() 
   */
  public Exception getLastException() {
    return lastException;
  }

  /**
   * Frees external resources. May be called manually without waiting for the
   * garbage collector.
   */
  public void free() {
    Logger.getInstance().debug(getClass(), "free called in " +  getClass().getName());
    try {
      // if (rs != null && !connection.isClosed() && !rs.isClosed()) { -> 01/22/13 java.lang.UnsupportedOperationException: Operation not yet supported
      if (rs != null && !connection.isClosed()) { // so what if SQL exception already closed occurs...
        rs.close();
      }
    }
    catch (Exception e) {
      logger.info(getClass(), "Couldn't close ResultSet");
      logger.error(getClass(), e);
    }
    closeIfExists(primaryStatement);
    closeIfExists(statementForRowCount);
    closeIfExists(statementForPirmaryKeyAccess);
    closeIfExists(statementForInsertion);
    closeIfExists(statementForLoadMetaData);
    closeIfExists(statementForPrimaryKeyDelete);
    // logger.info(getClass(), "free called in " +  getClass().getName());
    if (coDataObjects != null) {
      Iterator<WeakReference<DataObject>> iterator = coDataObjects.iterator();
      while (iterator.hasNext()) {
        WeakReference<DataObject> ref = iterator.next();
        DataObject dataObject = ref.get();
        iterator.remove();
        if (dataObject != null) dataObject.free();
      }
      coDataObjects = null;
    }
  }
  
  private void closeIfExists(Statement statement) {
    if (statement != null) try {
      statement.close();
    } catch (SQLException e) {
      if (e.getMessage().indexOf("Socket closed") > -1) {
        // this may happen on context of finalizing
      } else {
        logger.error(e);
      }
    }
  }

  /**
   * Cleans up the connection to the table, and ensures that the close method
   * of the result set is called when there are no more references to this object.
   */
  protected void finalize() throws Throwable {
    free();
    Logger.getInstance().debug(getClass(), "finalize called in " +  getClass().getName());
    super.finalize();
  }

}
