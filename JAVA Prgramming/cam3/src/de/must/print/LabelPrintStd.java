package de.must.print;

import de.must.io.Logger;
import de.must.util.KeyValuePairNum;

import java.awt.print.*;

/*
 * Copyright (c) 2008-2013 Christoph Mueller. All rights reserved.
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

/*
 * DIN A4 = 297 * 210 mm 
 */

/**
 * Tool to print labels upon DIN A4 forms.
 * @author Christoph Mueller
 */
public abstract class LabelPrintStd extends SimplePrinting {
  
  public static final int FORM_AVERY_ZWECKFORM_L4732REV25 = 0; 
  public static final int FORM_AVERY_ZWECKFORM_3666 = 1; 
  public static final int FORM_AVERY_ZWECKFORM_3658 = 2; 
  public static final int FORM_AVERY_ZWECKFORM_3421 = 3; 
  public static final int FORM_AVERY_ZWECKFORM_L6009 = 4; 
  public static final int FORM_AVERY_ZWECKFORM_L6146 = 5;
  public static final int FORM_AVERY_ZWECKFORM_L4778 = 6;
  public static final int FORM_HERMA_52k5_21k2 = 7;
  public static final int FORM_EKZ_23_38 = 8;
  public static final int FORM_AVERY_ZWECKFORM_L7160 = 9;
  public static final int FORM_AVERY_ZWECKFORM_3657 = 10;
  public static final int FORM_HERMA_45k7_16k9 = 11;
  public static final int FORM_MICHAELSBUND_27_19 = 12; // Etikett Schiller GmbH Plüderhausen Art.Nr. 8234550005
  public static final int FORM_UNBEKANNT_40_25 = 13;
  public static final int FORM_AVERY_ZWECKFORM_L6140 = 14;
  public static final int FORM_IMPEGA_38k1_21k2 = 15;
  public static final int FORM_EKZ_28_38 = 16;
  public static final int FORM_AVERY_ZWECKFORM_3425 = 17;
  public static final int FORM_HERMA_4336_35k6_16k9 = 18;
  
  /**
   * Returns supported forms.
   * @return supported forms
   */
  public static KeyValuePairNum[] getSupportedForms() {
    return new KeyValuePairNum[] {
      new KeyValuePairNum(FORM_EKZ_23_38, "ekz 23 x 38 mm"),
      new KeyValuePairNum(FORM_EKZ_28_38, "ekz 28 x 38 mm"),
      new KeyValuePairNum(FORM_AVERY_ZWECKFORM_L4732REV25, "Avery-Zweckform L4732REV25 (36 x 17 mm)"),
      new KeyValuePairNum(FORM_AVERY_ZWECKFORM_3666, "Avery-Zweckform 3666 (38 x 21 mm)"),
      new KeyValuePairNum(FORM_AVERY_ZWECKFORM_3657, "Avery-Zweckform 3657 (49 x 25 mm)"),
      new KeyValuePairNum(FORM_AVERY_ZWECKFORM_3658, "Avery-Zweckform 3658 (65 x 34 mm)"),
      new KeyValuePairNum(FORM_AVERY_ZWECKFORM_3421, "Avery-Zweckform 3421 (70 x 25 mm)"),
      new KeyValuePairNum(FORM_AVERY_ZWECKFORM_3425, "Avery-Zweckform 3425 (105 x 57 mm)"),
      new KeyValuePairNum(FORM_AVERY_ZWECKFORM_L6009, "Avery-Zweckform L6009 (46 x 21 mm)"),
      new KeyValuePairNum(FORM_AVERY_ZWECKFORM_L6140, "Avery-Zweckform L6140 (46 x 25 mm)"),
      new KeyValuePairNum(FORM_AVERY_ZWECKFORM_L6146, "Avery-Zweckform L6146 (64 x 34 mm)"),
      new KeyValuePairNum(FORM_AVERY_ZWECKFORM_L4778, "Avery-Zweckform L4778 (46 x 21 mm, Polyesterfolie)"),
      new KeyValuePairNum(FORM_AVERY_ZWECKFORM_L7160, "Avery-Zweckform L7160 (64 x 38 mm)"),
      new KeyValuePairNum(FORM_HERMA_4336_35k6_16k9, "HERMA Nr. 4336 - 35,6 x 16,9 mm"),
      new KeyValuePairNum(FORM_HERMA_52k5_21k2, "HERMA 52,5 x 21,2 mm"),
      new KeyValuePairNum(FORM_HERMA_45k7_16k9, "HERMA Nr. 4201 - 45,7 x 16,9 mm"),
      new KeyValuePairNum(FORM_MICHAELSBUND_27_19, "Michealsbund 27 x 19 mm"),
      new KeyValuePairNum(FORM_IMPEGA_38k1_21k2, "Impega 38,1 x 21,2 mm"),
      new KeyValuePairNum(FORM_UNBEKANNT_40_25, "unbekannt 40 x 25 mm quer"),
    };
  }
  
