/*
 * Copyright (c) 2004-2009 Christoph Mueller. All rights reserved.
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

package de.must.wuic;

import javax.swing.*;
import javax.swing.tree.TreeModel;

import java.awt.*;
import java.awt.event.*;

/**
 * A frame to layout components in labled lines to administrate properties.
 * @see AttributeList
 * @author Christoph Mueller
 */
public abstract class TreeFrame extends MustFrame implements ActionListener {

  protected int tabSize = 20;
  protected int tabCount = -1;
  protected JSplitPane jSplitPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT);
  protected MustTabbedPane mustTabbedPane;
  protected JPanel panelTop = new JPanel();
  protected AttributeList[] tabAttributeList;
  protected AttributeList currentAttributeList;
  private TreeModel treeModel;
  protected JPanel panelSelectButtons = new JPanel();
  private JPanel panelBottom = new JPanel();
  protected JPanel panelButtons = new JPanel();
  private MustStatusLabel statusLabel = new MustStatusLabel();
  protected MustButton buttonList = new MustButton(getTranslation("TEXT_LIST_BUTTON"), "BtnList", this);
  protected MustButton buttonClose = new MustButton(getTranslation("TEXT_CLOSE_BUTTON"), "BtnClose", this);

  /**
   * Constructs a new property administration
   * @see #creationEnding
   */
  public TreeFrame() {
    setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE); // to consider the isClosingAllowed() aspect
    if (!isLaidOut()) {
      this.setSize(new Dimension(400, 300));
      this.setLocation(200, 100);
    }
    this.getContentPane().setLayout(new BorderLayout());
    JScrollPane scrollPane = new JScrollPane();
    scrollPane.getViewport().add(getTree());
    panelTop.setLayout(new BorderLayout());
    panelTop.add(panelSelectButtons, java.awt.BorderLayout.SOUTH);
    jSplitPane.setTopComponent(panelTop);
    jSplitPane.setBottomComponent(scrollPane);
    getContentPane().add(jSplitPane);
    panelSelectButtons.add(buttonList);
    // panelSelectButtons.add(buttonNew);
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(panelButtons, BorderLayout.CENTER);
    panelButtons.add(buttonClose);
    panelBottom.add(statusLabel, BorderLayout.SOUTH);
    getRootPane().setDefaultButton(buttonClose);
    ShortCutStd.addInterpreter(this);
  }
  
  protected abstract JTree getTree();

  protected void setTreeModel(TreeModel treeModel) {
    this.treeModel = treeModel;
  }

  public TreeModel getTreeModel() {
    return treeModel;
  }

  /**
   * Conclusion of the construction process. Allows to do construction details
   * in the sequence "super class" - "this" - "super class", which is a benefit 
   * for easy layouting.
   */
  protected void creationEnding() {
    // To get a proper requestFocus for the first time, it seems to be helpful
    // to do add panelBottom at the end of creation
    this.getContentPane().add(panelBottom, BorderLayout.SOUTH);
    packIfNotLaidOut();
    generalActionEnding();
  }

  /**
   * Sets the default frame size for the users first application use.
   * @param layoutDim the size of the frame
   */
  protected void setDefaultSize(Dimension layoutDim) {
    if (!isLaidOut()) this.setSize(layoutDim);
  }

  /**
   * Sets the default frame location for the users first application use.
   * @param layoutDim the location of the frame
   */
  protected void setDefaultLocation(int x, int y) {
    if (!isLaidOut()) this.setLocation(x, y);
  }

  /**
   * Packs the frame if it isn't already laid-out by user.
   */
  protected void packIfNotLaidOut() {
    if (!isLaidOut()) pack();
  }

  /**
   * Recovers the frame. This is for multiple use of the frame. Button OK may
   * make the frame invisible and the object may be kept. Call this method
   * to reuse it.
   */
  protected void recover() {
    this.setVisible(true);
    this.getRootPane().setDefaultButton(buttonClose);
    // this.toFront();
    // this.requestFocus();
  }

  /**
   * Creates a new panel and adds it to the tabbed pane with a list for row subselection.
   */
  protected void newPanel() {
    currentAttributeList = new AttributeList();
    panelTop.add(currentAttributeList, java.awt.BorderLayout.CENTER);  // Java seems to dislike non-centered Tab-JPanels
  }

  /**
   * Creates a new panel and adds it to the tabbed pane with a list for row subselection.
   */
  protected void newPanel(String tabLabel) {
    tabCount++;
    if (tabCount == 0) {
      mustTabbedPane = new MustTabbedPane();
      // mustTabbedPane.setMinimumSize(new java.awt.Dimension(0, 100));
      tabAttributeList = new AttributeList[tabSize];
      panelTop.add(mustTabbedPane, java.awt.BorderLayout.CENTER);  // Java seems to dislike non-centered Tab-JPanels
    }
    tabAttributeList[tabCount] = new AttributeList();
    mustTabbedPane.addTab(tabLabel, tabAttributeList[tabCount]);
    currentAttributeList = tabAttributeList[tabCount];
  }

  private void newPanel(String tabLabel, MustTextArea centerTextArea) {
    tabCount++;
    JScrollPane tempScrollPane1 = new JScrollPane();
    tempScrollPane1.getViewport().add(centerTextArea);
    mustTabbedPane.addTab(tabLabel, tempScrollPane1);
    addFocusListenerForDefaultButton(centerTextArea);
  }

  /**
   * Adds a panel with multiple choice selection.
   * @param tabLabel the label of the new tab
   * @param multChoice multiple choice to be presented
   * @param preferedSize the preferred size of the scrollpane
   */
  protected void newPanel(String tabLabel, MustMultChoice multChoice, Dimension preferedSize) {
  // usage see mkt.FrKontaktSl
    tabCount++;
    JScrollPane tempScrollPane1 = new JScrollPane();
    tempScrollPane1.setPreferredSize(preferedSize);
    tempScrollPane1.getViewport().add(multChoice.getTable());
    mustTabbedPane.addTab(tabLabel, tempScrollPane1);
  }

  /**
   * Creates a new variable choice with static content.
   * @param dataLabel the line label.
   * @param content the static content as a key / value table
   * @return the created variable choice
   */
  protected VariableChoice createVariableChoice(String dataLabel, String[][] content) {
    VariableChoice temp = new VariableChoice(content, true);
    currentAttributeList.append(dataLabel, temp);
    addFocusListenerForDefaultButton(temp);
    return(temp);
  }

  /**
   * Constructs an new variable choice with the specified content.
   * @param dataLabel the line label.
   * @param keyValuePairs the content as an array of key value pairs
   * @return the created variable choice
   */
  protected VariableChoice createVariableChoice(String dataLabel, de.must.util.KeyValuePair[] keyValuePairs) {
    VariableChoice temp = new VariableChoice(keyValuePairs, true);
    currentAttributeList.append(dataLabel, temp);
    addFocusListenerForDefaultButton(temp);
    return(temp);
  }

  /**
   * Creates a new text field.
   * @param label the line label
   * @param length the length of the text field
   * @return the created text field
   */
  protected MustTextField createTextField(String label, int length) {
    MustTextField temp = new MustTextField(length);
    currentAttributeList.append(label, temp);
    addFocusListenerForDefaultButton(temp);
    return(temp);
  }

  /**
   * Creates a text input field in the same line as previously used.
   * @param length the length of the field
   * @return the created text input field
   */
  protected MustTextField createTextField(int length) {
    MustTextField temp = new MustTextField(length);
    currentAttributeList.append(temp);
    addFocusListenerForDefaultButton(temp);
    return(temp);
  }

  /**
   * Creates a int field in a new line with its describing label.
   * @param label the line label
   * @param length the length of the field
   * @return the created int field
   */
  protected MustIntField createIntField(String label, int length) {
    MustIntField temp = new MustIntField(length);
    currentAttributeList.append(label, temp);
    addFocusListenerForDefaultButton(temp);
    return(temp);
  }

  /**
   * Creates a int input field in the same line as previously used.
   * @param length the length of the field
   * @return the created int field
   */
  protected MustIntField createIntField(int length) {
    MustIntField temp = new MustIntField(length);
    currentAttributeList.append(temp);
    addFocusListenerForDefaultButton(temp);
    return(temp);
  }

  private void addFocusListenerForDefaultButton(Component selectionComponent) {
//   selectionComponent.addFocusListener(new java.awt.event.FocusAdapter() {
//     public void focusGained(FocusEvent e) {
//       rootFrame.getRootPane().setDefaultButton(buttonList);
//     }
//   });
 }

  /**
   * Controls  action events like button pressed.
   * @param e the action event to be interpreted
   */
  public void actionPerformed(ActionEvent e) {
    generalActionBeginnung();
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnClose")) {
      closeInstance();
    } else if (actCommand.equals("BtnList")) {
      load();
    }
    generalActionEnding();
  }
  
  protected abstract void load();

  /**
   * Initializes things before an action begins like resetting the status label.
   */
  protected void generalActionBeginnung() {
    statusLabel.stopAnimation();
    statusLabel.reset();
  }

  /**
   * Concludes things after an action ended like resetting the status label to
   * its default value.
   */
  protected void generalActionEnding() {
    statusLabel.resetDefault();
  }

  /**
   * Sets the message to be read by the user, which is presented in the status
   * label in this context.
   * @param message the message for the user
   */
  protected void setMessage(String message) {
    statusLabel.setStatus(message);
  }

  /**
   * Sets the message to be read by the user, it is not reseted by
   * generalActionEnding when action completed. Thus, the user is able to notify
   * the message without pressing a confirmation button.
   * @param messageToKeep the message for the user
   */
  protected void setMessageToKeep(String messageToKeep) {
    statusLabel.setRemainStatus(messageToKeep);
  }

}
