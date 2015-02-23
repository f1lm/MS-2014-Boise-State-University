/*
 * Copyright (c) 2002-2011 Christoph Mueller. All rights reserved.
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
 * Time container with formatting functions.
 * @author Christoph Mueller
 */
public class TimeString {

  private TimeOfDay timeOfDay;
  private String editableTimeString;
  private String proovedEditableTimeString;

  /**
   * Constructs a new time string.
   * @param editableTimeString an editable time string to set the initial value
   */
  public TimeString(String editableTimeString) {
    this.editableTimeString = editableTimeString;
    if (isValid()) this.editableTimeString = proovedEditableTimeString;
    else if (editableTimeString.length() == 3) {
      this.editableTimeString = "0" + editableTimeString;
      if (isValid()) this.editableTimeString = proovedEditableTimeString;
    }
  }

  /**
   * Constructs a new time string.
   * @param theTime am SQL time to set the initial value
   */
  public TimeString(java.sql.Time theTime) {
    editableTimeString = theTime.toString();
    proovedEditableTimeString = editableTimeString;
  }

  /**
   * Returns true if the time is valid.
   * @return true if the time is valid
   */
  public boolean isValid() {
    if (proovedEditableTimeString != null) return true;
    String timeText = editableTimeString;
    String currentTimeString;
    if (timeText.equals("")) return true;
    currentTimeString = timeString(editableTimeString);
    if (currentTimeString == null) return false;
    try {
      java.sql.Time.valueOf(currentTimeString);
      return true;
    }
    catch (IllegalArgumentException e) {
      de.must.io.Logger.getInstance().info(getClass(), currentTimeString);
      return false;
    }
  }

  /**
   * Returns the specified editable time string as time string (HH:MM:SS)
   * @param editableTimeString the editable time
   * @return
   */
  private String timeString(String editableTimeString) {
    timeOfDay = null;
    char seperator;
    String second;
    String minute;
    String hour;
    int secondInt;
    int minuteInt;
    int hourInt;
    if (editableTimeString.equals("")) return "";
    if (editableTimeString.length() == 5
     || editableTimeString.length() == 7
    ) {
      editableTimeString = "0" + editableTimeString;
    }
    seperator = ':';
    try {
      if (editableTimeString.indexOf(seperator) == -1) {
        hour = editableTimeString.substring(0, 2);
        minute = editableTimeString.substring(2, 4);
        if (editableTimeString.length() == 4) {
          second = "00";
        } else {
          second = editableTimeString.substring(4);
        }
      } else {
        int hourEnd;
        int minuteEnd;
        hourEnd = editableTimeString.indexOf(seperator);
        hour = editableTimeString.substring(0, hourEnd);
        minuteEnd = editableTimeString.indexOf(seperator, hourEnd + 1);
        if (minuteEnd == -1) {
          minute = editableTimeString.substring(hourEnd + 1);
        } else {
          minute = editableTimeString.substring(hourEnd + 1, minuteEnd);
        } 
        if (minuteEnd == -1 || editableTimeString.length() == minuteEnd) {
          second = "00";
        } else {
          second = editableTimeString.substring(minuteEnd + 1);
        }
      }
      hourInt = Integer.valueOf(hour).intValue();
      minuteInt = Integer.valueOf(minute).intValue();
      secondInt = Integer.valueOf(second).intValue();
    }
    catch (Exception e) {
      return null;
    };
    if (hourInt < 0 | hourInt > 23) return null;
    if (minuteInt < 0 | minuteInt > 59) return null;
    if (secondInt < 0 | secondInt > 59) return null;
    timeOfDay = new TimeOfDay(hourInt, minuteInt, secondInt);
    proovedEditableTimeString = hour + ":" + minute + ":" + second;
    return proovedEditableTimeString;
  }
  
  /**
   * Returns the time as an SQL time.
   * @return the time as an SQL time
   */
  public java.sql.Time getSqlTime() {
    try {
      return java.sql.Time.valueOf(timeString(editableTimeString));
    }
    catch (Exception e) {
      return null;
    }
  }
  
  public int getIntValue() {
    return timeOfDay.getIntegerValue();
  }
  
  /**
   * Returns the SQL compare variant of this time string
   * @return the SQL compare variant of this time string
   */
  public String getSqlCompareString() {
    return proovedEditableTimeString;
  }

  public String getTimeString() {
    return getTimeStringIgnoringSeconds(this.getSqlTime());
  }

  /**
   * Returns the time string in a HH:MM format.
   * @return the time string in a HH:MM format
   */
  public String getTimeStringIgnoringSeconds() {
    return getTimeStringIgnoringSeconds(getSqlTime());
  }

  /**
   * Returns a time string in a HH:MM format.
   * @param java.sql.Time the time to be formatted
   * @return the time string in a HH:MM format
   */
  public static synchronized String getTimeStringIgnoringSeconds(java.sql.Time time) {
    if (time == null) return "";
    return time.toString().substring(0, 5);
  }

  /**
   * Returns a time string in a HH:MM:SS format.
   * @param java.sql.Time the time to be formatted
   * @return the time string in a HH:MM:SS format
   */
  public static synchronized String getTimeString(java.sql.Time time) {
    if (time == null) return "";
    return time.toString();
  }

}

