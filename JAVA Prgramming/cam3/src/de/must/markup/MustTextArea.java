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
 * Text Input Area analogous to JTextArea to be represent by markup languages.
 * @author Christoph Mueller
 */
public class MustTextArea extends MustInputField {

  private static int instanceCounter = 0;

  private String value = "";
  private String editBeginValue = "";
  protected int rows = 5;
  protected int cols = 60;
  protected int maxlength;
  protected boolean required = false;
  protected boolean editable = true;

  /**
   * Constructs a new text area with a default max. length of 254 characters.
   */
  public MustTextArea() {
    this(254);
  }

  /**
   * Constructs a new text area with a max. number of characters as specified.
   * @param maxlength the max. number of characters to be put in
   */
  public MustTextArea(int maxlength) {
    this("TextField" + ++instanceCounter, "", maxlength);
  }

  /**
   * Constructs a new text area with specific name, inital value and a max.
   * number of characters as specified.
   * @param name the name of the text area to be used
   * @param value the intitial value of the text area
   * @param maxlength the max. number of characters to be put in
   */
  public MustTextArea(String name, String value, int maxlength) {
    super(name);
    this.value = value;
    this.maxlength = maxlength;
  }

	/**
   * Sets the number of rows for this TextArea.  Calls invalidate() after
   * setting the new value.
   * @param rows the number of rows >= 0
   */
	public void setRows(int rows) {
		this.rows = rows;
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
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    StringBuffer tagSequence = new StringBuffer();
    tagSequence.append("<textarea name=\"" + name +  "\" ROWS=\"" + rows + "\" COLS=\"" + cols + "\" maxlength=\"" + maxlength + "\"");
    if (!editable) tagSequence.append(" readonly");
    // if (!enabled) tagSequence.append(" disabled");
    if (toolTipText != null) {
      tagSequence.append(" title=\"" + toolTipText + "\" onMouseOver=\"window.status='" + toolTipText + "';return true\" onMouseOut=\"window.status='';return true\"");
    }
    tagSequence.append(">" + getText() + "</textarea>");
    return tagSequence.toString();
  }

  /**
   * Causes the component to read user input by calling request.getParameter and
   * update the internal mirrored value.
   * @param request the current request
   */
  public void fetchYourValueFromRequest(GeneralizedRequest request) {
    if (editable) {
      String fetchedValue = (String)request.getParameter(name);
      if (fetchedValue != null) {
        value = fetchedValue;
      }
      // de.must.io.Logger.getInstance().info(getClass(), name + " fetched " + value);
    }
  }

  /**
   * Return the text of the text area.
   * @return the text of the text area
   */
  public String getText() {
    return value;
  }

  /**
   * Sets the text.
   * @param newText the new text
   */
  public void setText(String newText) {
    value = Transformer.htmlInputSecure(newText);
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
    if (required & value.trim().equals("")) return true;
    return false;
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    return(!this.getText().equals(editBeginValue));
  }

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}
