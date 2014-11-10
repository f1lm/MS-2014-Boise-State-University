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

import javax.swing.*;
import javax.swing.table.*;
import javax.swing.event.*;

import de.must.dataobj.Identifier;

import java.awt.EventQueue;
import java.awt.Rectangle;
import java.awt.event.MouseEvent;
import java.util.*;

/**
 * @author Christoph Mueller
 */
public class MustTable extends JTable implements AnySelectionSpeaker {

  private Vector<AnySelectionListener> anySelectionListener;
  private DefaultDateCellRenderer defaultDateCellRenderer;
  private Vector<String> columnToolTipText;

  public MustTable() {
    init();
  }

  public MustTable(AbstractTableModel tableModel) {
    super(tableModel);
    init();
  }
  
  private void init() {
    if (getFont().getSize() > 12) {
      setRowHeight((int)(getFont().getSize() * 1.4));
    }
  }
  
  public Vector<String> getColumnToolTipText() {
    return columnToolTipText;
  }

  public void setColumnToolTipText(Vector<String> columnToolTipText) {
    this.columnToolTipText = columnToolTipText;
  }
  
  public String getColumnToolTipText(int colIndex) {
    if (columnToolTipText == null) return null;
    if (colIndex >= columnToolTipText.size()) return null;
    return columnToolTipText.elementAt(colIndex);
  }

  @Override
  public TableCellRenderer getCellRenderer(int row, int column) {
    // System.out.println(row + ", " + column + ": " + getModel().getValueAt(row, column));
    if (row >= getModel().getRowCount() || column >= getModel().getColumnCount()) { // maybe table is reloading at the moment
      return getDefaultRenderer(Object.class);
    }
    TableColumn tableColumn = getColumnModel().getColumn(column);
    TableCellRenderer renderer = tableColumn.getCellRenderer();
    if (renderer == null) {
      Object cellObj = getModel().getValueAt(convertRowIndexToModel(row), convertColumnIndexToModel(column));
      if (cellObj == null) {
        renderer = getDefaultRenderer(getColumnClass(column));
      } else {
        renderer = getDefaultRenderer(cellObj.getClass());
      }
    }
    return renderer;
  }

  @Override
  public TableCellRenderer getDefaultRenderer(Class<?> columnClass) {
    if (Date.class.equals(columnClass) || java.sql.Date.class.equals(columnClass)) {
      if (defaultDateCellRenderer == null) {
        defaultDateCellRenderer = new DefaultDateCellRenderer(DefaultDateCellRenderer.FORMAT_SHORT);
      }
      return defaultDateCellRenderer;
    } else {
      return super.getDefaultRenderer(columnClass);
    }
  }

  @Override
  public String getToolTipText(MouseEvent e) {
    int colIndex = columnAtPoint(e.getPoint());
    int realIndex = columnModel.getColumn(colIndex).getModelIndex();
    if (columnToolTipText != null
     && columnToolTipText.size() > colIndex
     && columnToolTipText.elementAt(colIndex) != null
    ) {
      return columnToolTipText.elementAt(realIndex);
    } else return super.getToolTipText();
  }
 
  public int getSelectedRow() { // needs workaround to have correctly activated depending buttons!
    if (getModel().getRowCount() == 0) return -1;
    if (super.getSelectedRow() >= this.getModel().getRowCount()) return -1;
    return super.getSelectedRow();
  }

  /**
   * Returns the selected identifier.
   * @return the selected identifier
   */
  public Identifier getSelectedIdentifier() {
    return getIdentifier(getSelectedRow());
  }

  /**
   * Returns the selected identifiers.
   * @return the selected identifiers
   */
  public Vector<Identifier> getSelectedIdentifiers() {
    Vector<Identifier> result = new Vector<Identifier>();
    for (int selecteRow : getSelectedRows()) {
      result.add(getIdentifier(selecteRow));
    }
    return result;
  }

  /**
   * Returns the identifier of the specified item.
   * @param listIndex the index of the item
   * @return the identifier of the item
   */
  public Identifier getIdentifier(int listIndex) {
    if (getModel() instanceof RecordSelectTableModel) {
      return ((RecordSelectTableModel)getModel()).getIdentifier(listIndex);
    } else {
      return null;
    }
  }

  @Override
  public void valueChanged(ListSelectionEvent e) {
    if (MainStd.debugMode) de.must.io.Logger.getInstance().info(getClass(), "valueChanged occurred in table");
    super.valueChanged(e);
    EventQueue.invokeLater(new Runnable() {
      public void run() {
        fireSelectionChanged();
      }
    });
  }
  
  /**
   * Adds a selection listener to be notified about selection changed events.
	 * @param l the selection listener to be notified
	 */
  public synchronized void addAnySelectionListener(AnySelectionListener l) {
    Vector<AnySelectionListener> v = anySelectionListener == null ? new Vector<AnySelectionListener>(2) : new Vector<AnySelectionListener>(anySelectionListener);
    if (!v.contains(l)) {
      v.addElement(l);
      anySelectionListener = v;
    }
  }

	/**
   * Removes a selection listener to be notified about selection changed events.
	 * @param l the selection listener
	 */
  public synchronized void removeAnySelectionListener(AnySelectionListener l) {
    if (anySelectionListener != null && anySelectionListener.contains(l)) {
      Vector<AnySelectionListener> v = new Vector<AnySelectionListener>(anySelectionListener);
      v.removeElement(l);
      anySelectionListener = v;
    }
  }

  public void fireSelectionChanged() {
    fireSelectionChanged(new AnySelectionChangedEvent(getSelectedRowCount(), !(getSelectedRow() == -1), getSelectedIdentifier()));
  }

  private void fireSelectionChanged(AnySelectionChangedEvent e) {
    if (anySelectionListener != null) {
      Vector<AnySelectionListener> listeners = anySelectionListener;
      int count = listeners.size();
      for (int i = 0; i < count; i++) {
        listeners.elementAt(i).selectionChanged(e);
      }
    }
  }

  public void ensureIndexIsVisible(final int index) {
    // scrolling must be done after swing knows the cell height
    Runnable scroller = new Runnable() {
      public void run() {
        Rectangle cellBounds = getCellRect(index, 0, true);
        if (cellBounds != null) {
          scrollRectToVisible(cellBounds);
        }
      }
    };
    EventQueue.invokeLater(scroller);
  }

}
