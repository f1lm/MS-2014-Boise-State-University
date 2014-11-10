/*
 * Copyright (c) 2012 Christoph Mueller. All rights reserved.
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

import de.must.applet.Constants;
import de.must.dataobj.DataObject;
import de.must.dataobj.Identifier;

/**
 * Component for listing data to select entries in a separate window.
 * @author Christoph Mueller
 */
public abstract class DataSelectDialog extends ListRemoteUserInterface {
  
  protected DataObject contentDataObject;
  protected TabButtonGroup tabButtonGroup = new TabButtonGroup();
  protected AttributeList currentAttributeList = new AttributeList(sessionData);

  public DataSelectDialog(SessionData sessionData, DataObject contentDataObject, final String frameTitle) {
    super(sessionData, new ContextInfo() {
      public String getTabLabel() { return frameTitle; }
      public String getTabId() { return frameTitle; }
      public String getConcerning() { return Constants.DIALOG_FOR_CHOOSING; }
    });
    this.contentDataObject = contentDataObject;
    setAppellation(frameTitle);
    sessionData.currentDialog = this;
  }

  /**
   * Creates a new panel with an attribute list and adds it to the tabbed pane.
   * All following data components will be placed upon until this panel.
   * @param tabLabel the label of the new tab
   * @param lineCapacity the number of rows of the attribute list to be created
   * @see AttributeList
   */
  protected void newPanel(String tabLabel) {
    currentAttributeList = new AttributeList(sessionData); // the first attribute list is created in the beginning
    tabButtonGroup.addButton(tabLabel, currentAttributeList);
  }

  protected void newPanel() {
    currentAttributeList = new AttributeList(sessionData);
  }
  
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
    return temp;
  }

  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    super.fetchValuesFromRequest(request);
    if (tabButtonGroup != null) tabButtonGroup.fetchValuesFromRequest(request);
//    Iterator<SpecialGUIElement> iterator2 = additionalComponents.iterator();
//    while (iterator2.hasNext()) {
//      SpecialGUIElement remoteContent = iterator2.next();
//      remoteContent.fetchValuesFromRequest(request);
//    }
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.sendConcerning(getConcerning());
    if (!buildDone) {
      if (!isToRenew) { // send once only
        out.println(Constants.TODO_TAG_BEGIN + Constants.INITIALIZE + Constants.TODO_TAG_END);
        out.println(Constants.VALUE_TAG_BEGIN + getAppellation() + Constants.VALUE_TAG_END);
        out.println(Constants.ACTION_END_TAG);
      }
      out.sendClearCommand();
      if (tabButtonGroup.tabButtons.size() > 0) {
        tabButtonGroup.buildRemoteView(out);
      } else {
        currentAttributeList.buildRemoteView(out);
      }
//      Iterator<MustButton> iterator2 = additionalButtons.iterator();
//      while (iterator2.hasNext()) {
//        MustButton additionalButton = iterator2.next();
//        if (additionalButton.getType() == MustButton.TYPE_BOTTOM) {
//          additionalButton.buildRemoteView(out);
//        }
//      }
//      Iterator<SpecialGUIElement> iterator3 = additionalComponents.iterator();
//      while (iterator3.hasNext()) {
//        iterator3.next().buildRemoteView(out);
//      }
      buildDone = true;
    }
    if (isToRenew) {
      out.setHeader(getAppellation());
      Iterator<RemoteContent> iterator = remoteContents.iterator();
      while (iterator.hasNext()) {
        RemoteContent remoteContent = iterator.next();
        remoteContent.setValues(out);
      }
//      Iterator<SpecialGUIElement> iterator2 = additionalComponents.iterator();
//      while (iterator2.hasNext()) {
//        SpecialGUIElement remoteContent = iterator2.next();
//        remoteContent.setValues(out);
//      }
      isToRenew = false;
    }
    if (Constants.ACTION_LIST.equals(sessionData.action)) {
      buildRemoteViewNewContent(out);
      buildStatus = BUILD_STATUS_NOTHING_TO_DO;
    }
    super.buildRemoteView(out);
    if (!isVisible() && this.equals(sessionData.currentDialog)) {
      sessionData.currentDialog = null;
    }
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
   * See the code of subclasses for samples
   * how this may be implemented. In the simplest case it looks like
   * <code>return "DbFieldName like '%" + UIfield.getText() + "%'";</code>
   * @return the where condition for the select statement
   */
  protected abstract String getWhereCondition();

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
   * Returns the laid-out row of the list with the overview information, which
   * allows the user to identify the entry.
   * @return Returns the laid-out row of the list with the overview information
   */
  protected abstract String getRowString();

  protected void buildRemoteViewNewContent(ToAppletWriter out) {
    boolean success = contentDataObject.select(getSelectionFields(), getWhereCondition(), getOrderByFields());
    if (success) {
      out.sendSubconcerning(Constants.LIST);
      out.sendTodoAction(Constants.CLEAR_LIST);
      int counter = 0;
      int maxRows = getNbrOfRowsPerHostContact();
      boolean furtherRowAvailable;
      while (++counter <= maxRows & (furtherRowAvailable = contentDataObject.nextRow())) {
        out.println(Constants.ACTION_BEGIN_TAG);
        out.println(Constants.TODO_TAG_BEGIN + Constants.ADD_ITEM + Constants.TODO_TAG_END);
        out.println(Constants.VALUE_TAG_BEGIN + getRowString() + Constants.VALUE_TAG_END);
        out.println(Constants.ID_TAG_BEGIN + contentDataObject.getIdentifier() + Constants.ID_TAG_END);
        out.println(Constants.ACTION_END_TAG);
      }
      setFurtherRowAvailable(furtherRowAvailable, out);
      out.sendTodoAction(Constants.APPLY_LIST);
    } else {
      
    }
  }
  
  public void setFurtherRowAvailable(boolean furtherRowAvailable, ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.addTodoTag(Constants.SET_FURTHER_ROW_AVAILABLE);
    out.addValueTag(String.valueOf(furtherRowAvailable));
    out.println(Constants.ACTION_END_TAG);
  }
  
  @Override
  public void process(GeneralizedRequest request) {
    isToRenew = true;
    if (Constants.ACTION_LIST.equals(sessionData.action)) {
      buildStatus = BUILD_STATUS_NEW_SELECT;
      if (!buildDone) {
        buildStatus = BUILD_STATUS_COMPLETE_BUILD_NECESSARY;
        buildDone = true;
      } else {
        buildStatus = BUILD_STATUS_NEW_SELECT;
      }
    } else if (Constants.ACTION_LOAD.equals(sessionData.action)) {
      if (isSelectionAccepted()) {
        processSelection();
        setVisible(false);
        // so kommt setVisible nicht mehr an: sessionData.currentDialog = null;
      }
    } else if (Constants.ACTION_CANCEL.equals(sessionData.action)) {
      sessionData.currentDialog = null;
    }
  }
  
  protected abstract boolean isSelectionAccepted();
  
  protected abstract void processSelection();
  
  protected Identifier getSelectedIdentifier() {
    return identifiers.firstElement();
  }

}