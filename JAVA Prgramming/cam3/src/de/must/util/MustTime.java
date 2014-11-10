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

import java.sql.Time;
import java.util.Calendar;
import java.util.GregorianCalendar;

/**
 * Extended java.sql.Time class to simplify transformations from integer to time
 * among others.
 * @author Christoph Mueller
 */
public class MustTime extends Time {

  /**
   * Constructor for MustTime.
   * @param hour the hour
   * @param minute the minute
   */
  public MustTime(String hour, String minute) {
    this(hour, minute, "00");
  }

  /**
   * Constructor for MustTime.
   * @param hour the hour of the time
   * @param minute the minute of the time
   * @param second the second of the time
   */
  public MustTime(String hour, String minute, String second) {
    super(Time.valueOf(hour + ":" + minute + ":" + second).getTime());
  }

  /**
   * Constructor for MustTime.
   * @param hour the hour
   * @param minute the minute
   */
  public MustTime(int hour, int minute) {
    this(hour, minute, 0);
  }

	/**
	 * Constructor for MustTime.
   * @param hour the hour of the time
   * @param minute the minute of the time
   * @param second the second of the time
	 */
	public MustTime(int hour, int minute, int second) {
		super(Time.valueOf(getJDBCEscapeFormat(hour, minute, second)).getTime());
	}

  /**
   * Constructor for MustTime.
   * @param time the time in format hhmmss
   */
  public MustTime(int time) {
    super(valueOfEloquentInteger(time).getTime());
  }

	/**
	 * Returns the JDBC escape Format of a time.
   * @param hour the hour of the time
   * @param minute the minute of the time
   * @param second the second of the time
	 * @return the JDBC escape Format of a time
	 */
  public static synchronized String getJDBCEscapeFormat(int hour, int minute, int second) {
    String hourString = String.valueOf(hour);
    String minuteString = String.valueOf(minute);
    String secondString = String.valueOf(second);
    if (hourString.length() == 1) hourString = "0" + hourString;
    if (minuteString.length() == 1) minuteString = "0" + minuteString;
    if (secondString.length() == 1) secondString = "0" + secondString;
    return hourString + ":" + minuteString + ":" + secondString; 
   }

  /**
   * Returns the time given by an eloquent integer, e.g. 235959
   * @param eloquentInteger the eloquent integer, e.g. 235959. This is not a
   * millisecond value, but three pairs of digits naming hour, minute and seconds.
   * @return Time
   */
  public static synchronized Time valueOfEloquentInteger(int eloquentInteger) {
    String timeString = String.valueOf(eloquentInteger);
    if (timeString.length() == 5) timeString = "0" + timeString;
    return Time.valueOf(timeString.substring(0, 2) + ":" + timeString.substring(2, 4) + ":" + timeString.substring(4, 6)); 
   }

	/**
	 * Returns the integer equivalent of the specified time in an eloquent way - 
   * not a millisecond value.
	 * @param time the time to parse.
	 * @return int Returns the integer equivalent of the specified time in an eloquent way, e.g. 235959
	 */
  public static synchronized int getIntegerEquivalent(java.sql.Time time) {
    Calendar calendar = new GregorianCalendar();
    calendar.setTime(time);
    int hours = calendar.get(Calendar.HOUR_OF_DAY);
    int minutes = calendar.get(Calendar.MINUTE);
    int seconds = calendar.get(Calendar.SECOND);
    return (hours * 10000 + minutes * 100 + seconds);
   }

}

