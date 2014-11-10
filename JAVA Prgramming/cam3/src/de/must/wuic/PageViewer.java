/*
 * Copyright (c) 2007-2009 Christoph Mueller. All rights reserved.
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

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Frame;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JPanel;


import de.must.print.PageDrawer;
import de.must.print.PageDrawerPrinting;

/**
 * Dialog for presentation of information painted by a PageDrawer.
 * @see de.must.print.PageDrawer
 * @author Christoph Mueller
 */
public class PageViewer extends MustDialog implements ActionListener {

  class DrawPanel extends JPanel {
    public DrawPanel() {
      setBackground(Color.WHITE);
    }
    public void paintComponent(Graphics g) {
      super.paintComponent(g);
      Graphics2D g2 = (Graphics2D) g;
      drawInfo(g2);
    }
  }
  
  private PageDrawer pageDrawer;
  private DrawPanel panelCenter = new DrawPanel();
  protected JPanel panelBottom = new JPanel();
  private MustButton buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), "BtnOk", this);
  private MustButton buttonPrint = MustButton.create("Print24.gif", "Pr", getTranslation("TEXT_PRINTS_SELECTED_ENTRY"), "BtnPrt", this);
  
  public PageViewer(Frame ownerFrame, PageDrawer pageDrawer, String title) {
    super(ownerFrame);
    this.pageDrawer = pageDrawer;
    setTitle(title);
    getContentPane().setLayout(new BorderLayout());
    getContentPane().add(panelBottom, BorderLayout.SOUTH);
    panelBottom.setLayout(new FlowLayout(FlowLayout.CENTER));
    panelBottom.add(buttonOk);
    panelBottom.add(buttonPrint);
    getContentPane().add(panelCenter, BorderLayout.CENTER);
    getRootPane().setDefaultButton(buttonOk);
    buttonOk.requestFocus();
  }
  
  public void setPageSize(Dimension dimension) {
    panelCenter.setPreferredSize(dimension);
    panelCenter.setSize(dimension);
    pack();
  }
  
  protected void drawInfo(Graphics2D g2){
    pageDrawer.draw(g2, 0);
  }
  
  public void actionPerformed(ActionEvent e) {
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnOk")) {
      closeInstance();
    } else if (actCommand.equals("BtnPrt")) {
      PageDrawerPrinting print = new PageDrawerPrinting(pageDrawer);
      print.print();
    }
  }
  
}
