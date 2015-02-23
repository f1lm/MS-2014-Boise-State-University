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

import java.io.IOException;
import java.util.Vector;

import javax.swing.DefaultListModel;

import de.must.applet.AppletGlobal.Veto;
import de.must.io.Logger;
import de.must.middle.ApplConstStd;
import de.must.util.Callback;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.AwtConst;
import de.must.wuic.ListSelectionFrame;
import de.must.wuic.MustTextField;

public class RemListSelectionFrame extends ListSelectionFrame implements RemoteGUIComponent {
  
  private DefaultListModel<String> newModel;
  private boolean firstInitDone;
  
  public RemListSelectionFrame() {
    super(AppletGlobal.getInstance());
    creationEnding();
  }

  @Override
  public String getId() {
    return null; // not needed here
  }
 
  @Override
  protected String getKeyColumName() {
    return null;
  }

  @Override
  protected void load() {
    Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
    params.add(new KeyValuePairAlpha(Constants.ACTION, Constants.ACTION_LIST));
    params.add(new KeyValuePairAlpha(Constants.FILTER, filterTextField.getText()));
    params.add(new KeyValuePairAlpha(Constants.CASE_SENSITIVE, Boolean.toString(caseSensitive.isSelected())));
    try {
      AppletGlobal.getInstance().contactServer(params);
    } catch (IOException e1) {
      Logger.getInstance().error(getClass(), e1);
    }
  }

  public void perform (final Action action) {
    if (Constants.INITIALIZE.equals(action.toDo)) {
      setTitle(action.value);
      newModel = new DefaultListModel<String>();
      list.removeAll();
    } else if (Constants.SET_VISIBLE.equals(action.toDo)) {
      setVisible(ApplConstStd.TRUE_STRING.equals(action.value));
    } else if (Constants.SET_TARGETTEXTFIELD.equals(action.toDo)) {
      targetTextField = (MustTextField)AppletGlobal.getInstance().getRemoteGUIComponent(action.value);
      buttonApply.setVisible(callback != null || targetTextField != null);
      if (action.variant1 != null) callback = new Callback() {
        public void callback() {
          AppletGlobal.Task task = AppletGlobal.getInstance().tasks.get(action.variant1);
          if (task != null) {
            SearchListDetailGUI sldGUI = (SearchListDetailGUI)task.gui;
            sldGUI.getSearchInlay().perform(Constants.ACTION_LIST);
          }
        }
      };
    } else if (Constants.ADD_ITEM.equals(action.toDo)) {
      newModel.addElement(action.value);
    } else if (Constants.APPLY_LIST.equals(action.toDo)) {
      list.setModel(newModel);
      if (!firstInitDone) {
        pack();
        int minWidth = 400;
        int minHeight = 500;
        int width = getSize().height;
        int height = getSize().height;
        if (height < height) height = minHeight;
        if (width < minWidth) width = minWidth;
        setSize(minWidth, minHeight);
        setLocation(AwtConst.getCenterLocation(getSize()));
        firstInitDone = true;
      }
    } else if (Constants.SET_CALLBACK.equals(action.toDo)) {
      callback = new Callback() {
        private String callbackId = action.id;
        public void callback() {
          generalActionBeginnung();
          Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
          params.add(new KeyValuePairAlpha(Constants.ACTION, callbackId));
          params.add(new KeyValuePairAlpha(Constants.IDENTIFIER, getSelectedItem()));
          try {
            AppletGlobal.getInstance().contactServer(params);
          } catch (IOException e1) {
            Logger.getInstance().error(getClass(), e1);
          }
          generalActionEnding();
        }
      };
    }
  }
  
  // -------------------------------------------------
  
  @Override
  public void setEditable(boolean value) {
    // not needed here
  }

  @Override
  public void setValue(String value) {
  }

  @Override
  public boolean isModified() {
    return false;
  }

  @Override
  public void extendParams(Vector<KeyValuePairAlpha> params) {
  }

  @Override
  public void selectAll() {
  }
  
  @Override
  public void closeInstance() {
    super.closeInstance();
    closeServerShadow();
  }

  private boolean closeServerShadow() {
    Veto veto = null;
    Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
    params.add(new KeyValuePairAlpha(Constants.TAB_OR_WINDOW_ID, getTitle()));
    params.add(new KeyValuePairAlpha(Constants.ACTION, Constants.ACTION_CANCEL));
    try {
      veto = AppletGlobal.getInstance().contactServer(params);
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
      return false;
    }
    if (veto == null) {
      AppletGlobal.getInstance().currentDialog = null;
    } else {
      // messageReceiver.setStatus(vetoMessage);
    }
    return true;
  }

}
