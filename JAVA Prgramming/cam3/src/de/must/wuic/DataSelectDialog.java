/*
 * Copyright (c) 1999-2012 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.*;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.sql.SQLException;

/**
 * Frame for database inquiry, data overview and record selection.
 * In the first step, data for the inquiry is entered. Pressing the list button
 * starts the inquiry and fills the list with the results. After selecting a
 * single entry, function like editing among others are available.
 * It's common to use it via subclasses {@link SimpleDataListFrame} and
 * {@link ColumnDataListFrame}.
 * @author Christoph Mueller
 */
public abstract class DataSelectDialog extends SelectDialog implements DataChangeListener, Runnable {

  protected DataObject listDataObject;
  protected Thread listThread;
  private int listThreadPriority = -1;
  private boolean autoInitialListFill = true;
  private boolean listIsToRefresh = false;
  protected static int maxListEntries = 500;
  
  /**
   * Constructs a new frame for selecting data.
   * @param ownerFrame the frame form where this frame is called
   */
  public DataSelectDialog(Frame ownerFrame) {
    super(ownerFrame, GlobalInWuicStd.getImageResource());
    if (ownerFrame == null) this.ownerFrame = MainStd.getMainFrame();
    else this.ownerFrame = ownerFrame;
    if (this.ownerFrame != null) {
      this.ownerFrame.setCursor(waitCursor);
    }
    constructGUI();
  }

  /**
   * Constructs a new frame for selecting data.
   * @param ownerFrame the frame form where this frame is called
   */
  public DataSelectDialog(JDialog ownerDialog) {
    super(ownerDialog, GlobalInWuicStd.getImageResource());
    if (ownerDialog != null) {
      ownerDialog.setCursor(waitCursor);
    }
    constructGUI();
  }

  @Override
  protected void creationEnding() {
    if (autoInitialListFill) refreshList();
    else statusLabel.setRemainStatus(getTranslation("TEXT_REDUCE_SELECTION_BEFORE_LISTING"));

    if (expertSearchTextArea != null) expertSearchTextArea.addMouseListener(new java.awt.event.MouseAdapter() {
      public void mousePressed(MouseEvent e) {
        if (/* e.isPopupTrigger() ??? */e.getModifiers() == 4) {
          expertSearchTextArea.setText(getPrivateWhereConditionNotExpert());
        }
      }
    });
    super.creationEnding();
  }

  /**
   * Sets the data object to be used to fill the list.
   * @param listDataObject the data object to be used to fill the list
   */
  protected void setListDataObject(DataObject listDataObject) {
    if (this.listDataObject != null) {
      this.listDataObject.removeDataChangeListener(this);
    }
    this.listDataObject = listDataObject;
    this.listDataObject.addDataChangeListener((DataChangeListener)this);
  }

  /**
   * Sets the limit of entries to be displayed in the list.
   * @param newMaxListEntries the limit of entries to be displayed in the list
   */
  public static void setMaxListEntries(int newMaxListEntries) {
    maxListEntries = newMaxListEntries;
  }

  /**
   * Returns the limit of entries to be displayed in the list.
   * @return the limit of entries to be displayed in the list
   */
  protected static int getMaxListEntries() {
    return maxListEntries;
  }

  /**
   * Sets the flag for automatic list fill when construction is done.
   * @param wanted whether automatic list fill after construction is wished
   */
  protected void setAutoInitialListFill (boolean wanted) {
    autoInitialListFill = wanted;
  }

  /**
   * Returns the listThreadPriority.
   * @return int
   */
  public int getListThreadPriority() {
    return listThreadPriority;
  }

  /**
   * Sets the listThreadPriority.
   * @param listThreadPriority The listThreadPriority to set
   */
  public void setListThreadPriority(int listThreadPriority) {
    this.listThreadPriority = listThreadPriority;
  }

  /**
   * Called from data objects when data have been changed.
   * Used for synchronization of data presentations.
   * @param e the data change event that happened.
   */
  public synchronized void DataChangePerformed(DataChangedEvent e) {
    if (e.getEntityName().equals(listDataObject.getTableName()) && isConnectionOpen()) { // e.g. connection may be closed after user changed database - the windows are closed and not used any more but still existing until garbage collection
      if (e.getSequenceType() != DataChangedEvent.SUMMARY_TYPE && this.listThread == null) {
        handleDataChangeIndividually(e);
      } else if (autoInitialListFill || !getElaboratedWhereCondition().equals("")) {
        refreshList();
      }
    }
  }

  private boolean isConnectionOpen() {
    try {
      return !listDataObject.getConnection().isClosed();
    } catch (SQLException e) {
      return false;
    }
  }

  /**
   * The task to be done associated with the list button.
   */
  protected void ListButtonAction() {
    if (isInputAccepted()) refreshList();
  }

  /**
   * Execution of the list thread.
   */
  public void run() {
    beginOfListThread();
    while (listIsToRefresh) {
      listIsToRefresh = false;
      fillList();
    }
    endOfListThread();
    listThread = null;
  }

