/*
 * Copyright (c) 2000-2012 Christoph Mueller. All rights reserved.
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

package de.must.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;

import de.must.io.Logger;
import de.must.middle.ApplConstStd;
import de.must.middle.GlobalStd;

/**
 * Date container with formatting functions.
 * @author Christoph Mueller
 */
public class DateString {

  private static final int FORMAT_MM_SLASH_DD_SLASH_JJJJ = 0;
  private static final int FORMAT_DD_DOT_MM_DOT_JJJJ = 1;
  
  private static int centuryLimitValue = 30;
  
  /**
   * Sets the limit for assuming century in case of short date input.
   * Above this limit, century 19 is assumed.
   * Below this limit, century 20 is assumed.
   * @param newCenturyLimitValue the new century limit value
   */
  public static void setCenturyLimitValue(int newCenturyLimitValue) {
    centuryLimitValue = newCenturyLimitValue;
  }

  private DateFormat dateFormatInternal = new SimpleDateFormat(ApplConstStd.CAMELEON_DATE_FORMAT);
  private int dateFormatForPresentation;
  private String editableDateString;
  private String proovedEditableDateString;

  /**
   * Constructs a new date string with current date.
   */
  public DateString() {
    this(new java.sql.Date(System.currentTimeMillis()));
  }

  /**
   * Constructs a new date string.
   * @param theDate am SQL date to set the initial value
   */
  public DateString(java.util.Date theDate) {
    this(GlobalStd.locale, theDate);
  }

  /**
   * Constructs a new date string with current date.
   * @param locale the locale to use for formatting functions
   */
  public DateString(Locale locale) {
    this(locale, new java.util.Date(System.currentTimeMillis()));
  }

  /**
   * Constructs a new date string.
   * @param locale the locale to use for formatting functions
   * @param theDate am SQL date to set the initial value
   */
  public DateString(Locale locale, java.util.Date theDate) {
    setFormat(locale);
    setDate(theDate);
  }

  /**
   * Constructs a new date string using the default locale.
   * @param editableDateString an editable date string to set the initial value
   */
  public DateString(String editableDateString) {
    this(GlobalStd.locale, editableDateString);
  }

  /**
   * Constructs a new date string.
   * @param locale the locale to use for formatting functions
   * @param editableDateString an editable date string to set the initial value
   */
  public DateString(Locale locale, String editableDateString) {
    if (locale == null) dateFormatForPresentation = FORMAT_DD_DOT_MM_DOT_JJJJ;
    else setFormat(locale);
    this.editableDateString = editableDateString;
    if (isValid()) this.editableDateString = proovedEditableDateString;
  }

  private void setFormat(Locale locale) {
    if (locale == null) {
      dateFormatForPresentation = FORMAT_DD_DOT_MM_DOT_JJJJ;
      return;
    }
    // de.must.io.Logger.getInstance().info(getClass(), "Country: " + locale.getCountry() + "<->" + Locale.GERMANY);
    // de.must.io.Logger.getInstance().info(getClass(), "Language: " + locale.getLanguage() + "<->" + Locale.GERMAN);
    if (
     //   locale.getCountry().equals(Locale.GERMANY)
     // || locale.getCountry().equals(Locale.FRANCE)
        locale.getLanguage().equals(Locale.GERMAN.getLanguage())
     || locale.getLanguage().equals(Locale.FRENCH.getLanguage())
    ) {
      dateFormatForPresentation = FORMAT_DD_DOT_MM_DOT_JJJJ;
    } else {
      dateFormatForPresentation = FORMAT_MM_SLASH_DD_SLASH_JJJJ;
    }
  }

  /**
   * Sets the date.
   * @param newDate the new date
   */
  public void setDate(java.util.Date newDate) {
    if (newDate == null) editableDateString = "";
    else editableDateString = editableDateString(dateFormatInternal.format(newDate));
  }

  /**
   * Sets the value to today.
   */
  public void setTodayValue() {
    editableDateString = MustCalendar.getTodayDateAsEditableString();
  }

  /**
   * Returns true if the date is valid.
   * @return true if the date is valid
   */
  public boolean isValid() {
    String dateText = editableDateString;
    String currentDateString;
    if (dateText.equals("")) return true;
    currentDateString = dateString(editableDateString);
    if (currentDateString == null) return false;
    try {
      java.sql.Date.valueOf(currentDateString);
      return true;
    }
    catch (IllegalArgumentException e) {
      Logger.getInstance().debug(getClass(), currentDateString + " not valid");
      return false;
    }
  }

  /**
   * Returns the specified date string (YYYY-MM-DD) as editable date string
   * @param dateString the date string to format
   * @return the locale specific editable date string
   */
  protected String editableDateString(String dateString) {
    String year;
    String month;
    String day;
    String seperator = "-";
    int yearEnd = dateString.indexOf(seperator);
    year = dateString.substring(0, yearEnd);
    int monthEnd = dateString.indexOf(seperator, yearEnd + 1);
    month = dateString.substring(yearEnd +1, monthEnd);
    day = dateString.substring(monthEnd + 1);
    switch (dateFormatForPresentation) {
    case FORMAT_DD_DOT_MM_DOT_JJJJ:
      return day + "." + month + "." + year;
    default:
      return month + "/" + day + "/" + year;
    }
  }

