/*
 * Copyright (c) 2007-2008 Christoph Mueller. All rights reserved.
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

import java.util.Vector;

import de.must.io.Logger;

/**
 * Queue for sequentially processing multiple actions.
 * @author Christoph Mueller
 */
public class ActionQueue extends Thread {
  
  private Vector<MustAction> actions = new Vector<MustAction>();
  
  public ActionQueue() {
    start();
  }

  /**
   * Delegates an action to be processed after the previous action in this queue.
   * @param action the action to be processed next
   */
  public void delegate(MustAction action) {
    actions.add(action);
  }
  
  /* (non-Javadoc)
   * @see java.lang.Thread#run()
   */
  public void run() {
    while (true) {
      while (actions.size() > 0) {
        MustAction action;
        synchronized (actions) {
          action = (MustAction)actions.elementAt(0);
          actions.remove(0);
        }
        try {
          action.runIndividualStuff();
          fireThreadDone(action.getThreadDoneListener());
        } catch (RuntimeException e) { // never stop entire queue if one action failes
          Logger.getInstance().error(getClass(), e);
          fireThreadDone(action.getThreadDoneListener(), e);
        }
      }
      try {
        sleep(100);
      } catch (InterruptedException e) {
        Logger.getInstance().error(getClass(), e);
      }
    }
  }

  private void fireThreadDone(ThreadDoneListener threadDoneListener) {
    fireThreadDone(threadDoneListener, null);
  }

  private void fireThreadDone(ThreadDoneListener threadDoneListener, Exception exception) {
    if (threadDoneListener != null) {
      boolean successful = true;
      if (exception != null) successful = false;
      threadDoneListener.threadDone(new ThreadDoneEvent(successful, null, exception));
    }
  }

}
