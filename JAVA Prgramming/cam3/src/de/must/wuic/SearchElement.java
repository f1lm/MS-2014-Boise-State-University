/*
 * Copyright (c) 2014 Christoph Mueller. All rights reserved.
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

import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.util.Vector;

import de.must.dataobj.DataObject;
import de.must.dataobj.WhereCondition;
import de.must.io.Logger;
import de.must.middle.MessageReceiver;
import de.must.util.DateString;
import de.must.util.KeyValuePairAlpha;
import de.must.util.SearchItem;

/**
 * A combination of GUI elements to allow the user to choose column names, comparison and enter values to build where conditions without knowledge about the database and SQL
 * @author Christoph Müller
 */
public class SearchElement {
  
  public static final int TYPE_TEXT = 0;
  public static final int TYPE_NUMERIC = 1;
  public static final int TYPE_DATE = 8;
  
  /**
   * Extends a where condition with multiple where conditions of several search items. 
   * @param whereCondition  the where condition to extend
   * @param searchElements  the search elements which shall extend the condition
   * @param combineOr  whether or not or conditions should be treated in advance
   */
  public static void extend(WhereCondition whereCondition, Vector<SearchElement> searchElements, boolean combineOr) {
    if (combineOr) {
      boolean bracket = false;
      for (int i = 0; i < searchElements.size(); i++) {
        SearchElement searchElement = searchElements.elementAt(i);
        if (i < searchElements.size()-1 && searchElements.elementAt(i+1).isOr() && !bracket) {
          whereCondition.openBracket();
          bracket = true;
        }
        searchElement.extend(whereCondition);
        if (bracket && (i >= searchElements.size()-1 || !searchElements.elementAt(i+1).isOr())) {
          whereCondition.closeBracket();
          bracket = false;
        }
      }
    } else {
      for (SearchElement searchElement : searchElements) {
        searchElement.extend(whereCondition);
      }
    }
  }
  
  private SearchItem[] searchItems;
  private MessageReceiver messageReceiver;
  private DataObject dataObject;
  private VariableChoice combination;
  private VariableChoice columns;
  private VariableChoice relations;
  private MustTextField valueField;
  private int defaultColumnIndex;
  
  /**
   * Constructs a new search element.
   * @param searchItems  the search items to be offered in this search element
   * @param messageReceiver  the receiver of messages produced by this element
   * @param dataObject  the data object to format date condition
   */
  public SearchElement(SearchItem[] searchItems, MessageReceiver messageReceiver, DataObject dataObject) {
    this(searchItems, messageReceiver, dataObject, 0);
  }
  
  /**
   * Constructs a new search element.
   * @param searchItems  the search items to be offered in this search element
   * @param messageReceiver  the receiver of messages produced by this element
   * @param dataObject  the data object to format date condition
   * @param defaultColumnIndex  the default column index
   */
  public SearchElement(SearchItem[] searchItems, MessageReceiver messageReceiver, DataObject dataObject, int defaultColumnIndex) {
    this.searchItems = searchItems;
    this.messageReceiver = messageReceiver;
    this.dataObject = dataObject;
    this.defaultColumnIndex = defaultColumnIndex;
    combination = new VariableChoice(new KeyValuePairAlpha[]{
      new KeyValuePairAlpha("and", getTranslation("TEXT_AND")), // index = WhereCondition.AND 
      new KeyValuePairAlpha("or", getTranslation("TEXT_OR")), // index = WhereCondition.OR 
    });
    columns = new VariableChoice(searchItems);
    relations = new VariableChoice(new KeyValuePairAlpha[] {
      new KeyValuePairAlpha("like", getTranslation("TEXT_CONTAINS")),  
      new KeyValuePairAlpha("startsWith", getTranslation("TEXT_STARTS_WITH")),  
      new KeyValuePairAlpha("not like", getTranslation("TEXT_DOESNT_CONTAIN")),  
      new KeyValuePairAlpha("=", getTranslation("TEXT_IS_EQUALS")),  
      new KeyValuePairAlpha("<>", getTranslation("TEXT_IS_NOT")),  
      new KeyValuePairAlpha(">=", getTranslation("TEXT_GREATER_EQUALS")),  
      new KeyValuePairAlpha("<=", getTranslation("TEXT_LOWER_EQUALS")),  
    });
    valueField = new MustTextField(30);
    columns.addItemListener(new ItemListener() {
      public void itemStateChanged(ItemEvent arg0) {
        if (relations.getSelectedIndex() < 3 && SearchElement.TYPE_DATE == SearchElement.this.searchItems[columns.getSelectedIndex()].getType()) {
          relations.setSelectedIndex(3);
        }
      }
    });
  }

