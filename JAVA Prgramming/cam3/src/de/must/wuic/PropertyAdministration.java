/*
 * Copyright (c) 1999-2013 Christoph Mueller. All rights reserved.
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

import de.must.middle.FrameworkTextResource;

import java.awt.*;
import java.awt.event.*;
import java.util.Vector;

/**
 * A frame to layout components in labeled lines to administrate properties.
 * @see AttributeList
 * @author Christoph Mueller
 */
public abstract class PropertyAdministration extends MustFrame implements ActionListener {

  protected int tabSize = 20;
  protected int tabCount = -1;
  private JScrollPane uniqueScrollPane;
  protected MustTabbedPane mustTabbedPane;
  protected Vector<AttributeList> tabAttributeList;
  protected AttributeList currentAttributeList;
  protected ChoiceManager lastChoiceManager;
  private JPanel panelBottom = new JPanel();
  protected JPanel panelButtons = new JPanel();
  private MustStatusLabel statusLabel = new MustStatusLabel();
  protected MustCheckBox checkRepeatedInput = new MustCheckBox(getTranslation("TEXT_REPEAT_INPUT"));
  protected MustButton buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), "BtnOk", this);
  protected MustButton buttonCancel = new MustButton(getTranslation("TEXT_CANCEL_BUTTON"), "BtnCancel", this);

  /**
   * Constructs a new property administration
   * @param frameworkTextResource a resource for framework texts if not standard
   * @see #creationEnding
   */
  public PropertyAdministration(FrameworkTextResource frameworkTextResource) {
    super(frameworkTextResource);
    setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE); // to consider the isClosingAllowed() aspect
    if (!isLaidOut()) {
      setSize(new Dimension(400, 300));
      setLocation(300, 110);
    }
    getContentPane().setLayout(new BorderLayout());
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(panelButtons, BorderLayout.CENTER);
    buttonOk.setPreferredWidth(70);
    panelButtons.add(checkRepeatedInput);
    checkRepeatedInput.setVisible(false); // default
    panelButtons.add(buttonOk);
    panelButtons.add(buttonCancel);
    panelBottom.add(statusLabel, BorderLayout.SOUTH);

    getRootPane().setDefaultButton(buttonOk);
    buttonCancel.setMnemonic(KeyEvent.VK_F12);
    ShortCutStd.addInterpreter(this);
  }

  /**
   * Historic: Sets the size of the previously to build tabbed pane via method newPanel
   * @param size the number of tabs to build
   * @deprecated not needed any more
   */
  protected void setTabSize(int size) {
    tabSize = size;
  }

  /**
   * Creates a new panel with an attribute list.
   * @param lines not needed any more
   * @deprecated use newPanel() without lines
   */
  protected void newPanel(int lines) {
    newPanel();
  }
  
  /**
   * Creates a new panel with an attribute list.
   * All following data components will be placed upon until this panel.
   * @see AttributeList
   */
  protected void newPanel() {
    if (uniqueScrollPane == null) uniqueScrollPane = new JScrollPane();
    getContentPane().add(uniqueScrollPane, BorderLayout.CENTER);
    currentAttributeList = new AttributeList();
    uniqueScrollPane.setViewportView(currentAttributeList);
  }

  /**
   * Creates a new panel with an attribute list.
   * @param lines not needed any more
   * @deprecated use newPanel(tabLabel) without lines
   */
  protected void newPanel(String tabLabel, int lines) {
    newPanel(tabLabel);
  }
  
  /**
   * Creates a new panel with an attribute list with default line size.
   * All following data components will be placed upon until this panel.
   * @param tabLabel the label of the new tab
   * @see AttributeList
   */
  protected void newPanel(String tabLabel) {
    tabCount++;
    if (tabAttributeList == null) {
      mustTabbedPane = new MustTabbedPane();
      tabAttributeList = new Vector<AttributeList>();
      getContentPane().add(mustTabbedPane, BorderLayout.CENTER);
    }
    currentAttributeList = new AttributeList();
    tabAttributeList.add(currentAttributeList);
    mustTabbedPane.addScrollableTab(tabLabel, currentAttributeList);
  }

  /**
   * Adds the specified panel to the tabbed pane.
   * @param tabLabel the label of the new tab
   * @param panel the panel to add
   */
  protected void newPanel(String tabLabel, JPanel panel) {
    tabCount++;
    if (tabCount == 0) {
      mustTabbedPane = new MustTabbedPane();
      getContentPane().add(mustTabbedPane, BorderLayout.CENTER);
    }
    mustTabbedPane.addScrollableTab(tabLabel, panel);
    currentAttributeList = null;
  }

  /**
   * Appends the passed button to the current AttributeList.
   * @param button  the button to add
   */
  protected void append(MustButton button) {
    currentAttributeList.append(button);
  }

  /**
   * Adds a string to the line as previously used.
   * @param infoExtension the information to add
   */
  protected void append(String infoExtension) {
    currentAttributeList.append(infoExtension);
  }

  /**
   * Conclusion of the construction process. Allows to do construction details
   * in the sequence "super class" - "this" - "super class", which is a benefit 
   * for easy layout.
   */
  protected void creationEnding() {
    // To get a proper requestFocus for the first time, it seems to be helpful
    // to do add panelBottom at the end of creation
    getContentPane().add(panelBottom, BorderLayout.SOUTH);
    packIfNotLaidOut();
    generalActionEnding();
  }

  /**
   * Sets the default frame size for the users first application use.
   * @param layoutDim the size of the frame
   */
  protected void setDefaultSize(Dimension layoutDim) {
    if (!isLaidOut()) setSize(layoutDim);
  }

  /**
   * Sets the default frame location for the users first application use.
   * @param layoutDim the location of the frame
   */
  protected void setDefaultLocation(int x, int y) {
    if (!isLaidOut()) setLocation(x, y);
  }

  /**
   * Packs the frame if it isn't already in layout done by user.
   */
  protected void packIfNotLaidOut() {
    if (!isLaidOut()) {
      boolean isToReduce = false;
      pack();
      int width = getSize().width;
      int height = getSize().height;
      if (width > AwtConst.getSreeenWidth() - 50) {
        width = AwtConst.getSreeenWidth() - 50;
        isToReduce = true;
      }
      if (height > AwtConst.getSreeenHeight() - 150) {
        height = AwtConst.getSreeenHeight() - 150;
        isToReduce = true;
      }
      if (isToReduce) {
        setSize(width, height);
      }
    }
  }

  /**
   * Recovers the frame. This is for multiple use of the frame. Button OK may
   * make the frame invisible and the object may be kept. Call this method
   * to reuse it.
   */
  protected void recover() {
    // next 3 lines: give window a chance to be reset from maximized to normal size as once saved 
    int oldState = getExtendedState();
    WinContr.getInstance().layout(this);
    setExtendedState(oldState);
    setVisible(true);
    if (getExtendedState() == ICONIFIED) setExtendedState(NORMAL);    
    getRootPane().setDefaultButton(buttonOk);
    // toFront();
    // requestFocus();
  }

  /**
   * Controls action events like button pressed.
   * @param e the action event to be interpreted
   */
  public void actionPerformed(ActionEvent e) {
    generalActionBeginnung();
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnOk")) {
      okButtonAction();
    }
    if (actCommand.equals("BtnCancel")) {
      closeInstance();
    }
    generalActionEnding();
  }

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
   * Does all the things necessary when user pushes OK button and returns true if 
   * there was nothing rejected. Returning false means the regular OK button action 
   * has not been done to the end, e.g. because data input has not been accepted. 
   * @return true if there was nothing rejected
   */
  protected boolean okButtonAction() {
    closeInstance();
    return true;
  }

  /**
   * Set's the status label to its default message value.
   */
  public void resetMessage() {
    statusLabel.reset();
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
