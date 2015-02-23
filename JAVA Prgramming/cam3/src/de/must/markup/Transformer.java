/*
 * Copyright (c) 2001-2010 Christoph Mueller. All rights reserved.
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

package de.must.markup;

import de.must.util.StringFunctions;

/**
 * Utility to transform things browser friendly
 * @author Christoph Mueller
 */
public class Transformer {
  
  public static final String[][] ESC_LEGEND = {
    // {" ","&nbsp;"},
    {"�","&iexcl;"},
    {"�","&euro;"},
    {"�","&cent;"},
    {"�","&pound;"},
    {"�","&curren;"},
    {"�","&yen;"},
    {"�","&brvbar;"},
    {"�","&sect;"},
    {"�","&uml;"},
    {"�","&copy;"},
    {"�","&ordf;"},
    {"�","&laquo;"},
    // {"","&not;"},
    // {"","&shy;"},
    {"�","&reg;"},
    {"�","&macr;"},
    {"�","&deg;"},
    {"�","&plusmn;"},
    {"�","&sup2;"},
    {"�","&sup3;"},
    {"�","&acute;"},
    {"�","&micro;"},
    // {"","&para;"},
    {"�","&middot;"},
    {"�","&cedil;"},
    {"�","&sup1;"},
    {"�","&ordm;"},
    {"�","&raquo;"},
    {"�","&frac14;"},
    {"�","&frac12;"},
    {"�","&frac34;"},
    {"�","&iquest;"},
    {"�","&Agrave;"},
    {"�","&Aacute;"},
    {"�","&Acirc;"},
    {"�","&Atilde;"},
    {"�","&Auml;"},
    {"�","&Aring;"},
    {"�","&AElig;"},
    {"�","&Ccedil;"},
    {"�","&Egrave;"},
    {"�","&Eacute;"},
    {"�","&Ecirc;"},
    {"�","&Euml;"},
    {"�","&Igrave;"},
    {"�","&Iacute;"},
    {"�","&Icirc;"},
    {"�","&Iuml;"},
    {"�","&ETH;"},
    {"�","&Ntilde;"},
    {"�","&Ograve;"},
    {"�","&Oacute;"},
    {"�","&Ocirc;"},
    {"�","&Otilde;"},
    {"�","&Ouml;"},
    {"�","&times;"},
    {"�","&Oslash;"},
    {"�","&Ugrave;"},
    {"�","&Uacute;"},
    {"�","&Ucirc;"},
    {"�","&Uuml;"},
    {"�","&Yacute;"},
    {"�","&THORN;"},
    {"�","&szlig;"},
    {"�","&agrave;"},
    {"�","&aacute;"},
    {"�","&acirc;"},
    {"�","&atilde;"},
    {"�","&auml;"},
    {"�","&aring;"},
    {"�","&aelig;"},
    {"�","&ccedil;"},
    {"�","&egrave;"},
    {"�","&eacute;"},
    {"�","&ecirc;"},
    {"�","&euml;"},
    {"�","&igrave;"},
    {"�","&iacute;"},
    {"�","&icirc;"},
    {"�","&iuml;"},
    {"�","&eth;"},
    {"�","&ntilde;"},
    {"�","&ograve;"},
    {"�","&oacute;"},
    {"�","&ocirc;"},
    {"�","&otilde;"},
    {"�","&ouml;"},
    {"�","&divide;"},
    {"�","&oslash;"},
    {"�","&ugrave;"},
    {"�","&uacute;"},
    {"�","&ucirc;"},
    {"�","&uuml;"},
    {"�","&yacute;"},
    {"�","&thorn;"},
    {"�","&yuml;"},
  };

  /**
   * Replaces all special signs by their HTML escape codes.
   * @param text the text to be transformed
   * @return the new text with the replaced special signs
   */
  public static synchronized String replaceSpecialSigns(String text) {
    return replaceSpecialSigns(text, true);
  }

