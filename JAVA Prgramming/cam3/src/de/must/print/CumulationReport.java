/*
 * Copyright (c) 2006-2009 Christoph Mueller. All rights reserved.
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
package de.must.print;

import de.must.middle.*;
import de.must.dataobj.DataObject;
import de.must.io.HtmlFile;

/**
 * A report with group cumulation, e.g. for statistics.
 * @author Christoph Mueller
 */
public abstract class CumulationReport extends InterruptibleBatchThread {

  public static String outputFileName;
  
  protected DataObject dataObject;
  protected HtmlFile htmlFile;
  protected String[]groupFields; 
  protected String[]previousGroupContent; 
  protected int[]groupMembers; 
  protected int overallMembers = 0;
  protected int groupChangeLevel;
  
  public CumulationReport(DataObject dataObject) {
    this.dataObject = dataObject;
    groupFields = getGroupFields();
    previousGroupContent = new String[groupFields.length];
    groupMembers = new int[groupFields.length];
  }
  
  protected abstract String getApplicationName();
  protected abstract String getOutputFileName();
  protected abstract String[] getGroupFields();
  protected abstract String getTitle();
  protected abstract String[] getTableHeader();
  protected abstract void writeParameters();
  protected abstract void outputDoneCumulationRow(String[] currentOutput, int level, int members);
  protected abstract void outputOverall(int overallMembers);

  
  protected void runCore() throws Exception {
    threadController.setStatusInformation("Sorting ...");
    String orderByFields = groupFields[0];
    for (int i = 1; i < groupFields.length; i++) {
      orderByFields += ", " + groupFields[i];
    }
    dataObject.select("*", getWhereCondition(), orderByFields); //$NON-NLS-1$
    htmlFile = new HtmlFile(getOutputFileName(), getTitle(), getApplicationName());
    htmlFile.outputHeader(); //$NON-NLS-1$
    htmlFile.writeln("<h1>" + getTitle() + "</h1>"); //$NON-NLS-1$ //$NON-NLS-2$
    writeParameters();
    htmlFile.writeln("<br><br>"); //$NON-NLS-1$
    htmlFile.writeln("<table>"); //$NON-NLS-1$
    htmlFile.writeTableHeader(getTableHeader());
    writeDataRows();
    htmlFile.writeln("</table>"); //$NON-NLS-1$
    htmlFile.outputFooter();
    dataObject.closeQuery();
    htmlFile.close();
  }
  
  /**
   * Returns the where condition which is null if it is not overridden.
   * Override the function if you want to reduce the report rows. 
   * @return the where condition which is null if it is not overridden.
   */
  protected String getWhereCondition() {
    return null;
  }
  
  protected void writeDataRows() {
    while(isToRun() && dataObject.nextRow()) {
      determineChangeLevel();
      if (previousGroupContent[0] != null) outputDoneCumulation();
      for (int i = groupChangeLevel; i < groupMembers.length; i++) {
        resetGroup(i);
      }
      for (int i = 0; i < groupFields.length; i++) {
        previousGroupContent[i] = dataObject.getText(groupFields[i]);
      }
      cumulate();
    }
    if (isToRun() && overallMembers > 0) {
      groupChangeLevel = 0; /*and*/ outputDoneCumulation();
      outputOverall(overallMembers);
    }
  }
  
  private boolean determineChangeLevel() {
    groupChangeLevel = groupFields.length - 1;
    for (int i = 0; i < groupFields.length; i++) {
      String currentGroupContent = dataObject.getText(groupFields[i]);
      if (previousGroupContent[i] == null || !previousGroupContent[i].equals(currentGroupContent)) {
        groupChangeLevel = i;
        return true;
      }
    }
    return true;
  }
  
  protected void outputDoneCumulation() {
    String[] currentOutput = new String[previousGroupContent.length];
    for (int i = 0; i < currentOutput.length; i++) {
      currentOutput[i] = previousGroupContent[i];
    }
    for (int i = groupFields.length - 1; i >= groupChangeLevel; i--) {
      int members = groupMembers[i];
      outputDoneCumulationRow(currentOutput, i, members);
      currentOutput[i] = "";
    }
  }

  protected void resetGroup(int level) {
    groupMembers[level] = 0;
  }
  
  protected void cumulate() {
    for (int i = 0; i < groupMembers.length; i++) {
      groupMembers[i]++;
    }
    overallMembers ++;
  }
  
}

