/*
 * Copyright (c) 1999-2012 Christoph Mueller. All rights reserved.
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

import java.io.*;
import java.net.URL;

/**
 * Text file for input use.
 * <pre><code>
 * Sample:
 *     textFile = new TextFile("Xy.txt");
 *     String temp;
 *     while ((temp = textFile.readLine()) != null) {
 *       list.addItem(temp);
 *     }
 * </code></pre>
 * @see de.must.dataobj.DataTextObject
 * @see de.must.dataobj.DataTextObjectWithDelimiter
 * @author Christoph Mueller
 */
public class TextFile {

  public static final String validChars = " \t^1234567890ß´°!\"§$%&/()=?`@€~|µqwertzuiopü+asdfghjklöä#<yxcvbnm,.-QWERTZUIOPÜ*ASDFGHJKLÖÄ'>YXCVBNM;:_";
  public static final String ENCODING_ANSI = "Cp1252";
  public static final String ENCODING_ASCII = "Cp850";
  public static final String ENCODING_UTF8 = "UTF8";
  public static final String ENCODING_UNICODE = "Unicode";
  public static final int OPENING_FROM_CURRENT_DIRECTORY = 0;
  public static final int OPENING_FROM_CLASS_LOADER = 1;
  private int openingFrom;
  private String encoding;
  private String fileName;
  private FileInputStream fis;
  private InputStreamReader isr;
  private BufferedReader bufferedReader;
  private boolean opened = false;
  private String openResultText = "";
  private String line;
  private String filePath;

  /**
   * Constructs a new text file object and opens the file as specified searching in the path.
   * @param fileName the name of the file to use
   */
  public TextFile (String fileName) {
    this(fileName, null, OPENING_FROM_CURRENT_DIRECTORY);
  }

  /**
   * Constructs a new text file object and opens the file as specified searching in the path.
   * @param fileName the name of the file to use
   * @param encoding the encoding type
   * @see #ENCODING_ASCII
   */
  public TextFile (String fileName, String encoding) {
    this(fileName, encoding, OPENING_FROM_CURRENT_DIRECTORY);
  }

  /**
   * Constructs a new text file object and opens the file as specified searching as specified in openingForm.
   * @param fileName the name of the file to use
   * @param openingFrom the reference type from which directory the file to open is referenced
   * @see #ENCODING_ASCII
   */
  public TextFile (String fileName, int openingFrom) {
  	this(fileName, null, openingFrom);
  }

  /**
   * Constructs a new text file object and opens the file as specified searching as specified in openingForm.
   * @param fileName the name of the file to use
   * @param encoding the encoding type
   * @param openingFrom the reference type from which directory the file to open is referenced
   * @see #ENCODING_ASCII
   */
  public TextFile (String fileName, String encoding, int openingFrom) {
    this.fileName = fileName;
    this.encoding = encoding;
    this.openingFrom = openingFrom;
    java.util.Locale.setDefault(java.util.Locale.GERMAN);
    if (!openTextLineReader ()) {
      openResultText = "Cannot access " + fileName;
    }
  }

  public TextFile(InputStreamReader isr) {
    bufferedReader = new BufferedReader(isr);
    opened = true;
  }
  
  /**
   * Returns true if the file is open.
   * @return true if the file is open
   */
  public boolean isOpen() {
    return opened;
  }

  /**
   * Returns the open result text which is "" if everything is OK.
   * @return the open result text
   */
  public String getOpenResultText() {
    return openResultText;
  }

