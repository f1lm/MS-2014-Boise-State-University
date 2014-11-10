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

package de.must.util;

import java.io.*;

import de.must.middle.GlobalStd;

/**
 * Native interface to Word for Windows.
 * @author Christoph Mueller
 */
public abstract class AbstractWordProcessing {

  // define your standard:
  private static final boolean noteNotMatchingBookmarks = true; // shall the user be informed that certain bookmarks weren't found in the template?
  // end of standard definition

  private String inputFileName;
  private String logFileName;
  private File wordInputFile;
  private FileWriter wordInputWriter;
  private boolean waitForExecution;

  /**
   * Creates word processing driver.
   */
  public AbstractWordProcessing() throws IOException {
    this(GlobalStd.getUserTempDir() + File.separatorChar + "WordInp.txt");
  }

  /**
   * Creates word processing driver. Only current folder supported, yet.
   * @param inputFileName the name of the input file to be used by the driver
   */
  private AbstractWordProcessing(String inputFileName) throws IOException {
    this(inputFileName, System.getProperty("user.home") + "/SWordAPI.log");
  }

  /**
   * Creates word processing driver.
   * @param inputFileName the name of the input file to be used by the driver
   * @param logFileName the name of the log file to be used by the driver
   */
  public AbstractWordProcessing(String inputFileName, String logFileName) throws IOException {
    this.inputFileName = inputFileName;
    this.logFileName = logFileName;
    openWordInput();
  }

  /**
   * Set the flag whether or not the application should wait until process is finished.
   * @param waitForExecution whether or not the application should wait until process is finished
   */
  public void setWaitForExecution(boolean waitForExecution) {
    this.waitForExecution = waitForExecution;
  }

  /**
   * Creates a new document based on the desired template.
   * @param templateName the name of the template to be used
   */
  public void createNewDocumentFromTemplate(String templateName) {
    output("@createNewDocumentFromTemplate", templateName);
  }

  /**
   * Set the warning flag about not matching bookmarks
   * Decides whether the user shall be informed that the template didn't
   * include certain bookmarks.
   * @param noteNotMatchingBookmarks whether the user should be warned
   */
  public void setNoteNotMatchingBookmarks(boolean noteNotMatchingBookmarks) {
    if (noteNotMatchingBookmarks) output("@noteNotMatchingBookmarks", "TRUE");
    else output("@noteNotMatchingBookmarks", "FALSE");
  }
  
  /**
   * Starts working with table 1.
   * Place bookmarks into table header row of your word template.
   * It is recommended to have one data row in your table.
   * Thus, different fonts may be used in header and data rows.
   * In consequence, it is necessary to call {@link #newRow()} from the second row on.
   * @see #newRow() 
   * @see #endWorkingWithTable()
   */
  public void beginWorkingWithTable() {
    beginWorkingWithTable(1);
  }
  
  /**
   * Starts working with table to be specified.
   * Place bookmarks into table header row of your word template.
   * It is recommended to have one data row in your table.
   * Thus, different fonts may be used in header and data rows.
   * In consequence, it is necessary to call {@link #newRow()} from the second row on.
   * @param index the index of the table to work with, beginning with 1
   * @see #newRow() 
   * @see #endWorkingWithTable() 
   */
  public void beginWorkingWithTable(int index) {
    output("@tableBegin", "");
  }
  
  /**
   * Tells WordAPI to place bookmark text into a new table row.
   */
  public void newRow() {
    output("@newRow", "");
  }

  /**
   * Starts working with table.
   */
  public void endWorkingWithTable() {
    output("@tableEnding", "");
  }

  /**
   * Goes to the specified bookmark and types the desired text.
   * @param bookmark the bookmark where text type starts
   * @param textToType the text to be included
   */
  public void typeTextAtBookmark(String bookmark, String textToType) {
    output(bookmark, code(textToType));
  }

  /**
   * Goes to the specified bookmark and types the desired text with line feed.
   * @param bookmark the bookmark where text type starts
   * @param linesToType the lines to be included
   */
  public void typeTextAtBookmark(String bookmark, String[] linesToType) {
    StringBuffer textToType = new StringBuffer();
    for (int i=0; i < linesToType.length; i++) {
      textToType.append(linesToType[i] + "\n");
    }
    output(bookmark, code(new String(textToType)));
  }

