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
 * A frame-like container to layout components in labeled lines to administrate properties.
 * @author Christoph Mueller
 */
public abstract class PropertyAdministration extends Dialog {

  private int countAttributeLists = -1;
  private TabButtonGroup tabButtonGroup;
  private AttributeList[] attributeLists;
  protected AttributeList currentAttributeList = new AttributeList();
  protected int dialogNbr;
  protected boolean wantToBeFinalized = false;

  /**
   * Constructs a new property administration object.
   * @param sessionData the session's public data
   */
  public PropertyAdministration(SessionData sessionData) {
    super(sessionData);
  }

  /**
   * Sets the tool tip text of the last added component.
   * @param toolTipText the tool tip text
   */
  public void setToolTipText(String toolTipText) {
    currentAttributeList.setLastComponentsToolTipText(toolTipText);
  }

  /**
   * Sets the size of the previously to build tabbed pane via method newPanel
   * @param size the number of tabs to build
   */
  protected void setTabSize(int size) {
    tabButtonGroup = new TabButtonGroup(size);
    attributeLists = new AttributeList[size];
  }
  
  /**
   * Returns true if the property frame has multiple panels.
   * @return true if the property frame has multiple panels
   */
  public boolean hasMultiplePanels() {
    return tabButtonGroup != null;
  }
  
  /**
   * Creates a new panel with an attribute list and adds it to the tabbed pane.
   * All following data components will be placed upon until this panel.
   * @param tabLabel the label of the new tab
   * @param lineCapacity the number of rows of the attribute list to be created
   * @see AttributeList
   * @see #setTabSize
   */
  protected void newPanel(String tabLabel, int lineCapacity) {
    newPanel(tabLabel, lineCapacity, null);
  }
  
  /**
   * Creates a new panel with an attribute list and adds it to the tabbed pane.
   * All following data components will be placed upon until this panel.
   * @param tabLabel the label of the new tab
   * @param lineCapacity the number of rows of the attribute list to be created
   * @param toolTipText the tool tip text to show
   * @see AttributeList
   * @see #setTabSize
   */
  protected void newPanel(String tabLabel, int lineCapacity, String toolTipText) {
    countAttributeLists++;
    tabButtonGroup.addButton(tabLabel, toolTipText);
    if (countAttributeLists > 0) currentAttributeList = new AttributeList(lineCapacity); // the first attribute list is created in the beginning
    attributeLists[countAttributeLists] = currentAttributeList;
  }

  /**
   * Creates a new panel with an attribute list and adds it to the tabbed pane.
   * All following data components will be placed upon until this panel.
   * @param tabImage the image of the new tab
   * @param lineCapacity the number of rows of the attribute list to be created
   * @see AttributeList
   * @see #setTabSize
   */
  protected void newPanel(TabImage tabImage, int lineCapacity) {
    newPanel(tabImage, lineCapacity, null);
  }
  
  /**
   * Creates a new panel with an attribute list and adds it to the tabbed pane.
   * All following data components will be placed upon until this panel.
   * @param tabImage the image of the new tab
   * @param lineCapacity the number of rows of the attribute list to be created
   * @param toolTipText the tool tip text to show
   * @see AttributeList
   * @see #setTabSize
   */
  protected void newPanel(TabImage tabImage, int lineCapacity, String toolTipText) {
    countAttributeLists++;
    tabButtonGroup.addButton(tabImage, toolTipText);
    if (countAttributeLists > 0) currentAttributeList = new AttributeList(lineCapacity); // the first attribute list is created in the beginning
    attributeLists[countAttributeLists] = currentAttributeList;
  }

  /**
   * Conclusion of the construction process. Allows to do construction details
   * in the sequence "super class" - "this" - "super class", which is a benefit 
   * for easy layouting.
   */
  protected void creationEnding() {
    if (countAttributeLists > 0) currentAttributeList = attributeLists[0];
  }

  /**
   * Returns the tabbed pane tag sequence. Null is returned if only one panel is
   * used.
   * @return the tabbed pane tag sequence
   */
  public String getTabbedPaneTagSequence() {
    if (tabButtonGroup == null) return null;
    return tabButtonGroup.getCreationTag();
  }

  /**
   * Returns the used attribute list.
   * @return the used attribute list
   */
  public AttributeList getAttributeList() {
    return currentAttributeList;
  }

  /**
   * Causes the invokable to delegate this function to all embedded markupables
   * to fetch their current value as edited by the user from the request.
   * @param request the request from where the values are to be fetched
   * @see Markupable#fetchYourValueFromRequest
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    currentAttributeList.fetchValuesFromRequest(request);
    if (tabButtonGroup != null) tabButtonGroup.fetchYourValueFromRequest(request);
  }

  /**
   * Allows the invokable to react to the request.
   * @param the requestet to react to
   */
  public void process(GeneralizedRequest request) {
    super.process(request);
    if (tabButtonGroup != null && tabButtonGroup.hasBeenUsed()) {
      currentAttributeList = attributeLists[tabButtonGroup.getActiveButtonIndex()];
      processComplete = true;
    }
  }

  /**
   * Returns true if the invokable wants to be finalized after request is worked off.
   * @return true if the invokable wants to be finalized
   */
  public boolean wantToBeFinalized() {
    return wantToBeFinalized;
  }

}
