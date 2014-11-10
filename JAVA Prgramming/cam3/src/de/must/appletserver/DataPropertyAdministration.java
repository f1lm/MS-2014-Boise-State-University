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

import java.util.Iterator;
import java.util.Vector;

import de.must.applet.Constants;
import de.must.dataobj.*;
import de.must.util.KeyValuePair;

/**
 * Frame-like container to enclose input-output fields like text fields with
 * database field association and controlling load and save actions.
 * Used for property administration of a single database record.
 * It is meant to contain several storables like e.g. DataTextField
 * @author Christoph Mueller
 */
public abstract class DataPropertyAdministration extends PropertyAdministration {

  public static final int NEW_LINE = 0;
  public static final int STAY_IN_LINE = 1;
  
  public static final int MODE_VIRGIN = 0;
  public static final int MODE_NEW = 1;
  public static final int MODE_PROPERTY = 2;
  public static final int MODE_COPY = 3;

  private SearchListDetailGroup group;
  private int administrationMode = MODE_PROPERTY;

  private int numberOfDataObjects = 0;
  protected DataObject[] dataObjects;
  private DataObject mainDataObject;
  private DataObject duplicateCheckDataObject;
  private DataObject currentDataObject;
  private String frameTitleNew = getTranslation("TEXT_NEW_ENTRY");
  private MustTextField uniqueStringIdentifyDataComponent;
  private DataTextComponent[] frameUpdateTitleFields;
  private Vector<DataList> subLists = new Vector<DataList>(1);
  protected DataList currentSelectionList;
  protected MustButton btnSubOk;
  protected MustButton btnSubDel; 
  protected MustButton btnSubNew; 
  private Vector<Identifier> identifiers;
  private Identifier lastRevisionIdentifier = null;
  private boolean firstLoad;
  private Vector<Storable> storableComponents;
  private boolean uploadFunctionality = false;
  protected boolean inUse;
  private Identifier pendingIdentifierToDelete;

  /**
   * Constructs a new data property administration.
   * @param sessionData the session's public data
   */
  public DataPropertyAdministration(SessionData sessionData, final SearchListDetailGroup group) {
    this(null, sessionData, group);
  }

  /**
   * Constructs a new data property administration.
   * @param mainDataObject the data object that is to be used mainly
   * @param sessionData the session's public data
   */
  public DataPropertyAdministration(DataObject mainDataObject, SessionData sessionData, final SearchListDetailGroup group) {
    super(sessionData, new ContextInfo() {
      public String getTabLabel() { return group.getTabLabel(); }
      public String getTabId() { return group.getTabId(); }
      public String getConcerning() { return group.getConcerning(); }
    });
    this.group = group;
    dataObjects = new DataObject[5];
    if (mainDataObject != null) setMainDataObject(mainDataObject);
    storableComponents = new Vector<Storable>();
    sessionData.currentConcerningSubLevel = Constants.DETAIL;
  }

  /**
   * Sets the main data object and calls new row to get column length via meta data.
   * @param dataObject the data object that is to be used mainly
   */
  public void setMainDataObject(DataObject dataObject) {
    this.mainDataObject = dataObject;
    dataObjects[0] = dataObject;
    currentDataObject = dataObject;
    mainDataObject.newRow(); // to get column length via meta data
  }

  /**
   * Adds a data object to the available data objects and sets the pointer to
   * the new data object. Following createXy methods will use this data object.
   * @param newDataObject the new data object
   */
  protected void setNextDataObject(DataObject newDataObject) {
    dataObjects[++numberOfDataObjects] = newDataObject;
    currentDataObject = newDataObject;
    currentDataObject.newRow();
  }

  /**
   * Sets the data object for automatic duplicates check.
   * @param newDuplicateCheckDataObject the data object for duplicates check
   */
  protected void setDuplicateCheckDataObject(DataObject newDuplicateCheckDataObject) {
    duplicateCheckDataObject = newDuplicateCheckDataObject;
  }

  /**
   * Sets the component which represents the unique identifier (primary key) of
   * the administered entity.
   * @param newUniqueStringIdentifyDataComponent the component which represents the unique identifier
   */
  protected void setUniqueStringIdentifyDataComponent(MustTextField newUniqueStringIdentifyDataComponent) {
    uniqueStringIdentifyDataComponent = newUniqueStringIdentifyDataComponent;
  }

