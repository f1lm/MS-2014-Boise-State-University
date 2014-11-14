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
 * @author Christoph Mueller
 */
public class DataVariableChoice extends VariableChoice implements Storable {

  private DataObject assignedDataObject;
  private String assignedColumnName;
  protected String editBeginSelected;
  private boolean encoded;

  /**
   * Constructs a new data assigned variable choice.
   * @param assignedDataObject the assigned data object
   * @param name the name of the field to be used for markup parameters
   * @param content the content of the data object with key and meaning
   */
  public DataVariableChoice(DataObject assignedDataObject, String name, String[][] content) {
    super(name, content);
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = name;
    encoded = true;
  }

  /**
   * Constructs a new data assigned variable choice.
   * @param assignedDataObject the assigned data object
   * @param name the name of the field to be used for markup parameters
   * @param content the content of the data object with content to be stored directly (not keyed)
   */
  public DataVariableChoice(DataObject assignedDataObject, String name, String[] content) {
    super(name, content);
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = name;
    encoded = false;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    editBeginValue = assignedDataObject.getText(assignedColumnName);
    if (encoded) setSelectedItemKey(editBeginValue);
    else setSelected(editBeginValue);
    editBeginSelected = selected;
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    return (!selected.equals(editBeginSelected));
  }

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    if (encoded) assignedDataObject.setText(assignedColumnName, getSelectedItemKey());
    else assignedDataObject.setText(assignedColumnName, getSelectedItem());
  }

}