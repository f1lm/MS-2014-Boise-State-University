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

package de.must.wuic;

import java.awt.Frame;
import java.io.File;

import de.must.dataobj.DataObject;
import de.must.io.BackupDBStd;
import de.must.io.TextFile;

public abstract class BackupDialog extends ParameterDialog {
  
  protected boolean waitFor;
  protected GenericInterruptibleThread thread;
  protected BackupDBStd backupDB;
  protected DirectorySpecification dirSpec;
  protected MustTextField fileSpec;
//  protected VariableChoice dbCharset;
  
  protected File saveFile;

  public BackupDialog(Frame ownerFrame, boolean waitFor) {
    super(ownerFrame);
    this.waitFor = waitFor;
  }

  protected boolean isInputAccepted() {
    if (dirSpec.getFileName().length() == 0) {
      dirSpec.requestFocus();
      setMessageToKeep(getTranslation("TEXT_IS_REQUIRED")); //$NON-NLS-1$
      return false;
    }
    File dir = new File(dirSpec.getFileName());
    if (!dir.exists()) {
      dirSpec.requestFocus();
      setMessageToKeep(getTranslation("TEXT_NOT_EXISTEND")); //$NON-NLS-1$
      return false;
    }
    if (!dir.canWrite()) {
      dirSpec.requestFocus();
      setMessageToKeep(getTranslation("TEXT_NO_WRITE_PERMISSION")); //$NON-NLS-1$
      return false;
    }
    if (fileSpec.getText().length() == 0) {
      fileSpec.requestFocus();
      setMessageToKeep(getTranslation("TEXT_IS_REQUIRED")); //$NON-NLS-1$
      return false;
    }
    saveFile = new File(dirSpec.getFileName() + File.separator + fileSpec.getText() + ".zip");
    if (saveFile.exists()) {
      if (!StandardDialog.generalConfirme(ownerFrame, new String[] {getTranslation("TEXT_OVERRIDE_EXISTING_FILE")})) {
        return false;
      }
    }
    //------------------------------------
    return true;
  }

  protected void backup() {
    thread = new GenericInterruptibleThread(getTranslation("TEXT_DB_BACKUP")); //$NON-NLS-1$
    backupDB = new BackupDBStd();
    backupDB.setAliveConfirmer(thread);
    backupDB.setStatusInfoPresenter(thread.getThreadControllerFrame());
    Runnable runnable = new Runnable() {
      public void run() {
        String charset = System.getProperty("file.encoding");
        if ("ANSI_X3.4-1968".equals(charset)) {
          charset = TextFile.ENCODING_UTF8; // workaround for 1&1 linux 09.11.12 
        }
//        if (dbCharset.isSpecialChoice() && dbCharset.getSelectedItemKey().length() > 0) {
//          charset = dbCharset.getSelectedItemKey();
//        }
        backupDB.backup(getAllDataObjects(), saveFile.getPath(), charset);
        if (backupDB.hasConflict()) {
          backupDB.getConflictInfos().add(getTranslation("TEXT_DB_BACKUP") + " " + getTranslation("TEXT_CANCELED") + ".");
          StandardDialog.presentText(ownerFrame, backupDB.getConflictInfos(), getTranslation("TEXT_ATTENTION"));
        }
        threadCompleted();
      }
    };
    if (waitFor) {
      runnable.run();
    } else {
      thread.start(runnable);
    }
  }
  
  protected abstract String[] getInfoWhatsGoingToHappen();
  protected abstract DataObject[] getAllDataObjects();
  
  /**
   * Called when thread completed. Override to do additional stuff.
   */
  protected void threadCompleted() {
    thread.getThreadControllerFrame().taskIsDone();
  }
  
}
