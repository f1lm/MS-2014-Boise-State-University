/*
 * Copyright (c) 2001-2007 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.*;
import de.must.util.Callback;
/**
 * A simple page printer for attributes of an entity. Methods similar to DataPropertyAdministration
 * @author Christoph Mueller
 * @see de.must.wuic.DataPropertyAdministration
 */
public abstract class DataPropertyPrint extends PropertyPrint {

  protected DataObject mainDataObject;
  protected DataObject currentDataObject;

  /**
   * Construct a new data property print object with a default capacity of
   * 70 attributes to be printed.
   * @author Christoph Mueller
   */
  public DataPropertyPrint() {
    printableAttributes = new PrintableColumn[capacity];
  }

  protected void setMainDataObject(DataObject newMainDataObject) {
    mainDataObject = newMainDataObject;
    // DataObjects[0] = newMainDataObject;
    currentDataObject = newMainDataObject;
  }

  /**
   * Adds a space separator to the last attribute.
   */
  protected void addSpaceSeparator() {
    addSpaceSeparator(1);
  }

  protected void addSpaceSeparator(int nbrOfEmtpyLines) {
    separatorLines[countPrintableAttributes] = nbrOfEmtpyLines;
  }

  protected void goToLine(int lineNbr) {
    linesToGo[countPrintableAttributes] = lineNbr;
  }

  //============================================================================

  protected PrintableText createTextPresenter(int horizontalOffset, String columnName) {
    horizontalOffsets[countPrintableAttributes + 1] = horizontalOffset;
    return createTextPresenter(null, columnName);
  }

  protected PrintableText createTextPresenter(String label, String columnName) {
    PrintableText temp = new PrintableText(currentDataObject, columnName, label);
    registerPrintableColumn(temp);
    return temp;
  }

  //----------------------------------------------------------------------------

  protected PrintableInt createIntPresenter(int horizontalOffset, String columnName) {
    horizontalOffsets[countPrintableAttributes + 1] = horizontalOffset;
    return createIntPresenter(null, columnName);
  }

  protected PrintableInt createIntPresenter(String label, String columnName) {
    PrintableInt temp = new PrintableInt(currentDataObject, columnName, label);
    registerPrintableColumn(temp);
    return temp;
  }

  //----------------------------------------------------------------------------

  protected PrintableDecimal createDecimalPresenter(int horizontalOffset, String columnName) {
    horizontalOffsets[countPrintableAttributes + 1] = horizontalOffset;
    return createDecimalPresenter(null, columnName);
  }

  protected PrintableDecimal createDecimalPresenter(String label, String columnName) {
    PrintableDecimal temp = new PrintableDecimal(currentDataObject, columnName, label);
    registerPrintableColumn(temp);
    return temp;
  }

  //----------------------------------------------------------------------------

  protected PrintableDate createDatePresenter(int horizontalOffset, String columnName) {
    horizontalOffsets[countPrintableAttributes + 1] = horizontalOffset;
    return createDatePresenter(null, columnName);
  }

  protected PrintableDate createDatePresenter(String label, String columnName) {
    PrintableDate temp = new PrintableDate(currentDataObject, columnName, label);
    registerPrintableColumn(temp);
    return temp;
  }

  //----------------------------------------------------------------------------

  protected PrintableBoolean createBooleanPresenter(int horizontalOffset, String columnName) {
    horizontalOffsets[countPrintableAttributes + 1] = horizontalOffset;
    return createBooleanPresenter(null, columnName);
  }

  protected PrintableBoolean createBooleanPresenter(String label, String columnName) {
    PrintableBoolean temp = new PrintableBoolean(currentDataObject, columnName, label);
    registerPrintableColumn(temp);
    return temp;
  }

  //----------------------------------------------------------------------------

  protected PrintableReference createReference(int horizontalOffset, String columnName, DataObject referenceDataObject, String printableColumnName) {
    horizontalOffsets[countPrintableAttributes + 1] = horizontalOffset;
    return createReference(null, columnName, referenceDataObject, printableColumnName);
  }

  protected PrintableReference createReference(String label, String columnName, DataObject referenceDataObject, String printableColumnName) {
    PrintableReference temp = new PrintableReference(mainDataObject, columnName, label, referenceDataObject, printableColumnName);
    registerPrintableColumn(temp);
    return temp;
  }

  //----------------------------------------------------------------------------

  protected PrintableReference createReference(int horizontalOffset, String columnName, String[] keys, String[] meanings) {
    horizontalOffsets[countPrintableAttributes + 1] = horizontalOffset;
    return createReference(null, columnName, keys, meanings);
  }

  protected PrintableReference createReference(String label, String columnName, String[] keys, String[] meanings) {
    PrintableReference temp = new PrintableReference(mainDataObject, columnName, label, keys, meanings);
    registerPrintableColumn(temp);
    return temp;
  }

  //----------------------------------------------------------------------------

  /**
   * Creates and returns a PrintableCallback.
   * @param horizontalOffset the horizontal offset of the attribute
   * @param callback the callback interface to be called when values are set. Use setText() to set the new value inside callback method.
   * @return the created PrintableCallback
   */
  protected PrintableCallback createCallbackPresenter(int horizontalOffset, Callback callback) {
    horizontalOffsets[countPrintableAttributes + 1] = horizontalOffset;
    return createCallbackPresenter(null, callback);
  }

  /**
   * Creates and returns a PrintableCallback.
   * @param label the label of the attribute to print
   * @param callback the callback interface to be called when values are set. Use setText() to set the new value inside callback method.
   * @return the created PrintableCallback
   */
  protected PrintableCallback createCallbackPresenter(String label, Callback callback) {
    PrintableCallback temp = new PrintableCallback(label, callback);
    registerPrintableColumn(temp);
    return temp;
  }

  //============================================================================

  private void registerPrintableColumn(PrintableColumn nextPrintableColumn) {
    printableAttributes[++countPrintableAttributes] = nextPrintableColumn;
  }

  /**
   * Loads the current row and prints it.
   * @param identifier the identifier of the row to print
   */
  public void loadAndPrint(Identifier identifier) {
    loadValues(identifier);
    print();
  }

  private void loadValues(Identifier identifier) {
    mainDataObject.setIdentifier(identifier);
    mainDataObject.load();
    for (int i = 0; i <= countPrintableAttributes; i++) {
      ((PrintableColumn)printableAttributes[i]).loadValue();
    }
  }

}
