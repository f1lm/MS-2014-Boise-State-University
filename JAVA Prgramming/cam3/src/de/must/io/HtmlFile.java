/*
 * Copyright (c) 1999-2010 Christoph Mueller. All rights reserved.
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

import java.io.IOException;
import java.util.Hashtable;

/**
 * Text file for HTML output.
 * @author Christoph Mueller
 */
public class HtmlFile extends MarkupFile {
  
  public static String HTML_FILE_EXTENSION = ".html";
  private static Hashtable<String, String> htmlCode = new Hashtable<String, String>();
  
  static {
    htmlCode.put("\n", "\n<br>");
    htmlCode.put("ä", "&auml;");
    htmlCode.put("ö", "&ouml;");
    htmlCode.put("ü", "&uuml;");
    htmlCode.put("ß", "&szlig;");
    htmlCode.put("Ä", "&Auml;");
    htmlCode.put("Ö", "&Ouml;");
    htmlCode.put("Ü", "&Uuml;");
    htmlCode.put("&", "&amp;");
  }

  /**
   * Constructs a new text file for HTML output
   * @param fileName the name / path of the file without extension
   * @param title the title of the HTML file
   * @param generator the generator
   * @throws IOException
   */
  public HtmlFile(String fileName, String title, String generator) throws IOException {
    super(fileName, HTML_FILE_EXTENSION, title, generator);
  }

  /**
   * Outputs the file's header.
   */
  public void outputHeader() {
    outputHeader(false);
  }

  public void outputHeader(String[] additionalLines) {
    outputHeader(false, additionalLines);
  }

  /**
   * Outputs the file's header.
   * @param printOnLoad whether body tag should include onLoad="print()"
   */
  public void outputHeader(boolean printOnLoad) {
    outputHeader(printOnLoad, null);
  }
  
  public void outputHeader(boolean printOnLoad, String[] additionalLines) {
    writeln("<!doctype html public \"-//w3c//dtd html 4.0 transitional//en\">");
    writeln("<html>");
    writeln("<head>");
    writeln("   <title>" + title + "</title>");
    writeln("   <meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">");
    writeln("   <meta name=\"GENERATOR\" content=\"" + generator + " [www.must.de]\">");
    if (additionalLines != null) for (int i = 0; i < additionalLines.length; i++) {
      writeln("   " + additionalLines[i]);
    }
    writeln("   <META HTTP-EQUIV=\"Pragma\" CONTENT=\"no-cache\">");
    writeln("   <META HTTP-EQUIV=\"Expires\" CONTENT=\"-1\">");
    writeln("</head>");
    if (printOnLoad) {
      // Internet Explorer hides print window in some cases!
      writeln("<script type=\"text/javascript\">");
      writeln("  function printDelayed() {");
      writeln("    setTimeout(\"print()\", 1000)");
      writeln("  }");
      writeln("</script>");
      writeln("<body onLoad=\"printDelayed()\">");
    }
    else writeln("<body>");
    writeln("<font face=\"Arial,Helvetica\">");
  }

  /**
   * Writes column names as header (bold).
	 * @param columnNames the column names to use
	 */
	public void writeTableHeader(String[] columnNames) {
    writeln("<tr VALIGN=TOP>");
    for (int i = 0; i < columnNames.length; i++) {
      writeln("<th align=left><b>" + columnNames[i] + "<b></th>");
    }
    writeln("</tr>");
  }

  /**
   * Writes column values.
   * @param columnValues the column values to write
   */
  public void writeTableRow(String[] columnValues) {
    writeln("<tr VALIGN=TOP>");
    for (int i = 0; i < columnValues.length; i++) {
      writeln("<td>" + columnValues[i] + "</td>");
    }
    writeln("</tr>");
  }

  /**
   * Writes column values with column 2..n right aligned.
   * @param columnValues the column values to write
   */
  public void writeTableRowNumeric(String[] columnValues) {
    writeTableRowNumeric(1, columnValues);
  }

  /**
   * Writes column values with column right aligned as specified.
   * @param columnValues the column values to write
   * @param firstRight the index of column where the right alignment starts
   */
  public void writeTableRowNumeric(int firstRight, String[] columnValues) {
    writeln("<tr VALIGN=TOP>");
    for (int i = 0; i < firstRight; i++) {
      writeln("<td>" + columnValues[i] + "</td>");
    }
    for (int i = firstRight; i < columnValues.length; i++) {
      writeln("<td align=right>" + columnValues[i] + "</td>");
    }
    writeln("</tr>");
  }

  /**
   * Outputs the specified columns of the current row of the data object to list
   * @param dataObjectToList the data object to list
   * @param columns the columns to list
   */
  protected void outputItem(de.must.dataobj.DataObject dataObjectToList, String[] columns) {
    startTableIfNecessary();
    writeln("<tr VALIGN=TOP>");
    for (int i = 0; i < columns.length; i++) {
      writeln("<td>" + dataObjectToList.getText(columns[i]) + "</td>");
    }
    writeln("</tr>");
    writeln("");
  }
  
  public void pageBreak() {
    writelnNonConverted("<div style=\"page-break-before:always;font-size:1;margin:0;border:0;\"><span style=\"visibility: hidden;\">&nbsp;</span></div>");
  }

  /**
   * Outputs the file's footer.
   */
  public void outputFooter() {
    stopTableIfNecessary();
    writeln("</font>");
    writeln("</body>");
    writeln("<HEAD>");
    writeln("   <META HTTP-EQUIV=\"Pragma\" CONTENT=\"no-cache\">");
    writeln("   <META HTTP-EQUIV=\"Expires\" CONTENT=\"-1\">");
    writeln("</HEAD>");
    writeln("</html>");
  }

  /**
   * Returns the HTML compliant char, e.g. &amp; for &.
   * @param charToConvert the char to convert
   * @return the HTML compliant char
   */
  protected String getConvertedString(char charToConvert) {
    String code; 
    if ((code = htmlCode.get(String.valueOf(charToConvert))) != null) {
      return code;
    } else {
      if (((int)charToConvert) > 256) {
        return "&#" + String.valueOf((int)charToConvert) + ";";
      } else {
        return String.valueOf(charToConvert);
      }
    }
  }

  /**
   * Writes a new line into the HTML file which is ending by "<br>". Thus, the line is a line
   * in an editor and in a browser, too.
   * @param line
   */
  public void println(String line) {
    writeln(line + "<br>");
  }

  public void printlnNonConverted(String line) {
    writelnNonConverted(line + "<br>");
  }

}
