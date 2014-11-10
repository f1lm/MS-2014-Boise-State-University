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

import java.text.DecimalFormat;
import java.util.Locale;

/**
 * @author Christoph Mueller
 */
public class MustDecimalPresenter extends MustTextPresenter {

  private static String defaultClassName;
  protected Locale locale;
	protected DecimalFormat decimalFieldFormat = (DecimalFormat)DecimalFormat.getInstance();

  /**
   * Constructs a new decimal value presenter.
   */
  public MustDecimalPresenter() {
    this("noname");
  }

  /**
   * Constructs a new decimal value presenter.
   * @param name the name of the date field to be used.
   */
  public MustDecimalPresenter(String name) {
    super(name);
    setClassName(defaultClassName);
    setAlignment(ALIGN_RIGHT);
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
   * Sets the text.
   * @param value the double to be formatted as text
   */
  public void setText(double value) {
    setText(decimalFieldFormat.format(value));
  }

  /**
   * Sets the text.
   * @param newText the double to be formatted as text
   */
  public void setText(java.math.BigDecimal value) {
  	if (value == null) setText(decimalFieldFormat.format(0));
    else setText(decimalFieldFormat.format(value));
  }

}
