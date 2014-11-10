/*
 * Copyright (c) 2011-2012 Christoph Mueller. All rights reserved.
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

import java.util.Iterator;
import java.util.Vector;

import de.must.applet.Constants;
import de.must.dataobj.*;

/**
 * Component for listing data to select entries for further processing inside the applet main window.
 * @author Christoph Mueller
 */
public abstract class AbstractDataList extends ListRemoteUserInterface {
  
  class ShortIdentifiedDetail {
    public Identifier identifier;
    public Vector<String> detailInfos;
    public ShortIdentifiedDetail(Identifier identifier) {
      this.identifier = identifier;
      detailInfos = new Vector<String>();
    }
    public String getDetailInfosInOneLine() {
      Iterator<String> iterator = detailInfos.iterator();
      StringBuffer result = new StringBuffer();
      boolean notFirst = false;
      while (iterator.hasNext()) {
        if (notFirst) result.append(" / ");
        result.append(iterator.next());
        notFirst = true;
      }
      return result.toString();
    }
    public String getDetailInfosInMultipleLines() {
      Iterator<String> iterator = detailInfos.iterator();
      StringBuffer result = new StringBuffer();
      boolean notFirst = false;
      while (iterator.hasNext()) {
        if (notFirst) result.append(Constants.NEW_LINE);
        result.append(iterator.next());
        notFirst = true;
      }
      return result.toString();
    }
  }

  protected SearchListDetailGroup group;
  private DataChangeListener dataChangeListener; // heavy reference to prevent garbage collection of weak references.
  
  protected Vector<MustButton> additionalButtons;
  private boolean showhits;
  protected Identifier lastSelectionIdentifier;
  protected Vector<ShortIdentifiedDetail> inUse; 
  protected Vector<ShortIdentifiedDetail> pendingDeleteConfirmation; 
  protected Vector<Identifier> itemsToRemoveInApplet;

  /**
   * Constructs a new data list.
   * @param sessionData the session's data to share
   */
  public AbstractDataList(SessionData sessionData, final SearchListDetailGroup group) {
    super(sessionData, new ContextInfo() {
      public String getTabLabel() { return group.getTabLabel(); }
      public String getTabId() { return group.getTabId(); }
      public String getConcerning() { return group.getConcerning(); }
    });
    this.group = group;
    completeConstruction();
  }
  
  public AbstractDataList(SessionData sessionData, final FreeCenterGroup group) {
    super(sessionData, new ContextInfo() {
      public String getTabLabel() { return group.getTabLabel(); }
      public String getTabId() { return group.getTabId(); }
      public String getConcerning() { return group.getConcerning(); }
    });
    // this.group = group;
    completeConstruction();
  }
  
  private void completeConstruction() {
    additionalButtons = new Vector<MustButton>();
  }
  
  protected InsertedButton addButton(String label) {
    return addButton(label, -1);
  }
  
  protected InsertedButton addButton(String label, int index) {
    InsertedButton result = new InsertedButton(label, index);
    additionalButtons.add(result);
    return result;
  }
  
