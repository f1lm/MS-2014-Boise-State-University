/*
 * Copyright (c) 1999-2010 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.*;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

/**
 * @author Christoph Mueller
 */
public abstract class ParameterFrame extends MustFrame implements WindowListener, ActionListener {

  protected boolean isCanceled;
  public static final int NEW_LINE = 0;
  public static final int STAY_IN_LINE = 1;
  protected MustTabbedPane mustTabbedPane1 = new MustTabbedPane();
  private int tabSize = 20;
  private int tabCount = 0;
  protected int countTab = -1;
  protected int countTextField = -1;
  protected AttributeList[] tabAttributeList;
  protected AttributeList currentAttributeList;
  protected boolean isAttributeListToPack = false;
  protected JPanel panelBottom = new JPanel();
  protected JPanel panelButtons = new JPanel();
  public MustStatusLabel statusLabel = new MustStatusLabel();
  protected MustButton buttonOk = new MustButton("Ok", "BtnOk", this);
  protected MustButton buttonCancel = new MustButton("Abbrechen", "BtnCancel", this);
  protected MustTextField[] MustTextField;

  public ParameterFrame() {
    this(null);
  }

  /**
   *
   * @param OwnerFrame
   */
  public ParameterFrame(Frame OwnerFrame) {
    super();
    try {
      initParameterFrame();
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
  }

  private void initParameterFrame() throws Exception{
    setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE); // to consider the isClosingAllowed() aspect
    int sizeFactor = 20;
    MustTextField = new MustTextField[sizeFactor * 2];
    this.addWindowListener(this);
    this.getContentPane().setLayout(new BorderLayout());
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(panelButtons, BorderLayout.CENTER);
    buttonOk.setPreferredWidth(70);
    panelButtons.add(buttonOk);
    panelButtons.add(buttonCancel);
    panelBottom.add(statusLabel, BorderLayout.SOUTH);
    buttonOk.setDefaultCapable(true);
    getRootPane().setDefaultButton(buttonOk);
    // ShortCutStd.addInterpreter(this); no shortcuts in dialogs!!!
  }

  /**
   *
   */
  protected void creationEnding() {
    // To get a proper requestFocus for the first time, it seems to be helpful
    // to do add panelBottom at the end of creation
    this.getContentPane().add(panelBottom, BorderLayout.SOUTH);
    packAndLocateInCenterIfNotLaidOut();
    // generalActionEnding();
  }

//------------------------------------------------------------------------------

  /**
   *
   * @param topic
   */
  protected void addHelpButton(String topic) {
    panelButtons.add(new HelpButton(getLocale(), topic));
    setHelpContext(topic);
  }

  /**
   *
   * @param topic
   * @param subTopic
   * @return
   */
  protected void addHelpButton(String topic, String subTopic) {
    panelButtons.add(new HelpButton(getLocale(), topic, subTopic));
    setHelpContext(topic, subTopic);
  }

  /**
   *
   * @param centerPanel
   */
  protected void setCenterPanel(JPanel centerPanel) {
    JScrollPane scrollPane1 = new JScrollPane();
    this.getContentPane().add(scrollPane1, BorderLayout.CENTER);
    scrollPane1.add(centerPanel);
  }

  /**
   *
   * @param size
   */
  protected void setTabSize(int size) {
    tabSize = size;
  }

  public void newPanel() {
    JScrollPane scrollPane1 = new JScrollPane();
    this.getContentPane().add(scrollPane1, BorderLayout.CENTER);
    JPanel centerPanel = new JPanel();
    scrollPane1.getViewport().add(centerPanel);
    currentAttributeList = new AttributeList();
    centerPanel.add(currentAttributeList);
    isAttributeListToPack = true;
  }

  protected void newPanel(String tabLabel) {
    countTab++;
    if (countTab == 0) {
      mustTabbedPane1 = new MustTabbedPane();
      tabAttributeList = new AttributeList[tabSize];
      this.getContentPane().add(mustTabbedPane1, BorderLayout.CENTER);
    }
    tabAttributeList[countTab] = new AttributeList();
    mustTabbedPane1.addScrollableTab(tabLabel, tabAttributeList[countTab]);
    currentAttributeList = tabAttributeList[countTab];
    isAttributeListToPack = true;
  }

//==============================================================================

  /* protected void setDefaultButton(MustButton newDefaultButton) {
    this.DefaultButton = newDefaultButton;
  } */

  protected MustTextField createTextField(String label, int length) {
    MustTextField[++countTextField] = new MustTextField(length);
    currentAttributeList.append(label, MustTextField[countTextField]);
    return MustTextField[countTextField];
  }

//------------------------------------------------------------------------------

  protected MustPasswordField createPasswordField(String label, int length) {
    MustPasswordField temp = new MustPasswordField(length);
    currentAttributeList.append(label, temp);
    return temp;
  }

//------------------------------------------------------------------------------

  protected MustDateField createDateField(String label) {
    MustDateField temp = new MustDateField();
    currentAttributeList.append(label, temp);
    return temp;
  }

//------------------------------------------------------------------------------

  protected MustCheckBox createCheckBox(String label) {
    MustCheckBox tempCheckBox = new MustCheckBox(label);
    return tempCheckBox;
  }

  protected MustCheckBox createCheckBox(String dataLabel, String lineLabel) {
    MustCheckBox temp = new MustCheckBox(dataLabel);
    currentAttributeList.append(lineLabel, temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  protected HalfDataComboBox createComboBox(String dataLabel, DataObject sourceDataObject, String visibleColumn) {
    HalfDataComboBox temp = new HalfDataComboBox(sourceDataObject, visibleColumn);
    currentAttributeList.append(dataLabel, temp);
    return(temp);
  }

  protected KeyButton appendKeyButton(Class<? extends DataTableAdministration> keyButtonClass, String territory) {
    if (GlobalInWuicStd.entitlement == null || GlobalInWuicStd.entitlement.isEditable(territory)) {
      KeyButton keyButton = KeyButton.create(keyButtonClass); 
      append(keyButton);
      return keyButton;
    } else return null;
  }
  
//------------------------------------------------------------------------------

  protected void append(String infoExtension) {
    currentAttributeList.append(infoExtension);
  }

  protected void append(JComponent component) {
    currentAttributeList.append(component);
  }

//------------------------------------------------------------------------------

  public void actionPerformed(ActionEvent e) {
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnOk")) {
      if (isInputAccepted()) {
        isCanceled = false;
        act();
        WinContr.getInstance().close(this);
      }
    } else if (actCommand.equals("BtnCancel")) {
      isCanceled = true;
      WinContr.getInstance().close(this);
    }
  }

  public void addCenterTabPanel(JPanel p, String tabLabel) {
    mustTabbedPane1.addScrollableTab(tabLabel, p);
    if (tabCount++ == 0) this.add(mustTabbedPane1, BorderLayout.CENTER);
   }

  public void windowClosing(WindowEvent e) {
    WinContr.getInstance().close(this);
  }

  @Override
  public boolean isClosingAllowed(int closeConfirmId) {
    return true;
  }

  public boolean isCanceled() {
    return isCanceled;
  }

  protected boolean isInputAccepted() {// to be overridden by child!
    return true;
  }

  protected abstract void act();

}

