/*
 * Copyright (c) 2002-2007 Christoph Mueller. All rights reserved.
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
 * Interface to a user interface to control a thread, e.g. to cancel it.
 * @author Christoph Mueller
 */
public interface ThreadController extends StatusInfoPresenter {
  
  /**
   * Enables or disables the cancel button. E.g. when the controlled thread
   * waits for an external process, it doesn't make sense to keep the button
   * enabled, because the button won't stop the external process.
   * By default, the cancel button is enabled.
   * @param enabled whether the cancel button should be enabled o not.
   */
  public void setCancelButtonEnabled(boolean enabled);
  
  /**
   * Returns true if the thread is to cancel. Is answered true if user
   * clicked the cancel button meanwhile.
   * @return true if the thread is to be continued
   */
  public boolean isToCancel();

  /**
   * Sets the status information to be transfered to the user.
   * @param message the status information for the user
   */
  public void setStatusInformation(String statusInformation);

  /**
   * Informs the controller that the task is done.
   */
  public void taskIsDone();

}

