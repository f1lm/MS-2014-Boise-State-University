/*
 * Copyright (c) 2012 Christoph Mueller. All rights reserved.
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
import java.io.IOException;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Vector;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.ListSelectionModel;

import de.must.dataobj.Identifier;
import de.must.io.Logger;
import de.must.middle.ApplConstStd;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.AttributeList;
import de.must.wuic.MustButton;
import de.must.wuic.MustList;
import de.must.wuic.MustTabbedPane;
import de.must.wuic.SelectDialog;

public class RemSelectDialog extends SelectDialog implements AppletDialog, RemoteGUIComponent {
  
  protected final MustList centerList = new MustList();
  private String tabLabelToBuildNext;
  protected JScrollPane attrListScroll;
  protected Hashtable<String, RemoteGUIComponent> rgcs;
  private boolean firstTimeSetVisibleTrue = true;

  public RemSelectDialog() {
    super((JFrame)null, AppletGlobal.getInstance());
    ImageIcon imageIcon = AppletGlobal.getInstance().getImageIcon("icon16.png"); //$NON-NLS-1$
    if (imageIcon != null) {
      setIconImage(imageIcon.getImage());
    }
    rgcs = new Hashtable<String, RemoteGUIComponent>();
    constructGUI();
    centerList.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
    jSplitPane1.setBottomComponent(new JScrollPane(centerList));
    if (buttonPresent != null) buttonPresent.setSelectDependence(centerList);
    buttonChoose = createButton(getTranslation("TEXT_CHOOSE_BUTTON"), getTranslation("TEXT_CHOOSES_SELECTED_ENTRY"), "BtnChoose");
    buttonChoose.setSelectDependence(centerList);
    centerList.setEnterButton(getDefaultButton());
    creationEnding();
  }

  @Override
  public String getId() {
    return null;  // not needed here
  }
 
  protected MustButton getDefaultButton() {
    return buttonChoose;
  }

  @Override
  public void setVisible(boolean b) {
    if (b && firstTimeSetVisibleTrue) {
      Layouter.fitSizeAndLocation(this);
      firstTimeSetVisibleTrue = false;
    }
    super.setVisible(b);
  }

  /**
   * Clears the selection.
   */
  protected final void clearSelection() {
    centerList.clearSelection();
  }

  /**
   * Removes all items of the list.
   */
  protected final void removeAllOfTheList() {
    centerList.removeAll();
  }

  protected void beginListFill() {
    centerList.addIndexedItem(getTranslation("TEXT_LOADING"), new Identifier(-1));
    centerList.repaint();
    centerList.prepareNewModel();
  }

  /**
   * Ending of list fills into a list model which is not currently assigned 
   * to the view. The model initialized by beginListFill() becomes active now.
   * @see #beginListFill()
   */
  protected void completeListFill() {
    centerList.applyNewModel();
  }

  /**
   * Returns the selected identifier (in case of integer identification).
   * @return the selected identifier
   */
  protected final Identifier getSelectedIdentifier() {
    return centerList.getSelectedIdentifier();
  }

  /**
   * Returns the selected item.
   * @return the selected item
   */
  protected final String getSelectedItem() {
    return centerList.getSelectedItem();
  }

  /**
   * Returns the number of items in the list.
   * @return the number of items in the list
   */
  protected final int getListItemCount() {
    return centerList.getItemCount();
  }

  /**
   * Returns the identifiers of all listed items.
   * @return the identifiers of all listed items
   */
  public Identifier[] getIdentifiers() {
    Identifier[] identifiers = new Identifier[centerList.getItemCount()];
    for (int i = 0; i < centerList.getItemCount(); i++) {
      identifiers[i] = centerList.getIdentifier(i);
    }
    return identifiers;
  }
  
  /* (non-Javadoc)
   * @see de.must.wuic.AbstractDataListFrame#setSelectedIdentifier(de.must.dataobj.Identifier)
   */
  public void setSelectedIdentifier(Identifier identifier) {
    for (int i = 0; i < centerList.getItemCount(); i++) {
      if (centerList.getIdentifier(i).equals(identifier)) {
        selectListIndex(i);
        return;
      }
    }
  }

  private final void removeEntry(Identifier identifier) {
    for (int i = 0; i < centerList.getItemCount(); i++) {
      if (centerList.getIdentifier(i) == identifier) {
        centerList.remove(i);
        centerList.fireSelectionChanged(); // could be last remaining row, so dependent buttons have to be deactivated
        return;
      }
    }
  }

  /**
   * Request the focus to the list.
   */
  protected final void requestListingFocus() {
    centerList.requestFocus();
  }
  
  /**
   * Returns the index of the selected item.
   * @return the index of the selected item
   */
  protected final int getSelectedIndex() {
    return centerList.getSelectedIndex();
  }

  /**
   * Selects the entry of the list with the specified index and ensures, that
   * the entry is visible by scrolling to the entry.
   * @param indexToSelect the index of the entry to select
   */
   protected final void selectListIndex(int indexToSelect) {
     centerList.setSelectedIndex(indexToSelect);
     centerList.ensureIndexIsVisible(indexToSelect);
  }

  /**
   * Called when the list thread begins.
   */
  protected final void beginOfListThread() {
    centerList.setCursor(waitCursor);
  }

  /**
   * Called when the list thread ends.
   */
  protected final void endOfListThread() {
    centerList.setCursor(defaultCursor);
  }

  @Override
  public void setValue(String value) {
  }

  @Override
  public void setEditable(boolean value) {
  }

  @Override
  public boolean isModified() {
    return false;
  }

  @Override
  public void extendParams(Vector<KeyValuePairAlpha> params) {
  }

  @Override
  public void selectAll() {
  }

  @Override
  public void perform(Action action) {
    if (Constants.INITIALIZE.equals(action.toDo)) {
      setTitle(action.value);
//      newModel = new DefaultListModel();
//      list.removeAll();
    } else if (Constants.CLEAR_DETAILS.equals(action.toDo)) {
      tabAttributeList = null;
      if (mustTabbedPane != null) remove(mustTabbedPane);
      if (attrListScroll != null) remove(attrListScroll);
      attrListScroll = null;
      currentAttributeList = null;
      rgcs.clear();
      // additionalButton.clear();
    } else if (Constants.CREATE_TAB.equals(action.toDo)) {
      if (tabAttributeList == null) {
        mustTabbedPane = new MustTabbedPane();
        tabAttributeList = new Vector<AttributeList>();
        panelTop.add(new JScrollPane(mustTabbedPane));
      }
      currentAttributeList = null;
      tabLabelToBuildNext = action.label;
    } else if (Constants.NEW_ATTRIBUTE_ROW.equals(action.toDo)) {
      createAttributeListIfNull();
      currentAttributeList.newRow(action.label);
      packIfNotLaidOut(); // TODO reduce
    } else if (Constants.CREATE_TEXTFIELD.equals(action.toDo)) {
      createAttributeListIfNull();
      RemTextField comp = new RemTextField(action.id, action.length);
      if (action.variant2 != null) {
        comp.setToolTipText(action.variant2);
      }
      if (action.variant3 != null) {
        comp.setCapitalization(true);
      }
      // comp.addFocusListener(this);
      currentAttributeList.append(comp);
      rgcs.put(action.id, comp);
      if (Constants.REGISTER.equals(action.variant1)) {
        AppletGlobal.getInstance().register(action.id, comp);
      }
    } else if (Constants.CREATE_PASSWORDFIELD.equals(action.toDo)) {
      createAttributeListIfNull();
      RemPasswordField comp = new RemPasswordField(action.id, action.length);
      if (action.variant2 != null) {
        comp.setToolTipText(action.variant2);
      }
      // comp.addFocusListener(this);
      currentAttributeList.append(comp);
      rgcs.put(action.id, comp);
    } else if (Constants.CREATE_TEXTAREA.equals(action.toDo)) {
      // createAttributeListIfNull();
      RemTextArea comp = new RemTextArea(action.id /*, action.length*/);
      if (action.variant2 != null) {
        comp.setToolTipText(action.variant2);
      }
      // comp.addFocusListener(this);
      if (tabLabelToBuildNext !=  null) {
        mustTabbedPane.add(tabLabelToBuildNext, new JScrollPane(comp));
      } else {
        currentAttributeList.append(new JScrollPane(comp));
      }
      rgcs.put(action.id, comp);
    } else if (Constants.SET_VISIBLE.equals(action.toDo)) {
      setVisible(ApplConstStd.TRUE_STRING.equals(action.value));
//    } else if (Constants.SET_TARGETTEXTFIELD.equals(action.toDo)) {
//      targetTextField = (MustTextField)AppletGlobal.getInstance().getRemoteGUIComponent(action.value);
//      buttonApply.setVisible(callback != null || targetTextField != null);
//      if (action.variant1 != null) callback = new Callback() {
//        public void callback() {
//          AppletGlobal.Task task = AppletGlobal.getInstance().tasks.get(action.variant1);
//          if (task != null) {
//            SearchListDetailGUI sldGUI = (SearchListDetailGUI)task.gui;
//            sldGUI.getSearchInlay().perform(Constants.ACTION_LIST);
//          }
//        }
//      };
    } else if (Constants.CLEAR_LIST.equals(action.toDo)) {
      removeAllOfTheList();
    } else if (Constants.ADD_ITEM.equals(action.toDo)) {
      centerList.addIndexedItem(action.value, Identifier.parseString(action.id));
      // newModel.addElement(action.value);
    } else if (Constants.SET_MESSAGE_TO_KEEP.equals(action.toDo)) {
      statusLabel.setRemainStatus(action.value);
//    } else if (Constants.APPLY_LIST.equals(action.toDo)) {
//      list.setModel(newModel);
//      if (!firstInitDone) {
//        pack();
//        int minWidth = 400;
//        int minHeight = 500;
//        int width = getSize().height;
//        int height = getSize().height;
//        if (height < height) height = minHeight;
//        if (width < minWidth) width = minWidth;
//        setSize(minWidth, minHeight);
//        setLocation(AwtConst.getCenterLocation(getSize()));
//        firstInitDone = true;
//      }
//    } else if (Constants.SET_CALLBACK.equals(action.toDo)) {
//      callback = new Callback() {
//        private String callbackId = action.id;
//        public void callback() {
//          generalActionBeginnung();
//          Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
//          params.add(new KeyValuePairAlpha(Constants.ACTION, callbackId));
//          params.add(new KeyValuePairAlpha(Constants.IDENTIFIER, getSelectedItem()));
//          try {
//            AppletGlobal.getInstance().contactServer(params);
//          } catch (IOException e1) {
//            Logger.getInstance().error(getClass(), e1);
//          }
//          generalActionEnding();
//        }
//      };
    } else {
      if (action.id != null) {
        RemoteGUIComponent rgc = rgcs.get(action.id);
        if (rgc != null) {
          rgcs.get(action.id).setValue(action.value);
        }
      }
    }
  }

  private void createAttributeListIfNull() {
    if (tabAttributeList != null) {
      if (currentAttributeList == null) {
        currentAttributeList = new AttributeList();
        tabAttributeList.add(currentAttributeList);
        mustTabbedPane.addScrollableTab(tabLabelToBuildNext, currentAttributeList);
        tabLabelToBuildNext = null;
      }
    } else { // not tabs used
      if (currentAttributeList == null) {
        currentAttributeList = new AttributeList();
        add(attrListScroll = new JScrollPane(currentAttributeList), BorderLayout.CENTER);
      }
    }
  }
  
  @Override
  protected void ListButtonAction() {
    Vector<KeyValuePairAlpha> params = getSynchParams();
    params.add(new KeyValuePairAlpha(Constants.ACTION, Constants.ACTION_LIST));
    perform(params);
  }
  
  @Override
  protected void chooseButtonAction() {
    Vector<KeyValuePairAlpha> params = getSynchParams();
    params.add(new KeyValuePairAlpha(Constants.ACTION, Constants.ACTION_LOAD));
    params.add(new KeyValuePairAlpha(Constants.IDENTIFIER, centerList.getSelectedIdentifier().toString()));
    perform(params);
  }

  public boolean perform(Vector<KeyValuePairAlpha> params) {
    try {
      AppletGlobal.getInstance().contactServer(params);
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
      return false;
    }
    return true;
  }

  protected Vector<KeyValuePairAlpha> getSynchParams() {
    Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
    params.add(new KeyValuePairAlpha(Constants.TAB_OR_WINDOW_ID, getTitle()));
    params.add(new KeyValuePairAlpha(Constants.TAB_ELEMENT, Constants.SEARCH));
    Enumeration<RemoteGUIComponent> valueContainers = rgcs.elements();
    while (valueContainers.hasMoreElements()) {
      RemoteGUIComponent valueContainer = valueContainers.nextElement();
      valueContainer.extendParams(params);
    }
    return params;
  }
  
  @Override
  public void closeInstance() {
    contactServer(Constants.ACTION_CANCEL);
    super.closeInstance();
  }

  protected void contactServer(String action) {
    Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
    params.add(new KeyValuePairAlpha(Constants.ACTION, action));
    try {
      AppletGlobal.getInstance().contactServer(params);
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
}
