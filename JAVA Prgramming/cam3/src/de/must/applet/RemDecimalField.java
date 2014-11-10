/*
 * Copyright (c) 2012 Christoph Mueller. All rights reserved.
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

package de.must.applet;

import java.text.ParseException;
import java.util.Vector;

import de.must.io.Logger;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.MustDecimalField;

public class RemDecimalField extends MustDecimalField implements RemoteGUIComponent {

  private String id;
  
  public RemDecimalField(String id) {
    this.id = id;
  }

  @Override
  public String getId() {
    return id;
  }
 
  @Override
  public void setValue(String value) {
    super.setTextAsEditBeginValue(value);
    try {
      double dValue = getDoubleValue(); // formatting!
      setDoubleAsEditBeginValue(dValue);
    } catch (ParseException e) {
      Logger.getInstance().error(getClass(), e);
    }
  }

  @Override
  public void extendParams(Vector<KeyValuePairAlpha> params) {
    if (isModified()) {
      params.add(new KeyValuePairAlpha(id, getText()));
    }
  }

}
