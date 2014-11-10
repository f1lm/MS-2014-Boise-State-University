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

package de.must.markup;

import de.must.util.*;
import java.util.Locale;

/**
 * Text input field for time values.
 * @author Christoph Mueller
 */
public class MustTimeField extends MustTextField {

  protected Locale locale;

  /**
   * Constructs a new date input field.
   */
  public MustTimeField() {
    super(8);
  }

  /**
   * Constructs a new date input field for locale as specified.
   * @param locale the formatting relevant locale
   * @param name the name of the date field to be used.
   */
  public MustTimeField(Locale locale, String name) {
    super(name, "", 8, 8);
    this.locale = locale;
  }

  /**
   * Sets the time.
   * @param newTime the new value of the time field
   */
  public void setTime(java.sql.Time newTime) {
    if (newTime == null) this.setText("");
    else {
      setText(TimeString.getTimeStringIgnoringSeconds(newTime));
    }
  }

  /**
   * Returns true the text field is valid.
   * @return true the text field is valid
   */
  public boolean isValid() {
    if (this.getText().trim().equals("")) return true;
    TimeString timeString = new TimeString(this.getText().trim());
    return timeString.isValid();
  }

  /**
   * Returns the component's value as an sql date.
   * @return the component's value as an sql date
   */
  public java.sql.Time getSqlTime() {
    if (getText().trim().equals("")) return null;
    TimeString timeString = new TimeString(this.getText().trim());
    return timeString.getSqlTime();
  }

  /**
   * Returns the component's value as a TimeString.
   * @return the component's value as a TimeString
   */
  public TimeString getTimeString() {
    if (getText().trim().equals("")) return null;
    return new TimeString(this.getText().trim());
  }

  public int getIntValue() {
    if (getText().trim().equals("")) return 0;
    StringBuffer timeStringBuffer2 = new StringBuffer();
    char[] timeString1 = new TimeString(this.getText().trim()).getSqlTime().toString().toCharArray();
    for (int i = 0; i < timeString1.length; i++) {
			if (timeString1[i] != ':') {
        timeStringBuffer2.append(timeString1[i]);
      }
		}
    return Integer.parseInt(timeStringBuffer2.toString());
  }

}

