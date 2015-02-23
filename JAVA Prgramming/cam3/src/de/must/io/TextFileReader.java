/*
 * Copyright (c) 2008-2012 Christoph Mueller. All rights reserved.
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

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;

/**
 * Reads text files line by line. Carriage return + line feed may be included in quotes in one line. 
 * @author Christoph Mueller
 */
public class TextFileReader {

  private boolean autoCorrectBadQuotes;
  private boolean linux = false;
  private InputStream is;
  private InputStreamReader isr;
  private BufferedReader bure;

  private int margin = 5; // maximum of foresighted reading
  private char[] charsForFurtherReading = new char[1000];
  private char[] charBuffer = new char[charsForFurtherReading.length + margin];
  private String currentLine = "";

  private int numRead = -2;
  private int bufferFill = 0;
  private int offset = 0;
  private boolean quoted = false;
  
  /**
   * Constructs a new text file reader and opens the file as specified searching in the path.
   * @param fileName the name of the file to use
   */
  public TextFileReader(File file) throws FileNotFoundException {
    this(file, null);
  }
  
  /**
   * Constructs a new text file reader and opens the file as specified searching in the path.
   * @param fileName the name of the file to use
   * @param charset the Charset to use
   */
  public TextFileReader(File file, Charset charset) throws FileNotFoundException {
    is = new FileInputStream(file);
    if (charset != null) {
      isr = new InputStreamReader(is, charset);
    } else {
      isr = new InputStreamReader(is);
    }
    if (System.getProperty("os.name").toLowerCase().indexOf("linux")!= -1) {
      linux = true;
    }
  }

  public TextFileReader(InputStreamReader isr) {
    this.isr = isr;
    if (System.getProperty("os.name").toLowerCase().indexOf("linux")!= -1) {
      linux = true;
    }
  }
  
  public TextFileReader(BufferedReader bure) {
    this.bure = bure;
    if (System.getProperty("os.name").toLowerCase().indexOf("linux")!= -1) {
      linux = true;
    }
  }
  
  
  /**
   * Whether or not bad quotes should automatically be corrected - will assume ";" starts new column.
   * @param autoCorrectBadQuotes whether or not bad quotes should automatically be corrected
   */
  public void setAutoCorrectBadQuotes(boolean autoCorrectBadQuotes) {
    this.autoCorrectBadQuotes = autoCorrectBadQuotes;
  }

  /**
   * Reads the next line and buffers it to be fetched by getLine.
   * @return true if a line was found
   */
  public boolean nextLine() throws IOException {
    currentLine = "";
    boolean endOfLine = false;
    if(numRead == -2) { // first reading
      if (bure != null) {
        numRead = bure.read(charBuffer, 0, charBuffer.length);
      } else {
        numRead = isr.read(charBuffer, 0, charBuffer.length);
      }
      bufferFill = numRead;
      if (numRead > 0 && charBuffer[0] == 65279) { // BOM Byte Order Mark / UTF-8
        offset++;
      }
    }
    while(numRead > 0 && !endOfLine) {
      if(offset >= bufferFill - margin) {
        if (bure != null) {
          numRead = bure.read(charsForFurtherReading, 0, charsForFurtherReading.length);
        } else {
          numRead = isr.read(charsForFurtherReading, 0, charsForFurtherReading.length);
        }
        if (numRead > 0) { // (-1 == end)
          bufferFill = numRead + margin;
          for (int i = 0; i < margin; i++) {
            charBuffer[i] = charBuffer[i+charsForFurtherReading.length];
          }
          for (int i = 0; i < numRead; i++) {
            charBuffer[i + margin] = charsForFurtherReading[i];
          }
          offset = offset - (charsForFurtherReading.length);
          if (offset < 0) { // happened with unicode after last but one numRead = 326, last numRead was 1 instead of -1!  
            offset = 0;
          }
        }
      }
      int lengthOfBufferToUse = bufferFill;
      if (lengthOfBufferToUse > charsForFurtherReading.length) {
        lengthOfBufferToUse = charsForFurtherReading.length;
      }
      while (offset < lengthOfBufferToUse) {
        if (charBuffer[offset] == '"') {
          quoted = !quoted;
          if (autoCorrectBadQuotes && !quoted && offset > 2 && charBuffer[offset-2] == '"' && charBuffer[offset-1] == ';') {
            quoted = true; // auto-correction if CSV got failure: ";" is assumed to open a new column
            Logger.getInstance().warn("auto correction of bad CSV: " + currentLine);
          }
        }
        if (!quoted && isEndOfLine()) {
          if (linux) offset += 1;
          else offset += 2;
          endOfLine = true;
          return true;
        } else {
          currentLine += charBuffer[offset];
          offset++;
        }
      }
    }
    // numread == 0
    if (offset < bufferFill) {
      while (offset < bufferFill) {
        if (charBuffer[offset] == '"') {
          quoted = !quoted;
        }
        if (!quoted && isEndOfLine()) {
          if (linux) offset += 1;
          else offset += 2;
          endOfLine = true;
          return true;
        } else {
          currentLine += charBuffer[offset];
          offset++;
        }
      }
      endOfLine = true;
      return true;
    }
    return currentLine.length() > 0;
  }
  
  private boolean isEndOfLine() {
    if (linux) {
      if (charBuffer[offset] == '\r' && (charBuffer[offset + 1] == '\n')) {
        // not usual but may be imported like that from windows
        offset++;
        return true;
      }
      return charBuffer[offset] == '\n';
    } else {
      return charBuffer[offset] == '\r' && charBuffer[offset + 1] == '\n';
    }
  }
  
  /**
   * Return the line as previously read by nextLine().
   * @return the line as previously read by nextLine
   * @see #nextLine
   */
  public String getLine() {
    return currentLine;
  }
  
  /**
   * Closes the text file reader.
   */
  public void close() throws IOException {
    if (bure != null) bure.close();
    if (isr != null) isr.close();
    if (is != null) is.close();
  }

}
