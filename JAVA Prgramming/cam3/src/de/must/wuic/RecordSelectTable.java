/*
 * Copyright (c) 1999-2011 Christoph Mueller. All rights reserved.
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

import java.awt.event.*;

import de.must.io.Logger;

/**
 * @author Christoph Mueller
 */
public class RecordSelectTable extends MustTable implements MouseListener, KeyListener {

  private RecordSelectTableModel usedRecordSelectTableModel;
  private MustButton enterButton;

  public RecordSelectTable(RecordSelectTableModel RecordSelectTableModel) {
    super(RecordSelectTableModel);
    usedRecordSelectTableModel = RecordSelectTableModel;
    setSelectionMode(javax.swing.ListSelectionModel.MULTIPLE_INTERVAL_SELECTION);
    addMouseListener(this);
    addKeyListener(this);
  }

  public RecordSelectTable() {
    setSelectionMode(javax.swing.ListSelectionModel.MULTIPLE_INTERVAL_SELECTION);
    addMouseListener(this);
    addKeyListener(this);
  }

  public void setEnterButton(MustButton enterButton) {
    this.enterButton = enterButton;
  }

  public void removeAll() {
    usedRecordSelectTableModel.removeAll();
    fireSelectionChanged();
  }

 /* public void columnSelectionChanged(javax.swing.event.AnySelectionEvent e) {
    if (MainStd.debugMode) de.must.io.Logger.getInstance().info(getClass(), "columnSelectionChanged occurred in table");
    super.columnSelectionChanged(e);
  } */

  public void mouseClicked(MouseEvent e) {
    // 2011-10-07 moved to mouseReleased due to bad behavior
//    if (e.getClickCount() == 2) {
//      Logger.getInstance().debug(getClass(), "Doubleclick!!");
//      if (enterButton != null) enterButton.doClick();
//    }
  }

  public void mouseExited(MouseEvent e) {}

  public void mouseEntered(MouseEvent e) {}

  public void mousePressed(MouseEvent e) {}

  public void mouseReleased(MouseEvent e) {
    if (e.getClickCount() == 2) {
      Logger.getInstance().debug(getClass(), "Doubleclick!!");
      if (enterButton != null) enterButton.doClick();
    }
  }

  public void keyPressed(KeyEvent e) {
    if (enterButton != null & e.getKeyCode() == KeyEvent.VK_ENTER) {
      if (MainStd.debugMode) de.must.io.Logger.getInstance().info(getClass(), "Enter in RecordSelectTable");
      if (enterButton.isEnabled()) enterButton.doClick();
    }
  }

  public void keyReleased(KeyEvent e) {}

  public void keyTyped(KeyEvent e) {}

}
