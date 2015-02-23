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
 * A component to present a group of radio buttons.
 * @author Christoph Mueller
 */
public class RadioButtonGroup extends MustInputField {

  private static int instanceCounter = 0;

  private String[] values;
  private String[] checkLabels;
  private boolean[] itemEnabled;
  private int selectedIndex = -1;
  private static String defaultClassName;
  protected String className;
  private static String defaultAdditionalTagFragments;
  protected String additionalTagFragments;
  private boolean editable = true;
  protected int editBeginIndex = -1;

  public RadioButtonGroup(String[] checkLabels) {
    this(checkLabels, null);
  }

  public RadioButtonGroup(String[] checkLabels, String[] values) {
    this("Radio" + ++instanceCounter, checkLabels, values);
  }

  public RadioButtonGroup(String name, String[] checkLabels, String[] values) {
    super(name);
  	int i;
    this.checkLabels = checkLabels;
    this.values = values;
    itemEnabled = new boolean[checkLabels.length];
    for (i = 0; i < checkLabels.length; i++) {
      itemEnabled[i] = true;
    }
    if (this.values == null) {
      this.values = new String[checkLabels.length];
      for (i = 0; i < checkLabels.length; i++) {
        this.values[i] = name + "Opt" + i;
      }
    }
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
   * Enables or disables all items.
   * @param enabled whether the items should be enabeld or not
   */
  public void setEnabled(boolean enabled) {
    for (int i = 0; i < checkLabels.length; i++) {
    	setEnabled(i, enabled);
    }
  }

  /**
   * Enables or disables an item by index.
   * @param anIndex an int specifying the item to select, where 0 specifies
   * @param enabled whether the item should be enabeld or not
   */
  public void setEnabled(int anIndex, boolean enabled) {
    itemEnabled[anIndex] = enabled;
    // ???
//    if (!enabled && selectedIndex == anIndex) {
//    	selectedIndex = -1;
//    }
    if (selectedIndex == -1) {
    	selectFirstEnabledItem();
    }
  }

  /**
   * Selects the first of all enabled items.
   */
  public void selectFirstEnabledItem() {
    for (int i = 0; i < checkLabels.length; i++) {
      if (itemEnabled[i]) {
      	selectedIndex = i;
      	return;
      }
    }
  }

  /**
   * Selects the item by its key.
   * @param key the key of the item to select
   */
  public void setSelectedKey(String key) {
    for (int i = 0; i < values.length; i++) {
      if (values[i].equals(key))setSelectedIndex(i);
    }
  }

  /**
   * Selects the item at index.
   * @param anIndex an int specifying the item to select, where 0 specifies
   * the first item
   */
  public void setSelectedIndex(int anIndex) {
    selectedIndex = anIndex;
    editBeginIndex = selectedIndex;
  }

  /**
   * Returns the index of the currently selected item.
   * Returns -1 if there is no selected item.
   * @return the index of the currently selected item
   */
  public int getSelectedIndex() {
    return selectedIndex;
  }

  /**
   * Returns the key of the currently selected item.
   * Returns null if there is no selected item.
   * @return the index of the currently selected item
   */
  public String getSelectedKey() {
  	de.must.io.Logger.getInstance().info(getClass(), "selectedIndex = " +selectedIndex);
  	if (selectedIndex == -1) return null;
    return values[selectedIndex];
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    StringBuffer tagSequence = new StringBuffer();
    // de.must.io.Logger.getInstance().info(getClass(), "selectedIndex = " + selectedIndex);
    if (!editable) return checkLabels[selectedIndex];
    for (int i = 0; i < checkLabels.length; i++) {
    	// if (itemEnabled[i]) {
        tagSequence.append("<input type=\"radio\" name=\"" + name + "\" value=\"" + values[i] + "\"");
        if (i == selectedIndex) tagSequence.append(" checked");
        if (className != null) tagSequence.append(" class=\"" + className + "\"");
        if (!itemEnabled[i]) tagSequence.append(" disabled");
        if (additionalTagFragments != null) tagSequence.append(" " + additionalTagFragments);
        if (toolTipText != null) {
          tagSequence.append(" onMouseOver=\"window.status='" + toolTipText + "';return true\" onMouseOut=\"window.status='';return true\"");
        }
        tagSequence.append(">" + checkLabels[i] + " ");
      // }
    }
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
		String value = (String)request.getParameter(name);
    if (value != null) {
      for (int i = 0; i < checkLabels.length; i++) {
        if (value.equals(values[i])) selectedIndex = i;
      }
    }
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    return(editBeginIndex != selectedIndex);
  }

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}
