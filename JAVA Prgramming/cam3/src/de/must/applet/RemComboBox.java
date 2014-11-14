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

import de.must.util.KeyValuePairAlpha;
import de.must.wuic.MustComboBox;

import java.awt.EventQueue;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.util.Vector;

public class RemComboBox extends MustComboBox implements RemoteGUIComponent {

  private String id;
  protected String editBeginValue;
  private boolean programaticalItemChange;
  
  public RemComboBox(String id) {
    this.id = id;
  }

  @Override
  public String getId() {
    return id;
  }
 
  public void addItemListener(final ServerCaller serverCaller) {
    addItemListener(new ItemListener() {
      public void itemStateChanged(ItemEvent e) {
        if (!programaticalItemChange && e.getStateChange() == ItemEvent.SELECTED) EventQueue.invokeLater(new Runnable() {
          public void run() {
            Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
            params.add(new KeyValuePairAlpha(Constants.ACTION, Constants.ACTION_ITEM_SELECTED));
            params.add(new KeyValuePairAlpha(Constants.ACTION_SOURCE, RemComboBox.this.id));
            serverCaller.contactServer(params);
          }
        });
      }
    });
  }

  public void addItem(Object anObject) {
    programaticalItemChange = true;
    super.addItem(anObject);
    programaticalItemChange = false;
  }

  @Override
  public void setValue(String value) {
    editBeginValue = value;
    programaticalItemChange = true;
    setSelectedItem(value);
    programaticalItemChange = false;
  }

  @Override
  public boolean isModified() {
    if (!isEnabled()) return false;
    if (getSelectedItem() == null && editBeginValue == null) return false;
    return !getSelectedItem().equals(editBeginValue);
  }

  @Override
  public void extendParams(Vector<KeyValuePairAlpha> params) {
    if (isModified()) {
      params.add(new KeyValuePairAlpha(id, (String)getSelectedItem()));
    }
  }

  @Override
  public void selectAll() {
    // not needed here
  }

}