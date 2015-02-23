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

package de.must.io;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;

import de.must.util.Browser;
import de.must.wuic.ProgressFrame;

/**
 * @author Christoph Mueller
 */
public abstract class MarkupFile {
  protected String fileName;
  protected String fileExtension;
  private File outFile;
  private FileOutputStream outStream;
  private BufferedWriter out;
  protected String title;
  protected String generator;
  public static final int MODE_HTML = 0;
  public static final int MODE_XML_XSL = 1;
  protected int mode = MODE_HTML;
  private boolean opened = false;
  private int tableLevel = 0;

  public MarkupFile(String fileName, String fileExtension, String title, String generator) throws IOException {
    this.fileName = fileName;
    this.fileExtension = fileExtension;
    this.title = title;
    this.generator = generator;
    String fileNameInclExtension = fileName + fileExtension;
    if (fileName.endsWith(".html") || fileName.endsWith(".htm")) {
      fileNameInclExtension = fileName;
    }
    openOutputFile(fileNameInclExtension);
  }

  public void list(de.must.dataobj.DataObject DataObjectToList, String[] columns) {
    list(DataObjectToList, columns, null);
  }

  public void list(de.must.dataobj.DataObject DataObjectToList, String[] columns, ProgressFrame ControllingProgressFrame) {
    int i=0;
    if (ControllingProgressFrame != null) ControllingProgressFrame.setProgressMaximum(1000);
    outputHeader();
    while ((ControllingProgressFrame == null || !ControllingProgressFrame.isCanceled()) && DataObjectToList.nextRow()) {
      if (ControllingProgressFrame != null) {
        ControllingProgressFrame.setProgressValue(++i);
        ControllingProgressFrame.repaint();
      }
      outputItem(DataObjectToList, columns);
    }
    outputFooter();
  }

  protected abstract void outputHeader();

  protected abstract void outputItem(de.must.dataobj.DataObject DataObjectToList, String[] columns);

  protected abstract void outputFooter();

  protected abstract String getConvertedString(char charToConvert);

  protected boolean startTableIfNecessary() {
    if (tableLevel > 0) return false;
    tableLevel = 1;
    writeln("<table>");
    return true;
  }

  protected boolean stopTableIfNecessary() {
    if (tableLevel == 0) return false;
    tableLevel = 0;
    writeln("</table>");
    return true;
  }

   public void openOutputFile(String outputFileName) throws IOException {
     out = new BufferedWriter(new OutputStreamWriter(outStream = new FileOutputStream(outFile = new File(outputFileName))));
     opened = true;
  }
   
  private String convert(String fragment) {
    int i;
    char[] tempCharArray = fragment.toCharArray();
    StringBuffer temp = new StringBuffer();
    for (i = 0; i < tempCharArray.length; i++) {
      temp.append(getConvertedString(tempCharArray[i]));
    }
    return temp.toString();
  }

  public void write(String fragment) {
    writeNonConverted(convert(fragment));
  }

  public void writeln(String line) {
    writelnNonConverted(convert(line));
  }

  public void writelnNonConverted(String line) {
    writeNonConverted(line + "\r\n");
  }

  public void writeNonConverted(String fragment) {
    try {
      out.write(fragment);
    }
    catch ( IOException e2 ) {
      Logger.getInstance().error(getClass(), e2);
    }
  }
  
  /**
   * Presents the created file in the browser.
   */
  public void presentInBrowser() {
    if (out != null) try {
      out.flush(); // if anybody forgot to close BufferedWriter
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
    }
    Browser.visitURL("file://" + outFile.getAbsolutePath());
  }

  /**
   * Closes the file.
   */
  public void close() {
    if (out != null) try {
      out.close(); // important to flush buffer!
      out = null;
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
    } 
    if (outStream != null) try {
      outStream.close();
      outStream = null;
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    }
    opened = false;
  }

  protected void finalize() throws Throwable {
    if (opened) close();
    super.finalize();
  }

}