  protected void newPanel(String tabLabel, DataList selectionList) {
    currentAttributeList = new AttributeList(sessionData);
    currentSelectionList = selectionList;
    registerStorable(selectionList);
    currentAttributeList.append(selectionList);
    tabButtonGroup.addButton(tabLabel, currentAttributeList);
    subLists.add(selectionList);
    selectionList.setDataComponents(storableComponents);
    btnSubOk = new MustButton(getTranslation("TEXT_APPLY_BUTTON"), MustButton.TYPE_IN_SEQUENCE);
    btnSubOk.setToolTipText(getTranslation("TEXT_SAVE_AND_KEEP_WINDOW_OPEN"));
    currentAttributeList.append("", btnSubOk);
    // unlockSublist();
//    currentSelectionList.addListSelectionListener(new ListSelectionListener() {
//      public void valueChanged(ListSelectionEvent e) {
//        btnSubDel.setEnabled(currentSelectionList.getSelectedIndex() != -1 && currentSelectionList.getSelectedIdentifier() != null && currentSelectionList.getSelectedIdentifier().getIntIdentifier() != -1);
//      }
//    });
    btnSubDel = new MustButton(getTranslation("TEXT_BUTTON_DELETE"), MustButton.TYPE_IN_SEQUENCE);
    currentAttributeList.append(btnSubDel);
    btnSubNew = new MustButton(getTranslation("TEXT_NEW_ENTRY"), MustButton.TYPE_IN_SEQUENCE);
    currentAttributeList.append(btnSubNew);
  }
  
  /**
   * Creates a new panel and adds it to the tabbed pane with a centered text area
   * for full frame editing.
   * @param tabLabel the label of the new tab
   * @param centerTextArea the text area for full frame editing
   */
  protected void newPanel(String tabLabel, DataTextArea centerTextArea) {
    tabButtonGroup.addButton(tabLabel, centerTextArea);
    registerStorable(centerTextArea);
  }
  
//------------------------------------------------------------------------------

  /**
   * Creates a database connected text input field in the same line as previously used.
   * @param columnName the name of the field which has to be the column name of the database table.
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(String columnName) {
    DataTextField temp = new DataTextField(sessionData, columnName, currentDataObject);
    registerStorable(temp);
    currentAttributeList.append(temp);
    return temp;
  }

  /**
   * Creates a database connected text input field in a new line with its describing label.
   * @param label the line label.
   * @param columnName the name of the field which has to be the column name of the database table.
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(String label, String columnName) {
    DataTextField temp = new DataTextField(sessionData, columnName, currentDataObject);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

  /**
   * Creates a database connected text input field in the same line with the specified length.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param length the length of the text input field
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(String columnName, int length) {
    return createTextField(STAY_IN_LINE, null, length, currentDataObject.getColumnLength(columnName), columnName);
  }

  /**
   * Creates a database connected text input field in a new line with the specified label and length.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param length the length of the text input field
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(String label, String columnName, int length) {
    return createTextField(NEW_LINE, label, length, columnName);
  }

  /**
   * Creates a database connected text input field in a new line with the specified label and length.
   * @param control indicates whether the component is to be laid-out in the 
   * same line (<code>{@link #STAY_IN_LINE}</code>)
   * or in a new line (<code>{@link #NEW_LINE}</code>)
   * @param columnName the name of the column to connect to
   * @param length the length of the text input field
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(int control, String columnName, int length) {
    return createTextField(control, null, length, currentDataObject.getColumnLength(columnName), columnName);
  }

  /**
   * Creates a database connected text input field in a new line with the specified label and length.
   * @param control indicates whether the component is to be laid-out in the 
   * same line (<code>{@link #STAY_IN_LINE}</code>)
   * or in a new line (<code>{@link #NEW_LINE}</code>)
   * @param label the label of the new line
   * @param length the length of the field
   * @param columnName the name of the column to connect to
   * @return the created database connected  
   */
  protected DataTextField createTextField(int control, String label, int length, String columnName) {
    return createTextField(control, label, length, currentDataObject.getColumnLength(columnName), columnName);
  }

  /**
   * Creates a database connected text input field line controlled with the specified length.
   * @param control indicates whether the component is to be laid-out in the 
   * same line (<code>{@link #STAY_IN_LINE}</code>)
   * or in a new line (<code>{@link #NEW_LINE}</code>)
   * @param label the label of the new line
   * @param length the length of the text input field
   * @param maxChars the maximum of characters to be entered
   * @param columnName the name of the column to connect to
   * @return the created database connected data text field 
   */
  protected DataTextField createTextField(int control, String label, int length, int maxChars, String columnName) {
    DataTextField temp = new DataTextField(sessionData, columnName, length, maxChars, currentDataObject);
//      temp.getAccessibleContext().setAccessibleName(columnName);
    switch (control) {
    case STAY_IN_LINE:
      currentAttributeList.append(temp);
      break;
    default:
    currentAttributeList.append(label, temp);
      break;
    }
    registerStorable(temp);
    return temp;
  }

// ------------------------

  
//  /**
//   * Creates a database connected password input field in the same line as previously used.
//   * @param columnName the name of the field = the column name of the database table
//   * @return the created database connected password input field
//   */
//  protected DataPasswordField createPasswordField(String columnName) {
//    DataPasswordField temp = new DataPasswordField(columnName, currentDataObject);
//    temp.setStorageEncrypted(sessionData.global.encryptPasswords);
//    registerStorable(temp);
//    currentAttributeList.append(temp);
//    return temp;
//  }
//
  protected DataPasswordField createPasswordField(String label, String columnName) {
    DataPasswordField temp = new DataPasswordField(sessionData, columnName, currentDataObject);
//      temp.getAccessibleContext().setAccessibleName(columnName);
    currentAttributeList.append(label, temp);
    registerStorable(temp);
    return temp;
  }

