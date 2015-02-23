/*
 * Copyright (c) 2007-2012 Christoph Mueller. All rights reserved.
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
import java.util.Vector;

public abstract class DataObjectForTermReplacement extends DataObjectReadOnlyWithCache {

  private Hashtable<String, Hashtable<String, Object>> rows;
  private Vector<String> notAvailable; 
  private DataChangeListener dataChangeListener; // only to prevent being garbage collected

  public DataObjectForTermReplacement(DataObjectConstructionDetails dataObjectConstructionDetails, int maxColumns, int initialSize) {
    super(dataObjectConstructionDetails, maxColumns, initialSize);
    init();
    addDataChangeListener(dataChangeListener = new DataChangeListener() {
      public void DataChangePerformed(DataChangedEvent e) {
        if (e.getEntityName().equals(getTableName())) {
          init();
        }
      }
    });
  }
  
  protected String getColumnNameForOriginalTerm() {
    return "TermOri";
  }

  protected String getColumnNameForNewTerm() {
    return "TermNew";
  }

  private void init() {
    rows = new  Hashtable<String, Hashtable<String, Object>>(10);
    notAvailable = new Vector<String>(300);
  }

  public boolean loadByOriginalTerm(String originalTerm) {
    if (notAvailable.contains(originalTerm)) return false;
    if (cacheLoad(originalTerm)) return true;
    boolean loaded = false;
    if (getReducedColumnSet() != null) {
      if (!select(getReducedColumnSet(), getColumnNameForOriginalTerm() + " = \'" + sqlSecure(originalTerm) + "\'")) return false; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
    } else {
      if (!select("*", getColumnNameForOriginalTerm() + " = \'" + sqlSecure(originalTerm) + "\'")) return false; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
    }
    loaded = this.nextRow();
    closeQuery();
    if (loaded) cachePut(originalTerm);
    else notAvailable.add(originalTerm);
    return loaded;
  }
  
  protected boolean cacheLoad(String originalTerm) {
    Hashtable<String, Object> row;
    if ((row = rows.get(originalTerm)) != null) {
      original = new Hashtable<String, Object>(row); // it is important to clone, otherwise we change the cached value by reading DataObject
      return true;
    }
    return false;
  }

  protected void cachePut(String originalTerm) {
    rows.put(originalTerm, new Hashtable<String, Object>(original)); // it is important to clone, otherwise we only store a pointer to a unique original hashtable !!!
  }
  
  public String getTermNew() {
    return getText(getColumnNameForNewTerm());
  }

  @Override
  protected String getReducedColumnSet() {
    return getColumnNameForNewTerm();
  }

}
