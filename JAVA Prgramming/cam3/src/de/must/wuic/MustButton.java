/*
 * Copyright (c) 1999-2014 Christoph Mueller. All rights reserved.
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
import de.must.util.Miscellaneous;


import java.awt.*;
import java.awt.event.*;

/**
 * @author Christoph Mueller
 */
public class MustButton extends JButton implements AnySelectionListener {

  private Dimension preferredSize;
  private int preferredWidth = -1;
  private boolean providesMultipleSelections = false;

  public static synchronized MustButton create(String imageName, String defaultLabel) {
    return create(imageName, defaultLabel, GlobalInWuicStd.getImageResource());
  }
  
  public static synchronized MustButton create(String imageName, String defaultLabel, ImageResource imageResource) {
    ImageIcon image = imageResource.getImageIcon(imageName);
    MustButton button;
    if (image != null && image.getImageLoadStatus() != MediaTracker.ERRORED) {
      button = new MustButton(image);
    } else {
      de.must.io.Logger.getInstance().info(MustButton.class, "Warning: Couldn't load image " + imageName);
      button = new MustButton(defaultLabel);
    }
    return button;
  }
  
  public static synchronized MustButton create(String imageName, String defaultLabel, String toolTipText, String actionName, ActionListener actionListener) {
    ImageIcon image = GlobalInWuicStd.getImageResource().getImageIcon(imageName);
    MustButton button;
    if (image != null && image.getImageLoadStatus() != MediaTracker.ERRORED) {
      button = new MustButton(image, toolTipText, actionName, actionListener);
    } else {
      de.must.io.Logger.getInstance().info(MustButton.class, "Warning: Couldn't load image " + imageName);
      button = new MustButton(defaultLabel, toolTipText, actionName, actionListener);
    }
    return button;
  }
  
  public static MustButton addNewInstanceToPanel(String buttonLabel, JPanel containPanel) {
    MustButton temp = new MustButton(buttonLabel);
    containPanel.add(temp);
    return temp;
  }

  public MustButton() {
  }

  public MustButton(String label) {
    super(Miscellaneous.getReplacement(label));
  }

  public MustButton(ImageIcon Icon) {
    super(Icon);
    this.preferredSize = new Dimension(Icon.getIconWidth() + 2, Icon.getIconHeight() + 2);
  }

  public MustButton(ImageIcon Icon, String toolTipText, String actionCommand, ActionListener actActionListener) {
    super(Icon);
    this.setToolTipText(toolTipText);
    this.preferredSize = new Dimension(Icon.getIconWidth() + 2, Icon.getIconHeight() + 2);
    try {
      setActionCommand(actionCommand);
      if (actionCommand != null && actActionListener != null) addActionListener(actActionListener);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    };
  }

  public MustButton(String label, String actionCommand, ActionListener actActionListener) {
    super(label);
    try {
      setActionCommand(actionCommand);
      if (actionCommand != null && actActionListener != null) this.addActionListener(actActionListener);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    };
  }

  public MustButton(String label, String toolTipText, String actionCommand, ActionListener actActionListener) {
    this(label, actionCommand, actActionListener);
    this.setToolTipText(toolTipText);
  }

  /**
   * Removes button's icon and sets the text. The size is reset, too.
   * Helpful if standard UI is to be modified.
   * @param text the new text
   */
  public void removeIconAndSetText(String text) {
    setIcon(null);
    preferredSize = null;
    setText(text);
  }
  
  /**
   * Sets the AnySelectionSpeaker, which will indicate the button, how much items are selected as soon as selection state changes.
   * The button will provide single selection only
   * @param theSelectionSpeaker the AnySelectionSpeaker
   */
  public void setSelectDependence(AnySelectionSpeaker theSelectionSpeaker) {
    setSelectDependence(theSelectionSpeaker, false);
  }

  /**
   * Sets the AnySelectionSpeaker, which will indicate the button, how much items are selected as soon as selection state changes.
   * @param theSelectionSpeaker the AnySelectionSpeaker
   * @param providesMultipleSelections whether or not the button has to handle multiple selections
   */
  public void setSelectDependence(AnySelectionSpeaker theSelectionSpeaker, boolean providesMultipleSelections) {
    this.providesMultipleSelections = providesMultipleSelections;
    setEnabled(false);
    theSelectionSpeaker.addAnySelectionListener(this);
  }
  
  public void revertSelectDependence(AnySelectionSpeaker theSelectionSpeaker) {
    setEnabled(true);
    theSelectionSpeaker.removeAnySelectionListener(this);
  }

 /**
  * Called whenever the selection of a selection speaker changes.
  * @param e the selection changed event
  */
  public void selectionChanged(AnySelectionChangedEvent e) {
    // special: an integer value <= 0 means entry is not usable for Button
    setEnabled((e.getSelectionCount() == 1 || (providesMultipleSelections && e.getSelectionCount() >= 1)) && e.getNewSelectionState() && (e.getSelectedIdentifier() == null || !(e.getSelectedIdentifier().getItems()[0] instanceof Integer) ||(e.getSelectedIdentifier().getItems()[0] instanceof Integer) && e.getSelectedIdentifier().getIntIdentifier() > 0));
  }

  public void setDefaultlook(boolean defaultlook) {
    if (defaultlook) setFont(new Font(getFont().getFontName(), Font.BOLD, getFont().getSize()));
    else setFont(new Font(getFont().getFontName(), Font.PLAIN, getFont().getSize()));
  }

  public void setPreferredWidth(int newPreferredWidth) {
    this.preferredWidth = newPreferredWidth;
  }

  public Dimension getPreferredSize() {
    if (preferredSize != null) {
      return preferredSize;
    } else {
      if (preferredWidth > 0) {
        return new Dimension(preferredWidth, super.getPreferredSize().height);
      }
      else {
        return super.getPreferredSize();
      }
    }
  }

}