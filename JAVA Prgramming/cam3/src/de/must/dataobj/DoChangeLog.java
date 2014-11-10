/*
 * Copyright (c) 2013 Christoph Mueller. All rights reserved.
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

import java.sql.Timestamp;

import de.must.middle.GlobalStd;

/**
 * Change log table for synchronization issues, e.g. HTTP synchronization of a remote database copy. 
 * @author Christoph Mueller
 */
public final class DoChangeLog extends DataObject {

  public static final String tableName = "ChangeLog";

  public static final AbstractAttribute[] attributes = {
    new NumericAttribute("Internal change number", "ChangeNi"),
    new TimestampAttribute("Time of change", "ChangeAt"),
    new VarcharAttribute("Changing user", "ChangeUser", 254),
    new TimestampAttribute("Time of last synchronisation try", "SynchTryAt"),
    new VarcharAttribute("Table name", "TableName", 254),
    new VarcharAttribute("Identifier String", "IDString", 254),
    new CharAttribute("Ation-ID", "ActionID", 10),
    new MemoAttribute("Column names and values in case of insert or update or SQL statement in case of free SQL", "ColValues"),
  };

  public static final Index[] indices = {
    new Index (
      new IndexItem[] {
        new IndexItem("ChangeNi", IndexItem.ASCENDING),
      },
      Index.UNIQUE
    ),
    new Index (
      new IndexItem[] {
        new IndexItem("ChangeAt", IndexItem.ASCENDING),
      },
      Index.DUPLICATES
    ),
  };

  public static final String FREE_SQL_ID = "freeSQL";
  public static final String INSERT_ID = "insert";
  public static final String UPDATE_ID = "update";
  public static final String DELETE_ID = "delete";
  public static final char VALUE_SEPARATOR = '|';

  private String colChanges;

  public DoChangeLog(DataObjectConstructionDetails dataObjectConstructionDetails) {
    super(dataObjectConstructionDetails);
  }

  public String getTableName() {
    return tableName;
  }

  public AbstractAttribute[] getAttributes() {
    return attributes;
  }

  public Index[] getIndices() {
    return indices;
  }
  
  public void log(DataObject dataObject) {
    if (GlobalStd.suppressChangeLogToDB) return;
    if (dataObject instanceof DoChangeLog) return; // do not log yourself
    if (dataObject.getIdentifier() == null) return; // for now, we do not log stuff without identifier, because it cannot be synchronized
    setStandards(dataObject);
    if (dataObject.getMode() == DataObject.INSERTMODE) {
      setText("ActionID", INSERT_ID);
    } else if (dataObject.getMode() == DataObject.UPDATEMODE) {
      setText("ActionID", UPDATE_ID);
    }
    colChanges = "";
    for (int i = 0; i < dataObject.getColumnCount(); i++) {
      String colName = dataObject.getColumnName(i);
      Object ori = dataObject.getOriginalOf(colName);
      Object wo = dataObject.getWorkedOnOf(colName);
      if (ori == null && wo == null) {} // no change
      else {
        String oriStringValue = getStringValue(ori);
        String newStringValue = getStringValue(wo);
        if (
            !oriStringValue.equals(newStringValue)
         || (dataObject.getMode() == DataObject.INSERTMODE && newStringValue.length() > 0)
        ) {
          addCol(colName, newStringValue);
        }
      }
    }
    if (colChanges.length() > 0) {
      setText("ColValues", colChanges);
      save();
    }
  }
  
  /**
   * Logs current deletion of a data object.
   * @param dataObject the data object, whose deletions are to be logged
   */
  public void logDeletion(DataObject dataObject) {
    if (GlobalStd.suppressChangeLogToDB) return;
    if (dataObject instanceof DoChangeLog) return; // do not log yourself
    if (dataObject.getIdentifier() == null) return; // for now, we do not log stuff without identifier, because it cannot be synchronized
    setStandards(dataObject);
    setText("ActionID", DELETE_ID);
    save();
  }
  
  public void logFreeSQLStatement(DataObject dataObject, String sql) {
    if (GlobalStd.suppressChangeLogToDB) return;
    if (dataObject instanceof DoChangeLog) return; // do not log yourself
    if (dataObject.getIdentifier() == null) return; // for now, we do not log stuff without identifier, because it cannot be synchronized
    setStandards(dataObject);
    setText("ActionID", FREE_SQL_ID);
    setText("ColValues", sql);
    save();
  }
  
  private void setStandards(DataObject dataObject) {
    newRowWithNextIdentifierAllocation();
    setTimestamp("ChangeAt", new Timestamp(System.currentTimeMillis()));
    setText("ChangeUser", System.getProperty("user.name"));
    setText("TableName", dataObject.getTableName());
    setText("IDString", dataObject.getIdentifyTemplate().toString(dataObject.getIdentifier()));
  }
  
  private String getStringValue(Object obj) {
    if (obj == null) {
      return "";
    } else if (obj instanceof String) {
      return (String)obj;
    } else return obj.toString();
  }
  
  private void addCol(String colName, String newColValue) {
    if (colChanges.length() > 0) colChanges += VALUE_SEPARATOR;
    colChanges += getColChangePart(colName, newColValue);
  }
  
  protected String getColChangePart(String colName, String newColValue) {
    return colName + VALUE_SEPARATOR + secure(newColValue);
  }
  
  private String secure(String colValue) {
    return colValue
      .replace(VALUE_SEPARATOR, '/')
    ;
  }
  
  public void deleteAll() {
    deleteFreeConditioned("ALL");
  }
  
}