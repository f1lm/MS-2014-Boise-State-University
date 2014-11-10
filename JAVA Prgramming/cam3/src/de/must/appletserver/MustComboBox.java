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

import java.util.Iterator;
import java.util.Vector;

import de.must.applet.Constants;

public class MustComboBox extends RemoteElement implements Updatable, ActionInterpreter {
  
  protected Vector<String> items;
  protected String value;
  private RemoteItemListener itemListener;

  public MustComboBox(SessionData sessionData) {
    this(sessionData, new Vector<String>());
  }
  
  public MustComboBox(SessionData sessionData, Vector<String> items) {
    super(sessionData);
    this.items = items;
  }

  public void removeAllItems() {
    items.clear();
  }

  public void addItem(String item) {
    items.add(item);
    if (value == null) value = item; // default is first item
  }

  @Override
  public void setValues(ToAppletWriter out) {
    if (value != null) out.setValue(name, value);
  }

  /**
   * Selects the item at index <code>anIndex</code>.
   * @param anIndex  an integer specifying the list item to select
   */
  public void setSelectedIndex(int anIndex) {
    value = items.elementAt(anIndex);
  }
  
  public void setSelectedItem(String item) {
    value = item;
  }
  
  public String getSelectedItem() {
    return value;
  }
  
  public int getItemCount() {
    return items.size();
  }

  public String getItemAt(int index) {
    return items.elementAt(index);
  }

  /**
   * Sets the item listener (unique).
   * @param l the item listener
   */
  public void addItemListener(RemoteItemListener l) {
    itemListener = l;
  }
  
  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TODO_TAG_BEGIN + Constants.CREATE_COMBOBOX + Constants.TODO_TAG_END);
    out.println(Constants.ID_TAG_BEGIN + name + Constants.ID_TAG_END);
    if (toolTipText != null) {
      out.println(Constants.VARIANT2_TAG_BEGIN + toolTipText + Constants.VARIANT2_TAG_END);
    }
    if (itemListener != null) {
      out.println(Constants.VARIANT3_TAG_BEGIN + Constants.ITEM_LISTENER + Constants.VARIANT3_TAG_END);
    }
    out.println(Constants.ACTION_END_TAG);
    Iterator<String> iterator = items.iterator();
    while (iterator.hasNext()) {
      String item = iterator.next();
      out.println(Constants.ACTION_BEGIN_TAG);
      out.println(Constants.TODO_TAG_BEGIN + Constants.ADD_ITEM + Constants.TODO_TAG_END);
      out.println(Constants.VALUE_TAG_BEGIN + item + Constants.VALUE_TAG_END);
      out.println(Constants.ACTION_END_TAG);
    }
    super.buildRemoteView(out);
  }

  public void updateRemoteView(ToAppletWriter out) {
    out.sendContext(context);
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TODO_TAG_BEGIN + Constants.CLEAR_COMBOBOX + Constants.TODO_TAG_END);
    out.println(Constants.ID_TAG_BEGIN + name + Constants.ID_TAG_END);
    out.println(Constants.ACTION_END_TAG);
    Iterator<String> iterator = items.iterator();
    while (iterator.hasNext()) {
      String item = iterator.next();
      out.println(Constants.ACTION_BEGIN_TAG);
      out.println(Constants.TODO_TAG_BEGIN + Constants.ADD_ITEM + Constants.TODO_TAG_END);
      out.println(Constants.VALUE_TAG_BEGIN + item + Constants.VALUE_TAG_END);
      out.println(Constants.ACTION_END_TAG);
    }
    if (value != null) out.setValue(name, value); // value == null may be caused by empty combo box
  }

  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    String fetchedValue = (String)request.getParameter(name);
    if (fetchedValue != null) {
      value = fetchedValue;
    }
  }

  @Override
  public boolean perform(String action) {
    if (Constants.ACTION_ITEM_SELECTED.equals(action) && name.equals(sessionData.actionSource)) {
      if (itemListener != null) {
        itemListener.itemStateChanged();
        return true;
      }
    }
    return false;
  }

  @Override
  public void selectAll() {
    // not necessary here
  }

  @Override
  public void requestFocus() {
    // not necessary here
  }

  @Override
  public void destroy() {
  }

}
