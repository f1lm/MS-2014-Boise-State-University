/*
 * Copyright (c) 2007-2014 Christoph Mueller. All rights reserved.
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
package de.must.wuic;

import java.awt.print.PrinterJob;
import java.util.Vector;

import javax.print.PrintService;

/**
 * A ComboBox to choose a printer. Suitable printers are loaded automatically when
 * PrinterChooser is used first time.
 * @author Christoph Mueller
 */
public class PrinterChooser extends MustComboBox {
  
  private static class Loader extends Thread {
    public void run() {
      PrintService[] printService = PrinterJob.lookupPrintServices();
      printer = new String[printService.length];
      for (int i = 0; i < printService.length; i++) {
        printer[i] = printService[i].getName();
      }
    }
  }
  
  private static Loader loader;
  private static String[] printer;
  
  static {
    loader = new Loader();
    // loader.start();
    // since we want to select an item, we have to wait until items are completely loaded!
    loader.run(); loader = null;
  }

  private boolean noChoicePossible = false;
  private String nameForNoChoice = "<" + getTranslation("TEXT_DEFAULT_PRINTER") + ">";

  /**
   * Constructs an new printer chooser.
   */
  public PrinterChooser() {
    this(null);
  }
  
  public PrinterChooser(Vector<String> additionalPrinter) {
    removeAllItems();
    addItem(nameForNoChoice);
    for (int i = 0; i < printer.length; i++) {
      addItem(printer[i]);
    }
    for (String printer : additionalPrinter) {
      if (!contains(printer)) addItem(printer);
    }
  }

  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey) {
    return WuicGlobal.getInstance().getResourceString(resourceKey);
  }

  /**
   * Returns true if the selected item is not the placeholder for "none" or "any".
   * @return true if the selected item is not the placeholder for "none" or "any"
   */
  public boolean isSpecialChoice() {
    try {
      return !getSelectedItem().equals(nameForNoChoice);
    }
    catch (Exception e) {
      return false;
    }
  }

  /**
   * Selects the item to be used to indicate "no special choice"
   */
  public void setNoSpecialChoice() {
    if (nameForNoChoice != null) setSelectedItem(nameForNoChoice);
  }

  @Override
  public void setSelectedItem(Object anObject) {
    if (!contains(anObject)) {
      addItem(anObject); // we don't want to loose parameter settings if a printer is not listed for a certain user at the moment 
    }
    super.setSelectedItem(anObject);
  }
  
  private boolean contains(Object anObject) {
    for (int i = 0; i < dataModel.getSize(); i++) {
      if (anObject.equals(dataModel.getElementAt(i))) {
        return true;
      }
    }
    return false;
  }

}
