/*
 * Copyright (c) 1999-2012 Christoph Mueller. All rights reserved.
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

import java.util.*;

import de.must.middle.GlobalStd;

/**
 * Calendar Utility.
 * @author Christoph Mueller
 */
abstract public class MustCalendar extends Calendar {

  private static Calendar rightNow;
  private static int currentYear;
  private static int currentMonth;
  private static int currentDay;
  private static String currentDayString;
  private static String currentMonthString;
  private static String currentYearString;

  private static void createIfNull() {
    if (rightNow != null) return;
    rightNow = Calendar.getInstance();
    currentYear = rightNow.get(Calendar.YEAR);
    currentMonth = rightNow.get(Calendar.MONTH) + 1;
    currentDay = rightNow.get(Calendar.DAY_OF_MONTH);
    currentDayString = String.valueOf(currentDay);
    if (currentDayString.length() < 2) {
      currentDayString = "0" + currentDayString;
    }
    currentMonthString = String.valueOf(currentMonth);
    if (currentMonthString.length() < 2) {
      currentMonthString = "0" + currentMonthString;
    }
    currentYearString = String.valueOf(currentYear);
  }

  /**
   * Returns the current year as a string.
   * @return the current year as a string
   */
  public static String getCurrentYearAsString () {
    createIfNull();
    return currentYearString;
  }

  /**
   * Returns today as an editable string for the default locale.
   * @return today as an editable string
   */
  public static String getTodayDateAsEditableString() {
    return getTodayDateAsEditableString(GlobalStd.locale);
  }

  /**
   * Returns today as an editable string.
   * @param locale the locale for formatting aspects
   * @return today as an editable string
   */
  public static String getTodayDateAsEditableString(Locale locale) {
    createIfNull();
    if (isDateFormattedDotSeparated(locale)) {
      return currentDayString + "." + currentMonthString + "." + currentYearString;
    } else {
      return currentMonthString + "/" + currentDayString + "/" + currentYearString;
    }
  }

  /**
   * Returns the today's day of week.
   * @return the today's day of week
   */
  public static int getTodaysWeekDay () {
    createIfNull();
    return rightNow.get(Calendar.DAY_OF_WEEK);
  }

  /**
   * Returns the first day of the current year as an editable string for the 
   * default locale.
   * @return the first day of the current year as an editable string
   */
  public static String getYearBeginDateAsEditableString () {
    return getYearBeginDateAsEditableString(GlobalStd.locale);
  }

  /**
   * Returns the first day of the current year as an editable string.
   * @param locale the locale for formatting aspects
   * @return the first day of the current year as an editable string
   */
  public static String getYearBeginDateAsEditableString (Locale locale) {
    createIfNull();
    if (isDateFormattedDotSeparated(locale)) {
      return "01.01." + currentYearString;
    } else {
      return "01/01/" + currentYearString;
    }
  }

  /**
   * Returns the last day of the current year as an editable string for the 
   * default locale.
   * @return the last day of the current year as an editable string
   */
  public static String getYearEndDateAsEditableString() {
    return getYearEndDateAsEditableString(GlobalStd.locale);
  }

  /**
   * Returns the last day of the current year as an editable string.
   * @param locale the locale for formatting aspects
   * @return the last day of the current year as an editable string
   */
  public static String getYearEndDateAsEditableString(Locale locale) {
    createIfNull();
    if (isDateFormattedDotSeparated(locale)) {
      return "31.12." + currentYearString;
    } else {
      return "12/31" + currentYearString;
    }
  }
  
  private static boolean isDateFormattedDotSeparated(Locale locale) {
    if (locale == null) return false;
    if (locale.getLanguage().equals(Locale.GERMAN.getLanguage())
     || locale.getLanguage().equals(Locale.FRENCH.getLanguage())
    ) return true;
    return false;
  }

  /**
   * Returns the date representing the last day of the month as specified by the given date.
   * @param year the regarded year
   * @param month the regarded month where 1 means January
   * @param date the day of the month
   * @return the date representing the last day of the month as specified by the given date
   */
  public static java.sql.Date getMonthEndDate(int year, int month, int date) {
    try {
      return java.sql.Date.valueOf(year + "-" + month + "-" + getMonthEndDay(year, month, date));
    }
    catch (IllegalArgumentException iae) {
      de.must.io.Logger.getInstance().error(MustCalendar.class, iae);
      return null;
    }
  }

  /**
   * Returns the date representing the last day of the month as specified by the given date.
   * @param year the regarded year
   * @param month the regarded month where 1 means January
   * @param date the day of the month
   * @return the date representing the last day of the month as specified by the given date
   */
  public static int getMonthEndDay(int year, int month, int date) {
    return getMonthEndDay(new GregorianCalendar(year, month-1, date));
  }

  /**
   * Returns the last day of the month as specified by the given date.
   * @param anotherDayOfThisMonth another day of the regarded month
   * @return the date representing the last day of the month as specified by the given date
   */
  public static int getMonthEndDay(Calendar anotherDayOfThisMonth) {
    return anotherDayOfThisMonth.getActualMaximum(Calendar.DAY_OF_MONTH);
  }

