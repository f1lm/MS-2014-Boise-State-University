/*
 * Copyright (c) 2005-2013 Christoph Mueller. All rights reserved.
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
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;
import java.util.Iterator;
import java.util.StringTokenizer;
import java.util.Vector;

import javax.print.PrintService;

import de.must.io.Logger;
import de.must.middle.InterruptibleBatchThread;
import de.must.util.Miscellaneous;
import de.must.wuic.WuicGlobal;

/**
 * Direct print implementation of the report interface for lists with proportional
 * column definition.
 * This is a way of printing by a view lines of code as done in de.must.samples.PrintDirectlySample.
 * Word wrap of continuous text is supported as well as table printing.
 * The paradigm of this sample is - back to the roots: Don't call me, I'll call you. 
 * This means e.g., I read some database tables, compute some stuff and put it out in the sequence as I am used to.
 * The result is buffered, at the moment in Vectors. After that the result is provided in a sequence,
 * the renderer (printer) wants to retrieve it (e.g. page 1, page 2, again page 1).
 * @author Christoph Mueller
 * @see de.must.samples.PrintDirectlySample
 */
public abstract class ProportionalListReportDirectly extends InterruptibleBatchThread implements ProportionalListReport, Printable {
  
  protected static final double SQUARE_ROOT_OF_TWO = 1.4142135623730950488016887242097; 

  private boolean virgin = true; // nothing print-planned yet
  private boolean orientationLandscape;
  private PrinterJob printerJob;
  private PageFormat pageFormat;
  private Previewer previewer;
  private FontSpecification currentFontSpec;
  private Font defaultFont;
  private Font currentFont;
  private boolean constantItems = false;
  private Point pageInfoPosition;
  private Vector<PrintablePage.PrintableItem> printableItemsForEachPage = new Vector<PrintablePage.PrintableItem>();
  private Vector<PrintablePage> printablePages = new Vector<PrintablePage>();
  private double topMargin = 72; // pixel
  private double leftMargin = 72; // pixel
  // private int rightMargin = 3; // pixel
  private int columnSpace = 4; // pixel
  private int pageCounter = 0;
  private int yStartPosition;
  private double positionX;
  private double positionY = topMargin;
  private double yLimit = 648;
  private double imagableWidth = 468;
  private double[] columnWidth;
  private int[] alignment;
  private PrintablePage currentPrintablePage;
  private boolean firstPrintCalled = false;
  private Graphics graphics;
  
  public ProportionalListReportDirectly() {
  }
  
