/*
 * Copyright (c) 2002-2005 Christoph Mueller. All rights reserved.
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
 * Thread done event.
 * @author Christoph Mueller
 */
public class ThreadDoneEvent {

  private boolean successful;
  private String eventMessage;
  private Exception exception;

  /**
   * Constructs a new thread done event with success indication.
   */
  public ThreadDoneEvent() {
    this(true);
  }

	/**
	 * Constructs a new thread done event.
	 * @param successful indicates whether the thread ended successful
	 */
  public ThreadDoneEvent(boolean successful) {
    this(successful, null);
  }

  /**
   * Constructs a new thread done event.
   * @param successful indicates whether the thread ended successful
   * @param eventMessage a message to ship with the event
   */
  public ThreadDoneEvent(boolean successful, String eventMessage) {
    this(successful, null, null);
  }

  /**
   * Constructs a new thread done event.
   * @param successful indicates whether the thread ended successful
   * @param eventMessage a message to ship with the event
   */
  public ThreadDoneEvent(boolean successful, String eventMessage, Exception exception) {
    this.successful = successful;
    this.eventMessage = eventMessage;
    this.exception = exception;
  }

  /**
   * Returns true if the thread ended successful.
   * @return true if the thread ended successful
   */
  public boolean wasSuccessful() {
    return successful;
  }

  /**
   * Returns the event message.
   * @return the event message
   */
  public String getEventMessage() {
    return eventMessage;
  }

  /**
   * Returns the exception or null if no exception occurred.
   * @return the exception or null if no exception occurred
   */
  public Exception getException() {
    return exception;
  }
  
}
