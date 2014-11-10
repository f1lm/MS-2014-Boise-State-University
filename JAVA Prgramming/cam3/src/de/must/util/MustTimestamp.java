/*
 * Copyright (c) 2002 Christoph Mueller. All rights reserved.
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

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.GregorianCalendar;

/**
 * Extended java.sql.Timestamp class to simplify transformations.
 * @author Christoph Mueller
 */
public class MustTimestamp extends Timestamp {

  /**
   * Constructs a new MustTimestamp.
   * @param hour the hour of the time
   * @param minute the minute of the time
   * @param second the second of the time
   */
  public MustTimestamp(int year, int month, int day, int hour, int minute, int second) {
    super(Timestamp.valueOf(getJDBCEscapeFormat(year, month, day, hour, minute, second)).getTime());
  }

  /**
   * Returns the JDBC escape Format of a time.
   * @param hour the hour of the time
   * @param minute the minute of the time
   * @param second the second of the time
   * @return the JDBC escape Format of a time
   */
  public static synchronized String getJDBCEscapeFormat(Timestamp time) {
    Calendar calendar = new GregorianCalendar();
    calendar.setTime(time);
    int year = calendar.get(Calendar.YEAR);
    int month = calendar.get(Calendar.MONTH) + 1;
    int day = calendar.get(Calendar.DAY_OF_MONTH);
    int hour = calendar.get(Calendar.HOUR_OF_DAY);
    int minute = calendar.get(Calendar.MINUTE);
    int second = calendar.get(Calendar.SECOND);
    return getJDBCEscapeFormat(year, month, day, hour, minute, second);
   }

  /**
   * Returns the JDBC escape Format of a time.
   * @param year the year of the date
   * @param month the month of the date as written (1...12)
   * @param day the day of the month
   * @param hour the hour of the time
   * @param minute the minute of the time
   * @param second the second of the time
   * @return the JDBC escape Format of a time
   */
  public static synchronized String getJDBCEscapeFormat(int year, int month, int day, int hour, int minute, int second) {
    String yearString = String.valueOf(year);
    String monthString = String.valueOf(month);
    String hourString = String.valueOf(hour);
    String dayString = String.valueOf(day);
    String minuteString = String.valueOf(minute);
    String secondString = String.valueOf(second);
    // String milliString = String.valueOf(milli);
    if (yearString.length() == 1) yearString = "0" + yearString;
    if (monthString.length() == 1) monthString = "0" + monthString;
    if (dayString.length() == 1) dayString = "0" + dayString;
    if (hourString.length() == 1) hourString = "0" + hourString;
    if (minuteString.length() == 1) minuteString = "0" + minuteString;
    if (secondString.length() == 1) secondString = "0" + secondString;
    return yearString + "-" + monthString + "-" + dayString + " " + hourString + ":" + minuteString + ":" + secondString/* + "." + milliString*/; 
   }

}

