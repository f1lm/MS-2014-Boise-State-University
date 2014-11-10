/*
 * Copyright (c) 2007 Christoph Mueller. All rights reserved.
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

import de.must.util.Callback;

/**
 * A component to print text which may be assembled by the calling class via callback.
 * Thus, special and combined values may be constructed while standard stuff is handled easily
 * by PrintableText and so on.
 * @author Christoph Mueller
 */
public class PrintableCallback implements PrintableColumn {

  protected String label;
  protected Callback callback;
  protected String value;

  /**
   * Constructs a new PrintableCallback.
   * @param label the label of the new line
   * @param callback the callback interface to be called when values are set. Use setText() to set the new value inside callback method.
   */
  public PrintableCallback(String label, Callback callback) {
    this.label = label;
    this.callback = callback;
  }

  /* (non-Javadoc)
   * @see de.must.print.PrintableColumn#loadValue()
   */
  public void loadValue() {
    callback.callback();
  }

  /* (non-Javadoc)
   * @see de.must.print.PrintableColumn#getLabel()
   */
  public String getLabel() {
    return label;
  }

  /**
   * Sets the component's text.
   * @param the component's new text
   */
  public void setText(String text) {
    value = text;
  }

  /**
   * Returns the component's value to be displayed as text.
   * @return the component's value to be displayed as text
   */
  public String getText() {
    return value;
  }

  /* (non-Javadoc)
   * @see de.must.print.PrintableColumn#hasContent()
   */
  public boolean hasContent() {
    return value.length() > 0;
  }

}
