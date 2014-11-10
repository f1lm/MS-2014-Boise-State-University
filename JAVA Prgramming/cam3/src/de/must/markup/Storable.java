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
 * A view to different types of markupable components, whose values shall be
 * loaded and stored.
 * It is useful to handle different types of input fields with database
 * connection in a simple array.
 * @author Christoph Mueller
 * @see GroupOfStorables
 */
public interface Storable extends Markupable {

  /**
   * Sets the fact that user input is requested (mandatory)
   * @param required whether this inuput is mandatory or not.
   */
  public void setRequired(boolean required);

  /**
   * Loads the component's database stored value.
   */
  public void loadValue();

  /**
   * Returns true if the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled();

  /**
   * Returns true if the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified();

  /**
   * Returns true if the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isValid();

  /**
   * Returns true if the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled();

  /**
   * Stores the component's value.
   */
  public void saveValue();

}
