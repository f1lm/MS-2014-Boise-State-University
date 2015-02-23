/*
 * Copyright (c) 2002-2013 Christoph Mueller. All rights reserved.
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

import de.must.middle.AliveConfirmer;
import de.must.middle.StatusInfoPresenter;
import de.must.middle.ThreadController;

import javax.swing.*;
import java.awt.BorderLayout;

/**
 * Frame to control a batch thread.
 * @see de.must.middle.InterruptibleBatchThread
 * @author Christoph Mueller
 */
public class BatchThreadControllerFrame extends MustFrame implements ThreadController, StatusInfoPresenter, AliveConfirmer {

  protected MustButton buttonCancel = new MustButton(getTranslation("TEXT_CANCEL_BUTTON"));
  protected MustStatusLabel statusLabel = new MustStatusLabel();
  private boolean threadIsToCancel;

  /**
   * Constructs a new batch thread controller frame.
   */
  public BatchThreadControllerFrame() {
    this(null);
  }
  
  public BatchThreadControllerFrame(String windowTitle) {
    if (windowTitle != null) setTitle(windowTitle);
    buttonCancel.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(java.awt.event.ActionEvent e) {
        threadIsToCancel = true;
        closeInstance();
      }
    });
    JPanel centerPanel = new JPanel();
    centerPanel.add(buttonCancel);
    getContentPane().setLayout(new BorderLayout());
    getContentPane().add(centerPanel, BorderLayout.CENTER);
    getContentPane().add(statusLabel, BorderLayout.SOUTH);
    getRootPane().setPreferredSize(new java.awt.Dimension(300, 70));
    packAndLocateInCenter();
    int minWidth = 300; // title / status line
    if (getWidth() < minWidth) setSize(minWidth, getSize().height);
    setVisible(true);
  }
  
  /**
   * Enables or disables the cancel button. E.g. when the controlled thread
   * waits for an external process, it doesn't make sense to keep the button
   * enabled, because the button won't stop the external process.
   * By default, the cancel button is enabled.
	 * @param enabled whether or not the cancel button should be enabled
	 */
	public void setCancelButtonEnabled(boolean enabled) {
    buttonCancel.setEnabled(enabled);
  }

  /**
   * Returns true if the thread is to cancel. Is answered true if user
   * clicked the cancel button meanwhile.
   * @return true if the thread is to cancel
   */
  public boolean isToCancel() {
    return threadIsToCancel;
  }

  @Override
  public boolean isToRun() {
    return !isToCancel();
  }

  /**
   * Sets the message to be read by the user, which is presented in the status
   * label in this context.
   * @param message the message for the user
   */
  public void setStatusInformation(String message) {
    if (isVisible()) statusLabel.setStatus(message);
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
   * Called by the controlled batch thread when its task is done.
   * Closes the window.
   */
  public void taskIsDone() {
    super.closeInstance(); // regular closing - no canceling!
  }

  /**
   * Closes this frame instance.
   */
  public void closeInstance() { // closing by the GUI, not by the thread
    threadIsToCancel = true;
    super.closeInstance();
  }

}


