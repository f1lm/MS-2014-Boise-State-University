/*
 * Copyright (c) 1999-2009 Christoph Mueller. All rights reserved.
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
 * Frames for basic help (before html help).
 * Needed e.g. if Browser can't be found.
 * @author <a href="mailto:cmueller@must.de">Christoph Mueller
 */
public class TextAreaInfoFrame extends JFrame implements ActionListener, WindowListener  {

  protected InfoTextArea centerTextArea;
  protected JPanel panelBottom = new JPanel();
  protected MustButton buttonClose = new MustButton(getTranslation("TEXT_CLOSE_BUTTON"), "BtnClose", this);

  /**
   *
   * @param textAreaInfoFrameToClose
   */
  public static void close(TextAreaInfoFrame textAreaInfoFrameToClose) {
    if (textAreaInfoFrameToClose != null) {
      textAreaInfoFrameToClose.setVisible(false);
      textAreaInfoFrameToClose.dispose();
      textAreaInfoFrameToClose = null;
    }
  }

  /**
   * Constructs a new text area info frame.
   * @param parentFrame the parent frame
   */
  public TextAreaInfoFrame(Frame parentFrame) {
    this(parentFrame, "");
  }

  /**
   * Constructs a new text area info frame.
   * @param parentFrame the parent frame
   * @param info the information to be presented
   */
  public TextAreaInfoFrame(Frame parentFrame, String info) {
    centerTextArea = new InfoTextArea(info);
    Frame AssociatedFrame;
    if (parentFrame == null) AssociatedFrame = MainStd.getMainFrame();
    else AssociatedFrame = parentFrame;
    if (AssociatedFrame != null) {
      AssociatedFrame.setCursor(new Cursor(Cursor.WAIT_CURSOR));
    }
    try {
      initTextAreaInfoFrame();
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    if (AssociatedFrame != null) {
      AssociatedFrame.setCursor(new Cursor(Cursor.DEFAULT_CURSOR));
    }
  }

  //Initialisierung der Komponente
  /**
   *
   */
  public void initTextAreaInfoFrame() throws Exception{
    this.addWindowListener(this);
    this.getContentPane().setLayout(new BorderLayout());
    JScrollPane tempScrollpane = new JScrollPane();
    tempScrollpane.getViewport().add(centerTextArea);
    this.getContentPane().add(tempScrollpane, BorderLayout.CENTER);
    this.getContentPane().add(panelBottom, BorderLayout.SOUTH);
    panelBottom.add(buttonClose);
    // centerTextArea.setEnabled(false);
  }
  
  public void setContent(String content) {
    centerTextArea.setText(content);
  }

  /**
   *
   * @param topic
   */
   protected void setHelp(String topic) {
    panelBottom.add(new HelpButton(getLocale(), topic));
  }

  /**
   *
   * @param topic
   * @param subTopic
   */
  protected void setHelp(String topic, String subTopic) {
    panelBottom.add(new HelpButton(getLocale(), topic, subTopic));
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
   *
   * @param e
   */
  public void actionPerformed(ActionEvent e) {
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnClose")) {
      WinContr.getInstance().close(this);
    }
  }

  /**
   *
   * @param e
   */
  public void windowClosing(WindowEvent e) {
    WinContr.getInstance().close(this);
  }

  /**
   *
   * @param e
   */
  public void windowClosed(WindowEvent e) {}

  /**
   *
   * @param e
   */
  public void windowOpened(WindowEvent e) {}

  /**
   *
   * @param e
   */
  public void windowActivated(WindowEvent e) {}

  /**
   *
   * @param e
   */
  public void windowDeactivated(WindowEvent e) {}

  /**
   *
   * @param e
   */
  public void windowIconified(WindowEvent e) {}

  /**
   *
   * @param e
   */
  public void windowDeiconified(WindowEvent e) {}

}
