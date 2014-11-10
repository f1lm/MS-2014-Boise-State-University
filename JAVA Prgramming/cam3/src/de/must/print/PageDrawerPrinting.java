/*
 * Copyright (c) 2007 Christoph Mueller. All rights reserved.
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

import java.awt.Graphics;
import java.awt.print.PageFormat;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;

/**
 * Printer utility to send information drawed by PageDrawer to printer.
 * @see de.must.print.PageDrawer
 * @author Christoph Mueller
 */
public class PageDrawerPrinting extends SimplePrinting {
  
  private PageDrawer pageDrawer;
  
  /**
   * Constructs a new PagerDrawerPrinting with the specified PagerDrawer which does the drawing.
   * @param pageDrawer the page drawer where drawing is delegated to.
   */
  public PageDrawerPrinting(PageDrawer pageDrawer) {
    this.pageDrawer = pageDrawer;
    if (pageDrawer.getPrinterName() != null && pageDrawer.getPrinterName().length() > 0) {
      setPrinter(pageDrawer.getPrinterName());
    }
  }
  
  protected MotivePageFormat getPageFormat(PrinterJob printerJob) {
    return pageDrawer.getPageFormat(printerJob);
  }

  /* (non-Javadoc)
   * @see java.awt.print.Printable#print(java.awt.Graphics, java.awt.print.PageFormat, int)
   */
  public int print(Graphics graphics, PageFormat pageFormat, int pageIndex) throws PrinterException {
    return pageDrawer.draw(graphics, pageIndex);
  }

}
