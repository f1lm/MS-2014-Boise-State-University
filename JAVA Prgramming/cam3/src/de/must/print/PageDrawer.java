/*
 * Copyright (c) 2007-2012 Christoph Mueller. All rights reserved.
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
import java.awt.print.PrinterJob;
import java.text.AttributedString;

/**
 * A drawer of graphical information, independent from the way it is used (viewer/printer).
 * @author Christoph Mueller
 */
public abstract class PageDrawer {
  
  protected static final double SQUARE_ROOT_OF_TWO = 1.4142135623730950488016887242097;
  protected static final double MM_PER_INCH = 25.4;

  protected MotivePageFormat pageFormat;
  protected String printerName;
  protected int lineSpace = 5;
  protected Font originalFont;
  protected int currentPosY = 0;
  protected int adjustmentX = 0;
  protected int adjustmentY = 0;
  
  public PageDrawer() {
    pageFormat = getPageFormat(null); // preview page format
  }
  
  public void setPrinterName(String printerName) {
    this.printerName = printerName;
  }
  
  public String getPrinterName() {
    return printerName;
  }
  
  /**
   * Sets adjustment to correct on wrong printer positioning.
   * @param adjustmentX +- mm more right or left
   * @param adjustmentY +- mm deeper or higher
   */
  public void setAdjustment(int adjustmentX, int adjustmentY) {
    this.adjustmentX = getPx(adjustmentX);
    this.adjustmentY = getPx(adjustmentY);
  }
  
  public abstract MotivePageFormat getPageFormat(PrinterJob printerJob);
  
  public MotivePageFormat getPageFormat() {
    return pageFormat;
  }
  
  public int getPx(int mm) {
    return (int)(mm * 2.833333);
  }

  public void setLineSpace(int lineSpace) {
    this.lineSpace = lineSpace;
  }
  
  /**
   * Draws the page.
   * @param graphics the context into which the page is drawn
   * @param pageIndex the zero based index of the page to be drawn
   * @return PAGE_EXISTS if the page is rendered successfuly
   *         or NO_SUCH_PAGE if <code>pageIndex</code> specifies a
   *         non-existent page.
   */
  public abstract int draw(Graphics graphics, int pageIndex);
  
  /**
   * Start drawing from the beginning (top / left).
   */
  protected void startFromBeginning() {
    currentPosY = 0;
  }
  
  /**
   * Resets font. Be advised original font is to be set at the beginning of all drawing.
   * @param graphics the context where the font is to be reset
   */
  protected void resetFont(Graphics graphics) {
    graphics.setFont(originalFont);
  }
  
  /**
   * Draws a line. Before drawing, the position is set depending on line space and font height.
   * @param graphics the context into which the page is drawn
   * @param line the textual data the line is to be filled with
   */
  protected void drawLine(Graphics graphics, String line) {
    drawLine(graphics, line, 0);
  }
  
  protected void drawLine(Graphics graphics, String line, int additionalXOffset) {
    int x = (int)pageFormat.getMotiveOffsetX() + additionalXOffset;
    newLine(graphics);
    graphics.drawString(line, x+adjustmentX, currentPosY+adjustmentY);
  }
  
  protected void drawLine(Graphics graphics, AttributedString line) {
    int x = (int)pageFormat.getMotiveOffsetX();
    newLine(graphics);
    graphics.drawString(line.getIterator(), x+adjustmentX, currentPosY+adjustmentY);
  }
  
  protected void append(Graphics graphics, String text, int additionalXOffset) {
    int x = (int)pageFormat.getMotiveOffsetX() + additionalXOffset;
    graphics.drawString(text, x+adjustmentX, currentPosY+adjustmentY);
  }
  
  protected void drawHLine(Graphics graphics) {
    int x = (int)pageFormat.getMotiveOffsetX();
    currentPosY += 8;
    graphics.drawLine(x+adjustmentX, currentPosY+adjustmentY, x+adjustmentX + (int)pageFormat.getImageableWidth(), currentPosY+adjustmentY);
  }
  
  /**
   * Sets draw position to the next line depending on line space and font height.
   * @param graphics the context into which the page is drawn
   */
  protected void newLine(Graphics graphics) {
    if (currentPosY == 0) {
      currentPosY = (int)pageFormat.getMotiveOffsetY();
    } else {
      currentPosY += lineSpace;
    }
    currentPosY += graphics.getFont().getSize();
  }
  
  /**
   * Draws motive boundary hints for scissors.
   * @param graphics the context into which the page is drawn
   */
  protected void drawBoundaryHints(Graphics graphics) {
    int minus1 = 10;
    int minus2 = 30;
    int xL = pageFormat.getMotiveOffsetX() - pageFormat.getMarginForBoundaryHintX();
    int xR = pageFormat.getMotiveOffsetX() + pageFormat.getMotiveWidth() + pageFormat.getMarginForBoundaryHintX();
    int yT = pageFormat.getMotiveOffsetY() - pageFormat.getMarginForBoundaryHintX();
    int yB = pageFormat.getMotiveOffsetY() + pageFormat.getMotiveHeight() + pageFormat.getMarginForBoundaryHintX();
    graphics.drawLine(xL+adjustmentX, yT+adjustmentY - minus2, xL+adjustmentX, yT+adjustmentY - minus1);
    graphics.drawLine(xR+adjustmentX, yT+adjustmentY - minus2, xR+adjustmentX, yT+adjustmentY - minus1);
    graphics.drawLine(xL+adjustmentX, yB+adjustmentY + minus2, xL+adjustmentX, yB+adjustmentY + minus1);
    graphics.drawLine(xR+adjustmentX, yB+adjustmentY + minus2, xR+adjustmentX, yB+adjustmentY + minus1);
    graphics.drawLine(xL+adjustmentX - minus2, yT+adjustmentY, xL+adjustmentX - minus1, yT+adjustmentY);
    graphics.drawLine(xR+adjustmentX + minus1, yT+adjustmentY, xR+adjustmentX + minus2, yT+adjustmentY);
    graphics.drawLine(xL+adjustmentX - minus2, yB+adjustmentY, xL+adjustmentX - minus1, yB+adjustmentY);
    graphics.drawLine(xR+adjustmentX + minus1, yB+adjustmentY, xR+adjustmentX + minus2, yB+adjustmentY);
  }
  
}
