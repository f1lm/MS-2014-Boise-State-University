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
import de.must.io.Logger;
import de.must.middle.EntitlementStd;
import de.must.util.KeyValuePair;
import de.must.util.KeyValuePairNum;

import javax.swing.*;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import javax.swing.text.JTextComponent;

import java.awt.*;
import java.awt.event.*;
import java.util.*;

/**
 * A frame to edit data to insert, modify or copy single table rows. Layouts
 * data components with labels attribute lists.
 * @see DataComponent
 * @see AttributeList
 * @author Christoph Mueller
 */
 public abstract class DataPropertyAdministration extends PropertyAdministration {

  private static final boolean verbose = false;

  public static final int MODE_VIRGIN = 0;
  public static final int MODE_NEW = 1;
  public static final int MODE_PROPERTY = 2;
  public static final int MODE_COPY = 3;
  private int administrationMode = MODE_VIRGIN;

  public static final int FIELD_CREATION_MODE_NONE = 0;
  public static final int FIELD_CREATION_MODE_VIEW = 1;
  public static final int FIELD_CREATION_MODE_EDIT = 2;

  public static final int NEW_LINE = 0;
  public static final int STAY_IN_LINE = 1;
  
  private boolean editable = true;
  private boolean returnToFirstPage = false;
  private int numberOfDataObjects = 0;
  protected DataObject[] dataObjects;
  protected DataObject mainDataObject;
  protected DataObject duplicateCheckDataObject;
  protected DataObject currentDataObject;
  private Vector<Identifier> identifiers;
  private DataComponent niDataComponent;
  private MustTextField uniqueStringIdentifyDataComponent;
  private DataComponent[] dataComponent;
  protected Vector<DataMultChoice> multChoices = new Vector<DataMultChoice>(1);
  private Vector<DataList> subLists = new Vector<DataList>(1);
  protected DataList currentSelectionList;
  protected MustButton btnSubOk;
  protected MustButton btnSubDel; 
  protected MustButton btnSubNew; 
  private int[] componentTab;
  private String frameTitleNew = getTranslation("TEXT_NEW_ENTRY");
  private DataTextComponent[] frameUpdateTitleFields;
  private DataTextField preferredFocusField;
  protected int countDataComponent = -1;
  private Identifier lastRevisionIdentifier = null;
  // private ComponentModificationListener[] ModificationWatchedComponents;
  // private int countModificationWatchedComponents = -1;
  protected Vector<DataChangeListener> ownedDataChangeListeners = new Vector<DataChangeListener>();
  protected int recordingAmount;
  protected EvaluationOverflow evaluationOverflow;
  private Identifier recoveredIdentifier;
  private JScrollPane dynamicScrollPane;
  private int lastConfirmedId;
  private boolean inputCheckProcess;
  private String lastMessage;

  public DataPropertyAdministration() {
    this(200);
  }

  /**
   * Constructs a new data property administration frame.
   * @param sizeFactor the number of data components approximately needed
   * - used to build a create a data component array
   */
  public DataPropertyAdministration(int sizeFactor) {
    super(null);
    dataObjects = new DataObject[5];
    dataComponent = new DataComponent[sizeFactor];
    componentTab = new int[sizeFactor];
  }
  
  /* (non-Javadoc)
   * @see de.must.wuic.PropertyAdministration#creationEnding()
   */
  protected void creationEnding() {
    super.creationEnding();
    if (GlobalInWuicStd.entitlement != null) {
      setEditable(GlobalInWuicStd.entitlement.isEditable(getTerritory()));
    }
  }

  /**
   * Returns the territory of this function. Override this method if it differs from standard territory.
   * @return the territory of this function
   */
  protected String getTerritory() {
    return EntitlementStd.TERRITORY_STANDARD;
  }
  
  /**
   * Sets the flag that first page (tabulator) is to be activated each time user
   * start editing again
   * @param returnToFirstPage whether or not first page (tabulator) is to be 
   * activated each time user start editing again
   */
  public void setReturnToFirstPage(boolean returnToFirstPage) {
    this.returnToFirstPage = returnToFirstPage;
  }

  /**
   * Sets the main data object which is the only one in many cases.
   * @param newMainDataObject the data object that is to be used mainly
   */
  protected void setMainDataObject(DataObject newMainDataObject) {
    mainDataObject = newMainDataObject;
    dataObjects[0] = newMainDataObject;
    currentDataObject = newMainDataObject;
    currentDataObject.newRow(); // to get MetaData
  }

  /**
   * Adds a data object to the available data objects and sets the pointer to
   * the new data object. Following createXy methods will use this data object.
   * @param newDataObject the new data object
   */
  protected void setNextDataObject(DataObject newDataObject) {
    dataObjects[++numberOfDataObjects] = newDataObject;
    currentDataObject = newDataObject;
    currentDataObject.newRow();
  }

  /**
   * Sets the data object for automatic duplicates check.
   * @param newDuplicateCheckDataObject the data object for duplicates check
   */
  protected void setDuplicateCheckDataObject(DataObject newDuplicateCheckDataObject) {
    duplicateCheckDataObject = newDuplicateCheckDataObject;
  }

  /**
   * Creates a new panel and adds it to the tabbed pane with a list for row sub-selection.
   * @param tabLabel the label of the new tab
   * @param selectionList the list to select the row membership for the
   * following data components
   * @param lines the number of needed lines
   */
  protected void newPanel(String tabLabel, final DataList selectionList) {
    currentSelectionList = selectionList;
    tabCount++;
    if (tabCount == 0) {
      mustTabbedPane = new MustTabbedPane();
      tabAttributeList = new Vector<AttributeList>();
      getContentPane().add(mustTabbedPane, BorderLayout.CENTER);
    }
    dataComponent[++countDataComponent] = selectionList;
    subLists.add(selectionList);
    selectionList.setDataComponents(dataComponent);
    JSplitPane jSplitPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT);
    jSplitPane.add(new JScrollPane(selectionList), 0);
    currentAttributeList = new AttributeList();
    jSplitPane.add(new JScrollPane(currentAttributeList), 1);
    mustTabbedPane.addTab(tabLabel, jSplitPane);
    jSplitPane.setDividerLocation(70);
    btnSubOk = new MustButton(getTranslation("TEXT_APPLY_BUTTON"));
    btnSubOk.setToolTipText(getTranslation("TEXT_SAVE_AND_KEEP_WINDOW_OPEN"));
    currentAttributeList.append("", btnSubOk);
    unlockSublist();
    btnSubOk.addActionListener(this);
    currentSelectionList.addListSelectionListener(new ListSelectionListener() {
      public void valueChanged(ListSelectionEvent e) {
        btnSubDel.setEnabled(currentSelectionList.getSelectedIndex() != -1 && currentSelectionList.getSelectedIdentifier() != null && currentSelectionList.getSelectedIdentifier().getIntIdentifier() != -1);
      }
    });
    btnSubDel = MustButton.create("Remove24.gif", getTranslation("TEXT_BUTTON_DELETE"), getTranslation("TEXT_DELETES_SELECTED_ENTRY"), null, null); 
    append(btnSubDel);
    btnSubDel.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        Identifier identifier = selectionList.getSelectedIdentifier();
        if (!selectionList.getSourceDataObject().isDeletionAllowed(identifier)) {
          setMessageToKeep(getTranslation("TEXT_ENTRY_IS_IN_USE"));
          StandardDialog.presentText(DataPropertyAdministration.this, new String[] {
            getTranslation("TEXT_ENTRY_MUST_NOT_BE_DELETED"),
            getTranslation("TEXT_BECAUSE_IT_IS_IN_USE")
          });
          return;
        }
        if (StandardDialog.deletionConfirmed(DataPropertyAdministration.this)) {
          lastRevisionIdentifier = identifier;
          selectionList.getSourceDataObject().delete(identifier);
          selectionList.loadValue();
        }
      }
    });
    btnSubNew = new MustButton(getTranslation("TEXT_NEW_ENTRY"));
    append(btnSubNew);
    btnSubNew.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        selectionList.setSelectedIndex(selectionList.getItemCount()-1);
        selectionList.ensureIndexIsVisible(selectionList.getItemCount()-1);
      }
    });
  }

  /**
   * Creates a new panel and adds it to the tabbed pane with a centered text area
   * for full frame editing.
   * @param tabLabel the label of the new tab
   * @param centerTextArea the text area for full frame editing
   */
  protected void newPanel(String tabLabel, DataTextArea centerTextArea) {
    tabCount++;
    JScrollPane tempScrollPane1 = new JScrollPane();
    tempScrollPane1.getViewport().add(centerTextArea);
    mustTabbedPane.addTab(tabLabel, tempScrollPane1);
    registerDataComponent((DataComponent)centerTextArea);
  }

  /**
   * Creates all fields in the current attribute list. For each column of the main 
   * data object an appropriate label and DataComponent is created and laid-out line by line.
   */
  protected void createAllFields() {
    createAllFields(currentAttributeList);
  }

  /**
   * Creates as many data components as there are columns in the current rows
   * available and presents them in an attribute list line by line.
   * @param assignedAttributeList the attribute list to be filled with the components
   */
  protected void createAllFields(AttributeList assignedAttributeList) {
    currentAttributeList = assignedAttributeList;
    while (mainDataObject.nextColumn()) {
      switch (mainDataObject.getColumnType()) {
      case -7:
        createCheckBox(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        break;
      case -4: // MySQL Text
        createTextArea(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        break;
      case -1:
        createTextArea(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        break;
      case 1:
        createTextField(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        break;
      case 2: // AS/400
        if (mainDataObject.getColumnScale() > 0) {
          createDecimalField(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        } else {
          createIntField(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        }
        break;
      case 3:  // AS/400 7P0
        if (mainDataObject.getColumnScale() > 0) {
          createDecimalField(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        } else {
          createIntField(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        }
        break;
      case 4:
        createIntField(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        break;
      case 5:
        createLongField(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        break;
      case 7:
        createFloatField(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        break;
      case 8:
        createDecimalField(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        break;
      case 12:
        createTextField(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        break;
      case 91: // date
        // de.must.io.Logger.getInstance().info(getClass(), "91: " + mainDataObject.getColumnName());
        createDateField(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        break;
      case 93: // MS Access date
        createDateField(mainDataObject.getColumnName(), mainDataObject.getColumnLabel());
        break;
      }
    }
  }

//==============================================================================

  /**
   * Adds a component to the current line of the current attribute list.
   * @param anyComponent the component to add
   */
  protected void add(JComponent anyJComponent) {
    add(STAY_IN_LINE, "", anyJComponent);
  }

  /**
   * Adds a component to the current attribute list.
   * @param control whether the position should be in the same or next line as
   * indicated via <code>{@link #STAY_IN_LINE}</code> or
   * <code>{@link #NEW_LINE}</code>
   * @param anyComponent the component to add
   */
  protected void add(int control, JComponent anyJComponent) {
    add(control, "", anyJComponent);
  }

  /**
   * Adds a component with a label to the current attribute list.
   * @param label the line label
   * @param anyComponent any component
   */
  protected void add(String dataLabel, JComponent anyJComponent) {
    add(NEW_LINE, dataLabel, anyJComponent);
  }

  /**
   * Adds a component with a label to the current attribute list with line control.
   * @param control indicates whether the component is to be laid-out in the 
   * same line (<code>{@link #STAY_IN_LINE}</code>)
   * or in a new line (<code>{@link #NEW_LINE}</code>)
   * @param dataLabel the line label
   * @param anyComponent any component
   */
  protected void add(int control, String dataLabel, JComponent anyJComponent) {
    try {
      DataComponent TempDataComponent = (DataComponent)anyJComponent;
      dataComponent[++countDataComponent] = TempDataComponent;
      componentTab[countDataComponent] = tabCount;
    } catch (Exception e) {}
    switch (control) {
    case STAY_IN_LINE:
      currentAttributeList.append(anyJComponent);
      break;
    default:
      currentAttributeList.append(dataLabel, anyJComponent);
      break;
    }
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected text input field in the same line as previously used.
   * @param columnName the name of the column to connect to
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(String columnName) {
    return createTextField(STAY_IN_LINE, null, currentDataObject.getColumnLength(columnName), columnName);
  }

  /**
   * Creates a database connected text input field in the same line with the specified length.
   * @param columnName the name of the column to connect to
   * @param choiceContentDo the data object containing valid choice values 
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(String columnName, DataObject choiceContentDo) {
    DataTextField result = createTextField(columnName);
    lastChoiceManager = new ChoiceManagerByDataObject(result, choiceContentDo, columnName);
    return result;
  }

  /**
   * Creates a database connected text input field in a new line with the specified label.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(String label, String columnName) {
    return createTextField(NEW_LINE, label, currentDataObject.getColumnLength(columnName), columnName);
  }

  /**
   * Creates a database connected text input field in a new line with the specified label.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param choiceContentDo the data object containing valid choice values 
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(String label, String columnName, DataObject choiceContentDo) {
    DataTextField result = createTextField(label, columnName);
    lastChoiceManager = new ChoiceManagerByDataObject(result, choiceContentDo, columnName);
    return result;
  }

  /**
   * Creates a database connected text input field in the same line with the specified length.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param length the length of the text input field
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(String columnName, int length) {
    return createTextField(STAY_IN_LINE, null, length, currentDataObject.getColumnLength(columnName), columnName);
  }

  /**
   * Creates a database connected text input field in the same line with the specified length.
   * @param columnName the name of the column to connect to
   * @param length the length of the text input field
   * @param choiceContentDo the data object containing valid choice values 
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(String columnName, int length, DataObject choiceContentDo) {
    DataTextField result = createTextField(columnName, length);
    lastChoiceManager = new ChoiceManagerByDataObject(result, choiceContentDo, columnName);
    return result;
  }

  /**
   * Creates a database connected text input field in a new line with the specified label and length.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param length the length of the text input field
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(String label, String columnName, int length) {
    return createTextField(NEW_LINE, label, length, columnName);
  }

  /**
   * Creates a database connected text input field in a new line with the specified label.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param length the length of the text input field
   * @param choiceContentDo the data object containing valid choice values 
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(String label, String columnName, int length, DataObject choiceContentDo) {
    DataTextField result = createTextField(label, columnName, length);
    lastChoiceManager = new ChoiceManagerByDataObject(result, choiceContentDo, columnName);
    return result;
  }

  /**
   * Creates a database connected text input field in a new line with the specified label and length.
   * @param control indicates whether the component is to be laid-out in the 
   * same line (<code>{@link #STAY_IN_LINE}</code>)
   * or in a new line (<code>{@link #NEW_LINE}</code>)
   * @param columnName the name of the column to connect to
   * @param length the length of the text input field
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(int control, String columnName, int length) {
    return createTextField(control, null, length, currentDataObject.getColumnLength(columnName), columnName);
  }

  /**
   * Creates a database connected text input field in a new line with the specified label and length.
   * @param control indicates whether the component is to be laid-out in the 
   * same line (<code>{@link #STAY_IN_LINE}</code>)
   * or in a new line (<code>{@link #NEW_LINE}</code>)
   * @param label the label of the new line
   * @param length the length of the field
   * @param columnName the name of the column to connect to
   * @return the created database connected  
   */
  protected DataTextField createTextField(int control, String label, int length, String columnName) {
    return createTextField(control, label, length, currentDataObject.getColumnLength(columnName), columnName);
  }

  /**
   * Creates a database connected text input field line controlled with the specified length.
   * @param control indicates whether the component is to be laid-out in the 
   * same line (<code>{@link #STAY_IN_LINE}</code>)
   * or in a new line (<code>{@link #NEW_LINE}</code>)
   * @param label the label of the new line
   * @param length the length of the text input field
   * @param maxChars the maximum of characters to be entered
   * @param columnName the name of the column to connect to
   * @return the created database connected data text field 
   */
  protected DataTextField createTextField(int control, String label, int length, int maxChars, String columnName) {
    DataTextField temp = new DataTextField(length, maxChars, currentDataObject, columnName);
    int fieldCreationMode = getFieldCreationMode(columnName);
    if (fieldCreationMode == FIELD_CREATION_MODE_NONE) return temp;
    if (fieldCreationMode == FIELD_CREATION_MODE_VIEW) temp.setEnabled(false);
    if (label == null || label.equals("")) {
      temp.getAccessibleContext().setAccessibleName(columnName);
    }
    switch (control) {
    case STAY_IN_LINE:
      currentAttributeList.append(temp);
      break;
    default:
      currentAttributeList.append(label, temp);
      break;
    }
    // de.must.io.Logger.getInstance().info(getClass(), "DataComponent " + columnName + " = " + countDataComponent);
    registerDataComponent((DataComponent)temp);
    if (mustTabbedPane != null) {
      temp.setTabbedPaneLocation(mustTabbedPane, tabCount);
    }
    return temp;
  }

  /**
   * Creates a database connected password input field line controlled with the specified length.
   * @param control indicates whether the component is to be laid-out in the 
   * same line (<code>{@link #STAY_IN_LINE}</code>)
   * or in a new line (<code>{@link #NEW_LINE}</code>)
   * @param label the label of the new line
   * @param length the length of the text input field
   * @param maxChars the maximum of characters to be entered
   * @param columnName the name of the column to connect to
   * @return the created database connected data text field 
   */
  protected DataPasswordField createPasswordField(String label, String columnName) {
    DataPasswordField temp = new DataPasswordField(currentDataObject.getColumnLength(columnName), currentDataObject, columnName);
    int fieldCreationMode = getFieldCreationMode(columnName);
    if (fieldCreationMode == FIELD_CREATION_MODE_NONE) return temp;
    if (fieldCreationMode == FIELD_CREATION_MODE_VIEW) temp.setEnabled(false);
    if (label == null || label.equals("")) {
      temp.getAccessibleContext().setAccessibleName(columnName);
    }
    currentAttributeList.append(label, temp);
    // de.must.io.Logger.getInstance().info(getClass(), "DataComponent " + columnName + " = " + countDataComponent);
    registerDataComponent((DataComponent)temp);
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected text area in the same line as previously used.
   * @param columnName the name of the column to connect to
   * @return the created database connected text area 
   */
  protected DataTextArea createTextArea(String columnName) {
    return createTextArea(columnName, columnName);
  }

  /**
   * Creates a database connected text area in a new line with the specified label.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected text area 
   */
  protected DataTextArea createTextArea(String label, String columnName) {
    return createTextArea(label, columnName, 3);
  }

  /**
   * Creates a database connected text area in a new line with the specified label and number of rows.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param rows the number of rows to be rendered
   * @return the created database connected text area 
   */
  protected DataTextArea createTextArea(String label, String columnName, int rows) {
    DataTextArea temp = new DataTextArea(currentDataObject.getColumnLength(columnName), currentDataObject, columnName, rows);
    JScrollPane tempScrollPane = new JScrollPane();
    tempScrollPane.getViewport().add(temp);
    currentAttributeList.append(label, tempScrollPane);
    registerDataComponent((DataComponent)temp);
    return temp;
  }

  protected DataTextArea createTextAreaWithDynamicSize(String label, String columnName) {
    DataTextArea temp = new DataTextArea(currentDataObject.getColumnLength(columnName), currentDataObject, columnName);
    JScrollPane tempScrollPane = new JScrollPane();
    dynamicScrollPane = tempScrollPane; 
    tempScrollPane.getViewport().add(temp);
    currentAttributeList.append(label, tempScrollPane);
    registerDataComponent((DataComponent)temp);
    return temp;
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected float field in the same line as previously used.
   * @param columnName the name of the column to connect to
   * @return the created database connected float field 
   */
  protected DataFloatField createFloatField(String columnName) {
    return(createFloatField(columnName, columnName));
  }

  /**
   * Creates a database connected float field in a new line with the specified label.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected  
   */
  protected DataFloatField createFloatField(String label, String columnName) {
    DataFloatField temp = new DataFloatField(currentDataObject, columnName);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

 //------------------------------------------------------------------------------

  /**
   * Creates a database connected decimal field in the same line as previously used.
   * @param columnName the name of the column to connect to
   * @return the created database connected decimal field 
   */
  protected DataDecimalField createDecimalField(String columnName) {
    return(createDecimalField(STAY_IN_LINE, null, columnName));
  }

  /**
   * Creates a database connected decimal field in a new line with the specified label.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected decimal field
   */
  protected DataDecimalField createDecimalField(String label, String columnName) {
    return(createDecimalField(NEW_LINE, label, columnName));
  }

  /**
   * Creates a database connected decimal field
   * @param control indicates whether the component is to be laid-out in the 
   * same line (<code>{@link #STAY_IN_LINE}</code>)
   * or in a new line (<code>{@link #NEW_LINE}</code>)
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected decimal field
   */
  protected DataDecimalField createDecimalField(int control, String label, String columnName) {
    DataDecimalField temp = new DataDecimalField(currentDataObject, columnName);
    switch (control) {
    case STAY_IN_LINE:
      currentAttributeList.append(temp);
      break;
    default:
      currentAttributeList.append(label, temp);
      break;
    }
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected int field in the same line as previously used.
   * @param columnName the name of the column to connect to
   * @return the created database connected int field 
   */
  protected DataIntField createIntField(String columnName) {
    return(createIntField(STAY_IN_LINE, null, columnName));
  }

  /**
   * Creates a database connected int field in a new line with the specified label.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected int field 
   */
  protected DataIntField createIntField(String label, String columnName) {
    return(createIntField(NEW_LINE, label, columnName));
  }

  /**
   * Creates a database connected int field
   * @param control indicates whether the component is to be laid-out in the 
   * same line (<code>{@link #STAY_IN_LINE}</code>)
   * or in a new line (<code>{@link #NEW_LINE}</code>)
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected int field 
   */
  protected DataIntField createIntField(int control, String label, String columnName) {
    DataIntField temp = new DataIntField(currentDataObject, columnName);
    switch (control) {
    case STAY_IN_LINE:
      currentAttributeList.append(temp);
      break;
    default:
      currentAttributeList.append(label, temp);
      break;
    }
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected year field in the same line as previously used.
   * @param columnName the name of the column to connect to
   * @return the created database connected year field 
   */
  protected DataYearField createYearField(String columnName) {
    return(createYearField(STAY_IN_LINE, null, columnName));
  }

  /**
   * Creates a database connected year field in a new line with the specified label.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected year field 
   */
  protected DataYearField createYearField(String label, String columnName) {
    return(createYearField(NEW_LINE, label, columnName));
  }

  /**
   * Creates a database connected year field
   * @param control indicates whether the component is to be laid-out in the 
   * same line (<code>{@link #STAY_IN_LINE}</code>)
   * or in a new line (<code>{@link #NEW_LINE}</code>)
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected year field 
   */
  protected DataYearField createYearField(int control, String label, String columnName) {
    DataYearField temp = new DataYearField(currentDataObject, columnName);
    switch (control) {
    case STAY_IN_LINE:
      currentAttributeList.append(temp);
      break;
    default:
      currentAttributeList.append(label, temp);
      break;
    }
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected long field in the same line as previously used.
   * @param columnName the name of the column to connect to
   * @return the created database connected long field 
   */
  protected DataLongField createLongField(String columnName) {
    return(createLongField(columnName, columnName));
  }

  /**
   * Creates a database connected long field
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected long field
   */
  protected DataLongField createLongField(String label, String columnName) {
    DataLongField temp = new DataLongField(currentDataObject, columnName);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected date field in the same line as previously used.
   * @param columnName the name of the column to connect to
   * @return the created database connected date field 
   */
  protected DataDateField createDateField(String columnName) {
    return(createDateField(STAY_IN_LINE, null, columnName));
  }

  /**
   * Creates a database connected date field in a new line with the specified label.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected date field 
   */
  protected DataDateField createDateField(String label, String columnName) {
    return(createDateField(NEW_LINE, label, columnName));
  }

  /**
   * Creates a database connected date field
   * @param control indicates whether the component is to be laid-out in the 
   * same line (<code>{@link #STAY_IN_LINE}</code>)
   * or in a new line (<code>{@link #NEW_LINE}</code>)
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected date field 
   */
  protected DataDateField createDateField(int control, String label, String columnName) {
    DataDateField temp = new DataDateField(currentDataObject, columnName);
    switch (control) {
    case STAY_IN_LINE:
      currentAttributeList.append(temp);
      break;
    default:
      currentAttributeList.append(label, temp);
      break;
    }
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

 //------------------------------------------------------------------------------

  /**
   * Creates a database connected currency choice field in the same line as previously used.
   * @param columnName the name of the column to connect to
   * @return the created database connected currency choice 
   */
  protected DataCurrencyChoice createCurrencyChoice(String columnName) {
    return(createCurrencyChoice(columnName, columnName));
  }

  /**
   * Creates a database connected currency choice field in a new line with the specified label.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected currency choice  
   */
  protected DataCurrencyChoice createCurrencyChoice(String label, String columnName) {
    DataCurrencyChoice temp = new DataCurrencyChoice(currentDataObject, columnName);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected variable choice
   * @param label the label of the new line
   * @param content the static content of the variable choice, a row should contain a key and a description
   * @param columnName the name of the column to connect to
   * @return the created database connected variable choice
   */
  protected DataVariableChoice createChoice(String label, String[][] content, String columnName) {
    return createChoice(label, content, columnName, false);
  }
  
  /**
   * Creates a database connected variable choice
   * @param label the label of the new line
   * @param content the static content of the variable choice, a row should contain a key and a description
   * @param columnName the name of the column to connect to
   * @param noChoicePossible if true, an item is offered which represents the "no choice"
   * @return the created database connected variable choice
   */
  protected DataVariableChoice createChoice(String label, String[][] content, String columnName, boolean noChoicePossible) {
    return createChoice(label, content, columnName, false, false);
  }
  
  /**
   * Creates a database connected variable choice
   * @param label the label of the new line
   * @param content the static content of the variable choice, a row should contain a key and a description
   * @param columnName the name of the column to connect to
   * @param noChoicePossible if true, an item is offered which represents the "no choice"
   * @param suppressKey whether or not keys should be suppressed in ComboBox
   * @return the created database connected variable choice
   */
  protected DataVariableChoice createChoice(String label, String[][] content, String columnName, boolean noChoicePossible, boolean suppressKey) {
    DataVariableChoice temp = new DataVariableChoice(content, currentDataObject, columnName, noChoicePossible, suppressKey);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

  /**
   * Creates a database connected variable choice
   * @param label the label of the new line
   * @param content the static content of the variable choice
   * @param columnName the name of the column to connect to
   * @return the created database connected variable choice 
   */
  protected DataVariableChoice createChoice(String label, KeyValuePair[] content, String columnName) {
    DataVariableChoice temp = new DataVariableChoice(content, currentDataObject, columnName);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

  /**
   * Creates a database connected variable choice in the same line.
   * @param content the static content of the variable choice
   * @param columnName the name of the column to connect to
   * @return the created database connected variable choice 
   */
  protected DataVariableChoice createChoice(KeyValuePair[] content, String columnName) {
    DataVariableChoice temp = new DataVariableChoice(content, currentDataObject, columnName);
    currentAttributeList.append(temp);
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

  /**
   * Creates a database connected variable choice
   * @param label the label of the new line
   * @param content the static content of the variable choice
   * @param columnName the name of the column to connect to
   * @return the created database connected variable choice 
   */
  protected DataVariableChoiceNumKey createChoice(String label, KeyValuePairNum[] content, String columnName) {
    DataVariableChoiceNumKey temp = new DataVariableChoiceNumKey(content, currentDataObject, columnName);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected check box in the same line as previously used.
   * @param columnName the name of the column to connect to
   * @param checkLabel the right-most label of check box
   * @return the created database connected
   */
  protected DataCheckBox createCheckBox(String columnName, String checkLabel) {
    return createCheckBox(STAY_IN_LINE, null, columnName, checkLabel);
  }

  /**
   * Creates a database connected check box
   * @param lineLabel the label of the new line
   * @param columnName the name of the column to connect to
   * @param checkLabel the right-most label of check box
   * @return the created database connected
   */
  protected DataCheckBox createCheckBox(String lineLabel, String columnName, String checkLabel) {
    return createCheckBox(NEW_LINE, lineLabel, columnName, checkLabel);
  }

  /**
   * Creates a database connected check box
   * @param control indicates whether the component is to be laid-out in the 
   * same line (<code>{@link #STAY_IN_LINE}</code>)
   * or in a new line (<code>{@link #NEW_LINE}</code>)
   * @param lineLabel the label of the new line
   * @param columnName the name of the column to connect to
   * @param checkLabel the right-most label of check box
   * @return the created database connected
   */
  protected DataCheckBox createCheckBox(int control, String lineLabel, String columnName, String checkLabel) {
    DataCheckBox temp = new DataCheckBox(currentDataObject, columnName, checkLabel);
    temp.getAccessibleContext().setAccessibleName(checkLabel);
    switch (control) {
    case STAY_IN_LINE:
      currentAttributeList.append(temp);
      break;
    default:
      currentAttributeList.append(lineLabel, temp);
      break;
    }
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected text check in a new line.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param keys the keys as to be used in the database tables
   * @param meaning the meanings of these keys to be presented for the user
   * @return the created database connected  
   */
  protected DataTextCheck createTextCheck(String label, String columnName, String[] keys, String[] meaning) {
    DataTextCheck temp = new DataTextCheck(currentDataObject, columnName, keys, meaning);
    currentAttributeList.append(label, temp);
    dataComponent[++countDataComponent] = (DataComponent)temp;
    componentTab[countDataComponent] = tabCount;
    return(temp);
  }
  
  /**
   * Creates a database connected text check in a new line.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param content the content described by an array of KeyValuePair
   * @return the created database connected  
   */
  protected DataTextCheck createTextCheck(String label, String columnName, KeyValuePair[] content) {
    DataTextCheck temp = new DataTextCheck(currentDataObject, columnName, content);
    currentAttributeList.append(label, temp);
    dataComponent[++countDataComponent] = (DataComponent)temp;
    componentTab[countDataComponent] = tabCount;
    return(temp);
  }
  
  protected DataTextCheck createTextCheck(String label, String columnName, DataObject sourceDataObject, String keyColumnName, String visibleColumnName) {
    DataTextCheck temp = new DataTextCheck(currentDataObject, columnName, sourceDataObject, keyColumnName, visibleColumnName);
    currentAttributeList.append(label, temp);
    dataComponent[++countDataComponent] = (DataComponent)temp;
    componentTab[countDataComponent] = tabCount;
    return(temp);
  }
  
  /**
   * Creates a database connected text check in a new line.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param keys the keys as to be used in the database tables
   * @param meaning the meanings of these keys to be presented for the user
   * @return the created database connected  
   */
  protected DataTextCheck createTextCheck(String label, String columnName, int[] keys, String[] meaning) {
    DataTextCheck temp = new DataTextCheck(currentDataObject, columnName, keys, meaning);
    currentAttributeList.append(label, temp);
    dataComponent[++countDataComponent] = (DataComponent)temp;
    componentTab[countDataComponent] = tabCount;
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected combo box in the same line as previously used.
   * @param columnName the name of the column to connect to
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @return the created database connected combo box
   */
  protected DataComboBox createComboBox(String columnName, DataObject sourceDataObject, String visibleColumn) {
    DataComboBox temp = new DataComboBox(currentDataObject, columnName, sourceDataObject, visibleColumn);
    temp.getAccessibleContext().setAccessibleName(columnName);
    currentAttributeList.append(temp);
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

  /**
   * Creates a database connected combo box in a new line.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @return the created database connected combo box
   */
  protected DataComboBox createComboBox(String label, String columnName, DataObject sourceDataObject) {
	  DataComboBox temp = new DataComboBox(currentDataObject, columnName, sourceDataObject);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

  /**
   * Creates a database connected combo box in a new line which stores
   * the visible content instead of a pointer / identifier.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @return the created database connected combo box
   */
  protected DataComboBox createComboBox(String label, String columnName, DataObject sourceDataObject, String visibleColumn) {
	  DataComboBox temp = new DataComboBox(currentDataObject, columnName, sourceDataObject, visibleColumn);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

  /**
   * Creates a database connected combo box in a new line.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @param orderByColumnName the column name to determine for the list order
   * @param nameForNoChoice the expression that indicates "no choice"
   * @return the created database connected combo box
   */
  protected DataComboBox createComboBox(String label, String columnName, DataObject sourceDataObject, String visibleColumn, String orderByColumnName, String nameForNoChoice) {
    DataComboBox temp = new DataComboBox(currentDataObject, columnName, sourceDataObject, visibleColumn, orderByColumnName, nameForNoChoice);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

  /**
   * Creates a database connected combo box
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @param orderByColumnName the column name to determine for the list order
   * @param nameForNoChoice the expression that indicates "no choice"
   * @param width the fixed width of the combo box
   * @return the created database connected combo box
   */
  protected DataComboBox createComboBox(String label, String columnName, DataObject sourceDataObject, String visibleColumn, String orderByColumnName, String nameForNoChoice, int width) {
	  DataComboBox temp = new DataComboBox(currentDataObject, columnName, sourceDataObject, visibleColumn, orderByColumnName, nameForNoChoice, width);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

  /**
   * Creates a database connected combo box
   * @param columnName the name of the column to connect to
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @param orderByColumnName the column name to determine for the list order
   * @param nameForNoChoice the expression that indicates "no choice"
   * @param width the fixed width of the combo box
   * @return the created database connected combo box
   */
  protected DataComboBox createComboBox(String columnName, DataObject sourceDataObject, String visibleColumn, String orderByColumnName, String nameForNoChoice, int width) {
	  DataComboBox temp = new DataComboBox(currentDataObject, columnName, sourceDataObject, visibleColumn, orderByColumnName, nameForNoChoice, width);
    temp.getAccessibleContext().setAccessibleName(columnName);
    currentAttributeList.append(temp);
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected multiple choice in a new line.
   * @param label the label of the new line
   * @param key the data object containing the columns to be displayed.
   * @param link the data object which represents the relational entity.
   * @param keyColumns the columns to be used to dynamically fill the grid
   * @param keyHeaders the headers of the grid
   * @return the created database connected multiple choice
   */
  protected DataMultChoice createMultChoice(String label, DataObject key, AssoDataObject link, String[] keyColumns, String[] keyHeaders) {
    DataMultChoice temp = new DataMultChoice(currentDataObject, key, link, keyColumns, keyHeaders);
    currentAttributeList.append(label, temp.getTable());
    registerDataComponent((DataComponent)temp);
    multChoices.add(temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected component group to control external links  
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @param length the length of the text input field
   * @return the created database connected text input field
   */
  protected InfoLinkTextField createExternalLink(String label, String columnName) {
    InfoLinkTextField temp = new InfoLinkTextField(40, currentDataObject, columnName);
    ExternalLink tempLink = new ExternalLink(this, temp);
    tempLink.addTo(currentAttributeList, label);
    registerDataComponent((DataComponent)temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected image viewer.
   * @param tabLabel the label of the tab
   * @param imageDirectory the directory for the images to be saved and reloaded
   * @param prefix the prefix to be used to construct the image file names
   * @return the created database connected image viewer 
   */
  protected DataImageViewer createImage(String tabLabel, String imageDirectory, String prefix) {
    return createImage(currentDataObject, tabLabel, imageDirectory, prefix);
  }

  /**
   * Creates a database connected image viewer.
   * @param dataObject the DataObject to assign to
   * @param tabLabel the label of the tab
   * @param imageDirectory the directory for the images to be saved and reloaded
   * @param prefix the prefix to be used to construct the image file names
   * @return the created database connected image viewer 
   */
  protected DataImageViewer createImage(DataObject dataObject, String tabLabel, String imageDirectory, String prefix) {
    return createImage(currentDataObject, tabLabel, imageDirectory, prefix, null, null);
  }

  /**
   * Creates a database connected image viewer.
   * @param dataObject the DataObject to assign to
   * @param tabLabel the label of the tab
   * @param imageDirectory the directory for the images to be saved and reloaded
   * @param prefix the prefix to be used to construct the image file names
   * @param helpTopic the context help's topic
   * @param helpTarget the context help's target
   * @return the created database connected image viewer 
   */
  protected DataImageViewer createImage(DataObject dataObject, String tabLabel, String imageDirectory, String prefix, String helpTopic, String helpTarget) {
    tabCount++;
    DataImageViewer temp = new DataImageViewer(this, dataObject, imageDirectory, prefix);
    JScrollPane tempScrollPane = new JScrollPane();
    tempScrollPane.getViewport().add(temp);
    mustTabbedPane.addTab(tabLabel, tempScrollPane);
    if (helpTopic != null) mustTabbedPane.setHelpContext(helpTopic, helpTarget);
    registerDataComponent((DataComponent)temp);
    return temp;
  }

  protected DataCleartextClassification createCleartextClassification(String label, String assignedColumnName, SelfChainingDataObject sourceDataObject, String niColumn, String visibleColumnName, String superordinateNiColumn, int depth) {
    DataCleartextClassification temp = new DataCleartextClassification(mainDataObject, assignedColumnName, sourceDataObject, "KlarSystNi", "KlarSystBz", 3);
    temp.addTo(currentAttributeList, label);
    registerDataComponent((DataComponent)temp);
    return temp;
  }

//------------------------------------------------------------------------------

  protected void registerDataComponent(DataComponent nextDataComponent) {
    dataComponent[++countDataComponent] = nextDataComponent;
    componentTab[countDataComponent] = tabCount;
    if (currentSelectionList != null) {
      if (nextDataComponent instanceof JTextComponent) {
        final JTextComponent textField = (JTextComponent)nextDataComponent;
        textField.addKeyListener(new KeyListener() {
          public void keyPressed(KeyEvent arg0) {
          }
          public void keyReleased(KeyEvent arg0) {
          }
          public void keyTyped(KeyEvent arg0) {
            if (
                Character.isLetterOrDigit(arg0.getKeyChar())
             || (
                 arg0.getModifiers() & Event.CTRL_MASK) != 0
              && textField instanceof MustTextField
              && ((MustTextField)textField).isModified() // e.g. Ctrl-C 
            ) {
              lockSublist();
            }
          }
        });
      }
    }
  }

  public int getFieldCreationMode(String columnName) { // to be overridden by child if necessary
    return FIELD_CREATION_MODE_EDIT;
  }

//==============================================================================

  protected KeyButton appendKeyButton(Class<? extends DataTableAdministration> keyClass, String territory) {
    return appendKeyButton(keyClass, null, territory, null);
  }
  
  protected KeyButton appendKeyButton(Class<? extends DataTableAdministration> keyClass, String territory, String toolTipText) {
    return appendKeyButton(keyClass, null, territory, toolTipText);
  }

  protected KeyButton appendKeyButton(Class<? extends DataTableAdministration> keyClass, String openImageName, String territory, String toolTipText) {
    if (GlobalInWuicStd.entitlement == null || GlobalInWuicStd.entitlement.isEditable(territory)) {
      KeyButton keyButton = KeyButton.create(keyClass); 
      if (toolTipText != null) keyButton.setToolTipText(toolTipText);
      append(keyButton);
      return keyButton;
    } else return null;
  }

  /**
   * Adds a component to the line as previously used.
   * @param Component
   */
  protected void append(JComponent Component) {
    currentAttributeList.append(Component);
  }

  /**
   * Sets the component which represents the internal number (primary key) of
   * the administered entity.
   * @param newNiDataComponent the component which represents the internal number
   */
  protected void setNiDataComponent(DataComponent newNiDataComponent) {
    niDataComponent = newNiDataComponent;
  }

  /**
   * Sets the component which represents the unique identifier (primary key) of
   * the administered entity.
   * @param newUniqueStringIdentifyDataComponent the component which represents the unique identifier
   */
  protected void setUniqueStringIdentifyDataComponent(MustTextField newUniqueStringIdentifyDataComponent) {
    uniqueStringIdentifyDataComponent = newUniqueStringIdentifyDataComponent;
  }

  /**
   * Sets the tool tip text of the last created data component.
   * @param toolTipText the tool tip text of the last created data component
   */
  protected void setToolTipText(String toolTipText) {
    dataComponent[countDataComponent].setToolTipText(toolTipText);
  }

  /**
   * Sets the last component's mandatory state.
   * @param required the last component's mandatory state
   */
  protected void setRequired(boolean required) {
    dataComponent[countDataComponent].setRequired(required);
  }

  /**
   * Sets the component to to gain focus preferred.
   * @param newPreferredFocusField the component to to gain focus preferred
   */
  protected void setPreferredFocusField(DataTextField newPreferredFocusField) {
    preferredFocusField = newPreferredFocusField;
  }

  private void setFocusOnPreferredField() {
    if (preferredFocusField != null) preferredFocusField.requestFocus();
  }

  /**
   * Sets the frame title for using the administration for entering new entries.
   * @param frameTitleNew the frame title for using the administration entering new entries
   */
  protected void setFrameTitleNew(String frameTitleNew) {
    this.frameTitleNew = frameTitleNew;
  }
  
  /**
   * Returns the frame title for using the administration for entering new entries.
   * @return the frame title for using the administration for entering new entries
   */
  public String getFrameTitleNew() {
    return frameTitleNew;
  }

  /**
   * Sets the frame title for using the administration for updating entries.
   * @param newFrameUpdateTitleField the field to be used to build the title
   * for using the administration for updating entries
   */
  protected void setFrameUpdateTitleField(DataTextField newFrameUpdateTitleField) {
    this.frameUpdateTitleFields = new DataTextField[] {newFrameUpdateTitleField};
  }

  /**
   * Sets the frame title for using the administration for updating entries.
   * @param newFrameUpdateTitleFields the fields to be used to build the title
   * for using the administration for updating entries
   */
  protected void setFrameUpdateTitleField(DataTextComponent[] newFrameUpdateTitleFields) {
    this.frameUpdateTitleFields = newFrameUpdateTitleFields;
  }

  /**
   * Is called when newInput, load or copy dialog is prepared.
   * May be used to control focus e.g.
   * @see #getAdministrationMode
   */
  protected void dialogPrepared() {
    unlockSublist();
    if (getAdministrationMode() != MODE_PROPERTY) {
      setFocusOnPreferredField();
    }
  }

  /**
   * Requests the focus to the component and ensures the component is visible
   * by switching to the appropriate tab
   * @param component the component to receive the focus
   */
  public void setFocusOn(JComponent component) {
    for (int i = 0; i <= countDataComponent; i++) {
      if (dataComponent[i].equals(component)) {
        mustTabbedPane.setSelectedIndex(componentTab[i]);
      }
    }
    component.requestFocus();
  }

  /**
   * Checks if the administration frame is vacant and prepares the frame for entering a new entry.
   */
  public void newInputIfVacant() {
    if (isCancelAllowed()) newInput();
  }

  /**
   * Prepares the administration frame for entering a new entry.
   */
  protected void newInput() {
    identifiers = null; // reset incomplete updates
    setVisible(true);
    administrationMode = MODE_NEW;
    checkRepeatedInput.setVisible(true);
    if (uniqueStringIdentifyDataComponent != null) uniqueStringIdentifyDataComponent.setEditable(true);
    setTitle(frameTitleNew);
    if (tabCount >= 0) mustTabbedPane.setSelectedIndex(0);
    for (int i = 0; i <= numberOfDataObjects; i++) {
      dataObjects[i].newRow();
    }
    lastRevisionIdentifier = mainDataObject.allocateNewIdentifier();
    if (lastRevisionIdentifier != null && lastRevisionIdentifier.getIntIdentifier() > mainDataObject.getmaxRow(de.must.util.Licence.getLicenceType())) {
      if (evaluationOverflow != null) {
        evaluationOverflow.react(this);
      } else {
        StandardDialog.presentText(this, new String[] {getTranslation("TEXT_THE_MAXIMUM_OF_ENTRIES_FOR") + de.must.util.Licence.getLicenceDescription() + getTranslation("TEXT_IS_REACHED"), getTranslation("TEXT_WE_LIKE_TO_DELIVER_THE_FULL_LICENCE"), getTranslation("TEXT_PRICES_SEE")}, (getTranslation("TEXT_INFOS_ABOUT_THE_LICENCE")));
      }
      closeInstance();
    } else {
      loadValues();
      setDefaultValues();
    }
    if (lastRevisionIdentifier == null && uniqueStringIdentifyDataComponent != null) {
      Iterator<DataMultChoice> multChoicesIterator = multChoices.iterator();
      while (multChoicesIterator.hasNext()) {
        DataMultChoice multChoice = multChoicesIterator.next();
        multChoice.setIdentifyTextField(uniqueStringIdentifyDataComponent);
      }
    }
    dialogPrepared();
  }

  /**
   * Sets the identify value (primary key).
   * @param id the new identify value
   */
  protected void setIdentityValue(int id) {
    mainDataObject.setIdentityValue(id);
  }

//------------------------------------------------------------------------------

  /**
   * Sets all to data components to be editable as specified.
   * @param editable whether the components should be editable or not
   */
  protected void setEditable(boolean editable) {
    this.editable = editable;
    for (int i = 0; i <= countDataComponent; i++) {
      if (dataComponent[i] != niDataComponent) {
        dataComponent[i].setEditable(editable);
      }
    }
  }

  protected boolean isEditable() {
    return editable;
  }
  
  /**
   * Returns the administration mode which may be
   * <code>{@link #MODE_VIRGIN}</code> or
   * <code>{@link #MODE_NEW}</code> or
   * <code>{@link #MODE_PROPERTY}</code> or
   * <code>{@link #MODE_COPY}</code>
   * @return the administration mode
   */
  protected int getAdministrationMode() {
    return administrationMode;
  }

  /**
   * Sets the evaluation overflow.
   * @param overflow the class that implement the overflow reaction
   */
  public void setEvaluationOverflow(EvaluationOverflow overflow) {
    this.evaluationOverflow = overflow;
  }

//------------------------------------------------------------------------------

  public void loadValues(Vector<Identifier> identifiers) {
    this.identifiers = identifiers;
    if (returnToFirstPage && mustTabbedPane != null) {
      mustTabbedPane.setSelectedIndex(0); // most important information on first page, stay on previous tab only for tailing items of multiple selection
    }
    loadValuesConsumeIdentifiers();
  }
  
  private boolean loadValuesConsumeIdentifiers() {
    if (identifiers == null || identifiers.size() == 0) return false;
    Identifier identifier = identifiers.firstElement();
    identifiers.remove(0);
    loadValues(identifier);
    return true;
  }
  
  /**
   * Loads the specified entry and fills all DataComponent objects with
   * the current values to edit them.
   * @param identification the unique identify value of the entry.
   */
  public void loadValues(Identifier identifier) {
    resetMessage();
    mainDataObject.setIdentifier(identifier);
    lastRevisionIdentifier = identifier;
    loadValuesAfterId();
  }

  protected void loadValuesAfterId() {
    administrationMode = MODE_PROPERTY;
    checkRepeatedInput.setVisible(false);
    if (uniqueStringIdentifyDataComponent != null) uniqueStringIdentifyDataComponent.setEditable(false);
    mainDataObject.load();
    if (numberOfDataObjects > 0) loadSecondaryDataObject();
    if (numberOfDataObjects > 1) loadThirdDataObject();
    loadValues();
    String newTitle = getEntryDescription();
    if (newTitle != null) setTitle(newTitle);
    dialogPrepared();
  }

  /**
   * Loads the specified entry and fills all DataComponent objects with
   * the current values to offer them for inserting a new entry.
   * @param identification the unique identify value of the entry.
   */
  public void copy(Identifier identifier) {
    identifiers = null; // reset incomplete updates
    mainDataObject.setIdentifier(identifier);
    copyAfterId();
  }

  protected void copyAfterId() {
    administrationMode = MODE_COPY;
    checkRepeatedInput.setVisible(false);
    if (mustTabbedPane != null) { 
      mustTabbedPane.setSelectedIndex(0); // most important information on first page, return to this page
    }
    if (uniqueStringIdentifyDataComponent != null) uniqueStringIdentifyDataComponent.setEditable(true);
    mainDataObject.load();
    loadValues();
    if (frameUpdateTitleFields != null) setTitle(getTranslation("TEXT_COPY_OF") + getEntryDescription());
    mainDataObject.newRow();
    lastRevisionIdentifier = mainDataObject.allocateNewIdentifier();
    for (int i = 1; i <= numberOfDataObjects; i++) {
      dataObjects[i].newRow();
    }
    // tell the multiple choice models that the original is no longer relevant and that a new identifier came
    Iterator<DataMultChoice> multChoicesIterator = multChoices.iterator();
    while (multChoicesIterator.hasNext()) {
      DataMultChoice multChoice = multChoicesIterator.next();
      if (lastRevisionIdentifier != null) {
        multChoice.setCopyModeAndNewRootIdentifier(lastRevisionIdentifier);
      } else if (uniqueStringIdentifyDataComponent != null) {
        multChoice.setCopyModeAndIdentifyTextField(uniqueStringIdentifyDataComponent);
      } else {
        Logger.getInstance().warn("DataMultChoice is not prepared to copy data!");
      }
    }
    Iterator<DataList> subListIterator = subLists.iterator();
    while (subListIterator.hasNext()) {
      DataList subList = subListIterator.next();
      subList.loadValue(); // we do not copy sub lists - it's just new input, dataObjects[i].newRow() has been done before
    }
    if (lastRevisionIdentifier != null && lastRevisionIdentifier.getIntIdentifier() < -1) {// care! -1 may occur for string identified entities!
      StandardDialog.presentText(this, new String[] {"Ganz schön schlau, den Nummernverwalter auf negativ zu setzen!", "Aber daran habe ich gedacht. ;-)", getTranslation("TEXT_FULL_LICENCE_SEE")}, (getTranslation("TEXT_INFOS_ABOUT_THE_LICENCE")));
      closeInstance();
    }
    if (lastRevisionIdentifier != null && lastRevisionIdentifier.getIntIdentifier() > mainDataObject.getmaxRow(de.must.util.Licence.getLicenceType())) {
      if (evaluationOverflow != null) {
        evaluationOverflow.react(this);
      } else {
        StandardDialog.presentText(this, new String[] {getTranslation("TEXT_THE_MAXIMUM_OF_ENTRIES_FOR") + de.must.util.Licence.getLicenceDescription() + getTranslation("TEXT_IS_REACHED"), getTranslation("TEXT_WE_LIKE_TO_DELIVER_THE_FULL_LICENCE"), getTranslation("TEXT_PRICES_SEE")}, (getTranslation("TEXT_INFOS_ABOUT_THE_LICENCE")));
      }
      closeInstance();
    }
    if (niDataComponent != null) niDataComponent.loadValue();
    dialogPrepared();
  }

  /**
   * Returns the description of the administered entry.
   * @return the description of the administered entry
   */
  protected String getEntryDescription() {
    if (frameUpdateTitleFields == null) return null; // no field association set
    StringBuffer title = new StringBuffer();
    int i;
    for (i = 0; i < frameUpdateTitleFields.length; i++) {
      if (title.length() > 0 && title.charAt(title.length() - 1 ) != ' ') {
        title.append(' ');
      }
      title.append(frameUpdateTitleFields[i].getText());
    }
    return title.toString();
  }

  /**
   * Loads the secondary data object - to be overridden by child if necessary.
   */
  public void loadSecondaryDataObject() {
  }

  /**
   * Loads the third data object - to be overridden by child if necessary.
   */
  public void loadThirdDataObject() {
  }

  protected void loadValues() {
    for (int i = 0; i <= countDataComponent; i++) {
      dataComponent[i].loadValue();
    }
  }

  /**
   * Returns true if any data component was modified by the user.
   * @return true if any data component was modified by the user
   */
  protected boolean isModified() {
    for (int i = 0; i <= countDataComponent; i++) {
      if (dataComponent[i].isModified()) {
        if (verbose) showModification(i);
        return true;
      }
    }
    return false;
  }

  private void showModification(int i) { // for debug only!
    boolean componentTypeIdentified = false;
    try {
    JTextField temp = (JTextField)dataComponent[i];
    Logger.getInstance().info(getClass(), temp.getClass().getName() + " was modified, it is component " + i + " with content " + ((JTextField)dataComponent[i]).getText());
    componentTypeIdentified = true;
    } catch(Exception e) {}
    try {
    DataTextCheck temp = (DataTextCheck)dataComponent[i];
    Logger.getInstance().info(getClass(), temp.getClass().getName() + " was modified, it is component " + i);
    componentTypeIdentified = true;
    } catch(Exception e) {}
    try {
    DataCheckBox temp = (DataCheckBox)dataComponent[i];
    Logger.getInstance().info(getClass(), temp.getClass().getName() + " was modified, it is component " + i);
    componentTypeIdentified = true;
    } catch(Exception e) {}
    if (!componentTypeIdentified) de.must.io.Logger.getInstance().info(getClass(), "component Nbr. " + i + " was modified");
  }

  /**
   * Saves the edited entry. Insert or update cases are treated automatically.
   */
  protected void saveValues() {
    if (editable) {
      switch (administrationMode) {
      case MODE_NEW:
        saveValuesForNew();
        break;
      case MODE_COPY:
        saveValuesForNew();
        break;
      case MODE_PROPERTY:
        saveValuesForUpdate();
        break;
      }
      mainDataObject.commitIfNotAutoCommit();
    }
  }

  private void saveValuesForNew() {
    int i ;
    for (i = 0; i <= countDataComponent; i++) {
      if (dataComponent[i].isFilled()) {
          dataComponent[i].saveValue();
      }
    }
  }

  private void saveValuesForUpdate() {
    // 1. CHAR values may be not trimmed and for that may be modified!
    // 2. in a future architecture dataObjects may be far!
    int i ;
    for (i = 0; i <= countDataComponent; i++) {
      if (dataComponent[i].isToSave()) {
          dataComponent[i].saveValue();
      }
    }
  }

  /**
   * Called when component was modified.
   * @param e the component modified event.
   */
  public void ComponentModificationListener(ComponentModifiedEvent e) {
    de.must.io.Logger.getInstance().info(getClass(), "Component modified");
  }

  
  /* (non-Javadoc)
   * @see java.awt.Window#setVisible(boolean)
   */
  public void setVisible(boolean b) {
    int minHeight = 80;
    super.setVisible(true);
    if (b && dynamicScrollPane != null) {
      int newHeight = getSize().height - (int)(currentAttributeList.getMinimumLayoutSize().height * 1.6 /*empirically*/) + dynamicScrollPane.getMinimumSize().height;
      if (newHeight < minHeight) newHeight = minHeight;
      Dimension newDim = new Dimension(dynamicScrollPane.getPreferredSize().width, newHeight);
      dynamicScrollPane.setPreferredSize(newDim);
      dynamicScrollPane.invalidate();
      dynamicScrollPane.validate();
      dynamicScrollPane.repaint();
      invalidate();
      validate();
      repaint();
    }
  }
  
  /**
   * Controls action events like button pressed.
   * @param e the action event to be interpreted
   */
  public void actionPerformed(ActionEvent e) {
    generalActionBeginnung();
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnOk")) {
      okButtonAction();
    } else if (actCommand.equals("BtnCancel")) {
      if (isCancelAllowed()) {
        unlockSublist();
        closeInstance();
        mainDataObject.rollbackIfNotAutoCommit();
        identifiers = null;
      }
    } else if (e.getSource() == btnSubOk) {
      if (checkAndUpdateAll()) {
        if (administrationMode != MODE_PROPERTY) {
          loadValuesAfterId();
        }
        currentSelectionList.loadValue();
        unlockSublist();
        EventQueue.invokeLater(new Runnable() {
          public void run() {
            currentSelectionList.setSelectedIndex(currentSelectionList.getItemCount()-1);
          }
        });
      }
    }
    generalActionEnding();
  }
  
  /**
   * Does all the things necessary when user pushes OK button and returns true if 
   * there was nothing rejected. Returning false means the regular OK button action 
   * has not been done to the end, e.g. because data input has not been accepted. 
   * @return true if there was nothing rejected
   */
  protected boolean okButtonAction() {
    if (checkAndUpdateAll()) {
      unlockSublist();
      if (administrationMode == MODE_NEW && checkRepeatedInput.isSelected()) {
        String infoText;
        recordingAmount++;
        if (recordingAmount == 1) infoText = getTranslation("TEXT_ENTRY_RECORDED");
        else infoText = getTranslation("TEXT_ENTRIES_RECORDED");
        setMessageToKeep(recordingAmount + " " + infoText + ".");
        newInput();
      } else if (!loadValuesConsumeIdentifiers()) {
        closeInstance();
      }
      return true;
    }
    return false;
  }

  private void lockSublist() {
    if (currentSelectionList != null) {
      currentSelectionList.setEnabled(false);
      currentSelectionList.setToolTipText(getTranslation("TEXT_APPLY_CHANGES_FOR_ENABLING_NEW_CHOICE"));
    }
    if (btnSubOk != null) btnSubOk.setEnabled(true);
  }

  private void unlockSublist() {
    if (currentSelectionList != null) {
      currentSelectionList.setEnabled(true);
      currentSelectionList.setToolTipText(getTranslation("TEXT_SUBSELECTION_INFLUENCING_FOLLOWING_FIELDS"));
    }
    if (btnSubOk != null) btnSubOk.setEnabled(false);
  }

  /**
   * Returns true if it is allowed to cancel the dialog.
   * @return true if it is allowed to cancel the dialog
   */
  public boolean isCancelAllowed() {
    recoveredIdentifier = null;
    if (administrationMode == MODE_VIRGIN) return true;
    if (!isVisible()) return true;
    if (!isModified()) return true;
    switch (StandardDialog.saveCancelReturnDecision(this)) {
    case DiSaveCancelReturnD.DECISION_SAVE:
      return okButtonAction();
    case DiSaveCancelReturnD.DECISION_CANCEL:
      generalActionBeginnung();
      return true;
    case DiSaveCancelReturnD.DECISION_RETURN:
      recoveredIdentifier = lastRevisionIdentifier;
      requestFocus();
      return false;
    }
    return true;
  }

  @Override
  public boolean isClosingAllowed(int closeConfirmId) {
    if (closeConfirmId > 0 && closeConfirmId == lastConfirmedId) return true; // already confirmed
    boolean result = isCancelAllowed();
    if (result) lastConfirmedId = closeConfirmId;
    return result;
  }

  private boolean inputCheckOk() {
    inputCheckProcess = true;
    for (int i = 0; i <= countDataComponent; i++) {
      if (!dataComponent[i].isContentValid()) {
        if (mustTabbedPane != null) mustTabbedPane.setSelectedIndex(componentTab[i]);
        dataComponent[i].selectAll();
        dataComponent[i].requestFocus();
        setMessageToKeep(getTranslation("TEXT_FORMALLY_INVALID"));
        inputCheckProcess = false;
        return false;
      }
    }
    for (int i = 0; i <= countDataComponent; i++) {
      if (dataComponent[i].isRequirementUnfulfilled()) {
        if (mustTabbedPane != null) mustTabbedPane.setSelectedIndex(componentTab[i]);
        dataComponent[i].selectAll();
        dataComponent[i].requestFocus();
        setMessageToKeep(getTranslation("TEXT_IS_REQUIRED"));
        inputCheckProcess = false;
        return false;
      }
    }
    boolean result = isInputAccepted();
    inputCheckProcess = false;
    if (result) lastMessage = null;
    return result;
  }

  @Override
  protected void setMessageToKeep(String messageToKeep) {
    if (inputCheckProcess && messageToKeep.equals(lastMessage)) popupMessage(messageToKeep); // maybe user's eye didn't recognize message at status label 
    else super.setMessageToKeep(messageToKeep);
    lastMessage = messageToKeep;
  }

  protected boolean checkAndUpdateAll() {
    if (!inputCheckOk()) return false;
    saveValues();
    dataObjects[0].save(getClass(), DataChangedEvent.SINGLE_TYPE);
    if (dataObjects[0].getLastException() != null) {
      setMessageToKeep(dataObjects[0].getLastException().getMessage());
      return false;
    }
    for (int i = 1; i <= numberOfDataObjects; i++) {
      if (dataObjects[i].isModified()) {
        dataObjects[i].save(getClass(), DataChangedEvent.SINGLE_TYPE); // new and half defined
        if (dataObjects[i].getLastException() != null) {
          setMessageToKeep(dataObjects[i].getLastException().getMessage());
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Returns the identifier of the last modified entry.
   * @return the identifier of the last modified entry
   */
  public Identifier getLastRevisionIdentifier() {
    return lastRevisionIdentifier;
  }

  /**
   * Returns the identifier of the item recovered by user decision.
   * Returns null if nothing was recovered.
   * @return the identifier of the item recovered by user decision
   */
  public Identifier getRecoveredIdentifier() {
    return recoveredIdentifier;
  }

  /**
   * Sets the default values of the components - to be overridden by child if needed.
   */
  protected void setDefaultValues() {
  }

  /**
   * Returns true if input is accepted - to be overridden by child if needed.
   * @return true if input is accepted
   */
  protected boolean isInputAccepted() {
    if (uniqueStringIdentifyDataComponent != null) {
      if (uniqueStringIdentifyDataComponent.getText().trim().equals("")) {
        uniqueStringIdentifyDataComponent.requestFocus();
        setMessageToKeep(getTranslation("TEXT_IS_REQUIRED"));
        return false;
      }
      if (getAdministrationMode() != MODE_PROPERTY && duplicateCheckDataObject != null) {
        if (duplicateCheckDataObject.contains(duplicateCheckDataObject.getUniqueKeyName(), uniqueStringIdentifyDataComponent.getText())) {
          setMessageToKeep(getTranslation("TEXT_ENTRY_ALREADY_EXISTING"));
          return false;
        }
      }
    }
    return true;
  }

  /**
   * @see de.must.wuic.MustFrame#free()
   */
  protected void free() {
    for (int i = 0; i <= countDataComponent; i++) {
      dataComponent[i].free();
    }
    for (int i = 0; i < dataObjects.length; i++) {
      if (dataObjects[i] != null) dataObjects[i].free();
    }
    super.free();
  }
  
}
