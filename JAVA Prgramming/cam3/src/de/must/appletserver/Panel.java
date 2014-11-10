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
import de.must.io.Logger;

public class Panel implements InlayCenterContent, Remotable {
  
  class Element {
    public Panel father;
    public Object object;
    public String position;
    protected boolean addIntstructionsSend = false;
    public Element(Panel father, Object object) {
      this.father = father;
      this.object = object;
    }
    public Element(Panel father, Object object, String position) {
      this.father = father;
      this.object = object;
      this.position = position;
    }
  }
  
  private static int counter = 0;
  
  private static synchronized String getUniqueName() {
    if (counter < Integer.MAX_VALUE) counter ++;
    else counter = 1;
    return "Panel" + String.valueOf(counter);
  }

  protected SessionData sessionData;
  protected String id = getUniqueName();
  private Vector<Element> elements = new Vector<Element>();

  public Panel(SessionData sessionData) {
    this.sessionData = sessionData;
  }
  
  @Override
  public void setToolTipText(String toolTipText) {
    // not needed here
  }

  public void add(Panel panel) {
    add(new Element(this, panel));
  }

  public void add(Panel panel, String position) {
    add(new Element(this, panel, position));
  }

  public void add(AttributeList attributeList) {
    add(new Element(this, attributeList));
  }

  public void add(AttributeList attributeList, String position) {
    add(new Element(this, attributeList, position));
  }

  public void add(Remotable remotable) {
    add(new Element(this, remotable));
  }

  public void add(Remotable remotable, String position) {
    add(new Element(this, remotable, position));
  }

  protected void add(Element element) {
    elements.add(element);
  }
  
  @Override
  public void buildRemoteView(ToAppletWriter out) {
    Iterator<Element> iterator = elements.iterator();
    while (iterator.hasNext()) {
      Element element = iterator.next();
      buildRemoteView(element, out);
    }
  }
  
  protected void buildRemoteView(Element element, ToAppletWriter out) {
    if (element.object instanceof Panel) {
      Panel panel = (Panel)element.object;
      if (!element.addIntstructionsSend) {
        out.println(Constants.ACTION_BEGIN_TAG);
        out.println(Constants.TODO_TAG_BEGIN + Constants.ADD_PANEL + Constants.TODO_TAG_END);
        out.println(Constants.ID_TAG_BEGIN + panel.id + Constants.ID_TAG_END);
        addFatherAndPosition(element, out);
        out.println(Constants.ACTION_END_TAG);
        panel.buildRemoteView(out);
      }
      element.addIntstructionsSend = true;
    } else if (element.object instanceof AttributeList) {
      AttributeList attributeList = (AttributeList)element.object;
      if (!element.addIntstructionsSend) {
        out.println(Constants.ACTION_BEGIN_TAG);
        out.println(Constants.TODO_TAG_BEGIN + Constants.ADD_ATTRIBUTELIST + Constants.TODO_TAG_END);
        out.println(Constants.ID_TAG_BEGIN + attributeList.getID() + Constants.ID_TAG_END);
        addFatherAndPosition(element, out);
        out.println(Constants.ACTION_END_TAG);
        attributeList.buildRemoteView(out);
      }
      attributeList.sendValuesTo(out);
      element.addIntstructionsSend = true;
    } else if (element.object instanceof UniversalTable) {
      UniversalTable table = (UniversalTable)element.object;
      if (!element.addIntstructionsSend) {
        out.println(Constants.ACTION_BEGIN_TAG);
        out.println(Constants.TODO_TAG_BEGIN + Constants.ADD_TABLE + Constants.TODO_TAG_END);
        out.println(Constants.ID_TAG_BEGIN + "TODO TABLE ID" + Constants.ID_TAG_END);
        addFatherAndPosition(element, out);
        out.println(Constants.ACTION_END_TAG);
        element.addIntstructionsSend = true;
      }
      element.addIntstructionsSend = true;
      table.buildRemoteView(out);
    } else if (element.object instanceof Remotable) {
      ((Remotable)element.object).buildRemoteView(out);
    } else {
      Logger.getInstance().warn("bad nested class in Panel: " + element.object.getClass()); 
    }
  }
  
  public void sendValuesTo(ToAppletWriter out) {
    Iterator<Element> iterator = elements.iterator();
    while (iterator.hasNext()) {
      Element element = iterator.next();
      sendValuesTo(element, out);
    }
  }
  
  protected void sendValuesTo(Element element, ToAppletWriter out) {
    if (element.object instanceof Panel) {
      ((Panel)element.object).sendValuesTo(out);
    } else if (element.object instanceof AttributeList) {
      ((AttributeList)element.object).sendValuesTo(out);
    } else if (element.object instanceof UniversalTable) {
//      UniversalTable table = (UniversalTable)element.object;
//      table.sendValuesTo(out);
    } else if (element.object instanceof RemoteContent) {
      ((RemoteContent)element.object).setValues(out);
    } else if (element.object instanceof MustButton) {
      // ignore - no values to set
    } else {
      Logger.getInstance().warn("bad nested class in Panel: " + element.object.getClass()); 
    }
  }
  
  private void addFatherAndPosition(Element element, ToAppletWriter out) {
    if (element.father != null) {
      out.println(Constants.VARIANT1_TAG_BEGIN + element.father.id + Constants.VARIANT1_TAG_END);
    }
    if (element.position != null) {
      out.println(Constants.VARIANT2_TAG_BEGIN + element.position + Constants.VARIANT2_TAG_END);
    }
  }

  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    Iterator<Element> iterator = elements.iterator();
    while (iterator.hasNext()) {
      Element element = iterator.next();
      if (element.object instanceof Panel) {
        ((Panel)element.object).fetchValuesFromRequest(request);
      } else if (element.object instanceof AttributeList) {
        ((AttributeList)element.object).fetchValuesFromRequest(request);
      } else if (element.object instanceof Remotable) {
        ((Remotable)element.object).fetchValuesFromRequest(request);
      } else {
        Logger.getInstance().warn("bad nested class in Panel: " + element.object.getClass()); 
      }
    }
  }

  @Override
  public void destroy() {
  }  

}