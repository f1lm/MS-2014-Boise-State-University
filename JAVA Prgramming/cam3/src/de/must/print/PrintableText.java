/*
 * Copyright (c) 2001-2010 Christoph Mueller. All rights reserved.
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
import de.must.util.Miscellaneous;

/**
 * A database connected component to print text attributes of an entry.
 * @author Christoph Mueller
 */
public class PrintableText implements PrintableColumn {

  protected DataObject assignedDataObject;
  protected String columnName;
  protected String label;
  protected String value;
  protected boolean extendedWidth = false;

  /**
   * Constructs a new printable text.
   * @param dO the assigned data object
   * @param columnName the name of the column to connect to
   * @param label the label of the new line
   */
  public PrintableText(DataObject dO, String columnName, String label) {
    assignedDataObject = dO;
    this.columnName = columnName;
    this.label = Miscellaneous.getReplacement(label);
  }
  
  /**
   * Sets the extend width flag. This indicates the renderer to present the text under
   * the label with more width.
   * @param extendedWidth
   */
  public void setExtendedWidth(boolean extendedWidth) {
    this.extendedWidth = extendedWidth;
  }
  
  /**
   * Returns true if text should be presented under the label with more width.
   * @return true if text should be presented under the label with more width
   */
  public boolean isExtendeWith() {
    return extendedWidth;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    value = assignedDataObject.getText(columnName).trim();
  }

  /**
   * Returns the component's label.
   * @return the component's label.
   */
  public String getLabel() {
    return label;
  }

  /**
   * Sets the component's text.
   * @param the component's new text
   */
  public void setText(String text) {
    value = text;
  }

  /**
   * Returns the component's value to be displayed as text.
   * @return the component's value to be displayed as text
   */
  public String getText() {
    return value;
  }

  @Override
  public boolean hasContent() {
    return value.length() > 0;
  }

}
