/*
 * Copyright (c) 2011 Christoph Mueller. All rights reserved.
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

package de.must.applet;

import javax.swing.JPanel;

import de.must.wuic.MustStatusLabel;

public abstract class AppletGUIs extends JPanel {

  public static synchronized String getContentBetween(String line, String from, String until, int starting) {
    int pos = line.indexOf(from, starting);
    if (pos == -1) return "";
    int pos2;
    pos2 = line.indexOf(until, pos + from.length());
    if (pos2 == -1) return "";
    return line.substring(pos + from.length(), pos2);
  }
  
  protected String title;
  protected MustStatusLabel messageReceiver;
  
  public AppletGUIs(String title) {
    this(title, null);
  }

  public AppletGUIs(String title, MustStatusLabel messageReceiver) {
    this.title = title;
    this.messageReceiver = messageReceiver;
  }
  
  protected String getTranslation(String key) {
    return AppletGlobal.getInstance().getResourceString(key);
  }
  
  protected abstract boolean perform(Action action);
  
}
