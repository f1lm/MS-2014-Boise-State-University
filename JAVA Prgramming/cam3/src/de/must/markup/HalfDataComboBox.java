/*
 * Copyright (c) 2001-2002 Christoph Mueller. All rights reserved.
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
 * ComboBox field with data from table.
 * @author Christoph Mueller
 */
/* To keep it similar to the Swing variant we left the identifiers and identifierTable as a first take, even if this is redundant to the Content Vectors, which we need for correct sorting.
 * Optimizing is possible using the VALUE attribute for fast key access.
 */
public class HalfDataComboBox extends MustInputField implements DataChangeListener {

  private static int instanceCounter = 0;

  private static String defaultAdditionalTagFragments;
  protected String additionalTagFragments;

  protected String label;
  protected boolean required = false;
  // private String nameForNoChoice = "&LT; ohne &GT;";
  private String nameForNoChoice = "< none >";
  private String orderByColumnName;

  protected DataObject contentDataObject;
  protected String visibleColumnName;
  protected String whereCondition;
  // protected boolean editable = true; not supported by "select"
  protected boolean enabled = true;

  protected IdentifierTextTable identifierTable;
  protected String selected;
  private boolean isToRefill = false;
  private boolean destroyed = false;

  /**
   * Creates a statically data filled combo box.
   * @param name the name of the combo box
   * @param contentArray the content of the combo box
   * @return the created combo box
   */
  public HalfDataComboBox(String name, String[] contentArray) {
    super(name);
    setAdditionalTagFragments(defaultAdditionalTagFragments);
    identifierTable = new IdentifierTextTable();
    this.name = name;
    for (int i = 0; i < contentArray.length; i++) {
      identifierTable.put(new Identifier(++i), contentArray[i]);
    }
  }

  /**
   * Creates a dynamically data filled combo box.
   * @param sessionData the session's public data
   * @param contentDataObject the data object to fill the content
   * @param visibleColumnName the name of the column to be displayed
   * @return the created combo box
   */
  public HalfDataComboBox(SessionData sessionData, DataObject contentDataObject, String visibleColumnName) {
    this(sessionData, contentDataObject, visibleColumnName, "position, " + visibleColumnName, null);
  }

  /**
   * Creates a dynamically data filled combo box.
   * @param sessionData the session's public data
   * @param name the name of the combo box
   * @param contentDataObject the data object to fill the content
   * @param visibleColumnName the name of the column to be displayed
   */
  public HalfDataComboBox(SessionData sessionData, String name, DataObject contentDataObject, String visibleColumnName) {
    this(sessionData, name, contentDataObject, visibleColumnName, "position, " + visibleColumnName, null);
  }

  /**
   * Creates a dynamically data filled combo box.
   * @param sessionData the session's public data
   * @param contentDataObject the data object to fill the content
   * @param visibleColumnName the name of the column to be displayed
   * @param orderByColumnName the sorting column name of the content data object
   * @param nameForNoChoice the expression to be used to indicate "no choice"
   */
  public HalfDataComboBox(SessionData sessionData, DataObject contentDataObject, String visibleColumnName, String orderByColumnName, String nameForNoChoice) {
    this(sessionData, "ComboBox" + ++instanceCounter, contentDataObject, visibleColumnName, orderByColumnName, nameForNoChoice);
  }

  /**
   * Creates a dynamically data filled combo box.
   * @param sessionData the session's public data
   * @param name the name of the combo box
   * @param contentDataObject the data object to fill the content
   * @param visibleColumnName the name of the column to be displayed
   * @param orderByColumnName the sorting column name of the content data object
   * @param nameForNoChoice the expression to be used to indicate "no choice"
   * @return the created combo box
   */
  public HalfDataComboBox(SessionData sessionData, String name, DataObject contentDataObject, String visibleColumnName, String orderByColumnName, String nameForNoChoice) {
    super(name);
    this.contentDataObject = contentDataObject;
    this.visibleColumnName = visibleColumnName;
    this.orderByColumnName = orderByColumnName;
    setAdditionalTagFragments(defaultAdditionalTagFragments);
    if (nameForNoChoice != null) this.nameForNoChoice = nameForNoChoice;
    else this.nameForNoChoice = "< " + sessionData.getFrameworkResourceString("TEXT_NONE") + " >";
    fillFromContentDataObject();
    contentDataObject.addDataChangeListener((DataChangeListener)this);
  }

