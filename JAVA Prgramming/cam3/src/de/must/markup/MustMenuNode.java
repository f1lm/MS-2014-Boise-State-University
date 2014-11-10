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

import java.util.*;

/**
 * Menu node - may be an menu item, a menu or a submenu.
 * @author Christoph Mueller
 */
public abstract class MustMenuNode extends Vector<MustMenuNode> {

  public static final int TYPE_MENU = 0;
  public static final int TYPE_MENU_ITEM = 1;
  protected int type;
  private String description;
  protected String toolTipText;

  /**
   * Constructs a new menu node.
   * @param description the node's description
   */
  public MustMenuNode(String description) {
    this(description, null);
  }

  /**
   * Constructs a new menu node.
   * @param description the node's description
   * @param toolTipText the node's tool tip text
   */
  public MustMenuNode(String description, String toolTipText) {
    this.description = description;
    this.toolTipText = toolTipText;
    type = TYPE_MENU;
  }

  /**
   * Returns the node's tool tip text.
   * @return the node's tool tip text
   */
  public String getToolTipText() {
    return toolTipText;
  }

  /**
   * Returns the node's type.
   * @return the node's type
   */
  public int getType() {
    return type;
  }

  /**
   * Sets the node's description.
   * @param newDescription the new description of the node
   */
  public void setDescription(String newDescription) {
    this.description = newDescription;
  }

  /**
   * Returns the node's description.
   * @return the node's description
   */
  public String getDescription() {
    return description;
  }

  /**
   * Returns the node's creation tag.
   * @param menuBar the enclosing menu bar - needed for the address
   * @param itemPointer the item's pointer - needed for the address
   * @param actionForPost the action for post
   * @return the tag to markup the menu node
   */
  public String getCreationTag(MustMenuBar menuBar, int itemPointer, String actionForPost) {
    return getCreationTag(getMenuAddress(menuBar.getCurrentMenuAddress(), itemPointer), actionForPost);
  }

  private String getCreationTag(String menuAddress, String actionForPost) {
    String tagSequence = "";
    tagSequence += "<a href=\"" + actionForPost + "&Menu=" + menuAddress + "\"";
    if (toolTipText != null) {
      tagSequence += " onMouseOver=\"window.status='" + toolTipText + "';return true\" onMouseOut=\"window.status='';return true\"";
    }
    tagSequence += ">" + getDescription() + "</a>";
    return tagSequence;
  }

  /**
   * Returns the node's creation tag.
   * @param label the label to be displayed
   * @param actionId the action ID
   * @param sessionData the session's public data
   * @return the tag to markup the menu node
   */
  public String getCreationTag(String label, String actionID, SessionData sessionData) {
    String tagSequence = "";
    tagSequence += "<input type=\"submit\" name=\"" + actionID + "\" value=\"" + label + "\"";
    if (toolTipText != null) {
      tagSequence += " onMouseOver=\"window.status='" + toolTipText + "';return true\" onMouseOut=\"window.status='';return true\"";
    }
    tagSequence += "> </a>";
    return tagSequence;
  }

  private String getMenuAddress(String baseAddress, int itemPointer) {
    String menuAddress = "";
    if (baseAddress != null) menuAddress += baseAddress + "-";
    menuAddress += itemPointer;
    return menuAddress;
  }

  /**
   * Returns true if the menu node is allowed in the session context.
   * @param sessionData the session's public data
   */
  public abstract boolean isAllowed(SessionData sessionData);

}
