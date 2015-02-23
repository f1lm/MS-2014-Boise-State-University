package de.must.print;

import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.print.*;
import java.util.Vector;

import de.must.io.Logger;

/*
 * Copyright (c) 2008-2012 Christoph Mueller. All rights reserved.
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

/**
 * Tool to print labels upon DIN A4 forms.
 * @author Christoph Mueller
 */
public class LabelPrint extends LabelPrintStd {
  
  public static class Label {
    public String[] lines;
    public Label(String line1) {
      lines = new String[]{line1};
    }
    public Label(String line1, String line2) {
      lines = new String[]{line1, line2};
    }
    public Label(String line1, String line2, String line3) {
      lines = new String[]{line1, line2, line3};
    }
  }
  
  public static class Layout {
    public int leftMargin;
    public int topMargin;
    public int lineSpacing;
    public int[] fontSize;
    public Layout() {
      this(0, 0);
    }
    /**
     * Constructs a new label layout using line space 6 px
     * @param leftMargin the left label margin
     * @param topMargin the top label margin / -1 will cause a vertical centering 
     */
    public Layout(int leftMargin, int topMargin) {
      this(leftMargin, topMargin, 6);
    }
    public Layout(int leftMargin, int topMargin, int lineSpacing) {
      this(leftMargin, topMargin, 6, null);
    }
    public Layout(int leftMargin, int topMargin, int lineSpacing, int[] fontSize) {
      this.leftMargin = leftMargin;
      this.topMargin = topMargin;
      this.lineSpacing = lineSpacing;
      this.fontSize = fontSize;
    }
  }
  
  /**
   * Demo main.
   * @param args
   */
  static public void main(String[] args) {
    Vector<Label> demoContent = new Vector<Label>();
    demoContent.add(new Label("Wbr", "2 Egal"));
    demoContent.add(new Label("Kbn", "Aha"));
    demoContent.add(new Label("Wbr", "2 Tata"));
    demoContent.add(new Label("Wbr", "2 Soso"));
    demoContent.add(new Label("Kbn", "Aha"));
    demoContent.add(new Label("Kbn", "Aha2"));
    demoContent.add(new Label("SOKU-DEUT-ALLG", "MÜLL-JOHA"));
    demoContent.add(new Label("FREM-SPAN-SCHU", "GUSC-KLAU"));
    demoContent.add(new Label("FREM-SPAN-SCHU", "GRAU-FRED"));
    demoContent.add(new Label("FREM-SPAN-SCHU", "WAMG-KLAU"));
    int[] fontSize = new int[2];
    fontSize[0] = 14;
    fontSize[1] = 20;
    LabelPrint labelPrint = new LabelPrint(
      FORM_AVERY_ZWECKFORM_L7160,
      demoContent,
      9,
      new Layout(getPx(10), -1, 6, fontSize)
    );
    labelPrint.print("Test-Label");
    System.exit(0);
  }

  private Vector<Label> content;
  private Layout layout;
  private int exhausted;
  private Font standardFont;
  private Font[] lineFonts;
  protected int adjustmentX = 0;
  protected int adjustmentY = 0;

	/**
   * Constructs a new LabelPrint.
	 * @param formId the ID of the used form, e.g. FORM_AVERY_ZWECKFORM_L4732REV25
   * @param content the content to print upon the labels
   * @see #FORM_AVERY_ZWECKFORM_L4732REV25
	 */
  public LabelPrint(int formId, Vector<Label> content) {
    this(formId, content, 0);
  }
  
  /**
   * Constructs a new LabelPrint using standard layout.
   * @param formId the ID of the used form, e.g. FORM_AVERY_ZWECKFORM_L4732REV25
   * @param content the content to print upon the labels
   * @param exhausted the number of labels already exhausted
   * @see #FORM_AVERY_ZWECKFORM_L4732REV25
   */
  public LabelPrint(int formId, Vector<Label> content, int exhausted) {
    this(formId,content, exhausted, new Layout());
  }
  
