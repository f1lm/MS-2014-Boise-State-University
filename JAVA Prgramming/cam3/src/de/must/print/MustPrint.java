/*
 * Copyright (c) 2001 Christoph Mueller. All rights reserved.
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

import java.awt.*;
import java.awt.print.*;

/**
 * @author Christoph Mueller
 */
public abstract class MustPrint implements Printable {

  protected Image logo = null;
  protected boolean printFlag = true;
  protected int imageWidth, imageHeight;
  protected Point printLoc = new Point(0,0);
  protected int lineFeed = 15;
  protected boolean printerDialogWished = false;

  public MustPrint() {
  }

  /**
   *
   */
  public void print() {
    PrinterJob printerJob = PrinterJob.getPrinterJob();
    Book book = new Book();
    book.append(this, new PageFormat());
    printerJob.setPageable(book);
    boolean doPrint = true;
    if (printerDialogWished) doPrint = printerJob.printDialog();
    if (doPrint) {
      try {
        printerJob.print();
      } catch (PrinterException exception) {
        System.err.println("Printing error: " + exception);
      }
    }
  }

  /* protected void wrapAndPrintText(AttributedString textToWrap, PageFormat format, Graphics2D g2d, Point2D.Float pen) {
    AttributedCharacterIterator charIterator = textToWrap.getIterator();
    LineBreakMeasurer measurer = new LineBreakMeasurer(charIterator, g2d.getFontRenderContext());
    float wrappingWidth = (float) format.getImageableWidth();
    while (measurer.getPosition() < charIterator.getEndIndex()) {
      TextLayout layout = measurer.nextLayout(wrappingWidth);
      pen.y += layout.getAscent();
      float dx = layout.isLeftToRight()? 0 : (wrappingWidth - layout.getAdvance());
      layout.draw(g2d, pen.x + dx, pen.y);
      pen.y += layout.getDescent() + layout.getLeading();
    }
  } */

  /* protected void printTextWithLineBreak(String textToPrint, PageFormat format, Graphics2D g2d, Point2D.Float pen) {
    printTextWithLineBreak(textToPrint, format, g2d, pen, 0);
  } */

  /* protected void printTextWithLineBreak(String textToPrint, PageFormat format, Graphics2D g2d, Point2D.Float pen, int offset) {
    String[] lines = de.must.util.StringFunctions.getStringLines(textToPrint);
    for (int i = 0; i < lines.length; i++) {
      if (offset == 0) pen.y += lineFeed;
      if (lines[i].length() > 0) g2d.drawString(lines[i], (int)pen.x + offset, (int)pen.y);
    }
  } */

}
