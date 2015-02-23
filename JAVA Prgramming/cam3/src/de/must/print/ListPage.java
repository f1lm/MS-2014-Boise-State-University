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
public abstract class ListPage implements Printable {
  protected int standardFontSize = 11;
  protected int header1FontSize = 48;
  protected Font header1 = new Font("Helvetica-Bold", Font.PLAIN, 48);
  protected Font standard = new Font("Helvetica", Font.PLAIN, 11);
  protected int lineHeight = 20;
  private int lines = 0;
  protected int yPos;

  public ListPage() {
  }

  /**
   *
   * @param g
   * @param pf
   * @param pageIndex
   * @return
   */
   public int print(Graphics g, PageFormat pf, int pageIndex) throws PrinterException {
    printHeader(g);
    printLines(g);
    return Printable.PAGE_EXISTS;
  }

  /**
   *
   * @param g
   */
  protected void printHeader(Graphics g) {
    g.setFont(header1);
    g.setColor(Color.black);
    g.drawString("Inventurliste", 150, 50);
  }

  /**
   *
   * @param g
   */
  protected void printLines(Graphics g) {
    g.setColor(Color.black);
    g.setFont(standard);
  }

  /**
   *
   * @return
   */
  protected boolean nextLine() {
    yPos = 80 + ++lines * lineHeight;
    return (yPos < 600);
  }

}
