/*
 * Copyright (c) 2011-2014 Christoph Mueller. All rights reserved.
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

import java.util.StringTokenizer;
import java.util.Vector;

import de.must.applet.Constants;
import de.must.dataobj.DataObject;
import de.must.dataobj.SelfChainingDataObject;
import de.must.dataobj.WhereCondition;
import de.must.middle.MessageReceiver;
import de.must.util.SearchItem;
import de.must.util.StringFunctions;

/**
 * Dialog for entering search specifications.
 * @author Christoph Mueller
 */
public abstract class Search extends PropertyAdministration {

  protected SearchListDetailGroup group;
  protected MustTextField globalSearchTextField;
  protected InquiryHistory inquiryHistory;
  private String listButtonLabel;
  protected RadioButtonPanel searchCombination;
  protected RadioButtonPanel logic;
  protected Vector<SearchElement> searchElements;

  /**
   * Constructs a new search dialog.
   * @param sessionData the session's public data
   */
  public Search(SessionData sessionData, final SearchListDetailGroup group) {
    super(sessionData, new ContextInfo() {
      public String getTabLabel() { return group.getTabLabel(); }
      public String getTabId() { return group.getTabId(); }
      public String getConcerning() { return Constants.SEARCH_LIST_DETAIL_GUI; }
    });
    this.group = group;
    sessionData.currentConcerningSubLevel = Constants.SEARCH;
    setAppellation(getTranslation("TEXT_LIMITING"));
    inquiryHistory = new InquiryHistory();
  }
  
  protected void setListButtonLabel(String listButtonLabel) {
    this.listButtonLabel = listButtonLabel;
  }
  
//------------------------------------------------------------------------------

  /**
   * Creates a new text field.
   * @param label the line label
   * @param length the length of the text field
   * @return the created text field
   */
  protected MustTextField createTextField(String label, int length) {
    MustTextField temp = new MustTextField(sessionData, length);
    currentAttributeList.append(label, temp);
    registerRemotable(temp);
    // addFocusListenerForDefaultButton(temp);
    inquiryHistory.register(temp);
    return temp;
  }

//  /**
//   * Creates a text input field in the same line as previously used.
//   * @param length the length of the input fields to be created.
//   * @return the created text input field
//   */
//  protected MustTextField createTextField(int length) {
//    MustTextField temp = new MustTextField(length);
//    currentAttributeList.append(temp);
//    registerRemotable(temp);
//    return temp;
//  }
//
//  /**
//   * Creates a text input field in a new line with its describing label.
//   * @param label the line label
//   * @param length the length of the input fields to be created.
//   * @return the created text input field
//   */
//  protected MustTextField createTextField(String label, int length) {
//    MustTextField temp = new MustTextField(length);
//    currentAttributeList.append(label, temp);
//    registerRemotable(temp);
//    return temp;
//  }
//
////------------------------------------------------------------------------------
//
//  /**
//   * Creates a text area in a new line with its describing label.
//   * @param label the line label
//   * @return the created text area
//   */
//  protected MustTextArea createTextArea(String label) {
//    MustTextArea temp = new MustTextArea();
//    currentAttributeList.append(label, temp);
//    registerRemotable(temp);
//    return temp;
//  }
//
////------------------------------------------------------------------------------
//
//  /**
//   * Creates a int input field in the same line as previously used.
//   * @param label the line label
//   * @param length the length of the field
//   * @return the created int field
//   */
//  protected MustIntField createIntField(String label) {
//    MustIntField temp = new MustIntField();
//    currentAttributeList.append(label, temp);
//    registerRemotable(temp);
//    return(temp);
//  }
//
////------------------------------------------------------------------------------
//
//  /**
//   * Creates a date input field in a new line with its describing label.
//   * @param label the line label
//   * @param name the name of the field
//   * @return the created date field
//   */
//  protected MustDateField createDateField(String label, String name) {
//    MustDateField temp = new MustDateField(sessionData.locale, name);
//    currentAttributeList.append(label, temp);
//    registerRemotable(temp);
//    return temp;
//  }
//
////------------------------------------------------------------------------------
//
//  /**
//   * Creates a time input field in a new line with its describing label.
//   * @param label the line label
//   * @param name the name of the field
//   * @return the created date field
//   */
//  protected MustTimeField createTimeField(String label, String name) {
//    MustTimeField temp = new MustTimeField(sessionData.locale, name);
//    currentAttributeList.append(label, temp);
//    registerRemotable(temp);
//    return temp;
//  }
//
////------------------------------------------------------------------------------

  /**
   * Creates a combo box in the same line as previously used.
   * @param dataLabel the line label.
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @return the created combo box
   */
  protected HalfDataComboBox createComboBox(String dataLabel, DataObject sourceDataObject, String visibleColumn) {
    return createComboBox(dataLabel, sourceDataObject, visibleColumn, null, getTranslation("TEXT_ALL_WITH_BRACKETS"));
  }

