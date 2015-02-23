/*
 * Copyright (c) 2011-2014 Christoph Mueller. All rights reserved.
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

package de.must.applet;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Iterator;
import java.util.Vector;

import javax.swing.JLabel;
import javax.swing.JPanel;

import de.must.middle.ApplConstStd;
import de.must.wuic.AwtConst;
import de.must.wuic.MustButton;

public class RemDrawDialog extends BasicAppletDialog implements ActionListener {

  class DrawPanel extends JPanel {
    public void paintComponent(Graphics g) {
      super.paintComponent(g);
      Graphics2D g2 = (Graphics2D) g;
      drawInfo(g2);
    }
  }

  private DrawPanel panelCenter = new DrawPanel();
  protected JPanel panelBottom = new JPanel();
  private MustButton buttonOk = new MustButton(AppletGlobal.getInstance().getResourceString("TEXT_OK_BUTTON"), Constants.ACTION_OK, this);
  protected Vector<DrawElement> elements = new Vector<DrawElement>();
  protected Font oriFont = (new JLabel()).getFont();

  public RemDrawDialog() {
    setSize(new Dimension(450, 300));
    getContentPane().setLayout(new BorderLayout());
    getContentPane().add(panelBottom, BorderLayout.SOUTH);
    panelBottom.setLayout(new FlowLayout(FlowLayout.LEFT));
    panelBottom.add(buttonOk);
    getContentPane().add(panelCenter, BorderLayout.CENTER);
    getRootPane().setDefaultButton(buttonOk);
    buttonOk.requestFocus();
    setLocation(AwtConst.getCenterLocation(getSize()));
  }

  public void perform (Action action) {
    if (Constants.SET_HEADER.equals(action.toDo)) {
      setTitle(action.value);
    } else if (Constants.DRAW_ELEMENT.equals(action.toDo)) {
      if (ApplConstStd.APPLET_VERSION_PLACEHOLDER.equals(action.value)) {
        action.value = AppletGlobal.APPLET_VERSION_INFO;
      }
      DrawElement elem = new DrawElement(action.length, Integer.parseInt(action.variant1), action.value);
      if (action.variant2 != null) {
        elem.fontSize = Integer.parseInt(action.variant2);
      }
      elements.add(elem);
    } else if (Constants.SET_VISIBLE.equals(action.toDo)) {
      setVisible(ApplConstStd.TRUE_STRING.equals(action.value));
    }
  }
  
  protected void drawInfo(Graphics2D g2){
    Iterator<DrawElement> iterator = elements.iterator();
    while (iterator.hasNext()) {
      DrawElement drawElement = iterator.next();
      if (drawElement.fontSize > 0) {
        g2.setFont(new Font(oriFont.getName(), oriFont.getStyle(), drawElement.fontSize));
      }
      g2.drawString(drawElement.text, drawElement.posX, drawElement.posY);
      if (drawElement.fontSize > 0) {
        g2.setFont(oriFont);
      }
    }
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    if (buttonOk.equals(e.getSource())) {
      closeInstance();
    }
  }

  @Override
  public void closeInstance() {
    contactServer(Constants.ACTION_OK);
    super.closeInstance();
  }

}
