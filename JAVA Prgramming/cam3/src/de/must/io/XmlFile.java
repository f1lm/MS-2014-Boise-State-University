/*
 * Copyright (c) 1999-2002 Christoph Mueller. All rights reserved.
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

import de.must.util.StringFunctions;
import de.must.wuic.*;
import de.must.dataobj.DataObject;

/**
 * XML output class. Association with data objects may provide easy listings.
 * Sample:
 * <pre><code>
 *       DoKontakt doKontakt1 = new DoKontakt();
 *       doKontakt1.select("*", "TELENR <> \'\'", "NAMNAC, NAMVOR");
 *       de.must.io.XmlFile XmlFile1 = new de.must.io.XmlFile("Fon", "Telefonliste", "MustMarketing");
 *       XmlFile1.list(doKontakt1, new String[] {"NAMNAC", "NAMVOR", "TELENR", "FONPRV"});
 *       XmlFile1.close();
 *       XmlFile1.presentInBrowser();
 *       doKontakt1.closeQuery();
 * </code></pre>
 * @author Christoph Mueller
 */
public class XmlFile extends MarkupFile {
  
  private String[] nodes = new String[10];
  private int nodeStackPointer = -1;

  /**
   * Constructs a new XML ouput file.
   * @param fileName the name of the output file (path)
   * @param title the title of the XML file
   * @param generator the name of the generator
   * @throws IOException
   */
  public XmlFile(String fileName, String title, String generator) throws IOException {
    super(fileName, ".xml", title, generator);
    mode = MODE_XML_XSL;
  }

  /**
   * List the content of the data object as previously selected.
   * @param dataObjectToList the data object, whose selectted content is to be listed
   * @param columns the columns to list
   * @param ControllingProgressFrame the controlling progress frame
   */
  public void list(DataObject dataObjectToList, String[] columns, ProgressFrame ControllingProgressFrame) {
    super.list(dataObjectToList, columns, ControllingProgressFrame);
    try {
      XslFile Stylesheet = new XslFile(fileName + ".xsl");
      Stylesheet.setTableColumns(columns);
      Stylesheet.close();
    } catch (IOException e) {
      de.must.io.Logger.getInstance().error(this.getClass(), e);
    }
  }

  /**
   * Outputs the header.
   */
  protected void outputHeader() {
    outputHeader(fileName);
    writeln("<DATA>");
  }

  /**
   * Outputs the header.
   * @param xslFileName the name of the xslFileName to use.
   */
  public void outputHeader(String xslFileName) {
    writeln("<?xml version=\"1.0\" ?>");

    StringBuffer stylsheetTag = new StringBuffer();
    stylsheetTag.append("<?xml-stylesheet type=\"text/xsl\"");
    if (xslFileName != null) {
      stylsheetTag.append(" href=\"" + xslFileName + ".xsl\"");
    }
    stylsheetTag.append("?>");
    writeln(stylsheetTag.toString());
    writeln("<!DOCTYPE xy [");
    outputStandardEntityDefinitionList();
    writeln("]>");
  }

  /**
   * Outputs the standard entitiy definition list.
   */
  public void outputStandardEntityDefinitionList() {
    writeln("  <!ENTITY ldquo  \"&#147;\"> <!-- Left Double Quote -->");
    writeln("  <!ENTITY rdquo  \"&#148;\"> <!-- Right Double Quote -->");
    writeln("  <!ENTITY trade  \"&#153;\"> <!-- Trademark Symbol (TM) -->");
    writeln("  <!ENTITY rtrade \"&#174;\"> <!-- Registered Trademark (R) -->");
    writeln("  <!ENTITY copyr  \"&#169;\"> <!-- Copyright Symbol -->");
    writeln("  <!ENTITY auml   \"&#228;\"> <!-- ä -->");
    writeln("  <!ENTITY Auml   \"&#196;\"> <!-- Ä -->");
    writeln("  <!ENTITY ouml   \"&#246;\"> <!-- ö -->");
    writeln("  <!ENTITY Ouml   \"&#214;\"> <!-- Ö -->");
    writeln("  <!ENTITY uuml   \"&#252;\"> <!-- ü -->");
    writeln("  <!ENTITY Uuml   \"&#220;\"> <!-- Ü -->");
    writeln("  <!ENTITY szlig  \"&#223;\"> <!-- ß -->");
  }

