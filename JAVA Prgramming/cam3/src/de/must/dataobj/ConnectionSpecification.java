/*
 * Copyright (c) 1999-2012 Christoph Mueller. All rights reserved.
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

import java.io.File;
import java.sql.*;
import java.util.Properties;

/**
 * The specification needed to create a database connection.
 * @see ConnectionHolder
 * @author Christoph Mueller
 */
public class ConnectionSpecification {

  public static final String[] ACCESS_DRIVER = new String[] {
    "Driver={Microsoft Access Driver (*.mdb)};DBQ=",
    "Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=",
    "Driver={Microsoft Access-Treiber (*.mdb)};DBQ=",
  };

  public static final int CONNECT_JDBC_ODBC_BY_DSN = 0;
  public static final int CONNECT_JDBC_DIRECT = 1;
  public static final int CONNECT_JDBC_ODBC_BY_FILE_PATH = 2;
  
  private int connectType = CONNECT_JDBC_ODBC_BY_DSN;
  private String url;
  private String odbcName;
  private File dbFile;
  private String driverName;
  private String userName;
  private String password;
  private String dbCharset;

  /**
   * Constructs a connection specification for a ODBC connection with blank user
   * and password.
   * @param odbcName the ODBC data source name name
   */
  public ConnectionSpecification(String odbcName) {
    this(odbcName, "", "");
  }
  
  /**
   * Constructs a connection specification for a ODBC connection.
   * @param odbcName the ODBC data source name
   * @param userName the name of the database user
   * @param password the password of the database user
   */
  public ConnectionSpecification(String odbcName, String userName, String password) {
    connectType = CONNECT_JDBC_ODBC_BY_DSN;
    this.odbcName = odbcName;
    this.url = "jdbc:odbc:" + odbcName;
    this.driverName = "sun.jdbc.odbc.JdbcOdbcDriver";
    this.userName = userName;
    this.password = password;
  }

  /**
   * Constructs a connection specification for a direct JDBC connection.
   * @param url the URL of the database to connect to
   * @param driverName the name of the database drive to use
   * @param userName the name of the database user
   * @param password the password of the database user
   */
  public ConnectionSpecification(String url, String driverName, String userName, String password) {
    connectType = CONNECT_JDBC_DIRECT;
    this.url = url;
    this.driverName = driverName;
    this.userName = userName;
    this.password = password;
  }

  public ConnectionSpecification(File dbFile) {
    this(dbFile, "", "");
  }
  
  public ConnectionSpecification(File dbFile, String userName, String password) {
    connectType = CONNECT_JDBC_ODBC_BY_FILE_PATH;
    this.dbFile = dbFile;
    this.url = "jdbc:odbc:" + odbcName;
    this.driverName = "sun.jdbc.odbc.JdbcOdbcDriver";
    this.userName = userName;
    this.password = password;
  }

  /**
   * Sets the database character set, e.g. UTF-8.
   * @param dbCharset the database character set to use
   */
  public void setDbCharset(String dbCharset) {
    this.dbCharset = dbCharset;
  }

  /**
   * Returns the connect type
   * @return the connect type
   */
  public int getConnectType() {
    return connectType;
  }

  /**
   * Returns the ODBC data source name name
   * @return the ODBC data source name name
   */
  public String getOdbcName() {
    return odbcName;
  }

  /**
   * Returns the URL
   * @return the URL
   */
  public String getUrl() {
    return url;
  }

  /**
   * Returns the driver's name
   * @return the driver's name
   */
  public String getDriverName() {
    return driverName;
  }

  /**
   * Returns the name of the database user
   * @return the name of the database user
   */
  public String getUserName() {
    return userName;
  }

  /**
   * Returns the password of the database user
   * @return the password of the database user
   */
  public String getPassword() {
    return password;
  }

  /**
   * Returns a connection as specified when constructed.
   * @return a connection as specified when constructed
   */
  public Connection getConnection() throws ClassNotFoundException, SQLException {
    Connection connection = null;
    Properties props = new Properties();
    if (userName != null) props.put("user", userName);
    if (password != null) props.put ("password", password);
    if (dbCharset != null && dbCharset.length() > 0) props.put ("charSet", dbCharset); // MS Access needs it - Oracle does it automatically
    if (connectType == CONNECT_JDBC_ODBC_BY_FILE_PATH) {
      SQLException lastSqlException = null;
      for (String accessDriver : ConnectionSpecification.ACCESS_DRIVER) {
        url = "jdbc:odbc:" + accessDriver + dbFile.getPath(); //$NON-NLS-1$
        driverName = "sun.jdbc.odbc.JdbcOdbcDriver"; //$NON-NLS-1$
        try {
          lastSqlException = null;
          connection = DriverManager.getConnection(url, props);
          break; // the first valid connection is good - if we don't stop here we create additional connections which will never be closed!
        } catch(SQLException sqlException){
          lastSqlException = sqlException;
        }
      }
      if (lastSqlException != null) {
        throw lastSqlException;
      }
    } else if (connectType == CONNECT_JDBC_ODBC_BY_DSN) {
      Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
      DriverManager.setLoginTimeout(30);
      connection = DriverManager.getConnection("jdbc:odbc:" + odbcName, props);
    } else {
      Class.forName(driverName);
      DriverManager.setLoginTimeout(30);
      connection = DriverManager.getConnection(url, props);
    }
    return connection;
  }

  @Override
  public String toString() {
    if (connectType == CONNECT_JDBC_ODBC_BY_DSN) {
      return "ODBC via DSN: " + odbcName;
    } else if (connectType == CONNECT_JDBC_ODBC_BY_FILE_PATH) {
      return "ODBC to file: " + dbFile.getPath();
    } else {
      return "JDBC: " + url + " via " + driverName;
    }
  }

}
