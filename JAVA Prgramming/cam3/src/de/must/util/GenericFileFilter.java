/*
 * Copyright (c) 1999-2008 Christoph Mueller. All rights reserved.
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

package de.must.util;

import java.io.File;

import javax.swing.filechooser.FileFilter;

/**
 * @author Christoph Mueller
 */
public class GenericFileFilter extends FileFilter {
  
  private String[] acceptedEndings;
  
  public GenericFileFilter(String acceptedEnding) {
    this(new String[] {acceptedEnding});
  }

  public GenericFileFilter(String[] acceptedEndings) {
    this.acceptedEndings = acceptedEndings;
  }

  /* (non-Javadoc)
   * @see javax.swing.filechooser.FileFilter#accept(java.io.File)
   */
  public boolean accept(File file) {
    if (file.isDirectory()) return true;
    for (int i = 0; i < acceptedEndings.length; i++) {
      if (file.getName().toLowerCase().endsWith(acceptedEndings[i].toLowerCase())) return true;
    }
    return false;
  }

  /* (non-Javadoc)
   * @see javax.swing.filechooser.FileFilter#getDescription()
   */
  public String getDescription() {
    String description = "";
    for (int i = 0; i < acceptedEndings.length; i++) {
      if (description.length() > 0) description += ", ";
      description += "*" + acceptedEndings[i];
    }
    return description;
  }

}
