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

package de.must.appletserver;

import java.io.File;

import de.must.dataobj.DataObject;
import de.must.io.BackupDBStd;
import de.must.io.TextFile;
import de.must.middle.ConversationMatter;

public abstract class BackupDialog extends ParameterDialog {
  
  protected BackupDBStd backupDB;
  protected MustTextField fileSpec;
//  protected VariableChoice dbCharset;
  
  protected File saveFile;

  public BackupDialog(SessionData sessionData) {
    super(sessionData, sessionData.getFrameworkResourceString("TEXT_DB_BACKUP"));
    newPanel();
    for (String string : getInfoWhatsGoingToHappen()) {
      currentAttributeList.appendInfoLine(string);
    }
    currentAttributeList.appendInfoLine(" "); //$NON-NLS-1$
    fileSpec = createTextField(getTranslation("TEXT_SAVE_FILE"), 40);
    currentAttributeList.append(".zip"); //$NON-NLS-1$
    // dbCharset = createChoice("DB-Charset", ApplConstStd.CHARSETS);
  }

  @Override
  protected boolean isInputAccepted() {
    if (fileSpec.getText().length() == 0) {
      fileSpec.requestFocus();
      setMessageToKeep(getTranslation("TEXT_IS_REQUIRED")); //$NON-NLS-1$
      return false;
    }
    return super.isInputAccepted();
  }

  @Override
  protected void act() {
    saveFile = new File(sessionData.getSessionTempDir() + File.separator + fileSpec.getText() + ".zip");
    backupDB = new BackupDBStd();
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
          sessionData.addInfoToPresent(new ConversationMatter(getTranslation("TEXT_ATTENTION"), backupDB.getConflictInfos(), getFailSound()));
        } else {
          // maybe this distracts from zip-File download dialog:
//          sessionData.addInfoToPresent(new ConversationMatter(new String[]{
//            getTranslation("TEXT_DB_BACKUP") + " " + getTranslation("TEXT_SUCCESSFUL") + "."
//           ,getTranslation("TEXT_SAVE_SUITABLE")
//          }));
          // causing download dialog now:
          sessionData.newReports.add(sessionData.new Report("temp/" + sessionData.sessionId + "/" + saveFile.getName()));
        }
        threadCompleted();
      }
    };
    runnable.run();
  }
  
  protected abstract String[] getInfoWhatsGoingToHappen();
  protected abstract DataObject[] getAllDataObjects();
  protected String getFailSound() {return null;}
  
  /**
   * Called when thread completed. Override to do additional stuff.
   */
  protected void threadCompleted() {
    
  }
  
}
