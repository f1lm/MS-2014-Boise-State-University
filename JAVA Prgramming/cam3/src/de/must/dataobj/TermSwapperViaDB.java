/*
 * Copyright (c) 2007 Christoph Mueller. All rights reserved.
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

package de.must.dataobj;

import java.util.StringTokenizer;

import de.must.util.StringFunctions;
import de.must.util.TermSwapping;

/**
 * Term swapper via cached database access. 
 * @author Christoph Mueller
 */
public class TermSwapperViaDB implements TermSwapping {
  
  private DataObjectForTermReplacement dataObjectForTermReplacement;
  private boolean anyEntry;
  
  public TermSwapperViaDB(DataObjectForTermReplacement dataObjectForTermReplacement) {
    this.dataObjectForTermReplacement = dataObjectForTermReplacement;
    dataObjectForTermReplacement.select(dataObjectForTermReplacement.getAttributes()[0].getFieldName());
    anyEntry = dataObjectForTermReplacement.nextRow();
    dataObjectForTermReplacement.closeQuery();
  }

  public synchronized String getReplacement(String originalTerm) {
    if (!anyEntry) return originalTerm;
    if (dataObjectForTermReplacement.loadByOriginalTerm(originalTerm)) {
      return dataObjectForTermReplacement.getTermNew();
    } else {
      return replaceWordByWord(originalTerm);
    }
  }
  
  private String replaceWordByWord(String originalTerm) {
    String newTerm = originalTerm;
    StringTokenizer tokenizer = new StringTokenizer(originalTerm, " ./-\t\n\r\f", false);
    if (tokenizer.countTokens() <= 1) return originalTerm; // only one word, return quickly
    while (tokenizer.hasMoreTokens()) {
      String nextToken = tokenizer.nextToken();
      if (dataObjectForTermReplacement.loadByOriginalTerm(nextToken)) {
        newTerm = StringFunctions.replaceAll(newTerm, nextToken, dataObjectForTermReplacement.getTermNew());
      }
    }
    return newTerm;
  }

}
