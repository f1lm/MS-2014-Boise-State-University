/*
 * Copyright (c) 2014 Christoph Mueller. All rights reserved.
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

import de.must.wuic.SearchElement;

/**
 * Search item to be used with SearchElement.
 * @author Christoph Müller
 */
public class SearchItem extends KeyValuePairAlpha {
  
  private String preamble;
  private int type = SearchElement.TYPE_TEXT;
  
  /**
   * Constructs a new search item with type text.
   * @param displayItem  the combo box item to be displayed
   * @param searchColumnName  the name of the column associated with the item
   */
  public SearchItem(String displayItem, String searchColumnName) {
    this(displayItem, searchColumnName, SearchElement.TYPE_TEXT, null);
  }
  
  /**
   * Constructs a new search item.
   * @param displayItem  the combo box item to be displayed
   * @param searchColumnName  the name of the column associated with the item
   * @param type  the column type 
   * @see SearchElement#TYPE_TEXT
   * @see SearchElement#TYPE_NUMERIC
   * @see SearchElement#TYPE_DATE
   */
  public SearchItem(String displayItem, String searchColumnName, int type) {
    this(displayItem, searchColumnName, type, null);
  }
  
  /**
   * Constructs a new search item with type text.
   * @param displayItem  the combo box item to be displayed
   * @param searchColumnName  the name of the column associated with the item
   * @param preamble  the preamble to be placed before the search fragment to be constructed, e.g. "myID in (select foreignID from AnotherTable where " - bracket may be closed automatically
   */
  public SearchItem(String displayItem, String searchColumnName, String preamble) {
    this(displayItem, searchColumnName, SearchElement.TYPE_TEXT, preamble);
  }
  
  /**
   * Constructs a new search item.
   * @param displayItem  the combo box item to be displayed
   * @param searchColumnName  the name of the column associated with the item
   * @param type  the column type 
   * @see SearchElement#TYPE_TEXT
   * @see SearchElement#TYPE_NUMERIC
   * @see SearchElement#TYPE_DATE
   * @param preamble  the preamble before the search fragment to be constructed, e.g. "myID in (select foreignID from AnotherTable where " - bracket may be closed automatically
   */
  public SearchItem(String displayItem, String searchColumnName, int type, String preamble) {
    super(searchColumnName, displayItem);
    this.preamble = preamble;
    this.type = type;
  }
  
  /**
   * Returns the preamble before the search fragment to be constructed
   * @return the preamble before the search fragment to be constructed
   */
  public String getPreamble() {
    return preamble;
  }
  
  /**
   * Returns the type of this search item.
   * @return the type of this search item
   * @see SearchElement#TYPE_TEXT
   * @see SearchElement#TYPE_NUMERIC
   * @see SearchElement#TYPE_DATE
   */
  public int getType() {
    return type;
  }
  
}
