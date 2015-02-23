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

import de.must.io.Logger;
import de.must.middle.EntitlementStd;
import de.must.util.Callback;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.Vector;

/**
 * A menu frame.
 * @author Christoph Mueller
 */
public abstract class MenuFrame extends MustFrame implements ActionListener {
  
  /**
   * Menu information: e.g. if user may see this menu at all. If not, item of this (sub-)menu
   * may be left without specifying the territory of each item.
   * Hint: Please prefer methods of this class, accessing methods of menuBar directly
   * by the sub class will become deprecated since we want to avoid menu item 
   * disabled by entitlement. Instead these item should be suppressed.
   * @author Christoph Mueller
   */
  private class MenuInformation {
    JMenu menu;
    MenuInformation(JMenu menu) {
      this.menu = menu;
    }
    boolean isAvailable() {
      return menu != null;
    }
  }

  private Vector<MenuInformation> menuStack = new Vector<MenuInformation>();
  private EntitlementStd entitlement = getEntitlement();
  /** Accessing methods of menuBar directly by the sub class will become deprecated since we want to avoid menu item disabled by entitlement */
  protected MustMenuBar menuBar = new MustMenuBar(entitlement);
  private boolean anyMenuItemSinceMenuBeginOrSeparator;
  /** We only plan separators because we cannot know if any menu item will follow */
  private boolean planSeparator;
  private boolean isLaidOut;
  protected JPanel toolbarPanel = new JPanel();
  protected JPanel centerPanel = new JPanel();
  protected JPanel bottomPanel = new JPanel();
  protected MustStatusLabel statusLabel = new MustStatusLabel();

