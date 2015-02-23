/*
 * Copyright (c) 2010-2012 Christoph Mueller. All rights reserved.
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
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;

import javax.swing.JFileChooser;

/**
 * A component to specify a file location with select option.
 * @author Christoph Mueller
 */
public class DirectorySpecification extends FileOrDirectorySpecification {

  public DirectorySpecification(Frame ownerFrame) {
    this(ownerFrame, "");
    fileName.setColumns(50); // a directory needs less columns than a file path
  }
  
  public DirectorySpecification(Frame ownerFrame, String defaultValue) {
    super(ownerFrame, defaultValue);
    fileChooseButton = new MustButton(getTranslation("TEXT_CHOOSE_DIRECTORY"));
    fileChooseButton.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
				if (dialog == null) {
          dialog = new JFileChooser();
          dialog.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
          dialog.setDialogTitle(getTranslation("TEXT_CHOOSE_DIRECTORY"));
        }
				if (getTextField().getText().length() > 0) {
	        dialog.setSelectedFile(new File(getTextField().getText()));
				}
        if (dialog.showOpenDialog(DirectorySpecification.this.ownerFrame) == JFileChooser.APPROVE_OPTION) {
          DirectorySpecification.this.fileName.setText(dialog.getSelectedFile().getPath());
        }
      }
    });
  }
  
}
