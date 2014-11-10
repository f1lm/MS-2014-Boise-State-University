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

import de.must.middle.*;
import de.must.util.Miscellaneous;

import javax.swing.*;
import java.awt.event.*;

/**
 * Entitlement controlled MenuBar.
 * @author Christoph Mueller
 */
public class MustMenuBar extends JMenuBar {

  private int menuCounter = -1;
  private int menuItemCounter = -1;
  private EntitlementStd entitlement;
  private int lastMainMenu;
  public JMenu menuArray[];
  public MustMenuItem menuItemArray []; // keep them in mind for later modifications!

  /**
   * Constructs a menubar with a maximum of 20 menues and 500 Items
   */
  public MustMenuBar() {
    this(20, 500);
  }

  public MustMenuBar(EntitlementStd entitlement) {
    this();
    this.entitlement = entitlement;
  }

  public MustMenuBar(int menuCapacity, int menuItemCapacity) {
    menuArray = new JMenu[menuCapacity];
    menuItemArray = new MustMenuItem[menuItemCapacity];
  }

  public JMenu addMenu(String menuText) {
    JMenu menu = new JMenu(Miscellaneous.getReplacement(menuText));
    menuArray[++menuCounter] = menu;
    add(menu);
    lastMainMenu = menuCounter;
    return menu;
  }

  public JMenu addMenu(String menuText, int area) {
    menuArray[++menuCounter] = new JMenu();
    menuArray[menuCounter].setText(Miscellaneous.getReplacement(menuText));
    if (entitlement == null || entitlement.isEntitled(area)) {
      add(menuArray[menuCounter]);
    }
    lastMainMenu = menuCounter;
    return menuArray[menuCounter];
  }

  public void addMenu(String menuText, String territory) {
    addMenu(menuText, EntitlementStd.RIGHT_READ, territory);
  }

  public void addMenu(String menuText, int minRights, String territory) {
    menuArray[++menuCounter] = new JMenu();
    menuArray[menuCounter].setText(Miscellaneous.getReplacement(menuText));
    if (entitlement == null || entitlement.getRight(territory) <= minRights) {
      add(menuArray[menuCounter]);
    }
    lastMainMenu = menuCounter;
  }

  public JMenu addSubMenu(String menuText) {
    menuArray[++menuCounter] = new JMenu(Miscellaneous.getReplacement(menuText));
    menuArray[lastMainMenu].add(menuArray[menuCounter]);
    return menuArray[menuCounter];
  }

  public void addSubMenu(String menuText, int area) {
    addSubMenu(menuText);
    menuArray[menuCounter].setEnabled(entitlement == null || entitlement.isEntitled(area));
  }

  public MustMenuItem addMenuItemWithoutEntitlementCheck(String menuText, int keyEvent, int keyControlEvent) {
    MustMenuItem item = new MustMenuItem(Miscellaneous.getReplacement(menuText));
    menuItemArray[++menuItemCounter] = item;
    if (keyEvent != 0) item.setAccelerator(KeyStroke.getKeyStroke(keyEvent, keyControlEvent));
    menuArray[lastMainMenu].add(item);
    return item;
  }
  
  public MustMenuItem addMenuItem(String menuText, int area) {
    menuItemArray[++menuItemCounter] = new MustMenuItem();
    menuItemArray[menuItemCounter].setText(Miscellaneous.getReplacement(menuText));
    menuArray[lastMainMenu].add(menuItemArray[menuItemCounter]);
    controlEntitlement(area);
    return menuItemArray[menuItemCounter];
  }

  public MustMenuItem addMenuItem(String menuText, String territory) {
    return addMenuItem(menuText, EntitlementStd.RIGHT_READ, territory);
  }

  public MustMenuItem addMenuItem(String menuText, int minRights, String territory) {
    menuItemArray[++menuItemCounter] = new MustMenuItem();
    menuItemArray[menuItemCounter].setText(Miscellaneous.getReplacement(menuText));
    menuArray[lastMainMenu].add(menuItemArray[menuItemCounter]);
    controlEntitlement(territory, minRights);
    return menuItemArray[menuItemCounter];
  }

  public MustMenuItem addMenuItem(String menuText, int area, int keyEventKey) {
    int autoModifier = ActionEvent.ALT_MASK;
    if (keyEventKey >= 112 & keyEventKey <= 123) autoModifier = 0; // function keys
    menuItemArray[++menuItemCounter] = new MustMenuItem();
    menuItemArray[menuItemCounter].setText(Miscellaneous.getReplacement(menuText));
    menuArray[lastMainMenu].add(menuItemArray[menuItemCounter]);
    menuItemArray[menuItemCounter].setAccelerator(KeyStroke.getKeyStroke(keyEventKey, autoModifier));
    controlEntitlement(area);
    return menuItemArray[menuItemCounter];
  }

