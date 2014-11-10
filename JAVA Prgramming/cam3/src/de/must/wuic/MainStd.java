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

import javax.swing.*;

import de.must.middle.ApplConstStd;


import java.awt.Frame;
import java.util.*;

/**
 * @author Christoph Mueller
 */
public class MainStd {

  public static final boolean debugMode = false;
  protected static String[] odbcNames;
  protected static int securityLevel = ApplConstStd.SECURITY_NORMAL;
  private static Frame mainFrame;

  public MainStd() {
    try {UIManager.setLookAndFeel(
      UIManager.getSystemLookAndFeelClassName());
    }
    catch (Exception e) { }
  }

  /**
   *
   * @return 
   */
  public static String[] getOdbcNames() {
    return odbcNames;
  }

  /**
   *
   * @return 
   */
  public static int getSecurityLevel() {
    return securityLevel;
  }

  /**
   *
   */
  public static void setSecurityLevel(int newSecurityLevel) {
    securityLevel = newSecurityLevel;
  }

  /**
   * Returns the main frame.
   * @return the main frame
   */
  public static java.awt.Frame getMainFrame() {
    return mainFrame;
  }

  /**
   * Sets the main frame. It is excluded from the MustFrame.closeAll() request.
   * @see MustFrame#closeAll()
   */
  public static void setMainFrame(java.awt.Frame newMainFrame) {
    mainFrame = newMainFrame;
  }

  /**
   * Sets the font for the user interface.
   * @param font the font for the user interface to use
   */
  protected void setUIFont(javax.swing.plaf.FontUIResource font) {
    Enumeration<?> keys = UIManager.getDefaults().keys();
    while (keys.hasMoreElements()) {
      Object key = keys.nextElement();
      Object value = UIManager.get(key);
      if (value instanceof javax.swing.plaf.FontUIResource) {
        UIManager.put(key, font);
      }
    }
  }
  
}