  public MenuFrame() {
    setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE); // to consider the isClosingAllowed() aspect
    enableEvents(AWTEvent.MOUSE_EVENT_MASK);
    centerPanel.setLayout(new BorderLayout());
    centerPanel.add(toolbarPanel, BorderLayout.NORTH);
    getContentPane().setLayout(new BorderLayout());
    getContentPane().add(BorderLayout.CENTER, new JScrollPane(centerPanel));
    toolbarPanel.setLayout(new FlowLayout(FlowLayout.LEFT));
    getContentPane().add(bottomPanel, BorderLayout.SOUTH);
    bottomPanel.setLayout(new BorderLayout());
    bottomPanel.add(statusLabel, BorderLayout.SOUTH);
    isLaidOut = WinContr.getInstance().layout((Window)this);
    if (!isLaidOut) setSize(new Dimension(AwtConst.getSreeenWidth(), 100));
    StatusClear statusClear1 = new StatusClear();
    statusClear1.start();
//    Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
//      public void run() {
//        Logger.getInstance().debug(getClass(), "Shutdown request detected in MenuFrame");
//        releaseExternalResources();
//        WinContr.getInstance().close(MenuFrame.this, false);
//      }
//    }));
  }
  
  protected abstract EntitlementStd getEntitlement();

  protected void creationEnding() {
    packIfNotLaidOut();
  }

  /**
   * Sets the title of the menu frame with a hint to demo version if it is one.
   * @param newTitle the regular title to set
   * @param licenceType the license type
   */
  public void setTitle(String newTitle, int licenceType) {
    switch (licenceType) {
    case de.must.util.Licence.DEMO_LICENCE: 
      this.setTitle(newTitle + " (Evaluation Version)");
      break;
    case de.must.util.Licence.PROFESSIONAL_DEMO_LICENCE: 
      this.setTitle(newTitle + " (Evaluation Version)");
      break;
    default:
      this.setTitle(newTitle);
      break;
    }
  }
  
  /**
   * Sets the title of the menu frame.
   * @param newTitle the new title of the menu frame
   */
  public void setTitle(String newTitle) {
    if (MainStd.debugMode) super.setTitle(newTitle + " in debug mode");
    else super.setTitle(newTitle);
  }

  /**
   * Closes all sub menus and starts to build an new main menu with the given text.
   * @param menuText the menu's label
   */
  protected JMenu newMenu(String menuText) {
    return newMenu(menuText, true);
  }
  
  /**
   * Closes all sub menus and starts to build an new main menu with the given text.
   * @param menuText the menu's label
   */
  protected JMenu newMenu(String menuText, int territory) {
    return newMenu(menuText, menuBar.isEntitled(territory));
  }

  private JMenu newMenu(String menuText, boolean entitled) {
    JMenu menu = null;
    if (entitled) menu = menuBar.addMenu(menuText);
    menuStack.clear();
    menuStack.add(new MenuInformation(menu));
    anyMenuItemSinceMenuBeginOrSeparator = false;
    planSeparator = false;
    return menu;
  }

  protected void addSeparator() {
    if (anyMenuItemSinceMenuBeginOrSeparator) planSeparator = true; 
    anyMenuItemSinceMenuBeginOrSeparator = false;
  }

  protected void addMenuItem(String menuText, final Callback callback) {
    addMenuItem(menuText, false, callback);
  }

  protected void addMenuItem(String menuText, boolean dialogBeforeAction, final Callback callback) {
    addMenuItem(menuText, dialogBeforeAction, EntitlementStd.AREA_GENERAL, callback);
  }
  
  protected void addMenuItem(String menuText, int subjectArea, final Callback callback) {
    addMenuItem(menuText, false, subjectArea, callback);
  }

  protected void addMenuItem(String menuText, boolean dialogBeforeAction, int subjectArea, final Callback callback) {
    addMenuItem((dialogBeforeAction?menuText + "...":menuText), subjectArea, 0, callback);
  }
  
  protected void addMenuItem(String menuText, int subjectArea, int keyEvent, final Callback callback) {
    addMenuItem(menuText, subjectArea, keyEvent, 0, callback);
  }
  
  protected void addMenuItem(String menuText, int territory, int keyEvent, int keyControlEvent, final Callback callback) {
    if (menuStack.lastElement().isAvailable() && menuBar.isEntitled(territory)) {
      if (planSeparator) {
        menuBar.addSeparator();
        planSeparator = false;
      }
      if (menuStack.size() > 0) {
        if (menuStack.lastElement().isAvailable()) menuBar.addSubMenuItem(menuText, keyEvent, keyControlEvent).addActionListener(new ActionListener() {
          public void actionPerformed(ActionEvent e) {
            statusLabel.reset();
            callback.callback();
          }
        });
      } else {
        menuBar.addMenuItemWithoutEntitlementCheck(menuText, keyEvent, keyControlEvent).addActionListener(new ActionListener() {
          public void actionPerformed(ActionEvent e) {
            statusLabel.reset();
            callback.callback();
          }
        });
      }
      anyMenuItemSinceMenuBeginOrSeparator = true;
    }
  }
  
  protected void beginSubMenu(String menuText, int territory) {
    JMenu menu = null;
    if (menuStack.lastElement().isAvailable() && menuBar.isEntitled(territory)) {
      menu = menuBar.addSubMenu(menuText);
    }
    menuStack.add(new MenuInformation(menu));
    anyMenuItemSinceMenuBeginOrSeparator = false;
    planSeparator = false;
  }
  
  protected void closeSubMenu() {
    menuStack.removeElementAt(menuStack.size() - 1);
  }

  public void setDefaultSize(Dimension layoutDim) {
    if (!isLaidOut) this.setSize(layoutDim);
  }

  public void setDefaultLocation(int width, int height) {
    if (!isLaidOut) this.setLocation(width, height);
  }

  protected void packIfNotLaidOut() {
    if (!isLaidOut) pack();
  }

  /**
   * Sets the message to be read by the user, which is presented in the status
   * label in this context.
   * @param message the message for the user
   */
  public void setMessage(String message) {
    statusLabel.setStatus(message);
  }

  /**
   * Sets the message to be read by the user.
   * @param messageToKeep the message for the user
   */
  public void setMessageToKeep(String messageToKeep) {
    statusLabel.setRemainStatus(messageToKeep);
  }

  public void actionPerformed(ActionEvent e) {
  }

  public boolean interpret (KeyEvent keyEventToInterpret, java.awt.Container context) {
    return false;
  }

  @Override
  public void windowClosing(WindowEvent e) { // different because main window
    Logger.getInstance().debug(getClass(), e);
    closeRequest();
  }

  protected void closeRequest() {
    if (MustFrame.isClosingAllowedForAllFrames()) {
      WinContr.getInstance().close(this, false);
      releaseExternalResources();
      Logger.getInstance().debug(getClass(), "calling System.exit(0)");
      System.exit(0);
    }
  }
  
  /**
   * Release external resources. Override this method for individual implementation.
   */
  protected void releaseExternalResources() {
  }

  @Override
  public boolean isClosingAllowed(int closeConfirmId) { // dummy!
    return true;
  }

  class StatusClear extends Thread {
    public void run() {
      try {
        sleep(5000);
        statusLabel.resetDefault();
      }
      catch (InterruptedException e) {}
    }
  }

}

