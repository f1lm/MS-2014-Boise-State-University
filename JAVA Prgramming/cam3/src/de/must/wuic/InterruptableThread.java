/*
 * Copyright (c) 2001 Christoph Mueller. All rights reserved.
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

import java.awt.BorderLayout;

/**
 * A frame to run an arbitrary thread with a cancel option. The cancel button
 * causes the isToRun method to return false. Sample:
 * <pre><code>
 * class IndividualThread extends InterruptableThread {
 *   protected void runCore() {
 *     while (isToRun() && otherBooleanEndConditions) {
 *       // do your stuff
 *     }
 *   }
 * }
 * </code></pre>
 * @author Christoph Mueller
 * @see #runCore
 * @see #isToRun
 * @deprecated use GenericInterruptibleThread or BatchThreadControlerFrame and de.must.middle.InteruptableBatchThread instead
 */
public abstract class InterruptableThread extends MustFrame implements Runnable {

  protected MustButton buttonCancel = new MustButton("Abbrechen");
  protected MustStatusLabel statusLabel = new MustStatusLabel();
  private Thread threadToRun;
  private boolean threadIsToRun;

  /**
   * Constructs a new interruptable thread frame.
   */
  public InterruptableThread() {
    buttonCancel.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(java.awt.event.ActionEvent e) {
        threadIsToRun = false;
        closeInstance();
      }
    });
    javax.swing.JPanel centerPanel = new javax.swing.JPanel();
    centerPanel.add(buttonCancel);
    this.getContentPane().setLayout(new BorderLayout());
    getContentPane().add(centerPanel, BorderLayout.CENTER);
    getContentPane().add(statusLabel, BorderLayout.SOUTH);
    getRootPane().setPreferredSize(new java.awt.Dimension(200, 70));
    packAndLocateInCenter();
    setVisible(true);
    threadToRun = new Thread(this);
    threadToRun.setPriority(Thread.MIN_PRIORITY);
    threadIsToRun = true;
    threadToRun.start();
  }

  /**
   * Called from super class when thread is started.
   */
  public final void run() {
    runCore();
    closeInstance();
  }

  /**
   * Things to do within the thread- to be implemented by the individual class.
   * @see #isToRun
   */
  protected abstract void runCore();

  /**
   * Returns true if the thread is to be continued. Is answered no if user
   * clicked the cancel button meanwhile.
   * @return true if the thread is to be continued
   */
  public boolean isToRun() {
    return threadIsToRun;
  }

  /**
   * Clears the user message.
   */
  protected void clearMessage() {
    statusLabel.setStatus("");
  }

  /**
   * Sets the message to be read by the user, which is presented in the status
   * label in this context.
   * @param message the message for the user
   */
  protected void setMessage(String message) {
    statusLabel.setStatus(message);
  }

  /**
   * Sets the message to be read by the user, it is not reseted by
   * generalActionEnding when action completed. Thus, the user is able to notify
   * the message without pressing a confirmation button.
   * @param messageToKeep the message for the user
   */
  protected void setMessageToKeep(String messageToKeep) {
    statusLabel.setRemainStatus(messageToKeep);
  }

  @Override
  public boolean isClosingAllowed(int closeConfirmId) {
    return true;
  }

  /**
   * Closes this frame instance.
   */
  public void closeInstance() {
    threadIsToRun = false;
    super.closeInstance();
  }

}
