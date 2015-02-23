/*
 * Copyright (c) 2001-2011 Christoph Mueller. All rights reserved.
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

import java.util.Hashtable;

import de.must.dataobj.*;
import de.must.io.Logger;

/**
 * Component for listing data to select entries for further processing.
 * To avoid repeated database inquiry when control comes back from deeper stack
 * invokables, the list is cached.
 * @author Christoph Mueller
 */
public abstract class DataList extends List {

  public static final int ACTION_NEW = -1;
  public static final int ACTION_BROWSE = 0;
  public static final int ACTION_EDIT = 1;
  public static final int ACTION_COPY = 2;
  public static final int ACTION_DELETE = 3;

  private ListSubmission submission = new ListSubmission();
  private Activity currentActivity;
  private int lastProcessedActivityKey;
  private boolean extendable;
  private boolean editable;
  private boolean copyable;
  private boolean deletable;
  private boolean sqlSyntaxError;
  private Hashtable<Integer, Activity> activityTable = new Hashtable<Integer, Activity>();

  protected DataObject listDataObject;
  private DataChangeListener dataChangeListener; // heavy reference to prevent garbage collection of weak references.

  protected int maxListEntries = 100;
  private boolean showhits;

  /**
   * Constructs a new data list.
   * @param sessionData the session's data to share
   */
  public DataList(SessionData sessionData) {
    super(sessionData);
  }

  /**
   * Sets the maximum number of entries to be listed.
   * @param maxListEntries the maximum number of entries to be listed
   */
  public void setMaxListEntries(int maxListEntries) {
    this.maxListEntries = maxListEntries;
  }

  /**
   * Returns the maximum number of entries to be listed.
   * @return the maximum number of entries to be listed
   */
  public int getMaxListEntries() {
    return maxListEntries;
  }

  /**
   * Sets the showhits.
   * @param showhits The showhits to set
   */
  public void setShowhits(boolean showhits) {
    this.showhits = showhits;
  }

  /**
   * Returns the showhits.
   * @return boolean
   */
  public boolean isShowhits() {
    return showhits;
  }

  /**
   * Initializes the invokable in order to reuse the component without garbage
   * from the previous use.
   */
  public void init() {
    super.init();
    listCache = null;
    lastProcessedActivityKey = 0;
    extendable = (getDataAdministrationClass() != null && sessionData.entitlement.getLevel(this) >= EntitlementStd.LEVEL_ADD);
    editable = (getDataAdministrationClass() != null && sessionData.entitlement.getLevel(this) >= EntitlementStd.LEVEL_CHANGE);
    copyable = (getDataAdministrationClass() != null && sessionData.entitlement.getLevel(this) >= EntitlementStd.LEVEL_CHANGE);
    deletable = (sessionData.entitlement.getLevel(this) >= EntitlementStd.LEVEL_DELETE);
  }

  /**
   * Returns the fields to be selected, separated by comma as usual in SQL statements.
   * Is to be implemented by the subclass to guarantee availability for later usage.
   * Sample: <code>return DbField1, DbField2, DbField3;</code>
   * @return the fields to be selected
   */
  protected abstract String getSelectionFields();

  /**
   * Returns the where condition for the select statement to process the inquiry.
   * See the code of subclasses of <code>{@link Enquiry}</code> for samples
   * how this may be implemented. In the simplest case it looks like
   * <code>return DbFieldName like '%" + UIfield.getText() + "%'";</code>
   * @return the where condition for the select statement
   * @see Enquiry#getWhereCondition
   */
  protected String getWhereCondition() {
    return submitter.getSubmission().getSubmittedWhereCondition();
  }

  /**
   * Returns the fields to be used for the order by clause, separated by comma
   * as usual in SQL statements.
   * @return the fields to be used for the order by clause
   */
  protected abstract String getOrderByFields();

  /**
   * Sets the data object to be used for listing the inquiry result.
   * @param listDataObject the data object to be used for listing
   */
  protected void setListDataObject(DataObject listDataObject) {
    final EntityInfo listEntityInfo = listDataObject;
    this.listDataObject = listDataObject;
    // dataChangeListener is alive as long DataList is alive.
    // Thus, its weak reference won't be cleared.
    dataChangeListener = new DataChangeListener() {
      public void DataChangePerformed(DataChangedEvent e) {
        if (e.getEntityName().equals(listEntityInfo.getTableName())) {
          listCache = null;
        }
      }
    };
    listDataObject.addDataChangeListener(dataChangeListener);
  }

  /**
   * Induces to start listing form beginning.
   */
  public boolean startListFromBeginning() {
    activityTable.clear();
    listedRowCounter = 0;
    sqlSyntaxError = !listDataObject.select(getSelectionFields(), getElaboratedWhereCondition(), getOrderByFields(), maxListEntries);
    return sqlSyntaxError;
  }

  /**
   * Returns true if there is an SQL syntax error.
   * @return true if there is an SQL syntax error
   */
  public boolean hasSqlSyntaxError() {
    return sqlSyntaxError;
  }

  /**
   * Returns true if a row to list is available.
   * A row is available if there is still an entry in the result set and the
   * maximum of entries to list is not exceeded.
   * @return true if a row to list is available
   */
  public boolean isRowToListAvailable() {
    if (listedRowCounter >= maxListEntries) {
      listDataObject.closeQuery(); // so far we do not support continued listing, therefore we can close query right now
      return false;
    }
    if (listDataObject.nextRow()) {
      listedRowCounter++;
      return true;
    } else {
      listDataObject.closeQuery();
      return false;
    }
  }

