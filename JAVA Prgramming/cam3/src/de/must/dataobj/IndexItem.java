/*
 * Copyright (c) 1999-2007 Christoph Mueller. All rights reserved.
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
 * Index items to define database indices.
 * @author Christoph Mueller
 * @see Index
 * @see DataObject
 */
public class IndexItem {

public static final int ASCENDING = 0;
public static final int DESCENDING = 1;

private String fieldName;
private int sortType;

  /**
   * Constructs an new ascending index item with the specified field name.
   * @param fieldName the name of the field to be indexed.
   */
  public IndexItem(String fieldName) {
    this(fieldName, ASCENDING);
  }
  
  /**
   * Constructs an new index item with the specified field name and sort type.
   * @param fieldName the name of the field to be indexed.
   * @param sortType the sort type which may be <code>{@link #ASCENDING}</code>
   * or <code>{@link #DESCENDING}</code>
   */
  public IndexItem(String fieldName, int sortType) {
    this.fieldName = fieldName;
    this.sortType = sortType;
  }

  /**
   * Returns the field name of the index
   * @return the field name
   */
  public String getFieldName() {
    return fieldName;
  }

  /**
   * Returns the sort type
   * @return the sort type
   */
  public int getSortType() {
    return sortType;
  }

}
