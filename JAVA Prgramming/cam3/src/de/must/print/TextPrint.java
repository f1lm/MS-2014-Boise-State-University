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
public class TextPrint {

  PrinterJob pJob;
  Book book1;
  String[] lines;
  int lineCount = -1;

  /**
   *
   */
  public TextPrint() {
    lines = new String[30];
    pJob = PrinterJob.getPrinterJob();
    book1 = new Book();
  }

  /**
   *
   * @param line
   */
  public void printLine(String line) {
    if (++lineCount >= 30) {
      book1.append(new TextPrintPage(lines), pJob.defaultPage());
      lineCount = 0;
    }
    lines[lineCount] = line;
  }

  /**
   *
   */
  public void print() {
    if (lineCount > -1) {
      book1.append(new TextPrintPage(lines), pJob.defaultPage());
      pJob.setPageable(book1);
      if (pJob.printDialog()) {
        try { pJob.print(); }
        catch (Exception exc) {}
      }
    // pJob.close();
    }
  }

}

class TextPrintPage implements Printable {
  Font header1 = new Font("Helvetica-Bold", Font.PLAIN, 48);
  Font standard = new Font("Helvetica", Font.PLAIN, 11);
  int lineHeight = 20;
  String[] lines;

  /**
   *
   * @param lines
   */
  public TextPrintPage(String[] lines) {
    this.lines = lines;
  }

  /**
   *
   * @param g
   * @param pf
   * @param pageIndex
   * @return
   */
  public int print(Graphics g, PageFormat pf, int pageIndex) throws PrinterException {
    g.setFont(header1);
    g.setColor(Color.black);
    g.drawString("Inventurliste", 150, 200);
    g.setFont(standard);
    for (int i = 0; i < 30; i++) {
      if (lines[i] != null) g.drawString(lines[i], 100, 250 + lineHeight * i);
    }
    return Printable.PAGE_EXISTS;
  }

}


