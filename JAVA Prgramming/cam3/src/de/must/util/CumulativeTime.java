/*
 * Copyright (c) 2003 Christoph Mueller. All rights reserved.
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

/**
 * Representer of a time value (without date part) with cumulation functionality
 * @author Christoph Mueller
 */
public class CumulativeTime {
  
  private int hours;
  private int minutes;
  private int seconds;

  /**
   * Constructs a new initialized time value.
   */
  public CumulativeTime() {
    hours = 0;
    minutes = 0;
    seconds = 0;
  }

  /**
   * Constructs a new time value.
   * @param timeString
   */
  public CumulativeTime(TimeString timeString) {
    String hhmmssString = timeString.getSqlCompareString();
    if (hhmmssString.length() == 7) hhmmssString = "0" + hhmmssString;
    hours = Integer.parseInt(hhmmssString.substring(0, 2));
    minutes = Integer.parseInt(hhmmssString.substring(3, 5));
    seconds = Integer.parseInt(hhmmssString.substring(6, 8));
  }

  /**
   * Constructs a new time value.
   * @param hhmmss
   */
  public CumulativeTime(int hhmmss) {
    String hhmmssString = String.valueOf(hhmmss);
    while (hhmmssString.length() < 6) hhmmssString = "0" + hhmmssString;
    hours = Integer.parseInt(hhmmssString.substring(0, 2));
    minutes = Integer.parseInt(hhmmssString.substring(2, 4));
    seconds = Integer.parseInt(hhmmssString.substring(4, 6));
  }

//  /**
//   * Constructs a new time value. 
//   * Colon!
//   */
//  public CumulativeTime(String hhCmmCss) {
//    if (hhCmmCss.length() == 7) hhCmmCss = "0" + hhCmmCss;
//    this(Integer.valueOf(hhCmmCss.substring(0, 2)), Integer.valueOf(hhCmmCss.substring(3, 5)), Integer.valueOf(hhCmmCss.substring(6, 8)));
//  }

  /**
   * Constructs a new time value.
   * @param hours the amount of hours of the time
   * @param minutes the amount of minutes of the time
   */
  public CumulativeTime(int hours, int minutes) {
    this(hours, minutes, 0);
  }

	/**
	 * Constructs a new time value.
   * @param hours the amount of hours of the time
   * @param minutes the amount of minutes of the time
   * @param seconds the seconds of minutes of the time
	 */
	public CumulativeTime(int hours, int minutes, int seconds) {
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
	}

  /**
   * Constructs a new time value as period given by the difference of to time
   * values.
   * @param beginTime the begin of the period
   * @param endTime the end of the period 
   */
  public CumulativeTime(CumulativeTime beginTime, CumulativeTime endTime) {
    this.hours = endTime.hours;
    this.minutes = endTime.minutes;
    this.seconds = endTime.seconds;
    subtract(beginTime);
  }

  /**
   * Adds the specified time to this time
	 * @param time the time to be added
	 */
	public void add(CumulativeTime time) {
    hours = hours + time.hours;
    minutes = minutes + time.minutes;
    seconds = seconds + time.seconds;
    correct60();
  }

  /**
   * Subtracts the specified time to this time.
   * @param time the time to be subtracted
   */
  public void subtract(CumulativeTime time) {
    hours = hours - time.hours;
    minutes = minutes - time.minutes;
    seconds = seconds - time.seconds;
    correct60();
  }

  private void correct60() {
    while (seconds > 60) {
      seconds = seconds - 60;
      minutes = minutes + 1;
    }
    while (seconds < 0) {
      seconds = seconds + 60;
      minutes = minutes - 1;
    }
    while (minutes > 60) {
      minutes = minutes - 60;
      hours = hours + 1;
    }
    while (minutes < 0) {
      minutes = minutes + 60;
      hours = hours - 1;
    }
  }

  /**
   * Returns the time as a decimal value, e.g. 27 hours and 45 minutes would 
   * return 27.75 hours
	 * @return the time as a decimal value
	 */
	public double getHoursAsDecimalValue() {
    return hours + (double)minutes / 60 + (double)seconds / 3600;
  }
  
  /**
   * Returns the time as a string without seconds, e.g. 23:45
   * @return the time as a string without seconds
   */
  public String getTimeViewWithoutSeconds() {
    String minutesString = String.valueOf(minutes);
    if (minutesString.length() == 1) minutesString = "0" + minutesString;
    return hours + ":" + minutesString;
  }

  /**
   * Returns the time as a string with seconds, e.g. 23:45:00
   * @return the time as a string with seconds
   */
  public String getTimeViewWithSeconds() {
    String minutesString = String.valueOf(minutes);
    if (minutesString.length() == 1) minutesString = "0" + minutesString;
    String secondsString = String.valueOf(seconds);
    if (secondsString.length() == 1) secondsString = "0" + secondsString;
    return hours + ":" + minutesString + ":" + secondsString;
  }

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return getTimeViewWithSeconds();
	}

}
