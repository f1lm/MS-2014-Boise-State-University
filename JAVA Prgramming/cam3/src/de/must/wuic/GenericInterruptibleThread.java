/*
 * Copyright (c) 2007 Christoph Mueller. All rights reserved.
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
import de.must.middle.InterruptibleBatchThread;

/**
 * Standard for lazily embedding things to do in a thread with a swing frame to interrupt it.
 * @author Christoph Mueller
 */
public final class GenericInterruptibleThread extends InterruptibleBatchThread implements AliveConfirmer {
  
  private BatchThreadControllerFrame threadControllerFrame;
  private Runnable runnable;
  
  /**
   * Construct a new GenericInterruptibleThread.
   * @param windowTitle  the title of the frame to cancel the thread
   */
  public GenericInterruptibleThread(String windowTitle) {
    threadControllerFrame = new BatchThreadControllerFrame();
    threadControllerFrame.setTitle(windowTitle);
    setThreadController(threadControllerFrame);
  }
  
  /**
   * Assigns the runnable and starts the thread, which will immediately call the Runnable's run() method.
   * @param runnable  the Runnable to perform
   */
  public void start(Runnable runnable) {
    this.runnable = runnable;
    start();
  }
  
  /**
   * Returns the controller frame of the thread.
   * @return  the controller frame of the thread
   */
  public BatchThreadControllerFrame getThreadControllerFrame() {
    return threadControllerFrame;
  }

  /* (non-Javadoc)
   * @see de.must.middle.InterruptibleBatchThread#runCore()
   */
  protected void runCore() throws Exception {
    runnable.run();
  }

}
