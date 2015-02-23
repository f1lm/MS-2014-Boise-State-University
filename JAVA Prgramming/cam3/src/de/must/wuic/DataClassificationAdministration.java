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

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import de.must.dataobj.DataObject;
import de.must.dataobj.Identifier;
import de.must.dataobj.SelfChainingDataObject;
import de.must.util.Callback;

/**
 * A table administration to administer multiple levels of a self-chaining table.
 * @author Christoph Mueller
 */
public abstract class DataClassificationAdministration extends DataTableAdministration {

  private static int NO_ITEMS = 0;
  private static int ITEMS_NOT_IN_USE = 1;
  private static int ITEMS_IN_USE = 2;

  protected CleartextClassification classification;
  
  public DataClassificationAdministration(String visibleColumnName, String superordinateNiColumn, int depth) {
    getAssignedDataObject().setSilentUpdate(true);
    SelfChainingDataObject dataObjectForBoxes = getNewIndependentInstance();
    classification = new CleartextClassification(dataObjectForBoxes, visibleColumnName, depth - 1); // last level = list to edit
    AttributeList panel = new AttributeList();
    classification.addTo(panel, getTranslation("TEXT_SUPERORDINATE"));
    getContentPane().add(panel, BorderLayout.NORTH);
    MustButton buttonApply = new MustButton(getTranslation("TEXT_APPLY_BUTTON"));
    panelButtons.add(buttonApply, 0);
    buttonApply.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        apply();
        classification.reload();
        loadValues(); // otherwise OK will save twice!
        table.repaint(); // otherwise new value in new sort position not visible
      }
    });
    dataObjectForBoxes.setSilentUpdate(true);
    classification.setCallbackWhenSelected(new Callback() {
      public void callback() {
        stopCellEditing();
        loadValues();
        table.clearSelection();
        table.invalidate();
        table.repaint();
      }
    });
    mainTableModel.setCallbackBeforeSaving(new Callback() {
      public void callback() {
        getAssignedDataObject().setInt(getSuperordinateInternalNumberColumnName(), classification.getSelectedInternalNumber());
      }
    });
  }

  /**
   * Returns a new independent instance of the data object.
   * Necessary to separate access each level of self-chaining hierarchical objects.
   * @return a new independent instance of the data object
   */
  protected abstract SelfChainingDataObject getNewIndependentInstance(); 
  protected abstract String getSuperordinateInternalNumberColumnName();
  protected abstract boolean isInUseRegardedLevel(int regardedNi);

  @Override
  protected String[] getColumnLabels() {
    return new String[] {getTranslation("TEXT_DESCRIPTION")};
  }

  @Override
  protected int[] getPreferedColumnSize() {
    return new int[] {0};
  }

  @Override
  protected String getFilterCondition() {
    if (classification == null) return getSuperordinateInternalNumberColumnName() + " = 0"; // construction time
    return getSuperordinateInternalNumberColumnName() + " = " + classification.getSelectedInternalNumber();
  }

  protected boolean isInUse(Identifier keyIdentifier) {
    int id = keyIdentifier.getIntIdentifier();
    if (isInUseRegardedLevel(id)) return true;
    int checkResult = checkSubItems(id);
    return (checkResult == ITEMS_IN_USE);
  }
  
  private int checkSubItems(int regardedIdentifier) {
    if (isInUseRegardedLevel(regardedIdentifier)) return ITEMS_IN_USE;
    DataObject doForSubAccess = getNewIndependentInstance();    
    int result = NO_ITEMS;
    doForSubAccess.select("*", getSuperordinateInternalNumberColumnName() + " = " + regardedIdentifier);
    while (doForSubAccess.nextRow()) {
      result = ITEMS_NOT_IN_USE;
      int subResult = checkSubItems(doForSubAccess.getInt(assignedDataObject.getIdentifyTemplate().getIdentifyColumnNames()[0]));
      if (subResult == ITEMS_IN_USE) {
        doForSubAccess.closeQuery();
        return ITEMS_IN_USE;
      }
    }
    doForSubAccess.closeQuery();
    return result;
  }

}
