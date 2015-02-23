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

import de.must.applet.Constants;
import de.must.dataobj.DataObject;
import de.must.util.KeyValuePairNum;

/**
 * Standard dialog to enter parameters and to start things after OK was pressed.
 * @author Christoph Mueller
 */
public abstract class ParameterDialog extends PropertyAdministration {

  private DialogConsequence dialogConsequence;
  protected boolean isCanceled;
  public static final int NEW_LINE = 0;
  public static final int STAY_IN_LINE = 1;
//  protected MustTabbedPane mustTabbedPane1 = new MustTabbedPane();
  private int tabCount = 0;
  protected int countTab = -1;
  protected int countTextField = -1;
  protected boolean isAttributeListToPack = false;
  protected MustButton buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"));
  protected MustButton buttonCancel = new MustButton(getTranslation("TEXT_CANCEL_BUTTON"));
  protected RemoteElement lastComponent;
  protected boolean veto = false;
  protected boolean toTerminate = false;

  public ParameterDialog(SessionData sessionData, String tabIdAndLabel) {
    this(sessionData, tabIdAndLabel, (DialogConsequence)null);
  }
  
  public ParameterDialog(SessionData sessionData, final String tabIdAndLabel, DialogConsequence dialogConsequence) {
    this(sessionData, new ContextInfo() {
      public String getTabLabel() { return tabIdAndLabel; }
      public String getTabId() { return tabIdAndLabel; }
      public String getConcerning() { return Constants.DIALOG_FOR_PROPERTIES; }
    }, dialogConsequence);
  }
  
  public ParameterDialog(SessionData sessionData, ContextInfo contextInfo) {
    this(sessionData, contextInfo, null);
  }
  
  public ParameterDialog(SessionData sessionData, ContextInfo contextInfo, DialogConsequence dialogConsequence) {
    super(sessionData, contextInfo);
    this.dialogConsequence = dialogConsequence;
    setAppellation(contextInfo.getTabLabel());
    sessionData.currentDialog = this;
  }
  
  /**
   * Conclusion of the construction process. Allows to do construction details
   * in the sequence "super class" - "this" - "super class", which is a benefit 
   * for easy layout.
   */
  protected void creationEnding() {
    // generalActionEnding();
  }

//------------------------------------------------------------------------------

//  /**
//   * Adds a help button to the panel.
//   * @param topic the associated topic of the help context
//   */
//  protected void addHelpButton(String topic) {
//    panelButtons.add(new HelpButton(getLocale(), topic));
//    setHelpContext(topic);
//  }
//
//  /**
//   * Adds a help button to the panel.
//   * @param topic the associated topic of the help context
//   * @param subTopic the associated sub topic of the help context
//   */
//  protected void addHelpButton(String topic, String subTopic) {
//    panelButtons.add(new HelpButton(getLocale(), topic, subTopic));
//    setHelpContext(topic, subTopic);
//  }

//  /**
//   * Creates a new panel with an attribute list.
//   * @param lines not needed any more
//   * @deprecated use newPanel() without lines
//   */
//  protected void newPanel(int lines) {
//    newPanel();
//  }
  
  public void newPanel() {
    currentAttributeList = new AttributeList(sessionData);
//    centerPanel.add(currentAttributeList);
    isAttributeListToPack = true;
  }

//  /**
//   * Creates a new panel with an attribute list.
//   * @param lines not needed any more
//   * @deprecated use newPanel(tabLabel) without lines
//   */
//  protected void newPanel(String tabLabel, int lines) {
//    newPanel(tabLabel);
//  }
//  
//  protected void newPanel(String tabLabel) {
//    countTab++;
//    if (countTab == 0) {
//      mustTabbedPane1 = new MustTabbedPane();
//      getContentPane().add(mustTabbedPane1, BorderLayout.CENTER);
//    }
//    currentAttributeList = new AttributeList();
//    tabAttributeList.add(currentAttributeList);
//    mustTabbedPane1.addScrollableTab(tabLabel, currentAttributeList);
//    isAttributeListToPack = true;
//  }
//
////==============================================================================
//
//  /* protected void setDefaultButton(MustButton newDefaultButton) {
//    DefaultButton = newDefaultButton;
//  } */
//
  /**
   * Creates a new text field in a new line
   * @param label the label to show
   * @return the created text field
   */
  protected MustTextArea createTextArea(String label) {
    return createTextArea(label, NEW_LINE);
  }

  /**
   * Creates a new text field
   * @param lineLabel the line label
   * @param length the length of the text field
   * @param control controls line wrap
   * @return the created text field
   */
  protected MustTextArea createTextArea(String lineLabel, int control) {
    MustTextArea temp = new MustTextArea(sessionData, 3, 50, 254);
    switch (control) {
    case STAY_IN_LINE:
    currentAttributeList.append(temp);
      break;
    default:
      currentAttributeList.append(lineLabel, temp);
      break;
    }
    lastComponent = temp;
    register(temp);
    return temp;
  }