  /**
   * Creates a database connected text area in a new line with its describing label.
   * @param label the line label.
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected text area
   */
  protected DataTextArea createTextArea(String label, String columnName) {
    DataTextArea temp = new DataTextArea(sessionData, currentDataObject, columnName);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

////------------------------------------------------------------------------------

  /**
   * Creates a database connected date field in the same line as previously used.
   * @param columnName the name of the field which has to be the column name of the database table.
   * @return the created database connected date field
   */
  protected DataDateField createDateField(String columnName) {
    DataDateField temp = new DataDateField(sessionData, sessionData.getLocale(), columnName, currentDataObject);
    registerStorable(temp);
    currentAttributeList.append(temp);
    return temp;
  }

  /**
   * Creates a database connected date field in a new line with its describing label.
   * @param label the line label.
   * @param columnName the name of the field which has to be the column name of the database table.
   * @return the created database connected date field
   */
  protected DataDateField createDateField(String label, String columnName) {
    DataDateField temp = new DataDateField(sessionData, sessionData.getLocale(), columnName, currentDataObject);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return(temp);
  }

  protected DataCleartextClassification createCleartextClassification(String label, String assignedColumnName, SelfChainingDataObject sourceDataObject, String niColumn, String visibleColumnName, String superordinateNiColumn, int depth) {
    DataCleartextClassification temp = new DataCleartextClassification(sessionData, mainDataObject, assignedColumnName, sourceDataObject, "KlarSystNi", "KlarSystBz", 3);
    temp.addTo(currentAttributeList, label);
    registerStorable(temp);
    return temp;
  }

////------------------------------------------------------------------------------
//
//  /**
//   * Creates a database connected time field in the same line as previously used.
//   * @param columnName the name of the field which has to be the column name of the database table.
//   * @return the created database connected time field
//   */
//  protected DataTimeField createTimeField(String columnName) {
//    DataTimeField temp = new DataTimeField(sessionData.locale, columnName, currentDataObject);
//    registerStorable(temp);
//    currentAttributeList.append(temp);
//    return temp;
//  }
//
//  /**
//   * Creates a database connected time field in a new line with its describing label.
//   * @param label the line label.
//   * @param columnName the name of the field which has to be the column name of the database table.
//   * @return the created database connected time field
//   */
//  protected DataTimeField createTimeField(String label, String columnName) {
//    DataTimeField temp = new DataTimeField(sessionData.locale, columnName, currentDataObject);
//    registerStorable(temp);
//    currentAttributeList.append(label, temp);
//    return(temp);
//  }
//
////------------------------------------------------------------------------------

  /**
   * Creates a database connected int field in the same line as previously used.
   * @param columnName the name of the field which has to be the column name of the database table.
   * @return the created database connected int field
   */
  protected DataIntField createIntField(String columnName) {
    DataIntField temp = new DataIntField(sessionData, currentDataObject, columnName);
    registerStorable(temp);
    currentAttributeList.append(temp);
    return temp;
  }

  /**
   * Creates a database connected int field in a new line with its describing label.
   * @param label the line label.
   * @param columnName the name of the field which has to be the column name of the database table.
   * @return the created database connected int field
   */
  protected DataIntField createIntField(String label, String columnName) {
    DataIntField temp = new DataIntField(sessionData, currentDataObject, columnName);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

  /**
   * Creates a database connected decimal field in a new line with the specified label.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected decimal field
   */
  protected DataDecimalField createDecimalField(String label, String columnName) {
    DataDecimalField temp = new DataDecimalField(sessionData, currentDataObject, columnName);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return(temp);
  }

  /**
   * Creates a database connected decimal field in the same line as previously used.
   * @param columnName the name of the column to connect to
   * @return the created database connected decimal field
   */
  protected DataDecimalField createDecimalField(String columnName) {
    DataDecimalField temp = new DataDecimalField(sessionData, currentDataObject, columnName);
    registerStorable(temp);
    currentAttributeList.append(temp);
    return(temp);
  }

////------------------------------------------------------------------------------

  /**
   * Creates a database connected and dynamically data filled combo box in the same line as previously used.
   * @param columnName the name of the field = the column name of the database table
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @return the created database connected combo box
   */
  protected DataComboBox createComboBox(String columnName, DataObject sourceDataObject, String visibleColumn) {
    DataComboBox temp = new DataComboBox(sessionData, currentDataObject, columnName, sourceDataObject, visibleColumn);
    registerStorable(temp);
    currentAttributeList.append(temp);
    return(temp);
  }

  /**
   * Creates a database connected and dynamically data filled combo box in a new line with its describing label.
   * @param label the line label.
   * @param columnName the name of the field = the column name of the database table
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @return the created database connected combo box
   */
  protected DataComboBox createComboBox(String label, String columnName, DataObject sourceDataObject, String visibleColumn) {
    DataComboBox temp = new DataComboBox(sessionData, currentDataObject, columnName, sourceDataObject, visibleColumn);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return(temp);
  }

  /**
   * Creates a database connected and dynamically data filled combo box in a new line with its describing label.
   * @param label the line label.
   * @param columnName the name of the field = the column name of the database table
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @param orderByColumnName the column name to determine for the list order
   * @param nameForNoChoice the expression that indicates "no choice"
   * @return the created database connected combo box
   */
  protected DataComboBox createComboBox(String label, String columnName, DataObject sourceDataObject, String visibleColumn, String orderByColumnName, String nameForNoChoice) {
    DataComboBox temp = new DataComboBox(sessionData, currentDataObject, columnName, sourceDataObject, visibleColumn, orderByColumnName,  nameForNoChoice);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return(temp);
  }

  /**
   * Creates a database connected and dynamically data filled combo box in the same line as previously used.
   * @param columnName the name of the field = the column name of the database table
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @param orderByColumnName the column name to determine for the list order
   * @param nameForNoChoice the expression that indicates "no choice"
   * @return the created database connected combo box
   */
  protected DataComboBox createComboBox(String columnName, DataObject sourceDataObject, String visibleColumn, String orderByColumnName, String nameForNoChoice) {
    DataComboBox temp = new DataComboBox(sessionData, currentDataObject, columnName, sourceDataObject, visibleColumn, orderByColumnName,  nameForNoChoice);
    registerStorable(temp);
    currentAttributeList.append(temp);
    return(temp);
  }

////------------------------------------------------------------------------------

  /**
   * Creates a database connected variable choice
   * @param label the label of the new line
   * @param content the static content of the variable choice
   * @param columnName the name of the column to connect to
   * @return the created database connected variable choice 
   */
  protected DataVariableChoice createChoice(String label, KeyValuePair[] content, String columnName) {
    DataVariableChoice temp = new DataVariableChoice(sessionData, content, currentDataObject, columnName);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return(temp);
  }

  /**
   * Creates a database connected filled combo box with static choice in a new line with its describing label.
   * @param label the line label.
   * @param content the wished content of the combo box
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected variable choice field
   */
  protected DataVariableChoice createChoice(String label, String[][] content, String columnName) {
    DataVariableChoice temp = new DataVariableChoice(sessionData, content, currentDataObject, columnName);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected check box in the same line as previously used.
   * @param checkLabel the label to the right of the check box
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected check box
   */
  protected DataCheckBox createCheckBox(String checkLabel, String columnName) {
    return createCheckBox(null, columnName, checkLabel);
  }

  /**
   * Creates a database connected check box in a new line with its describing label.
   * @param label the line label.
   * @param checkLabel
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected check box
   */
  protected DataCheckBox createCheckBox(String lineLabel, String checkLabel, String columnName) {
    DataCheckBox temp = new DataCheckBox(sessionData, currentDataObject, columnName, checkLabel);
    if (lineLabel != null) {
      currentAttributeList.append(lineLabel, temp);
    } else {
      currentAttributeList.append(temp);
    }
    registerStorable(temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected text check in a new line.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param keys the keys as to be used in the database tables
   * @param meaning the meanings of these keys to be presented for the user
   * @return the created database connected
   */
  protected DataRadioButtons createRadioButtons(String lineLabel, String columnName, String[] keys, String[] meaning) {
    DataRadioButtons temp = new DataRadioButtons(sessionData, currentDataObject, columnName, keys, meaning);
    currentAttributeList.append(lineLabel, temp);
    registerStorable(temp);
    return(temp);
  }

//  /**
//   * Creates a database connected text check in a new line.
//   * @param label the label of the new line
//   * @param columnName the name of the column to connect to
//   * @param keys the keys as to be used in the database tables
//   * @param meaning the meanings of these keys to be presented for the user
//   * @return the created database connected
//   */
//  protected DataTextCheck createTextCheck(String lineLabel, String columnName, int[] keys, String[] meaning) {
//    DataTextCheck temp = new DataTextCheck(currentDataObject, columnName, keys, meaning);
//    currentAttributeList.append(lineLabel, temp);
//    registerStorable(temp);
//    return(temp);
//  }
//
//  /**
//   * Creates a database connected file uploader.
//   * @param label the label of the new line
//   * @param saveDirectory the directory to save the files to
//   * @return the created database connected file uploader
//   */
//  public DataFileUploader createFileUploader(String lineLabel, String saveDirectory) {
//    DataFileUploader temp = new DataFileUploader(saveDirectory, currentDataObject);
//    currentAttributeList.append(lineLabel, temp);
//    registerStorable(temp);
//    uploadFunctionality = true;
//    return(temp);
//  }
  
//------------------------------------------------------------------------------

//  /**
//   * Appends a string to the same line as previously used.
//   * @param stringToAppend the string to add
//   */
//  protected void append(String stringToAppend) {
//    currentAttributeList.append(stringToAppend);
//  }

//------------------------------------------------------------------------------

  private void registerStorable(Storable nextStorable) {
    storableComponents.add(nextStorable);
    remoteContents.add(nextStorable);
  }

  /**
   * Sets the previously added component to be mandatory.
   * @param required whether the component is mandatory or not
   */
  protected void setRequired(boolean required) {
    storableComponents.lastElement().setRequired(required);
  }

  /**
   * Sets the frame title for using the administration for entering new entries.
   * @param frameTitleNew the frame title for using the administration entering new entries
   */
  protected void setFrameTitleNew(String frameTitleNew) {
    this.frameTitleNew = frameTitleNew;
  }

  /**
   * Sets the frame title for using the administration for updating entries.
   * @param newFrameUpdateTitleField the field to be used to build the title
   * for using the administration for updating entries
   */
  protected void setFrameUpdateTitleField(DataTextField newFrameUpdateTitleField) {
    this.frameUpdateTitleFields = new DataTextField[] {newFrameUpdateTitleField};
  }

  /**
   * Sets the frame title for using the administration for updating entries.
   * @param newFrameUpdateTitleFields the fields to be used to build the title
   * for using the administration for updating entries
   */
  protected void setFrameUpdateTitleField(DataTextComponent[] newFrameUpdateTitleFields) {
    this.frameUpdateTitleFields = newFrameUpdateTitleFields;
  }
  
  /**
   * Sets the flag that {@link #buildRemoteView(ToAppletWriter)} has to create everything once again.
   */
  public void rebuildFromScratch() {
    buildDone = false;
    if (currentSelectionList != null) currentSelectionList.buildDone = false;
    checkRepeatedInput.resetLastStatus();
  }

  @Override
  public void process(GeneralizedRequest request) {
    if (Constants.ACTION_OK.equals(sessionData.action)) {
      okButtonAction();
    } else if (Constants.ACTION_CANCEL.equals(sessionData.action)) {
      cancelButtonAction();
    } else if (Constants.ACTION_SUBSELECT.equals(sessionData.action)) {
      isToRenew = true;
      Identifier identifier = Identifier.parseString(request.getParameter(Constants.IDENTIFIER));
      currentSelectionList.setSelected(identifier);
    } else if (btnSubOk != null && btnSubOk.actionID.equals(sessionData.action)) {
      isToRenew = true;
      if (checkAndUpdateAll()) {
        if (administrationMode != MODE_PROPERTY) {
//          loadValuesAfterId();
        }
        currentSelectionList.loadValue();
//        unlockSublist();
      }
      currentSelectionList.setSelected(new Identifier(Identifier.REPRESENTATIVE_FOR_NEW_ENTRY));
    } else if (btnSubNew != null && btnSubNew.actionID.equals(sessionData.action)) {
      isToRenew = true;
      currentSelectionList.setSelected(new Identifier(Identifier.REPRESENTATIVE_FOR_NEW_ENTRY));
    } else if (btnSubDel != null && btnSubDel.actionID.equals(sessionData.action)) {
      boolean deletionAllowed = true;
      Identifier identifier = currentSelectionList.getSelectedIdentifier();
      deletionAllowed = dataObjects[1].isDeletionAllowed(identifier);
      if (deletionAllowed) {
        inUse = false;
        pendingIdentifierToDelete = identifier;
      } else {
        inUse = true;
        pendingIdentifierToDelete = null;
      }
    } else if (Constants.ACTION_SUBLISTDELETE_CONFIRMATION.equals(sessionData.action)) {
      isToRenew = true;
      currentSelectionList.getSourceDataObject().delete(pendingIdentifierToDelete);
      currentSelectionList.loadValue();
      pendingIdentifierToDelete = null;
    } else if (Constants.ACTION_SUBLISTDELETE_CANCEL.equals(sessionData.action)) {
      pendingIdentifierToDelete = null;
    } else {
      super.process(request);
    }
  }

  protected boolean checkAndUpdateAll() {
    if (!inputCheckOk()) return false;
    saveValues();
    dataObjects[0].save(getClass(), DataChangedEvent.SINGLE_TYPE);
    for (int i = 1; i <= numberOfDataObjects; i++) {
      if (dataObjects[i].isModified()) {
        dataObjects[i].save(getClass(), DataChangedEvent.SINGLE_TYPE); // new and half defined
      }
    }
    return true;
  }

  /**
   * Returns the description of the administrated entry.
   * @return the description of the administrated entry
   */
  protected String getEntryDescription() {
    if (frameUpdateTitleFields == null) return null; // no field association set
    StringBuffer title = new StringBuffer();
    int i;
    for (i = 0; i < frameUpdateTitleFields.length; i++) {
      if (title.length() > 0 && title.charAt(title.length() - 1 ) != ' ') {
        title.append(' ');
      }
      title.append(frameUpdateTitleFields[i].getText());
    }
    return title.toString();
  }

  /**
   * Prepares for inserting data.
   */
  public void newInput() {
    // ensure buildRemoteView is called:
    if (sessionData.tabOrWinIdByApplet == null) sessionData.tabIdsToBuild.add(getTabId());
    setVisible(true);
    isToRenew = true;
    administrationMode = MODE_NEW;
    mainDataObject.newRowWithNextIdentifierAllocation();
    setAppellation(frameTitleNew);
    Iterator<Storable> iterator = storableComponents.iterator();
    while (iterator.hasNext()) {
      Storable storable = iterator.next();
      storable.loadValue();
    }
    setDefaultValues();
    checkRepeatedInput.setVisible(true);
  }

  /**
   * Sets the default values of the components - to be overridden by child if needed.
   */
  protected void setDefaultValues() {
  }

  public void loadValues(Vector<Identifier> identifiers) {
    this.identifiers = identifiers;
    firstLoad = true;
//    if (returnToFirstPage && mustTabbedPane1 != null) {
//      mustTabbedPane1.setSelectedIndex(0); // most important information on first page, stay on previous tab only for tailing items of multiple selection
//    }
    loadValuesConsumeIdentifiers();
    checkRepeatedInput.setVisible(false);
  }
  
  private boolean loadValuesConsumeIdentifiers() {
    if (identifiers == null || identifiers.size() == 0) return false;
    Identifier identifier = identifiers.firstElement();
    identifiers.remove(0);
    loadValues(identifier);
    firstLoad = false;
    return true;
  }
  
  /**
   * Loads an entity specified by an identifier (primary key).
   * @param identifier the identifier (primary key).
   */
  protected void loadValues(Identifier identifier) {
    isToRenew = true;
    setVisible(true);
    administrationMode = MODE_PROPERTY;
    mainDataObject.load(identifier);
    loadValues();
    String newTitle = getEntryDescription();
    if (newTitle != null) setAppellation(newTitle);
  }

  protected void loadValues() {
    Iterator<Storable> iterator = storableComponents.iterator();
    while (iterator.hasNext()) {
      Storable storable = iterator.next();
      storable.loadValue();
    }
  }

  /**
   * Loads the specified entry and fills all DataComponent objects with
   * the current values to offer them for inserting a new entry.
   * @param identification the unique identify value of the entry.
   */
  public void copy(Identifier identifier) {
    identifiers = null; // reset incomplete updates
    mainDataObject.setIdentifier(identifier);
    checkRepeatedInput.setVisible(false);
//    if (mustTabbedPane != null) { 
//      mustTabbedPane.setSelectedIndex(0); // most important information on first page, return to this page
//    }
//    if (uniqueStringIdentifyDataComponent != null) uniqueStringIdentifyDataComponent.setEditable(true);
    mainDataObject.load();
    loadValues(identifier);
    if (frameUpdateTitleFields != null) setAppellation(getTranslation("TEXT_COPY_OF") + getEntryDescription());
    administrationMode = MODE_COPY;
    mainDataObject.newRow();
    lastRevisionIdentifier = mainDataObject.allocateNewIdentifier();
    for (int i = 1; i <= numberOfDataObjects; i++) {
      dataObjects[i].newRow();
    }
    // tell the multiple choice models that the original is no longer relevant and that a new identifier came
//    Iterator<DataMultChoice> multChoicesIterator = multChoices.iterator();
//    while (multChoicesIterator.hasNext()) {
//      DataMultChoice multChoice = multChoicesIterator.next();
//      if (lastRevisionIdentifier != null) {
//        multChoice.setCopyModeAndNewRootIdentifier(lastRevisionIdentifier);
//      } else if (uniqueStringIdentifyDataComponent != null) {
//        multChoice.setCopyModeAndIdentifyTextField(uniqueStringIdentifyDataComponent);
//      } else {
//        Logger.getInstance().warn("DataMultChoice is not prepared to copy data!");
//      }
//    }
    Iterator<DataList> subListIterator = subLists.iterator();
    while (subListIterator.hasNext()) {
      DataList subList = subListIterator.next();
      subList.loadValue(); // we do not copy sub lists - it's just new input, dataObjects[i].newRow() has been done before
    }
//    if (lastRevisionIdentifier != null && lastRevisionIdentifier.getIntIdentifier() < -1) {// care! -1 may occur for string identified entities!
//      StandardDialog.presentText(this, new String[] {"Ganz schön schlau, den Nummernverwalter auf negativ zu setzen!", "Aber daran habe ich gedacht. ;-)", getTranslation("TEXT_FULL_LICENCE_SEE")}, (getTranslation("TEXT_INFOS_ABOUT_THE_LICENCE")));
//      closeInstance();
//    }
//    if (lastRevisionIdentifier != null && lastRevisionIdentifier.getIntIdentifier() > mainDataObject.getmaxRow(de.must.util.Licence.getLicenceType())) {
//      if (evaluationOverflow != null) {
//        evaluationOverflow.react(this);
//      } else {
//        StandardDialog.presentText(this, new String[] {getTranslation("TEXT_THE_MAXIMUM_OF_ENTRIES_FOR") + de.must.util.Licence.getLicenceDescription() + getTranslation("TEXT_IS_REACHED"), getTranslation("TEXT_WE_LIKE_TO_DELIVER_THE_FULL_LICENCE"), getTranslation("TEXT_PRICES_SEE")}, (getTranslation("TEXT_INFOS_ABOUT_THE_LICENCE")));
//      }
//      closeInstance();
//    }
//    if (niDataComponent != null) niDataComponent.loadValue();
//    dialogPrepared();
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.sendSubconcerning(Constants.DETAIL);
    super.buildRemoteView(out);
    if (currentSelectionList != null) {
      setEnabled(btnSubDel, currentSelectionList.getSelectedIdentifier().getIntIdentifier() != Identifier.REPRESENTATIVE_FOR_NEW_ENTRY, out);
      setEnabled(btnSubNew, currentSelectionList.getSelectedIdentifier().getIntIdentifier() != Identifier.REPRESENTATIVE_FOR_NEW_ENTRY, out);
    }
    if (inUse) {
      buildRemoteViewInUse(out);
      inUse = false;
    } else if (pendingIdentifierToDelete!= null) {
      buildRemoteViewDeleteConfirmation(out);
    }
  }
  
  private void setEnabled(MustButton button, boolean enabled, ToAppletWriter out) {
    out.setEnabled(button.actionID, enabled);
  }

  private void buildRemoteViewInUse(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TODO_TAG_BEGIN + Constants.INFO_CANNOT_DELETE + Constants.TODO_TAG_END);
    out.println(Constants.VALUE_TAG_BEGIN + getDetailInfo(currentSelectionList.getSelectedIdentifier()) + Constants.VALUE_TAG_END);
    out.println(Constants.ACTION_END_TAG);
  }
  
  private void buildRemoteViewDeleteConfirmation(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TODO_TAG_BEGIN + Constants.CONFIRM_DELETION + Constants.TODO_TAG_END);
    out.println(Constants.ID_TAG_BEGIN + pendingIdentifierToDelete + Constants.ID_TAG_END);
    out.println(Constants.VALUE_TAG_BEGIN + getDetailInfo(pendingIdentifierToDelete) + Constants.VALUE_TAG_END);
    out.println(Constants.ACTION_END_TAG);
  }
  
  /**
   * Override for individual information concerning sublist item about what is going to be deleted e.g.
   * @param identifier the identifier of the entry to inform about
   * @return individual information about what is going to be deleted e.g.
   */
  protected String getDetailInfo(Identifier identifier) {
    return dataObjects[1].getTextNoMatterWhatTypeOfColumn(currentSelectionList.getVisibleColumnName());
  }
  
  /**
   * Does all the things necessary when user pushes OK button and returns true if 
   * there was nothing rejected. Returning false means the regular OK button action 
   * has not been done to the end, e.g. because data input has not been accepted. 
   * @return true if there was nothing rejected
   */
  protected boolean okButtonAction() {
    isToRenew = true;
    if (!inputCheckOk()) {
//    setMessageToKeepIfNotAlreadySet(sessionData.getFrameworkResourceString("TEXT_INPUT_NOT_ACCEPTED"));
    return false;
    }
    if (isModified()) {
      // de.must.io.Logger.getInstance().info(getClass(), "isModified");
      saveValues();
      mainDataObject.save();
      mainDataObject.commitIfNotAutoCommit();
    }
    for (int i = 1; i <= numberOfDataObjects; i++) {
      if (dataObjects[i].isModified()) {
        dataObjects[i].save(this.getClass(), DataChangedEvent.SINGLE_TYPE); // new and half defined
      }
    }
    if (!loadValuesConsumeIdentifiers()) {
      setVisible(false);
    }
    group.currentlyUpdatedOrAdded = mainDataObject.getIdentifier();
    return true;
  }

  protected boolean cancelButtonAction() {
    isToRenew = true;
    // if (isCancelAllowed()) { decided by applet
      // unlockSublist();
    if (identifiers != null) identifiers.clear();
    setVisible(false); // closeInstance();
      mainDataObject.rollbackIfNotAutoCommit();
      // identifiers = null;
      return true;
    // }
    // return false;
  }

  private boolean inputCheckOk() {
    Iterator<Storable> iterator = storableComponents.iterator();
    while (iterator.hasNext()) {
      Storable storable = iterator.next();
      if (!storable.isValid()) {
        setMessageToKeep(sessionData.getFrameworkResourceString("TEXT_FORMALLY_INVALID"));
        // if (MustTabbedPane1 != null) MustTabbedPane1.setSelectedIndex(ComponentTab[i]);
        storable.selectAll();
        storable.requestFocus();
        return false;
      }
    }
    iterator = storableComponents.iterator();
    while (iterator.hasNext()) {
      Storable storable = iterator.next();
      if (storable.isRequirementUnfulfilled()) {
        setMessageToKeep(sessionData.getFrameworkResourceString("TEXT_IS_REQUIRED"));
        // MustTabbedPane1.setSelectedIndex(ComponentTab[i]);
        storable.selectAll();
        storable.requestFocus();
        return false;
      }
    }
    return isInputAccepted();
  }

  /**
   * Returns true if user input is accepted. Override this method to implement
   * individual input checks.
   * @return true if user input is accepted
   */
  protected boolean isInputAccepted() {
    if (uniqueStringIdentifyDataComponent != null) {
      if (uniqueStringIdentifyDataComponent.getText().trim().equals("")) {
        uniqueStringIdentifyDataComponent.requestFocus();
        setMessageToKeep(getTranslation("TEXT_IS_REQUIRED"));
        return false;
      }
      if (getAdministrationMode() != MODE_PROPERTY && duplicateCheckDataObject != null) {
        if (duplicateCheckDataObject.contains(duplicateCheckDataObject.getUniqueKeyName(), uniqueStringIdentifyDataComponent.getText())) {
          uniqueStringIdentifyDataComponent.requestFocus();
          uniqueStringIdentifyDataComponent.selectAll();
          setMessageToKeep(getTranslation("TEXT_ENTRY_ALREADY_EXISTING"));
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Returns the administration mode.
   * @return the administration mode which may be
   * <code>{@link #MODE_VIRGIN MODE_VIRGIN}</code>,
   * <code>{@link #MODE_NEW MODE_NEW}</code>,
   * <code>{@link #MODE_PROPERTY MODE_PROPERTY}</code> or
   * <code>{@link #MODE_COPY MODE_COPY}</code>
   */
  protected int getAdministrationMode() {
    return administrationMode;
  }

  /**
   * Returns true if input was modified.
   * @return true if input was modified.
   */
  protected boolean isModified() {
    Iterator<Storable> iterator = storableComponents.iterator();
    while (iterator.hasNext()) {
      Storable storable = iterator.next();
      de.must.io.Logger.getInstance().debug(getClass(), "Modified " + "?: " + storable.isModified());
      if (storable.isModified()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Saves the components' values.
   */
  protected void saveValues() {
    switch (administrationMode) {
    case MODE_NEW:
      saveValuesForNew();
      break;
    case MODE_COPY:
      saveValuesForNew();
      break;
    case MODE_PROPERTY:
      saveValuesForUpdate();
      break;
    }
  }

  private void saveValuesForNew() {
    Iterator<Storable> iterator = storableComponents.iterator();
    while (iterator.hasNext()) {
      Storable storable = iterator.next();
      if (storable.isFilled()) {
        storable.saveValue();
      }
    }
  }

  private void saveValuesForUpdate() {
    Iterator<Storable> iterator = storableComponents.iterator();
    while (iterator.hasNext()) {
      Storable storable = iterator.next();
      if (storable.isModified()) {
        storable.saveValue();
      }
    }
  }

  protected Identifier getLastAdministrationIdentifier() {
    return mainDataObject.getIdentifier();
  }

  /**
   * Returns the uploadFunctionality.
   * @return boolean
   */
  public boolean hasUploadFunctionality() {
    return uploadFunctionality;
  }

  protected void free() {
    Iterator<Storable> iterator = storableComponents.iterator();
    while (iterator.hasNext()) {
      Storable storable = iterator.next();
      storable.destroy();
    }
    // super.free();
  }

}
