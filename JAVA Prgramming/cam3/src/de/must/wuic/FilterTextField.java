/*
 * Copyright (c) 2004-2008 Christoph Mueller. All rights reserved.
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

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import de.must.io.Logger;
import de.must.util.Callback;

/**
 * Text field for user input to filter data. After user didn't enter additional
 * data for 200 milliseconds, a callback is initialized to refresh data.
 * @author Christoph Mueller
 */
public class FilterTextField extends MustTextField implements Runnable {
  
  private Callback callback;
  private Thread thisThread;
  private boolean waitAgain;
  private boolean callbackPending = false;
  
  /**
   * Constructs a new FilterTextField.
   * @param length the length of the FilterTextField
   * @param callback the object to receive the callback after user stopped editing
   */
  public FilterTextField(int length, final Callback callback) {
    super(length);
    final FilterTextField thisInstance = this;
    this.callback = callback;
    addKeyListener(new KeyListener() {
      public void keyTyped(KeyEvent e) {}
      public void keyPressed(KeyEvent e) {}
      public void keyReleased(KeyEvent e) {
        if (Character.isLetterOrDigit(e.getKeyChar())
          || e.getKeyCode() == KeyEvent.VK_DELETE
          || e.getKeyCode() == KeyEvent.VK_BACK_SPACE
        ) {
          waitAgain = true;
          if (!callbackPending) {
            // System.out.println("Starting thread");
            thisThread = new Thread(thisInstance);
            thisThread.start();
          }
        }
      }
    });
  }
  
  @Override
  public void run() {
    callbackPending = true;
    while (waitAgain) {
      try {
        waitAgain = false;
        Thread.sleep(200);
      } catch (InterruptedException e) {
        Logger.getInstance().error(getClass(), e);
      }
    }
    callbackPending = false;
    callback.callback();
  }

}