  protected InsertedButton addButton(String imageName, String fallbackLabel, int index) {
    InsertedButton result = new InsertedButton(imageName, fallbackLabel, index);
    additionalButtons.add(result);
    return result;
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
  
  protected DataObject getListDataObject() {
    if (group != null) return group.listDataObject;
    else return null;
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
   * See the code of subclasses of <code>{@link Search}</code> for samples
   * how this may be implemented. In the simplest case it looks like
   * <code>return DbFieldName like '%" + UIfield.getText() + "%'";</code>
   * @return the where condition for the select statement
   * @see Search#getWhereCondition
   */
  protected String getWhereCondition() {
    if (group == null) return null;
    return group.getSearch().getElaboratedWhereCondition();
  }

  /**
   * Returns the fields to be used for the order by clause, separated by comma
   * as usual in SQL statements.
   * @return the fields to be used for the order by clause
   */
  protected abstract String getOrderByFields();

  /**
   * Specifies the number of rows that should be listed by one host contact. 
   * @return the number of rows that should be listed by one host contact
   */
  protected abstract int getNbrOfRowsPerHostContact();

  /**
   * Induces to start listing form beginning.
   */
  public boolean startListFromBeginning() {
    buildStatus = BUILD_STATUS_NEW_SELECT;
    sqlSyntaxError = !getListDataObject().select(getSelectionFields(), getElaboratedWhereCondition(), getOrderByFields());
    return sqlSyntaxError;
  }

  /**
   * Returns true if there is an SQL syntax error.
   * @return true if there is an SQL syntax error
   */
  public boolean hasSqlSyntaxError() {
    return sqlSyntaxError;
  }

  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    super.fetchValuesFromRequest(request);
    if (sessionData.action != null) {
      Iterator<MustButton> iterator2 = additionalButtons.iterator();
      while (iterator2.hasNext()) {
        MustButton additionalButton = iterator2.next();
        if (additionalButton.getActionID().equals(sessionData.action)) {
          additionalButton.performAction();
        }
      }
    }
  }

  @Override
  public void process(GeneralizedRequest request) {
    if (Constants.ACTION_LIST.equals(sessionData.action)) {
      buildStatus = BUILD_STATUS_NEW_SELECT;
      if (!buildDone) {
        buildStatus = BUILD_STATUS_COMPLETE_BUILD_NECESSARY;
        buildDone = true;
      } else {
        buildStatus = BUILD_STATUS_NEW_SELECT;
      }
    } else if (Constants.ACTION_PRESENT.equals(sessionData.action)) {
      if (group != null) {
        group.presentation.present(identifiers);
        group.currentDetail = group.presentation;
      }
    } else if (Constants.ACTION_LOAD.equals(sessionData.action)) {
      if (group != null) {
        group.getPropAdm().loadValues(identifiers);
        group.currentDetail = group.propertyAdmin;
      }
    } else if (Constants.ACTION_COPY.equals(sessionData.action)) {
      if (group != null) {
        group.getPropAdm().copy(identifiers.firstElement());
        group.currentDetail = group.propertyAdmin;
      }
    } else if (Constants.ACTION_DELETE.equals(sessionData.action)) {
      boolean deletionAllowed = true;
      lastSelectionIdentifier = identifiers.firstElement();
      inUse = new Vector<ShortIdentifiedDetail>();
      pendingDeleteConfirmation = new Vector<ShortIdentifiedDetail>();
      Iterator<Identifier> iterator = identifiers.iterator();
      while (iterator.hasNext()) {
        Identifier identifier = iterator.next();
        ShortIdentifiedDetail detail = new ShortIdentifiedDetail(identifier);
        detail.detailInfos = getDetailInfo(identifier);
        deletionAllowed = group.listDataObject.isDeletionAllowed(identifier);
        if (deletionAllowed) {
          pendingDeleteConfirmation.add(detail);
        } else {
          inUse.add(detail);
        }
      }
    } else if (Constants.ACTION_DELETE_CONFIRMATION.equals(sessionData.action)) {
      if (pendingDeleteConfirmation != null || pendingDeleteConfirmation.size() > 0) {
        Identifier identifier = pendingDeleteConfirmation.firstElement().identifier;
        group.listDataObject.delete(identifier);
        pendingDeleteConfirmation.remove(0);
        if (itemsToRemoveInApplet == null) itemsToRemoveInApplet = new Vector<Identifier>();
        itemsToRemoveInApplet.add(identifier);
      }
    } else if (Constants.ACTION_DELETE_CANCEL.equals(sessionData.action)) {
      pendingDeleteConfirmation = null;
    }
  }
  
  protected abstract Vector<String> getDetailInfo(Identifier identifier);

  /**
   * Returns the where condition. For the moment equals to getWhereCondition.
   * @return the where condition
   */
  protected String getElaboratedWhereCondition() {
    return getWhereCondition();
  }

  protected void free() {
    if (group.listDataObject != null) {
      group.listDataObject.removeDataChangeListener(dataChangeListener); // don't wait until gc removed weak reference
    }
  }

}
