/*
 * Copyright (c) 2004 Christoph Mueller. All rights reserved.
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
 * Input field to be rendered via markup languages.
 * A view to different types of input fields to be used in markup languages.
 * Markupable input fields are designed similar to JComponent. They have a value
 * that may be set and retrieved like e.g. setText() and getText(). When
 * laid-out, they provide tag sequences. When updated by user input via action
 * POST, they synchronize their values by method fetchYourValueFromRequest.
 * @author Christoph Mueller
 * @see de.must.markup.MustInputField
 * @see de.must.markup.GroupOfMarkupables
 */
public abstract class MustInputField implements Markupable {

  protected String name;
  protected String toolTipText;
  protected String comment;
  
  /**
   * Constructs a new input field with the specified name.
   * @param name the name of the field to be used for markup parameters
   */
  public MustInputField(String name) {
    this.name = name;
  }
  
  /**
   * Returns the name of the input field.
   * @return the name of the input field
   */
  public String getName() {
    return name;
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
   * Causes the component to read user input by calling request.getParameter and
   * update the internal mirrored value.
   * @param request the current request
   */
  public abstract void fetchYourValueFromRequest(GeneralizedRequest request);

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}
