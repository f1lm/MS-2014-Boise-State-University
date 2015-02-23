/*
 * Copyright (c) 1999-2013 Christoph Mueller. All rights reserved.
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

import de.must.print.SimpleLinePrint;

import java.awt.*;
import java.awt.event.*;
import java.util.Vector;

/**
 * @author Christoph Mueller
 */
public class DiPrTxD extends MustDialog implements ActionListener {

  private boolean controledExternal = false;
  private JPanel panelTop = new JPanel();
  protected InfoTextArea centerTextArea = new InfoTextArea();
  private JPanel panelBottom = new JPanel();
  private JPanel panelButtons = new JPanel();
  private JPanel panelButtonLine1 = new JPanel();
  private MustStatusLabel statusLabel = new MustStatusLabel();
  private MustButton buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), "BtnOk", this);
  protected MustButton buttonPrint;
  private boolean confirmed = false;
  private Vector<String> lines;

  public DiPrTxD(Frame owner) {
    this(owner, "");
  }

  public DiPrTxD() {
    this(MainStd.getMainFrame(), "");
  }

  public DiPrTxD(Frame frame, String title) {
    super(frame);
    setTitle(title);
    buttonOk.setPreferredWidth(70);
    centerTextArea.setEditable(false);
    getContentPane().setLayout(new BorderLayout());
    setSize(new Dimension(400, 300));
    getContentPane().add("North", panelTop);
    panelTop.setLayout(new BorderLayout());
    getContentPane().add(new JScrollPane(centerTextArea), BorderLayout.CENTER);
    getContentPane().add(panelBottom, BorderLayout.SOUTH);
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(panelButtons, BorderLayout.CENTER);
    panelButtons.add("North", panelButtonLine1);
    panelBottom.add(statusLabel, BorderLayout.SOUTH);
    panelButtons.add(buttonOk);
    buttonPrint = MustButton.create("Print24.gif", "Pri", getTranslation("TEXT_PRINTS_SELECTED_ENTRY"), "BtnPrint", new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        new SimpleLinePrint(getTitle(), lines).print();
      }
    });
    panelButtons.add(buttonPrint);
    buttonPrint.setVisible(false);
    getRootPane().setDefaultButton(buttonOk);
    buttonOk.requestFocus();
    centerTextArea.addKeyListener(new java.awt.event.KeyAdapter() {
      public void keyPressed(KeyEvent e) {
        if (e.getKeyCode() == KeyEvent.VK_ENTER) ButtonOkEvent();
      }
    });
  }
  
  public void setContent(Vector<String> lines) {
    this.lines = lines;
    for (String line : lines) {
      centerTextArea.append(line + "\n");
    }
    buttonPrint.setVisible(true);
  }

  public void addLine(String line) {
    centerTextArea.append(line + "\n");
  }

  public boolean isConfirmed() {
    return confirmed;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnOk")) {
      ButtonOkEvent();
    }
  }

  private void ButtonOkEvent() {
    confirmed = true;
    setVisible(false);
    dispose();
  }

}