  private String code(String stringToCode) {
    // return StringFunctions.replaceAll(stringToCode, "\n", "#13"); // no good / not necessary since Word 2000
    return stringToCode;
  }

  /**
   * Sets the document directory for future document saving.
   * @param documentDirectory the name of the directory
   */
  public void changeDocumentDirectory(String documentDirectory) {
    output("@changeDocumentDirectory", documentDirectory);
  }

  /**
   * Saves the active document using the indicated name
   * (usually without extension).
   * @param documentName the name of the document
   */
  public void saveDocumentAs(String documentName) {
    output("@saveDocumentAs", documentName);
  }

  /**
   * Saves the active document using the indicated name and closes it.
   * @param documentName the name of the document
   */
  public void saveDocumentAsAndClose(String documentName) {
    output("@saveDocumentAsAndClose", documentName);
  }

  /**
   * Closes the active document.
   */
  public void closeDocument() {
    output("@closeDocument", "");
  }

  /**
   * Prints the document on the standard printer and closes the document without saving.
   */
  public void printAndForget() {
    output("@printAndForget", "");
  }

  /**
   * Prints the document on the specified printer and closes the document without saving.
   * @param printerName the name of the desired printer
   */
  public void printAndForget(String printerName) {
    output("@printAndForget", printerName);
  }

  /**
   * Executes an arbitrary WordBasic macro.
   * @param macroName the name of the macro to be executed
   */
  public void executeMacro(String macroName) {
    output("@executeMacro", macroName);
  }

  /**
   * Quits the word processing application.
   */
  public void quitApplication() {
    output("@quitApplication", "");
  }

  /**
   * Quits the word processing application after a pause.
   * This gives the word processing time to finish e.g. a print job.
   * This avoids dialogs by the word processing system whether the print job is to stop
   * @param milliseconds waiting time in milliseconds prior leaving application
   */
  public void quitApplicationAfterWaiting(int milliseconds) {
    output("@quitApplicationAfterWaiting", String.valueOf(milliseconds));
  }

  protected void output(String key, String value) {
    String record;
    record = key;
    while (record.length() < 40) record += " ";
    record += value;
    try {
      if (wordInputWriter == null) openWordInput();
      wordInputWriter.write(record + "\r\n");
      wordInputWriter.flush();
    }
    catch (IOException ioe) {
      de.must.io.Logger.getInstance().error(getClass(), ioe);
    }
  }

  private void openWordInput() throws IOException {
    try {
      wordInputFile = new File(inputFileName);
      wordInputWriter = new FileWriter(wordInputFile);
      setNoteNotMatchingBookmarks(noteNotMatchingBookmarks);
    }
    catch (IOException ioe) {
      de.must.io.Logger.getInstance().info(getClass(), "could not open interface file WordInp.txt");
      de.must.io.Logger.getInstance().error(getClass(), ioe);
      throw ioe;
    }
  }

  private void closeWordInput() {
    try {
      wordInputWriter.close();
      wordInputWriter = null;
      wordInputFile = null;
    }
    catch (IOException ioe) {
      de.must.io.Logger.getInstance().error(getClass(), ioe);
    }
  }

  /**
   * Starts the execution of the above instructions.
   * (This stacking is particularly helpful at large numbers of standard letters.)
   * Always use use this as the last method of a sequence.
   */
  public void exec() {
    closeWordInput();
    String cmd;
    cmd = "bin\\" + getDriverExecutableName();
    cmd += " InputFileName[" + inputFileName + "]";
    cmd += " LogFileName[" + logFileName + "]";
    try {
      if (waitForExecution) {
        Runtime.getRuntime().exec(cmd).waitFor();
      } else {
        Runtime.getRuntime().exec(cmd);
      }
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
      de.must.io.Logger.getInstance().info(getClass(), cmd + " could not be executed.");
      de.must.io.Logger.getInstance().info(getClass(), "Please ensure that WordAPI.exe may be found by java.exe by putting it in an appropriate directory.");
    }
  }

  protected abstract String getDriverExecutableName();

  /**
   * Closes files.
   */
  protected void finalize() throws Throwable {
    if (wordInputFile != null) closeWordInput();
    super.finalize();
  }

}
