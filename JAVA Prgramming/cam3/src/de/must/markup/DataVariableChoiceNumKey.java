/*
 * Copyright (c) 2001-2004 Christoph Mueller. All rights reserved.
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
import de.must.util.KeyValuePairNum;

/**
 * Equivalent to a JComboBox with statically filled content with keys - assigned to a table row.
 * @author Christoph Mueller
 */
public class DataVariableChoiceNumKey extends VariableChoiceNumKey implements Storable {

  private DataObject assignedDataObject;
  private String assignedColumnName;
  private boolean encoded;

  /**
   * Constructs a new data assigned variable choice.
   * @param assignedDataObject the assigned data object
   * @param name the name of the field to be used for markup parameters
   * @param keyValuePairs the content of the data object with key and meaning
   */
  public DataVariableChoiceNumKey(DataObject assignedDataObject, String name, KeyValuePairNum[] keyValuePairs) {
    super(name, keyValuePairs);
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = name;
    encoded = true;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    editBeginValue = assignedDataObject.getInt(assignedColumnName);
    if (encoded) setSelectedItemKey(editBeginValue);
    else setSelectedItemKey(editBeginValue);
  }

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    if (encoded) assignedDataObject.setInt(assignedColumnName, getSelectedItemKey());
    else assignedDataObject.setText(assignedColumnName, getSelectedItem());
  }

}