  /**
   * Returns true if the list is cut.
   * @return true if the list is cut
   */
  public boolean isListCutted() {
    return listedRowCounter >= maxListEntries;
  }

  /**
   * Returns the ID of the action that was processed in a previous dialog step.
   * Useful to set focus on the list.
   * @return the ID of the action that was processed in a previous dialog step
   */
  public int getLastProcessedActivityKey() {
    return lastProcessedActivityKey;
  }

  /**
   * Returns the HREF for browsing the entry.
   * @return Returns the HREF for browsing the entry
   */
  public String getBrowseHref() {
    return getActivityHref(ACTION_BROWSE);
  }

  /**
   * Returns the HREF for editing the entry.
   * @return the HREF for editing the entry
   */
  public String getEditHref() {
    return getActivityHref(ACTION_EDIT);
  }

  /**
   * Returns the HREF for copying the entry.
   * @return the HREF for copying the entry
   */
  public String getCopyHref() {
    return getActivityHref(ACTION_COPY);
  }

  /**
   * Returns the HREF for deleting the entry.
   * @return the HREF for deleting the entry
   */
  public String getDeleteHref() {
    return getActivityHref(ACTION_DELETE);
  }

  /**
   *
   * @param action
   * @return
   */
  private String getActivityHref(int action) {
    activityTable.put(new Integer(++sessionData.activityNbr), new Activity(action, listDataObject.getIdentifier()));
    return sessionData.getBaseURL() + "&ACT=" + sessionData.activityNbr;
  }

  /**
   * Returns true if detail presentation is available.
   * @return true if detail presentation is available
   */
  public boolean isPresentable() {
    return getDataPresentationClass() != null;
  }

  /**
   * Returns true if the current user may add entries.
   * @return true if the current user may add entries
   */
  public boolean isExtendable() {
    return extendable;
  }

  /**
   * Returns true if the entry may be edited by the current user.
   * @return true if the entry may be edited by the current user
   */
  public boolean isEditable() {
    return editable;
  }

  /**
   * Returns true if the entry may be copied by the current user.
   * @return true if the entry may be copied by the current user
   */
  public boolean isCopyable() {
    return copyable;
  }

  /**
   * Returns true if the entry may be deleted by the current user.
   * @return true if the entry may be deleted by the current user
   */
  public boolean isDeletable() {
    return deletable;
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
        lastProcessedActivityKey = currentActivityKey.intValue();
        return true;
      } catch (Exception e) {
        Logger.getInstance().error(getClass(), e);
        return false;
      }
    }
    return super.isSuitableDialog(request);
  }

  /**
   * Allows the invokable to react to the request. Sample: saving data when OK
   * button was pressed.
   * @param request the request to react to
   */
  public void process(GeneralizedRequest request) {
    super.process(request);
    if (currentActivity != null) {
      setStackMovement(1);
      switch (currentActivity.actionId) {
      case ACTION_BROWSE:
        sessionData.classToInvokeNext = getDataPresentationClass();
        return;
      case ACTION_EDIT:
        sessionData.classToInvokeNext = getDataAdministrationClass();
        return;
      case ACTION_COPY:
        sessionData.classToInvokeNext = getDataAdministrationClass();
        return;
      case ACTION_DELETE:
        sessionData.classToInvokeNext = getDataPresentationClass();
        return;
      }
    }
    if (request.getParameter(NAME_FOR_NEW_ENTRY_ACTION) != null) {
      setStackMovement(1);
      sessionData.classToInvokeNext = getDataAdministrationClass();
      currentActivity = new Activity(ACTION_NEW, null);
      return;
    }
    if (request.getParameter(NAME_FOR_BACK_ACTION) != null) {
      setStackMovement(-1);
      return;
    }
  }

  /**
   * Causes the invokable to delegate this function to all embedded markupables
   * to fetch their current value as edited by the user from the request.
   * @param request the request from where the values are to be fetched
   * @see Markupable#fetchYourValueFromRequest
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
  }

  /**
   * Returns the where condition. For the moment equals to getWhereCondition.
   * @return the where condition
   */
  protected String getElaboratedWhereCondition() {
    return getWhereCondition();
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
   * Indicates whether the reuse of the invokable is not to be supported.
   * @return true if the reuse of the invokable is not to be supported
   */
  public boolean wantToBeFinalized() {
    return wantToBeFinalized;
  }

  /**
   * Returns the class to proceed property administration for the entity listed here.
   * @return the class to proceed property administration
   */
  protected abstract Class<? extends Invokable> getDataAdministrationClass();

  /**
   * Returns the class to proceed property presentation for the entity listed here.
   * @return the class to proceed property presentation
   */
  protected abstract Class<? extends Invokable> getDataPresentationClass();

  /**
   * Returns the identifier (primary key) of the selected entry.
   * @return the identifier (primary key) of the selected entry
   */
  protected Identifier getSelectedIdentifier() {
    return currentActivity.identifier;
  }

  /**
   * Returns the action to be retrieved by submitted invokable.
   * @return the action to be retrieved by submitted invokable
   */
  protected int getAction() {
    return currentActivity.actionId;
  }

  @Override
  protected void free() {
    if (listDataObject != null) {
      listDataObject.removeDataChangeListener(dataChangeListener); // don't wait until gc removed weak reference
    }
    super.free();
  }

  /**
   * Data list specific submission informations.
   */
  class ListSubmission extends Submission {
    public Identifier getSubmittedIdentifier() {
      return getSelectedIdentifier();
    }
  /**
   * Returns the submitted action.
   * @return the submitted action
   */
    public int getSubmittedAction() {
      return getAction();
    }
  }

  /**
   * An activity to be triggered.
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