  protected void setOrientationLandscape() {
    orientationLandscape = true;
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
  
  public void setPrinterJob(PrinterJob printerJob) {
    this.printerJob = printerJob;
    if (getPrinterJobName() != null) printerJob.setJobName(getPrinterJobName());
    pageFormat = getPageFormat(printerJob);
    if (orientationLandscape) pageFormat.setOrientation(PageFormat.LANDSCAPE);
    firstPrintCalled = false;
//    System.out.println("getHeight: " + pageFormat.getHeight());
//    System.out.println("getImageableHeight: " + pageFormat.getImageableHeight());
//    System.out.println("getImageableWidth: " + pageFormat.getImageableWidth());
//    System.out.println("getImageableX: " + pageFormat.getImageableX());
//    System.out.println("getImageableY: " + pageFormat.getImageableY());
//    System.out.println("getWidth: " + pageFormat.getWidth());
//    System.out.println("Klaro?");
    leftMargin = pageFormat.getImageableX();
    topMargin = pageFormat.getImageableY();
    imagableWidth = pageFormat.getImageableWidth();
    resetPositionY();
    yLimit = pageFormat.getImageableY() + pageFormat.getImageableHeight();
  }
  
  private void resetPositionY() {
    positionY = topMargin;
    if (positionY < yStartPosition) positionY = yStartPosition;
  }
  
  public abstract String getPrinterJobName(); 
  
  /**
   * Sets a previewer. Optional.
   * @param previewer the previewer to be used to preview printout.
   */
  public void setPreviewer(Previewer previewer) {
    this.previewer = previewer;
  }
  
  /**
   * Determines whether or not the following items should be printed on each page.
   * Useful for headers and table headers.
   * If page header contains variable data (e.g. group fields), override fillPageHeader
   * instead of switching on constant items.
   * @param constantItems whether or not the following items should be printed on each page
   */
  public void setConstantItems(boolean constantItems) {
    this.constantItems = constantItems;
  }
  
  /**
   * Activates automatic printing of page information at the standard place.
   */
  public void setOnPageInfo() {
    setPageInfoPosition(new Point((int)(leftMargin + imagableWidth), (int)topMargin));
  }
  
  /**
   * Sets the position where page number information is to be placed.
   * @param pageInfoPosition the ending position of the page information
   */
  public void setPageInfoPosition(Point pageInfoPosition) {
    this.pageInfoPosition = pageInfoPosition;
  }
  
  /**
   * Sets the column default proportion to influence column width.  
   * @param columnProportion the proportion usually to be used 
   */
  public void setDefaultProportion(int[] columnProportion) {
    int proportionSum = 0;
    alignment = new int[columnProportion.length];
    for (int i = 0; i < columnProportion.length; i++) {
      proportionSum += columnProportion[i];
    }
    double factor = imagableWidth / proportionSum;
    columnWidth = new double[columnProportion.length];
    for (int i = 0; i < columnProportion.length; i++) {
      columnWidth[i] = (columnProportion[i] * factor);
      if (i < columnProportion.length - 1) {
        columnWidth[i] -= columnSpace;  // leave some space except the last column
      }
    }
  }
  
  /**
   * Sets the alignment of a specific column.
   * @param columnIndex the index of the regarded column
   * @param alignType the align type of the specified column
   * @see ProportionalListReport#ALIGN_LEFT
   * @see ProportionalListReport#ALIGN_CENTER
   * @see ProportionalListReport#ALIGN_RIGHT
   */
  protected void setAlignment(int columnIndex, int alignType) {
    alignment[columnIndex] = alignType;
  }
  
  /**
   * Sets the current font and its associated current font specification
   * @param newFont the new font to become current font
   */
  protected void setFont(Font newFont) {
    currentFont = newFont;
    currentFontSpec = new FontSpecification(newFont);
  }
  
  /**
   * Resets the current font and its current font specification to default
   */
  protected void resetFont() {
    currentFont = defaultFont;
    currentFontSpec = new FontSpecification(defaultFont);
  }
  
  protected Font getDefaultFont() {
    return defaultFont;
  }
  
  /**
   * Adds a paragraph. Word wrap is automatically done.
   * @param paragraph the paragraph to be printed
   * @return the print position of the last line 
   */
  protected PrintablePage.PrintPosition add(String paragraph) {
    doInitialStuffIfNecessary();
    StringBuffer lineBuffer = new StringBuffer();
    StringTokenizer st = new StringTokenizer(paragraph);
    while (st.hasMoreTokens()) {
      String nextWord = st.nextToken();
      if (graphics.getFontMetrics(currentFont).stringWidth(lineBuffer.toString() + nextWord) <= imagableWidth) {
        lineBuffer.append(nextWord);
        lineBuffer.append(' ');
      }
      else {
        String line = lineBuffer.toString();
        lineBuffer = new StringBuffer(nextWord);
        lineBuffer.append(' ');
        addSingleLine(line);
      }
    }
    return addSingleLine(lineBuffer.toString());
  }
  
  /**
   * Adds a title (with special font.
   * @param title  the title to be added
   */
  public void addTitle(String title) {
    setFont(new Font(getDefaultFont().getFamily(), Font.BOLD, getDefaultFont().getSize() + 4));
    add(Miscellaneous.getReplacement(title));
    resetFont(); 
    addEmptyLine();
  }
  
  /**
   * Adds a row of values with meaning table header.
   * @param headerValues the table header values
   * @return the current print position
   */
  protected PrintablePage.PrintPosition addTableHeader(String[] headerValues) {
    doInitialStuffIfNecessary();
    createColumnWidthIfNull(headerValues);
    add(headerValues);
    addHLine();
    return getCurrentPrintPosition();
  }
  
  /**
   * Adds a horizontal line.
   */
  protected void addHLine() {
    doInitialStuffIfNecessary();
    positionY += 5;
    PrintablePage.PrintableLine line = currentPrintablePage.new PrintableLine(leftMargin, positionY, leftMargin + imagableWidth, positionY);
    if (constantItems) {
      printableItemsForEachPage.add(line);
    } else {
      currentPrintablePage.add(line);
    }
  }

  /**
   * Adds a table row to the current page.
   * @param columnValues values of the current row.
   * @return the current print position
   */
  protected PrintablePage.PrintPosition add(String[] columnValues) {
    return add(columnValues, 0);
  }

  /**
   * Adds a table row to the current page.
   * @param columnValues values of the current row.
   * @param numberOfFollowingLinesToKeepTogether the number of following lines to keep together
   * @return the current print position
   */
  protected PrintablePage.PrintPosition add(String[] columnValues, int numberOfFollowingLinesToKeepTogether) {
    doInitialStuffIfNecessary();
    createColumnWidthIfNull(columnValues);
    lineFeedAndPageCheck(numberOfFollowingLinesToKeepTogether);
    positionX = leftMargin;
    for (int i = 0; i < columnValues.length; i++) {
      String text = getFittingString(columnValues[i], columnWidth[i]);
      int offset = 0;
      switch (alignment[i]) {
      case ALIGN_CENTER:
        offset = (int)((columnWidth[i] - graphics.getFontMetrics(currentFont).stringWidth(text)) * 0.5);
        break;
      case ALIGN_RIGHT:
        offset = (int)columnWidth[i] - graphics.getFontMetrics(currentFont).stringWidth(text);
        break;
      default:
        break;
      }
      PrintablePage.PrintableItem printableItem = currentPrintablePage.new PrintableTextItem(text, currentFontSpec, positionX + offset, positionY);
      if (constantItems) {
        printableItemsForEachPage.add(printableItem);
      } else {
        currentPrintablePage.add(printableItem);
      }
      positionX += columnWidth[i] + columnSpace;
    }
    return getCurrentPrintPosition();
  }
  
  private void createColumnWidthIfNull(String[] columnValues) {
    if (columnWidth == null) {
      columnWidth = new double[columnValues.length];
      for (int i = 0; i < columnWidth.length; i++) {
        columnWidth[i] = imagableWidth / columnValues.length - 5;
      }
    }
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
    doInitialStuffIfNecessary();
    positionY += graphics.getFontMetrics(currentFont).getHeight() * factor;
    if (positionY > yLimit)pageFeed();
    return getCurrentPrintPosition();
  }
  
  private PrintablePage.PrintPosition addSingleLine(String line) {
    doInitialStuffIfNecessary();
    PrintablePage.PrintPosition printPosition = currentPrintablePage.new PrintPosition();
    lineFeedAndPageCheck(0);
    PrintablePage.PrintableItem printableItem = currentPrintablePage.new PrintableTextItem(line, currentFontSpec, leftMargin, positionY);
    if (constantItems) {
      printableItemsForEachPage.add(printableItem);
    } else {
      currentPrintablePage.add(printableItem);
    }
    printPosition.page = pageCounter;
    printPosition.xPosition = leftMargin;
    printPosition.yPosition = positionY;
    return printPosition;
  }
  
  private void doInitialStuffIfNecessary() {
    if (virgin) {
      virgin = false;
      fillPageHeader();
    }
  }
  
  private PrintablePage.PrintPosition getCurrentPrintPosition() {
    PrintablePage.PrintPosition printPosition = currentPrintablePage.new PrintPosition();
    printPosition.page = pageCounter;
    printPosition.xPosition = leftMargin;
    printPosition.yPosition = positionY;
    return printPosition;
  }
  
  /**
   * Line feed and page check.
   * @param numberOfFollowingLinesToKeepTogether the number of following lines to keep together
   */
  private void lineFeedAndPageCheck(int numberOfFollowingLinesToKeepTogether) {
    int fontHeight = graphics.getFontMetrics(currentFont).getHeight();
    positionY += fontHeight;
    if (positionY > yLimit - numberOfFollowingLinesToKeepTogether * fontHeight) {
      pageFeed();
      positionY += fontHeight;
    }
  }
  
  protected void pageFeed() {
    pageCounter++;
    currentPrintablePage = new PrintablePage();
    printablePages.add(currentPrintablePage);
    if (printableItemsForEachPage.size() > 0) {
      positionY = ((PrintablePage.PrintableItem)printableItemsForEachPage.lastElement()).positionY;
    } else {
      resetPositionY();
    }
    fillPageHeader();
  }
  
  /**
   * Fills the header of each page. Useful if header contains variable data like e.g. group fields.
   * Override it to build page header with variable data.
   * Will be called automatically each time a new page is build. 
   */
  protected void fillPageHeader() {}

  /**
   * Returns the max. part of a string fitting length as specified.
   * @param string the string to be truncated
   * @param maxLength the max length of the result string
   * @return the truncated string
   */
  private String getFittingString(String string, double maxLength) {
    if (graphics.getFontMetrics(currentFont).stringWidth(string) <= maxLength) {
      return string; // quick return option
    }
    char[] charSource = string.toCharArray();
    StringBuffer resultBuffer = new StringBuffer();
    for (int i = 0; i < charSource.length; i++) {
       if (graphics.getFontMetrics(currentFont).stringWidth(resultBuffer.toString() + charSource[i]) <= maxLength) {
         resultBuffer.append(charSource[i]);
       } else {
         break;
       }
    }
    return resultBuffer.toString();
  }
  
  /**
   * Sets the print service by the name as specified. If no print service with the specified name is found,
   * the print service will not be changed.
   * @param printerName
   */
  public void setPrinter(String printerName) {
    PrintService[] printServices = PrinterJob.lookupPrintServices();
    for (int i = 0; i < printServices.length; i++) {
      if (printServices[i].getName().equalsIgnoreCase(printerName)) {
        if (printerJob == null) {
          setPrinterJob(PrinterJob.getPrinterJob());
        }
        try {
          printerJob.setPrintService(printServices[i]);
        } catch (PrinterException e) {
          Logger.getInstance().error(getClass(), e);
        }
      }
    }
  }
  
  @Override
  protected void runCore() throws Exception {
    if (printerJob == null) {
      setPrinterJob(PrinterJob.getPrinterJob());
    }
    PageFormat pageFormat = getPageFormat(printerJob);
    if (pageFormat != null) {
      if (orientationLandscape) pageFormat.setOrientation(PageFormat.LANDSCAPE);
      printerJob.setPrintable(this, pageFormat);
    } else {
      printerJob.setPrintable(this);
    }
    if (true) {
      try {
        printerJob.print();
      } catch (PrinterException e) {
        Logger.getInstance().error(getClass(), e);
      }
    }
  }
  
  /**
   * Returns the page format to use. Override method to change standard behavior.
   * @param printerJob  the given PrinterJob
   * @return the page format to use
   */
  protected PageFormat getPageFormat(PrinterJob printerJob) {
    return printerJob.defaultPage();
  }

  @Override
  public int print(Graphics graphics, PageFormat pageFormat, int pageIndex) throws PrinterException {
    if (!firstPrintCalled) {
      this.graphics = graphics;
      defaultFont = graphics.getFont();
      setFont(defaultFont);
      currentPrintablePage = new PrintablePage();
      printablePages.add(currentPrintablePage);
      fillList();
      if (previewer != null) {
        previewer.setPageAmount(printablePages.size());
      }
      firstPrintCalled = true;
    }
    if (pageIndex >= printablePages.size()) return Printable.NO_SUCH_PAGE;
    printFixStuff(graphics, pageFormat, pageIndex);
    if (pageInfoPosition != null) {
      String pageInfo = getTranslation("TEXT_PAGE") + " " + (pageIndex+1) + " " + getTranslation("TEXT_OF") + " " + printablePages.size();
      graphics.drawString(pageInfo, pageInfoPosition.x - graphics.getFontMetrics(currentFont).stringWidth(pageInfo), pageInfoPosition.y + graphics.getFontMetrics(currentFont).getHeight());
    }
    printItems(graphics, printableItemsForEachPage);
    PrintablePage printablePage = (PrintablePage)printablePages.elementAt(pageIndex);
    Vector<PrintablePage.PrintableItem> printableItems = printablePage.getPrintableItems();
    printItems(graphics, printableItems);
    return Printable.PAGE_EXISTS;
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
        graphics.drawString(printableItem.toString(), (int)printableItem.getPositionX(), (int)printableItem.getPositionY());
      }
    }
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
   * Prints fix stuff for each page. Override this method to use it, it is called each 
   * time a page should be rendered.
   * @param graphics the context into which the page is drawn 
   * @param pageFormat the size and orientation of the page being drawn
   * @param pageIndex the zero based index of the page to be drawn
   */
  protected void printFixStuff(Graphics graphics, PageFormat pageFormat, int pageIndex) {}

  /**
   * Called when print is called the first time, therefore Graphics is known.
   * Thus, all positions may be computed.
   * Put all your instructions to print (like add...) inside this method.
   * Call start() to start thread in order to trigger fillList() to be called.
   */
  protected abstract void fillList();

  protected void changeFontIfNew(PrintablePage.PrintableItem printableItem, Graphics graphics) {
    if (!(printableItem instanceof PrintablePage.PrintableTextItem)) return;
    PrintablePage.PrintableTextItem item = (PrintablePage.PrintableTextItem)printableItem;
    if (item.getFontSpec() != null && item.getFontSpec() != currentFontSpec) {
      graphics.setFont(currentFont = item.getFontSpec().changeFont(currentFont));
      currentFontSpec = item.getFontSpec();
    }
  }

}
