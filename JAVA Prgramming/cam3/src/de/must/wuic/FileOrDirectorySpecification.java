/*
 * Copyright (c) 2010-2012 Christoph Mueller. All rights reserved.
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

import java.awt.Frame;

import javax.swing.JFileChooser;
import javax.swing.filechooser.FileFilter;

/**
 * A component to specify a file or directory location with select option.
 * @author Christoph Mueller
 */
public abstract class FileOrDirectorySpecification {
  
  private static int defaultLength = 60;
  
  protected Frame ownerFrame;
  protected MustTextField fileName;
  protected MustButton fileChooseButton;
  protected JFileChooser dialog;
  protected FileFilter fileFilter;

  public FileOrDirectorySpecification(Frame ownerFrame, String defaultValue) {
    this(ownerFrame, defaultValue, defaultLength);
  }
  
  public FileOrDirectorySpecification(Frame ownerFrame, String defaultValue, int length) {
    this.ownerFrame = ownerFrame;
    if (length == -1) length = defaultLength;
    fileName = new MustTextField(length);
    fileName.setText(defaultValue);
    fileName.setOnSelectAllOnFocusGained();
  }
  
  /**
   * Sets the value of text field.
   * @param text  the new value of the text field
   */
  public void setText(String text) {
    fileName.setText(text);
  }
  
  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey) {
    return WuicGlobal.getInstance(ownerFrame.getLocale()).getResourceString(resourceKey);
  }

  /**
   * Adds the component to an attribute list
   * @param attributeList the attribute list to be extended
   * @param label the label of the component's row
   */
  public void addTo(AttributeList attributeList, String label) {
    attributeList.append(label, fileName);
    attributeList.append(fileChooseButton);
  }
  
  /**
   * Enables or disables the choose buttons.
   * @param b whether or not this component is enabled 
   */
  public void setEnabled(boolean b) {
    fileName.setEnabled(b);
    fileChooseButton.setEnabled(b);
  }
  
  public String getFileName() {
    return fileName.getText();
  }
  
  public void requestFocus() {
    fileName.requestFocus();
  }
  
  protected MustTextField getTextField() {
    return fileName;
  }
  
}
