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

import java.sql.SQLException;
import java.util.Hashtable;
import java.util.StringTokenizer;
import java.util.Vector;

import de.must.dataobj.DataChangeListener;
import de.must.dataobj.DataChangedEvent;
import de.must.dataobj.DataObject;
import de.must.dataobj.Identifier;
import de.must.dataobj.IdentifierTextTable;
import de.must.dataobj.IdentifyTemplate;
import de.must.io.Logger;
import de.must.util.Callback;

public class HalfDataComboBox extends MustComboBox implements DataChangeListener {

  public static final String SPECIAL_NAME_FOR_NO_CHOICE_WHICH_MEANS_NOT_APPLICABLE = "not applicable"; 
  public static final int WIDTH_FITTING_TO_CONTENT = -1; 
  
  protected DataObject contentDataObject;
  protected String[] visibleColumnNames;
  protected String[] orderByColumnNames = new String[] {"position"};
  protected String nameForNoChoice;
  protected String[] specialChoices;
  protected String filterCondition;
  protected String inactiveColumnName;
  protected IdentifierTextTable identifierTable;
  protected Identifier editBeginValue;
  protected Hashtable<Identifier, String> weakItems;
  protected boolean contentIsToRenew = false;

  protected Callback callbackIfTableChanged; // strong reference!

  /**
   * Constructs a new combo box.
   * @param sessionData the session data
   * @param sourceDataObject the source data object
   * @param visibleColumnName the name of the column to be displayed
   */
  public HalfDataComboBox(SessionData sessionData, DataObject sourceDataObject, String visibleColumnName) {
    this(sessionData, sourceDataObject, visibleColumnName, null, null, 0); // see DataListFrames
  }

  /**
   * Constructs a new combo box.
   * @param sessionData the session data
   * @param sourceDataObject the source data object
   * @param visibleColumnName the name of the column to be displayed
   * @param fillWhileConstruction  whether or not this combo box should be filled while construction process
   */
  public HalfDataComboBox(SessionData sessionData, DataObject sourceDataObject, String visibleColumnName, boolean fillWhileConstruction) {
    this(sessionData, sourceDataObject, visibleColumnName, null, null, 0, fillWhileConstruction);
  }

  /**
   * Constructs a new combo box.
   * @param sessionData the session data
   * @param sourceDataObject the source data object
   * @param visibleColumnName the name of the column to be displayed
   * @param orderByColumnName the sorting column name of the content data object
   * @param fillWhileConstruction  whether or not this combo box should be filled while construction process
   */
  public HalfDataComboBox(SessionData sessionData, DataObject sourceDataObject, String visibleColumnName, String orderByColumnName, boolean fillWhileConstruction) {
    this(sessionData, sourceDataObject, visibleColumnName, orderByColumnName, null, 0, fillWhileConstruction);
  }

  /**
   * Constructs a new combo box.
   * @param sessionData the session data
   * @param sourceDataObject the source data object
   * @param visibleColumnName the name of the column to be displayed
   * @param orderByColumnName the sorting column name of the content data object
   * @param nameForNoChoice the expression to be used to indicate "no choice"
   */
  public HalfDataComboBox(SessionData sessionData, DataObject sourceDataObject, String visibleColumnName, String orderByColumnName, String nameForNoChoice) {
    this(sessionData, sourceDataObject, visibleColumnName, orderByColumnName, nameForNoChoice, 300);
  }

  /**
   * Constructs a new combo box.
   * @param sessionData the session data
   * @param sourceDataObject the source data object
   * @param visibleColumnName the name of the column to be displayed
   * @param orderByColumnName the sorting column name of the content data object
   * @param nameForNoChoice the expression to be used to indicate "no choice"
   * @param width the width of the component - if 0 it's automatically sized
   */
  public HalfDataComboBox(SessionData sessionData, DataObject sourceDataObject, String visibleColumnName, String orderByColumnName, String nameForNoChoice, int width) {
    this(sessionData, sourceDataObject, visibleColumnName, orderByColumnName, nameForNoChoice, width, true);
  }
  
