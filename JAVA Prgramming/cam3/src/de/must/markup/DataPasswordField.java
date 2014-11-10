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
import de.must.util.Crypt;

/**
 * @author Christoph Mueller
 */
public class DataPasswordField extends MustPasswordField implements Storable {

  private DataObject assignedDataObject;
  private boolean storageEncrypted = false;
  private String editBeginValue = "";

  /**
   *
   * @param name the name of the field to be used for markup parameters
   * @param assignedDataObject the assigned data object
   */
  public DataPasswordField(String name, DataObject assignedDataObject) {
    this(name, assignedDataObject.getColumnLength(name), assignedDataObject);
  }

  /**
   *
   * @param name the name of the field to be used for markup parameters
   * @param size rendering relevant size of the text field
   * @param assignedDataObject the assigned data object
   */
  public DataPasswordField(String name, int size, DataObject assignedDataObject) {
    this (name, size, size, assignedDataObject);
  }

  /**
   *
   * @param name the name of the field to be used for markup parameters
   * @param size rendering relevant size of the text field
   * @param maxlength input control relevant max length of the text field
   * @param assignedDataObject the assigned data object
   */
  public DataPasswordField(String name, int size, int maxlength, DataObject assignedDataObject) {
    super(name, "", size, maxlength);
    this.assignedDataObject = assignedDataObject;
  }

  /**
   * Sets the flag that password is to be stored encrypted.
   * @param storageEncrypted whether password is to be stored encrypted or not
   */
  public void setStorageEncrypted(boolean storageEncrypted) {
    this.storageEncrypted = storageEncrypted;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    editBeginValue = assignedDataObject.getText(name).trim();  // type char has following blanks, this may cause problems while modiyfing copies
    if (storageEncrypted) Crypt.decrypt(editBeginValue);
    this.value = editBeginValue;
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    return(!this.getText().equals(editBeginValue));
  }

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    String passwordToStore = getText();
    if (storageEncrypted) passwordToStore = Crypt.encrypt(getText());
    assignedDataObject.setText(name, passwordToStore);
  }

}
