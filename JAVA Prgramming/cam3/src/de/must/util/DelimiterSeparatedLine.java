/*
 * Copyright (c) 2002-2003 Christoph Mueller. All rights reserved.
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

/**
 * Parser for dividing any inputStream by delimiter 
 * @author Christoph Mueller
 */
public class DelimiterSeparatedLine {

  public static final char DEFAULT_COLUMN_DELIMITER = '|';
  private String line;
  private char delimiter;

  /**
   * Constructs an new delimiter separated line with delimiter "|"
   * @param line the line to be separated in fields
   */
  public DelimiterSeparatedLine(String line) {
    this(line, DEFAULT_COLUMN_DELIMITER);
  }

  /**
   * Constructs an new delimiter separated line
   * @param line the line to be separated in fields
   * @param delimiter the delimiter to use
   */
  public DelimiterSeparatedLine(String line, char delimiter) {
    this.line = line;
    this.delimiter = delimiter;
  }

  /**
   * Returns the value of the column as specified by column nbr
   * @param columnNbr the nbr of the column which value should be returned 
   * @return the value of the column of the current line
   */
  public String getText(int columnNbr) {
    int startPos = 0;
    int endPos;
    for (int i = 1; i < columnNbr; i++) {
      startPos = line.indexOf(delimiter, startPos) + 1;
      if (startPos <= 0) return "";
    }
    endPos = line.indexOf(delimiter, startPos);
    if (endPos < 1 || endPos > line.length()) endPos = line.length();
    return line.substring(startPos, endPos);
  }
  
  public String[] toStringArray() {
    char[] chars = line.toCharArray();
    int columnCount = 1;
    for (int i = 0; i < chars.length; i++) {
      if (chars[i] == delimiter) {
        columnCount++;
      }
    }
    String[] result = new String[columnCount];
    for (int i = 0; i < result.length; i++) {
      result[i] = getText(i+1);
    }
    return result;
  }

}

