/*
 * Copyright (c) 2008-2011 Christoph Mueller. All rights reserved.
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

import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

import de.must.applet.Constants;
import de.must.dataobj.DataChangeListener;
import de.must.dataobj.DataObject;
import de.must.dataobj.WhereCondition;
import de.must.util.Callback;

/**
 * Frame to present data in a list with filter and choose options.
 * @author Christoph Mueller
 */
public abstract class DataListSelectionFrame extends RemoteUserInterface implements ListSelectionListener {

  private boolean open;
  protected DataObject contentDataObject;
  private String filter;
  private boolean caseSensitive;
  private String lastFilter;
  private MustTextField targetTextField;
  protected Callback callback;
  protected String callbackId;
  private DataChangeListener contentDataChangeListener; // only to prevent being garbage collected
  private String selectedItem;

  public DataListSelectionFrame(SessionData sessionData, DataObject contentDataObject, MustTextField targetTextField, final String frameTitle) {
    super(sessionData, new ContextInfo() {
      public String getTabLabel() { return frameTitle; }
      public String getTabId() { return frameTitle; }
      public String getConcerning() { return Constants.LISTSELECTION_WINDOW; }
    });
    this.contentDataObject = contentDataObject;
    this.targetTextField = targetTextField;
    this.appellation = frameTitle;
  }
  
  public DataListSelectionFrame(SessionData sessionData, DataObject contentDataObject, Callback callback, final String frameTitle) {
    super(sessionData, new ContextInfo() {
      public String getTabLabel() { return frameTitle; }
      public String getTabId() { return frameTitle; }
      public String getConcerning() { return Constants.LISTSELECTION_WINDOW; }
    });
    this.contentDataObject = contentDataObject;
    this.callback = callback;
    this.appellation = frameTitle;
  }
  
  protected abstract String getKeyColumName();
  protected abstract String getDescriptionColumName();


  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.sendConcerning(getConcerning());
    if (!buildDone) {
      buildRemoteViewFromScratch(out);
      buildDone = true;
    }
    if (filter != null && !filter.equals(lastFilter)) {
      buildRemoteViewFromScratch(out);
    }
    out.println(Constants.ACTION_BEGIN_TAG);
    if (targetTextField != null) {
      out.println(Constants.TODO_TAG_BEGIN + Constants.SET_TARGETTEXTFIELD + Constants.TODO_TAG_END);
      out.println(Constants.VALUE_TAG_BEGIN + targetTextField.getName() + Constants.VALUE_TAG_END);
      out.println(Constants.VARIANT1_TAG_BEGIN + appellation + Constants.VARIANT1_TAG_END);
    }
    if (callback != null) {
      out.println(Constants.TODO_TAG_BEGIN + Constants.SET_CALLBACK + Constants.TODO_TAG_END);
      out.println(Constants.ID_TAG_BEGIN + (callbackId = MustButton.getNextActionId()) + Constants.ID_TAG_END);
    }
    out.println(Constants.ACTION_END_TAG);
    super.buildRemoteView(out);
    // no process in this case: setVisible(false);
  }
  
  private void buildRemoteViewFromScratch(ToAppletWriter out) {
    WhereCondition whereCondition = new WhereCondition();
    if (filter!= null && filter.length() > 0) {
      whereCondition.append(getKeyColumName() + " like '%" + filter + "%'");
    }
    boolean success = contentDataObject.select("*", whereCondition, getKeyColumName());
    if (success) {
      out.println(Constants.ACTION_BEGIN_TAG);
      out.sendConcerning(getConcerning());
      out.println(Constants.TODO_TAG_BEGIN + Constants.INITIALIZE + Constants.TODO_TAG_END);
      out.println(Constants.VALUE_TAG_BEGIN + appellation + Constants.VALUE_TAG_END);
      out.println(Constants.ACTION_END_TAG);
      while (contentDataObject.nextRow()) {
        String value = contentDataObject.getText(getKeyColumName());
        if (!caseSensitive || value.indexOf(filter) != -1) {
          out.println(Constants.ACTION_BEGIN_TAG);
          out.println(Constants.TODO_TAG_BEGIN + Constants.ADD_ITEM + Constants.TODO_TAG_END);
          out.println(Constants.VALUE_TAG_BEGIN + value + Constants.VALUE_TAG_END);
          out.println(Constants.ACTION_END_TAG);
        }
      }
      out.println(Constants.ACTION_BEGIN_TAG);
      out.sendConcerning(getConcerning());
      out.println(Constants.TODO_TAG_BEGIN + Constants.APPLY_LIST + Constants.TODO_TAG_END);
      out.println(Constants.ACTION_END_TAG);
    } else {
      
    }
  }

  @Override
  public void process(GeneralizedRequest request) {
    if (callbackId != null
     && callbackId.equals(sessionData.action)
    ) {
      selectedItem = request.getParameter(Constants.IDENTIFIER);
      callback.callback();
    }
    if (Constants.ACTION_LIST.equals(sessionData.action)) {
      filter = request.getParameter(Constants.FILTER);
      caseSensitive = Boolean.valueOf(request.getParameter(Constants.CASE_SENSITIVE));
    }
    if (getTabId().equals(sessionData.tabOrWinIdByApplet) && Constants.ACTION_CANCEL.equals(sessionData.action)) {
      setVisible(false);
    }
  }

  public String getSelectedItem() {
    return selectedItem;
  }

  @Override
  public void valueChanged(ListSelectionEvent e) {
  }

}