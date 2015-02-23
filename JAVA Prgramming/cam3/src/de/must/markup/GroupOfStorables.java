/*
 * Copyright (c) 2001-2004 Christoph Mueller. All rights reserved.
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
import de.must.util.KeyValuePairNum;

/**
 * A group of storables belonging to the same entity.
 * Provides load and save functions.
 * To be used by "use bean" classes in Java Server Pages development to reduce
 * loop coding.
 * @author Christoph Mueller
 * @see Storable
 */
public class GroupOfStorables extends GroupOfMarkupables {

  public static final int MODE_VIRGIN = 0;
  public static final int MODE_NEW = 1;
  public static final int MODE_PROPERTY = 2;
  public static final int MODE_COPY = 3;
  private int administrationMode = MODE_PROPERTY;

  private DataObject mainDataObject;
  private Storable[] storableComponents;
  private int storableCapacity;
  private int countStorable = -1;
  private Presentable[] presentableComponents;
  private int presentableCapacity = 20;
  private int countPresentable = -1;
  private boolean automaticIdentifierAllocation = true;

  /**
   * Constructs a group of max. 50 storables.
   * @param mainDataObject the data object that is to be used mainly
   * @param sessionData the session's public data
   */
  public GroupOfStorables(DataObject mainDataObject, SessionData sessionData) {
    this(mainDataObject, sessionData, 50);
  }
  
  /**
   * Constructs a group of storables.
   * @param mainDataObject the data object that is to be used mainly
   * @param sessionData the session's public data
   * @param maxItems the maximum number of storable components used for array capacity aspects
   */
  public GroupOfStorables(DataObject mainDataObject, SessionData sessionData, int maxItems) {
    super(sessionData, maxItems);
    this.mainDataObject = mainDataObject;
    this.storableCapacity = maxItems; 
    storableComponents = new Storable[storableCapacity];
    presentableComponents = new Presentable[storableCapacity];
    mainDataObject.newRow(); // to get column length via meta data
  }

  /**
   * Returns the automaticIdentifierAllocation.
   * @return boolean
   */
  public boolean isAutomaticIdentifierAllocation() {
    return automaticIdentifierAllocation;
  }


  /**
   * Sets the automaticIdentifierAllocation.
   * @param automaticIdentifierAllocation The automaticIdentifierAllocation to set
   */
  public void setAutomaticIdentifierAllocation(boolean automaticIdentifierAllocation) {
    this.automaticIdentifierAllocation = automaticIdentifierAllocation;
  }

  /**
   * Creates a database connected text input field.
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected text input field
   */
  public DataTextField createTextField(String columnName) {
    DataTextField temp = new DataTextField(columnName, mainDataObject);
    registerStorable(temp);
    return temp;
  }

  /**
   * Creates a database connected password input field.
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected password input field
   */
  public DataPasswordField createPasswordField(String columnName) {
    DataPasswordField temp = new DataPasswordField(columnName, mainDataObject);
    registerStorable(temp);
    return temp;
  }

  /**
   * Creates a database connected text input area.
   * @param label
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected text area
   */
  public DataTextArea createTextArea(String columnName) {
    DataTextArea temp = new DataTextArea(columnName, mainDataObject);
    registerStorable(temp);
    return temp;
  }

  /**
   * Creates a database connected date input field.
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected date field
   */
  public DataDateField createDateField(String columnName) {
    DataDateField temp = new DataDateField(sessionData.locale, columnName, mainDataObject);
    registerStorable(temp);
    return(temp);
  }

  /**
   * Creates a database connected date presenter field.
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected date presenter field
   */
  public DataDatePresenter createDatePresenter(String columnName) {
    DataDatePresenter temp = new DataDatePresenter(sessionData.locale, columnName, mainDataObject);
    registerPresentable(temp);
    return(temp);
  }

  /**
   * Creates a database connected time input field.
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected date field
   */
  public DataTimeField createTimeField(String columnName) {
    DataTimeField temp = new DataTimeField(sessionData.locale, columnName, mainDataObject);
    registerStorable(temp);
    return(temp);
  }

