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

import de.must.io.Logger;

/**
 * Native interface to Word for Windows. Simple version as presented via Internet.
 * To create a new document and to serve bookmarks by your java application
 * code like this:
 * <pre>
 *       WordProcessing.createNewDocumentFromTemplate("SampleTemplate");
 *       WordProcessing.typeTextAtBookmark("AddressLine1", "O'Reilly & Associated, Inc.");
 *       WordProcessing.typeTextAtBookmark("AddressLine2", "Mr Miller");
 *       WordProcessing.typeTextAtBookmark("AddressLine3", "101 Moris Street");
 *       WordProcessing.typeTextAtBookmark("AddressLine4", "Sebastopol, CA 95472-9902");
 *       WordProcessing.typeTextAtBookmark("Salutation", "Dear Mr Miller,");
 *       WordProcessing.exec();
 * </pre>
 *
 * @version 1.1 01/21/00
 * @author Christoph Mueller
 * @see InteractiveWordProcessing
 * @see BatchWordProcessing
 */
public class WordProcessing {

  // define your standard:
  private static final boolean noteNotMatchingBookmarks = true; // shall the user be informed that certain bookmarks weren't found in the template?
  // end of standard definition

  private static File wordInput;
  private static FileWriter wordInputWriter;

  /**
   * Triggers to the template selection dialog and creates a new document
   * based on the chosen template.
   */
  public static void createNewDocumentFromTemplateToSelectByUser() {
    output("@createNewDocumentFromTemplate", "TEMPLATE_TO_SELECT_BY_USER");
  }

  /**
   * Creates a new document based on the desired template.
   * @param templateName the name of the template to be used
   */
  public static void createNewDocumentFromTemplate(String templateName) {
    output("@createNewDocumentFromTemplate", templateName);
  }

  /**
   * Set the warning flag about not matching bookmarks
   * Decides whether the user shall be informed that the template didn't
   * include certain bookmarks.
   * @param noteNotMatchingBookmarks whether the user should be warned
   */
  public static void setNoteNotMatchingBookmarks(boolean noteNotMatchingBookmarks) {
    if (noteNotMatchingBookmarks) output("@noteNotMatchingBookmarks", "TRUE");
    else output("@noteNotMatchingBookmarks", "FALSE");
  }

  /**
   * Goes to the specified bookmark and types the desired text.
   * @param bookmark the bookmark where text type starts
   * @param textToType the text to be included
   */
  public static void typeTextAtBookmark(String bookmark, String textToType) {
    output(bookmark, textToType);
  }

  /**
   * Goes to the specified bookmark and types the desired text with line feed.
   * @param bookmark the bookmark where text type starts
   * @param linesToType the lines to be included
   */
  public static void typeTextAtBookmark(String bookmark, String[] linesToType) {
    StringBuffer textToType = new StringBuffer();
    for (int i=0; i < linesToType.length; i++) {
      textToType.append(linesToType[i] + "\n");
    }
    output(bookmark, new String(textToType));
  }

  private static synchronized String replaceAll(String stringToManipulate, String stringToReplace, String replaceString) {
    int lineStartPosition = 0;
    int searchPos = -1;
    StringBuffer resultString = new StringBuffer();
    while((searchPos = stringToManipulate.indexOf(stringToReplace, lineStartPosition)) > -1) {
      resultString.append(stringToManipulate.substring(lineStartPosition, searchPos) + replaceString);
      lineStartPosition = searchPos + stringToReplace.length();
    }
    resultString.append(stringToManipulate.substring(lineStartPosition));
    return resultString.toString();
  }

  /**
   * Sets the document directory for future document saving.
   * @param documentDirectory the name of the directory
   */
  public static void changeDocumentDirectory(String documentDirectory) {
    output("@changeDocumentDirectory", documentDirectory);
  }

  /**
   * Saves the active document using the indicated name
   * (usually without extension).
   * @param documentName the name of the document
   */
  public static void saveDocumentAs(String documentName) {
    output("@saveDocumentAs", documentName);
  }

  /**
   * Saves the active document using the indicated name and closes it.
   * @param documentName the name of the document
   */
  public static void saveDocumentAsAndClose(String documentName) {
    output("@saveDocumentAsAndClose", documentName);
  }

  /**
   * Closes the active document.
   */
  public static void closeDocument() {
    output("@closeDocument", "");
  }

  /**
   * Prints the document on the standard printer and closes the document without saving.
   */
  public static void printAndForget() {
    output("@printAndForget", "");
  }

  /**
   * Prints the document on the specified printer and closes the document without saving.
   * @param printerName the name of the desired printer
   */
  public static void printAndForget(String printerName) {
    output("@printAndForget", printerName);
  }

  /**
   * Triggers to the printer selection dialog, prints the document
   * on the selected printer and closes the document without saving.
   */
  public static void printToPrinterToSelectByUserAndForget() {
    output("@printAndForget", "PRINTER_TO_SELECT_BY_USER");
  }

  /**
   * Executes an arbitrary WordBasic macro.
   * @param macroName the name of the macro to be executed
   */
  public static void executeMacro(String macroName) {
    output("@executeMacro", macroName);
  }

  /**
   * Quits the word processing application.
   */
  public static void quitApplication() {
    output("@quitApplication", "");
  }

  /**
   * Quits the word processing application after a pause.
   * This gives the word processing time to finish e.g. a print job.
   * This avoids dialogs by the word processing system whether the print job is to stop
   * @param milliseconds waiting time in milliseconds prior leaving application
   */
  public static void quitApplicationAfterWaiting(int milliseconds) {
    output("@quitApplicationAfterWaiting", String.valueOf(milliseconds));
  }

  /**
   * Starts the execution of the above instructions.
   * (This stacking is particularly helpful at large numbers of standard letters.)
   * Always use use this as the last method of a sequence.
   * @return
   */
  public static boolean exec() {
    closeWordInput();
    String cmd;
    cmd = "WordAPI.exe";
    try {
      Runtime.getRuntime().exec(cmd).waitFor();
    }
    catch (Exception e) {
      Logger.getInstance().error(WordProcessing.class, e);
      System.out.println(cmd + " could not be executed.");
      System.out.println("Please ensure that WordAPI.exe may be found by java.exe by putting it in an appropriate directory.");
      return false;
    }
    return true;
  }

  /**
   * Cancels the word processing.
   */
  public static void cancel() {
    if (wordInputWriter != null) closeWordInput();
  }

  private static void output(String key, String value) {
    String record;
    record = key;
    while (record.length() < 40) record += " ";
    record += value;
    if (wordInputWriter == null) {
      if (!openWordInput()) return;
    }
    try {
      wordInputWriter.write(record + "\r\n");
      wordInputWriter.flush();
    }
    catch ( IOException e2 ) {
      System.out.println( "caught: " + e2 );
    }
  }

  private static boolean openWordInput() {
    try {
      wordInput = new File("WordInp.txt");
      wordInputWriter = new FileWriter(wordInput);
      setNoteNotMatchingBookmarks(noteNotMatchingBookmarks);
    }
    catch ( IOException e2 ) {
      System.out.println( "caught: " + e2 );
      System.out.println("could not open interface file WordInp.txt");
      return false;
    }
    return true;
  }

  private static void closeWordInput() {
    try {
      wordInputWriter.close();
      wordInput = null;
      wordInputWriter = null;
    }
    catch ( IOException e2 ) {
      System.out.println( "caught: " + e2 );
    }
  }

}
