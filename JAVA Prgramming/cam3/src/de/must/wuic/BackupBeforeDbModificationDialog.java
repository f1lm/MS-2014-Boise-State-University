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
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;

public abstract class BackupBeforeDbModificationDialog extends BackupDialog {
  
  protected MustCheckBox backupFirst;
  
  public BackupBeforeDbModificationDialog(Frame ownerFrame) {
    super(ownerFrame, true); // always wait for backup to be completed before modifying database
    setTitle(getTranslation("TEXT_DATABASE_HAS_TO_BE_EXTENDED"));
    newPanel();
    for (String string : getInfoWhatsGoingToHappen()) {
      currentAttributeList.appendInfoLine(string);
    }
    currentAttributeList.appendInfoLine(" "); //$NON-NLS-1$
    backupFirst = createCheckBox(getTranslation("TEXT_DB_BACKUP"), getTranslation("TEXT_PREVIOUS_BACKAUP_IS_STRONGLY_RECOMMENDED")); //$NON-NLS-1$ //$NON-NLS-2$
    backupFirst.setSelected(true);
    backupFirst.addItemListener(new ItemListener() {
      public void itemStateChanged(ItemEvent e) {
        dirSpec.setEnabled(backupFirst.isSelected());
        fileSpec.setEnabled(backupFirst.isSelected());
      }
    });
    dirSpec = new DirectorySpecification(ownerFrame);
    dirSpec.addTo(currentAttributeList, getTranslation("TEXT_OUTDIR"));  //$NON-NLS-1$
    fileSpec = createTextField(getTranslation("TEXT_SAVE_FILE"), 40);
    currentAttributeList.append(".zip"); //$NON-NLS-1$
  }

  @Override
  protected String[] getInfoWhatsGoingToHappen() {
    return new String[] {
      getTranslation("TEXT_DATABASE_HAS_TO_BE_EXTENDED"), //$NON-NLS-1$
      getTranslation("TEXT_PROCESS_EXTENSION_NOW") //$NON-NLS-1$
    };
  }

  @Override
  protected boolean isInputAccepted() {
    if (backupFirst.isSelected()) {
      return super.isInputAccepted();
    } else {
      return true;
    }
    
  }
  
}
