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
public class DiDltDsimple extends JDialog implements ActionListener {

  private boolean controledExternal = false;
  private JPanel panelButtons = new JPanel();
  private MustButton buttonOk = new MustButton("     OK    ", "BtnOk", this);
  private MustButton buttonCancel = new MustButton("Abbrechen", "BtnCancel", this);
  private boolean confirmed = false;

  /**
   *
   * @param OwnerFrame
   */
  public DiDltDsimple(Frame OwnerFrame) {
    super(OwnerFrame, "L�schen best�tigen", true);
    try  {
      jbInit();
      pack();
    }
    catch (Exception ex) {
      de.must.io.Logger.getInstance().error(getClass(), ex);
    }
  }

  /**
   *
   */
  void jbInit() throws Exception {
    getContentPane().setLayout(new BorderLayout());
    // this.setSize(new Dimension(400, 300));
    getContentPane().add(panelButtons, BorderLayout.CENTER);
    panelButtons.add(buttonOk);
    panelButtons.add(buttonCancel);
    setLocation(AwtConst.getCenterLocation(getSize()));
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
      setVisible(false);
      dispose();
    }
  }

}
