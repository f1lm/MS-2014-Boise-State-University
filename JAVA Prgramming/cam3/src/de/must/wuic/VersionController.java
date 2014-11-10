/*
 * Copyright (c) 2011-2012 Christoph Mueller. All rights reserved.
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
import java.util.Vector;

import de.must.io.Logger;

/**
 * Version Controller of text components supporting undo.
 * @author Christoph Mueller
 */
public class VersionController {
  
  private class Delayer extends Thread {
    @Override
    public void run() {
      while (newVersion) {
        newVersion = false;
        try {
          sleep(500);
        } catch (InterruptedException e) {
          Logger.getInstance().error(getClass(), e);
          return;
        }
      }
      addSnapShot(pendingContent);
      pendingContent = null;
    }
  }
  
  private Vector<String> versions = new Vector<String>();
  private String lastContent = null;
  private String pendingContent = null;
  private boolean newVersion;
  private int pointer;
  
  /**
   * Indicates the beginning of versioning. 
   * @param content the initial content
   */
  public void reset(String content) {
    versions.clear();
    versions.add(content);
    pointer = 0;
    lastContent = content;
  }

  /**
   * Delegates key event handling to this class in order to check what to do: create a new version or undo.
   * @param e the current key event
   * @param content the current content of the class
   * @param undoable the interface to call the undo function
   */
  public void interpret(final KeyEvent e, final String content, final Undoable undoable) {
    if (e.getModifiers() == KeyEvent.CTRL_MASK && e.getKeyCode() == KeyEvent.VK_Z && hasFormerContent()) {
      undoable.undo();
    } else {
      if (e.getModifiers() == KeyEvent.CTRL_MASK) { // e.g. Ctrl-C, Ctrl-V
        notifyChange(content, false);
      } else { // regular typing
        notifyChange(content, true);
      }
    }
  }

  public void notifyChange(String newContent, boolean delay) {
    Logger.getInstance().debug(getClass(), "Notifying " + newContent);
    if (!newContent.equals(lastContent)) {
      if (delay) {
        newVersion = true;
        if (pendingContent == null) {
          pendingContent = newContent;
          (new Delayer()).start();
        } else {
          pendingContent = newContent;
        }
      } else {
        addSnapShot(newContent);
      }
      lastContent = newContent;
    }
  }
  
  private void addSnapShot(String snapShot) {
    for (int i = versions.size() - 1; i > pointer; i--) {
      versions.removeElementAt(i);
    }
    pointer++;
    versions.add(snapShot);
    debugOut();
  }
  
  private void debugOut() {
//    System.out.println("----------------------------------------");
//    Iterator<String> iterator = versions.iterator();
//    while (iterator.hasNext()) {
//      System.out.println(iterator.next());
//    }
//    System.out.println("Pointer = " + pointer);
  }
  
  /**
   * Indicates whether or not there is former content available.
   * @return true there is former content available
   */
  public boolean hasFormerContent() {
    return pointer > 0;
  }
  
  /**
   * Returns former content, check hasFormerContent() before.
   * @return former content
   */
  public String getFormerContent() {
    pointer--;
    debugOut();
    lastContent = versions.get(pointer);
    return versions.get(pointer);
  }

}
