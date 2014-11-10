/*
 * Copyright (c) 2008-2013 Christoph Mueller. All rights reserved.
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

import java.io.IOException;
import java.io.BufferedReader;

import de.must.dataobj.DataTextObjectWithDelimiter;
import de.must.middle.AliveConfirmer;
import de.must.middle.StatusInfoPresenter;

/**
 * Import from CSV files with check of mandatory columns.
 * @author Christoph Mueller
 */
public abstract class CSVImport {

  public static synchronized String getMessage(String[] mandatoryColumnNames) {
    return getMessage(new String[][]{mandatoryColumnNames});
  }
  
  public static synchronized String getMessage(String[][] mandatoryColumnNameAlternatives) {
    String fields = "";
    for (int i = 0; i < mandatoryColumnNameAlternatives.length; i++) {
      if (i > 0) fields += " oder ";
      fields += "\"" + mandatoryColumnNameAlternatives[i][0] + "\"";
      for (int j = 1; j < mandatoryColumnNameAlternatives[i].length-1; j++) {
        fields += ", \"" + mandatoryColumnNameAlternatives[i][j] + "\"";
      }
      if (mandatoryColumnNameAlternatives[i].length > 1 ) {
        fields += " und \"" + mandatoryColumnNameAlternatives[i][mandatoryColumnNameAlternatives[i].length -1] + "\"";
      }
    }
    return fields + " in 1. Zeile erwartet - keine entsprechenden Daten gefunden.";
  }

  public class NoDataFoundException extends Exception {
    public NoDataFoundException(String[] mandatoryColumnNames) {
      super(CSVImport.getMessage(mandatoryColumnNames));
    }
    public NoDataFoundException(String[][] mandatoryColumnNameAlternatives) {
      super(CSVImport.getMessage(mandatoryColumnNameAlternatives));
    }
    public NoDataFoundException(String message) {
      super(message);
    }
  }
  
  protected AliveConfirmer aliveConfirmer;
  protected char[] preferredDelimiter = new char[] {';', '|', ','};
  protected StatusInfoPresenter statusInfoPresenter;
  protected int maxImport = 999999999;
  protected int importCount = 0;

  public void setStatusInfoPresenter(StatusInfoPresenter statusInfoPresenter) {
    this.statusInfoPresenter = statusInfoPresenter;
  }
  
  /**
   * Sets the maximum of entries to be imported
   * @param maxImport the maximum of entries to be imported
   */
  public void setMaxImport(int maxImport) {
    this.maxImport = maxImport;
  }


  public void setAliveConfirmer(AliveConfirmer aliveConfirmer) {
    this.aliveConfirmer = aliveConfirmer;
  }
  
  public void setPreferredDelimiter(char[] preferredDelimiter) {
    this.preferredDelimiter = preferredDelimiter;
  }
  
  public void checkFile(BufferedReader bure, String[] mandatoryColumnNames) throws NoDataFoundException {
    checkFile(bure, new String[][]{mandatoryColumnNames});
  }
  
  public String checkFile(String filePath, String[] mandatoryColumnNames) throws NoDataFoundException {
    return checkFile(filePath, new String[][]{mandatoryColumnNames});
  }
  
  public static String[] openAlterNatives = new String[]{TextFile.ENCODING_UTF8, TextFile.ENCODING_UNICODE};
  
  public void checkFile(BufferedReader bure, String[][] mandatoryColumnNameAlternatives) throws NoDataFoundException {
    char delimiter = guessDelimiter(bure);
    if (!checkFile(new DataTextObjectWithDelimiter(bure, delimiter), mandatoryColumnNameAlternatives)) {
      throw new NoDataFoundException(mandatoryColumnNameAlternatives);
    }
    try {
      bure.reset();
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
  /**
   * @param filePath
   * @param mandatoryColumnNameAlternatives
   * @return encoding to use - null is standard
   * @throws NoDataFoundException
   */
  public String checkFile(String filePath, String[][] mandatoryColumnNameAlternatives) throws NoDataFoundException {
    if (checkFile(filePath, mandatoryColumnNameAlternatives, null)) {
      return null;
    }
    for (int i = 0; i < openAlterNatives.length; i++) {
      if (checkFile(filePath, mandatoryColumnNameAlternatives, openAlterNatives[i])) {
        return openAlterNatives[i];
      }
    }
    throw new NoDataFoundException(mandatoryColumnNameAlternatives);
  }
  
  private boolean checkFile(String filePath, String[][] mandatoryColumnNameAlternatives, String charsetName) {
    TextFile inputFile = new TextFile(filePath, charsetName);
    String line = "";
    if (inputFile.nextLine()) line = inputFile.getLine();
    char delimiter = guessDelimiter(line);
    inputFile.close();
    DataTextObjectWithDelimiter inp = new DataTextObjectWithDelimiter(filePath, delimiter, charsetName);
    return checkFile(inp, mandatoryColumnNameAlternatives);
  }
  
  private boolean checkFile(DataTextObjectWithDelimiter inp, String[][] mandatoryColumnNameAlternatives) {
    inp.nextRow(); // first line contains column information
    String headerField;
    for (int i = 0; i < mandatoryColumnNameAlternatives.length; i++) {
      String[] mandatoryColumnNames = mandatoryColumnNameAlternatives[i];
      boolean foundEverything = true;
      for (int j = 0; j < mandatoryColumnNames.length; j++) {
        boolean foundColumn = false;
        int columnIndex = 0;
        while (columnIndex < 50  | (headerField = inp.getText(++columnIndex).trim()).length() > 0) {
          if (headerField.equalsIgnoreCase(mandatoryColumnNames[j])) {
            foundColumn = true;
          }
        }
        if (!foundColumn) foundEverything = false;
      }
      if (foundEverything) return true;
    }
    return false;
  }
  
  protected char guessDelimiter(BufferedReader bure) {
    char result = preferredDelimiter[0];
    try {
      char[] chars = new char[1024];
      int length = bure.read(chars);
      if (length > 0) {
        String line = String.copyValueOf(chars, 0, length);
        result = guessDelimiter(line);
      }
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    } finally {
      try {
        bure.reset();
      } catch (IOException e) {
        Logger.getInstance().error(getClass(), e);
      }
    }
    return result;
  }
  
  protected char guessDelimiter(String firstLine) {
    for (int i = 0; i < preferredDelimiter.length; i++) {
      if (firstLine.indexOf(preferredDelimiter[i]) != -1 ) {
        return preferredDelimiter[i];
      }
    }
    return preferredDelimiter[0];
  }

  protected void setStatusInformation(String info) {
    if (statusInfoPresenter != null) statusInfoPresenter.setStatusInformation(info);
    else Logger.getInstance().debug(getClass(), info);
  }
  
  public int getImportAmount() {
    return importCount;
  }

}
