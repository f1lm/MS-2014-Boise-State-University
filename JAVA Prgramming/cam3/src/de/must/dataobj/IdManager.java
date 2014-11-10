/*
 * Copyright (c) 1999-2010 Christoph Mueller. All rights reserved.
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
import java.util.*;

/**
 * Central provider of primary keys. Requires a table named "Identity" as usually
 * defined in suitable subclasses of DataObject like DoIdent.
 * Allocates new identifiers for each entity.
 * @see mkt.DoIdent
 * @author Christoph Mueller
 */
public class IdManager {

  public static final int DB_PROXIMITY_ALWAYS_READ_AND_WRITE = 0;
  public static final int DB_PROXIMITY_ALWAYS_WRITE = 1;
  // public static final int DB_PROXIMITY_WRITE_ON_DEMAND = 2; // later - if needed: write whole hashtable with finalize.

  private static final int INSERTMODE = 0;
  private static final int UPDATEMODE = 1;
  
  private static final int ERROR_ID = -9;
  
  private static String idTableName = "Identity";
  private static String idEntityColumnName = "Entity";
  private static String idValueColumnName = "IdentNr";

  /**
   * Sets the table names for internal numbers if it differs from "Identity", "Entity" and "IdentNr".
   * @param idTableName the table name
   * @param idEntityColumnName the column name 
   * @param idValueColumnName the column name containing the value
   */
  public static void setIdTableNames(String idTableName, String idEntityColumnName, String idValueColumnName) {
    IdManager.idTableName = idTableName;
    IdManager.idEntityColumnName = idEntityColumnName;
    IdManager.idValueColumnName = idValueColumnName;
  }

  private int dbProximity = DB_PROXIMITY_ALWAYS_READ_AND_WRITE;
  private int mode;
  private Connection connection;
  private PreparedStatement selectStatement;
  private PreparedStatement insertStatement;
  private PreparedStatement updateStatement;
  private Hashtable<String, Integer> idTable = new Hashtable<String, Integer>();

  /**
   * Constructs a new ID manager for the specified database connection.
   */
  public IdManager(Connection connection) {
    this.connection = connection;
    de.must.io.Logger.getInstance().debug(getClass(), "Instanciating " + getClass().getName());
  }

  /**
   * Sets the database proximity as specified by newBbProximity. If it is
   * ensured, that there is no other instance working on this table, you may
   * choose not to read the current id of the entity to cache and optimize
   * access.
   * @param newBbProximity the database proximity which may be
   * <code>{@link #DB_PROXIMITY_ALWAYS_READ_AND_WRITE}</code> or
   * <code>{@link #DB_PROXIMITY_ALWAYS_WRITE}</code>
   */
  public void setDbProximity(int newBbProximity) {
    dbProximity = newBbProximity;
  }

  /**
   * Returns a new identifier of the specified entity.
   * @param entityName the name of the entity to retrieve the identifier
   * @return the allocated identifier
   */
  public synchronized Identifier getNewIdentifier(String entityName) {
    boolean isToRead = true;
    int identifyValueInt = 0;
    
    if (dbProximity == DB_PROXIMITY_ALWAYS_READ_AND_WRITE) {
      isToRead = true;
    } else {
      Object entityIdObject = idTable.get(entityName);
      if (entityIdObject == null) isToRead = true;
      else {
        de.must.io.Logger.getInstance().debug(getClass(), "Got Id " + identifyValueInt + " from hashtable for " + entityName);
        identifyValueInt = ((Integer)entityIdObject).intValue();
        isToRead = false;
      }
    }

    ResultSet rs = null;
    if (isToRead) try {
      if (selectStatement == null) {
        if (connection.getMetaData().getDatabaseProductName().indexOf("Oracle") > -1) { // dedicated to Oracle CHAR
          selectStatement = connection.prepareStatement("select * from " + idTableName + " where trim(" + idEntityColumnName + ") = ?");
        } else {
          selectStatement = connection.prepareStatement("select * from " + idTableName + " where " + idEntityColumnName + " = ?");
        }
      }
      selectStatement.setString(1, entityName);
      rs = selectStatement.executeQuery();
      if (rs.next()) {
        mode = UPDATEMODE;
        int identNrInt = rs.getInt(idValueColumnName);
        if (identNrInt > 0) {
          identifyValueInt = identNrInt;
        } else {
          double identNrDouble = rs.getDouble("ID_VALUE_COLUMN_NAME"); // Oracle
          if (identNrDouble > 0) {
            identifyValueInt = (int)identNrDouble;
          } else {
            de.must.io.Logger.getInstance().info(getClass(), "failed to read IdentNr");
          }
        }
        de.must.io.Logger.getInstance().debug(getClass(), "Got Id " + identifyValueInt + " from database for " + entityName);
      }
      else {
        mode = INSERTMODE;
        identifyValueInt = 0;
      }
    }
    catch (SQLException e) {
      de.must.io.Logger.getInstance().info(getClass(), selectStatement);
      de.must.io.Logger.getInstance().error(getClass(), e);
     return null;
    }
    finally {
      if (rs != null) try {
        rs.close();
      } catch (Exception e) {}
    }

    identifyValueInt++;

    switch (mode) {
    case INSERTMODE:
      if (!insert(identifyValueInt, entityName)) identifyValueInt = ERROR_ID;
      break;
    case UPDATEMODE:
      if (!update(identifyValueInt, entityName)) identifyValueInt = ERROR_ID;
    }
    if (identifyValueInt > 0) idTable.put(entityName, new Integer(identifyValueInt));
    return new Identifier(identifyValueInt);
  }

  private boolean insert(int identifyValueInt, String entityName) {
    try {
      if (insertStatement == null) {
        insertStatement = connection.prepareStatement("insert into " + idTableName + " (" + idEntityColumnName + ", " + idValueColumnName + ") values (?, ?)");
      }
      insertStatement.setString(1, entityName);
      insertStatement.setInt(2, identifyValueInt);
      insertStatement.executeUpdate();
    }
    catch (SQLException e) {
      de.must.io.Logger.getInstance().info(getClass(), entityName + " = " + identifyValueInt);
      de.must.io.Logger.getInstance().error(getClass(), e);
      return false;
    }
    return true;
  }

  private boolean update(int identifyValueInt, String entityName) {
    try {
      if (updateStatement == null) {
        if (connection.getMetaData().getDatabaseProductName().indexOf("Oracle") > -1) { // dedicated to Oracle CHAR
          updateStatement = connection.prepareStatement("update " + idTableName + " set " + idValueColumnName + " = ? where trim(" + idEntityColumnName + ") = ?");
        } else {
          updateStatement = connection.prepareStatement("update " + idTableName + " set " + idValueColumnName + " = ? where " + idEntityColumnName + " = ?");
        }
      }
      updateStatement.setInt(1, identifyValueInt);
      updateStatement.setString(2, entityName);
      updateStatement.executeUpdate();
    }
    catch (SQLException e) {
      de.must.io.Logger.getInstance().info(getClass(), entityName + " = " + identifyValueInt);
      de.must.io.Logger.getInstance().error(getClass(), e);
      return false;
    }
    return true;
  }

  /**
   * Called by the garbage collector on an object when garbage collection
   * determines that there are no more references to the object.
   */
  protected void finalize() throws Throwable {
    if (selectStatement != null) try {
      selectStatement.close();
    } catch (Exception e) {}
    if (insertStatement != null) try {
      insertStatement.close();
    } catch (Exception e) {}
    if (updateStatement != null) try {
      updateStatement.close();
    } catch (Exception e) {}
    super.finalize();
  }

}
