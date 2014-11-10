/*
 * Copyright (c) 2003-2013 Christoph Mueller. All rights reserved.
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
import java.awt.print.*;

import javax.print.PrintService;

import de.must.io.Logger;
import de.must.wuic.WuicGlobal;

/**
 * Simple printing.
 * @author Christoph Mueller
 */
public abstract class SimplePrinting implements Printable {

  public static final int PRINT_DIALOG_NEVER = 0;
  public static final int PRINT_DIALOG_ONCE = 1;
  public static final int PRINT_DIALOG_EACH_GROUP = 2;
  public static final int PRINT_DIALOG_ALWAYS = 3;
  
  /**
   * Converts millimeters to values needed by graphics.drawXxxx coordinates for drawing on printers.  
   * @param mm millimeter
   * @return values needed by graphics.drawXxxx coordinates for drawing on printers
   */
  public static int getPx(double mm) {
    return (int)(mm * 2.845);
  }
  
  protected PrintService printService;
  protected PrinterJob printerJob;
  protected int printDialogChoice = PRINT_DIALOG_NEVER;
  protected boolean groupStart;
  protected boolean firstPrintCalled = false;
  protected FontSpecification currentFontSpec;
  protected Font originalFont;
  protected int leftPrintStart = 75;
  protected int rightPrintEnding;
  protected int topPrintStart;
  protected int bottomPrintEnding;
  protected int lineFeed = 14;
  /**
   * The current vertical position of text baseline.
   */
  protected double curY;

  /**
   * Sets the type of wished printer dialog.
   * @param printerDialogWished the the type of wished printer dialog
   * @see #PRINT_DIALOG_NEVER
   * @see #PRINT_DIALOG_ONCE
   * @see #PRINT_DIALOG_EACH_GROUP
   * @see #PRINT_DIALOG_ALWAYS
   */
  public void setPrinterDialog(int printerDialogWished) {
    this.printDialogChoice = printerDialogWished;
  }
  
