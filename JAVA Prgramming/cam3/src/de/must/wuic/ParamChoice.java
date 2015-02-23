/*
 * Copyright (c) 2007-2012 Christoph Mueller. All rights reserved.
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
import de.must.util.KeyValuePairAlpha;
import de.must.util.KeyValuePairNum;

/**
 * @author Christoph Mueller
 */
public class ParamChoice extends VariableChoice implements ParamComponent {
  
  private static synchronized KeyValuePairAlpha[] transform(KeyValuePairNum[] keyValuePairNumArray) {
    KeyValuePairAlpha[] result = new KeyValuePairAlpha[keyValuePairNumArray.length];
    for (int i = 0; i < keyValuePairNumArray.length; i++) {
      result[i] = new KeyValuePairAlpha(Integer.toString(keyValuePairNumArray[i].getKey()), keyValuePairNumArray[i].getValue());
    }
    return result;
  }

  private boolean intKey = false;
  private ParameterStore parameterStore;
  private String keyName;

  /**
   * @param parameterStore the data object to assign to
   * @param keyName the triggering column's name
   * @param label the the triggering column's label
   */
  public ParamChoice(ParameterStore parameterStore, KeyValuePairNum[] content, String keyName) {
    this(parameterStore, transform(content), keyName);
    intKey = true;
  }

 /**
   * @param parameterStore the data object to assign to
   * @param keyName the triggering column's name
   * @param label the the triggering column's label
   */
  public ParamChoice(ParameterStore parameterStore, KeyValuePairAlpha[] content, String keyName) {
    super(content);
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
    if (intKey) {
      setSelectedItemKey(Integer.toString(parameterStore.getValueAsInt(keyName)));
    } else {
      setSelectedItemKey(parameterStore.getValue(keyName));
    }
  }

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    if (intKey) {
      parameterStore.setValue(keyName, Integer.valueOf(getSelectedItemKey()));
    } else {
      parameterStore.setValue(keyName, getSelectedItemKey());
    }
  }

}
