/*
 * Copyright (c) 2004 Christoph Mueller. All rights reserved.
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

import java.awt.Dimension;

/**
 * A Frame to be filled by multiple inlays.
 * @author Christoph Mueller
 */
public abstract class ContainerFrame extends MustFrame {

  protected MustStatusLabel statusLabel = new MustStatusLabel();
  protected boolean isLaidOut;

	public ContainerFrame() {
		super();
	}

  /**
   *
   * @param layoutDim
   */
  public void setDefaultSize(Dimension layoutDim) {
    if (!isLaidOut) this.setSize(layoutDim);
  }

  /**
   *
   * @param width
   * @param height
   */
  public void setDefaultLocation(int width, int height) {
    if (!isLaidOut) this.setLocation(width, height);
  }

  /**
   *
   */
  protected void packIfNotLaidOut() {
    if (!isLaidOut) pack();
  }

  /**
   * Initializes things before an action begins like resetting the status label.
   */
  public void generalActionBeginnung() {
    statusLabel.stopAnimation();
    statusLabel.reset();
  }

  /**
   * Concludes things after an action ended like resetting the status label to
   * its default value.
   */
  public void generalActionEnding() {
    statusLabel.resetDefault();
  }

  /**
   * Sets the message to be read by the user, which is presented in the status
   * label in this context.
   * @param message the message for the user
   */
  public void setMessage(String message) {
    statusLabel.setStatus(message);
  }

  /**
   * Sets the message to be read by the user, it is not reseted by
   * generalActionEnding when action completed. Thus, the user is able to notify
   * the message without pressing a confirmation button.
   * @param messageToKeep the message for the user
   */
  public void setMessageToKeep(String messageToKeep) {
    statusLabel.setRemainStatus(messageToKeep);
  }

  /**
   * Returns true if it is allowed to cancel the dialog.
   * @return true if it is allowed to cancel the dialog
   */
  public boolean isCancelAllowed(DataPropertyInlay[] affectedPropertyInlays) {
    boolean isToAskForCancelConfirmation = false;
    for (int i = 0; i < affectedPropertyInlays.length; i++) {
      if (affectedPropertyInlays[i].getAdministrationMode() != DataPropertyInlay.MODE_VIRGIN && affectedPropertyInlays[i].isVisible() && affectedPropertyInlays[i].isModified()) {
        isToAskForCancelConfirmation = true;
      }
		}
    if (!isToAskForCancelConfirmation) return true;
    // if (!StandardDialog.cancelConfirmed(ownerFrame)) return false;
    switch (StandardDialog.saveCancelReturnDecision(ownerFrame)) {
    case DiSaveCancelReturnD.DECISION_SAVE:
      for (int i = 0; i < affectedPropertyInlays.length; i++) {
        if (affectedPropertyInlays[i].getAdministrationMode() != DataPropertyInlay.MODE_VIRGIN && affectedPropertyInlays[i].isVisible() && affectedPropertyInlays[i].isModified()) {
          affectedPropertyInlays[i].okButtonAction();
        }
  		}
      return true;
    case DiSaveCancelReturnD.DECISION_CANCEL:
      return true;
     case DiSaveCancelReturnD.DECISION_RETURN:
       for (int i = 0; i < affectedPropertyInlays.length; i++) {
         if (affectedPropertyInlays[i].getAdministrationMode() != DataPropertyInlay.MODE_VIRGIN && affectedPropertyInlays[i].isVisible() && affectedPropertyInlays[i].isModified()) {
           affectedPropertyInlays[i].setRecoveredIdentifierToLastRevsionIdentifier();
         }
   		}
      return false;
  }
    return true;
  }

}
