/*
 * Copyright (c) 2010-2013 Christoph Mueller. All rights reserved.
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

package de.must.middle;

import java.util.Vector;

import de.must.io.Logger;
import de.must.wuic.BatchThreadControllerFrame;

public abstract class InterruptibleProcess {

  private AliveConfirmer aliveConfirmer;
  private StatusInfoPresenter statusInfoPresenter;
  private Vector<String> conflictInfos;
  
  public InterruptibleProcess() {
    this(null);
  }
  
  public InterruptibleProcess(BatchThreadControllerFrame controllerFrame) {
    setAliveConfirmer(controllerFrame);
    setStatusInfoPresenter(controllerFrame);
  }
  
  public InterruptibleProcess(AliveConfirmer aliveConfirmer) {
    setAliveConfirmer(aliveConfirmer);
  }
  
  public void setAliveConfirmer(AliveConfirmer aliveConfirmer) {
    this.aliveConfirmer = aliveConfirmer;
  }
  
  public void setStatusInfoPresenter(StatusInfoPresenter statusInfoPresenter) {
    this.statusInfoPresenter = statusInfoPresenter;
  }
  
  protected boolean isToRun() {
    return aliveConfirmer == null || aliveConfirmer.isToRun();
  }
  
  protected void setStatusInformation(String info) {
    if (statusInfoPresenter != null) statusInfoPresenter.setStatusInformation(info);
    else Logger.getInstance().debug(getClass(), info);
  }
  
  protected void setConflictInfo(Exception e) {
    setConflictInfo(e.getMessage());
  }
  
  protected void setConflictInfo(String info) {
    if (conflictInfos == null) conflictInfos = new Vector<String>();
    conflictInfos.add(info);
  }
  
  public boolean hasConflict() {
    return conflictInfos != null;
  }
  
  public Vector<String> getConflictInfos() {
    return conflictInfos;
  }
  
}
