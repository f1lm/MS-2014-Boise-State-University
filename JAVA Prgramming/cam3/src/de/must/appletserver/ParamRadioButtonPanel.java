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
import de.must.middle.ParameterStore.Entry;

public class ParamRadioButtonPanel extends RadioButtonPanel implements ParamComponent {
  
  private static String[] getKeys(Entry[] entries) {
    String[] keys = new String[entries.length];
    for (int i = 0; i < entries.length; i++) {
      keys[i] = entries[i].getKey();
    }
    return keys;
  }

  private ParameterStore parameterStore;
  private Entry entry;

  /**
   * Constructs a new ParamRadioButtonPanel.
   * @param parameterStore the data object to assign to
   * @param columnName the triggering column's name
   */
  public ParamRadioButtonPanel(SessionData sessionData, String[] keys, String[] labels, ParameterStore parameterStore, Entry entry) {
    super(sessionData, keys, labels);
    this.parameterStore = parameterStore;
    this.entry = entry;
  }
  
  public ParamRadioButtonPanel(SessionData sessionData, Entry[] entries, String[] labels, ParameterStore parameterStore, Entry entry) {
    this(sessionData, getKeys(entries), labels, parameterStore, entry);
  }
  
  public ParameterStore getParameterStore() {
    return parameterStore;
  }

  public void loadValue() {
    setSelectedKey(parameterStore.getValue(entry.getKey()));
    if (value == null) setSelectedKey(entry.getDefaultValue()); 
  }

  public void saveValue() {
    parameterStore.setValue(entry.getKey(), getSelectedKey());
  }

}
