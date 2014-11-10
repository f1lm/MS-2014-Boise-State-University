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

package de.must.applet;

import java.awt.BorderLayout;
import java.awt.Cursor;
import java.awt.Frame;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.io.IOException;
import java.util.Vector;

import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JDialog;
import javax.swing.JRootPane;
import javax.swing.KeyStroke;
import javax.swing.WindowConstants;

import de.must.applet.AppletGlobal.Veto;
import de.must.io.Logger;
import de.must.middle.ApplConstStd;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.AwtConst;

/**
 * Super class of dialogs associated to the applet. 
 * @author Christoph Mueller
 */
public abstract class BasicAppletDialog extends JDialog implements AppletDialog, /*ContextHelp,*/ WindowListener, ServerCaller {

  public static Cursor defaultCursor = new Cursor(Cursor.DEFAULT_CURSOR);
  public static Cursor waitCursor = new Cursor(Cursor.WAIT_CURSOR);

  private String helpTopic;
  private String helpTarget;
  private JRootPane rootPane;
  protected Veto veto;

  public BasicAppletDialog() {
    super((Frame)null, true);
    ImageIcon imageIcon = AppletGlobal.getInstance().getImageIcon("icon16.png"); //$NON-NLS-1$
    if (imageIcon != null) {
      setIconImage(imageIcon.getImage());
    }
    setLayout(new BorderLayout());
    addWindowListener(this);
    setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
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
    return AppletGlobal.getInstance().getResourceString(resourceKey);
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
  
  public void perform(Action action) {
    if (Constants.SET_VISIBLE.equals(action.toDo)) {
      if (ApplConstStd.TRUE_STRING.equals(action.value)) {
        pack();
        int minWidth = 300;
        if (getSize().width < minWidth) {
          setSize(minWidth, getSize().height);
        }
        setLocation(AwtConst.getCenterLocation(getSize()));
      }
      setVisible(ApplConstStd.TRUE_STRING.equals(action.value));
    } else if (Constants.SET_HEADER.equals(action.toDo)) {
      setTitle(action.value);
    }
  }

  @Override
  public void windowClosing(WindowEvent e) {
    closeInstance();
  }
  public void windowClosed(WindowEvent e) {}
  public void windowOpened(WindowEvent e) {}
  public void windowActivated(WindowEvent e) {}
  public void windowDeactivated(WindowEvent e) {}
  public void windowIconified(WindowEvent e) {}
  public void windowDeiconified(WindowEvent e) {}
  
  public void closeInstance() {
    setVisible(false);
  }

  protected void contactServer(String action) {
    Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
    params.add(new KeyValuePairAlpha(Constants.ACTION, action));
    contactServer(params);
  }
  
  @Override
  public boolean contactServer(Vector<KeyValuePairAlpha> params) {
    try {
      veto = AppletGlobal.getInstance().contactServer(params);
      return veto == null;
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    }
    return false;
  }

}
