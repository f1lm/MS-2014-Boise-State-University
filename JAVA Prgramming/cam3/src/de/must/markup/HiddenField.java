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
 * Hidden field for storage sharing between butler and JSP including JavaScript.
 * Let's assume you create it like
 * <code>hiddenField1 = new HiddenField("hidden1")</code>; 
 * If the JSP form tag includes e.g. <code>name="mainform"</code>, you may access
 * the storage of the hidden field by JavaScript via 
 * <code>document.mainform.hidden1.value</code>.
 * Of course, you should not forget to call 
 * <code>hiddenField1.fetchYourValueFromRequest(request);</code>;
 * Be aware that the butler class is updated via form submit only. 
 * This may be done by the same JavaScript function via
 * <code>document.mainform.submit();</code> 
 * @author Christoph Mueller
 */
public class HiddenField extends MustInputField {

  private static int instanceCounter = 0;

  protected String value = "";

  /**
   * Constructs a new hidden field with the check text as specified.
   * @param checkText the check box' text
   */
  public HiddenField() {
    this("HiddenField" + ++instanceCounter);
  }

  /**
   * Constructs a hidden field with the specified name.
   * @param name the name of the hidden field
   * @return the created hidden field
   */
  public HiddenField(String name) {
    super(name);
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    String tag = "<input type=\"hidden\" name=\"" + name + "\"" + " value=\"" + value + "\"";
    tag += ">";
    return tag;
  }

  /**
   * Causes the component to read user input by calling request.getParameter and
   * update the internal mirrored value.
   * @param request the current request
   */
  public void fetchYourValueFromRequest(GeneralizedRequest request) {
    String fetchedValue = (String)request.getParameter(name);
    if (fetchedValue != null) {
       value = fetchedValue;
    }
  }

  /**
   * Return the text of the hidden field.
   * @return the text of the hidden field
   */
  public String getText() {
    return value;
  }

  /**
   * Sets the text.
   * @param newText the new text
   */
  public void setText(String newText) {
    if (newText == null) value = "";
    else value = newText.trim();
  }

  /**
   * Sets the fact that user input is requested (mandatory)
   * @param required whether this inuput is mandatory or not.
   */
  public void setRequired(boolean required) {
  } // not necessary!

  /**
   * Returns always false.
   * @return always false
   */
  public boolean isRequired() {
    return false;
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
   * Returns false if mandatory input Field is not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {
    return false;
  }

  /**
   * Returns true if the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    return false;
  }

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}
