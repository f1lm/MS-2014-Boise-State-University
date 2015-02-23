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

package de.must.appletserver;

import de.must.applet.Constants;

/**
 * A Remote User Interface which is not part of a group, but fills a complete
 * tab or window instead.
 * @author Christoph Mueller
 */
public abstract class MajorRemoteUserInterface extends RemoteUserInterface {

  private boolean tabIsToRemove = false;
  
  public MajorRemoteUserInterface(SessionData sessionData, ContextInfo contextInfo) {
    super(sessionData, contextInfo);
    sessionData.register(this);
    sessionData.tabIdsToBuild.add(contextInfo.getTabId());
  }
  
  @Override
  public String getTabId() {
    return contextInfo.getTabId();
  }

  @Override
  public String getTabLabel() {
    return contextInfo.getTabLabel();
  }
  
  public void selectTab() {
    sessionData.nextOutputs.add(Constants.ACTION_BEGIN_TAG);
    sessionData.nextOutputs.add(Constants.TODO_TAG_BEGIN + Constants.SELECT_TAB + Constants.TODO_TAG_END);
    sessionData.nextOutputs.add(Constants.VALUE_TAG_BEGIN + getTabId() + Constants.VALUE_TAG_END);
    sessionData.nextOutputs.add(Constants.ACTION_END_TAG);
  }
  
  /**
   * Returns true if it is allowed to close the tab or window.
   * @return true if it is allowed to close the tab or window
   */
  public abstract boolean isClosingAllowed();

  protected void closeInstance() {
    tabIsToRemove = true;
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    if (tabIsToRemove) {
      out.removeTab(contextInfo.getTabId());
      sessionData.uis.remove(contextInfo.getTabId());
      // nothing else to do!
    } else {
      super.buildRemoteView(out);
    }
  }

}