  /**
   * Creates a database connected text input field for int values.
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected text field for int values
   */
  public DataIntField createIntField(String columnName) {
    DataIntField temp = new DataIntField(columnName, mainDataObject);
    registerStorable(temp);
    return temp;
  }

  /**
   * Creates a database connected integer presenter field.
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected integer presenter field
   */
  public DataIntPresenter createIntPresenter(String columnName) {
    DataIntPresenter temp = new DataIntPresenter(columnName, mainDataObject);
    registerPresentable(temp);
    return(temp);
  }

  /**
   * Creates a database connected filled combo box with static choice in a new line with its describing label.
   * @param label the line label.
   * @param content the wished content of the combo box
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected variable choice field
   */
  public DataVariableChoice createChoice(String label, String[][] content, String columnName) {
    DataVariableChoice temp = new DataVariableChoice(mainDataObject, columnName, content);
    registerStorable(temp);
    return(temp);
  }

  /**
   * Creates a database connected and dynamically data filled combo box.
   * @param columnName the name of the field = the column name of the database table
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @return the created database connected combo box
   */
  public DataComboBox createComboBox(SessionData sessionData, String columnName, DataObject sourceDataObject, String visibleColumn) {
    DataComboBox temp = new DataComboBox(sessionData, mainDataObject, columnName, sourceDataObject, visibleColumn);
    registerStorable(temp);
    return(temp);
  }

  /**
   * Creates a database connected and dynamically data filled combo box.
   * @param columnName the name of the field = the column name of the database table
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @param orderByColumnName the column name to determine for the list order
   * @param nameForNoChoice the expression that indicates "no choice"
   * @return the created database connected combo box
   */
  public DataComboBox createComboBox(String columnName, DataObject sourceDataObject, String visibleColumn, String orderByColumnName, String nameForNoChoice) {
    DataComboBox temp = new DataComboBox(null, mainDataObject, columnName, sourceDataObject, visibleColumn, null, orderByColumnName,  nameForNoChoice);
    registerStorable(temp);
    return(temp);
  }

  /**
   * Creates a database connected filled combo box with static choice.
   * @param content the wished content of the combo box
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected variable choice field
   */
  public DataVariableChoice createChoice(String[][] content, String columnName) {
    DataVariableChoice temp = new DataVariableChoice(mainDataObject, columnName, content);
    registerStorable(temp);
    return(temp);
  }

  /**
   * Creates a database connected filled combo box with static choice.
   * @param content the wished content of the combo box
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected variable choice field
   */
  public DataVariableChoice createChoice(String[] content, String columnName) {
    DataVariableChoice temp = new DataVariableChoice(mainDataObject, columnName, content);
    registerStorable(temp);
    return(temp);
  }

  /**
   * Creates a database connected variable choice with numeric key
   * @param content the static conent of the variable choice
   * @param columnName the name of the column to connect to
   * @return the created database connected variable choice 
   */
  public DataVariableChoiceNumKey createChoice(KeyValuePairNum[] content, String columnName) {
    DataVariableChoiceNumKey temp = new DataVariableChoiceNumKey(mainDataObject, columnName, content);
    registerStorable(temp);
    return(temp);
  }

  /**
   * Creates a database connected check box.
   * @param checkLabel
   * @param columnName the name of the field = the column name of the database table
   * @return the created database connected check box
   */
  public DataCheckBox createCheckBox(String checkLabel, String columnName) {
    DataCheckBox temp = new DataCheckBox(mainDataObject, columnName, checkLabel);
    registerStorable(temp);
    return(temp);
  }

  /**
   * Creates a database connected file uploader.
   * @param saveDirectory the directory to save the files to
   * @return the created database connected file uploader
   */
  public DataFileUploader createDataFileUploader(String saveDirectory) {
    DataFileUploader temp = new DataFileUploader(saveDirectory, mainDataObject);
    registerStorable(temp);
    return(temp);
  }
  
//------------------------------------------------------------------------------

  /**
   * Registers a storable to be handled as group.
   * @param nextStorable the storable to register
   */
  private void registerStorable(Storable nextStorable) {
    storableComponents[++countStorable] = nextStorable;
    registerMarkupable(nextStorable);
  }

