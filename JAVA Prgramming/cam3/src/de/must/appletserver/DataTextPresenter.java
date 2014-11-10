/*
 * Copyright (c) 2011 Christoph Mueller. All rights reserved.
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

package de.must.appletserver;

import de.must.dataobj.*;

/**
 * A database connected component to present a text information.
 * @author Christoph Mueller
 */
public abstract class DataTextPresenter {

  protected DataObject assignedDataObject;
  private String columnName;
  private String editBeginValue = "";
  private String value;

  /**
   * Constructs a new integer text field with the specified name and assigned data object.
   * @param columnName the name of the column the text field is to assign to
   * @param assignedDataObject the assigned data object
   */
  public DataTextPresenter(String columnName, DataObject assignedDataObject) {
    this.assignedDataObject = assignedDataObject;
    this.columnName = columnName;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    editBeginValue = assignedDataObject.getTextNoMatterWhatTypeOfColumn(columnName);
    if (editBeginValue != null) editBeginValue = editBeginValue.trim();  // type char has following blanks, this may cause problems while modiyfing copies
    if (editBeginValue == null || editBeginValue.equals("0")) editBeginValue = ""; // for to use TextPresenter as "IntPresenter"
    setText(editBeginValue);
  }
  
  public void setText(String text) {
    value = text;
  }

}