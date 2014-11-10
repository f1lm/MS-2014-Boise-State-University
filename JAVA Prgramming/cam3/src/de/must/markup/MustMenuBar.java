/*
 * Copyright (c) 2001-2007 Christoph Mueller. All rights reserved.
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

package de.must.markup;

import de.must.util.Miscellaneous;

/**
 * Menu bar analogous to JMenuBar containing submenus and menu items.
 * @author Christoph Mueller
 */
public abstract class MustMenuBar extends Dialog {

  private MustMenu rootMenu = new MustMenu("root menu", null, EntitlementStd.AREA_ROOT);
  private MustMenu currentMenu = rootMenu;
  private MustMenuNode rootNode = rootMenu;
  private Invokable submitter;
  private MenuSubmission submission = new MenuSubmission();
  protected boolean wantToBeFinalized = false;
  private String currentMenuAddress = null;

  /**
   * Constructs a new menu bar.
   * @param sessionData the session's public data
   */
  public MustMenuBar(SessionData sessionData) {
    super(sessionData);
  }

  /**
   * Informs this invokable, from which previous invokable it is submitted.
   * Technique to establish a bilateral communication between invokables.
   * @param submitter the invokable that submitted this invokable
   */
  public void setSubmitter(Invokable submitter) {
    this.submitter = submitter;
  }

  /**
   * Sets the root menu's descripton
   * @param MenuDescription the description of the root menu
   */
  public void setRootMenuDescription(String menuDescription) {
    rootNode.setDescription(menuDescription);
  }

