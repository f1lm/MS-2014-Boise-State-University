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

import de.must.applet.AppletGlobal.Veto;
import de.must.dataobj.Identifier;
import de.must.io.Logger;
import de.must.middle.ApplConstStd;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.DateCellEditor;
import de.must.wuic.DefaultDateCellRenderer;
import de.must.wuic.DefaultNumberCellRenderer;
import de.must.wuic.DefaultPriceCellRenderer;
import de.must.wuic.DiSaveCancelReturnD;
import de.must.wuic.IdentifyTableModel;
import de.must.wuic.MustButton;
import de.must.wuic.MustStatusLabel;
import de.must.wuic.MustTable;
import de.must.wuic.StandardDialog;
import de.must.wuic.WholeNumberField;

import javax.swing.*;
import javax.swing.table.*;

import java.awt.*;
import java.awt.event.*;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Hashtable;
import java.util.Vector;

/**
 * Frame for administration of an entire entity in a single grid. Suitable for
 * entities with few columns and rows. Controls load and save actions.
 * Used for property administration of a multiple database records.
 * It is meant to contain several data components like e.g. DataTextField.
 * @author Christoph Mueller
 */
public class TableAdministration extends AppletGUIs implements ActionListener, ParamExtender, ServerCaller {

  public static final String getParamKey(int row, int col) {
    return "Cell" + Constants.ELEMENT_DELIMITER + row + Constants.ELEMENT_DELIMITER + col;
  }
  
