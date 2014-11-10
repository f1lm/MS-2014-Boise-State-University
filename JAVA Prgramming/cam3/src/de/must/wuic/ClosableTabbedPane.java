/*
 * Copyright (c) 2012 Christoph Mueller. All rights reserved.
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

import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JPanel;

import de.must.middle.FrameworkTextResource;

/**
 * A JTabbedPane with an icon to close a tab.
 * @author Christoph Mueller
 */
public class ClosableTabbedPane extends MustTabbedPane {

  private static final Color CLOSING_BACKGROUND_COLOR = new Color(174, 104, 124);
  
  private class CloseButton extends MustButton {
    public CloseButton() {
      setPreferredSize(new Dimension(15, 15));
      setToolTipText(frameworkTextResource.getResourceString("TEXT_CLOSE_BUTTON"));
    }
    protected void paintComponent(Graphics g) {
      super.paintComponent(g);
      if (getModel().isRollover()) {
        g.setColor(CLOSING_BACKGROUND_COLOR);
        int margin = 2;
        g.fillRect(margin, margin, getWidth() - margin * 2, getHeight() - margin * 2);
        g.setColor(Color.WHITE);
        g.drawRect(1 , 1, getWidth() - 3, getHeight() - 3);
      } else {
        g.setColor(Color.GRAY);
      }
      int margin = 5;
      g.drawLine(margin, margin, getWidth() - margin - 1, getHeight() - margin - 1);
      g.drawLine(getWidth() - margin - 1, margin, margin, getHeight() - margin - 1);
      g.dispose();
    }
  }
  
  public static interface CloseRequestReceiver {
    public void close(int index);
  }
  
  protected FrameworkTextResource frameworkTextResource;
  
  public ClosableTabbedPane(FrameworkTextResource frameworkTextResource) {
    this.frameworkTextResource = frameworkTextResource;
  }

  public void addTab(String tabLabel, JComponent panel, final CloseRequestReceiver crr) {
    final JPanel tabPanel = new JPanel();
    FlowLayout layout = new FlowLayout();
    layout.setVgap(0);
    tabPanel.setLayout(layout);
    tabPanel.add(new JLabel(tabLabel));
    CloseButton closeButton = new CloseButton();
    tabPanel.add(closeButton);
    super.addTab("", panel);
    setTabComponentAt(getTabCount()-1, tabPanel);
    closeButton.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        crr.close(indexOfTabComponent(tabPanel));
      }
    });
  }

}
