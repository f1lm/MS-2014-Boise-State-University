/*
 * Copyright (c) 2010-2011 Christoph Mueller. All rights reserved.
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

import java.util.Hashtable;

import de.must.io.Logger;

public abstract class DataObjectWithGroupOverview extends DataObject {

  private static final int GROUPNI_BEGIN = -888;
  private static final int GROUPNI_END = -999;
  private String groupFieldName;
  private int lastGroupNi;
  private Hashtable<String, Object> originalBefore = new Hashtable<String, Object>();
  private Hashtable<String, Object> originalPreview = new Hashtable<String, Object>();
  private int groupItemCount;

  public DataObjectWithGroupOverview(DataObjectConstructionDetails dataObjectConstructionDetails) {
    super(dataObjectConstructionDetails);
  }

  public boolean selectForGroup(String groupFieldName) {
    this.groupFieldName = groupFieldName;
    lastGroupNi = GROUPNI_BEGIN;
    return super.select("*", (String)null, groupFieldName);
  }

  public boolean nextGroup() {
    groupItemCount = 0;
    cumulationReset();
    int currentGroupNi = 0;
    if (lastGroupNi  == GROUPNI_END) return false;
    if (lastGroupNi == GROUPNI_BEGIN) {
      if (nextRow()) {
        lastGroupNi = getInt(groupFieldName);
        groupItemCount++;
        additionalCumulation();
        originalBefore = new Hashtable<String, Object> (original);
      } else {
        return false;
      }
    } else {
      groupItemCount = 1;
      original = originalPreview;
      originalBefore = new Hashtable<String, Object> (original);
      additionalCumulation();
    }
    boolean found = false;
    while ((found = nextRow()) && (currentGroupNi = getInt(groupFieldName)) == lastGroupNi) {
      Logger.getInstance().debug(getClass(), "Group field value: " + getTextNoMatterWhatTypeOfColumn(groupFieldName));
      if (currentGroupNi == lastGroupNi) {
        groupItemCount++;
        additionalCumulation();
      } else {
        cumulationReset();
      }
    }
    if (found){
      lastGroupNi = currentGroupNi;
      originalPreview = new Hashtable<String, Object> (original);
    }
    else lastGroupNi = GROUPNI_END;
    original = originalBefore;
    return true;
  }
  
  /**
   * Fill if you want more cumulation than only group item count.
   * @see cumulationReset() 
   */
  protected abstract void additionalCumulation();
  /**
   * Reset fields used for group cumulation.
   */
  protected abstract void cumulationReset();
  
  public int getGroupItemCount() {
    return groupItemCount;
  }

}
