/*
 * Copyright (c) 2001-2003 Christoph Mueller. All rights reserved.
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
 * A frame-like container to layout components in labled lines to present properties.
 * @author Christoph Mueller
 */
public abstract class PropertyPresentation extends Dialog {

  protected AttributeList currentAttributeList = new AttributeList();
  protected int dialogNbr;
  protected boolean wantToBeFinalized = false;

  /**
   * Constructs a new property presentation object.
   * @param sessionData the session's public data
   */
  public PropertyPresentation(SessionData sessionData) {
    super(sessionData);
  }

  /**
   * Returns the used attribute list.
   * @return the used attribute list
   */
  public AttributeList getAttributeList() {
    return currentAttributeList;
  }

  /**
   * Causes the invokable to delegate this function to all embedded markupables
   * to fetch their current value as edited by the user from the request.
   * @param request the request from where the values are to be fetched
   * @see Markupable#fetchYourValueFromRequest
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    currentAttributeList.fetchValuesFromRequest(request);
    super.fetchValuesFromRequest(request);
  }

  /**
   * Returns true if the invokable wants to be finalized after request is worked off.
   * @return true if the invokable wants to be finalized
   */
  public boolean wantToBeFinalized() {
    return wantToBeFinalized;
  }

}
