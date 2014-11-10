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

package de.must.appletserver;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * A component to specify a file location with select option.
 * @author Christoph Mueller
 */
public class DirectorySpecification extends FileOrDirectorySpecification {

  public DirectorySpecification(SessionData sessionData) {
    this(sessionData, "");
  }
  
  public DirectorySpecification(SessionData sessionData, String defaultValue) {
    super(sessionData, defaultValue);
    fileChooseButton = new MustButton(getTranslation("TEXT_CHOOSE_DIRECTORY"));
    fileChooseButton.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        // TODO
//				if (dialog == null) {
//          dialog = new JFileChooser();
//          dialog.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
//        }
//        dialog.setDialogTitle(getTranslation("TEXT_CHOOSE_DIRECTORY"));
//        if (dialog.showOpenDialog(DirectorySpecification.this.ownerFrame) == JFileChooser.APPROVE_OPTION) {
//          DirectorySpecification.this.fileName.setText(dialog.getSelectedFile().getPath());
//        }
      }
    });
  }

  @Override
  public void selectAll() {
    fileName.selectAll();
  }
  
}
