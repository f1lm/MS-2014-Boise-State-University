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

package de.must.wuic;

import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.util.Iterator;
import java.util.Vector;

import de.must.dataobj.DataObject;
import de.must.dataobj.Identifier;
import de.must.dataobj.SelfChainingDataObject;
import de.must.util.Callback;

/**
 * A component to choose cleartext classification.
 * @author Christoph Mueller
 */
public class CleartextClassification {

  protected DataObject sourceDataObject;
  protected String niColumn;
  protected String visibleColumnName;
  protected String superordinateNiColumn;
  protected Vector<HalfDataComboBox> boxes = new Vector<HalfDataComboBox>();
  private int userDepth;
  private boolean programaticalChange = false;
  private int editBeginValue;
  private Callback callbackWhenSelected;

  public CleartextClassification(SelfChainingDataObject sourceDataObject, String visibleColumnName, int depth) {
    super();
    this.sourceDataObject = sourceDataObject;
    this.niColumn = sourceDataObject.getUniqueKeyName();
    this.visibleColumnName = visibleColumnName;
    this.superordinateNiColumn = sourceDataObject.getSuperordinateInternalNumberColumnName();
    for (int i = 0; i < depth; i++) {
      final HalfDataComboBox box = new HalfDataComboBox(sourceDataObject, visibleColumnName, visibleColumnName, false);
      boxes.add(box);
      box.addItemListener(new ItemListener() {
        public void itemStateChanged(ItemEvent e) {
          if (ItemEvent.SELECTED == e.getStateChange() && !programaticalChange) {
            performItemSelected(box);
          }
        }
      });
    }
    programaticalChange = true;
    boxes.get(0).fill(superordinateNiColumn + " = 0");
    programaticalChange = false;
    for (int i = 1; i < depth; i++) {
      boxes.get(i).setEnabled(false);
    }
  }
  
  public void setCallbackWhenSelected (Callback callbackWhenSelected) {
    this.callbackWhenSelected = callbackWhenSelected;
  }
  
  private void performItemSelected(HalfDataComboBox box) {
    programaticalChange = true;
    Iterator<HalfDataComboBox> iterator = boxes.iterator();
    while (iterator.hasNext() && iterator.next() != box) {} // ignore
    int superordinateNi = box.getSelectedIdentifier().getIntIdentifier();
    if (iterator.hasNext()) {
      HalfDataComboBox subBox = iterator.next();
      subBox.setEnabled(box.isSpecialChoice());
      // reload this box
      if (box.isSpecialChoice()) {
        subBox.fill(superordinateNiColumn + " = " + superordinateNi);
      } else {
        subBox.removeAllItems();
      }
      while (iterator.hasNext()) {
        HalfDataComboBox farBox = iterator.next();
        // reset this box
        farBox.removeAllItems();
      }
    }
    programaticalChange = false;
    if (callbackWhenSelected != null) {
      callbackWhenSelected.callback();
    }
  }
  
  public void reload() {
    programaticalChange = true;
    Iterator<HalfDataComboBox> iterator = boxes.iterator();
    HalfDataComboBox lastBox = null;
    while (iterator.hasNext()) {
      HalfDataComboBox box = iterator.next();
      Identifier selId = box.getSelectedIdentifier();
      if (lastBox == null) {
        box.fill(superordinateNiColumn + " = 0");
        box.setSelectedIdentifier(selId);
      } else {
        if (lastBox.isSpecialChoice()) {
          box.fill(superordinateNiColumn + " = " + lastBox.getSelectedIdentifier().getIntIdentifier());
          box.setSelectedIdentifier(selId);
        } else {
          box.removeAllItems();
        }
      }
      lastBox = box;
    }
    programaticalChange = false;
  }
  
  /**
   * Adds the component to an attribute list
   * @param attributeList the attribute list to be extended
   * @param label the label of the component's row
   */
  public void addTo(AttributeList attributeList, String label) {
    Iterator<HalfDataComboBox> iterator = boxes.iterator();
    if (iterator.hasNext()) {
      attributeList.append(label, iterator.next());
      while (iterator.hasNext()) {
        attributeList.append(iterator.next());
      }
    }
  }
  
  public void setEditable(boolean editable) {
  }
  
  public void setSelectedInternalNumber(int internalNumber) {
    editBeginValue = internalNumber;
    if (internalNumber == 0) {
      Iterator<HalfDataComboBox> iterator = boxes.iterator();
      if (iterator.hasNext()) {
        HalfDataComboBox box = iterator.next();
        box.setSelectedIndex(0);
      }
      while (iterator.hasNext()) {
        HalfDataComboBox box = iterator.next();
        if (box.getItemCount() > 0) box.setSelectedIndex(0);
        box.setEnabled(false);
      }
    } else {
      Vector<Identifier> chain = new Vector<Identifier>();
      chain.add(new Identifier(internalNumber));
      while(sourceDataObject.load(internalNumber) && (internalNumber = sourceDataObject.getInt(superordinateNiColumn)) != 0) {
        chain.add(new Identifier(internalNumber));
      }
      int j = -1;
      for (int i = chain.size() -1 ; i >= 0; i--) {
        j++;
        boxes.elementAt(j).setSelectedIdentifier(chain.elementAt(i));
        boxes.elementAt(j).setEnabled(true);
      }
      if (j < boxes.size() - 1) {
        boxes.elementAt(j+1).setEnabled(j < 0 || boxes.elementAt(j).isSpecialChoice());
      }
      for (int i = chain.size(); i < boxes.size(); i++) {
        HalfDataComboBox box = boxes.elementAt(i);
        if (box.getItemCount() > 0) box.setSelectedIndex(0);
        box.setEnabled(i == 0 || boxes.elementAt(i-1).isSpecialChoice());
      }
    }
  }
  
  public int getSelectedInternalNumber() {
    int result = 0;
    Iterator<HalfDataComboBox> iterator = boxes.iterator();
    while (iterator.hasNext()) {
      HalfDataComboBox box = iterator.next();
      if (box.isSpecialChoice()) {
        result = box.getSelectedIdentifier().getIntIdentifier();
      } else {
        break;
      }
    }
    return result;
  }

  public boolean isModified() {
    return getSelectedInternalNumber() != editBeginValue;
  }

}