  /**
	 * Replaces all special signs by their HTML escape codes.
	 * @param text the text to be transformed
   * @param transformLineFeed whether line feed should be transformed to <br>
	 * @return the new text with the replaced special signs
	 */
	public static synchronized String replaceSpecialSigns(String text, boolean transformLineFeed) {
    if (text == null) return null;
    StringBuffer resultString = new StringBuffer();
    boolean replaced;
    char[] textChars = text.toCharArray();
    for (int i = 0; i < textChars.length; i++) {
      replaced = false;
      for (int j = 0; j < ESC_LEGEND.length; j++) {
        char specialSign = ((String)ESC_LEGEND[j][0]).toCharArray()[0];
				if (specialSign == textChars[i]) {
          resultString.append(ESC_LEGEND[j][1]);
          replaced = true;
        }
			}
      if (transformLineFeed && textChars[i] == '\n') {
        if (i > 3 && i < textChars.length - 4) {
          String before = text.substring(i-4, i);
          String after = text.substring(i+1, i+5);
          // de.must.io.Logger.getInstance().info(getClass(), "before: '" + before + "'");
          // de.must.io.Logger.getInstance().info(getClass(), "after: '" + after + "'");
          if (!before.equals("<br>") && !after.equals("<br>")) {
            resultString.append("<br>\n");
            replaced = true;
          }
        }
      }
      if (!replaced) {
        if (textChars[i] > 127) {
          resultString.append("&#" + (int)textChars[i] + ";");
        } else {
          resultString.append(textChars[i]);
        }
      }
    }
    return resultString.toString();
  }

	/**
	 * Secures characters like &quot; not to be eliminated by user input cycle.
	 * @param value the string to be secured
	 * @return the secured string
	 */
  public static synchronized String htmlInputSecure(String value) {
    return htmlInputSecure(value, false);
  }

  /**
   * Secures characters like &nbsp; not to be eliminated by user input cycle.
   * @param value the string to be secured
   * @param transformAmp whether &nbsp; should be secured, too
   * @return the secured string
   */
	public static synchronized String htmlInputSecure(String value, boolean transformAmp) {
    // see http://selfhtml.teamone.de/html/referenz/zeichen.htm
    String result = value; 
    if (transformAmp) {
      result = replaceEscAmp(result);
    } else {
      result = StringFunctions.replaceAll(result, "&nbsp;", "&amp;nbsp;");
    }
    result = StringFunctions.replaceAll(result, "\"", "&quot;");
    return result;
	}

  /**
	 * Replaces all & by &amp; if it is part of escape character and not &amp; itself.
	 * @param stringToSecure the string to be secured
	 * @return the secured string
	 */
	private static synchronized String replaceEscAmp(String stringToSecure) {
    int lineStartPosition = 0;
    int pos = 0;
    String escCode = null; 
    String escCodeWithoutAmp = null;
    
    StringBuffer resultString = new StringBuffer();
    while((pos = stringToSecure.indexOf('&', pos + 1)) > 0) {
      int pos2 = stringToSecure.indexOf(';', pos + 2);
      if (pos2 != -1 && pos2-pos < 8) {
        escCode = stringToSecure.substring(pos, pos2 + 1);
        escCodeWithoutAmp = escCode.substring(1);
        // de.must.io.Logger.getInstance().info(getClass(), "detected escCode " + escCode);
        if (escCode.indexOf(' ') == -1 && !escCode.equals("&amp;")) {
          resultString.append(stringToSecure.substring(lineStartPosition, pos) + "&amp;" + escCodeWithoutAmp);
          lineStartPosition = pos + escCode.length();
        } else {
          resultString.append(stringToSecure.substring(lineStartPosition, pos) + escCode);
          lineStartPosition = pos + 1;
        }
      } else {
        resultString.append(stringToSecure.substring(lineStartPosition, pos));
        lineStartPosition = pos + 1;
      }
    }
    resultString.append(stringToSecure.substring(lineStartPosition));
    return resultString.toString();
  }

//  private static void replaceTest() {
//    de.must.io.Logger.getInstance().info(getClass(), de.must.markup.Transformer.replaceEscAmp("Seguran&ccedil;a ativa na dire&ccedil;&atilde;o & so weiter &amp; so fort"));
//    de.must.io.Logger.getInstance().info(getClass(), de.must.markup.Transformer.replaceEscAmp("Da is nix drin"));
//    de.must.io.Logger.getInstance().info(getClass(), de.must.markup.Transformer.replaceEscAmp("Das & abc; ist kein Escape!"));
//  }

}
