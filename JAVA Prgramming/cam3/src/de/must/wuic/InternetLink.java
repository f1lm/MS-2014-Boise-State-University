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

import de.must.util.*;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

/**
 * A label with underlined text which causes the browser to visit an assigned URL
 * @author Christoph Mueller
 */
public class InternetLink extends JLabel implements MouseListener {

  private String urlString;
  private String textToDisplay;

  /**
   * Constructs a new internet link label
   * @param urlString the URL to be visited when clicked
   */
  public InternetLink(String urlString) {
    this(urlString, urlString);
  }

  /**
   * Constructs a new internet link label
   * @param urlString the URL to be visited when clicked
   * @param textToDisplay text to be displayed
   */
  public InternetLink(String urlString, String textToDisplay) {
    super(textToDisplay);
    this.urlString = urlString;
    this.textToDisplay = textToDisplay;
    setForeground(Color.blue);
    addMouseListener(this);
  }

  /**
   * Returns the URL as a string
   * @return the URL as a string
   */
  public String geturlString() {
    return urlString;
  }

  /**
   * Sets the url String and the label's text with the same String
   * @param newUrlString the new URL to visit if clicked
   */
  public void setUrlStringAndLabel(String newUrlString) {
    urlString = newUrlString;
    setText(newUrlString);
  }

  /**
   * Sets the url String and - if empty - the label's text with the same String
   * @param newUrlString the new URL to visit if clicked
   */
  public void setUrlString(String newUrlString) {
    urlString = newUrlString;
    if (getText().equals("")) {
      setText(newUrlString);
    }
  }

  /**
   * Called from super class - draws a line under the text.
   * @param g the graphics
   */
  public void paintComponent(Graphics g) {
    super.paintComponent(g);
    int yLinePos = getFont().getSize() + 2;
    Graphics2D g2 = (Graphics2D)g;
    g2.drawLine(0, yLinePos, this.getSize().width, yLinePos);
  }


  /**
   * Sets the cursor to HAND_CURSOR.
   * @param e the mouse event
   */
  public void mouseEntered(MouseEvent e) {
    setCursor(new Cursor(Cursor.HAND_CURSOR));
  }

  /**
   * Sets the cursor toDEFAULT_CURSOR.
   * @param e the mouse event
   */
  public void mouseExited(MouseEvent e) {
    setCursor(new Cursor(Cursor.DEFAULT_CURSOR));
  }
  public void mousePressed(MouseEvent e) {}
  public void mouseReleased(MouseEvent e) {}

  /**
   * Causes the URL to be visited when clicked.
   * @param e the mouse event
   */
  public void mouseClicked(MouseEvent e) {
    if (urlString.toLowerCase().startsWith("http:")
      || urlString.toLowerCase().startsWith("www.")
      || urlString.toLowerCase().startsWith("ftp:")
    ) {
      Browser.visitURL(urlString);
    } else {
      try {
        Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler " + urlString);
      }
      catch (Exception ex) {
        de.must.io.Logger.getInstance().error(getClass(), ex);
      }
      
    }
  }

}
