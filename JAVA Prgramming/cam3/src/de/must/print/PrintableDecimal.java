/*
 * Copyright (c) 2002-2007 Christoph Mueller. All rights reserved.
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
import java.text.DecimalFormat;

/**
 * A database connected component to print date attributes of an entry.
 * @author Christoph Mueller
 */
public class PrintableDecimal extends PrintableText {

  protected DecimalFormat decimalFieldFormat = (DecimalFormat)DecimalFormat.getInstance();
  private int decimalPlaces = 2;
  private double content;

  /**
   * Constructs a new printable decimal component.
   * @param dO the assigned data object
   * @param columnName the name of the column to connect to
   * @param label the label of the new line
   */
  public PrintableDecimal(DataObject dO, String columnName, String label) {
    super(dO, columnName, label);
    assignedDataObject = dO;
    this.columnName = columnName;
    this.label = label;
    decimalFieldFormat.setMinimumFractionDigits(decimalPlaces);
    decimalFieldFormat.setMaximumFractionDigits(decimalPlaces);
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    content = assignedDataObject.getDouble(columnName);
    this.setText(decimalFieldFormat.format(content));
  }

  /**
   * Returns true if content is not zero.
   * @return true if content is not zero
   */
  public boolean hasContent() {
    return content != 0;
  }

}