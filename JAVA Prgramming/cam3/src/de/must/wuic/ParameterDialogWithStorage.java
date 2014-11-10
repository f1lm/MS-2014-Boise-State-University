/*
 * Copyright (c) 2007-2012 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.ParamComponent;
import de.must.dataobj.ParametersForPrinting;
import de.must.middle.ParameterStore;
import de.must.middle.ParameterStore.Entry;
import de.must.util.GenericFileFilter;
import de.must.util.KeyValuePairAlpha;
import de.must.util.KeyValuePairNum;

import javax.swing.*;

import java.awt.*;
import java.util.Iterator;
import java.util.Vector;

/**
 * Standard dialog to modify stored properties.
 * @author Christoph Mueller
 */
public abstract class ParameterDialogWithStorage extends ParameterDialog {

  protected ParameterStore parameterStore;
  protected Vector<ParamComponent> paramComp = new Vector<ParamComponent>();

  public ParameterDialogWithStorage(ParameterStore parameterStore) {
    this((Frame)null, parameterStore);
  }

  /**
   * Constructs a new parameter dialog.
   * @param ownerFrame the frame who owns the dialog
   */
  public ParameterDialogWithStorage(Frame ownerFrame, ParameterStore parameterStore) {
    super(ownerFrame);
    this.parameterStore = parameterStore;
  }

  /**
   * Constructs a new parameter dialog.
   * @param ownerFrame the frame who owns the dialog
   */
  public ParameterDialogWithStorage(JDialog ownerDialog) {
    super(ownerDialog);
    construct();
  }
  
  /**
   * Conclusion of the construction process. Allows to do construction details
   * in the sequence "super class" - "this" - "super class", which is a benefit 
   * for easy layout.
   */
  protected void creationEnding() {
    super.creationEnding();
    loadValues();
  }

  protected ParamCheckBox createCheckBox(String lineLabel, Entry parmEntry, String label) {
    return createCheckBox(lineLabel, parmEntry.getKey(), label);
  }

  protected ParamCheckBox createCheckBox(String lineLabel, String key, String label) {
    ParamCheckBox temp = new ParamCheckBox(parameterStore, key, label);
    currentAttributeList.append(lineLabel, temp);
    paramComp.add(temp);
    lastComponent = temp;
    return temp;
  }
  
  protected ParamCheckBox createCheckBox(Entry parmEntry, String label) {
    ParamCheckBox temp = new ParamCheckBox(parameterStore, parmEntry.getKey(), label);
    currentAttributeList.append(temp);
    paramComp.add(temp);
    lastComponent = temp;
    return temp;
  }
  
  protected ParamTextField createTextField(Entry parmEntry, int length) {
    ParamTextField temp = new ParamTextField(parameterStore, parmEntry, length);
    currentAttributeList.append(temp);
    paramComp.add(temp);
    lastComponent = temp;
    return temp;
  }
  
  protected ParamTextField createTextField(String lineLabel, Entry parmEntry, int length) {
    ParamTextField temp = new ParamTextField(parameterStore, parmEntry, length);
    currentAttributeList.append(lineLabel, temp);
    paramComp.add(temp);
    lastComponent = temp;
    return temp;
  }
  
  protected ParamTextField createTextField(String lineLabel, String key, int length) {
    ParamTextField temp = new ParamTextField(parameterStore, key, length);
    currentAttributeList.append(lineLabel, temp);
    paramComp.add(temp);
    lastComponent = temp;
    return temp;
  }
  
  protected ParamTextArea createTextArea(String lineLabel, Entry parmEntry) {
    ParamTextArea temp = new ParamTextArea(parameterStore, parmEntry, 3, 50, 254);
    currentAttributeList.append(lineLabel, temp);
    paramComp.add(temp);
    lastComponent = temp;
    return temp;
  }
  
  protected ParamIntField createIntField(String lineLabel, ParameterStore.Entry parmEntry) {
    return createIntField(lineLabel, parmEntry.getKey());
  }
  
  protected ParamIntField createIntField(ParameterStore.Entry parmEntry) {
    ParamIntField temp = new ParamIntField(parameterStore, parmEntry);
    currentAttributeList.append(temp);
    paramComp.add(temp);
    lastComponent = temp;
    return temp;
  }
  
  protected ParamIntField createIntField(String lineLabel, String key) {
    ParamIntField temp = new ParamIntField(parameterStore, key);
    currentAttributeList.append(lineLabel, temp);
    paramComp.add(temp);
    lastComponent = temp;
    return temp;
  }
  