  /**
   * Constructs a new combo box.
   * @param sessionData the session data
   * @param sourceDataObject the source data object
   * @param visibleColumnName the name of the column to be displayed
   * @param orderByColumnName the sorting column name of the content data object
   * @param nameForNoChoice the expression to be used to indicate "no choice"
   * @param width the width of the component - if 0 it's automatically sized
   * @param fillWhileConstruction  whether or not this combo box should be filled while construction process
   */
  public HalfDataComboBox(SessionData sessionData, DataObject sourceDataObject, String visibleColumnName, String orderByColumnName, String nameForNoChoice, int width, boolean fillWhileConstruction) {
    super(sessionData);
    if (nameForNoChoice != null && nameForNoChoice.length() > 0) {
      if (nameForNoChoice.equals(SPECIAL_NAME_FOR_NO_CHOICE_WHICH_MEANS_NOT_APPLICABLE)) this.nameForNoChoice = null;
      else this.nameForNoChoice = nameForNoChoice;
    } else {
      this.nameForNoChoice = "<" + getTranslation("TEXT_NAME_FOR_NO_CHOICE") + ">";
    }
    this.visibleColumnNames = getColumns(visibleColumnName);
    this.contentDataObject = sourceDataObject;
    if (orderByColumnName != null) {
      this.orderByColumnNames = getColumns(orderByColumnName);
    }
    if (fillWhileConstruction) fill();
    sourceDataObject.addDataChangeListener((DataChangeListener)this);
  }
  
  private String[] getColumns(String columnSequence) {
    StringTokenizer tokenizer = new StringTokenizer(columnSequence, " ,");
    String[] result = new String[tokenizer.countTokens()];
    int i = -1;
    while (tokenizer.hasMoreTokens()) {
      result[++i] = tokenizer.nextToken();
    }
    return result;
  }

  /**
   * Sets special choices to be displayed after 'name for no choice' and values from source data object.
   * This can only work with IdentifyTemplate.IDENTIFIED_BY_STRING!
   * @param specialChoices the specialChoices to set.
   */
  public void setSpecialChoices(String[] specialChoices) {
    this.specialChoices = specialChoices;
    fill();
  }

  /**
   * Sets the filter condition, e.g. not to present entries declared as inactive
   * @param filterCondition the condition to reduce the content
   */
  public void setFilterCondition(String filterCondition) {
    this.filterCondition = filterCondition;
    fill();
  }
  
