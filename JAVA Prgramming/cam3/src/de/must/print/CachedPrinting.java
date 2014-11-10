/*
 * Copyright (c) 2011-2013 Christoph Mueller. All rights reserved.
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
import java.awt.Point;
import java.awt.print.PageFormat;
import java.awt.print.Printable;
import java.util.Iterator;
import java.util.StringTokenizer;
import java.util.Vector;

import de.must.io.Logger;
import de.must.print.PrintablePage.PrintableBarcodeItem;

/**
 * Cached Printing.
 * The paradigm of this concept is - back to the roots: Don't call me, I'll call you. 
 * This means e.g., I read some database tables, compute some stuff and put it out in the sequence as I am used to.
 * The result is buffered, at the moment in Vectors. Later, the result is provided in a sequence,
 * the renderer (printer) wants to retrieve it (e.g. page 1, page 2, again page 1).
 * This principle assumes that Graphics and PageFormat stay constant for all pages!
 * @author Christoph Mueller
 */
public abstract class CachedPrinting extends SimplePrinting {

  protected Vector<PrintablePage> printablePages = new Vector<PrintablePage>();
  protected Graphics firstGraphics;
  protected PageFormat firstPageFormat;
  protected Font defaultFont;
  protected Font currentFont;
  protected PrintablePage currentPrintablePage;
  protected Previewer previewer;
  private Point pageInfoPosition;
  private boolean cacheIsToLoad;
  private Vector<PrintablePage.PrintableItem> printableItemsForEachPage = new Vector<PrintablePage.PrintableItem>();
  
  @Override
  public void print(String jobName) {
    cacheIsToLoad = true;
    super.print(jobName);
  }

  @Override
  public int print(Graphics g, PageFormat format, int pageIndex) {
    if (!firstPrintCalled) {
      this.firstGraphics = g;
      this.firstPageFormat = format;
      defaultFont = firstGraphics.getFont();
      setFont(defaultFont);
      setMargins(firstPageFormat);
      // too wide: lineFeed = (int)firstGraphics.getFontMetrics(defaultFont).getHeight();
      if (previewer != null) {
        previewer.setPageAmount(printablePages.size());
      }
      firstPrintCalled = true;
    }
    if (cacheIsToLoad) {
      printablePages.clear();
      cachePages();
      cacheIsToLoad = false;
    }
    return printFromCache(g, pageIndex);
  }
  
  /**
   * 'Print' all items into the cache instead of into graphics directly.
   */
  protected abstract void cachePages();
  
  /**
   * Sets the font to use later and to check if it fits into imagable height.
   * @param newFont the font to use for the next items
   */
  protected void setFont(Font newFont) {
    currentFont = newFont;
  }
  
  protected void resetFont() {
    currentFont = defaultFont;
  }
  
  protected Font getDefaultFont() {
    return defaultFont;
  }
  
  /**
   * Returns the render width of the given text in context of the current font.
   * @param text the text to check its width
   * @return the width of the given text in context of the current font
   */
  protected int getWidth(String text) {
    return firstGraphics.getFontMetrics(currentFont).stringWidth(text);
  }
  
  protected void feedLine() {
    curY += lineFeed;
    newPageWhenIndicated(currentFont);
  }

  /**
   * Creates a new page, switches this page to be currentPrintablePage
   * and resets the pen to the leftmost upper printable point.
   */
  protected void newPage() {
    currentPrintablePage = new PrintablePage();
    printablePages.add(currentPrintablePage);
    curY = topPrintStart;
  }
  
  /**
   * Checks whether or not the next print forces a new page, dependent of the current font.
   */
  protected void newPageWhenIndicated() {
    newPageWhenIndicated(currentFont);
  }
  
  /**
   * Checks whether or not the next print forces a new page, dependent of the font as specified.
   * @param font the font used for the next item to print
   */
  protected void newPageWhenIndicated(Font font) {
    if (curY > bottomPrintEnding) {
      newPage();
      curY += firstGraphics.getFontMetrics(font).getHeight();
    }
  }
  
  protected void wrap(String text) {
    wrap(leftPrintStart, 0, text, leftPrintStart);
  }
  
  /**
   * Print wrapping text through multiple lines
   * @param xStart  the regular horizontal start point of printing
   * @param horizontalOffset  the special horizontal offset
   * @param text  the text to be printed
   * @param nextLineX  horizontal start of lines 2 to n
   */
  protected void wrap(int xStart, int horizontalOffset, String text, int nextLineX) {
    StringTokenizer tokenizer = new StringTokenizer(text, " \t\n\r\f", true);
    StringBuffer line = new StringBuffer();
    String li = "";
    while (tokenizer.hasMoreTokens()) {
      String nextToken = tokenizer.nextToken();
      line.append(nextToken);
      if (nextToken.equals("\n") || (li.length() != 0 && !fits(xStart, line.toString()))) { // do not feed line of the token itself is already too long
        newPageWhenIndicated();
        cache(li, xStart, (int)curY);
        feedLine();
        xStart = nextLineX;
        line = new StringBuffer();
        line.append(nextToken.trim());
      }
      li = line.toString();
    }
    if (li.length() > 0) {
      newPageWhenIndicated();
      cache(li, xStart + horizontalOffset, (int)curY);
    }
  }

