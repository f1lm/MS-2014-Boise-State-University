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

import java.util.Enumeration;
import java.util.Hashtable;

import de.must.applet.Constants;
import de.must.dataobj.DataObject;
import de.must.dataobj.Identifier;

public abstract class SearchListDetailGroup extends MajorRemoteUserInterface implements ContextInfo {
  
  private boolean repeatedOpening = false;
  public Search search;
  public AbstractDataList list;
  public DataPropertyAdministration propertyAdmin;
  public DataPresentation presentation;
  public Hashtable<String, RemoteUserInterface> other;
  public RemoteUserInterface currentDetail;
  public DataObject listDataObject;
  public boolean readOnly;
  public Identifier currentlyUpdatedOrAdded;
  
  public SearchListDetailGroup(SessionData sessionData, final String tabIdAndLabel, DataObject listDataObject) {
    super(sessionData, new ContextInfo() {
      public String getTabLabel() { return tabIdAndLabel; }
      public String getTabId() { return tabIdAndLabel; }
      public String getConcerning() { return Constants.SEARCH_LIST_DETAIL_GUI; }
    });
    this.listDataObject = listDataObject;
    other = new Hashtable<String, RemoteUserInterface>();
  }

  /**
   * Creates search element of search/list/detail group and returns it.
   * @return search element of search/list/detail group
   */
  protected abstract Search createSearch();

  /**
   * Creates list element of search/list/detail group and returns it.
   * @return list element of search/list/detail group
   */
  protected abstract AbstractDataList createList();

  /**
   * Creates detail element of search/list/detail group and returns it.
   * @return detail element of search/list/detail group
   */
  protected abstract DataPropertyAdministration createDetail();

  public Search getSearch() {
    if (search == null) search = createSearch();
    return search;
  }

  public AbstractDataList getList() {
    if (list == null) list = createList();
    return list;
  }

  public DataPropertyAdministration getPropAdm() {
    if (propertyAdmin == null) propertyAdmin = createDetail();
    return propertyAdmin;
  }

  public void openSearch() {
    getSearch().setVisible(true);
    getList().setVisible(true);
    if (repeatedOpening) {
      selectTab();
    }
    repeatedOpening = true;
  }
  
  public void openNewInput() {
    getSearch().setVisible(true);
    getList().setVisible(true);
    getPropAdm().setVisible(true);
    getPropAdm().newInput();
    currentDetail = getPropAdm();
    if (repeatedOpening) {
      selectTab();
    }
    repeatedOpening = true;
  }
  
  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    if (search != null) search.fetchValuesFromRequest(request);
    if (list != null) list.fetchValuesFromRequest(request);
    if (propertyAdmin != null) propertyAdmin.fetchValuesFromRequest(request);
    if (presentation != null) presentation.fetchValuesFromRequest(request);
    Enumeration<RemoteUserInterface> enumeration = other.elements();
    while (enumeration.hasMoreElements()) {
      RemoteUserInterface rui = enumeration.nextElement();
      rui.fetchValuesFromRequest(request);
    }
  }

  @Override
  public boolean isClosingAllowed() {
    if (propertyAdmin != null && propertyAdmin.isVisible() && propertyAdmin.isModified()) return false;
    return true;
  }

  @Override
  public void process(GeneralizedRequest request) {
    if (search != null) search.process(request);
    if (list != null) list.process(request);
    if (propertyAdmin != null) propertyAdmin.process(request);
    if (presentation != null) presentation.process(request);
    Enumeration<RemoteUserInterface> enumeration = other.elements();
    while (enumeration.hasMoreElements()) {
      RemoteUserInterface rui = enumeration.nextElement();
      rui.process(request);
    }
  }
  
  @Override
  public void buildRemoteView(ToAppletWriter out) {
    sendRemoteViewContext(out);
    sendRemoteViewDetails(out);
  }

  protected void sendRemoteViewContext(ToAppletWriter out) {
    out.sendConcerning(getConcerning());
    out.sendTitle(getTabLabel());
  }

  protected void sendRemoteViewDetails(ToAppletWriter out) {
    if (search != null) search.isToRenew = true; // thus, we are informed if user clears a inquiry condition text field
    if (search != null) search.buildRemoteView(out);
    if (list != null) list.buildRemoteView(out);
    if (currentDetail != null) currentDetail.buildRemoteView(out);
    Enumeration<RemoteUserInterface> enumeration = other.elements();
    while (enumeration.hasMoreElements()) {
      RemoteUserInterface rui = enumeration.nextElement();
      rui.buildRemoteView(out);
    }
  }

}
