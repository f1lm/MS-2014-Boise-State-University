/*
 * Copyright (c) 2001-2007 Christoph Mueller. All rights reserved.
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

import java.util.Hashtable;

/**
 * Button. By default, the type is "submit". In this case, the button may be 
 * asked wasPressed() after fetchYourValueFromRequest() was executed. This is 
 * done best by an instance of GroupOfMarkupables.
 * @see GroupOfMarkupables
 * @author Christoph Mueller
 */
public class MustButton extends MustInputField {

  private static final String TYPE_SUBMIT = "submit";
  private static final String TYPE_BUTTON = "button";
  
  private static int instanceCounter = 0;
  private static Hashtable<String, Integer> instanceCounterTable;

  private String label;
  private static String defaultType = TYPE_SUBMIT;
  protected String type;
  private static String defaultAction = "POST";
  protected String action;
  private String confirmationText;
  private static String defaultClassName;
  protected String className;
  private static String defaultAdditionalTagFragments;
  protected String additionalTagFragments;
  private String specialPressedConditionParameterName;
  private String specialPressedConditionValue;
  private boolean enabled = true;
  private boolean visible = true;
  private boolean pressed;

  /**
   * Constructs a new button.
   * @param label the labe to be seen by the user
   * @param name the name of the button
   */
  public MustButton(String label, String name) {
  	this(label, name, null);
  }

  /**
   * Constructs a new button for a scriptlet to be executed instead of a submit.
   * Scriplet buttons cannot support wasPressed().
   * @param label the labe to be seen by the user
   * @param name the name of the button - using # at the end of the name causes
   * sequential instance numbers
   * @param onClickScriptlet the scriptlet to be executed (JavaScript) - if
   * this parameter is not null, the button type is 'button', not 'submit'.
   */
  public MustButton(String label, String name, String onClickScriptlet) {
    super(getIntelligentName(name));
    this.label = label;
    setType(defaultType);
    setAction(defaultAction);
    setClassName(defaultClassName);
    if (onClickScriptlet != null) {
    	setAdditionalTagFragments("onClick=\"" + onClickScriptlet + "\"");
    	this.type = TYPE_BUTTON;
    } else {
      setAdditionalTagFragments(defaultAdditionalTagFragments);
    }
  }

  /**
   * Activates the JavaScript confirmation function and sets the confirmation 
   * text. Sets the button type implicitly to 'button' instead of 'submit'.
   * Needs access to JavaScript function confirmedAction(confirmationText,actionParameterValue)
   * and a hidden field named "actionparm"
   * <pre><code>
   * function confirmedAction(confirmationText,actionParameterValue) {
   *   if (confirm(confirmationText)) {
   *     document.formname.actionparm.value = actionParameterValue;
   *     document.formname.submit();
   *   }
   * }
   * ...
   * <form method="POST" name="formname">
   * ...
   * <input type="hidden" name="actionparm" value="">
   * </code></pre>
   * @param confirmationText The text to be displayed to confirm the action.
   */
  public void setConfirmationText(String confirmationText) {
    this.confirmationText = confirmationText;
    this.type = TYPE_BUTTON;
  }

  /**
	 * Returns an interpretation of a name replacing # by an unique instance number
	 * @param name the name to interpret
	 * @return the produced name
	 */
	private static synchronized String getIntelligentName(String name) {
    if (name.endsWith("#")) {
    	int instanceCounter = 0;
    	String basisButtonName = name.substring(0, name.length() - 1) + ++instanceCounter;
    	if (instanceCounterTable == null) instanceCounterTable = new Hashtable<String, Integer>();
    	Object instanceCountObject = instanceCounterTable.get(basisButtonName);
    	if (instanceCountObject != null) {
    		instanceCounter = ((Integer)instanceCountObject).intValue();
    	}
    	instanceCounter++;
    	instanceCounterTable.put(basisButtonName, new Integer(instanceCounter));
    	return basisButtonName + instanceCounter;
    	
    } else return name;
  }

  public static void setDefaultType(String newDefaultType) {
    defaultType= newDefaultType;
  }

  public void setType(String type) {
    this.type = type;
  }

  public static void setDefaultAction(String newDefaultAction) {
    defaultAction = newDefaultAction;
  }

  public void setAction(String action) {
    this.action = action;
  }

