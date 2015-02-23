/*
 * Copyright (c) 2001-2006 Christoph Mueller. All rights reserved.
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

import java.io.*;

/**
 * Native interface to Word for Windows for batch mode use. Each instance uses
 * a separate Word process.
 * To create a new document, to serve bookmarks and to print it by your java
 * application, code like this:
 * <pre><code>
 *    try {
 *     BatchWordProcessing bwp = new BatchWordProcessing();
 *     // first document
 *     bwp.createNewDocumentFromTemplate("SampleTemplate");
 *     bwp.typeTextAtBookmark("AddressLine1", "O'Reilly & Associated, Inc.");
 *     bwp.typeTextAtBookmark("AddressLine2", "Mr Miller");
 *     bwp.typeTextAtBookmark("AddressLine3", "101 Moris Street");
 *     bwp.typeTextAtBookmark("AddressLine4", "Sebastopol, CA 95472-9902");
 *     bwp.typeTextAtBookmark("Salutation", "Dear Mr Miller,");
 *     bwp.printAndForget();
 *     // next document
 *     bwp.createNewDocumentFromTemplate("SampleTemplate");
 *     bwp.typeTextAtBookmark("AddressLine1", "Company X");
 *     bwp.typeTextAtBookmark("AddressLine2", "Mister A");
 *     bwp.printAndForget();
 *     // next document
 *     bwp.createNewDocumentFromTemplate("SampleTemplate");
 *     bwp.typeTextAtBookmark("AddressLine1", "Frima Y");
 *     bwp.typeTextAtBookmark("AddressLine2", "Herrn B");
 *     bwp.printAndForget();
 *     // finally
 *     bwp.quitApplicationAfterWaiting(5000);
 *     bwp.exec();
 *   } catch(IOException ioe) {
 *     de.must.io.Logger.getInstance().error(getClass(), ioe);
 *   }
 * </code></pre>
 * By default, WordAPI.exe will wait 5000 milliseconds after the last command
 * sent to word (e.g. print) before it tries to quit the word application. 
 * Thus, word terminating problems are avoided. Use higher waiting 
 * intervals if necessary, e.g. <code>quitApplicationAfterWaiting(10000)</code>
 * @author Christoph Mueller
 */
public class BatchWordProcessing extends AbstractWordProcessing {

  /**
   * Creates a batch word processing driver.
   */
  public BatchWordProcessing() throws IOException {
  }

// Maybe later:
//  /**
//   * Creates a batch word processing driver.
//   * @param inputFileName the name of the input file to be used by the driver
//   */
//  public BatchWordProcessing(String inputFileName) throws IOException {
//    super(inputFileName);
//  }

  /**
   * Creates a batch word processing driver.
   * @param inputFileName the name of the input file to be used by the driver
   * @param logFileName the name of the log file to be used by the driver
   */
  public BatchWordProcessing(String inputFileName, String logFileName) throws IOException {
    super(inputFileName, logFileName);
  }

  /**
   * Returns the name of the executable to be used.
   * @return the name of the executable to be used
   */
  protected String getDriverExecutableName() {
    return "SWordAPI.exe";
  }

}
