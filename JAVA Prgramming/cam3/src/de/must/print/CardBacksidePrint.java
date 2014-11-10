package de.must.print;

import java.awt.Component;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.print.*;

import de.must.io.Logger;

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

/**
 * Tool to print backside of cards upon DIN A4 forms.
 * @author Christoph Mueller
 */
public class CardBacksidePrint extends CardPrintStd {
  
  private int pages;
  private Image image;
  private int posX;
  private int posY;
  
  public CardBacksidePrint(int formId, int pages, Image image, int posX, int posY) {
    super(formId);
    this.pages = pages;
    this.image = image;
    this.posX = getPx(posX);
    this.posY = getPx(posY);
    int imgWidth = image.getWidth(null); // returns -1 sometimes, but not after prepareImage
    int imgHeight = image.getHeight(null);
    Toolkit.getDefaultToolkit().prepareImage(image, imgWidth, imgHeight, null);
    // wait until image is loaded completely
    while ((Toolkit.getDefaultToolkit().checkImage(image, imgWidth, imgHeight, null) & Component.ALLBITS) != Component.ALLBITS) {
      try { Thread.sleep(50); }
      catch(InterruptedException e) { Logger.getInstance().error(getClass(), e); }
    }
  }

  @Override
  public int print(Graphics graphics, PageFormat pageFormat, int pageIndex) throws PrinterException {
    if (pageIndex >= pages) return NO_SUCH_PAGE;
    for (int i = 0; i < form.getAmountY(); i++) {
      for (int j = 0; j < form.getAmountX(); j++) {
        graphics.drawImage(image, form.getOffsetX() + (form.getGridX() * j) + posX, form.getOffsetY() + (form.getGridY() * i) + posY, image.getWidth(null) * 72 / 600, image.getHeight(null) * 72 / 600, null);
      }
    }
    return PAGE_EXISTS;
  }
  
}
