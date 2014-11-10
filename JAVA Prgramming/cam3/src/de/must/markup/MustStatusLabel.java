/*
 * Copyright (c) 1999-2001 Christoph Mueller. All rights reserved.
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
 * Label to present informations like error messages.
 * @author Christoph Mueller
 */
public class MustStatusLabel implements Markupable {

  private String value;

  public MustStatusLabel() {
  }

  public void setToolTipText(String newToolTipText) {
    // not in use here
  }

  public void setComment(String comment) {
    // not in use here
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    return value;
  }

  /**
   * Return the text of the label.
   * @return the text of the label
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
   * Set's the status label to its default value.
   */
  public void reset() {
    this.setText("");
  }

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}
