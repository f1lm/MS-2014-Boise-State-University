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
package de.must.dataobj;

import java.util.Vector;

/**
 * Self chaining data object.
 * Must delete sub items reciprocally to the detection.
 * This is controlled by boolean {@link #subDataObject}.
 * @author Christoph Mueller
 */
public abstract class SelfChainingDataObject extends DataObject {

  protected SelfChainingDataObject(DataObjectConstructionDetails dataObjectConstructionDetails) {
    super(dataObjectConstructionDetails);
  }
  
  protected abstract SelfChainingDataObject getNewIndependentInstance(); 
  public abstract String getSuperordinateInternalNumberColumnName(); 

  private boolean subDataObject = false;
  private Vector<Identifier> idsToDelete;
  
  public void setSubDataObject() {
    this.subDataObject = true;
  }

  @Override
  public boolean delete() {
    Identifier mainIdentifierToDelete = getIdentifier();
    if (!subDataObject) {
      idsToDelete = new Vector<Identifier>();
      addSubItems(getIdentifier());
      if (idsToDelete.size() > 0) {
        SelfChainingDataObject doForSubDeletion = getNewIndependentInstance();
        doForSubDeletion.setSubDataObject();
        doForSubDeletion.setSilentUpdate(true);
        for (int i = idsToDelete.size()-1; i >= 0; i--) {
          if (!doForSubDeletion.delete(idsToDelete.get(i))) return false; // no broken chain please
        }
      }
    }
    setIdentifier(mainIdentifierToDelete); // due to sub deletion and listener-based updates of comboxes this identifier could be manipulated during this method  
    return super.delete();
  }

  private void addSubItems(Identifier identifier) {
    SelfChainingDataObject doForSubAccess = getNewIndependentInstance();    
    doForSubAccess.select("*", getSuperordinateInternalNumberColumnName() + " = " + identifier.getIntIdentifier());
    while (doForSubAccess.nextRow()) {
      idsToDelete.add(doForSubAccess.getIdentifier());
      addSubItems(doForSubAccess.getIdentifier());
    }
    doForSubAccess.closeQuery();
  }

}
