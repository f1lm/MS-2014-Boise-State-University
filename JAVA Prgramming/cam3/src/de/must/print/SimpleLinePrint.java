/*
 * Copyright (c) 2013 Christoph Mueller. All rights reserved.
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
import java.util.Vector;

public class SimpleLinePrint extends CachedPrinting {
  
  private String title;
  private Vector<String> content;

  public SimpleLinePrint(String title, Vector<String> content) {
    this.title = title;
    this.content = content;
    setPrinterDialog(PRINT_DIALOG_EACH_GROUP);
  }

  @Override
  protected void cachePages() {
    newPage();
    if (title != null) printTitle();
    for (String line : content) {
      printLabel(line);
    }
  }

  private void printTitle() {
    Font titleFont = new Font(defaultFont.getName(), Font.BOLD, 14);
    setFont(titleFont);
    int titleLength = getWidth(title);
    int titleOffset = leftPrintStart + (rightPrintEnding - leftPrintStart) / 2 - titleLength / 2;
    if (titleOffset < leftPrintStart) titleOffset = leftPrintStart;
    curY += firstGraphics.getFontMetrics(currentFont).getHeight();
    newPageWhenIndicated();
    cache(title, titleFont, titleOffset, (int)curY);
    curY += 10;
    resetFont();
  }

  private void printLabel(String textToPrint) {
    feedLine();
    newPageWhenIndicated();
    wrap(textToPrint);
  }

}