/*
 * Copyright (c) 1999-2011 Christoph Mueller. All rights reserved.
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

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

/**
 * @author Christoph Mueller
 */
public class MustPasswordField extends JPasswordField implements ContextHelp, KeyListener /*, DropTargetListener */ {

  private int columnWidth;
  private static final int maxColumns = 60;
  private boolean controlLength;
  private int maxChars;
  protected Toolkit thisToolkit;
  private String textBefore = "";
  protected String editBeginValue = "";
  private String helpTopic;
  private String helpTarget;
  private boolean required = false;
  private boolean fileDropEnabled = false;

  /**
   *
   */
  public MustPasswordField() {
    this(20, 20, false);
  }

  /**
   *
   * @param length
   */
  public MustPasswordField(int length) {
    this(length, length, false);
  }

  /**
   *
   * @param length
   * @param maxChars
   * @param controlLength
   */
  public MustPasswordField(int length, int maxChars, boolean controlLength) {
    super(length);
    if (length > maxColumns ) super.setColumns(maxColumns);
    this.maxChars = maxChars;
    this.controlLength = controlLength;
    try {
      this.addKeyListener(this);
      thisToolkit = this.getToolkit();
      // de.must.io.Logger.getInstance().info(getClass(), "setDropTarget in Init von " + this.getClass().getName());
      // For flat-rate use not mature!  setDropTarget(new DropTarget(this, (DropTargetListener)this));
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    };
  }

  /**
   *
   * @param text
   */
  public void setText(String text) {
    super.setText(text);
    textBefore = text;
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

  /**
   *
   * @return
   */
  public String getPasswordText() {
    return new String(this.getPassword());
  }

  public boolean isModified() {
    return(!getPasswordText().equals(editBeginValue));
  }
  
  /**
   *
   * @param f
   */
  public void setFont(Font f) {
    super.setFont(f);
    columnWidth = 0;
  }

  /**
   *
   * @return
   */
  protected int getColumnWidth() {
    if (columnWidth == 0) {
      FontMetrics metrics = getFontMetrics(getFont());
      columnWidth = metrics.charWidth('0');
    }
    return columnWidth;
  }

  /**
   *
   * @return
   */
  public Dimension getPreferredSize() {
    synchronized (getTreeLock()) {
      Dimension size = super.getPreferredSize();
      if (getColumns() != 0) {
        size.width = getColumns() * getColumnWidth() + 5;
      }
      return size;
    }
  }

  /* public void enableFileDropXy() {
    // de.must.io.Logger.getInstance().info(getClass(), "enableFileDrop in " + this.getClass().getName());
    // this.addDropTargetListener(this);
    // this.addDropTargetListener((DropTargetListener)this);
    // DropTarget DT = new DropTarget(this, (DropTargetListener)this);
    // de.must.io.Logger.getInstance().info(getClass(), DT.isActive());
    // setDropTarget(DT);
    fileDropEnabled = true;
  } */

  /**
   *
   * @param required
   */
  public void setRequired(boolean required) {
    this.required = required;
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   */
  public void setHelpContext(String helpTopic) {
    this.helpTopic = helpTopic;
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   * @param helpTarget the context help's target
   */
  public void setHelpContext(String helpTopic, String helpTarget) {
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
   *
   * @return
   */
  public boolean isRequired() {
    return required;
  }

  /**
   *
   * @return
   */
  public boolean isRequirementUnfulfilled() {
    if (required & this.getPassword().toString().trim().equals("")) return true;
    return false;
  }

  /**
   *
   * @param e
   */
  public void keyPressed(KeyEvent e) {}

  /**
   *
   * @param e
   */
  public void keyReleased(KeyEvent e) {
    if (controlLength) {
      // de.must.io.Logger.getInstance().info(getClass(), "Länge bei keyReleased in MustTextField: " + this.getText().length());
      if (this.getPassword().length > maxChars) {
        this.setText(textBefore);
        // this.setText(this.getText().substring(0, maxChars));
        thisToolkit.beep();
      }
      else {
        if (!(e.getModifiers() == KeyEvent.ALT_MASK)) textBefore = this.getPassword().toString();
      }
    }
    if (e.getModifiers() == KeyEvent.ALT_MASK) this.setText(textBefore); // don't type any shortcut try
  }

  /**
   *
   * @param e
   */
  public void keyTyped(KeyEvent e) {}

  /**
   *
   * @param e
   */
  public void actionPerformed(ActionEvent e) {}

}