  public MustMenuItem addMenuItem(String menuText, String territory, int keyEventKey) {
    return addMenuItem(menuText, EntitlementStd.RIGHT_READ, territory, keyEventKey);
  }

  public MustMenuItem addMenuItem(String menuText, int minRights, String territory, int keyEventKey) {
    int autoModifier = ActionEvent.ALT_MASK;
    if (keyEventKey >= 112 & keyEventKey <= 123) autoModifier = 0; // function keys
    menuItemArray[++menuItemCounter] = new MustMenuItem();
    menuItemArray[menuItemCounter].setText(Miscellaneous.getReplacement(menuText));
    menuArray[lastMainMenu].add(menuItemArray[menuItemCounter]);
    menuItemArray[menuItemCounter].setAccelerator(KeyStroke.getKeyStroke(keyEventKey, autoModifier));
    controlEntitlement(territory, minRights);
    return menuItemArray[menuItemCounter];
  }

  public MustMenuItem addMenuItem(String menuText, int area, int keyEventKey, int modifiers) {
    menuItemArray[++menuItemCounter] = new MustMenuItem();
    menuItemArray[menuItemCounter].setText(Miscellaneous.getReplacement(menuText));
    menuArray[lastMainMenu].add(menuItemArray[menuItemCounter]);
    menuItemArray[menuItemCounter].setAccelerator(KeyStroke.getKeyStroke(keyEventKey, modifiers));
    controlEntitlement(area);
    return menuItemArray[menuItemCounter];
  }

  public MustMenuItem addMenuItem(String menuText, String territory, int keyEventKey, int modifiers) {
    return addMenuItem(menuText, EntitlementStd.RIGHT_READ, territory, keyEventKey, modifiers);
  }

  public MustMenuItem addMenuItem(String menuText, int minRights, String territory, int keyEventKey, int modifiers) {
    menuItemArray[++menuItemCounter] = new MustMenuItem();
    menuItemArray[menuItemCounter].setText(Miscellaneous.getReplacement(menuText));
    menuArray[lastMainMenu].add(menuItemArray[menuItemCounter]);
    menuItemArray[menuItemCounter].setAccelerator(KeyStroke.getKeyStroke(keyEventKey, modifiers));
    controlEntitlement(territory, minRights);
    return menuItemArray[menuItemCounter];
  }

  /**
   *
   * @param menuText
   * @return
   */
  public MustMenuItem addMenuItem(String menuText) {
    menuItemArray[++menuItemCounter] = new MustMenuItem();
    menuItemArray[menuItemCounter].setText(Miscellaneous.getReplacement(menuText));
    menuArray[lastMainMenu].add(menuItemArray[menuItemCounter]);
    return menuItemArray[menuItemCounter];
  }

  public MustMenuItem addSubMenuItem(String menuText, int area) {
    menuItemArray[++menuItemCounter] = new MustMenuItem();
    menuItemArray[menuItemCounter].setText(Miscellaneous.getReplacement(menuText));
    menuArray[menuCounter].add(menuItemArray[menuItemCounter]);
    controlEntitlement(area);
    return menuItemArray[menuItemCounter];
  }

  public MustMenuItem addSubMenuItem(String menuText) {
    menuItemArray[++menuItemCounter] = new MustMenuItem();
    menuItemArray[menuItemCounter].setText(Miscellaneous.getReplacement(menuText));
    menuArray[menuCounter].add(menuItemArray[menuItemCounter]);
    return menuItemArray[menuItemCounter];
  }

  public MustMenuItem addSubMenuItem(String menuText, int keyEventKey, int modifiers) {
    menuItemArray[++menuItemCounter] = new MustMenuItem();
    menuItemArray[menuItemCounter].setText(Miscellaneous.getReplacement(menuText));
    if (keyEventKey != 0) menuItemArray[menuItemCounter].setAccelerator(KeyStroke.getKeyStroke(keyEventKey, modifiers));
    menuArray[menuCounter].add(menuItemArray[menuItemCounter]);
    return menuItemArray[menuItemCounter];
  }

  public void addSeparator() {
    menuArray[menuCounter].addSeparator();
  }

  private void controlEntitlement(int area) {
    if (entitlement != null && !entitlement.isEntitled(area)) {
       disableLastMenuItem();
    }
  }

  private void controlEntitlement(String territory, int minRights) {
    if (entitlement != null && entitlement.getRight(territory) > minRights) {
       disableLastMenuItem();
    }
  }
  
  public boolean isEntitled(int area) {
    return entitlement == null || entitlement.isEntitled(area);
  }

  public void disableLastMenuItem() {
    menuItemArray[menuItemCounter].setEnabled(false);
  }

}

