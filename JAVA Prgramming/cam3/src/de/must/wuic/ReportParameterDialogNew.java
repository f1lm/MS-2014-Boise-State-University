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

import de.must.dataobj.ParameterStd;
import de.must.middle.HTMLOutputThread;
import de.must.middle.ParameterStore;
import de.must.middle.ThreadDoneEvent;
import de.must.middle.ThreadDoneListener;
import de.must.util.Browser;

public abstract class ReportParameterDialogNew extends ParameterDialogWithStorage {
  
  private MustCheckBox border;

  public ReportParameterDialogNew(Frame ownerFrame, ParameterStore parameterStore) {
    super(ownerFrame, parameterStore);
  }
  
  @Override
  protected void creationEnding() {
    border = createCheckBox(getTranslation("TEXT_BORDER"), ParameterStd.HTML_TABLE_BORDER, getTranslation("TEXT_SHOW_GRID"));
    super.creationEnding();
  }
  
  @Override
  protected void act() {
    final HTMLOutputThread htmlOutputThread = getHTMLOutputThread();
    htmlOutputThread.setBorder(border.isSelected()?1:0);
    htmlOutputThread.addThreadDoneListener(new ThreadDoneListener() {
      public void threadDone(ThreadDoneEvent e) {
        Browser.visitURL("file://" + htmlOutputThread.getOutputPath());
      }
    });
    htmlOutputThread.start();
    super.act();
  }
  
  protected abstract HTMLOutputThread getHTMLOutputThread(); 

}
