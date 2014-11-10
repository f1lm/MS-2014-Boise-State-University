/*
 * Copyright (c) 2001-2002 Christoph Mueller. All rights reserved.
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

/**
 * Text input field for integer values. To realize right-alignment create 
 * stylesheet with .intfield {text-align: right} and define somewhere
 * de.must.markup.MustIntField.setDefaultClassName("intfield");
 * @author Christoph Mueller
 */
public class MustIntField extends MustTextField {

  private static String defaultClassName;
  private static int instanceCounter = 0;
  private int minValue = 0;
  private int maxValue = 2000000000;

  /**
   * Constructs a new text field for integer input with an automatically
   * generated name.
   */
  public MustIntField() {
    this("IntField" + ++instanceCounter);
  }

  /**
   * Constructs a new text field for integer input with a default length of 8 characters.
   */
  public MustIntField(String name) {
    super(name, "", 8, 99);
    setClassName(defaultClassName);
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
   * Sets the range of the valid input of the integer field.
   * @param newMinValue the new minimum value of the field
   * @param newMaxValue the new maximum value of the field
   */
  public void setInputRange(int newMinValue, int newMaxValue) {
    setMinimumValue(newMinValue);
    setMaximumValue(newMaxValue);
  }

  /**
   * Sets the minimum value of the field.
   * @param minValue the new minimum value of the field
   */
  public void setMinimumValue(int newMinValue) {
    this.minValue = newMinValue;
  }

  /**
   * Sets the maximum value of the field.
   * @param newMaxValue the new maximum value of the field
   */
  public void setMaximumValue(int newMaxValue) {
    this.maxValue = newMaxValue;
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
    this.setText(String.valueOf(newIntValue));
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

  /**
   * Returns true the integer text field input is valid.
   * @return true the integer text field input is valid
   */
  public boolean isValid() {
    int temp;
    if (getText().trim().length() == 0) temp = 0;
    else try {
      temp = Integer.valueOf(this.getText()).intValue();
    }
    catch (Exception e) {
      return false;
    }
    if (temp < minValue) return false;
    if (temp > maxValue) return false;
    return true;
  }

}
