/*
 * Copyright (c) 2001-2010 Christoph Mueller. All rights reserved.
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

/**
 * Tool bar to be marked up.
 * @author Christoph Mueller
 */
public abstract class MustToolBar {

  private MustMenu toolBarItems = new MustMenu("dummy1", null, EntitlementStd.AREA_ROOT);
  private SessionData sessionData;

  /**
   * Constructs a new tool bar.
   * @param sessionData the session's public data
   */
  public MustToolBar(SessionData sessionData) {
    this.sessionData = sessionData;
    addIndividualItems();
    toolBarItems.addElement(new MustMenuItem(new ToolBarIcon("close.jpg"), Dialog.NAME_FOR_CLOSE_ACTION, sessionData.getFrameworkResourceString("TEXT_SIGNS_OFF_AND_CLOSES_THE_WINDOW")));
  }

  /**
   * Adds individual items to the tool bar.
   * @see #addItem
   */
  protected abstract void addIndividualItems();

  /**
   * Returns the indiviudal application resource of the specified key, which has to be a string.
   * @param resourceKey the key of the resource to retrieve
   * @return the found resource
   */
  protected String getResourceString(String resourceKey) {
    return sessionData.getResourceString(resourceKey);
  }

  /**
   * Adds an item to the tool using an icon.
   * @param toolBarIcon the tool bar's icon
   * @param invokeable the invokeable to be associated with the icon
   */
  public void addItem(ToolBarIcon toolBarIcon, Class<? extends Invokable> invokeable) {
    toolBarItems.addElement(new MustMenuItem(toolBarIcon, invokeable));
  }

  /**
   * Adds an item to the tool using an icon.
   * @param toolBarIcon the tool bar's icon
   * @param invokeable the invokeable to be associated with the button
   * @param toolTipText the tool tip text of the button
   */
  public void addItem(ToolBarIcon toolBarIcon, Class<? extends Invokable> invokeable, String toolTipText) {
    toolBarItems.addElement(new MustMenuItem(toolBarIcon, invokeable, toolTipText));
  }

  /**
   * Adds an item to the tool using a button.
   * @param label the label of the button to use
   * @param invokeable the invokeable to be associated with the button
   */
  public void addItem(String label, Class<Invokable> invokeable) {
    toolBarItems.addElement(new MustMenuItem(label, invokeable));
  }

  /**
   * Adds an item to the tool using a button.
   * @param label the label of the button to use
   * @param invokeable the invokeable to be associated with the button
   * @param toolTipText the tool tip text of the button
   */
  public void addItem(String label, Class<Invokable> invokeable, String toolTipText) {
    toolBarItems.addElement(new MustMenuItem(label, invokeable, toolTipText));
  }

  /* public void addItem(ImageIcon icon, Class invokeable, String toolTipText) {
    toolBarItems.addElement(new MustMenuItem(label, invokeable, toolTipText));
  } */

  /**
   * Returns the toolbar's items.
   * @return the toolbar's items
   */
  public MustMenu getItems() {
    return toolBarItems;
  }

  /**
   * Returns true if the current user is entitled to use the specified item.
   * @param menuItem the menu item to check
   * @return true if the current user is entitled to use the specified item
   */
  public boolean isEntitled(MustMenuItem menuItem) {
    Class<? extends Invokable> actionClass = menuItem.getActionClass();
    de.must.io.Logger.getInstance().debug(getClass(), "Checking toolbar action class " + actionClass);
    if (actionClass == null) return true;
    return (sessionData.entitlement.getLevel(menuItem) >= getStandardLevel(actionClass));
  }

  private int getStandardLevel(Class<? extends Invokable> actionClass) {
    int standardLevel = EntitlementStd.LEVEL_VIEW;
    if (actionClass != null) try  {
      standardLevel = actionClass.getField("standardLevel").getInt(new Object()/* (?) */);
      de.must.io.Logger.getInstance().debug(getClass(), "standardLevel: " + standardLevel);
    } catch(NoSuchFieldException nsfe) {
      // de.must.io.Logger.getInstance().error(getClass(), nsfe); // Ok, this may occur.
    } catch(Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    return standardLevel;
  }

  /**
   * Checks if the request is caused by choosing a toolbar options and returns
   * the action class if so.
   * @param request the request to check
   * @return a toolbar action class or null if the request isn't caused by
   * choosing a toolbar option 
   */
  public Class<? extends Invokable> getActionClass(GeneralizedRequest request/*, SessionData sessionData*/) {
    String toolBarActionClass = null;
    int i = -1;
    int size = toolBarItems.size();
    if (request.getMethod().equals("GET") && (toolBarActionClass = request.getParameter("TBA")) != null) {
      while (++i < size) {
        MustMenuItem item = (MustMenuItem)toolBarItems.elementAt(i);
        // de.must.io.Logger.getInstance().info(getClass(), item.getDescription() + item.getActionClass());
        if (item.getActionClass() != null && item.getActionClass().getName().equals(toolBarActionClass)) { // post-variant
          return item.getActionClass();
        }
      }
    } else {
      while (++i < size) {
        MustMenuItem item = (MustMenuItem)toolBarItems.elementAt(i);
        // de.must.io.Logger.getInstance().info(getClass(), item.getDescription() + item.getActionClass());
        Class<? extends Invokable> currentlyViewedActionClass = item.getActionClass();
        if (currentlyViewedActionClass != null && request.getParameter(currentlyViewedActionClass.getName()) != null) { // post-variant
          return currentlyViewedActionClass;
        }
      }
    }
    return null;
  }

}
