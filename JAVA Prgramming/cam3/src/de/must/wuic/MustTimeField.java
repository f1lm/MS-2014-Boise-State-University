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

package de.must.wuic;

import java.awt.event.*;

import de.must.util.TimeString;

/**
 * Text field to edit time.
 * @author Christoph Mueller
 */
public class MustTimeField extends MustTextField implements FocusListener {

  public static boolean isValidXy() {
    return true;
  }
  
  private boolean showSeconds;
  
  /**
   * Constructs a new time text field.
   */
  public MustTimeField() {
    this(false);
  }
  
  public MustTimeField(boolean showSeconds) {
    super(showSeconds?8:5);
    capitalization = false; // no matter what default of MustTextField is
    addFocusListener(this);
  }
  
  /**
   * Called when focus is gained.
   * @param e the focus event
   */
  public void focusGained(FocusEvent e) {
  }

  /**
   * Called when focus is lost. Used for formal checks and completion of formats.
   * @param e the focus event
   */
  public void focusLost(FocusEvent e) {
    if (getText().trim().equals("")) return;
    TimeString timeString = new TimeString(getText());
    if (timeString.isValid()) {
      if (showSeconds) {
        setText(timeString.getTimeString());
      } else {
        setText(timeString.getTimeStringIgnoringSeconds());
      }
    } else {
      thisToolkit.beep();
    }
  }

  /**
   * Returns true if the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isContentValid() {
    if (getText().trim().equals("")) return true;
    TimeString timeString = new TimeString(getText());
    return timeString.isValid();
  }

  public int getIntValue() {
    if (getText().length() == 0) return 0;
    if (!isContentValid()) return 0;
    TimeString timeString = new TimeString(getText());
    return timeString.getIntValue();
  }
  
  public void set(int intValue) {
    setText(String.valueOf(intValue));
    TimeString timeString = new TimeString(getText());
    if (timeString.isValid()) {
      if (showSeconds) {
        setText(timeString.getTimeString());
      } else {
        setText(timeString.getTimeStringIgnoringSeconds());
      }
    }
  }

}
