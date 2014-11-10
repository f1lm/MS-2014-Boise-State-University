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

package de.must.appletserver;

import java.util.Vector;

import de.must.applet.Constants;
import de.must.dataobj.Identifier;

/**
 * Component for listing data to select entries for further processing.
 * @author Christoph Mueller
 */
public abstract class ListRemoteUserInterface extends RemoteUserInterface {

  public static final int BUILD_STATUS_EMPTY_LIST_TO_BUILD = 0;
  public static final int BUILD_STATUS_UPDATE = 1;
  public static final int BUILD_STATUS_NEW_SELECT = 2;
  public static final int BUILD_STATUS_COMPLETE_BUILD_NECESSARY = 5;
  public static final int BUILD_STATUS_NOTHING_TO_DO = 9;

  protected int buildStatus = BUILD_STATUS_EMPTY_LIST_TO_BUILD;
  protected boolean sqlSyntaxError;
  protected Vector<Identifier> identifiers;

  public ListRemoteUserInterface(SessionData sessionData, ContextInfo contextInfo) {
    super(sessionData, contextInfo);
  }

  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    String ids = request.getParameter(Constants.IDENTIFIER);
    if (ids != null) identifiers = Identifier.parseToVector(ids);
    else identifiers = null;
    super.fetchValuesFromRequest(request);
  }
}
