/*
 * Copyright (c) 2002-2013 Christoph Mueller. All rights reserved.
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

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.BufferedReader;
import java.nio.charset.Charset;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import de.must.io.CSVParser;
import de.must.io.Logger;
import de.must.io.TextFileReader;
import de.must.middle.ApplConstStd;

/**
 * Text file reader to access data in text files with fixed column position and 
 * delimiter.
 * @author Christoph Mueller
 */
public class DataTextObjectWithDelimiter extends CSVParser {
  
  private File inputFile;
  private TextFileReader inputFileReader;
  private String openResultText = "";
  protected DateFormat defaultFormat = new SimpleDateFormat(ApplConstStd.CAMELEON_TIMESTAMP_FORMAT);
  protected DateFormat dateFormatddMMyy = new SimpleDateFormat("dd.MM.yy");
  protected DateFormat dateFormatddMMyyyy = new SimpleDateFormat("dd.MM.yyyy");
  protected DateFormat dateFormatyyyyMMdd = new SimpleDateFormat("yyyy-MM-dd");

  /**
   * Constructs an new data text object with the default delimiter ';'
   * @param textFileName the name of the file to open
   */
  public DataTextObjectWithDelimiter(String textFileName) {
    this(textFileName, DEFAULT_DELIMITER);
  }

  /**
   * Constructs an new data text object
   * @param textFileName the name of the file to open
   */
  public DataTextObjectWithDelimiter(String textFileName, char delimiter) {
    this(textFileName, delimiter, (String)null);
  }

  /**
   * Constructs an new data text object
   * @param textFileName the name of the file to open
   * @param charset the Charset to use
   */
  public DataTextObjectWithDelimiter(String textFileName, Charset charset) {
    this(textFileName, DEFAULT_DELIMITER, charset);
  }

  /**
   * Constructs an new data text object
   * @param textFileName the name of the file to open
   * @param encoding the encoding to use
   */
  public DataTextObjectWithDelimiter(String textFileName, char delimiter, String charsetName) {
    this.delimiter = delimiter;
    Charset charset = null;
    if (charsetName != null) {
      charset = Charset.forName(charsetName);
    }
    openFile(textFileName, charset);
  }

  public DataTextObjectWithDelimiter(BufferedReader bure, char delimiter) {
    this.delimiter = delimiter;
    openFile(bure);
  }

  /**
   * Constructs a new data text object
   * @param textFileName the name of the file to open
   * @param charset the Charset to use
   */
  public DataTextObjectWithDelimiter(String textFileName, char delimiter, Charset charset) {
    this.delimiter = delimiter;
    openFile(textFileName, charset);
  }

  /**
   * Whether or not bad quotes should automatically be corrected - will assume ";" starts new column.
   * @param autoCorrectBadQuotes whether or not bad quotes should automatically be corrected
   */
  public void setAutoCorrectBadQuotes(boolean autoCorrectBadQuotes) {
    this.autoCorrectBadQuotes = autoCorrectBadQuotes;
    if (inputFileReader != null) inputFileReader.setAutoCorrectBadQuotes(autoCorrectBadQuotes);
  }

  /**
   * Opens a new text file to read
   * @param textFileName the name of the file to open
   * @param charset the Charset to use
   */
  public void openFile(String textFileName, Charset charset) {
    if (inputFileReader != null) {
      // inputFile.close();
    }
    try {
      inputFile = new File(textFileName);
      inputFileReader = new TextFileReader(inputFile, charset);
      inputFileReader.setAutoCorrectBadQuotes(autoCorrectBadQuotes);
    } catch (FileNotFoundException e) {
      Logger.getInstance().error(getClass(), e);
    }
  }

  public void openFile(BufferedReader bure) {
    inputFileReader = new TextFileReader(bure);
    inputFileReader.setAutoCorrectBadQuotes(autoCorrectBadQuotes);
  }
  
  /**
   * Returns the open result text which is "" if everything is OK.
   * @return the open result text
   */
  public String getOpenResultText() {
    return openResultText;
  }

  /**
   * Moves the pointer to the next line.
   * @return true if a line was found
   */
  public boolean nextRow() {
    fields = null;
    try {
      boolean nextRowResult = inputFileReader.nextLine();
      if (nextRowResult) parseFields(inputFileReader.getLine());
      return nextRowResult;
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
      return false;
    }
  }
  
  /**
   * Closes the file.
   */
  public void close() {
    try {
      inputFileReader.close();
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    }
  }

  /**
   * Delete the text file after closing it.
   */
  public void delete() {
    try {
      inputFileReader.close();
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    }
    inputFile.delete();
  }

}