  /**
   * Creates a combo box in the same line as previously used.
   * @param dataLabel the line label.
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @param orderByColumn the column to be ordered by
   * @return the created combo box
   */
  protected HalfDataComboBox createComboBox(String dataLabel, DataObject sourceDataObject, String visibleColumn, String orderByColumn) {
    return createComboBox(dataLabel, sourceDataObject, visibleColumn, orderByColumn, getTranslation("TEXT_ALL_WITH_BRACKETS"));
  }

  /**
   * Creates a combo box in the same line as previously used.
   * @param dataLabel the line label.
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @param orderByColumn the column to be ordered by
   * @param nameForNoChoice the expression to be used to indicate "no choice"
   * @return the created combo box
   */
  protected HalfDataComboBox createComboBox(String dataLabel, DataObject sourceDataObject, String visibleColumn, String orderByColumn, String nameForNoChoice) {
    HalfDataComboBox temp = new HalfDataComboBox(sessionData, sourceDataObject, visibleColumn, orderByColumn, nameForNoChoice, -1);
    currentAttributeList.append(dataLabel, temp);
    registerRemotable(temp);
    // addFocusListenerForDefaultButton(temp);
    inquiryHistory.register(temp);
    return temp;
  }

  /**
   * Creates a new text field for global search.
   * @param label the line label
   * @param length the length of the global search text field
   */
  protected void createTextFieldForGlobalSearch(String label, int length) {
    globalSearchTextField = createTextField(label, length);
  }
  
  protected MustCheckBox createCheckBox(String checkLabel) {
    MustCheckBox temp = new MustCheckBox(sessionData, checkLabel);
    currentAttributeList.append(temp);
    registerRemotable(temp);
    // addFocusListenerForDefaultButton(temp);
    inquiryHistory.register(temp);
    return temp;
  }

  protected CleartextClassification createCleartextClassification(String label, SelfChainingDataObject sourceDataObject, String visibleColumnName, String superordinateNiColumn, int depth) {
    CleartextClassification temp = new CleartextClassification(sessionData, sourceDataObject, "KlarSystBz", 3);
    temp.addTo(currentAttributeList, label);
    // addFocusListenerForDefaultButton(temp.boxes.firstElement());
    registerRemotable(temp);
    inquiryHistory.register(temp);
    return temp;
  }

  protected RadioButtonPanel createFragmentExactChoice() {
    RadioButtonPanel result = new RadioButtonPanel(
      sessionData,
      new String[] {"F", "W", "E"}, new String[] {
        getTranslation("TEXT_FRAGMENT"),
        getTranslation("TEXT_WORD"),
        getTranslation("TEXT_EXACT"),
      }
    );
    result.setSelectedItem(0);
    currentAttributeList.append(result);
    registerRemotable(result);
    inquiryHistory.register(result);
    return result;
  }

//------------------------------------------------------------------------------

  /**
   * Appends a remotable to the same line as previously used.
   * @param remotableToAppend the remotable to append
   */
  protected void append(RemoteContent remotableToAppend) {
    currentAttributeList.append(remotableToAppend);
    registerRemotable(remotableToAppend);
  }

  /**
   * Appends a string to the same line as previously used.
   * @param stringToAppend the string to append
   */
  protected void append(String stringToAppend) {
    // currentAttributeList.append(stringToAppend);
  }

  /**
   * Appends a string to a new line with its describing label.
   * @param label the line label
   * @param stringToAppend the string to append
   */
  protected void append(String label, String stringToAppend) {
    // currentAttributeList.append(label, stringToAppend);
  }

//------------------------------------------------------------------------------
  /**
   * Sets the tool tip text of the last added remotable.
   * @param toolTipText the tool tip text to set.
   */
  public void setToolTipText(String toolTipText) {
    currentAttributeList.setLastComponentsToolTipText(toolTipText);
  }

//------------------------------------------------------------------------------

  protected void newDynamicSearchPanel(String tabLabel, int elementAmount, SearchItem[] columns) {
    newPanel(tabLabel);
    searchElements = new Vector<SearchElement>();
    for (int i = 0; i < elementAmount; i++) {
      SearchElement searchElement = new SearchElement(sessionData, columns, new MessageReceiver() {
        public void receive(String message) {
          setMessageToKeep(message);
        }
      }, group.getList().getListDataObject(), i);
      searchElements.add(searchElement);
      searchElement.addTo(currentAttributeList);
      registerRemotable(searchElement);
      //  addFocusListenerForDefaultButton(searchElement.getValueField());
      searchElement.register(inquiryHistory);
      searchElement.setSelectedIndex(i);
    }
    logic = new RadioButtonPanel(sessionData,
      new String[] {"A", "O"}, new String[] {
        getTranslation("TEXT_AND_BEFORE_OR"),
        getTranslation("TEXT_OR_BEFORE_AND"),
      }
    );
    logic.setSelectedKeyAsEditBeginValue("A");
    currentAttributeList.append("", new Label(sessionData, getTranslation("TEXT_COMBINATION") + ": "));
    currentAttributeList.append(logic);
  }

