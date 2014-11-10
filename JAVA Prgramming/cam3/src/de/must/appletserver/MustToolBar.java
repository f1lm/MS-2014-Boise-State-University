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

package de.must.appletserver;

import java.awt.event.ActionListener;
import java.util.Iterator;
import java.util.Vector;

import de.must.applet.Constants;

/**
 * Tool bar to be marked up.
 * @author Christoph Mueller
 */
public abstract class MustToolBar implements Remotable {

  protected SessionData sessionData;
  protected Vector<MustButton> buttons = new Vector<MustButton>();

  /**
   * Constructs a new tool bar.
   * @param sessionData the session's public data
   */
  public MustToolBar(SessionData sessionData) {
    this.sessionData = sessionData;
  }
  
  public void addButton(String label, ActionListener l) {
    MustButton button = new MustButton(label);
    button.addActionListener(l);
    buttons.add(button);
  }

  /**
   * Returns true if the current user is entitled to use the specified item.
   * @param menuItem the menu item to check
   * @return true if the current user is entitled to use the specified item
   */
  public boolean isEntitled(MustMenuItem menuItem) {
    // TODO
    return true;
  }

  @Override
  public void setToolTipText(String newToolTipText) {
  }
  
  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    String actionParameterValue = request.getParameter(Constants.TOOLBAR_BUTTON_ACTION);
    if (actionParameterValue != null && actionParameterValue.length() > 0) {
      Iterator<MustButton> iterator = buttons.iterator();
      while (iterator.hasNext()) {
        MustButton button = iterator.next();
        if (actionParameterValue.equals(button.getActionID())) {
          button.performAction();
          return;
        }
      }
    }
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.sendConcerning(Constants.TOOLBAR);
    Iterator<MustButton> iterator = buttons.iterator();
    while (iterator.hasNext()) {
      MustButton button = iterator.next();
      button.buildRemoteView(out);
    }
  }
  @Override
  public void destroy() {
  }
}
