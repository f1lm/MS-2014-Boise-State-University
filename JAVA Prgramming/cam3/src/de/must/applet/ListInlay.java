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

package de.must.applet;

import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.MediaTracker;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.FocusEvent;
import java.io.IOException;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Iterator;
import java.util.Vector;

import javax.swing.ImageIcon;
import javax.swing.JScrollPane;
import javax.swing.JViewport;
import javax.swing.UIManager;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.table.TableColumn;

import de.must.applet.AppletGlobal.Veto;
import de.must.dataobj.Identifier;
import de.must.io.Logger;
import de.must.middle.ApplConstStd;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.DefaultDateCellRenderer;
import de.must.wuic.DefaultNumberCellRenderer;
import de.must.wuic.DefaultPriceCellRenderer;
import de.must.wuic.MustButton;
import de.must.wuic.RecordSelectTable;
import de.must.wuic.RecordSelectTableModel;

public class ListInlay extends InputInlay {
  
  private Vector<String> columnNameVector;
  private Vector<Integer> columnWidth;
  private Vector<Object> rowValues;
  private String[] columnNames;
  private Class<?>[] columnClasses;
  private JScrollPane listScrollPane;
  protected RecordSelectTableModel selectTableModel;
  private RecordSelectTable selectTable;
  protected MustButton buttonPresent;
  protected MustButton buttonProperties;
  protected MustButton buttonChoose;
  protected MustButton buttonCopy;
  protected MustButton buttonPrint;
  protected MustButton buttonDelete;
  private Point viewPositionBeforeListExtension;
  protected boolean currentlyExtending;
  protected boolean furtherRowAvailable;
  private double widthFactor = -1;
  private RemConfirmDialog deleteConfDlg;
  private RemInfoDialog infoDlg;
  
  public ListInlay(String tabIdAndLabel) {
    super(tabIdAndLabel);
    columnNameVector = new Vector<String>();
    columnWidth = new Vector<Integer>();
    rowValues = new Vector<Object>();
    columnNames = new String[]{"Column1", "Col2"};
    selectTable = new RecordSelectTable();
    selectTable.setPreferredScrollableViewportSize(new Dimension(300, 100));
    buttonProperties = AppletGlobal.getInstance().createButton("Edit24.gif", "Edt", getTranslation("TEXT_PROPERTIES"), Constants.ACTION_LOAD, this);
    buttonCopy = AppletGlobal.getInstance().createButton("Copy24.gif", "Co", getTranslation("TEXT_COPIES_SELECTED_ENTRY"), Constants.ACTION_COPY, this);
    buttonPrint = AppletGlobal.getInstance().createButton("Print24.gif", "Pri", getTranslation("TEXT_PRINTS_SELECTED_ENTRY"), "BtnPrint", this);
    buttonDelete = AppletGlobal.getInstance().createButton("Remove24.gif", "D", getTranslation("TEXT_DELETES_SELECTED_ENTRY"), Constants.ACTION_DELETE, this);
    panelButtons.add(buttonProperties);
    panelButtons.add(buttonCopy);
    panelButtons.add(buttonDelete);
    add(listScrollPane = new JScrollPane(selectTable), BorderLayout.CENTER);
    add(panelButtons, BorderLayout.SOUTH);
    AppletGlobal.getInstance().getApplet().getRootPane().setDefaultButton(buttonProperties);
    buttonProperties.setSelectDependence(selectTable, true);
    buttonCopy.setSelectDependence(selectTable, false);
    buttonDelete.setSelectDependence(selectTable, true);
    selectTable.setEnterButton(buttonProperties); // always existing button
    listScrollPane.getViewport().addChangeListener(new ChangeListener() {
      public void stateChanged(final ChangeEvent e) {
        EventQueue.invokeLater(new Runnable() {
          public void run() { // check state of the viewport after swing has finished painting!
            if (viewPositionBeforeListExtension == null) { // we're not already extending, yet
              JViewport viewport = (JViewport) e.getSource();
              Component component = viewport.getView();
              // if vertical scrollbar is at the bottom limit, extend list
              if ((viewport.getViewRect().height + viewport.getViewPosition().y + 15) > component.getSize().height
                  && component.getSize().height > 0
                  && !currentlyExtending
                  && furtherRowAvailable
              ) {
                extendList();
              }
            }
          }
        });
      }
    });
  }
  
