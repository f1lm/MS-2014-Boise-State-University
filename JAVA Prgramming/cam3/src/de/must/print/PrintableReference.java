/*
 * Copyright (c) 2002-2010 Christoph Mueller. All rights reserved.
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

package de.must.print;

import de.must.dataobj.*;

/**
 * A database connected component to print referential attributes of an entry.
 * @author Christoph Mueller
 */
public class PrintableReference implements PrintableColumn {

  private DataObject assignedDataObject;
  private DataObject referenceDataObject;
  private String assignedColumnName;
  private String printableColumnName;
  private String label;
  private String value;
  protected String[] keys;
  protected String[] meanings;
  /**
   * Constructs a new printable reference component.
   * @param assignedDataObject assigned data object
   * @param assignedColumnName the name of the column to connect to
   * @param label the label of the new line
   * @param referenceDataObject the reference data object
   * @param printableColumnName the name of the column to be printed
   */
  public PrintableReference(DataObject assignedDataObject, String assignedColumnName, String label, DataObject referenceDataObject, String printableColumnName) {
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = assignedColumnName;
    this.label = label;
    this.referenceDataObject = referenceDataObject;
    this.printableColumnName = printableColumnName;
  }

  /**
   * Constructs a new printable reference component.
   * @param assignedDataObject assigned data object
   * @param assignedColumnName the name of the column to connect to
   * @param label the label of the new line
   * @param keys the tokens of the printable reference
   * @param meanings the meaning of the keyed information to be printed
   */
  public PrintableReference(DataObject assignedDataObject, String assignedColumnName, String label, String[] keys, String[] meanings) {
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = assignedColumnName;
    this.label = label;
    this.keys = keys;
    this.meanings = meanings;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    value = ""; // default value
  	if (referenceDataObject != null) {
      switch (referenceDataObject.getIdentifyTemplate().getIdentifyType()) {
      case IdentifyTemplate.IDENTIFIED_BY_INT:
        int referenceNbr = assignedDataObject.getInt(assignedColumnName);
        if (referenceNbr > 0) {
          referenceDataObject.load(referenceNbr);
          value = referenceDataObject.getText(printableColumnName).trim();
        }
        break;
      case IdentifyTemplate.IDENTIFIED_BY_STRING:
        String referenceId = assignedDataObject.getText(assignedColumnName);
        if (referenceId.trim().length() > 0) {
          referenceDataObject.load(referenceId);
          value = referenceDataObject.getText(printableColumnName).trim();
        }
        break;
      }
  	} else {
	    String key = assignedDataObject.getText(assignedColumnName);
	    for (int i = 0; i < keys.length; i++) {
	      if (keys[i].trim().equals(key.trim())) {
	        value = meanings[i];
	      }
	    }
  	}
  }

  /**
   * Returns the component's label.
   * @return the component's label.
   */
  public String getLabel() {
    return label;
  }

  /**
   * Returns the component's value to be displayed as text.
   * @return the component's value to be displayed as text
   */
  public String getText() {
    return value;
  }

  /* (non-Javadoc)
   * @see de.must.print.PrintableColumn#hasContent()
   */
  public boolean hasContent() {
    return value.length() > 0;
  }

}
