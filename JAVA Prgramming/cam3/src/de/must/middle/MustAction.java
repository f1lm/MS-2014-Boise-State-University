/*
 * Copyright (c) 2005-2007 Christoph Mueller. All rights reserved.
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

import java.awt.Cursor;
import java.awt.Frame;

/**
 * Action class - declare actions once, call them by multiple buttons / menu items.
 * @author Christoph Mueller
 */
public abstract class MustAction {
  
  private class BackgroundThread extends Thread {
    public void run() {
      MustAction.this.execute();
    }
  }
  
  protected static Cursor defaultCursor = new Cursor(Cursor.DEFAULT_CURSOR);
  protected static Cursor waitCursor = new Cursor(Cursor.WAIT_CURSOR);
  protected Object causer;
  private ThreadDoneListener threadDoneListener;
  
  public MustAction() {
    this(null);
  }
  
  /**
   * Constructs a new action class. If causer is instance of ThreadDoneListener,
   * ThreadDoneListener is assigned automatically.
   * @param causer the object that causes the action, e.g. a frame
   */
  public MustAction(Object causer) {
    this(causer, null);
  }
  
  /**
   * Constructs a new action class. If causer is instance of ThreadDoneListener,
   * ThreadDoneListener is assigned automatically.
   * @param causer the object that causes the action, e.g. a frame
   * @param threadDoneListener the listener for thread done events
   */
  public MustAction(Object causer, ThreadDoneListener threadDoneListener) {
    this.causer = causer;
    this.threadDoneListener = threadDoneListener;
    if (threadDoneListener == null && causer instanceof ThreadDoneListener) {
      this.threadDoneListener = (ThreadDoneListener)causer; 
    }
  }
  
  public void setThreadDoneListener(ThreadDoneListener threadDoneListener) {
    this.threadDoneListener = threadDoneListener;
  }
  
//  public final Object getCauser() {
//    return causer;
//  }
//  
  public final ThreadDoneListener getThreadDoneListener() {
    return threadDoneListener;
  }
  
  public final void run() {
    execute();
  }

  /**
   * Constructs a new thread to call the run method.
   */
  public final void runInBackground() {
    BackgroundThread thread = new BackgroundThread();
    thread.start();
  }

  private void execute() {
    if (causer instanceof Frame) {
      ((Frame)causer).setCursor(waitCursor);
    }
    runIndividualStuff();
    if (causer instanceof Frame) {
      ((Frame)causer).setCursor(defaultCursor);
    }
  }

  /**
   * Runs the individual stuff. Sample:
   * <pre><code>
    AccountPrinting thread = new AccountPrinting();
    thread.setLeser(Global.getInstance().currentReader.getIdentifier());
    startThread(thread, R.getString("Konto-Druck"));
   * </code></pre>
   */
  protected abstract void runIndividualStuff();
  
  /**
   * Starts a thread.
   * @param thread the thread to be started
   */
  protected final void startThread(InterruptibleBatchThread thread) {
    startThread(thread, null);
  }
  
  /**
   * Starts a thread using a BatchThreadControllerFrame for interrupt opportunity.
   * @param thread  the thread to be started
   * @param threadController  the thread controller
   */
  protected final void startThread(InterruptibleBatchThread thread, ThreadController threadController) {
    if (threadController != null) {
      thread.setThreadController(threadController);
    }
    if (threadDoneListener != null) {
      thread.addThreadDoneListener(threadDoneListener);
    }
    thread.start();
  }
  
}