  protected boolean fits(int xStart, String text) {
    return xStart + getWidth(text) < rightPrintEnding;
  }
  
  /**
   * 'Prints' a text fragment into the cache left bound.
   * @param textToPrint the text to cache
   */
  protected void cache(String textToPrint) {
    cache(textToPrint, currentFont);
  }
  
  /**
   * 'Prints' a text fragment into the cache left bound using current vertical position.
   * @param textToPrint the text to cache
   * @param font the font to use for the text fragment
   */
  protected void cache(String textToPrint, Font font) {
    int xWished = leftPrintStart;
    newPageWhenIndicated(font);
    cache(textToPrint, font, xWished, (int)curY);
  }
  
  /**
   * 'Prints' a text fragment into the cache left bound using current vertical position.
   * Current font is used.
   * @param textToPrint the text to cache
   * @param x the horizontal position of text begin
   * @param y the vertical position of text begin
   */
  protected void cache(String textToPrint, int x, int y) {
    cache(textToPrint, currentFont, x, y); 
  }
  
  /**
   * 'Prints' a text fragment into the cache left bound using current vertical position.
   * @param textToPrint the text to cache
   * @param font the font to use for the text fragment
   * @param x the horizontal position of text begin
   * @param y the vertical position of text begin
   */
  protected void cache(String textToPrint, Font font, int x, int y) {
    cache(textToPrint, new FontSpecification(font), x, y);
  }
  
  protected void cache(String textToPrint, FontSpecification font, int x, int y) {
    currentPrintablePage.printableItems.add(currentPrintablePage.new PrintableTextItem(
      textToPrint, font, x, y
    ));
  }
  
  protected void cacheBarcode(String textToPrintAsBarcode, int x, int y) {
    currentPrintablePage.printableItems.add(currentPrintablePage.new PrintableBarcodeItem(
      textToPrintAsBarcode, x, y
    ));
  }
  
  protected void cacheIamge(String path, int x, int y) {
    currentPrintablePage.printableItems.add(currentPrintablePage.new PrintableImageItem(
      path, x, y
    ));
  }
  
  protected void cacheLine(int y) {
    currentPrintablePage.printableItems.add(currentPrintablePage.new PrintableLine(
      leftPrintStart, y, rightPrintEnding, y
    ));
  }
  
 private int printFromCache(Graphics g, int pageIndex) {
    if (pageIndex >= printablePages.size()) return Printable.NO_SUCH_PAGE;
    printFixStuff(g, firstPageFormat, pageIndex);
    if (pageInfoPosition != null) {
      String pageInfo = getTranslation("TEXT_PAGE") + " " + (pageIndex+1) + " " + getTranslation("TEXT_OF") + " " + printablePages.size();
      g.drawString(pageInfo, pageInfoPosition.x - g.getFontMetrics(currentFont).stringWidth(pageInfo), pageInfoPosition.y);
    }
    printItems(g, printableItemsForEachPage);
    PrintablePage printablePage = (PrintablePage)printablePages.elementAt(pageIndex);
    Vector<PrintablePage.PrintableItem> printableItems = printablePage.getPrintableItems();
    printItems(g, printableItems);
    return Printable.PAGE_EXISTS;
  }
  
  /**
   * Prints fix stuff for each page. Override this method to use it, it is called each 
   * time a page should be rendered.
   * @param graphics the context into which the page is drawn 
   * @param pageFormat the size and orientation of the page being drawn
   * @param pageIndex the zero based index of the page to be drawn
   */
  protected void printFixStuff(Graphics graphics, PageFormat pageFormat, int pageIndex) {}

  private void printItems(Graphics graphics, Vector<PrintablePage.PrintableItem> printableItems) {
    Iterator<PrintablePage.PrintableItem> iter = printableItems.iterator();
    while (iter.hasNext()) {
      PrintablePage.PrintableItem printableItem = (PrintablePage.PrintableItem) iter.next();
      changeFontIfNew(printableItem, graphics);
      printItemGraphics(graphics, printableItem);
    }
  }
  
  protected void printItemGraphics(Graphics graphics, PrintablePage.PrintableItem printableItem) {
    if (printableItem instanceof PrintableBarcodeItem) {
      Logger.getInstance().warn(getClass(), "To print barcodes use class CachedPrintingIncludingBarcodes!");
    }
    printableItem.drawYourselfUpon(graphics);
  }
  
}
