package de.must.print;

import de.must.io.Logger;
import de.must.util.KeyValuePairNum;

import java.awt.print.*;

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
 * Tool to print cards upon DIN A4 forms.
 * @author Christoph Mueller
 */
public abstract class CardPrintStd extends SimplePrinting {
  
  public static final int FORM_AVERY_ZWECKFORM_L4727_20 = 0; 
  public static final int FORM_AVERY_ZWECKFORM_L4728_20 = 1; 
  public static final int FORM_LESS_70x40 = 2; 
  
  /**
   * Returns supported forms.
   * @return supported forms
   */
  public static KeyValuePairNum[] getSupportedForms() {
    return new KeyValuePairNum[] {
      new KeyValuePairNum(FORM_AVERY_ZWECKFORM_L4727_20, "Avery Zweckform L4727-20 Einsteckschilder, 54 x 90 mm"),
      new KeyValuePairNum(FORM_AVERY_ZWECKFORM_L4728_20, "Avery Zweckform L4728-20 Einsteckschilder, 60 x 90 mm"), 
      new KeyValuePairNum(FORM_LESS_70x40, "Formlos 70 x 40 mm"), 
    };
  }
  
  public static Form getForm(int formId) {
    switch (formId) {
    case FORM_AVERY_ZWECKFORM_L4727_20:
      return new FormL4727_20();
    case FORM_AVERY_ZWECKFORM_L4728_20:
      return new FormL4728_20();
    case FORM_LESS_70x40:
      return new Form70x40();
    default:
      Logger.getInstance().error(CardPrintStd.class, "Form " + formId + " not supported");
      return null;
    }
  }
  
  public static int getLabelAmount(int formId) {
    Form form = getForm(formId);
    return form.getAmountX() * form.getAmountY();
  }
  
  protected abstract interface Form {
    public int getOrientation(); // PageFormat.PORTRAIT, PageFormat.LANDSCAPE
    public int getOffsetX(); // the horizontal offset of the first label
    public int getOffsetY(); // the vertical offset of the first label
    public int getGridX(); // the horizontal distance between to label beginnings 
    public int getGridY(); // the vertical distance between to label beginnings 
    public int getAmountX(); // how many cards in row?
    public int getAmountY(); // how many cards in column?
    public int getWidth(); // the card width
    public int getHeight(); // the card height
  }
  
  protected static class FormL4727_20 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(15); }
    public int getOffsetY() { return getPx(13.5); }
    public int getGridX() { return getPx(90); }
    public int getGridY() { return getPx(54); }
    public int getAmountX() { return 2; }
    public int getAmountY() { return 5; }
    public int getWidth() { return getPx(90); }
    public int getHeight() { return getPx(54); }
  }
  
  protected static class FormL4728_20 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(15); }
    public int getOffsetY() { return getPx(28.5); }
    public int getGridX() { return getPx(90); }
    public int getGridY() { return getPx(60); }
    public int getAmountX() { return 2; }
    public int getAmountY() { return 4; }
    public int getWidth() { return getPx(90); }
    public int getHeight() { return getPx(60); }
  }
  
  protected static class Form70x40 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(35); }
    public int getOffsetY() { return getPx(8.5); }
    public int getGridX() { return getPx(70); }
    public int getGridY() { return getPx(40); }
    public int getAmountX() { return 2; }
    public int getAmountY() { return 7; }
    public int getWidth() { return getPx(70); }
    public int getHeight() { return getPx(40); }
  }
  
  protected Form form;
  protected int adjustmentX = 0;
  protected int adjustmentY = 0;
  
  public CardPrintStd(int formId) {
    form = getForm(formId);
  }
  
  protected int getLabelCapacity() {
    return form.getAmountX() * form.getAmountY();
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
  protected void beforePrinting() {
    PageFormat pageFormat = printerJob.defaultPage();
    pageFormat.setOrientation(form.getOrientation());
    Paper paper = pageFormat.getPaper();
    paper.setImageableArea(0, 0, paper.getWidth(), paper.getHeight());
    pageFormat.setPaper(paper);
    printerJob.setPrintable(this, pageFormat);
  }

}
