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
 * Connection Holder. Handle to one database connection with functions to
 * separate SQL dialects. The connection holder is a connection plus its
 * information how it is created. Thus, the connection may be rebuild if
 * refused.
 * @see ConnectionPool
 * @author Christoph Mueller
 */
public class ConnectionHolder {

  public static final int ODBC_ACCESS = 0;
  public static final int ODBC_ACCESS_BY_MDB_FILE_NAME = 2;
  public static final int OTHER_ACCESS = 1;

  public static final int MS_ACCESS = 0;
  public static final int DBASE = 1;
  public static final int ORACLE = 2;
  public static final int MYSQL = 3;
  public static final int DB2_400 = 4;
  public static final int MS_SQL_SERVER = 5;
  public static final int SQLITE = 6;
  public static final int SQLBASE = 7;
  public static final int POSTGRESQL = 8;

  private static Exception lastCreateException = null;

  private boolean connected = false;
  private boolean vacant = false;
  private ConnectionSpecification connectionSpecification;
  private Connection connection;
  private long lockTime;

  /**
   * Constructs a new connection holder.
   */
  public ConnectionHolder(ConnectionSpecification connectionSpecification) {
    this.connectionSpecification = connectionSpecification;
  }

  /**
   * Creates and returns the connection based on the previously set connection specification.
   * @return newly created connection
   */
  public Connection createConnection() throws ClassNotFoundException, SQLException {
    return createConnection(connectionSpecification);
  }

  public Connection createConnection(ConnectionSpecification connectionSpecification) throws ClassNotFoundException, SQLException {
    this.connectionSpecification = connectionSpecification;
    Logger.getInstance().debug(getClass(), "Creating connection");
    connected = false;
    try {
      lastCreateException = null;
      connection = connectionSpecification.getConnection();
      connected = true;
      return connection;
    }
    catch(ClassNotFoundException cnfe){
      lastCreateException = cnfe;
      Logger.getInstance().error(getClass(), cnfe);
      throw cnfe;
    }
    catch(SQLException SQLe){
      lastCreateException = SQLe;
      Logger.getInstance().error(getClass(), "failed to connect with specification " + connectionSpecification.toString());
      Logger.getInstance().error(getClass(), SQLe);
      throw SQLe;
    }
  }

  /**
   * Closes the current connection.
   */
  public void closeConnection() {
    try {
      if (connection != null) connection.close();
      connected = false;
    }
    catch(Exception e){
      Logger.getInstance().error(getClass(), e);
    }
    connection = null;
  }

  /**
   * Returns true if the connection holder is connected.
   * @return true if the connection holder is connected
   */
  public boolean isConnected() {
    return connected;
  }

  /**
   * Returns the connection.
   * @return the connection
   */
  public Connection getConnection() {
    return connection;
  }

  /**
   * Returns the description if the last create exception.
   * @return the description if the last create exception
   */
  public static String getLastCreateExceptionDescription() {
    if (lastCreateException == null) return "";
    else return lastCreateException.toString();
  }

  /**
   * Returns the database type of the current connection.
   * @return the database type of the current connection
   */

  public int getDatabaseType() {
    return getDatabaseType(connection);
  }

  /**
   * Returns a new instance of the sql dialect supporting class of the database
   * @return the sql dialect supporting class of the specified connection
   */
  public SqlDialect getSqlDialect() {
    return getSqlDialect(connection);
  }

  /**
   * Returns a new instance of the sql dialect supporting class of the database
   * as found in the specified connection.
   * @param connection the connection to check out the database type
   * @return the sql dialect supporting class of the specified connection
   */
  public static SqlDialect getSqlDialect(Connection connection) {
    switch (getDatabaseType(connection)) {
      case ORACLE: return new OracleDialect();
      case DB2_400: return new Db2400Dialect();
      case MYSQL: return new MysqlDialect();
      case SQLITE: return new SQLiteDialect();
      case MS_ACCESS: return new MSAccessDialect();
      case MS_SQL_SERVER: return new MSSQLServerDialect();
      case DBASE: return new DbaseDialect();
      case SQLBASE: return new SQLBaseDialect();
      case POSTGRESQL: return new PostgreSQLDialect();
      default: return new MSAccessDialect();
    }
  }

