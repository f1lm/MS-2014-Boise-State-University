/*
 * Copyright (c) 2007-2013 Christoph Mueller. All rights reserved.
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

import java.awt.Component;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Toolkit;
import java.util.Vector;

import de.must.io.Logger;
import de.must.util.KeyValuePairNum;

import net.sourceforge.barbecue.Barcode;
import net.sourceforge.barbecue.BarcodeException;
import net.sourceforge.barbecue.BarcodeFactory;

/**
 * Barcode drawer. Draws barcode in Graphics2D context.
 * Current implementation uses barbecue, see http://sourceforge.net/projects/barbecue/
 * @author Christoph Mueller
 */
public class BarcodeDrawer {
  
  public static final int BARCODE_TYPE_CODE128 = 0;
  public static final int BARCODE_TYPE_COD39 = 1;
  public static final int BARCODE_TYPE_INT2OF5 = 2;
  
  public static KeyValuePairNum[] getAvailableBarcodeTypes() {
    return new KeyValuePairNum[] {
        new KeyValuePairNum(BARCODE_TYPE_CODE128, "Code 128"),
        new KeyValuePairNum(BARCODE_TYPE_COD39, "Code 39"),
        new KeyValuePairNum(BARCODE_TYPE_INT2OF5, "Interleave 2 of 5"),
    };
  }
  
  private int barcodeType;
  private int barHeight = 30;
  private int adjustmentX = 0;
  private int adjustmentY = 0;
  private Font defaultFont;

  
  public BarcodeDrawer() {
		this(BARCODE_TYPE_CODE128);
  }

  /**
   * Constructs a new barcode drawer to render barcodes of the specified type.
   * @param barcodeType the type of barcode to use
   * @see #BARCODE_TYPE_CODE128
   * @see #BARCODE_TYPE_INT2OF5
   * @see #BARCODE_TYPE_COD39
   */
  public BarcodeDrawer(int barcodeType) {
    super();
    this.barcodeType = barcodeType;
  }
  
  /**
   * Sets the barcode type.
   * @param barcodeType the type of barcode to use
   * @see #BARCODE_TYPE_CODE128
   * @see #BARCODE_TYPE_COD39
   * @see #BARCODE_TYPE_INT2OF5
   */
  public void setBarcodeType(int barcodeType) {
    this.barcodeType = barcodeType;
  }
  
  public void setBarHeight(int barHeight) {
    this.barHeight = barHeight;
  }

  /**
   * Sets adjustment to correct on wrong printer positioning.
   * @param adjustmentX +- mm more right or left
   * @param adjustmentY +- mm deeper or higher
   */
  public void setAdjustment(int adjustmentX, int adjustmentY) {
    this.adjustmentX = LabelPrintStd.getPx(adjustmentX);
    this.adjustmentY = LabelPrintStd.getPx(adjustmentY);
  }
  
  /**
   * Renders a barcode at the specified location in the specified Graphics2D context.
   * @param graphics2D the graphics context
   * @param text the text (barcode content)
   * @param x the horizontal value of the upper left co-ordinate of the bounding box
   * @param y the vertical value of the upper left co-ordinate of the bounding box
   * @param font the font of the text below the barcode
   */
  public void drawBarcode(Graphics2D graphics2D, String text, int x, int y, Font font) {
    try {
      getBarcode(text, font).draw(graphics2D, x+adjustmentX, y+adjustmentY);
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
    }
  }

