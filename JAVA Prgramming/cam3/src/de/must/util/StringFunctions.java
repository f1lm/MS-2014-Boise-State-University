/*
 * Copyright (c) 1999-2013 Christoph Mueller. All rights reserved.
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
import java.util.Vector;

/**
 * Utility for string functions
 * @author Christoph Mueller
 */
public final class StringFunctions {

  public static String getSortValue(String theString) {
    return getSortValue(theString, 0);
  }
  
  /**
   * Returns the sort order value of the specified string
   * @param theString the string whose sort order is to build
   * @param limit the max length of the result string
   * @return the sort order value of the specified string
   */
  public static String getSortValue(String theString, int limit) {
    boolean noSort = false;
    char[] charArray = theString.toUpperCase().toCharArray();
    StringBuffer sortString = new StringBuffer();
    for (int i = 0; i < charArray.length; i++) {
      if (charArray[i] == '¨') { // Alt+0172
        if (noSort) noSort = false;
        else noSort = true;
        continue;
      }
      if (noSort) continue;
      if (charArray[i] == 'ƒ') sortString.append("AE");
      else if (charArray[i] == '÷') sortString.append("OE");
      else if (charArray[i] == '‹') sortString.append("UE");
      else if (charArray[i] == 'ﬂ') sortString.append("SS");
      else sortString.append(charArray[i]);
    }
    if (limit > 0 && sortString.length() > limit) {
      sortString.delete(limit, sortString.length());
    }
    return sortString.toString().trim();
  }

  private static final char[] PECULIAR = "¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷ÿäŸ⁄€‹›éﬁ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ¯ö˘˙˚¸˝˛ˇû".toCharArray();
  private static final char[] PEC_REPL = "AAAAAAACEEEEIIIIDNOOOOOOSUUUUYZPaaaaaaxceeeeiiiidnoooooosuuuuypyz".toCharArray();
  
  /**
   * Returns the value to search ignoring all accents.
   * @param theString to be simplified by e.g. removing accents
   * @return the simplified string
   */
  public static String getSearchValue(String theString) {
    return getSearchValue(theString, 0);
  }
  
  /**
   * Returns the value to search ignoring all accents.
   * @param theString to be simplified by e.g. removing accents
   * @param limit the max length of the result string
   * @return the simplified string
   */
  public static String getSearchValue(String theString, int limit) {
    char[] charArray = theString.toCharArray();
    StringBuffer result = new StringBuffer();
    for (int i = 0; i < charArray.length; i++) {
      if (charArray[i] == 'ƒ') result.append("AE");
      else if (charArray[i] == '∆') result.append("AE");
      else if (charArray[i] == '÷') result.append("OE");
      else if (charArray[i] == '‹') result.append("UE");
      else if (charArray[i] == '‰') result.append("ae");
      else if (charArray[i] == 'ˆ') result.append("oe");
      else if (charArray[i] == '¸') result.append("ue");
      else if (charArray[i] == 'ﬂ') result.append("ss");
      else {
        boolean repla = false;
        for (int j = 0; j < PECULIAR.length; j++) {
          if (PECULIAR[j] == charArray[i]) {
            result.append(PEC_REPL[j]);
            repla = true;
            break;
          }
        }
        if (!repla) result.append(charArray[i]);
      }
    }
    if (limit > 0 && result.length() > limit) {
      result.delete(limit, result.length());
    }
    return result.toString().trim();
  }

  public static String replaceUmlaute(String theString) {
    char[] charArray = theString.toCharArray();
    StringBuffer sortString = new StringBuffer();
    for (int i = 0; i < charArray.length; i++) {
      if (charArray[i] == 'ƒ') sortString.append("AE");
      else if (charArray[i] == '÷') sortString.append("Oe");
      else if (charArray[i] == '‹') sortString.append("Ue");
      else if (charArray[i] == '‰') sortString.append("ae");
      else if (charArray[i] == 'ˆ') sortString.append("oe");
      else if (charArray[i] == '¸') sortString.append("ue");
      else if (charArray[i] == 'ﬂ') sortString.append("ss");
      else sortString.append(charArray[i]);
    }
    return sortString.toString().trim();
  }

  public static synchronized boolean isOf(String stringToCheck, char[] validChars) {
    char[] usedChars = stringToCheck.toCharArray();
    for (int i = 0; i < usedChars.length; i++) {
      boolean usable = false;
      for (int j = 0; j < validChars.length; j++) {
        if (usedChars[i] == validChars[j]) usable = true;
      }
      if (!usable) return false;
    }
    return true;
  }

  public static synchronized String[] getStringLines(String stringWithLineFeed) {
    int numberOfLineFeeds = 0;
    int lineStartPosition = 0;
    int pos = 0;
    while((pos = stringWithLineFeed.indexOf('\n', pos + 1)) > 0) {
      numberOfLineFeeds++;
    }
    // de.must.io.Logger.getInstance().info(getClass(), "numberOfLineFeeds: " + numberOfLineFeeds);
    String[] result = new String[numberOfLineFeeds + 1];
    pos = 0;
    int i = -1;
    while((pos = stringWithLineFeed.indexOf('\n', pos + 1)) > 0) {
      // de.must.io.Logger.getInstance().info(getClass(), stringWithLineFeed.substring(lineStartPosition, pos));
      result[++i] = stringWithLineFeed.substring(lineStartPosition, pos);
      lineStartPosition = pos + 1;
    }
    // de.must.io.Logger.getInstance().info(getClass(), stringWithLineFeed.substring(lineStartPosition));
    result[numberOfLineFeeds] = stringWithLineFeed.substring(lineStartPosition);
    return result;
  }

