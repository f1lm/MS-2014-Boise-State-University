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

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Iterator;
import java.util.Vector;

import de.must.applet.Constants;
import de.must.util.Callback;

/**
 * A frame-like container to layout components in labeled lines to administer properties.
 * @author Christoph Mueller
 */
public abstract class PropertyAdministration extends RemoteUserInterface {

  protected TabButtonGroup tabButtonGroup = new TabButtonGroup();
  protected AttributeList currentAttributeList = new AttributeList(sessionData);
  protected Vector<MustButton> additionalButtons = new Vector<MustButton>();
  protected Vector<SpecialGUIElement> additionalComponents = new Vector<SpecialGUIElement>();
  protected MustCheckBox checkRepeatedInput;

  /**
   * Constructs a new property administration object.
   * @param sessionData the session's public data
   */
  public PropertyAdministration(SessionData sessionData, ContextInfo contextInfo) {
    super(sessionData, contextInfo);
    setVisible(true);
  }

  /**
   * Sets the tool tip text of the last added component.
   * @param toolTipText the tool tip text
   */
  public void setToolTipText(String toolTipText) {
    currentAttributeList.setLastComponentsToolTipText(toolTipText);
  }
  
  /**
   * Creates a button to call a selection list and appends it to the layout.
   * @param targetTextField the targetField to receive user's choice
   * @param callback the action to be done if user clicks the button
   * @return the created button
   */
  public MustButton appendButtonForSelection(MustTextField targetTextField, final Callback callback) {
    targetTextField.setRegisterFlag(true);
    MustButton button = new MustButton("Open16.gif", "...", MustButton.TYPE_IN_SEQUENCE);
    button.setToolTipText(getTranslation("TEXT_CHOOSE_BUTTON"));
    button.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        callback.callback();
      }
    });
    append(button);
    return button;
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
   */
  protected void newPanel(String tabLabel) {
    newPanel(tabLabel, null);
  }
  
  /**
   * Creates a new panel with an attribute list and adds it to the tabbed pane.
   * All following data components will be placed upon until this panel.
   * @param tabLabel the label of the new tab
   * @param lineCapacity the number of rows of the attribute list to be created
   * @param toolTipText the tool tip text to show
   * @see AttributeList
   */
  protected void newPanel(String tabLabel, String toolTipText) {
    currentAttributeList = new AttributeList(sessionData); // the first attribute list is created in the beginning
    tabButtonGroup.addButton(tabLabel, toolTipText, currentAttributeList);
  }

  protected void newPanel() {
    currentAttributeList = new AttributeList(sessionData);
  }
  
  /**
   * Conclusion of the construction process. Allows to do construction details
   * in the sequence "super class" - "this" - "super class", which is a benefit 
   * for easy layout.
   */
  protected void creationEnding() {
    checkRepeatedInput = new MustCheckBox(sessionData, getTranslation("TEXT_REPEAT_INPUT"));
    addToButtonPanel(checkRepeatedInput, 0);
    checkRepeatedInput.setVisible(false);
  }

  protected void append(String text) {
    currentAttributeList.append(new Label(sessionData, text));
  }
  
  /**
   * Appends the passed button to the current AttributeList
   * and register it as additional button to be checked for actions.
   * @param button  the button to add
   */
  protected void append(MustButton button) {
    currentAttributeList.append(button);
    additionalButtons.add(button);
  }

  /**
   * Adds a component to the line as previously used.
   * @param Component
   */
  protected void append(Remotable component) {
    currentAttributeList.append(component);
  }

  /**
   * Creates a button and adds it to the standard button panel.
   * @param label the label of the button
   * @return the created button
   */
  protected InsertedButton addButton(String label) {
    return addButton(label, -1);
  }
  
  /**
   * Creates a button and adds it to the standard button panel.
   * @param label the label of the button
   * @param index the index where to place the button
   * @return the created button
   */
  protected InsertedButton addButton(String label, int index) {
    InsertedButton result = new InsertedButton(label, index);
    result.type = MustButton.TYPE_BOTTOM;
    additionalButtons.add(result);
    return result;
  }
  
  protected MustButton addButtonInSequence(String label) {
    MustButton result = new MustButton(label);
    result.type = MustButton.TYPE_IN_SEQUENCE;
    currentAttributeList.append(result);
    additionalButtons.add(result);
    return result;
  }
  