  /**
   * Constructs a new LabelPrint.
   * @param formId the ID of the used form, e.g. FORM_AVERY_ZWECKFORM_L4732REV25
   * @param content the content to print upon the labels
   * @param exhausted the number of labels already exhausted
   * @param layout the label layout to use
   * @see #FORM_AVERY_ZWECKFORM_L4732REV25
   */
	public LabelPrint(int formId, Vector<Label> content, int exhausted, Layout layout) {
		super(formId);
    this.content = content;
    this.exhausted = exhausted;
    this.layout = layout;
    setPrinterDialog(PRINT_DIALOG_NEVER);
	}

  /**
   * Sets adjustment to correct on wrong printer positioning.
   * @param adjustmentX +- mm more right or left
   * @param adjustmentY +- mm deeper or higher
   */
  public void setAdjustment(int adjustmentX, int adjustmentY) {
    this.adjustmentX = getPx(adjustmentX);
    this.adjustmentY = getPx(adjustmentY);
  }
  
	@Override
	public int print(Graphics graphics, PageFormat pageFormat, int pageIndex)
		throws PrinterException {
    if (standardFont == null) {
      standardFont = graphics.getFont();
    }
	  int contentIndex = 0; // first page;
    if (pageIndex > 0) contentIndex = pageIndex * getLabelCapacity() - exhausted;
    if (contentIndex < 0) {
      contentIndex = 0;
      Logger.getInstance().warn("Exhausted in LabelPrint too high - switched to zero");
    }
    if (contentIndex >= content.size()) return Printable.NO_SUCH_PAGE;
    int toIgnore = 0;
    if (pageIndex == 0) toIgnore = exhausted;
    for (int i = 0; i < form.getAmountY(); i++) {
      for (int j = 0; j < form.getAmountX(); j++) {
        if (toIgnore > 0) toIgnore--; // ignore exhausted label positions
        else {
          if (contentIndex < content.size()) {
            if (lineFonts == null) {
              lineFonts = new Font[content.get(contentIndex).lines.length];
              for (int k = 0; k < content.get(contentIndex).lines.length; k++) { // multiple lines per label
                if (layout.fontSize != null && layout.fontSize[k] > 0) {
                  lineFonts[k] = new Font(standardFont.getName(), standardFont.getStyle(), layout.fontSize[k]);
                } else {
                  lineFonts[k] = standardFont;
                }
              }
            }
            if (layout.topMargin == -1) { // vertical centering
              // space shall be 2:3:...:3:2
              // needed for all fonts:
              int divider = 4; // 2 for beginning, 2 for ending
              int needed = lineFonts[0].getSize();
              for (int k = 1; k < content.get(contentIndex).lines.length; k++) {
                needed += lineFonts[k].getSize();
                divider += 3;
              }
              double free = form.getLabelHeight() - needed;
              layout.topMargin = (int)(free * 2 / divider);
              String[] lines = content.get(contentIndex).lines;
              if (lines.length > 1) {
                layout.lineSpacing = (int) (free * 3 / (lines.length-1) / divider);
              }
            }
            int yPos = layout.topMargin + form.getOffsetY() + (form.getGridY() * i);
            for (int k = 0; k < content.get(contentIndex).lines.length; k++) { // multiple lines per label
              graphics.setFont(lineFonts[k]);
              int availableWidth = form.getLabelWidth() - layout.leftMargin;
              String line = limit(content.get(contentIndex).lines[k], (Graphics2D)graphics, availableWidth);
              int xPos = layout.leftMargin + form.getOffsetX() + (form.getGridX() * j);
              yPos += lineFonts[k].getSize();
              graphics.drawString(line, xPos+adjustmentX, yPos+adjustmentY);
              yPos += layout.lineSpacing;
            }
            contentIndex++;
          } else break;
        }
      }
    }
		return Printable.PAGE_EXISTS;
	}
  
}
