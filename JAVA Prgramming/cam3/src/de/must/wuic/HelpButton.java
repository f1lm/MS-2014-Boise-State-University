/*
 * Copyright (c) 1999-2004 Christoph Mueller. All rights reserved.
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

import de.must.util.*;
import javax.swing.*;
import java.awt.event.*;
import java.util.Locale;

/**
 * @author Christoph Mueller
 */
public class HelpButton extends JButton implements KeyListener, ActionListener  {

  private Locale locale;
  private String topic;
  private String target;

  /**
   *
   * @param topic
   */
  public HelpButton(Locale locale, String topic) {
    this(locale, topic, null);
  }

  /**
   *
   * @param topic
   * @param target
   */
  public HelpButton(Locale locale, String topic, String target) {
    super(WuicGlobal.getInstance(locale).getResourceString("TEXT_HELP"));
    this.locale = locale;
    this.topic = topic;
    this.target = target;
    this.addActionListener(this);
    this.addKeyListener(this);
    this.setDefaultCapable(false);
  }

  /**
   *
   * @param e
   */
  public void keyPressed(KeyEvent e) {
    if (e.getKeyCode() == KeyEvent.VK_ENTER) act();
  }

  /**
   *
   * @param e
   */
  public void keyReleased(KeyEvent e) {}
  public void keyTyped(KeyEvent e) {}

  /**
   *
   * @param e
   */
  public void actionPerformed(ActionEvent e) {
    act();
  }

  /**
   *
   */
  public void act() {
    if (topic == null) Help.showTopic("Index");
    else {
      if (target == null) {
        Help.showTopic(topic);
      } else {
        Help.showTopic(topic, target);
      }  
    }
  }

}
