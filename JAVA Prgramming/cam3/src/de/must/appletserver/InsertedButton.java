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

/**
 * A button which may be integrated into standard buttons using a position as specified.
 * @author Christoph Mueller
 */
public class InsertedButton extends MustButton {
  
  private int index;
  
  /**
   * Constructs a new button which will be integrated to standard buttons at the position as specified by index.
   * @param label
   * @param name   
   * @param index  the position at which to insert the button 
   */
  public InsertedButton(String label, int index) {
    super(label);
    this.index = index;
  }

  public InsertedButton(String imageName, String fallbackLabel, int index) {
    super(imageName, fallbackLabel);
    this.index = index;
  }
  
  public void buildRemoteView(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TODO_TAG_BEGIN + Constants.CREATE_BOTTOM_BUTTON + Constants.TODO_TAG_END);
    out.println(Constants.LABEL_BEGIN + label + Constants.LABEL_END);
    out.println(Constants.ID_TAG_BEGIN + actionID + Constants.ID_TAG_END);
    out.println(Constants.VALUE_TAG_BEGIN + index + Constants.VALUE_TAG_END);
    out.println(Constants.VARIANT3_TAG_BEGIN + listDependenceType + Constants.VARIANT3_TAG_END);
    if (imageName != null) {
      out.println(Constants.VARIANT1_TAG_BEGIN + imageName + Constants.VARIANT1_TAG_END);
    }
    if (toolTipText != null) {
      out.println(Constants.VARIANT2_TAG_BEGIN + toolTipText + Constants.VARIANT2_TAG_END);
    }
    out.println(Constants.ACTION_END_TAG);
  }

}
