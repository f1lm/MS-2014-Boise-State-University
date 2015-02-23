/*
 * Copyright (c) 2007-2013 Christoph Mueller. All rights reserved.
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
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.print.*;

import de.must.io.Logger;
import de.must.middle.ApplConstStd;

/**
 * Tool to print barcodes from numbers in sequence upon DIN A4 forms.
 * @author Christoph Mueller
 */
public class BarcodePrint extends BarcodePrintStd {
  
  private int fixedNumberLength;
  private long startNbr;
  private String textBefore;
  private int amount;
  private String unit;
  private long lastNbr;
  private String fixText;
  private Image image;

	/**
   * Constructs a new BarcodePrint.
	 * @param formId the ID of the used form, e.g. FORM_AVERY_ZWECKFORM_L4732REV25
	 * @param startNbr the start number - each new barcode is increased by one
	 * @param fixedNumberLength the fixed length of the barcode text - leading zeroes will be added until this length is reached
	 * @param pages the number of pages to print
   * @see #FORM_AVERY_ZWECKFORM_L4732REV25
	 */
  public BarcodePrint(int formId, long startNbr, int fixedNumberLength, int pages) {
    this(formId, startNbr, fixedNumberLength, pages, ApplConstStd.UNIT_PAGES, 0);
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
   * @see ApplConstStd#UNIT_PAGES
   * @see ApplConstStd#UNIT_LABELS
   */
  public BarcodePrint(int formId, long startNbr, int fixedNumberLength, int amount, String unit, int exhausted) {
    this(formId, startNbr, fixedNumberLength, "", amount, unit, exhausted);
  }
  
  /**
   * Constructs a new BarcodePrint.
   * @param formId the ID of the used form, e.g. FORM_AVERY_ZWECKFORM_L4732REV25
   * @param startNbr the start number - each new barcode is increased by one
   * @param fixedNumberLength the fixed length of the barcode text - leading zeroes will be added until this length is reached
   * @param textBefore the text before the number to print
   * @param amount the number of pages or labels to print
   * @param unit whether the amount means pages or labels, e.g. UNIT_PAGES
   * @param exhausted how many labels of the first page are already used
   * @see #FORM_AVERY_ZWECKFORM_L4732REV25
   * @see ApplConstStd#UNIT_PAGES
   * @see ApplConstStd#UNIT_LABELS
   */
	public BarcodePrint(int formId, long startNbr, int fixedNumberLength, String textBefore, int amount, String unit, int exhausted) {
		super(formId);
    this.startNbr = startNbr;
    this.fixedNumberLength = fixedNumberLength;
    this.textBefore = textBefore;
    this.amount = amount;
    this.unit = unit;
    this.exhausted = exhausted;
    setPrinterDialog(PRINT_DIALOG_NEVER);
    barcodeDrawer.setBarHeight(25);
	}

  public void setFixtext(String fixText, int fixTextSize) {
    this.fixText = fixText;
    this.fixTextSize = fixTextSize;
  }
  
  public void setImage(Image image) {
    this.image = image;
  }
  
	@Override
	public int print(Graphics graphics, PageFormat pageFormat, int pageIndex)
		throws PrinterException {
    if (ApplConstStd.UNIT_PAGES.equals(unit) && pageIndex > amount - 1) return Printable.NO_SUCH_PAGE;
    if (ApplConstStd.UNIT_LABELS.equals(unit)) {
      int neededPages = (exhausted + amount - 1) / getLabelCapacity() + 1;
      if (pageIndex > neededPages  -1) return Printable.NO_SUCH_PAGE;
    }
    int contentIndex = 0; // first page;
    if (pageIndex > 0) contentIndex = pageIndex * getLabelCapacity() - exhausted;
    if (contentIndex < 0) {
      contentIndex = 0;
      Logger.getInstance().warn("Exhausted in LabalPrint too high - switched to zero");
    }
    int toIgnore = 0;
    if (pageIndex == 0) toIgnore = exhausted;
    if (barcFont == null) barcFont = new Font(graphics.getFont().getName(), graphics.getFont().getStyle(), 8);
    if (fixtextFont == null) fixtextFont = new Font(graphics.getFont().getName(), graphics.getFont().getStyle(), fixTextSize);
    for (int i = 0; i < form.getAmountY(); i++) {
      for (int j = 0; j < form.getAmountX(); j++) {
        if (toIgnore > 0) toIgnore--; // ignore exhausted label positions
        else {
          String bt = getBarcodeText(pageIndex, j, i);
          if (bt != null) {
            if (image != null) {
              barcodeDrawer.drawBarcodeAboveImage((Graphics2D)graphics, getBarcodeText(pageIndex, j, i), image, form.getOffsetX() + (form.getGridX() * j), form.getOffsetY() + (form.getGridY() * i), form.getLabelWidth(), form.getGridY(), barcFont);
            } else if (fixText != null) {
              barcodeDrawer.drawBarcodeAboveFixtext((Graphics2D)graphics, getBarcodeText(pageIndex, j, i), fixText, form.getOffsetX() + (form.getGridX() * j), form.getOffsetY() + (form.getGridY() * i), form.getLabelWidth(), form.getGridY(), barcFont, fixtextFont);
            } else {
              barcodeDrawer.drawBarcodeInCenter((Graphics2D)graphics, getBarcodeText(pageIndex, j, i), form.getOffsetX() + (form.getGridX() * j), form.getOffsetY() + (form.getGridY() * i), form.getLabelWidth(), form.getGridY(), barcFont);
            }
          }
        }
      }
    }
		return Printable.PAGE_EXISTS;
	}
  
  private String getBarcodeText(int pageIndex, int x, int y) {
    long currentNbr = startNbr + pageIndex * form.getAmountX() * form.getAmountY() +  form.getAmountX() * y + x - exhausted;
    if (ApplConstStd.UNIT_LABELS.equals(unit) && currentNbr >= (startNbr + amount)) return null;
    if (currentNbr > lastNbr) lastNbr = currentNbr;
    String text = Long.toString(currentNbr);
    while(text.length() < fixedNumberLength) {
      text = "0" + text;
    }
    return textBefore + text;
  }
  
  public long getLastNbr() {
    return lastNbr;
  }

}
