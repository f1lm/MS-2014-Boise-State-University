/*
 * Copyright (c) 2008-2011 Christoph Mueller. All rights reserved.
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

package de.must.wuic;

import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseAdapter;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

import de.must.dataobj.DataChangeListener;
import de.must.middle.FrameworkTextResource;
import de.must.util.Callback;

public abstract class ListSelectionFrame extends PropertyAdministration implements ListSelectionListener {

  private DataChangeListener contentDataChangeListener; // only to prevent being garbage collected
  private MouseAdapter mouseAdapter; // only to prevent being garbage collected
  protected JPanel filterPanel;
  protected FilterTextField filterTextField;
  protected MustCheckBox caseSensitive;
  protected MustList list;
  protected MustTextField targetTextField;
  protected Callback callback;
  protected MustButton buttonApply;
  protected boolean open;
  private boolean contentNotUpToDate = true;

  /**
   * 
   * @param frameworkTextResource may be null for applications
   */
  public ListSelectionFrame(FrameworkTextResource frameworkTextResource) {
    super(frameworkTextResource);
    setTitle(getTranslation("TEXT_CHOOSE_BUTTON"));
    filterTextField = new FilterTextField(30, new Callback() {
      public void callback() {
        load();
      }
    });
    caseSensitive = new MustCheckBox(getTranslation("TEXT_CASE_SENSITIVE"));
    caseSensitive.addItemListener(new ItemListener() {
      public void itemStateChanged(ItemEvent e) {
        load();
      }
    });
    getContentPane().setLayout(new BorderLayout());
    filterPanel = new JPanel();
    filterPanel.setLayout(new FlowLayout(FlowLayout.LEFT));
    filterPanel.add(new JLabel("Filter:"));
    filterPanel.add(filterTextField);
    filterPanel.add(caseSensitive);
    getContentPane().add(filterPanel, BorderLayout.NORTH);
    list = new MustList();
    getContentPane().add(new JScrollPane(list), BorderLayout.CENTER);
    buttonOk.setText(getTranslation("TEXT_CLOSE_BUTTON"));
    buttonOk.setPreferredWidth(-1);
    panelButtons.remove(buttonCancel);
    buttonApply = new MustButton(getTranslation("TEXT_APPLY_BUTTON"));
    buttonApply.setEnabled(false);
    panelButtons.add(buttonApply, 0);
    buttonApply.setSelectDependence(list);
    list.setEnterButton(buttonApply);
    buttonApply.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        if (targetTextField != null) {
          targetTextField.setText(getSelectedItem());
        }
        if (callback != null) {
          callback.callback();
        }
      }
    });
    creationEnding();
  }
  
  private void controlApplyButton() {
    buttonApply.setEnabled(list.getSelectedItem().length() > 0);
  }
  
  /**
   * Opens the frame by setting it visible and filling with data.
   * @param callback the object to be called back when user chooses an entry
   */
  public void open(Callback callback) {
    this.callback = callback;
    open = true;
    buttonApply.setVisible(callback != null);
    super.open();
    requestFocus();
    load();
  }
  
  protected abstract void load();
  protected abstract String getKeyColumName();
  
  public String getSelectedItem() {
    return list.getSelectedItem();
  }
  
  /**
   * Called when list selection changed to inform registered components.
   * @param e the list selection event
   */
  public void valueChanged(ListSelectionEvent e) {
    list.valueChanged(e);
  }

  /**
   * Adds a selection listener to be notified about selection changed events.
   * @param l the selection listener to be notified
   */
  public synchronized void addAnySelectionListener(AnySelectionListener l) {
    list.addAnySelectionListener(l);
  }

  /**
   * Removes a selection listener to be notified about selection changed events.
   * @param l the selection listener
   */
   public synchronized void removeAnySelectionListener(AnySelectionListener l) {
     list.removeAnySelectionListener(l);
  }

   @Override
   public boolean isClosingAllowed(int closeConfirmId) {
    return true;
  }

  @Override
  public void closeInstance() {
    open = false;
    super.closeInstance();
  }
 
}