  /**
   * Sets the component's default additional tag fragments. 
   * E.g. JavaScript like onChange may be added.
   * @param newDefaultClassName the component's default additional tag fragments.
   */
  public static void setDefaultAdditionalTagFragments(String newDefaultAdditionalTagFragments) {
    defaultAdditionalTagFragments = newDefaultAdditionalTagFragments;
  }

  /**
   * Sets the component's additional tag fragments.
   * E.g. JavaScript like onChange may be added.
   * @param newDefaultClassName the component's additional tag fragments.
   */
  public void setAdditionalTagFragments(String additionalTagFragments) {
    // if (this.additionalTagFragments == null) {
      this.additionalTagFragments = additionalTagFragments;
    /* } else {
      this.additionalTagFragments = this.additionalTagFragments + " " + additionalTagFragments;
    } */
  }

  private void fillFromContentDataObject() {
    StringBuffer queryString = new StringBuffer("select ");
    if (visibleColumnName.equals(contentDataObject.getUniqueKeyName())) {
      queryString.append(visibleColumnName);
    } else {
      queryString.append(visibleColumnName + ", " + contentDataObject.getUniqueKeyName());
    }
    queryString.append(" from " + contentDataObject.getTableName());
    // where is the use case for it?: if (orderByColumnName == null || orderByColumnName.equals(contentDataObject.getUniqueKeyName())) {
    if (whereCondition != null) {
      queryString.append(" where " + whereCondition);
    }
    if (orderByColumnName == null) {
      queryString.append(" order by " + visibleColumnName);
    } else {
      if (orderByColumnName.toLowerCase().equals(visibleColumnName.toLowerCase())) {
        queryString.append(" order by " + visibleColumnName);
      } else {
        queryString.append(" order by " + orderByColumnName + ", " + visibleColumnName);
      }
    }
    contentDataObject.openQuery(queryString.toString());
    identifierTable = new IdentifierTextTable();
    if (nameForNoChoice != null) {
      switch (contentDataObject.getIdentifyTemplate().getIdentifyType()) {
      case IdentifyTemplate.IDENTIFIED_BY_STRING:
        this.addItem(nameForNoChoice, new Identifier(""));
        break;
      default:
        this.addItem(nameForNoChoice, new Identifier(Identifier.REPRESENTATIVE_FOR_NOTHING));
        break;
      }
    }
    while (contentDataObject.nextRow()) {
      String value = contentDataObject.getText(visibleColumnName);
      if (value != null | !value.equals("")) {
        this.addItem(value, contentDataObject.getIdentifier());
      }
    }
    contentDataObject.closeQuery();
  }
  
  /**
   * Reduces the content of the combo box by adding a where condition to the 
   * select statement of the content date object and recall of the
   * fillFromContentDataObject method.
   * Applicable only for the combo box filled from database. 
   * @param whereCondition the where condition to use 
   */
  public void reduceContent(String whereCondition) {
    this.whereCondition = whereCondition;
    fillFromContentDataObject();
  }

  /**
   * Adds an item to the combo box.
   * @param item the item to add
   * @param identifyValueInt the identifier of the item to add
   */
  public void addItem(String item, Identifier identifier) {
    identifierTable.put(identifier, item);
  }

//  not supported by "select"
//  /**
//   * Sets the specified boolean to indicate whether or not this component
//   * should be editable.
//   * @param editable indicates whether or not this component is editable
//   */
//  public void setEditable(boolean editable) {
//    this.editable = editable;
//  }

  /**
   * Sets the specified boolean to indicate whether or not this component
   * is enabled.
   * @param enabled indicates whether or not this component is enabled
   */
  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  /**
   * Selects an item by the visible string
   * @param stringToSelect the string to select
   */
  public void setSelected(String stringToSelect){
    this.selected = stringToSelect;
  }

  /**
   * Returns the current selected item.
   * @return the current selected item
   */
  public String getSelectedItem() {
    return selected;
  }
  
