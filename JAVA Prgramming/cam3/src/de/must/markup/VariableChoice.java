/*
 * Copyright (c) 2001-2010 Christoph Mueller. All rights reserved.
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

import java.util.Vector;
import java.util.Iterator;

/**
 * Equivalent to a JComboBox with statically filled content with keys
 * and their descriptions.
 * @author Christoph Mueller
 */
public class VariableChoice extends MustInputField {

  private static int instanceCounter = 0;

  protected String label;
  protected boolean required = false;
  private String orderByColumnName;
  private static String defaultClassName;
  protected String className;
  private static String defaultAdditionalTagFragments;
  protected String additionalTagFragments;

  protected String visibleColumnName;

  protected String[][] content;
  protected String selected = "";
  protected String selectedItemKey;
  protected String editBeginValue = "";
  protected boolean editable = true;
  protected boolean enabled = true;
  private boolean visible = true;

  protected static final int FORMAT_KEY_VISIBLE = 0;
  protected static final int FORMAT_KEY_INVISIBLE = 1;
  protected int format = FORMAT_KEY_INVISIBLE;

  private static String defaultNameForNoChoice;
  private String nameForNoChoice = defaultNameForNoChoice;

	/**
	 * Sets the defaultNameForNoChoice.
	 * @param defaultNameForNoChoice The defaultNameForNoChoice to set
	 */
	public static void setDefaultNameForNoChoice(String newDefaultNameForNoChoice) {
		defaultNameForNoChoice = newDefaultNameForNoChoice;
	}

  /**
   * Constructs an new variable choice with the specified name and items.
   * @param name component's name
   */
  public VariableChoice(String name) {
    this();
    this.name = name;
  }
  
  /**
   * Constructs an new automatically named variable choice to be filler later
   * by setContent();
   */
  public VariableChoice() {
    this(new String[]{});
  }

  /**
   * Constructs an new automatically named variable choice 
   * @param items the static items of the choice.
   */
  public VariableChoice(Vector<String> items) {
    this();
    setContent(items);
  }


  /**
   * Constructs an new automatically named variable choice with the specified items.
   * @param items the static items of the choice.
   */
  public VariableChoice(String[] items) {
    this("Select" + ++instanceCounter, items);
  }

  /**
   * Constructs an new variable choice with the specified name and items.
   * @param name component's name
   * @param items the static items of the choice.
   */
  public VariableChoice(String name, String[] items) {
    super(name);
    setClassName(defaultClassName);
    setAdditionalTagFragments(defaultAdditionalTagFragments);
  	if (items == null) {
  		de.must.io.Logger.getInstance().info(getClass(), "Warning: VariableChoice's constructor items are null!");
  		setContent(new String[]{});
  	} else {
      setContent(items);
  	}
  }

  /**
   * Constructs an new automatically named variable choice with the specified items.
   * @param items the static items of the choice.
   */
  public VariableChoice(String[][] content) {
    this("Select" + ++instanceCounter, content);
  }

  /**
   * Constructs an new variable choice with the specified name and content.
   * @param name component's name
   * @param content the statically filled content, each line is a pair of key and value.
   */
  public VariableChoice(String name, String[][] content) {
    super(name);
    setContent(content);
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
   * Sets the component's class name - may be used to assign formatting 
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
    // if (this.additionalTagFragments == null) {
      this.additionalTagFragments = additionalTagFragments;
    /* } else {
      this.additionalTagFragments = this.additionalTagFragments + " " + additionalTagFragments;
    } */
  }

