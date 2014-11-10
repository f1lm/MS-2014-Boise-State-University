/*
 * Copyright (c) 2004-2010 Christoph Mueller. All rights reserved.
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
import de.must.util.KeyValuePairNum;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.*;

/**
 * Inlay for a container frame to edit data to insert, modify or copy single
 * table rows. Layouts data components with labels attribute lists.
 * @author Christoph Mueller
 */
public class DataPropertyInlay extends PropertyInlay {

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
  
  private int numberOfDataObjects = 0;
  protected DataObject[] dataObjects;
  protected DataObject mainDataObject;
  protected DataObject duplicateCheckDataObject;
  protected DataObject currentDataObject;
  private DataComponent niDataComponent;
  private MustTextField uniqueStringIdentifyDataComponent;
  protected DataComponent[] dataComponent;
  private Vector<DataMultChoice> multChoices = new Vector<DataMultChoice>(1);
  private DataList currentSelectionList;
  private MustButton btnSubOk;
  protected int[] componentTab;
  private boolean automatedHelpContextByColumnName = false;
  private String frameTitleNew = getTranslation("TEXT_NEW_ENTRY");
  private DataTextField[] frameUpdateTitleFields;
  private DataTextField preferredFocusField;
  protected int countDataComponent = -1;
  private JFrame thisFrame;
  private Identifier[] administrationGroup;
  private int admGroupPointer;
  private Identifier lastRevisionIdentifier = null;
  // private ComponentModificationListener[] ModificationWatchedComponents;
  // private int countModificationWatchedComponents = -1;
  protected Vector<DataChangeListener> ownedDataChangeListeners = new Vector<DataChangeListener>();
  protected int recordingAmount;
  protected EvaluationOverflow evaluationOverflow;
  private Identifier recoveredIdentifier;

  public DataPropertyInlay(ContainerFrame ownerFrame) {
    this(ownerFrame, 200);
  }

