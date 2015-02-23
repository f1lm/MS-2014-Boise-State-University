/*
 * Copyright (c) 2008 Christoph Mueller. All rights reserved.
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
import java.io.File;

import javax.swing.JPanel;
import javax.swing.JScrollPane;

/**
 * Container to present files of a directory. Allows editing via hyperlink.
 * @author Christoph Mueller
 */
public class DirectoryContent {

  private JPanel panel = new JPanel();
  private JScrollPane scrollPane;
  
  public DirectoryContent() {
    scrollPane = new JScrollPane(panel);
    scrollPane.setPreferredSize(new Dimension(450, 45));
  }
  
  public JScrollPane getComponent() {
    return scrollPane;
  }
  
  public int load(String directoryName) {
    int counter = 0;
    File directory = new File(directoryName);
    if (!directory.isDirectory()) {
      // directory may not exist yet: Logger.getInstance().error(getClass(), directoryName + " is not a directory");
    } else {
      panel.removeAll();
      File[] files = directory.listFiles();
      for (int i = 0; i < files.length; i++) {
        counter++;
        InternetLink link = new InternetLink(directory.getPath() + "/" + files[i].getName(), files[i].getName());
        panel.add(link);
      }
    }
    return counter;
  }
  
}
