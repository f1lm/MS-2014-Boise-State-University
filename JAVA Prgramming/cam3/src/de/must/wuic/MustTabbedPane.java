/*
 * Copyright (c) 1999-2012 Christoph Mueller. All rights reserved.
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

package  de.must.wuic;

import javax.swing.*;

import java.awt.event.*;

/**
 * @author Christoph Mueller
 */
public class MustTabbedPane extends JTabbedPane implements ContextHelp, KeyListener {
  
  public static final int TYPE_SIMPLE = 0;
  public static final int TYPE_CLOSABLE = 1;

  // private FrameworkTextResource frameworkTextResource;
  private TabMenu menu;
  private String[] helpTopic = new String[10];
  private String[] helpTarget = new String[10];

  public MustTabbedPane(/*FrameworkTextResource frameworkTextResource*/) {
    this(TYPE_SIMPLE);
    // frameworkTextResource = frameworkTextResource;
  }

  /**
   * Constructs an new MustTabbedPane. If this should be closable, use TYPE_CLOSABLE.
   * @param type the type of the MustTabbedPane
   * @see #TYPE_SIMPLE
   * @see #TYPE_CLOSABLE
   */
  private MustTabbedPane(int type) { // not activated yet - needs FrameworkTextResource 
    addKeyListener(this); // always! - shortcuts may be passed to a upper level component.
    switch (type) {
    case TYPE_CLOSABLE:
      // menu = new TabMenu(this, frameworkTextResource);
      break;
    }
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   */
  public void setHelpContext(String helpTopic) {
    setHelpContext(helpTopic, null);
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   * @param helpTarget the context help's target
   */
  public void setHelpContext(String helpTopic, String helpTarget) {
    this.helpTopic[getTabCount()-1] = helpTopic;
    this.helpTarget[getTabCount()-1] = helpTarget;
  }

  /**
   * @return the topic of the component's help context
   */
  public String getHelpTopic() {
    return helpTopic[getSelectedIndex()];
  }

  /**
   * @return the target of the component's help context
   */
  public String getHelpTarget() {
    return helpTarget[getSelectedIndex()];
  }

  /**
   * Adds a scrolling enabled panel with a own label.
   * @param tabLabel the tab label
   * @param panel the panel to add
   */
  public void addScrollableTab(String tabLabel, JPanel panel) {
    addTab(tabLabel, new JScrollPane(panel));
  }

/**
   *
   * @param e
   */
  public void keyPressed(KeyEvent e) {
    de.must.wuic.ShortCutStd.interpret(e, this);
  }

  /**
   *
   * @param e
   */
  public void keyReleased(KeyEvent e) {}

  /**
   *
   * @param e
   */
  public void keyTyped(KeyEvent e) {}

}

