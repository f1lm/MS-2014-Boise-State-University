/*
 * Copyright (c) 2013 Christoph Mueller. All rights reserved.
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

import java.awt.Font;
import java.awt.Graphics;

public class GraphicUtils {
  
  /**
   * Returns the max. part of a string fitting length as specified.
   * @param graphics the graphics context
   * @param font the font of the string to be truncated
   * @param string the string to be truncated
   * @param maxLength the max length of the result string
   * @return the truncated string
   */
  public static synchronized String getFittingString(Graphics graphics, Font font, String string, double maxLength) {
    if (graphics.getFontMetrics(font).stringWidth(string) <= maxLength) {
      return string; // quick return option
    }
    char[] charSource = string.toCharArray();
    StringBuffer resultBuffer = new StringBuffer();
    for (int i = 0; i < charSource.length; i++) {
       if (graphics.getFontMetrics(font).stringWidth(resultBuffer.toString() + charSource[i]) <= maxLength) {
         resultBuffer.append(charSource[i]);
       } else {
         break;
       }
    }
    return resultBuffer.toString();
  }
  
}
