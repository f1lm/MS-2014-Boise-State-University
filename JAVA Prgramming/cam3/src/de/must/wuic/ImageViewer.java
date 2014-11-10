/*
 * Copyright (c) 1999-2005 Christoph Mueller. All rights reserved.
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

/**
 * Image viewer.
 * @author Christoph Mueller
 */
public class ImageViewer extends JLabel implements ContextHelp {

  private static ImageIcon noImage;
  private ImageIcon imageIcon1 = new ImageIcon();
  private String helpTopic;
  private String helpTarget;

  /**
   * Constructs a new image viewer.
   */
  public ImageViewer() {
    this.setIcon(imageIcon1);
    initialize();
  }

  /**
   * Initializes the image viewer.
   */
  public void initialize() {
    if (noImage == null) noImage = new ImageIcon("bin/images/NoImage.jpg");
    if (noImage == null) noImage = new ImageIcon("noImage.jpg");
    java.awt.Image image = noImage.getImage();
    image.flush();
    imageIcon1.setImage(image);
    revalidate();
    repaint();
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   */
  public void setHelpContext(String helpTopic) {
    setHelpContext(helpTopic, null);
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
   * Returns the topic of the component's help context.
   * @return the topic of the component's help context
   */
  public String getHelpTopic() {
    return helpTopic;
  }

  /**
   * Returns the target of the component's help context.
   * @return the target of the component's help context
   */
  public String getHelpTarget() {
    return helpTarget;
  }

  /**
   * Loads the image from the specified path.
   * @param path the path of the image to load
   */
  public void loadImageByCompletePath(String path) {
    // de.must.io.Logger.getInstance().info(getClass(), "path: " + path);
    ImageIcon nextImageIcon = new ImageIcon(path);
    java.awt.Image image = nextImageIcon.getImage();
    image.flush();
    // try {nextImageIcon.wait();} catch (Exception e) {}
    imageIcon1.setImage(image);
    revalidate();
    repaint();
  }

}