  /**
   * Adds all components of this search element to the specified attribute list.
   * @param attributeList the attribute list to add the components to
   */
  public void addTo(AttributeList attributeList) {
    attributeList.append("", combination);
    attributeList.append(columns);
    attributeList.append(relations);
    attributeList.append(valueField);
  }
  
  /**
   * Registers all GUI elements to the specified inquiry history.
   * @param inquiryHistory the inquiry history manager
   */
  public void register(InquiryHistory inquiryHistory) {
    inquiryHistory.register(combination);
    inquiryHistory.register(columns);
    inquiryHistory.register(relations);
    inquiryHistory.register(valueField);
  }
  
  /**
   * Returns the text field containing the search value.
   * @return the text field containing the search value
   */
  public MustTextField getValueField() {
    return valueField;
  }
  
  /**
   * Selects the item at index <code>index</code>.
   * @param anIndex an integer specifying the list item to select,
   *                  where 0 specifies the first item in the list and -1 indicates no selection
   * @exception IllegalArgumentException if <code>anIndex</code> < -1 or
   *                  <code>anIndex</code> is greater than or equal to size
   */
  public void setSelectedIndex(int index) {
    columns.setSelectedIndex(index);
  }
  
  /**
   * Resets all GUI elements to the first state
   */
  public void reset() {
    combination.setSelectedIndex(0);
    columns.setSelectedIndex(defaultColumnIndex);
    relations.setSelectedIndex(0);
    valueField.setText("");
  }
  
  /**
   * Returns true if the selected combination request is 'or'.
   * @return true if the selected combination request is 'or'
   */
  public boolean isOr() {
    return "or".equals(combination.getSelectedItemKey());
  }
  
  /**
   * Returns true if user input is accepted.
   * @return true if user input is accepted.
   */
  public boolean isInputAccepted() {
    String value = valueField.getText();
    if (value.length() > 0) {
      switch (searchItems[columns.getSelectedIndex()].getType()) {
      case TYPE_NUMERIC:
        try {
          DecimalFormat.getInstance().parse(value).doubleValue();
        } catch (ParseException e) {
          messageReceiver.receive(getTranslation("TEXT_FORMALLY_INVALID"));
          valueField.requestFocus();
          valueField.selectAll();
          return false;
        }
        break;
      case TYPE_DATE:
        DateString dateString = new DateString(value);
        if (dateString.isValid()) {
          valueField.setText(dateString.getEditableDateString());
        } else {
          messageReceiver.receive(getTranslation("TEXT_FORMALLY_INVALID"));
          valueField.requestFocus();
          valueField.selectAll();
          return false;
        }
        break;
      }
    }
    return true;
  }
  
  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey) {
    return WuicGlobal.getInstance().getResourceString(resourceKey);
  }

  /**
   * Builds the part of the where condition represented by user input and adds it to the specified where condition.
   * @param whereCondition  the where condition which should be extended by current users choice
   */
  public void extend(WhereCondition whereCondition) {
    String relation = relations.getSelectedItemKey();
    String value = valueField.getText();
    SearchItem searchItem = searchItems[columns.getSelectedIndex()];
    if (value.length() > 0) {
      switch (searchItem.getType()) {
      case TYPE_TEXT:
        if (relation.indexOf("like") != -1) value = "%" + value + "%";
        else if (relation.indexOf("startsWith") != -1) {
          relation = "like";
          value = value + "%";
        }
        whereCondition.append(combination.getSelectedIndex(), searchItem.getPreamble(), columns.getSelectedItemKey(), relation, value, true);
        break;
      case TYPE_NUMERIC:
        try {
          whereCondition.append(combination.getSelectedIndex(), searchItem.getPreamble(), columns.getSelectedItemKey(), relation, DecimalFormat.getInstance().parse(valueField.getText()).doubleValue(), true);
        } catch (ParseException e) {
          Logger.getInstance().error(getClass(), e);
        }
        break;
      case TYPE_DATE:
        whereCondition.append(combination.getSelectedIndex(), searchItem.getPreamble(), columns.getSelectedItemKey(), relation, (new DateString(valueField.getText())).getSqlDate(), dataObject);
        break;
      default:
        break;
      }
    }
  }
  
}