  public void drawBarcode(Graphics2D graphics2D, String text, int x, int y) {
    try {
      getBarcode(text, getDefaultFont(graphics2D)).draw(graphics2D, x+adjustmentX, y+adjustmentY);
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
  private Font getDefaultFont(Graphics2D graphics2D) {
    if (defaultFont == null) {
      defaultFont = new Font(graphics2D.getFont().getName(), graphics2D.getFont().getStyle(), 8);
    }
    return defaultFont;
  }

  public void drawBarcodeInCenter(Graphics2D graphics2D, String text, int imageableX, int y, int imagableWidth, Font font) {
    try {
      Barcode barcode = getBarcode(text, font);
      int x = imagableWidth / 2 - barcode.getWidth() / 2 + imageableX;
      barcode.draw(graphics2D, x+adjustmentX, y+adjustmentY);
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
  public void drawBarcodeInCenter(Graphics2D graphics2D, String text, int imageableX, int imageableY, int imagableWidth, int imagableHeight, Font font) {
    try {
      Barcode barcode = getBarcode(text, font);
      int x = imagableWidth / 2 - barcode.getWidth() / 2 + imageableX;
      int y = imagableHeight / 2 - barcode.getHeight() / 2 + imageableY;
      barcode.draw(graphics2D, x+adjustmentX, y+adjustmentY);
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
  public void drawBarcodeRightmost(Graphics2D graphics2D, String text, int imageableX, int y, int imagableWidth, Font font) {
    try {
      Barcode barcode = getBarcode(text, font);
      int x = imageableX + imagableWidth - barcode.getWidth();
      barcode.draw(graphics2D, x+adjustmentX, y+adjustmentY);
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
  public void drawBarcodeAboveImage(Graphics2D graphics2D, String text, Image image, int imageableX, int imageableY, int imagableWidth, int imagableHeight, Font font) {
    try {
      Barcode barcode = getBarcode(text, font);
      int imgWidth = image.getWidth(null); // returns -1 sometimes, but not after prepareImage
      int imgHeight = image.getHeight(null);
      Toolkit.getDefaultToolkit().prepareImage(image, imgWidth, imgHeight, null);
      // wait until image is loaded completely
      while ((Toolkit.getDefaultToolkit().checkImage(image, imgWidth, imgHeight,null) & Component.ALLBITS) != Component.ALLBITS) {
        try { Thread.sleep(50); }
        catch(InterruptedException e) { Logger.getInstance().error(getClass(), e); }
      }
      imgWidth = image.getWidth(null) * 72 / 600; // screen resolution / printer resolution
      imgHeight = image.getHeight(null) * 72 / 600;
      int xB = imagableWidth / 2 - barcode.getWidth() / 2 + imageableX;
      int xI = imagableWidth / 2 - imgWidth / 2 + imageableX;
      int marginY = (imagableHeight - (barcode.getHeight() + imgHeight)) / 3;
      int yB = marginY + imageableY;
      int yI = marginY + barcode.getHeight() + marginY + imageableY;
      barcode.draw(graphics2D, xB+adjustmentX, yB+adjustmentY);
      graphics2D.drawImage(image, xI+adjustmentX, yI+adjustmentY, imgWidth, imgHeight, null);
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
  public void drawBarcodeAboveFixtext(Graphics2D graphics2D, String text, String fixtext, int imageableX, int imageableY, int imagableWidth, int imagableHeight, Font font, Font fixtextFont) {
    try {
      int textWidth = graphics2D.getFontMetrics(fixtextFont).stringWidth(fixtext);
      int textHeight = graphics2D.getFontMetrics(fixtextFont).getHeight();
      Barcode barcode = getBarcode(text, font);
      int xB = imagableWidth / 2 - barcode.getWidth() / 2 + imageableX;
      int xT = imagableWidth / 2 - textWidth / 2 + imageableX;
      int marginY = (imagableHeight - (barcode.getHeight() + textHeight)) / 3;
      int yB = marginY + imageableY;
      int yT = marginY + barcode.getHeight() + marginY + imageableY;
      graphics2D.setFont(font);
      barcode.draw(graphics2D, xB+adjustmentX, yB+adjustmentY);
      graphics2D.setFont(fixtextFont);
      graphics2D.drawString(fixtext, xT+adjustmentX, yT+adjustmentY + textHeight);
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
  public void drawBarcodeAboveFixtext(Graphics2D graphics2D, String text, Vector<String> fixlines, int imageableX, int imageableY, int imagableWidth, int imagableHeight, Font font, Font fixtextFont, int xT) {
    try {
      int textAscent = graphics2D.getFontMetrics(fixtextFont).getAscent();
      Barcode barcode = getBarcode(text, font);
      int xB = imagableWidth / 2 - barcode.getWidth() / 2 + imageableX;
      int marginY = (imagableHeight - barcode.getHeight() - (textAscent * fixlines.size())) / (2 + fixlines.size());
      int yB = imageableY + marginY;
      graphics2D.setFont(font);
      barcode.draw(graphics2D, xB+adjustmentX, yB+adjustmentY);
      graphics2D.setFont(fixtextFont);
      int yT = imageableY + marginY + barcode.getHeight() + marginY + textAscent;
      for (String line : fixlines) {
        graphics2D.drawString(line, xT+adjustmentX, yT+adjustmentY);
        yT += marginY + textAscent;
      }
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
  private Barcode getBarcode(String text, Font font) throws BarcodeException {
    Barcode barcode = null;
    switch (barcodeType) {
    case BARCODE_TYPE_CODE128:
      barcode = BarcodeFactory.createCode128(text); 
      break;
    case BARCODE_TYPE_COD39:
      barcode = BarcodeFactory.createCode39(text, false);
      break;
    case BARCODE_TYPE_INT2OF5:
      barcode = BarcodeFactory.createInt2of5(text);
      break;
    }
    barcode.setBarHeight(barHeight);
    barcode.setBarWidth(1);
    barcode.setFont(font);
    return barcode;
  }

}
