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

/**
 * Menu item. May be represented by an icon or by text. May be embedded in a
 * tree with menus and submenus or in a tool bar.
 * @author Christoph Mueller
 */
public class MustMenuItem extends MustMenuNode {

  private ToolBarIcon toolBarIcon;
  private String label;
  private Class<? extends Invokable> actionClass;
  private String actionID;
  private FreeAction freeAction;
  private Href href;

  /**
   * Constructs a new icon menu item
   * @param toolBarIcon the item's tool bar icon
   * @param actionClass the assigned action class
   */
  public MustMenuItem(ToolBarIcon toolBarIcon, Class<? extends Invokable> actionClass) {
    this(toolBarIcon.getFileName(), actionClass, null);
  }

  /**
   * Constructs a new icon menu item.
   * @param toolBarIcon the item's tool bar icon
   * @param actionClass the assigned action class
   * @param toolTipText the item's tool tip text
   */
  public MustMenuItem(ToolBarIcon toolBarIcon, Class<? extends Invokable> actionClass, String toolTipText) {
    super(toolBarIcon.getFileName(), toolTipText);
    type = TYPE_MENU_ITEM;
    this.toolBarIcon = toolBarIcon;
    this.actionClass = actionClass;
  }

  /**
   * Constructs a new text menu item
   * @param label the item's label
   * @param actionClass the assigned action class
   */
  public MustMenuItem(String label, Class<? extends Invokable> actionClass) {
    this(label, actionClass, null);
  }

  /**
   * Constructs a new text menu item.
   * @param label the item's label
   * @param actionClass the assigned action class
   * @param toolTipText the item's tool tip text
   */
  public MustMenuItem(String label, Class<? extends Invokable> actionClass, String toolTipText) {
    super(label, toolTipText);
    type = TYPE_MENU_ITEM;
    this.label = label;
    this.actionClass = actionClass;
  }

  /**
   * Constructs a new menu item with the specified action.
   * @param label the item's label
   * @param actionId the ID of the action to be done - see constants NAME_FOR_???_ACTION in Dialog
   */
  public MustMenuItem(String label, String actionID) {
    this(label, actionID, null);
  }

  /**
   * Constructs a new menu item with the specified action.
   * @param label the item's label
   * @param actionId the ID of the action to be done - see constants NAME_FOR_???_ACTION in Dialog
   * @param toolTipText the item's tool tip text
   */
  public MustMenuItem(String label, String actionID, String toolTipText) {
    super(label, toolTipText);
    type = TYPE_MENU_ITEM;
    this.label = label;
    this.actionID = actionID;
  }

  /**
   * Constructs a new menu item with the specified action.
   * @param toolBarIcon the item's tool bar icon
   * @param actionId the ID of the action to be done - see constants NAME_FOR_???_ACTION in Dialog
   */
  public MustMenuItem(ToolBarIcon toolBarIcon, String actionID) {
    this(toolBarIcon, actionID, null);
  }

  /**
   * Constructs a new menu item with the specified action.
   * @param toolBarIcon the item's tool bar icon
   * @param actionId the ID of the action to be done - see constants NAME_FOR_???_ACTION in Dialog
   * @param toolTipText the item's tool tip text
   */
  public MustMenuItem(ToolBarIcon toolBarIcon, String actionID, String toolTipText) {
    super(toolBarIcon.getFileName(), toolTipText);
    type = TYPE_MENU_ITEM;
    this.toolBarIcon = toolBarIcon;
    this.actionID = actionID;
  }

  /**
   * Constructs a new menu item with the specified action.
   * @param label the item's label
   * @param freeAction the free action to be done
   */
  public MustMenuItem(String label, FreeAction freeAction) {
    this(label, freeAction, null);
  }

  /**
   * Constructs a new menu item with the specified action.
   * @param label the item's label
   * @param freeAction the free action to be done
   * @param toolTipText the item's tool tip text
   */
  public MustMenuItem(String label, FreeAction freeAction, String toolTipText) {
    super(label, toolTipText);
    type = TYPE_MENU_ITEM;
    this.label = label;
    this.freeAction = freeAction;
  }

