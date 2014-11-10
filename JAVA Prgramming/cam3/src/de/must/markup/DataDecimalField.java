/*
 * Copyright (c) 2002 Christoph Mueller. All rights reserved.
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
 * Text input field for double values with mechanism to make input permanent.
 * @author Christoph Mueller
 */
public class DataDecimalField extends MustDecimalField implements Storable {

  private DataObject assignedDataObject;
  private String columnName;

 /**
   *
   * @param dO the data object to assign to
   * @param columnName the name of the column the text field is to assign to
   */
  public DataDecimalField(DataObject dO, String columnName) {
    assignedDataObject = dO;
    this.columnName = columnName;
  }

 /**
   * Returns the assigned data object.
   * @return the assigned data object
   */
  public DataObject getAssignedDataObject() {
    return assignedDataObject;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    double exactValue = assignedDataObject.getDouble(columnName);
    String editBeginText = decimalFieldFormat.format(exactValue);
    this.setText(editBeginText);
    try {
      editBeginValue = getDoubleValue();
    } catch (Exception ex) {}
   }

//------------------------------------------------------------------------------

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    if (isModified()) {
      try {
        double dv = getDoubleValue();
        assignedDataObject.setDouble(columnName, dv);
      }
      catch (Exception ex) {
        de.must.io.Logger.getInstance().error(getClass(), ex);
      }
    }
  }

 /**
   * Releases external resources.
   */
  public void free() {
    assignedDataObject = null;
  }

}