  public void setReadOnly() {
    buttonProperties.setVisible(false);
    buttonCopy.setVisible(false);
    buttonDelete.setVisible(false);
  }
  
  /**
   * Extends the list dynamically.
   */
  public synchronized boolean extendList() {
    // threadMode = AbstractDataListFrame.THREAD_MODE_EXTEND;
    Vector<KeyValuePairAlpha> params = getSynchParams();
    params.add(new KeyValuePairAlpha(Constants.TAB_OR_WINDOW_ID, tabIdAndLabel));
    params.add(new KeyValuePairAlpha(Constants.TAB_ELEMENT, Constants.SEARCH));
    params.add(new KeyValuePairAlpha(Constants.ACTION, Constants.ACTION_LIST_EXTENSION));
    try {
      AppletGlobal.getInstance().contactServer(params);
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
      return false;
    }
    return true;
  }
  
  @Override
  protected String getTabElementId() {
    return Constants.LIST;
  }

  @Override
  public void focusGained(FocusEvent e) {
    if (buttonPresent != null) {
      AppletGlobal.getInstance().getApplet().getRootPane().setDefaultButton(buttonPresent); // preferred default button
    } else if (buttonProperties != null) {
      AppletGlobal.getInstance().getApplet().getRootPane().setDefaultButton(buttonProperties);
    }
  }

  @Override
  public void focusLost(FocusEvent e) {
  }