  public static Form getForm(int formId) {
    switch (formId) {
    case FORM_AVERY_ZWECKFORM_L4732REV25:
      return new Form4732();
    case FORM_AVERY_ZWECKFORM_3658:
      return new Form3658();
    case FORM_AVERY_ZWECKFORM_3666:
      return new Form3666();
    case FORM_AVERY_ZWECKFORM_3421:
      return new Form3421();
    case FORM_AVERY_ZWECKFORM_L6009:
      return new FormL6009();
    case FORM_AVERY_ZWECKFORM_L6146:
      return new FormL6146();
    case FORM_AVERY_ZWECKFORM_L4778:
      return new FormL4778();
    case FORM_HERMA_52k5_21k2:
      return new FormHerma52K5_21K2();
    case FORM_HERMA_45k7_16k9:
      return new FormHerma45k7_16k9();
    case FORM_EKZ_23_38:
      return new FormEkz23_38();
    case FORM_EKZ_28_38:
      return new FormEkz28_38();
    case FORM_AVERY_ZWECKFORM_L7160:
      return new FormL7160();
    case FORM_AVERY_ZWECKFORM_3657:
      return new Form3657();
    case FORM_MICHAELSBUND_27_19:
      return new FormMichaelsbund27_19();
    case FORM_UNBEKANNT_40_25:
      return new FormUnbekannt40_25();
    case FORM_AVERY_ZWECKFORM_L6140:
      return new FormL6140();
    case FORM_IMPEGA_38k1_21k2:
      return new FormImpega_38k1_21k2();
    case FORM_AVERY_ZWECKFORM_3425:
      return new Form3425();
    case FORM_HERMA_4336_35k6_16k9:
      return new FormHerma4336();
    default:
      Logger.getInstance().error(LabelPrintStd.class, "Form " + formId + " not supported");
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
    public int getAmountX(); // how many barcodes in row?
    public int getAmountY(); // how many barcodes in column?
    public int getLabelWidth(); // the imagable label width
    public int getLabelHeight(); // the imagable label height
  }
  
  protected static class Form4732 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(11.2); }
    public int getOffsetY() { return getPx(13); }
    public int getGridX() { return getPx(38.125); }
    public int getGridY() { return getPx(16.93); }
    public int getAmountX() { return 5; }
    public int getAmountY() { return 16; }
    public int getLabelWidth() { return getPx(35.6); }
    public int getLabelHeight() { return getPx(16.93); }
  }
  
  protected static class Form3658 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(8); }
    public int getOffsetY() { return getPx(13); }
    public int getGridX() { return getPx(64.6); }
    public int getGridY() { return getPx(33.8); }
    public int getAmountX() { return 3; }
    public int getAmountY() { return 8; }
    public int getLabelWidth() { return getPx(64.6); }
    public int getLabelHeight() { return getPx(33.8); }
  }
  
  protected static class Form3666 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(10); }
    public int getOffsetY() { return getPx(10); }
    public int getGridX() { return getPx(38); }
    public int getGridY() { return getPx(21.2); }
    public int getAmountX() { return 5; }
    public int getAmountY() { return 13; }
    public int getLabelWidth() { return getPx(38); }
    public int getLabelHeight() { return getPx(21.2); }
  }
  
  protected static class Form3421 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(1); }
    public int getOffsetY() { return getPx(9); }
    public int getGridX() { return getPx(70); }
    public int getGridY() { return getPx(25.4); }
    public int getAmountX() { return 3; }
    public int getAmountY() { return 11; }
    public int getLabelWidth() { return getPx(70); }
    public int getLabelHeight() { return getPx(25.4); }
  }
  
  protected static class Form3425 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(0); }
    public int getOffsetY() { return getPx(6); }
    public int getGridX() { return getPx(105); }
    public int getGridY() { return getPx(57); }
    public int getAmountX() { return 2; }
    public int getAmountY() { return 5; }
    public int getLabelWidth() { return getPx(105); }
    public int getLabelHeight() { return getPx(57); }
  }
  
  protected static class FormL6009 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(10); }
    public int getOffsetY() { return getPx(22); }
    public int getGridX() { return getPx(48); }
    public int getGridY() { return getPx(21.2); }
    public int getAmountX() { return 4; }
    public int getAmountY() { return 12; }
    public int getLabelWidth() { return getPx(45.7); }
    public int getLabelHeight() { return getPx(21.2); }
  }
  
  protected static class FormL6146 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(6); }
    public int getOffsetY() { return getPx(13); }
    public int getGridX() { return getPx(66.1); }
    public int getGridY() { return getPx(33.9); }
    public int getAmountX() { return 3; }
    public int getAmountY() { return 8; }
    public int getLabelWidth() { return getPx(63.5); }
    public int getLabelHeight() { return getPx(33.9); }
  }
  
  protected static class FormL4778 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(09.8); }
    public int getOffsetY() { return getPx(21.4); }
    public int getGridX() { return getPx(48.2); }
    public int getGridY() { return getPx(21.2); }
    public int getAmountX() { return 4; }
    public int getAmountY() { return 12; }
    public int getLabelWidth() { return getPx(45.7); }
    public int getLabelHeight() { return getPx(21.2); }
  }
  
  protected static class FormHerma52K5_21K2 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(0); }
    public int getOffsetY() { return getPx(0); }
    public int getGridX() { return getPx(52.5); }
    public int getGridY() { return getPx(21.21); }
    public int getAmountX() { return 4; }
    public int getAmountY() { return 14; }
    public int getLabelWidth() { return getPx(52.5); }
    public int getLabelHeight() { return getPx(21.2); }
  }
  
  protected static class FormEkz23_38 implements Form {
    public int getOrientation() { return PageFormat.LANDSCAPE; }
    public int getOffsetX() { return getPx(7); }
    public int getOffsetY() { return getPx(16); }
    public int getGridX() { return getPx(41); } // 38 + 3 mm margin
    public int getGridY() { return getPx(26); } // 23 + 3 mm margin
    public int getAmountX() { return 7; }
    public int getAmountY() { return 7; }
    public int getLabelWidth() { return getPx(38); }
    public int getLabelHeight() { return getPx(23); }
  }
  
  protected static class FormEkz28_38 implements Form {
    public int getOrientation() { return PageFormat.LANDSCAPE; }
    public int getOffsetX() { return getPx(7); }
    public int getOffsetY() { return getPx(7); }
    public int getGridX() { return getPx(41); } // 38 + 3 mm margin
    public int getGridY() { return getPx(28); }
    public int getAmountX() { return 7; }
    public int getAmountY() { return 7; }
    public int getLabelWidth() { return getPx(38); }
    public int getLabelHeight() { return getPx(28); }
  }
  
  protected static class FormL7160 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(7); }
    public int getOffsetY() { return getPx(15); }
    public int getGridX() { return getPx(66); }
    public int getGridY() { return getPx(38.1); }
    public int getAmountX() { return 3; }
    public int getAmountY() { return 7; }
    public int getLabelWidth() { return getPx(63.5); }
    public int getLabelHeight() { return getPx(38.1); }
  }
  
  protected static class Form3657 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(8); }
    public int getOffsetY() { return getPx(22); }
    public int getGridX() { return getPx(48.5); }
    public int getGridY() { return getPx(25.4); }
    public int getAmountX() { return 4; }
    public int getAmountY() { return 10; }
    public int getLabelWidth() { return getPx(48.5); }
    public int getLabelHeight() { return getPx(25.4); }
  }
  
  protected static class FormHerma45k7_16k9 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(10.0); }
    public int getOffsetY() { return getPx(13.0); }
    public int getGridX() { return getPx(48.0); }
    public int getGridY() { return getPx(16.9); }
    public int getAmountX() { return 4; }
    public int getAmountY() { return 16; }
    public int getLabelWidth() { return getPx(45.7); }
    public int getLabelHeight() { return getPx(16.9); }
  }
  
  protected static class FormMichaelsbund27_19 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(14); }
    public int getOffsetY() { return getPx(2); }
    public int getGridX() { return getPx(31); }
    public int getGridY() { return getPx(21); }
    public int getAmountX() { return 6; }
    public int getAmountY() { return 14; }
    public int getLabelWidth() { return getPx(27); }
    public int getLabelHeight() { return getPx(19); }
  }
  
  protected static class FormUnbekannt40_25 implements Form {
    public int getOrientation() { return PageFormat.LANDSCAPE; }
    public int getOffsetX() { return getPx(8.3); }
    public int getOffsetY() { return getPx(5.2); }
    public int getGridX() { return getPx(40); }
    public int getGridY() { return getPx(25); }
    public int getAmountX() { return 7; }
    public int getAmountY() { return 8; }
    public int getLabelWidth() { return getPx(40); }
    public int getLabelHeight() { return getPx(25); }
  }
  
  protected static class FormL6140 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(10); }
    public int getOffsetY() { return getPx(21.5); }
    public int getGridX() { return getPx(48); }
    public int getGridY() { return getPx(25.4); }
    public int getAmountX() { return 4; }
    public int getAmountY() { return 10; }
    public int getLabelWidth() { return getPx(45.7); }
    public int getLabelHeight() { return getPx(25.4); }
  }
  
  protected static class FormImpega_38k1_21k2 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(5); }
    public int getOffsetY() { return getPx(10); }
    public int getGridX() { return getPx(40.6); }
    public int getGridY() { return getPx(21.2); }
    public int getAmountX() { return 5; }
    public int getAmountY() { return 13; }
    public int getLabelWidth() { return getPx(38.1); }
    public int getLabelHeight() { return getPx(21.2); }
  }
  
  protected static class FormHerma4336 implements Form {
    public int getOrientation() { return PageFormat.PORTRAIT; }
    public int getOffsetX() { return getPx(11); }
    public int getOffsetY() { return getPx(12.5); }
    public int getGridX() { return getPx(38.0); }
    public int getGridY() { return getPx(16.9); }
    public int getAmountX() { return 5; }
    public int getAmountY() { return 16; }
    public int getLabelWidth() { return getPx(35.6); }
    public int getLabelHeight() { return getPx(16.9); }
  }
  
  protected Form form;
  
  public LabelPrintStd(int formId) {
    form = getForm(formId);
  }
  
  protected int getLabelCapacity() {
    return form.getAmountX() * form.getAmountY();
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
