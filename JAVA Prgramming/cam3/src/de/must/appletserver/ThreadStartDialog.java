/*
 * Copyright (c) 2011 Christoph Mueller. All rights reserved.
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
import de.must.middle.FileOutputThread;
import de.must.middle.ThreadController;

public abstract class ThreadStartDialog extends ParameterDialog {

  public ThreadStartDialog(SessionData sessionData, String tabIdAndLabel) {
    super(sessionData, tabIdAndLabel);
  }

  /**
   * Construct the thread associated with this start dialog and perform application specific settings.
   * @return the thread associated with this start dialog
   */
  protected abstract FileOutputThread getThread();
  
  @Override
  protected void act() {
    FileOutputThread thread = getThread();
    ThreadController controller = new ThreadController() {
      public void taskIsDone() {
      }
      public void setStatusInformation(String statusInformation) {
      }
      public void setCancelButtonEnabled(boolean enabled) {
      }
      public boolean isToCancel() {
        return false;
      }
    };
    thread.setThreadController(controller);
    String absoluteOutputPath = sessionData.realPath + "temp" + File.separatorChar + sessionData.sessionId + File.separatorChar;
    File outputDir = new File(absoluteOutputPath);
    outputDir.mkdirs();
    thread.setOutputFolder(absoluteOutputPath);
//    thread.addThreadDoneListener(this);
    thread.run(); // as for now, we do not start the thread. Instead we wait for end of execution. Maybe later we use an applet window contacting server repeatedly to ask whether task is finished
    sessionData.newReports.add(sessionData.new Report("temp/" + sessionData.sessionId + "/" + thread.getFileName()));
  }

}
