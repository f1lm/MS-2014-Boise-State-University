/*
 * Copyright (c) 1999-2005 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.DataObject;
import de.must.dataobj.Identifier;

import java.io.File;

/**
 * @author Christoph Mueller
 */
public class DataImageViewer extends ImageViewer implements Presentable {

  private static final String[] extensions = {"gif", "jpg", "jpeg", "png", "GIF", "JPG", "JPEG", "PNG"};

  protected String fromCurrentDirToWebapps = "../webapps";
  protected DataObject assignedDataObject;
  protected String prefix = "";

  public DataImageViewer(SessionData sessionData, String imageDirectory, DataObject assignedDataObject) {
    super(sessionData, imageDirectory);
    this.assignedDataObject = assignedDataObject;
  }  

  /**
   * Returns the assigned data object.
   * @return the assigned data object
   */
  public DataObject getAssignedDataObject() {
    return assignedDataObject;
  }

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    Identifier id = assignedDataObject.getIdentifier();
    setImageToDisplay(null);
    for (int i = 0; i < extensions.length; i++) {
      String imageDirectoryFromBin = fromCurrentDirToWebapps + sessionData.global.contextPath + "/" + imageDirectory;
      String imageFileName = prefix + id.getIntIdentifier() + "." + extensions[i];
      String imageFilePath = imageDirectoryFromBin + "/" + imageFileName;
      File testFile = new File(imageFilePath);
      // de.must.io.Logger.getInstance().info(getClass(), "checking " + imageFilePath);
      if (testFile.exists()) {
        setImageToDisplay(sessionData.global.contextPath + "/" + imageDirectory + "/" + imageFileName);
        return;
      }
    }
  }

}

