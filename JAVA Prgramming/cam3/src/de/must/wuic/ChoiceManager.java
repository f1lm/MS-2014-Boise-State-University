/*
 * Copyright (c) 2013 Christoph Mueller. All rights reserved.
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

import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.Vector;

import javax.swing.AbstractListModel;
import javax.swing.JList;
import javax.swing.JPopupMenu;
import javax.swing.JScrollPane;
import javax.swing.SwingUtilities;

import de.must.io.Logger;
import de.must.util.Callback;

/**
 * Choice Manager.
 * Builds a list of valid input choice and transfers selected data into the input field.
 * @author Christoph Mueller
 */
public abstract class ChoiceManager implements KeyListener, Runnable {
  
  private static boolean active = true;
  
  public static void setActive(boolean active) {
    ChoiceManager.active = active;
  }
  
  private MustTextField textField;
  private Callback callback;
  private int minLengthForSearch;
  protected int choiceLimit;
  private Thread thisThread;
  private boolean waitAgain;
  private boolean actionPending = false;
  private long lastKeyEventTime;
  private int lastKeyCode;
  private String inputAtThreadBegin;
  private Vector<String> choice;
  private JList<String> list;
  private JScrollPane listScrollPane;
  private JPopupMenu menu;
  
  /**
   * Constructs a new choice manager.
   * @param textField  the text field whose input is to be completed. 
   */
  public ChoiceManager(MustTextField textField) {
    this(textField, 2, 15, null);
  }
  
  /**
   * Constructs a new choice manager.
   * @param textField  the text field whose input is to be completed. 
   * @param callback  the callback after user has chosen
   */
  public ChoiceManager(MustTextField textField, Callback callback) {
    this(textField, 2, 15, callback);
  }
  
  /**
   * Constructs a new choice manager.
   * @param textField  the text field whose input is to be completed. 
   * @param minLengthForSearch  the minimum length of user input to start a search for possible choices
   * @param choiceLimit  the maximum of choices to list - if more items exist there will be no choice list
   */
  public ChoiceManager(MustTextField textField, int minLengthForSearch, int choiceLimit, Callback callback) {
    this.textField = textField;
    this.minLengthForSearch = minLengthForSearch;
    this.choiceLimit = choiceLimit;
    this.callback = callback;
    textField.addKeyListener(this);
    textField.addFocusListener(new FocusListener() {
      public void focusLost(FocusEvent e) {
        if (!active) return;
        Logger.getInstance().debug(getClass(), "focus lost");
        actionPending = false; // don't open choice if user has already left text field 
        if (menu != null) EventQueue.invokeLater(new Runnable() {
          public void run() {
            Logger.getInstance().debug(getClass(), "Event queue is now executing focus lost runnable");
            if (menu != null) menu.setVisible(false); // check again != null, this might have changed
            list = null;
          }
        }); 
      }
      public void focusGained(FocusEvent e) {}
    });
  }
  
  public int getMinLengthForSearch() {
    return minLengthForSearch;
  }

  public void setMinLengthForSearch(int minLengthForSearch) {
    this.minLengthForSearch = minLengthForSearch;
  }

  @Override
  public void keyTyped(KeyEvent e) {
  }

  @Override
  public void keyPressed(KeyEvent e) {
    if (!active) return;
    Logger.getInstance().debug(getClass(), "key pressed" );
    if (KeyEvent.VK_ENTER == e.getKeyCode()) {
      if (list != null && list.getSelectedIndex() != -1) {
        transferChoice(list.getSelectedValue());
        if (callback != null) callback.callback();
        e.consume(); // other actions depending on enter are suppressed
      } else {
        destroyMenu();
      }
    }
  }

