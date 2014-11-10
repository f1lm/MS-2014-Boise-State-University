/*
 * Copyright (c) 2010 Christoph Mueller. All rights reserved.
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

import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.Transferable;
import java.awt.dnd.DnDConstants;
import java.awt.dnd.DropTarget;
import java.awt.dnd.DropTargetDragEvent;
import java.awt.dnd.DropTargetDropEvent;
import java.awt.dnd.DropTargetEvent;
import java.awt.dnd.DropTargetListener;
import java.io.File;
import java.util.AbstractList;

import de.must.io.Logger;

/**
 * A TextField which is used by an ExternalLink, but not data-associated.
 * @author Christoph Mueller
 */
public class InfoLinkTextField2 extends MustTextField implements DropTargetListener {
  
  private ExternalLink extLink;
  private DataFlavor acceptedFlavor;

  public InfoLinkTextField2(int length) {
    super(length);
    try {
      acceptedFlavor = new DataFlavor("application/x-java-file-list; class=java.util.List");
      new DropTarget(this, DnDConstants.ACTION_COPY_OR_MOVE, this);
    } catch (ClassNotFoundException e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
  public void set(ExternalLink extLink) {
    this.extLink = extLink;
  }
  
  public void setFileNotFolder() {
    extLink.setFileNotFolder();
  }

  /* (non-Javadoc)
   * @see javax.swing.text.JTextComponent#setEditable(boolean)
   */
  public void setEditable(boolean b) {
    super.setEditable(b);
    if (extLink != null) {
      extLink.setEditable(b);
    }
  }

  @Override
  public void dragEnter(DropTargetDragEvent dtde) {
    validateDragEvent(dtde);
  }

  @Override
  public void dragExit(DropTargetEvent dte) {}

  @Override
  public void dragOver(DropTargetDragEvent dtde) {
    validateDragEvent(dtde);
  }

  @Override
  @SuppressWarnings("unchecked")
  public void drop(DropTargetDropEvent dtde) {
    Transferable transferable = dtde.getTransferable();
    dtde.acceptDrop(DnDConstants.ACTION_COPY); // to avoid 'No drop current'
    Object transferedObject = null;
    try {
      transferedObject = transferable.getTransferData(acceptedFlavor);
      AbstractList<File> list = (AbstractList<File>)transferedObject;
      File file = list.get(0);
      if (file != null) {
        if (!extLink.isFileOnly() || !file.isDirectory()) {
          setText(file.getAbsolutePath());
        }
      }
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
      StandardDialog.presentText(null, new String[]{e.getMessage()});
      // dtde.rejectDrop(); // not possible any more
    }
  }

  @Override
  public void dropActionChanged(DropTargetDragEvent dtde) {}
  
  protected void validateDragEvent(DropTargetDragEvent e) {
    if (!isEditable()) {
      e.rejectDrag();
      return;
    }
    DataFlavor[] flavors = e.getCurrentDataFlavors();
    for (int i = 0; i < flavors.length; i++) {
      if (!flavors[i].match(acceptedFlavor)) {
        e.rejectDrag();
        return;
      }
    }
    e.acceptDrag(DnDConstants.ACTION_COPY_OR_MOVE);
  }

}
