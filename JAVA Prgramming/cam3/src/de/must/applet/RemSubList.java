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

import java.io.IOException;
import java.util.Vector;

import javax.swing.event.ListSelectionEvent;

import de.must.dataobj.Identifier;
import de.must.io.Logger;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.MustList;

public class RemSubList extends MustList implements RemoteGUIComponent {
  
  protected String title;
  private Vector<Identifier> identifiers = new Vector<Identifier>();
  private boolean programmaticChange;
  private Identifier lastIdentifier;

  public RemSubList(String title) {
    this.title = title;
  }
  
  @Override
  public String getId() {
    return null; // not needed here
  }
 
  @Override
  public void removeAll() {
    super.removeAll();
    identifiers.clear();
  }

  public void addItem(Identifier identifier, String item) {
    identifiers.add(identifier);
    addItem(item);
  }

  @Override
  public void valueChanged(ListSelectionEvent e) {
    super.valueChanged(e);
    if (getSelectedIndex() >= 0) {
      lastIdentifier = identifiers.get(getSelectedIndex());
    }
    if (!programmaticChange && getSelectedIndex() >= 0) {
      Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
      params.add(new KeyValuePairAlpha(Constants.TAB_OR_WINDOW_ID, title));
      params.add(new KeyValuePairAlpha(Constants.ACTION, Constants.ACTION_SUBSELECT));
      extendParams(params);
      try {
        AppletGlobal.getInstance().contactServer(params);
      } catch (IOException e1) {
        Logger.getInstance().error(getClass(), e);
      }
    }
  }

  @Override
  public void setEditable(boolean value) {
    // not needed here
  }

  @Override
  public void setValue(String value) {
    for (int i = 0; i < identifiers.size(); i++) {
      if (identifiers.get(i).equals(Identifier.parseString(value))) {
        programmaticChange = true;
        setSelectedIndex(i);
        ensureIndexIsVisible(i);
        programmaticChange = false;
        return;
      }
    }
  }

  @Override
  public boolean isModified() {
    return false; // no data to modify
  }

  @Override
  public void extendParams(Vector<KeyValuePairAlpha> params) {
    params.add(new KeyValuePairAlpha(Constants.IDENTIFIER, lastIdentifier.toString()));
  }

  @Override
  public void selectAll() {
  }

}
