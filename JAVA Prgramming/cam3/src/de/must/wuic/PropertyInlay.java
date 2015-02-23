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
import java.awt.*;
import java.awt.event.*;

/**
 * @author Christoph Mueller
 */
public abstract class PropertyInlay extends Inlay {

  protected int tabSize = 20;
  protected int tabCount = -1;
  protected MustTabbedPane mustTabbedPane1;
  protected AttributeList[] tabAttributeList;
  protected AttributeList currentAttributeList;
  private JPanel panelBottom = new JPanel();
  protected JPanel panelButtons = new JPanel();
  protected MustCheckBox checkRepeatedInput = new MustCheckBox(getTranslation("TEXT_REPEAT_INPUT"));
  protected JComboBox<String> direction = new JComboBox<String>(new String[] {
    getTranslation("TEXT_FORWARD"),
    getTranslation("TEXT_BACKWARD"),
    getTranslation("TEXT_DONE"),
  });
  protected MustButton buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), "BtnOk", this);
  protected MustButton buttonCancel = new MustButton(getTranslation("TEXT_CANCEL_BUTTON"), "BtnCancel", this);

  /**
   * Constructs a new property administration
   * @see #creationEnding
   */
  public PropertyInlay(ContainerFrame ownerFrame) {
    super(ownerFrame);
    setLayout(new BorderLayout());
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(panelButtons, BorderLayout.CENTER);
    buttonOk.setPreferredWidth(70);
    panelButtons.add(checkRepeatedInput);
    checkRepeatedInput.setVisible(false); // default
    panelButtons.add(direction);
    direction.setVisible(false); // default
    panelButtons.add(buttonOk);
    panelButtons.add(buttonCancel);

    // this.getRootPane().setDefaultButton(buttonOk);
    buttonCancel.setDefaultCapable(false);
    buttonCancel.setMnemonic(KeyEvent.VK_F12);
    // ShortCutStd.addInterpreter(this);
  }

  /**
   * Sets the size of the previously to build tabbed pane via method newPanel
   * @param size the number of tabs to build
   */
  protected void setTabSize(int size) {
    tabSize = size;
  }

  /**
   * Creates a new panel with an attribute list.
   * All following data components will be placed upon until this panel.
   * @see AttributeList
   */
  protected void newPanel() {
    JScrollPane scrollPane1 = new JScrollPane();
    add(scrollPane1, BorderLayout.CENTER);
    JPanel centerPanel = new JPanel();
    scrollPane1.getViewport().add(centerPanel);
    currentAttributeList = new AttributeList();
    centerPanel.add(currentAttributeList);
  }

  /**
   * Adds the specified panel to the tabbed pane.
   * @param tabLabel the label of the new tab
   * @param panel the panel to add
   */
  protected void newPanel(String tabLabel, JPanel panel) {
    tabCount++;
    if (tabCount == 0) {
      mustTabbedPane1 = new MustTabbedPane();
      add(mustTabbedPane1, BorderLayout.CENTER);
    }
    mustTabbedPane1.addScrollableTab(tabLabel, panel);
    currentAttributeList = null;
  }

  /**
   * Creates a new panel with an attribute list and adds it to the tabbed pane.
   * All following data components will be placed upon until this panel.
   * @param tabLabel the label of the new tab
   * @see AttributeList
   */
  protected void newPanel(String tabLabel) {
    tabCount++;
    if (tabCount == 0) {
      mustTabbedPane1 = new MustTabbedPane();
      tabAttributeList = new AttributeList[tabSize];
      add(mustTabbedPane1, BorderLayout.CENTER);
    }
    tabAttributeList[tabCount] = new AttributeList();
    mustTabbedPane1.addScrollableTab(tabLabel, tabAttributeList[tabCount]);
    currentAttributeList = tabAttributeList[tabCount];
  }

  /**
   * Conclusion of the construction process. Allows to do construction details
   * in the sequence "super class" - "this" - "super class", which is a benefit 
   * for easy layouting.
   */
  protected void creationEnding() {
    // To get a proper requestFocus for the first time, it seems to be helpful
    // to do add panelBottom at the end of creation
    add(panelBottom, BorderLayout.SOUTH);
    ownerFrame.generalActionEnding();
  }

  /**
   * Recovers the frame. This is for multiple use of the frame. Button OK may
   * make the frame invisible and the object may be kept. Call this method
   * to reuse it.
   */
  protected void recover() {
    this.setVisible(true);
    this.getRootPane().setDefaultButton(buttonOk);
    // this.toFront();
    // this.requestFocus();
  }

  /**
   * Returns the attribute list specified by index (of the tab).
   * @return the attribute list specified by index (of the tab)
   */
  public AttributeList getAttributeList(int index) {
    if (tabAttributeList != null && tabAttributeList[index] != null) {
      return tabAttributeList[index];
    } else {
      return currentAttributeList; 
    }
  }

  /**
   * Controls  action events like button pressed.
   * @param e the action event to be interpreted
   */
  public void actionPerformed(ActionEvent e) {
    ownerFrame.generalActionBeginnung();
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnOk")) {
      buttonOkPressed();
    }
    if (actCommand.equals("BtnCancel")) {
      // closeInstance();
    }
    ownerFrame.generalActionEnding();
  }
  
  protected void buttonOkPressed() {
  }

}
