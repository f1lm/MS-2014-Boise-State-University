/*
 * Copyright (c) 1999-2008 Christoph Mueller. All rights reserved.
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

import java.awt.Container;
import java.awt.event.*;

/**
 * This class helps interpreting shortcuts.
 * Concept:
 * Shortcuts from editable components are preferred. If there is no connection,
 * frame shortcuts may be interpreted in a next step.
 * <p>
 * Extend the class to override the method interpretControlModifiedKeys:
 * <pre>
 *       public final class MainShortCuts extends de.must.wuic.ShortCutStd {
 * </pre>
 * <p>
 * Create it e.g. in the MainMenu class:
 * <pre>
 *       private MainShortCuts mainShortCuts = new MainShortCuts();
 * </pre>
 * @see de.must.util.Help
 *
 * @version 1.0 05/17/00
 * @author Christoph Mueller
 */
public abstract class ShortCutStd {

  /**
   * The application individual interpreter
   */
  private static ShortCutStd mainShortCutInstance;
  private static KeyEvent lastSuccessfullInterpretedKeyEvent;

  /**
   * Interpreter for components who listen to key events themselves.
   * Many editable components listen for key events for several reasons.
   * Therefore it is preferential to append shortcut interpretation there.
   * One reason is the context help concept: The more detailed the focus is,
   * the more individual help is provided.
   *
   * @param keyEventToInterpret the key event to interpret
   * @param context the container where the key event occurred
   * @return
   */
  public static boolean interpret(KeyEvent keyEventToInterpret, java.awt.Container context) {
    if (mainShortCutInstance == null) {
      de.must.io.Logger.getInstance().debug(ShortCutStd.class, "ShortCut not instanciated");
      return false;
    }
    de.must.io.Logger.getInstance().debug(ShortCutStd.class, "Static interpretation in " + ShortCutStd.class);
    if (mainShortCutInstance.interpret(keyEventToInterpret)) return getTrueAfterRememberingEvent(keyEventToInterpret);
    if (keyEventToInterpret.getKeyCode() == KeyEvent.VK_F1 & keyEventToInterpret.getModifiers() == 0) {
      de.must.util.Help.showContextHelp(context);
      keyEventToInterpret.consume(); // don't do VK_F1 by help menu
      return getTrueAfterRememberingEvent(keyEventToInterpret);
    } else if (keyEventToInterpret.getKeyCode() == KeyEvent.VK_ESCAPE & keyEventToInterpret.getModifiers() == 0) {
      Container temp = context;
      while (temp != null) {
        if (temp instanceof MustDialog) {
          ((MustDialog)temp).closeInstance();
          keyEventToInterpret.consume();
          return getTrueAfterRememberingEvent(keyEventToInterpret);
        } else {
          temp = temp.getParent();
        }
      }
    }
    return false;
  }

  /**
   * Interpreter for frames that do not listen to key events themselves.
   * Such registered frames will interpret shortcuts, even if not key
   * listening components got focus.
   *
   * @param frameToInterpret the frame to listen to
   */
  public static void addInterpreter(JFrame frameToInterpret) {
    if (mainShortCutInstance != null) mainShortCutInstance.addInterpreterToMainInstance(frameToInterpret);
  }

  /* not for Dialogs (lock)
  public static void addInterpreter(JDialog DialogToInterpret) {
    if (mainShortCutInstance != null) mainShortCutInstance.addInterpreterToMainInstance(DialogToInterpret);
  } */

  /**
   *
   * @param getLastSuccessfullInterpretedKeyEvent
   * @return
   */
  public static KeyEvent getLastSuccessfullInterpretedKeyEvent() {
    return lastSuccessfullInterpretedKeyEvent;
  }

  /**
   *
   * @param interpretedKeyEvent
   * @return
   */
  private static boolean getTrueAfterRememberingEvent(KeyEvent interpretedKeyEvent) {
    lastSuccessfullInterpretedKeyEvent = interpretedKeyEvent;
    return true;
  }

  /**
   * Constructs a shortcut instance and registers it statically for later use by standard components.
   */
  public ShortCutStd() {
    mainShortCutInstance = this;
  }

  /**
   *
   * @param frameToInterpret
   */
  private void addInterpreterToMainInstance(JFrame frameToInterpret) {
    frameToInterpret.addKeyListener(new java.awt.event.KeyAdapter() {
      public void keyPressed(java.awt.event.KeyEvent e) {
        interpret(e);
      }
    });
  }

  // no general Interpreter in Dialogs (lock!)
  /* private void addInterpreterToMainInstance(JDialog DialogToInterpret) {
    DialogToInterpret.addKeyListener(new java.awt.event.KeyAdapter() {
      public void keyPressed(java.awt.event.KeyEvent e) {
        interpret(e);
      }
    });
  } */

  /**
   *
   * @param keyEventVKcode
   * @return
   */
  protected abstract boolean interpretControlModifiedKeys(int keyEventVKcode);

  /**
   *
   * @param keyEventToInterpret
   * @return
   */
  private boolean interpret(KeyEvent keyEventToInterpret) {
    if (MainStd.debugMode) de.must.io.Logger.getInstance().info(getClass(), "Individual interpretation in must.awt.ShortCutStd");
    if (keyEventToInterpret.equals(lastSuccessfullInterpretedKeyEvent)) return false;
    switch (keyEventToInterpret.getModifiers()) {
    case KeyEvent.CTRL_MASK:
      if (interpretControlModifiedKeys(keyEventToInterpret.getKeyCode())) return getTrueAfterRememberingEvent(keyEventToInterpret);
      break;
    }
    if (keyEventToInterpret.getModifiers() == 0) { // function keys
      if (keyEventToInterpret.getKeyCode() == KeyEvent.VK_F1) {
        de.must.util.Help.showContextHelp((java.awt.Container)keyEventToInterpret.getComponent());
        keyEventToInterpret.consume(); // don't do VK_F1 by help menu
        return getTrueAfterRememberingEvent(keyEventToInterpret);
      }
    }
    return false;
  }

}
