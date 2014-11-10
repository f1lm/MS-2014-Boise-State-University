/*
 * Copyright (c) 2001-2010 Christoph Mueller. All rights reserved.
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

import de.must.util.StringFunctions;

/**
 * An attribute printing class.
 * @author Christoph Mueller
 */
public abstract class PropertyPrint extends CachedPrinting {

  protected int capacity = 70;
  protected PrintableAttribute[] printableAttributes;
  protected int[] separatorLines;
  protected int[] linesToGo;
  protected int[] horizontalOffsets;
  protected int countPrintableAttributes = -1;
  protected int curAttrInd;
  private String suppressedLabel;
  private int onHoldSeparations = 0;
  private boolean lastOutputWasSeparation = false;
  private Vector<Integer> tabs;
  
  public PropertyPrint() {
    setPrinterDialog(PRINT_DIALOG_EACH_GROUP);
    printableAttributes = new PrintableColumn[capacity];
    separatorLines = new int[capacity];
    linesToGo = new int[capacity];
    horizontalOffsets = new int[capacity];
    tabs = new Vector<Integer>();
    int stdTabDiff = 70;
    for (int i = 1; i <= 8; i++) {
      tabs.add(new Integer(stdTabDiff * i));
    }
  }

  protected void printTitle() {
    String title = null;
    if ((title = getTitle()) == null) return;
    Font titleFont = new Font(defaultFont.getName(), Font.BOLD, 14);
    setFont(titleFont);
    int titleLength = getWidth(title);
    int titleOffset = leftPrintStart + (rightPrintEnding - leftPrintStart) / 2 - titleLength / 2;
    if (titleOffset < leftPrintStart) titleOffset = leftPrintStart;
    curY += firstGraphics.getFontMetrics(currentFont).getHeight();
    newPageWhenIndicated();
    cache(getTitle(), titleFont, titleOffset, (int)curY);
    curY += 10;
    resetFont();
  }

  protected abstract String getTitle();

  /**
   * Returns the horizontal offset of the value (= label length plus space).
   * @return the horizontal offset of the value
   */
  protected int getValueOffset() {
    return 120;
  }

  @Override
  protected void cachePages() {
    newPage();
    printTitle();
    suppressedLabel = null;
    for (curAttrInd = 0; curAttrInd <= countPrintableAttributes; curAttrInd++) {
      if (printableAttributes[curAttrInd].hasContent()) {
        curY += onHoldSeparations * lineFeed;
        onHoldSeparations = 0;
        printAttribute(printableAttributes[curAttrInd]);
        lastOutputWasSeparation = false;
        if (separatorLines[curAttrInd] > 0) {
          curY += separatorLines[curAttrInd] * lineFeed;
          lastOutputWasSeparation = true;
        }
        if (linesToGo[curAttrInd] > 0) curY = linesToGo[curAttrInd] * lineFeed;
        suppressedLabel = null;
      } else {
        suppressedLabel = printableAttributes[curAttrInd].getLabel();
        if (separatorLines[curAttrInd] > 0 && !lastOutputWasSeparation) {
          onHoldSeparations = separatorLines[curAttrInd];
        }
      }
    }
    onHoldSeparations = 0; // don't use it for next call!
  }

  private void printAttribute(PrintableAttribute attributeToPrint) {
    if (attributeToPrint.getLabel() != null) {
      feedLine();
      printLabel(attributeToPrint.getLabel() + ":");
    } else if (suppressedLabel != null) {
      feedLine();
      printLabel(suppressedLabel + ":");
      suppressedLabel = null;
    }
    if (attributeToPrint instanceof PrintableText
    && ((PrintableText)attributeToPrint).isExtendeWith()
    ) {
      feedLine();
      printAttributeValue(attributeToPrint.getText(), 0);
    } else {
      printAttributeValue(attributeToPrint.getText(), getValueOffset());
    }
  }

  private void printLabel(String textToPrint) {
    Font oldFont = firstGraphics.getFont();
    Font font = new Font(oldFont.getName(), oldFont.getStyle(), oldFont.getSize() -1);
    cache(textToPrint, font);
    resetFont();
  }

  protected void printAttributeValue(String textToPrint, int offset) {
    String[] lines = StringFunctions.getStringLines(textToPrint); // separated by /n
    for (int i = 0; i < lines.length; i++) {
      if (i > 0) {
        feedLine();
        newPageWhenIndicated();
      }
      if (lines[i].indexOf('\t') > 0) {
        String[] cols = StringFunctions.getElements(lines[i], "\t");
        int colEnd = 0;
        for (int j = 0; j < cols.length; j++) {
          int tabBegin = leftPrintStart + offset + horizontalOffsets[curAttrInd];
          int x = tabBegin;
          if (j > 0) {
            x = tabBegin + tabs.elementAt(j-1).intValue();
            int k = j; // use next tab if overlapping may occur otherwise
            while (x < colEnd && k < tabs.size()) {
              x = tabBegin + tabs.elementAt(k).intValue();
              k++;
            }
          }
          newPageWhenIndicated();
          if (fits(x, cols[j])) {
            cache(cols[j], x, (int)curY);
            colEnd = x + getWidth(cols[j]);
          } else {
            wrap(x, cols[j], leftPrintStart + offset + horizontalOffsets[curAttrInd]);
          }
        }
      } else {
        if (fits(leftPrintStart + offset + horizontalOffsets[curAttrInd], lines[i])) {
          newPageWhenIndicated();
          cache(lines[i], leftPrintStart + offset + horizontalOffsets[curAttrInd], (int)curY);
        } else { // wrap text
          wrap(leftPrintStart + offset + horizontalOffsets[curAttrInd], lines[i]);
        }
      }
    }
  }

  private void wrap(int xStart, String text) {
    wrap(xStart, horizontalOffsets[curAttrInd], text, xStart);
  }

  private void wrap(int xStart, String text, int nextLineX) {
    wrap(xStart, horizontalOffsets[curAttrInd], text, nextLineX);
  }

  protected boolean fits(int xStart, String text) {
    return xStart + getWidth(text) < rightPrintEnding;
  }
  
}