  /**
   * Returns the attribute list.
   * @return the attribute list
   */
  public AttributeList getAttributeList() {
    return currentAttributeList;
  }

  /**
   * Allows the invokable to react to the request. Sample: saving data when OK
   * button was pressed.
   * @param request the request to react to
   */
  public void process(GeneralizedRequest request) {
    if (Constants.ACTION_NEW_ENTRY.equals(sessionData.action)) {
      if (group.propertyAdmin == null) {
        group.propertyAdmin = group.createDetail();
      }
      group.currentDetail = group.propertyAdmin;
      group.propertyAdmin.newInput();
    } else if (Constants.ACTION_LIST_PREVIOUS.equals(sessionData.action)) {
      inquiryHistory.synchronizeBackward();
      isToRenew = true;
      sessionData.action = Constants.ACTION_LIST;
    } else if (Constants.ACTION_LIST_NEXT.equals(sessionData.action)) {
      inquiryHistory.synchronizeForward();
      isToRenew = true;
      sessionData.action = Constants.ACTION_LIST;
    } else if (Constants.ACTION_LIST.equals(sessionData.action)) { // not extension
      if (isInputAccepted()) {
        inquiryHistory.addSnapshot();
      } else {
        sessionData.action = "nothing to do due to input rejection";
      }
    } else {
      super.process(request);
    }
  }
  
  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.sendSubconcerning(Constants.SEARCH);
    if (listButtonLabel != null) {
      out.println(Constants.ACTION_BEGIN_TAG);
      out.println(Constants.TODO_TAG_BEGIN + Constants.SET_LISTBUTTONLABEL + Constants.TODO_TAG_END);
      out.println(Constants.VALUE_TAG_BEGIN + listButtonLabel + Constants.VALUE_TAG_END);
      out.println(Constants.ACTION_END_TAG);
    }
    boolean previousBbuildDone = buildDone;
    super.buildRemoteView(out);
    if (!previousBbuildDone && group != null && group.readOnly) {
      out.sendTodoAction(Constants.SET_READ_ONLY);
    }
    inquiryHistory.updateRemoteView(out);
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
   * Returns the where condition.
   * @return the where condition
   */
  public String getElaboratedWhereCondition() {
//    if (expertSearchTextArea != null && getSelectedTab() == expertSearchTab) {
//      return expertSearchTextArea.getText().trim();
//    } else {
      return getPrivateWhereConditionNotExpert();
//    }
  }

  private String getPrivateWhereConditionNotExpert() {
    if (globalSearchTextField != null && !globalSearchTextField.getText().trim().equals("")) {
      String standardWhereCondition = getWhereCondition();
      StringTokenizer tokenizer = new StringTokenizer(globalSearchTextField.getText(), " ;,", false);
      String globalWhereCondition = "";
      if (tokenizer.countTokens() <= 1) {
        globalWhereCondition = group.listDataObject.getGlobalWhereCondition(globalSearchTextField.getText());
      } else {
        String combination = " and ";
        if ("O".equals(searchCombination.getSelectedKey())) {
          combination = " or ";
        }
        while (tokenizer.hasMoreTokens()) {
          if (globalWhereCondition.length() > 1) globalWhereCondition += combination;
          globalWhereCondition += "(";
          globalWhereCondition += group.listDataObject.getGlobalWhereCondition(tokenizer.nextToken());
          globalWhereCondition += ")";
        }
      }
      String additionalGlobalWhereCondition = getAdditionalWhereConditionForGlobalSearch();
      if (additionalGlobalWhereCondition != null && additionalGlobalWhereCondition.length() > 0) {
        globalWhereCondition += " or " + additionalGlobalWhereCondition;
      }
      if (standardWhereCondition.length() == 0) {
        return globalWhereCondition;
      } else {
        return extendWhereConditonByDynamicSearch("(" + globalWhereCondition + ") and " + standardWhereCondition);
      }
    } else {
      return extendWhereConditonByDynamicSearch(getWhereCondition());
    }
  }
  
  private String extendWhereConditonByDynamicSearch(String whereConditionString) {
    if (searchElements == null) return whereConditionString;
    WhereCondition whereCondition = new WhereCondition();
    whereCondition.append(whereConditionString);
    SearchElement.extend(whereCondition, searchElements, "O".equals(logic.getSelectedKey()));
    return whereCondition.toString();
  }

  /**
   * Returns additional where conditions for global search. By default, null is returned.
   * Override method to extend search by e.g. expression
   * 'myKey in (select myKey in keyTable where fieldOfKeyTable like '%" + globalSearchTextField.getText()+ "%'))'
   * @return additional where conditions for global search
   */
  protected String getAdditionalWhereConditionForGlobalSearch() {
    return null;
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

  protected void reset() {
    if (searchElements != null) for (SearchElement searchElement : searchElements) {
      searchElement.reset();
    }
//    if (expertSearchTextArea != null) expertSearchTextArea.setText(""); //$NON-NLS-1$
    inquiryHistory.clear();
//    group.list.clear();
  }

}