  /**
   * Registers a presentable to be handled as group.
   * @param nextStorable the storable to register
   */
  private void registerPresentable(Presentable nextPresentable) {
    presentableComponents[++countPresentable] = nextPresentable;
    registerMarkupable(nextPresentable);
  }

  /**
   * Prepares for inserting data.
   */
  public void newInput() {
    administrationMode = MODE_NEW;
    // mainDataObject.newRowWithNextIdentifierAllocation();
    mainDataObject.newRow();
    for (int i = 0; i <= countStorable; i++) {
      storableComponents[i].loadValue();
    }
  }

  /**
   * Loads an entity specified by a primary key integer value.
   * @param identifyValue the primary key integer value.
   */
  public void loadValues(int identifyValue) {
    loadValues(new Identifier(identifyValue));
  }

  /**
   * Loads an entity specified by a primary key integer value.
   * @param identifier the primary key.
   */
  public void loadValues(Identifier identifier) {
    administrationMode = MODE_PROPERTY;
    mainDataObject.load(identifier);
    for (int i = 0; i <= countStorable; i++) {
      storableComponents[i].loadValue();
    }
    for (int i = 0; i <= countPresentable; i++) {
      presentableComponents[i].loadValue();
    }
  }

  /**
   * Returns the administration mode.
   * @return the administration mode
   * @see #MODE_NEW
   * @see #MODE_PROPERTY
   */
  public int getAdministrationMode() {
    return administrationMode;
  }

  /**
   * Indicates whether user input is formally correct.
   * @return true if user input is formally correct
   */
  public boolean inputCheckOk() {
    return inputCheckOk(null);
  }

  /**
   * Indicates whether user input is formally correct.
   * @param jspButler the JspButler to set message and focus
   * @return true if user input is formally correct and required fields are filled
   */
  public boolean inputCheckOk(JspButler jspButler) {
    for (int i = 0; i <= countStorable; i++) {
      storableComponents[i].setComment(null);
      if (!storableComponents[i].isValid()) {
        storableComponents[i].setComment(sessionData.getFrameworkResourceString("TEXT_FORMALLY_INVALID"));
        if (jspButler != null) {
          setFocus(jspButler, storableComponents[i]);
          jspButler.setMessageToKeep(sessionData.getFrameworkResourceString("TEXT_FORMALLY_INVALID"));
        }
        return false;
      }
      if (storableComponents[i].isRequirementUnfulfilled()) {
        storableComponents[i].setComment(sessionData.getFrameworkResourceString("TEXT_INPUT_REQUIRED"));
        if (jspButler != null) {
          setFocus(jspButler, storableComponents[i]);
          jspButler.setMessageToKeep(sessionData.getFrameworkResourceString("TEXT_INPUT_REQUIRED"));
        }
        return false;
      }
    }
    return true;
  }

  private void setFocus(JspButler jspButler, Storable storable) {
    if (storable instanceof MustInputField) {
      jspButler.setFocusOn((MustInputField)storable);
    }
  }

  /**
   * Indicates wether one or more components value have been changed.
   * @return true if on or more components value have been changed
   */
  public boolean isModified() {
    for (int i = 0; i <= countStorable; i++) {
      de.must.io.Logger.getInstance().debug(getClass(), "Modified " + i + "?: " + storableComponents[i].isModified());
      if (storableComponents[i].isModified()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Stores the component's values.
   */
  public void save() {
    saveValuesModeLike();
    mainDataObject.save();
  }

  private void saveValuesModeLike() {
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
    int i;
    if (automaticIdentifierAllocation) mainDataObject.allocateNewIdentifier();
    for (i = 0; i <= countStorable; i++) {
      if (storableComponents[i].isFilled()) {
        storableComponents[i].saveValue();
      }
    }
  }

  private void saveValuesForUpdate() {
    int i ;
    for (i = 0; i <= countStorable; i++) {
      if (storableComponents[i].isModified()) {
        storableComponents[i].saveValue();
      }
    }
  }

}
