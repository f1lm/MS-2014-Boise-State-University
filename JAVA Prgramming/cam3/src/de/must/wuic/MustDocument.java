/*
 * Copyright (c) 2005-2007 Christoph Mueller. All rights reserved.
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

package de.must.wuic;

import javax.swing.text.AttributeSet;
import javax.swing.text.BadLocationException;
import javax.swing.text.PlainDocument;

public class MustDocument extends PlainDocument {
  
  private boolean capitalization;
  private int maxLength;
  
  /**
   * Constructs a new MustDocument.
   */
  public MustDocument() {
    this(true);
  }
  
  /**
   * Constructs a new MustDocument with capitalization functionality as specified.
   * @param capitalization whether or not input should be transformed in capitals
   */
  public MustDocument(boolean capitalization) {
    this(capitalization, 0);
  }
  
  /**
   * Constructs a new MustDocument with capitalization functionality as specified.
   * @param capitalization whether or not input should be transformed in capitals
   */
  public MustDocument(boolean capitalization, int maxLength) {
    this.capitalization = capitalization;
    this.maxLength = maxLength;
  }
  
  /* (non-Javadoc)
   * @see javax.swing.text.Document#insertString(int, java.lang.String, javax.swing.text.AttributeSet)
   */
  public void insertString(int offs, String str, AttributeSet a) throws BadLocationException {
		char[] chars = str.toCharArray();
    if (capitalization) {
  		for (int i = 0; i < chars.length; i++) {
  		  chars[i] = Character.toUpperCase(chars[i]);
  		}
    }
    if (maxLength == 0 || (str != null && str.length() + getLength() <= maxLength)) {
      super.insertString(offs, new String(chars), a);
    }
  }
  
}
