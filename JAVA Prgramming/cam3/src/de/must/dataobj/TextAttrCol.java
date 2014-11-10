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

/**
 * Tool to access attributes in textfiles with fixed position and length.
 * @author Christoph Mueller
 * @see DataTextObject
 */
public class TextAttrCol {

  private String columnName;
  private int position;
  private int length;

  /**
   * Constructs a new text attribute column with the specified column name,
   * postition and length.
   * @param columnName the name of the column
   * @param position the position in the line, where the attribute value starts
   * @param length the length of the position
   */
  public TextAttrCol(String columnName, int position, int length) {
    this.columnName = columnName;
    this.position = position;
    this.length = length;
  }

  /**
   * Returns the column name
   * @return the column name
   */
  public String getColumnName() {
    return columnName;
  }

  /**
   * Returns the column position
   * @return the column position
   */
  public int getPosition() {
    return position;
  }

  /**
   * Returns the column length
   * @return the column length
   */
  public int getLength() {
    return length;
  }

  /**
   * Returns the begin index to separate the columns' value by method substring
   * @return the begin index to separate the columns' value by method substring
   */
  public int getBeginIndex() {
    return position - 1;
  }

  /**
   * Returns the end index to separate the columns' value by method substring
   * @return the end index to separate the columns' value by method substring
   */
  public int getEndIndex() {
    return position + length - 1;
  }

}
