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

package de.must.wuic;

import javax.swing.*;

import de.must.dataobj.ParametersForPrinting;
import de.must.print.PageDrawer;

import java.awt.*;
import java.util.Iterator;
import java.util.Vector;

/**
 * A dialog to modify printing attributes. 
 * @author Christoph Mueller
 */
public abstract class ParameterForPrintingDialog extends ParameterDialog {
  
  private ParametersForPrinting parameters;
  private Vector<ParamPrinterChooser> chooser = new Vector<ParamPrinterChooser>();

  public ParameterForPrintingDialog(ParametersForPrinting parameters) {
    this((Frame)null, parameters);
  }

  /**
   * Constructs a new parameter dialog.
   * @param ownerFrame the frame who owns the dialog
   */
  public ParameterForPrintingDialog(Frame ownerFrame, ParametersForPrinting parameters) {
    super(ownerFrame);
    this.parameters = parameters;
    construct();
  }

  /**
   * Constructs a new parameter dialog.
   * @param ownerFrame the frame who owns the dialog
   */
  public ParameterForPrintingDialog(JDialog ownerDialog) {
    super(ownerDialog);
    construct();
  }

  /**
   * Creates, registers and returns a DataPrinterChooser.
   * @param label the label of the new line
   * @param printingClass the printing class which is to be attributed
   * @return the created DataPrinterChooser
   */
  protected ParamPrinterChooser createDataPrinterChooser(String label, Class<? extends PageDrawer> printingClass) {
    ParamPrinterChooser temp = new ParamPrinterChooser(parameters, printingClass);
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    temp.getAccessibleContext().setAccessibleName(label);
    chooser.add(temp);
    lastComponent = temp;
    return(temp);
  }

  /* (non-Javadoc)
   * @see de.must.wuic.ParameterDialog#act()
   */
  protected void act() {
    saveValues();
    WinContr.getInstance().close(this);
  }

  /**
   * Loads parameters.
   */
  protected void loadValues() {
    Iterator<ParamPrinterChooser> iter = chooser.iterator();
    while (iter.hasNext()) {
      ParamPrinterChooser chooser = iter.next();
      chooser.loadValue();
    }
  }

  /**
   * Saves parameter values.
   * @see #setParameterStore(de.must.middle.ParameterStore)
   */
  protected void saveValues() {
    Iterator<ParamPrinterChooser> iter = chooser.iterator();
    while (iter.hasNext()) {
      ParamPrinterChooser chooser = iter.next();
      chooser.saveValue();
    }
  }

}
