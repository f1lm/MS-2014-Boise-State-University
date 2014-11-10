/*
 * Copyright (c) 2011 Christoph Mueller. All rights reserved.
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

/**
 * Menu item. May be represented by an icon or by text. May be embedded in a
 * tree with menus and submenus or in a tool bar.
 * @author Christoph Mueller
 */
public class MustMenuItem extends MustMenuNode {
  
  private static int counter = 0;
  
  private static synchronized String getNextActionId () {
    if (counter < Integer.MAX_VALUE) counter ++;
    else counter = 1;
    return "MenAct" + String.valueOf(counter);
  }

  private String label;
  private ActionListener actionListener;
  public boolean separatorBefore;

  public MustMenuItem(String label) {
    this(label, getNextActionId());
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
  
  public void addActionListener(ActionListener l) {
    actionListener = l;
  }
  
  public void performAction(String command) {
    actionListener.actionPerformed(new ActionEvent("Remote menu", 0, command));
  }

}
