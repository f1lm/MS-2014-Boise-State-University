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

import java.util.Vector;

import de.must.dataobj.ParamComponent;
import de.must.dataobj.ParametersForPrinting;
import de.must.middle.ParameterStore;

public class ParamPrinterChooser extends PrinterChooser implements ParamComponent {
  
  private ParametersForPrinting parameterForPrinting;
  private Class<? extends Object> printingClass;
  
  public ParamPrinterChooser(ParametersForPrinting parameterForPrinting, Class<? extends Object> printingClass) {
    this(parameterForPrinting, printingClass, new Vector<String>());
  }
  
  public ParamPrinterChooser(ParametersForPrinting parameterForPrinting, Class<? extends Object> printingClass, Vector<String> additionalPrinter) {
    super(additionalPrinter);
    this.parameterForPrinting = parameterForPrinting;
    this.printingClass = printingClass;
  }

  public void loadValue() {
    String loadValue = parameterForPrinting.getPrinterParameter(printingClass).getPrinterName();
    if (loadValue == null || loadValue.length() == 0) {
      setNoSpecialChoice();
    } else {
      setSelectedItem(loadValue);
    }
  }

  public void saveValue() {
    if (isSpecialChoice()) {
      parameterForPrinting.setPrinterName(printingClass, (String)getSelectedItem());
    } else {
      parameterForPrinting.setPrinterName(printingClass, "");
    }
  }

  public ParameterStore getParameterStore() {
    return parameterForPrinting.getParameterStore();
  }
  
}