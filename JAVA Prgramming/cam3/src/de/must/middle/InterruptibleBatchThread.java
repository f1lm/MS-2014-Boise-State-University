/*
 * Copyright (c) 2002-2011 Christoph Mueller. All rights reserved.
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

package de.must.middle;

import java.util.*;

import de.must.io.Logger;

/**
 * Interruptible batch thread - may be controlled by user interfaces implementing
 * Controllable.
 * @see ThreadController
 * @author Christoph Mueller
 */
public abstract class InterruptibleBatchThread extends Thread implements Controllable {
  
  protected ThreadController threadController;
  private Vector<ThreadDoneListener> threadDoneListeners;
  private boolean successful = true;
  private String eventMessage;

	/**
	 * Constructor for MustThread.
	 */
	public InterruptibleBatchThread() {
    setPriority(Thread.MIN_PRIORITY);
	}

  /**
   * Set the thread controller.
   * @param threadController the thread controller to use.
   */
  public void setThreadController(ThreadController threadController) {
    this.threadController = threadController;
  }

  /**
   * @see java.lang.Runnable#run()
   */
  public final void run()  {
	  try {
			runCore();
			if (threadController != null) threadController.taskIsDone();
			fireThreadDone();
		} catch (Exception e) {
			Logger.getInstance().error(getClass(), e);
			if (threadController != null) threadController.taskIsDone();
			fireThreadDone(e);
		}
  }
  
  /**
   * Runs the core of the thread. Implement your stuff which is to be done right
   * here.
   */
  protected abstract void runCore() throws Exception;

  /**
   * Returns true if the thread is to be continued. Is answered no if user
   * clicked the controller's cancel button meanwhile.
   * @return true if the thread is to be continued
   */
  public boolean isToRun() {
    if (threadController != null) return !threadController.isToCancel();
    else return true;
  }
  
  /**
   * Sets the status information to be transfered to the user if there is a
   * controller for it.
   * @param message the status information for the user
   */
  public void setStatusInformation(String statusInformation) {
    if (threadController != null && !threadController.isToCancel()) threadController.setStatusInformation(statusInformation);
  }

  /**
   * Sets the eventErrorMessage and indicate that the thread is not successful.
   * @param eventMessage The eventMessage to set
   */
  public void setEventErrorMessage(String eventMessage) {
    this.eventMessage = eventMessage;
    successful = false;
  }

  /**
   * Sets the eventMessage.
   * @param eventMessage The eventMessage to set
   */
  public void setEventMessage(String eventMessage) {
    this.eventMessage = eventMessage;
  }

  /**
   * Adds the specified ThreadDoneListener to receive thread done events.
   * @see ThreadDoneEvent
   */
  public synchronized void addThreadDoneListener(ThreadDoneListener l) {
    Vector<ThreadDoneListener> v = threadDoneListeners == null ? new Vector<ThreadDoneListener>(2) : new Vector<ThreadDoneListener>(threadDoneListeners);
    if (!v.contains(l)) {
      v.addElement(l);
      threadDoneListeners = v;
    }
  }

  private void fireThreadDone() {
  	fireThreadDone(null);
  }

  private void fireThreadDone(Exception exception) {
    if (exception != null) successful = false;
    if (threadController != null && threadController.isToCancel()) successful = false; 
    if (threadDoneListeners != null) {
      Vector<ThreadDoneListener> listeners = threadDoneListeners;
      int count = listeners.size();
      for (int i = 0; i < count; i++) {
        (listeners.elementAt(i)).threadDone(new ThreadDoneEvent(successful, eventMessage, exception));
      }
    }
  }

  /**
   * Logs a message as a debug information.
   * @param text the message to log
   */
  protected void logDebug(String text) {
    de.must.io.Logger.getInstance().debug(getClass(), text);
  }

  /**
   * Logs a message as information.
   * @param text the message to log
   */
  protected void logInfo(String text) {
    de.must.io.Logger.getInstance().info(getClass(), text);
  }

  /**
   * Logs a message as an error.
   * @param throwable the exception to log
   */
  protected void logError(Throwable throwable) {
    de.must.io.Logger.getInstance().error(getClass(), throwable);
  }

  /**
   * Logs a message as an error.
   * @param text the message (text) to log
   * @param throwable the exception to log
   */
  protected void logError(String text, Throwable throwable) {
    de.must.io.Logger.getInstance().error(getClass(), text, throwable);
  }

}

