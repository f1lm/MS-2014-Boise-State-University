/*
 * Copyright (c) 1999-2012 Christoph Mueller. All rights reserved.
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

import de.must.middle.ImageResource;

import java.awt.*;
import java.awt.event.*;

/**
 * @author Christoph Mueller
 */
public class KeyButton extends MustButton implements ActionListener {
  
  private static String openImageName  = null;

  static {
    JLabel refLabel = new JLabel();
    openImageName = "Open16.gif";
    if (refLabel.getFont().getSize() >= 14) {
      openImageName = "Open24.gif";
    }
  }
  
  public static synchronized KeyButton create(Class<? extends DataTableAdministration> keyClass) {
    return create(GlobalInWuicStd.getImageResource(), keyClass);
  }
  
  public static synchronized KeyButton create(ImageResource imageResource, Class<? extends DataTableAdministration> keyClass) {
    ImageIcon icon = imageResource.getImageIcon(openImageName);
    if (icon != null && icon.getImageLoadStatus() != MediaTracker.ERRORED) {
      return new KeyButton(icon, keyClass);
    } else {
      return new KeyButton(keyClass);
    }
  }
  
  private Class<? extends DataTableAdministration> keyClass;

  public KeyButton(ImageIcon icon, Class<? extends DataTableAdministration> keyClass) {
    super(icon);
    complete(keyClass);
  }
  
  private KeyButton(Class<? extends DataTableAdministration> keyClass) {
    super("...");
    setPreferredSize(new Dimension(30, 20));
    complete(keyClass);
  }
  
  private void complete(Class<? extends DataTableAdministration> keyClass) {
    this.keyClass = keyClass;
    addActionListener(this);
    setToolTipText(WuicGlobal.getInstance(getLocale()).getResourceString("TEXT_KEY_EXTENSION"));
    setDefaultCapable(false);
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    if (keyClass != null) {
      MustFrame.getOrCreateMainInstance(keyClass).setVisible(true);
    }
  }

}
