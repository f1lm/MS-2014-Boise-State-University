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

import de.must.io.*;
import de.must.util.StringFunctions;

import java.awt.*;
import java.io.*;
import java.util.*;

/**
 * Class to recover user-specific preferences like position and size of each frame.
 * @author Christoph Mueller
 */
public class WinContr implements Serializable {
  
  private static WinContr instance;

  /**
   * Loads the user's preferences from a specific directory.
   * @param storeDirectory the directory to load the preferences from
   */
  public static void create(String storeDirectory) {
    instance = new WinContr(storeDirectory);
  }
  
  public final static WinContr getInstance() {
    if (instance == null) {
      instance = new WinContr();
    }
    return instance;
  }

  private String storeDirectoryPlusSlash;
  private String systemUserName;
  private WinPropContainer winPropContainer;
  private Dimension ScreenSize;
  private Window pendingWindow;
  
  public WinContr() {
    createInstance(null);
  }

  public WinContr(String storeDirectory) {
    createInstance(storeDirectory);
  }

  private void createInstance(String storeDirectory) {
    if (storeDirectory != null) storeDirectoryPlusSlash = storeDirectory + "/";
    else storeDirectoryPlusSlash = "";
    try {
      systemUserName = System.getProperty("user.name");
    }
    catch (Exception e) {
      systemUserName = "unknown";
    }
    if (systemUserName.equals("")) systemUserName = "unknown";
    if (storeDirectoryPlusSlash != null && storeDirectoryPlusSlash.length() > 0) try {
      winPropContainer = (WinPropContainer)PermObject.read(new File(storeDirectoryPlusSlash + StringFunctions.replaceAll(systemUserName, "?", "") + ".wpr")); // wpr = windows properties
    } catch (Exception e) {} // e.g. when package names are reorganized
    // possible extensions: storing layout properties in cookies in case of applet windows
    if (winPropContainer == null) winPropContainer = new WinPropContainer();
    ScreenSize = Toolkit.getDefaultToolkit().getScreenSize();
  }

  /**
   * Layouts a window as previously used by the current user.
   * @param currentWindow the window to be laid-out
   * @return true if the window has been laid-out because of available specifications
   */
  public boolean layout(Window currentWindow) {
    final int minEdge = 300;
    String longClassName = currentWindow.getClass().getName();
    String shortClassName = longClassName.substring(longClassName.lastIndexOf(".")+1);
    Rectangle currentRectangle = null;
    Object winPropObj = winPropContainer.winBounds.get(shortClassName);
    if (winPropObj != null && winPropObj instanceof WinPropContainer.WinProp) {
      Frame currentFrame = null;
      if (currentWindow instanceof Frame) {
        currentFrame = (Frame)currentWindow;
        int state = ((WinPropContainer.WinProp)winPropObj).state;
        if (state == Frame.MAXIMIZED_BOTH) {
          currentFrame.setExtendedState(state);
        }
      }
      currentRectangle = ((WinPropContainer.WinProp)winPropObj).sizeLoc;
    }
    
    if (currentRectangle != null) {
      boolean isToRelocate = false;
      int lastXLocation = currentRectangle.getLocation().x;
      int lastYLocation = currentRectangle.getLocation().y;
      int controledXLocation = lastXLocation;
      int controledYLocation = lastYLocation;
      currentWindow.setBounds(currentRectangle);
      if (lastXLocation < 0 & lastXLocation < minEdge - currentWindow.getSize().width) {
        isToRelocate = true;
        controledXLocation = minEdge - currentWindow.getSize().width;
      }
      if (lastYLocation < 0 ) {
        isToRelocate = true;
        controledYLocation = 0;
      }
      if (lastXLocation > ScreenSize.getSize().width -minEdge) {
        isToRelocate = true;
        controledXLocation = ScreenSize.getSize().width - minEdge;
      }
      if (lastYLocation > ScreenSize.getSize().height - minEdge) {
        isToRelocate = true;
        controledYLocation = ScreenSize.getSize().height - minEdge;
      }
      if (isToRelocate) {
        currentWindow.setLocation(controledXLocation, controledYLocation);
      }
      return true;
    }
    return false;
  }

