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
import de.must.dataobj.Identifier;
import de.must.util.StringFunctions;

/**
 * Class for listings of inquiry results with column formatting.
 * @author Christoph Mueller
 */
public abstract class ColumnDataList extends AbstractDataList {
  
  protected class RemoteImageCell {
    public String imageName;
    public String fallBackText;
    public RemoteImageCell(String imageName, String fallBackText) {
      this.imageName = imageName;
      this.fallBackText = fallBackText;
    }
  }
  
  protected String subconcerning = Constants.LIST; 
  private Vector<Integer> columnWidth;
  protected boolean[] rendererSet;

	/**
	 * Constructor for ColumnDataList.
	 * @param sessionData
	 */
	public ColumnDataList(SessionData sessionData, SearchListDetailGroup group) {
		super(sessionData, group);
	}

  public ColumnDataList(SessionData sessionData, FreeCenterGroup group) {
    super(sessionData, group);
  }
  
  public void setPreferredColumnWidth(Vector<Integer> columnWidth) {
    this.columnWidth = columnWidth;
  }
  
  /**
   * Returns the headers of the list in table view. Override it if table view is wished.
   * @return the headers of the list in table view
   */
  protected abstract Vector<String> getColumnHeaders();

  /**
   * Returns the column objects to layout one row of the table to provide overview
   * information, which allows the user to identify the entry.
   * @return Returns the column objects to layout one row of the table
   */
  public abstract Vector<Object> getRowObjects();

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.println(Constants.CONCERNING_SUBLEVEL1_BEGIN_TAG + subconcerning + Constants.CONCERNING_SUBLEVEL1_END_TAG);
    if (itemsToRemoveInApplet != null) {
      Iterator<Identifier> iterator = itemsToRemoveInApplet.iterator();
      while (iterator.hasNext()) {
        Identifier identifier = iterator.next();
        out.println(Constants.ACTION_BEGIN_TAG);
        addTodo(Constants.REMOVE_ITEM, out);
        out.println(Constants.ID_TAG_BEGIN + identifier + Constants.ID_TAG_END);
        out.println(Constants.ACTION_END_TAG);
      }
      itemsToRemoveInApplet = null;
    }
    if (inUse != null && inUse.size() > 0) {
      buildRemoteViewInUse(out);
      inUse = null;
    } else if (pendingDeleteConfirmation != null && pendingDeleteConfirmation.size() > 0) {
      buildRemoteViewDeleteConfirmation(out);
    } else if (buildStatus == BUILD_STATUS_EMPTY_LIST_TO_BUILD) {
      buildRemoteViewEmptyTable(out);
      buildStatus = BUILD_STATUS_NOTHING_TO_DO;
    } else if (Constants.ACTION_LIST.equals(sessionData.action)) {
      buildRemoteViewNewContent(out);
      buildStatus = BUILD_STATUS_NOTHING_TO_DO;
    } else if (Constants.ACTION_LIST_EXTENSION.equals(sessionData.action)) {
      buildRemoteViewExtendContent(out);
      buildStatus = BUILD_STATUS_NOTHING_TO_DO;
    }
    if (group != null && group.currentlyUpdatedOrAdded != null) {
      buildRemoteViewUpdateOrAddRow(out);
    }
    super.buildRemoteView(out);
  }
  
  private void buildRemoteViewEmptyTable(ToAppletWriter out) {
    out.sendTodoAction(Constants.CLEAR_LIST_COLUMNS);
    if (group != null && group.presentation != null) {
      out.sendTodoAction(Constants.CREATE_PRESENT_BUTTON);
    }
    if (group != null && group.readOnly) {
      out.sendTodoAction(Constants.SET_READ_ONLY);
    }
    Vector<String> colHeaders = getColumnHeaders();
    Iterator<String> iterator = colHeaders.iterator();
    Iterator<Integer> widthIterator = null;
    if (columnWidth != null) {
      widthIterator = columnWidth.iterator();
    }
    while (iterator.hasNext()) {
      String colHeader = iterator.next();
      int width = -2;
      if (columnWidth != null && widthIterator.hasNext()) {
        width = widthIterator.next().intValue();
      }
      addColumn(colHeader, out, width);
    }
    out.sendTodoAction(Constants.APPLY_LIST_COLUMNS);
    for (MustButton additionalButton : additionalButtons) {
      additionalButton.buildRemoteView(out);
    }
  }
  
  protected void buildRemoteViewNewContent(ToAppletWriter out) {
    boolean success = getListDataObject().select(getSelectionFields(), getWhereCondition(), getOrderByFields());
    if (success) {
      out.println(Constants.ACTION_BEGIN_TAG);
      out.sendSubconcerning(subconcerning);
      addTodo(Constants.CLEAR_LIST, out);
      out.println(Constants.ACTION_END_TAG);
      int counter = 0;
      int maxRows = getNbrOfRowsPerHostContact();
      boolean furtherRowAvailable;
      while (++counter <= maxRows & (furtherRowAvailable = getListDataObject().nextRow())) {
        outRow(out);
      }
      setFurtherRowAvailable(furtherRowAvailable, out);
      out.sendTodoAction(Constants.APPLY_LIST);
    } else {
      
    }
  }
  
  private void buildRemoteViewExtendContent(ToAppletWriter out) {
    out.sendSubconcerning(subconcerning);
    outRow(out);
    int counter = 1;
    int maxRows = getNbrOfRowsPerHostContact();
    boolean furtherRowAvailable;
    while (++counter <= maxRows & (furtherRowAvailable = getListDataObject().nextRow())) {
      outRow(out);
    }
    setFurtherRowAvailable(furtherRowAvailable, out);
  }
  
  public void buildRemoteViewUpdateOrAddRow(ToAppletWriter out) {
    out.sendSubconcerning(subconcerning);
    getListDataObject().load(group.currentlyUpdatedOrAdded);
    outRow(out, true);
    setFurtherRowAvailable(false, out); // reset extend mode because cursor has gone lost by this extension using the same data object
    group.currentlyUpdatedOrAdded = null;
  }
  
  private void buildRemoteViewInUse(ToAppletWriter out) {
    Iterator<ShortIdentifiedDetail> iterator = inUse.iterator();
    StringBuffer content = new StringBuffer();
    boolean notFirst = false;
    while (iterator.hasNext()) {
      ShortIdentifiedDetail detail = iterator.next();
      if (notFirst) content.append(Constants.NEW_LINE);
      content.append(detail.getDetailInfosInOneLine());
      notFirst = true;
    }
    out.println(Constants.ACTION_BEGIN_TAG);
    out.sendSubconcerning(subconcerning);
    out.addTodoTag(Constants.INFO_CANNOT_DELETE);
    out.addValueTag(content.toString());
    out.println(Constants.ACTION_END_TAG);
  }
  
  private void buildRemoteViewDeleteConfirmation(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.sendSubconcerning(subconcerning);
    out.addTodoTag(Constants.CONFIRM_DELETION);
    out.println(Constants.ID_TAG_BEGIN + pendingDeleteConfirmation.firstElement().identifier + Constants.ID_TAG_END);
    out.addValueTag(pendingDeleteConfirmation.firstElement().getDetailInfosInMultipleLines());
    out.println(Constants.ACTION_END_TAG);
  }
  
  private void outRow(ToAppletWriter out) {
    outRow(out, false);
  }
  
  private void outRow(ToAppletWriter out, boolean checkUpdateCaseBeforeAppending) {
    Vector<Object> rowObjects = getRowObjects();
    if (rendererSet == null) {
      rendererSet = new boolean[rowObjects.size()];
    }
    Iterator<Object> iterator2 = rowObjects.iterator();
    int i = -1;
    while (iterator2.hasNext()) {
      i++;
      Class<?> rowClassToSet = null;
      Object obj = iterator2.next();
      if (obj != null && !String.class.equals(obj.getClass()) && !rendererSet[i]) {
        rowClassToSet = obj.getClass();
        rendererSet[i] = true;
      }
      addRowObjectAction(obj, rowClassToSet, out);
    }
    applyRow(getListDataObject().getIdentifier(), out, checkUpdateCaseBeforeAppending);
  }
  
  public void setFurtherRowAvailable(boolean furtherRowAvailable, ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.addTodoTag(Constants.SET_FURTHER_ROW_AVAILABLE);
    out.addValueTag(String.valueOf(furtherRowAvailable));
    out.println(Constants.ACTION_END_TAG);
  }
  
  private void applyRow(Identifier id, ToAppletWriter out) {
    applyRow(id, out, false);
  }
  
  private void applyRow(Identifier id, ToAppletWriter out, boolean checkUpdateCaseBeforeAppending) {
    out.println(Constants.ACTION_BEGIN_TAG);
    if (checkUpdateCaseBeforeAppending) {
      out.addTodoTag(Constants.APPLY_ROW_CHECKING_UPDATE);
    } else {
      out.addTodoTag(Constants.APPLY_ROW);
    }
    out.println(Constants.ID_TAG_BEGIN + id + Constants.ID_TAG_END);
    out.println(Constants.ACTION_END_TAG);
  }
  
  private void addTodo(String todo, ToAppletWriter out) {
    out.addTodoTag(todo);
  }
  
  private void addColumn(String column, ToAppletWriter out, int width) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.addTodoTag(Constants.ADD_LIST_COLUMN);
    out.addValueTag(column);
    if (width != -2) {
      out.println(Constants.VARIANT1_TAG_BEGIN + Integer.toString(width) + Constants.VARIANT1_TAG_END);
    }
    out.println(Constants.ACTION_END_TAG);
  }

  protected void addRowObjectAction(Object rowObject, Class<?> rowClassToSet, ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.addTodoTag(Constants.ADD_ROW_OBJECT);
    if (rowObject instanceof RemoteImageCell) {
      RemoteImageCell ric = (RemoteImageCell)rowObject;
      out.addValueTag(ric.fallBackText);
      out.println(Constants.VARIANT1_TAG_BEGIN + ric.imageName + Constants.VARIANT1_TAG_END);
    } else if (rowObject instanceof String) {
      out.addValueTag(StringFunctions.replaceAll(String.valueOf(rowObject),"\n", Constants.NEW_LINE));
    } else if (rowObject != null) {
      out.addValueTag(rowObject.toString());
    } else {
      out.addValueTag("?"); // probably DB inconsistency
    }
    if (rowClassToSet != null) {
      out.println(Constants.VARIANT2_TAG_BEGIN + rowClassToSet.getName() + Constants.VARIANT2_TAG_END);
    }
    out.println(Constants.ACTION_END_TAG);
  }
  
}

