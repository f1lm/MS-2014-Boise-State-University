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

package de.must.wuic;

import java.awt.Component;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.Vector;

import javax.swing.JFrame;
import javax.swing.text.JTextComponent;

import de.must.util.Callback;

/**
 * Interpreter of right mouse click providing a standard context menu with additional item option.
 * @author Christoph Mueller
 */
public class RightMouseProvider implements MouseListener {
  
  public class AdditionalItem {
    String label;
    Callback callback;
    public AdditionalItem(String label, Callback callback) {
      this.label = label;
      this.callback = callback;
    }
  }

  /**
   * Registers the text component to be provided. 
   * @param textComponent the text component to be provided
   * @param versionController the version controller or null if function undo should not be supported
   */
  public static RightMouseProvider provide(JTextComponent textComponent, VersionController versionController) {
    return provide(getFrame(textComponent), textComponent, versionController);
  }
  
  private static RightMouseProvider provide(JFrame ownerFrame, JTextComponent textComponent, VersionController versionController) {
    return new RightMouseProvider(ownerFrame, textComponent, versionController);
  }
  
  private static JFrame getFrame(Component c) {
    Component w = c;
    while (!(w instanceof JFrame) && (w != null)) {
      w = w.getParent();
    }
    return (JFrame)w;
  }

  private JFrame ownerFrame;
  private JTextComponent textComponent;
  private VersionController versionController;
  private Vector<AdditionalItem> additionalItems;
  
  private RightMouseProvider(final JFrame ownerFrame, final JTextComponent textComponent, VersionController versionController) {
    this.ownerFrame = ownerFrame;
    this.textComponent = textComponent;
    this.versionController = versionController;
    textComponent.addMouseListener(this);
  }
  public void mouseReleased(MouseEvent e) {
    showMenuIfPopupTrigger(e, ownerFrame, textComponent, versionController);
  }
  public void mousePressed(MouseEvent e) {
    textComponent.requestFocus();
  }
  public void mouseExited(MouseEvent e) {
  }
  public void mouseEntered(MouseEvent e) {
  }
  public void mouseClicked(MouseEvent e) {
  }
  
  public void addItem(RightMouseProvider.AdditionalItem additionalItem) {
    if (additionalItems == null) additionalItems = new Vector<RightMouseProvider.AdditionalItem>();
    additionalItems.add(additionalItem);
  }

  private void showMenuIfPopupTrigger(MouseEvent e, final JFrame ownerFrame, final JTextComponent textComponent, final VersionController versionController) {
    if (e.isPopupTrigger()) {
      RightMouseMenu menu = new RightMouseMenu(ownerFrame, textComponent, versionController, additionalItems);
      menu.show(textComponent, 5, 5);
    }
  }
  
}
