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

package de.must.middle;

import java.util.Iterator;
import java.util.Vector;

/**
 * A transaction which may be interrupted to ask user to confirm the process.
 * Helpful to separate business logic from user interface technology.
 * Supports synchronous and asynchronous confirmation.
 * JDialogs may be used for synchronous confirmation, e.g. StandardDialog
 * In other cases repeat transaction check process after calling setConfirmed
 * for the already confirmed aspect of the transaction check.
 * @see de.must.wuic.StandardDialog
 * @author Christoph Mueller
 */
public class Transaction {
  
  public class Message {
    public String messageText;
    public String soundToPlay;
    public Message(String messageText, String soundToPlay) {
      this.messageText = messageText;
      this.soundToPlay = soundToPlay;
    }
  }
  
  public class BookResult {
    public ConfirmationMatter confirmationMatter;
    public ConversationMatter infoMatter;
    /** veto message - stops further execution */
    public String message;
    public Vector<Message> infoMessages;
    public String soundToPlay;
    public boolean booked;
    public void addInfoMessage(String messageText) {
      addInfoMessage(messageText, null);
    }
    public void addInfoMessage(String messageText, String soundToPlay) {
      if (infoMessages == null) {
        infoMessages = new Vector<Message>();
      }
      infoMessages.add(new Message(messageText, soundToPlay));
    }
    public void setUniqueSound(String defaultSound) {
      if (soundToPlay != null) return; // main sound already set
      if (infoMessages != null) {
        Iterator<Message> iterator = infoMessages.iterator();
        while (iterator.hasNext()) {
          Message message = iterator.next();
          if (message.soundToPlay != null) {
            soundToPlay = message.soundToPlay;
            return;
          }
        }
      }
      soundToPlay = defaultSound;
    }
  }

  protected Object about; // the object of the transaction on which confirmation references
  protected String currentAspect;
  protected Vector<String> confirmedAspects = new Vector<String>();
  
  protected void setAbout(Object about) {
    if (!about.equals(this.about)) {
      confirmedAspects.clear();
    }
    this.about = about; 
  }
  
  /**
   * Set the flag that the specified aspect is confirmed.
   * @param aspect the aspect which is confirmed
   */
  protected void setConfirmed(String aspect) {
    confirmedAspects.add(aspect);
  }

  /**
   * Returns true if the user is to ask to confirm the matter.
   * @param confirmationMatter the matter of confirmation
   * @return true if the user is to ask to confirm the matter
   */
  protected boolean isToConfirme(ConfirmationMatter confirmationMatter) {
    if (confirmationMatter == null) return true;
    return !confirmedAspects.contains(String.valueOf(confirmationMatter.hashCode()));
  }

  /**
   * Returns true if the plausibility check is to break.
   * @param confirmationMatter the matter of confirmation
   * @param immediateCertifier the immediate certifier if there is any (like JDialog e.g.)
   * @param result true if the plausibility check is to break
   * @return
   */
  protected boolean isToBreak(ConfirmationMatter confirmationMatter, ImmediateCertifier immediateCertifier, BookResult result) {
    if (immediateCertifier != null) {
      if (immediateCertifier.handle(confirmationMatter)) {
        return false;
      } else {
        return true;
      }
    } else {
      result.soundToPlay = confirmationMatter.getSoundToPlay();
      result.confirmationMatter = confirmationMatter;
      result.booked = false;
      currentAspect = String.valueOf(confirmationMatter.hashCode());
      return true;
    }
  }
  
}