  protected ParamChoice createChoice(String lineLabel, KeyValuePairNum[] content, Entry entry) {
    ParamChoice temp = new ParamChoice(parameterStore, content, entry.getKey());
    currentAttributeList.append(lineLabel, temp);
    paramComp.add(temp);
    lastComponent = temp;
    return temp;
  }
  
  protected ParamChoice createChoice(String lineLabel, KeyValuePairAlpha[] content, Entry entry) {
    ParamChoice temp = new ParamChoice(parameterStore, content, entry.getKey());
    currentAttributeList.append(lineLabel, temp);
    paramComp.add(temp);
    lastComponent = temp;
    return temp;
  }
  
  protected ParamChoice createChoice(String lineLabel, KeyValuePairAlpha[] content, String key) {
    ParamChoice temp = new ParamChoice(parameterStore, content, key);
    currentAttributeList.append(lineLabel, temp);
    paramComp.add(temp);
    lastComponent = temp;
    return temp;
  }
  
  protected ParamRadioButtonPanel createRadioButtons(String lineLabel, String[] keys, String[] labels, Entry entry) {
    ParamRadioButtonPanel temp = new ParamRadioButtonPanel(keys, labels, parameterStore, entry);
    currentAttributeList.append(lineLabel, temp);
    paramComp.add(temp);
    lastComponent = temp;
    return temp;
  }
  
  /**
   * Creates, registers and returns a ParamPrinterChooser.
   * @param label the label of the new line
   * @param printingClass the printing class which is to be attributed
   * @return the created DataPrinterChooser
   */
  protected ParamPrinterChooser createPrinterChooser(String label, Class<? extends Object> printingClass, ParametersForPrinting parameters) {
    ParamPrinterChooser temp = new ParamPrinterChooser(parameters, printingClass);
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    temp.getAccessibleContext().setAccessibleName(label);
    lastComponent = temp;
    paramComp.add(temp);
    return(temp);
  }
  
  protected ParamDirectorySpecification createDirectorySpecification(String label, Entry parmEntry) {
    return createDirectorySpecification(label, parmEntry, 50);
  }
  
  protected ParamDirectorySpecification createDirectorySpecification(String label, Entry parmEntry, int length) {
    ParamDirectorySpecification temp = new ParamDirectorySpecification(ownerFrame, parameterStore, parmEntry);
    temp.getTextField().getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp.getTextField());
    append(temp.fileChooseButton);
    temp.getTextField().getAccessibleContext().setAccessibleName(label);
    lastComponent = temp.getTextField();
    paramComp.add(temp);
    return(temp);
  }
  
  protected ParamFileSpecification createSoundFileSpecification(String label, Entry parmEntry) {
    return createFileSpecification(label, parmEntry, 50, new String[]{".wav"});
  }
  
  protected ParamFileSpecification createFileSpecification(String label, Entry parmEntry) {
    return createFileSpecification(label, parmEntry, 50, null);
  }
  
  protected ParamFileSpecification createFileSpecification(String label, Entry parmEntry, int length, String[] filterElements) {
    ParamFileSpecification temp = new ParamFileSpecification(ownerFrame, parameterStore, parmEntry, length);
    if (filterElements != null) temp.setFilter(new GenericFileFilter(filterElements));
    temp.getTextField().getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp.getTextField());
    append(temp.fileChooseButton);
    temp.getTextField().getAccessibleContext().setAccessibleName(label);
    lastComponent = temp.getTextField();
    paramComp.add(temp);
    return(temp);
  }
  
  protected ParamFontChoice createFontChoice(ParameterStore.Entry parmEntry) {
    ParamFontChoice temp = new ParamFontChoice(parameterStore, parmEntry);
    currentAttributeList.append(temp);
    paramComp.add(temp);
    lastComponent = temp;
    return temp;
  }
  
  protected void act() {
    saveValues();
    WinContr.getInstance().close(this);
  }

  /**
   * Loads parameters. Needs previous set of ParameterStore.
   */
  protected void loadValues() {
    Iterator<ParamComponent> iterator = paramComp.iterator();
    while (iterator.hasNext()) {
      ParamComponent element = iterator.next();
      element.loadValue();
    }
  }
  
  /**
   * Saves parameter values. Needs previous set of ParameterStore.
   * @see #setParameterStore(de.must.middle.ParameterStore)
   */
  protected void saveValues() {
    Iterator<ParamComponent> iterator = paramComp.iterator();
    while (iterator.hasNext()) {
      ParamComponent element = iterator.next();
      element.saveValue();
    }
  }
  
}
