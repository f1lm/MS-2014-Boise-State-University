/*
 * Copyright (c) 2014 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.DataObject;
import de.must.dataobj.SelfChainingDataObject;

/**
 * Work in progress.
 * @author Christoph Mueller
 */
public class DataCleartextClassification extends CleartextClassification implements DataComponent, Storable {
  
  private DataObject assignedDataObject;
  private String assignedColumnName;

  public DataCleartextClassification(SessionData sessionData, DataObject assignedDataObject, String assignedColumnName, SelfChainingDataObject sourceDataObject, String niColumn, String visibleColumnName, int depth) {
    super(sessionData, sourceDataObject, visibleColumnName, depth);
    this.assignedDataObject = assignedDataObject;
    this.assignedColumnName = assignedColumnName;
  }

  @Override
  public DataObject getAssignedDataObject() {
    return assignedDataObject;
  }

  @Override
  public void setRequired(boolean required) {
  }

  @Override
  public void loadValue() {
    setSelectedInternalNumber(assignedDataObject.getInt(assignedColumnName));
  }

  @Override
  public boolean isFilled() {
    return true;
  }

  @Override
  public boolean isToSave() {
    return true;
  }

  @Override
  public boolean isContentValid() {
    return true;
  }

  @Override
  public boolean isRequirementUnfulfilled() {
    return false;
  }

  @Override
  public void selectAll() {
  }

  @Override
  public void requestFocus() {
  }

  @Override
  public boolean isValid() {
    return true;
  }

  @Override
  public void saveValue() {
    assignedDataObject.setInt(assignedColumnName, getSelectedInternalNumber());
  }

  @Override
  public void setToolTipText(String toolTipText) {
  }

  public void addComponentModificationListener(ComponentModificationListener l) {
  }

  public void removeComponentModificationListener(ComponentModificationListener l) {
  }

  @Override
  public void free() {
  }

}
