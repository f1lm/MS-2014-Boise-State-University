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

package de.must.appletserver;

import de.must.dataobj.ParamComponent;
import de.must.middle.ParameterStore;

public class ParamDirectorySpecification extends DirectorySpecification implements ParamComponent {
  
  private ParameterStore parameterStore;
  private ParameterStore.Entry entry;
  
  public ParamDirectorySpecification(SessionData sessionData, ParameterStore parameterStore, ParameterStore.Entry entry) {
    super(sessionData);
    this.parameterStore = parameterStore;
    this.entry = entry;
  }

  public void loadValue() {
    fileName.setText(parameterStore.getValue(entry.getKey()));
    if (fileName.getText().length() == 0 && entry != null) fileName.setText(entry.getDefaultValue()); 

  }

  public void saveValue() {
    parameterStore.setValue(entry.getKey(), fileName.getText());
  }

  public ParameterStore getParameterStore() {
    return parameterStore;
  }

  @Override
  public void setToolTipText(String text) {
    fileName.setToolTipText(text);
  }
  
}
