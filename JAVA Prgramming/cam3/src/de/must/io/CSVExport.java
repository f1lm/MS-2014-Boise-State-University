/*
 * Copyright (c) 2010 Christoph Mueller. All rights reserved.
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

package de.must.io;

public abstract class CSVExport {
  
  public static final char COLUMN_SEPARATOR = ';';
  public static final char[] criticalChars = {COLUMN_SEPARATOR, '\n', '\"'};

  public static String csvSecure(String column) {
    return csvSecure(column, new char[]{}); 
  }

  public static String csvSecure(String column, char[] additionalCriticalChars) {
    column = column.replace("\"", "\"\""); //$NON-NLS-1$ //$NON-NLS-2$
    boolean containsCriticalChars = false;
    for (int i = 0; i < criticalChars.length; i++) {
      if (column.indexOf(criticalChars[i]) != -1) {
        containsCriticalChars = true;
      }
    }
    for (int i = 0; i < additionalCriticalChars.length; i++) {
      if (column.indexOf(criticalChars[i]) != -1) {
        containsCriticalChars = true;
      }
    }
    if (containsCriticalChars) return "\"" + column + "\"";
    else return column;
  }

}
