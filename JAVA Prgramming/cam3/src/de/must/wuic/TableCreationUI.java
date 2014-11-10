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

import java.awt.Cursor;
import java.awt.Frame;
import java.util.Vector;

import de.must.dataobj.TableCreatorStd;
import de.must.middle.MessageReceiver;

public class TableCreationUI {
  
  private java.awt.Frame ownerFrame;
  private TableCreatorStd tableCreator;
  private boolean noUserVeto = true;
  
  public TableCreationUI(java.awt.Frame ownerFrame, TableCreatorStd tableCreator) {
    this.ownerFrame = ownerFrame;
    this.tableCreator = tableCreator;
  }
  
  public int perform(int todo) {
    if (todo == TableCreatorStd.TODO_CREATE) {
      if (tableCreator.isStandardDatabase() || (noUserVeto = StandardDialog.generalConfirme(ownerFrame, getTranslation("TEXT_TABLE_CREATION_CONFIRMATION"), new String[] {getTranslation("TEXT_THE_CHOOSEN_DATABASE_DOESNT_CONTAIN") + " " + tableCreator.getDatabaseName() + getTranslation("TEXT_-TABLES"), getTranslation("TEXT_CREATE_TABLES_NOW") + "?"}))) {
        if (ownerFrame != null) ownerFrame.setCursor(new Cursor(Cursor.WAIT_CURSOR));
        if (tableCreator.createTables()) {
          tableCreator.setHappyState(TableCreatorStd.STATE_FULL_HAPPY); 
        }
        if (ownerFrame != null) ownerFrame.setCursor(new Cursor(Cursor.DEFAULT_CURSOR));
      } else {
        tableCreator.setHappyState(TableCreatorStd.STATE_UNHAPPY); 
      }
    } else  if (todo == TableCreatorStd.TODO_UPDATE_STRUCTURE_FOR_ALL_TABLES) {
      if (noUserVeto = isUpdateConfirmed(ownerFrame)) {
        MustFrame.closeAll();
        final BatchThreadControllerFrame controller = new BatchThreadControllerFrame();
        controller.setCancelButtonEnabled(false);
        tableCreator.setMessageReceiver(new MessageReceiver() {
          public void receive(String message) {
            controller.setStatusInformation(message);
          }
        });
        if (ownerFrame != null) ownerFrame.setCursor(new Cursor(Cursor.WAIT_CURSOR));
        Vector<String> changeLog = tableCreator.updateStructureOfAllTables();
        if (ownerFrame != null) ownerFrame.setCursor(new Cursor(Cursor.DEFAULT_CURSOR));
        controller.taskIsDone();
        if (changeLog.size() > 0) StandardDialog.presentText(ownerFrame, changeLog, "Warning: database extension may be incomplete");
      }
    } else {
      if (noUserVeto = isUpdateConfirmed(ownerFrame)) {
        final BatchThreadControllerFrame controller = new BatchThreadControllerFrame();
        controller.setCancelButtonEnabled(false);
        tableCreator.setMessageReceiver(new MessageReceiver() {
          public void receive(String message) {
            controller.setStatusInformation(message);
          }
        });
        if (ownerFrame != null) ownerFrame.setCursor(new Cursor(Cursor.WAIT_CURSOR));
        Vector<String> changeLog = tableCreator.alterTables(todo);
        if (ownerFrame != null) ownerFrame.setCursor(new Cursor(Cursor.DEFAULT_CURSOR));
        controller.taskIsDone();
        if (changeLog.size() > 0) StandardDialog.presentText(ownerFrame, changeLog, "Warning: database extension may be incomplete");
      } else {
        tableCreator.setHappyState(TableCreatorStd.STATE_HAPPY_MINUS_UPDATE);
      }
    }
    return tableCreator.getHappyState();
  }

  public boolean isUpdateConfirmed(Frame ownerFrame) {
    return StandardDialog.generalConfirme(ownerFrame, getTranslation("TEXT_CONFIRM_TABLE_UPDATE"), new String[] {getTranslation("TEXT_DATABASE_HAS_TO_BE_EXTENDED"), getTranslation("TEXT_PREVIOUS_BACKAUP_IS_STRONGLY_RECOMMENDED"), getTranslation("TEXT_PROCESS_EXTENSION_NOW")});
  }

  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey) {
    return WuicGlobal.getInstance().getResourceString(resourceKey);
  }
  
  public boolean isUserVeto() {
    return !noUserVeto;
  }
  
}
