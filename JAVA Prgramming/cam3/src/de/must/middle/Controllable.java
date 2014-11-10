/*
 * Copyright (c) 2003 Christoph Mueller. All rights reserved.
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

/**
 * Interface between independent threads and their user interface(s) to start 
 * and cancel them (while running).
 * @see ThreadController
 * @author Christoph Mueller
 */
public interface Controllable {
  
	/**
	 * Set the thread controller.
	 * @param threadController the thread controller to use.
	 */
	public abstract void setThreadController(ThreadController threadController);
  
  /**
   * Adds the specified ThreadDoneListener to receive thread done events.
   * @see ThreadDoneEvent
   */
  public abstract void addThreadDoneListener(ThreadDoneListener l);

  /**
   * Causes this thread to begin execution; the Java Virtual Machine 
   * calls the <code>run</code> method of this thread. 
   * <p>
   * The result is that two threads are running concurrently: the 
   * current thread (which returns from the call to the 
   * <code>start</code> method) and the other thread (which executes its 
   * <code>run</code> method). 
   *
   * @exception  IllegalThreadStateException  if the thread was already
   *               started.
   * @see        java.lang.Thread#run()
   */
  public abstract void start();

}