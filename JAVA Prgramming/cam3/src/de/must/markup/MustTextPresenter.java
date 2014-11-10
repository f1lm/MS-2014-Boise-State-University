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

/**
 * A component to present a text information.
 * @author Christoph Mueller
 */
public class MustTextPresenter implements Markupable {

  static final int ALIGN_LEFT = 0;
  static final int ALIGN_CENTER = 1;
  static final int ALIGN_RIGHT = 2;
  private int align = ALIGN_LEFT;
 
  protected String name;
  private static String defaultClassName;
  protected String className;
  private static String defaultAdditionalTagFragments;
  protected String additionalTagFragments;
  protected String value = "";
  protected String toolTipText;
  private String comment;
  protected String font = null;

  /**
   * Constructs a new text presenter.
   */
  public MustTextPresenter() {
    this("noname");
  }

  /**
   * Constructs a new text presenter.
   * @param name the name of the field to be used for markup parameters
   */
  public MustTextPresenter(String name) {
    this.name = name;
  }

  /**
   * Sets the component's default class name - may be used to assign formatting 
   * via stylesheets.
   * @param newDefaultClassName the component's default class name
   */
  public static void setDefaultClassName(String newDefaultClassName) {
    defaultClassName = newDefaultClassName;
  }

  /**
   * Sets the component's class name - may be used to assign formatting 
   * via stylesheets.
   * @param newDefaultClassName the component's class name
   */
  public void setClassName(String className) {
    this.className = className;
  }

  /**
   * Sets the component's default additional tag fragments. 
   * E.g. JavaScript like onChange may be added.
   * @param newDefaultClassName the component's default additional tag fragments.
   */
  public static void setDefaultAdditionalTagFragments(String newDefaultAdditionalTagFragments) {
    defaultAdditionalTagFragments = newDefaultAdditionalTagFragments;
  }

  /**
   * Sets the component's font.
   * @param font the component's font.
   */
  public void setFont(String font) {
    this.font = font;
  }
  
  /**
   * Sets the component's additional tag fragments.
   * E.g. JavaScript like onChange may be added.
   * @param newDefaultClassName the component's additional tag fragments.
   */
  public void setAdditionalTagFragments(String additionalTagFragments) {
    this.additionalTagFragments = additionalTagFragments;
  }
  
  /**
   * Sets the alignment.
   * @param newAlignment the new alignment which may be
   * <code>{@link #ALIGN_LEFT ALIGN_LEFT}</code>,
   * <code>{@link #ALIGN_CENTER ALIGN_CENTER}</code> or
   * <code>{@link #ALIGN_RIGHT ALIGN_RIGHT}</code>
   */
  public void setAlignment(int newAlignment) {
    this.align = newAlignment;
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
    StringBuffer tagSequence = new StringBuffer();
  	if (value == null) return "";
    switch (align) {
    case ALIGN_CENTER:
      tagSequence.append("<div align=\"Center\">");
      break;
    case ALIGN_RIGHT:
      tagSequence.append("<div align=\"Right\">");
      break;
    }  
    if (font != null) tagSequence.append("<font " + font + ">");
    tagSequence.append(de.must.util.HtmlPiece.getHtmlRepresentation(value));
    if (font != null) tagSequence.append("</font>");
    switch (align) {
    case ALIGN_CENTER:
      tagSequence.append("</div>");
      break;
    case ALIGN_RIGHT:
      tagSequence.append("</div>");
      break;
    }  
    return tagSequence.toString();
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
