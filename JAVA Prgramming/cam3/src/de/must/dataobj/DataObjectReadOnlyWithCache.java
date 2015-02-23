/*
 * Copyright (c) 2004-2013 Christoph Mueller. All rights reserved.
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

/**
 * DataObject for read-only access with caching.
 * @author Christoph Mueller
 */
public abstract class DataObjectReadOnlyWithCache extends DataObject {
  
  private Hashtable<Identifier, Hashtable<String, Object>> rows;
  private int initialSize;
  private DataChangeListener dataChangeListener; // only to prevent being garbage collected
  
  public DataObjectReadOnlyWithCache(DataObjectConstructionDetails dataObjectConstructionDetails, int maxColumns) {
    this(dataObjectConstructionDetails, maxColumns, 300);
  }
  
  public DataObjectReadOnlyWithCache(DataObjectConstructionDetails dataObjectConstructionDetails, int maxColumns, int initialSize) {
    super(dataObjectConstructionDetails, maxColumns);
    this.initialSize = initialSize;
    rows = new  Hashtable<Identifier, Hashtable<String, Object>>(initialSize);
    addDataChangeListener(dataChangeListener = new DataChangeListener() {
      public void DataChangePerformed(DataChangedEvent e) {
        if (e.getEntityName().equals(getTableName())) {
          rows = new  Hashtable<Identifier, Hashtable<String, Object>>(DataObjectReadOnlyWithCache.this.initialSize);
        }
      }
    });
  }

  public boolean select(String fieldSelection, String whereCondition) {
    return super.select(fieldSelection, whereCondition);
  }
  
	/* (non-Javadoc)
	 * @see de.must.dataobj.DataObjectWorkCaching#load(de.must.dataobj.Identifier)
	 */
	public boolean load(Identifier identifier) {
    if (cacheLoad(identifier)) return true;
    boolean loaded = false;
    if (getReducedColumnSet() != null) {
      loaded = load(identifier, getReducedColumnSet());
    } else {
      loaded = super.load(identifier);
    }
		if (loaded) cachePut(identifier);
		return loaded;
	}
  
  /**
   * Return the reduced column set to optimize database access or null if all fields are needed.
   * @return the reduced column set
   */
  protected abstract String getReducedColumnSet();

  protected boolean cacheLoad(Identifier identifier) {
    Hashtable<String, Object> row;
    if ((row = (Hashtable<String, Object>)rows.get(identifier)) != null) {
      original = new Hashtable<String, Object>(row); // it is important to clone, otherwise we change the cached value by reading DataObject
      return true;
		}
    return false;
  }

  protected void cachePut(Identifier identifier) {
    rows.put(identifier, new Hashtable<String, Object>(original)); // it is important to clone, otherwise we only store a pointer to a unique original hashtable !!!
  }
  
	@Override
	public boolean save() {
    Logger.getInstance().error(getClass(), "cached data objects cannot be saved");
    return false;
	}

}
