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

/*
 * will become @deprecated
 */
/**
 * @author Christoph Mueller
 */
public abstract class ProgressFrame extends JFrame implements WindowListener, ActionListener, Runnable {

  protected int maximum;
  protected Thread actThread;
  private boolean canceled = false;
  private JPanel panelTop = new JPanel();
  private JPanel panelMiddle = new JPanel();
  private JProgressBar jProgressBar1 = new JProgressBar();
  private JPanel panelBottom = new JPanel();
  private JPanel panelButtons = new JPanel();
  private MustButton buttonCancel = new MustButton("Abbrechen", "BtnCancel", this);
  protected MustStatusLabel statusLabel = new MustStatusLabel();

  /**
   *
   */
  public ProgressFrame() {
    try {
      initProgressFrame();
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
  }

  /**
   *
   */
  public void initProgressFrame() throws Exception{
    setProgressMaximum(100); // default value
    this.addWindowListener(this);
    this.getContentPane().setLayout(new BorderLayout());
    this.setSize(new Dimension(400, 150));
    this.setLocation(AwtConst.getCenterLocation(this.getSize()));
    this.setTitle("Auswertung");
    this.getContentPane().add(panelTop, BorderLayout.NORTH);
    this.getContentPane().add(panelMiddle, BorderLayout.CENTER);
    panelMiddle.add(jProgressBar1);
    this.getContentPane().add(panelBottom, BorderLayout.SOUTH);
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(panelButtons, BorderLayout.NORTH);
    panelButtons.add(buttonCancel);
    panelBottom.add(statusLabel, BorderLayout.SOUTH);
    jProgressBar1.setPreferredSize(new Dimension(350, 30));
    setVisible(true);
  }

  /**
   *
   * @param minimum
   */
  public void setProgressMinimum(int minimum) {
    jProgressBar1.setMinimum(minimum);
  }

  /**
   *
   * @param maximum
   */
  public void setProgressMaximum(int maximum) {
    this.maximum  = maximum;
    jProgressBar1.setMaximum(maximum);
  }

  /**
   *
   * @param value
   */
  public void setProgressValue(int value) {
    int specialValue = value;
    if (specialValue > maximum) {
      setProgressMaximum(maximum * 2);
    }
    jProgressBar1.setValue(specialValue);
    // jProgressBar1.revalidate();
    // statusLabel.setStatus(new Integer(value).toString());
  }

  /**
   *
   * @param e
   */
  public void actionPerformed(ActionEvent e) {
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnCancel")) {
      canceled = true;
      // actThread.stop();
      setVisible(false);
      dispose();
    }
  }

  /**
   *
   * @param e
   */
  public void windowClosing(WindowEvent e) {
    canceled = true;
    // actThread.stop();
    setVisible(false);
    dispose();
  }

  /**
   *
   * @param e
   */
  public void windowClosed(WindowEvent e) {}

  /**
   *
   * @param e
   */
  public void windowOpened(WindowEvent e) {}

  /**
   *
   * @param e
   */
  public void windowActivated(WindowEvent e) {}

  /**
   *
   * @param e
   */
  public void windowDeactivated(WindowEvent e) {}

  /**
   *
   * @param e
   */
  public void windowIconified(WindowEvent e) {}

  /**
   *
   * @param e
   */
  public void windowDeiconified(WindowEvent e) {}

  /**
   *
   */
  protected void startThread() {
    // if (actThread != null) actThread.stop();
    actThread = new Thread(this);
    actThread.start();
  }

  /**
   *
   */
  public void run() {
    statusLabel.setStatus("Handle ...");
    canceled = false;
    act();
    setVisible(false);
    dispose();
  }

  /**
   *
   */
  protected abstract void act();

  /**
   *
   * @param e
   */
  public boolean isCanceled() {
    // de.must.io.Logger.getInstance().info(getClass(), "isCanceled was called");
    return canceled;
  }

  /**
   *
   * @param message
   */
  protected void setMessage(String message) {
    statusLabel.setStatus(message);
  }

  /**
   *
   * @param messageToKeep
   */
  protected void setMessageToKeep(String messageToKeep) {
    statusLabel.setRemainStatus(messageToKeep);
  }

}


