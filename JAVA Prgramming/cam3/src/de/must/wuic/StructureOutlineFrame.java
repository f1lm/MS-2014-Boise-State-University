/*
 * Copyright (c) 2006-2013 Christoph Mueller. All rights reserved.
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
import java.awt.event.MouseEvent;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import javax.swing.tree.TreeSelectionModel;

import de.must.middle.ApplConstStd;
import de.must.middle.FrameworkTextResource;
import de.must.util.Callback;

public abstract class StructureOutlineFrame extends PropertyAdministration implements ListSelectionListener {

  protected MouseAdapter mouseAdapter; // only to prevent being garbage collected
  protected JPanel filterPanel;
  protected FilterTextField filterTextField;
  protected MustCheckBox caseSensitive;
  protected MustTree mustTree;
  protected Callback callback;
  protected MustTextField targetTextField;
  protected MustButton buttonApply;
  protected boolean contentNotUpToDate = true;
  
  public StructureOutlineFrame(FrameworkTextResource frameworkTextResource) {
    this(ApplConstStd.TYPE_HIERARCHY_BY_LENGTH, frameworkTextResource);
  }
  
  public StructureOutlineFrame(int type, FrameworkTextResource frameworkTextResource) {
    super(frameworkTextResource);
    buttonOk.setText(getTranslation("TEXT_CLOSE_BUTTON"));
    buttonOk.setPreferredWidth(-1);
    panelButtons.remove(buttonCancel);
    buttonApply = new MustButton(getTranslation("TEXT_APPLY_BUTTON"));
    buttonApply.setEnabled(false);
    panelButtons.add(buttonApply, 0);
    buttonApply.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        generalActionBeginnung();
        if (targetTextField != null) {
          targetTextField.setText(mustTree.getSelectedItemKey());
        }
        if (callback != null) {
          callback.callback();
        }
      }
    });
    filterTextField = new FilterTextField(30, new Callback() {
      public void callback() {
        generalActionBeginnung();
        filter();
      }
    });
    caseSensitive = new MustCheckBox(getTranslation("TEXT_CASE_SENSITIVE"));
    caseSensitive.addItemListener(new ItemListener() {
      public void itemStateChanged(ItemEvent e) {
        filter();
      }
    });
    getContentPane().setLayout(new BorderLayout());
    filterPanel = new JPanel();
    filterPanel.setLayout(new FlowLayout(FlowLayout.LEFT));
    filterPanel.add(new JLabel("Filter:"));
    filterPanel.add(filterTextField);
    filterPanel.add(caseSensitive);
    getContentPane().add(filterPanel, BorderLayout.NORTH);
    createTree(type);
    mustTree.setPreferredSize(new java.awt.Dimension(300, 250));
    getContentPane().add(mustTree, BorderLayout.CENTER);
    mustTree.setCallbackWhenDoubleClicked(new Callback() {
      public void callback() {
        if (StructureOutlineFrame.this.callback != null) {
          StructureOutlineFrame.this.callback.callback();
        }
        StructureOutlineFrame.this.setVisible(false);
      }
    });
  }
  
  private void filter() {
    int hits = mustTree.filter(filterTextField.getText(), caseSensitive.isSelected());
    initTree();
    if (contentNotUpToDate) {
      load();
      initTree();
    }
    contentNotUpToDate = false;
    if (filterTextField.getText().length() > 0) mustTree.expandAll();
    setMessageToKeep(hits + " " + getTranslation("TEXT_ENTRIES"));
  }
  
  protected void createTree(int type) {
    mustTree = new MustTree(type);
  }
  
  protected void initTree() {
    mustTree.getTree().getSelectionModel().setSelectionMode(TreeSelectionModel.SINGLE_TREE_SELECTION);
    mustTree.getTree().setShowsRootHandles(true);
    mustTree.getTree().setRootVisible(false);
    controlApplyButton(); // also check at the beginning
    mustTree.fireSelectionChanged();
    mustTree.getTree().addMouseListener(mouseAdapter = new MouseAdapter() {
      public void mouseReleased(MouseEvent e) {
        super.mouseReleased(e);
        controlApplyButton();
        mustTree.fireSelectionChanged();
      }
    });
  }
  
  public MustTree getTree() {
    return mustTree;
  }
  
  private void controlApplyButton() {
    buttonApply.setEnabled(mustTree.getSelectedItemKey() != null);
  }
  
  protected abstract void load();
  
  public void open() {
    open(null, null);
  }

  public void open(Callback callback) {
    open(callback, null);
  }

  public void open(MustTextField targetTextField) {
    open(null, targetTextField);
  }

  /**
   * Opens the frame by setting it visible and filling with data.
   * @param callback the object to be called back when user chooses an entry
   * @param targetTextField the text field to be updated with the chosen key
   */
  public void open(Callback callback, MustTextField targetTextField) {
    this.callback = callback;
    this.targetTextField = targetTextField;
    buttonApply.setVisible(callback != null || targetTextField != null);
    super.open();
    requestFocus();
    if (isToReload()) {
      load();
    } else {
      if (targetTextField != null) mustTree.expand(targetTextField.getText());
    }
    mustTree.setTargetTextField(targetTextField);
  }
  
  protected boolean isToReload() {
    return contentNotUpToDate;
  }

  public String getSelectedItemKey() {
    return mustTree.getSelectedItemKey();
  }
  
  /**
   * Called when list selection changed to inform registered components.
   * @param e the list selection event
   */
  public void valueChanged(ListSelectionEvent e) {
    mustTree.valueChanged(e);
  }

  /**
   * Adds a selection listener to be notified about selection changed events.
   * @param l the selection listener to be notified
   */
  public synchronized void addAnySelectionListener(AnySelectionListener l) {
    mustTree.addAnySelectionListener(l);
  }

  /**
   * Removes a selection listener to be notified about selection changed events.
   * @param l the selection listener
   */
   public synchronized void removeAnySelectionListener(AnySelectionListener l) {
     mustTree.removeAnySelectionListener(l);
  }

   @Override
   public boolean isClosingAllowed(int closeConfirmId) {
    return true;
  }

}
