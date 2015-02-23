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

import de.must.dataobj.*;
import de.must.util.KeyValuePair;
import de.must.util.KeyValuePairNum;

import javax.swing.*;

import java.awt.*;
import java.awt.event.*;
import java.util.Vector;

/**
 * Standard dialog to enter parameters and to start things after OK was pressed.
 * @author Christoph Mueller
 */
public abstract class ParameterDialog extends MustDialog implements WindowListener, ActionListener {

  protected boolean isCanceled;
  public static final int NEW_LINE = 0;
  public static final int STAY_IN_LINE = 1;
  protected MustTabbedPane mustTabbedPane1 = new MustTabbedPane();
  private int tabCount = 0;
  protected int countTab = -1;
  protected int countTextField = -1;
  protected Vector<AttributeList> tabAttributeList = new Vector<AttributeList>();
  protected AttributeList currentAttributeList;
  protected boolean isAttributeListToPack = false;
  protected JPanel panelBottom = new JPanel();
  protected JPanel panelButtons = new JPanel();
  protected MustStatusLabel statusLabel = new MustStatusLabel();
  protected MustButton buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), "BtnOk", this);
  protected MustButton buttonCancel = new MustButton(getTranslation("TEXT_CANCEL_BUTTON"), "BtnCancel", this);
  protected MustTextField[] MustTextField;
  protected JComponent lastComponent;

  public ParameterDialog() {
    this((Frame)null);
  }

  /**
   * Constructs a new parameter dialog.
   * @param ownerFrame the frame who owns the dialog
   */
  public ParameterDialog(Frame ownerFrame) {
    super(ownerFrame);
    construct();  }

  /**
   * Constructs a new parameter dialog.
   * @param ownerFrame the frame who owns the dialog
   */
  public ParameterDialog(JDialog ownerDialog) {
    super(ownerDialog);
    construct();
  }

  /**
   * 
   */
  protected void construct() {
    int sizeFactor = 20;
    MustTextField = new MustTextField[sizeFactor * 2];
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
    // ShortCutStd.addInterpreter(this); no shortcuts in dialogs!!!

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
    packAndLocateInCenterIfNotLaidOut();
    // generalActionEnding();
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
   *
   * @param centerPanel
   */
  protected void setCenterPanel(JPanel centerPanel) {
    JScrollPane scrollPane1 = new JScrollPane();
    getContentPane().add(scrollPane1, BorderLayout.CENTER);
    scrollPane1.getViewport().add(centerPanel);
  }

  /**
   * @deprecated not necessary any more.
   */
  protected void setTabSize(int size) {
  }

  /**
   * Creates a new panel with an attribute list.
   * @param lines not needed any more
   * @deprecated use newPanel() without lines
   */
  protected void newPanel(int lines) {
    newPanel();
  }
  
  public void newPanel() {
    JScrollPane scrollPane1 = new JScrollPane();
    getContentPane().add(scrollPane1, BorderLayout.CENTER);
    JPanel centerPanel = new JPanel();
    scrollPane1.getViewport().add(centerPanel);
    currentAttributeList = new AttributeList();
    centerPanel.add(currentAttributeList);
    isAttributeListToPack = true;
  }

  /**
   * Creates a new panel with an attribute list.
   * @param lines not needed any more
   * @deprecated use newPanel(tabLabel) without lines
   */
  protected void newPanel(String tabLabel, int lines) {
    newPanel(tabLabel);
  }
  
  protected void newPanel(String tabLabel) {
    countTab++;
    if (countTab == 0) {
      mustTabbedPane1 = new MustTabbedPane();
      getContentPane().add(mustTabbedPane1, BorderLayout.CENTER);
    }
    currentAttributeList = new AttributeList();
    tabAttributeList.add(currentAttributeList);
    mustTabbedPane1.addScrollableTab(tabLabel, currentAttributeList);
    isAttributeListToPack = true;
  }

//==============================================================================

  /* protected void setDefaultButton(MustButton newDefaultButton) {
    DefaultButton = newDefaultButton;
  } */

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
    MustTextArea temp = new MustTextArea(3, 60);
    switch (control) {
    case STAY_IN_LINE:
    currentAttributeList.append(temp);
      break;
    default:
      currentAttributeList.append(lineLabel, temp);
      break;
    }
    temp.getAccessibleContext().setAccessibleName(lineLabel);
    lastComponent = temp;
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
   * Creates a new text field in a new line
   * @param  label the label to show
   * @param  length the length of the field
   * @param  choiceContentDo  the data object containing valid items
   * @param  column the  name of the column containing the valid items 
   * @return  the created text field
   */
  protected MustTextField createTextField(String label, int length, DataObject choiceContentDo, String column) {
    MustTextField result = createTextField(label, length);
    new ChoiceManagerByDataObject(result, choiceContentDo, column);
    return result;
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
    MustTextField[++countTextField] = new MustTextField(length);
    switch (control) {
    case STAY_IN_LINE:
    currentAttributeList.append(MustTextField[countTextField]);
      break;
    default:
      currentAttributeList.append(lineLabel, MustTextField[countTextField]);
      break;
    }
    MustTextField[countTextField].getAccessibleContext().setAccessibleName(lineLabel);
    lastComponent = MustTextField[countTextField];
    return MustTextField[countTextField];
  }

//------------------------------------------------------------------------------

  protected MustPasswordField createPasswordField(String lineLabel, int length) {
    MustPasswordField temp = new MustPasswordField(length);
    currentAttributeList.append(lineLabel, temp);
    temp.getAccessibleContext().setAccessibleName(lineLabel);
    lastComponent = temp;
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a date input field
   * @param lineLabel the line label
   * @return the created date field
   */
  protected MustDateField createDateField(String lineLabel) {
    MustDateField temp = new MustDateField();
    currentAttributeList.append(lineLabel, temp);
    temp.getAccessibleContext().setAccessibleName(lineLabel);
    lastComponent = temp;
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a decimal input field
   * @param lineLabel the line label
   * @return the created decimal field
   */
  protected MustDecimalField createDecimalField(String lineLabel) {
    MustDecimalField temp = new MustDecimalField();
    currentAttributeList.append(lineLabel, temp);
    temp.getAccessibleContext().setAccessibleName(lineLabel);
    lastComponent = temp;
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a integer input field
   * @param lineLabel the line label
   * @return the created integer field
   */
  protected MustIntField createIntField(String lineLabel) {
    MustIntField temp = new MustIntField();
    currentAttributeList.append(lineLabel, temp);
    temp.getAccessibleContext().setAccessibleName(lineLabel);
    lastComponent = temp;
    return temp;
  }

  /**
   * Creates a integer input field in the same line.
   * @return the created integer field
   */
  protected MustIntField createIntField() {
    MustIntField temp = new MustIntField();
    currentAttributeList.append(temp);
    lastComponent = temp;
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a long input field
   * @param lineLabel the line label
   * @return the created long field
   */
  protected MustLongField createLongField(String lineLabel) {
    MustLongField temp = new MustLongField();
    currentAttributeList.append(lineLabel, temp);
    temp.getAccessibleContext().setAccessibleName(lineLabel);
    lastComponent = temp;
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a check box.
   * @param checkLabel the label of the check box
   * @return the created check box
   */
  protected MustCheckBox createCheckBox(String checkLabel) {
    MustCheckBox temp = new MustCheckBox(checkLabel);
    currentAttributeList.append(temp);
    temp.getAccessibleContext().setAccessibleName(checkLabel);
    lastComponent = temp;
    return temp;
  }

  /**
   * Creates a check box.
   * @param lineLabel the line label
   * @param checkLabel the label of the check box
   * @return the created check box
   */
  protected MustCheckBox createCheckBox(String lineLabel, String checkLabel) {
    MustCheckBox temp = new MustCheckBox(checkLabel);
    currentAttributeList.append(lineLabel, temp);
    temp.getAccessibleContext().setAccessibleName(checkLabel);
    lastComponent = temp;
    return(temp);
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
    HalfDataComboBox temp = new HalfDataComboBox(sourceDataObject, visibleColumn, orderByColumn, nameForNoChoice, -1);
    currentAttributeList.append(lineLabel, temp);
    temp.getAccessibleContext().setAccessibleName(lineLabel);
    lastComponent = temp;
    return(temp);
  }

  /**
   * Creates a variable choice.
   * @param label the label of the new line
   * @param content the static content of the variable choice
   * @return the created variable choice 
   */
  protected VariableChoice createChoice(String label, KeyValuePair[] content) {
    VariableChoice temp = new VariableChoice(content);
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    temp.getAccessibleContext().setAccessibleName(label);
    lastComponent = temp;
    return(temp);
  }

  protected VariableChoiceNumKey createChoice(String label, KeyValuePairNum[] content) {
    VariableChoiceNumKey temp = new VariableChoiceNumKey(content);
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    temp.getAccessibleContext().setAccessibleName(label);
    lastComponent = temp;
    return(temp);
  }
  
  protected VariableChoiceNumKey createChoice(KeyValuePairNum[] content) {
    VariableChoiceNumKey temp = new VariableChoiceNumKey(content);
    currentAttributeList.append(temp);
    lastComponent = temp;
    return(temp);
  }
  
  /**
   * Creates, registers and returns a DataPrinterChooser.
   * @param label the label of the new line
   * @param printingClass the printing class which is to be attributed
   * @return the created DataPrinterChooser
   * @deprecated use {@link ParameterDialogWithStorage#createPrinterChooser(String, Class, ParametersForPrinting)} instead
   */
  protected ParamPrinterChooser createDataPrinterChooser(String label, Class<? extends Object> printingClass, ParametersForPrinting parameters) {
    return createDataPrinterChooser(label, printingClass, parameters, new Vector<String>());
  }
  
  /**
   * Creates, registers and returns a DataPrinterChooser.
   * @param label the label of the new line
   * @param printingClass the printing class which is to be attributed
   * @param additionalPrinter additional (network) printer to offer
   * @return the created DataPrinterChooser
   */
  protected ParamPrinterChooser createDataPrinterChooser(String label, Class<? extends Object> printingClass, ParametersForPrinting parameters, Vector<String> additionalPrinter) {
    ParamPrinterChooser temp = new ParamPrinterChooser(parameters, printingClass, additionalPrinter);
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    temp.getAccessibleContext().setAccessibleName(label);
    // ?? chooser.add(temp);
    lastComponent = temp;
    return(temp);
  }

  protected DirectorySpecification createDirectorySpecification(String label, String defaultValue) {
    DirectorySpecification temp = new DirectorySpecification(ownerFrame, defaultValue);
    temp.getTextField().getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp.getTextField());
    append(temp.fileChooseButton);
    temp.getTextField().getAccessibleContext().setAccessibleName(label);
    lastComponent = temp.getTextField();
    return(temp);
  }
  
  protected FileSpecification createFileSpecification(String label, String defaultValue) {
    FileSpecification temp = new FileSpecification(ownerFrame, defaultValue);
    temp.getTextField().getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp.getTextField());
    append(temp.fileChooseButton);
    temp.getTextField().getAccessibleContext().setAccessibleName(label);
    lastComponent = temp.getTextField();
    return(temp);
  }
  
  //------------------------------------------------------------------------------

  protected void append(String infoExtension) {
    currentAttributeList.append(infoExtension);
  }

  protected void append(JComponent component) {
    currentAttributeList.append(component);
  }

//------------------------------------------------------------------------------

  /**
   * Sets the tool tip text of the last created data component.
   * @param toolTipText the tool tip text of the last created data component
   */
  protected void setToolTipText(String toolTipText) {
    lastComponent.setToolTipText(toolTipText);
  }

  /* (non-Javadoc)
   * @see java.awt.event.ActionListener#actionPerformed(java.awt.event.ActionEvent)
   */
  public final void actionPerformed(final ActionEvent e) {
    setMessage(""); //$NON-NLS-1$
    setCursor(waitCursor);
    SwingUtilities.invokeLater(new Runnable() {
      public void run() {
        perform(e); 
        setCursor(defaultCursor);
      }
    });
  }
  
  /**
   * Override to perform individual stuff.
   * @param e the ActionEvent to react on
   */
  protected void perform(ActionEvent e) {
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnOk")) {
      if (isInputAccepted()) {
        isCanceled = false;
        act();
        closeInstance();
      }
    } else if (actCommand.equals("BtnCancel")) {
      isCanceled = true;
      closeInstance();
    }
  }

  /**
   *
   * @param p
   * @param tabLabel
   */
  public void addCenterTabPanel(JPanel p, String tabLabel) {
    mustTabbedPane1.addScrollableTab(tabLabel, p);
    if (tabCount++ == 0) add(mustTabbedPane1, BorderLayout.CENTER);
   }

  @Override
  public void windowClosing(WindowEvent e) {
    closeInstance();
  }

  @Override
  public void windowClosed(WindowEvent e) {}

  @Override
  public void windowOpened(WindowEvent e) {}

  @Override
  public void windowActivated(WindowEvent e) {}

  @Override
  public void windowDeactivated(WindowEvent e) {}

  @Override
  public void windowIconified(WindowEvent e) {}

  @Override
  public void windowDeiconified(WindowEvent e) {}

  public void componentHidden(ComponentEvent e) {}
  public void componentShown(ComponentEvent e) {}
  public void componentMoved(ComponentEvent e) {
    WinContr.getInstance().saveProperties(this);
  }
  public void componentResized(ComponentEvent e) {
    WinContr.getInstance().saveProperties(this);
  }

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

  protected void setMessage(String message) {
    statusLabel.setStatus(message);
  }

  protected void setMessageToKeep(String messageToKeep) {
    statusLabel.setRemainStatus(messageToKeep);
  }

  protected abstract void act();
  
  protected void presentFailure(Exception e) {
    if (e != null) {
      StandardDialog.presentText(ownerFrame, new String[] {e.getMessage()});
    } else {
      StandardDialog.presentText(ownerFrame, new String[] {getTranslation("TEXT_ACTION_FAILED")});
    }

  }

}
