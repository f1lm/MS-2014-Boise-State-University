/*
 * Copyright (c) 2001 Christoph Mueller. All rights reserved.
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
package de.must.markup;

import de.must.dataobj.*;

/**
 * A database connected component to present a reference information.
 * @author Christoph Mueller
 */
public class MustReferencePresenter implements Markupable {

  public static final int REFERENCE_TYPE_INTEGER = 0;
  public static final int REFERENCE_TYPE_STRING = 1;
  public static final int REFERENCE_TYPE_STATIC_CONTENT = 2;

  protected int referenceType;
  protected DataObject referenceDataObject;
  protected String[][] content;
  protected String printableColumnName;
  private String value;
  private String toolTipText;
  private String comment;

  /**
   * Constructs a database connected reference presenter
   * @param referenceDataObject the reference data object
   * @param printableColumnName the printable column name
   */
  public MustReferencePresenter(DataObject referenceDataObject, String printableColumnName) {
    this.referenceDataObject = referenceDataObject;
    this.printableColumnName = printableColumnName;
    referenceType = REFERENCE_TYPE_INTEGER;
  }

  /**
   * Constructs a database connected reference presenter
   * @param content the content of the reference presenter
   */
  public MustReferencePresenter(String[][] content) {
    this.content = content;
    referenceType = REFERENCE_TYPE_STATIC_CONTENT;
  }

  /**
   * Sets the component's tool tip text.
   * @param newToolTipText the component's tool tip text
   */
  public void setToolTipText(String newToolTipText) {
    this.toolTipText = newToolTipText;
  }

  /**
   * Sets the component's comment text which will be presented to the right of
   * the component.
   * @param comment the component's comment text
   */
  public void setComment(String comment) {
    this.comment = comment;
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface. Useful to minimize instructions in JavaServerPages - only the
   * markupable object is to be named.
   * @return the tag sequence to show the component
   */
  public String toString() {
    return getCreationTag();
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    String tag = value;
    /* if (toolTipText != null) {
      tag += " onMouseOver=\"window.status='" + toolTipText + "';return true\"";
    } */
    // tag += ">";
    return tag;
  }

  /**
   * Return the text of the specified field.
   * @return the text of the specified field
   */
  public String getText() {
    return value;
  }

  /**
   * Sets the text.
   * @param newText the new text
   */
  public void setText(String newText) {
    value = newText;
  }

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}
