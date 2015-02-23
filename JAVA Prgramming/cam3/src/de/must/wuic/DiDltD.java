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
import java.awt.*;
import java.awt.event.*;

/**
 * @author Christoph Mueller
 */
public class DiDltD extends MustDialog implements ActionListener {

  private boolean controledExternal = false;
  public JPanel panelTop = new JPanel();
  public JLabel labelTop = new JLabel();
  public MustList centerList = new MustList();
  public JPanel panelBottom = new JPanel();
  public JPanel panelButtons = new JPanel();
  public JPanel panelButtonLine1 = new JPanel();
  public MustStatusLabel statusLabel = new MustStatusLabel();
  MustButton buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), "BtnOk", this);
  MustButton buttonCancel = new MustButton(getTranslation("TEXT_CANCEL_BUTTON"), "BtnCancel", this);
  private boolean confirmed = false;

  /**
   *
   * @param OwnerFrame
   */
  public DiDltD(Frame OwnerFrame) {
    this(OwnerFrame, "", true);
  }

  /**
   *
   * @param OwnerFrame
   * @param title
   * @param modal
   */
  public DiDltD(Frame ownerFrame, String title, boolean modal) {
    super(ownerFrame);
    getContentPane().setLayout(new BorderLayout());
    setSize(new Dimension(400, 300));
    buttonOk.setPreferredWidth(85);
    getRootPane().setDefaultButton(buttonOk);
    labelTop.setText(getTranslation("TEXT_THIS_ITEM_IS_GOING_TO_BE_DELETED"));
    getContentPane().add("North", panelTop);
    panelTop.setLayout(new BorderLayout());
    panelTop.add("North", labelTop);
    getContentPane().add(centerList, BorderLayout.CENTER);
    getContentPane().add(panelBottom, BorderLayout.SOUTH);
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(panelButtons, BorderLayout.CENTER);
    panelButtons.add("North", panelButtonLine1);
    panelBottom.add(statusLabel, BorderLayout.SOUTH);
    panelButtons.add(buttonOk);
    panelButtons.add(buttonCancel);
  }

  /**
   *
   * @param toDelete
   */
  public void setToDelete(String[] toDelete) {
    for (int i = 0; i < toDelete.length; i++) {
      centerList.addItem(toDelete[i]);
		}
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
      closeInstance();
    }
    if (actCommand.equals("BtnCancel")) {
      confirmed = false;
      closeInstance();
    }
  }

}

 
