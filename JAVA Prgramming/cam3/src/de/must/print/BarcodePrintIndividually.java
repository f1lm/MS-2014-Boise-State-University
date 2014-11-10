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
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.print.PageFormat;
import java.awt.print.Printable;
import java.awt.print.PrinterException;
import java.util.Vector;

public abstract class BarcodePrintIndividually extends BarcodePrintStd {
  
  protected class LabelData {
    String barcode;
    Vector<String> lines;
    public LabelData(String barcode, Vector<String> lines) {
      this.barcode = barcode;
      this.lines = lines;
    }
  }

  private int horizontalMarginToLabelBorder = 10;

  public BarcodePrintIndividually(int formId) {
    super(formId);
  }

  @Override
  public int print(Graphics graphics, PageFormat pageFormat, int pageIndex) throws PrinterException {
    int neededPages = (exhausted + getAmount() - 1) / getLabelCapacity() + 1;
    if (pageIndex > neededPages  -1) return Printable.NO_SUCH_PAGE;
    if (barcFont == null) barcFont = new Font(graphics.getFont().getName(), graphics.getFont().getStyle(), 8);
    if (fixtextFont == null) {
      if (fixTextSize > 0) {
        fixtextFont = new Font(graphics.getFont().getName(), graphics.getFont().getStyle(), fixTextSize);
      } else {
        fixtextFont = new Font(graphics.getFont().getName(), graphics.getFont().getStyle(), 8);
      }
    }
    int toIgnore = 0;
    if (pageIndex == 0) toIgnore = exhausted;
    int index = -1 + pageIndex * getLabelCapacity();
    for (int i = 0; i < form.getAmountY(); i++) {
      for (int j = 0; j < form.getAmountX(); j++) {
        if (toIgnore > 0) toIgnore--; // ignore exhausted label positions
        else {
          index++;
          if (index < getAmount()) {
            LabelData data = getLabelDateAt(index);
            for (int k = 0; k < data.lines.size(); k++) {
              data.lines.setElementAt(GraphicUtils.getFittingString(graphics, fixtextFont, data.lines.elementAt(k), form.getLabelWidth() - horizontalMarginToLabelBorder * 2), k);
            }
            barcodeDrawer.drawBarcodeAboveFixtext((Graphics2D)graphics, data.barcode, data.lines, form.getOffsetX() + (form.getGridX() * j), form.getOffsetY() + (form.getGridY() * i), form.getLabelWidth(), form.getLabelHeight(), barcFont, fixtextFont, form.getOffsetX() + (form.getGridX() * j) + horizontalMarginToLabelBorder);
          }
        }
      }
    }
    return Printable.PAGE_EXISTS;
  }
  
  protected abstract int getAmount();
  
  protected abstract LabelData getLabelDateAt(int index);

}
