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

import java.sql.*;

import de.must.io.Logger;

/**
 * Utility for modifying database tables. Part of the concept of database
 * independence as described in DataObject. To stay compatible with low budget
 * databases like MS Access it provides an alternative to alter table functions
 * by rescue of data and reload into the newly created structure.
 * @author Christoph Mueller
 * @see DataObject
 */
public class DbModifier {

  public static final int MODIFY_CREATE = 0;
  public static final int MODIFY_UPDATE = 1;
  public static final int MODIFY_DELETE = 2;

  private boolean dropBeforeCreation = false;

  public void setDropBeforeCreation (boolean newDropBeforeCreation) {
    dropBeforeCreation = newDropBeforeCreation;
  }

  /**
   * Drop table.
   * @param dbConnection the database connection to use
   * @param tableName the table name
   * @param indices the indices of the table
   * @return true if no error occurred
   */
  public static boolean dropTable(Connection dbConnection, String tableName, Index[] indices) {
    Statement st;
    try {
      st = dbConnection.createStatement();
      dropTable(st, tableName, indices);
      st.close();
    }
    catch (SQLException e) {
      Logger.getInstance().info(DbModifier.class, e);
      return false;
    }
    return true;
  }

  private static boolean dropTable(Statement st, String tableName, Index[] indices) {
    return dropTable(st, tableName, indices, true);
  }

  private static boolean dropTable(Statement st, String tableName, Index[] indices, boolean expectedToExist) {
    int databaseType = 0;
    try {
      databaseType = ConnectionHolder.getDatabaseType(st.getConnection());
    } catch (SQLException e) {
      Logger.getInstance().error(DbModifier.class, e);    }
    int indexStart = 0;
    int countIndices;
    countIndices = indices.length - 1;
    switch (databaseType) {
    case ConnectionHolder.ORACLE:
      indexStart = 1; // (already done with primary key)
      break;
    case ConnectionHolder.MYSQL:
      indexStart = 1; // (already done with primary key)
      break;
    default:
      indexStart = 0;
      break;
    }
    for (int i = indexStart; i < countIndices; i++) {
      String statementString = "drop index " + tableName + String.valueOf(i+1);
      switch (databaseType) {
      case ConnectionHolder.MYSQL:
        statementString += " on " + tableName;
        break;
      case ConnectionHolder.MS_SQL_SERVER:
        statementString = "drop index " + tableName + "." + tableName + String.valueOf(i+1);
        break;
      default:
        break;
      }
      try {
        st.execute(statementString);
      }
      catch (SQLException e) {
        if (expectedToExist) {
          Logger.getInstance().info(DbModifier.class, statementString);
          Logger.getInstance().error(DbModifier.class, e);
        }
      }
    }
    return dropTable(st, tableName, expectedToExist);
  }

  private static boolean dropTable(Statement st, String tableName) {
    return dropTable(st, tableName, true);
  }

  private static boolean dropTable(Statement st, String tableName, boolean expectedToExist) {
    String statementString = "drop table " + tableName;
    try {
      st.execute(statementString);
    }
    catch (SQLException e) {
      if (expectedToExist) {
        Logger.getInstance().info(DbModifier.class, statementString);
        Logger.getInstance().error(DbModifier.class, e);
      }
      return false;
    }
    return true;
  }

  public boolean createTable(Connection dbConnection, EntityInfo entityInfo) {
    return createTable(dbConnection, entityInfo.getTableName(), entityInfo.getAttributes(), entityInfo.getIndices());
  }

