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
 * CheckBox for boolean value administration.
 * @author Christoph Mueller
 */
public class MustCheckBox extends MustInputField {

  private static int instanceCounter = 0;

  protected String checkText;
  private static String defaultAdditionalTagFragments;
  protected String additionalTagFragments;
  private String onClickScript;
  private boolean selected = false;
  private boolean editBeginValue = false;
  protected boolean editable = true;
  protected boolean enabled = true;

  /**
   * Constructs a new check box with the check text as specified.
   * @param checkText the check box' text
   */
  public MustCheckBox(String checkText) {
    this("CheckBox" + ++instanceCounter, checkText);
  }

  /**
   * Constructs a new check box with the specified name and check text.
   * @param name the name of the check box
   * @param checkText the check box' text
   * @return the new created check box
   */
  public MustCheckBox(String name, String checkText) {
    super(name);
    this.checkText = checkText;
    setAdditionalTagFragments(defaultAdditionalTagFragments);
  }

  /**
   * Sets the component's javascript function for the onClick event.
   * @param newOnClick the component's javascript function for the onClick event
   */
  public void setOnClickScript(String newOnClickScript) {
    this.onClickScript = newOnClickScript;
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
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    StringBuffer tagSequence = new StringBuffer("<input type=\"checkbox\" name=\"" + name + "\"");
    if (isSelected()) tagSequence.append(" CHECKED");
    if (toolTipText != null) {
      tagSequence.append(" onMouseOver=\"window.status='" + toolTipText + "';return true\"");
    }
    if (onClickScript != null) {
      tagSequence.append(" onClick=\"" + onClickScript + "\"");
    }
    if (additionalTagFragments != null) tagSequence.append(" " + additionalTagFragments);
    // if (!editable) tagSequence.append(" readonly"); doesn't work
    if (!editable) tagSequence.append(" onClick=\"return false\""); // work only if no other onClick is used
    if (!enabled) tagSequence.append(" disabled");
    tagSequence.append(">");
    if (checkText != null) tagSequence.append(checkText);
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
    selected = false;
		String value = (String)request.getParameter(name);
    // de.must.io.Logger.getInstance().info(getClass(), name + " fetched " + value);
    if (value != null &&value.toLowerCase().equals("on")) selected = true;
  }

  /**
   * Returns true if the checkbox is selected.
   * @return true if the checkbox is selected
   */
  public boolean isSelected() {
    return selected;
  }

  /**
   * Sets the checkbox state as specified.
   * @param yn indicates via "Y" or "N" whether the check box is to be selected.
   */
  public void setSelected(String yn) {
  	if (yn == null) setSelected(false);
    else setSelected(yn.toUpperCase().equals("Y") ? true : false);
  }

  /**
   * Sets the checkbox state as specified.
   * @param selected indicates whether the check box is to be selected.
   */
  public void setSelected(boolean selected) {
    this.selected = selected;
    editBeginValue = selected;
  }

  /**
   * Returns Y if the checkbox is selected and N if not.
   * @return Y if the checkbox is selected and N if not
   */
  public String getSelectedYN() {
    return (selected ? "Y" : "N");
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
    return(this.isSelected());
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
    return(this.isSelected() != editBeginValue);
  }

  /**
   * Resets the modified status by setting the editBeginValue to the current value.
   */
  public void resetModifiedStatus() {
    editBeginValue = selected;
  }

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}
