/*
 * Copyright (c) 2008-2010 Christoph Mueller. All rights reserved.
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

import javax.swing.filechooser.FileFilter;

/**
 * A component to specify a file location with select option.
 * @author Christoph Mueller
 */
public class FileSpecificationForSignedApplet extends FileOrDirectorySpecification {

  public FileSpecificationForSignedApplet(SessionData sessionData) {
    this(sessionData, "");
  }
  
  public FileSpecificationForSignedApplet(SessionData sessionData, String defaultValue) {
    super(sessionData, defaultValue);
    fileChooseButton = new MustButton(getTranslation("TEXT_CHOOSE_FILE"));
    fileChooseButton.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        // TODO
//				if (dialog == null) {
//          dialog = new JFileChooser();
//          if (fileFilter != null) dialog.setFileFilter(fileFilter);
//        }
//        dialog.setDialogTitle(getTranslation("TEXT_CHOOSE_FILE"));
//        if (dialog.showOpenDialog(FileSpecification.this.ownerFrame) == JFileChooser.APPROVE_OPTION) {
//          FileSpecification.this.fileName.setText(dialog.getSelectedFile().getPath());
//        }
      }
    });
  }
  
  public void setFilter(FileFilter filter) {
    this.fileFilter = filter;
  }
  
  public void setFilePath(String filePath) {
    fileName.setText(filePath);
  }

  @Override
  public void selectAll() {
    fileName.selectAll();
  }
  
}
