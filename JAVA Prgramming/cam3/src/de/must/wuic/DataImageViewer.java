/*
 * Copyright (c) 2001-2012 Christoph Mueller. All rights reserved.
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

package de.must.wuic;

import de.must.dataobj.DataObject;
import de.must.dataobj.Identifier;
import de.must.io.Logger;

import javax.swing.*;

import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.Transferable;
import java.awt.dnd.DnDConstants;
import java.awt.dnd.DropTarget;
import java.awt.dnd.DropTargetDragEvent;
import java.awt.dnd.DropTargetDropEvent;
import java.awt.dnd.DropTargetEvent;
import java.awt.dnd.DropTargetListener;
import java.awt.event.MouseEvent;
import java.io.*;
import java.util.AbstractList;

/**
 * Component to add and display an image assigned to a table row.
 * @author Christoph Mueller
 */
public class DataImageViewer extends ImageViewer implements DataComponent, DropTargetListener {
  
  protected DataObject assignedDataObject;
  private boolean editable = true;
  private String imageDirectory = ".";
  private String prefix = "I";
  private String[] extensions = {"jpg", "jpeg", "gif", "png"};
  private DataFlavor acceptedFlavor;
  private File lastDirectory;
  private File newlyAssignedFile = null;

  /**
   * Constructs a new image viewer.
   * @param dO the data object to assign to
   * @param imageDirectory the directory to file the image
   * @param prefix the prefix for the file name. This character(s) will be combined
   * with the internal identifier to produce the file name.
   */
  public DataImageViewer(final java.awt.Frame parent, DataObject dO, String imageDirectory, String prefix) {
    assignedDataObject = dO;
    this.imageDirectory = imageDirectory;
    this.prefix = prefix;
    addMouseListener(new java.awt.event.MouseAdapter() {
      public void mousePressed(MouseEvent e) {
        if (/* e.isPopupTrigger() ??? */e.getModifiers() == 4) {
          if (editable) {
            JFileChooser fileChooser = new JFileChooser();
            fileChooser.setDialogTitle(WuicGlobal.getInstance(parent.getLocale()).getResourceString("TEXT_SELECT_IMAGE_TO_IMPORT"));
            fileChooser.setFileFilter(new ImageFileFilter());
            if (lastDirectory != null) fileChooser.setCurrentDirectory(lastDirectory);
            fileChooser.showOpenDialog(parent);
            lastDirectory = fileChooser.getCurrentDirectory();
            newlyAssignedFile = fileChooser.getSelectedFile();
            if (newlyAssignedFile != null) {
              loadImageByCompletePath(fileChooser.getSelectedFile().getPath());
            }
          } else {
            StandardDialog.generalConfirme(null, "Hint", new String[]{"Not in edit mode"});
          }
        }
      }
    });
    try {
      acceptedFlavor = new DataFlavor("application/x-java-file-list; class=java.util.List");
      new DropTarget(this, DnDConstants.ACTION_COPY_OR_MOVE, this);
    } catch (ClassNotFoundException e) {
      Logger.getInstance().error(getClass(), e);
    }
  }

  /**
   * Returns the assigned data object.
   * @return the assigned data object
   */
  public DataObject getAssignedDataObject() {
    return assignedDataObject;
  }

  /**
   * Determines whether input is required (mandatory).
   * @param required if true, input is mandatory; otherwise, input is not mandatory
   */
  public void setRequired(boolean required) {}

  /**
   * Loads the component's database stored value.
   */
  public void loadValue() {
    newlyAssignedFile = null;
    Identifier id = assignedDataObject.getIdentifier();
    for (int i = 0; i < extensions.length; i++) {
      String imageFileName = imageDirectory + "/" + prefix + id.getIntIdentifier() + "." + extensions[i];
      File testFile = new File(imageFileName);
      if (testFile.exists()) {
        loadImageByCompletePath(imageFileName);
        return;
      }
    }
    initialize();
  }

  /**
   * Loads the image from the specified path and signs it as newly assigned.
   * @param path the path of the image to load
   */
  public void loadImageByCompletePathAsNew(String path) {
    super.loadImageByCompletePath(path);
    newlyAssignedFile = new File(path);
  }
  
  /**
   * Indicates whether the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled() {
    return true;
  }

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified() {
    return (newlyAssignedFile != null);
  }

  @Override
  public boolean isToSave() {
    return isModified();
  }
  
  /**
   * Indicates whether the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isContentValid() {
    return true;
  }

  /**
   * Indicates whether the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {
    return false;
  }

  /**
   * Selects all input of the component, if it is supported - e.g. in JTextField.
   * Allows easy new input, because the previous value is reseted when the
   * first key stroke occurs.
   */
  public void selectAll() {}

