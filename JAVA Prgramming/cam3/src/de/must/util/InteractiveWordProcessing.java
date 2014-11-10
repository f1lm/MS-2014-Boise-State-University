/*
 * Copyright (c) 2006 Christoph Mueller. All rights reserved.
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
 * Native interface to Word for Windows for interactive mode use.
 * To create a new document and to serve bookmarks by your java application
 * code like this:
 * <pre>
 *       InteractiveWordProcessing iwp = new InteractiveWordProcessing();
 *       iwp.createNewDocumentFromTemplate("SampleTemplate");
 *       iwp.typeTextAtBookmark("AddressLine1", "O'Reilly & Associated, Inc.");
 *       iwp.typeTextAtBookmark("AddressLine2", "Mr Miller");
 *       iwp.typeTextAtBookmark("AddressLine3", "101 Moris Street");
 *       iwp.typeTextAtBookmark("AddressLine4", "Sebastopol, CA 95472-9902");
 *       iwp.typeTextAtBookmark("Salutation", "Dear Mr Miller,");
 *       iwp.exec();
 * </pre>
 * @author Christoph Mueller
 */
public class InteractiveWordProcessing extends AbstractWordProcessing {

  /**
   * Creates a interactive word processing driver.
   */
  public InteractiveWordProcessing() throws IOException {
  }

  /**
   * Triggers to the template selection dialog and creates a new document
   * based on the chosen template.
   */
  public void createNewDocumentFromTemplateToSelectByUser() {
    output("@createNewDocumentFromTemplate", "TEMPLATE_TO_SELECT_BY_USER");
  }

  /**
   * Triggers to the printer selection dialog, prints the document
   * on the selected printer and closes the document without saving.
   */
  public void printToPrinterToSelectByUserAndForget() {
    output("@printAndForget", "PRINTER_TO_SELECT_BY_USER");
  }

  /**
   * Returns the name of the executable to be used.
   * @return the name of the executable to be used
   */
  protected String getDriverExecutableName() {
    return "WordAPI.exe";
  }

}