  /**
   * Closes the window after saving its properties for later recovery.
   * @param currentWindow the window to close
   */
  public void close(Window currentWindow) {
    close(currentWindow, true);
  }
  
  public void close(Window currentWindow, boolean systemExitIfMainWindow) {
    Logger.getInstance().debug(getClass(), currentWindow.getClass().getName() + " is going to be closed.");
    if (currentWindow == (Window)MainStd.getMainFrame()) {
      updateProp();
      MustFrame.closeAll(); // all other windows
      currentWindow.setVisible(false);
      currentWindow.dispose();
      if (systemExitIfMainWindow) System.exit(0);
    }
    else {
      Logger.getInstance().debug(getClass(), "making invisible subwindow " + currentWindow.getClass().getName());
      currentWindow.setVisible(false);
      Logger.getInstance().debug(getClass(), "disposing subwindow " + currentWindow.getClass().getName());
      currentWindow.dispose();
    }
  }
  
  /**
   * Resets window size and location definition, e.g. to force new packing after change of font size.
   */
  public void reset() {
    winPropContainer.winBounds.clear();
  }
  
  private class Saver extends Thread {
    private Window currentWindow;
    public Saver(Window currentWindow) {
      this.currentWindow = currentWindow;
    }
    public void run() {
      try {
        sleep(500); // wait until windows opening animation is already done so we have the final size of the window when we compare
      } catch (InterruptedException e) {
        de.must.io.Logger.getInstance().error(getClass(), e);
      }
      pendingWindow = null; // window isn't pending to be size-saved any more
      String longClassName = currentWindow.getClass().getName();
      String shortClassName = longClassName.substring(longClassName.lastIndexOf(".")+1);
      Object winPropObj = winPropContainer.winBounds.get(shortClassName);
      WinPropContainer.WinProp winProp = null;
      if (winPropObj == null) {
        winProp = WinContr.this.winPropContainer.new WinProp();
        winPropContainer.winBounds.put(shortClassName, winProp);
      } else if (winPropObj instanceof WinPropContainer.WinProp) {
        winProp = (WinPropContainer.WinProp)winPropObj;
      }
      if (currentWindow instanceof Frame) {
        Frame currentFrame = (Frame)currentWindow;
        de.must.io.Logger.getInstance().debug(getClass(), "exSt = " + currentFrame.getExtendedState());
        winProp.state = currentFrame.getExtendedState();
        if (currentFrame.getExtendedState() == Frame.MAXIMIZED_BOTH) {
          return; // Window is maximized - don't set the normal size remainder!
        }
      }
      if (currentWindow.getSize().equals(ScreenSize)) return; // Window is maximized - don't set the normal size remainer!
      if (currentWindow.getSize().getWidth() >= ScreenSize.getWidth()) return; // Window may be maximized - don't set the normal size remainer!
      if (currentWindow.getSize().getHeight() >= ScreenSize.getHeight()) return; // Window may be maximized - don't set the normal size remainer!
      de.must.io.Logger.getInstance().debug(getClass(), "screen size = " + ScreenSize);
      de.must.io.Logger.getInstance().debug(getClass(), "saved " + shortClassName + " size = " + currentWindow.getSize());
      de.must.io.Logger.getInstance().debug(getClass(), "saved " + shortClassName + "  location = " + currentWindow.getLocation());
      winProp.sizeLoc = new Rectangle(currentWindow.getBounds());
    }
  }

  /**
   * Saves the properties of a window
   * @param currentWindow the window, whose properties are to be saved.
   */
  public void saveProperties(Window currentWindow) {
    // let's check whether the window is not already pending to be size-saved in saver thread
    if (currentWindow != pendingWindow) {
      pendingWindow = currentWindow;
      Saver saver = new Saver(currentWindow);
      saver.start();
    }
  }

  /**
   * Updates the property file.
   */
  public void updateProp() {
    PermObject.write(new File(storeDirectoryPlusSlash + StringFunctions.replaceAll(systemUserName, "?", "") + ".wpr"), (Object)winPropContainer);
  }

}

/**
 * A container of windows properties.
 */
class WinPropContainer implements Serializable {

  protected class WinProp implements Serializable {
    public Rectangle sizeLoc;
    public int state;
  }

  public Hashtable<String, WinProp> winBounds = new Hashtable<String, WinProp>();

}