  private boolean openTextLineReader () {
    URL url;
    InputStream in;
    isr = null;
    switch(openingFrom) {
    case OPENING_FROM_CLASS_LOADER:
	    ClassLoader cl = getClass().getClassLoader();
      if (cl != null) {
        // workaround area 1 begin
        url = cl.getResource(fileName);
        if (url != null) {
          filePath = url.getPath();
          if (filePath.startsWith("/C:") || filePath.startsWith("/D:")) { // windows only!
            filePath =  filePath.substring(1, filePath.length());
          }
          url = null; 
        }
        // workaround area 1 ending
        de.must.io.Logger.getInstance().debug(getClass(), "Looking via classloader for " + fileName);
        in = cl.getResourceAsStream(fileName);
      } else {
        de.must.io.Logger.getInstance().debug(getClass(), "Looking statically system resource...");
        in = ClassLoader.getSystemResourceAsStream(fileName);
      }
      if (in == null) { // not found
        de.must.io.Logger.getInstance().debug(getClass(), "no input stream");
        opened = false;
        return false;
      } else { // workaround area 2 begin
        String filePathToCheck = filePath;
        de.must.io.Logger.getInstance().debug(getClass(), "check " + filePathToCheck);
        File fileToCheck = new File(filePathToCheck);
        de.must.io.Logger.getInstance().debug(getClass(), "exists?: " + fileToCheck.exists());
        if (!fileToCheck.exists()) {
          // in.close();
          opened = false;
          return false;
        }
        fileToCheck = null;
      } // workaround area ending
      if (encoding != null) {
				try {
					isr = new InputStreamReader(in, encoding);
				} catch (UnsupportedEncodingException e) {
          de.must.io.Logger.getInstance().error(getClass(), e);
				}
      } else {
        isr = new InputStreamReader(in);
      }
      break;
    default:
      try { 	
        fis = new FileInputStream(fileName);
        if (encoding == null) isr = new InputStreamReader(fis);
        else isr = new InputStreamReader(fis, encoding);
      }
      catch (IOException e) {
        // de.must.io.Logger.getInstance().error(getClass(), e);
        opened = false;
        return false;
      }
      break;
    }
    bufferedReader = new BufferedReader(isr);
    opened = true;
    return true;
  }

  /**
	 * Returns the absolute file path of a file previously accessed by class loader.
   * Workaround to multiple access of different files by the same name 
	 * @return the absolute file path of a file previously accessed by class loader
	 */
	public String getFilePath() {
    return filePath;
  }

  /**
   * Causes the sequential read to restart from beginning.
   */
  public void StartFromBeginning() {
    try {
      bufferedReader.close();
    }
    catch ( IOException e ) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    openTextLineReader();
  }

  /**
   * Reads the next line and buffers it to be fetched by getLine.
   * @return true if a line was found
   */
  public boolean nextLine () {
    readLine();
    if (line == null) return false;
    return true;
  }
  
  /**
   * Returns true if line contains not-text-data.
   * @return true if line contains not-text-data
   */
  public boolean lineContainsNonTextData() {
    char[] chars = line.toCharArray();
    for (int i = 0; i < chars.length; i++) {
      if (validChars.indexOf(chars[i]) == -1) return true;
    }
    return false;
  }

  /**
   * Return the line as previously read by nextLine().
   * @return the line as previously read by nextLine
   * @see #nextLine
   */
  public String getLine () {
    return line;
  }

  /**
   * Reads the next line and returns its value, which is null in EOF case.
   * @return the next line of the file
   */
  public String readLine() {
    try {
      line = bufferedReader.readLine();
      if (line != null && line.length() > 0 && (int)line.charAt(0) == 65279) { // BOM Byte Order Mark / UTF-8
        line = line.substring(1, line.length());
      }
    }
    catch ( IOException e ) {
      line = null;
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    return line;
  }

  /**
   * Closes the text file.
   */
  public void close() {
    if (isOpen()) try {
      bufferedReader.close();
      if (isr != null) isr.close();
      if (fis != null) fis.close();
    } catch ( IOException e2 ) {}
  }

  /**
   * Delete the text file after closing it.
   */
  public void delete() {
    File fileToDelete;
    close();
    switch(openingFrom) {
    case OPENING_FROM_CLASS_LOADER:
      try {
        ClassLoader cl = getClass().getClassLoader();
        URL url = cl.getResource(fileName);
        String filePathToDelete = url.getPath();
        if (filePathToDelete.startsWith("/C/")) { // windows only!
          filePathToDelete =  filePathToDelete.substring(1, filePathToDelete.length());
        }
        url = null; 
        de.must.io.Logger.getInstance().debug(getClass(), "want to delete " + filePathToDelete);
        fileToDelete = new File(filePathToDelete);
        de.must.io.Logger.getInstance().debug(getClass(), "exists?: " + fileToDelete.exists());
        de.must.io.Logger.getInstance().debug(getClass(), "canwrite?: " + fileToDelete.canWrite());
        boolean success = fileToDelete.delete();
        de.must.io.Logger.getInstance().debug(getClass(), "success?: " + success);
      }
      catch (Exception e) {
        de.must.io.Logger.getInstance().error(getClass(), e);
      }
      break;
    default:  
      fileToDelete = new File(fileName);
      fileToDelete.delete();
      break;
    }
  }

  /**
   * Closes the file.
   */
  protected void finalize() {
    close();
    try {
      super.finalize ();
    }
    catch ( Throwable t ) {
    }
  }

}