  /**
	 * Sets a special pressed condition - useful for additional logic in JavaScript.
	 * See constructor with onClickScriptlet
	 * @param specialPressedConditionParameterName then name of the parameter to be loaded to check whether the action concernes this button.
	 * @param specialPressedConditionValue the value of the parameter to indicate whether the button should be treated as pressed.
	 */
	public void setSpecialPressedCondition(String specialPressedConditionParameterName, String specialPressedConditionValue) {
  	this.specialPressedConditionParameterName = specialPressedConditionParameterName;
  	this.specialPressedConditionValue = specialPressedConditionValue;
  }

  /**
   * Sets the button's text.
   * @param text the text (label) of the button
   */
  public void setText(String text) {
    this.label = text;
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
   * Determines whether this button is enabled. An enabled component
   * can respond to user input and generate events. Buttons are
   * enabled initially by default. A component may be enabled or disabled by
   * calling its <code>setEnabled</code> method.
   * @return <code>true</code> if the button is enabled;
   * <code>false</code> otherwise.
   * @see #setEnabled
   */
  public boolean isEnabled() {
    return enabled;
  }

  /**
   * Enables or disables this button, depending on the value of the
   * parameter <code>enabled</code>. An enabled button can respond to user
   * input and generate events. Components are enabled initially by default.
   * @param enabled If <code>true</code>, this button is enabled;
   *        otherwise this button is disabled.
   * @see #isEnabled
   */
  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  /**
	 * Sets the visibility of the component.
	 * @param visible whether or not the component should be visible
	 */
	public void setVisible(boolean visible) {
    this.visible = visible;
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    if (!visible) return "";
    StringBuffer tagSequence = new StringBuffer();
    tagSequence.append("<input type=\"" + type + "\" value=\"" + label + "\"");
    if (type == TYPE_SUBMIT) {
      tagSequence.append(" action=\"" + action + "\" name=" + "\"" + name + "\"");
    }
    if (className != null) tagSequence.append(" class=\"" + className + "\"");
    if (!enabled) tagSequence.append(" disabled");
    if (confirmationText != null) {
      tagSequence.append(" onClick=\"confirmedAction('" + confirmationText + "','btn" + name + "')\"");
    }
    if (additionalTagFragments != null) tagSequence.append(" " + additionalTagFragments);
    tagSequence.append(">\n");
    return tagSequence.toString();
  }

  /**
   * Causes the component to read user input by calling request.getParameter and
   * update the internal mirrored value.
   * @param request the current request
   */
  public void fetchYourValueFromRequest(GeneralizedRequest request) {
  	if (!enabled) return; 
  	if (!visible) return; 
  	de.must.io.Logger.getInstance().debug(getClass(), "Fetching button " + name + " with specialPressedConditionParameterName = " + specialPressedConditionParameterName);
    if (type == TYPE_BUTTON) {
      String actionParameterValue = request.getParameter("actionparm");
      de.must.io.Logger.getInstance().debug(getClass(), "checking actionParameterValue =  " + actionParameterValue);
      if (actionParameterValue != null && actionParameterValue.equals("btn" + name)) {
        pressed = true;
      } else {
        pressed = false;
      }
    } else if (specialPressedConditionParameterName != null) {
    	String readValue = request.getParameter(specialPressedConditionParameterName);
    	if (readValue != null && readValue.equals(specialPressedConditionValue)) {
  	  de.must.io.Logger.getInstance().debug(getClass(), "readValue =  " + readValue);
        pressed = true;
      } else {
        pressed = false;
    	}    		
    } else {
      de.must.io.Logger.getInstance().debug(getClass(), "request.getParameter(" + name + ") =  " + request.getParameter(name));
    	if (request.getParameter(name) == null) {
        pressed = false;
      } else {
        pressed = true;
      }
    }
  }

  /**
   * True if the button was pressed - auto-initialized - may be asked only once
   * a request.
   * @return true if the button was pressed
   */
  public boolean wasPressed() {
    boolean wasPressed = pressed;
    pressed = false;
    return wasPressed;
  }

  /**
   * True if the button was pressed - not auto-initialized - 
   * useful for previous plausibility checks - 
   * last call to the regular wasPressed recommended.
   * a request.
   * @return true if the button was pressed
   */
  public boolean wasPressedWithoutInitialization() {
    return pressed;
  }

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}
