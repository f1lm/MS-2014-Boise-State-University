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

import java.awt.MediaTracker;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Vector;

import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

import de.must.middle.ApplConstStd;
import de.must.util.KeyValuePairAlpha;
import de.must.util.StringFunctions;
import de.must.wuic.AttributeList;
import de.must.wuic.ContentChangeListener;
import de.must.wuic.MustButton;
import de.must.wuic.MustTextField;
import de.must.wuic.RemPrinterChooser;

public class RemAttributeList extends AttributeList implements FocusListener, ValueDelegator, ParamExtender {
  
  private String id;
  private ServerCaller serverCaller;
  protected Hashtable<String, Identified> idComp;
  protected RemComboBox currentComboBox;

  public RemAttributeList(String id, Hashtable<String, Identified> idComp, ServerCaller serverCaller) {
    this.id = id;
    this.idComp = idComp;
    this.serverCaller = serverCaller;
    idComp = new Hashtable<String, Identified>();
  }
  
  @Override
  public String getId() {
    return id;
  }
 
  public boolean perform (Action action) {
    // if (action.fatherid != null && action.fatherid != id) return false;  // no delegation due to wrong ID
    if (Constants.NEW_ATTRIBUTE_ROW.equals(action.toDo)) {
      newRow(action.label);
    } else if (Constants.CREATE_TEXTFIELD.equals(action.toDo)) {
      RemTextField comp = new RemTextField(action.id, action.length);
      if (action.variant2 != null) {
        comp.setToolTipText(action.variant2);
      }
      if (action.variant3 != null) {
        comp.setCapitalization(true);
      }
      comp.addFocusListener(this);
      append(comp);
      idComp.put(action.id, comp);
      if (Constants.REGISTER.equals(action.variant1)) {
        AppletGlobal.getInstance().register(action.id, comp);
      }
    } else if (Constants.CREATE_PASSWORDFIELD.equals(action.toDo)) {
      RemPasswordField comp = new RemPasswordField(action.id, action.length);
      if (action.variant2 != null) {
        comp.setToolTipText(action.variant2);
      }
      comp.addFocusListener(this);
      append(comp);
      idComp.put(action.id, comp);
    } else if (Constants.CREATE_TEXTAREA.equals(action.toDo)) {
      // createAttributeListIfNull();
      RemTextArea comp = new RemTextArea(action.id /*, action.length*/);
      if (action.variant2 != null) {
        comp.setToolTipText(action.variant2);
      }
      comp.addFocusListener(this);
      append(new JScrollPane(comp));
      idComp.put(action.id, comp);
    } else if (Constants.CREATE_DATEFIELD.equals(action.toDo)) {
      RemDateField comp = new RemDateField(action.id);
      if (action.variant2 != null) {
        comp.setToolTipText(action.variant2);
      }
      comp.addFocusListener(this);
      append(comp);
      idComp.put(action.id, comp);
    } else if (Constants.CREATE_RADIOBUTTONS.equals(action.toDo)) {
      RemRadiobuttonPanel comp = null;
      //      if (Constants.ITEM_LISTENER.equals(action.variant3)) {
      //        comp = new RemRadiobuttonPanel(action.id, StringFunctions.getElements(action.variant1, ApplConstStd.MAIN_SEPARATOR), StringFunctions.getElements(action.variant2, ApplConstStd.MAIN_SEPARATOR), this);
      //      } else {
      comp = new RemRadiobuttonPanel(action.id, StringFunctions.getElements(action.variant1, ApplConstStd.MAIN_SEPARATOR), StringFunctions.getElements(action.variant2, ApplConstStd.MAIN_SEPARATOR));
      //      }
      comp.addFocusListener(this);
      append(comp);
      idComp.put(action.id, comp);
    } else if (Constants.CREATE_COMBOBOX.equals(action.toDo)) {
      currentComboBox = new RemComboBox(action.id);
      if (action.variant2 != null) {
        currentComboBox.setToolTipText(action.variant2);
      }
      if (Constants.ITEM_LISTENER.equals(action.variant3)) {
        currentComboBox.addItemListener(serverCaller);
      }
      append(currentComboBox);
      idComp.put(action.id, currentComboBox);
    } else if (Constants.CLEAR_COMBOBOX.equals(action.toDo)) {
      Identified idC = idComp.get(action.id);
      if (idC != null) {
        currentComboBox = (RemComboBox)idComp.get(action.id);
        currentComboBox.removeAllItems();
      }
    } else if (Constants.CREATE_CHECKBOX.equals(action.toDo)) {
      RemCheckBox comp = null;
      // if (Constants.ITEM_LISTENER.equals(action.variant3)) {
        //        comp = new RemCheckBox(action.id, action.label, this);
        //      } else {
        comp = new RemCheckBox(action.id, action.label);
        //      }
        if (action.variant2 != null) {
          comp.setToolTipText(action.variant2);
        }
        append(comp);
        idComp.put(action.id, comp);
      // }
    } else if (Constants.CREATE_TWO_LISTS.equals(action.toDo)) {
      RemTwoListTransformer tlt = new RemTwoListTransformer(action.id);
      append(tlt);
      idComp.put(action.id, tlt);
    } else if (Constants.ADD_ITEM.equals(action.toDo)) {
      currentComboBox.addItem(action.value);
    } else if (Constants.ADD_ITEM.equals(action.toDo)) {
      currentComboBox.addItem(action.value);
    } else if (Constants.CREATE_IMAGE.equals(action.toDo)) {
      ImageIcon icon = null;
      if (action.value != null 
          && (icon = AppletGlobal.getInstance().getImageIcon(action.value))!= null
          && icon.getImageLoadStatus() != MediaTracker.ERRORED
      ) {
        append(new JLabel(icon));
      }
    } else if (Constants.CREATE_LABEL.equals(action.toDo)) {
      if (action.value.indexOf(Constants.NEW_LINE) != -1) {
        JTextArea comp = new JTextArea(StringFunctions.replaceAll(action.value, Constants.NEW_LINE, "\n"));
        comp.setEditable(false);
        comp.setBackground(getBackground());
        append(comp);
      } else {
        append(action.value);
      }
    } else if (Constants.CREATE_TEXTPRESENTER.equals(action.toDo)) {
      if (action.value.indexOf(Constants.NEW_LINE) != -1) {
        RemTextArea comp = new RemTextArea(action.id);
        comp.setValue(StringFunctions.replaceAll(action.value, Constants.NEW_LINE, "\n"));
        comp.setEditable(false);
        comp.setBackground(getBackground());
        append(comp);
        idComp.put(action.id, comp);
      } else {
        RemTextPresenter comp = new RemTextPresenter(action.id, action.value);
        append(comp);
        idComp.put(action.id, comp);
      }
    } else if (Constants.CREATE_PRINTERCHOOSER.equals(action.toDo)) {
      RemPrinterChooser rpc = new RemPrinterChooser(action.id);
      append(rpc);
      idComp.put(action.id, rpc);
    } else if (Constants.CREATE_TOPIC.equals(action.toDo)) {
      appendTopic(action.value);
    } else if (Constants.CREATE_INFO_LINE.equals(action.toDo)) {
      appendInfoLine(action.value);
    } else if (Constants.SET_CONTENT_ENABLING.equals(action.toDo)) {
      final RemTextField textField = (RemTextField)idComp.get(action.id);
      final MustButton button = (MustButton)idComp.get(action.variant1);
      textField.addKeyListener(new java.awt.event.KeyAdapter() {
        public void keyReleased(java.awt.event.KeyEvent e) {
          button.setEnabled(textField.getText().length() > 0);
        }
      });
    } else if (Constants.SWITCH_FOCUS.equals(action.toDo)) {
      final RemTextField textField = (RemTextField)idComp.get(action.id);
      final MustButton button1 = (MustButton)idComp.get(action.variant1);
      final MustButton button2 = (MustButton)idComp.get(action.variant2);
      textField.addFocusListener(new java.awt.event.FocusListener() {
        public void focusGained(java.awt.event.FocusEvent e) {
          getRootPane().setDefaultButton(button1);
        }
        public void focusLost(java.awt.event.FocusEvent e) {
          getRootPane().setDefaultButton(button2);
        }
      });
    } else if (Constants.ADD_CONTENT_CHANGE_LISTENER.equals(action.toDo)) {
      final MustTextField textField = (MustTextField)idComp.get(action.id);
      textField.addContentChangeListener(new ContentChangeListener() {
        public void contentChanged() {
          Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
          params.add(new KeyValuePairAlpha(Constants.ACTION, Constants.ACTION_CONTENT_CHANGED));
          params.add(new KeyValuePairAlpha(Constants.ACTION_SOURCE, ((Identified)textField).getId()));
          RemAttributeList.this.serverCaller.contactServer(params);
        }
      });
    } else if (Constants.SET_ENABLED.equals(action.toDo)) {
      Identified idC = idComp.get(action.id);
      if (idC != null && idC instanceof AppearanceModifiable) {
        ((AppearanceModifiable)idC).setEnabled(ApplConstStd.TRUE_STRING.equals(action.value));
      } else {
        return false;
      }
    } else if (Constants.SET_VALUE.equals(action.toDo)) {
      if (setValues(action.id, action.value)) {
        return true;
      }
    } else { // none of the above
      return false; // no delegation due to action not suitable
    }
    return true;
  }
  
  @Override
  public boolean setValues(String id, String value) {
    Identified rgc = idComp.get(id);
    if (rgc != null) {
      ((RemoteGUIComponent)rgc).setValue(value);
      return true;
    }
    return false;
  }

  public void extendParams(Vector<KeyValuePairAlpha> params) {
    Enumeration<Identified> identifiedElements = idComp.elements();
    while (identifiedElements.hasMoreElements()) {
      Identified identifiedElement = identifiedElements.nextElement();
      if (identifiedElement instanceof ParamExtender) {
        ((ParamExtender)identifiedElement).extendParams(params);
      }
    }
  }
  
  @Override
  public void focusGained(FocusEvent e) {
    // AppletGlobal.getInstance().getApplet().getRootPane().setDefaultButton(buttonOk);
  }

  @Override
  public void focusLost(FocusEvent e) {
  }

}
