/*
 * Copyright (c) 2011-2014 Christoph Mueller. All rights reserved.
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

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.StringTokenizer;
import java.util.Vector;

import de.must.applet.Constants;
import de.must.applet.TableAdministration;
import de.must.dataobj.DataObject;
import de.must.dataobj.Identifier;
import de.must.io.Logger;
import de.must.middle.ApplConstStd;

/**
 * Frame for administration of an entire entity in a single grid. Suitable for
 * entities with few columns and rows. Controls load and save actions.
 * Used for property administration of a multiple database records.
 * It is meant to contain several data components like e.g. DataTextField.
 * @author Christoph Mueller
 */
public abstract class DataTableAdministration extends MajorRemoteUserInterface {
  
  protected class RowIdAndValues {
    public Identifier id;
    public boolean toDelete;
    public Object[] values;
    public RowIdAndValues(Identifier id, int valueSize) {
      this.id = id;
      values = new Object[valueSize];
    }
  }

  public static final int BUILD_STATUS_EMPTY_TABLE_TO_BUILD = 0;
  public static final int BUILD_STATUS_UPDATE = 1;
  public static final int BUILD_STATUS_NEW_SELECT = 2;
  public static final int BUILD_STATUS_COMPLETE_BUILD_NECESSARY = 5;
  public static final int BUILD_STATUS_NOTHING_TO_DO = 9;

  public static final int getRows(int filledRows) {
    if (filledRows < 30) return 50;
    else return filledRows + 20;
  }
  
  protected DataObject aDO;
  private Vector<String> columnHeaders;
  private Vector<String> columnNames;
  private Hashtable<String, Class<?>> colClasses = new Hashtable<String, Class<?>>();
  protected Vector<MustButton> additionalButtons = new Vector<MustButton>();
  protected int buildStatus = BUILD_STATUS_EMPTY_TABLE_TO_BUILD;
  private int filledRows;
  protected boolean[] rendererSet;
  protected Hashtable<String, String> values = new Hashtable<String, String>();
  protected Vector<RowIdAndValues> changedRows = new Vector<RowIdAndValues>();
  protected String standardOrderByBegin = "position";
  private DateFormat dateFormat = new SimpleDateFormat(ApplConstStd.CAMELEON_TIMESTAMP_FORMAT);
  protected boolean veto = false;

  public DataTableAdministration(SessionData sessionData, final String tabIdAndLabel) {
    super(sessionData, new ContextInfo() {
      public String getTabLabel() { return tabIdAndLabel; }
      public String getTabId() { return tabIdAndLabel; }
      public String getConcerning() { return Constants.TABLE; }
    });
    this.aDO = getAssignedDataObject();
    columnHeaders = getColumnHeaders();
    columnNames = getColumnNames();
  }

  /**
   * Returns the assigned data object.
   * @return the assigned data object
   */
  protected abstract DataObject getAssignedDataObject();

  /**
   * Returns the names of the columns to be laid-out.
   * @return the names of the columns to be laid-out
   */
  protected abstract Vector<String> getColumnNames();

  /**
   * Returns the header of the columns to be laid-out.
   * @return the header of the columns to be laid-out
   */
  protected Vector<String> getColumnHeaders() {
    Vector<String> result = new Vector<String>();
    result.add(getTranslation("TEXT_DESCRIPTION"));
    result.add(getTranslation("TEXT_POS"));
    return result;
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
   * Sets the class for the specified column. Helpful especially if 
   * table is empty. Thus, we can assign an editor even if no value is
   * given, yet.
   * @param colName the name of the column
   * @param colClass the class of the column
   */
  public void setColumnClass(String colName, Class<?> colClass) {
    colClasses.put(colName, colClass);
  }

  /**
   * Sets the column's tool tip text.
   * @param column the name of the column
   * @param toolTipText the column's tool tip text
   */
  protected void setColumnToolTip(int column, String toolTipText) {
  }

  /**
   * Creates a button and adds it to the standard button panel.
   * @param label the label of the button
   * @param index the index where to place the button
   * @return the created button
   */
  protected InsertedButton addButton(String label, int index) {
    InsertedButton result = new InsertedButton(label, index);
    result.type = MustButton.TYPE_BOTTOM;
    additionalButtons.add(result);
    return result;
  }
  
  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    fetchChangedRows(request);
    for (MustButton additionalButton : additionalButtons) {
      if (additionalButton.getType() == MustButton.TYPE_BOTTOM) {
        additionalButton.fetchValuesFromRequest(request);
      }
    }
    super.fetchValuesFromRequest(request);
  }
  
