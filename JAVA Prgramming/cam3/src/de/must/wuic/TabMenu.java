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

package de.must.wuic;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JMenuItem;
import javax.swing.JPopupMenu;

import de.must.middle.FrameworkTextResource;

public class TabMenu extends JPopupMenu implements MouseListener {
  
  private MustTabbedPane tab;
  private ActionListener actionListener;
  
  public TabMenu (MustTabbedPane tab, FrameworkTextResource frameworkTextResource) {
    this.tab = tab;
    JMenuItem item = new JMenuItem(frameworkTextResource.getResourceString("TEXT_CLOSE_BUTTON"));
    add(item);
    item.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        if (actionListener != null) {
          actionListener.actionPerformed(e);
        } else {
          TabMenu.this.tab.removeTabAt(TabMenu.this.tab.getSelectedIndex());
        }
        setVisible(false);
      }
    });
    tab.addMouseListener(this);
  }
  public void mouseReleased(MouseEvent e) {
    showMenuIfPopupTrigger(e);
  }
  public void mousePressed(MouseEvent e) {}
  public void mouseExited(MouseEvent e) {}
  public void mouseEntered(MouseEvent e) {}
  public void mouseClicked(MouseEvent e) {}

  private void showMenuIfPopupTrigger(MouseEvent e) {
    if (e.isPopupTrigger()) {
      show(tab, e.getX() - 5, e.getY() + 5);
    }
  }
  
  /**
   * Adds (by now sets) the action listener to validate and process the action.
   * If used, this menu will delegate action to this listener instead of processing action itself.
   * @param actionListener the action listener to validate and process the action
   */
  public void addActionListener(ActionListener actionListener) {
    this.actionListener = actionListener;
  }
  
}
