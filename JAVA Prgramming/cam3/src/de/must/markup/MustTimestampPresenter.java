/*
 * Copyright (c) 2001-2002 Christoph Mueller. All rights reserved.
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

import java.util.Locale;

/**
 * Date presenter.
 * @author Christoph Mueller
 */
public class MustTimestampPresenter extends MustTextPresenter {

  protected Locale locale;
  private java.text.DateFormat DateFormat = java.text.DateFormat.getDateTimeInstance(java.text.DateFormat.MEDIUM, java.text.DateFormat.SHORT);
  
  /**
   * Constructs a new date presentation field.
   */
  public MustTimestampPresenter() {
    super();
  }

  /**
   * Constructs a new date presentation field for locale as specified.
   * @param locale the formatting relevant locale
   * @param name the name of the date field to be used.
   */
  public MustTimestampPresenter(Locale locale, String name) {
    super(name);
    this.locale = locale;
  }

  /**
   * Sets the date.
   * @param newDate the new value of the date field
   */
  public void set(java.sql.Date newDate) {
    if (newDate == null) this.setText("");
    else {
  	  this.setText(DateFormat.format(newDate)); 
   	}
  }

  /**
   * Sets the date.
   * @param newDate the new value of the date field
   */
  public void set(java.sql.Timestamp newTimestamp) {
    if (newTimestamp == null) this.setText("");
    else {
  	  this.setText(DateFormat.format(newTimestamp)); 
   	}
  }

}
