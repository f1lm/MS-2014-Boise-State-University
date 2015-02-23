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

package de.must.applet;

import java.util.StringTokenizer;
import java.util.Vector;

import javax.swing.DefaultListModel;

import de.must.util.KeyValuePairAlpha;
import de.must.wuic.TwoListTransformer;

public class RemTwoListTransformer extends TwoListTransformer implements RemoteGUIComponent {

  private String id;
  protected String editBeginValue;
  private String selected;
  
  public RemTwoListTransformer(String id) {
    super(AppletGlobal.getInstance());
    this.id = id;
  }
  
  @Override
  public String getId() {
    return id;
  }
 
  @Override
  public void setValue(String value) {
    editBeginValue = value;
    model1.clear();
    model2.clear();
    StringTokenizer tokenizer = new StringTokenizer(value, Constants.NEW_LINE);
    fill(model1, tokenizer.nextToken());
    if (tokenizer.hasMoreTokens()) fill(model2, tokenizer.nextToken());
  }
  
  private void fill(DefaultListModel<String> model, String data) {
    StringTokenizer tokenizer = new StringTokenizer(data, " ,;-");
    while (tokenizer.hasMoreTokens()) {
      String token = tokenizer.nextToken();
      model.addElement(token);
    }
  }

  @Override
  public void setEditable(boolean value) {
  }

  @Override
  public boolean isModified() {
    updateSelected();
    return !selected.equals(editBeginValue);
  }
  
  private void updateSelected() {
    selected = "";
    for (int i = 0; i < model2.getSize(); i++) {
      if (selected.length() > 0) selected += ", ";
      selected += model2.get(i);
    }
  }

  @Override
  public void extendParams(Vector<KeyValuePairAlpha> params) {
    if (isModified()) {
      String result = "";
      for (int i = 0; i < model2.getSize(); i++) {
        if (result.length() > 0) result += ", ";
        result += model2.get(i);
      }
      params.add(new KeyValuePairAlpha(id, result));
    }
  }

  @Override
  public void selectAll() {
    // not needed here
  }

}
