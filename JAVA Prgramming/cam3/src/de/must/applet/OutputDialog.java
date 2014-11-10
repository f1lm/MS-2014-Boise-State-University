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

package de.must.applet;

import java.awt.BorderLayout;
import java.awt.event.ActionListener;
import java.awt.event.WindowListener;

import javax.swing.JLabel;
import javax.swing.JPanel;

import de.must.wuic.AwtConst;
import de.must.wuic.MustButton;
import de.must.wuic.MustStatusLabel;

/**
 * A dialog which will not have to react to a response of the server after contacting.
 * @author Christoph Mueller
 */
public abstract class OutputDialog extends BasicAppletDialog implements /*ContextHelp,*/ WindowListener, ActionListener {

  protected String titleOfCallingMainTab;
  protected String titleOfCallingSubTab;
  protected JLabel headerLabel;
  protected JPanel panelBottom;
  protected JPanel panelButtons;
  protected MustButton buttonOk;
  protected MustStatusLabel statusLabel;
  
  public OutputDialog(String titleOfCallingMainTab, String titleOfCallingSubTab) {
    this.titleOfCallingMainTab = titleOfCallingMainTab;
    this.titleOfCallingSubTab = titleOfCallingSubTab;
    headerLabel = new JLabel();
    add(headerLabel, BorderLayout.NORTH);
    statusLabel = new MustStatusLabel();
    panelButtons = new JPanel();
    panelBottom = new JPanel();
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(panelButtons, BorderLayout.NORTH);
    panelBottom.add(statusLabel, BorderLayout.CENTER);
    add(panelBottom, BorderLayout.SOUTH);
    buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), Constants.ACTION_OK, this);
    buttonOk.setPreferredWidth(70);
    panelButtons.add(buttonOk);
    AppletGlobal.getInstance().getApplet().getRootPane().setDefaultButton(buttonOk);
  }
  
  protected void creationEnding() {
    pack();
    setLocation(AwtConst.getCenterLocation(getSize()));
  }
  
  public void setHeaderText(String headerText) {
    headerLabel.setText(headerText);
  }

  protected void generalActionBeginnung() {
  }

  protected void generalActionEnding() {
  }
  
}
