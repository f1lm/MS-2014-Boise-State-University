/*
 * Copyright (c) 2011 Christoph Mueller. All rights reserved.
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

import java.awt.event.*;
import java.util.Iterator;
import java.util.Vector;

import de.must.applet.Constants;
import de.must.appletserver.TabButtonGroup.TabButton;
import de.must.print.DataPropertyPrint;

/**
 * Frame to present data in a two column table with label and info columns.
 * @author Christoph Mueller
 */
public abstract class Presentation extends RemoteUserInterface {

  private TabButtonGroup tabButtonGroup;
  protected Vector<AttributeList> attributeLists;
  protected AttributeList currentAttributeList;
  protected Vector<MustButton> additionalButtons;
  protected MustButton buttonPrint;

  /**
   * Constructs a new presentation class
   */
  public Presentation(SessionData sessionData, ContextInfo contextInfo) {
    super(sessionData, contextInfo);
    additionalButtons = new Vector<MustButton>();
    reset();
    setVisible(true);
//    buttonPrint = MustButton.create("Print24.gif", "Pri", getTranslation("TEXT_PRINTS_SELECTED_ENTRY"), "BtnPrint", this);
//    if (getPrintClass() != null) panelButtons.add(buttonPrint);
    generalActionEnding();
  }
  
  protected void reset() {
    tabButtonGroup = new TabButtonGroup();
    attributeLists = new Vector<AttributeList>();
    currentAttributeList = new AttributeList(sessionData);
    attributeLists.add(currentAttributeList);
  }

  /**
   * Appends an attribute after suppressing strings for zero values.
   * @param label the label of the new line
   * @param value the attribute value to be displayed
   */
  public void append(String label, String value) {
    if (value != null && !value.trim().equals("") && !value.trim().equals("/") && !value.equals("0") && !value.equals("0,00")) {
      Label tp = new Label(sessionData, value);
      remoteContents.add(tp);
      currentAttributeList.append(label, tp);
    }
  }
  
//  public void appendInternetLink(String label, String link) {
//    if (!link.trim().equals("")) currentAttributeList.append(label, new InternetLink(link));
//  }
  
  protected InsertedButton addButton(String label) {
    return addButton(label, -1);
  }
  
  protected InsertedButton addButton(String label, int index) {
    InsertedButton result = new InsertedButton(label, index);
    additionalButtons.add(result);
    return result;
  }
  
  protected InsertedButton addButton(String imageName, String fallbackLabel, int index) {
    InsertedButton result = new InsertedButton(imageName, fallbackLabel, index);
    additionalButtons.add(result);
    return result;
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

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.println(Constants.CONCERNING_SUBLEVEL1_BEGIN_TAG + Constants.PRESENTATION + Constants.CONCERNING_SUBLEVEL1_END_TAG);
    if (isVisible()) {
      out.sendClearCommand();
      if (tabButtonGroup.tabButtons.size() > 0) {
        Iterator<TabButton> iterator1 = tabButtonGroup.tabButtons.iterator();
        Iterator<AttributeList> iterator2 = attributeLists.iterator();
        while (iterator1.hasNext()) {
          TabButtonGroup.TabButton tabButton = iterator1.next();
          tabButton.buildRemoteView(out);
          iterator2.next().buildRemoteView(out);
        }
      } else {
        attributeLists.firstElement().buildRemoteView(out);
      }
      if (!buildDone) for (MustButton additionalButton : additionalButtons) {
        additionalButton.buildRemoteView(out);
      }
      buildDone = true;
    }
    super.buildRemoteView(out);
  }

  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    super.fetchValuesFromRequest(request);
    if (sessionData.action != null) {
      Iterator<MustButton> iterator2 = additionalButtons.iterator();
      while (iterator2.hasNext()) {
        MustButton additionalButton = iterator2.next();
        if (additionalButton.getActionID().equals(sessionData.action)) {
          additionalButton.performAction();
        }
      }
    }
  }

  /**
   * Controls action events like button pressed.
   * @param e the action event to be interpreted
   */
  public void actionPerformed(ActionEvent e) {
    generalActionBeginnung();
    String actCommand = e.getActionCommand();
    if (actCommand.equals(Constants.ACTION_OK)) {
      okButtonAction();
    } else if (actCommand.equals("BtnPrint")) {
      printButtonAction();
    }
    generalActionEnding();
  }

  /**
   * The task to be done associated with the OK button.
   */
  protected void okButtonAction() {
//    closeInstance();
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
//    statusLabel.stopAnimation();
//    statusLabel.reset();
  }

  /**
   * Concludes things after an action ended like resetting the status label to
   * its default value.
   */
  protected void generalActionEnding() {
//    statusLabel.resetDefault();
  }

  /**
   * Sets the message to be read by the user, it is not reset by
   * generalActionEnding when action completed. Thus, the user is able to notify
   * the message without pressing a confirmation button.
   * @param message the message for the user
   */
  protected void setMessageToKeep(String message) {
    sessionData.nextOutputs.add(Constants.ACTION_BEGIN_TAG);
    sessionData.nextOutputs.add(Constants.TODO_TAG_BEGIN + Constants.SET_MESSAGE_TO_KEEP + Constants.TODO_TAG_END);
    sessionData.nextOutputs.add(Constants.VALUE_TAG_BEGIN + message + Constants.VALUE_TAG_END);
    sessionData.nextOutputs.add(Constants.ACTION_END_TAG);
  }

  /**
   * Returns true because closing is always allowed here.
   * @return true because closing is always allowed here
   */
  public boolean isClosingAllowed() {
    return true;
  }

}
