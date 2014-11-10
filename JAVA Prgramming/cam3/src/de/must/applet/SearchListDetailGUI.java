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

package de.must.applet;

import java.awt.BorderLayout;
import java.awt.Component;
import java.util.Vector;

import javax.swing.JPanel;
import javax.swing.JSplitPane;

import de.must.util.KeyValuePairAlpha;
import de.must.wuic.MustStatusLabel;

public class SearchListDetailGUI extends CenterGUI implements ParamExtender {
  
  private JSplitPane jSplitPane;
  private JSplitPane jSplitPane2;
  private SearchListDetailGroup group;
  private String lastDetailConcerning = null;

  public SearchListDetailGUI(String title, MustStatusLabel messageReceiver) {
    super(title, messageReceiver);
    group = new SearchListDetailGroup(title);
    group.search = new SearchInlay(group);
    group.search.setMessageReceiver(messageReceiver);
    group.list = new ListInlay(title);
    group.list.setMessageReceiver(messageReceiver);
    jSplitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT);
    jSplitPane2 = new JSplitPane(JSplitPane.VERTICAL_SPLIT);
    setLayout(new BorderLayout());
    add(jSplitPane);
    jSplitPane.setLeftComponent(jSplitPane2);
    jSplitPane2.setTopComponent(group.search);
    jSplitPane2.setBottomComponent(group.list);
    jSplitPane.setRightComponent(new JPanel()); // dummy
  }
  
  public SearchInlay getSearchInlay() {
    return group.search;
  }

  public ListInlay getListInlay() {
    return group.list;
  }

  public PropertyInlay getPropertyInlay() {
    return group.propertyAdmin;
  }

  protected boolean perform(Action action) {
    if (Constants.SET_LEFT_RIGHT_DEVIDER_.equals(action.toDo)) {
      jSplitPane.setDividerLocation(AppletGlobal.getInstance().getApplet().getWidth() * Integer.parseInt(action.value) / 100);
    } else if (Constants.SEARCH.equals(action.concerningSubLevel1)) {
      group.search.perform(action);
    } else if (Constants.LIST.equals(action.concerningSubLevel1)) {
      group.list.perform(action);
    } else if (Constants.DETAIL.equals(action.concerningSubLevel1)) {
      if (group.propertyAdmin == null) {
        group.propertyAdmin = new PropertyAdministrationInlay(group);
        group.propertyAdmin.setMessageReceiver(messageReceiver);
      }
      if (!action.concerningSubLevel1.equals(lastDetailConcerning)) {
        setDetailComponent(group.propertyAdmin);
        // jSplitPane.validate();
        lastDetailConcerning = action.concerningSubLevel1;
      }
      group.propertyAdmin.perform(action);
      resetIfInvisible();
    } else if (Constants.PRESENTATION.equals(action.concerningSubLevel1)) {
      if (group.presentation == null) {
        group.presentation = new PresentationInlay(title);
        group.presentation.setMessageReceiver(messageReceiver);
      }
      if (!action.concerningSubLevel1.equals(lastDetailConcerning)) {
        if (!action.concerningSubLevel1.equals(lastDetailConcerning)) {
          setDetailComponent(group.presentation);
          // jSplitPane.validate();
        }
        lastDetailConcerning = action.concerningSubLevel1;
      }
      group.presentation.perform(action);
      resetIfInvisible();
      group.presentation.validate();
    } else return false;
    return true;
  }
  
  @Override
  public void extendParams(Vector<KeyValuePairAlpha> params) {
    if (group.propertyAdmin != null) {
      group.propertyAdmin.extendParams(params);
    }
  }
  
  private void setDetailComponent(Component comp) {
    int location = jSplitPane.getDividerLocation();
    jSplitPane.setRightComponent(comp);
    jSplitPane.setDividerLocation(location);
  }
  
  private void resetIfInvisible() {
    if (jSplitPane.getRightComponent() instanceof InputInlay
    && !((InputInlay)jSplitPane.getRightComponent()).isVisible()
    ) {
      setDetailComponent(new JPanel());
      lastDetailConcerning = null;
    }
  }

  @Override
  public String getId() {
    return null;
  }

}
