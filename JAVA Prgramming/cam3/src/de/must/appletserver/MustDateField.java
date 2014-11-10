/*
 * Copyright (c) 2011-2012 Christoph Mueller. All rights reserved.
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

package de.must.appletserver;

import de.must.applet.Constants;
import de.must.util.*;
import java.util.Locale;

/**
 * Text input field for date values.
 * @author Christoph Mueller
 */
public class MustDateField extends MustTextField {

  protected Locale locale;

  /**
   * Constructs a new date input field.
   */
  public MustDateField(SessionData sessionData) {
    super(sessionData, 10);
  }

  public MustDateField(SessionData sessionData, Locale locale) {
    super(sessionData, 10, 10);
    this.locale = locale;
  }

  @Override
  protected String getCreateTagElement() {
    return Constants.CREATE_DATEFIELD;
  }
  
  /**
   * Sets the date.
   * @param newDate the new value of the date field
   */
  public void setDate(java.sql.Date newDate) {
    if (newDate == null) setText("");
    else {
      DateString dateString1 = new DateString(locale, newDate);
      setText(dateString1.getEditableDateString());
    }
  }

  /**
   * Sets the date as if it was entered by user to force modified flag for data saving.
   * @param newText the new text
   */
  public void setDateAsUserInput(java.sql.Date newDate) {
    if (newDate == null) setText("");
    else {
      DateString dateString1 = new DateString(locale, newDate);
      setTextAsUserInput(dateString1.getEditableDateString());
    }
  }
  
  /**
   * Sets the value of the date field to today.
   */
  public void setTodayValue() {
    this.setText(MustCalendar.getTodayDateAsEditableString());
  }

  /**
   * Returns true if the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isContentValid() {
    return isValid();
  }

  /**
   * Returns true the text field is valid.
   * @return true the text field is valid
   */
  public boolean isValid() {
    if (this.getText().trim().equals("")) return true;
    DateString dateString1 = new DateString(locale, this.getText());
    return dateString1.isValid();
  }

  /**
   * Formats the date string according to the locale.
   */
  public void format() {
    setText((new DateString(locale, this.getText())).getEditableDateString());
  }

  /**
   * Returns the component's value as an sql date.
   * @return the component's value as an sql date
   */
  public java.sql.Date getSqlDate() {
    DateString dateString1 = new DateString(locale, this.getText());
    return dateString1.getSqlDate();
  }

  /**
   * Returns the component's value as a string to compare in sql where clauses.
   * @return the component's value as a string to compare in sql where clauses
   */
  public String getSqlCompareString() {
    DateString dateString1 = new DateString(locale, this.getText());
    return dateString1.getSqlCompareString();
  }

  /**
   * Returns the component's value as a string to compare in Crystal Reports.
   * @return the component's value as a string to compare in Crystal Reportss
   */
  public String getCrpeCompareString() {
    DateString dateString1 = new DateString(locale, this.getText());
    return dateString1.getCrpeCompareString();
  }

}
