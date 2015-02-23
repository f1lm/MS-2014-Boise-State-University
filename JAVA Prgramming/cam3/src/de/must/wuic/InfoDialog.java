/*
 * Copyright (c) 1999-2011 Christoph Mueller. All rights reserved.
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
import java.awt.*;
import java.awt.event.*;

/**
 * @author Christoph Mueller
 */
public abstract class InfoDialog extends MustDialog implements ActionListener {

  protected Font header1Font;
  protected Font header2Font;
  protected Font header3Font;
  protected Font standardFont;
  protected int leftMargin = 20;
  protected int yPos;

  private JFrame dialogOwnerFrame;
  private DrawPanel panelCenter = new DrawPanel();
  protected JPanel panelBottom = new JPanel();
  private MustButton buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), "BtnOk", this);

  /**
   *
   * @param OwnerFrame
   */
  public InfoDialog(Frame ownerFrame) {
    super(ownerFrame);
    String oriFontName = (new JLabel()).getFont().getFontName();
    header1Font = new Font(oriFontName, Font.PLAIN, 48);
    header2Font = new Font(oriFontName, Font.PLAIN, 24);
    header3Font = new Font(oriFontName, Font.PLAIN, 14);
    standardFont = new Font(oriFontName, Font.PLAIN, 12);
    setSize(new Dimension(450, 250));
    getContentPane().setLayout(new BorderLayout());
    getContentPane().add(panelBottom, BorderLayout.SOUTH);
    panelBottom.setLayout(new FlowLayout(FlowLayout.LEFT));
    fillLinkArea();
    panelBottom.add(buttonOk);
    getContentPane().add(panelCenter, BorderLayout.CENTER);
    getRootPane().setDefaultButton(buttonOk);
    buttonOk.requestFocus();
  }
  
  protected void fillLinkArea() {
    if (getNewVersionInfoLink() != null) {
      panelBottom.add(new JLabel("     " + getTranslation("TEXT_INNOVATIONS_SEE")));
      panelBottom.add(new InternetLink(getNewVersionInfoLink()));
      panelBottom.add(new JLabel("   "));
    }
  }

  /**
   *
   */
  protected void creationEnding() {
    setLocation(AwtConst.getCenterLocation(getSize()));
  }
  
  @Override
  public void setSize(Dimension d) {
    double widthFactor = 1;
    Object value = UIManager.get("Label.font");
    if (value instanceof javax.swing.plaf.FontUIResource) {
      int tableFontSize = ((javax.swing.plaf.FontUIResource)value).getSize();
      widthFactor = (double)tableFontSize / 11;
    }
    super.setSize(new Dimension((int)(widthFactor*d.width), (int)(widthFactor*d.height)));
  }

  /**
   *
   */
  protected abstract String getNewVersionInfoLink();

  /**
   *
   * @param g2
   */
  protected abstract void drawInfo(Graphics2D g2);

  /**
   *
   * @param e
   */
  public void actionPerformed(ActionEvent e) {
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnOk")) {
      closeInstance();
    }
  }

  /**
   *
   */
  class DrawPanel extends JPanel {
    public void paintComponent(Graphics g) {
      super.paintComponent(g);
      Graphics2D g2 = (Graphics2D) g;
      drawInfo(g2);
    }
  }

}