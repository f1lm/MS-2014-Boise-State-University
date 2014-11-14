/*
 * Copyright (c) 2008-2013 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.ParamComponent;
import de.must.middle.ParameterStore;
import de.must.middle.ParameterStore.Entry;

/**
 * @author Christoph Mueller
 */
public class ParamTextField extends MustTextField implements ParamComponent {

  private ParameterStore parameterStore;
  private Entry entry;
  private String keyName;

  /**
   * @param parameterStore the data object to assign to
   * @param entry the triggering parameter entry
   * @param length the length of the text field
   */
  public ParamTextField(ParameterStore parameterStore, Entry entry, int length) {
    super(length);
    this.parameterStore = parameterStore;
    this.entry = entry;
    this.keyName = entry.getKey();
  }

 /**
   * @param parameterStore the data object to assign to
   * @param keyName the triggering parameter name
   * @param length the length of the text field
   */
  public ParamTextField(ParameterStore parameterStore, String keyName, int length) {
    super(length);
    this.parameterStore = parameterStore;
    this.keyName = keyName;
  }

 /**
   * Returns the assigned data object.
   * @return the assigned data object
   */
  public ParameterStore getParameterStore() {
    return parameterStore;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    setTextAsEditBeginValue(parameterStore.getValue(keyName));
    if (getText().length() == 0 && entry != null) setTextAsEditBeginValue(entry.getDefaultValue()); 
  }

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    parameterStore.setValue(keyName, getText());
  }

}