  public void perform (Action action) {
    if (Constants.SET_HEADER.equals(action.toDo)) {
      String title = action.value;
      if (title.length() > 0) {
        title += ":";
      }
      titleLabel.setText(title);
    } else if (Constants.SET_VISIBLE_FALSE_COPY_BUTTON.equals(action.toDo)) {
      buttonCopy.setVisible(false);
    } else if (Constants.CREATE_BOTTOM_BUTTON.equals(action.toDo)) {
      int index = -1;
      try {
        index = action.getValueAsInt();
      } catch (NumberFormatException e) {} // ignore
      MustButton button = AppletGlobal.getInstance().createButton(action.variant1, action.label, action.variant2, action.id, this);
      additionalButton.add(button);
      panelButtons.add(button, index);
      if (action.variant3 != null) switch (Integer.valueOf(action.variant3)) {
      case ApplConstStd.LIST_DEPENDENCE_WITHOUT:
        break; // nothing to do
      case ApplConstStd.LIST_DEPENDENCE_ACTIVE_SINGLE_SELECTION_ONLY:
        button.setSelectDependence(selectTable, false);
        break;
      case ApplConstStd.LIST_DEPENDENCE_ACTIVE_MULTIPLE_SELECTION:
        button.setSelectDependence(selectTable, true);
        break;
      }
    } else if (Constants.CREATE_PRESENT_BUTTON.equals(action.toDo)) {
      buttonPresent = AppletGlobal.getInstance().createButton("Properties24.gif", "Pr", getTranslation("TEXT_PRESENTS_SELECTED_ENTRY"), Constants.ACTION_PRESENT, this);
      panelButtons.add(buttonPresent, 0);
      buttonPresent.setSelectDependence(selectTable, true);
      selectTable.setEnterButton(buttonPresent); // always existing button
      AppletGlobal.getInstance().getApplet().getRootPane().setDefaultButton(buttonPresent);
   } else if (Constants.CLEAR_LIST_COLUMNS.equals(action.toDo)) {
      columnNameVector.clear();
      columnWidth.clear();
      if (selectTableModel != null) selectTableModel.removeAll();
    } else if (Constants.ADD_LIST_COLUMN.equals(action.toDo)) {
      columnNameVector.add(action.value);
      int width = -2;
      if (action.variant1 != null) {
        width = Integer.parseInt(action.variant1);
      }
      columnWidth.add(new Integer(width));
    } else if (Constants.APPLY_LIST_COLUMNS.equals(action.toDo)) {
      columnNames = new String[columnNameVector.size()];
      columnNames = columnNameVector.toArray(columnNames);
      selectTableModel = new RecordSelectTableModel(columnNames);
      applyColumnWidth();
    } else if (Constants.CLEAR_LIST.equals(action.toDo)) {
      selectTableModel = new RecordSelectTableModel(columnNames);
      // viewPositionBeforeListExtension = listScrollPane.getViewport().getViewPosition(); // view position to be recovered later
    } else if (Constants.ADD_ROW_OBJECT.equals(action.toDo)) {
      ImageIcon icon = null;
      if (action.variant1 != null 
      && (icon = AppletGlobal.getInstance().getImageIcon(action.variant1))!= null
      && icon.getImageLoadStatus() != MediaTracker.ERRORED
      ) {
        rowValues.add(icon);  
      } else {
        int index = rowValues.size();
        Object cellValue = action.value;
        if (action.variant2 != null) {
          if (columnClasses == null) {
            columnClasses = new Class<?>[selectTable.getColumnModel().getColumnCount()];
          }
          try {
            Class<?> colClass = Class.forName(action.variant2);
            columnClasses[index] = colClass;
            if (Date.class.equals(colClass) || Timestamp.class.equals(colClass)) {
              selectTable.getColumnModel().getColumn(index).setCellRenderer(new DefaultDateCellRenderer());
            } else if (Integer.class.equals(colClass)) {
              selectTable.getColumnModel().getColumn(index).setCellRenderer(new DefaultNumberCellRenderer());
            } else if (Double.class.equals(colClass)) {
              selectTable.getColumnModel().getColumn(index).setCellRenderer(new DefaultPriceCellRenderer());
            }
          } catch (ClassNotFoundException e) {
            Logger.getInstance().error(getClass(), e);
          }
        }
        if (columnClasses != null && index >= 0 && columnClasses[index] != null) {
          Class<?> colClass = columnClasses[index];
          if (Date.class.equals(colClass)) {
            if (action.value.length() == 0) cellValue = null;
            else cellValue = Date.valueOf(action.value);
          } else  if (Timestamp.class.equals(colClass)) {
            if (action.value.length() == 0) cellValue = null;
            else cellValue = Timestamp.valueOf(action.value);
          } else  if (Integer.class.equals(colClass)) {
            if (action.value.length() == 0) cellValue = null;
            else cellValue = action.getValueAsInt();
          } else  if (Double.class.equals(colClass)) {
            if (action.value.length() == 0) cellValue = null;
            else cellValue = Double.valueOf(action.value);
          }
        }
        rowValues.add(cellValue);
      }
    } else if (Constants.APPLY_ROW_CHECKING_UPDATE.equals(action.toDo)) {
      Identifier identifier = Identifier.parseString(action.id);
      boolean add = true;
      for (int i = 0; i < selectTableModel.getRowCount(); i++) {
        if (selectTableModel.getIdentifier(i).equals(identifier)) {
          selectTableModel.updateRow(rowValues.toArray(new Object[rowValues.size()]), i);
          add = false;
          break;
        }
      }
      if (add) {
        selectTableModel.addIndexedRow(rowValues.toArray(new Object[rowValues.size()]), identifier);
      }
      rowValues.clear();
    } else if (Constants.APPLY_ROW.equals(action.toDo)) {
      currentlyExtending = true;
      selectTableModel.addIndexedRow(rowValues.toArray(new Object[rowValues.size()]), Identifier.parseString(action.id));
      rowValues.clear();
    } else if (Constants.APPLY_LIST.equals(action.toDo)) {
      applyColumnWidth();
      selectTable.setModel(selectTableModel);
      selectTableModel.setRowSorter(selectTable);
      currentlyExtending = false;
    } else if (Constants.SET_FURTHER_ROW_AVAILABLE.equals(action.toDo)) {
      furtherRowAvailable = Boolean.valueOf(action.value);
      if (furtherRowAvailable) {
        if (messageReceiver != null) messageReceiver.setRemainStatus(getTranslation("TEXT_PARTIAL_LISTING"));
      } else {
        if (messageReceiver != null) messageReceiver.setRemainStatus(selectTableModel.getRowCount() + getTranslation("TEXT_ENTRIES"));
      }
      currentlyExtending = false;
      listScrollPane.getViewport().validate();
    } else if (Constants.SET_READ_ONLY.equals(action.toDo)) {
      setReadOnly();
    } else if (Constants.INFO_CANNOT_DELETE.equals(action.toDo)) {
      if (infoDlg == null) {
        infoDlg = new RemInfoDialog(tabIdAndLabel, getTabElementId());
        infoDlg.setTitle(getTranslation("TEXT_ENTRY_IS_IN_USE"));
        infoDlg.setHeaderText(getTranslation("TEXT_ENTRY_MUST_NOT_BE_DELETED") + " " + getTranslation("TEXT_BECAUSE_IT_IS_IN_USE"));
      }
      infoDlg.perform(action);
      infoDlg.setVisible(true);
    } else if (Constants.CONFIRM_DELETION.equals(action.toDo)) {
      if (deleteConfDlg == null) {
        deleteConfDlg = new RemConfirmDialog(tabIdAndLabel, getTabElementId());
        action.variant1 = getTranslation("TEXT_CONFIRM_DELETION");
        action.variant2 = getTranslation("TEXT_THIS_ITEM_IS_GOING_TO_BE_DELETED");
        deleteConfDlg.setAction(Constants.ACTION_DELETE_CONFIRMATION, Constants.ACTION_DELETE_CANCEL);
      }
      deleteConfDlg.perform(action);
      deleteConfDlg.setVisible(true);
    } else if (Constants.REMOVE_ITEM.equals(action.toDo)) {
      remove(Identifier.parseString(action.id));
    } else {
      super.perform(action);
    }
  }

