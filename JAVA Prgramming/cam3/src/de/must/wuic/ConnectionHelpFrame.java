/*
 * Copyright (c) 1999-2003 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.*;
import java.awt.*;

/**
 * Frame to inform about unsuccessful database connection try.
 * @author Christoph Mueller
 */
public class ConnectionHelpFrame extends TextAreaInfoFrame {

  public String info1 =
    getTranslation("TEXT_THE_APPLICATION_COULD_NOT_CONNECT_TO_DATABASE") + ".\n" +
    "\n" +
    getTranslation("TEXT_THE_RECEIVED_ERROR_MESSAGE_IS") + ":\n" +
    "";

  public String info2 =
    "\n" +
    "\n" +
    getTranslation("TEXT_FOR_FURTHER_INFORMATION...") + ".\n" +
    "";

  public static ConnectionHelpFrame ConnectionHelpFrame1;

  public static void open() {
    open(null);
  }

 /**
   * Opens the frame.
   * @param parentFrame the parant frame
   */
  public static void open(Frame parentFrame) {
    if (ConnectionHelpFrame1 == null) {
      ConnectionHelpFrame1 = new ConnectionHelpFrame(parentFrame);
    }
    ConnectionHelpFrame1.setVisible(true);
  }

 /**
   * Closes the frame.
   */
  public static void close() {
    TextAreaInfoFrame.close(ConnectionHelpFrame1);
    ConnectionHelpFrame1 = null;
  }

 /**
   * Constructs a new connection help frame.
   * @param parentFrame the parant frame
   */
  public ConnectionHelpFrame(Frame parentFrame) {
    super(parentFrame);
    this.setTitle(getTranslation("TEXT_HELP_ON_DATABASE_CONNECTION"));
    this.setContent(info1 + ConnectionHolder.getLastCreateExceptionDescription() + info2);
    this.setHelp("Odbc");
    this.setSize(500, 300);
    this.setLocation(AwtConst.getCenterLocation(this.getSize()));
  }

}
