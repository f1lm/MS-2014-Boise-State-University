/*
 * Copyright (c) 2001-2004 Christoph Mueller. All rights reserved.
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
 * Text input field analogous to JTextField to be represent by markup languages.
 * @author Christoph Mueller
 */
public class MustTextField extends MustInputField {

  private static final int maxColumns = 70;
  private static int instanceCounter = 0;

  private String value = "";
  private String editBeginValue = "";
  private static String defaultClassName;
  protected String className;
  private static String defaultAdditionalTagFragments;
  protected String additionalTagFragments;
  protected int size;
  protected int maxlength;
  protected boolean required = false;
  protected boolean editable = true;
  protected boolean enabled = true;

  /**
   * Constructs a new text field with a default length of 20 characters.
   */
  public MustTextField() {
    this(20);
  }

  /**
   * Constructs a new text field with the length as specified.
   * @param length the length of the text field
   */
  public MustTextField(int length) {
    this(length, length);
  }

  /**
   * Constructs a new text field with the specified size and max length.
   * @param size rendering relevant size of the text field
   * @param maxlength input control relevant max length of the text field
   */
  public MustTextField(int size, int maxlength) {
    this("TextField" + ++instanceCounter, "", size, maxlength);
  }

  /**
   * Constructs a new text field with the specified name, value, size and max length.
   * @param name the name of the field to be used for markup parameters
   * @param value the initial value of the text field
   * @param size rendering relevant size of the text field
   * @param maxlength input control relevant max length of the text field
   */
  public MustTextField(String name, String value, int size, int maxlength) {
    super(name);
    this.name = name;
    this.value = value;
    this.size = size;
    this.maxlength = maxlength;
    if (this.size > maxColumns ) this.size = maxColumns;
    setClassName(defaultClassName);
    setAdditionalTagFragments(defaultAdditionalTagFragments);
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
   * Sets the component's  class name - may be used to assign formatting 
   * via stylesheets.
   * @param newDefaultClassName the component's class name
   */
  public void setClassName(String className) {
    this.className = className;
  }

  /**
   * Sets the component's default additional tag fragments. 
   * E.g. JavaScript like onChange may be added.
   * @param newDefaultClassName the component's default additional tag fragments.
   */
  public static void setDefaultAdditionalTagFragments(String newDefaultAdditionalTagFragments) {
    defaultAdditionalTagFragments = newDefaultAdditionalTagFragments;
  }

  /**
   * Sets the component's additional tag fragments.
   * E.g. JavaScript like onChange may be added.
   * @param newDefaultClassName the component's additional tag fragments.
   */
  public void setAdditionalTagFragments(String additionalTagFragments) {
    this.additionalTagFragments = additionalTagFragments;
  }

  /**
   * Sets the component's size via number of columns to be displayed.
   * @param columns the number of columns to be displayed
   */
  public void setColumns(int columns) {
    this.size = columns;
  }
  
  /**
   * Sets the specified boolean to indicate whether or not this component
   * should be editable.
   * @param editable indicates whether or not this component is editable
   */
  public void setEditable(boolean editable) {
    this.editable = editable;
  }

  /**
   * Sets the specified boolean to indicate whether or not this component
   * is enabled.
   * @param enabled indicates whether or not this component is enabled
   */
  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
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
    tagSequence.append("<input type=\"Text\" name=\"" + name + "\" value=\"" + getText() +  "\" size=\"" + size + "\" maxlength=\"" + maxlength + "\"");
    if (className != null) tagSequence.append(" class=\"" + className + "\"");
    if (additionalTagFragments != null) tagSequence.append(" " + additionalTagFragments);
    if (toolTipText != null) {
      tagSequence.append(" title=\"" + toolTipText + "\" onMouseOver=\"window.status='" + toolTipText + "';return true\" onMouseOut=\"window.status='';return true\"");
    }
    if (!editable) tagSequence.append(" readonly");
    if (!enabled) tagSequence.append(" disabled");
    tagSequence.append(">");
    if (comment != null && !comment.equals("")) {
      tagSequence.append(" " + comment);
    }
    return tagSequence.toString();
  }
  
  /**
   * Causes the component to read user input by calling request.getParameter and
   * update the internal mirrored value.
   * @param request the current request
   */
  public void fetchYourValueFromRequest(GeneralizedRequest request) {
    if (!editable) return;
    if (!enabled) return;
    String fetchedValue = (String)request.getParameter(name);
    if (fetchedValue != null) {
      value = fetchedValue;
      // de.must.io.Logger.getInstance().info(getClass(), name + " fetched " + value);
    }
  }

  /**
   * Return the text of the text field.
   * @return the text of the text field
   */
  public String getText() {
    return value;
  }

  /**
   * Return the text of the field or null if the text field is empty or
   * contains spaces only.
   * @return the text of the field or null if the text field is empty or
   * contains spaces only
   */
  public String getTextOrNullIfEmpty() {
  	if (getText().trim().equals("")) return null;
    return getText();
  }

  /**
   * Sets the text.
   * @param newText the new text
   */
  public void setText(String newText) {
    if (newText == null) value = "";
    else value = Transformer.htmlInputSecure(newText.trim());
    editBeginValue = value;
  }

  /**
   * Sets the fact that user input is requested (mandatory)
   * @param required whether this inuput is mandatory or not.
   */
  public void setRequired(boolean required) {
    this.required = required;
  }

  /**
   * @return true if the component has a value
   */
  public boolean isFilled() {
    return !value.trim().equals("");
  }

  /**
   * Returns true the text field is valid.
   * @return true the text field is valid
   */
  public boolean isValid() {
    return true;
  }

  /**
   * Returns true if the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {
    if (required & value.trim().equals("")) return true;
    return false;
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    return !this.getText().equals(editBeginValue);
  }
  
}
