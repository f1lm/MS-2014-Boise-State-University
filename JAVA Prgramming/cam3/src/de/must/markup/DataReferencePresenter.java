/*
 * Copyright (c) 2001-2008 Christoph Mueller. All rights reserved.
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
import de.must.io.Logger;

/**
 * Database connected reference presenter.
 * @author Christoph Mueller
 */
public class DataReferencePresenter extends MustReferencePresenter implements Presentable {

  private static final boolean showKey = false;
  private DataObject assignedDataObject;
  private String assignedColumnName;

  /**
   * Constructs a new database connected reference presenter for dynamic content.
   * @param assignedDataObject the assigned data object
   * @param assignedColumnName the name of the reference containing column
   * @param referenceDataObject the data object to read the reference
   * @param printableColumnName the name of the column which value is to be presented to the user
   */
  public DataReferencePresenter(DataObject assignedDataObject, String assignedColumnName, DataObject referenceDataObject, String printableColumnName) {
    super(referenceDataObject, printableColumnName);
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = assignedColumnName;
    if (referenceDataObject.getIdentifyTemplate().getIdentifyType() == IdentifyTemplate.IDENTIFIED_BY_STRING) {
      referenceType = REFERENCE_TYPE_STRING;
    }
  }

  /**
   * Constructs a new database connected reference presenter for static content.
   * @param assignedDataObject the assigned data object
   * @param assignedColumnName the name of the reference containing column
   * @param content the static content to resolve the reference, each row ist a couple of key and value to be shown to the user
   */
  public DataReferencePresenter(DataObject assignedDataObject, String assignedColumnName, String[][] content) {
    super(content);
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = assignedColumnName;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    String referenceText;
    switch (referenceType) {
    case REFERENCE_TYPE_STATIC_CONTENT:
      referenceText = assignedDataObject.getText(assignedColumnName);
      String textToPresent = "";
      for (int i = 0; i < content.length; i++) {
        if (content[i][0].equals(referenceText)) textToPresent = getItem(i);
      }
      setText(textToPresent);
      break;
    case REFERENCE_TYPE_STRING:
      referenceText = assignedDataObject.getText(assignedColumnName);
      textToPresent = "";
      if (referenceDataObject.load(referenceText)) {
        textToPresent = referenceDataObject.getText(printableColumnName).trim();
      } else {
        Logger.getInstance().error(getClass(), "database inconsistency in  " + referenceDataObject.getTableName()); // we don't like NullPointerExceptions in servlet engine
      }
      setText(textToPresent);
      break;
    default:
      int referenceNbr = assignedDataObject.getInt(assignedColumnName);
      if (referenceNbr == 0) setText("");
      else {
        textToPresent = "";
        if (referenceDataObject.load(referenceNbr)) {
          textToPresent = referenceDataObject.getText(printableColumnName).trim();
        } else {
          Logger.getInstance().error(getClass(), "database inconsistency in  " + referenceDataObject.getTableName()); // we don't like NullPointerExceptions in servlet engine
        }
        setText(textToPresent);
      }
      break;
    }
  }

  private String getItem(int i) {
    if (showKey) return content[i][0] + " = " + content[i][1];
    else return content[i][1];
  }

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}