  /**
   * Constructs a new menu item with the specified hyper reference.
   * @param label the item's label
   * @param href the hyper reference
   */
  public MustMenuItem(String label, Href href) {
    this(label, href, null);
  }

  /**
   * Constructs a new menu item with the specified hyper reference.
   * @param label the item's label
   * @param href the hyper reference
   * @param toolTipText the item's tool tip text
   */
  public MustMenuItem(String label, Href href, String toolTipText) {
    super(label, toolTipText);
    type = TYPE_MENU_ITEM;
    this.label = label;
    this.href = href;
  }

  /**
   * Return the item's label.
   * @return the item's label
   */
  public String getLabel() {
    return label;
  }

  /**
   * Return the item's action class.
   * @return the item's action class
   */
  public Class<? extends Invokable> getActionClass() {
    return actionClass;
  }

  /**
   * Return the item's action ID.
   * @return the item's action ID
   */
  public String getActionId() {
    if (actionClass != null) return actionClass.getName();
    return actionID;
  }

  /**
   * Returns the node's creation tag.
   * @param label the label to be displayed
   * @param actionId the action ID
   * @param sessionData the session's public data
   * @return the tag to markup the menu node
   */
  public String getCreationTag(String label, String actionID, SessionData sessionData) {
    if (toolBarIcon != null) return getIconTag(sessionData);
    return super.getCreationTag(label, actionID, sessionData);
  }

  /**
   * Returns the tag to markup the menu item.
   * @param menuBar the menu bar - needed for address
   * @param itemPointer the item pointer - needed for address
   * @param actionForPost the actio for post
   * @return the tag to markup the menu item
   */
  public String getCreationTag(MustMenuBar menuBar, int itemPointer, String actionForPost) {
    if (freeAction != null) return getFreeActionTag();
    if (href != null) return getHrefTag();
    return super.getCreationTag(menuBar, itemPointer, actionForPost);
  }

  private String getIconTag(SessionData sessionData) {
    String tagSequence = "";
    tagSequence += "<a href=\"" + sessionData.getBaseURL() + "&TBA=" + getActionId() + "\">";
    tagSequence += " <img SRC=\"" + sessionData.getImageDirectory() + "/" + toolBarIcon.getFileName() + "\" border=0";
    if (toolTipText != null) {
      tagSequence += " ALT=\"" + toolTipText + "\"";
    }
    tagSequence += "> </a>";
    return tagSequence;
  }

  private String getFreeActionTag() {
    String tagSequence = "<a href=\"";
    if (freeAction.getAlternateHref() != null) {
      tagSequence += freeAction.getAlternateHref();
      tagSequence +="\" target=\"_blank\" onClick=\" return " + freeAction.getActionCommand() + "\"";
    } else {
      tagSequence += "javascript:" + freeAction.getActionCommand();
    }
    tagSequence += "\"";
    if (toolTipText != null) {
      tagSequence += " onMouseOver=\"window.status='" + toolTipText + "';return true\" onMouseOut=\"window.status='';return true\"";
    }
    tagSequence += ">";
    tagSequence += getDescription();
    tagSequence += "</a>";
    return tagSequence;
  }

  private String getHrefTag() {
    String tagSequence = "<a href=\"";
    if (href.getContent() != null) {
      tagSequence += href.getContent();
      tagSequence +="\" target=\"_blank\"";
    }
    tagSequence += "\"";
    if (toolTipText != null) {
      tagSequence += " onMouseOver=\"window.status='" + toolTipText + "';return true\" onMouseOut=\"window.status='';return true\"";
    }
    tagSequence += ">";
    tagSequence += getDescription();
    tagSequence += "</a>";
    return tagSequence;
  }

  /**
   * Returns true if the item is allowed in the session's context.
   * @return true if the item is allowed in the session's context
   */
  public boolean isAllowed(SessionData sessionData) {
    return sessionData.entitlement.isEntitled(this);
  }

}
