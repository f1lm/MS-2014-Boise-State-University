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
import java.awt.Point;
import java.util.StringTokenizer;
import java.util.Vector;

import de.must.dataobj.Identifier;
import de.must.print.FontSpecification;
import de.must.print.PrintablePage;
import de.must.print.ProportionalListReport;
import de.must.util.Miscellaneous;

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
public abstract class ProportionalListReportDirectly extends RemotePrint implements ProportionalListReport {
  
  private Point pageInfoPosition;
  private int columnSpace = 4; // pixel
  private double[] columnWidth;
  private int[] alignment;
  private boolean firstPrintCalled = false;
  protected Vector<Identifier> identifiers;
  
  public ProportionalListReportDirectly(SessionData sessionData) {
    super(sessionData);
  }
  
  public void start(ToAppletWriter out) {
    this.out = out;
    setFont(defaultFont);
    runCore();
  }

  public boolean isToRun() {
    return true;
  }
  
  private void resetPositionY() {
    positionY = imaAreaY;
    if (positionY < yStartPosition) positionY = yStartPosition;
  }
  
  public abstract String getPrinterJobName(); 
  
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
    setPageInfoPosition(new Point((int)(imaAreaX + imaAreaWidth), (int)imaAreaY));
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
	  double factor = imaAreaWidth / proportionSum;
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
  
	protected void setFont(FontSpecification newFont) {
	  currentFont = newFont;
	}
  
	protected void resetFont() {
	  currentFont = defaultFont;
	}
	
	protected FontSpecification getDefaultFont() {
	  return defaultFont;
	}
  
  /**
   * Adds a paragraph. Word wrap is automatically done.
   * @param paragraph the paragraph to be printed
   * @return the print position of the last line 
   */
  protected PrintablePage.PrintPosition add(String paragraph) {
    StringBuffer lineBuffer = new StringBuffer();
    StringTokenizer st = new StringTokenizer(paragraph);
    while (st.hasMoreTokens()) {
      String nextWord = st.nextToken();
      if (getStringWidth(lineBuffer.toString() + nextWord) <= imaAreaWidth) {
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
    setFont(new FontSpecification(getDefaultFont().getName(), Font.BOLD, getDefaultFont().getSize() + 4));
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
    createColumnWidthIfNull(headerValues);
    add(headerValues);
    addHLine();
    return getCurrentPrintPosition();
  }
  
  /**
   * Adds a horizontal line.
   */
  protected void addHLine() {
    positionY += 5;
    PrintablePage.PrintableLine line = currentPrintablePage.new PrintableLine(imaAreaX, positionY, imaAreaX + imaAreaWidth, positionY);
    if (constantItems) {
      printableItemsForEachPage.add(line);
    } else {
      out.printItem(pageCounter, line);
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
    createColumnWidthIfNull(columnValues);
    lineFeedAndPageCheck(numberOfFollowingLinesToKeepTogether);
    positionX = imaAreaX;
    for (int i = 0; i < columnValues.length; i++) {
      int offset = 0;
      switch (alignment[i]) {
      case ALIGN_CENTER:
        offset = (int)((columnWidth[i] - getStringWidth(columnValues[i])) * 0.5);
        break;
      case ALIGN_RIGHT:
        offset = (int)columnWidth[i] - getStringWidth(columnValues[i]);
        break;
      default:
        break;
      }
      PrintablePage.PrintableItem printableItem = currentPrintablePage.new PrintableTextItem(columnValues[i], currentFont, positionX + offset, positionY);
      if (constantItems) {
        printableItemsForEachPage.add(printableItem);
      } else {
        out.printItem(pageCounter, printableItem, columnWidth[i]);
      }
      positionX += columnWidth[i] + columnSpace;
    }
    return getCurrentPrintPosition();
  }
  
  private void createColumnWidthIfNull(String[] columnValues) {
    if (columnWidth == null) {
      columnWidth = new double[columnValues.length];
      for (int i = 0; i < columnWidth.length; i++) {
        columnWidth[i] = imaAreaWidth / columnValues.length - 5;
      }
    }
  }

  protected void runCore() {
    print();
  }

  protected void printIndividualStuff() {
    fillList();
  }
  
  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey) {
    return sessionData.getFrameworkResourceString(resourceKey);
  }
  
	/**
	 * Called when print is called the first time, therefore Graphics is known.
	 * Thus, all positions may be computed.
	 * Put all your instructions to print (like add...) inside this method.
	 * Call start() to start thread in order to trigger fillList() to be called.
	 */
	protected abstract void fillList();

}
