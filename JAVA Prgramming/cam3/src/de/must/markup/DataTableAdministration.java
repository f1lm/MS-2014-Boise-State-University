/*
 * Copyright (c) 2001-2007 Christoph Mueller. All rights reserved.
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
import de.must.util.DateString;
import java.math.BigDecimal;
import java.util.Hashtable;

/**
 * Frame-like container to enclose input-output fields like text fields with
 * database field association grid-like. Controls load and save actions.
 * Used for property administration of a multiple database records.
 * It is meant to contain several strorables like e.g. DataTextField.
 * @author Christoph Mueller
 */
public abstract class DataTableAdministration extends Dialog {

  public static final int ACTION_DELETE = 3;

  protected DataObject assignedDataObject;
  private String generator = "generator name";
  private String title;
  private TableAdministrationSubmission submission = new TableAdministrationSubmission();
  private Invokable submitter;
  int[] columnTypes;
  protected boolean wantToBeFinalized = false;

  /**
   * Constructs a new data property administration.
   * @param sessionData the session's public data
   */
  public DataTableAdministration(SessionData sessionData) {
    super(sessionData);
    this.assignedDataObject = getAssignedDataObject();
    createDataTableModel();
  }

  /**
   * Initializes the invokable in order to reuse the component without garbage
   * from the previous use.
   */
  public void init() {
    super.init();
    loadValues();
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
   * Returns true if the invokable wants to be finalized after request is worked off.
   * @return true if the invokable wants to be finalized
   */
  public boolean wantToBeFinalized() {
    return wantToBeFinalized;
  }

  /**
   * Returns the assigned data object.
   * @return the assigned data object
   */
  protected abstract DataObject getAssignedDataObject();

  /**
   * Returns the names of the columns to be laid-out.
   * @return the names of the columns to be laid-out
   */
  protected abstract String[] getColumnNames();
  // protected abstract String[] getColumnLabels();

  /**
   * Returns the labels of the columns to be laid-out.
   * @return the labels of the columns to be laid-out
   */
  protected String[] getColumnLabels() {
    return new String[] {sessionData.getFrameworkResourceString("TEXT_DESCRIPTION"), sessionData.getFrameworkResourceString("TEXT_POS")};
  }

  /**
   * Returns true if the entry as specified by the identifier is in use.
   * @param keyIdentifier the identifier of the entry to be checked
   * @return true if the entry is in use
   */
  protected abstract boolean isInUse(Identifier keyIdentifier);

  /**
   * Returns true if it is allowed to cancel the dialog.
   * @return true if it is allowed to cancel the dialog
   */
  public boolean isCancelAllowed() {
    return true;
  }

  /**
   * Returns true if it is allowed to close the dialog.
   * @return true if it is allowed to close the dialog
   */
  public boolean isClosingAllowed() {
    return isCancelAllowed();
  }

  // stuff from former DataTableModel

  private String tableName;
  private int rowCapacity;
  private int numberOfLoadedRows;
  private int numberOfEditableRows;

  private Object[] fieldInis;  // initialize-values
  private Object[][] data;
  private Object[][] oriData;  // original Data
  private Identifier[] identifiers;
  private int[] fieldLengths;
  private boolean[] delMark;
  private String order;
  private int lastModifiedRow;
  private Hashtable<Integer, Activity> activityTable = new Hashtable<Integer, Activity>();
  private Activity currentActivity;

  /**
   * Creates a new data table model.
   */
  public void createDataTableModel() {
    if (assignedDataObject.getIndices().length >= 2) {
      createDataTableModel(1); // the secondary index is usually the index for listing
    } else {
      createDataTableModel(-1); 
    }
  }

  /**
   * Creates a new data table model with the specified sort index number.
   * @param sortIndexNbr the index of the index (object de.must.dataobj.Index)
   * to be used for the order by clause.
   */
  public void createDataTableModel(int sortIndexNbr) {
    this.tableName = assignedDataObject.getTableName();
    rowCapacity = getNumberOfExistingRows() + 20;
    if (rowCapacity < 100) rowCapacity = 100;
    data = new Object[rowCapacity][getColumnNames().length];
    oriData = new Object[rowCapacity][getColumnNames().length];
    identifiers = new Identifier[rowCapacity];
    fieldLengths = new int[rowCapacity];
    delMark = new boolean[rowCapacity];
    fieldInis = new Object[getColumnNames().length];
    int i;
    int orderElements;
    if (sortIndexNbr > -1) {
      Index SortIndex = assignedDataObject.getIndices()[sortIndexNbr];
      orderElements = SortIndex.getIndexItems().length;
      this.order = SortIndex.getIndexItems()[0].getFieldName();
      for (i = 1; i < orderElements; i++) {
        this.order += ", " + SortIndex.getIndexItems()[i].getFieldName();
      }
    }
  }

  /**
   * Returns the number of existing rows.
   * @return the number of existing rows
   */
  private int getNumberOfExistingRows() {
    assignedDataObject.openQuery("select * from " + tableName);
    int numberOfExistingRows = 0;
    while (assignedDataObject.nextRow()) {
      numberOfExistingRows++;
    }
    assignedDataObject.closeQuery();
    return numberOfExistingRows;
  }

  /**
   * Returns the HREF for deleting the entry associated to the specified row.
   * @param row the number of the row
   */
  private String getDeleteHref(int row) {
    activityTable.put(new Integer(++sessionData.activityNbr), new Activity(ACTION_DELETE, identifiers[row]));
    return sessionData.getBaseURL() + "&ACT=" + sessionData.activityNbr;
  }

  /**
   * Loads values into the grid.
   */
  public void loadValues() {
    int i, j;
    for (i=0; i < rowCapacity; i++) {
      delMark[i] = false;
    }
    String queryExpression = "select * from " + tableName;
    if (order != null && !order.equals("")) {
      queryExpression += " order by " + order;
    }
    assignedDataObject.openQuery(queryExpression);
    columnTypes = getColumnTypes();
    i = -1;
    while (assignedDataObject.nextRow()) {
      i++; j = -1;
      identifiers[i] = assignedDataObject.getIdentifier();
      for (j=0; j < getColumnNames().length; j++) {
        if (columnTypes[j] == 93 ) {
          java.sql.Date tempDate = assignedDataObject.getDate(getColumnNames()[j]);
          if (tempDate == null) {
            data[i][j] = "";
            oriData[i][j] = "";
          } else {
            DateString tempDateString =  new DateString(sessionData.locale, tempDate);
            data[i][j] = tempDateString.getEditableDateString();
            oriData[i][j] = tempDateString.getEditableDateString();
          }
        } else {
          String item = assignedDataObject.getObject(getColumnNames()[j]).toString();
          data[i][j] = item;
          oriData[i][j] = item;
        }
      }
    }
    numberOfLoadedRows = i + 1;
    // preparing initialize-values
    for (j=0; j < getColumnNames().length; j++) {
      fieldLengths[j] = assignedDataObject.getColumnLength(getColumnNames()[j]);
      switch (columnTypes[j]) {
      case -7:
        fieldInis[j] = new Boolean(false);
        break;
      case -4:
        fieldInis[j] = "";
        break;
      case 1:
        fieldInis[j] = "";
        break;
      case 2:
        fieldInis[j] = new BigDecimal(0);
        break;
      case 3: // AS/400 7P0
        fieldInis[j] = new Integer(0);
        break;
      case 4:
        fieldInis[j] = new Integer(0).toString();
        break;
      case 5:
        fieldInis[j] = new Long(0);
        break;
      case 7:
        fieldInis[j] = new Float(0);
        break;
      case 12:
        fieldInis[j] = new String("");
        break;
      case 93:
        fieldInis[j] = new String("");
        break;
      }
    }
    // initializing the rest of the table
    int k;
    for (k=i+1; k < rowCapacity; k++) {
      identifiers[k] = null;
      for (j=0; j < getColumnNames().length; j++) {
        data[k][j] = fieldInis[j];
        oriData[k][j] = fieldInis[j];
      }
    }
  }

  /**
   * Tuning: avoid repeated i*j call of assignedDataObject.getColumnType 
   */
  private int[] getColumnTypes() {
    int[] columnTypes = new int[getColumnNames().length];
    for (int j=0; j < getColumnNames().length; j++) {
      columnTypes[j] = assignedDataObject.getColumnType(getColumnNames()[j]);
    }
    return columnTypes;
  }

  /**
   * Returns the identify value (primary key) of the entry in the row as specified.
   * @param row the row of the watched entry
   * @return the identify value of the entry
   */
  public Identifier getIdentifyValue(int row) {
    return identifiers[row];
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
    tagSequence += "<html>";
    tagSequence += "<head>";
    tagSequence += "   <title>" + "Title to specify" + "</title>";
    tagSequence += "   <meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">";
    tagSequence += "   <meta name=\"GENERATOR\" content=\"" + generator + " [www.must.de]\">";
    tagSequence += "</head>";
    tagSequence += "<body bgcolor=\"#C0C0C0\">";
    tagSequence += "<form action=\"" + sessionData.getBaseURL() + "\" method=POST>";
    tagSequence += "<input type=\"hidden\" name=" + "\"" + NAME_FOR_DIALOG_NBR + "\"" + " value=\"" + sessionData.dialogNbr + "\">";
    tagSequence += "<table><tr>";
    tagSequence += getInnerTableTagSequence();
    tagSequence += "</tr></table>";
    tagSequence += "<br>";
    tagSequence += "<center>";
    tagSequence += "<input type=\"submit\" name=" + "\"" + NAME_FOR_OK_ACTION + "\"" + " value=\"" + sessionData.getFrameworkResourceString("TEXT_OK_BUTTON") + "\">";
    tagSequence += "&nbsp;&nbsp;";
    tagSequence += "<input type=\"submit\" name=\"cancel\" value=\"" + sessionData.getFrameworkResourceString("TEXT_CANCEL_BUTTON") + "\">";
    tagSequence += "</center>";
    tagSequence += "</form>";
    tagSequence += getFooter();
    return tagSequence;
  }

  /**
   * Returns the kernel default tag sequence.
   * Normally you should not call this method directly.
   * Use Layout implementing classes instead.
   * @return the default tag sequence (as HTML)
   * @see Layout
   */
  public String getInnerTableTagSequence() {
    // temporary:
    String toolTipText = null;
    int size;
    StringBuffer tagSequence = new StringBuffer();

    int i, j;
    tagSequence.append("<tr>");
    for (j=0; j < getColumnNames().length; j++) {
      tagSequence.append("<td>");
      tagSequence.append(getColumnLabels()[j]);
      tagSequence.append("</td>");
    }
    tagSequence.append("</tr>");

    // for (i=0; i < data.length; i++) {
    numberOfEditableRows = numberOfLoadedRows + 5;
    if (numberOfEditableRows > data.length) numberOfEditableRows = data.length;
    for (i=0; i < numberOfEditableRows; i++) {
      tagSequence.append("<tr>");
      for (j=0; j < getColumnNames().length; j++) {
      tagSequence.append("<td>");
        switch (columnTypes[j]) {
        case 4:
          tagSequence.append("<input type=\"Text\" name=\"" + getColumnNames()[j] + i + "\" value=\"" + data[i][j] +  "\" size=\"" + 5 + "\" maxlength=\"" + 99 + "\"");
          if (toolTipText != null) {
            tagSequence.append(" onMouseOver=\"window.status='" + toolTipText + "';return true\" onMouseOut=\"window.status='';return true\"");
          }
          tagSequence.append(">");
          break;
        case 93:
          break;
        default:
          size = fieldLengths[j];
          if (size > 50) size = 50;
          tagSequence.append("<input type=\"Text\" name=\"" + getColumnNames()[j] + i + "\" value=\"" + data[i][j] +  "\" size=\"" + size + "\" maxlength=\"" + fieldLengths[j] + "\"");
          if (toolTipText != null) {
            tagSequence.append(" onMouseOver=\"window.status='" + toolTipText + "';return true\"");
          }
          tagSequence.append(">");
          break;
        }
        tagSequence.append("</td>");
      }
      if (identifiers[i] != null) {
        tagSequence.append("</td><td>");
        tagSequence.append(" <a href=\"" + getDeleteHref(i) + "\">" + "[" +  sessionData.getFrameworkResourceString("TEXT_DELETE") + "]" + "</a>");
      }
      tagSequence.append("</tr>");
    }

    return tagSequence.toString();
  }
  
  /**
   * Indicates whether the request fits to this dialog.
   * Useful to stop the user to use any back functions of the browser. 
   * @param request the request to check
   * @return true if the request fits to this dialog
   */
  public boolean isSuitableDialog(GeneralizedRequest request) {
    // checking GET variant
    String activityParm = request.getParameter("ACT");
    if (activityParm == null) {
      currentActivity = null;
    } else {
      try {
        Integer currentActivityKey = new Integer(activityParm);
        currentActivity = (Activity)activityTable.get(currentActivityKey);
        if (currentActivity == null) return false;
        return true;
      } catch (Exception e) {
        de.must.io.Logger.getInstance().error(getClass(), e);
        return false;
      }
    }
    return super.isSuitableDialog(request);
  }

  /**
   * Allows the invokable to react to the request. Sample: saving data when Ok
   * button was pressed.
   * @param request the requeset to react to
   */
  public void process(GeneralizedRequest request) {
    super.process(request);
    if (request.getParameter(NAME_FOR_CANCEL_ACTION) != null) {
      assignedDataObject.rollbackIfNotAutoCommit();
      setStackMovement(-1);
      return;
    }
    if (currentActivity != null) {
      if (currentActivity.actionId == ACTION_DELETE) {
        setStackMovement(0);
        if (isInUse(currentActivity.identifier)) {
          setMessageToKeep(sessionData.getFrameworkResourceString("TEXT_ENTRY_IS_IN_USE") + "!");
          return;
        } else {
          for (int i = 0; i < identifiers.length; i++) {
            if (identifiers[i] == currentActivity.identifier) {
              markForDeletion(i);
              return;
            }
          }
        }
      }
    }
    // default button: if (request.getParameter(NAME_FOR_OK_ACTION) != null) {
    // (Enter doesn't update button's parameter)
      handleSaveRequest();
      return;
    // }
  }

  /**
   * Causes the invokable to delegate this function to all embedded markupables
   * to fetch their current value as edited by the user from the request.
   * @param request the request from where the values are to be fetched
   * @see Markupable#fetchYourValueFromRequest
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    int i, j;
    for (i=0; i < numberOfEditableRows; i++) {
      for (j=0; j < getColumnNames().length; j++) {
        Object parm = request.getParameter(getColumnNames()[j] + i);
        if (parm != null) data[i][j] = parm; // (delete request may not post!)
      }
    }
  }

  /**
   * Marks the entry in row as specified as to be deleted.
   * @param row the row of the entry to be deleted
   */
  public void markForDeletion(int row) {
    // de.must.io.Logger.getInstance().info(getClass(), "row to delete: " + row);
    if (row > -1 & row < numberOfEditableRows) {
      delMark[row] = true;
      data[row][0] = "- entfernt -";
    }
  }

  /**
   * Handles save request.
   */
  public void handleSaveRequest() {
    if (!inputCheckOk()) {
      setMessageToKeep(sessionData.getFrameworkResourceString("TEXT_INPUT_NOT_ACCEPTED"));
      return;
    }
    if (isModified()) {
      saveValues();
      assignedDataObject.commitIfNotAutoCommit();
    }
    setStackMovement(-1);
  }

  private boolean inputCheckOk() {
    int i;
    for (i=0; i < rowCapacity; i++) {
      if (!isRowAccepted(i)) return false;
    }
    return isInputAccepted();
  }

  /**
   * Returns true if user input is accepted.
   * @return true if user input is accepted
   */
  protected boolean isInputAccepted() { // to be overridden by child if needed!
    return true;
  }

  private boolean isRowAccepted(int i) {
    for (int j=0; j < getColumnNames().length; j++) {
      switch (columnTypes[j]) {
      case 4:
        if (data[i][j].toString().trim().equals("")) return true;
        try {
          Integer.valueOf(data[i][j].toString());
        }
        catch (NumberFormatException nfe) {
          return false;
        }
        return true;
      case 93:
        if (!((String)data[i][j]).equals("")) {
          DateString temp = new DateString(sessionData.locale, (String)data[i][j]);
          if (!temp.isValid()) return false;
        }
      }
    }
    return true;
  }

  /**
   * Saves values.
   * @return true if changes occurred.
   */
  public boolean saveValues() {
    lastModifiedRow = this.getLastModifiedRow();
    boolean isChanged = false;
    int i;
    for (i=0; i < numberOfEditableRows; i++) {
      // de.must.io.Logger.getInstance().info(getClass(), identifiers[i]);
      if (isRowModified(i)) {
        isChanged = true;
        if (delMark[i]) assignedDataObject.delete(identifiers[i]);
        else saveRow(i);
      }
    }
    return isChanged;
  }

  private void saveRow(int i) {
    int j;
    if (identifiers[i] == null) {
      assignedDataObject.newRow();
      assignedDataObject.allocateNewIdentifier();
    }
    else {
      assignedDataObject.load(identifiers[i]);
    }
    for (j=0; j < getColumnNames().length; j++) {
      switch (columnTypes[j]) {
      case 4:
        if (data[i][j].toString().trim().equals("")) {
          assignedDataObject.setInt(getColumnNames()[j], 0);
        } else {
          assignedDataObject.setInt(getColumnNames()[j], Integer.valueOf(data[i][j].toString()).intValue());
        }
        break;
      case 93:
        DateString temp = new DateString(sessionData.locale, (String)data[i][j]);
        assignedDataObject.setDate(getColumnNames()[j], temp.getSqlDate());
        break;
      default:
        assignedDataObject.setObject(getColumnNames()[j], data[i][j]);
        // de.must.io.Logger.getInstance().info(getClass(), data[i][j]);
        // de.must.io.Logger.getInstance().info(getClass(), oriData[i][j]);
      }
    }
    assignedDataObject.save(i != lastModifiedRow);
  }

  /**
   * Returns true if input was modified.
   * @return true if input was modified.
   */
  public boolean isModified() {
    int i;
    for (i=0; i < numberOfEditableRows; i++) {
      if (isRowModified(i)) return true;
    }
    return false;
  }

  private boolean isRowModified(int row) {
    int j;
    for (j=0; j < oriData[row].length; j++) {
      // de.must.io.Logger.getInstance().info(getClass(), "comparing " + data[row][j] + " with " + oriData[row][j]);
      if (!data[row][j].equals(oriData[row][j])) {
        // de.must.io.Logger.getInstance().info(getClass(), "modified!");
        return true;
      }
    }
    return false;
  }

  private int getLastModifiedRow() {
    int i;
    for (i=rowCapacity; i > 0; i--) {
      if (isRowModified(i-1)) return i-1;
    }
    return -1;
  }

  /**
   * Information about the current object to be sumbitted to objects which desire some information.
   */
  class TableAdministrationSubmission extends Submission {
  }

  /**
   * An activity to be triggert.
   */
  private class Activity  {
    public int actionId;
    public Identifier identifier;

    /**
     * Constructs a new activity with the specified action id and entry id.
     * @param actId the action key
     * @param entryId the identifier of the entry to proceed the action
     */
    public Activity(int actionId, Identifier identifier) {
      this.actionId = actionId;
      this.identifier = identifier;
    }
  }

}