  /**
   * Clears and fills the list in separate thread.
   */
  public synchronized void refreshList() {
    listIsToRefresh = true;
    if (de.must.wuic.MainStd.debugMode) {
      run();
    } else {
      if (listThread == null) {
        listThread = new Thread(this);
        if (listThreadPriority != -1) listThread.setPriority(listThreadPriority);
        listThread.start();
      }
    }
  }

  /**
   * Called when data selection is initialized to give the application developer
   * the opportunity to switch the list data object by overriding this method.
   */
  protected void ChooseListDataObject() {
  }

  /**
   * Transfers the select relevant specification to the data object.
   * In general, the expert condition contains the where condition without the 
   * word where. But to support joins and other difficult select statements,
   * there's a second way of usage: if the expert expression contains "select", 
   * then it is treated as the complete select statement. If so, it has to 
   * contain the entire stuff to get the right result.
   */
  private boolean select() {
    ChooseListDataObject();
    String whereCondition = getElaboratedWhereCondition();
    if (whereCondition.trim().toLowerCase().startsWith("select")) {
      return listDataObject.openQuery(whereCondition);
    } else {
      return listDataObject.select(getSelectionFields(), whereCondition, getOrderByFields(), maxListEntries);
    }
  }

  /**
   * Returns the fields to be used for the order by clause, separated by comma
   * as usual in SQL statements.
   * @return the fields to be used for the order by clause
   */
  protected abstract String getOrderByFields();

  /**
   * Fills the List according to the specified criteria.
   */
  protected /* synchronized */ void fillList() { // synchronize problem with getTreeLock() while fireSelectionChanged in MustList
    int indexToSelect = -1;
    int maxListEntries = getMaxListEntries();
    setMessage(getTranslation("TEXT_LOADING_SELECTION"));
    if (select()) {
      removeAllOfTheList();
      beginListFill();
      int i = 0;
      while (!listIsToRefresh && ++i <= maxListEntries && listDataObject.nextRow()) {
        fillListLine(i, indexToSelect);
      }
      listDataObject.closeQuery();
      completeListFill();
      switch (getListItemCount()) {
      case 0:
        statusLabel.setRemainStatus(getNotFoundNotification());
        break;
      case 1:
        statusLabel.resetDefault();
        // CreateOrRecoverPropertyFramme();  no good, especially after recording that causes unique selection
        // associatedPropertyAdministration.loadValues(centerList.getIdentifier(0));  no good, especialy after recording that causes unique selection
        break;
      default:
        requestListingFocus();
        if (i > maxListEntries) {
          statusLabel.setRemainStatus(getTranslation("TEXT_PARTIAL_LISTING"));
        } else {
          // statusLabel.resetDefault();
          statusLabel.setRemainStatus(i-1 + getTranslation("TEXT_ENTRIES"));
        }
        break;
      }
      if (indexToSelect != -1) {
        selectListIndex(indexToSelect);
      }
    }
    else {
      statusLabel.setRemainStatus(getTranslation("TEXT_SYNTAX_ERROR_ACCORDING_TO_DB_DRIVER"));
      StandardDialog.presentText(
        null, 
        new String[]{
          listDataObject.getQueryException().getMessage(),
          "",
          getTranslation("TEXT_QUERY_WAS"),
          listDataObject.getFailedQueryExpression()
        },
        getTranslation("TEXT_SYNTAX_ERROR_ACCORDING_TO_DB_DRIVER")
      );
    }
  }

  private void fillListLine(int i, int indexToSelect) {
    appendListEntry();
    if (lastSelectionIdentifier != null && listDataObject.getIdentifier().equals(lastSelectionIdentifier)) {
      indexToSelect = i-1;
    }
  }

  /**
   * Ending of list fills into a list model which is not currently assigned 
   * to the view. The model initialized by beginListFill() becomes active now.
   * @see #beginListFill()
   */
  protected abstract void completeListFill();

  /**
   * Returns the where condition.
   * @return the where condition
   */
  public String getElaboratedWhereCondition() {
    if (expertSearchTextArea != null && getSelectedTab() == expertSearchTab) {
      return expertSearchTextArea.getText().trim();
    } else {
      return getPrivateWhereConditionNotExpert();
    }
  }

  private String getPrivateWhereConditionNotExpert() {
    if (globalSearchTextField != null && !globalSearchTextField.getText().trim().equals("")) {
      return listDataObject.getGlobalWhereCondition(globalSearchTextField.getText());
    } else {
      return getWhereCondition();
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
   * Called when list thread begins.
   */
  protected abstract void beginOfListThread();

  /**
   * Called when list thread ends.
   */
  protected abstract void endOfListThread();

  /**
   * Adds an entry at the end of the table.
   */
  protected abstract void appendListEntry();

  /**
   * Called from DataObject when data have been changed.
   * @param e the data change event
   * @see de.must.dataobj.DataChangeListener
   * @see de.must.dataobj.DataObject
   */
  protected abstract void handleDataChangeIndividually(DataChangedEvent e);

}