//------------------------------------------------------------------------------

  protected TextPresenter createTextPresenter() {
    TextPresenter result = new TextPresenter(sessionData);
    currentAttributeList.append(result);
    remoteContents.add(result);
    return result;
  }
  
  protected void addToButtonPanel(RemoteElement comp) {
    additionalComponents.add(new SpecialGUIElement(comp));
  }
  
  protected void addToButtonPanel(RemoteElement comp, int index) {
    additionalComponents.add(new SpecialGUIElement(comp, index));
  }
  
  /**
   * Returns the used attribute list.
   * @return the used attribute list
   */
  public AttributeList getAttributeList() {
    return currentAttributeList;
  }

  public void buildRemoteView(ToAppletWriter out) {
    if (!buildDone) {
      if (!isToRenew) { // send once only
        out.setHeader(getAppellation());
      }
      out.sendClearCommand();
      if (tabButtonGroup.tabButtons.size() > 0) {
        tabButtonGroup.buildRemoteView(out);
      } else {
        currentAttributeList.buildRemoteView(out);
      }
      Iterator<MustButton> iterator2 = additionalButtons.iterator();
      while (iterator2.hasNext()) {
        MustButton additionalButton = iterator2.next();
        if (additionalButton.getType() == MustButton.TYPE_BOTTOM) {
          additionalButton.buildRemoteView(out);
        }
      }
      Iterator<SpecialGUIElement> iterator3 = additionalComponents.iterator();
      while (iterator3.hasNext()) {
        iterator3.next().buildRemoteView(out);
      }
      buildDone = true;
    }
    if (isToRenew) {
      out.setHeader(getAppellation());
      Iterator<RemoteContent> iterator = remoteContents.iterator();
      while (iterator.hasNext()) {
        RemoteContent remoteContent = iterator.next();
        remoteContent.setValues(out);
      }
      Iterator<SpecialGUIElement> iterator2 = additionalComponents.iterator();
      while (iterator2.hasNext()) {
        SpecialGUIElement remoteContent = iterator2.next();
        remoteContent.setValues(out);
      }
      isToRenew = false;
    }
    super.buildRemoteView(out);
  }

  private void addTodoAction(String todo, ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TODO_TAG_BEGIN + todo + Constants.TODO_TAG_END);
    out.println(Constants.ACTION_END_TAG);
  }
  
  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    super.fetchValuesFromRequest(request);
    if (tabButtonGroup != null) tabButtonGroup.fetchValuesFromRequest(request);
    Iterator<SpecialGUIElement> iterator2 = additionalComponents.iterator();
    while (iterator2.hasNext()) {
      SpecialGUIElement remoteContent = iterator2.next();
      remoteContent.fetchValuesFromRequest(request);
    }
  }

  @Override
  public void process(GeneralizedRequest request) {
    if (Constants.ACTION_ITEM_SELECTED.equals(sessionData.action)) {
      isToRenew = true;
    }
    Iterator<MustButton> iterator2 = additionalButtons.iterator();
    while (iterator2.hasNext()) {
      MustButton additionalButton = iterator2.next();
      if (additionalButton.getActionID().equals(sessionData.action)) {
        additionalButton.performAction();
      }
    }
    Iterator<RemoteContent> iterator3 = remoteContents.iterator();
    while (iterator3.hasNext()) {
      RemoteContent remoteContent = iterator3.next();
      if (remoteContent instanceof ActionInterpreter) {
        ((ActionInterpreter)remoteContent).perform(sessionData.action);
      }
    }
  }

}
