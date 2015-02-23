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
 * @author Christoph Mueller
 */
public class MustPasswordField extends MustTextField {

  /**
   * Constructs a new text field with a default length of 20 characters.
   */
  public MustPasswordField(SessionData sessionData) {
    this(sessionData, 20);
  }

  /**
   * Constructs a new text field with the length as specified.
   * @param length the length of the text field
   */
  public MustPasswordField(SessionData sessionData, int length) {
    this(sessionData, length, length);
  }

  /**
   * Constructs a new text field with the specified size and max length.
   * @param size rendering relevant size of the text field
   * @param maxlength input control relevant max length of the text field
   */
  public MustPasswordField(SessionData sessionData, int size, int maxlength) {
    this(sessionData, size, maxlength, false);
  }
  
  /**
   * Constructs a new text field with length, max chars and length control as specified.
   * length control.
   * @param length the length (size) of the text field
   * @param maxChars the max characters to be inserted
   * @param controlLength if true, characters are removed, if they exceed the
   * max char specification above
   */
  public MustPasswordField(SessionData sessionData, int size, int maxlength, boolean controlLength) {
    super(sessionData);
    this.size = size;
    this.maxlength = maxlength;
    if (this.size > maxColumns ) this.size = maxColumns;
  }
  
  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TODO_TAG_BEGIN + Constants.CREATE_PASSWORDFIELD + Constants.TODO_TAG_END);
    out.println(Constants.ID_TAG_BEGIN + name + Constants.ID_TAG_END);
    out.println(Constants.FIELD_LENGTH_BEGIN + size + Constants.FIELD_LENGTH_END);
    if (registerFlag) {
      out.println(Constants.VARIANT1_TAG_BEGIN + Constants.REGISTER + Constants.VARIANT1_TAG_END);
    }
    if (toolTipText != null) {
      out.println(Constants.VARIANT2_TAG_BEGIN + toolTipText + Constants.VARIANT2_TAG_END);
    }
    out.println(Constants.ACTION_END_TAG);
  }
  
  public String getPasswordText() {
    return getText();
  }
  
}
