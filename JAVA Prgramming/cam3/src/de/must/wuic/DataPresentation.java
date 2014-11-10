/*
 * Copyright (c) 1999-2012 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.*;
import de.must.print.DataPropertyPrint;

import java.text.DecimalFormat;
import java.util.Vector;

/**
 * A frame for presenting data.
 * @author Christoph Mueller
 */
public abstract class DataPresentation extends Presentation {

  protected DataObject mainDataObject;
  protected DecimalFormat decimalFormat = (DecimalFormat)DecimalFormat.getInstance();
  private Vector<Identifier> identifiers;
  private Identifier identifier;

  /**
   * Constructs a new data presentation frame
   */
  public DataPresentation() {
  }

  /**
   * Sets the main data object.
   * @param newMainDataObject the data object mainly to be used
   */
  protected void setMainDataObject(DataObject newMainDataObject) {
    mainDataObject = newMainDataObject;
    mainDataObject.newRow(); // to get MetaData
  }

  /**
   * Presents an entry as specified.
   * @param identifier the identifier of the entry to be presented
   */
  public void present(Vector<Identifier> identifiers) {
    this.identifiers = identifiers;
    presentConsumeIdentifiers();
  }

  private boolean presentConsumeIdentifiers() {
    if (identifiers == null || identifiers.size() == 0) return false;
    Identifier identifier = identifiers.firstElement();
    identifiers.remove(0);
    present(identifier);
    return true;
  }
  
  /**
   * Presents an entry as specified.
   * @param identifier the identifier of the entry to be presented
   */
  public void present(Identifier identifier) {
    this.identifier = identifier;
    mainDataObject.load(identifier);
    if (currentAttributeList != null) centerPanel.remove(currentAttributeList);
    currentAttributeList = new AttributeList();
    centerPanel.add(currentAttributeList);
    present();
    if (!alreadyPackedOnce && !isLaidOut())  {
      pack();
      alreadyPackedOnce = true;
      int width = (int)getSize().getWidth();
      int height = (int)getSize().getHeight();
      if (width > 800) width = 800;
      if (height > 800) height = 800;
      setSize(width, height);
    }
    repaint(); // otherwise text from previous presentations is still visible!
    setVisible(true);
  }

  /**
   * Presents the entry.
   */
  protected abstract void present();

  protected String getTextOfNumericColumn(String columnName) {
    return decimalFormat.format(mainDataObject.getDouble(columnName));
  }
  
  protected String getTextOfColumn(String columnName) {
//    switch (mainDataObject.getColumnType(columnName)) {
//      case 3:
//      break;
//      default:
//      break;
//    }
    return mainDataObject.getText(columnName);
  }

  @Override
  protected void okButtonAction() {
    if (!presentConsumeIdentifiers()) {
      super.okButtonAction();
    }
  }

  /**
   * The task to be done associated with the print button.
   */
  protected void printButtonAction() {
    if (getPrintClass() != null) try {
      if (printInstance == null) printInstance = (DataPropertyPrint)getPrintClass().newInstance();
      printInstance.loadAndPrint(identifier);
    } catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
  }

}