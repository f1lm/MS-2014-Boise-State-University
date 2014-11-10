/*
 * Copyright (c) 1999-2009 Christoph Mueller. All rights reserved.
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

import java.util.Calendar;
import java.util.GregorianCalendar;

/**
 * @author Christoph Mueller
 */
public class MustDate extends java.sql.Date {

  /**
   * Constructs a new (SQL) date.
   * @param year the year of the date
   * @param month the month of the date as written (1...12)
   * @param day the day of the month
   */
  public MustDate(int year, int month, int day) {
    super((new GregorianCalendar(year, month-1, day)).getTime().getTime());
  }

  /**
   * Constructs a new (SQL) date.
   * @param dateString the date as String in format YYYY-MM-DD
   */
  public MustDate(String dateString) {
    super(getTime(dateString));
  }

  /**
   * Returns the time value of a date String in format YYYY-MM-DD.
   * @param dateString the date as String in format YYYY-MM-DD
   * @return the time value of a date String in format YYYY-MM-DD
   */
  public static synchronized long getTime(String dateString) {
    String year = dateString.substring(0, 4);
    String month = dateString.substring(5, 7);
    String day = dateString.substring(8);
    int yearInt = Integer.valueOf(year).intValue();
    int monthInt = Integer.valueOf(month).intValue();
    int dayInt = Integer.valueOf(day).intValue();
    return new GregorianCalendar(yearInt, monthInt-1, dayInt).getTime().getTime();
  }       

  /**
   * Compares two date values checking if it' the same day regardless the time. 
   * @param date1
   * @param date2
   * @return true if the two date values are of the same day 
   */
  public static synchronized boolean isEqualDayRegardlessTime(java.sql.Date date1, java.sql.Date date2) {
    if (date1 == null &&  date2 == null) return true;
    else if (date1 == null || date2 == null) return false;
    Calendar cal1 = Calendar.getInstance(); cal1.setTime(date1);
    Calendar cal2 = Calendar.getInstance(); cal2.setTime(date2);
    return
         cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR)
      && cal1.get(Calendar.DAY_OF_YEAR) == cal2.get(Calendar.DAY_OF_YEAR)
    ;
  }
  
}
