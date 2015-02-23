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

/**
 * Text input area with mechanism to make input permanent.
 * @author Christoph Mueller
 */
public class DataTextArea extends MustTextArea implements Storable {

  private DataObject assignedDataObject;

  /**
   * Constructs a new data text area with the specified name and assigned data object.
   * @param name the name of the field to be used for markup parameters
   * @param assignedDataObject the assigned data object
   */
  public DataTextArea(String name, DataObject assignedDataObject) {
    this(name, assignedDataObject.getColumnLength(name), assignedDataObject);
  }

  /**
   * Constructs a new data text area with the specified name and assigned data object.
   * @param name the name of the field to be used for markup parameters
   * @param maxlength the maximum number of characters to insert into the text area
   * @param assignedDataObject the assigned data object
   */
  public DataTextArea(String name, int maxlength, DataObject assignedDataObject) {
    super(name, "", maxlength);
    this.assignedDataObject = assignedDataObject;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    setText(assignedDataObject.getText(name).trim());  // type char has following blanks, this may cause problems while modiyfing copies
  }

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    assignedDataObject.setText(name, this.getText());
  }

}
