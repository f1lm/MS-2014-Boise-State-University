/*
 * Copyright (c) 1999-2014 Christoph Mueller. All rights reserved.
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

package de.must.wuic;

import de.must.middle.GlobalStd;
import de.must.util.*;
import java.awt.event.*;
import java.util.Locale;

/**
 * Text field to edit dates.
 * @author Christoph Mueller
 */
public class MustDateField extends MustTextField implements FocusListener {

  /**
   * Constructs a new date text field.
   */
  public MustDateField() {
    super(10);
    capitalization = false; // no matter what default of MustTextField is
    addFocusListener(this);
  }

  /**
   * Called when focus is gained.
   * @param e the focus event
   */
  public void focusGained(FocusEvent e) {
  }

  /**
   * Called when focus is lost. Used for formal checks and completion of formats.
   * @param e the focus event
   */
  public void focusLost(FocusEvent e) {
    if (getText().trim().equals("")) return;
    DateString dateString1 = new DateString(getText());
    if (dateString1.isValid()) {
      setText(dateString1.getEditableDateString());
    }
    else {
      thisToolkit.beep();
      // without message? requestFocus();
    }
  }

  /**
   * Sets the date.
   * @param newDate the new value of the date field
   */
  public void setDate(java.util.Date newDate) {
    if (newDate == null) setText("");
    else {
      DateString dateString1 = new DateString(newDate);
      setText(dateString1.getEditableDateString());
    }
  }

  /**
   * Sets the value of the date field to today.
   */
  public void setTodayValue() {
    setTodayValue(GlobalStd.locale);
  }

  /**
   * Sets the value of the date field to today.
  * @param locale the locale for formatting aspects
   */
  public void setTodayValue(Locale locale) {
    setText(MustCalendar.getTodayDateAsEditableString(locale));
  }

  /**
   * Returns true if the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isContentValid() {
    if (getText().trim().equals("")) return true;
    DateString dateString1 = new DateString(GlobalStd.locale, getText());
    return dateString1.isValid();
  }

  /**
   * Returns true if the edited date is in the range as specified.
   * @param pastYearsLimit  the limit in years this date may be in the past
   * @param futureYearsLimit  the limit in years this date may be in the future
   * @return  true if the edited date is in the range as specified
   */
  public boolean isInRange(double pastYearsLimit, double futureYearsLimit) {
    if (getText().trim().equals("")) return true;
    double futureYears = (double)(getSqlDate().getTime() - System.currentTimeMillis()) / 1000 / 60 / 60 / 24 / 365;
    if (futureYears * -1 > pastYearsLimit) return false;
    if (futureYears > futureYearsLimit) return false;
    return true;
  }

  /**
   * Returns the component's value as a date string.
   * @return the component's value as a date string
   */
  public DateString getDateString() {
    return new DateString(getText());
  }

  /**
   * Returns the component's value as an SQL date.
   * @return the component's value as an SQL date
   */
  public java.sql.Date getSqlDate() {
    if (!isContentValid()) return null;
    DateString dateString1 = new DateString(getText());
    return dateString1.getSqlDate();
  }

  /**
   * Returns the component's value as a string to compare in SQL where clauses.
   * @return the component's value as a string to compare in SQL where clauses
   */
  public String getSqlCompareString() {
    DateString dateString1 = new DateString(GlobalStd.locale, getText());
    return dateString1.getSqlCompareString();
  }

  /**
   * Returns the component's value as a string to compare in Crystal Reports.
   * @return the component's value as a string to compare in Crystal Reports
   */
  public String getCrpeCompareString() {
    DateString dateString1 = new DateString(GlobalStd.locale, getText());
    return dateString1.getCrpeCompareString();
  }

}