  /**
   * Returns the today date as an SQL date.
   * @return the today date as an SQL date
   */
  public static java.sql.Date getTodaySqlDate() {
    createIfNull();
    return java.sql.Date.valueOf(currentYearString + "-" +  currentMonthString + "-" + currentDayString);
  }

  /**
   * Returns a future date.
   * @param futureDaysFromToday the number of days in the future beginning from today
   * @return the future date
   */
  public static java.sql.Date getFutureSqlDate(int futureDaysFromToday) {
    return getFutureSqlDate(futureDaysFromToday, null);
  }

  /**
   * Returns a future date excluding invalid days as an SQL date.
   * @param futureDaysFromToday the number of days in the future beginning from today
   * @param daysOfWeekValid the valid days of the week
   * @return the future date
   */
  public static java.sql.Date getFutureSqlDate(int futureDaysFromToday, boolean[] daysOfWeekValid) {
    return getSqlDate(getFutureCalendarDate(futureDaysFromToday, daysOfWeekValid));
  }

  /**
   * Returns a future date excluding invalid days as a calendar.
   * @param futureDaysFromToday the number of days in the future beginning from today
   * @param daysOfWeekValid the valid days of the week
   * @return the future date
   */
  public static Calendar getFutureCalendarDate(int futureDaysFromToday, boolean[] daysOfWeekValid) {
    int addCounter = 0;
    createIfNull();
    Calendar futureDate = Calendar.getInstance();
    futureDate.add(Calendar.DATE, futureDaysFromToday);
    if (daysOfWeekValid != null) {
      // de.must.io.Logger.getInstance().info(getClass(), "day of week: " + futureDate.get(DAY_OF_WEEK));
      while (!daysOfWeekValid[futureDate.get(DAY_OF_WEEK)-1] & (++addCounter < 7)) {
        futureDate.add(Calendar.DATE, 1);
      }
    }
    return futureDate;
  }

  /**
   * Returns a calendar date as an SQL date.
   * @param calendarDate the calendar date to transform
   * @return an SQL date
   */
  public static java.sql.Date getSqlDate(Calendar calendarDate) {
    int year = calendarDate.get(Calendar.YEAR);
    int month = calendarDate.get(Calendar.MONTH) + 1;
    int day = calendarDate.get(Calendar.DAY_OF_MONTH);
    String dayString = String.valueOf(day);
    if (dayString.length() < 2) {
      dayString = "0" + dayString;
    }
    String monthString = String.valueOf(month);
    if (monthString.length() < 2) {
      monthString = "0" + monthString;
    }
    String yearString = String.valueOf(year);
    return java.sql.Date.valueOf(yearString + "-" +  monthString + "-" + dayString);
  }
  
  /**
   * Returns the difference in days between two dates.
   * @param date1 Date 1
   * @param date2 Date 2
   * @return the difference in days between two dates
   */
  public static int getDiffDays(Date date1, Date date2) {
    if (date1 == null || date2 == null) {
      return Integer.MAX_VALUE;
    }
    int result = 0;
    int step;
    if (date1.equals(date2)) {
      return 0;
    } else if (date1.compareTo(date2) > 0) {
      step = - 1;
    } else {
      step = 1;
    }
    Calendar cal1 = Calendar.getInstance();
    cal1.setTime(date1);
    Calendar cal2 = Calendar.getInstance();
    cal2.setTime(date2);
    while (cal1.get(YEAR) != cal2.get(YEAR) || cal1.get(DAY_OF_YEAR) != cal2.get(DAY_OF_YEAR)) {
      result = result + step;
      cal1.add(DAY_OF_YEAR, step);
    }
    return result;
  }

  /**
   * Returns the difference in years between two dates.
   * @param date1 Date 1
   * @param date2 Date 2
   * @return the difference in years between two dates
   */
  public static int getDiffYears(Date date1, Date date2) {
    if (date1 == null || date2 == null) {
      return Integer.MAX_VALUE;
    }
    Calendar cal1 = Calendar.getInstance();
    cal1.setTime(date1);
    Calendar cal2 = Calendar.getInstance();
    cal2.setTime(date2);
    int result = 0;
    int step;
    if (cal1.get(YEAR) == cal2.get(YEAR)) {
      return 0;
    } else if (date1.compareTo(date2) > 0) {
      step = - 1;
    } else {
      step = 1;
    }
    while (cal1.get(YEAR) != cal2.get(YEAR)) {
      result += step;
      cal1.add(YEAR, step);
    }
    if (step > 0 &&  cal1.get(DAY_OF_YEAR) > cal2.get(DAY_OF_YEAR)
     || step < 0 &&  cal1.get(DAY_OF_YEAR) < cal2.get(DAY_OF_YEAR)
    ) {
      result -= step; // last year isn't complete
    }
    return result;
  }

}
