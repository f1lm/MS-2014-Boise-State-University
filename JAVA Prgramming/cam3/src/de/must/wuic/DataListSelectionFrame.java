/*
 * Copyright (c) 2008-2011 Christoph Mueller. All rights reserved.
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

import javax.swing.DefaultListModel;

import de.must.dataobj.DataObject;

/**
 * Frame to present data in a list with filter and choose options.
 * @author Christoph Mueller
 */
public abstract class DataListSelectionFrame extends ListSelectionFrame  {

  protected DataObject contentDataObject;
  private boolean isToLoad = false;
  private boolean loadThreadRunning;

  public DataListSelectionFrame(DataObject contentDataObject) {
    super(null);
    this.contentDataObject = contentDataObject;
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
          DefaultListModel<String> newModel = null;
          list.removeAll();
          while (isToLoad && open) {
            newModel = new DefaultListModel<String>();
            isToLoad = false;
            contentDataObject.select("*", getDescriptionColumName() + " like '%" + filterTextField.getText() + "%'", getDescriptionColumName());
            while (!isToLoad && contentDataObject.nextRow() && open) {
              String value = contentDataObject.getText(getDescriptionColumName());
              if (!caseSensitive.isSelected() || value.indexOf(filterTextField.getText()) != -1) {
                newModel.addElement(value);
              }
            }
            contentDataObject.closeQuery();
          }
          if (newModel != null) list.setModel(newModel);
          setCursor(DefaultCursor);
          loadThreadRunning = false;
        }
      })).start();
    }
  }

  protected abstract String getDescriptionColumName();
  
}