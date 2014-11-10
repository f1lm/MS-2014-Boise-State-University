/*
 * Copyright (c) 1999-2001 Christoph Mueller. All rights reserved.
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

import de.must.io.*;

/**
 * Text file reader to access data in text files with fixed column position and 
 * length as described by an array of TextAttrCol
 * @author Christoph Mueller
 * @see DataUtil
 * @see TextAttrCol
 */
public abstract class DataTextObject {

  private TextFile inputFile;

  /**
   * Constructs an new data text object
   */
  public DataTextObject() {
  }

  /**
   * Constructs an new data text object
   * @param textFileName the name of the file to open
   */
  public DataTextObject(String textFileName) {
    openFile(textFileName);
  }

  /**
   * Opens a new text file
   * @param textFileName the name of the file to open
   */
  public void openFile(String textFileName) {
    if (inputFile != null) {
      // inputFile.close();
    }
    inputFile = new TextFile(textFileName /*, TextFile.ENCODING_ASCII */);
  }

  /**
   * Moves the pointer to the next line.
   * @return true if a line was found
   */
  public boolean nextRow() {
    return inputFile.nextLine();
  }

  /**
   * Returns the column description of the file
   * @return the column description of the file
   */
  public abstract TextAttrCol[] getTextAttrCols();

  /**
   * Returns the value of the column as specified by column name
   * @param columnName the name of the column which value should be returned 
   * @return the value of the column of the current line
   */
  public String getText(String columnName) {
    for (int i = 0; i < getTextAttrCols().length; i++) {
      if (getTextAttrCols()[i].getColumnName().equals(columnName)) {
        if (getTextAttrCols()[i].getBeginIndex() > inputFile.getLine().length()) return "";
        int endpos = getTextAttrCols()[i].getEndIndex();
        if (endpos > inputFile.getLine().length()) endpos = inputFile.getLine().length();
        return inputFile.getLine().substring(getTextAttrCols()[i].getBeginIndex(), endpos).trim();
      }
    }
    return ("");
  }

}
