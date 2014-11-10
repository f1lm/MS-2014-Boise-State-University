/*
 * Copyright (c) 2007-2010 Christoph Mueller. All rights reserved.
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

package de.must.dataobj;

import de.must.middle.ParameterStore;
import de.must.print.PrintingAttributes;

/**
 * Printing parameters, to be stored by ParameterStore.
 * @author Christoph Mueller
 */
public class ParametersForPrinting {
  
  protected ParameterStore parameterStore;

  /**
   * Constructs a new ParameterForPrinting class.
   * @param parameterStore the ParameterStore to be used to store the parameters;
   * the ParameterStore implementation must at least support a key length of 3 characters 
   * larger than the longest print class name (simple name)
   */
  public ParametersForPrinting(ParameterStore parameterStore) {
    this.parameterStore = parameterStore;
  }

  public ParameterStore getParameterStore() {
    return parameterStore;
  }
  
  /**
   * Returns the printer parameters for the specified printing class.
   * @param printingClass the printing class whose printing attribute values is to be retrieved
   * @return the printer parameters
   */
  public PrintingAttributes getPrinterParameter(Class<? extends Object> printingClass) {
    PrintingAttributes attr = new PrintingAttributes();
    attr.setPrinterName(parameterStore.getValue(getPrinterNameKey(printingClass)));
    return attr;
  }
  
  /**
   * Returns the printer name for the specified printing class.
   * @param printingClass the printing class whose printing attribute values are to be retrieved
   * @return the printer name
   */
  public String getPrinterName(Class<? extends Object> printingClass) {
    return parameterStore.getValue(getPrinterNameKey(printingClass));
  }
  
  /**
   * Set the printer name for the specified printing class.
   * @param printingClass the printing class whose printing attribute values are to be set
   * @param printerName the printer name to set
   */
  public void setPrinterName(Class<? extends Object> printingClass, String printerName) {
    parameterStore.setValue(getPrinterNameKey(printingClass), printerName);
  }
  
  private String getPrinterNameKey(Class<?> printingClass) {
    // since 1.5: return printingClass.getSimpleName() + ".Nm";
    int pos = printingClass.getName().lastIndexOf('.');
    if (pos < 1) return printingClass.getName() + ".Nm";
    return printingClass.getName().substring(pos + 1, printingClass.getName().length()) + ".Nm";
  }

}