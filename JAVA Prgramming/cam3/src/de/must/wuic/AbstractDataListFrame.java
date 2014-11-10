/*
 * Copyright (c) 1999-2014 Christoph Mueller. All rights reserved.
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
import de.must.middle.EntitlementStd;
import de.must.middle.MessageReceiver;
import de.must.print.*;
import de.must.util.Callback;
import de.must.util.SearchItem;

import javax.swing.*;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

import java.awt.*;
import java.awt.event.*;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.StringTokenizer;
import java.util.Vector;

/**
 * Frame for database inquiry, data overview and record selection.
 * In the first step, data for the inquiry is entered. Pressing the list button
 * starts the inquiry and fills the list with the results. After selecting a
 * single entry, function like editing among others are available.
 * It's common to use it via subclasses {@link SimpleDataListFrame} and
 * {@link ColumnDataListFrame}.
 * @author Christoph Mueller
 */
public abstract class AbstractDataListFrame extends MustFrame implements ActionListener, DataChangeListener, Runnable, MessageReceiver {

  public static final int LIST_MODIFICATION_APPEND = 0;
  public static final int LIST_MODIFICATION_UPDATE = 1;
  public static final int LIST_MODIFICATION_REMOVE = 2;
  
  /** The list thread is reset, know rows available */
  public static final int THREAD_MODE_RESET = -1;
  /** The thread runs for initial fill */
  public static final int THREAD_MODE_FILL = 0;
  /** The thread runs to extend list */
  public static final int THREAD_MODE_EXTEND = 1;

  /** There is no refresh running */
  public static final int LIST_REFRESH_OFF = 0;
  /** Current list is suspended (incompletely loaded) */
  public static final int LIST_REFRESH_SUSPENDED = 1;
  /** The refresh is currently proceeding */
  public static final int LIST_REFRESH_PROCEEDING = 2;
  
  private boolean editable = true;
  protected int listModification = LIST_MODIFICATION_UPDATE;
  protected final JFrame rootFrame = this;
  private int initialXLocation = 0;
  private int initialYLocation = 100;
  protected DataPropertyAdministration associatedPropertyAdministration;
  protected DataObject listDataObject;
  protected Thread listThread;
  protected int threadMode;
  private Point viewPositionBeforeListExtension;
  private int listThreadPriority = -1;
  private boolean autoInitialListFill = true;
  protected boolean listIsToRefresh = false;
  protected int listRefreshState = LIST_REFRESH_OFF;
  protected static int maxListEntries = 500;
  protected int currentMaxListEntries;
  protected boolean refreshCausedByListButton = false;
  protected int listIndex;
  protected JPanel panelTop = new JPanel();
  protected MustTabbedPane mustTabbedPane1;
  protected JScrollPane listScrollPane;
  private int tabSize = 5;
  protected int tabCount = -1;
  private int expertSearchTab = -1;
  protected JSplitPane jSplitPane1 = new JSplitPane(JSplitPane.VERTICAL_SPLIT);
  protected AttributeList[] tabAttributeList;
  protected AttributeList currentAttributeList;
  protected JPanel panelSelectButtons = new JPanel();
  protected JPanel panelBottom = new JPanel();
  protected JPanel panelButtons = new JPanel();
  protected MustButton buttonList = new MustButton(getTranslation("TEXT_LIST_BUTTON"), "BtnList", this);
  protected MustButton buttonNew = new MustButton(getTranslation("TEXT_NEW_ENTRY"), "BtnNew", this);
  protected MustStatusLabel statusLabel = new MustStatusLabel();
  protected MustButton buttonPresent;
  protected MustButton buttonChoose;
  protected MustButton buttonProperties;
  protected MustButton buttonCopy;
  protected MustButton buttonPrint;
  protected MustButton buttonDelete;
  protected MustButton buttonClose;
  protected MustTextField globalSearchTextField;
  protected RadioButtonPanel searchCombination;
  protected RadioButtonPanel logic;
  protected Vector<SearchElement> searchElements;
  protected MustTextArea expertSearchTextArea;
  protected DataPropertyPrint printInstance;
  protected DataPresentation presentationInstance;
  protected Identifier lastSelectionIdentifier;
  protected InquiryHistory inquiryHistory;

