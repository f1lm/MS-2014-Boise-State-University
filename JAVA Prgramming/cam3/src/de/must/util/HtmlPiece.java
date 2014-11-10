/*
 * Copyright (c) 1999-2001 Christoph Mueller. All rights reserved.
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

import java.io.IOException;

import de.must.io.*;

/**
 * @author Christoph Mueller
 */
public class HtmlPiece {

  /**
   *
   */
  public Protocol htmlOutput;

  /**
   *
   * @param outputFileName
   * @throws IOException
   */
  public HtmlPiece(String outputFileName) throws IOException {
    htmlOutput = new Protocol(outputFileName);
  }

  /**
   *
   * @param outputFileName
   * @throws IOException
   */
  public void openOutputFile(String outputFileName) throws IOException {
    htmlOutput = new Protocol(outputFileName);
  }

  /**
   *
   * @param line
   */
  public void writeln(String line) {
    htmlOutput.addEntry(getHtmlRepresentation(line));
  }

  /**
   *
   * @param textToPresent
   * @return
   */
  public static synchronized String getHtmlRepresentation(String textToPresent) {
    char[] tempCharArray = textToPresent.toCharArray();
    String tempString = "";
    for (int i = 0; i < tempCharArray.length; i++) {
      if      (tempCharArray[i] == '\n') {
        tempString += "\n<br>";
      }
      else if (tempCharArray[i] == 'ä') {
        tempString += "&auml;";
      }
      else if (tempCharArray[i] == 'ö') {
        tempString += "&ouml;";
      }
      else if (tempCharArray[i] == 'ü') {
        tempString += "&uuml;";
      }
      else if (tempCharArray[i] == 'ß') {
        tempString += "&szlig;";
      }
      else if (tempCharArray[i] == 'Ä') {
        tempString += "&Auml;";
      }
      else if (tempCharArray[i] == 'Ö') {
        tempString += "&Ouml;";
      }
      else if (tempCharArray[i] == 'Ü') {
        tempString += "&Uuml;";
      }
      else if (tempCharArray[i] == '<') {
        tempString += "&lt;";
      }
      else if (tempCharArray[i] == '>') {
        tempString += "&gt;";
      }
      else {
        tempString += tempCharArray[i];
      }
    }
    return tempString;
  }

  /**
   *
   * @return
   */
  public void close() {
    htmlOutput.close();
    htmlOutput = null;
  }

}
