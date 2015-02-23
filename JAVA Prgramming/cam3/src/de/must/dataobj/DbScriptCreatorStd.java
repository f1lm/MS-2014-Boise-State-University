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

import java.io.IOException;

import de.must.io.*;

/**
 * Standard stuff to create database creation scripts. Output is generated to
 * file createDB.sql
 * @author Christoph Mueller
 */
public abstract class DbScriptCreatorStd {

  private Protocol out;

  /**
   * Constructs a new DB script creator.
   */
  public DbScriptCreatorStd() {
    try {
      out = new Protocol("createDB.sql");
      out.addEntry("create database " + getDatabaseName() + ";");
      out.addEntry("use " + getDatabaseName() + ";");
      EntityInfo[] entityInfos = getAllEntityInfos();

      for (int i = 0; i < entityInfos.length; i++) {
        outputTableAndIndicesCreationStatements(entityInfos[i]);
      }

      outputIndividualStatements(out);
      out.addEntry("flush privileges;");
      out.close();
    } catch (IOException e) {
      de.must.io.Logger.getInstance().error(this.getClass(), e);
    }
  }

  private void outputTableAndIndicesCreationStatements(EntityInfo entityInfo) {
    out.addEntry(MysqlDialect.getCreateStatement(entityInfo) + ";");
    String tableName = entityInfo.getTableName();
    Index[] indices = entityInfo.getIndices();
    for (int i = 1; i < indices.length; i++) {
      out.addEntry(MysqlDialect.getCreateIndexStatement(tableName, indices[i], tableName + String.valueOf(i+1)) + ";");
    }
  }

  /**
   * Creates instances of DataObject classes and returns there EntityInfo interface.
   * @param dataObjects the data objects to be instantiated
   * @return the corresponding entity info interfaces
   */
  protected EntityInfo[] getEntityInfoInstances(Class<? extends EntityInfo>[] dataObjects) {
    EntityInfo[] entityInfos = new EntityInfo[dataObjects.length];
    for (int i = 0; i < dataObjects.length; i++) {
      try {
        entityInfos[i] = (EntityInfo)dataObjects[i].newInstance();
      } catch (IllegalAccessException iae) {
        de.must.io.Logger.getInstance().error(getClass(), iae);
      } catch (InstantiationException ie) {
        de.must.io.Logger.getInstance().error(getClass(), ie);
      }
    }
    return entityInfos;
  }

  /**
   * Returns the database name.
   * @return the database name
   */
  protected abstract String getDatabaseName();

  /**
   * Returns entity info of all tables needed to execute the application.
   * @return entity info of all tables needed to execute the application
   */
  protected abstract EntityInfo[] getAllEntityInfos();

  /**
   * Opportunity to put individual stuff into the script.
   * @param out the protocol file to use for output
   */
  protected abstract void outputIndividualStatements(Protocol out);

  /**
   * Closes the output file.
   */
  protected void finalize() throws Throwable {
    out.close();
    super.finalize();
  }

}
