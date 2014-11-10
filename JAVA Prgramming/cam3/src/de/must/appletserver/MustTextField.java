/*
 * Copyright (c) 2011-2012 Christoph Mueller. All rights reserved.
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

import de.must.applet.Constants;
import de.must.util.StringFunctions;
import de.must.wuic.ContentChangeListener;

/**
 * @author Christoph Mueller
 */
public class MustTextField extends MustInputField implements ActionInterpreter {

  protected static final int maxColumns = 70;

  private String value = "";
  private String editBeginValue = "";
  private static String defaultClassName;
  protected String className;
  private static String defaultAdditionalTagFragments;
  protected String additionalTagFragments;
  protected int size;
  protected int maxlength;
  protected boolean capitalization;
  protected boolean required = false;
  protected boolean registerFlag = false;
  protected ContentChangeListener contentChangeListener;

  /**
   * Constructs a new text field with a default length of 20 characters.
   */
  public MustTextField(SessionData sessionData) {
    this(sessionData, 20);
  }

  /**
   * Constructs a new text field with the length as specified.
   * @param length the length of the text field
   */
  public MustTextField(SessionData sessionData, int length) {
    this(sessionData, length, length);
  }

  /**
   * Constructs a new text field with the specified size and max length.
   * @param size rendering relevant size of the text field
   * @param maxlength input control relevant max length of the text field
   */
  public MustTextField(SessionData sessionData, int size, int maxlength) {
    this(sessionData, size, maxlength, false);
  }
  
  /**
   * Constructs a new text field with length, max chars and length control as specified.
   * length control.
   * @param length the length (size) of the text field
   * @param maxChars the max characters to be inserted
   * @param controlLength if true, characters are removed, if they exceed the
   * max char specification above
   */
  public MustTextField(SessionData sessionData, int size, int maxlength, boolean controlLength) {
    super(sessionData);
    this.size = size;
    this.maxlength = maxlength;
    if (this.size > maxColumns ) this.size = maxColumns;
  }
  
  /**
   * Sets the flag that this field is to be registered by id.
   * Needed e.g. to associate this field as target field of selected choice.
   * @param registerFlag whether or not this field is to be registered by id
   */
  public void setRegisterFlag(boolean registerFlag) {
    this.registerFlag = registerFlag;
  }
  
  public void setCapitalization(boolean capitalization) {
    this.capitalization = capitalization;
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
   * Sets the number of columns.
   * @param columns the number of columns >= 0
   */
  public void setColumns(int columns) {
    this.size = columns;
  }
  
  /**
   * Sets the contentChangeListener - package private, access via e.g.
   * {@link UniversalCenterGUI#addContentChangeListener(MustTextField, de.must.util.Callback)}
   * (package private)
   * @param l  the listener for content change
   */
  synchronized void addContentChangeListener(ContentChangeListener l) {
    this.contentChangeListener = l;
  }
  
  /**
   * Causes the component to read user input by calling request.getParameter and
   * update the internal mirrored value.
   * @param request the current request
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    if (!editable) return;
    String fetchedValue = (String)request.getParameter(name, sessionData.clientCharset);
    if (fetchedValue != null) {
      value = StringFunctions.replaceAll(fetchedValue, Constants.NEW_LINE, "\n");
    }
  }
  
  public boolean hasFocus() {
    return name.equals(sessionData.focusElementId);
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
    else this.value = newText;
    editBeginValue = this.value;
  }

  /**
   * Sets the text as if it was entered by user to force modified flag for data saving.
   * @param newText the new text
   */
  public void setTextAsUserInput(String newText) {
    if (newText == null) value = "";
    else this.value = newText;
  }

  /**
   * Sets the fact that user input is requested (mandatory)
   * @param required whether this input is mandatory or not.
   */
  public void setRequired(boolean required) {
    this.required = required;
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TODO_TAG_BEGIN + getCreateTagElement() + Constants.TODO_TAG_END);
    out.println(Constants.ID_TAG_BEGIN + name + Constants.ID_TAG_END);
    out.println(Constants.FIELD_LENGTH_BEGIN + size + Constants.FIELD_LENGTH_END);
    if (registerFlag) {
      out.println(Constants.VARIANT1_TAG_BEGIN + Constants.REGISTER + Constants.VARIANT1_TAG_END);
    }
    if (toolTipText != null) {
      out.println(Constants.VARIANT2_TAG_BEGIN + toolTipText + Constants.VARIANT2_TAG_END);
    }
    if (capitalization) {
      out.println(Constants.VARIANT3_TAG_BEGIN + "anythingNotNull" + Constants.VARIANT3_TAG_END);
    }
    out.println(Constants.ACTION_END_TAG);
    if (contentChangeListener != null) {
      out.println(Constants.ACTION_BEGIN_TAG);
      out.addTodoTag(Constants.ADD_CONTENT_CHANGE_LISTENER);
      out.println(Constants.ID_TAG_BEGIN + name + Constants.ID_TAG_END);
      out.println(Constants.ACTION_END_TAG);
    }
    super.buildRemoteView(out);
  }
  
  protected String getCreateTagElement() {
    return Constants.CREATE_TEXTFIELD;
  }
  
  @Override
  public void setValues(ToAppletWriter out) {
    out.setValue(name, value, editBeginValue);
    super.setValues(out);
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

  @Override
  public boolean perform(String action) {
    if (Constants.ACTION_CONTENT_CHANGED.equals(action) && name.equals(sessionData.actionSource)) {
      if (contentChangeListener != null) {
        contentChangeListener.contentChanged();
        return true;
      }
    }
    return false;
  }

}
