/*
 * Copyright (c) 1999-2013 Christoph Mueller. All rights reserved.
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

import javax.swing.UIManager;
import javax.swing.table.*;

import java.awt.*;
import java.awt.event.*;
import java.util.Vector;

/**
 * Frame for database inquiry, data overview by JTable and record selection.
 * Needs associated property frame for modifications of selected records.
 * @author Christoph Mueller
 * @see SimpleDataListFrame
 */
public abstract class ColumnDataListFrame extends AbstractDataListFrame {

  protected final RecordSelectTable selectTable;
  protected final RecordSelectTableModel selectTableModel;
  private double widthFactor = -1;

  /**
   * Constructs a frame for data selection by using a table.
   * @param columnNames the names of the columns to be shown in the overview.
   * The number of columns must fit to the number of objects requested in
   * <code>{@link #getRowObjects}</code>
   * @see #getRowObjects
   */
  public ColumnDataListFrame(String[] columnNames) {
    this(null, columnNames);
  }

  /**
   * Constructs a frame for data selection by using a table.
   * @param ownerFrame the owner frame
   * @param columnNames the names of the columns to be shown in the overview.
   * The number of columns must fit to the number of objects requested in
   * <code>{@link #getRowObjects}</code>
   * @see #getRowObjects
   */
  public ColumnDataListFrame(Frame ownerFrame, String[] columnNames) {
    super(ownerFrame);
    selectTableModel = new RecordSelectTableModel(columnNames);
    selectTable = new RecordSelectTable(selectTableModel) {
      protected JTableHeader createDefaultTableHeader() {
        return new JTableHeader(columnModel) {
          public String getToolTipText(MouseEvent event) {
            Point point = event.getPoint();
            int index = columnModel.getColumnIndexAtX(point.x);
            int realIndex = columnModel.getColumn(index).getModelIndex();
            String ttt = getColumnToolTipText(realIndex);
            if (ttt != null) return ttt;
            else return super.getToolTipText(event);
          }
        };
      }
    };
    selectTableModel.setRowSorter(selectTable);
    selectTable.setPreferredScrollableViewportSize(new Dimension(450, 100)); // reduce JTables standard height to give selection fields a chance to be seen.
    listScrollPane.getViewport().setView(selectTable);
    jSplitPane1.setBottomComponent(listScrollPane);
    if (buttonPresent != null) buttonPresent.setSelectDependence(selectTable, true);
    buttonProperties.setSelectDependence(selectTable, true);
    buttonCopy.setSelectDependence(selectTable);
    buttonPrint.setSelectDependence(selectTable, true);
    buttonDelete.setSelectDependence(selectTable, true);
    if (buttonPresent != null) {
      selectTable.setEnterButton(buttonPresent); // preferred default button
    } else {
      selectTable.setEnterButton(buttonProperties); // always existing button
    }
    selectTable.addFocusListener(new java.awt.event.FocusAdapter() {
      public void focusGained(FocusEvent e) {
        rootFrame.getRootPane().setDefaultButton(buttonProperties);
      }
    });
  }

  /**
   * Sets the preferred column width of all columns as specified.
   * @param columnWidth the Integer Vector of column widths to use
   */
  public void setPreferredColumnWidth(Vector<Integer> columnWidth) {
    for (int i = 0; i < columnWidth.size(); i++) {
      TableColumn column = selectTable.getColumnModel().getColumn(i);
      column.setPreferredWidth(getEffectiveWidth(columnWidth.elementAt(i)));
    }
  }

  /**
   * Sets the preferred column width of all columns as specified.
   * @param columnWidth the array of column widths to use
	 */
  public void setPreferredColumnWidth(int[] columnWidth) {
    for (int i = 0; i < columnWidth.length; i++) {
      TableColumn column = selectTable.getColumnModel().getColumn(i);
      column.setPreferredWidth(getEffectiveWidth(columnWidth[i]));
    }
  }

