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

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Vector;

import de.must.applet.Constants;
import de.must.dataobj.DataObject;
import de.must.dataobj.Identifier;
import de.must.dataobj.SelfChainingDataObject;

/**
 * A table administration to administer multiple levels of a self-chaining table.
 * @author Christoph Mueller
 */
public abstract class DataClassificationAdministration extends DataTableAdministration {

  private static int NO_ITEMS = 0;
  private static int ITEMS_NOT_IN_USE = 1;
  private static int ITEMS_IN_USE = 2;

  protected AttributeList attributeList;
  protected CleartextClassification classification;
  
  public DataClassificationAdministration(SessionData sessionData, String tabIdAndLabel, String visibleColumnName, String superordinateNiColumn, int depth) {
    super(sessionData, tabIdAndLabel);
    getAssignedDataObject().setSilentUpdate(true);
    SelfChainingDataObject dataObjectForBoxes = getNewIndependentInstance();
    classification = new CleartextClassification(sessionData, dataObjectForBoxes, visibleColumnName, depth - 1); // last level = list to edit
    attributeList = new AttributeList(sessionData);
    classification.addTo(attributeList, getTranslation("TEXT_SUPERORDINATE"));
    MustButton buttonApply = addButton(getTranslation("TEXT_APPLY_BUTTON"), 0);
    buttonApply.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        apply();
        classification.reload();
        loadValues(); // otherwise OK will save twice!
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
  protected Vector<String> getColumnHeaders() {
    Vector<String> labels = new Vector<String>();
    labels.add(getTranslation("TEXT_DESCRIPTION"));
    return labels;
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

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    super.buildRemoteView(out);
    if (!buildDone) {
      out.println(Constants.ACTION_BEGIN_TAG);
      out.println(Constants.TODO_TAG_BEGIN + Constants.ADD_PANEL + Constants.TODO_TAG_END);
      // addFatherAndPosition(element, out);
      out.println(Constants.ACTION_END_TAG);
      attributeList.buildRemoteView(out);
      buildDone = true;
    } else {
      classification.updateRemoteView(out);
    }
  }

  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    classification.fetchValuesFromRequest(request);
    super.fetchValuesFromRequest(request);
  }

  @Override
  public void process(GeneralizedRequest request) {
    if (Constants.ACTION_ITEM_SELECTED.equals(sessionData.action)) {
      isToRenew = true;
      classification.perform(sessionData.action);
    } else {
      super.process(request);
    }
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
      int subResult = checkSubItems(doForSubAccess.getInt(aDO.getIdentifyTemplate().getIdentifyColumnNames()[0]));
      if (subResult == ITEMS_IN_USE) {
        doForSubAccess.closeQuery();
        return ITEMS_IN_USE;
      }
    }
    doForSubAccess.closeQuery();
    return result;
  }
  
  protected void saveDataObject() {
    getAssignedDataObject().setInt(getSuperordinateInternalNumberColumnName(), classification.getSelectedInternalNumber());
    super.saveDataObject();
  }
  
}