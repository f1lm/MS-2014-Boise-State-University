/*
 * Copyright (c) 1999-2008 Christoph Mueller. All rights reserved.
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
 * Save cancel return dialog.
 * @author Christoph Mueller
 */
public class DiSaveCancelReturnD extends MustDialog {
  
  public static final int DECISION_CANCEL = 0;
  public static final int DECISION_SAVE = 1;
  public static final int DECISION_RETURN = 2;

  private boolean controledExternal = false;
  public JPanel panelTop = new JPanel();
  public JLabel labelTop = new JLabel();
  public JPanel panelBottom = new JPanel();
  public JPanel panelButtons = new JPanel();
  public MustStatusLabel statusLabel = new MustStatusLabel();
  private MustButton buttonSave = new MustButton(getTranslation("TEXT_YES"));
  private MustButton buttonCancel = new MustButton(getTranslation("TEXT_NO"));
  private MustButton buttonReturn = new MustButton(getTranslation("TEXT_CANCEL_BUTTON"));
  private int decision = DECISION_RETURN;

  /**
   *
   * @param ownerFrame
   */
  public DiSaveCancelReturnD(Frame ownerFrame) {
    super(ownerFrame);
    buttonSave.setPreferredWidth(85);
    buttonCancel.setPreferredWidth(85);
    getContentPane().setLayout(new BorderLayout());
    getContentPane().add("North", panelTop);
    panelTop.setLayout(new FlowLayout(FlowLayout.LEFT));
    panelTop.add(labelTop);
    getContentPane().add(panelBottom, BorderLayout.SOUTH);
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(panelButtons, BorderLayout.CENTER);
    panelBottom.add(statusLabel, BorderLayout.SOUTH);
    panelButtons.add(buttonSave);
    panelButtons.add(buttonCancel);
    panelButtons.add(buttonReturn);
    labelTop.setText(getTranslation("TEXT_SAVE_CHANGES_QUESTION"));
    pack();
    buttonSave.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent arg0) {
        decision = DECISION_SAVE;
        closeInstance();
      }
    });
    buttonCancel.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent arg0) {
        decision = DECISION_CANCEL;
        closeInstance();
      }
    });
    buttonReturn.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent arg0) {
        decision = DECISION_RETURN;
        closeInstance();
      }
    });
  }

  /**
   * Returns user's decision.
   * @return user's decision
   * @see #DECISION_SAVE
   * @see #DECISION_CANCEL
   * @see #DECISION_RETURN
   */
  public int getUserDecision() {
    return decision;
  }

}


