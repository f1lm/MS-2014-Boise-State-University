/*
 * Copyright (c) 2010 Christoph Mueller. All rights reserved.
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

import de.must.middle.MessageReceiver;
import de.must.wuic.ExternalLink;
import de.must.wuic.InfoLinkTextField2;

public class TemplateLink extends ExternalLink {
  
  public TemplateLink(Frame ownerFrame) {
    super(ownerFrame, new InfoLinkTextField2(60));
    setFileNotFolder();
    setNoOpen();
  }
  
  public void setTemplatePath(String path) {
    infoLink.setText(path);
  }
  
  public boolean isInputAccepted(MessageReceiver messageReceiver) {
    if (infoLink.getText().length() == 0) {
      infoLink.requestFocus();
      messageReceiver.receive(getTranslation("TEXT_IS_REQUIRED"));
      return false;
    }
    if (!infoLink.getText().toLowerCase().endsWith(".dot")) {
      infoLink.requestFocus();
      messageReceiver.receive(getTranslation("TEXT_TYPE_DOT_REQUIRED"));
      return false;
    }
    if (infoLink.getText().indexOf(File.separatorChar) != -1) {
      File file = new File(infoLink.getText());
      if (!file.exists()) {
        infoLink.requestFocus();
        messageReceiver.receive(getTranslation("TEXT_FILE_NOT_FOUND"));
        return false;
      }
    }
    return true;
  }
  
  public String getTemplatePath() {
    return infoLink.getText();
  }

}
