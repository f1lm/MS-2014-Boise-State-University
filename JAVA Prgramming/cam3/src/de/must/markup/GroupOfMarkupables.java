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

import de.must.dataobj.DataObject;
import de.must.util.KeyValuePairNum;

/**
 * A group of markupables.
 * To be used by "use bean" classes in Java Server Pages development to reduce
 * loop coding.
 * @author Christoph Mueller
 * @see Markupable
 */
public class GroupOfMarkupables {

  protected SessionData sessionData;
  private Markupable[] markupableComponents;
  private int markupableCapacity;
  private int countMarkupable = -1;

  /**
   * Constructs a group of max. 50 markupables.
   * @param mainDataObject the data object that is to be used mainly
   * @param sessionData the session's public data
   */
  public GroupOfMarkupables(SessionData sessionData) {
    this(sessionData, 50);
  }
  
  /**
   * Constructs a new group of markupables.
   * @param sessionData the session's public data
   */
  public GroupOfMarkupables(SessionData sessionData, int maxItems) {
    this.markupableCapacity = maxItems;
    markupableComponents = new Markupable[markupableCapacity];
    this.sessionData = sessionData;
  }

  /**
   * Creates a text area field and registers it as markupable.
   * @return the created text input field
   */
  public MustTextArea createTextArea() {
    MustTextArea temp = new MustTextArea();
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a text input field and registers it as markupable.
   * @param size the size of the field
   * @return the created text input field
   */
  public MustTextField createTextField(int size) {
    MustTextField temp = new MustTextField(size);
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a text input field and registers it as markupable.
   * @param size rendering relevant size of the text field
   * @param maxlength input control relevant max length of the text field
   * @return the created text input field
   */
  public MustTextField createTextField(int size, int maxlength) {
    MustTextField temp = new MustTextField(size, maxlength);
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a password field and registers it as markupable.
   * @param size the size of the field
   * @return the created password field
   */
  public MustPasswordField createPasswordField(int size) {
    MustPasswordField temp = new MustPasswordField(size);
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a date input field and registers it as markupable.
   * @return the created date input field
   */
  public MustDateField createDateField() {
    MustDateField temp = new MustDateField();
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a date presenter and registers it as markupable.
   * @return the created date presenter
   */
  public MustDatePresenter createDatePresenter() {
    MustDatePresenter temp = new MustDatePresenter();
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a timestamp presenter and registers it as markupable.
   * @return the created timestamp presenter
   */
  public MustTimestampPresenter createTimestampPresenter() {
    MustTimestampPresenter temp = new MustTimestampPresenter();
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a time input field and registers it as markupable.
   * @return the created time input field
   */
  public MustTimeField createTimeField() {
    MustTimeField temp = new MustTimeField();
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a integer input field and registers it as markupable.
   * @return the created integer input field
   */
  public MustIntField createIntField() {
    MustIntField temp = new MustIntField();
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a decimal input field and registers it as markupable.
   * @return the created decimal input field
   */
  public MustDecimalField createDecimalField() {
    MustDecimalField temp = new MustDecimalField();
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a decimal presenter and registers it as markupable.
   * @return the created decimal presenter
   */
  public MustDecimalPresenter createDecimalPresenter() {
    MustDecimalPresenter temp = new MustDecimalPresenter();
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a check box and registers it as markupable.
   * @param checkText the text to be displayed
   * @return the created check box
   */
  public MustCheckBox createCheckBox(String checkText) {
    MustCheckBox temp = new MustCheckBox(checkText);
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a check box and registers it as markupable.
   * @param name the name of the checkbox
   * @param checkText the text to be displayed
   * @return the created check box
   */
  public MustCheckBox createCheckBoxWithExplicitName(String checkText, String name) {
    MustCheckBox temp = new MustCheckBox(name, checkText);
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a combo box.
   * @param sessionData the session's public data
   * @param contentDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @return the created combo box
   */
  public HalfDataComboBox createComboBox(SessionData sessionData, DataObject contentDataObject, String visibleColumn) {
    HalfDataComboBox temp = new HalfDataComboBox(sessionData, contentDataObject, visibleColumn);
    registerMarkupable(temp);
    return(temp);
  }

  /**
   * Creates a combo box.
   * @param sessionData the session's public data
   * @param contentDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @param orderByColumnName the column name to determine for the list order
   * @param nameForNoChoice the expression that indicates "no choice"
   * @return the created combo box
   */
  public HalfDataComboBox createComboBox(SessionData sessionData, DataObject contentDataObject, String visibleColumn, String orderByColumn, String nameForNoChoice) {
    HalfDataComboBox temp = new HalfDataComboBox(sessionData, contentDataObject, visibleColumn, orderByColumn, nameForNoChoice);
    registerMarkupable(temp);
    return(temp);
  }


  /**
   * Creates combo box without any intitial content.
   * Useful if content is know later than creation time.
   * @return the created variable choice field
   */
  public VariableChoice createChoice() {
    VariableChoice temp = new VariableChoice();
    registerMarkupable(temp);
    return(temp);
  }

  /**
   * Creates combo box with static choice.
   * @param content the wished content of the combo box
   * @return the created variable choice field
   */
  public VariableChoice createChoice(String[] content) {
    VariableChoice temp = new VariableChoice(content);
    registerMarkupable(temp);
    return(temp);
  }

  /**
   * Creates a combo box with static choice.
   * @param content the wished content of the combo box
   * @return the created variable choice field
   */
  public VariableChoice createChoice(String[][] content) {
    VariableChoice temp = new VariableChoice(content);
    registerMarkupable(temp);
    return(temp);
  }

  /**
   * Creates a database connected variable choice with numeric key
   * @param content the static conent of the variable choice
   * @return the created database connected variable choice 
   */
  public VariableChoiceNumKey createChoice(KeyValuePairNum[] content) {
    VariableChoiceNumKey temp = new VariableChoiceNumKey(content);
    registerMarkupable(temp);
    return(temp);
  }

  /**
   * Creates a reference presenter with static choice.
   * @param content alt the values possibly shown
   * @return the created reference presenter
   */
  public MustReferencePresenter createReferencePresenter(String[][] content) {
    MustReferencePresenter temp = new MustReferencePresenter(content);
    registerMarkupable(temp);
    return(temp);
  }

  /**
   * Creates a text presenter.
   * @return the created text presenter
   */
  public MustTextPresenter createTextPresenter() {
    MustTextPresenter temp = new MustTextPresenter();
    registerMarkupable(temp);
    return(temp);
  }

  /**
   * Creates a radio button group with static choice.
   * @param content the wished content of the radio button group
   * @return the created variable radio button group
   */
  public RadioButtonGroup createRadioButtonGroup(String[] checkLabels, String[] values) {
    RadioButtonGroup temp = new RadioButtonGroup(checkLabels, values);
    registerMarkupable(temp);
    return(temp);
  }

  /**
   * Creates a file uploader.
   * @param saveDirectory the directory to save the files to
   * @return the created file uploader
   */
  public FileUploader createFileUploader(String saveDirectory) {
    FileUploader temp = new FileUploader(saveDirectory);
    registerMarkupable(temp);
    return(temp);
  }

 /**
   * Creates a hidden field and registers it as markupable.
   * @return the created hidden field
   */
  public HiddenField createHiddenField() {
    HiddenField temp = new HiddenField();
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a hidden field and registers it as markupable.
   * @param name the name of the hidden field
   * @return the created hidden field
   */
  public HiddenField createHiddenField(String name) {
    HiddenField temp = new HiddenField(name);
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates an OK button and registers it as markupable.
   * @param sessionData the session's public data
   * @return the created OK button
   */
  public OkButton createOkButton(SessionData sessionData) {
    OkButton temp = new OkButton(sessionData);
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates an cancel button and registers it as markupable.
   * @param sessionData the session's public data
   * @return the created cancel button
   */
  public CancelButton createCancelButton(SessionData sessionData) {
    CancelButton temp = new CancelButton(sessionData);
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a back button and registers it as markupable.
   * @param sessionData the session's public data
   * @return the created back button
   */
  public BackButton createBackButton(SessionData sessionData) {
    BackButton temp = new BackButton(sessionData);
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a search button and registers it as markupable.
   * @param sessionData the session's public data
   * @return the created search button
   */
  public SearchButton createSearchButton(SessionData sessionData) {
    SearchButton temp = new SearchButton(sessionData);
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a button and registers it as markupable.
   * @param label the labe to be seen by the user
   * @param name the name of the button
   * @return the created button
   */
  public MustButton createButton(String label, String name) {
    MustButton temp = new MustButton(label, name);
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a button and registers it as markupable.
   * @param label the labe to be seen by the user
   * @param name the name of the button
   * @param onClickScriptlet the scriptlet to be executed (JavaScript) - if
   * this parameter is not null, the button type is 'button', not 'submit'.
   * @return the created button
   */
  public MustButton createButton(String label, String name, String onClickScriptlet) {
    MustButton temp = new MustButton(label, name, onClickScriptlet);
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Registers a markupable to be handled in this group.
   * @param markupable the markupable to register
   */
  protected void registerMarkupable(Markupable markupable) {
    markupableComponents[++countMarkupable] = markupable;
  }

  /**
   * Sets the tool tip text of the last created markupable.
   * @toolTipText the tool tip text to set
   */
  public void setToolTipText(String toolTipText) {
    markupableComponents[countMarkupable].setToolTipText(toolTipText);
  }

  public void init() {
    int i ;
    for (i = 0; i <= countMarkupable; i++) {
      try {
        MustTextField temp = (MustTextField)markupableComponents[i];
        temp.setText("");
      } catch (ClassCastException cce) {}
    }
  }

  /**
   * Synchronizes user input and internal mirrored values by delegating to each
   * markupable of this group to fetch its value from the request.
   * @param request the current request
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    // de.must.io.Logger.getInstance().info(getClass(), "we " + request.getMethod() + " in " +  request.getServletPath());
    if (request.getMethod().equals("GET")) return; // nothing to fetch - don't override object's values
    int i ;
    for (i = 0; i <= countMarkupable; i++) {
      // de.must.io.Logger.getInstance().info(getClass(), "fetching " + markupableComponents[i].getClass().getName());
      if (markupableComponents[i] instanceof MustInputField) {
        ((MustInputField)markupableComponents[i]).fetchYourValueFromRequest(request);
      }
    }
  }

}