  /**
   * Set focus on the receiving component if isRequestFocusEnabled returns true.
   */
  public void requestFocus() {}

  /**
   * Stores the component's value.
   */
  public void saveValue() {
    if (newlyAssignedFile != null) {
      de.must.io.Logger.getInstance().debug(getClass(), "Saving " + newlyAssignedFile.getPath());
      copyFile(newlyAssignedFile);
      newlyAssignedFile = null;
    }
  }

  /* (non-Javadoc)
   * @see de.must.wuic.DataComponent#setEditable(boolean)
   */
  public void setEditable(boolean editable) {
    this.editable = editable;
  }

 /**
   * Sets the component's tool tip text.
   * @param toolTipText the component's tool tip text
   */
  public void setToolTipText(String toolTipText) {}

  /**
   * Adds a component modification listener to this component.
   * Needed e.g. for data components depending from a sublist.
   * @param l component modification listener to add
   */
  public void addComponentModificationListener(ComponentModificationListener l) {}

  /**
   * Removes a component modification listener to this component.
   * Needed e.g. for data components depending from a sublist.
   * @param l component modification listener to add
   * @see DataList
   */
  public void removeComponentModificationListener(ComponentModificationListener l) {}

  /* (non-Javadoc)
   * @see de.must.wuic.DataComponent#free()
   */
  public void free() {
  }

  private boolean copyFile(File inputFile) {
    String inputFileName = inputFile.getName();
    String extension = null;
    if (inputFileName.toLowerCase().endsWith(".jpeg")) extension = "jpeg";
    if (inputFileName.toLowerCase().endsWith(".jpg")) extension = "jpg";
    if (inputFileName.toLowerCase().endsWith(".gif")) extension = "gif";
    if (inputFileName.toLowerCase().endsWith(".png")) extension = "png";
    String outputFile = imageDirectory + "/" + prefix + assignedDataObject.getIdentifier().getIntIdentifier() + "." + extension;
    if (!de.must.util.FileCopy.copyFile(inputFile.getPath(), outputFile)) {
      de.must.wuic.StandardDialog.presentText(null, new String[] {"Kann Datei nicht kopieren!"});
      return false;
    }
    return true;
  }

  class ImageFileFilter extends javax.swing.filechooser.FileFilter {
    public boolean accept(java.io.File file) {
      if (file.isDirectory()) return true;
      for (int i = 0; i < extensions.length; i++) {
        if (file.getName().toLowerCase().endsWith("." + extensions[i])) return true;
      }
      return false;
    }

   /**
    * Returns the filter description.
    * @return the filter description
    */
    public String getDescription() {
      return "Images (*.gif, *.jpg, *.jpeg)";
    }
  }

  public void dragEnter(DropTargetDragEvent dtde) {
    validateDragEvent(dtde);
  }
  public void dragOver(DropTargetDragEvent dtde) {
    validateDragEvent(dtde);
  }
  public void dropActionChanged(DropTargetDragEvent dtde) { }
  public void dragExit(DropTargetEvent dte) { }

  @SuppressWarnings("unchecked")
  public void drop(DropTargetDropEvent dtde) {
    Transferable transferable = dtde.getTransferable();
    dtde.acceptDrop(DnDConstants.ACTION_COPY); // to avoid 'No drop current'
    Object transferedObject = null;
    try {
      transferedObject = transferable.getTransferData(acceptedFlavor);
      AbstractList<File> list = (AbstractList<File>)transferedObject;
      newlyAssignedFile = list.get(0);
      boolean rightFileType = false;
      for (int i = 0; i < extensions.length; i++) {
        if (newlyAssignedFile.getName().toLowerCase().endsWith("." + extensions[i])) {
          rightFileType = true;
          break;
        }
      }
      if (!rightFileType) {
        // dtde.rejectDrop(); // not possible any more because of previous acceptDrop
        return;
      }
      if (newlyAssignedFile != null) {
        loadImageByCompletePath(newlyAssignedFile.getPath());
      }
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
      StandardDialog.presentText(null, new String[]{e.getMessage()});
      // dtde.rejectDrop(); // not possible any more
    }
  }

  protected void validateDragEvent(DropTargetDragEvent e) {
    if (!editable) {
      e.rejectDrag();
      return;
    }
    DataFlavor[] flavors = e.getCurrentDataFlavors();
    for (int i = 0; i < flavors.length; i++) {
      if (!flavors[i].match(acceptedFlavor)) {
        e.rejectDrag();
        return;
      }
    }
    e.acceptDrag(DnDConstants.ACTION_COPY_OR_MOVE);
  }

}
