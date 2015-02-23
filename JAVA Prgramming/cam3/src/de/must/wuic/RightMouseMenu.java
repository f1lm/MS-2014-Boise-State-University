/*
 * Copyright (c) 2011-2013 Christoph Mueller. All rights reserved.
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

import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.ClipboardOwner;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.StringSelection;
import java.awt.datatransfer.Transferable;
import java.awt.datatransfer.UnsupportedFlavorException;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.io.IOException;
import java.security.AccessControlException;
import java.util.Iterator;
import java.util.Vector;

import javax.swing.JFrame;
import javax.swing.JMenuItem;
import javax.swing.JPopupMenu;
import javax.swing.JSeparator;
import javax.swing.KeyStroke;
import javax.swing.text.BadLocationException;
import javax.swing.text.JTextComponent;

import de.must.io.Logger;
import de.must.wuic.RightMouseProvider.AdditionalItem;

/**
 * Standard Right Mouse Menu with Extension Option.
 * @author Christoph Mueller
 */
public class RightMouseMenu extends JPopupMenu implements ClipboardOwner {
  
  private static Clipboard clipboard;
  public static String clipboardSubstitution = "";
  
  static {
    try {
      clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
    } catch (AccessControlException e) { // unsigned applet
      Logger.getInstance().warn(RightMouseMenu.class, "Using clipboard substitution (" + e.getMessage() + ")");
      clipboard = null;
    }
  }
  
  public RightMouseMenu(JFrame ownerFrame, final JTextComponent componentToLocateUppon, final VersionController versionController, final Vector<AdditionalItem>additionalItems) {
    JMenuItem item;
    // ----------------------------------------------------------
    if (versionController != null) {
      item = new JMenuItem(getTranslation("TEXT_UNDO_TYPING"));
      item.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_Z, KeyEvent.CTRL_MASK));
      add(item);
      item.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent e) {
          ((Undoable)componentToLocateUppon).undo();
          setVisible(false);
        }
      });
      item.setEnabled(versionController.hasFormerContent());
      add(new JSeparator()); // --------------------------------------------
    }
    // ----------------------------------------------------------
    item = new JMenuItem(getTranslation("TEXT_CUT"));
    item.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_X, KeyEvent.CTRL_MASK));
    add(item);
    item.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        String text = componentToLocateUppon.getText();
        int begin = componentToLocateUppon.getSelectionStart();
        int end = componentToLocateUppon.getSelectionEnd();
        if (clipboard != null) clipboard.setContents(new StringSelection(text.substring(begin, end)), RightMouseMenu.this);
        else clipboardSubstitution = text.substring(begin, end);
        try {
          componentToLocateUppon.getDocument().remove(begin, end-begin);
          if (componentToLocateUppon instanceof MustTextField) {
            ((MustTextField)componentToLocateUppon).fireContentChanged();
          }
        } catch (BadLocationException e1) {
          Logger.getInstance().error(getClass(), e1);
        }
        if (versionController != null) {
          versionController.notifyChange(componentToLocateUppon.getText(), false);
        }
        setVisible(false);
      }
    });
    // ----------------------------------------------------------
    item = new JMenuItem(getTranslation("TEXT_COPY"));
    item.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_C, KeyEvent.CTRL_MASK));
    add(item);
    item.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        String text = componentToLocateUppon.getText();
        int begin = componentToLocateUppon.getSelectionStart();
        int end = componentToLocateUppon.getSelectionEnd();
        if (clipboard != null) clipboard.setContents(new StringSelection(text.substring(begin, end)), RightMouseMenu.this);
        else clipboardSubstitution = text.substring(begin, end);
        setVisible(false);
      }
    });
    // ----------------------------------------------------------
    item = new JMenuItem(getTranslation("TEXT_PASTE"));
    item.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_V, KeyEvent.CTRL_MASK));
    add(item);
    item.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        int begin = componentToLocateUppon.getSelectionStart();
        int end = componentToLocateUppon.getSelectionEnd();
        try {
          String textToInsert;
          if (clipboard != null) textToInsert = (String)(clipboard.getData(DataFlavor.stringFlavor));
          else textToInsert = clipboardSubstitution;
          componentToLocateUppon.getDocument().remove(begin, end-begin);
          componentToLocateUppon.getDocument().insertString(begin, textToInsert, null);
          if (componentToLocateUppon instanceof MustTextField) {
            ((MustTextField)componentToLocateUppon).fireContentChanged();
          }
        } catch (BadLocationException e1) {
          Logger.getInstance().error(getClass(), e1);
        } catch (UnsupportedFlavorException e1) {
          Logger.getInstance().error(getClass(), e1);
        } catch (IOException e1) {
          Logger.getInstance().error(getClass(), e1);
        }
        if (versionController != null) {
          versionController.notifyChange(componentToLocateUppon.getText(), false);
        }
        setVisible(false);
      }
    });
    // ----------------------------------------------------------
    add(new JSeparator()); // --------------------------------------------
    item = new JMenuItem(getTranslation("TEXT_SELECT_ALL"));
    item.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_A, KeyEvent.CTRL_MASK));
    add(item);
    item.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        componentToLocateUppon.select(0, componentToLocateUppon.getText().length());
        setVisible(false);
      }
    });
    if (additionalItems != null) {
      Iterator<AdditionalItem> iterator = additionalItems.iterator();
      while (iterator.hasNext()) {
        final RightMouseProvider.AdditionalItem additionalItem = iterator.next();
        item = new JMenuItem(additionalItem.label);
        add(item);
        item.addActionListener(new ActionListener() {
          public void actionPerformed(ActionEvent e) {
            additionalItem.callback.callback();
            setVisible(false);
          }
        });
      }
    }
  }

  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey) {
    return WuicGlobal.getInstance().getResourceString(resourceKey);
  }

  @Override
  public void lostOwnership(Clipboard clipboard, Transferable contents) {
    setVisible(false);
  }

}
