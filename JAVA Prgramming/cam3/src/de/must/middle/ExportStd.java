/*
 * Copyright (c) 2008-2009 Christoph Mueller. All rights reserved.
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

package de.must.middle;

import java.io.FileWriter;
import java.io.IOException;

import de.must.dataobj.DataObject;
import de.must.util.StringFunctions;

/**
 * Standards to export data from data objects into csv files.
 * Works well with ImportStd for later import.
 * @see ImportStd
 * @author Christoph Mueller
 */
public class ExportStd extends InterruptibleProcess {

  protected DataObject mainDataObject;
  private String fieldSelection = "*";
  private String whereCondition = null;
  protected AliveConfirmer aliveConfirmer;
  protected String fileName;
  protected FileWriter fileWriter;
  private int counter;
  
  /**
   * Constructs a new ExportStd.
   * @param aliveConfirmer the alive confirmor to interrupt the process.
   * @param mainDataObject the main source data object 
   * @param fileName the name of the target file
   */
  public ExportStd(AliveConfirmer aliveConfirmer, DataObject mainDataObject, String fileName) {
    this.aliveConfirmer = aliveConfirmer;
    this.mainDataObject = mainDataObject;
    this.fileName = fileName;
  }
  
  /**
   * Sets the field selection. Uses "*" if not set. You may control the number of exported column with it.
   * @param fieldSelection the field select to use instead of "*";
   */
  public void setFieldSelection(String fieldSelection) {
    this.fieldSelection = fieldSelection;
  }
  
  public void setWhereCondition(String whereCondition) {
    this.whereCondition = whereCondition;
  }
  
  public void processExport() throws IOException {
    try {
      setStatusInformation("Sorting...");
      mainDataObject.select(fieldSelection, whereCondition);
      fileWriter = new FileWriter(fileName);
      if (mainDataObject.nextRow()) {
        writeColumnHeader();
        exportRow();
        setStatusInformation(++counter + " rows exported");
      }
      while(aliveConfirmer.isToRun() && mainDataObject.nextRow()) {
        exportRow();
        setStatusInformation(++counter + " rows exported");
      }
    } catch (IOException e) {
      throw e;
    } finally {
      if (fileWriter != null) try {
        fileWriter.close();
      } catch (Exception e) {}
      mainDataObject.closeQuery();
    }
  }
  
  protected void writeColumnHeader() throws IOException {
    StringBuffer line = new StringBuffer();
    for (int k = 0; k < mainDataObject.getAttributes().length; k++) {
      if (!isFieldToIgnore(mainDataObject.getAttributes()[k].getFieldName())) {
        addValue(line, mainDataObject.getAttributes()[k].getDescription());
      }
    }
    line.append("\r\n");
    fileWriter.write(line.toString());
  }
  
  protected void exportRow() throws IOException {
    StringBuffer line = new StringBuffer();
    for (int k = 0; k < mainDataObject.getAttributes().length; k++) {
      String fieldName = mainDataObject.getAttributes()[k].getFieldName();
      if (!isFieldToIgnore(fieldName)) {
        addField(line, fieldName);
      }
    }
    line.append("\r\n");
    fileWriter.write(line.toString());
  }
  
  protected boolean isFieldToIgnore(String columnName) {
    return false;
  }
  
  protected void addField(StringBuffer line, String columnName) {
    String value = mainDataObject.getTextNoMatterWhatTypeOfColumn(columnName);
    if (value == null) value = "";
    addValue(line, value);
  }

  protected void addValue(StringBuffer line, String value) {
    value = StringFunctions.replaceAll(value, "\r\n", " - ");
    value = StringFunctions.replaceAll(value, "\n", " - ");
    if (value.indexOf(';') != -1 || value.indexOf('"') != -1) {
      value = "\"" + value.replaceAll("\"", "\"\"") + "\""; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$ //$NON-NLS-4$
    }
    if (line.length() > 0) {
      line.append(";");
    }
    line.append(value);
  }
  
}
