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

package de.must.appletserver;

import java.awt.Font;
import java.awt.font.FontRenderContext;
import java.awt.geom.AffineTransform;
import java.awt.print.Paper;
import java.util.Vector;

import de.must.applet.Constants;
import de.must.print.FontSpecification;
import de.must.print.PrintablePage;
import de.must.wuic.WuicGlobal;

public abstract class RemotePrint {

  protected static final double SQUARE_ROOT_OF_TWO = 1.4142135623730950488016887242097; 

  public static final int DIN_A4 = 0;
  public static final int DIN_A6 = 1;
  
  protected SessionData sessionData;
  // maybe we set parameters from real graphics2d object by applet later:
  protected FontRenderContext frContext = new FontRenderContext(new AffineTransform(8.333333333333334, 0, 0, 8.333333333333334, 0, 0), false, false);
  protected double paperWidth = 595.19; // DIN A4
  protected double paperHeight = 841.69; // DIN A4
  protected double imaAreaX;
  protected double imaAreaY;
  protected double imaAreaWidth;
  protected double imaAreaHeight;
  protected int yStartPosition;
  protected FontSpecification defaultFont = new FontSpecification(Font.PLAIN, 12);
  protected FontSpecification currentFont = defaultFont;

  protected boolean constantItems = false;
  protected Vector<PrintablePage.PrintableItem> printableItemsForEachPage = new Vector<PrintablePage.PrintableItem>();
  
  protected int pageCounter = -1;
  protected double positionX;
  protected double positionY = Integer.MAX_VALUE; // to cause switch to page index 0 with header printing
  protected PrintablePage currentPrintablePage = new PrintablePage(); // dummy to instantiate items
  protected String printerName;

  protected ToAppletWriter out;

  public RemotePrint(SessionData sessionData) {
    this.sessionData = sessionData;
    this.out = sessionData.curOut;
    setPage(DIN_A4); // default
  }
  
  /**
   * Sets the print service by the name as specified. If no print service with the specified name is found,
   * the print service will not be changed.
   * @param printerName
   */
  public void setPrinter(String printerName) {
    this.printerName = printerName;
  }
  
  /**
   * @param pageFormat
   * @see #DIN_A4
   * @see #DIN_A6
   */
  public void setPage(int pageFormat) {
    switch (pageFormat) {
    case DIN_A4:
      paperWidth = 595.19;
      paperHeight = 841.69;
      imaAreaX = 70;
      imaAreaY = 60;
      imaAreaWidth = paperWidth - imaAreaX - 50;
      imaAreaHeight = paperHeight - imaAreaY * 2;
      break;
    case DIN_A6:
      paperWidth = 279.6;
      paperHeight = 420.85;
      imaAreaX = 20;
      imaAreaY = 20;
      imaAreaWidth = paperWidth - imaAreaX - 20;
      imaAreaHeight = paperHeight - imaAreaY * 2;
      break;
    default:
      break;
    }
  }
  
  /**
   * @see Paper#setSize(double, double)
   */
  public void setPaperSize(double width, double height) {
    paperWidth = width;
    paperHeight = height;
  }
  
  /**
   * @see Paper#setImageableArea(double, double, double, double)
   */
  public void setImageableArea(double x, double y, double width, double height) {
    imaAreaX = x; imaAreaY = y; imaAreaWidth = width; imaAreaHeight = height;
  }
  
  /**
   * Sets the vertical position from where on the page print sequence starts.
   * Suitable to reserve room for headers / logos.
   * @param yStartPosition
   */
  public void setYStartPosition(int yStartPosition) {
    this.yStartPosition = yStartPosition;
    if (positionY < yStartPosition) positionY = yStartPosition;
  }
  
  /**
   * Adds an empty line to the page.
   * @return the current print position
   */
  protected PrintablePage.PrintPosition addEmptyLine() {
    return addEmptyLine(1);
  }

  /**
   * Adds an empty line to the page.
   * @param factor may be 2 lines or 1/2 line ...
   * @return the current print position
   */
  protected PrintablePage.PrintPosition addEmptyLine(double factor) {
    positionY += getFontHeight() * factor;
    if (positionY > imaAreaY + imaAreaHeight) pageFeed();
    return getCurrentPrintPosition();
  }
  
  protected PrintablePage.PrintPosition getCurrentPrintPosition() {
    PrintablePage.PrintPosition printPosition = currentPrintablePage.new PrintPosition();
    printPosition.page = pageCounter;
    printPosition.xPosition = imaAreaX;
    printPosition.yPosition = positionY;
    return printPosition;
  }
  
  protected PrintablePage.PrintPosition addSingleLine(String line) {
    return addSingleLine(line, 0);
  }
  
  protected PrintablePage.PrintPosition addSingleLine(String line, int offsetX) {
    lineFeedAndPageCheck(0);
    return printInSameLine(line, offsetX);
  }
  
