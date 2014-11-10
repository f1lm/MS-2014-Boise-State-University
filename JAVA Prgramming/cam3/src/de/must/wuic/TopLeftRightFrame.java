/*
 * Copyright (c) 2004 Christoph Mueller. All rights reserved.
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
 * Frame containing three sections of UI, one at the top, one left, one right.
 * @author Christoph Mueller
 */
public class TopLeftRightFrame extends ContainerFrame implements ActionListener {

  private JSplitPane jSplitPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT);
  private JSplitPane jSplitPane2 = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT);
  protected JPanel panelBottom = new JPanel();

  public TopLeftRightFrame() {
    setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE); // to consider the isClosingAllowed() aspect
    enableEvents(AWTEvent.MOUSE_EVENT_MASK);
    getContentPane().setLayout(new BorderLayout());
    getContentPane().add(jSplitPane);
    jSplitPane.setBottomComponent(jSplitPane2);
    
    
    // this.getContentPane().add("North", panelTop);
    this.getContentPane().add(panelBottom, BorderLayout.SOUTH);
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(statusLabel, BorderLayout.SOUTH);
    isLaidOut = WinContr.getInstance().layout(this);
    if (!isLaidOut) this.setSize(new Dimension(AwtConst.getSreeenWidth(), 100));
  }
  
  protected void setTopComponent(Component component) {
    jSplitPane.setTopComponent(component);
  }

  protected void setLeftComponent(Component component) {
    jSplitPane2.setLeftComponent(component);
  }

  protected void setRightComponent(Component component) {
    jSplitPane2.setRightComponent(component);
  }

  /**
   *
   */
  protected void creationEnding() {
    packIfNotLaidOut();
  }

  /**
   *
   * @param e
   */
  public void actionPerformed(ActionEvent e) {
  }

  /**
   *
   * @param keyEventToInterpret
   * @param context
   * @return 
   */
  public boolean interpret (KeyEvent keyEventToInterpret, java.awt.Container context) {
    return false;
  }

  /**
   *
   * @param e
   */
  public void windowClosing(WindowEvent e) {
   // de.must.io.Logger.getInstance().info(getClass(), "wc: " + e.getSource());
   // StandardDialog.presentText(this, new String[] {"pwe:" + e.getSource().toString()});
   closeRequest();
  }

  /**
   *
   */
  protected void closeRequest() {
    if (MustFrame.isClosingAllowedForAllFrames()) WinContr.getInstance().close(this);
  }

  @Override
  public boolean isClosingAllowed(int closeConfirmId) {
    return true;
  }

}
