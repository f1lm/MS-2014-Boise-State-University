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

public class MustTextArea extends MustTextField {

  public MustTextArea(SessionData sessionData) {
    this(sessionData, null);
  }

  /**
   * Constructs a new text area with a default width of 60 characters and
   * default height of 3 rows with the initial text as specified.
   * @param info the initial text
   */
  public MustTextArea(SessionData sessionData, String info) {
    this(sessionData, info, 60, 3, 9999999);
  }

  /**
   * Constructs a new text area with a size as specified.
   * @param rows the number of rows used for rendering
   * @param columns the number of columns to determine the width
   * @param maxChars the maximum number of characters for input
   */
  public MustTextArea(SessionData sessionData, int rows, int columns, int maxChars) {
    this(sessionData, null, rows, columns, maxChars);
  }

  /**
   * Constructs a new text area with initial text and size as specified.
   * @param text the initial text of the text area
   * @param rows the number of rows used for rendering
   * @param columns the number of columns to determine the width
   * @param maxChars the maximum number of characters for input
   */
  public MustTextArea(SessionData sessionData, String text, int rows, int columns, int maxChars) {
    // super(sessionData, text, rows, (int)(columns / fontFactor));
    super(sessionData);
//    this.maxChars = maxChars;
//    setLineWrap(true);
//    setWrapStyleWord(true);
//    if (GlobalStd.fatCaret) setCaret(new MustCaret());
//    addKeyListener(this);
//    setFont((new MustTextField()).getFont());
//    try {
//      thisToolkit = this.getToolkit();
//    }
//    catch (Exception e) {
//      de.must.io.Logger.getInstance().error(getClass(), e);
//    };
//    rightMouseProvider = RightMouseProvider.provide(this, versionController);
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TODO_TAG_BEGIN + Constants.CREATE_TEXTAREA + Constants.TODO_TAG_END);
    out.println(Constants.ID_TAG_BEGIN + name + Constants.ID_TAG_END);
    out.println(Constants.FIELD_LENGTH_BEGIN + size + Constants.FIELD_LENGTH_END);
    out.println(Constants.ACTION_END_TAG);
  }
  
}
