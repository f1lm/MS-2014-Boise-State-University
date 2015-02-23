/*
 * Copyright (c) 1999-2009 Christoph Mueller. All rights reserved.
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

import javax.swing.*;

import de.must.io.Logger;

import java.awt.event.*;

/**
 * @author Christoph Mueller
 */
public class MustPopupMenu extends JPopupMenu implements ActionListener {

  private int menuItemCapacity = 20;
  private int menuItemCounter = -1;
  private JMenuItem popupMenuItemArray[];
  private ActionListener internalActionListener;

  /**
   *
   * @param ownerFrame
   * @param componentToLocateUppon
   */
  public MustPopupMenu(JFrame ownerFrame, JComponent componentToLocateUppon) {
    internalActionListener = (ActionListener)ownerFrame;
    popupMenuItemArray = new JMenuItem[menuItemCapacity];
    setInvoker(ownerFrame);
    setLocation((int)componentToLocateUppon.getLocationOnScreen().getX(), (int)componentToLocateUppon.getLocationOnScreen().getY());
    // setVisible(true);
  }

  // public MustPopupMenu(java.awt.event.ActionAdapter xy ) {
  // }

  /**
   *
   * @param menuLabel
   * @param actionCommand
   */
  public void addMenuItem(String menuLabel, String actionCommand) {
    popupMenuItemArray[++menuItemCounter] = new JMenuItem(menuLabel);
    popupMenuItemArray[menuItemCounter].setActionCommand(actionCommand);
    popupMenuItemArray[menuItemCounter].addActionListener(internalActionListener);
    add(popupMenuItemArray[menuItemCounter]);
  }

  /**
   *
   * @param e
   */
  public void actionPerformed(ActionEvent e) {
    Logger.getInstance().info(getClass(), e);
  }

}
