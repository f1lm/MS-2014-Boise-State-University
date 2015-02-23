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
   * A view to different types of objects to be rendered via markup language.
   * Markupable objects are designed similar to JComponent.
   * @author Christoph Mueller
   * @see de.must.markup.MustInputField
   * @see de.must.markup.GroupOfMarkupables
   */
public interface Markupable {

  /**
   * Sets the component's tool tip text.
   * @param newToolTipText the component's tool tip text
   */
  public void setToolTipText(String newToolTipText);

  /**
   * Sets the component's comment text which will be presented to the right of
   * the component.
   * @param comment the component's comment text
   */
  public void setComment(String comment);

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface. At the moment, HTML is supported.
   * @return the tag sequence to show the component
   */
  public String getCreationTag();

  /**
   * Destroys the markupable. Useful to release e.g. static references which 
   * prevent the garbage collector from finalizing. 
   * For example HalfDataComboBoxes add themeselves as Listeners to database
   * changes. These listeners are registered statically. Thus, these listeners
   * cannot be removed by the garbage collector, they have to be removed 
   * manually. This may be done by calling this destroy method.
   */
  public void destroy();
  
}
