/*
 * Copyright (c) 1999-2011 Christoph Mueller. All rights reserved.
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

import de.must.print.DataPropertyPrint;

import java.awt.*;
import java.awt.event.*;

/**
 * Frame to present data in a two column table with label and info columns.
 * @author Christoph Mueller
 */
public abstract class Presentation extends MustFrame implements ActionListener {

  protected JScrollPane centerScrollPane = new JScrollPane();
  protected JPanel centerPanel = new JPanel(); // do not spread our central attribute list
  protected AttributeList currentAttributeList;
  protected boolean isAttributeListToPack = false;
  protected boolean alreadyPackedOnce;
  private JPanel panelBottom = new JPanel();
  protected JPanel panelButtons = new JPanel();
  protected MustButton buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), "BtnOk", this);
  protected MustButton buttonPrint;
  private MustStatusLabel statusLabel = new MustStatusLabel();
  protected DataPropertyPrint printInstance;

  /**
   * Constructs a new presentation class
   */
  public Presentation() {
    setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE); // to consider the isClosingAllowed() aspect
    getContentPane().setLayout(new BorderLayout());
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(panelButtons, BorderLayout.NORTH);
    buttonOk.setPreferredWidth(70);
    panelButtons.add(buttonOk);
    buttonPrint = MustButton.create("Print24.gif", "Pri", getTranslation("TEXT_PRINTS_SELECTED_ENTRY"), "BtnPrint", this);
    if (getPrintClass() != null) panelButtons.add(buttonPrint);
    panelBottom.add(statusLabel, BorderLayout.SOUTH);
    centerPanel.setLayout(new FlowLayout(FlowLayout.LEFT));
    centerScrollPane.getViewport().add(centerPanel);
    getContentPane().add(centerScrollPane, BorderLayout.CENTER);
    getContentPane().add(panelBottom, BorderLayout.SOUTH);
    if (!isLaidOut()) {
      setLocation(250, 110);
    }
    packIfNotLaidOut();
    getRootPane().setDefaultButton(buttonOk);
    ShortCutStd.addInterpreter(this);
    generalActionEnding();
  }

  /**
   * Appends an attribute after suppressing strings for zero values.
   * @param label the label of the new line
   * @param value the attribute value to be displayed
   */
  public void append(String label, String value) {
    if (value != null && !value.trim().equals("") && !value.trim().equals("/") && !value.equals("0") && !value.equals("0,00")) currentAttributeList.append(label, value);
  }
  
  public void appendInternetLink(String label, String link) {
    if (!link.trim().equals("")) currentAttributeList.append(label, new InternetLink(link));
  }
  
  /**
   * Not needed any longer.
   */
  protected void creationEnding() {
    // To get a proper requestFocus for the first time, it seems to be helpful
    // to do add panelBottom at the end of creation
  }

  /**
   * Returns the print class - to be overridden by child if print class is available!
   * @return the print class
   */
  protected Class<? extends DataPropertyPrint> getPrintClass() {return null;}

  /**
   * Controls action events like button pressed.
   * @param e the action event to be interpreted
   */
  public void actionPerformed(ActionEvent e) {
    generalActionBeginnung();
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnOk")) {
      okButtonAction();
    } else if (actCommand.equals("BtnPrint")) {
      printButtonAction();
    }
    generalActionEnding();
  }

  @Override
  public void setVisible(boolean b) {
    getRootPane().setDefaultButton(buttonOk); // workaround: don't know why it is lost at 2nd presentation!
    super.setVisible(b);
  }
  
  /**
   * The task to be done associated with the OK button.
   */
  protected void okButtonAction() {
    closeInstance();
  }

  /**
   * The task to be done associated with the print button.
   */
  protected void printButtonAction() {
    // for now, this is implemented in DataPresentation only.
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
   * Sets the message to be read by the user, it is not reseted by
   * generalActionEnding when action completed. Thus, the user is able to notify
   * the message without pressing a confirmation button.
   * @param messageToKeep the message for the user
   */
  protected void setMessageToKeep(String messageToKeep) {
    statusLabel.setRemainStatus(messageToKeep);
  }

  @Override
  public boolean isClosingAllowed(int closeConfirmId) {
    return true;
  }

}
