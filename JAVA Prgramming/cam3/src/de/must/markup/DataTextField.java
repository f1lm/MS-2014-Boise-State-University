/*
 * Copyright (c) 2001 Christoph Mueller. All rights reserved.
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

package de.must.markup;

import de.must.dataobj.*;
import de.must.util.StringFunctions;

/**
 * Text input field with mechanism to make input permanent.
 * @author Christoph Mueller
 */
public class DataTextField extends MustTextField implements Storable {

  private DataObject assignedDataObject;

  /**
   * Constructs a new data text field with the specified name and assigned data object.
   * @param name the name of the field to be used for markup parameters
   * @param assignedDataObject the assigned data object
   */
  public DataTextField(String name, DataObject assignedDataObject) {
    this(name, assignedDataObject.getColumnLength(name), assignedDataObject);
  }

  /**
   * Constructs a new data text field with the specified name, value, size
   * and assigned data object.
   * @param name the name of the field to be used for markup parameters
   * @param size rendering and input conrol relevant size of the text field
   * @param assignedDataObject the assigned data object
   */
  public DataTextField(String name, int size, DataObject assignedDataObject) {
    this (name, size, size, assignedDataObject);
  }

  /**
   * Constructs a new data text field with the specified name, value, size,
   * max length and assigned data object.
   * @param name the name of the field to be used for markup parameters
   * @param size rendering relevant size of the text field
   * @param maxlength input control relevant max length of the text field
   * @param assignedDataObject the assigned data object
   */
  public DataTextField(String name, int size, int maxlength, DataObject assignedDataObject) {
    super(name, "", size, maxlength);
    this.assignedDataObject = assignedDataObject;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    setText(StringFunctions.rtrim(assignedDataObject.getText(name)));  // type char has following blanks, this may cause problems while modiyfing copies
  }

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    assignedDataObject.setText(name, this.getText());
  }

}