  /**
   * Sets the column name to determine inactive items.
   * Inactive items will only be presented if assigned.
   * @param inactiveColumnName the name to determine inactive items
   */
  public void setInactiveColumnName(String inactiveColumnName) {
    this.inactiveColumnName = inactiveColumnName;
    weakItems = new Hashtable<Identifier, String>();
    fill();
    sessionData.callIfTableContentHasBeenChanged(contentDataObject.getTableName(), callbackIfTableChanged = new Callback() {
      public void callback() {
        fill();
      }
    });
  }
  
  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey) {
    return sessionData.getFrameworkResourceString(resourceKey);
  }

  @Override
  public void removeAllItems() {
    contentIsToRenew = true;
    super.removeAllItems();
  }

  /**
   * Fills or refills the content of the data combo box by reading the source
   * data object.
   */
  protected void fill() {
    fill(filterCondition);
  }

  /**
   * Fills or refills the content of the data combo box by reading the source
   * data object.
   * @param whereCondition the where condition to shorten the content
   */
  public void fill(String whereCondition) {
    // let's guaranty that all needed columns are selected uniquely!
    identifierTable = new IdentifierTextTable();
    Vector<String> columsToSelect = new Vector<String>(); 
    for (String visibleColumn : visibleColumnNames) {
      columsToSelect.add(visibleColumn);
    }
    String[] keys = contentDataObject.getIdentifyTemplate().getIdentifyColumnNames();
    for (String key : keys) {
      addIfNotContainedIgnoreCase(columsToSelect, key);
    }
    for (String orderByColumn : orderByColumnNames) {
      addIfNotContainedIgnoreCase(columsToSelect, orderByColumn);
    }
    if (inactiveColumnName != null) {
      addIfNotContainedIgnoreCase(columsToSelect, inactiveColumnName);
    }
    String queryString = "select ";
    for (String column : columsToSelect) {
      if (!column.equals(columsToSelect.firstElement())) queryString += ", ";
      queryString += column;
    }
    queryString += " from " + contentDataObject.getTableName();
    if (whereCondition != null) {
      queryString += " where " + whereCondition;
    }
    String orderByColumnSequence = "";
    boolean firstVisibleColumnAlreadyInOrderSequence = false;
    if (orderByColumnNames.length > 0) {
      for (String column : orderByColumnNames) {
        if (orderByColumnSequence.length() > 0) orderByColumnSequence += ", ";
        orderByColumnSequence += column;
        if (column.equalsIgnoreCase(visibleColumnNames[0])) firstVisibleColumnAlreadyInOrderSequence = true;
      }
    }
    if (!firstVisibleColumnAlreadyInOrderSequence) {
      if (orderByColumnSequence.length() > 0) orderByColumnSequence += ", ";
      orderByColumnSequence += visibleColumnNames[0];
    }
    if (orderByColumnSequence.length() > 0) queryString += " order by " + orderByColumnSequence;
    contentDataObject.openQuery(queryString);
    try {removeAllItems();} catch (Exception e) {};
    if (weakItems != null) weakItems.clear();
    if (nameForNoChoice != null) {
      switch (contentDataObject.getIdentifyTemplate().getIdentifyType()) {
      case IdentifyTemplate.IDENTIFIED_BY_STRING:
        addItem(nameForNoChoice, new Identifier(""));
        break;
      case IdentifyTemplate.IDENTIFIED_BY_MULTIPLE_COLUMNS:
        int[] types = contentDataObject.getIdentifyTemplate().getColumnTypes();
        Object[] nothing = new Object[types.length];
        for (int i = 0; i < types.length; i++) {
          switch (types[i]) {
          case IdentifyTemplate.TYPE_TEXT:
            nothing[i] = "";
            break;
          default:
            nothing[i] = new Integer(Identifier.REPRESENTATIVE_FOR_NOTHING);
            break;
          }
        }
        addItem(nameForNoChoice, new Identifier(nothing));
        break;
      default:
        addItem(nameForNoChoice, new Identifier(Identifier.REPRESENTATIVE_FOR_NOTHING));
        break;
      }
    }
    if (specialChoices != null) {
      for (int i = 0; i < specialChoices.length; i++) {
        addItem(specialChoices[i], new Identifier(specialChoices[i]));
      }
    }
    while (contentDataObject.nextRow()) {
      String value = contentDataObject.getText(visibleColumnNames[0]);
      for (int i = 1; i < visibleColumnNames.length; i++) {
        value += " / " + contentDataObject.getText(visibleColumnNames[i]);
      }
      if (value != null && !value.equals("")) {
        if (inactiveColumnName != null && contentDataObject.getBoolean(inactiveColumnName)) {
          weakItems.put(contentDataObject.getIdentifier(), value);
        } else {
          addItem(value, contentDataObject.getIdentifier());
        }
      }
    }
    contentDataObject.closeQuery();
  }
  
  private void addIfNotContainedIgnoreCase(Vector<String> list, String element) {
    boolean containsIgnoreCase = false;
    for (String listItem : list) {
      if (listItem.equalsIgnoreCase(element)) containsIgnoreCase = true;
    }
    if (!containsIgnoreCase) list.add(element);
  }
  
  @Override
  public void setValues(ToAppletWriter out) {
    if (contentIsToRenew) {
      updateRemoteView(out);
      contentIsToRenew = false;
    }
    super.setValues(out);
  }

  /**
   * Selects all input of the component, if it is supported - e.g. in JTextField.
   * Allows easy new input, because the previous value is reseted when the
   * first key stroke occurs.
   */
  public void selectAll() {
  }

  /**
   * Adds an item to the combo box.
   * @param item the item to add
   * @param identifyValueInt the identifier of the item to add
   */
  public void addItem(String item, Identifier identifier) {
    if (identifier == null) identifier = new Identifier(0);
    Logger.getInstance().debug(getClass(), "adding item " + item + ", id " + identifier);
    identifierTable.put(identifier, item); // fill identifierTable first, there may be ItemStateChangeListeners working with it
    if (item.equals("")) super.addItem(" ");
    else super.addItem(item);
  }
  
  /**
   * Selects an item by the identifier.
   * @param selectedIdentifier the identifier to select an entry
   * @return true
   */
  public boolean setSelectedIdentifier(Identifier selectedIdentifier) {
    if ( weakItems != null) {
      // check if have to remove previously added weak items
//      Enumeration<Identifier> enumeration = weakItems.keys();
//      while (enumeration.hasMoreElements()) {
//        Identifier identifier = enumeration.nextElement();
//        if (!identifier.equals(selectedIdentifier)) {
//          removeItem(identifier);
//        }
//      }
    }
    String text = identifierTable.get(selectedIdentifier);
    if (text == null && weakItems != null) {
      // maybe there are elder inactive items - they should not be assigned in new items, but needed her for existing assigments.
      text = weakItems.get(selectedIdentifier);
      if (text != null) {
        addItem(text, selectedIdentifier);
      }
    }
    Logger.getInstance().debug(getClass(), "Selecting " + text + " from " + selectedIdentifier);
    if (text == null) return false;
    value = text;
    return true;
  }

  /**
   * Selects an item of the combo box by identifier.
   * @param selectIdentifier the identifier (primary key) of the item to select
   */
  public void setSelectedIdentifierAsBeginValue(Identifier identifier) {
    editBeginValue = identifier;
    setSelectedIdentifier(identifier);
  }

  /**
   * Returns the identifier of the selected entry.
   * @return the identifier of the selected entry
   */
  public Identifier getSelectedIdentifier() {
    try {
      Identifier selectedIdentifier = identifierTable.getIdentifier(value);
      return selectedIdentifier;
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "Combobox: Schlüssel nicht mehr verfügbar!");
      return null;
    }
  }
  
  /**
   * Returns the selected item as String after replacing '<no choice>' by ''.
   * @return the selected item as String after replacing '<no choice>' by ''
   */
  public String getSelectedItemWithoutNameForNoChoice() {
    String result = (String)getSelectedItem();
    if (result.equals(nameForNoChoice)) result = "";
    return result;
  }

  /**
   * Returns true if the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled() {
    if (nameForNoChoice == null) return true;
    // de.must.io.Logger.getInstance().info(getClass(), nameForNoChoice);
    // de.must.io.Logger.getInstance().info(getClass(), getSelectedItem());
    return (!getSelectedItem().equals(nameForNoChoice.trim()));
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    try {
      Identifier selectedIdentifier = (Identifier)identifierTable.getIdentifier((String)getSelectedItem());
      return (!selectedIdentifier.equals(editBeginValue));
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "Combobox: Schlüssel nicht mehr verfügbar!");
      return false;
    }
  }

  /**
   * Returns true if the selected item is not the placeholder for "none" or "any".
   * @return true if the selected item is not the placeholder for "none" or "any"
   */
  public boolean isSpecialChoice() {
    try {
      return !value.equals(nameForNoChoice);
    }
    catch (Exception e) {
      return false;
    }
  }

  /**
   * Selects the item to be used to indicate "no special choice"
   */
  public void setNoSpecialChoice() {
    if (nameForNoChoice != null) setSelectedItem(nameForNoChoice);
  }

  /**
   * Invoked when data have been changed. Used to fire a component modified event.
   * @param e the key event
   */
  public void DataChangePerformed(DataChangedEvent e) {
    if (e.getEntityName().equals(contentDataObject.getTableName()) && e.getSequenceType() != DataChangedEvent.NOT_THE_LAST_OF_A_SEQUENCE_TYPE && isConnectionOpen()) { // e.g. connection may be closed after user changed database - the windows are closed and not used any more but still existing until garbage collection
      fill();
    }
  }

  private boolean isConnectionOpen() {
    try {
      return !contentDataObject.getConnection().isClosed();
    } catch (SQLException e) {
      return false;
    }
  }
  
  /**
   * Frees external resources. May be called manually without waiting for the
   * garbage collector.
   */
  public void free() {
    // contentDataObject.removeDataChangeListener(this);
  }

  /**
   * Called by the garbage collector.
   */
  protected void finalize() throws Throwable {
    free();
    super.finalize();
  }

}
