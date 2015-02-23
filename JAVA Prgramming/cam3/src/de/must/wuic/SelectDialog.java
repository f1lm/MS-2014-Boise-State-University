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

import java.awt.Component;
import java.awt.Dimension;
import java.awt.Frame;
import java.awt.MediaTracker;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.awt.event.FocusEvent;
import java.util.Vector;

import javax.swing.ImageIcon;
import javax.swing.JDialog;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JSplitPane;
import javax.swing.WindowConstants;

import de.must.dataobj.DataObject;
import de.must.dataobj.Identifier;
import de.must.middle.ImageResource;
import de.must.print.DataPropertyPrint;
import de.must.print.PropertyPrint;

public abstract class SelectDialog extends MustDialog implements ActionListener {

  public static final int LIST_MODIFICATION_APPEND = 0;
  public static final int LIST_MODIFICATION_UPDATE = 1;
  public static final int LIST_MODIFICATION_REMOVE = 2;
  protected int listModification = LIST_MODIFICATION_UPDATE;
  
  protected ImageResource imageResource;
  protected JPanel panelTop = new JPanel();
  protected MustTabbedPane mustTabbedPane;
  protected int expertSearchTab = -1;
  protected JSplitPane jSplitPane1 = new JSplitPane(JSplitPane.VERTICAL_SPLIT);
  protected Vector<AttributeList> tabAttributeList;
  protected AttributeList currentAttributeList;
  protected boolean isAttributeListToPack = false;
  protected JPanel panelSelectButtons = new JPanel();
  protected JPanel panelBottom = new JPanel();
  protected JPanel panelButtons = new JPanel();
  protected MustButton buttonList = new MustButton(getTranslation("TEXT_LIST_BUTTON"), "BtnList", this);
  protected MustStatusLabel statusLabel = new MustStatusLabel();
  protected MustButton buttonPresent;
  protected MustButton buttonChoose;
  protected MustButton buttonClose;
  protected MustTextField globalSearchTextField;
  protected MustTextArea expertSearchTextArea;
  protected DataPropertyPrint printInstance;
  protected DataPresentation presentationInstance;
  protected Identifier lastSelectionIdentifier;
  protected Identifier choosenIdentifier;
  protected boolean programmaticChange;
  protected long timeSetVisible;

  public SelectDialog (Frame ownerFrame, ImageResource imageResource) {
    super(ownerFrame);
    this.imageResource = imageResource;
  }
  
  public SelectDialog (JDialog ownerDialog, ImageResource imageResource) {
    super(ownerDialog);
    this.imageResource = imageResource;
  }
  
  protected void constructGUI() {
    setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE); // to consider the isClosingAllowed() aspect
    addComponentListener(new ComponentListener() {
      @Override public void componentShown(ComponentEvent e) {}
      @Override public void componentHidden(ComponentEvent e) {}
      @Override 
      public void componentResized(ComponentEvent e) {
        if (!programmaticChange && System.currentTimeMillis() > timeSetVisible + 1000) {
          WinContr.getInstance().saveProperties(SelectDialog.this);
        }
      }
      @Override
      public void componentMoved(ComponentEvent e) {
        if (!programmaticChange && System.currentTimeMillis() > timeSetVisible + 1000) {
          WinContr.getInstance().saveProperties(SelectDialog.this);
        }
      }
    });
    if (getPresentationClass() != null) buttonPresent = createButton("Properties24.gif", "Pr", getTranslation("TEXT_PRESENTS_SELECTED_ENTRY"), "BtnPresent");
    buttonChoose = createButton(getTranslation("TEXT_CHOOSE_BUTTON"), getTranslation("TEXT_CHOOSES_SELECTED_ENTRY"), "BtnChoose");
    buttonClose = createButton("close.gif", "Cl", getTranslation("TEXT_CLOSES_THIS_WINDOW"), "BtnClose");
    if (!isLaidOut()) this.setSize(new java.awt.Dimension(400, 400));

    panelSelectButtons.add(buttonList);

    panelTop.setLayout(new java.awt.BorderLayout());
    panelTop.add(panelSelectButtons, java.awt.BorderLayout.SOUTH);
    jSplitPane1.setTopComponent(panelTop);

    if (getPresentationClass() != null) panelButtons.add(buttonPresent);
    panelButtons.add(buttonChoose);
    panelButtons.add(buttonClose);

    panelBottom.setLayout(new java.awt.BorderLayout());
    panelBottom.add(panelButtons, java.awt.BorderLayout.CENTER);
    panelBottom.add(statusLabel, java.awt.BorderLayout.SOUTH);