  /**
   * Returns the database type of the specified connection.
   * @param connection the connection to check
   * @return the database type of the specified connection
   */
  public static int getDatabaseType(Connection connection) {
    try {
      if (connection.getMetaData().getDatabaseProductName().indexOf("Oracle") > -1) {
        return ORACLE;
      } else if (connection.getMetaData().getDatabaseProductName().toLowerCase().indexOf("mysql") > -1) {
        return MYSQL;
      } else if (connection.getMetaData().getDatabaseProductName().indexOf("DB2 UDB") > -1) {
        return DB2_400;
      } else if (connection.getMetaData().getDatabaseProductName().indexOf("DB2/400") > -1) {
        return DB2_400;
      } else if (connection.getMetaData().getDatabaseProductName().indexOf("ACCESS") > -1) {
        return MS_ACCESS;
      } else if (connection.getMetaData().getDatabaseProductName().indexOf("SQLite") > -1) {
        return SQLITE;
      } else if (connection.getMetaData().getDatabaseProductName().indexOf("Microsoft SQL Server") > -1) {
        return MS_SQL_SERVER;
      } else if (connection.getMetaData().getDatabaseProductName().indexOf("SQLBase") > -1) {
        Logger.getInstance().info(ConnectionHolder.class, "Limited support of database: " + connection.getMetaData().getDatabaseProductName());
        return SQLBASE;
      } else if (connection.getMetaData().getDatabaseProductName().indexOf("DBASE") > -1) {
        Logger.getInstance().info(ConnectionHolder.class, "Limited support of database: " + connection.getMetaData().getDatabaseProductName());
        return DBASE;
      } else if (connection.getMetaData().getDatabaseProductName().toLowerCase().indexOf("postgresql") > -1) {
        return POSTGRESQL;
      } else {
        Logger.getInstance().info(ConnectionHolder.class, "Do not support this database: " + connection.getMetaData().getDatabaseProductName());
        return MS_ACCESS;
      }
    }
    catch(Exception e){
      Logger.getInstance().error(ConnectionHolder.class, e);
      return -1;
    }
  }

  /**
   * Returns true if the hold connection is vacant to be reused as private
   * connection of another owner.
   * @return Returns true if the connection is vacant to be reused
   */
  public boolean isVacant() {
    return vacant;
  }

  /**
   * Locks the connection as privately use. Causes isVacant to return false.
   */
  public void lock() {
    vacant = false;
    lockTime = System.currentTimeMillis();
  }

  /**
   * Unlocks the connection as privately use. Causes isVacant to return true.
   */
  public void unlock() {
    vacant = true;
  }

  /**
   * Checks the connection and reactivates it, if the connection is broken.
   * @return whether or not the database connection has been recreated
   */
  public boolean checkAndReactivateDbConnIfNecessary() {
    if (connected == false) return false; // nothing to check or reactivate
    Logger.getInstance().debug(getClass(), "Checking connection");
    boolean connectionBroken = false;
    try {
      if (connection.isClosed()) {
        Logger.getInstance().info(getClass(), "Database connection is closed");
        connectionBroken = true;
      }
    } catch (java.sql.SQLException sqle) {
      Logger.getInstance().error(getClass(), "Cannot use database connection any more", sqle);
      connectionBroken = true;
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), "Cannot use database connection any more", e);
      connectionBroken = true;
    }
    if (connectionBroken) {
      try {
        createConnection();
      } catch (Exception e) {} // already printed before
    }
    return connectionBroken;
  }
  
  /**
   * Called by the garbage collector on an object when garbage collection
   * determines that there are no more references to the object.
   */
  protected void finalize() throws Throwable {
    Logger.getInstance().debug(getClass(), "finalize called in " + getClass().getName());
    if (connection != null && !connection.isClosed()) {
      closeConnection();
    }
    super.finalize();
  }

}
