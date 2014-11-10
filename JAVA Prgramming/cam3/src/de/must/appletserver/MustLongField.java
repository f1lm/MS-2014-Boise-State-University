/*
 * Copyright (c) 2012 Christoph Mueller. All rights reserved.
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

package de.must.appletserver;

/**
 * A text field to edit long values.
 * @author Christoph Mueller
 */
public class MustLongField extends MustTextField {

  protected static boolean showZeroValueByDefault = false;

  /**
   * Sets whether zero should be shown by digit 0
   * @param b whether zero should be shown
   */
  public static void setShowZeroValueByDefault(boolean b) {
    showZeroValueByDefault = b;
  }

  private int columnWidth;
  private long maxValue = Long.MAX_VALUE;

  /**
   * Constructs a new long text field with a default size of 5 characters.
   */
  public MustLongField(SessionData sessionData) {
    this(sessionData, 5);
  }

  /**
   * Constructs a new long text field with the specified size.
   * @param length the size of the long text field
   */
  public MustLongField(SessionData sessionData, int length) {
    super(sessionData, length);
//    capitalization = false; // no matter what default of MustTextField is
//    setHorizontalAlignment(SwingConstants.RIGHT);
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
   * Sets the maximum value to be entered.
   * @param newMaxValue the maximum value to be entered
   */
  public void setMaxValue(long newMaxValue) {
    if (newMaxValue > Long.MAX_VALUE) this.maxValue = Long.MAX_VALUE;
    else this.maxValue = newMaxValue;
//    if (newMaxValue <= 9) setColumns(1);
//    else if (newMaxValue <= 99) setColumns(2);
//    else if (newMaxValue <= 999) setColumns(3);
//    else if (newMaxValue <= 9999) setColumns(4);
  }

  /**
   * Sets the value of the field.
   * @param newValue the new value of the field
   */
  public void setLongValue(long newValue) {
    setText(String.valueOf(newValue));
    if (showZeroValueByDefault && newValue == 0) {
      setText("0");
    }
  }

  /**
   * Returns the value of the field.
   * @return the value of the field
   */
  public long getLongValue() {
    long temp;
    if (getText().equals("")) return 0;
    try {
      temp = Long.valueOf(getText()).longValue();
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
    long temp;
    if (getText().trim().length() == 0) temp = 0;
    else try {
      temp = Long.valueOf(getText()).longValue();
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
    return isContentValid() && getLongValue() != 0;
  }

}
