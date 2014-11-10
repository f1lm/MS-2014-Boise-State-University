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

import java.util.Vector;

import de.must.dataobj.AbstractAttribute;
import de.must.dataobj.ParamComponent;
import de.must.middle.ParameterStore;

public class TwoListTransformerAsParameter extends TwoListTransformer implements ParamComponent {
  
  private static synchronized Vector<String> getVectorFor(AbstractAttribute[] attributes) {
    Vector<String> result = new Vector<String>();
    for (int i = 0; i < attributes.length; i++) {
      result.add(attributes[i].getFieldName());
    }
    return result;
  }

  private ParameterStore.Entry parmEntry;
  private ParameterStore parameterStore;
  
  public TwoListTransformerAsParameter(SessionData sessionData, ParameterStore.Entry parmEntry, ParameterStore parameterStore, AbstractAttribute[] attributes) {
    this(sessionData, parmEntry, parameterStore, getVectorFor(attributes));
  }

  public TwoListTransformerAsParameter(SessionData sessionData, ParameterStore.Entry parmEntry, ParameterStore parameterStore, Vector<String> source) {
    super(sessionData, source);
    this.parmEntry = parmEntry;
    this.parameterStore = parameterStore;
  }

  @Override
  public ParameterStore getParameterStore() {
    return parameterStore;
  }

  @Override
  public void loadValue() {
    set(parameterStore.getValue(parmEntry.getKey()));
  }

  @Override
  public void saveValue() {
    parameterStore.setValue(parmEntry.getKey(), getSelected());
  }

}
