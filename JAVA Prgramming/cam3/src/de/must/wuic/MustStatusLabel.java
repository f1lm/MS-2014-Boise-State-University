/*
 * Copyright (c) 1999-2013 Christoph Mueller. All rights reserved.
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

import javax.swing.*;
import javax.swing.border.*;

/**
 * Status label.
 * @author Christoph Mueller
 */
public class MustStatusLabel extends JLabel {
  private static String defaultStatustext = " ";
  private boolean remaining = false;
  // private AnimatedLabel animatedLabel1 = new AnimatedLabel();
  // Animation deactivated because it foils garbage collection!

  public MustStatusLabel() {
    super(defaultStatustext);
    setBorder(new BevelBorder(BevelBorder.LOWERED));
  }

  public static void setDefaultStatustext(String newDefaultStatustext) {
    if (newDefaultStatustext.equals("")) defaultStatustext = " "; // to keep height
    else defaultStatustext = newDefaultStatustext;
  }

  /**
   * Set's the status label to its default value.
   */
  public void reset() {
    setText(defaultStatustext);
  }

  public void resetDefault() {
    if (!remaining) setText(defaultStatustext);
  }

  public void setStatus(String statusText) {
    if (remaining && getText().length() > 1 && getText().indexOf(statusText) == -1) {
      // user might be interested in previous message!
      statusText = getText() + " - " + statusText;
    }
    remaining = false;
    if (statusText.equals("")) setText(" "); // to keep height
    else setText(statusText);
  }

  public void setDefaultStatus(String statusText) {
    if (!remaining) {
      if (statusText.equals("")) setText(" "); // to keep height
      else setText(statusText);
    }
  }

  public void setRemainStatus(String statusText) {
    if (remaining && getText().length() > 1 && getText().indexOf(statusText) == -1) {
      // user might be interested in previous message!
      statusText = getText() + " - " + statusText;
    }
    if (statusText != null) {
      remaining = true;
      if (statusText.equals("")) setText(" "); // to keep height
      else setText(statusText);
    }
  }

//  public void startAnimation() {
//    if (animatedLabel1 != null) animatedLabel1 = new AnimatedLabel();
//    animatedLabel1.start();
//  }

  public void stopAnimation() {
//    if (animatedLabel1 != null) animatedLabel1.stopGently();
  }

//  class AnimatedLabel extends Thread {
//
//  private boolean isToStop;
//
//    public void stopGently() {
//      isToStop = true;
//    }
//
//    public void run() {
//      isToStop = false;
//      int I=0;
//      while (!isToStop) {
//        for (int i = 0; i<10; i++) {
//          if (!isToStop) {
//            setText(" " + getText());
//            try {sleep(100);}
//            catch (InterruptedException e) {}
//          }
//        }
//        for (int i = 10; i>=1; i--) {
//          if (!isToStop) {
//            setText(getText().substring(1, getText().length()));
//            try {sleep(100);}
//            catch (InterruptedException e) {}
//          }
//        }
//      }
//    }
//  }

}
