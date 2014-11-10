/*
 * Copyright (c) 2011 Christoph Mueller. All rights reserved.
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
 * Time value without any date aspect.
 * @author Christoph Mueller
 */
public class TimeOfDay {
  
  private int hour;
  private int minute;
  private int second;
  
  public TimeOfDay(int hour, int minute) {
    this(hour, minute, 0);
  }

  public TimeOfDay(int hour, int minute, int second) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }

  /**
   * Constructs a new time of day using format hhmmss or hmmss.
   * @param timeAsInt the time of day using format hhmmss or hmmss
   */
  public TimeOfDay(int timeAsInt) {
    String timeString = Integer.toString(timeAsInt);
    while (timeString.length() < 6) {
      timeString = "0" + timeString;
    }
    hour = Integer.valueOf(timeString.substring(0, 2));
    minute = Integer.valueOf(timeString.substring(2, 4));
    second = Integer.valueOf(timeString.substring(4, 6));
  }

  /**
   * Returns the time of day using format hhmmss or hmmss.
   * @return the time of day using format hhmmss or hmmss
   */
  public int getIntegerValue() {
    return (hour * 10000 + minute * 100 + second);
  }
  
  public int getHour() {
    return hour;
  }
  
  public int getMinute() {
    return minute;
  }
  
  public int getSecond() {
    return second;
  }
  
}