  /**
   * Sets the component's name
   * via stylesheets.
   * @param name the component's name
   */
  public void setName(String name) {
    this.name = name;
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
	 * Sets the visibility of the component.
	 * @param visible whether or not the component should be visible
	 */
	public void setVisible(boolean visible) {
    this.visible = visible;
  }

  /**
   * Sets the content of the variable choice.
   * @param content the statically filled content, each line is a pair of key and value
   */
  public void setContent(String[][] content) {
    this.content = content;
  }
  
  /**
   * Sets the content of the variable choice.
   * @param items the static items of the choice.
   */
  public void setContent(String[] items) {
    content = new String[items.length][2];
    for (int i = 0; i < items.length; i++) {
      content[i][0] = items[i];
      content[i][1] = items[i];
    }
  }

  /**
   * Sets the content of the variable choice.
   * @param items the static items of the choice as a vector of Strings
   */
  public void setContent(Vector<String> items) {
  	Iterator<String> iterator = items.iterator();
    content = new String[items.size()][2];
    int i = 0;
    while (iterator.hasNext()){
      content[i][1] = iterator.next().toString();
      i++;
    }
  }

  /**
   * Selects the item by string to select.
   * @param stringToSelect the string to select
   */
  public void setSelectedIndex(int anIndex) {
  	setSelected(getItem(anIndex));
  }

  /**
   * Selects the item by string to select.
   * @param stringToSelect the string to select
   */
  public void setSelected(String stringToSelect){
    this.selected = stringToSelect;
    if (this.selected == null) this.selected = ""; // the select cannot contain null values. "" is more nice to method ismodified().
    editBeginValue = this.selected;
  }

  /**
   * Returns the component's label.
   * @return the component's label
   */
  public String getLabel() {
    return label;
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    if (!visible) return "";
    if (!editable) return getSelectedItem();
  	StringBuffer tagSequence = new StringBuffer();
    tagSequence.append("<select size=\"1\" name=\"" + name + "\"");
    if (className != null) tagSequence.append(" class=\"" + className + "\"");
    if (!enabled) tagSequence.append(" disabled");
    if (additionalTagFragments != null) tagSequence.append(" " + additionalTagFragments);
    tagSequence.append(">");
    for (int i = 0; i < content.length; i++) {
      String element = getItem(i);
      tagSequence.append("<option ");
      if (element.equals(selected)) tagSequence.append("selected ");
      tagSequence.append("value=\"" + element + "\">" + de.must.util.HtmlPiece.getHtmlRepresentation(element) + "</option>");
    }
    tagSequence.append("</select>");
    return tagSequence.toString();
  }

  /**
   * Causes the component to read user input by calling request.getParameter and
   * update the internal mirrored value.
   * @param request the current request
   */
  public void fetchYourValueFromRequest(GeneralizedRequest request) {
  	if (!enabled) return; 
  	if (!editable) return; 
  	if (!visible) return; 
    String parm = request.getParameter(name);
    if (parm != null) {
      selected = (String)parm;
	    switch (format) {
	    case FORMAT_KEY_VISIBLE:
	      int idLength = selected.indexOf('=') - 1;
	      selectedItemKey = selected.substring(0, idLength);
	    default:
	      for (int i = 0; i < content.length; i++) {
	      	if (content[i][0] != null) {
	          if (content[i][1].trim().equals(selected)) {
	            setSelectedItemKey(content[i][0]);
	          }
	        }  
	      }
	    }
    } else {
      de.must.io.Logger.getInstance().info(getClass(), "Parameter " + name + " is not available, maybe back button was used. We do not update the state of the combo box! Current selection is " + selected);
    }  
  }

  /**
   * Returns the index of first item in the list that matches the given item. 
   * @return the index of first item in the list that matches the given item
   */
  public int getSelectedIndex() {
    for (int i = 0; i < content.length; i++) {
      if (content[i][1].trim().equals(selected)) {
        return i;
      }
    } 
    return -1; 
	}

  /**
   * Returns the selected item.
   * @return the selected item
   */
  public String getSelectedItem() {
    return selected;
  }

  /**
   * Returns the key of the selected item.
   * @return the key of the selected item
   */
  public String getSelectedItemKey() {
    return selectedItemKey;
  }

  /**
   * Selects the item by its key.
   * @param key the key of the item to select
   */
  public void setSelectedItemKey(String key) {
    selectedItemKey = key;
    for (int i = 0; i < content.length; i++) {
      if (content[i][0].equals(selectedItemKey)) selected = getItem(i);
    }
  }

  private String getItem(int i) {
    switch (format) {
    case FORMAT_KEY_VISIBLE:
      return content[i][0] + " = " + content[i][1];
    default:
      return content[i][1];
    }
  }

  /**
   * Returns true if the selected item is not the placeholder for "none" or "any".
   * @return true if the selected item is not the placeholder for "none" or "any"
   */
  public boolean isSpecialChoice() {
    return !getSelectedItem().equals(nameForNoChoice);
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
    return true;
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
    return false;
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    return(!this.getSelectedItem().equals(editBeginValue));
  }

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}