  /**
   * Constructs a new data property administration frame.
   * @param sizeFactor the number of data components approximately needed
   * - used to build a create a data component array
   */
  public DataPropertyInlay(ContainerFrame ownerFrame, int sizeFactor) {
    super(ownerFrame);
    dataObjects = new DataObject[5];
    dataComponent = new DataComponent[sizeFactor];
    componentTab = new int[sizeFactor];
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
   * Creates a new panel and adds it to the tabbed pane with a list for row subselection.
   * @param tabLabel the label of the new tab
   * @param selectionList the list to select the row membership for the
   * following data components
   * @param lines the number of needed lines
   */
  protected void newPanel(String tabLabel, final DataList selectionList, int lines) {
    currentSelectionList = selectionList;
    tabCount++;
    if (tabCount == 0) {
      mustTabbedPane1 = new MustTabbedPane();
      tabAttributeList = new AttributeList[tabSize];
      add(mustTabbedPane1, BorderLayout.CENTER);
    }
    dataComponent[++countDataComponent] = selectionList;
    selectionList.setDataComponents(dataComponent);
    JSplitPane jSplitPane1 = new JSplitPane(JSplitPane.VERTICAL_SPLIT);
    JScrollPane tempScrollPane1 = new JScrollPane();
    tempScrollPane1.getViewport().add(selectionList);
    jSplitPane1.add(tempScrollPane1, 0);
    tabAttributeList[tabCount] = new AttributeList();
    JScrollPane tempScrollPane2 = new JScrollPane();
    tempScrollPane2.getViewport().add(tabAttributeList[tabCount]);
    jSplitPane1.add(tempScrollPane2, 1);
    mustTabbedPane1.addTab(tabLabel, jSplitPane1);
    currentAttributeList = tabAttributeList[tabCount];
    jSplitPane1.setDividerLocation(70);
    btnSubOk = new MustButton(getTranslation("TEXT_APPLY_BUTTON"));
    btnSubOk.setToolTipText(getTranslation("TEXT_SAVE_AND_KEEP_WINDOW_OPEN"));
    currentAttributeList.append("", btnSubOk);
    unlockSublist();
    btnSubOk.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        if (checkAndUpdateAll()) {
          if (administrationMode != MODE_PROPERTY) {
            loadValuesAfterId();
          }
          currentSelectionList.loadValue();
          unlockSublist();
        }
      }
    });
    MustButton btnSubDel = new MustButton(getTranslation("TEXT_BUTTON_DELETE"));
    append(btnSubDel);
    btnSubDel.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        Identifier identifier = selectionList.getSelectedIdentifier();
        if (!selectionList.getSourceDataObject().isDeletionAllowed(identifier)) {
          setMessageToKeep(getTranslation("TEXT_ENTRY_IS_IN_USE"));
          StandardDialog.presentText(thisFrame, new String[] {
            getTranslation("TEXT_ENTRY_MUST_NOT_BE_DELETED"),
            getTranslation("TEXT_BECAUSE_IT_IS_IN_USE")
          });
          return;
        }
        if (StandardDialog.deletionConfirmed(thisFrame)) {
          lastRevisionIdentifier = identifier;
          selectionList.getSourceDataObject().delete(identifier);
          selectionList.loadValue();
        }
      }
    });
  }

  /**
   * Sets the flag to let context help automatically build by column names of the
   * data components. Help topic must be set previously. Column name is
   * interpreted as help target.
   * @param b whether context help should automaticly be build by column names
   */
  public void setAutomatedHelpContextByColumnName(boolean b) {
    automatedHelpContextByColumnName = b;
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
    mustTabbedPane1.addTab(tabLabel, tempScrollPane1);
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
   * @param assignedAttributeList the attribute list to be filled with the componetns
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
   * @param control whether the postion should be in the same or next line as
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
   * Creates a database connected text input field in a new line with the specified label.
   * @param label the label of the new line
   * @param columnName the name of the column to connect to
   * @return the created database connected text input field
   */
  protected DataTextField createTextField(String label, String columnName) {
    return createTextField(NEW_LINE, label, currentDataObject.getColumnLength(columnName), columnName);
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
    } else {
      temp.getAccessibleContext().setAccessibleName(label);
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
		registerTabIndex(temp);
		addContextHelp(columnName, temp);
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
    temp.getAccessibleContext().setAccessibleName(label);
    JScrollPane tempScrollPane = new JScrollPane();
    tempScrollPane.getViewport().add(temp);
    currentAttributeList.append(label, tempScrollPane);
    registerDataComponent((DataComponent)temp);
    // registerTabIndex(temp);
    addContextHelp(columnName, temp);
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
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    registerTabIndex(temp);
    addContextHelp(columnName, temp);
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
    temp.getAccessibleContext().setAccessibleName(label);
    switch (control) {
    case STAY_IN_LINE:
      currentAttributeList.append(temp);
      break;
    default:
      currentAttributeList.append(label, temp);
      break;
    }
    registerDataComponent((DataComponent)temp);
    registerTabIndex(temp);
    addContextHelp(columnName, temp);
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
    temp.getAccessibleContext().setAccessibleName(label);
    switch (control) {
    case STAY_IN_LINE:
      currentAttributeList.append(temp);
      break;
    default:
      currentAttributeList.append(label, temp);
      break;
    }
    registerDataComponent((DataComponent)temp);
    registerTabIndex(temp);
    addContextHelp(columnName, temp);
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
    temp.getAccessibleContext().setAccessibleName(label);
    switch (control) {
    case STAY_IN_LINE:
      currentAttributeList.append(temp);
      break;
    default:
      currentAttributeList.append(label, temp);
      break;
    }
    registerDataComponent((DataComponent)temp);
    registerTabIndex(temp);
    addContextHelp(columnName, temp);
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
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    registerTabIndex(temp);
    addContextHelp(columnName, temp);
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
    temp.getAccessibleContext().setAccessibleName(label);
    switch (control) {
    case STAY_IN_LINE:
      currentAttributeList.append(temp);
      break;
    default:
      currentAttributeList.append(label, temp);
      break;
    }
    registerDataComponent((DataComponent)temp);
    registerTabIndex(temp);
    addContextHelp(columnName, temp);
    return(temp);
  }

  /**
   * Creates a database connected date field in a new line with the specified label.
   * @param label the label of the new line
   * @param columnNameForCentury the name of the column for century storing
   * @param columnNameForYear the name of the column for year storing
   * @param columnNameForMonth the name of the column for month storing
   * @param columnNameForDay the name of the column for day storing
   * @return the created database connected date field 
   */
  protected DataDateField createDateField(String label, String columnNameForCentury, String columnNameForYear, String columnNameForMonth, String columnNameForDay) {
    return(createDateField(NEW_LINE, label, columnNameForCentury, columnNameForYear, columnNameForMonth, columnNameForDay));
  }

  /**
   * Creates a database connected date field
   * @param control indicates whether the component is to be laid-out in the 
   * same line (<code>{@link #STAY_IN_LINE}</code>)
   * or in a new line (<code>{@link #NEW_LINE}</code>)
   * @param label the label of the new line
   * @param columnNameForCentury the name of the column for century storing
   * @param columnNameForYear the name of the column for year storing
   * @param columnNameForMonth the name of the column for month storing
   * @param columnNameForDay the name of the column for day storing
   * @return the created database connected date field 
   */
  protected DataDateField createDateField(int control, String label, String columnNameForCentury, String columnNameForYear, String columnNameForMonth, String columnNameForDay) {
    DataDateField temp = new SegmentedDataDateField(currentDataObject, columnNameForCentury, columnNameForYear, columnNameForMonth, columnNameForDay);
    temp.getAccessibleContext().setAccessibleName(label);
    switch (control) {
    case STAY_IN_LINE:
      currentAttributeList.append(temp);
      break;
    default:
      currentAttributeList.append(label, temp);
      break;
    }
    registerDataComponent((DataComponent)temp);
    registerTabIndex(temp);
    addContextHelp(columnNameForDay, temp);
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
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    // registerTabIndex(temp);
    // addContextHelp(columnName, temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected variable choice
   * @param label the label of the new line
   * @param content the static conent of the variable choice, a row should contain a key and a description
   * @param columnName the name of the column to connect to
   * @return the created database connected variable choice
   */
  protected DataVariableChoice createChoice(String label, String[][] Content, String columnName) {
    DataVariableChoice temp = new DataVariableChoice(Content, currentDataObject, columnName);
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    // registerTabIndex(temp);
    addContextHelp(columnName, temp);
    return(temp);
  }

  /**
   * Creates a database connected variable choice in the same line
   * @param content the static conent of the variable choice, a row should contain a key and a description
   * @param columnName the name of the column to connect to
   * @return the created database connected variable choice
   */
  protected DataVariableChoice createChoice(String[][] Content, String columnName) {
    DataVariableChoice temp = new DataVariableChoice(Content, currentDataObject, columnName);
    temp.getAccessibleContext().setAccessibleName(columnName);
    currentAttributeList.append(temp);
    registerDataComponent((DataComponent)temp);
    // registerTabIndex(temp);
    addContextHelp(columnName, temp);
    return(temp);
  }

  /**
   * Creates a database connected variable choice
   * @param label the label of the new line
   * @param content the static conent of the variable choice
   * @param columnName the name of the column to connect to
   * @return the created database connected variable choice 
   */
  protected DataVariableChoice createChoice(String label, de.must.util.KeyValuePair[] Content, String columnName) {
    DataVariableChoice temp = new DataVariableChoice(Content, currentDataObject, columnName);
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    // registerTabIndex(temp);
    addContextHelp(columnName, temp);
    return(temp);
  }

  /**
   * Creates a database connected variable choice with numeric key
   * @param label the label of the new line
   * @param content the static conent of the variable choice
   * @param columnName the name of the column to connect to
   * @return the created database connected variable choice 
   */
  protected DataVariableChoiceNumKey createChoice(String label, KeyValuePairNum[] content, String columnName) {
    DataVariableChoiceNumKey temp = new DataVariableChoiceNumKey(content, currentDataObject, columnName);
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    // registerTabIndex(temp);
    addContextHelp(columnName, temp);
    return(temp);
  }

  /**
   * Creates a database connected variable choice with numeric key in the same line.
   * @param content the static conent of the variable choice
   * @param columnName the name of the column to connect to
   * @return the created database connected variable choice 
   */
  protected DataVariableChoiceNumKey createChoice(KeyValuePairNum[] content, String columnName) {
    DataVariableChoiceNumKey temp = new DataVariableChoiceNumKey(content, currentDataObject, columnName);
    temp.getAccessibleContext().setAccessibleName(columnName);
    currentAttributeList.append(temp);
    registerDataComponent((DataComponent)temp);
    // registerTabIndex(temp);
    addContextHelp(columnName, temp);
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
    // registerTabIndex(temp);
    addContextHelp(columnName, temp);
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
    // registerTabIndex(temp);
    addContextHelp(columnName, temp);
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
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    // registerTabIndex(temp);
    addContextHelp(columnName, temp);
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
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    // registerTabIndex(temp);
    addContextHelp(columnName, temp);
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
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    // registerTabIndex(temp);
    addContextHelp(columnName, temp);
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
    temp.getAccessibleContext().setAccessibleName(label);
    currentAttributeList.append(label, temp);
    registerDataComponent((DataComponent)temp);
    // registerTabIndex(temp);
    addContextHelp(columnName, temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  /**
   * Creates a database connected multiple choice in a new line.
   * @param label the label of the new line
   * @param link the data object which represents the relational entity.
   * @param keyColumns the columns to be used to dynamically fill the grid
   * @param keyHeaders the headers of the grid
   * @return the created database connected multiple choice
   */
  protected DataMultChoice createMultChoice(String label, DataObject key, AssoDataObject link, String[] keyColumns, String[] keyHeaders) {
    DataMultChoice temp = new DataMultChoice(currentDataObject, key, link, keyColumns, keyHeaders);
    currentAttributeList.append(label, temp.getTable());
    registerDataComponent((DataComponent)temp);
    // registerTabIndex(temp);
    multChoices.add(temp);
    addContextHelp(label, temp);
    return(temp);
  }

//------------------------------------------------------------------------------

  protected void registerDataComponent(DataComponent nextDataComponent) {
    dataComponent[++countDataComponent] = nextDataComponent;
    componentTab[countDataComponent] = tabCount;
    if (currentSelectionList != null) {
      nextDataComponent.addComponentModificationListener(new ComponentModificationListener() {
        public void componentModified(ComponentModifiedEvent e) {
          // de.must.io.Logger.getInstance().info(getClass(), "PropertyFrame informed about ComponentModification");
          lockSublist();
        }
      });
    }
  }

  private void registerTabIndex(MustTextField temp) {
    if (mustTabbedPane1 != null) {
      temp.setTabbedPaneLocation(mustTabbedPane1, tabCount);
    }
  }

  private void addContextHelp(String columnName, ContextHelp contextHelp) {
    if (automatedHelpContextByColumnName) {
      if (getHelpTopic() != null) {
        contextHelp.setHelpContext(getHelpTopic(), columnName);
      } else {
          de.must.io.Logger.getInstance().info(getClass(), "cannot add context help without help topic");
      } 
    }
  }

  /**
   * Creates a database connected
   * @param columnName the name of the column to connect to
   * @return 
   */
  public int getFieldCreationMode(String columnName) { // to be overridden by child if necessary
    return FIELD_CREATION_MODE_EDIT;
  }

//==============================================================================

  /**
   * Adds a string to the line as previously used.
   * @param infoExtension the information to add
   */
  protected void append(String infoExtension) {
    currentAttributeList.append(infoExtension);
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
   * the administrated entity.
   * @param newNiDataComponent the component which represents the internal number
   */
  protected void setNiDataComponent(DataComponent newNiDataComponent) {
    niDataComponent = newNiDataComponent;
  }

  /**
   * Sets the component which represents the unique identfiier (primary key) of
   * the administrated entity.
   * @param newUniqueStringIdentifyDataComponent the component which represents the unique identfiier
   */
  protected void setUniqueStringIdentifyDataComponent(MustTextField newUniqueStringIdentifyDataComponent) {
    uniqueStringIdentifyDataComponent = newUniqueStringIdentifyDataComponent;
  }

  /**
   * Sets the tool tip text of the last created data component.
   * @param toolTipText the tool tip text of the last created data component
   */
  public void setToolTipText(String toolTipText) {
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
   * Sets the component to to gain focus preferredly.
   * @param newPreferredFocusField the component to to gain focus preferredly
   */
  protected void setPreferredFocusField(DataTextField newPreferredFocusField) {
    preferredFocusField = newPreferredFocusField;
  }

  private void setFocusOnPreferredField() {
    if (preferredFocusField != null) preferredFocusField.requestFocus();
  }

  /**
   * Sets the frame title for using the administration for entering new entries.
   * @param frameTitleNew the frame titel for using the administration entering new entries
   */
  protected void setFrameTitleNew(String frameTitleNew) {
    this.frameTitleNew = frameTitleNew;
  }

  /**
   * Sets the frame title for using the administration for updating entries.
   * @param newFrameUpdateTitleField the field to be used to build the titel
   * for using the administration for updating entries
   */
  protected void setFrameUpdateTitleField(DataTextField newFrameUpdateTitleField) {
    this.frameUpdateTitleFields = new DataTextField[] {newFrameUpdateTitleField};
  }

  /**
   * Sets the frame title for using the administration for updating entries.
   * @param newFrameUpdateTitleFields the fields to be used to build the titel
   * for using the administration for updating entries
   */
  protected void setFrameUpdateTitleField(DataTextField[] newFrameUpdateTitleFields) {
    this.frameUpdateTitleFields = newFrameUpdateTitleFields;
  }

  /**
   * Returns the administration group.
   * @return the administration group
   */
  public Identifier[] getAdministrationGroup() {
    return administrationGroup;
  }

  /**
   * Sets the administration group in order to allow multiple administration
   * steps without switching to data selection mode.
   * @param administrationGroup The administration group to set
   */
  public void setAdministrationGroup(Identifier[] administrationGroup) {
    this.administrationGroup = administrationGroup;
    admGroupPointer = 0;
    for (int i= 0; i < administrationGroup.length; i++) {
      if (administrationGroup[i].equals(mainDataObject.getIdentifier())) {
        admGroupPointer = i;
        break;
      }
    }
    direction.setSelectedIndex(0);
    direction.setVisible(true);
  }

  /**
   * Sets the administration group in order to allow multiple administration
   * steps without switching to data selection mode.
   * @param administrationGroup The administration group to set
   */
  public void resetAdministrationGroup() {
    this.administrationGroup = null;
    admGroupPointer = 0;
    direction.setVisible(false);
  }

  /**
   * Is called when newInput, load or copy dialog is prepared.
   * May be used to control focus e.g.
   * @see #getAdministrationMode
   */
  protected void dialogPrepared() {
    if (getAdministrationMode() != MODE_PROPERTY) {
      setFocusOnPreferredField();
    }
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
    setVisible(true);
    administrationMode = MODE_NEW;
    checkRepeatedInput.setVisible(true);
    if (uniqueStringIdentifyDataComponent != null) uniqueStringIdentifyDataComponent.setEditable(true);
    if (tabCount >= 0) mustTabbedPane1.setSelectedIndex(0);
    for (int i = 0; i <= numberOfDataObjects; i++) {
      dataObjects[i].newRow();
    }
    lastRevisionIdentifier = mainDataObject.allocateNewIdentifier();
    loadValues();
    setDefaultValues();
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
  protected void setEtitable(boolean editable) {
    for (int i = 0; i <= countDataComponent; i++) {
      dataComponent[i].setEditable(editable);
    }
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

  /**
   * Loads the specified entry and fills all DataComponent objects with
   * the current values to edit them.
   * @param identification the unique identify value of the entry.
   */
  public void loadValues(Identifier identifier) {
    mainDataObject.setIdentifier(identifier);
    lastRevisionIdentifier = identifier;
    loadValuesAfterId();
  }

  private void loadValuesAfterId() {
    administrationMode = MODE_PROPERTY;
    checkRepeatedInput.setVisible(false);
    if (uniqueStringIdentifyDataComponent != null) uniqueStringIdentifyDataComponent.setEditable(false);
    mainDataObject.load();
    if (numberOfDataObjects > 0) loadSecondaryDataObject();
    if (numberOfDataObjects > 1) loadThirdDataObject();
    loadValues();
    dialogPrepared();
  }

  /**
   * Loads the specified entry and fills all DataComponent objects with
   * the current values to offer them for inserting a new entry.
   * @param identifyValue the unique identify value of the entry.
   */
  public void copy(int identifyValue) {
    copy(new Identifier(identifyValue));
  }

  /**
   * Loads the specified entry and fills all DataComponent objects with
   * the current values to offer them for inserting a new entry.
   * @param identification the unique identify value of the entry.
   */
  public void copy(Identifier identifier) {
    mainDataObject.setIdentifier(identifier);
    copyAfterId();
  }

  private void copyAfterId() {
    administrationMode = MODE_COPY;
    checkRepeatedInput.setVisible(false);
    if (uniqueStringIdentifyDataComponent != null) uniqueStringIdentifyDataComponent.setEditable(true);
    mainDataObject.load();
    loadValues();
    mainDataObject.newRow();
    lastRevisionIdentifier = mainDataObject.allocateNewIdentifier();
    for (int i = 1; i <= numberOfDataObjects; i++) {
      dataObjects[i].newRow();
    }
    // tell the multiple choice models that the original is no longer relevant and that a new identifier came
    Iterator<DataMultChoice> multChoicesIterator = multChoices.iterator();
    while (multChoicesIterator.hasNext()) {
      DataMultChoice multChoice = multChoicesIterator.next();
      multChoice.setCopyModeAndNewRootIdentifier(lastRevisionIdentifier);
    }
    if (niDataComponent != null) niDataComponent.loadValue();
    dialogPrepared();
  }

  /**
   * Returns the description of the administrated entry.
   * @return the description of the administrated entry
   */
  protected String getEntryDescription() {
    String title = "";
    if (frameUpdateTitleFields != null) {
      int i;
      for (i = 0; i < frameUpdateTitleFields.length; i++) {
        title += frameUpdateTitleFields[i].getText() + " ";
      }
    }
    return title;
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

  private void loadValues() {
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
    de.must.io.Logger.getInstance().info(getClass(), temp.getClass().getName() + " was modified, it is component " + i);
    componentTypeIdentified = true;
    } catch(Exception e) {}
    try {
    DataTextCheck temp = (DataTextCheck)dataComponent[i];
    de.must.io.Logger.getInstance().info(getClass(), temp.getClass().getName() + " was modified, it is component " + i);
    componentTypeIdentified = true;
    } catch(Exception e) {}
    try {
    DataCheckBox temp = (DataCheckBox)dataComponent[i];
    de.must.io.Logger.getInstance().info(getClass(), temp.getClass().getName() + " was modified, it is component " + i);
    componentTypeIdentified = true;
    } catch(Exception e) {}
    try {
    DataVariableChoiceNumKey temp = (DataVariableChoiceNumKey)dataComponent[i];
    de.must.io.Logger.getInstance().info(getClass(), temp.getSelectedItem() + " " + temp.getClass().getName() + " was modified, it is component " + i);
    componentTypeIdentified = true;
    } catch(Exception e) {}
    if (!componentTypeIdentified) de.must.io.Logger.getInstance().info(getClass(), "component Nbr. " + i + " was modified");
  }

  /**
   * Saves the edited entry. Insert or update cases are treated automatically.
   */
  protected void saveValues() {
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
    // 2. in a future arcitecture dataObjects may be far!
    int i ;
    for (i = 0; i <= countDataComponent; i++) {
      if (dataComponent[i].isModified()) {
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

  /**
   * Controls action events like butten pressed.
   * @param e the action event to be interpreted
   */
  public void actionPerformed(ActionEvent e) {
    ownerFrame.generalActionBeginnung();
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnOk")) {
      okButtonAction();
    }
    if (actCommand.equals("BtnCancel")) {
      if (isCancelAllowed()) {
        unlockSublist();
        mainDataObject.rollbackIfNotAutoCommit();
        resetAdministrationGroup();
      }
    }
    ownerFrame.generalActionEnding();
  }
  
  public void okButtonAction() {
    if (checkAndUpdateAll()) {
      unlockSublist();
      if (administrationMode == MODE_NEW && checkRepeatedInput.isSelected()) {
        String infoText;
        recordingAmount++;
        if (recordingAmount == 1) infoText = getTranslation("TEXT_ENTRY_RECORDED");
        else infoText = getTranslation("TEXT_ENTRIES_RECORDED");
        setMessageToKeep(recordingAmount + " " + infoText + ".");
        newInput();
      } else if (administrationGroup != null) {
          if (direction.getSelectedIndex() == 0 && admGroupPointer < administrationGroup.length-1) {
            admGroupPointer++;
            loadValues(administrationGroup[admGroupPointer]);
          } else if (direction.getSelectedIndex() == 1 && admGroupPointer > 0) {
            admGroupPointer--;
            loadValues(administrationGroup[admGroupPointer]);
          }
      }
    }
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
    // if (!StandardDialog.cancelConfirmed(ownerFrame)) return false;
    switch (StandardDialog.saveCancelReturnDecision(ownerFrame)) {
    case DiSaveCancelReturnD.DECISION_SAVE:
      okButtonAction();
      return true;
    case DiSaveCancelReturnD.DECISION_CANCEL:
      return true;
     case DiSaveCancelReturnD.DECISION_RETURN:
       recoveredIdentifier = lastRevisionIdentifier;
       requestFocus();
       return false;
    }
    return true;
  }
  
  public void setRecoveredIdentifierToLastRevsionIdentifier() {
    recoveredIdentifier = lastRevisionIdentifier;
  }

  /**
   * Returns true if it is allowed to close the dialog.
   * @return true if it is allowed to close the dialog
   */
  public boolean isClosingAllowed() {
    return isCancelAllowed();
  }

  private boolean inputCheckOk() {
    for (int i = 0; i <= countDataComponent; i++) {
      if (!dataComponent[i].isContentValid()) {
        if (mustTabbedPane1 != null) mustTabbedPane1.setSelectedIndex(componentTab[i]);
        dataComponent[i].selectAll();
        dataComponent[i].requestFocus();
        setMessageToKeep(getTranslation("TEXT_FORMALLY_INVALID"));
        return false;
      }
    }
    for (int i = 0; i <= countDataComponent; i++) {
      if (dataComponent[i].isRequirementUnfulfilled()) {
        if (mustTabbedPane1 != null) mustTabbedPane1.setSelectedIndex(componentTab[i]);
        dataComponent[i].selectAll();
        dataComponent[i].requestFocus();
        setMessageToKeep(getTranslation("TEXT_IS_REQUIRED"));
        return false;
      }
    }
    return isInputAccepted();
  }

  private boolean checkAndUpdateAll() {
    if (!inputCheckOk()) return false;
    saveValues();
    dataObjects[0].save(this.getClass(), DataChangedEvent.SINGLE_TYPE);
    for (int i = 1; i <= numberOfDataObjects; i++) {
      if (dataObjects[i].isModified()) {
        dataObjects[i].save(this.getClass(), DataChangedEvent.SINGLE_TYPE); // new and half defined
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
   * Returns the identifier of the item recoverd by user decision.
   * Returns null if nothing was recovered.
   * @return the identifier of the item recoverd by user decision
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
    for (int i = 0; i <= countDataComponent; i++) {
      if (!dataComponent[i].isContentValid()) {
        if (mustTabbedPane1 != null) mustTabbedPane1.setSelectedIndex(componentTab[i]);
        dataComponent[i].selectAll();
        dataComponent[i].requestFocus();
        setMessageToKeep(getTranslation("TEXT_FORMALLY_INVALID"));
        return false;
      }
    }
    for (int i = 0; i <= countDataComponent; i++) {
      if (dataComponent[i].isRequirementUnfulfilled()) {
        if (mustTabbedPane1 != null) mustTabbedPane1.setSelectedIndex(componentTab[i]);
        dataComponent[i].selectAll();
        dataComponent[i].requestFocus();
        setMessageToKeep(getTranslation("TEXT_IS_REQUIRED"));
        return false;
      }
    }
    return true;
  }
  
  /**
   * Requests the focus to the component and ensures the component is visible
   * by switching to the appropriate tab
	 * @param component the component to receive the focus
	 */
	public void setFocusOn(JComponent component) {
    for (int i = 0; i <= countDataComponent; i++) {
      if (dataComponent[i].equals(component)) {
        mustTabbedPane1.setSelectedIndex(componentTab[i]);
      }
    }
    component.requestFocus();
  }

  /**
   * @see de.must.wuic.MustFrame#free()
   */
  protected void free() {
    for (int i = 0; i <= countDataComponent; i++) {
      dataComponent[i].free();
    }
    // super.free();
  }
  
}
