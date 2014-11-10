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

package de.must.applet;

import java.util.Vector;

import de.must.util.KeyValuePairAlpha;
import de.must.util.StringFunctions;
import de.must.wuic.MustTextField;

/**
 * The remote text field in the point if view of the server.
 * @author Christoph Mueller
 */
public class RemTextField extends MustTextField implements RemoteGUIComponent {

  private String id;
  /**
   * The content of the text field after last server contact.
   * In opposite to this, the editBeginValue may be the same over multiple server contacts.
   * editBeginValue influences, whether dialog can be canceled, stepBeginValue 
   * influences the need to send changed value to the server. 
   */
  protected String stepBeginValue = "";
  
  public RemTextField(String id, int length) {
    super(length);
    this.id = id;
  }

  @Override
  public String getId() {
    return id;
  }
 
  @Override
  public void setValue(String value) {
    setTextAsEditBeginValue(StringFunctions.replaceAll(value, Constants.NEW_LINE, "\n"));
    stepBeginValue = value;
  }
  
  public void setValue(String value, String editBeginValue) {
    setText(StringFunctions.replaceAll(value, Constants.NEW_LINE, "\n"));
    this.editBeginValue = editBeginValue;
    stepBeginValue = value;
  }
  
  @Override
  public void extendParams(Vector<KeyValuePairAlpha> params) {
    if (!getText().equals(stepBeginValue) || isModified()) {
      params.add(new KeyValuePairAlpha(id, getText()));
    }
    if (hasFocus()) {
      params.add(new KeyValuePairAlpha(Constants.FOCUS_ELEMENT_ID, id));
    }
  }

}
