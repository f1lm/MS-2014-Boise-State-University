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

import de.must.applet.Constants;
import de.must.applet.DrawElement;

public class ServerDrawElement extends DrawElement {

  public ServerDrawElement(int posX, int posY, String text) {
    super(posX, posY, text);
  }
  
  public ServerDrawElement(int posX, int posY, String text, int fontSize) {
    super(posX, posY, text, fontSize);
  }

  public void buildRemoteView(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TODO_TAG_BEGIN + Constants.DRAW_ELEMENT + Constants.TODO_TAG_END);
    if (link != null) {
      out.println(Constants.ID_TAG_BEGIN + link + Constants.ID_TAG_END);
    }
    out.println(Constants.VALUE_TAG_BEGIN + text + Constants.VALUE_TAG_END);
    out.println(Constants.FIELD_LENGTH_BEGIN + Integer.toString(posX) + Constants.FIELD_LENGTH_END);
    out.println(Constants.VARIANT1_TAG_BEGIN + Integer.toString(posY) + Constants.VARIANT1_TAG_END);
    if (fontSize != 0) {
      out.println(Constants.VARIANT2_TAG_BEGIN + Integer.toString(fontSize) + Constants.VARIANT2_TAG_END);
    }
    out.println(Constants.ACTION_END_TAG);
  }
  
}