  /**
   * Creates a new text field in a new line
   * @param label the label to show
   * @param length the length of the field
   * @return the created text field
   */
  protected MustTextField createTextField(String label, int length) {
    return createTextField(label, length, NEW_LINE);
  }

  /**
   * Creates a new text field in the same line
   * @param length the length of the field
   * @return the created text field
   */
  protected MustTextField createTextField(int length) {
    return createTextField(null, length, STAY_IN_LINE);
  }

  /**
   * Creates a new text field
   * @param lineLabel the line label
   * @param length the length of the text field
   * @param control controls line wrap
   * @return the created text field
   */
  protected MustTextField createTextField(String lineLabel, int length, int control) {
    MustTextField result = new MustTextField(sessionData, length);
    switch (control) {
    case STAY_IN_LINE:
    currentAttributeList.append(result);
      break;
    default:
      currentAttributeList.append(lineLabel, result);
      break;
    }
//    MustTextField[countTextField].getAccessibleContext().setAccessibleName(lineLabel);
//    lastComponent = MustTextField[countTextField];
    register(result);
    return result;
  }

//------------------------------------------------------------------------------

  protected TextPresenter createTextPresenter() {
    TextPresenter result = new TextPresenter(sessionData);
    currentAttributeList.append(result);
    register(result);
    return result;
  }
  
//------------------------------------------------------------------------------

