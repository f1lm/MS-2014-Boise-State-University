/*
 * Copyright (c) 2004-2010 Christoph Mueller. All rights reserved.
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
package de.must.util;

import java.util.Iterator;
import java.util.StringTokenizer;
import java.util.Vector;

/**
 * @author Christoph Mueller
 */
public class LitaryTokanizer {
  
  private Vector<String> stopWords;
  private String delimiter;

  public LitaryTokanizer(String stopWordSequence) {
    this(stopWordSequence, null);
  }

	public LitaryTokanizer(String stopWordSequence, String delimiter) {
    this.delimiter = delimiter;
    stopWords = new Vector<String>();
    StringTokenizer st = new StringTokenizer(stopWordSequence);
    while (st.hasMoreTokens()) {
      stopWords.add(st.nextToken());
    }
    stopWords.add("-");
	}

  public String[] getWords(String expression) {
    StringTokenizer st;
    if (delimiter != null) {
      st = new StringTokenizer(expression, delimiter);
    } else {
      expression = cutAtTheEnd(expression, "."); // at the end in any case without dot
      char[] chars = expression.toCharArray();
      for (int i = 0; i < chars.length; i++) {
        if (
          !Character.isLetter(chars[i])
          && !Character.isDigit(chars[i])
          && chars[i] != '-'
          && chars[i] != '.'
        ) {
          chars[i] = ' ';
        }
      }
      st = new StringTokenizer(String.valueOf(chars));
    }
    Vector<String> buffer = new Vector<String>();
    while (st.hasMoreTokens()) {
      String token = st.nextToken().trim();
      token = cutAtTheEnd(token, ".");
      if (!stopWords.contains(token) && !buffer.contains(token)) {
        buffer.add(token);
      }
    }
    String[] result = new String[buffer.size()];
    int counter = -1;
    for (Iterator<String> iter = buffer.iterator(); iter.hasNext();) {
      counter++;
      result[counter] = iter.next();
  	}
    return result;
  }
  
  private String cutAtTheEnd(String stringToCut, String elementToRemove) {
    String result = stringToCut;
    while (result.endsWith(elementToRemove)) {
      result = result.substring(0, result.length() - elementToRemove.length());
    }
    return result;
  }
  
}