  /**
   * Selects an item by the identifier.
   * @param selectedIdentifier the identifier to select an entry
   */
  public void setSelectedIdentifier(Identifier selectedIdentifier) {
    selected = (String)identifierTable.get(selectedIdentifier);
  }

  /**
   * Returns the int identifier of the selected entry.
   * @return the identifier of the selected entry
   */
  public Identifier getSelectedIdentifier() {
    try {
      return identifierTable.getIdentifier(selected);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "Combobox: Schlüssel nicht mehr verfügbar!");
      return null;
    }
  }

  /**
   * Returns the component's label.
   * @return the component's label
   */
  public String getLabel() {
    return label;
  }

  /**
   * Called from data objects when data have been changed.
   * Used for synchronization of data presentations.
   * @param e the data change event that happend.
   */
  public void DataChangePerformed(DataChangedEvent e) {
    // de.must.io.Logger.getInstance().info(getClass(), "ComboBox informiert zu Änderungen in " + e.getEntityName());
    if (e.getEntityName().equals(contentDataObject.getTableName()) && e.getSequenceType() != DataChangedEvent.NOT_THE_LAST_OF_A_SEQUENCE_TYPE) {
      isToRefill = true;
    }
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
  	StringBuffer tagSequence = new StringBuffer();
    if (isToRefill) fillFromContentDataObject();
    isToRefill = false;
    tagSequence = new StringBuffer("<select size=\"1\" name=\"" + name + "\"");
    // if (!editable) tagSequence.append(" readonly");
    if (!enabled) tagSequence.append(" disabled");
    if (additionalTagFragments != null) tagSequence.append(" " + additionalTagFragments);
    tagSequence.append(">");
    int count = identifierTable.size();
    for (int i = 0; i < count; i++) {
      String element = identifierTable.getTextAt(i);
      tagSequence.append("<option ");
      if (element.equals(selected)) tagSequence.append("selected ");
      tagSequence.append("value=\"" + element + "\">" + de.must.util.HtmlPiece.getHtmlRepresentation(element) + "</option>");
    }
    tagSequence.append("</select>");
    if (comment != null && !comment.equals("")) {
      tagSequence.append(" " + comment);
    }
    return tagSequence.toString();
  }

  /**
   * Causes the component to read user input by calling request.getParameter and
   * update the internal mirrored value.
   * @param request the current request
   */
  public void fetchYourValueFromRequest(GeneralizedRequest request) {
    String parm = request.getParameter(name);
    if (parm != null) {
      selected = (String)request.getParameter(name);
    // } else {
    // possibly caused by:  
    // - back button was used
    // - component is part of inactive area organized by TabButtonGroupForJsp
    }  
  }

  /**
   * Returns true if the choosen entry is not equals "no entry" or "any".
   * @return true if the choosen entry is not equals "no entry" or "any"
   */
  public boolean isSpecialChoice() {
    try {
      return !selected.equals(nameForNoChoice);
    }
    catch (Exception e) {
      return false;
    }
  }

  /**
   * Sets the fact that user input is requested (mandatory)
   * @param required whether this inuput is mandatory or not.
   */
  public void setRequired(boolean required) {
    this.required = required;
  }

  /**
   * Returns true if the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled() {
    return true;
  }

  /**
   * Returns true if the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isValid() {
    return true;
  }

  /**
   * Returns true if the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {
    if (required & !isSpecialChoice()) return true;
    return false;
  }

  public final void destroy() {
    if (destroyed) return; // already done - thus, we don't have to carefully avoid multiple calls
    free();
    destroyed = true;
  }
  
  /**
   * Frees external resources. May be called manually without waiting for the
   * garbage collector.
   */
  protected void free() {
    if (contentDataObject != null) {
      contentDataObject.removeDataChangeListener(this); // don't wait until gc removed weak reference
    }
  }

  /**
   * Called by the garbage collector. Calls free if the frame has not already
   * been destroyed.
   * Override free to add further releases and don't forget to call 
   * super.free() at the end.
   * @see #free()
   * @see #destroy()
   */
  protected final void finalize() throws Throwable {
    de.must.io.Logger.getInstance().debug(getClass(), "finalizing " + getClass().getName() + " / already destroyed = " + destroyed);
    if (!destroyed) free();
    super.finalize();
  }

}
