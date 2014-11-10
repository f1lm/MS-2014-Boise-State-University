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

import de.must.util.*;
import java.util.Locale;

/**
 * Date presenter.
 * @author Christoph Mueller
 */
public class MustDatePresenter extends MustTextPresenter {

  protected Locale locale;

  /**
   * Constructs a new date presentation field.
   */
  public MustDatePresenter() {
    super();
  }

  /**
   * Constructs a new date presentation field for locale as specified.
   * @param locale the formatting relevant locale
   * @param name the name of the date field to be used.
   */
  public MustDatePresenter(Locale locale, String name) {
    super(name);
    this.locale = locale;
  }

  /**
   * Sets the date.
   * @param newDate the new value of the date field
   */
  public void setDate(java.sql.Date newDate) {
    if (newDate == null) this.setText("");
    else {
      DateString dateString1 = new DateString(locale, newDate);
      this.setText(dateString1.getEditableDateString());
    }
  }

  /**
   * Sets the value of the date field to today.
   */
  public void setTodayValue() {
    this.setText(MustCalendar.getTodayDateAsEditableString());
  }

}
