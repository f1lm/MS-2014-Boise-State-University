/*
 * Copyright (c) 2006-2011 Christoph Mueller. All rights reserved.
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

import java.sql.SQLException;

import de.must.dataobj.DataChangeListener;
import de.must.dataobj.DataChangedEvent;
import de.must.dataobj.DataObject;
import de.must.middle.ApplConstStd;

/**
 * Frame to present hierarchical data in a tree with filter option.
 * @author Christoph Mueller
 */
public abstract class DataStructureOutlineFrame extends StructureOutlineFrame {

  protected DataChangeListener contentDataChangeListener; // only to prevent being garbage collected
  protected DataMustTree dataMustTree;
  protected DataObject contentDataObject;
  private boolean isToLoad = false;
  private boolean loadThreadRunning;

  public DataStructureOutlineFrame(DataObject contentDataObject) {
    this(contentDataObject, ApplConstStd.TYPE_HIERARCHY_BY_LENGTH);
  }
  
  public DataStructureOutlineFrame(DataObject contentDataObject, int type) {
    super(type, null);
    this.contentDataObject = contentDataObject;
    // takes to long (if we do it later, we do it in its own thread): 
    contentDataObject.addDataChangeListener(contentDataChangeListener = new DataChangeListener() {
      public void DataChangePerformed(DataChangedEvent e) {
        if (e.getEntityName().equals(DataStructureOutlineFrame.this.contentDataObject.getTableName()) && isConnectionOpen()) { // e.g. connection may be closed after user changed database - the windows are closed and not used any more but still existing until garbage collection
          load();
        }
      }
    });
    creationEnding();
  }
  
  private boolean isConnectionOpen() {
    try {
      return !contentDataObject.getConnection().isClosed();
    } catch (SQLException e) {
      return false;
    }
  }
  
  protected abstract String getKeyColumName();
  protected abstract String getDescriptionColumName();
  protected String getWhereCondition() {
    return null;
  }
  
  @Override
  protected void createTree(int type) {
    dataMustTree = new DataMustTree(type);
    mustTree = dataMustTree;
  }

  /**
   * Loads content in an own thread. A second call before load finishing will cause
   * the unique thread to repeat loading instead of invoking a second thread. 
   */
  protected void load() {
    isToLoad = true;
    if (!loadThreadRunning) {
      loadThreadRunning = true;
      (new Thread(new Runnable() {
        public void run() {
          setCursor(WaitCursor);
          while (isToLoad) {
            isToLoad = false;
            mustTree.init();
            int entries = dataMustTree.loadFrom(DataStructureOutlineFrame.this.contentDataObject, getKeyColumName(), getDescriptionColumName(), getWhereCondition());
            setMessageToKeep(entries + getTranslation("TEXT_ENTRIES"));
            contentNotUpToDate = false;
            if (targetTextField != null) {
              mustTree.expand(targetTextField.getText());
            }
            initTree();
          }
          setCursor(DefaultCursor);
          loadThreadRunning = false;
        }
      })).start();
    }
  }

}