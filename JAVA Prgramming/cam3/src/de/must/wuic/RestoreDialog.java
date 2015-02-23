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
import de.must.io.RestoreDBStd;
import de.must.util.GenericFileFilter;

public abstract class RestoreDialog extends ParameterDialog {
  
  protected String[] fileExt = new String[]{".zip"}; //$NON-NLS-1$
  protected GenericInterruptibleThread thread;
  protected RestoreDBStd restoreDB;
  protected FileSpecification fileSpec;
  protected VariableChoice dbCharset;
  
  protected File saveFile;

  public RestoreDialog(Frame ownerFrame) {
    super(ownerFrame);
    setTitle(getTranslation("TEXT_RESTORE_DB") + " - " + getTranslation("TEXT_ATTENTION"));
    newPanel();
    for (String string : getInfoWhatsGoingToHappen()) {
      currentAttributeList.appendInfoLine(string);
    }
    currentAttributeList.appendInfoLine(" "); //$NON-NLS-1$
    fileSpec = new FileSpecification(ownerFrame);
    fileSpec.setFilter(new GenericFileFilter(fileExt));
    fileSpec.addTo(currentAttributeList, getTranslation("TEXT_SAVE_FILE"));  //$NON-NLS-1$
  }

  protected boolean isInputAccepted() {
    if (fileSpec.getFileName().length() == 0) {
      fileSpec.requestFocus();
      setMessageToKeep(getTranslation("TEXT_IS_REQUIRED")); //$NON-NLS-1$
      return false;
    }
    saveFile = new File(fileSpec.getFileName());
    if (!saveFile.exists()) {
      fileSpec.requestFocus();
      setMessageToKeep(getTranslation("TEXT_FILE_NOT_FOUND")); //$NON-NLS-1$
      return false;
    }
    //------------------------------------
    return true;
  }

  protected void act() {
    thread = new GenericInterruptibleThread(getTranslation("TEXT_RESTORE_DB")); //$NON-NLS-1$
    restoreDB = new RestoreDBStd();
    restoreDB.setAliveConfirmer(thread);
    restoreDB.setStatusInfoPresenter(thread.getThreadControllerFrame());
    Runnable runnable = new Runnable() {
      public void run() {
        String charset = null;
        if (dbCharset.isSpecialChoice() && dbCharset.getSelectedItemKey().length() > 0) {
          charset = dbCharset.getSelectedItemKey();
        }
        restoreDB.restore(getAllDataObjects(), saveFile.getPath(), charset);
        if (restoreDB.hasConflict()) {
          restoreDB.getConflictInfos().add(getTranslation("TEXT_RESTORE_DB") + " " + getTranslation("TEXT_CANCELED") + ".");
          StandardDialog.presentText(ownerFrame, restoreDB.getConflictInfos(), getTranslation("TEXT_ATTENTION"));
        } else if (thread.isToRun()) {
          StandardDialog.presentText(ownerFrame, new String[]{
            getTranslation("TEXT_RESTORE_DB") + " " + getTranslation("TEXT_SUCCESSFUL") + "."
          });
        } else {
          StandardDialog.presentText(ownerFrame, new String[]{
            getTranslation("TEXT_RESTORE_DB") + " " + getTranslation("TEXT_CANCELED") + "."
          });
        }
      }
    };
    thread.start(runnable);
  }
  
  protected abstract String[] getInfoWhatsGoingToHappen();
  protected abstract DataObject[] getAllDataObjects();
  
}
