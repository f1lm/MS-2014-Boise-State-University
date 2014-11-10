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

import java.util.Iterator;
import java.util.Vector;

import de.must.applet.Constants;

public abstract class DrawDialog extends RemoteUserInterface {
  
  private String tabIdAndLabel;
  protected int leftMargin = 20;
  protected int yPos;
  protected Vector<ServerDrawElement> elements = new Vector<ServerDrawElement>();
  protected int header1FontSize = 48;
  protected int header2FontSize = 36;
  protected int header3FontSize = 24;

  public DrawDialog(SessionData sessionData, final String tabIdAndLabel) {
    super(sessionData, new ContextInfo() {
      public String getTabLabel() { return tabIdAndLabel; }
      public String getTabId() { return tabIdAndLabel; }
      public String getConcerning() { return Constants.DIALOG_FOR_DRAWING; }
    });
    this.tabIdAndLabel = tabIdAndLabel;
    sessionData.currentDialog = this;
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.sendConcerning(getConcerning());
    out.sendTitle(getTabLabel());
    Iterator<ServerDrawElement> iterator = elements.iterator();
    while (iterator.hasNext()) {
      ServerDrawElement drawElement = iterator.next();
      drawElement.buildRemoteView(out);
    }
    setVisible(true);
    super.buildRemoteView(out);
  }

  @Override
  public void process(GeneralizedRequest request) {
    if (Constants.ACTION_OK.equals(sessionData.action)) {
      sessionData.currentDialog = null;
    }
  }

}
