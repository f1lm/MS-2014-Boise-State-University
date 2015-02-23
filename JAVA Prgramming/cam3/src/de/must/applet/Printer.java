/*
 * Copyright (c) 2011-2012 Christoph Mueller. All rights reserved.
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

package de.must.applet;

import java.awt.Font;
import java.awt.Graphics;
import java.awt.print.PageFormat;
import java.awt.print.Paper;
import java.awt.print.Printable;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;
import java.util.Iterator;
import java.util.Vector;

import javax.print.PrintService;

import de.must.io.Logger;
import de.must.print.FontSpecification;
import de.must.print.GraphicUtils;
import de.must.print.PrintablePage;

public class Printer implements Printable {
  
  private String printerName;
  private double paperWidth;
  private double paperHeight;
  private double imaAreaX;
  private double imaAreaY;
  private double imaAreaWidth;
  private double imaAreaHeight;
  private Vector<PrintablePage> printablePages = new Vector<PrintablePage>();
  private PrintablePage currentPrintablePage;
  private boolean firstPrintCalled = false;
  private FontSpecification currentFontSpec;
  private Graphics graphics;
  private Font defaultFont;
  private Font currentFont;

  public Printer() {
  }
  
  public void perform (Action action) {
    if (Constants.SET_PRINTER_NAME.equals(action.toDo)) {
      printerName = action.value;
    } else if (Constants.SET_PAPER_SIZE.equals(action.toDo)) {
      paperWidth = Double.valueOf(action.variant1);
      paperHeight = Double.valueOf(action.variant2);
    } else if (Constants.SET_IMAGABLE_AREA.equals(action.toDo)) {
      imaAreaX = Double.valueOf(action.variant1);
      imaAreaY = Double.valueOf(action.variant2);
      imaAreaWidth = Double.valueOf(action.variant3);
      imaAreaHeight = Double.valueOf(action.variant4);
    } else if (Constants.SET_FONT.equals(action.toDo)) {
      currentFontSpec = new FontSpecification(Integer.valueOf(action.variant1), Integer.valueOf(action.variant2));
    } else if (Constants.PRINT_ITEM.equals(action.toDo)) {
      int page = Integer.valueOf(action.id);
      for (int i = printablePages.size(); i <= page; i++) {
        printablePages.add(new PrintablePage());
      }
      currentPrintablePage = printablePages.elementAt(page);
      if (Constants.LINE_VALUE.equals(action.value)) {
        currentPrintablePage.add(currentPrintablePage.new PrintableLine(Double.valueOf(action.variant1), Double.valueOf(action.variant2), Double.valueOf(action.variant3), Double.valueOf(action.variant4)));
      } else {
        PrintablePage.PrintableItem printableItem = currentPrintablePage.new PrintableTextItem(action.value, currentFontSpec, Double.valueOf(action.variant1), Double.valueOf(action.variant2));
        printableItem.maxWidth = action.length;
        currentPrintablePage.add(printableItem);
      }
    } else if (Constants.EXECUTE.equals(action.toDo)) {
      print();
    }
  }

  public void print() {
    PrinterJob printerJob = PrinterJob.getPrinterJob();
    if (printerName != null) {
      PrintService[] printServices = PrinterJob.lookupPrintServices();
      for (int i = 0; i < printServices.length; i++) {
        if (printServices[i].getName().equalsIgnoreCase(printerName)) {
          try {
            printerJob.setPrintService(printServices[i]);
          } catch (PrinterException e) {
            Logger.getInstance().error(getClass(), e);
          }
        }
      }
    }
    PageFormat pageFormat = printerJob.defaultPage();
    Paper paper = new Paper();
    if (paperWidth > 0) paper.setSize(paperWidth, paperHeight);
    if (imaAreaWidth > 0) paper.setImageableArea(imaAreaX, imaAreaY, imaAreaWidth, imaAreaHeight);
    pageFormat.setPaper(paper);
    printerJob.setPrintable(this, pageFormat);
    try {
      printerJob.print();
    } catch (PrinterException e) {
      Logger.getInstance().error(getClass(), e);
    }
  }

  @Override
  public int print(Graphics graphics, PageFormat pageFormat, int pageIndex) throws PrinterException {
    // this way we could receive info to pass to server: FontRenderContext frc = ((Graphics2D)graphics).getFontRenderContext();
    if (!firstPrintCalled) {
      this.graphics = graphics;
      defaultFont = graphics.getFont();
      setFont(defaultFont);
//      if (previewer != null) {
//        previewer.setPageAmount(printablePages.size());
//      }
      firstPrintCalled = true;
    }
    if (pageIndex >= printablePages.size()) return Printable.NO_SUCH_PAGE;
    // printFixStuff(graphics, pageFormat, pageIndex);
//    if (pageInfoPosition != null) {
//      String pageInfo = getTranslation("TEXT_PAGE") + " " + (pageIndex+1) + " " + getTranslation("TEXT_OF") + " " + printablePages.size();
//      graphics.drawString(pageInfo, pageInfoPosition.x - graphics.getFontMetrics(currentFont).stringWidth(pageInfo), pageInfoPosition.y + graphics.getFontMetrics(currentFont).getHeight());
//    }
//    printItems(graphics, printableItemsForEachPage);
    PrintablePage printablePage = (PrintablePage)printablePages.elementAt(pageIndex);
    Vector<PrintablePage.PrintableItem> printableItems = printablePage.getPrintableItems();
    printItems(graphics, printableItems);
    return Printable.PAGE_EXISTS;
  }
  
  private void changeFontIfNew(PrintablePage.PrintableItem printableItem, Graphics graphics) {
    if (!(printableItem instanceof PrintablePage.PrintableTextItem)) return;
    PrintablePage.PrintableTextItem item = (PrintablePage.PrintableTextItem)printableItem;
    if (item.getFontSpec() != null && !item.getFontSpec().equals(currentFontSpec)) {
      graphics.setFont(currentFont = item.getFontSpec().changeFont(currentFont));
      currentFontSpec = item.getFontSpec();
    }
  }

  protected void setFont(Font newFont) {
    currentFont = newFont;
  }
  
  protected void resetFont() {
    currentFont = defaultFont;
  }
  
  protected Font getDefaultFont() {
    return defaultFont;
  }
  
  private void printItems(Graphics graphics, Vector<PrintablePage.PrintableItem> printableItems) {
    Iterator<PrintablePage.PrintableItem> iter = printableItems.iterator();
    while (iter.hasNext()) {
      PrintablePage.PrintableItem printableItem = (PrintablePage.PrintableItem) iter.next();
      changeFontIfNew(printableItem, graphics);
      if (printableItem instanceof PrintablePage.PrintableLine) {
        PrintablePage.PrintableLine line = (PrintablePage.PrintableLine)printableItem;
        graphics.drawLine((int)line.getPositionX(), (int)line.getPositionY(), (int)line.getPositionX2(), (int)line.getPositionY2());
      } else {
        String string = printableItem.toString();
        if (printableItem.maxWidth > 0) {
          string = GraphicUtils.getFittingString(graphics, currentFont, string, printableItem.maxWidth);
        }
        graphics.drawString(string, (int)printableItem.getPositionX(), (int)printableItem.getPositionY());
      }
    }
  }
  
}