  /**
   * Ouptuts items (columns) of the current row of the data object.
   * @param dataObjectToList the data object, whose selectted content is to be listed
   * @param columns the columns to list
   */
  protected void outputItem(DataObject DataObjectToList, String[] columns) {
    writeln("<ITEM>");
    for (int i = 0; i < columns.length; i++) {
      writeln("<" + columns[i] + ">" + DataObjectToList.getText(columns[i]) + "</" + columns[i] + ">");
    }
    writeln("</ITEM>");
  }

  /**
   * Outputs the footer.
   */
  protected void outputFooter() {
    writeln("</DATA>");
  }

  /**
   * Returns the HTML compatible converted string.
   * @param charToConvert the char to convert
   * @return the HTML compatible converted string
   */
  protected String getConvertedString(char charToConvert) {
    if (charToConvert == '\n') {
      return "\n<br></br>";
    }
    if (charToConvert == 'ä') {
      return "&auml;";
    }
    if (charToConvert == 'ö') {
      return "&ouml;";
    }
    if (charToConvert == 'ü') {
      return "&uuml;";
    }
    if (charToConvert == 'ß') {
      return "&szlig;";
    }
    if (charToConvert == 'Ä') {
      return "&Auml;";
    }
    if (charToConvert == 'Ö') {
      return "&Ouml;";
    }
    if (charToConvert == 'Ü') {
      return "&Uuml;";
    }
    if (charToConvert == 'é') {
      return "e";
    }
    return String.valueOf(charToConvert);
  }
  
	/**
	 * Begins a new tag node.
	 * @param nodeName the name of the tag to begin
	 */
  public void newTagNode(String nodeName) {
    nodeStackPointer++;
    nodes[nodeStackPointer] = nodeName;
    writeln(getIndentBlanks() + "<" + nodeName + ">");
  }

	/**
	 * Adds an element.
	 * @param elementName the name of the element
	 * @param value the value of the element
	 */
  public void addElement(String elementName, String value) {
    writeln(getIndentBlanks(1) + "<" + elementName + ">" + xmlSecure(value) + "</" + elementName + ">");
  }

  /**
   * Adds an element.
   * @param elementName the name of the element
   * @param value the value of the element
   */
  public void addElementNonConverted(String elementName, String value) {
    writelnNonConverted(getIndentBlanks(1) + "<" + elementName + ">" + xmlSecure(value) + "</" + elementName + ">");
  }

	/**
	 * Completes the current tag node and goes one step back in element hierarchy.
	 */
  public void completeCurrentTagNode() {
    writeln(getIndentBlanks() + "</" + nodes[nodeStackPointer] + ">");
    nodeStackPointer--;
  }

	/**
   * Completes all open tag nodes.
	 */
  public void completeAllOpenTagNodes() {
    for (int i = nodeStackPointer; i >= 0; i--) {
      writeln(getIndentBlanks() + "</" + nodes[nodeStackPointer] + ">");
		}
    nodeStackPointer = -1;
  }
  
  private String getIndentBlanks() {
    return getIndentBlanks(0);
  }
  
  private String getIndentBlanks(int additionalLevel) {
    int size = (nodeStackPointer + additionalLevel) * 2;
    StringBuffer blanks = new StringBuffer(size);
    for (int i = 1; i <= size; i++) {
      blanks.append(' ');
		}
    return blanks.toString();
  }
  
  private String xmlSecure(String elementValue) {
    String result = elementValue;
    result = StringFunctions.replaceAll(result, "<", "&lt;");
    result = StringFunctions.replaceAll(result, ">", "&gt;");
    result = StringFunctions.replaceAll(result, "&", "&amp;");
    return result;
  } 

  /**
   * Presents the XML file in the browser.
   */
  public void presentInBrowser() {
    String codeBase = System.getProperty("user.dir");
    de.must.util.Browser.visitURL("file://" + codeBase + "/" + fileName + fileExtension);
  }

}
