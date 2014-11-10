package de.must.print;

import java.awt.Component;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Toolkit;
import java.util.Vector;

import de.must.io.Logger;

/*
 * Copyright (c) 2011-2013 Christoph Mueller. All rights reserved.
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
 * Cache for a page to be printed later, e.g. by CachedPrinting.
 * @author Christoph Mueller
 */
public class PrintablePage {
  
  // private BarcodeDrawer barcodeDrawer;

  public abstract class PrintableItem {
    
    public double positionX;
    public double positionY;
    public int maxWidth;
    
    public PrintableItem(double positionX, double positionY) {
      this.positionX = positionX;
      this.positionY = positionY;
    }

    public double getPositionX() {
      return positionX;
    }
    
    public double getPositionY() {
      return positionY;
    }
    
    protected abstract void drawYourselfUpon(Graphics graphics);
    
  }
  
  public class PrintableTextItem extends PrintableItem {
    
    private String text;
    private FontSpecification fontSpec;
    
    private PrintableTextItem() {
      super(-1, -1);
    }
    
    public PrintableTextItem(String text, FontSpecification fontSpec, double PositionX, double PositionY) {
      super(PositionX, PositionY);
      this.text = text;
      this.fontSpec = fontSpec;
    }
    
    public FontSpecification getFontSpec() {
      return fontSpec;
    }

    protected void drawYourselfUpon(Graphics graphics) {
      graphics.drawString(text, (int)getPositionX(), (int)getPositionY());
    }
    
    @Override
    public String toString() {
      return text;
    }
     
  }
  
  public class PrintableLine extends PrintableItem {
    
    private double positionX2;
    private double positionY2;
    
    private PrintableLine() {
      super(-1, -1);
    }
    
    public PrintableLine(double PositionX, double PositionY, double PositionX2, double PositionY2) {
      super(PositionX, PositionY);
      this.positionX2 = PositionX2;
      this.positionY2 = PositionY2;
    }
    
    public double getPositionX2() {
      return positionX2;
    }
    
    public double getPositionY2() {
      return positionY2;
    }
    
    protected void drawYourselfUpon(Graphics graphics) {
      graphics.drawLine((int)getPositionX(), (int)getPositionY(), (int)getPositionX2(), (int)getPositionY2());
    }
    
  }
    
  public class PrintableBarcodeItem extends PrintableItem {
    
    private String text;
    
    public PrintableBarcodeItem(String text, double PositionX, double PositionY) {
      super(PositionX, PositionY);
      this.text = text;
    }
    
    protected void drawYourselfUpon(Graphics graphics) {
      // good idea, but we don't want to add bar code jar file to each simple application compilation
      // instead this case is handled in class CachedPrintingIncludingBarcodes
//      if (barcodeDrawer == null) barcodeDrawer = new BarcodeDrawer();
//      barcodeDrawer.drawBarcode((Graphics2D)graphics, text, (int)getPositionX(), (int)getPositionY());
    }
    
    @Override
    public String toString() {
      return text;
    }
     
  }
  
  public class PrintableImageItem extends PrintableItem {
    
    private String path; // path, not image - in order to support remote (applet) printing
    
    public PrintableImageItem(String path, double PositionX, double PositionY) {
      super(PositionX, PositionY);
      this.path = path;
    }
    
    protected void drawYourselfUpon(Graphics graphics) {
      if (path != null) {
        drawImage(graphics, path,(int)getPositionX(), (int)getPositionY());
      } else {
        
      }
    }
    
    private void drawImage(Graphics graphics, String path, int posX, int posY) {
      Image image = Toolkit.getDefaultToolkit().getImage(path);
      int imgWidth = image.getWidth(null); // returns -1 sometimes, but not after prepareImage
      int imgHeight = image.getHeight(null);
      Toolkit.getDefaultToolkit().prepareImage(image, imgWidth, imgHeight, null);
      // wait until image is loaded completely
      while ((Toolkit.getDefaultToolkit().checkImage(image, imgWidth, imgHeight, null) & Component.ALLBITS) != Component.ALLBITS) {
        try { Thread.sleep(50); }
        catch(InterruptedException e) { Logger.getInstance().error(getClass(), e); }
      }
      imgWidth = image.getWidth(null) * 72 / 600; // screen resolution / printer resolution
      imgHeight = image.getHeight(null) * 72 / 600;
      graphics.drawImage(image, posX, posY, imgWidth, imgHeight, null);
    }
    
    @Override
    public String toString() {
      return "Image: " + path;
    }
     
  }
  
  public class PrintPosition {
    public int page;
    public double xPosition;
    public double yPosition;
  }
  
  public Vector<PrintableItem> printableItems;

  public PrintablePage() {
    this.printableItems = new Vector<PrintablePage.PrintableItem>();
  }
  
  public PrintablePage(Vector<PrintableItem> printableItems) {
    this.printableItems = printableItems;
  }
  
  public void add(PrintableItem printableItem) {
    printableItems.add(printableItem);
  }
  
  public Vector<PrintableItem> getPrintableItems() {
    return printableItems;
  }
  
}