  /**
   * Returns elements from a String with separators.
   * @param separatedString the String to parse.
   * @param separator the separator to use.
   * @return the separated elements
   */
  public static synchronized String[] getElements(String separatedString, String separator) {
    if (separatedString.length() == 0) return new String[0];
    int numberOfSeparators = 0;
    int startPosition = 0;
    int pos = -1;
    while((pos = separatedString.indexOf(separator, pos + 1)) > -1) {
      numberOfSeparators++;
    }
    String[] result = new String[numberOfSeparators + 1];
    pos = -1;
    int i = -1;
    while((pos = separatedString.indexOf(separator, pos + 1)) > -1) {
      result[++i] = separatedString.substring(startPosition, pos);
      startPosition = pos + separator.length();
    }
    result[numberOfSeparators] = separatedString.substring(startPosition);
    return result;
  }

  public static synchronized String replaceAll(String stringToManipulate, String stringToReplace, String replaceString) {
    int lineStartPosition = 0;
    int searchPos = -1;
    StringBuffer resultString = new StringBuffer();
    while((searchPos = stringToManipulate.indexOf(stringToReplace, lineStartPosition)) > -1) {
      resultString.append(stringToManipulate.substring(lineStartPosition, searchPos) + replaceString);
      lineStartPosition = searchPos + stringToReplace.length();
    }
    resultString.append(stringToManipulate.substring(lineStartPosition));
    return resultString.toString();
  }

  public static synchronized String[] getWordWrappedStringLines(String stringToWrap, int maxChars) {
    if (maxChars < 20) maxChars = 20;
    String[] result = new String[(stringToWrap.length() -1) / maxChars + 1];
    for (int i = 0; i < result.length; i++) {
      int endPos = (i+1) * maxChars;
      if (endPos > stringToWrap.length()) endPos = stringToWrap.length();
      result[i] = stringToWrap.substring(i * maxChars, endPos);
    }
    return result;
  }

  public static synchronized String getExtension(String fileName) {
    int pos = fileName.lastIndexOf('.');
    if (pos < 1) return null;
    return fileName.substring(pos + 1, fileName.length());
  }

  public static synchronized int count(String stringToCheck, char charToCount) {
    int result = 0;
    char[] chars = stringToCheck.toCharArray();
    for (int i = 0; i < chars.length; i++) {
      if (chars[i] == charToCount) {
        result++;
      }
    }
    return result;
  }

  /**
   * Returns a right trimmed String.
   * @param value the String to be trimmed
   * @return a right trimmed String
   */
  public static synchronized String rtrim(String value) {
    if (value == null) return null;
    char[] val = value.toCharArray();
    if (val.length == 0) return value;
    if (val[val.length-1] != ' ') return value;
    int len = val.length;
    while (len > 0 && val[len - 1] == ' ') len--;
    return value.substring(0, len);
  }

  /**
   * Brings a String to fix length as needed in older languages like Cobol.
   * @param value the value to be formatted
   * @param length the target length
   * @return the cut or extended String
   */
  public static synchronized String fixLength(String value, int length) {
    if (value.length() > length) return value.substring(0, length);
    else if (value.length() ==  length) return value;
    StringBuffer result = new StringBuffer(value);
    while (result.length() < length) result.append(' ');
    return result.toString();
  }

  /**
   * Returns the given value plus check digit
   * @param value the value which should be extended by check digit
   * @return the given value plus check digit
   */
  public static synchronized String addCheckDigit(String value) {
    String result = value;
    char[] chars = value.toCharArray();
    Vector<Integer> ints = new Vector<Integer>();
    for (int i = 0; i < chars.length; i++) {
      try {
        ints.add(Integer.valueOf(String.valueOf((chars[i]))));
      } catch (Exception e) {} // ignore
    }
    Iterator<Integer> iterator = ints.iterator();
    int checksum = 0;
    int factor = 6;
    while (iterator.hasNext()) {
      Integer integer = iterator.next();
      checksum += integer.intValue() * factor;
      factor--;
      if (factor == 1) factor = 7;
    }
    while (checksum -11 > 0) {
      checksum -= 11;
    }
    int checkDigit = 11 - checksum;
    if (checkDigit == 10) checkDigit = 0;
    return result + "." + (checkDigit);
  }
  
  /**
   * Shortens a list of numbers by uniting numbers in sequence
   * @param numbers the numbers to build the list
   * @return the optimized list
   */
  @SuppressWarnings("unused")
  public static synchronized String optimizeNumberList(Vector<String> numbers) {
    String result = "";
    String beginValue = null;
    String lastNbrString = null;
    double lastNbr = -9;
    double nbr = -22;
    for (String nbrString : numbers) {
      try { 
        nbr = Double.valueOf(nbrString);
      } catch (Exception e) {
        nbr = -33;
      }
      if ((lastNbrString == null || lastNbrString.length() == nbrString.length()) && nbr == lastNbr + 1) {
        if (beginValue == null) beginValue = lastNbrString;
      } else if (lastNbrString != null) {
        if (result.length() > 0) result += ", ";
        if (beginValue != null) {
          result += beginValue + " - " + lastNbrString;
          beginValue = null;
        } else {
          result += lastNbrString;
        }
      }
      lastNbr = nbr;
      lastNbrString = nbrString;
    } // end for
    if (lastNbrString != null) {
      if (result.length() > 0) result += ", ";
      if (beginValue != null) {
        result += beginValue + " - " + lastNbrString; // dead code warning is not correct!
      } else {
        result += lastNbrString;
      }
    }
    return result;
  }
  
}
