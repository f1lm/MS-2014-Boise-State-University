/*
 * Copyright (c) 1999-2008 Christoph Mueller. All rights reserved.
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

import javax.swing.SwingConstants;

/**
 * A text field to edit int values.
 * @author Christoph Mueller
 */
public class MustIntField extends MustTextField {

  protected static boolean showZeroValueByDefault = false;

  /**
   * Sets whether zero should be shown by digit 0
   * @param b whether zero should be shown
   */
  public static void setShowZeroValueByDefault(boolean b) {
    showZeroValueByDefault = b;
  }

  private int columnWidth;
  private int maxValue = Integer.MAX_VALUE;

  /**
   * Constructs a new int text field with a default size of 5 characters.
   */
  public MustIntField() {
    this(5);
  }

  /**
   * Constructs a new int text field with the specified size.
   * @param length the size of the int text field
   */
  public MustIntField(int length) {
    super(length);
    capitalization = false; // no matter what default of MustTextField is
    setHorizontalAlignment(SwingConstants.RIGHT);
  }

  /* is not wide enough !?
  public void setFont(Font f) {
    super.setFont(f);
    columnWidth = 0;
  }

  protected int getColumnWidth() {
    if (columnWidth == 0) {
      FontMetrics metrics = getFontMetrics(getFont());
      columnWidth = metrics.charWidth('0');
    }
    return columnWidth;
  } */

  /**
   * Invoked when a key has been released. Used to fire a component modified event.
   * @param e the key event
   */
  public void keyReleased(KeyEvent e) {
    boolean valid = true;
    // super.keyReleased(e);
    if (!this.getText().equals("") && !this.getText().equals("-")) { // "-": user is starting editing
      try {
        if (Integer.valueOf(this.getText()).intValue() > maxValue) valid = false;
      }
      catch (Exception e2) {
        valid = false;
      }
    }
    if (valid) {
      if (!getText().equals(textBefore)) fireContentChangedDelayed(e);
      textBefore = this.getText();
    }
    else {
      this.setText(textBefore);
      thisToolkit.beep();
    }
  }

  /**
   * Sets the maximum value to be entered.
   * @param newMaxValue the maximum value to be entered
   */
  public void setMaxValue(int newMaxValue) {
    if (newMaxValue > Integer.MAX_VALUE) this.maxValue = Integer.MAX_VALUE;
    else this.maxValue = newMaxValue;
    if (newMaxValue <= 9) this.setColumns(1);
    else if (newMaxValue <= 99) this.setColumns(2);
    else if (newMaxValue <= 999) this.setColumns(3);
    else if (newMaxValue <= 9999) this.setColumns(4);
  }

  /**
   * Sets the integer value of the field.
   * @param newIntValue the new integer value of the field
   */
  public void setIntValue(int newIntValue) {
    setText(String.valueOf(newIntValue));
    if (showZeroValueByDefault && newIntValue == 0) {
      setText("0");
    }
  }

  /**
   * Returns the integer value of the field.
   * @return the integer value of the field
   */
  public int getIntValue() {
    int temp;
    if (this.getText().equals("")) return 0;
    try {
      temp = Integer.valueOf(this.getText()).intValue();
    }
    catch (Exception e) {
      return 0;
    }
    return temp;
  }

  /**
   * Returns true if the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isContentValid() {
    int temp;
    if (getText().trim().length() == 0) temp = 0;
    else try {
      temp = Integer.valueOf(this.getText()).intValue();
    }
    catch (Exception e) {
      return false;
    }
    if (temp > maxValue) return false;
    return true;
  }

  /**
   * Returns true if the field is valid and content not zero.
   * @return true if the field is valid and content not zero
   */
  public boolean hasContent() {
    return isContentValid() && getIntValue() != 0;
  }

}