  /**
   * Constructs a new frame for selecting data.
   * @param ownerFrame the frame form where this frame is called
   */
  public AbstractDataListFrame(Frame ownerFrame) {
    super();
    if (ownerFrame == null) this.ownerFrame = MainStd.getMainFrame();
    else this.ownerFrame = ownerFrame;
    if (this.ownerFrame != null) {
      this.ownerFrame.setCursor(WaitCursor);
    }
    try {
      initAbstractDataListFrame();
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
  }

  private void initAbstractDataListFrame() throws Exception{
    setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE); // to consider the isClosingAllowed() aspect
    // icon source http://java.sun.com/developer/techDocs/hi/repository/TBG_General.html
    if (getPresentationClass() != null) buttonPresent = createButton("Properties24.gif", "Pr", getTranslation("TEXT_PRESENTS_SELECTED_ENTRY"), "BtnPresent");
    buttonProperties = createButton("Edit24.gif", "Pr", getTranslation("TEXT_PROPERTIES"), "BtnProp");
    buttonChoose = new MustButton(getTranslation("TEXT_CHOOSE_BUTTON"), getTranslation("TEXT_CHOOSES_SELECTED_ENTRY"), "BtnChoose", this);
    buttonChoose.setVisible(false);
    buttonCopy = createButton("Copy24.gif", "Co", getTranslation("TEXT_COPIES_SELECTED_ENTRY"), "BtnCopy");
    buttonPrint = createButton("Print24.gif", "Pri", getTranslation("TEXT_PRINTS_SELECTED_ENTRY"), "BtnPrint");
    buttonDelete = createButton("Remove24.gif", "D", getTranslation("TEXT_DELETES_SELECTED_ENTRY"), "BtnDel");
    buttonClose = createButton("close.gif", "Cl", getTranslation("TEXT_CLOSES_THIS_WINDOW"), "BtnClose");
    initialXLocation = getLocation().x; // due to task panel on the left side of the screen, initial x location may be greater 0
    if (MainStd.getMainFrame() != null) {
      if (MainStd.getMainFrame().getSize().height > 200) {
        initialYLocation = 200;
      } else {
        initialYLocation = MainStd.getMainFrame().getSize().height;
      }
    }
    if (!isLaidOut()) setSize(new java.awt.Dimension(400, 600));

    panelSelectButtons.add(buttonList);
    inquiryHistory = new InquiryHistory(getLocale(), new Callback() {
      public void callback() {
        ListButtonAction();
      }
    });
    panelSelectButtons.add(inquiryHistory.getUI());
    if (isModificationAllowed()){
      panelSelectButtons.add(buttonNew);
    }

    panelTop.setLayout(new java.awt.BorderLayout());
    panelTop.add(panelSelectButtons, java.awt.BorderLayout.SOUTH);
    jSplitPane1.add(panelTop, 0);

    if (getPresentationClass() != null) panelButtons.add(buttonPresent);
    panelButtons.add(buttonChoose);
    if (isModificationAllowed()) panelButtons.add(buttonProperties);
    if (isModificationAllowed()) panelButtons.add(buttonCopy);
    if (isModificationAllowed()) panelButtons.add(buttonDelete);
    if (getPrintClass() != null) panelButtons.add(buttonPrint);
    panelButtons.add(buttonClose);

    panelBottom.setLayout(new java.awt.BorderLayout());
    panelBottom.add(panelButtons, java.awt.BorderLayout.CENTER);
    panelBottom.add(statusLabel, java.awt.BorderLayout.SOUTH);

    ShortCutStd.addInterpreter(this);
    buttonList.setToolTipText(getTranslation("TEXT_FILLS_LIST_ACCORDING_SELECTION"));
    listScrollPane = new JScrollPane();
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
                  && listRefreshState == LIST_REFRESH_SUSPENDED
                  && threadMode != THREAD_MODE_RESET
              ) {
                extendList();
              }
            }
          }
        });
      }
    });
    addComponentListener(new ComponentListener() {
      public void componentShown(ComponentEvent e) {
      }
      public void componentResized(ComponentEvent e) {
        jSplitPane1.resetToPreferredSizes();
      }
      public void componentMoved(ComponentEvent e) {
      }
      public void componentHidden(ComponentEvent e) {
      }
    });
  }

  protected MustButton createButton(String imageName, String defaultLabel, String toolTipText) {
    return createButton(imageName, defaultLabel, toolTipText, null);
  }

  private MustButton createButton(String imageName, String defaultLabel, String toolTipText, String actionName) {
    return MustButton.create(imageName, defaultLabel, toolTipText, actionName, this);
  }

  /**
   * Appends the passed button to the current AttributeList.
   * @param button  the button to add
   */
  protected void append(MustButton button) {
    currentAttributeList.append(button);
  }

  /**
   * Conclusion of the construction process. Allows to do construction details
   * in the sequence super class - this - super class which is a benefit for
   * easy layout.
   */
  protected void creationEnding() {
    getContentPane().add(jSplitPane1);
    getContentPane().add(panelBottom, java.awt.BorderLayout.SOUTH);
    if (associatedPropertyAdministration != null) buttonNew.setText(associatedPropertyAdministration.getFrameTitleNew());
    getRootPane().setDefaultButton(buttonList);
    if (!isLaidOut()) {
      setLocation(initialXLocation, initialYLocation);
    }
    packIfNotLaidOut();
    if (ownerFrame != null) {
      ownerFrame.setCursor(DefaultCursor);
    }
    if (autoInitialListFill) refreshList();
    else statusLabel.setRemainStatus(getTranslation("TEXT_REDUCE_SELECTION_BEFORE_LISTING"));

    if (expertSearchTextArea != null) expertSearchTextArea.getRightMouseProvider().addItem(expertSearchTextArea.getRightMouseProvider().new AdditionalItem(getTranslation("TEXT_GENERATE_WHERE_CONDITON"), new Callback() {
      @Override
      public void callback() {
        expertSearchTextArea.setText(getPrivateWhereConditionNotExpert());
      }
    })); 

    setEditable(GlobalInWuicStd.entitlement == null || GlobalInWuicStd.entitlement.isEditable(getTerritory()));
    generalActionEnding();
    (new InitialThread()).start();
  }

  /**
   * Returns the territory of this function. Override this method if it differs from standard territory.
   * @return the territory of this function
   */
  protected String getTerritory() {
    return EntitlementStd.TERRITORY_STANDARD;
  }

  protected void setEditable(boolean editable) {
    this.editable = editable;
    buttonNew.setVisible(editable);
    buttonProperties.setVisible(editable);
    buttonCopy.setVisible(editable);
    buttonDelete.setVisible(editable);
  }

  protected boolean isEditable() {
    return editable;
  }
  
  /**
   * Returns the initial horizontal location.
   * @return the initial horizontal location
   */
  protected int getInitialXLocation() {
    return initialXLocation;
  }

  /**
   * Sets the initial horizontal location.
   * @param newInitialXLocation the new initial horizontal location
   */
  protected void setInitialXLocation(int newInitialXLocation) {
    initialXLocation = newInitialXLocation;
  }

  /**
   * Returns the initial vertical location.
   * @return the initial vertical location
   */
  protected int getInitialYLocation() {
    return initialYLocation;
  }

  /**
   * Sets the initial vertical location.
   * @param newInitialYLocation the new initial vertical location
   */
  protected void setInitialYLocation(int newInitialYLocation) {
    initialYLocation = newInitialYLocation;
  }

  /**
   * Sets the limit of entries to be displayed in the list.
   * @param newMaxListEntries the limit of entries to be displayed in the list
   */
  public static void setMaxListEntries(int newMaxListEntries) {
    maxListEntries = newMaxListEntries;
    if (maxListEntries == 0) maxListEntries = Integer.MAX_VALUE;
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
   * Sets the associated property administration. This is the suitable instance
   * to edit details of an entry selected in this list.
   * @param associatedPropertyAdministration the associated property administration
   */
  protected void setAssociatedPropertyAdministration(DataPropertyAdministration associatedPropertyAdministration) {
    this.associatedPropertyAdministration = associatedPropertyAdministration;
  }

  /**
   * Sets the associated property administration class. This is the suitable class
   * to edit details of an entry selected in this list.
   * @param associatedPropertyAdministrationClass  the associated property administration class
   */
  protected void setAssociatedPropertyAdministration(Class<? extends DataPropertyAdministration> associatedPropertyAdministrationClass) {
    this.associatedPropertyAdministration = (DataPropertyAdministration)DataPropertyAdministration.getOrCreateMainInstance(associatedPropertyAdministrationClass, this);
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
   * Packs the frame if it isn't already laid-out by user.
   */
  protected void packIfNotLaidOut() {
    if (!isLaidOut()) {
      pack();
      // workaround for SplitPane and List:
      setSize(new Dimension(getSize().width, getSize().height + 80));
    }
  }

  /**
   * Returns the list modification case which may be
   * <code>{@link #LIST_MODIFICATION_APPEND}</code>,
   * <code>{@link #LIST_MODIFICATION_UPDATE}</code> or
   * <code>{@link #LIST_MODIFICATION_REMOVE}</code>
   * @return the list modification case
   */
  protected int getListModification() {
    return listModification;
  }

  /**
   * Creates a new panel with an attribute list.
   * @param lines not needed any more
   * @deprecated use newPanel() without lines
   */
  protected void newPanel(int lines) {
    newPanel();
  }
  
  /**
   * Creates a new panel and adds it to the tabbed pane with a list for row subselection.
   */
  protected void newPanel() {
    currentAttributeList = new AttributeList();
    JScrollPane tempScrollPane = new JScrollPane();
    tempScrollPane.getViewport().setView(currentAttributeList);
    panelTop.add(tempScrollPane, java.awt.BorderLayout.CENTER);  // Java seems to dislike non-centered Tab-JPanels
  }

  /**
   * Creates a new panel with an attribute list.
   * @param lines not needed any more
   * @deprecated use newPanel(tabLabel) without lines
   */
  protected void newPanel(String tabLabel, int lines) {
    newPanel(tabLabel);
  }
  
  /**
   * Creates a new panel and adds it to the tabbed pane with a list for row subselection.
   * @param tabLabel the label of the new tab
   */
  protected void newPanel(String tabLabel) {
    tabCount++;
    if (tabCount == 0) {
      mustTabbedPane1 = new MustTabbedPane();
      mustTabbedPane1.setMinimumSize(new java.awt.Dimension(0, 100));
      tabAttributeList = new AttributeList[tabSize];
      panelTop.add(mustTabbedPane1, java.awt.BorderLayout.CENTER);  // Java seems to dislike non-centered Tab-JPanels
    }
    JScrollPane tempScrollPane = new JScrollPane();
    tabAttributeList[tabCount] = new AttributeList();
    tempScrollPane.getViewport().add(tabAttributeList[tabCount]);
    mustTabbedPane1.addTab(tabLabel, tempScrollPane);
    currentAttributeList = tabAttributeList[tabCount];
  }

  protected void newDynamicSearchPanel(String tabLabel, int elementAmount, SearchItem[] columns) {
    newPanel(tabLabel);
    searchElements = new Vector<SearchElement>();
    for (int i = 0; i < elementAmount; i++) {
      SearchElement searchElement = new SearchElement(columns, this, listDataObject, i);
      searchElements.add(searchElement);
      searchElement.addTo(currentAttributeList);
      addFocusListenerForDefaultButton(searchElement.getValueField());
      searchElement.register(inquiryHistory);
      searchElement.setSelectedIndex(i);
    }
    logic = new RadioButtonPanel(
      new String[] {"A", "O"}, new String[] {
        getTranslation("TEXT_AND_BEFORE_OR"),
        getTranslation("TEXT_OR_BEFORE_AND"),
      }
    );
    logic.setSelectedItem(0);
    currentAttributeList.append("", getTranslation("TEXT_COMBINATION") + ": ");
    currentAttributeList.append(logic);
  }

  /**
   * Adds an expert search panel to the tabbed pane.
   * @param tabLabel the label of the new expert search tab
   */
  protected void newPanelWithExpertSearchTextArea(String tabLabel) {
    expertSearchTextArea = new MustTextArea(40, 10, 1000);
    newPanel(tabLabel, expertSearchTextArea);  expertSearchTab = tabCount;
    // the first tab is most important, it should determine height of the query split pane:
    mustTabbedPane1.setPreferredSize(new Dimension(tabAttributeList[0].getPreferredSize().width, tabAttributeList[0].getPreferredSize().height + 40));
  }

  private void newPanel(String tabLabel, MustTextArea centerTextArea) {
    tabCount++;
    JScrollPane tempScrollPane = new JScrollPane();
    tempScrollPane.getViewport().add(centerTextArea);
    mustTabbedPane1.addTab(tabLabel, tempScrollPane);
    addFocusListenerForDefaultButton(centerTextArea);
  }

  /**
   * Adds a panel with multiple choice selection.
   * @param tabLabel the label of the new tab
   * @param multChoice multiple choice to be presented
   * @param preferedSize the preferred size of the scrollpane
   */
  protected void newPanel(String tabLabel, MustMultChoice multChoice, Dimension preferedSize) {
    tabCount++;
    JScrollPane tempScrollPane1 = new JScrollPane();
    tempScrollPane1.setPreferredSize(preferedSize);
    tempScrollPane1.getViewport().add(multChoice.getTable());
    mustTabbedPane1.addTab(tabLabel, tempScrollPane1);
  }

  /**
   * Creates a combo box in the same line as previously used.
   * @param dataLabel the line label.
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @return the created combo box
   */
  protected HalfDataComboBox createComboBox(String dataLabel, DataObject sourceDataObject, String visibleColumn) {
    return createComboBox(dataLabel, sourceDataObject, visibleColumn, null, getTranslation("TEXT_ALL_WITH_BRACKETS"));
  }

  /**
   * Creates a combo box in the same line as previously used.
   * @param dataLabel the line label.
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @param orderByColumn the column to be ordered by
   * @return the created combo box
   */
  protected HalfDataComboBox createComboBox(String dataLabel, DataObject sourceDataObject, String visibleColumn, String orderByColumn) {
    return createComboBox(dataLabel, sourceDataObject, visibleColumn, orderByColumn, getTranslation("TEXT_ALL_WITH_BRACKETS"));
  }

  /**
   * Creates a combo box in the same line as previously used.
   * @param dataLabel the line label.
   * @param sourceDataObject the source data object that shall fill the content of the combo box
   * @param visibleColumn the column to be used to fill the combo box from the source data object
   * @param orderByColumn the column to be ordered by
   * @param nameForNoChoice the expression to be used to indicate "no choice"
   * @return the created combo box
   */
  protected HalfDataComboBox createComboBox(String dataLabel, DataObject sourceDataObject, String visibleColumn, String orderByColumn, String nameForNoChoice) {
    HalfDataComboBox temp = new HalfDataComboBox(sourceDataObject, visibleColumn, orderByColumn, nameForNoChoice, -1);
    currentAttributeList.append(dataLabel, temp);
    addFocusListenerForDefaultButton(temp);
    inquiryHistory.register(temp);
    return temp;
  }

  /**
   * Creates a new variable choice with static content.
   * @param dataLabel the line label.
   * @param content the static content as a key / value table
   * @return the created variable choice
   */
  protected VariableChoice createVariableChoice(String dataLabel, String[][] content) {
    return createVariableChoice(dataLabel, content, true);
  }

  /**
   * Creates a new variable choice with static content.
   * @param dataLabel the line label.
   * @param content the static content as a key / value table
   * @param noChoicePossible if true, an item is offered which represents the "no choice"
   * @return the created variable choice
   */
  protected VariableChoice createVariableChoice(String dataLabel, String[][] content, boolean noChoicePossible) {
    return createVariableChoice(dataLabel, content, noChoicePossible, false);
  }

  /**
   * Creates a new variable choice with static content.
   * @param dataLabel the line label.
   * @param content the static content as a key / value table
   * @param noChoicePossible if true, an item is offered which represents the "no choice"
   * @param suppressKey whether or not keys should be suppressed in ComboBox
   * @return the created variable choice
   */
  protected VariableChoice createVariableChoice(String dataLabel, String[][] content, boolean noChoicePossible, boolean suppressKey) {
    VariableChoice temp = new VariableChoice(content, noChoicePossible, getTranslation("TEXT_ALL_WITH_BRACKETS"), suppressKey);
    currentAttributeList.append(dataLabel, temp);
    addFocusListenerForDefaultButton(temp);
    inquiryHistory.register(temp);
    return temp;
  }

  /**
   * Constructs an new variable choice with the specified content.
   * @param dataLabel the line label.
   * @param keyValuePairs the content as an array of key value pairs
   * @return the created variable choice
   */
  protected VariableChoice createVariableChoice(String dataLabel, de.must.util.KeyValuePair[] keyValuePairs) {
    VariableChoice temp = new VariableChoice(keyValuePairs, true);
    currentAttributeList.append(dataLabel, temp);
    addFocusListenerForDefaultButton(temp);
    inquiryHistory.register(temp);
    return temp;
  }

  /**
   * Creates a new text field for global search.
   * @param label the line label
   * @param length the length of the global search text field
   */
  protected void createTextFieldForGlobalSearch(String label, int length) {
    createTextFieldForGlobalSearch(label, length, false);
  }

  /**
   * Creates a new text field for global search.
   * @param label the line label
   * @param length the length of the global search text field
   * @param chooseAndOr whether or not user can choose AND or OR - caution: query could become to complex for some databases!
   */
  protected void createTextFieldForGlobalSearch(String label, int length, boolean chooseAndOr) {
    globalSearchTextField = createTextField(label, length);
    searchCombination = new RadioButtonPanel(
      new String[] {"A", "O"}, new String[] {
        getTranslation("TEXT_AND"),
        getTranslation("TEXT_OR"),
      }
    );
    searchCombination.setSelectedItem(0);
    currentAttributeList.append(searchCombination);
    searchCombination.setVisible(chooseAndOr);
  }

  /**
   * Creates a new text field.
   * @param label the line label
   * @param length the length of the text field
   * @return the created text field
   */
  protected MustTextField createTextField(String label, int length) {
    MustTextField temp = new MustTextField(length);
    currentAttributeList.append(label, temp);
    addFocusListenerForDefaultButton(temp);
    inquiryHistory.register(temp);
    return temp;
  }

  /**
   * Creates a new text field.
   * @param label the line label
   * @param length the length of the text field
   * @param choiceContentDo the data object containing valid choice values 
   * @param sourceColumnName  the name of the column containing the valid items
   * @return the created text field
   */
  protected MustTextField createTextField(String label, int length, DataObject choiceContentDo, String columnName) {
    MustTextField result = createTextField(label, length);
    new ChoiceManagerByDataObject(result, choiceContentDo, columnName);
    return result;
  }
  
  /**
   * Creates a text input field in the same line as previously used.
   * @param length the length of the field
   * @return the created text input field
   */
  protected MustTextField createTextField(int length) {
    MustTextField temp = new MustTextField(length);
    currentAttributeList.append(temp);
    addFocusListenerForDefaultButton(temp);
    inquiryHistory.register(temp);
    return temp;
  }
  
  protected RadioButtonPanel createFragmentExactChoice() {
    RadioButtonPanel result = new RadioButtonPanel(
      new String[] {"F", "W", "E"}, new String[] {
        getTranslation("TEXT_FRAGMENT"),
        getTranslation("TEXT_WORD"),
        getTranslation("TEXT_EXACT"),
      }
    );
    result.setSelectedItem(0);
    currentAttributeList.append(result);
    inquiryHistory.register(result);
    return result;
  }

  /**
   * Creates a date input field in a new line.
   * @param label the line label
   * @return the created date input field
   */
  protected MustDateField createDateField(String label) {
    MustDateField temp = new MustDateField();
    currentAttributeList.append(label, temp);
    addFocusListenerForDefaultButton(temp);
    return temp;
  }

  /**
   * Creates a date input field in the same line as previously used.
   * @return the created date input field
   */
  protected MustDateField createDateField() {
    MustDateField temp = new MustDateField();
    currentAttributeList.append(temp);
    addFocusListenerForDefaultButton(temp);
    return temp;
  }

  /**
   * Creates a int field in a new line with its describing label.
   * @param label the line label
   * @param length the length of the field
   * @return the created int field
   */
  protected MustIntField createIntField(String label, int length) {
    MustIntField temp = new MustIntField(length);
    currentAttributeList.append(label, temp);
    addFocusListenerForDefaultButton(temp);
    return temp;
  }

  /**
   * Creates a int input field in the same line as previously used.
   * @param length the length of the field
   * @return the created int field
   */
  protected MustIntField createIntField(int length) {
    MustIntField temp = new MustIntField(length);
    currentAttributeList.append(temp);
    addFocusListenerForDefaultButton(temp);
    return temp;
  }

//------------------------------------------------------------------------------

  protected MustCheckBox createCheckBox(String label, String checkText) {
    MustCheckBox temp = new MustCheckBox(checkText);
    currentAttributeList.append(label, temp);
    addFocusListenerForDefaultButton(temp);
    inquiryHistory.register(temp);
    return temp;
  }
  
  protected MustCheckBox createCheckBox(String checkText) {
    MustCheckBox temp = new MustCheckBox(checkText);
    currentAttributeList.append(temp);
    addFocusListenerForDefaultButton(temp);
    inquiryHistory.register(temp);
    return temp;
  }
  
//------------------------------------------------------------------------------

  protected CleartextClassification createCleartextClassification(String label, SelfChainingDataObject sourceDataObject, String visibleColumnName, String superordinateNiColumn, int depth) {
    CleartextClassification temp = new CleartextClassification(sourceDataObject, "KlarSystBz", 3);
    temp.addTo(currentAttributeList, label);
    addFocusListenerForDefaultButton(temp.boxes.firstElement());
    inquiryHistory.register(temp);
    return temp;
  }

//------------------------------------------------------------------------------

   private void addFocusListenerForDefaultButton(Component selectionComponent) {
    selectionComponent.addFocusListener(new java.awt.event.FocusAdapter() {
      public void focusGained(FocusEvent e) {
        rootFrame.getRootPane().setDefaultButton(buttonList);
      }
    });
  }

//------------------------------------------------------------------------------

  public abstract Identifier[] getIdentifiers();

  /**
   * Creates or recovers the associated property administration frame
   */
  protected void createOrRecoverPropertyAdministration() {
    associatedPropertyAdministration.recover();
  }

  /**
   * Returns the selected tab of the tabbed pane.
   * @return the selected tab of the tabbed pane
   */
  public int getSelectedTab() {
    return mustTabbedPane1.getSelectedIndex();
  }

  /**
   * Called from data objects when data have been changed.
   * Used for synchronization of data presentations.
   * @param e the data change event that happened.
   */
  public synchronized void DataChangePerformed(DataChangedEvent e) {
    if (e.getEntityName().equals(listDataObject.getTableName()) && isConnectionOpen()) { // e.g. connection may be closed after user changed database - the windows are closed and not used any more but still existing until garbage collection
      if (e.getSequenceType() != DataChangedEvent.SUMMARY_TYPE && listThread == null) {
        handleDataChangeIndividually(e);
      } else if (autoInitialListFill || !getElaboratedWhereCondition().equals("")) {
        refreshList();
      }
    }
  }
  
  protected boolean isConnectionOpen() {
    try {
      return !listDataObject.getConnection().isClosed();
    } catch (SQLException e) {
      return false;
    }
  }

  /**
   * Controls  action events like button pressed.
   * @param e the action event to be interpreted
   */
  public void actionPerformed(ActionEvent e) {
    generalActionBeginnung();
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnList")) {
      ListButtonAction();
    } else if (actCommand.equals("BtnNew")) {
      if (associatedPropertyAdministration.isCancelAllowed()) {
        newButtonAction();
      }
    } else if (actCommand.equals("BtnPresent")) {
      presentButtonAction();
    } else if (actCommand.equals("BtnChoose")) {
      chooseButtonAction();
    } else if (actCommand.equals("BtnProp")) {
      if (editable) PropertyButtonAction(); // could be caused by double click
    } else if (actCommand.equals("BtnCopy")) {
      CopyButtonAction();
    } else if (actCommand.equals("BtnDel")) {
      DeleteButtonAction();
    } else if (actCommand.equals("BtnPrint")) {
      printButtonAction();
    } else if (actCommand.equals("BtnClose")) {
      closeRequest();
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
   */
  protected void generalActionEnding() {
    statusLabel.resetDefault();
  }

  /**
   * Returns true if user input is accepted.
   * @return true if user input is accepted
   */
  protected boolean isInputAccepted() { // to be overridden by child if needed!
    if (searchElements != null) for (SearchElement searchElement : searchElements) {
      if (!searchElement.isInputAccepted()) return false;
    }
    return true;
  }

  /**
   * Returns true if the user may choose the presented entries.
   * To be overridden by child if needed!
   * @return true if the user may choose the presented entries
   */
  protected boolean isChoosingAllowed() {
    return false;
  }

  /**
   * Returns true if the user may modify the presented entries.
   * To be overridden by child if needed!
   * @return true if the user may modify the presented entries
   */
  protected boolean isModificationAllowed() {
    return true;
  }

  /**
   * The task to be done associated with the list button.
   */
  protected void ListButtonAction() {
    if (isInputAccepted()) {
      refreshCausedByListButton = true;
      refreshList();
      inquiryHistory.addSnapshot();
    }
  }

  /**
   * The task to be done associated with the property button.
   */
  protected void PropertyButtonAction() {
    Vector<Identifier> selId = getSelectedIdentifierVector();
    if (associatedPropertyAdministration != null && associatedPropertyAdministration.isCancelAllowed()) {
      setMessage(getTranslation("TEXT_LOADING_SINGLE_ENTRY"));
      createOrRecoverPropertyAdministration();
      lastSelectionIdentifier = getSelectedIdentifier();
      associatedPropertyAdministration.loadValues(selId);
    }
    if (associatedPropertyAdministration != null && associatedPropertyAdministration.getRecoveredIdentifier() != null) { // user decided not to cancel changes but return to input form, therefor we want the original item to be selected
      setSelectedIdentifier(associatedPropertyAdministration.getRecoveredIdentifier());
    }
  }

  /**
   * The task to be done associated with the present button.
   */
  protected void presentButtonAction() {
    if (getPresentationClass() != null) try {
      if (presentationInstance == null) presentationInstance = (DataPresentation)getOrCreateMainInstance(getPresentationClass(), this);
      lastSelectionIdentifier = getSelectedIdentifier();
      presentationInstance.present(getSelectedIdentifierVector());
    } catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
  }

  /**
   * The task to be done associated with the choose button.
   */
  protected void chooseButtonAction() {
    // override it if you need it
  }

  /**
   * The task to be done associated with the copy button.
   */
  protected void CopyButtonAction() {
    if (associatedPropertyAdministration == null || associatedPropertyAdministration.isCancelAllowed()) {
      setMessage(getTranslation("TEXT_LOADING_ENTRY_TO_COPY"));
      createOrRecoverPropertyAdministration();
      lastSelectionIdentifier = getSelectedIdentifier();
      associatedPropertyAdministration.copy(getSelectedIdentifier());
    }
  }

  /**
   * The task to be done associated with the delete button.
   */
  protected void DeleteButtonAction() {
    boolean deletionAllowed = true;
    boolean deleted = false;
    lastSelectionIdentifier = getSelectedIdentifier();
    String[] items = getSelectedItems();
    Identifier[] identifiers = getSelectedIdentifiers();
    setMessage(getTranslation("TEXT_CHECK_USAGE"));
    Vector<String> inUse = new Vector<String>();
    for (int i = 0; i < identifiers.length; i++) {
      deletionAllowed = listDataObject.isDeletionAllowed(identifiers[i]);
      if (!deletionAllowed) {
        inUse.add(items[i]);
      }
    }
    if (inUse.size() > 0) {
      String[] inUseInfo = new String[inUse.size() + 3];
      int i = -1;
      inUseInfo[++i] = getTranslation("TEXT_ENTRY_MUST_NOT_BE_DELETED");
      inUseInfo[++i] = getTranslation("TEXT_BECAUSE_IT_IS_IN_USE");
      inUseInfo[++i] = "";
      for (Iterator<String> iter = inUse.iterator(); iter.hasNext();) {
        String item = iter.next();
        inUseInfo[++i] = item;
      }
      statusLabel.setRemainStatus(getTranslation("TEXT_ENTRY_IS_IN_USE"));
      StandardDialog.presentText(this, inUseInfo);
      return;
    }
    setMessage(getTranslation("TEXT_CONFIRM_DELETION"));
    for (int i = 0; i < identifiers.length; i++) {
      if (StandardDialog.deletionConfirmed(this, items[i])) {
        lastSelectionIdentifier = null;
        deleted = delete(identifiers[i]);
      } else {
        statusLabel.setRemainStatus(getTranslation("TEXT_DELETION_UNCOMPLETED"));
        break;
      }
      if (deleted) {
        clearSelection();
        statusLabel.setRemainStatus(getTranslation("TEXT_ENTRY_DELETED"));
      };
    }
  }
  
  protected boolean delete(Identifier identifier) {
    return listDataObject.delete(identifier);
  }

  /**
   * The task to be done associated with the print button.
   */
  protected void printButtonAction() {
    if (getPrintClass() != null) try {
      if (printInstance == null) printInstance = (DataPropertyPrint)getPrintClass().newInstance();
      printInstance.startGroup();
      Identifier[] identifiers = getSelectedIdentifiers();
      for (int i = 0; i < identifiers.length; i++) {
        printInstance.loadAndPrint(identifiers[i]);
      }
    } catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
  }
  
  protected void reset() {
    if (globalSearchTextField != null) globalSearchTextField.setText("");
    if (searchElements != null) for (SearchElement searchElement : searchElements) {
      searchElement.reset();
    }
    if (expertSearchTextArea != null) expertSearchTextArea.setText(""); //$NON-NLS-1$
    inquiryHistory.clear();
    removeAllOfTheList();
    repaint();
  }

  private boolean closeRequest() {
    if (associatedPropertyAdministration != null && !associatedPropertyAdministration.isCancelAllowed()) {
      return false;
    }
    if (!isClosingAllowed(-1)) return false;
    closeInstance();
    return true;
  }

  @Override
  public boolean isClosingAllowed(int closeConfirmId) {
    if (associatedPropertyAdministration != null) {
      return associatedPropertyAdministration.isClosingAllowed(closeConfirmId);
    }
    return true;
  }

  /**
   * Closes the frame and its associated frames and destroys them.
   */
  public void closeInstance() {
    if (associatedPropertyAdministration != null) {
      associatedPropertyAdministration.closeInstance();
      associatedPropertyAdministration.destroy();
    }
    if (presentationInstance != null) {
      presentationInstance.closeInstance();
      presentationInstance.destroy();
    }
    if (listRefreshState == LIST_REFRESH_SUSPENDED) {
      listRefreshState = LIST_REFRESH_OFF;
      listDataObject.closeQuery();
    }
    super.closeInstance();
    destroy();
  }

  /**
   * The task to be done associated with the "new" button.
   */
  protected void newButtonAction() {
    clearSelection();
    createOrRecoverPropertyAdministration();
    associatedPropertyAdministration.newInput();
  }

  /**
   * Clears and fills the list in separate thread.
   */
  public synchronized void refreshList() {
    threadMode = THREAD_MODE_FILL;
    startListing();
  }

  /**
   * Extends the list dynamically in thread.
   */
  public synchronized void extendList() {
    threadMode = THREAD_MODE_EXTEND;
    startListing();
  }
  
  private void startListing() {
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
  protected boolean select() {
    ChooseListDataObject();
    String whereCondition = getElaboratedWhereCondition();
    if (whereCondition.trim().toLowerCase().startsWith("select")) {
      return listDataObject.openQuery(whereCondition);
    } else {
      return listDataObject.select(getSelectionFields(), whereCondition, getOrderByFields());
    }
  }

  /**
   * Returns the text to notify the user that no entry is matching the selection.
   * @return the text to notify the user that no entry is matching the selection
   */
  protected String getNotFoundNotification() {
    return getTranslation("TEXT_NO_ENTRY_IS_MATCHING_SELECTION");
  }

  /**
   * Execution of the list thread.
   */
  public void run() {
//    listScrollPane.getViewport().removeChangeListener(scrollListener);
    beginOfListThread();
    while (listIsToRefresh) {
      listIsToRefresh = false;
      switch (threadMode) {
        case THREAD_MODE_EXTEND:
          extendListAsThread();
          break;
        case THREAD_MODE_FILL:
          fillList();
          break;
      }
    }
    endOfListThread();
    listThread = null;
//     listScrollPane.getViewport().addChangeListener(scrollListener);
  }

  /**
   * Resets extension mode. Called in cases where extension cannot be continued, e.g. after appending
   * an entry which has been recorded right now.
   */
  protected void resetExtensionMode() {
    threadMode = THREAD_MODE_RESET;
    listRefreshState = LIST_REFRESH_OFF;
  }
  
  /**
   * Fills the List according to the specified criteria.
   */
  protected /* synchronized */ void fillList() { // synchronize problem with getTreeLock() while fireSelectionChanged in MustList
    int indexToSelect = -1;
    currentMaxListEntries = maxListEntries;
    setMessage(getTranslation("TEXT_LOADING_SELECTION"));
    if (select()) {
      removeAllOfTheList();
      beginListFill();
      listIndex = 0;
      boolean furtherRowAvailable;
      listRefreshState = LIST_REFRESH_PROCEEDING;
      while (!listIsToRefresh & ++listIndex <= maxListEntries & (furtherRowAvailable = listDataObject.nextRow())) {
        fillListLine(listIndex, indexToSelect);
      }
      if (furtherRowAvailable) {
        listRefreshState = LIST_REFRESH_SUSPENDED;
      } else {
        listRefreshState = LIST_REFRESH_OFF;
        listDataObject.closeQuery();
      }
      completeListFill();
      listScrollPane.getViewport().setViewPosition(new Point()); // list from beginning
      switch (getListItemCount()) {
      case 0:
        statusLabel.setRemainStatus(getNotFoundNotification());
        break;
      case 1:
        statusLabel.resetDefault();
        // CreateOrRecoverPropertyFramme();  no good, especially after recording that causes unique selection
        // associatedPropertyAdministration.loadValues(centerList.getIdentifier(0));  no good, especially after recording that causes unique selection
        break;
      default:
        if (refreshCausedByListButton) { // only if user pushed this list button
          requestListingFocus(); // change focus from list button to result list
        }
        if (furtherRowAvailable) {
          statusLabel.setRemainStatus(getTranslation("TEXT_PARTIAL_LISTING"));
        } else {
          statusLabel.setRemainStatus(listIndex-1 + getTranslation("TEXT_ENTRIES"));
        }
        break;
      }
      if (indexToSelect != -1) {
        selectListIndex(indexToSelect);
      }
      refreshCausedByListButton = false;
    }
    else {
      statusLabel.setRemainStatus(getTranslation("TEXT_SYNTAX_ERROR_ACCORDING_TO_DB_DRIVER"));
      StandardDialog.presentText(
        this, 
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

  /**
   * Extends list.
   */
  protected void extendListAsThread() {
    viewPositionBeforeListExtension = listScrollPane.getViewport().getViewPosition(); // view position to be recovered later
    currentMaxListEntries = currentMaxListEntries + maxListEntries;
    setMessage(getTranslation("TEXT_LOADING_SELECTION"));
    beginListExtension();
    boolean furtherRowAvailable;
    // no - this was done by last check in fillList: listIndex++;
    fillListLine(listIndex, -1);
    listRefreshState = LIST_REFRESH_PROCEEDING;
    while (!listIsToRefresh & ++listIndex <= currentMaxListEntries & (furtherRowAvailable = listDataObject.nextRow())) {
      fillListLine(listIndex, -1);
    }
    if (furtherRowAvailable) {
      listRefreshState = LIST_REFRESH_SUSPENDED;
      statusLabel.setRemainStatus(getTranslation("TEXT_PARTIAL_LISTING"));
    } else {
      listRefreshState = LIST_REFRESH_OFF;
      listDataObject.closeQuery();
      statusLabel.setRemainStatus(listIndex-1 + getTranslation("TEXT_ENTRIES"));
    }
    completeListFill();
    if (viewPositionBeforeListExtension != null) EventQueue.invokeLater(new Runnable() {
      public void run() {
        if (viewPositionBeforeListExtension != null) listScrollPane.getViewport().setViewPosition(viewPositionBeforeListExtension);
        viewPositionBeforeListExtension = null;
      }
    });
    switch (getListItemCount()) {
    case 0:
      statusLabel.setRemainStatus(getNotFoundNotification());
      break;
    case 1:
      statusLabel.resetDefault();
      // CreateOrRecoverPropertyFramme();  no good, especially after recording that causes unique selection
      // associatedPropertyAdministration.loadValues(centerList.getIdentifier(0));  no good, especially after recording that causes unique selection
      break;
    default:
      if (refreshCausedByListButton) { // only if user pushed this list button
        requestListingFocus(); // change focus from list button to result list
      }
      break;
    }
    refreshCausedByListButton = false;
  }

  protected void fillListLine(int i, int indexToSelect) {
    appendListEntry();
    if (lastSelectionIdentifier != null && listDataObject.getIdentifier().equals(lastSelectionIdentifier)) {
      indexToSelect = i-1;
    }
  }

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
      String standardWhereCondition = getWhereCondition();
      StringTokenizer tokenizer = new StringTokenizer(globalSearchTextField.getText(), " ;,", false);
      String globalWhereCondition = "";
      if (tokenizer.countTokens() <= 1) {
        globalWhereCondition = listDataObject.getGlobalWhereCondition(globalSearchTextField.getText());
      } else {
        String combination = " and ";
        if ("O".equals(searchCombination.getSelectedKey())) {
          combination = " or ";
        }
        while (tokenizer.hasMoreTokens()) {
          if (globalWhereCondition.length() > 1) globalWhereCondition += combination;
          globalWhereCondition += "(";
          globalWhereCondition += listDataObject.getGlobalWhereCondition(tokenizer.nextToken());
          globalWhereCondition += ")";
        }
      }
      String additionalGlobalWhereCondition = getAdditionalWhereConditionForGlobalSearch();
      if (additionalGlobalWhereCondition != null && additionalGlobalWhereCondition.length() > 0) {
        globalWhereCondition += " or " + additionalGlobalWhereCondition;
      }
      if (standardWhereCondition.length() == 0) {
        return globalWhereCondition;
      } else {
        return extendWhereConditonByDynamicSearch("(" + globalWhereCondition + ") and " + standardWhereCondition);
      }
    } else {
      return extendWhereConditonByDynamicSearch(getWhereCondition());
    }
  }
  
  private String extendWhereConditonByDynamicSearch(String whereConditionString) {
    if (searchElements == null) return whereConditionString;
    WhereCondition whereCondition = new WhereCondition();
    whereCondition.append(whereConditionString);
    SearchElement.extend(whereCondition, searchElements, "O".equals(logic.getSelectedKey()));
    return whereCondition.toString();
  }

  /**
   * Removes messages.
   */
  protected void clearMessage() {
    statusLabel.setStatus("");
  }

  /**
   * Sets the message to be read by the user, which is presented in the status
   * label in this context.
   * @param message the message for the user
   */
  protected void setMessage(String message) {
    statusLabel.setStatus(message);
  }

  /**
   * Sets the message to be read by the user.
   * @param messageToKeep the message for the user
   */
  protected void setMessageToKeep(String messageToKeep) {
    statusLabel.setRemainStatus(messageToKeep);
  }

  /**
   * Returns the print class - to be overridden by child if print class is available!
   * @return the print class
   */
  protected Class<? extends DataPropertyPrint> getPrintClass() {return null;}

  /**
   * Returns the presentation class - to be overridden by child if presentation class is available!
   * @return the presentation class
   */
  protected Class<? extends DataPresentation> getPresentationClass() {return null;}

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
   * Returns additional where conditions for global search. By default, null is returned.
   * Override method to extend search by e.g. expression
   * 'myKey in (select myKey in keyTable where fieldOfKeyTable like '%" + globalSearchTextField.getText()+ "%'))'
   * @return additional where conditions for global search
   */
  protected String getAdditionalWhereConditionForGlobalSearch() {
    return null;
  }

  /**
   * Returns the fields to be used for the order by clause, separated by comma
   * as usual in SQL statements.
   * @return the fields to be used for the order by clause
   */
  protected abstract String getOrderByFields();

  /**
   * Returns the identifier (primary key) of the selected row.
   * @return the identifier (primary key) of the selected row
   */
  protected abstract Identifier getSelectedIdentifier();

  /**
   * Returns the identifiers (primary keys) of the selected rows.
   * @return the identifiers (primary keys) of the selected rows
   */
  protected abstract Identifier[] getSelectedIdentifiers();
  
  /**
   * Returns the identifiers (primary keys) of the selected rows omitting negative values
   * which are used for sub-headers.
   * @return the identifiers (primary keys) of the selected rows
   */
  protected Vector<Identifier> getSelectedIdentifierVector() {
    Identifier[] selectedIdentifiers = getSelectedIdentifiers();
    Vector<Identifier> selId = new Vector<Identifier>(selectedIdentifiers.length);
    for (int i = 0; i < selectedIdentifiers.length; i++) {
      if (!selectedIdentifiers[i].isRepresentativeForNothing()) selId.add(selectedIdentifiers[i]);
    }
    return selId;
  }
  
  /**
   * Returns the selected item.
   * @return the selected item
   */
  protected abstract String getSelectedItem();

  /**
   * Returns the selected items.
   * @return the selected items
   */
  protected abstract String[] getSelectedItems();

  /**
   * Clears the selection.
   */
  protected abstract void clearSelection();
  
  /**
   * Resets the list by resetting extension mode plus removing all items of the list.
   * May be used if search condition have been changed programmatically. 
   */
  protected void resetList() {
    resetExtensionMode();
    removeAllOfTheList();
  }

  /**
   * Removes all items of the table.
   */
  protected abstract void removeAllOfTheList();

  /**
   * Beginning of list fills into a list model which is not currently assigned 
   * to the view. Activation of the model is done via completeListFill().
   * @see #completeListFill()
   */
  protected abstract void beginListFill();

  /**
   * Adds an entry at the end of the table.
   */
  protected abstract void appendListEntry();

  /**
   * Ending of list fills into a list model which is not currently assigned 
   * to the view. The model initialized by beginListFill() becomes active now.
   * @see #beginListFill()
   */
  protected abstract void completeListFill();

  /**
   * Called from DataObject when data have been changed.
   * @param e the data change event
   * @see de.must.dataobj.DataChangeListener
   * @see de.must.dataobj.DataObject
   */
  protected abstract void handleDataChangeIndividually(DataChangedEvent e);

  /**
   * Returns the number of items in the table.
   * @return the number of items in the table
   */
  protected abstract int getListItemCount();

  /**
   * Request the focus to the list.
   */
  protected abstract void requestListingFocus();

  /**
   * Returns the index of the selected item.
   * @return the index of the selected item
   */
  protected abstract int getSelectedIndex();

  /**
   * Selects an entry of the list by index.
   * @param indexToSelect the index to be selected
   */
  protected abstract void selectListIndex(int indexToSelect);

  /**
   * Selects an item of the list / a row by identifier.
   * @param identifier the identifier of the item to be selected
   */
  public abstract void setSelectedIdentifier(Identifier identifier);
  
  /**
   * Called when list thread begins.
   */
  protected abstract void beginOfListThread();
  
  protected abstract void beginListExtension();

  /**
   * Called when list thread ends.
   */
  protected abstract void endOfListThread();

  @Override
  public void receive(String message) {
    setMessageToKeep(message);
  }

  /**
   * Workaround: called a little bit later than the initial time.
   */
  protected void delayedInititialActions() {} // override this for initial requestFocus e.g.

  @Override
  protected void free() {
    if (listDataObject != null) {
      listDataObject.removeDataChangeListener(this); // don't wait until gc removed weak reference
    }
    super.free();
  }

  /**
   *  Workaround to do things a little bit later than the initial time.
   */
  class InitialThread extends Thread {
    public void run(){
      try {sleep(300);} catch(Exception e) {};
      delayedInititialActions();
    }
  }

}
