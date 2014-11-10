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

package de.must.io;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.Vector;

import de.must.util.KeyValuePairAlpha;
import de.must.util.StringFunctions;

public class BibTeXReader {

  public class BibTeXItem {
    public String type;
    public String id;
    public Vector<KeyValuePairAlpha> values;
    public BibTeXItem() {
      values = new Vector<KeyValuePairAlpha>();
    }
  }
  
  private InputStream is;
  private InputStreamReader isr;
  private BufferedReader bure;

  private int margin = 5; // maximum of foresighted reading
  private char[] charsForFurtherReading = new char[1000];
  private char[] charBuffer = new char[charsForFurtherReading.length + margin];
  private String currentSection = "";
  private char sectionBeginChar = '@';
  private char fragmentBeginChar = '{';
  private char fragmentEndingChar = '}';
  private int depth;

  private int numRead = -2;
  private int bufferFill = 0;
  private int offset = 0;
  
  /**
   * Constructs a new text file reader and opens the file as specified searching in the path.
   * @param fileName the name of the file to use
   */
  public BibTeXReader(File file) throws FileNotFoundException {
    this(file, null);
  }
  
  /**
   * Constructs a new BibTeX reader and opens the file as specified searching in the path.
   * @param fileName the name of the file to use
   * @param charset the Charset to use
   */
  public BibTeXReader(File file, Charset charset) throws FileNotFoundException {
    is = new FileInputStream(file);
    if (charset != null) {
      isr = new InputStreamReader(is, charset);
    } else {
      isr = new InputStreamReader(is);
    }
  }

  public BibTeXReader(InputStreamReader isr) {
    this.isr = isr;
  }
  
  public BibTeXReader(BufferedReader bure) {
    this.bure = bure;
  }
  
  /**
   * Reads the next section and buffers it to be fetched by getSection.
   * @return true if a section was found
   */
  public boolean nextSection() throws IOException {
    depth = 0;
    currentSection = "";
    boolean endOfSection = false;
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
    while(numRead > 0 && !endOfSection) {
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
        if (charBuffer[offset] == sectionBeginChar) {
          depth = 0;
          currentSection = "";
        }
        if (charBuffer[offset] == fragmentBeginChar) depth++;
        if (charBuffer[offset] == fragmentEndingChar) depth--;
        if (isEndOfSection()) {
          currentSection += charBuffer[offset];
          offset += 1;
          endOfSection = true;
          return currentSection.indexOf(sectionBeginChar) != -1;
        } else {
          currentSection += charBuffer[offset];
          offset++;
        }
      }
    }
    // numread == 0
    if (offset < bufferFill) {
      while (offset < bufferFill) {
        if (charBuffer[offset] == sectionBeginChar) {
          depth = 0;
          currentSection = "";
        }
        if (charBuffer[offset] == fragmentBeginChar) depth++;
        if (charBuffer[offset] == fragmentEndingChar) depth--;
        if (isEndOfSection()) {
          currentSection += charBuffer[offset];
          offset += 1;
          endOfSection = true;
          return currentSection.indexOf(sectionBeginChar) != -1;
        } else {
          currentSection += charBuffer[offset];
          offset++;
        }
      }
      endOfSection = true;
      return currentSection.indexOf(sectionBeginChar) != -1;
    }
    return currentSection.indexOf(sectionBeginChar) != -1;
  }
  
  private boolean isEndOfSection() {
    return charBuffer[offset] == fragmentEndingChar && depth == 0;
  }
  
  /**
   * Return the Section as previously read by nextSection().
   * @return the Section as previously read by nextSection
   * @see #nextSection
   */
  public String getSection() {
    return currentSection;
  }
  
  public BibTeXItem getItem() {
    String section = getSection();
    section = StringFunctions.replaceAll(section, "{\\\"A}", "Ä");
    section = StringFunctions.replaceAll(section, "{\\\"O}", "Ö");
    section = StringFunctions.replaceAll(section, "{\\\"U}", "Ü");
    section = StringFunctions.replaceAll(section, "{\\\"a}", "ä");
    section = StringFunctions.replaceAll(section, "{\\\"o}", "ö");
    section = StringFunctions.replaceAll(section, "{\\\"u}", "ü");
    section = StringFunctions.replaceAll(section, "{\\\"ss}", "ß");
    section = StringFunctions.replaceAll(section, "{\\dq}", "\"");
//    section = StringFunctions.replaceAll(section, "{\'a}", "á"); (indexOf result -1)
//    section = StringFunctions.replaceAll(section, "{\'e}", "é");
//    section = StringFunctions.replaceAll(section, "{\'o}", "ó");
//    section = StringFunctions.replaceAll(section, "{\'u}", "ú");
    BibTeXItem item = new BibTeXItem();
    int pos = section.indexOf(fragmentBeginChar);
    item.type = section.substring(1, pos);
    pos++;
    int pos2 = section.indexOf(',');
    item.id = section.substring(pos, pos2);
    pos = pos2 +1;
    // now key value
    char[] keyValueChars = section.substring(pos2 +1).toCharArray();
    int depth = 0;
    String key = "";
    String value = "";
    for (int i = 0; i < keyValueChars.length; i++) {
      if (fragmentBeginChar == keyValueChars[i]) depth++;
      else if (fragmentEndingChar == keyValueChars[i]) depth--;
      else if (depth == 0) {
        if (',' !=keyValueChars[i]
         && '\r' !=keyValueChars[i]
         && '\n' !=keyValueChars[i]
         && '=' !=keyValueChars[i]
         && ' ' !=keyValueChars[i]
        )
        key += keyValueChars[i];
      } else if (depth == 1) {
        value += keyValueChars[i]; 
      } else if (depth > 1) {
        if ('\\' == keyValueChars[i]
         && i + 2 < keyValueChars.length &&  '\'' == keyValueChars[i+1]  
        ) {
          i = i + 2;
          if ('a' == keyValueChars[i]) value += 'á';
          else if ('e' == keyValueChars[i]) value += 'é';
          else if ('o' == keyValueChars[i]) value += 'ó';
          else if ('u' == keyValueChars[i]) value += 'ú';
          else value += keyValueChars[i];
        } else {
          value += keyValueChars[i]; 
        }
      }
      if (depth == 0 && value.length() > 0) {
        item.values.add(new KeyValuePairAlpha(key, value));
        key = "";
        value = "";
      }
    }
    return item;
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
