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

package de.must.applet;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Vector;

import javax.swing.JPanel;
import javax.swing.JScrollPane;

import de.must.applet.AppletGlobal.Veto;
import de.must.io.Logger;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.MustButton;
import de.must.wuic.MustStatusLabel;

public class RemUniversalCenterGUI extends CenterGUI implements ServerCaller {
  
  private Hashtable<String, RemPanel> panels = new Hashtable<String, RemPanel>(); 
  /** Reminder of components to be found by their ID for further actions like value settings */
  private Hashtable<String, Identified> idComp = new Hashtable<String, Identified>();
  private Hashtable<String, ParamExtender> otherExtender = new Hashtable<String, ParamExtender>();
  private Vector<ValueDelegator> valueDelegators = new Vector<ValueDelegator>();
  private RemAttributeList currentAttributeList;
  private RemUniversalTable currentTable;
  private RemPanel currentPanel;
  private Object currentObject;
  
  public RemUniversalCenterGUI(String title, MustStatusLabel messageReceiver) {
    super(title, messageReceiver);
    setLayout(new BorderLayout());
  }
  
  @Override
  protected boolean perform(Action action) {
    if (Constants.SET_VALUE.equals(action.toDo) && setValues(action)) { // SET_VALUE will be called often, check first!
      // done by delegation
    } else if (Constants.ADD_PANEL.equals(action.toDo)) {
      currentPanel = new RemPanel(action.id, idComp);
      currentObject = currentPanel;
      panels.put(action.id, currentPanel);
      getFather(action).add(currentPanel, action.variant2);
    } else if (Constants.ADD_ATTRIBUTELIST.equals(action.toDo)) {
      currentAttributeList = new RemAttributeList(action.id, this.idComp, this);
      currentObject = currentAttributeList;
      valueDelegators.add(currentAttributeList);
      otherExtender.put(action.id, currentAttributeList);
      getFather(action).add(currentAttributeList, action.variant2);
    } else if (Constants.ADD_TABLE.equals(action.toDo)) {
      currentTable = new RemUniversalTable((ServerCaller)this);
      otherExtender.put(action.id, currentTable);
      getFather(action).add(new JScrollPane(currentTable), action.variant2);
    } else if (Constants.CREATE_BUTTON.equals(action.toDo)) {
      MustButton button = null;
      if (action.variant1 != null) {
        button = AppletGlobal.getInstance().createButton(action.variant1, action.label, action.variant2, action.id, new ActionListener() {
          public void actionPerformed(ActionEvent e) {
            contactServer(e.getActionCommand());
          }
        });
      } else {
        RemButton remButton = createButton(action.label, action.variant2, action.id, new ActionListener() {
          public void actionPerformed(ActionEvent e) {
            contactServer(e.getActionCommand());
          }
        });
        button = remButton;
        idComp.put(action.id, remButton);
      }
      // additionalButton.add(button);
      if (currentAttributeList == currentObject) {
        currentAttributeList.append(button);
      } else {
        currentPanel.add(button);
      }
    } else if (currentAttributeList != null && currentAttributeList.perform(action)) {
      // done by delegation
    } else if (currentTable != null && currentTable.perform(action)) {
      // done by delegation
    }
    return true;
  }
  
  private boolean setValues(Action action) {
    Enumeration<ValueDelegator> enumeration = valueDelegators.elements();
    while (enumeration.hasMoreElements()) {
      if (enumeration.nextElement().setValues(action.id, action.value)) {
        return true;
      }
    }
    return false;
  }
  
  public RemButton createButton(String label, String tooltiptext, String actionCommand, ActionListener l) {
    return new RemButton(label, tooltiptext, actionCommand, l);
  }

  private JPanel getFather(Action action) {
    String fatherId = action.variant1;
    JPanel father = null;
    if (fatherId != null) {
      father = panels.get(fatherId);
    } else {
      father = this;
    }
    if (father == null) {
      father = this; // TODO check later whether this is to remove
    }
    return father;
  }
  
  protected boolean contactServer(String action) {
    Vector<KeyValuePairAlpha> params = getSynchParams();
    params.add(new KeyValuePairAlpha(Constants.ACTION, action));
    try {
      /* Veto veto = */ AppletGlobal.getInstance().contactServer(params);
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
      return false;
    }
//    if (veto == null) {
//      AppletGlobal.getInstance().currentDialog = null;
//    } else {
//      messageReceiver.setRemainStatus(veto.message);
//      if (veto.soundToPlay != null) AppletGlobal.getInstance().playSound(veto.soundToPlay);
//    }
//    return veto == null;
    return true;
  }
  
  public boolean contactServer(Vector<KeyValuePairAlpha> additionalParams) {
    Vector<KeyValuePairAlpha> params = getSynchParams();
    if (additionalParams != null) {
      Iterator<KeyValuePairAlpha> iterator = additionalParams.iterator();
      while (iterator.hasNext()) {
        params.add(iterator.next());
      }
    }
    try {
      Veto veto = AppletGlobal.getInstance().contactServer(params);
      return veto == null;
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    }
    return false;
  }
  
  protected String getTabElementId() {
    return null;
  }
  
  protected Vector<KeyValuePairAlpha> getSynchParams() {
    Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
    params.add(new KeyValuePairAlpha(Constants.TAB_OR_WINDOW_ID, title));
    Enumeration<ParamExtender> enumeration = otherExtender.elements();
    while (enumeration.hasMoreElements()) {
      enumeration.nextElement().extendParams(params);
    }
    return params;
  }
  
}
