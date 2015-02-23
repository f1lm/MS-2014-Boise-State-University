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

import java.text.DecimalFormat;

/**
 * A text field to edit decimal values. To realize right-alignment create 
 * stylesheet with .decimalfield {text-align: right} and define somewhere
 * de.must.markup.MustDecimalField.setDefaultClassName("decimalfield");
 * 
 * @author Christoph Mueller
 */
public class MustDecimalField extends MustTextField {

  private static String defaultClassName;
  private char[] validChars = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ','};
	protected DecimalFormat decimalFieldFormat = (DecimalFormat)DecimalFormat.getInstance();
  private int decimalPlaces = 2;
  protected double editBeginValue;

  /**
   * Constructs a new decimal text field.
   */
  public MustDecimalField() {
    super(10);
    setClassName(defaultClassName);
    setDecimalPlaces(2);
  }

  /**
   * Sets the component's default class name - may be used to assign formatting 
   * via stylesheets.
   * @param newDefaultClassName the component's default class name
   */
  public static void setDefaultClassName(String newDefaultClassName) {
    defaultClassName = newDefaultClassName;
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
   * Returns the value of the component as a double.
   * @return the value of the component
   */
  public double getDoubleValue() throws java.text.ParseException {
    if (this.getText().trim().equals("")) return 0;
    return (decimalFieldFormat.parse(this.getText().trim())).doubleValue();
  }

  /**
   * Returns the value of the component as a BigDecimal.
   * @return the value of the component
   */
  public java.math.BigDecimal getBigDecimalValue() throws java.text.ParseException {
    return new java.math.BigDecimal(getDoubleValue());
  }

  /**
   * Sets the text.
   * @param value the double to be formatted as text
   */
  public void setText(double value) {
    setText(decimalFieldFormat.format(value));
  }

  /**
   * Sets the text.
   * @param newText the double to be formatted as text
   */
  public void setText(java.math.BigDecimal value) {
  	if (value == null) setText(decimalFieldFormat.format(0));
    else setText(decimalFieldFormat.format(value));
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
  public boolean isValid() {
    if (this.getText().trim().equals("")) return true;
    if (!de.must.util.StringFunctions.isOf(this.getText().trim(), validChars)) return false;
    try {
      getDoubleValue();
    }
    catch (Exception ex) {
      return false;
    }
    return true;
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface. Useful to minimize instructions in JavaServerPages - only the
   * markupable object is to be named.
   * @return the tag sequence to show the component
   */
  public String toString() {
    return getCreationTag();
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    StringBuffer tagSequence = new StringBuffer();
    tagSequence.append("<input type=\"Text\" name=\"" + name + "\" value=\"" + getText() +  "\" size=\"" + size + "\" maxlength=\"" + maxlength + "\" ALIGN=\"RIGHT\"");
    if (className != null) tagSequence.append(" class=\"" + className + "\"");
    if (additionalTagFragments != null) tagSequence.append(" " + additionalTagFragments);
    if (toolTipText != null) {
      tagSequence.append(" onMouseOver=\"window.status='" + toolTipText + "';return true\"");
    }
    if (!editable) tagSequence.append(" readonly");
    if (!enabled) tagSequence.append(" disabled");
    tagSequence.append(">");
    return tagSequence.toString();
  }

}
