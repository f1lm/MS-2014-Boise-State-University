/*
 * Copyright (c) 2011-2014 Christoph Mueller. All rights reserved.
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
import java.awt.Container;
import java.awt.FlowLayout;
import java.awt.MediaTracker;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Vector;

import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JSplitPane;
import javax.swing.JTextArea;

import de.must.applet.AppletGlobal.Veto;
import de.must.dataobj.Identifier;
import de.must.io.Logger;
import de.must.middle.ApplConstStd;
import de.must.util.KeyValuePairAlpha;
import de.must.util.StringFunctions;
import de.must.wuic.AttributeList;
import de.must.wuic.MustButton;
import de.must.wuic.MustStatusLabel;
import de.must.wuic.MustTabbedPane;
import de.must.wuic.RemPrinterChooser;

public class InputInlay extends JPanel implements ActionListener, FocusListener, ServerCaller {

  protected String tabIdAndLabel;
  protected MustStatusLabel messageReceiver;
  protected MustTabbedPane mustTabbedPane;
  private String tabLabelToBuildNext;
  protected Vector<AttributeList> tabAttributeList;
  protected JScrollPane attrListScroll;
  protected AttributeList attributeList;
  protected Hashtable<String, RemoteGUIComponent> rgcs;
  protected Vector<MustButton> additionalButton;
  protected JPanel panelTop;
  protected JLabel titleLabel;
  protected JPanel panelButtons;
  protected RemComboBox currentComboBox;
  protected RemSubList sublist;
  private RemConfirmDialog deleteConfDlg;
  private RemConfirmDialog confDlg;
  private RemInfoDialog infoDlg;
  protected Veto veto;
  
  public InputInlay(String tabIdAndLabel) {
    this.tabIdAndLabel = tabIdAndLabel;
    additionalButton = new Vector<MustButton>();
    setLayout(new BorderLayout());
    rgcs = new Hashtable<String, RemoteGUIComponent>();
    panelTop = new JPanel();
    panelTop.setLayout(new FlowLayout(FlowLayout.LEFT));
    titleLabel = new JLabel();
    // titleLabel.setFont(new Font(titleLabel.getFont().getName(), Font.BOLD, titleLabel.getFont().getSize()));
    panelTop.add(titleLabel);
    add(titleLabel, BorderLayout.NORTH);
    panelButtons = new JPanel();
  }

  public MustButton createButton(String label, String tooltiptext, String actionCommand, ActionListener l) {
    return new MustButton(label, tooltiptext, actionCommand, l);
  }

  public void setMessageReceiver(MustStatusLabel messageReceiver) {
    this.messageReceiver = messageReceiver;
  }
  
  public void perform (Action action) {
    if (Constants.CREATE_BUTTON.equals(action.toDo)) {
      MustButton button = null;
      if (action.variant1 != null) {
        button = AppletGlobal.getInstance().createButton(action.variant1, action.label, action.variant2, action.id, this);
        // button.setPreferredSize(new Dimension(25, 25));
      } else {
        button = createButton(action.label, action.variant2, action.id, this);
      }
      additionalButton.add(button);
      attributeList.append(button);
    } else if (Constants.CREATE_BOTTOM_BUTTON.equals(action.toDo)) {
      int index = -1;
      try {
        index = action.getValueAsInt();
      } catch (NumberFormatException e) {} // ignore
      MustButton button = createButton(action.label, action.variant2, action.id, this);
      additionalButton.add(button);
      panelButtons.add(button, index);
    } else if (Constants.HIDE_BUTTONS.equals(action.toDo)) {
      // remove(panelButtons); no default action when enter is pressed!
      panelButtons.setVisible(false);
    } else if (Constants.SET_VISIBLE.equals(action.toDo)) {
      RemoteGUIComponent rgc = null;
      if (action.id != null
      && (rgc = rgcs.get(action.id)) != null) {
        rgc.setVisible(ApplConstStd.TRUE_STRING.equals(action.value));
      } else {
        setVisible(ApplConstStd.TRUE_STRING.equals(action.value));
      }
    } else if (Constants.SET_ENABLED.equals(action.toDo)) {
      MustButton button = getAdditionaButton(action.id);
      if (button != null) {
        button.setEnabled(ApplConstStd.TRUE_STRING.equals(action.value));
      } else {
        RemoteGUIComponent rgc = null;
        if (action.id != null
        && (rgc = rgcs.get(action.id)) != null) {
          rgc.setEnabled(Boolean.parseBoolean(action.value));
        }
      }
    } else if (Constants.SET_HEADER.equals(action.toDo)) {
      String title = action.value;
      if (title.length() > 0) {
        title += ":";
      }
      titleLabel.setText(title);
    } else if (Constants.CLEAR_DETAILS.equals(action.toDo)) {
      tabAttributeList = null;
      if (mustTabbedPane != null) remove(mustTabbedPane);
      if (attrListScroll != null) remove(attrListScroll);
      attrListScroll = null;
      attributeList = null;
      rgcs.clear();
      additionalButton.clear();
    } else if (Constants.CREATE_TAB.equals(action.toDo)) {
      if (tabAttributeList == null) {
        mustTabbedPane = new MustTabbedPane();
        tabAttributeList = new Vector<AttributeList>();
        add(mustTabbedPane, BorderLayout.CENTER);
      }
      attributeList = null;
      tabLabelToBuildNext = action.label;
    } else if (Constants.NEW_ATTRIBUTE_ROW.equals(action.toDo)) {
      createAttributeListIfNull().newRow(action.label);
    } else if (Constants.CREATE_TEXTFIELD.equals(action.toDo)) {
      RemTextField comp = new RemTextField(action.id, action.length);
      if (action.variant2 != null) {
        comp.setToolTipText(action.variant2);
      }
      if (action.variant3 != null) {
        comp.setCapitalization(true);
      }
      comp.addFocusListener(this);
      createAttributeListIfNull().append(comp);
      rgcs.put(action.id, comp);
      if (Constants.REGISTER.equals(action.variant1)) {
        AppletGlobal.getInstance().register(action.id, comp);
      }
    } else if (Constants.CREATE_PASSWORDFIELD.equals(action.toDo)) {
      RemPasswordField comp = new RemPasswordField(action.id, action.length);
      if (action.variant2 != null) {
        comp.setToolTipText(action.variant2);
      }
      comp.addFocusListener(this);
      createAttributeListIfNull().append(comp);
      rgcs.put(action.id, comp);
    } else if (Constants.CREATE_TEXTAREA.equals(action.toDo)) {
      // createAttributeListIfNull();
      RemTextArea comp = new RemTextArea(action.id /*, action.length*/);
      if (action.variant2 != null) {
        comp.setToolTipText(action.variant2);
      }
      comp.addFocusListener(this);
      if (tabLabelToBuildNext !=  null) {
        mustTabbedPane.add(tabLabelToBuildNext, new JScrollPane(comp));
      } else {
        attributeList.append(new JScrollPane(comp));
      }
      rgcs.put(action.id, comp);
    } else if (Constants.CREATE_DATEFIELD.equals(action.toDo)) {
      RemDateField comp = new RemDateField(action.id);
      if (action.variant2 != null) {
        comp.setToolTipText(action.variant2);
      }
      comp.addFocusListener(this);
      createAttributeListIfNull().append(comp);
      rgcs.put(action.id, comp);
    } else if (Constants.CREATE_INTEGERFIELD.equals(action.toDo)) {
      RemIntField comp = new RemIntField(action.id);
      if (action.variant2 != null) {
        comp.setToolTipText(action.variant2);
      }
      comp.addFocusListener(this);
      createAttributeListIfNull().append(comp);
      rgcs.put(action.id, comp);
    } else if (Constants.CREATE_DECIMALFIELD.equals(action.toDo)) {
      RemDecimalField comp = new RemDecimalField(action.id);
      if (action.variant2 != null) {
        comp.setToolTipText(action.variant2);
      }
      comp.addFocusListener(this);
      createAttributeListIfNull().append(comp);
      rgcs.put(action.id, comp);
    } else if (Constants.CREATE_RADIOBUTTONS.equals(action.toDo)) {
      RemRadiobuttonPanel comp = null;
      if (Constants.ITEM_LISTENER.equals(action.variant3)) {
        comp = new RemRadiobuttonPanel(action.id, StringFunctions.getElements(action.variant1, ApplConstStd.MAIN_SEPARATOR), StringFunctions.getElements(action.variant2, ApplConstStd.MAIN_SEPARATOR), this);
      } else {
        comp = new RemRadiobuttonPanel(action.id, StringFunctions.getElements(action.variant1, ApplConstStd.MAIN_SEPARATOR), StringFunctions.getElements(action.variant2, ApplConstStd.MAIN_SEPARATOR));
      }
      comp.addFocusListener(this);
      createAttributeListIfNull().append(comp);
      rgcs.put(action.id, comp);
    } else if (Constants.CREATE_COMBOBOX.equals(action.toDo)) {
      currentComboBox = new RemComboBox(action.id);
      if (action.variant2 != null) {
        currentComboBox.setToolTipText(action.variant2);
      }
      if (Constants.ITEM_LISTENER.equals(action.variant3)) {
        currentComboBox.addItemListener(this);
      }
      createAttributeListIfNull().append(currentComboBox);
      rgcs.put(action.id, currentComboBox);
    } else if (Constants.CLEAR_COMBOBOX.equals(action.toDo)) {
      RemoteGUIComponent rgc = rgcs.get(action.id);
      if (rgc != null) {
        currentComboBox = (RemComboBox)rgcs.get(action.id);
        currentComboBox.removeAllItems();
      }
    } else if (Constants.CREATE_PRINTERCHOOSER.equals(action.toDo)) {
      RemPrinterChooser rpc = new RemPrinterChooser(action.id);
      createAttributeListIfNull().append(rpc);
      rgcs.put(action.id, rpc);
    } else if (Constants.CREATE_CHECKBOX.equals(action.toDo)) {
      RemCheckBox comp = null;
      if (Constants.ITEM_LISTENER.equals(action.variant3)) {
        comp = new RemCheckBox(action.id, action.label, this);
      } else {
        comp = new RemCheckBox(action.id, action.label);
      }
      if (action.variant2 != null) {
        comp.setToolTipText(action.variant2);
      }
      if (action.nonstandardPanel == null) {
        createAttributeListIfNull().append(comp);
      } else {
        panelButtons.add(comp, action.nonstandardPos);
      }
      rgcs.put(action.id, comp);
    } else if (Constants.CREATE_TWO_LISTS.equals(action.toDo)) {
      RemTwoListTransformer tlt = new RemTwoListTransformer(action.id);
      createAttributeListIfNull().append(tlt);
      rgcs.put(action.id, tlt);
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
        createAttributeListIfNull().append(new JLabel(icon));
      }
    } else if (Constants.CREATE_LABEL.equals(action.toDo)) {
      if (action.value.indexOf(Constants.NEW_LINE) != -1) {
        JTextArea comp = new JTextArea(StringFunctions.replaceAll(action.value, Constants.NEW_LINE, "\n"));
        comp.setEditable(false);
        comp.setBackground(attributeList.getBackground());
        createAttributeListIfNull().append(comp);
      } else {
        createAttributeListIfNull().append(action.value);
      }
    } else if (Constants.CREATE_TEXTPRESENTER.equals(action.toDo)) {
      if (action.value.indexOf(Constants.NEW_LINE) != -1) {
        RemTextArea comp = new RemTextArea(action.id);
        comp.setValue(StringFunctions.replaceAll(action.value, Constants.NEW_LINE, "\n"));
        comp.setEditable(false);
        comp.setBackground(getBackground());
        createAttributeListIfNull().append(comp);
        rgcs.put(action.id, comp);
      } else {
        RemTextPresenter comp = new RemTextPresenter(action.id, action.value);
        createAttributeListIfNull().append(comp);
        rgcs.put(action.id, comp);
      }
    } else if (Constants.CREATE_TOPIC.equals(action.toDo)) {
      createAttributeListIfNull().appendTopic(action.value);
    } else if (Constants.CREATE_INFO_LINE.equals(action.toDo)) {
      createAttributeListIfNull().appendInfoLine(action.value);
    } else if (Constants.CREATE_SUBLIST_TAB.equals(action.toDo)) {
      sublist = new RemSubList(tabIdAndLabel);
      JSplitPane jSplitPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT);
      jSplitPane.add(new JScrollPane(sublist), 0);
      attributeList = new AttributeList();
      jSplitPane.add(new JScrollPane(attributeList), 1);
      mustTabbedPane.add(tabLabelToBuildNext, jSplitPane);
      jSplitPane.setDividerLocation(70);
      rgcs.put(action.id, sublist);
      tabLabelToBuildNext = null;
    } else if (Constants.CLEAR_SUBLIST.equals(action.toDo)) {
      sublist.removeAll();
    } else if (Constants.ADD_SUBLIST_ITEM.equals(action.toDo)) {
      sublist.addItem(Identifier.parseString(action.id), action.value);
    } else if (Constants.INFO_CANNOT_DELETE.equals(action.toDo)) {
      if (infoDlg == null) {
        infoDlg = new RemInfoDialog(tabIdAndLabel, getTabElementId());
        infoDlg.setTitle(getTranslation("TEXT_ENTRY_IS_IN_USE"));
        infoDlg.setHeaderText(getTranslation("TEXT_ENTRY_MUST_NOT_BE_DELETED") + " " + getTranslation("TEXT_BECAUSE_IT_IS_IN_USE"));
      }
      infoDlg.perform(action);
      infoDlg.setVisible(true);
    } else if (Constants.CONFIRM_DELETION.equals(action.toDo)) {
      if (deleteConfDlg == null) {
        deleteConfDlg = new RemConfirmDialog(tabIdAndLabel, getTabElementId());
        action.variant1 = getTranslation("TEXT_CONFIRM_DELETION");
        action.variant2 = getTranslation("TEXT_THIS_ITEM_IS_GOING_TO_BE_DELETED");
        deleteConfDlg.setAction(Constants.ACTION_SUBLISTDELETE_CONFIRMATION, Constants.ACTION_SUBLISTDELETE_CANCEL);
      }
      deleteConfDlg.perform(action);
      deleteConfDlg.setVisible(true);
    } else if (Constants.CONFIRM_VIA_DIALOG.equals(action.toDo)) {
      if (confDlg == null) {
        confDlg = new RemConfirmDialog(tabIdAndLabel, getTabElementId());
        confDlg.setAction(Constants.ACTION_CONFIRM_OK, Constants.ACTION_CONFIRM_CANCEL);
      }
      confDlg.perform(action);
      confDlg.setVisible(true);
    } else if (Constants.INFORMATION_DIALOG.equals(action.toDo)) {
      RemInfoDialog dlg = new RemInfoDialog(tabIdAndLabel, getTabElementId());
      dlg.setTitle(action.variant1);
      dlg.perform(action);
      dlg.setVisible(true);
    } else if (Constants.REQUEST_FOCUS.equals(action.toDo)) {
      final RemoteGUIComponent rgc = rgcs.get(action.id);
      // no problem with IE, but Firefox, no matter if invokelater or thread delay...
//      Runnable runnable = new Runnable() {
//        public void run() {
//          try {
//            Thread.sleep(200);
//          } catch (InterruptedException e) {
//            Logger.getInstance().error(getClass(), e);
//          }
          rgc.requestFocus();
//        }
//      };
//      (new Thread(runnable)).start();
      // SwingUtilities.invokeLater(runnable);
    } else if (Constants.SELECT_ALL.equals(action.toDo)) {
      rgcs.get(action.id).selectAll();
    } else if (Constants.SET_VALUE.equals(action.toDo)) {
      RemoteGUIComponent rgc = rgcs.get(action.id);
      if (rgc != null) {
        if (rgc instanceof RemTextField && action.variant1 != null) {
          ((RemTextField)rgcs.get(action.id)).setValue(action.value, action.variant1);
        } else if (rgc instanceof RemDateField && action.variant1 != null) {
          ((RemDateField)rgcs.get(action.id)).setValue(action.value, action.variant1);
        } else {
          rgcs.get(action.id).setValue(action.value);
        }
      }
    } else {
      Logger.getInstance().warn("Unknown todo " + action.toDo);
    }
  }

  private AttributeList createAttributeListIfNull() {
    if (tabAttributeList != null) {
      if (attributeList == null) {
        attributeList = new AttributeList();
        tabAttributeList.add(attributeList);
        mustTabbedPane.addScrollableTab(tabLabelToBuildNext, attributeList);
        tabLabelToBuildNext = null;
      }
    } else { // not tabs used
      if (attributeList == null) {
        attributeList = new AttributeList();
        add(attrListScroll = new JScrollPane(attributeList), BorderLayout.CENTER);
      }
    }
    return attributeList;
  }
  
  private MustButton getAdditionaButton(String actionId) {
    Iterator<MustButton> iterator = additionalButton.iterator();
    while (iterator.hasNext()) {
      MustButton mustButton = iterator.next();
      if (actionId.equals(mustButton.getActionCommand())) {
        return mustButton;
      }
    }
    return null;
  }

  protected String getTranslation(String key) {
    return AppletGlobal.getInstance().getResourceString(key);
  }

  public RemoteGUIComponent getRemotable(String id) {
    return rgcs.get(id);
  }

  @Override
  public void focusGained(FocusEvent e) {
  }

  @Override
  public void focusLost(FocusEvent e) {
  }

  @Override
  public void actionPerformed(ActionEvent e) {
  }

  /**
   * Initializes things before an action begins like resetting the status label.
   */
  protected void generalActionBeginnung() {
    if (messageReceiver != null) messageReceiver.reset();
  }

  /**
   * Concludes things after an action ended like resetting the status label to
   * its default value.
   */
  protected void generalActionEnding() {
//    statusLabel.resetDefault();
  }

  protected boolean contactServer(String action) {
    Vector<KeyValuePairAlpha> params = getSynchParams();
    params.add(new KeyValuePairAlpha(Constants.TAB_ELEMENT, getTabElementId()));
    params.add(new KeyValuePairAlpha(Constants.ACTION, action));
    try {
      veto = AppletGlobal.getInstance().contactServer(params);
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
      return false;
    }
    if (veto == null) {
      AppletGlobal.getInstance().currentDialog = null;
    } else {
      messageReceiver.setRemainStatus(veto.message);
      if (veto.soundToPlay != null) AppletGlobal.getInstance().playSound(veto.soundToPlay);
    }
    return veto == null;
  }
  
  protected String getTabElementId() {
    return null;
  }
  
  protected Vector<KeyValuePairAlpha> getSynchParams() {
    Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
    addSynchParams(params);
    return params;
  }
  
  private void addSynchParams(Vector<KeyValuePairAlpha> params) {
    if (tabIdAndLabel != null) params.add(new KeyValuePairAlpha(Constants.TAB_OR_WINDOW_ID, tabIdAndLabel));
    params.add(new KeyValuePairAlpha(Constants.TAB_ELEMENT, Constants.SEARCH));
    extendParams(params);
  }
  
  public void extendParams(Vector<KeyValuePairAlpha> params) {
    Enumeration<RemoteGUIComponent> valueContainers = rgcs.elements();
    while (valueContainers.hasMoreElements()) {
      RemoteGUIComponent valueContainer = valueContainers.nextElement();
      valueContainer.extendParams(params);
    }
  }
  
  protected void hideGUI() {
    Container parent = this;
    while ((parent = parent.getParent()) != null && !parent.getClass().equals(RemPropertyDialog.class)) {}
    if (parent != null && parent.getClass().equals(RemPropertyDialog.class)) {
      parent.setVisible(false);
    } else {
      // no more: setVisible(false);
    }
  }

  @Override
  public boolean contactServer(Vector<KeyValuePairAlpha> params) {
    addSynchParams(params);
    try {
      veto = AppletGlobal.getInstance().contactServer(params);
      return veto == null;
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    }
    return false;
  }

}
