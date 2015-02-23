/*
 * Copyright (c) 2011 Christoph Mueller. All rights reserved.
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

import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.util.Locale;
import java.util.Vector;

import javax.swing.JPanel;

import de.must.io.Logger;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.MustButton;

/**
 * Inquiry history with user interface to navigate through former inquiries.
 * @author Christoph Mueller
 */
public class InquiryHistory {
  
  private SearchListDetailGroup group;
  private int size;
  private int index;
  private JPanel ui = new JPanel();
  private MustButton buttonBack ;
  private MustButton buttonForward;
  private boolean ignoreSnapshot;
  
  /**
   * Constructs a new InquiryHistory. 
   * @param locale the locale
   * @param group the group of the UI fragment
   */
  public InquiryHistory(Locale locale, SearchListDetailGroup group) {
    this.group = group;
    ui.setLayout(new FlowLayout(FlowLayout.LEFT, 0, 0));
    buttonBack = AppletGlobal.getInstance().createButton("Back24.gif", "<");
    buttonBack.setToolTipText(getTranslation("TEXT_PREVIOUS_INQUIRY"));
    ui.add(buttonBack);
    buttonBack.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        perform(Constants.ACTION_LIST_PREVIOUS);
      }
    });
    buttonForward = AppletGlobal.getInstance().createButton("Forward24.gif", ">");
    buttonForward.setToolTipText(getTranslation("TEXT_NEXT_INQUIRY"));
    ui.add(buttonForward);
    buttonForward.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        perform(Constants.ACTION_LIST_NEXT);
      }
    });
    controlEnabling();
  }
  
  private boolean perform(String command) {
    Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
    params.add(new KeyValuePairAlpha(Constants.TAB_OR_WINDOW_ID, group.tabIdAndLabel));
    params.add(new KeyValuePairAlpha(Constants.TAB_ELEMENT, Constants.SEARCH));
    params.add(new KeyValuePairAlpha(Constants.ACTION, command));
    try {
      AppletGlobal.getInstance().contactServer(params);
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
      return false;
    }
    return true;
  }

  protected String getTranslation(String key) {
    return AppletGlobal.getInstance().getResourceString(key);
  }

  /**
   * Returns the user interface for navigation.
   * @return the user interface for navigation
   */
  public JPanel getUI() {
    return ui;
  }
  
  public void perform(Action action) {
    if (Constants.SET_INQUIRY_HISTORY.equals(action.toDo)) {
      try {
        size = action.getVariant1AsInt();
        index = action.getVariant2AsInt();
        controlEnabling();
      } catch (NumberFormatException e) {
        Logger.getInstance().error(getClass(), e);
      }
    }
  }

  public void setVisible(boolean aFlag) {
    ui.setVisible(aFlag);
  }
  
  public void clear() {
    size = 0;
    index = 0;
    controlEnabling();
  }
  
  private void controlEnabling() {
    buttonBack.setEnabled(index > 0);
    buttonForward.setEnabled(index < size-1);
  }
  
}
