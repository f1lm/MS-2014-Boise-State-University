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
                                                    
import de.must.dataobj.Identifier;
import de.must.io.Logger;

import javax.swing.*;
import javax.swing.event.*;

import java.awt.EventQueue;
import java.awt.event.*;
import java.util.*;

/**
 * A JList with assigned identifiers, useful to assign primary keys.
 * @author Christoph Mueller
 */
public class MustList extends JList<String> implements MouseListener, KeyListener, ListSelectionListener, AnySelectionSpeaker {

  private IndentifierListModel listModel = new IndentifierListModel();
  private MustButton enterButton;
  private Vector<AnySelectionListener> anySelectionListener;

  /**
   * Constructs a new list.
   */
  public MustList() {
    this.setModel(listModel);
    this.addMouseListener(this);
    this.addKeyListener(this);
    this.addListSelectionListener(this);
  }

  /**
   * Sets the button to be clicked if enter is pressed or the item is double clicked.
   * @param enterButton the new item default button
   */
  public void setEnterButton(MustButton enterButton) {
    this.enterButton = enterButton;
  }

  public IndentifierListModel getIdModel() {
    return listModel;
  }
  
  /**
   * To be called as a workaround to avoid painting problems by dynamic JList extension.
   * Disconnects the current model from the view.
   */
  public void prepareModelForExtension() {
    setVisible(false);
  	setModel(new IndentifierListModel());
  }

  /**
   * Prepares a new model to be applied later by calling applyNewModel().
   * @see #applyNewModel()
   */
  public void prepareNewModel() {
    listModel = new IndentifierListModel();
  }

  /**
   * Applies the new model, prepared previously in disconnected state.
   * @see #prepareNewModel()
   * @see #prepareModelForExtension()
   */
  public void applyNewModel() {
    setModel(listModel);
    setVisible(true);
  }

  /**
   * Removes all items of the list and clears the identifier array.
   */
  public void removeAll() {
    listModel.removeAllElements();
    // to trigger ServeSelectDependence:
    super.fireSelectionValueChanged(-1, -1, false);
    // this.processItemEvent(new ItemEvent((ItemSelectable)this, 0, new Object(), ItemEvent.DESELECTED));  // awt
  }

  /**
   * Removes an item out of the list including its identifier.
   * @param itemIndex the item to be removed
   */
  public void remove(int itemIndex) {
    listModel.removeElementAt(itemIndex);
  }

  /**
   * Selects an item and ensures, that it is visible.
   * @param index the item to be selected
   */
  public void select(final int index) {
    Logger.getInstance().debug(getClass(), "planing setSelectedIndex");
    EventQueue.invokeLater(new Runnable() { // prevents deadlock
      public void run() {
        Logger.getInstance().debug(getClass(), "executing setSelectedIndex");
        setSelectedIndex(index);
        ensureIndexIsVisible(index);
      }
    });
  }

  /**
   * Adds an item to the list.
   * @param item the item to add
   */
  public void addItem(String item) { // (awt method)
    listModel.addElement(item);
  }

  /**
   * Adds an item to the list and assigns its identifier
   * @param visualItem the item to add
   * @param identifier the identifier of the item
   */
  public void addIndexedItem(String visualItem, Identifier identifier) {
    listModel.addElement(identifier, visualItem);
  }

  /**
   * Updates an item.
   * @param visualItem the new item value
   * @param index the position of the item to be updated
   */
  public void updateItem(String visualItem, int index) {
    listModel.setElementAt(visualItem, index);
  }

  /**
   * Returns the size of the list.
   * @return the size of the list
   */
  public int getItemCount() {
    return this.getModel().getSize();
  }

  /**
   * Returns the selected item.
   * @return the selected item
   */
  public String getSelectedItem() {
    return (this.getSelectedValue().toString());
  }

  /**
   * Returns the selected identifier (in case of integer identification).
   * @return the selected identifier
   */
  public Identifier getSelectedIdentifier() {
    return getIdentifier(getSelectedIndex());
  }

  /**
   * Returns the identifier of the specified item.
   * @param listIndex the index of the item
   * @return the identifier of the item
   */
  public Identifier getIdentifier(int listIndex) {
    return listModel.getIdentifier(listIndex);
  }

  /**
   * Called when mouse exited.
   * @param e the mouse event
   */
  public void mouseExited(MouseEvent e) {}

  /**
   * Called when mouse entered.
   * @param e the mouse event
   */
  public void mouseEntered(MouseEvent e) {}

  /**
   * Called when mouse clicked.
   * @param e the mouse event
   */
  public void mouseClicked(MouseEvent e) {
    // 2011-10-07 moved to mouseReleased due to bad behavior
//    if (getSelectedIndex() != -1 && e.getClickCount() == 2) {
//      if (enterButton != null) enterButton.doClick();
//    }
  }
  /**
   * Called when mouse pressed.
   * @param e the mouse event
   */
  public void mousePressed(MouseEvent e) {}

  /**
   * Called when mouse released.
   * @param e the mouse event
   */
  public void mouseReleased(MouseEvent e) {
    if (getSelectedIndex() != -1 && e.getClickCount() == 2) {
      if (enterButton != null) enterButton.doClick();
    }
  }

  /**
   * Invoked when a key has been pressed.
   * @param e the key event
   */
  public void keyPressed(KeyEvent e) {
    if (enterButton != null & e.getKeyCode() == KeyEvent.VK_ENTER) {
      if (enterButton.isEnabled()) enterButton.doClick();
    }
  }

  /**
   * Invoked when a key has been released. Used for length control.
   * @param e the key event
   */
  public void keyReleased(KeyEvent e) {}

  /**
   * Invoked when a key has been typed. Used for length control.
   * @param e the key event
   */
  public void keyTyped(KeyEvent e) {}

  /**
   * Called when list selection changed to inform registered components.
   * @param e the list selection event
   */
  public void valueChanged(ListSelectionEvent e) {
    fireSelectionChanged();
  }

  /**
   * Adds a selection listener to be notified about selection changed events.
	 * @param l the selection listener to be notified
	 */
  public synchronized void addAnySelectionListener(AnySelectionListener l) {
    Vector<AnySelectionListener> v = anySelectionListener == null ? new Vector<AnySelectionListener>(2) : new Vector<AnySelectionListener>(anySelectionListener);
    if (!v.contains(l)) {
      v.addElement(l);
      anySelectionListener = v;
    }
  }

	/**
   * Removes a selection listener to be notified about selection changed events.
	 * @param l the selection listener
	 */
   public synchronized void removeAnySelectionListener(AnySelectionListener l) {
    if (anySelectionListener != null && anySelectionListener.contains(l)) {
      Vector<AnySelectionListener> v = new Vector<AnySelectionListener>(anySelectionListener);
      v.removeElement(l);
      anySelectionListener = v;
    }
  }

  /**
   * Informs all registered components about the selection changed event.
   */
  public void fireSelectionChanged() {
    fireSelectionChanged(new AnySelectionChangedEvent(getSelectedIndices().length, !(this.getSelectedIndex() == -1), getSelectedIdentifier()));
  }

  private void fireSelectionChanged(AnySelectionChangedEvent e) {
    if (anySelectionListener != null) {
      Vector<AnySelectionListener> listeners = anySelectionListener;
      int count = listeners.size();
      for (int i = 0; i < count; i++) {
        listeners.elementAt(i).selectionChanged(e);
      }
    }
  }

  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey) {
    return WuicGlobal.getInstance().getResourceString(resourceKey);
  }

}
