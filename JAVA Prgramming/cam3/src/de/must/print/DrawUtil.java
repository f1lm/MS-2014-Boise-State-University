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

package de.must.print;

import java.awt.Graphics2D;
import java.util.StringTokenizer;
import java.util.Vector;

import de.must.util.StringFunctions;

public class DrawUtil {

	public static synchronized String[] wrapText(String textToPrint, Graphics2D g2d, int maxPixel) {
    Vector<String> linVect = new Vector<String>();
    textToPrint = StringFunctions.replaceAll(textToPrint, "\t", "      "); // may occur with text entered by TextArea
    if (fits(g2d, textToPrint, maxPixel)) {
      return new String[] { textToPrint };
    } else { // wrap text
      StringTokenizer tokenizer = new StringTokenizer(textToPrint, " \t\n\r\f",
          true);
      StringBuffer line = new StringBuffer();
      String li = "";
      while (tokenizer.hasMoreTokens()) {
        String nextToken = tokenizer.nextToken();
        line.append(nextToken);
        if (nextToken.equals("\n")
            || (li.length() != 0 && !fits(g2d, line.toString(), maxPixel))) { // do not feed line of the token itself is already too long
          linVect.add(li);
          line = new StringBuffer();
          line.append(nextToken.trim());
        }
        li = line.toString();
      }
      if (li.length() > 0)
        linVect.add(li);
    }

    String[] lines = new String[linVect.size()];
    for (int i = 0; i < lines.length; i++) {
      lines[i] = (String) linVect.get(i);
    }
    return lines;
  }

  private static boolean fits(Graphics2D g2d, String text, int maxPixel) {
    return g2d.getFontMetrics().stringWidth(text) < maxPixel;
  }
  
}
