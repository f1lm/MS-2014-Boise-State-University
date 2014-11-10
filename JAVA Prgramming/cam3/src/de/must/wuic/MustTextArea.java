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

package de.must.wuic;

import javax.swing.*;


import java.awt.*;
import java.awt.event.*;

/**
 * Text input Area with context help among others.
 * @author Christoph Mueller
 */
public class MustTextArea extends JTextArea implements ContextHelp, KeyListener, Undoable {

  static double fontFactor = 1;
  
  static {
    JLabel refLabel = new JLabel();
    Font commonFont = refLabel.getFont();
    fontFactor = (double)commonFont.getSize() / 11;
  }
  
  private int maxChars;
  private Toolkit thisToolkit;
  private String helpTopic;
  private String helpTarget;
  private VersionController versionController = new VersionController();
  private RightMouseProvider rightMouseProvider;
  protected String editBeginValue = "";

  public MustTextArea() {
    this(null);
  }

  /**
   * Constructs a new text area with a default width of 60 characters and
   * default height of 3 rows with the initial text as specified.
   * @param info the initial text
   */
  public MustTextArea(String info) {
    this(info, 3, 60, 9999999);
  }

  /**
   * Constructs a new text area with a size as specified.
   * @param rows the number of rows used for rendering
   * @param columns the number of columns to determine the width
   */
  public MustTextArea(int rows, int columns) {
    this(rows, columns, 9999999);
  }

  /**
   * Constructs a new text area with a size as specified.
   * @param rows the number of rows used for rendering
   * @param columns the number of columns to determine the width
   * @param maxChars the maximum number of characters for input
   */
  public MustTextArea(int rows, int columns, int maxChars) {
    this(null, rows, columns, maxChars);
  }

  /**
   * Constructs a new text area with initial text and size as specified.
   * @param text the initial text of the text area
   * @param rows the number of rows used for rendering
   * @param columns the number of columns to determine the width
   */
  public MustTextArea(String text, int rows, int columns) {
    this(text, rows, columns, 9999999);
  }

  /**
   * Constructs a new text area with initial text and size as specified.
   * @param text the initial text of the text area
   * @param rows the number of rows used for rendering
   * @param columns the number of columns to determine the width
   * @param maxChars the maximum number of characters for input
   */
  public MustTextArea(String text, int rows, int columns, int maxChars) {
    super(null, text, rows, (int)(columns / fontFactor));
    this.maxChars = maxChars;
    setLineWrap(true);
    setWrapStyleWord(true);
    if (GlobalInWuicStd.fatCaret) setCaret(new MustCaret());
    addKeyListener(this);
    setFont((new MustTextField()).getFont());
    try {
      thisToolkit = this.getToolkit();
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    };
    rightMouseProvider = RightMouseProvider.provide(this, versionController);
  }

  /**
   * Returns the right mouse provider.
   * @return the right mouse provider
   */
  public RightMouseProvider getRightMouseProvider() {
    return rightMouseProvider;
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
    this.helpTopic = helpTopic;
    this.helpTarget = helpTarget;
  }

  /**
   * @return the topic of the component's help context
   */
  public String getHelpTopic() {
    return helpTopic;
  }

  /**
   * @return the target of the component's help context
   */
  public String getHelpTarget() {
    return helpTarget;
  }

  /**
   * Sets the maximum of characters to be inserted.
   * @param maxChars the max characters to be inserted
   */
  public void setMaxChars(int maxChars) {
    this.maxChars  = maxChars;
  }
  
  /**
   * Sets the text as edit begin value which causes isModified to return false
   * as long as user doesn't change the value.
   * @param newText the new text
   */
  public void setTextAsEditBeginValue(String text) {
    setText(text);
    editBeginValue = text;
  }

  /* (non-Javadoc)
   * @see javax.swing.text.JTextComponent#setText(java.lang.String)
   */
  public void setText(String t) {
    super.setText(t);
    setCaretPosition(0);
    if (versionController != null) versionController.reset(t);
  }

  @Override
  public Dimension getPreferredSize() {
    Dimension result = super.getPreferredSize();
    if (result != null && getColumns() > 0) {
      FontMetrics metrics = getFontMetrics(getFont());
      // 'u' instead of 'm' - it's better smaller, otherwise we get often get a scroll bar for blanks only
      result.width = getColumns() * metrics.charWidth('u') + getInsets().left + getInsets().right;
    }
    return result;
  }

  public boolean isModified() {
    return(!getText().equals(editBeginValue));
  }
  
  /**
   * Invoked when a key has been pressed.
   * @param e the key event
   */
  public void keyPressed(KeyEvent e) {
  }

  /**
   * Invoked when a key has been released. Used for length control.
   * @param e the key event
   */
  public void keyReleased(KeyEvent e) {
    if (isEditable()) {
      if (getText().length() > maxChars) {
        setText(getText().substring(0, maxChars));
        thisToolkit.beep();
      }
      if (versionController != null) versionController.interpret(e, getText(), (Undoable)this);
    }
  }

  /**
   * Invoked when a key has been typed. Used for length control.
   * @param e the key event
   */
  public void keyTyped(KeyEvent e) {}

  @Override
  public void undo() {
    if (versionController == null) return; 
    int caretPos = getCaretPosition();
    super.setText(versionController.getFormerContent());
    if (caretPos > getText().length()) {
      caretPos = getText().length();
    }
    setCaretPosition(caretPos);
  }

  /**
   * Releases external resources.
   */
  public void free() {
  }

}