  protected PrintablePage.PrintPosition printInSameLine(String line, int offsetX) {
    PrintablePage.PrintPosition printPosition = currentPrintablePage.new PrintPosition();
    PrintablePage.PrintableItem printableItem = currentPrintablePage.new PrintableTextItem(line, currentFont, imaAreaX + offsetX, positionY);
    if (constantItems) {
      printableItemsForEachPage.add(printableItem);
    } else {
      out.printItem(pageCounter, printableItem);
    }
    printPosition.page = pageCounter;
    printPosition.xPosition = imaAreaX + offsetX;
    printPosition.yPosition = positionY;
    return printPosition;
  }
  
  /**
   * Line feed and page check.
   * @param numberOfFollowingLinesToKeepTogether the number of following lines to keep together
   */
  protected void lineFeedAndPageCheck(int numberOfFollowingLinesToKeepTogether) {
    int fontHeight = getFontHeight();
    positionY += fontHeight;
    if (positionY > imaAreaY + imaAreaHeight - numberOfFollowingLinesToKeepTogether * fontHeight) {
      pageFeed();
      positionY += fontHeight;
    }
  }
  
  protected void pageFeed() {
    pageCounter++;
    currentPrintablePage = new PrintablePage();
    if (printableItemsForEachPage.size() > 0) {
      positionY = ((PrintablePage.PrintableItem)printableItemsForEachPage.lastElement()).positionY;
    } else {
      resetPositionY();
    }
    fillPageHeader();
  }
  
  private void resetPositionY() {
    positionY = imaAreaY;
    if (positionY < yStartPosition) positionY = yStartPosition;
  }
  
  /**
   * Fills the header of each page. Useful if header contains variable data like e.g. group fields.
   * Override it to build page header with variable data.
   * Will be called automatically each time a new page is build. 
   */
  protected void fillPageHeader() {}

  public final void print() {
    out.sendConcerning(Constants.PRINTING);
    out.setPaperSize(paperWidth, paperHeight);
    out.setImageableArea(imaAreaX, imaAreaY, imaAreaWidth, imaAreaHeight);
    if (printerName != null) {
      out.println(Constants.ACTION_BEGIN_TAG);
      out.println(Constants.TODO_TAG_BEGIN + Constants.SET_PRINTER_NAME+ Constants.TODO_TAG_END);
      out.println(Constants.VALUE_TAG_BEGIN + printerName + Constants.VALUE_TAG_END);
      out.println(Constants.ACTION_END_TAG);
    }
    printIndividualStuff();
    out.sendTodoAction(Constants.EXECUTE);
  }
  
  protected abstract void printIndividualStuff();
  
  protected void setFont(FontSpecification newFont) {
    currentFont = newFont;
  }
  
  protected void setOnBold() {
    currentFont = new FontSpecification(currentFont.getName(), Font.BOLD, currentFont.getSize());
  }
  
  protected void resetFont() {
    currentFont = defaultFont;
  }
  
  /**
   * Limits a text to the specified length if necessary and marks the result with "..."
   * as cut by adding "..." to the cut result.
   * @param textToLimit the text to be limited
   * @param maxLength the max length of the result
   * @return the limited text
   */
  protected String limit(String textToLimit, int maxPixel) {
    Font defaultFont = new Font("Default", currentFont.getStyle(), currentFont.getSize());
    boolean cutted = false;
    int len = textToLimit.length();
    while (defaultFont.getStringBounds(textToLimit.toCharArray(), 0, len, frContext).getWidth() > maxPixel) {
      cutted = true;
      len--;
    }
    if (cutted) return textToLimit.substring(0, len -2) + "...";
    return textToLimit;
  }

  /**
   * Returns the offset where to start later in order to get a value right aligned.
   * @param graphics the graphics used for drawing - font is relevant
   * @param value the value to be drawn
   * @param availableWidth the available width to draw the value
   * @return the offset (free space)
   */
  protected int getRightAllignOffset(String value, int availableWidth) {
    return availableWidth - getStringWidth(value);
  }

  /**
   * Returns the x value where to start printing a value that should end at the specified end point.
   * @param fontMetrics the font metrics
   * @param value the value to be drawn
   * @param endPoint the x value where the value should end
   * @return the start point to print
   */
  protected int getRightAllignStartPoint(String value, int endPoint) {
    return endPoint - getStringWidth(value);
  }

  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey) {
    return WuicGlobal.getInstance().getResourceString(resourceKey);
  }
  
  /**
   * Returns the string width for current font;
   * @param string the string to check
   * @return the width of the string
   */
  protected int getStringWidth(String string) {
    Font defaultFont = new Font("Default", currentFont.getStyle(), currentFont.getSize());
    return (int)defaultFont.getStringBounds(string, frContext).getWidth();
  }
  
  protected int getFontHeight() {
    return getFontHeight(currentFont);
  }
  
  protected int getFontHeight(FontSpecification font) {
    Font defaultFont = new Font("Default", font.getStyle(), font.getSize());
    return (int)defaultFont.getStringBounds("Anything", frContext).getHeight();
  }
  
}