  /**
   * Sets the maximum column width of a column as specified.
	 * @param col the column whose width shall be set
	 * @param width the new width of the column
	 */
  public void setMaxColumnWidth(int col, int width) {
    TableColumn column = selectTable.getColumnModel().getColumn(col);
    column.setMaxWidth(getEffectiveWidth(width));
  }

  /**
   * Sets the preferred column width of a column as specified.
	 * @param col the column whose width shall be set
	 * @param width the new width of the column
	 */
  public void setPreferreColumnWidth(int col, int width) {
    TableColumn column = selectTable.getColumnModel().getColumn(col);
    column.setPreferredWidth(getEffectiveWidth(width));
  }
  
  private int getEffectiveWidth(int baseWidth) {
    if (widthFactor == -1) { // first time
      Object value = UIManager.get("Table.font");
      if (value instanceof javax.swing.plaf.FontUIResource) {
        int tableFontSize = ((javax.swing.plaf.FontUIResource)value).getSize();
        widthFactor = (double)tableFontSize / 11;
      } else {
        widthFactor = 1;
      }
    }
    return (int)(baseWidth * widthFactor);
  }

  /**
   * Clears the selection.
	 */
  protected final void clearSelection() {
    selectTable.clearSelection();
  }

  /** 
   * Removes all items of the table.
   */
  protected final void removeAllOfTheList() {
    selectTable.removeAll();
  }

  /**
   * Dummy due to SimpleDataListFrame.
	 */
	protected void beginListFill() {
  }

  @Override
  protected void beginListExtension() {
    selectTable.setVisible(false);
  }

  protected void completeListFill() {
    selectTable.setVisible(true);
  }
  
  /**
   * Returns the selected identifier.
   * @return the selected identifier
   */
  public Identifier getSelectedIdentifier() {
    return selectTableModel.getIdentifier(selectTable.getSelectedRow());
  }

  /**
   * Returns the selected identifiers.
   * @return the selected identifiers
   */
  public Identifier[] getSelectedIdentifiers() {
    Identifier[] identifiers = new Identifier[selectTable.getSelectedRows().length];
    for (int i = 0; i < identifiers.length; i++) {
      identifiers[i] = selectTableModel.getIdentifier(selectTable.getSelectedRows()[i]);
    }
    return identifiers;
  }

  /**
   * Returns the selected identifiers as vector.
   * @return the selected identifiers as vector
   */
  public Vector<Identifier> getSelectedIdentifierAsVector() {
    Vector<Identifier> identifiers = new Vector<Identifier>();
    for (int index : selectTable.getSelectedRows()) {
      identifiers.add(selectTableModel.getIdentifier(index));
    }
    return identifiers;
  }

  /**
   * Returns the selected item.
   * @return the selected item
   */
  public final String getSelectedItem() {
    return getItem(selectTable.getSelectedRow());
  }

  /**
   * Returns a table row in format columnValue1 / columnValue2 / ...
   * @param index the index of the row to format
   * @return a table row in format columnValue1 / columnValue2 / ...
   */
  public String getItem(int index) {
    String item = selectTableModel.getValueAsShownAt(index, 0).toString();
    for (int i = 1; i < selectTable.getColumnCount(); i++) {
      Object obj = selectTableModel.getValueAsShownAt(index, i);
      if (obj != null) item += " / " + obj.toString(); // date may be null
    }
    return item;
  }

  @Override
  public String[] getSelectedItems() {
    String[] items = new String[selectTable.getSelectedRows().length];
    for (int i = 0; i < items.length; i++) {
      items[i] = getItem(selectTable.getSelectedRows()[i]);
    }
    return items;
  }
  
  /**
   * Request the focus to the list.
   */
  protected void requestListingFocus() {
    selectTable.requestFocus();
  }

  /**
   * Called from DataObject when data have been changed.
   * @param dce the data change event
   * @see de.must.dataobj.DataChangeListener
   * @see de.must.dataobj.DataObject
   */
  protected void handleDataChangeIndividually(DataChangedEvent dce) {
    if (dce.getMode() == DataChangedEvent.DELETION_MODE) {
      removeEntry(dce.getIdentifier());
    } else {
      selectOrApendListEntry(dce.getIdentifier());
    }
  }

