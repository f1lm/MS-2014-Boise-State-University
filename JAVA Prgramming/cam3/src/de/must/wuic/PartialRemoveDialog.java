/*
 * Copyright (c) 1999-2009 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.DataObject;
import de.must.dataobj.Identifier;

import java.awt.*;
import java.awt.event.*;

/**
 * Standard dialog to enter parameters and to start things after OK was pressed.
 * @author Christoph Mueller
 */
public abstract class PartialRemoveDialog extends MustDialog implements WindowListener, ActionListener {

  protected DataObject assignedDataObject;
  protected AttributeList currentAttributeList;
  protected Identifier[] identifiers;
  protected MustCheckBox[] delCheckBoxes;
  protected int counter;
  protected JPanel panelBottom = new JPanel();
  protected JPanel panelButtons = new JPanel();
  protected MustStatusLabel statusLabel = new MustStatusLabel();
  protected MustButton buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), "BtnOk", this);
  protected MustButton buttonCancel = new MustButton(getTranslation("TEXT_CANCEL_BUTTON"), "BtnCancel", this);

  /**
   * Constructs a new parameter dialog.
   * @param ownerFrame the frame who owns the dialog
   */
  public PartialRemoveDialog(Frame ownerFrame) {
    super(ownerFrame);
  }

  /**
   * Constructs a new parameter dialog.
   * @param ownerFrame the frame who owns the dialog
   */
  public PartialRemoveDialog(JDialog ownerDialog) {
    super(ownerDialog);
  }

  /**
   * Does the real construction work after total initialization. Must be called in sublcass constructor.
   * Thus, this super class can manage all standard stuff after assignments in the subclass constructor are done.
   */
  protected void construct() {
    assignedDataObject = getAssignedDataObject();
    assignedDataObject.select("*", getWhereCondition());
    counter = 0;
    while(assignedDataObject.nextRow()) {
      counter++;
    }
    assignedDataObject.closeQuery();
    currentAttributeList = new AttributeList();
    identifiers = new Identifier[counter];
    delCheckBoxes = new MustCheckBox[counter];
    addWindowListener(this);
    getContentPane().setLayout(new BorderLayout());
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(panelButtons, BorderLayout.CENTER);
    buttonOk.setPreferredWidth(70);
    panelButtons.add(buttonOk);
    panelButtons.add(buttonCancel);
    panelBottom.add(statusLabel, BorderLayout.SOUTH);
    buttonOk.setDefaultCapable(true);
    getRootPane().setDefaultButton(buttonOk);
    assignedDataObject.select("*", getWhereCondition());
    int i = -1;
    while(assignedDataObject.nextRow()) {
      i++;
      identifiers[i] = assignedDataObject.getIdentifier();
      delCheckBoxes[i] = new MustCheckBox(getTranslation("TEXT_REMOVE"));
      currentAttributeList.append(getLineInfo(), delCheckBoxes[i]);
    }
    assignedDataObject.closeQuery();
    JScrollPane scrollPane = new JScrollPane(currentAttributeList);
    getContentPane().add(scrollPane, BorderLayout.CENTER);
    getContentPane().add(panelBottom, BorderLayout.SOUTH);
    packAndLocateInCenterIfNotLaidOut();
  }

//------------------------------------------------------------------------------

  /**
   * Adds a help button to the panel.
   * @param topic the associated topic of the help context
   */
  protected void addHelpButton(String topic) {
    panelButtons.add(new HelpButton(getLocale(), topic));
    setHelpContext(topic);
  }

  /**
   * Adds a help button to the panel.
   * @param topic the associated topic of the help context
   * @param subTopic the associated sub topic of the help context
   */
  protected void addHelpButton(String topic, String subTopic) {
    panelButtons.add(new HelpButton(getLocale(), topic, subTopic));
    setHelpContext(topic, subTopic);
  }
  
  /**
   * Returns the assigned (main) DataObject.
   * @return the assigned (main) DataObject
   */
  protected abstract DataObject getAssignedDataObject();

  /**
   * Returns the where condition to select data from assigned DataObject.
   * @return the where condition to select data from assigned DataObject
   */
  protected abstract String getWhereCondition();
  
  /**
   * Returns the info to be displayed on the left of the remove checkbox.
   * @return the info to be displayed on the left of the remove checkbox
   */
  protected abstract String getLineInfo();

  /**
   * Returns true if user input is accepted - override this method to check user input.
   * @return true if user input is accepted
   */
  protected boolean isInputAccepted() {
    return true;
  }

  /**
   *
   * @param message
   */
  protected void setMessage(String message) {
    statusLabel.setStatus(message);
  }

  /**
   *
   * @param messageToKeep
   */
  protected void setMessageToKeep(String messageToKeep) {
    statusLabel.setRemainStatus(messageToKeep);
  }

  /**
   *
   * @param e
   */
  public void actionPerformed(ActionEvent e) {
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnOk")) {
      if (isInputAccepted()) {
        act();
        closeInstance();
      }
    } else if (actCommand.equals("BtnCancel")) {
      closeInstance();
    }
  }
  
  protected void act() {
    for (int i = 0; i < delCheckBoxes.length; i++) {
      if (delCheckBoxes[i].isSelected()) {
        assignedDataObject.delete(identifiers[i]);
      }
    }
  }
  
}