    buttonList.setToolTipText(getTranslation("TEXT_FILLS_LIST_ACCORDING_SELECTION"));
  }
  
  @Override
  public void setVisible(boolean b) {
    timeSetVisible = System.currentTimeMillis();
    super.setVisible(b);
  }

  @Override
  public void setSize(int width, int height) {
    programmaticChange = true;
    super.setSize(width, height);
    programmaticChange = false;
  }

  @Override
  public void setLocation(int x, int y) {
    programmaticChange = true;
    super.setLocation(x, y);
    programmaticChange = false;
  }

  protected MustButton createButton(String defaultLabel, String toolTipText, String actionName) {
    MustButton button;
    button = new MustButton(defaultLabel, toolTipText, actionName, this);
    return button;
  }

  protected MustButton createButton(String imageName, String defaultLabel, String toolTipText, String actionName) {
    ImageIcon image = imageResource.getImageIcon(imageName);
    MustButton button;
    if (image.getImageLoadStatus() != MediaTracker.ERRORED) {
      button = new MustButton(image, toolTipText, actionName, this);
    } else {
      de.must.io.Logger.getInstance().info(getClass(), "Warning: Couldn't load image " + image.getDescription());
      button = new MustButton(defaultLabel, toolTipText, actionName, this);
    }
    return button;
  }

  /**
   * Conclusion of the construction process. Allows to do construction details
   * in the sequence super class - this - super class which is a benefit for
   * easy layout.
   */
  protected void creationEnding() {
    getContentPane().add(jSplitPane1);
    getContentPane().add(panelBottom, java.awt.BorderLayout.SOUTH);
    getRootPane().setDefaultButton(buttonList);
    packIfNotLaidOut();
    if (ownerFrame != null) {
      ownerFrame.setCursor(defaultCursor);
    }
    if (ownerDialog != null) {
      ownerDialog.setCursor(defaultCursor);
    }
    generalActionEnding();
    (new InitialThread()).start();
  }

  /**
   * Packs the frame if it isn't already laid-out by user.
   */
  protected void packIfNotLaidOut() {
    if (!isLaidOut()) {
      pack();
      // de.must.io.Logger.getInstance().info(getClass(), "preferredSize: " + getPreferredSize());
      // workaround for SplitPane and List:
      int width = (int)getPreferredSize().getWidth();
      int height = (int)getPreferredSize().getHeight();
      if (height > 500) setSize(new Dimension(width, 500));
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
   * Creates a new panel and adds it to the tabbed pane with a list for row sub-selection.
   */
  protected void newPanel() {
    currentAttributeList = new AttributeList();
    panelTop.add(new JScrollPane(currentAttributeList));
    isAttributeListToPack = true;
  }

  /**
   * Creates a new panel and adds it to the tabbed pane with a list for row sub-selection.
   * @param tabLabel the label of the new tab
   */
  protected void newPanel(String tabLabel) {
    if (tabAttributeList == null) {
      mustTabbedPane = new MustTabbedPane();
      mustTabbedPane.setMinimumSize(new java.awt.Dimension(0, 100));
      tabAttributeList = new Vector<AttributeList>();
      panelTop.add(new JScrollPane(mustTabbedPane));
    }
    currentAttributeList =  new AttributeList();
    tabAttributeList.add(currentAttributeList);
    mustTabbedPane.addTab(tabLabel, currentAttributeList);
    isAttributeListToPack = true;
  }

  /**
   * Adds an expert search panel to the tabbed pane.
   * @param tabLabel the label of the new expert search tab
   */
  protected void newPanelWithExpertSearchTextArea(String tabLabel) {
    expertSearchTextArea = new MustTextArea(40, 10, 1000);
    newPanel(tabLabel, expertSearchTextArea);  expertSearchTab = mustTabbedPane.getTabCount()-1;
  }

  private void newPanel(String tabLabel, MustTextArea centerTextArea) {
    mustTabbedPane.addTab(tabLabel, new JScrollPane(centerTextArea));
    addFocusListenerForDefaultButton(centerTextArea);
    isAttributeListToPack = false;
  }

  /**
   * Adds a panel with multiple choice selection.
   * @param tabLabel the label of the new tab
   * @param multChoice multiple choice to be presented
   * @param preferedSize the preferred size of the scrollpane
   */
  protected void newPanel(String tabLabel, MustMultChoice multChoice, Dimension preferedSize) {
  // usage see mkt.FrKontaktSl
    JScrollPane tempScrollPane1 = new JScrollPane();
    tempScrollPane1.setPreferredSize(preferedSize);
    tempScrollPane1.getViewport().add(multChoice.getTable());
    mustTabbedPane.addTab(tabLabel, tempScrollPane1);
    isAttributeListToPack = false;
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
    return(temp);
  }

  /**
   * Creates a new variable choice with static content.
   * @param dataLabel the line label.
   * @param content the static content as a key / value table
   * @return the created variable choice
   */
  protected VariableChoice createVariableChoice(String dataLabel, String[][] content) {
    VariableChoice temp = new VariableChoice(content, true);
    currentAttributeList.append(dataLabel, temp);
    addFocusListenerForDefaultButton(temp);
    return(temp);
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
    return(temp);
  }

  /**
   * Creates a new text field for global search.
   * @param label the line label
   * @param length the length of the global search text field
   */
  protected void createTextFieldForGlobalSearch(String label, int length) {
    globalSearchTextField = createTextField(label, length);
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
    return(temp);
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
    return(temp);
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
    return(temp);
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
    return(temp);
  }

//------------------------------------------------------------------------------

   private void addFocusListenerForDefaultButton(Component selectionComponent) {
    selectionComponent.addFocusListener(new java.awt.event.FocusAdapter() {
      public void focusGained(FocusEvent e) {
        getRootPane().setDefaultButton(buttonList);
      }
    });
  }

//------------------------------------------------------------------------------

  public abstract Identifier[] getIdentifiers();

  /**
   * Returns the selected tab of the tabbed pane.
   * @return the selected tab of the tabbed pane
   */
  public int getSelectedTab() {
    return mustTabbedPane.getSelectedIndex();
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
    }
    if (actCommand.equals("BtnPresent")) {
      presentButtonAction();
    }
    if (actCommand.equals("BtnChoose")) {
      chooseButtonAction();
    }
    if (actCommand.equals("BtnClose")) {
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
  }

  /**
   * The task to be done associated with the present button.
   */
  protected void presentButtonAction() {
    if (getPresentationClass() != null) try {
      if (presentationInstance == null) presentationInstance = (DataPresentation)getPresentationClass().newInstance();
      lastSelectionIdentifier = getSelectedIdentifier();
      presentationInstance.present(getSelectedIdentifier());
    } catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
  }

  /**
   * The task to be done associated with the choose button.
   */
  protected void chooseButtonAction() {
    if (!isSelectionAccepted()) return;
    choosenIdentifier = getSelectedIdentifier();
    closeInstance();
  }
  
  protected boolean isSelectionAccepted() {
    return true;
  }
  
  private boolean closeRequest() {
    closeInstance();
    return true;
  }

  /**
   * Returns true if it is allowed to close the dialog.
   * @return true if it is allowed to close the dialog
   */
  public boolean isClosingAllowed() {
    return true;
  }

  /**
   * Closes the frame and its associated frames and destroys them.
   */
  public void closeInstance() {
    if (presentationInstance != null) {
      presentationInstance.closeInstance();
      presentationInstance.destroy();
    }
    super.closeInstance();
  }

  /**
   * Returns the text to notify the user that no entry is matching the selection.
   * @return the text to notify the user that no entry is matching the selection
   */
  protected String getNotFoundNotification() {
    return getTranslation("TEXT_NO_ENTRY_IS_MATCHING_SELECTION");
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
  protected Class<PropertyPrint> getPrintClass() {return null;}

  /**
   * Returns the presentation class - to be overridden by child if presentation class is available!
   * @return the presentation class
   */
  protected Class<DataPresentation> getPresentationClass() {return null;}

  /**
   * Returns the identifier (primary key) of the selected entry.
   * @return the identifier (primary key) of the selected entry
   */
  protected abstract Identifier getSelectedIdentifier();


  /**
   * Returns the selected item.
   * @return the selected item
   */
  protected abstract String getSelectedItem();

  /**
   * Clears the selection.
   */
  protected abstract void clearSelection();

  /**
   * Removes all items of the table.
   */
  protected abstract void removeAllOfTheList();

  /**
   * Beginning of list fills into a list model which is not currently assigned 
   * to the view.
   */
  protected abstract void beginListFill();

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
   * Returns the chosen identifier.
   * @return the chosen identifier
   */
  public Identifier getChosenIdentifier() {
    return choosenIdentifier;
  }
  
  /**
   * Workaround: called a little bit later than the initial time.
   */
  protected void delayedInititialActions() {} // override this for initial requestFocus e.g.

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
