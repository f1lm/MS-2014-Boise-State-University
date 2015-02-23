/*
 * Copyright (c) 2001-2008 Christoph Mueller. All rights reserved.
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

import java.util.StringTokenizer;

import de.must.dataobj.DataObject;
import de.must.dataobj.WhereCondition;
import de.must.util.StringFunctions;

/**
 * Dialog for entering inquiry specifications.
 * @author Christoph Mueller
 */
public abstract class Enquiry extends Dialog {

  private String title;
  private Invokable submitter;
  protected AttributeList currentAttributeList = new AttributeList();
  private EnquirySubmission submission = new EnquirySubmission();
  protected boolean wantToBeFinalized = false;
  private Markupable[] MarkupableComponents;
  private int markupableCapacity = 20;
  private int countMarkupable = -1;
  protected MustTextField globalSearchTextField;
  protected DataObject dataObjectForGlobalSearch;

  /**
   * Constructs a new inquiry dialog.
   * @param sessionData the session's public data
   */
  public Enquiry(SessionData sessionData) {
    super(sessionData);
    MarkupableComponents = new Markupable[markupableCapacity];
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
    return title;
  }

  /**
   * Informs this invokable, from which previous invokable it is submitted.
   * Technique to establish a bilateral communication between invokables.
   * @param submitter the invokable that submitted this invokable
   */
  public void setSubmitter(Invokable submitter) {
    this.submitter = submitter;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a text input field in the same line as previously used.
   * @param length the length of the input fields to be created.
   * @return the created text input field
   */
  protected MustTextField createTextField(int length) {
    MustTextField temp = new MustTextField(length);
    currentAttributeList.append(temp);
    registerMarkupable(temp);
    return temp;
  }

  /**
   * Creates a text input field in a new line with its describing label.
   * @param label the line label
   * @param length the length of the input fields to be created.
   * @return the created text input field
   */
  protected MustTextField createTextField(String label, int length) {
    MustTextField temp = new MustTextField(length);
    currentAttributeList.append(label, temp);
    registerMarkupable(temp);
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a text area in a new line with its describing label.
   * @param label the line label
   * @return the created text area
   */
  protected MustTextArea createTextArea(String label) {
    MustTextArea temp = new MustTextArea();
    currentAttributeList.append(label, temp);
    registerMarkupable(temp);
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a int input field in the same line as previously used.
   * @param label the line label
   * @param length the length of the field
   * @return the created int field
   */
  protected MustIntField createIntField(String label) {
    MustIntField temp = new MustIntField();
    currentAttributeList.append(label, temp);
    registerMarkupable(temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a date input field in a new line with its describing label.
   * @param label the line label
   * @param name the name of the field
   * @return the created date field
   */
  protected MustDateField createDateField(String label, String name) {
    MustDateField temp = new MustDateField(sessionData.locale, name);
    currentAttributeList.append(label, temp);
    registerMarkupable(temp);
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a time input field in a new line with its describing label.
   * @param label the line label
   * @param name the name of the field
   * @return the created date field
   */
  protected MustTimeField createTimeField(String label, String name) {
    MustTimeField temp = new MustTimeField(sessionData.locale, name);
    currentAttributeList.append(label, temp);
    registerMarkupable(temp);
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a combo box in a new line with its describing label.
   * @param label the line label.
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @return the created combo box
   */
  protected HalfDataComboBox createComboBox(String label, DataObject sourceDataObject, String visibleColumn) {
    HalfDataComboBox temp = new HalfDataComboBox(sessionData, sourceDataObject, visibleColumn, null, getAnySymbol());
    currentAttributeList.append(label, temp);
    registerMarkupable(temp);
    return(temp);
  }

  /**
   * Creates a combo box in a new line with its describing label.
   * @param label the line label.
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @param orderByColumnName the column name to determine for the list order
   * @return the created combo box
   */
  protected HalfDataComboBox createComboBox(String label, DataObject sourceDataObject, String visibleColumn, String orderByColumn) {
    return createComboBox(label, sourceDataObject, visibleColumn, orderByColumn, getAnySymbol());
  }

  /**
   * Creates a combo box in a new line with its describing label.
   * @param label the line label.
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @param orderByColumnName the column name to determine for the list order
   * @param nameForNoChoice the expression that indicates "no choice"
   * @return the created combo box
   */
  protected HalfDataComboBox createComboBox(String label, DataObject sourceDataObject, String visibleColumn, String orderByColumn, String nameForNoChoice) {
    HalfDataComboBox temp = new HalfDataComboBox(sessionData, sourceDataObject, visibleColumn, orderByColumn, nameForNoChoice);
    currentAttributeList.append(label, temp);
    registerMarkupable(temp);
    return(temp);
  }

  /**
   * Creates a new text field for global search.
   * @param label the line label
   * @param length the length of the global search text field
   */
  protected void createTextFieldForGlobalSearch(String label, int length, DataObject dataObjectForGlobalSearch) {
    globalSearchTextField = createTextField(label, length);
    this.dataObjectForGlobalSearch = dataObjectForGlobalSearch;
  }

  /**
   * Returns the symbol for "any".
   * @return the symbol for "any"
   */
  private String getAnySymbol() {
    return "< " + sessionData.getFrameworkResourceString("TEXT_ANY") + " >";
  }

//------------------------------------------------------------------------------

  /**
   * Appends a markupable to the same line as previously used.
   * @param markupableToAppend the markupable to append
   */
  protected void append(Markupable markupableToAppend) {
    currentAttributeList.append(markupableToAppend);
    registerMarkupable(markupableToAppend);
  }

  /**
   * Appends a string to the same line as previously used.
   * @param stringToAppend the string to append
   */
  protected void append(String stringToAppend) {
    currentAttributeList.append(stringToAppend);
  }

  /**
   * Appends a string to a new line with its describing label.
   * @param label the line label
   * @param stringToAppend the string to append
   */
  protected void append(String label, String stringToAppend) {
    currentAttributeList.append(label, stringToAppend);
  }

  private void registerMarkupable(Markupable nextMarkupable) {
    MarkupableComponents[++countMarkupable] = nextMarkupable;
  }


//------------------------------------------------------------------------------
  /**
   * Sets the tool tip text of the last added markupable.
   * @param toolTipText the tool tip text to set.
   */
  public void setToolTipText(String toolTipText) {
    currentAttributeList.setLastComponentsToolTipText(toolTipText);
  }

//------------------------------------------------------------------------------

  /**
   * Returns the attribute list.
   * @return the attribute list
   */
  public AttributeList getAttributeList() {
    return currentAttributeList;
  }

  /**
   * Returns the default tag sequence (as HTML).
   * Normally you should not call this method directly.
   * Use Layout implementing classes instead.
   * @return the default tag sequence (as HTML)
   * @see Layout
   */
  public String getTagSequence() {
    String tagSequence = getHeader();
    tagSequence += "<form action=\"" + sessionData.getBaseURL() + "\" method=POST>";
    // tagSequence += "<table><tr>";
    tagSequence += "<input type=\"hidden\" name=\"dialogNbr\" value=\"" + sessionData.dialogNbr + "\">";
    tagSequence += currentAttributeList.getTagSequence();
    // tagSequence += "</tr></table>";
    tagSequence += "<br>";
    tagSequence += "<center>";
    tagSequence += "<input type=submit Name=" + "\"" + NAME_FOR_LIST_ACTION + "\"" + " value=\"" + sessionData.getFrameworkResourceString("TEXT_LIST_BUTTON") + "\">";
    tagSequence += "&nbsp;&nbsp;";
    tagSequence += "<input type=\"submit\" Name=" + "\"" + NAME_FOR_BACK_ACTION + "\"" + " value=\"" + sessionData.getFrameworkResourceString("TEXT_BACK_BUTTON") + "\">";
    tagSequence += "</center>";
    tagSequence += "</form>";
    tagSequence += getFooter();
    return tagSequence;
  }

  /**
   * Allows the invokable to react to the request. Sample: saving data when OK
   * button was pressed.
   * @param request the request to react to
   */
  public void process(GeneralizedRequest request) {
    super.process(request);
    // fetchValuesFromRequest(request);
    if (request.getParameter(NAME_FOR_BACK_ACTION) != null) {
      stackMovement = -1;
      return;
    }
    if (request.getParameter(NAME_FOR_LIST_ACTION) != null || isPost(request)) { // default button (Enter doesn't update button's parameter)
      if (isInputAccepted()) {
        stackMovement = 1;
        sessionData.classToInvokeNext = getDataListClass();
      }
      return;
    }
  }
  
  /**
   * Returns true if user input is accepted. Override this method to implement
   * individual input checks.
   * @return true if user input is accepted
   */
  protected boolean isInputAccepted() {
    return true;
  }

  /**
   * Returns the class for listing data.
   * @return the class for listing data
   */
  public abstract Class<? extends Invokable> getDataListClass();

  /**
   * Causes the invokable to delegate this function to all embedded markupables
   * to fetch their current value as edited by the user from the request.
   * @param request the request from where the values are to be fetched
   * @see Markupable#fetchYourValueFromRequest
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    if (!isPost(request)) return; // no input available
    currentAttributeList.fetchValuesFromRequest(request);
  }

  /**
   * Informs the next invokable in stack about the submission details. E.g. a
   * PropertyAdminstration may call this method to receive the primary key of
   * the entry to be edited.
   * @return the submission details
   */
  public Submission getSubmission() {
    return submission;
  }

  /**
   * Returns the wished stack movement. E.g this if this invokable's work is
   * done it return -1 to return to the previous invokable in the stack.
   */
  public int getStackMovement() {
    return stackMovement;
  }

  /**
   * Indicates whether the reuse of the invokable is not to be supported.
   * @return true if the reuse of the invokable is not to be supported
   */
  public boolean wantToBeFinalized() {
    return wantToBeFinalized;
  }

  /**
   * Returns the where condition for the select statement to process the inquiry.
   * See subclass code for samples for samples how this may be implemented.
   * In the simplest case it looks like
   * <code>return DbFieldName like '%" + UIfield.getText() + "%'";</code>
   * @return the where condition for the select statement
   */
  protected abstract String getWhereCondition();

  /**
   * Appends a fragment to the where condition. May be a part of a word.
   * @param whereCondition the where condition to extend
   * @param columnNames the columns to be used to search
   * @param searchString the string to search
   */
  protected void appendIfFilled(WhereCondition whereCondition, String[] columnNames, String searchString) {
    appendIfFilled(whereCondition, columnNames, searchString, false);
  }

  /**
   * Appends a fragment to the where condition.
	 * @param whereCondition the where condition to extend
	 * @param columnNames the columns to be used to search
	 * @param searchString the string to search
	 * @param wholeWord whether the expression is to be searched as a whole word
	 */
	protected void appendIfFilled(WhereCondition whereCondition, String columnNames[], String searchString, boolean wholeWord) {
    if (searchString.length() == 0) return;
    whereCondition.openBracket();
    for (int i = 0; i < columnNames.length; i++) {
      if (wholeWord) {
        wholeWordSearchAppend(whereCondition, columnNames[i], searchString, i>0);
      } else {
        whereCondition.append((i>0?" or ":"") + columnNames[i]  + " like \'%" + searchString + "%\'");
      }
      // 
      if (searchString.indexOf("ss") != -1) {
        String subject2 = StringFunctions.replaceAll(searchString, "ss", "ß");
        if (wholeWord) {
          wholeWordSearchAppend(whereCondition, columnNames[i], subject2, true);
        } else {
          whereCondition.append(" or " + columnNames[i] + " like \'%" + subject2 + "%\'");
        }
      }
      if (searchString.indexOf("ß") != -1) {
        String subject2 = StringFunctions.replaceAll(searchString, "ß", "ss");
        if (wholeWord) {
          wholeWordSearchAppend(whereCondition, columnNames[i], subject2, true);
        } else {
          whereCondition.append(" or " + columnNames[i] + " like \'%" + subject2 + "%\'");
        }
      }
    }
    whereCondition.closeBracket();
  }

  /**
   * Appends a search as a whole word.
   * @param whereCondition the where condition to extend
   * @param columnName the name of the column to be searched in
   * @param searchString the expression to be searched as a whole word
   */
  protected void wholeWordSearchAppend(WhereCondition whereCondition, String columnName, String searchString) {
    wholeWordSearchAppend(whereCondition, columnName, searchString, false);
  }

  /**
   * Appends a search as a whole word.
   * @param whereCondition the where condition to extend
	 * @param columnName the name of the column to be searched in
	 * @param searchString the expression to be searched as a whole word
	 */
	protected void wholeWordSearchAppend(WhereCondition whereCondition, String columnName, String searchString, boolean startingWithOr) {
    whereCondition.append((startingWithOr?" or ":"")+ columnName + " = \'" + searchString + "\'");
    whereCondition.append(" or " + columnName + " like \'" + searchString + " %\'");
    whereCondition.append(" or " + columnName + " like \'% " + searchString + " %'"); 
    whereCondition.append(" or " + columnName + " like \'% " + searchString + "\'"); 
  }

  /**
   * @see de.must.markup.Dialog#free()
   */
  protected void free() {
    for (int i = 0; i <= countMarkupable; i++) {
      MarkupableComponents[i].destroy();
    }
    super.free();
  }

  /**
   * Information about the current object to be submitted to objects which
   * desire some information.
   */
  class EnquirySubmission extends Submission {
    public String getSubmittedWhereCondition() {
      if (globalSearchTextField != null && !globalSearchTextField.getText().trim().equals("")) {
        String standardWhereCondition = getWhereCondition();
        StringTokenizer tokenizer = new StringTokenizer(globalSearchTextField.getText(), " ;,", false);
        String globalWhereCondition = "";
        if (tokenizer.countTokens() <= 1) {
          globalWhereCondition = dataObjectForGlobalSearch.getGlobalWhereCondition(globalSearchTextField.getText());
        } else {
          while (tokenizer.hasMoreTokens()) {
            if (globalWhereCondition.length() > 1) globalWhereCondition += " and ";
            globalWhereCondition += "(";
            globalWhereCondition += dataObjectForGlobalSearch.getGlobalWhereCondition(tokenizer.nextToken());
            globalWhereCondition += ")";
          }
        }
        if (standardWhereCondition.length() == 0) {
          return globalWhereCondition;
        } else {
          return "(" + globalWhereCondition + ") and " + standardWhereCondition;
        }
      } else {
        return getWhereCondition();
      }
    }
  }

}
