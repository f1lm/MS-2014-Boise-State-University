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
import javax.swing.*;
import javax.swing.table.*;

import java.awt.*;
import java.awt.event.*;

/**
 * Frame for administration of an entire entity in a single grid. Suitable for
 * entities with few columns and rows. Controls load and save actions.
 * Used for property administration of a multiple database records.
 * It is meant to contain several data components like e.g. DataTextField.
 * @author Christoph Mueller
 */
public abstract class DataTableAdministration extends TableAdministration {

  protected DataObject assignedDataObject;
  protected DataTableModel mainTableModel;
  private boolean inputCheckProcess;
  private String lastMessage;

  public DataTableAdministration() {
    this(null);
  }

  /**
   * Constructs a new data table administration.
   * @param parentFrame the frame's parent frame
   */
  public DataTableAdministration(Frame parentFrame) {
    super();
    this.assignedDataObject = getAssignedDataObject();
    isLaidOut = WinContr.getInstance().layout(this);
    if (!isLaidOut) {
      setSize(new Dimension(400, 300));
      setLocation(200, 100);
    }
    getContentPane().setLayout(new BorderLayout());
    buttonOk.setPreferredWidth(70);
    createTable(
      getColumnNames(),
      getColumnLabels()
    );
    setPreferedColumnSize(getPreferedColumnSize());
    if (getColumnNames().length > 1) {
      setColumnToolTip(1, getTranslation("TEXT_EXCEPTIONAL_SORTING"));
    }
    creationEnding();
  }

  private void creationEnding() {
    panelButtons.add(buttonDel);
    panelButtons.add(buttonOk);
    panelButtons.add(buttonCancel);
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(panelButtons, BorderLayout.NORTH);
    panelBottom.add(statusLabel, BorderLayout.SOUTH);
    getContentPane().add(panelBottom, BorderLayout.SOUTH);
    // packIfNotLaidOut();
    mainTableModel.loadValues(getFilterCondition());
    ShortCutStd.addInterpreter(this);
    generalActionEnding();
  }

  /**
   * @see de.must.wuic.MustFrame#reInitialize()
   */
  protected void reInitialize() {
    mainTableModel.loadValues(getFilterCondition());
    super.reInitialize();
  }

  /**
   * Returns the assigned data object for loading and saving.
   * @return the assigned data object
   */
  protected abstract DataObject getAssignedDataObject();

  /**
   * Returns the names of the columns to be laid-out.
   * @return the names of the columns to be laid-out
   */
  protected abstract String[] getColumnNames();
  // protected abstract String[] getColumnLabels();

  /**
   * Returns the labels of the columns to be laid-out.
   * @return the labels of the columns to be laid-out
   */
  protected String[] getColumnLabels() {
    return new String[] {getTranslation("TEXT_DESCRIPTION"), getTranslation("TEXT_POS")};
  }

  /**
   * Returns the preferred column sizes. To be overridden to layout columns
   * differing from standard.
   * @return the preferred column sizes
   */
  protected int[] getPreferedColumnSize() {
    return new int[] {0, 75};
  }

  /**
   * Packs the frame if it isn't already laid-out by user.
   */
  protected void packIfNotLaidOut() {
    if (!isLaidOut()) pack();
  }

  private MustTable createTable(String[] columns, String[] headers) {
    mainTableModel = new DataTableModel(
      getLocale(),
      assignedDataObject, columns, headers
    );
    table = new MustTable(mainTableModel);
    table.setRowSorter(new TableRowSorter<TableModel>(mainTableModel));
    JScrollPane scrollPane = new JScrollPane(table);
    getContentPane().add(scrollPane, BorderLayout.CENTER);
    buttonDel.setSelectDependence(table, true);
    setUpIntegerEditor(table);
    return table;
  }

  /**
   * Creates a new administration grid based on the specified table model.
   * Available for individual needs - standard is just defining getColumnNames()
   * and getColumnLabels().
   * @param newDataTableModel the data table model to be used for the grid
   * @return the created table
   */
  protected MustTable createTable(DataTableModel newDataTableModel) {
    // table.setPreferredScrollableViewportSize(new Dimension(500, 70));
    table = new MustTable(newDataTableModel);
    JScrollPane scrollPane = new JScrollPane(table);
    getContentPane().add(scrollPane, BorderLayout.CENTER);
    buttonDel.setSelectDependence(table, true);
    setUpIntegerEditor(table);
    return table;
  }

