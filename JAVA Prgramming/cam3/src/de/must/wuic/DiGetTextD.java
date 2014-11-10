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

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

/**
 * @author Christoph Mueller
 */
public class DiGetTextD extends JDialog implements ActionListener {

  private JPanel panelTop = new JPanel();
  private JLabel labelTop = new JLabel();
  private MustTextField enterText = new MustTextField(40);
  private JPanel panelBottom = new JPanel();
  private JPanel panelButtons = new JPanel();
  private JPanel panelButtonLine1 = new JPanel();
  private MustStatusLabel statusLabel = new MustStatusLabel();
  private MustButton buttonOk = new MustButton("OK", "BtnOk", this);
  private MustButton buttonCancel = new MustButton("Abbrechen", "BtnCancel", this);
  private boolean confirmed = true;

  /**
   *
   * @param frame
   */
  public DiGetTextD(Frame frame) {
    this(frame, "", true);
  }

  /**
   *
   * @param frame
   * @param title
   * @param modal
   */
  public DiGetTextD(Frame frame, String title, boolean modal) {
    super(frame, title, modal);
    getContentPane().setLayout(new BorderLayout());
    getContentPane().add("North", panelTop);
    panelTop.setLayout(new BorderLayout());
    panelTop.add("North", labelTop);
    getContentPane().add(enterText);
    getContentPane().add(panelBottom, BorderLayout.SOUTH);
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(panelButtons, BorderLayout.CENTER);
    panelButtons.add("North", panelButtonLine1);
    panelBottom.add(statusLabel, BorderLayout.SOUTH);
    panelButtons.add(buttonOk);
    panelButtons.add(buttonCancel);
    labelTop.setText("Eingabe:");
    pack();
    getRootPane().setDefaultButton(buttonOk);
  }

  /**
   *
   * @param startText
   */
  public void setStartText(String startText) {
    enterText.setText(startText);
  }

  /**
   *
   * @return 
   */
  public String getEnterText() {
    return enterText.getText();
  }

  /**
   *
   * @return 
   */
  public boolean isConfirmed() {
    return confirmed;
  }

  /**
   *
   * @param e
   */
  public void actionPerformed(ActionEvent e) {
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnOk")) {
      confirmed = true;
      setVisible(false);
      dispose();
    } else if (actCommand.equals("BtnCancel")) {
      confirmed = false;
      enterText.setText("");
      setVisible(false);
      dispose();
    }
  }

}

