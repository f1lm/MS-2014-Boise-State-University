/*
 * Copyright (c) 2000-2012 Christoph Mueller. All rights reserved.
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
 * A dialog with help context.
 * Does not interpret shortcuts, but listens to help request F1
 * @author Christoph Mueller
 */
public abstract class MustDialog extends JDialog implements ContextHelp, WindowListener {

  public static Cursor defaultCursor = new Cursor(Cursor.DEFAULT_CURSOR);
  public static Cursor waitCursor = new Cursor(Cursor.WAIT_CURSOR);
  public static boolean storedLayout = true;

  protected Frame ownerFrame;
  protected Dialog ownerDialog;
  private int minimalWidth = 300; // to get averaged titles completely visible
  private boolean laidOut;
  private String helpTopic;
  private String helpTarget;
  private JRootPane rootPane;

  public MustDialog() {
    this((Frame)null);
  }

  /**
   * Constructs a new dialog with the specified owner frame.
   * @param ownerFrame the frame which owns the dialog
   */
  public MustDialog(Frame ownerFrame) {
    super(ownerFrame, true);
    this.ownerFrame = ownerFrame;
    if (ownerFrame != null) {
      ownerFrame.setCursor(waitCursor); // unfortunately reset by a later step :-(
      ownerFrame.invalidate();
    }
    addWindowListener(this);
    setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
    laidOut = false;
    if (storedLayout) {
      laidOut = WinContr.getInstance().layout(this);
    }
    if (!laidOut) {
      setSize(new Dimension(400, 300));
      locateInCenter();
    }
  }

  /**
   * Constructs a new dialog with the specified owner frame.
   * @param ownerFrame the frame which owns the dialog
   */
  public MustDialog(JDialog ownerDialog) {
    super(ownerDialog, true);
    this.ownerDialog = ownerDialog;
    if (ownerDialog != null) {
      ownerDialog.setCursor(waitCursor); // unfortunately reset by a later step :-(
      ownerDialog.invalidate();
    }
    addWindowListener(this);
    setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
    laidOut = false;
    if (storedLayout) {
      WinContr.getInstance().layout(this);
    }
    if (!laidOut) {
      setSize(new Dimension(400, 300));
      setLocation(200, 100);
    }
  }
  
  @Override
  public JRootPane getRootPane() {
    // enable close on escape
    if (rootPane == null) {
      rootPane = super.getRootPane();
      ActionListener escapeListener = new ActionListener() {
        public void actionPerformed(ActionEvent actionEvent) {
          closeInstance();
        }
      };
      KeyStroke stroke = KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE, 0);
      rootPane.registerKeyboardAction(escapeListener, stroke, JComponent.WHEN_IN_FOCUSED_WINDOW);
    }
    return rootPane;
  }

  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey) {
    return WuicGlobal.getInstance(getLocale()).getResourceString(resourceKey);
  }

  /**
   * constructs a frame using specified dimension(width & height).
   * @param layoutDim layout dimension(width & height)
   */
  protected void setDefaultSize(Dimension LayoutDim) {
    if (!laidOut) setSize((int)LayoutDim.getWidth(), (int)LayoutDim.getHeight());
  }

  /**
   * Sets the location of the frame
   * @param x the frame's start location(x)
   * @param y the frame's end location(y)
   */
  protected void setDefaultLocation(int x, int y) {
    if (!laidOut) setLocation(x, y);
  }

  /**
   * Returns true if the frame has already been laid-out. This happens, when
   * a user first uses the frame. For personalization, position and size of the
   * frame is stored in a user specific local file.
   * @return true if the frame has already been laid-out
   * @see WinContr
   */
  public boolean isLaidOut() {
    return laidOut;
  }

  /**
   * Packs the frame if it isn't already laid-out by user.
   */
  protected void packIfNotLaidOut() {
    if (!laidOut) {
      pack();
      if (getWidth() < minimalWidth) {
        setSize(minimalWidth, getHeight());
      }
    }
  }

  /**
   * Centers the dialog on screen.
   */
  protected void locateInCenter() {
    setLocation(AwtConst.getCenterLocation(getSize()));
  }

  /**
   * Packs the dialog and centers it.
   */
  protected void packAndLocateInCenter() {
    pack();
    if (getWidth() < minimalWidth) {
      setSize(minimalWidth, getHeight());
    }
    locateInCenter();
  }

  /**
   * Packs the dialog and centers it, if it was't already laid-out.
   */
  protected void packAndLocateInCenterIfNotLaidOut() {
    if (!laidOut) packAndLocateInCenter();
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   * @param helpTarget the context help's target
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
    this.helpTopic = helpTopic;
    this.helpTarget = helpTarget;
  }

  /**
   * Returns the topic of the component's help context
   * @return the topic of the component's help context
   */
  public String getHelpTopic() {
    return helpTopic;
  }

  /**
   * Returns the target of the component's help context
   * @return the target of the component's help context
   */
  public String getHelpTarget() {
    return helpTarget;
  }

  public void windowClosing(WindowEvent e) {
    closeInstance();
  }
  public void windowClosed(WindowEvent e) {}
  public void windowOpened(WindowEvent e) {}
  public void windowActivated(WindowEvent e) {}
  public void windowDeactivated(WindowEvent e) {}
  public void windowIconified(WindowEvent e) {}
  public void windowDeiconified(WindowEvent e) {}
  
  /**
   * Closes the instance after reminding size and position of the frame as it
   * was laid-out by the user.
   */
  public void closeInstance() {
    if (ownerFrame != null) ownerFrame.setCursor(defaultCursor);
    if (storedLayout) {
      WinContr.getInstance().close(this);
    } else {
      setVisible(false);
      dispose();
    }
  }

}
