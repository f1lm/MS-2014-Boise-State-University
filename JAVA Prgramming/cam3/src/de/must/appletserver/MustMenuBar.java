/*
 * Copyright (c) 2011-2012 Christoph Mueller. All rights reserved.
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

package de.must.appletserver;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Iterator;
import java.util.Vector;

import de.must.applet.Constants;
import de.must.middle.EntitlementStd;
import de.must.util.Callback;
import de.must.util.Miscellaneous;

/**
 * Menu bar analogous to JMenuBar containing submenus and menu items.
 * @author Christoph Mueller
 */
public abstract class MustMenuBar implements Remotable {

  protected SessionData sessionData;
  private MustMenu rootMenu = new MustMenu("root menu", null, 0, EntitlementStd.RIGHT_READ);
  private MustMenu currentMenu = rootMenu;
  /** All items without structure */
  private Vector<MustMenuItem> allItemsWoStruct = new Vector<MustMenuItem>();
  private boolean separatorBeforeNextItem;
  protected MustMenuBar menuBar = this; // to allow same code as for menus using wuic 

  /**
   * Constructs a new menu bar.
   * @param sessionData the session's public data
   */
  public MustMenuBar(SessionData sessionData) {
    this.sessionData = sessionData;
  }

  public void addMenu(String menuText) {
    addMenu(menuText, EntitlementStd.AREA_GENERAL);
  }

  /**
   * Creates a new top first level menu and adds it to the menu bar,
   * former sub menus are implicitly closed.
   * @param menuText the menu text
   * @param subjectArea the subject area as to be defined in subclasses of EntitlementStd
   * @see de.must.middle.EntitlementStd
   */
  public void addMenu(String menuText, int subjectArea) {
    addMenu(menuText, subjectArea, EntitlementStd.RIGHT_READ);
  }

  /**
   * Creates a new top first level menu and adds it to the menu bar,
   * former submenus are implicitly closed.
   * @param menuText the menu text
   * @param subjectArea the subject area as to be defined in subclasses of EntitlementStd
   * @param minimumLevel the minimum access level a user must gain that he may
   * access the menu at all
   * @see de.must.middle.EntitlementStd
   */
  public void addMenu(String menuText, int subjectArea, int minimumLevel) {
    separatorBeforeNextItem = false;
    if (sessionData.entitlement == null || sessionData.entitlement.isEntitled(subjectArea)) {
      MustMenu newMenu = new MustMenu(Miscellaneous.getReplacement(menuText), rootMenu, subjectArea, minimumLevel);
      rootMenu.addMenu(newMenu);
      currentMenu = newMenu;
    }
  }

  /**
   * Creates a new menu one level below the current menu.
   * @param menuText the menu text
   * @param subjectArea the subject area as to be defined in subclasses of EntitlementStd
   * @see de.must.middle.EntitlementStd
   */
  public void addSubMenu(String menuText, int subjectArea) {
    MustMenu newMenu = new MustMenu(Miscellaneous.getReplacement(menuText), currentMenu, subjectArea);
    currentMenu.addMenu(newMenu);
    currentMenu = newMenu;
  }

  public MustMenuItem addMenuItem(String menuText, int subjectArea) {
    return addMenuItem( menuText, subjectArea, 0);
  }
  
  public MustMenuItem addMenuItem(String menuText, int subjectArea, int keyEvent) {
    return addMenuItem(menuText, subjectArea, keyEvent, 0);
  }
  
  public MustMenuItem addMenuItem(String menuText, int subjectArea, int keyEvent, int whatever) {
    // TODO keyEvent
    if (sessionData.entitlement != null && !sessionData.entitlement.isEntitled(subjectArea)) {
      MustMenuItem item = new MustMenuItem(Miscellaneous.getReplacement(menuText));
      item.separatorBefore = separatorBeforeNextItem;
      separatorBeforeNextItem = false;
      allItemsWoStruct.add(item);
      currentMenu.addElement(item);
      return item;
    }
    return null;
  }
  
  public void addMenuItem(String menuText, int subjectArea, final Callback callback) {
    addMenuItem(menuText, subjectArea, 0, callback);
  }
  
  public void addMenuItem(String menuText, int subjectArea,  int keyEvent, final Callback callback) {
    addMenuItem(menuText, subjectArea, keyEvent, 0, callback);
  }
  
  public void addMenuItem(String menuText, int subjectArea,  int keyEvent, int keyControlEvent, final Callback callback) {
    // TODO keyEvent
    if (sessionData.entitlement == null || sessionData.entitlement.isEntitled(subjectArea)) {
      MustMenuItem item = new MustMenuItem(Miscellaneous.getReplacement(menuText));
      item.separatorBefore = separatorBeforeNextItem;
      separatorBeforeNextItem = false;
      allItemsWoStruct.add(item);
      currentMenu.addElement(item);
      item.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent e) {
          callback.callback();
        }
      });
    }
  }
  
  public void addSeparator() {
    separatorBeforeNextItem = true;
  }
  
  /**
   * Closes the current menu and allows to continue in the menu one level above.
   */
  public void closeSubMenu() {
    currentMenu = currentMenu.getFatherMenu();
    separatorBeforeNextItem = false;
  }
  
  public void buildRemoteView(ToAppletWriter out) {
    buildRemoteView(out, rootMenu, 0);
  }
  
  private void buildRemoteView(ToAppletWriter out, MustMenuNode mustMenuNode, int level) {
    if (level > 0) {
      out.println(Constants.ACTION_BEGIN_TAG);
      out.addTodoTag(Constants.BEGIN_MENU);
      out.println(Constants.LABEL_BEGIN + mustMenuNode.getDescription() + Constants.LABEL_END);
      out.println(Constants.ACTION_END_TAG);
    }
    Iterator<MustMenuNode> iterator = mustMenuNode.iterator();
    while (iterator.hasNext()) {
      MustMenuNode mustMenuNode2 = iterator.next();
      if (mustMenuNode2.size() > 0) {
        buildRemoteView(out, mustMenuNode2, level+1);
      } else {
        if (mustMenuNode2 instanceof MustMenuItem && ((MustMenuItem)mustMenuNode2).separatorBefore) {
          out.sendTodoAction(Constants.CREATE_SEPARATOR);
        }
        out.println(Constants.ACTION_BEGIN_TAG);
        out.addTodoTag(Constants.CREATE_MENU_ITEM);
        out.println(Constants.LABEL_BEGIN + mustMenuNode2.getDescription() + Constants.LABEL_END);
        out.println(Constants.ID_TAG_BEGIN + mustMenuNode2.getActionID() + Constants.ID_TAG_END);
        out.println(Constants.ACTION_END_TAG);
      }
    }
    if (level > 0) {
      out.sendTodoAction(Constants.END_MENU);
    }
  }

  private String getTranslation(String key) {
    // TODO
    return key;
  }

  @Override
  public void setToolTipText(String newToolTipText) {} // not needed here

  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
//    if (!enabled) return; 
//    if (!visible) return; 
    String actionParameterValue = request.getParameter(Constants.MENU_BUTTON_ACTION);
    if (actionParameterValue != null && actionParameterValue.length() > 0) {
      Iterator<MustMenuItem> iterator = allItemsWoStruct.iterator();
      while (iterator.hasNext()) {
        MustMenuItem mustMenuItem = iterator.next();
        if (actionParameterValue.equals(mustMenuItem.getActionID())) {
          mustMenuItem.performAction(actionParameterValue);
          return;
        }
      }
    }
  }

  @Override
  public void destroy() {
  }

}