  public void startGroup() {
    groupStart = true;
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
        printService = printServices[i];
      }
    }
  }
  
  protected MotivePageFormat getPageFormat(PrinterJob printerJob) {
    return null;
  }
  
  /**
   * Prints.
   */
  public void print() {
    print(null);
  }

  /**
   * Prints.
   * @param jobName the name of the job
   */
  public void print(String jobName) {
    firstPrintCalled = false;
    boolean doPrint = true;
    if (printerJob == null) {
      printerJob = PrinterJob.getPrinterJob();
      if (printService != null) {
        try {
          printerJob.setPrintService(printService);
          if (jobName != null && jobName.length() > 0) printerJob.setJobName(jobName);
        } catch (PrinterException e) {
          Logger.getInstance().error(getClass(), e);
        }
      }
      MotivePageFormat pageFormat = getPageFormat(printerJob);
      if (pageFormat != null) {
        printerJob.setPrintable(this, pageFormat.getPageFormat());
      } else {
        printerJob.setPrintable(this);
      }
      if (printDialogChoice == PRINT_DIALOG_ONCE) {
        doPrint = printerJob.printDialog();
      }
    }
    if (printDialogChoice == PRINT_DIALOG_EACH_GROUP && groupStart) {
      doPrint = printerJob.printDialog();
      groupStart = false;
    }
    if (printDialogChoice == PRINT_DIALOG_ALWAYS) {
      doPrint = printerJob.printDialog();
    }
    if (doPrint) {
      try {
        beforePrinting();
        printerJob.print();
        afterPrinting();
      } catch (PrinterException e) {
        de.must.io.Logger.getInstance().error(getClass(), e);
      }
    }
  }
  
  /**
	 * Called before printing is started - override this method to load data.
	 */
	protected void beforePrinting() {
  }
	
  /**
   * Called after printing is completed - override this method e.g. to inform about result.
   */
  protected void afterPrinting() {
  }
  
	protected void setMargins(PageFormat format) {
	  int possibleLeftBeginning = (int)format.getImageableX();
    int possibleRightEnding = (int)(format.getImageableX() + format.getImageableWidth());
    int possibleTopBeginning = (int)format.getImageableY();
    int possibleBottomEnding = (int)(format.getImageableY() + format.getImageableHeight());
    double relativeMargin = 0.07;
    int niceMargin = (int)(format.getWidth() * relativeMargin);
    if (format.getHeight() > format.getWidth()) {
      niceMargin = (int)(format.getHeight() * relativeMargin);
    }
    int niceLeftBeginning = niceMargin;
    int niceRightEnding = (int)format.getWidth() - niceMargin;
    if (format.getOrientation() == PageFormat.PORTRAIT) {
      niceLeftBeginning = (int)(format.getWidth() * 0.11); // binding margin
    }
    int niceTopBeginning = niceMargin;
    int niceBottomEnding = (int)format.getHeight() - niceMargin;
    if (niceLeftBeginning > possibleLeftBeginning) leftPrintStart = niceLeftBeginning;
    else leftPrintStart = possibleLeftBeginning;
    if (niceRightEnding < possibleRightEnding) rightPrintEnding = niceRightEnding;
    else rightPrintEnding = possibleRightEnding;
    if (niceTopBeginning > possibleTopBeginning) topPrintStart = niceTopBeginning;
    else topPrintStart = possibleTopBeginning;
    if (niceBottomEnding < possibleBottomEnding) bottomPrintEnding = niceBottomEnding;
    else bottomPrintEnding = possibleBottomEnding;
	}
  
  protected void setOnBold(Graphics graphics) {
    if (originalFont == null) originalFont = graphics.getFont();
    graphics.setFont(new Font(originalFont.getFontName(), Font.BOLD, originalFont.getSize()));
  }
  
  protected void resetFont(Graphics graphics) {
    graphics.setFont(originalFont);
  }
  
  /**
   * Limits a text to the specified length if necessary and marks the result with "..."
   * as cut by adding "..." to the cut result.
	 * @param textToLimit the text to be limited
	 * @param maxLength the max length of the result
	 * @return the limited text
	 */
	protected String limit(String textToLimit, int maxLength) {
    if (textToLimit.length() <= maxLength) return textToLimit;
    return textToLimit.substring(0, maxLength - 2) + "...";
  }

  /**
   * Limits a text to the specified length if necessary and marks the result with "..."
   * @param textToLimit the text to be limited
   * @param graphics the Graphics2D context
   * @param maxPixel the maximum of available space in pixel
   * @return the limited text
   */
  protected String limit(String textToLimit, Graphics2D graphics, int maxPixel) {
    boolean cutted = false;
    int len = textToLimit.length();
    while (graphics.getFontMetrics().charsWidth(textToLimit.toCharArray(), 0, len) > maxPixel) {
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
  protected int getRightAllignOffset(Graphics graphics, String value, int availableWidth) {
    return availableWidth - graphics.getFontMetrics().stringWidth(value);
  }

  /**
   * Returns the x value where to start printing a value that should end at the specified end point.
   * @param graphics the graphics used for drawing - font is relevant
   * @param value the value to be drawn
   * @param endPoint the x value where the value should end
   * @return the start point to print
   */
  protected int getRightAllignStartPoint(Graphics graphics, String value, int endPoint) {
    return endPoint - graphics.getFontMetrics().stringWidth(value);
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
  
  protected void changeFontIfNew(PrintablePage.PrintableItem printableItem, Graphics graphics) {
    if (!(printableItem instanceof PrintablePage.PrintableTextItem)) return;
    if (originalFont == null) originalFont = graphics.getFont();
    PrintablePage.PrintableTextItem item = (PrintablePage.PrintableTextItem)printableItem;
    if (item.getFontSpec() != null && item.getFontSpec() != currentFontSpec) {
      graphics.setFont(item.getFontSpec().changeFont(originalFont));
      currentFontSpec = item.getFontSpec();
    }
  }

}