  // may be called by user interaction or data change event
  private final synchronized void selectOrApendListEntry(Identifier identifier) {
    resetExtensionMode();
    listDataObject.load(identifier, getSelectionFields());
    for (int i = 0; i < selectTableModel.getRowCount(); i++) {
      if (selectTableModel.getIdentifier(i).equals(identifier)) {
        listModification = LIST_MODIFICATION_UPDATE;
        selectTableModel.updateRow(getRowObjects(), i);
        selectListIndex(i);
        repaintSelectTable();
        return;
      }
    }
    listModification = LIST_MODIFICATION_APPEND;
    selectTableModel.addIndexedRow(getRowObjects(), identifier);
    // selectTableModel.setRowSorter(selectTable);
    selectListIndex(selectTable.getRowSorter().convertRowIndexToView(selectTableModel.getRowCount()-1));
    repaintSelectTable();
  }
  
  @Override
  public void setSelectedIdentifier(Identifier identifier) {
    for (int i = 0; i < selectTableModel.getRowCount(); i++) {
      if (selectTableModel.getIdentifier(i).equals(identifier)) {
        selectListIndex(i);
        return;
      }
    }
  }

  /**
   * Adds an entry at the end of the table.
   */
  protected void appendListEntry() {
    selectTableModel.addIndexedRow(getRowObjects(), listDataObject.getIdentifier());
  }

  private final void removeEntry(Identifier identifier) {
    listModification = LIST_MODIFICATION_REMOVE;
    for (int i = 0; i < selectTableModel.getRowCount(); i++) {
      if (selectTableModel.getIdentifier(i).equals(identifier)) {
        selectTableModel.removeRow(i);
        selectTable.fireSelectionChanged(); // could be last remaining row, so dependent buttons have to be deactivated
        repaintSelectTable();
        return;
      }
    }
  }

  /**
   * Returns the index of the selected item.
   * @return the index of the selected item
   */
  protected final int getSelectedIndex() {
    return selectTable.getSelectedRow();
  }

  /**
   * Selects the entry of the list with the specified index and ensures, that
   * the entry is visible by scrolling to the entry.
   * @param indexToSelect the index of the entry to select
   */
  protected final void selectListIndex(int indexToSelect) {
    selectTable.setRowSelectionInterval(indexToSelect, indexToSelect);
    selectTable.ensureIndexIsVisible(indexToSelect);
  }

  /**
   * Returns the number of items in the table.
   * @return the number of items in the table
   */
  protected final int getListItemCount() {
    return selectTableModel.getRowCount();
  }

  /**
   * Returns the identifiers of all listed items.
   * @return the identifiers of all listed items
   */
  public Identifier[] getIdentifiers() {
    Identifier[] identifiers = new Identifier[selectTableModel.getRowCount()];
    for (int i = 0; i < selectTableModel.getRowCount(); i++) {
      identifiers[i] = selectTableModel.getIdentifier(i);
    }
    return identifiers;
  }
  
  /**
   * Called when the list thread begins.
   */
  protected void beginOfListThread() {
		listScrollPane.getViewport().setCursor(WaitCursor);
		selectTable.setCursor(WaitCursor);
    selectTableModel.resetSort();
  }

  /**
   * Called when the list thread ends.
   */
  protected void endOfListThread() {
		listScrollPane.getViewport().setCursor(DefaultCursor);
    selectTable.setCursor(DefaultCursor);
    repaintSelectTable();
    selectTable.fireSelectionChanged();
  }

  /**
   * Repaints the select table.
   */
  protected void repaintSelectTable() {
    EventQueue.invokeLater(new Runnable() {
      public void run() {
        selectTable.revalidate();
        selectTable.repaint(); // needed e.g. when only one cell is changed
      }
    });
  }

  /**
   * Returns the column objects to layout one row of the table to provide overview
   * information, which allows the user to identify the entry.
   * @return Returns the column objects to layout one row of the table
   */
  public abstract Object[] getRowObjects();

}