  private int estimatedMaxCols = 100;
  protected int emptyRows = 20;
  protected IdentifyTableModel tableModel;
  private RemAttributeList currentAttributeList;
  /** Reminder of components to be found by their ID for further actions like value settings */
  private Hashtable<String, Identified> idComp = new Hashtable<String, Identified>();
  protected MustTable table;
  protected JPanel panelButtons = new JPanel();
  private MustButton buttonDel = new MustButton(getTranslation("TEXT_REMOVE"), "BtnDel", this);
  private MustButton buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), Constants.ACTION_OK, this);
  private MustButton buttonCancel = new MustButton(getTranslation("TEXT_CANCEL_BUTTON"), Constants.ACTION_CANCEL, this);
  protected Vector<MustButton> additionalButtons = new Vector<MustButton>();
  private Vector<String> columnNameVector = new Vector<String>();
  private String[] columnNames;
  private Class<?>[] columnClasses;
  protected Object[] fieldInis;  // initialize-values
  protected Object[][] data;
  protected Identifier[] identifier;
  protected int rowIndex;
  protected int columnIndex;
  private DateFormat dateFormat = new SimpleDateFormat(ApplConstStd.CAMELEON_TIMESTAMP_FORMAT);
  protected Veto veto;

  public TableAdministration(String title, MustStatusLabel messageReceiver) {
    super(title, messageReceiver);
    setLayout(new BorderLayout());
    buttonOk.setPreferredWidth(70);
    table = new MustTable();
    JScrollPane scrollPane = new JScrollPane(table);
    add(scrollPane, BorderLayout.CENTER);
    buttonDel.setSelectDependence(table, true);
    setUpIntegerEditor(table);
    setColumnToolTip(1, getTranslation("TEXT_EXCEPTIONAL_SORTING"));
    panelButtons.add(buttonDel);
    panelButtons.add(buttonOk);
    panelButtons.add(buttonCancel);
    add(panelButtons, BorderLayout.SOUTH);
    // packIfNotLaidOut();
    // ShortCutStd.addInterpreter(this);
    generalActionEnding();
  }

  public boolean perform(Action action) {
    if (Constants.ADD_PANEL.equals(action.toDo)) {
      currentAttributeList = new RemAttributeList(action.id, idComp, this);
      add(currentAttributeList, BorderLayout.NORTH);
    } else if (Constants.CREATE_BOTTOM_BUTTON.equals(action.toDo)) {
      int index = -1;
      try {
        index = action.getValueAsInt();
      } catch (NumberFormatException e) {} // ignore
      MustButton button = createButton(action.label, action.variant2, action.id, this);
      additionalButtons.add(button);
      panelButtons.add(button, index);
    } else if (Constants.CLEAR_LIST_COLUMNS.equals(action.toDo)) {
      columnNameVector.clear();
    } else if (Constants.ADD_LIST_COLUMN.equals(action.toDo)) {
      columnNameVector.add(action.value);
      if (action.variant2 != null) {
        if (columnClasses == null) {
          columnClasses = new Class<?>[estimatedMaxCols];
        }
        try {
          Class<?> colClass = Class.forName(action.variant2);
          columnClasses[columnNameVector.size()-1] = colClass;
        } catch (ClassNotFoundException e) {
          Logger.getInstance().error(getClass(), e);
        }
      }
    } else if (Constants.APPLY_LIST_COLUMNS.equals(action.toDo)) {
      columnNames = new String[columnNameVector.size()];
      columnNames = columnNameVector.toArray(columnNames);
      if (fieldInis == null) {
        fieldInis = new Object[columnNames.length];
        for (int i = 0; i < fieldInis.length; i++) {
          fieldInis[i] = "";
        }
      }
    } else if (Constants.CLEAR_LIST.equals(action.toDo)) {
      rowIndex = -1;
      columnIndex = -1;
      identifier = new Identifier[getRows(action)];
      data = new Object[getRows(action)][columnNames.length];
    } else if (Constants.NEW_ROW.equals(action.toDo)) {
      rowIndex++;
      columnIndex = -1;
      identifier[rowIndex] = Identifier.parseString(action.id);
    } else if (Constants.ADD_ROW_OBJECT.equals(action.toDo)) {
      columnIndex++;
      if (action.variant2 != null) {
        if (columnClasses == null) {
          columnClasses = new Class<?>[columnNames.length];
        }
        try {
          Class<?> colClass = Class.forName(action.variant2);
          columnClasses[columnIndex] = colClass;
        } catch (ClassNotFoundException e) {
          Logger.getInstance().error(getClass(), e);
        }
      }
      if (action.value != null) {
        if (columnClasses != null && Integer.class == columnClasses[columnIndex]) {
          data[rowIndex][columnIndex] = new Integer(Integer.parseInt(action.value));
        } else if (columnClasses != null && (java.util.Date.class.equals(columnClasses[columnIndex]) || java.sql.Date.class.equals(columnClasses[columnIndex]) || Timestamp.class.equals(columnClasses[columnIndex]))) {
          if (action.value.length() > 0) try {
            data[rowIndex][columnIndex] = dateFormat.parse(action.value);
          } catch (ParseException e) {
            Logger.getInstance().error(getClass(), e);
          }
        } else {
          data[rowIndex][columnIndex] = action.value;
        }
      }
    } else if (Constants.APPLY_ROW.equals(action.toDo)) {
    } else if (Constants.APPLY_LIST.equals(action.toDo)) {
      if (columnClasses != null) for (int j = 0; j < columnNames.length; j++) {
        Class<?> colClass = columnClasses[j];
        if (java.util.Date.class.equals(colClass) || java.sql.Date.class.equals(colClass) || Timestamp.class.equals(colClass)) {
          fieldInis[j] = null;
        } else if (Integer.class.equals(colClass)) {
          fieldInis[j] = new Integer(0);
        } else if (Double.class.equals(colClass)) {
          fieldInis[j] = new Double(0);
        }
      }
      for (int i = rowIndex + 1; i < identifier.length; i++) {
        identifier[i] = new Identifier(Identifier.REPRESENTATIVE_FOR_NOTHING);
        for (int j = 0; j < columnNames.length; j++) {
          data[i][j] = fieldInis[j];
        }
      }
      tableModel = new IdentifyTableModel(columnNames, identifier, data, AppletGlobal.getInstance());
      table.setModel(tableModel);
      if (columnClasses != null) for (int j = 0; j < columnClasses.length; j++) {
        Class<?> colClass = columnClasses[j];
        if (java.util.Date.class.equals(colClass) || java.sql.Date.class.equals(colClass) || Timestamp.class.equals(colClass)) {
          table.getColumnModel().getColumn(j).setCellRenderer(new DefaultDateCellRenderer(DefaultDateCellRenderer.FORMAT_LONG));
          table.getColumnModel().getColumn(j).setCellEditor(new DateCellEditor());
        } else if (Integer.class.equals(colClass)) {
          table.getColumnModel().getColumn(j).setCellRenderer(new DefaultNumberCellRenderer());
        } else if (Double.class.equals(colClass)) {
          table.getColumnModel().getColumn(j).setCellRenderer(new DefaultPriceCellRenderer());
        }
      }
      table.setRowSorter(new TableRowSorter<TableModel>(tableModel));
      // tableModel.setRowSorter(table);
    } else if (currentAttributeList != null && currentAttributeList.perform(action)) {
      // done by delegation
    }
    return true;
  }
  
  public MustButton createButton(String label, String tooltiptext, String actionCommand, ActionListener l) {
    return new MustButton(label, tooltiptext, actionCommand, l);
  }