  /**
   * Creates a new top first level menu and adds it to the menu bar,
   * former submenus are implicitly closed.
   * @param menuText the menu text
   * @param subjectArea the subject area as to be defined in subclasses of EntitlementStd
   * @see de.must.middle.EntitlementStd
   */
  public void addMenu(String menuText, int subjectArea) {
    addMenu(menuText, subjectArea, EntitlementStd.LEVEL_VIEW);
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
    MustMenu newMenu = new MustMenu(Miscellaneous.getReplacement(menuText), rootMenu, subjectArea, minimumLevel);
    rootMenu.addMenu(newMenu);
    currentMenu = newMenu;
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

  /**
   * Closes the current menu and allows to continue in the menu one level above.
   */
  public void closeMenu() {
    currentMenu = currentMenu.getFatherMenu();
  }

  /**
   * Creates a new menu item and adds it to the current menu.
   * @param menuText the text of the menu item
   * @param invokeable the invokable to be invoked when the menu item is choosen.
   */
  public void addMenuItem(String menuText, Class<? extends Invokable> invokeable) {
    currentMenu.addElement(new MustMenuItem(Miscellaneous.getReplacement(menuText), invokeable));
  }

  /**
   * Creates a new menu item and adds it to the current menu.
   * @param menuText the text of the menu item
   * @param invokeable the invokable to be invoked when the menu item is choosen.
   * @param toolTipText the tool tip text for the menu item to show
   */
  public void addMenuItem(String menuText, Class<? extends Invokable> invokeable, String toolTipText) {
    currentMenu.addElement(new MustMenuItem(Miscellaneous.getReplacement(menuText), invokeable, toolTipText));
  }

  /**
   * Creates a new menu item and adds it to the current menu to execute things liberal.
   * @param menuText the text of the menu item
   * @param freeAction a free action, e.g. a JavaScript fragment to execute.
   */
  public void addMenuItem(String menuText, FreeAction freeAction) {
    currentMenu.addElement(new MustMenuItem(Miscellaneous.getReplacement(menuText), freeAction));
  }

  /**
   * Creates a new menu item and adds it to the current menu to execute things liberal.
   * @param menuText the text of the menu item
   * @param freeAction a free action, e.g. a JavaScript fragment to execute.
   * @param toolTipText the tool tip text for the menu item to show
   */
  public void addMenuItem(String menuText, FreeAction freeAction, String toolTipText) {
    currentMenu.addElement(new MustMenuItem(Miscellaneous.getReplacement(menuText), freeAction, toolTipText));
  }

  /**
   * Creates a new menu item and adds it to the current menu to execute things liberal.
   * @param menuText the text of the menu item
   * @param href the hyper reference
   */
  public void addMenuItem(String menuText, Href href) {
    currentMenu.addElement(new MustMenuItem(Miscellaneous.getReplacement(menuText), href));
  }

  /**
   * Creates a new menu item and adds it to the current menu to execute things liberal.
   * @param menuText the text of the menu item
   * @param href the hyper reference
   * @param toolTipText the tool tip text for the menu item to show
   */
  public void addMenuItem(String menuText, Href href, String toolTipText) {
    currentMenu.addElement(new MustMenuItem(Miscellaneous.getReplacement(menuText), href, toolTipText));
  }

  /**
   * Returns the root node of the menu bar.
   * @return the root node of the menu bar
   */
  public MustMenuNode getRootNode() {
    return rootNode;
  }

  /**
   * Initializes the invokable in order to reuse the component without garbage
   * from the previous use.
   */
  public void init() {
    super.init();
    currentMenuAddress = null;
  }

  /**
   * Returns true if the menu bar allows a back function to a previous menu or another dialog step in stack.
   * @param sessionData the session's public data
   * @return true if the menu bar allows a back function
   */
  public boolean isBackAble(SessionData sessionData) {
    return (sessionData.stackPointer > 0 || getCurrentMenuAddress() != null);
  }

  /**
   * Returns the default tag sequence (as HTML).
   * Normally you should not call this method directly.
   * Use Layout implementing classes instead.
   * @return the default tag sequence (as HTML)
   * @see Layout
   */
  public String getTagSequence() {
    String tagSequence = "not in use";
    return tagSequence;
  }

  /**
   * Causes the invokable to delegate this function to all embedded markupables
   * to fetch their current value as edited by the user from the request.
   * @param request the request from where the values are to be fetched
   * @see Markupable#fetchYourValueFromRequest
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
  }

  /**
   * Indicates whether the request fits to this dialog.
   * Useful to stop the user to use any back functions of the browser. 
   * @param request the request to check
   * @return true if the request fits to this dialog
   */
  public boolean isSuitableDialog(GeneralizedRequest request) {
    // checking GET variant
    String requestedMenuNodeAddress = request.getParameter("Menu");
    if (requestedMenuNodeAddress != null) {
      // we may check if addess was presented by this object if we desire
      return true;
    }
    return super.isSuitableDialog(request);
  }

  /**
   * Allows the invokable to react to the request. Sample: saving data when Ok
   * button was pressed.
   * @param request the requeset to react to
   */
  public void process(GeneralizedRequest request) {
    super.process(request);
    sessionData.classToInvokeNext = null;
    fetchValuesFromRequest(request);
    String requestedMenuNodeAddress = request.getParameter("Menu");
    if (requestedMenuNodeAddress != null) {
      // de.must.io.Logger.getInstance().info(getClass(), "want to access menu step " + requestedMenuNodeAddress);
      MustMenuNode node = getMenuNode(requestedMenuNodeAddress);
      if (node.getType() == MustMenuNode.TYPE_MENU_ITEM) {
        currentMenuAddress = getBackNodeAddress(requestedMenuNodeAddress);
        MustMenuItem item = (MustMenuItem)node;
        sessionData.classToInvokeNext = item.getActionClass();
        setStackMovement(1);
      } else {
        currentMenuAddress = requestedMenuNodeAddress;
      }
      return;
    }
    if (request.getParameter(NAME_FOR_BACK_ACTION) != null) {
      // de.must.io.Logger.getInstance().info(getClass(), "back from currentMenuAddress " + currentMenuAddress);
      // if (currentMenuAddress != null) currentMenuAddress = getBackNodeAddress(currentMenuAddress);
      // de.must.io.Logger.getInstance().info(getClass(), "back MenuAddress: " + currentMenuAddress);
      if (currentMenuAddress != null) {
        currentMenuAddress = getBackNodeAddress(currentMenuAddress);
      } else {
        setStackMovement(-1);
      }
      return;
    }
  }

  /**
   * Returns the address of the menu above the current menu. If the current menu
   * is the root menu, null is returned.
   * @return Returns the address of the menu above the current menu
   */
  public String getPreviousMenuAddress() {
    // de.must.io.Logger.getInstance().info(getClass(), "currentMenuAddress in getPR is " + currentMenuAddress);
    if (currentMenuAddress == null) return null;
    return getBackNodeAddress(currentMenuAddress);
  }

  /**
   * Returns the address of the current menu.
   * @return the address of the current menu
   */
  public String getCurrentMenuAddress() {
    return currentMenuAddress;
  }

  /**
   * Returns the current menu node.
   * @return the current menu node
   */
  public MustMenuNode getCurrentMenuNode() {
    if (currentMenuAddress == null) {
      return rootNode;
    } else {
      return getMenuNode(currentMenuAddress);
    }
  }

  /**
   * Returns the address of the menu one level above the current menu.
   * @param menuAddress the address of the menu one level above the current menu
   * @return
   */
  private static String getBackNodeAddress(String menuAddress) {
    String backNodeAddress = null;
    int lastMinus = menuAddress.lastIndexOf('-');
    if (lastMinus >= 0) {
      backNodeAddress = menuAddress.substring(0, lastMinus);
    }
    return backNodeAddress;
  }

  /**
   * Returns the menu node belonging to the menu address as specified
   * @param menuAddress the menu address to retrieve the menu noce
   * @return the menu node belonging to the menu address
   */
  private MustMenuNode getMenuNode(String menuAddress) {
    int indexOf;
    int start = 0;
    String addressElement;
    int pointer;
    MustMenuNode newNode = rootNode;
    // de.must.io.Logger.getInstance().info(getClass(), "rootNode: " + rootNode.getDescription() + rootNode.getType());
    while ((indexOf = menuAddress.indexOf('-', start)) >= 0) {
      addressElement = menuAddress.substring(start, indexOf);
      // de.must.io.Logger.getInstance().info(getClass(), "MenuAddressElement: " + addressElement);
      pointer = Integer.valueOf(addressElement).intValue();
      newNode = (MustMenuNode)newNode.elementAt(pointer);
      start = indexOf + 1;
    }
    addressElement = menuAddress.substring(start, menuAddress.length());
    // de.must.io.Logger.getInstance().info(getClass(), "MenuAddressElement: " + addressElement);
    pointer = Integer.valueOf(addressElement).intValue();
    newNode = (MustMenuNode)newNode.elementAt(pointer);
    // de.must.io.Logger.getInstance().info(getClass(), "endNode: " + newNode.getDescription() + newNode.getType());
    return newNode;
  }

  /**
   * Informs the next invokable in stack about the submission details. E.g. a
   * PropertyAdminstration may call this method to receive the primary key of
   * the entry to be edited.
   * @return the submission details
   */
  public Submission getSubmission() {
    return submission;
  }

  /**
   * Indicates whether the reusage of the invokable is not to be supported.
   * @return true if the reusage of the invokable is not to be supported
   */
  public boolean wantToBeFinalized() {
    return wantToBeFinalized;
  }

  /**
   * Information about the current object to be sumbitted to objects which desire some information.
   */
  class MenuSubmission extends Submission {
  }

}
