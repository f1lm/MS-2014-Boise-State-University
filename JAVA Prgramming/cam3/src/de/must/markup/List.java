/*
 * Copyright (c) 2008-2011 Christoph Mueller. All rights reserved.
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

package de.must.markup;

/**
 * Class to present lists.
 * @author Christoph Mueller
 */
public abstract class List extends Dialog {

  protected String title;
  protected String bottomText;
  protected int listedRowCounter;
  protected String listCache;
  protected Invokable submitter;
  protected boolean wantToBeFinalized = false;

  /**
   * Constructs a new list.
   * @param sessionData the session's data to share
   */
  public List(SessionData sessionData) {
    super(sessionData);
  }

   /* (non-Javadoc)
   * @see de.must.markup.Dialog#init()
   */
  public void init() {
    super.init();
    listCache = null;
  }

  /* (non-Javadoc)
   * @see de.must.markup.Dialog#setTitle(java.lang.String)
   */
  public void setTitle(String title) {
    this.title = title;
  }

  /* (non-Javadoc)
   * @see de.must.markup.Dialog#getTitle()
   */
  public String getTitle() {
    return title;
  }

  /* (non-Javadoc)
   * @see de.must.markup.Invokable#setSubmitter(de.must.markup.Invokable)
   */
  public void setSubmitter(Invokable submitter) {
    this.submitter = submitter;
  }

  /**
   * Induces to start listing form beginning.
   * @return true if no exception occurred
   */
  protected abstract boolean startListFromBeginning();
  
  /**
   * Returns true if a row to list is available.
   * @return true if a row to list is available
   */
  protected abstract boolean isRowToListAvailable();
  
  /**
   * Returns the information to be displayed in one row.
   * It's public so that individual layout classes in other packages may access it.
   * @return the information to be displayed in one row
   */
  protected abstract String getRowString();
  
  /**
   * Returns the number of rows.
   * @return the number of rows
   */
  public int getNbrOfRows() {
    return listedRowCounter;
  }

  /**
   * Returns true if the list is empty.
   * @return true if the list is empty
   */
  public boolean isListEmpty() {
    return listedRowCounter == 0;
  }

  /**
   * Sets the bottom text.
   * @param bottomText The the bottom text to set
   */
  public void setBottomText(String bottomText) {
    this.bottomText = bottomText;
  }

  /**
   * Returns the bottom text.
   * @return the bottom text
   */
  public String getBottomText() {
    return bottomText;
  }

  /**
   * Returns the list cache.
   * @return the list cache
   */
  public String getListCache() {
    return listCache;
  }

  /**
   * Sets the page cache, which should be done by layout classes to avoid
   * unnecessarily repeated database enquiry.
   * @param newListCache the list cache to remind
   * @see Layout
   */
  public void setListCache(String newListCache) {
    listCache = newListCache;
  }

  /* (non-Javadoc)
   * @see de.must.markup.Dialog#process(de.must.markup.GeneralizedRequest)
   */
  public void process(GeneralizedRequest request) {
    super.process(request);
    if (request.getParameter(NAME_FOR_BACK_ACTION) != null) {
      setStackMovement(-1);
      return;
    }
  }

  /* (non-Javadoc)
   * @see de.must.markup.Dialog#fetchValuesFromRequest(de.must.markup.GeneralizedRequest)
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
  }

}
