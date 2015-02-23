/*
 * Copyright (c) 2013 Christoph Mueller. All rights reserved.
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

package de.must.dataobj;

import java.io.BufferedReader;
import java.sql.Date;
import java.sql.Time;
import java.util.Vector;

import de.must.middle.ApplConstStd;

/**
 * Text file reader to access data in text files with fixed column position and 
 * delimiter and labels in first line to identify content.
 * @author Christoph Mueller
 */
public class DataTextObjectWithDelimiterAndLabels extends DataTextObjectWithDelimiter {
  
  Vector<String> cols = new Vector<String>();
  
  public DataTextObjectWithDelimiterAndLabels(BufferedReader bure, char delimiter) {
    super(bure, delimiter);
    if (nextRow()) {
      int i = 0;
      String text;
      while ((text = getText(++i)).length() > 0) {
        cols.add(text);
      }
    }
  }
  
  public String getText(String columnName) {
    int i = cols.indexOf(columnName) + 1;
    if (i > 0) return getText(i);
    else return "";
  }

  public int getInt(String columnName) throws NumberFormatException {
    int i = cols.indexOf(columnName) + 1;
    if (i > 0) return getInt(i);
    else return 0;
  }

  public double getDouble(String columnName, boolean commaSeparatesDecimal) throws NumberFormatException {
    int i = cols.indexOf(columnName) + 1;
    if (i > 0) return getDouble(i, commaSeparatesDecimal);
    else return 0;
  }

  public double getDouble(String columnName) throws NumberFormatException {
    int i = cols.indexOf(columnName) + 1;
    if (i > 0) return getDouble(i, true);
    else return 0;
  }

  public float getFloat(String columnName) throws NumberFormatException {
    return (float)getDouble(columnName, true);
  }

  public Date getDate(String columnName) {
    int i = cols.indexOf(columnName) + 1;
    if (i > 0) return getDate(i);
    else return null;
  }
  
  public Time getTime(String columnName) {
    int i = cols.indexOf(columnName) + 1;
    if (i > 0) return getTime(i);
    else return null;
  }
  
  public Boolean getBoolean(String columnName) {
    String text = getText(columnName);
    if (ApplConstStd.TRUE_STRING.equals(text)) {
      return new Boolean(true);
    } else {
      return new Boolean(false);
    }
  }
  
  public Object getObject(String columnName) {
    String text = getText(columnName);
    if (ApplConstStd.TRUE_STRING.equals(text)) {
      return new Boolean(true);
    } else if (ApplConstStd.FALSE_STRING.equals(text)) {
      return new Boolean(false);
    }
    return text;
  }

}