  private void fetchChangedRows(GeneralizedRequest request) {
    changedRows.clear();
    for (int i = 0; i < getRows(filledRows); i++) {
      RowIdAndValues row = null;
      for (int j = 0; j < columnNames.size(); j++) {
        String fetchedValue = (String)request.getParameter(TableAdministration.getParamKey(i, j));
        String identifyString = null;
        Identifier identifier = null;
        String newValue = null;
        if (fetchedValue != null) {
          StringTokenizer tokenizer = new StringTokenizer(fetchedValue, ApplConstStd.MAIN_SEPARATOR, false);
          if (tokenizer.hasMoreTokens()) identifyString = tokenizer.nextToken();
          if (identifyString != null && !identifyString.equals("") && !identifyString.equals("0"))  {
            identifier = Identifier.parseString(identifyString);
          }
          if (row == null) {
            row = new RowIdAndValues(identifier, columnNames.size());
            changedRows.add(row);
          }
          if (tokenizer.hasMoreTokens()) {
            newValue = tokenizer.nextToken();
            if (Constants.ACTION_DELETE.equals(newValue)) {
              row.toDelete = true;
            } else if (Constants.NULL_VALUE.equals(newValue)) {
              row.values[j] = null;
            } else {
              Class<?> colClass = colClasses.get(columnNames.elementAt(j));
              if (java.util.Date.class.equals(colClass) || java.sql.Date.class.equals(colClass)) {
                try {
                  java.util.Date date = ((java.util.Date)dateFormat.parseObject(newValue));
                  java.sql.Date sqlDate = new java.sql.Date(date.getTime());
                  row.values[j] = sqlDate;
                } catch (ParseException e) {
                  Logger.getInstance().error(getClass(), e);
                }
              } else if (Timestamp.class.equals(colClass)) {
                try {
                  java.util.Date date = ((java.util.Date)dateFormat.parseObject(newValue));
                  Timestamp timestamp = new Timestamp(date.getTime());
                  row.values[j] = timestamp;
                } catch (ParseException e) {
                  Logger.getInstance().error(getClass(), e);
                }
              } else {
                row.values[j] = newValue;
              }
            }
          }
        }
      }
    }
  }
  
  private void save() {
    Iterator<RowIdAndValues> iterator = changedRows.iterator();
    while (iterator.hasNext()) {
      RowIdAndValues row = iterator.next();
      if (row.toDelete) {
        aDO.delete(row.id);
      } else {
        if (row.id != null) {
          aDO.load(row.id);
        } else {
          aDO.newRowWithNextIdentifierAllocation();
        }
        for (int i = 0; i < columnNames.size(); i++) {
          if (row.values[i] != null) {
            changeRowValue(columnNames.elementAt(i), row.values[i]);
          }
        }
        saveDataObject();
      }
    }
  }
  
  protected void saveDataObject() {
    aDO.save();
  }
  
  private void changeRowValue(String colName, Object newValue) {
    switch (aDO.getColumnType(colName)) {
    case 2:
      aDO.setDouble(colName, Double.valueOf(newValue.toString()).intValue());
      break;
    case 4:
      aDO.setInt(colName, Integer.valueOf(newValue.toString()).intValue());
      break;
    case 8: // Oracle number via ODBC
      aDO.setDouble(colName, Double.valueOf(newValue.toString()).intValue());
      break;
    case 91: // MySQL date
      setDate(colName, (java.util.Date)newValue);
      break;
    case 93:
      setDate(colName, (java.util.Date)newValue);
      break;
    default:
      aDO.setObject(colName, newValue);
      // de.must.io.Logger.getInstance().info(getClass(), data[i][j]);
      // de.must.io.Logger.getInstance().info(getClass(), oriData[i][j]);
    }
  }
  