//  private void debugColumnClasses(String context) {
//    Logger.getInstance().info("Current Columnclasses context " + context);
//    for (int i = 0; i < columnClasses.length; i++) {
//      if (columnClasses[i] != null) {
//        Logger.getInstance().info(i + ": " + columnClasses[i].getName());
//      }
//    }
//  }
  
  private int getRows(Action action) {
    int rows = action.getValueAsInt();
    int rowSize = rows + emptyRows;
    if (rowSize < 50) rowSize = 50;
    return rowSize;
  }

  /**
   * @see de.must.wuic.MustFrame#reInitialize()
   */
  protected void reInitialize() {
    // mainTableModel.loadValues();
//    super.reInitialize();
  }

  /**
   * Creates a new administration grid based on the specified table model.
   * Available for individual needs - standard is just defining getColumnNames()
   * and getColumnLabels().
   * @param newTableModel the data table model to be used for the grid
   * @return the created table
   */
  protected MustTable createTable(IdentifyTableModel newTableModel) {
    // table.setPreferredScrollableViewportSize(new Dimension(500, 70));
    table = new MustTable(newTableModel);
    JScrollPane scrollPane = new JScrollPane(table);
    add(scrollPane, BorderLayout.CENTER);
    buttonDel.setSelectDependence(table, true);
    setUpIntegerEditor(table);
    return table;
  }

  private void setUpIntegerEditor(JTable table) { // out of tutorial!
    //Set up the editor for the integer cells.
    final WholeNumberField integerField = new WholeNumberField(0, 5);
    integerField.setHorizontalAlignment(WholeNumberField.RIGHT);

    DefaultCellEditor integerEditor = new DefaultCellEditor(integerField) {
      //Override DefaultCellEditor's getCellEditorValue method
      //to return an Integer, not a String:
      public Object getCellEditorValue() {
        return new Integer(integerField.getValue());
      }
    };

    table.setDefaultEditor(Integer.class, integerEditor);
  }

  /**
   * Sets the column's tool tip text.
   * @param column the name of the column
   * @param toolTipText the column's tool tip text
   */
   protected void setColumnToolTip(int column, String toolTipText) {
//    TableCellRenderer headerRenderer = table.getColumnModel().getColumn(column).getHeaderRenderer();
//    if (headerRenderer instanceof DefaultTableCellRenderer) {
//      ((DefaultTableCellRenderer)headerRenderer).setToolTipText(toolTipText);
//    }
  }
  /**
   * Controls action events like button pressed.
   * @param e the action event to be interpreted
   */
  public void actionPerformed(ActionEvent e) {
    generalActionBeginnung();
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnDel")) {
      buttonDelEvent();
    } else if (actCommand.equals(Constants.ACTION_OK)) {
      if (buttonOkEvent()) {
        AppletGlobal.getInstance().remove(this);
      } else {
        messageReceiver.setText(veto.message);
      }
    } else if (actCommand.equals(Constants.ACTION_CANCEL)) {
      if (isCancelAllowed()) {
        if (contactServer(Constants.ACTION_CANCEL)) {
          AppletGlobal.getInstance().remove(this);
        }
      }
    } else {
      for (MustButton additionalButton : additionalButtons) {
        if (actCommand.equals(additionalButton.getActionCommand())) {
          stopCellEditing();
          contactServer(additionalButton.getActionCommand());
        }
      }
    }
    generalActionEnding();
  }

  /**
   * Initializes things before an action begins like resetting the status label.
   */
  protected void generalActionBeginnung() {
    messageReceiver.stopAnimation();
    messageReceiver.resetDefault();
  }

  /**
   * Concludes things after an action ended like resetting the status label to
   * its default value.
   */
  protected void generalActionEnding() {
  }

  /**
   * Loads an entity specified by a primary key integer value.
   * @param identifyValue the primary key integer value.
   */
  public void loadValues() {
//    mainTableModel.loadValues();
  }

  /**
   * Executed when delete button is pressed.
   */
  protected void buttonDelEvent() {
    int[] selectedRows = table.getSelectedRows();
    for (int i = 0; i < selectedRows.length; i++) {
      if (tableModel.getIdentifier(selectedRows[i]) != null) {
//        if (isInUse(mainTableModel.getIdentifier(selectedRows[i]))) {
//          statusLabel.setRemainStatus("Schlüssel wird benutzt und kann nicht gelöscht werden!");
//        }
//        else {
          tableModel.markForDeletion(selectedRows[i]);
//        }
      }
    }
  }

  protected boolean buttonOkEvent() {
    stopCellEditing();
//    if (!mainTableModel.isInputAccepted(this)) {
//      statusLabel.setRemainStatus(getTranslation("TEXT_INPUT_FORMALLY_INVALID") + ".");
//      return;
//    }
    // de.must.io.Logger.getInstance().info(getClass(), mainTableModel.getLastModifiedRow());
//    mainTableModel.saveValues();
    return contactServer(Constants.ACTION_OK);
  }

  /**
   * Selects the specified row.
   * @param row the row to be selected
   */
  public void select(int row) {
    table.setRowSelectionInterval(row, row);
    table.ensureIndexIsVisible(row);
  }

  /**
   * Returns true if it is allowed to cancel the dialog.
   * @return true if it is allowed to cancel the dialog
   */
  public boolean isCancelAllowed() {
    stopCellEditing();
    if (!isVisible()) return true;
    if (!tableModel.isModified()) return true;
    switch (StandardDialog.saveCancelReturnDecision(null)) {
    case DiSaveCancelReturnD.DECISION_SAVE:
      if (buttonOkEvent()) {
        AppletGlobal.getInstance().remove(this);
        return true;
      } else {
        return false;
      }
    case DiSaveCancelReturnD.DECISION_CANCEL:
      return true;
    case DiSaveCancelReturnD.DECISION_RETURN:
      requestFocus();
      return false;
    }
    return true;
  }

  protected void stopCellEditing() {
    CellEditor cellEditor;
    cellEditor = table.getCellEditor();
    if (cellEditor != null) cellEditor.stopCellEditing(); // otherwise the modifications of the last cell is not notified!
  }

  /**
   * Returns true if it is allowed to close the dialog.
   * @return true if it is allowed to close the dialog
   */
  public boolean isClosingAllowed() {
    return isCancelAllowed();
  }

  protected boolean contactServer(String action) {
    return contactServer(action, getSynchParams());
  }

  protected boolean contactServer(String action, Vector<KeyValuePairAlpha> params) {
    params.add(new KeyValuePairAlpha(Constants.ACTION, action));
    return contactServer(params);
  }
  
  @Override
  public boolean contactServer(Vector<KeyValuePairAlpha> params) {
    params.add(new KeyValuePairAlpha(Constants.TAB_OR_WINDOW_ID, title));
    params.add(new KeyValuePairAlpha(Constants.TAB_ELEMENT, Constants.TABLE));
    extendParams(params);
    try {
      veto = AppletGlobal.getInstance().contactServer(params);
      return veto == null;
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
      return false;
    }
  }

  @Override
  public void extendParams(Vector<KeyValuePairAlpha> params) {
    stopCellEditing();
    if (currentAttributeList != null) currentAttributeList.extendParams(params);
    for (int i = 0; i < tableModel.getRowCount(); i++) {
      if (tableModel.isRowModified(i)) {
        for (int j = 0; j < tableModel.getColumnCount(); j++) {
          Identifier id = tableModel.getIdentifier(i);
          if (tableModel.isToDelete(i)) {
            params.add(new KeyValuePairAlpha(getParamKey(i, j), id.toString() + ApplConstStd.MAIN_SEPARATOR + Constants.ACTION_DELETE));
          } else {
            Object value = tableModel.getValueAt(i, j);
            String stringValue = null;
            if (value != null) {
              if (value instanceof Date) {
                stringValue = dateFormat.format((Date)value);
              } else if (value instanceof java.sql.Date) {
                stringValue = dateFormat.format((java.sql.Date)value);
              } else if (value instanceof Timestamp) {
                stringValue = dateFormat.format((Timestamp)value);
              } else {
                stringValue = String.valueOf(value);
              }
            } else {
              stringValue = Constants.NULL_VALUE;
            }
            params.add(new KeyValuePairAlpha(getParamKey(i, j), id.toString() + ApplConstStd.MAIN_SEPARATOR + stringValue));
          }
        }
      }
    }
  }

  protected Vector<KeyValuePairAlpha> getSynchParams() {
    Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
//    Enumeration<RemoteGUIComponent> valueContainers = rgcs.elements();
//    while (valueContainers.hasMoreElements()) {
//      RemoteGUIComponent valueContainer = valueContainers.nextElement();
//      valueContainer.extendParams(params);
//    }
    return params;
  }

  @Override
  public String getId() {
    return null;
  }

}

