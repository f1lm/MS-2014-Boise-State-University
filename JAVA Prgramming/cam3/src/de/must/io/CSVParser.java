/*
 * Copyright (c) 2002-2013 Christoph Mueller. All rights reserved.
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

package de.must.io;

import java.sql.Date;
import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Vector;

import de.must.middle.ApplConstStd;

public abstract class CSVParser {

  public static final char DEFAULT_DELIMITER = ';';

  protected boolean autoCorrectBadQuotes;
  protected char delimiter = DEFAULT_DELIMITER;
  protected Vector<String> fields;
  protected DateFormat defaultFormat = new SimpleDateFormat(ApplConstStd.CAMELEON_TIMESTAMP_FORMAT);
  protected DateFormat dateFormatddMMyy = new SimpleDateFormat("dd.MM.yy");
  protected DateFormat dateFormatddMMyyyy = new SimpleDateFormat("dd.MM.yyyy");
  protected DateFormat dateFormatyyyyMMdd = new SimpleDateFormat("yyyy-MM-dd");

  protected void parseFields(String line) {
    fields = new Vector<String>();
    char[] lineChars = line.toCharArray();
    if (lineChars.length == 0) {
      return;
    }
    boolean quoted = false;
    String field = "";
    for (int i = 0; i < lineChars.length; i++) {
      if (lineChars[i] == '"') {
        if (i+1 < lineChars.length && lineChars[i+1] == '"') { // double quote
          field += lineChars[i]; // use one
          i++; // ignore second one
        } else {
          quoted = !quoted;
        }
      } else if (!quoted && lineChars[i] == delimiter) {
        fields.add(field);
        field = "";
      } else {
        field += lineChars[i];
      }
    }
    if (field.length() > 0) {
      fields.add(field);
      field = "";
    }
  }
  
  /**
   * Returns the number of fields read by nextRow().
   * @return the number of fields read by nextRow()
   */
  public int getFieldCount() {
    return fields.size();
  }

  /**
   * Returns the value of the column as specified by column nbr as integer
   * @param columnNbr the nbr of the column which value should be returned 
   * @return the value of the column of the current line
   */
  public int getInt(int columnNbr) throws NumberFormatException {
    String value = getText(columnNbr).trim();
    if (value.length() == 0) return 0;
    return Integer.parseInt(value);
  }

  /**
   * Returns the value of the column as specified by column nbr as double
   * @param columnNbr the nbr of the column which value should be returned 
   * @return the value of the column of the current line
   */
  public double getDouble(int columnNbr, boolean commaSeparatesDecimal) throws NumberFormatException {
    String text = getText(columnNbr).trim();
    if (commaSeparatesDecimal) text = text.replace(',', '.');
    return Double.parseDouble(text);
  }

  /**
   * Returns the value of the column as specified by column nbr beginning with 1.
   * @param columnNbr the nbr of the column which value should be returned 
   * @return the value of the column of the current line
   */
  public String getText(int columnNbr) {
    if (columnNbr > fields.size()) return "";
    return fields.elementAt(columnNbr-1);
  }
  
  public Date getDate(int columnNbr) {
    String fieldText = getText(columnNbr);
    if (fieldText.length() == 0) return null;
    else if (fieldText.length() == 8) try {
      return new Date(dateFormatddMMyy.parse(fieldText).getTime());
    } catch (ParseException e) {
      Logger.getInstance().warn("Could not parse " + fieldText + " to Date");
      return null;
    } else if (fieldText.length() >= 21) try {
      return new Date(defaultFormat.parse(fieldText).getTime());
    } catch (ParseException e) {
      Logger.getInstance().warn("Could not parse " + fieldText + " to Date");
      return null;
    } else try {
      return new Date(dateFormatddMMyyyy.parse(fieldText).getTime());
    } catch (ParseException e) {} try {
      return new Date(dateFormatyyyyMMdd.parse(fieldText).getTime());
    } catch (ParseException e) {} // ignore
    Logger.getInstance().warn("Could not parse " + fieldText + " to Date");
    return null;
  }
  
  public Time getTime(int columnNbr) {
    Date date = getDate(columnNbr);
    if (date == null) return null;
    return new Time(date.getTime());
  }
  
}
