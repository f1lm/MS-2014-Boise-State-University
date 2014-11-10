/*
 * Copyright (c) 2002-2010 Christoph Mueller. All rights reserved.
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

/**
 * A tool to measure cumulated time (CPU + wait) from one checkpoint to the other.
 * @author Christoph Mueller
 */
public class Analyzer {
  
  public static final boolean MEASURING_ON = true;

  private static Analyzer instance;
  
  class CheckPoint {
    public String id;
    public long amount;
  }

  private Vector<CheckPoint> points;
  private boolean toMeasure = false;
  private long lastPointWentThrough;

  public final static Analyzer getInstance() {
    if (instance == null) {
      instance = new Analyzer();
    }
    return instance;
  }
  
  public Analyzer() {
		reset();
  }
  
  public void reset() {
		points = new Vector<CheckPoint>();
  }
  
  public synchronized void startMeasuring() {
    toMeasure = true;
    lastPointWentThrough = System.currentTimeMillis();
  }

  public void stopMeasuring() {
    toMeasure = false;
  }
  
  public synchronized void goingThrough(String pointIdentifier) {
    if (!toMeasure) return;
    CheckPoint point;
    long more = System.currentTimeMillis() - lastPointWentThrough;
    lastPointWentThrough = System.currentTimeMillis();
    Iterator<CheckPoint> pointIterator = points.iterator();
    while (pointIterator.hasNext()) {
      point = pointIterator.next();
      if (point.id.equals(pointIdentifier)) {
        point.amount += more;
        return;
      }
    } 
    point = new CheckPoint();
    point.id = pointIdentifier;
    point.amount += more;
    points.add(point);
  }
  
  public void presentAnalyzation() {
    CheckPoint point;
    Iterator<CheckPoint> pointIterator = points.iterator();
    while (pointIterator.hasNext()) {
      point = pointIterator.next();
      de.must.io.Logger.getInstance().info(getClass(), "To " + point.id + " it took " + point.amount + " milliseconds"); 
    }
  } 
  
}