  private void setDate(String colName, java.util.Date date) {
    if (date == null) {
      aDO.setDate(colName, null);
    } else {
      aDO.setDate(colName, new java.sql.Date(date.getTime()));
    }
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    if (veto) {
      out.sendVeto(messageToKeep);
    } else {
//    if (buildStatus == BUILD_STATUS_EMPTY_TABLE_TO_BUILD) {
      buildRemoteViewEmptyTable(out);
//      buildStatus = BUILD_STATUS_NOTHING_TO_DO;
//    } else if (Constants.ACTION_LIST.equals(sessionData.action)) {
      buildRemoteViewNewContent(out);
//      buildStatus = BUILD_STATUS_NOTHING_TO_DO;
//    }
      if (!buildDone) {
        for (MustButton additionalButton : additionalButtons) {
          if (additionalButton.getType() == MustButton.TYPE_BOTTOM) {
            additionalButton.buildRemoteView(out);
          }
        }
        // done elsewhere! buildDone = true;
      }
    }
  }

  private void buildRemoteViewEmptyTable(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TITLE_BEGIN + getTabLabel() + Constants.TITLE_END);
    out.sendConcerning(getConcerning());
    addTodo(Constants.CLEAR_LIST_COLUMNS, out);
    out.println(Constants.ACTION_END_TAG);
    Vector<String> colHeaders = getColumnHeaders();
    Iterator<String> iterator = colHeaders.iterator();
    Iterator<String> iterator2 = getColumnNames().iterator();
    while (iterator.hasNext()) {
      String colHeader = iterator.next();
      addColumn(colHeader, colClasses.get(iterator2.next()), out);
    }
    out.println(Constants.ACTION_BEGIN_TAG);
    out.sendConcerning(getConcerning());
    out.println(Constants.TODO_TAG_BEGIN + Constants.APPLY_LIST_COLUMNS + Constants.TODO_TAG_END);
    out.println(Constants.ACTION_END_TAG);
  }
  
  private void buildRemoteViewNewContent(ToAppletWriter out) {
    if (rendererSet == null) {
      rendererSet = new boolean[columnNames.size()];
    }
    int rows = aDO.getRowCount();
    String orderBy = standardOrderByBegin;
    if (columnNames.size() >= 0) {
      if (orderBy.length() > 0) orderBy += ", ";
      orderBy += columnNames.elementAt(0);
    }
    boolean success = aDO.select("*", getFilterCondition(), orderBy);
    if (success) {
      out.println(Constants.ACTION_BEGIN_TAG);
      out.println(Constants.TITLE_BEGIN + getTabLabel() + Constants.TITLE_END);
      out.sendConcerning(getConcerning());
      addTodo(Constants.CLEAR_LIST, out);
      out.println(Constants.VALUE_TAG_BEGIN + rows + Constants.VALUE_TAG_END);
      out.println(Constants.ACTION_END_TAG);
      while (aDO.nextRow()) {
        addTodoAction(Constants.NEW_ROW, aDO.getIdentifier(), out);
        Iterator<String> iterator = columnNames.iterator();
        int col = -1;
        while (iterator.hasNext()) {
          col++;
          Object obj = aDO.getObject(iterator.next());
          Class<?> rowClassToSet = null;
          if (obj != null && !String.class.equals(obj.getClass()) && !rendererSet[col]) {
            rowClassToSet = obj.getClass();
            rendererSet[col] = true;
          }
          addRowObjectAction(obj, rowClassToSet, out);
        }
        addTodoAction(Constants.APPLY_ROW, aDO.getIdentifier(), out);
      }
      aDO.closeQuery();
      addTodoAction(Constants.APPLY_LIST, out);
    } else {
      
    }
  }
  
  private void addTodoAction(String todo, ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.sendConcerning(getConcerning());
    out.println(Constants.TODO_TAG_BEGIN + todo + Constants.TODO_TAG_END);
    out.println(Constants.ACTION_END_TAG);
  }
  
  private void addTodoAction(String todo, Identifier id, ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.sendConcerning(getConcerning());
    out.println(Constants.TODO_TAG_BEGIN + todo + Constants.TODO_TAG_END);
    out.println(Constants.ID_TAG_BEGIN + id + Constants.ID_TAG_END);
    out.println(Constants.ACTION_END_TAG);
  }
  
  private void addTodo(String todo, ToAppletWriter out) {
    out.println(Constants.TODO_TAG_BEGIN + todo + Constants.TODO_TAG_END);
  }
  
  private void addColumn(String column, Class<?> colClass, ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.sendConcerning(getConcerning());
    out.println(Constants.TODO_TAG_BEGIN + Constants.ADD_LIST_COLUMN + Constants.TODO_TAG_END);
    out.println(Constants.VALUE_TAG_BEGIN + column + Constants.VALUE_TAG_END);
    if (colClass != null) {
      out.println(Constants.VARIANT2_TAG_BEGIN + colClass.getName() + Constants.VARIANT2_TAG_END);
    }
    out.println(Constants.ACTION_END_TAG);
  }

  private void addRowObjectAction(Object rowObject, Class<?> colClassToSet, ToAppletWriter out) {
    String stringRepresentation = null;
    if (rowObject != null) {
      if (rowObject instanceof java.util.Date || rowObject instanceof java.sql.Date || rowObject instanceof Timestamp) {
        stringRepresentation = dateFormat.format(rowObject);
      } else {
        stringRepresentation = rowObject.toString();
      }
    }
    else stringRepresentation = "";
    out.println(Constants.ACTION_BEGIN_TAG);
    out.sendConcerning(getConcerning());
    out.println(Constants.TODO_TAG_BEGIN + Constants.ADD_ROW_OBJECT + Constants.TODO_TAG_END);
    out.println(Constants.VALUE_TAG_BEGIN + stringRepresentation + Constants.VALUE_TAG_END);
    if (colClassToSet != null) {
      out.println(Constants.VARIANT2_TAG_BEGIN + colClassToSet.getName() + Constants.VARIANT2_TAG_END);
    }
    out.println(Constants.ACTION_END_TAG);
  }
  
  /**
   * Loads an entity specified by a primary key integer value.
   * @param identifyValue the primary key integer value.
   */
  public void loadValues() {
  }
  
  protected String getFilterCondition() {
    return null;
  }

  @Override
  public void process(GeneralizedRequest request) {
    if (Constants.ACTION_OK.equals(sessionData.action)) {
      buttonOkEvent();
    } else if (Constants.ACTION_CANCEL.equals(sessionData.action)) {
      sessionData.removeDataTableAdministration(this);
    } else for (MustButton additionalButton : additionalButtons) {
      if (additionalButton.getActionID().equals(sessionData.action)) {
        additionalButton.performAction();
      }
    }
  }

  /**
   * Executed when delete button is pressed.
   */
  protected void buttonDelEvent() {
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
  protected void buttonOkEvent() {
    if (apply()) {
      sessionData.removeDataTableAdministration(this);
      closeInstance();
    }
  }
  
  protected boolean apply() {
    if (isInputAccepted()) {
      save();
    } else {
      veto = true;
      return false;
    }
    veto = false;
    // de.must.io.Logger.getInstance().info(getClass(), mainTableModel.getLastModifiedRow());
//    mainTableModel.saveValues();
    aDO.commitIfNotAutoCommit();
    return true;
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
   * Selects the specified row.
   * @param row the row to be selected
   */
  protected void select(int row) {
//    table.setRowSelectionInterval(row, row);
//    table.ensureIndexIsVisible(row);
  }

  /**
   * Returns true if it is allowed to cancel the dialog.
   * @return true if it is allowed to cancel the dialog
   */
  public boolean isCancelAllowed() {
    if (!isVisible()) return true;
    if (changedRows.size() > 0) return false;
    return true;
  }

  @Override
  public boolean isClosingAllowed() {
    return isCancelAllowed();
  }

  /**
   * Closes the frame and destroys it.
   */
  public void closeInstance() {
//    super.closeInstance();
    destroy();
  }

}

