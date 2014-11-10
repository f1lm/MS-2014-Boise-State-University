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

package de.must.wuic;

import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.DefaultListModel;
import javax.swing.JPanel;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

import de.must.middle.ImageResource;

public abstract class TwoListTransformer extends JPanel {
  
  protected DefaultListModel<String> model1;
  protected DefaultListModel<String> model2;
  private SequenceChangeList list1;
  private SequenceChangeList list2;
  private MustButton buttonToRight;
  private MustButton buttonToLeft;
  
  public TwoListTransformer() {
    this(GlobalInWuicStd.getImageResource());
  }
  
  public TwoListTransformer(ImageResource imageResource) {
    model1 = new DefaultListModel<String>();
    model2 = new DefaultListModel<String>();
    list1 = new SequenceChangeList(model1, imageResource);
    list1.setSortButtonsVisible(false);
    list2 = new SequenceChangeList(model2, imageResource);
    setLayout(new FlowLayout(FlowLayout.LEFT));
    add(list1);
    buttonToRight = MustButton.create("Forward24.gif", ">", imageResource);
    buttonToLeft = MustButton.create("Back24.gif", "<", imageResource);
    JPanel buttonPanel = new JPanel();
    buttonPanel.setLayout(new BorderLayout());
    buttonPanel.add(buttonToRight, BorderLayout.NORTH);
    buttonPanel.add(buttonToLeft, BorderLayout.SOUTH);
    add(buttonPanel);
    add(list2);
    buttonToRight.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        int sourceIndex = list1.getList().getSelectedIndex();
        int targetIndex = model2.getSize();
        if (list2.getList().getSelectedIndex() >= 0) {
          targetIndex = list2.getList().getSelectedIndex() + 1;
        }
        model2.insertElementAt(model1.elementAt(sourceIndex), targetIndex);
        model1.removeElementAt(sourceIndex);
        if (sourceIndex > model1.getSize() - 1) {
          sourceIndex = model1.getSize() - 1;
        }
        list2.getList().setSelectedIndex(targetIndex);
        list2.getList().ensureIndexIsVisible(targetIndex);
        list1.getList().setSelectedIndex(sourceIndex);
      }
    });
    buttonToLeft.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        int sourceIndex = list2.getList().getSelectedIndex();
        int targetIndex = model1.getSize();
        if (list1.getList().getSelectedIndex() >= 0) {
          targetIndex = list1.getList().getSelectedIndex() + 1;
        }
        model1.insertElementAt(model2.elementAt(sourceIndex), targetIndex);
        model2.removeElementAt(sourceIndex);
        if (sourceIndex > model2.getSize() - 1) {
          sourceIndex = model2.getSize() - 1;
        }
        list1.getList().setSelectedIndex(targetIndex);
        list1.getList().ensureIndexIsVisible(targetIndex);
        list2.getList().setSelectedIndex(sourceIndex);
      }
    });
    list1.getList().addListSelectionListener(new ListSelectionListener() {
      public void valueChanged(ListSelectionEvent e) {
        controlEnabling();
      }
    });
    list2.getList().addListSelectionListener(new ListSelectionListener() {
      public void valueChanged(ListSelectionEvent e) {
        controlEnabling();
      }
    });
    controlEnabling();
  }

  private void controlEnabling() {
    buttonToRight.setEnabled(list1.getList().getSelectedIndices().length > 0);
    buttonToLeft.setEnabled(list2.getList().getSelectedIndices().length > 0);
  }

}