  protected MustPasswordField createPasswordField(String lineLabel, int length) {
    MustPasswordField temp = new MustPasswordField(sessionData, length);
    currentAttributeList.append(lineLabel, temp);
    // temp.getAccessibleContext().setAccessibleName(lineLabel);
    lastComponent = temp;
    register(temp);
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a date input field
   * @param lineLabel the line label
   * @return the created date field
   */
  protected MustDateField createDateField(String lineLabel) {
    MustDateField result = new MustDateField(sessionData);
    currentAttributeList.append(lineLabel, result);
    // temp.getAccessibleContext().setAccessibleName(lineLabel);
    lastComponent = result;
    register(result);
    return result;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a decimal input field
   * @param lineLabel the line label
   * @return the created decimal field
   */
  protected MustDecimalField createDecimalField(String lineLabel) {
    MustDecimalField temp = new MustDecimalField(sessionData);
    currentAttributeList.append(lineLabel, temp);
    // temp.getAccessibleContext().setAccessibleName(lineLabel);
    lastComponent = temp;
    register(temp);
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a integer input field
   * @param lineLabel the line label
   * @return the created integer field
   */
  protected MustIntField createIntField(String lineLabel) {
    MustIntField temp = new MustIntField(sessionData);
    currentAttributeList.append(lineLabel, temp);
    // temp.getAccessibleContext().setAccessibleName(lineLabel);
    lastComponent = temp;
    register(temp);
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a long input field
   * @param lineLabel the line label
   * @return the created long field
   */
  protected MustLongField createLongField(String lineLabel) {
    MustLongField temp = new MustLongField(sessionData);
    currentAttributeList.append(lineLabel, temp);
    // temp.getAccessibleContext().setAccessibleName(lineLabel);
    lastComponent = temp;
    register(temp);
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a check box.
   * @param checkLabel the label of the check box
   * @return the created check box
   */
  protected MustCheckBox createCheckBox(String checkLabel) {
    MustCheckBox temp = new MustCheckBox(sessionData, checkLabel);
    currentAttributeList.append(temp);
    // temp.getAccessibleContext().setAccessibleName(checkLabel);
    lastComponent = temp;
    register(temp);
    return temp;
  }

  /**
   * Creates a check box.
   * @param lineLabel the line label
   * @param checkLabel the label of the check box
   * @return the created check box
   */
  protected MustCheckBox createCheckBox(String lineLabel, String checkLabel) {
    MustCheckBox temp = new MustCheckBox(sessionData, checkLabel);
    currentAttributeList.append(lineLabel, temp);
    // temp.getAccessibleContext().setAccessibleName(checkLabel);
    lastComponent = temp;
    register(temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  protected RadioButtonPanel createRadioButtons(String lineLabel, String[] keys, String[] labels) {
    RadioButtonPanel temp = new RadioButtonPanel(sessionData, keys, labels);
    currentAttributeList.append(lineLabel, temp);
    // temp.getAccessibleContext().setAccessibleName(checkLabel);
    lastComponent = temp;
    register(temp);
    return temp;
  }
  
  protected RadioButtonPanel createRadioButtons(String[] keys, String[] labels) {
    RadioButtonPanel temp = new RadioButtonPanel(sessionData, keys, labels);
    currentAttributeList.append(temp);
    // temp.getAccessibleContext().setAccessibleName(checkLabel);
    lastComponent = temp;
    register(temp);
    return temp;
  }
  
//------------------------------------------------------------------------------

  /**
   *
   * @param lineLabel
   * @param sourceDataObject
   * @param visibleColumn
   * @return
   */
  protected HalfDataComboBox createComboBox(String lineLabel, DataObject sourceDataObject, String visibleColumn) {
    return createComboBox(lineLabel, sourceDataObject, visibleColumn, visibleColumn);
  }

  /**
   *
   * @param lineLabel
   * @param sourceDataObject
   * @param visibleColumn
   * @param orderByColumn
   * @return
   */
  protected HalfDataComboBox createComboBox(String lineLabel, DataObject sourceDataObject, String visibleColumn, String orderByColumn) {
    return createComboBox(lineLabel, sourceDataObject, visibleColumn, orderByColumn, "<alle>");
  }

  /**
   *
   * @param lineLabel
   * @param sourceDataObject
   * @param visibleColumn
   * @param orderByColumn
   * @param nameForNoChoice
   * @return
   */
  protected HalfDataComboBox createComboBox(String lineLabel, DataObject sourceDataObject, String visibleColumn, String orderByColumn, String nameForNoChoice) {
    HalfDataComboBox temp = new HalfDataComboBox(sessionData, sourceDataObject, visibleColumn, orderByColumn, nameForNoChoice, -1);
    currentAttributeList.append(lineLabel, temp);
    // temp.getAccessibleContext().setAccessibleName(lineLabel);
    lastComponent = temp;
    register(temp);
    return(temp);
  }

  /**
   * Creates a variable choice.
   * @param label the label of the new line
   * @param content the static content of the variable choice
   * @return the created variable choice 
   */
  protected VariableChoice createChoice(String label, de.must.util.KeyValuePair[] content) {
  	VariableChoice temp = new VariableChoice(sessionData, content);
    currentAttributeList.append(label, temp);
    // temp.getAccessibleContext().setAccessibleName(label);
    lastComponent = temp;
    register(temp);
    return(temp);
  }

  protected VariableChoiceNumKey createChoice(String label, KeyValuePairNum[] content) {
    VariableChoiceNumKey temp = new VariableChoiceNumKey(sessionData, content);
    currentAttributeList.append(label, temp);
    // temp.getAccessibleContext().setAccessibleName(label);
    lastComponent = temp;
    register(temp);
    return(temp);
  }
  
  protected VariableChoiceNumKey createChoice(KeyValuePairNum[] content) {
    VariableChoiceNumKey temp = new VariableChoiceNumKey(sessionData, content);
    currentAttributeList.append(temp);
    lastComponent = temp;
    register(temp);
    return(temp);
  }
  
//  /**
//   * Creates, registers and returns a DataPrinterChooser.
//   * @param label the label of the new line
//   * @param printingClass the printing class which is to be attributed
//   * @return the created DataPrinterChooser
//   * @deprecated use {@link ParameterDialogWithStorage#createPrinterChooser(String, Class, ParametersForPrinting)} instead
//   */
//  protected ParamPrinterChooser createDataPrinterChooser(String label, Class<? extends Object> printingClass, ParametersForPrinting parameters) {
//    ParamPrinterChooser temp = new ParamPrinterChooser(parameters, printingClass);
//    temp.getAccessibleContext().setAccessibleName(label);
//    currentAttributeList.append(label, temp);
//    temp.getAccessibleContext().setAccessibleName(label);
//    // ?? chooser.add(temp);
//    lastComponent = temp;
//    register(temp);
//    return(temp);
//  }

  //------------------------------------------------------------------------------

  protected void register(RemoteContent remoteContent) {
    remoteContents.add(remoteContent);
  }
  
  protected void append(String infoExtension) {
//    currentAttributeList.append(infoExtension);
  }

//------------------------------------------------------------------------------

  /**
   * Sets the tool tip text of the last created data component.
   * @param toolTipText the tool tip text of the last created data component
   */
  public void setToolTipText(String toolTipText) {
    lastComponent.setToolTipText(toolTipText);
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    if (toTerminate) {
      sessionData.currentDialog = null;
    } else {
      out.sendConcerning(getConcerning());
      if (veto) {
        out.sendVeto(messageToKeep);
      } else {
        out.sendTitle(getTabLabel());
        isToRenew = true;
      }
      super.buildRemoteView(out);
    }
  }
  
  @Override
  public void process(GeneralizedRequest request) {
    if (Constants.ACTION_OK.equals(sessionData.action)) {
      if (isInputAccepted()) {
        toTerminate = true;
        veto = false;
        act();
        if (!veto && dialogConsequence != null) {
          dialogConsequence.callAfterDialogContinuation(dialogConsequence.new Result());
        }
      } else {
        veto = true; 
      }
    } else if (Constants.ACTION_CANCEL.equals(sessionData.action)) {
      toTerminate = true;
    } else {
      super.process(request);
    }
  }
  
  /**
   *
   * @return
   */
  public boolean isCanceled() {
    return isCanceled;
  }

  /**
   * Returns true if user input is accepted - override this method to check user input.
   * @return true if user input is accepted
   */
  protected boolean isInputAccepted() {
    return true;
  }

  /**
   *
   */
  protected abstract void act();
  
  protected void presentFailure(Exception e) {
//    if (e != null) {
//      StandardDialog.presentText(ownerFrame, new String[] {e.getMessage()});
//    } else {
//      StandardDialog.presentText(ownerFrame, new String[] {getTranslation("TEXT_ACTION_FAILED")});
//    }
  }

}
