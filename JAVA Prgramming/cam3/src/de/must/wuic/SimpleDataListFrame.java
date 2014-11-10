/*
 * Copyright (c) 1999-2010 Christoph Mueller. All rights reserved.
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
import java.awt.*;
import java.awt.event.*;

/**
 * Frame for database inquiry, data overview by JList and record selection.
 * Needs associated PropertyFrame for modifications of selected records.
 * @see ColumnDataListFrame
 * @author Christoph Mueller
 */
public abstract class SimpleDataListFrame extends AbstractDataListFrame {

  protected final MustList centerList = new MustList();

  /**
   * Constructs a new simple data list frame.
   * @param ownerFrame the owner frame
   */
  public SimpleDataListFrame(Frame ownerFrame) {
    super(ownerFrame);
    centerList.setSelectionMode(ListSelectionModel.MULTIPLE_INTERVAL_SELECTION);
    listScrollPane.getViewport().setView(centerList);
    jSplitPane1.add(listScrollPane, 1);
    if (buttonPresent != null) buttonPresent.setSelectDependence(centerList);
    buttonChoose.setSelectDependence(centerList);
    buttonProperties.setSelectDependence(centerList, true);
    buttonCopy.setSelectDependence(centerList);
    buttonPrint.setSelectDependence(centerList);
    buttonDelete.setSelectDependence(centerList, true);
    centerList.setEnterButton(getDefaultButton());
    centerList.addFocusListener(new java.awt.event.FocusAdapter() {
      public void focusGained(FocusEvent e) {
        rootFrame.getRootPane().setDefaultButton(getDefaultButton());
      }
    });
  }

  protected MustButton getDefaultButton() {
    if (buttonPresent != null) {
      return buttonPresent; // preferred default button
    } else if (isChoosingAllowed()) {
      return buttonChoose;
    } else {
      return buttonProperties; 
    }
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

  @Override
  protected void beginListFill() {
    centerList.addIndexedItem(getTranslation("TEXT_LOADING"), new Identifier(-1));
    centerList.repaint();
    centerList.prepareNewModel();
  }

  @Override
  protected void beginListExtension() {
    centerList.repaint();
    centerList.prepareModelForExtension();
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

  public Identifier[] getSelectedIdentifiers() {
    Identifier[] identifiers = new Identifier[centerList.getSelectedIndices().length];
    for (int i = 0; i < identifiers.length; i++) {
      identifiers[i] = centerList.getIdentifier(centerList.getSelectedIndices()[i]);
    }
    return identifiers;
  }

  /**
   * Returns the selected item.
   * @return the selected item
   */
  protected final String getSelectedItem() {
    return centerList.getSelectedItem();
  }

  public String[] getSelectedItems() {
    String[] items = new String[centerList.getSelectedIndices().length];
    for (int i = 0; i < items.length; i++) {
      items[i] = centerList.getModel().getElementAt(centerList.getSelectedIndices()[i]).toString();
    }
    return items;
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
  
  /**
   * Called from DataObject when data have been changed.
   * @param dce the data change event
   * @see de.must.dataobj.DataChangeListener
   * @see de.must.dataobj.DataObject
   */
  protected void handleDataChangeIndividually(DataChangedEvent dce) {
    if (dce.getMode() == DataChangedEvent.DELETION_MODE) {
      removeEntry(dce.getIdentifier());
    } else {
      selectOrApendListEntry(dce.getIdentifier());
    }
  }

  private final void selectOrApendListEntry(Identifier identifier) {
    int i;
    resetExtensionMode();
    listDataObject.load(identifier, getSelectionFields());
    for (i = 0; i < centerList.getItemCount(); i++) {
      if (centerList.getIdentifier(i).equals(identifier)) {
        centerList.updateItem(getRowString(), i);
        centerList.select(i);
        return;
      }
    }
    listModification = LIST_MODIFICATION_APPEND;
    centerList.addIndexedItem(getRowString(), identifier);
    centerList.select(i);
  }

  @Override
  public void setSelectedIdentifier(Identifier identifier) {
    for (int i = 0; i < centerList.getItemCount(); i++) {
      if (centerList.getIdentifier(i).equals(identifier)) {
        selectListIndex(i);
        return;
      }
    }
  }

  /**
   * Adds an entry at the end of the list.
   */
  protected final void appendListEntry() {
    centerList.addIndexedItem(getRowString(), listDataObject.getIdentifier());
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
    centerList.setCursor(WaitCursor);
  }

  /**
   * Called when the list thread ends.
   */
  protected final void endOfListThread() {
    centerList.setCursor(DefaultCursor);
  }

  /**
   * Returns the row of the list with the overview information, which
   * allows the user to identify the entry.
   * @return Returns the row of the list with the overview information
   */
  protected abstract String getRowString();

}
