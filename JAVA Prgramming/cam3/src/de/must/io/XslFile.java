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

package de.must.io;

import java.io.IOException;

/**
 * @author Christoph Mueller
 */
public class XslFile {

  protected Protocol OutputFile;
  protected String fileName;
  protected boolean opened = false;

  /**
   *
   * @param fileName
   * @throws IOException
   */
  public XslFile(String fileName) throws IOException {
    this.fileName = fileName;
    OutputFile = new Protocol(fileName);
    opened = true;
  }

  /**
   *
   * @param columns
   */
  public void setTableColumns(String[] columns) {
    writeln("<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/TR/WD-xsl\">");
    writeln("  <xsl:template match=\"/\">");
    writeln("    <TABLE>");
    writeln("      <xsl:for-each select=\"DATA/ITEM\">");
    writeln("        <TR>");
    for (int i = 0; i < columns.length; i++) {
      writeln("          <TD><xsl:value-of select=\"" + columns[i] + "\"/></TD>");
    }
    writeln("        </TR>");
    writeln("      </xsl:for-each>");
    writeln("    </TABLE>");
    writeln("  </xsl:template>");
    writeln("</xsl:stylesheet>");
  }

  /**
   *
   * @param line
   */
  public void writeln(String line) {
    OutputFile.addEntry(line);
  }

  /**
   *
   */
  public void close() {
    OutputFile.close();
    opened = false;
  }

  /**
   *
   */
  protected void finalize() throws Throwable {
    // de.must.io.Logger.getInstance().info(getClass(), "finalize called in " +  this.getClass().getName());
    if (opened) close();
    super.finalize();
  }

}
