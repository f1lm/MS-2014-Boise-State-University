/*
 * Copyright (c) 2012-2013 Christoph Mueller. All rights reserved.
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

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import de.must.dataobj.DataObject;
import de.must.middle.ApplConstStd;
import de.must.middle.InterruptibleProcess;

public class BackupDBStd extends InterruptibleProcess {
  
  public static final String LINE_ENDING = "\r\n";

  private ZipOutputStream outStream;
  private OutputStreamWriter writer;
  private DateFormat defaultFormat = new SimpleDateFormat(ApplConstStd.CAMELEON_TIMESTAMP_FORMAT);

  public BackupDBStd() {
  }
  
  public void backup(DataObject[] dataObjects, String zipFileOutputPath, String charset) {
    try {
      outStream = new ZipOutputStream(new FileOutputStream(zipFileOutputPath));
      if (charset != null) {
        writer = new OutputStreamWriter(outStream, charset);
      } else {
        writer = new OutputStreamWriter(outStream);
      }
      for (DataObject dataObject : dataObjects) {
        if (!isToRun()) break;
        if (dataObject.openQuery("select * from " + dataObject.getTableName())) {
          backup(dataObject);
        } else {
          Logger.getInstance().warn(dataObject.getTableName() + " not saved.");
        }
      }
      writer.close();
      outStream.close();
    } catch (FileNotFoundException e) {
      Logger.getInstance().error(getClass(), e);
      setConflictInfo(e);
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
      setConflictInfo(e);
    }
  }
  
  private void backup(DataObject dataObject) throws IOException {
    outStream.putNextEntry(new ZipEntry(dataObject.getTableName() + ".csv"));
    dataObject.newRow();
    StringBuffer line = new StringBuffer();
    for (int k = 0; k < dataObject.getAttributes().length; k++) {
      addField(line, dataObject.getAttributes()[k].getFieldName());
    }
    writeLine(line);
    dataObject.select("*");
    int i = 0;
    while (isToRun() && dataObject.nextRow()) {
      setStatusInformation("Backing up " + dataObject.getTableName() + " - record " + i++ );
      line = new StringBuffer();
      for (int k = 0; k < dataObject.getAttributes().length; k++) {
        String fieldName = dataObject.getAttributes()[k].getFieldName();
        addField(line, dataObject, fieldName);
      }
      writeLine(line);
    }
    dataObject.closeQuery();
    writer.flush();
    outStream.closeEntry();
  }

  private void addField(StringBuffer line, DataObject dataObject, String columnName) {
    Object object = dataObject.getObject(columnName);
    if (object != null) {
      if (object instanceof Date) {
        addField(line, defaultFormat.format((Date)object));
      } else {
        addField(line, object.toString());
      }
    } else {
      addField(line, "");
    }
  }
  
  private void addField(StringBuffer line, String value) {
    if (line.length() > 0) {
      line.append(";");
    }
    line.append(CSVExport.csvSecure(value));
  }
  
  private void writeLine(StringBuffer lineBuffer) throws IOException {
    writeLine(lineBuffer.toString());
  }
  
  private void writeLine(String line) throws IOException {
    writer.write(line + LINE_ENDING);
  }
  
}