  /**
   *
   * @param dbConnection the database connection to use
   * @param tableName the table name
   * @param attributes the attributes of the table
   * @param indices the indices of the table
   * @return true if no error occurred
   */
  public boolean createTable(Connection dbConnection, String tableName, AbstractAttribute[] attributes, Index[] indices) {
    String createStatement = getCreateStatement(dbConnection, tableName, attributes, indices);
    int i, j;
    int countIndices;
    countIndices = indices.length - 1;
    String createIndexStatement = null;
    if (dropBeforeCreation) {
      dropTable(dbConnection, tableName, indices);
    }
    try {
      Statement st = dbConnection.createStatement();
      st.execute(createStatement);
      int indexStart;
      switch (ConnectionHolder.getDatabaseType(dbConnection)) {
      case ConnectionHolder.ORACLE:
        indexStart = 1; // (already done with primary key)
        break;
      case ConnectionHolder.MYSQL:
        indexStart = 1; // (already done with primary key)
        break;
      default:
        indexStart = 0;
        break;
      }
      for (i = indexStart; i <= countIndices; i++) {
        if (indices[i].getOccurrence()==Index.UNIQUE) {
          createIndexStatement = "create unique index ";
        }
        else {
          createIndexStatement = "create index ";
        }
        createIndexStatement += tableName + String.valueOf(i+1) + " on " + tableName + " (";
        int countIndexItems = indices[i].getIndexItems().length;
        for (j = 0; j < countIndexItems; j++) {
          createIndexStatement += indices[i].getIndexItems()[j].getFieldName();
          if (j < countIndexItems -1) createIndexStatement += ", ";
        }
        createIndexStatement += ")";
        st.execute(createIndexStatement);
        // Logger.getInstance().info(getClass(), createIndexStatement + " is done!");
      }
    }
    catch (SQLException e) {
      Logger.getInstance().info(getClass(), createStatement);
      Logger.getInstance().info(getClass(), createIndexStatement);
      Logger.getInstance().error(getClass(), e);
      return false;
    }
    return true;
  }

  /**
   * Updates a tables structure without loosing its data content.
   * @param dbConnection the database connection to use
   * @param tableName the table name
   * @param attributes the attributes of the table
   * @param indices the indices of the table
   * @return true if no error occurred
   */
  public boolean updateTable(ConnectionSpecification connSpec, EntityInfo entityInfo) {
    return updateTable(connSpec, entityInfo.getTableName(), entityInfo.getAttributes(), entityInfo.getIndices());
  }

  public boolean updateTable(ConnectionSpecification connSpec, String tableName, AbstractAttribute[] attributes, Index[] indices) {
    Connection dbConnection;
    Statement st;
    try {
      dbConnection = connSpec.getConnection();
      st = dbConnection.createStatement();
    }
    catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
      return false;
    }
    String attributeString = "";
    DirectDataObject doToUpdate = new DirectDataObject(dbConnection, tableName);
    doToUpdate.newRow(); // to load meta data
    doToUpdate.resetColumnPointer();
    while (doToUpdate.nextColumn()) {
      if (isContained(doToUpdate.getColumnName(), attributes)) {
        if (!attributeString.equals("")) attributeString += ", ";
        attributeString += doToUpdate.getColumnName();
      }
    }
    // Logger.getInstance().info(getClass(), "attributeString: " + attributeString);
    doToUpdate = null;

