/*
 * Copyright (c) 2012 Christoph Mueller. All rights reserved.
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

package de.must.io;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import de.must.dataobj.DataObject;
import de.must.dataobj.DataTextObjectWithDelimiterAndLabels;
import de.must.dataobj.DataUtil;
import de.must.middle.GlobalStd;
import de.must.middle.InterruptibleProcess;

public class RestoreDBStd extends InterruptibleProcess {

  private ZipInputStream zis;
  private PreparedStatement deleteFromStmt;

    
  public void restore(DataObject[] dataObjects, String zipFileInputPath, String charset) {
    try {
      restore(dataObjects, new BufferedInputStream(new FileInputStream(zipFileInputPath)), charset);
    } catch (FileNotFoundException e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
  public void restore(DataObject[] dataObjects, BufferedInputStream bure, String charset) {
    GlobalStd.suppressChangeLogToDB = true;
    try {
      zis = new ZipInputStream(bure);
      ZipEntry entry;
      while ((entry = zis.getNextEntry()) != null) {
        String entryName = entry.getName();
        String tableName = entryName.substring(0, entryName.length() -4);
        boolean found = false;
        for (DataObject dataObject : dataObjects) {
          if (tableName.equals(dataObject.getTableName())) {
            found = true;
            deleteFromStmt = dataObject.getConnection().prepareStatement("delete from " + tableName);
            deleteFromStmt.executeUpdate();
            BufferedReader reader;
            if (charset != null) {
              reader = new BufferedReader(new InputStreamReader(zis, charset));
            } else {
              reader = new BufferedReader(new InputStreamReader(zis));
            }
            DataTextObjectWithDelimiterAndLabels dto = new DataTextObjectWithDelimiterAndLabels(reader, ';');
            dataObject.setSilentUpdate(true);
            int i = 0;
            while (dto.nextRow()) {
              setStatusInformation("Restoring " + dataObject.getTableName() + " - record " + i++ );
              dataObject.newRow();
              DataUtil.moveCorr(dto, dataObject);
              dataObject.insert();
            }
            // do not: dto.close();
          }
        }
        if (!found) {
          setConflictInfo("Didn't find " + tableName + " for zip entry " + entryName);
        }
      }
      zis.close();
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    } catch (SQLException e) {
      Logger.getInstance().error(getClass(), e);
    }
    GlobalStd.suppressChangeLogToDB = false;
  }
  
}