  private void setPreferedColumnSize(int[] cs) {
    TableColumn column = null;
    for (int i = 0; i < cs.length; i++) {
      column = table.getColumnModel().getColumn(i);
      if (cs[i] != 0) {
         column.setMaxWidth(cs[i]);
         column.setPreferredWidth(cs[i]);
      }
    }
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
    TableCellRenderer headerRenderer = table.getColumnModel().getColumn(column).getHeaderRenderer();
    if (headerRenderer != null) {
      if (headerRenderer instanceof DefaultTableCellRenderer) {
        ((DefaultTableCellRenderer)headerRenderer).setToolTipText(toolTipText);
      }
    } else {
      // looks different:
//      DefaultTableCellHeaderRenderer renderer = new DefaultTableCellHeaderRenderer();
//      renderer.setToolTipText(toolTipText);
//      table.getColumnModel().getColumn(column).setHeaderRenderer(renderer);
    }
  }

   /**
   * Controls action events like button pressed.
   * @param e the action event to be interpreted
   */
  public void actionPerformed(ActionEvent e) {
    generalActionBeginnung();
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnDel")) {
      ButtonDelEvent();
    }
    if (actCommand.equals("BtnOk")) {
      ButtonOkEvent();
    }
    if (actCommand.equals("BtnCancel")) {
      if (isCancelAllowed()) {
        assignedDataObject.rollbackIfNotAutoCommit();
        closeInstance();
      }
     }
    generalActionEnding();
  }

  /**
   * Initializes things before an action begins like resetting the status label.
   */
  protected void generalActionBeginnung() {
    statusLabel.stopAnimation();
    statusLabel.reset();
  }

  /**
   * Concludes things after an action ended like resetting the status label to
   * its default value.
   */
  protected void generalActionEnding() {
    statusLabel.resetDefault();
  }

  /**
   * Loads an entity specified by a primary key integer value.
   * @param identifyValue the primary key integer value.
   */
  public void loadValues() {
    mainTableModel.loadValues(getFilterCondition());
  }
  
  protected String getFilterCondition() {
    return null;
  }

  /**
   * Executed when delete button is pressed.
   */
  protected void ButtonDelEvent() {
    inputCheckProcess = true;
    boolean anyVeto = false;
    for (int selectedRow : table.getSelectedRows()) {
      if (mainTableModel.getIdentifier(selectedRow) != null) {
        if (isInUse(mainTableModel.getIdentifier(selectedRow))) {
          anyVeto = true;
          setMessageToKeep(getTranslation("TEXT_ENTRY_MUST_NOT_BE_DELETED") + " " + getTranslation("TEXT_BECAUSE_IT_IS_IN_USE"));
          break;
        }
        else {
          mainTableModel.markForDeletion(selectedRow);
        }
      }
    }
    if (!anyVeto) lastMessage = null;
    inputCheckProcess = false;
  }

  /**
   * Returns true if the entry as specified by the identifier is in use.
   * @param keyIdentifier the identifier of the entry to be checked
   * @return true if the entry is in use
   */
  protected abstract boolean isInUse(Identifier identifier);

  /**
   * Executed when OK button is pressed.
   */
  protected void ButtonOkEvent() {
    apply();
    closeInstance();
  }
  
  protected void setMessageToKeep(String messageToKeep) {
    if (inputCheckProcess && messageToKeep.equals(lastMessage)) popupMessage(messageToKeep); // maybe user's eye didn't recognize message at status label 
    else statusLabel.setRemainStatus(messageToKeep);
    lastMessage = messageToKeep;
  }
  /**
   * Save values as edited without closing.
   */
  protected void apply() {
    inputCheckProcess = true;
    stopCellEditing();
    if (!mainTableModel.isInputAccepted(this)) {
      setMessageToKeep(getTranslation("TEXT_INPUT_FORMALLY_INVALID") + ".");
      inputCheckProcess = false;
      return;
    }
    boolean result = isInputAccepted();
    if (result) {
      mainTableModel.saveValues();
      assignedDataObject.commitIfNotAutoCommit();
      lastMessage = null;
    }
    inputCheckProcess = false;
  }

  /**
   * Returns true if user input is accepted. Override this method to implement
   * individual input checks.
   * @return true if user input is accepted
   */
  protected boolean isInputAccepted() {
    return true;
  }

  /**
   * Returns true if it is allowed to cancel the dialog.
   * @return true if it is allowed to cancel the dialog
   */
  public boolean isCancelAllowed() {
    stopCellEditing();
    if (!isVisible()) return true;
    if (!mainTableModel.isModified()) return true;
    switch (StandardDialog.saveCancelReturnDecision(this)) {
    case DiSaveCancelReturnD.DECISION_SAVE:
      ButtonOkEvent();
      return true;
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
    // Java 1.4.0 buggy!
    /* for (int i = 0; i < table.getRowCount(); i++) {
      for (int j = 0; j < table.getColumnCount(); j++) {
        cellEditor = table.getCellEditor(i, j);
        if (cellEditor != null) cellEditor.stopCellEditing();
      }
    } */
  }

  @Override
  public boolean isClosingAllowed(int closeConfirmId) {
    return isCancelAllowed();
  }

  /**
   * Closes the frame and destroys it.
   */
  public void closeInstance() {
    super.closeInstance();
    destroy();
  }

}