  private void applyColumnWidth() {
    selectTable.setModel(selectTableModel);
    int i = -1;
    Iterator<Integer> iterator = columnWidth.iterator();
    while (iterator.hasNext()) {
      i++;
      int width = iterator.next().intValue();
      TableColumn column = selectTable.getColumnModel().getColumn(i);
      column.setPreferredWidth(getEffectiveWidth(width));
    }
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

  private final void remove(Identifier identifier) {
    for (int i = 0; i < selectTableModel.getRowCount(); i++) {
      if (selectTableModel.getIdentifier(i).equals(identifier)) {
        selectTableModel.removeRow(i);
        selectTable.fireSelectionChanged(); // could be last remaining row, so dependent buttons have to be deactivated
        // repaintSelectTable();
        return;
      }
    }
  }

  /**
   * Controls action events like button pressed.
   * @param e the action event to be interpreted
   */
  public void actionPerformed(ActionEvent e) {
    generalActionBeginnung();
    String actCommand = e.getActionCommand();
    Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
    params.add(new KeyValuePairAlpha(Constants.TAB_OR_WINDOW_ID, tabIdAndLabel));
    params.add(new KeyValuePairAlpha(Constants.TAB_ELEMENT, getTabElementId()));
    params.add(new KeyValuePairAlpha(Constants.ACTION, actCommand));
    params.add(new KeyValuePairAlpha(Constants.IDENTIFIER, getSelectedIdentifiers()));
    try {
      Veto veto = AppletGlobal.getInstance().contactServer(params);
      if (veto != null) {
        if (messageReceiver != null) messageReceiver.setStatus(veto.message);
      } else {
        if (messageReceiver != null) messageReceiver.reset();
      }
    } catch (IOException e1) {
      Logger.getInstance().error(getClass(), e1);
    }
    generalActionEnding();
  }

  /**
   * Returns the selected identifiers.
   * @return the selected identifiers
   */
  public String getSelectedIdentifiers() {
    Identifier[] identifiers = new Identifier[selectTable.getSelectedRows().length];
    String result = null;
    if (identifiers.length == 0) result = "";
    else result = selectTableModel.getIdentifier(selectTable.getSelectedRows()[0]).toString();
    for (int i = 1; i < identifiers.length; i++) {
      result += ApplConstStd.MAIN_SEPARATOR + selectTableModel.getIdentifier(selectTable.getSelectedRows()[i]).toString();
    }
    return result;
  }

}
