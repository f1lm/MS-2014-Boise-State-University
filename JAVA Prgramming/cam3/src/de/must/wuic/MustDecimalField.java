/*
 * Copyright (c) 1999-2012 Christoph Mueller. All rights reserved.
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

import java.awt.event.FocusEvent;
import java.text.DecimalFormat;
import java.text.ParseException;

import javax.swing.SwingConstants;

/**
 * A text field to edit decimal values.
 * @author Christoph Mueller
 */
public class MustDecimalField extends MustTextField {

  private char[] validChars = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ',', '\''};  // ' in Switzerland
	protected DecimalFormat decimalFieldFormat = (DecimalFormat)DecimalFormat.getInstance();
  private int decimalPlaces = 2;
  private double maxValue = Double.MAX_VALUE;
  protected double editBeginValue;

  /**
   * Constructs a new decimal text field.
   */
  public MustDecimalField() {
    super(10, 99, false);
    setHorizontalAlignment(SwingConstants.RIGHT);
    capitalization = false; // no matter what default of MustTextField is
    setDecimalPlaces(2);
    addFocusListener(new java.awt.event.FocusAdapter() {
      public void focusGained(FocusEvent e) {
        try {
          if (getDoubleValue() == 0) selectAll();
        } catch (ParseException e1) {
          selectAll();
        }
      }
    });
  }

  /**
   * Sets the scale of field to be displayed.
   * @param newDecimalPlaces the new display scale
   */
  public void setDecimalPlaces(int newDecimalPlaces) {
    decimalPlaces = newDecimalPlaces;
    decimalFieldFormat.setMinimumFractionDigits(newDecimalPlaces);
    decimalFieldFormat.setMaximumFractionDigits(newDecimalPlaces);
  }

  /**
   * Sets the maximum value to be entered.
   * @param newMaxValue the maximum value to be entered
   */
  public void setMaxValue(double newMaxValue) {
    int decimalExtension = decimalPlaces + 1;
    this.maxValue = newMaxValue;
    if (newMaxValue <= 9) this.setColumns(1 + decimalExtension);
    else if (newMaxValue <= 99) this.setColumns(2 + decimalExtension);
    else if (newMaxValue <= 999) this.setColumns(3 + decimalExtension);
    else if (newMaxValue <= 9999) this.setColumns(4 + decimalExtension);
  }

  /**
   * Returns the value of the component as a double.
   * @return the value of the component
   */
  public double getDoubleValue() throws java.text.ParseException {
    if (this.getText().trim().equals("")) return 0;
    return (decimalFieldFormat.parse(this.getText().trim())).doubleValue();
  }

  /**
   * Sets the text.
   * @param value the double to be formatted as text
   */
  public void setText(double value) {
    setText(decimalFieldFormat.format(value));
  }

  /**
   * Sets the double value.
   * @param value the double to be formatted as text
   */
  public void setDoubleValue(double value) {
    setText(decimalFieldFormat.format(value));
  }

  /**
   * Sets the double as edit begin value which causes isModified to return false
   * as long as user doesn't change the value.
   * @param newDoubleValue the new double value
   */
  public void setDoubleAsEditBeginValue(double newDoubleValue) {
    setDoubleValue(newDoubleValue);
    String editBeginText = decimalFieldFormat.format(newDoubleValue);
    this.setText(editBeginText);
    try {
      editBeginValue = getDoubleValue();
    } catch (Exception ex) {}
  }

  /**
   * Indicates whether the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled() {
    if (this.getText().trim().equals("")) return false;
    try {
      return (getDoubleValue() != 0);
    }
    catch (Exception ex) {
      return true;
    }
  }

  /**
   * Checks if there have been any modifications made on the current row.
   * @return true if there have been any modifications made on the current row
   */
  public boolean isModified() {
    try {
      double dv = getDoubleValue();
      return (dv != editBeginValue);
    }
    catch (Exception ex) {
      return true;
    }
  }

  /**
   * Returns true if the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isContentValid() {
    if (this.getText().trim().equals("")) return true;
    if (!de.must.util.StringFunctions.isOf(this.getText().trim(), validChars)) return false;
    try {
      double temp = getDoubleValue();
      if (temp > maxValue) return false;
    }
    catch (Exception ex) {
      return false;
    }
    return true;
  }

  /**
   * Returns true if the component's value has fractional digits.
   * @return true if the component's value has fractional digits
   */
  public boolean hasFractionalDigits() throws java.text.ParseException {
    double temp = getDoubleValue();
    while (temp > 0) {
      temp--;
    }
    while (temp < 0) {
      temp++;
    }
    return temp != 0;
  }

}
