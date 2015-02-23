/*
 * Copyright (c) 2012 Christoph Mueller. All rights reserved.
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

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Iterator;
import java.util.Vector;

import de.must.applet.Constants;
import de.must.util.Callback;
import de.must.wuic.ContentChangeListener;

public abstract class UniversalCenterGUI extends MajorRemoteUserInterface {
  
  private Panel rootPanel;
  private Vector<ActionInterpreter> actionInterpreters = new Vector<ActionInterpreter>();
  
  public UniversalCenterGUI(SessionData sessionData, final String tabIdAndLabel) {
    super(sessionData, new ContextInfo() {
      public String getTabLabel() { return tabIdAndLabel; }
      public String getTabId() { return tabIdAndLabel; }
      public String getConcerning() { return Constants.UNIVERSAL_CENTER_GUI; }
    });
    rootPanel = new Panel(sessionData);
  }

  public abstract void open();
  
  public Panel getContentPane() {
    return rootPanel;
  }
  
  protected MustButton createButtonAndAdd(String label, AttributeList attributeList, Callback callback) {
    MustButton result = new MustButton(label);
    attributeList.append(result);
    addActionListener(result, callback);
    return result;
  }
  
  protected void addItemListener(MustComboBox comboBox, final Callback callback) {
    actionInterpreters.add(comboBox);
    comboBox.addItemListener(new RemoteItemListener() {
      public void itemStateChanged() {
        callback.callback();
      }
    });
  }
  
  protected void addActionListener(MustButton button, final Callback callback) {
    actionInterpreters.add(button);
    button.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        callback.callback();
      }
    });
  }
  
  protected void addContentChangeListener(MustTextField textField, final Callback callback) {
    actionInterpreters.add(textField);
    textField.addContentChangeListener(new ContentChangeListener() {
      public void contentChanged() {
        callback.callback();
      }
    });
  }
  
  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    rootPanel.fetchValuesFromRequest(request);
  }

  @Override
  public boolean isClosingAllowed() {
    return true;
  }

  @Override
  public void process(GeneralizedRequest request) {
    Iterator<ActionInterpreter> iterator = actionInterpreters.iterator();
    while (iterator.hasNext()) {
      ActionInterpreter actionInterpreter = iterator.next();
      actionInterpreter.perform(sessionData.action);
    }
 }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.sendConcerning(getConcerning());
    out.println(Constants.TITLE_BEGIN + getTabLabel() + Constants.TITLE_END);
    rootPanel.buildRemoteView(out);
    rootPanel.sendValuesTo(out);
    super.buildRemoteView(out);
  }

}
