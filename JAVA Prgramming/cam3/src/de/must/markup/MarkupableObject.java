/*
 * Copyright (c) 2001-2003 Christoph Mueller. All rights reserved.
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

/**
 * An object to be rendered via markup language.
 * @see AttributeList#append
 * @author Christoph Mueller
 */
public class MarkupableObject implements Markupable {

  private Object obj;
  private String fontSize;

  /**
   * Constructs a new markupable object
   * @param obj the object to be marked up
   */
  public MarkupableObject(Object obj) {
    this(obj, null);
  }

  /**
   * Constructs a new markupable object
   * @param obj the object to be marked up
   * @param fontSize the new font size (e.g. 4, -1, +2);
   */
  public MarkupableObject(Object obj, String fontSize) {
    this.obj = obj;
    this.fontSize = fontSize;
  }

  /**
   * Returns the object's label.
   * @return the object's label
   */
  public String getLabel() {
    return "";
  }

  /**
   * Sets the component's tool tip text.
   * @param newToolTipText the component's tool tip text
   */
  public void setToolTipText(String newToolTipText) {
  }

  /**
   * Sets the component's comment text which will be presented to the right of
   * the component.
   * @param comment the component's comment text
   */
  public void setComment(String comment) {
  }

  /**
   * Sets the font size of the object.
   * @param fontSize the new font size (e.g. 4, -1, +2);
   */
  public void setFontSize(String fontSize) {
    this.fontSize = fontSize;
  }

  /**
   * Returns the font size of the object.
   * @return the font size of the object
   */
  public String getFontSize() {
    return fontSize;
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    StringBuffer tagSequence = new StringBuffer();
    if (fontSize!= null) tagSequence.append("<font size=\"" + fontSize + "\">");
    tagSequence.append(obj.toString());
    if (fontSize!= null) tagSequence.append("</font>");
    return tagSequence.toString();
  }

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}
