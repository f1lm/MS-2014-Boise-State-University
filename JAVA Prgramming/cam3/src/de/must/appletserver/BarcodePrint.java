package de.must.appletserver;

import de.must.applet.Constants;
import de.must.print.BarcodeDrawer;

/*
 * Copyright (c) 2012 Christoph Mueller. All rights reserved.
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

public class BarcodePrint {

  private int formId;
  private int fixedNumberLength;
  private long startNbr;
  private int amount;
  private String unit;
  private int exhausted;
  private long lastNbr;
  private int barcodeType;
  private String printerName;
  private int adjustmentX = 0;
  private int adjustmentY = 0;
  private String image;
  private String fixtext;
  private int fontSize;

  /**
   * Constructs a new BarcodePrint.
   * @param formId the ID of the used form, e.g. FORM_AVERY_ZWECKFORM_L4732REV25
   * @param startNbr the start number - each new barcode is increased by one
   * @param fixedNumberLength the fixed length of the barcode text - leading zeroes will be added until this length is reached
   * @param pages the number of pages to print
   * @see #FORM_AVERY_ZWECKFORM_L4732REV25
   */
  public BarcodePrint(int formId, long startNbr, int fixedNumberLength, int pages) {
    this(formId, startNbr, fixedNumberLength, pages, de.must.middle.ApplConstStd.UNIT_PAGES, 0);
  }
  
  /**
   * Constructs a new BarcodePrint.
   * @param formId the ID of the used form, e.g. FORM_AVERY_ZWECKFORM_L4732REV25
   * @param startNbr the start number - each new barcode is increased by one
   * @param fixedNumberLength the fixed length of the barcode text - leading zeroes will be added until this length is reached
   * @param amount the number of pages or labels to print
   * @param unit whether the amount means pages or labels, e.g. UNIT_PAGES
   * @param exhausted how many labels of the first page are already used
   * @see #FORM_AVERY_ZWECKFORM_L4732REV25
   * @see #UNIT_PAGES
   * @see #UNIT_LABELS
   */
  public BarcodePrint(int formId, long startNbr, int fixedNumberLength, int amount, String unit, int exhausted) {
    this.formId = formId;
    this.startNbr = startNbr;
    this.fixedNumberLength = fixedNumberLength;
    this.amount = amount;
    this.unit = unit;
    this.exhausted = exhausted;
  }

  /**
   * Sets the barcode type.
   * @param barcodeType the type of barcode to use
   * @see BarcodeDrawer#BARCODE_TYPE_CODE128
   * @see BarcodeDrawer#BARCODE_TYPE_INT2OF5
   * @see BarcodeDrawer#BARCODE_TYPE_COD39
   */
  public void setBarcodeType(int barcodeType) {
    this.barcodeType = barcodeType;
  }
  
  /**
   * Sets the print service by the name as specified. If no print service with the specified name is found,
   * the print service will not be changed.
   * @param printerName
   */
  public void setPrinter(String printerName) {
    this.printerName = printerName;
  }
  
  public void setImage(String imageName) {
    this.image = imageName;
  }
  
  public void setFixtext(String fixtext, int fontSize) {
    this.fixtext = fixtext;
    this.fontSize = fontSize;
  }
  
  /**
   * Sets adjustment to correct on wrong printer positioning.
   * @param adjustmentX +- mm more right or left
   * @param adjustmentY +- mm deeper or higher
   */
  public void setAdjustment(int adjustmentX, int adjustmentY) {
    this.adjustmentX = adjustmentX;
    this.adjustmentY = adjustmentY;
  }
  
  public void sendRemotePrintCommands(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.addTodoTag(Constants.PRINT_BARCODE_LABELS);
    out.addIdTag(Integer.toString(formId));
    out.addVariant1Tag(Long.toString(startNbr));
    out.addVariant2Tag(fixedNumberLength);
    out.addVariant3Tag(amount);
    out.addVariant4Tag(unit);
    out.addVariant5Tag(exhausted); // mandatory
    out.addVariant6Tag(barcodeType);
    if (adjustmentX > 0) out.addVariant7Tag(adjustmentX);
    if (adjustmentY > 0) out.addVariant8Tag(adjustmentY);
    if (image != null) out.addVariant9Tag(image);
    if (fixtext != null) out.addVariant10Tag(fixtext);
    if (fontSize > 0) out.addVariant11Tag(fontSize);
    if (printerName != null) out.addVariant12Tag(printerName);
    out.println(Constants.ACTION_END_TAG);
  }
  
}