    String workTableName = tableName + "_WK";
    boolean indiceDelete = true;
    try {
      indiceDelete = dbConnection.getMetaData().getDatabaseProductName().indexOf("ACCESS") == -1;
    } catch (SQLException e1) {
      Logger.getInstance().error(getClass(), e1);
    }
    if (indiceDelete) {
      dropTable(st, workTableName, indices, false);
    } else {
      dropTable(st, workTableName, false);
    }
    String createStatement = getCreateStatement(dbConnection, workTableName, attributes, indices);
    try {
      st.execute(createStatement);
    }
    catch (SQLException e) {
      Logger.getInstance().info(getClass(), createStatement);
      Logger.getInstance().error(getClass(), e);
      return false;
    }
    int dbType = ConnectionHolder.getDatabaseType(dbConnection);
    boolean separateInserting = 
        ConnectionHolder.MS_SQL_SERVER == dbType // avoid problems on some SQL Servers (DataTruncation)
     // not necessary since ("enum(' ', 'N','Y') in MysqlDialect: || ConnectionHolder.MYSQL == dbType // 2012 MySQL also breaks due to "Data truncated for column '...'"
    ;
    if (separateInserting) {
      Logger.getInstance().debug(getClass(), "Using separate inserting instead of 'insert into ... select from ...' on " + tableName);
      copy(dbConnection, tableName, workTableName);
    } else {
      String selectedIntoStatement1 = "insert into " + workTableName + " (" + attributeString + ") select " + attributeString + " from " + tableName;
      try {
        st.execute(selectedIntoStatement1);
      }
      catch (SQLException e) {
        Logger.getInstance().info(getClass(), selectedIntoStatement1);
        Logger.getInstance().error(getClass(), e);
        // no! although it's a warning, the statement is not executed! if (!(e instanceof SQLWarning)) return false;
        return false;
      }
    }
    try {
      st.close();
      dbConnection.close(); // since Java 1.3, ODBC says "in use" if connection is reused.
      dbConnection = connSpec.getConnection();
      st = dbConnection.createStatement();
    }
    catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
      return false;
    }

    if (indiceDelete) {
      dropTable(st, tableName, indices);
    } else {
      dropTable(st, tableName);
    }
    if (!createTable(dbConnection, tableName, attributes, indices)) return false;
    if (separateInserting) {
      copy(dbConnection, workTableName, tableName);
    } else {
      String selectedIntoStatement2 = "insert into " + tableName + " (" + attributeString + ") select " + attributeString + " from " + workTableName;
      try {
        st.execute(selectedIntoStatement2);
      }
      catch (SQLException e) {
        Logger.getInstance().info(getClass(), selectedIntoStatement2);
        Logger.getInstance().error(getClass(), e);
        // no! although it's a warning, the statement is not executed! if (!(e instanceof SQLWarning)) return false;
        return false;
      }
    }
    dropTable(st, workTableName); // no indices on work table in any case
    try {
      st.close();
    }
    catch (SQLException e) {
      Logger.getInstance().error(getClass(), e);
      return false;
    }
    return true;
  }
  
  private void copy(Connection dbConnection, String tableNameFrom , String tableNameTo) {
    DirectDataObject inp = new DirectDataObject(dbConnection, tableNameFrom);
    DirectDataObject out = new DirectDataObject(dbConnection, tableNameTo);
    out.setSilentUpdate(true);
    inp.select("*");
    while (inp.nextRow()) {
      out.newRow();
      DataUtil.moveCorr(inp, out);
      out.save();
    }
    inp.closeQuery();
  }

  private static String getCreateStatement(Connection dbConnection, String tableName, AbstractAttribute[] attributes, Index[] indices) {
    switch (ConnectionHolder.getDatabaseType(dbConnection)) {
      case ConnectionHolder.ORACLE:
        return OracleDialect.getCreateStatement(tableName, attributes, indices);
      case ConnectionHolder.MYSQL:
        return MysqlDialect.getCreateStatement(tableName, attributes, indices);
      case ConnectionHolder.SQLITE:
        return SQLiteDialect.getCreateStatement(tableName, attributes);
      case ConnectionHolder.MS_ACCESS:
        return MSAccessDialect.getCreateStatement(tableName, attributes);
      case ConnectionHolder.DB2_400:
        return Db2400Dialect.getCreateStatement(tableName, attributes);
      case ConnectionHolder.MS_SQL_SERVER:
        return MSSQLServerDialect.getCreateStatement(tableName, attributes);
      case ConnectionHolder.SQLBASE:
        return SQLBaseDialect.getCreateStatement(tableName, attributes, indices);
      case ConnectionHolder.POSTGRESQL:
        return PostgreSQLDialect.getCreateStatement(tableName, attributes);
    default:
        Logger.getInstance().info(DbModifier.class, "Database type not identified. Trying create for MS Access...");
        return MSAccessDialect.getCreateStatement(tableName, attributes);
    }
  }

  private static boolean isContained(String attributeName, AbstractAttribute[] attributes) {
    int i;
    for (i=0; i<attributes.length; i++) {
      if (attributes[i].getFieldName().equalsIgnoreCase(attributeName)) return true; // ignore case important for Oracle!
    }
    return false;
  }

/*******************************************************************************
testarea
*******************************************************************************/

  /**
   * Drops a table.
   * @param dbConnection the database connection to use
   * @param tableName the table name
   * @return true if no error occurred
   */
  public static boolean deleteTable(Connection dbConnection, String tableName) {
    try {
      Statement st = dbConnection.createStatement();
      st.execute("drop table " + tableName);
      st.close();
   }
    catch (SQLException e) {
      Logger.getInstance().info(DbModifier.class, e);
      return false;
    }
    return true;
  }

}
