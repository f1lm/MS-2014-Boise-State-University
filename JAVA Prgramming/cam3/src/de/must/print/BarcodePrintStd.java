/*
 * Copyright (c) 2013 Christoph Mueller. All rights reserved.
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

import java.awt.Font;

/**
 * Tool to print barcodes upon DIN A4 forms.
 * @author Christoph Mueller
 */
public abstract class BarcodePrintStd extends LabelPrintStd {

  protected BarcodeDrawer barcodeDrawer = new BarcodeDrawer();
  protected int exhausted;
  protected Font barcFont;
  protected int fixTextSize;
  protected Font fixtextFont;

  public BarcodePrintStd(int formId) {
    super(formId);
  }

  /**
   * Sets the barcode type.
   * @param barcodeType the type of barcode to use
   * @see BarcodeDrawer#BARCODE_TYPE_CODE128
   * @see BarcodeDrawer#BARCODE_TYPE_INT2OF5
   * @see BarcodeDrawer#BARCODE_TYPE_COD39
   */
  public void setBarcodeType(int barcodeType) {
    barcodeDrawer.setBarcodeType(barcodeType);
  }
  
  /**
   * Sets adjustment to correct on wrong printer positioning.
   * @param adjustmentX +- mm more right or left
   * @param adjustmentY +- mm deeper or higher
   */
  public void setAdjustment(int adjustmentX, int adjustmentY) {
    barcodeDrawer.setAdjustment(adjustmentX, adjustmentY);
  }
  
}
