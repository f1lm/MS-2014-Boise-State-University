/*
 * Copyright (c) 2013 Christoph Mueller. All rights reserved.
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

import java.awt.Frame;

public abstract class BackupOnlyDialog extends BackupDialog {
  
  private boolean waitFor;

  public BackupOnlyDialog(Frame ownerFrame, boolean waitFor) {
    super(ownerFrame, waitFor);
    setTitle(getTranslation("TEXT_DB_BACKUP"));
    newPanel();
    for (String string : getInfoWhatsGoingToHappen()) {
      currentAttributeList.appendInfoLine(string);
    }
    currentAttributeList.appendInfoLine(" "); //$NON-NLS-1$
    dirSpec = new DirectorySpecification(ownerFrame);
    dirSpec.addTo(currentAttributeList, getTranslation("TEXT_OUTDIR"));  //$NON-NLS-1$
    fileSpec = createTextField(getTranslation("TEXT_SAVE_FILE"), 40);
    currentAttributeList.append(".zip"); //$NON-NLS-1$
  }

  @Override
  protected void act() {
    backup();
  }

  @Override
  protected void threadCompleted() {
    if (thread.isToRun()) {
      StandardDialog.presentText(ownerFrame, new String[]{
        getTranslation("TEXT_DB_BACKUP") + " " + getTranslation("TEXT_SUCCESSFUL") + "."
        ,"-> " + saveFile.getPath()
      });
    } else {
      StandardDialog.presentText(ownerFrame, new String[]{
        getTranslation("TEXT_DB_BACKUP") + " " + getTranslation("TEXT_CANCELED") + "."
      });
    }
    super.threadCompleted();
  }

}
