/*
 * Copyright (c) 2011 Christoph Mueller. All rights reserved.
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

import java.util.StringTokenizer;
import java.util.Vector;

import de.must.applet.Constants;

public class TwoListTransformer extends RemoteElement {

  private Vector<String> allItems;
  private String deselected;
  private String selected;

  public TwoListTransformer(SessionData sessionData, Vector<String> allItems) {
    super(sessionData);
    this.allItems = allItems;
  }

  protected void set(String selected) {
    this.selected = selected;
    StringTokenizer tokenizer = new StringTokenizer(selected, " ,;-|");
    Vector<String> already = new Vector<String>();
    while (tokenizer.hasMoreTokens()) {
      String token = tokenizer.nextToken();
      already.add(token);
    }
    deselected = new String();
    for (int i = 0; i < allItems.size(); i++) {
      String field = allItems.elementAt(i);
      if (!already.contains(field)) {
        if (deselected.length() > 0) deselected += ", ";
        deselected += field;
      }
    }
  }
  
  protected String getSelected() {
    return selected;
  }
  
  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TODO_TAG_BEGIN + Constants.CREATE_TWO_LISTS + Constants.TODO_TAG_END);
    out.println(Constants.ID_TAG_BEGIN + name + Constants.ID_TAG_END);
    out.println(Constants.ACTION_END_TAG);
    super.buildRemoteView(out);
  }

  @Override
  public void setValues(ToAppletWriter out) {
    out.setValue(name, deselected + Constants.NEW_LINE + selected);
    super.setValues(out);
  }

  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    selected = request.getParameter(name);
  }

  @Override
  public void selectAll() {
    // not necessary here
  }

  @Override
  public void requestFocus() {
    // not necessary here
  }

  @Override
  public void destroy() {
  }

}