  /**
   * Returns the specified editable date string as date string (YYYY-MM-DD)
   * @param editableDateString the editable date
   * @return
   */
  protected String dateString(String editableDateString) {
    char seperator;
    String day;
    String month;
    String year;
    int dayInt;
    int monthInt;
    int yearInt;
    if (editableDateString.equals("")) return "";
    switch (dateFormatForPresentation) {
    case FORMAT_DD_DOT_MM_DOT_JJJJ:
      seperator = '.';
      break;
    default:
      seperator = '/';
      break;
    }
    try {
      if (editableDateString.indexOf(seperator) == -1) {
        switch (dateFormatForPresentation) {
        case FORMAT_DD_DOT_MM_DOT_JJJJ:
          day = editableDateString.substring(0, 2);
          month = editableDateString.substring(2, 4);
          year = editableDateString.substring(4);
          break;
        default:
          month = editableDateString.substring(0, 2);
          day = editableDateString.substring(2, 4);
          year = editableDateString.substring(4);
          break;
        }
      }
      else {
        int dayEnd;
        int monthEnd;
        switch (dateFormatForPresentation) {
        case FORMAT_DD_DOT_MM_DOT_JJJJ:
          dayEnd = editableDateString.indexOf(seperator);
          day = editableDateString.substring(0, dayEnd);
          monthEnd = editableDateString.indexOf(seperator, dayEnd + 1);
          month = editableDateString.substring(dayEnd + 1, monthEnd);
          year = editableDateString.substring(monthEnd + 1);
          break;
        default:
          monthEnd = editableDateString.indexOf(seperator);
          month = editableDateString.substring(0, monthEnd);
          dayEnd = editableDateString.indexOf(seperator, monthEnd + 1);
          day = editableDateString.substring(monthEnd + 1, dayEnd);
          year = editableDateString.substring(dayEnd + 1);
          break;
        }
      }
      if (year.equals("")) year = MustCalendar.getCurrentYearAsString();
      dayInt = Integer.valueOf(day).intValue();
      monthInt = Integer.valueOf(month).intValue();
      yearInt = Integer.valueOf(year).intValue();
    }
    catch (Exception e) {
      return null;
    };
    if (dayInt < 1 | dayInt > 31) return null;
    if (monthInt < 1 | monthInt > 12) return null;
    if (!(year.length() == 2 || year.length() == 4)) return null;
    if (year.length() == 2) {
      if (yearInt > centuryLimitValue) year = "19" + year;
      else year = "20" + year;
    }
    if (dayInt > MustCalendar.getMonthEndDay(Integer.parseInt(year), monthInt, 1)) return null;
    switch (dateFormatForPresentation) {
    case FORMAT_DD_DOT_MM_DOT_JJJJ:
      proovedEditableDateString = day + "." + month + "." + year;
      break;
    default:
      proovedEditableDateString = month + "/" + day + "/" + year;
      break;
    }
    return year + "-" + month + "-" + day;
  }

  /**
   * Returns true if there is a date given, false if the container represent a leaved out date.
   * @return true if there is a date given
   */
  public boolean isGiven() {
    return !(editableDateString == null) && !editableDateString.equals("");
  }

  /**
   * Returns the SQL compare variant of this date string
   * @return the SQL compare variant of this date string
   */
  public String getSqlCompareString() {
    try {
      return dateString(editableDateString);
    }
    catch (Exception e) {
      return "";
    }
  }
  
  public String getISOString() {
    return getYearAsString() + getMonthAsString() +  getDayAsString();
  }

  /**
   * Returns the Crystal Reports compare variant of this date string.
   * @return the Crystal Reports compare variant of this date string
   */
  public String getCrpeCompareString() {
    return "Date(" + getYearAsString() + "," + getMonthAsString() +  "," + getDayAsString() + ")";
  }

  /**
   * Returns the date as an SQL date.
   * @return the date as an SQL date
   */
  public java.sql.Date getSqlDate() {
    try {
      return java.sql.Date.valueOf(dateString(editableDateString));
    }
    catch (Exception e) {
      return null;
    }
  }

  /**
   * Returns the date as a locale specific editable date string.
   * @return the date as a locale specific editable date string
   */
  public String getEditableDateString() {
    return editableDateString;
  }

  /**
   * Returns the date as a locale specific editable date string with 2 digit year.
   * @return the date as a locale specific editable date string with 2 digit year
   */
  public String getEditableDateStringShort() {
    if (editableDateString.length() == 0) return "";
    return editableDateString.substring(0, 6) + editableDateString.substring(8, 10);
  }

  /**
   * Returns the year if the date as a string.
   * @return the year if the date as a string
   */
  public String getYearAsString() {
    String dateString = dateString(editableDateString);
    return dateString.substring(0, 4);
  }

  /**
   * Returns the month if the date as a string.
   * @return the month if the date as a string
   */
  public String getMonthAsString() {
    String dateString = dateString(editableDateString);
    return dateString.substring(5, 7);
  }

  /**
   * Returns the day if the date as a string.
   * @return the day if the date as a string
   */
  public String getDayAsString() {
    String dateString = dateString(editableDateString);
    return dateString.substring(8, 10);
  }

  /**
   * Returns the year if the date as an int.
   * @return the year if the date as an int
   */
  public int getYearAsInt() {
    return Integer.parseInt(getYearAsString());
  }

  /**
   * Returns the month if the date as an int.
   * @return the month if the date as an int
   */
  public int getMonthAsInt() {
    return Integer.parseInt(getMonthAsString());
  }

  /**
   * Returns the day if the date as an int.
   * @return the day if the date as an int
   */
  public int getDayAsInt() {
    return Integer.parseInt(getDayAsString());
  }

}
