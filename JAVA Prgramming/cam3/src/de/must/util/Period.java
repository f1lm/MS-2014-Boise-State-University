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

import java.util.Calendar;
import java.util.Date;

import de.must.io.Logger;

/**
 * A period beginning with one date and ending with another date. 
 * If latest date has no time part, time 23:59:59 is assumed.
 * @author Christoph Mueller
 */
public class Period {
  
  private long begin;
  private long end;
  
  private Calendar calBeg;
  private Calendar calEnd;
  
  /**
   * Constructs a new period between now and another date matter which sequence.
   * @param anotherDate another date
   */
  public Period(Date anotherDate) {
    this(new Date(System.currentTimeMillis()), anotherDate);
  }
  
  /**
   * Constructs a new period between two dates no matter which sequence.
   * @param oneDate one date
   * @param anotherDate another date
   */
  public Period(Date oneDate, Date anotherDate) {
    this(oneDate.getTime(), anotherDate.getTime());
  }
  
  /**
   * Constructs a new period between two dates no matter which sequence.
   * @param oneDate one date
   * @param anotherDate another date
   */
  public Period(java.sql.Date oneDate, java.sql.Date anotherDate) {
    this(oneDate.getTime(), anotherDate.getTime());
  }
  
  /**
   * Constructs a new period between two dates no matter which sequence.
   * If latest date has no time part, time 23:59:59 is assumed.
   * @param oneDate one date
   * @param anotherDate another date
   */
  public Period(long oneDate, long anotherDate) {
    if (oneDate < anotherDate) {
      begin = oneDate;
      end = anotherDate;
    } else {
      begin = anotherDate;
      end = oneDate;
    }
    calEnd = Calendar.getInstance();
    calEnd.setTimeInMillis(end);
    if (calEnd.get(Calendar.HOUR_OF_DAY) == 0
     && calEnd.get(Calendar.MINUTE) == 0
     && calEnd.get(Calendar.SECOND) == 0
    ) {
      calEnd.set(Calendar.HOUR_OF_DAY, 23);
      calEnd.set(Calendar.MINUTE, 59);
      calEnd.set(Calendar.SECOND, 59);
      end = calEnd.getTimeInMillis();
    }
  }
  
  /**
   * Returns true if this period overlaps with the specified period.
   * @param period the other period to check on overlapping
   * @return true if this period overlaps with the specified period
   */
  public boolean overlapWith(Period period) {
    if (end > period.begin && begin < period.end) return true;
    return false;
  }

  /**
   * Returns true if this period overlaps with a weekly period definition.
   * @param dayOfWeekBeg the begin day of the weekly definition, see Calendar.MONDAY ...
   * @param timeBeg the begin time
   * @param dayOfWeekEnd the end day of the weekly definition, see Calendar.MONDAY ...
   * @param timeEnd the end time
   * @return true if this period overlaps with a weekly period definition
   */
  public boolean overlapWith(int dayOfWeekBeg, TimeOfDay timeBeg, int dayOfWeekEnd, TimeOfDay timeEnd) {
    if (dayOfWeekBeg < Calendar.SUNDAY
     || dayOfWeekBeg > Calendar.SATURDAY
    ) {
      Logger.getInstance().error(getClass(), "invalid dayOfWeekBeg");
      return false;
    }
    if (dayOfWeekEnd < Calendar.SUNDAY
     || dayOfWeekEnd > Calendar.SATURDAY
    ) {
      Logger.getInstance().error(getClass(), "invalid dayOfWeekEnd");
      return false;
    }
    if (calBeg == null) calBeg = Calendar.getInstance();
    if (calEnd == null) calEnd = Calendar.getInstance();
    calBeg.setTimeInMillis(begin); // determine latest begin date before specified begin
    while (calBeg.get(Calendar.DAY_OF_WEEK) != dayOfWeekBeg) {
      calBeg.add(Calendar.DAY_OF_WEEK, -1);
    }
    calBeg.set(Calendar.HOUR_OF_DAY, timeBeg.getHour());
    calBeg.set(Calendar.MINUTE, timeBeg.getMinute());
    calBeg.set(Calendar.SECOND, timeBeg.getSecond());
    // Logger.getInstance().debug(getClass(), "calBeg = " + new Date(calBeg.getTimeInMillis()));
    // determine next end date
    calEnd.setTimeInMillis(calBeg.getTimeInMillis());
    while (calEnd.get(Calendar.DAY_OF_WEEK) != dayOfWeekEnd) {
      calEnd.add(Calendar.DAY_OF_WEEK, +1);
    }
    calEnd.set(Calendar.HOUR_OF_DAY, timeEnd.getHour());
    calEnd.set(Calendar.MINUTE, timeEnd.getMinute());
    calEnd.set(Calendar.SECOND, timeEnd.getSecond());
    // Logger.getInstance().debug(getClass(), "calEnd = " + new Date(calEnd.getTimeInMillis()));
    if (overlapWith(new Period(calBeg.getTimeInMillis(), calEnd.getTimeInMillis()))) return true;
    // as long as determined next week begin is not after specified ending: check next week
    while (calBeg.getTimeInMillis() < end) {
      calBeg.add(Calendar.WEEK_OF_YEAR, 1);
      // Logger.getInstance().debug(getClass(), "calBeg = " + new Date(calBeg.getTimeInMillis()));
      calEnd.add(Calendar.WEEK_OF_YEAR, 1);
      // Logger.getInstance().debug(getClass(), "calEnd = " + new Date(calEnd.getTimeInMillis()));
      if (overlapWith(new Period(calBeg.getTimeInMillis(), calEnd.getTimeInMillis()))) return true;
    }
    return false;
  }

}
