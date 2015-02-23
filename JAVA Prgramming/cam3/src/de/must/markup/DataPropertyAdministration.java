/*
 * Copyright (c) 2001 Christoph Mueller. All rights reserved.
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

package de.must.markup;

import de.must.dataobj.*;

/**
 * Frame-like container to enclose input-output fields like text fields with
 * database field association and controlling load and save actions.
 * Used for property administration of a single database record.
 * It is meant to contain several storables like e.g. DataTextField
 * @author Christoph Mueller
 */
public abstract class DataPropertyAdministration extends PropertyAdministration {

  private String title;
  private Invokable submitter;
  private AdministrationSubmission submission = new AdministrationSubmission();

  public static final int MODE_VIRGIN = 0;
  public static final int MODE_NEW = 1;
  public static final int MODE_PROPERTY = 2;
  public static final int MODE_COPY = 3;
  private int administrationMode = MODE_PROPERTY;

  private DataObject mainDataObject;
  private Storable[] StorableComponents;
  private int storableCapacity = 100;
  private int countStorable = -1;
  private String frameTitleNew = sessionData.getFrameworkResourceString("TEXT_NEW_ENTRY");
  private DataTextField[] frameUpdateTitleFields;
  private String generator = "generator name";
  private boolean uploadFunctionality = false;

  /**
   * Constructs a new data property administration.
   * @param sessionData the session's public data
   */
  public DataPropertyAdministration(SessionData sessionData) {
    this(null, sessionData);
  }

  /**
   * Constructs a new data property administration.
   * @param mainDataObject the data object that is to be used mainly
   * @param sessionData the session's public data
   */
  public DataPropertyAdministration(DataObject mainDataObject, SessionData sessionData) {
    super(sessionData);
    if (mainDataObject != null) setMainDataObject(mainDataObject);
    StorableComponents = new Storable[storableCapacity];
  }

  /**
   * Sets the main data object and calls new row to get column length via meta data.
   * @param dataObject the data object that is to be used mainly
   */
  public void setMainDataObject(DataObject dataObject) {
    this.mainDataObject = dataObject;
    mainDataObject.newRow(); // to get column length via meta data
  }

  /**
   * Sets the title of the property administration
   * @param title the title of the property administration
   */
  public void setTitle(String title) {
    this.title = title;
  }

  /**
   * Returns the title of the property administration
   * @return the title of the property administration
   */
  public String getTitle() {
    String combinedTitle = "";
    switch (administrationMode) {
    case MODE_NEW:
      combinedTitle = sessionData.getFrameworkResourceString("TEXT_NEW_ENTRY");
      break;
    case MODE_PROPERTY:
      combinedTitle = sessionData.getFrameworkResourceString("TEXT_MODIFY_ENTRY");
      break;
    case MODE_COPY:
      combinedTitle = sessionData.getFrameworkResourceString("TEXT_COPY_ENTRY");
      break;
    }
    if (title != null) combinedTitle += " (" + title + ")";
    return combinedTitle;
  }

