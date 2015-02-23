/*
 * Copyright (c) 2004 Christoph Mueller. All rights reserved.
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

import java.io.File;

/**
 * HREF as to be found in HTML source code lines. Checks HTML statements for HREFs and
 * provides methods to change them like making them absolute.
 * @author Christoph Mueller
 */
public class HrefHtmlLink {
  
  /**
   * Literals opening a link.
   */
  private String[] hrefIndicators = new String[] {
    "href=\"",
    "src=\"",
    "background=\"",
    ".src='",
  };

  private String hrefKeyWord;
  private String href;
  private String sourceLine;
  private int checkOffset;
  
	/**
	 * Consturcts a new HREF HTML link.
	 */
	public HrefHtmlLink() {
		super();
  }
  
  /**
   * Sets the line of the HTML source code to check and manipulate.
   * @param line the line of the HTML source code to check and manipulate
   */
	public void setLineToCheck(String line) {
    this.sourceLine = line;
    checkOffset = 0;
  }
  
  /**
   * Finds the next HREF if available in line as set by setLineToCheck.
	 * @return true if (another) HREF was found in line to check
   * @see #setLineToCheck(String)
	 */
	public boolean next() {
    String hrefEndIndicator = "\"";
    int hrefPos = -1;
    hrefKeyWord = null;
    for (int i = 0; i < hrefIndicators.length; i++) {
			int hrefPosI = sourceLine.toLowerCase().indexOf(hrefIndicators[i], checkOffset);
      if (hrefPosI != -1 && (hrefPos == -1 || hrefPosI < hrefPos)) {
        hrefPos = hrefPosI;
        hrefKeyWord = hrefIndicators[i];
        if (hrefIndicators[i].endsWith("'")) hrefEndIndicator = "'";
      }
		}
    if (hrefPos == -1) { href = null; return false; }
    int hrefEndPos = sourceLine.indexOf(hrefEndIndicator, hrefPos + hrefKeyWord.length());
    if (hrefEndPos < hrefPos) { href = null; return false; }
    href = sourceLine.substring(hrefPos + hrefKeyWord.length(), hrefEndPos);
    checkOffset = hrefEndPos + 1;
    return true; 
  }
  
  /**
   * Returns the currently found HREF in the line to check.
   * @return the currently found HREF in the line to check
   */
	public String getCurrentHref() {
    return href;
  }
  
  /**
   * Makes the current HREF absolute.
   * @param line the line of the HTML source code to be changed
   * @param currentPath the path of the current URL to which the HREF is associated
   * @return the line with the absolute HREF
   */
	public String makeAbsolute(String line, String currentPath) {
    return line.replaceAll(hrefKeyWord + href, hrefKeyWord + getAbsolutePath(currentPath));
  }

  private String getAbsolutePath(String currentPath) {
    if (href.startsWith("/") || href.toLowerCase().startsWith("http")) return href; // already absolute
    String newHref = href.trim();
    File dir = new File(currentPath);
    while (newHref.startsWith("../")) {
      newHref = newHref.substring(3);
      if (dir != null) dir = dir.getParentFile();
    }
    String absolutePath = "";
    String absoluteFolder = "";
    if (dir != null) {
      absoluteFolder = dir.getPath().replace('\\', '/');
      if (absoluteFolder.equals("/")) absoluteFolder = "";
    }
    absolutePath += absoluteFolder;
    absolutePath += "/" + newHref;
    return absolutePath;
  }
  
}
