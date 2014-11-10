/*
 * Copyright (c) 2001 Christoph Mueller. All rights reserved.
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
 * Password input field analogous to JPasswordField.
 * @author Christoph Mueller
 */
public class MustPasswordField extends MustInputField {

  private static final int maxColumns = 80;
  private static int instanceCounter = 0;

  protected String value = "";
  private static String defaultClassName;
  protected String className;
  private static String defaultAdditionalTagFragments;
  protected String additionalTagFragments;
  protected int size;
  protected int maxlength;

  /**
   * Constructs a new password field with the default length of 20 characters.
   */
  public MustPasswordField() {
    this(20);
  }

  /**
   * Constructs a new password field with the specified length.
   * @param length the length of the password field
   */
  public MustPasswordField(int length) {
    this(length, length);
  }

  /**
   * Constructs a new password field with the specified size and max length.
   * @param size rendering relevant size of the password field
   * @param maxlength input control relevant max length of the password field
   */
  public MustPasswordField(int size, int maxlength) {
    this("PwdField" + ++instanceCounter, "", size, maxlength);
  }

  /**
   * Constructs a new password field with the specified name, value, size and max length.
   * @param name the name of the field to be used for markup parameters
   * @param value the initial value of the password field
   * @param size rendering relevant size of the password field
   * @param maxlength input control relevant max length of the password field
   */
  public MustPasswordField(String name, String value, int size, int maxlength) {
    super(name);
    this.value = value;
    this.size = size;
    this.maxlength = maxlength;
    if (this.size > maxColumns ) this.size = maxColumns;
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
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    StringBuffer tagSequence = new StringBuffer();
    tagSequence.append("<input type=\"password\" name=\"" + name + "\" value=\"" + value +  "\" size=\"" + size + "\" maxlength=\"" + maxlength + "\"");
    if (className != null) tagSequence.append(" class=\"" + className + "\"");
    if (additionalTagFragments != null) tagSequence.append(" " + additionalTagFragments);
    if (toolTipText != null) {
      tagSequence.append(" onMouseOver=\"window.status='" + toolTipText + "';return true\" onMouseOut=\"window.status='';return true\"");
    }
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
    String fetchedValue = (String)request.getParameter(name);
    if (fetchedValue == null) {
  		value = "";
    } else {
  		value = fetchedValue;
    }
    // de.must.io.Logger.getInstance().info(getClass(), name + " fetched " + value);
  }

  /**
   * Return the text of the password field.
   * @return the text of the password field
   */
  public String getText() {
    return value;
  }

  /**
   * Sets the text.
   * @param newText the new text
   */
  public void setText(String newText) {
    value = newText;
  }

  /**
   * Sets the fact that user input is requested (mandatory)
   * @param required whether this inuput is mandatory or not.
   */
  public void setRequired(boolean required) {
  }

  /**
   * Returns true if the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled() {
    return !value.trim().equals("");
  }

  /**
   * Returns true if the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isValid() {
    return true;
  }

  /**
   * Returns true if the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {
    if (value.trim().equals("")) return true;
    return false;
  }

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}
