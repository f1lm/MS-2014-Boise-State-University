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

import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.io.IOException;
import java.util.Vector;

import de.must.io.Logger;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.MustCheckBox;

public class RemCheckBox extends MustCheckBox implements RemoteGUIComponent {
  
  private boolean programaticalItemChange;
  private String id;
  private InputInlay inlay;
  private boolean editBeginValue;
  
  public RemCheckBox(String id, String label) {
    this(id, label, null);
  }
  
  public RemCheckBox(String id, String label, InputInlay inlay) {
    super(label);
    this.id = id;
    this.inlay = inlay;
    if (inlay != null) {
      addItemListener(new ItemListener() {
        public void itemStateChanged(ItemEvent arg0) {
          if (!programaticalItemChange) {
            Vector<KeyValuePairAlpha> params = RemCheckBox.this.inlay.getSynchParams();
            params.add(new KeyValuePairAlpha(Constants.ACTION, Constants.ACTION_ITEM_SELECTED));
            params.add(new KeyValuePairAlpha(Constants.ACTION_SOURCE, RemCheckBox.this.id));
            try {
              AppletGlobal.getInstance().contactServer(params);
            } catch (IOException e) {
              Logger.getInstance().error(getClass(), e);
            }
          }
        }
      });
    }
  }
  
  @Override
  public String getId() {
    return id;
  }
 
  public void selectAll() {
    // not necessary
  }
  
  @Override
  public void setEditable(boolean value) {
    // not needed here
  }

  @Override
  public void setValue(String value) {
    programaticalItemChange = true;
    setSelected(editBeginValue = Boolean.parseBoolean(value));
    programaticalItemChange = false;
  }

  @Override
  public boolean isModified() {
    return (!isSelected() && editBeginValue) | (isSelected() && !editBeginValue);
  }

  @Override
  public void extendParams(Vector<KeyValuePairAlpha> params) {
    if (isModified()) {
      params.add(new KeyValuePairAlpha(id, Boolean.toString(isSelected())));
    }
  }

}
