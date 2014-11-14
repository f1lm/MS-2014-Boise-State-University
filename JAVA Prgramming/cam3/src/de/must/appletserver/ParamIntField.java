/*
 * Copyright (c) 2011-2012 Christoph Mueller. All rights reserved.
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

/**
 * @author Christoph Mueller
 */
public class ParamIntField extends MustIntField implements ParamComponent {

  private ParameterStore parameterStore;
  private String keyName;

  public ParamIntField(SessionData sessionData, ParameterStore parameterStore, ParameterStore.Entry parmEntry) {
    super(sessionData);
    this.parameterStore = parameterStore;
    this.keyName = parmEntry.getKey();
  }

 /**
   * @param parameterStore the data object to assign to
   * @param keyName the triggering column's name
   * @param label the the triggering column's label
   */
  public ParamIntField(SessionData sessionData, ParameterStore parameterStore, String keyName) {
    super(sessionData);
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
    setIntValue(parameterStore.getValueAsInt(keyName));
  }

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    parameterStore.setValue(keyName, getIntValue());
  }

}