  @Override
  public void keyReleased(KeyEvent e) {
    if (!active) return;
    Logger.getInstance().debug(getClass(), "key released" );
    lastKeyEventTime = System.currentTimeMillis();
    lastKeyCode = e.getKeyCode();
    if (Character.isLetterOrDigit(e.getKeyChar())
      || e.getKeyCode() == KeyEvent.VK_DELETE && menu != null
      || e.getKeyCode() == KeyEvent.VK_BACK_SPACE && menu != null
    ) {
      if (textField.getText().length() < minLengthForSearch) {
        destroyMenu();
      } else if (!actionPending) {
        thisThread = new Thread(ChoiceManager.this);
        thisThread.start();
      }
    } else if (KeyEvent.VK_ESCAPE == e.getKeyCode()) {
      destroyMenu();
    } else if (KeyEvent.VK_UP == e.getKeyCode()) {
      if (menu != null && list.getSelectedIndex() > 0) {
        list.setSelectedIndex(list.getSelectedIndex() - 1);
        list.ensureIndexIsVisible(list.getSelectedIndex());
      }
    } else if (KeyEvent.VK_DOWN == e.getKeyCode()) {
      if (menu != null && list.getSelectedIndex() < list.getModel().getSize()) {
        list.setSelectedIndex(list.getSelectedIndex() + 1);
        list.ensureIndexIsVisible(list.getSelectedIndex());
      }
    } else if (KeyEvent.VK_ENTER == e.getKeyCode()) {
      if (list != null && list.getSelectedIndex() == -1) {
        destroyMenu();
      }
    }
  }

  @Override
  public void run() {
    actionPending = true;
    do {
      try {
        waitAgain = false;
        Thread.sleep(200);
      } catch (InterruptedException e) {
        Logger.getInstance().error(getClass(), e);
      }
    } while (waitAgain);
    if (actionPending) {
      presentChoice();
    }
    actionPending = false;
  }
  
  protected void presentChoice() {
    if (textField.getText().length() < minLengthForSearch) {
      destroyMenu();
      return;
    }
    do {
      inputAtThreadBegin = textField.getText();
      choice = getChoice(textField.getText());
    } while (actionPending && textField.getText().length() >= minLengthForSearch && !textField.getText().equals(inputAtThreadBegin));
    if (!isStillRelevant()
     || choice == null
     || choice.size() == 0
     || choice.size() == 1 && textField.getText().equals(choice.firstElement())
    ){
      destroyMenu();
      return;
    }
    if (choice.size() == 1 && choice.firstElement().startsWith(textField.getText())) { // case sensitive!
      textField.setText(choice.firstElement());
      textField.select(inputAtThreadBegin.length(), choice.firstElement().length());
      if (callback != null) callback.callback();
      destroyMenu();
      return;
    }
    if (list == null) {
      list = new JList<String>(choice);
      list.addMouseListener(new MouseListener() {
        public void mouseReleased(MouseEvent e) {
          if (list.getSelectedIndex() != -1) {
            transferChoice(list.getSelectedValue());
          }
        }
        public void mousePressed(MouseEvent e) {}
        public void mouseExited(MouseEvent e) {}
        public void mouseEntered(MouseEvent e) {}
        public void mouseClicked(MouseEvent e) {}
      });
    }
    else {
      list.setModel(new AbstractListModel<String>() {
        public int getSize() { return choice.size(); }
        public String getElementAt(int i) { return choice.elementAt(i); }
      });
    }
    if (menu == null) SwingUtilities.invokeLater(new Runnable() {
      public void run() { // seems to solve problem that scroll pane with content is not visible from time to time 
        menu = new JPopupMenu();
        menu.add(listScrollPane = new JScrollPane(list));
        int width = textField.getWidth();
        if (width < 100) width = 100;
        menu.setPreferredSize(new Dimension(width, 160));
        menu.setLocation((int)(textField.getLocationOnScreen().getX()), (int)textField.getLocationOnScreen().getY() + textField.getHeight());
        menu.setVisible(true);
      }
    });
  }
  
  private void destroyMenu() {
    if (menu != null) menu.setVisible(false);
    menu = null;
    list = null;
  }
  
  protected abstract Vector<String> getChoice(String fragment);
  
  protected boolean isStillRelevant() {
    // e.g. in case of focus lost during long search
    return actionPending 
        && textField.getText().equals(inputAtThreadBegin)
        && textField.hasFocus()
        && KeyEvent.VK_ENTER != lastKeyCode // inquiry already started
    ;
  }
  
  private void transferChoice(String text) {
    textField.setText(text);
    textField.setCaretPosition(text.length());
    destroyMenu();
  }

}