  /**
   * Sets the submitter of this dialog step.
   * @param submitter the calling submitter
   */
  public void setSubmitter(Invokable submitter) {
    this.submitter = submitter;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected text input field in the same line as previously used.
   * @param columnName the name of the field which has to be the column name of the database table.
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(String columnName) {
    DataTextField temp = new DataTextField(columnName, mainDataObject);
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
    DataTextField temp = new DataTextField(columnName, mainDataObject);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

  /**
   * Creates a database connected password input field in the same line as previously used.
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected password input field
   */
  protected DataPasswordField createPasswordField(String columnName) {
    DataPasswordField temp = new DataPasswordField(columnName, mainDataObject);
    temp.setStorageEncrypted(sessionData.global.encryptPasswords);
    registerStorable(temp);
    currentAttributeList.append(temp);
    return temp;
  }

  /**
   * Creates a database connected password input field in a new line with its describing label.
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected password input field
   */
  protected DataPasswordField createPasswordField(String label, String columnName) {
    DataPasswordField temp = new DataPasswordField(columnName, mainDataObject);
    temp.setStorageEncrypted(sessionData.global.encryptPasswords);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

  /**
   * Creates a database connected text area in a new line with its describing label.
   * @param label the line label.
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected text area
   */
  protected DataTextArea createTextArea(String label, String columnName) {
    DataTextArea temp = new DataTextArea(columnName, mainDataObject);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected date field in the same line as previously used.
   * @param columnName the name of the field which has to be the column name of the database table.
   * @return the created database connected date field
   */
  protected DataDateField createDateField(String columnName) {
    DataDateField temp = new DataDateField(sessionData.locale, columnName, mainDataObject);
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
    DataDateField temp = new DataDateField(sessionData.locale, columnName, mainDataObject);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected time field in the same line as previously used.
   * @param columnName the name of the field which has to be the column name of the database table.
   * @return the created database connected time field
   */
  protected DataTimeField createTimeField(String columnName) {
    DataTimeField temp = new DataTimeField(sessionData.locale, columnName, mainDataObject);
    registerStorable(temp);
    currentAttributeList.append(temp);
    return temp;
  }

  /**
   * Creates a database connected time field in a new line with its describing label.
   * @param label the line label.
   * @param columnName the name of the field which has to be the column name of the database table.
   * @return the created database connected time field
   */
  protected DataTimeField createTimeField(String label, String columnName) {
    DataTimeField temp = new DataTimeField(sessionData.locale, columnName, mainDataObject);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected int field in the same line as previously used.
   * @param columnName the name of the field which has to be the column name of the database table.
   * @return the created database connected int field
   */
  protected DataIntField createIntField(String columnName) {
    DataIntField temp = new DataIntField(columnName, mainDataObject);
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
    DataIntField temp = new DataIntField(columnName, mainDataObject);
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
    DataDecimalField temp = new DataDecimalField(mainDataObject, columnName);
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
    DataDecimalField temp = new DataDecimalField(mainDataObject, columnName);
    registerStorable(temp);
    currentAttributeList.append(temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected and dynamically data filled combo box in the same line as previously used.
   * @param columnName the name of the field = the column name of the database table
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @return the created database connected combo box
   */
  protected DataComboBox createComboBox(String columnName, DataObject sourceDataObject, String visibleColumn) {
    DataComboBox temp = new DataComboBox(sessionData, mainDataObject, columnName, sourceDataObject, visibleColumn);
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
    DataComboBox temp = new DataComboBox(sessionData, mainDataObject, columnName, sourceDataObject, visibleColumn);
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
    DataComboBox temp = new DataComboBox(sessionData, mainDataObject, columnName, sourceDataObject, visibleColumn, label, orderByColumnName,  nameForNoChoice);
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
    DataComboBox temp = new DataComboBox(sessionData, mainDataObject, columnName, sourceDataObject, visibleColumn, null, orderByColumnName,  nameForNoChoice);
    registerStorable(temp);
    currentAttributeList.append(temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected filled combo box with static choice in a new line with its describing label.
   * @param label the line label.
   * @param content the wished content of the combo box
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected variable choice field
   */
  protected DataVariableChoice createChoice(String label, String[][] content, String columnName) {
    DataVariableChoice temp = new DataVariableChoice(mainDataObject, columnName, content);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return(temp);
  }

  /* protected DataVariableChoice createChoice(String label, de.must.util.KeyValuePair[] Content, String columnName) {
    DataVariableChoice temp = new DataVariableChoice(mainDataObject, columnName, Content);
    registerStorable(temp);
    currentAttributeList.append(label, temp);
    return(temp);
  } */

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
    return createCheckBox(lineLabel, checkLabel, columnName, null, null);
  }

  protected DataCheckBox createCheckBox(String lineLabel, String checkLabel, String columnName, String trueString, String falseString) {
    DataCheckBox temp = new DataCheckBox(mainDataObject, columnName, checkLabel, trueString, falseString);
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
  protected DataTextCheck createTextCheck(String lineLabel, String columnName, String[] keys, String[] meaning) {
    DataTextCheck temp = new DataTextCheck(mainDataObject, columnName, keys, meaning);
    currentAttributeList.append(lineLabel, temp);
    registerStorable(temp);
    return(temp);
  }

  /**
   * Creates a database connected text check in a new line.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param keys the keys as to be used in the database tables
   * @param meaning the meanings of these keys to be presented for the user
   * @return the created database connected
   */
  protected DataTextCheck createTextCheck(String lineLabel, String columnName, int[] keys, String[] meaning) {
    DataTextCheck temp = new DataTextCheck(mainDataObject, columnName, keys, meaning);
    currentAttributeList.append(lineLabel, temp);
    registerStorable(temp);
    return(temp);
  }

  /**
   * Creates a database connected file uploader.
   * @param label the label of the new line
   * @param saveDirectory the directory to save the files to
   * @return the created database connected file uploader
   */
  public DataFileUploader createFileUploader(String lineLabel, String saveDirectory) {
    DataFileUploader temp = new DataFileUploader(saveDirectory, mainDataObject);
    currentAttributeList.append(lineLabel, temp);
    registerStorable(temp);
    uploadFunctionality = true;
    return(temp);
  }
  
//------------------------------------------------------------------------------

  /**
   * Appends a string to the same line as previously used.
   * @param stringToAppend the string to add
   */
  protected void append(String stringToAppend) {
    currentAttributeList.append(stringToAppend);
  }

//------------------------------------------------------------------------------

  private void registerStorable(Storable nextStorable) {
    StorableComponents[++countStorable] = nextStorable;
  }

  /**
   * Sets the previously added component to be mandatory.
   * @param required whether the component is mandatory or not
   */
  protected void setRequired(boolean required) {
    StorableComponents[countStorable].setRequired(required);
  }

  /**
   * Initializes the invokable in order to reuse the component without garbage
   * from the previous use.
   */
  public void init() {
    super.init();
    Identifier id = submitter.getSubmission().getSubmittedIdentifier();
    if (id != null) {
      administrationMode = MODE_PROPERTY;
      loadValues(id);
    } else {
      newInput();
    }
  }

  /**
   * Sets the title of the "frame" for insert usage.
   * @param frameTitleNew the title for insert usage
   */
  protected void setFrameTitleNew(String frameTitleNew) {
    this.frameTitleNew = frameTitleNew;
  }

  /**
   * Sets the title of the "frame" for update usage.
   * @param newFrameUpdateTitleField the field to determine the for update title
   */
  protected void setFrameUpdateTitleField(DataTextField newFrameUpdateTitleField) {
    this.frameUpdateTitleFields = new DataTextField[] {newFrameUpdateTitleField};
  }

  /**
   * Sets the title of the "frame" for update usage.
   * @param newFrameUpdateTitleFields the fields to determine the for update title
   */
  protected void setFrameUpdateTitleField(DataTextField[] newFrameUpdateTitleFields) {
    this.frameUpdateTitleFields = newFrameUpdateTitleFields;
  }

  /**
   * Returns the default tag sequence to represent the component in markup languages.
   * @return the default tag sequence to represent the component in markup languages
   */
  public String getTagSequence() {
    this.dialogNbr = sessionData.dialogNbr;
    StringBuffer tagSequence = new StringBuffer(getHeader());
    if (sessionData.messageForNextDialog != null) {
      tagSequence.append(sessionData.messageForNextDialog);
    }
    tagSequence.append("<form action=\"" + sessionData.getBaseURL() + "\" method=POST>");
    tagSequence.append("<input type=\"hidden\" name=" + "\"" + NAME_FOR_DIALOG_NBR + "\"" + " value=\"" + dialogNbr + "\">");
    tagSequence.append(currentAttributeList.getTagSequence());
    tagSequence.append("<br>");
    tagSequence.append("<center>");
    tagSequence.append("<input type=\"submit\" name=" + "\"" + NAME_FOR_OK_ACTION + "\"" + " value=\"" + sessionData.getFrameworkResourceString("TEXT_OK_BUTTON") + "\">");
    tagSequence.append("&nbsp;&nbsp;");
    tagSequence.append("<input type=\"submit\" name=" + "\"" + NAME_FOR_CANCEL_ACTION + "\"" + " value=\"" + sessionData.getFrameworkResourceString("TEXT_CANCEL_BUTTON") + "\">");
    tagSequence.append("</center>");
    tagSequence.append("</form>");
    tagSequence.append(getFooter());
    return tagSequence.toString();
  }

  /**
   * Returns the description of the administered entry.
   * @return the description of the administered entry
   */
  public String getEntryDescription() {
    StringBuffer title = new StringBuffer();
    if (frameUpdateTitleFields != null) {
      int i;
      for (i = 0; i < frameUpdateTitleFields.length; i++) {
        title.append(frameUpdateTitleFields[i].getText() + " ");
      }
    }
    return title.toString();
  }

  /**
   * Indicates whether the invokable accepts to be canceled.
   * @return true if the invokable accepts to be canceled
   */
  public boolean isCancelable() {
    return (!isModified());
  }

  /**
   * Allows the invokable to react to the request.
   * @param the request to react to
   */
  public void process(GeneralizedRequest request) {
    super.process(request);
    if (processComplete) return;
    if (request.getParameter(NAME_FOR_CANCEL_ACTION) != null) {
      mainDataObject.rollbackIfNotAutoCommit();
      setStackMovement(-1);
      return;
    }
    if (request.getParameter(NAME_FOR_HELP_ACTION) != null) {
      de.must.io.Logger.getInstance().info(getClass(), "help required: " + getHelpContext().getTopic() + " / "+ getHelpContext().getTarget());
      setScriptToExecute("window.open(\"/cookbook/help/cbprop.html\");");
      return;
    }
    // default button: if (request.getParameter(NAME_FOR_OK_ACTION) != null) {
    // (Enter doesn't update button's parameter)
      handleSaveRequest();
      return;
    // }
  }

  /**
   * Prepares for inserting data.
   */
  public void newInput() {
    administrationMode = MODE_NEW;
    mainDataObject.newRowWithNextIdentifierAllocation();
    for (int i = 0; i <= countStorable; i++) {
      StorableComponents[i].loadValue();
    }
  }

  /**
   * Loads an entity specified by a primary key integer value.
   * @param identifyValue the primary key integer value.
   */
  public void loadValues(int identifyValue) {
    administrationMode = MODE_PROPERTY;
    mainDataObject.load(identifyValue);
    for (int i = 0; i <= countStorable; i++) {
      StorableComponents[i].loadValue();
    }
  }

  /**
   * Loads an entity specified by an identifier (primary key).
   * @param identifier the identifier (primary key).
   */
  public void loadValues(Identifier identifier) {
    administrationMode = MODE_PROPERTY;
    mainDataObject.load(identifier);
    for (int i = 0; i <= countStorable; i++) {
      StorableComponents[i].loadValue();
    }
  }

  /**
   * Stores the administered entity if accepted and necessary.
   */
  public void handleSaveRequest() {
    // de.must.io.Logger.getInstance().info(getClass(), "handleSaveRequest");
    if (!inputCheckOk()) {
      setMessageToKeepIfNotAlreadySet(sessionData.getFrameworkResourceString("TEXT_INPUT_NOT_ACCEPTED"));
      return;
    }
    if (isModified()) {
      // de.must.io.Logger.getInstance().info(getClass(), "isModified");
      saveValues();
      mainDataObject.save();
      mainDataObject.commitIfNotAutoCommit();
    }
    /* for (int i = 1; i <= numberOfDataObjects; i++) {
      if (DataObjects[i].isModified()) {
        DataObjects[i].save(this.getClass(), DataChangedEvent.SINGLE_TYPE); // new and half defined
      }
    } */
    setStackMovement(-1);
  }

  private boolean inputCheckOk() {
    for (int i = 0; i <= countStorable; i++) {
      StorableComponents[i].setComment(null);
      if (!StorableComponents[i].isValid()) {
        StorableComponents[i].setComment(sessionData.getFrameworkResourceString("TEXT_FORMALLY_INVALID"));
        // if (MustTabbedPane1 != null) MustTabbedPane1.setSelectedIndex(ComponentTab[i]);
        // StorableComponents[i].selectAll();
        // StorableComponents[i].requestFocus();
        // StatusLabel.setRemainStatus("Formal ungültig");
        return false;
      }
    }
    for (int i = 0; i <= countStorable; i++) {
      if (StorableComponents[i].isRequirementUnfulfilled()) {
        StorableComponents[i].setComment(sessionData.getFrameworkResourceString("TEXT_INPUT_REQUIRED"));
        // MustTabbedPane1.setSelectedIndex(ComponentTab[i]);
        // StorableComponents[i].selectAll();
        // StorableComponents[i].requestFocus();
        // StatusLabel.setRemainStatus(sessionData.getFrameworkResourceString("TEXT_INPUT_REQUIRED"));
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
    /* if (UniqueStringIdentifyDataComponent != null) {
      if (UniqueStringIdentifyDataComponent.getText().trim().equals("")) {
        UniqueStringIdentifyDataComponent.requestFocus();
        StatusLabel.setRemainStatus("Diese Angabe ist erforderlich");
        return false;
      }
      if (getAdministrationMode() != MODE_PROPERTY && DuplicateCheckDataObject != null) {
        if (DuplicateCheckDataObject.contains(DuplicateCheckDataObject.getUniqueKeyName(), UniqueStringIdentifyDataComponent.getText())) {
          StatusLabel.setRemainStatus("Eintrag bereits vorhanden");
          return false;
        }
      }
    } */
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
    for (int i = 0; i <= countStorable; i++) {
      de.must.io.Logger.getInstance().debug(getClass(), "Modified " + i + "?: " + StorableComponents[i].isModified());
      if (StorableComponents[i].isModified()) {
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
    int i ;
    for (i = 0; i <= countStorable; i++) {
      if (StorableComponents[i].isFilled()) {
        StorableComponents[i].saveValue();
      }
    }
  }

  private void saveValuesForUpdate() {
    int i ;
    for (i = 0; i <= countStorable; i++) {
      if (StorableComponents[i].isModified()) {
        StorableComponents[i].saveValue();
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

  /**
   * Returns the submission details for the next invokable in stack.
   * @return the submission details
   */
  public Submission getSubmission() {
    return submission;
  }
  @Override
  protected void free() {
    for (int i = 0; i <= countStorable; i++) {
      StorableComponents[i].destroy();
    }
    super.free();
  }

  /**
   * Returns true if the invokable wants to be finalized after request is worked off.
   * @return true if the invokable wants to be finalized
   */
  public boolean wantToBeFinalized() {
    return wantToBeFinalized;
  }

  /**
   * Administration specific submission informations.
   */
  class AdministrationSubmission extends Submission {
  }

}
