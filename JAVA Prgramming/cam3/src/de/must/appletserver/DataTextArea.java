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
import de.must.middle.GlobalStd;
import de.must.util.StringFunctions;

/**
 * Text input field with mechanism to make input permanent.
 * @author Christoph Mueller
 */
public class DataTextArea extends MustTextArea implements Storable, InlayCenterContent {

  private DataObject assignedDataObject;
  private String columnName;

  /**
   * Constructs a new database connected TextArea.
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   */
  public DataTextArea(SessionData sessionData, DataObject dO, String columnName) {
    this(sessionData, 9999999, dO, columnName);
  }

  /**
   * Constructs a new database connected TextArea.
   * @param maxChars input control relevant max character length of the text field
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   */
  public DataTextArea(SessionData sessionData, int maxChars, DataObject dO, String columnName) {
    this(sessionData, maxChars, dO, columnName, 3);
  }

  /**
   * Constructs a new database connected TextArea.
   * @param maxChars input control relevant max character length of the text field
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   * @param rows the name of the row the text field is to assign to
   */
  public DataTextArea(SessionData sessionData, int maxChars, DataObject dO, String columnName, int rows) {
    super(sessionData, rows, 60, maxChars);
    assignedDataObject = dO;
    this.columnName = columnName;
    if (GlobalStd.readOnly) setEditable(false);
  }
  
  @Override
  public DataObject getAssignedDataObject() {
    return assignedDataObject;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    setText(StringFunctions.rtrim(assignedDataObject.getText(columnName)));  // type char has following blanks, this may cause problems while modifying copies
  }

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    assignedDataObject.setText(columnName, getText());
  }

}
