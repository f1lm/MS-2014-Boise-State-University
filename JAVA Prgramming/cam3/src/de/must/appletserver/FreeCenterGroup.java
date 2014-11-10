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

public abstract class FreeCenterGroup extends MajorRemoteUserInterface {
  
  class Element {
    RemoteUserInterface rui;
    int xPos;
    int yPos;
    public Element(RemoteUserInterface remoteUserInterface) {
      this.rui = remoteUserInterface;
    }
  }
  
  private boolean repeatedOpening = false;
  public Vector<Element> elements;
  
  public FreeCenterGroup(SessionData sessionData, final String tabIdAndLabel) {
    super(sessionData, new ContextInfo() {
      public String getTabLabel() { return tabIdAndLabel; }
      public String getTabId() { return tabIdAndLabel; }
      public String getConcerning() { return Constants.FREE_CENTER_GUI; }
    });
    elements = new Vector<Element>();
    RemoteUserInterface[] components = getComponents();
    for (int i = 0; i < components.length; i++) {
      elements.add(new Element(components[i]));
    }
  }

  protected abstract RemoteUserInterface[] getComponents();
  
  public void open() {
    if (repeatedOpening) {
      selectTab();
    }
    repeatedOpening = true;
  }
  
  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    Iterator<Element> iterator = elements.iterator();
    while (iterator.hasNext()) {
      Element element = iterator.next();
      element.rui.fetchValuesFromRequest(request);
    }
  }

  @Override
  public boolean isClosingAllowed() {
    return true;
  }

  @Override
  public void process(GeneralizedRequest request) {
    Iterator<Element> iterator = elements.iterator();
    while (iterator.hasNext()) {
      Element element = iterator.next();
      element.rui.process(request);
    }
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.sendConcerning(getConcerning());
    out.println(Constants.TITLE_BEGIN + getTabLabel() + Constants.TITLE_END);
    Iterator<Element> iterator = elements.iterator();
    while (iterator.hasNext()) {
      Element element = iterator.next();
      element.rui.buildRemoteView(out);
    }
  }

}
