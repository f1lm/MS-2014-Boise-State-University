/*
 * Copyright (c) 2011-2012 Christoph Mueller. All rights reserved.
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
import de.must.util.StringFunctions;

/**
 * Text input field with mechanism to make input permanent.
 * @author Christoph Mueller
 */
public class DataTextField extends MustTextField implements DataTextComponent {

  private DataObject assignedDataObject;
  private String columnName;

  /**
   * Constructs a new data text field with the specified name and assigned data object.
   * @param name the name of the field
   * @param assignedDataObject the assigned data object
   */
  public DataTextField(SessionData sessionData, String columnName, DataObject assignedDataObject) {
    this(sessionData, columnName, assignedDataObject.getColumnLength(columnName), assignedDataObject);
    this.columnName = columnName;
  }

  /**
   * Constructs a new data text field with the specified name, value, size
   * and assigned data object.
   * @param name the name of the field
   * @param size rendering and input control relevant size of the text field
   * @param assignedDataObject the assigned data object
   */
  public DataTextField(SessionData sessionData, String columnName, int size, DataObject assignedDataObject) {
    this(sessionData, columnName, size, size, assignedDataObject);
  }

  /**
   * Constructs a new data text field with the specified name, value, size,
   * max length and assigned data object.
   * @param name the name of the field
   * @param size rendering relevant size of the text field
   * @param maxlength input control relevant max length of the text field
   * @param assignedDataObject the assigned data object
   */
  public DataTextField(SessionData sessionData, String columnName, int size, int maxlength, DataObject assignedDataObject) {
    super(sessionData, size, maxlength);
    this.assignedDataObject = assignedDataObject;
    this.columnName = columnName;
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
    assignedDataObject.setText(columnName, this.getText());
  }

}
