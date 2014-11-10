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

import java.util.Vector;

import de.must.io.Logger;
import de.must.middle.GlobalStd;
import de.must.middle.MessageReceiver;

/**
 * Creates tables in an empty database or modifies structure even without using
 * the SQL statement "alter table".
 * @author Christoph Mueller
 */
public abstract class TableCreatorStd {

  public static final int UPDATE_NONE = 999999;
  public static final int TODO_UPDATE_STRUCTURE_FOR_ALL_TABLES = 900000; // special case - must be higher than any real update level
  public static final int TODO_ALTER = 1;
  public static final int TODO_CREATE = 0;
  
  public static final int STATE_UNHAPPY = 9;
  public static final int STATE_HAPPY_MINUS_UPDATE = 5;
  public static final int STATE_FULL_HAPPY = 0;

  private GlobalStd global;
  protected DbModifier dbModifier;
  private MessageReceiver messageReceiver;
  private int happyState;

  /**
   * Constructs a new table creator.
   */
  public TableCreatorStd(GlobalStd global) {
    this.global = global;
  }
  
  /**
   * Sets the receiver of progress information send later by {@link #inform(String)} 
   * @param messageReceiver the receiver of progress information
   */
  public void setMessageReceiver(MessageReceiver messageReceiver) {
    this.messageReceiver = messageReceiver;
  }
  
  /**
   * Returns what to do with the database structure.
   * If the result is neither UPDATE_NONE nor TODO_CREATE,
   * the result represents the alteration level, as specified by
   * sub class in getUpdateLevel().
   * @return what to do with the database structure
   * @see #TODO_CREATE
   * @see #UPDATE_NONE
   */
  public int determineTodo() {
    if (isCreationNecessary()) {
      return TODO_CREATE;
    } else {
      return getUpdateLevel();
    }
  }

  /**
   * Creates all tables as specified by {@link #getAllEntityInfos()}
   * @return true if all tables have been successfully created
   */
  public boolean createTables() {
    boolean createdAll = true;
    EntityInfo[] entityInfos = getAllEntityInfos();
    dbModifier = new DbModifier();
    for (int i = 0; i < entityInfos.length; i++) {
      if (!dbModifier.createTable(global.getMainConnection(), entityInfos[i])) createdAll = false;
    }
    if (createdAll) tablesCreated();
    return createdAll;
  }
  
  /**
   * Updates all tables - special case!
   */
  public Vector<String> updateStructureOfAllTables() {
    boolean success = true;
    Vector<String> changeLog = new Vector<String>(); 
    inform("altering tables ...");
    Logger.getInstance().setAdditionalOutBuffer(changeLog); // start additional logging
    global.closeMainConnection(); // release locks
    global.createOrCheckConnections();
    EntityInfo[] entityInfos = getAllEntityInfos();
    dbModifier = new DbModifier();
    for (int i = 0; i < entityInfos.length; i++) {
      if (((DataObject)entityInfos[i]).openQuery("select * from " + entityInfos[i].getTableName() + " where 1 = 0")) { // wichtig bei MySQL und großen Datenmengen !!!
        ((DataObject)entityInfos[i]).closeQuery();
        inform("altering " + entityInfos[i].getTableName());
        if (!dbModifier.updateTable(global.connectionSpecification, entityInfos[i])) success = false;
      } else {
        if (!dbModifier.createTable(global.getMainConnection(), entityInfos[i])) success = false;
      }
    }
    Logger.getInstance().setAdditionalOutBuffer(null); // stop additional logging
    if (success) {
      inform("altering was completely successful");
    } else {
      inform("altering failed or incomplete");
    }
    global.closeMainConnection();
    global.createOrCheckConnections();
    // global.rebuildGlobalDataObjects();
    return changeLog;
  }
  
  /**
   * Returns entity info of all tables needed to execute the application.
   * @return entity info of all tables needed to execute the application
   */
  protected abstract EntityInfo[] getAllEntityInfos();

  /**
   * Returns the database name.
   * @return the database name
   */
  public abstract String getDatabaseName();

  /**
   * Returns true if table creation is necessary.
   * @return true if table creation is necessary
   */
  public abstract boolean isCreationNecessary();

  /**
   * Returns true if the used database name is the standard name.
   * @return true if the used database name is the standard name
   */
  public boolean isStandardDatabase() {
  	if (global.connectionSpecification.getOdbcName() == null) return false;
    return global.connectionSpecification.getOdbcName().equalsIgnoreCase(getDatabaseName());
  }

  /**
   * Performs table alteration depending on alteration level
   * which for his part depends on the age of the database structure. 
   * @param alterationLevel the alteration level
   * @return a list of warnings or error messages caused by the alteration process
   */
  public Vector<String> alterTables(int alterationLevel) {
    dbModifier = new DbModifier();
    Vector<String> changeLog = new Vector<String>(); 
    inform("altering tables ...");
    Logger.getInstance().setAdditionalOutBuffer(changeLog); // start additional logging
    updateDatabase(alterationLevel);
    Logger.getInstance().setAdditionalOutBuffer(null); // stop additional logging
    return changeLog;
  }
  
  /**
   * Returns the alteration level depending on the age of the database structure. 
   * @return the alteration level
   * @see #UPDATE_NONE if there is nothing to alter
   */
  public abstract int getUpdateLevel();
  
  /**
   * Alter tables.
   * @param dbModifier the database modifier to use
   * @param alterationLevel the alteration level
   */
  protected abstract void updateDatabase(int alterationLevel);

  /**
   * Event tables created for additional actions like inserting data.
   * Override it to add individual actions.
   */
  protected void tablesCreated() {}
  
  protected void createTable(DataObject dataObject) {
    dbModifier.createTable(global.getMainConnection(), dataObject);
  }

  protected void updateTable(DbModifier dbModifier, DataObject dataObject) {
    inform("updating " + dataObject.getTableName() +  " ..."); 
    dbModifier.updateTable(global.connectionSpecification, dataObject);
  }
  
  /**
   * Sends progress information to the previously specified message receiver. 
   * @param info the current progress information
   */
  protected void inform(String info) {
    if (messageReceiver != null) {
      messageReceiver.receive(info);
    } else {
      Logger.getInstance().warn("No message receiver for info \"" + info + "\""); 
    }
  }
  
  public void setHappyState(int happyState) {
    this.happyState = happyState;
  }

  /**
   * Returns how happy the table creator is in detail. 
   * @return how happy the table creator is in detail
   * @see TableCreatorStd#STATE_FULL_HAPPY
   * @see TableCreatorStd#STATE_HAPPY_MINUS_UPDATE
   * @see TableCreatorStd#STATE_UNHAPPY
   */
  public int getHappyState() {
    return happyState;
  }

}