/*
 * Copyright (c) 2006-2010 Christoph Mueller. All rights reserved.
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

import java.awt.Frame;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.IOException;

import javax.swing.JFileChooser;

import de.must.io.Logger;
import de.must.util.Browser;

/**
 * A component to choose and present external links.
 * @author Christoph Mueller
 */
public class ExternalLink {

  private Frame ownerFrame;
  protected MustTextField infoLink;
  private JFileChooser fileDialog;
  private JFileChooser directoryDialog;
  private MustButton linkChooseButton;
  private MustButton directoryChooseButton;
  private MustButton linkCallButton;
  private boolean fileOnly;
  private boolean noOpen;

  public ExternalLink(Frame ownerFrame, MustTextField infoLink) {
    super();
    this.infoLink = infoLink;
    create(ownerFrame);
    if (infoLink instanceof InfoLinkTextField) ((InfoLinkTextField)infoLink).set(this);
    if (infoLink instanceof InfoLinkTextField2) ((InfoLinkTextField2)infoLink).set(this);
  }
  
  public void create(Frame ownerFrame) {
    this.ownerFrame = ownerFrame;
    linkCallButton = MustButton.create("Open24.gif", "O");
    linkCallButton.setToolTipText(getTranslation("TEXT_OPEN"));
    linkCallButton.setEnabled(false);
    linkChooseButton = new MustButton(getTranslation("TEXT_CHOOSE_FILE"));
    linkChooseButton.setToolTipText(getTranslation("TEXT_CHOOSE_FILE_WITH_EXTERNAL_INFORMATION"));
    directoryChooseButton = new MustButton(getTranslation("TEXT_CHOOSE_DIRECTORY"));
    directoryChooseButton.setToolTipText(getTranslation("TEXT_CHOOSE_DIRECTORY_WITH_EXTERNAL_INFORMATION"));
    
    linkChooseButton.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        if (fileDialog == null) fileDialog = new JFileChooser();
        fileDialog.setDialogTitle(getTranslation("TEXT_CHOOSE_FILE_WITH_EXTERNAL_INFORMATION"));
        File file;
        if (infoLink.getText().length() > 0 && (file = new File(infoLink.getText())).exists()) {
          fileDialog.setSelectedFile(file);
        }
        if (fileDialog.showOpenDialog(ExternalLink.this.ownerFrame) == JFileChooser.APPROVE_OPTION) {
          ExternalLink.this.infoLink.setText(fileDialog.getSelectedFile().getPath());
          checkLinkCallButtonEnabled();
        }
      }
    });

    directoryChooseButton.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        if (directoryDialog == null) directoryDialog = new JFileChooser();
        directoryDialog.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
        directoryDialog.setDialogTitle(getTranslation("TEXT_CHOOSE_DIRECTORY_WITH_EXTERNAL_INFORMATION"));
        File file;
        if (infoLink.getText().length() > 0 && (file = new File(infoLink.getText())).exists()) {
          directoryDialog.setSelectedFile(file);
        }
        if (directoryDialog.showOpenDialog(ExternalLink.this.ownerFrame) == JFileChooser.APPROVE_OPTION
        && directoryDialog.getSelectedFile() != null) {
          ExternalLink.this.infoLink.setText(directoryDialog.getSelectedFile().getPath());
          checkLinkCallButtonEnabled();
        }
      }
    });

    linkCallButton.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        String fileName = ExternalLink.this.infoLink.getText();
        if (System.getProperty("os.name").toLowerCase().indexOf("linux")!=-1) {
          if (fileName.toLowerCase().endsWith(".pdf")) {
            try {
              Runtime.getRuntime().exec("acroread " + fileName);
              return;
            } catch (IOException e1) {
              Logger.getInstance().error(getClass(), e1);
            }
          }
          if (fileName.toLowerCase().startsWith("http://") || fileName.toLowerCase().startsWith("file://")) {
            if (Browser.visitURL(fileName)) return;
          }
          if (fileName.toLowerCase().startsWith("www.")) {
            if (Browser.visitURL("http://" + fileName)) return;
          }
          if (Browser.visitURL("file:///" + fileName)) return;
          StandardDialog.presentText(ExternalLink.this.ownerFrame, new String[] {"Datei " + fileName + " konnte nicht geöffnet werden."}, "Fehler beim Öffnen der externen Info");
        } else try { // windows
          Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler " + fileName);
        } catch (IOException e1) {
          Logger.getInstance().error(getClass(), e1);
          StandardDialog.presentText(ExternalLink.this.ownerFrame, new String[] {e1.getMessage()}, "Fehler beim Öffnen der externen Info");
        }
      }
    });
    
    infoLink.addContentChangeListener(new ContentChangeListener() {
      public void contentChanged() {
        checkLinkCallButtonEnabled();
      }
    });
   
  }

  public void setToolTipText(String text) {
    infoLink.setToolTipText(text);
  }
  
  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey) {
    return WuicGlobal.getInstance(ownerFrame.getLocale()).getResourceString(resourceKey);
  }

  private void checkLinkCallButtonEnabled() {
    linkCallButton.setEnabled(infoLink.getText().length() > 0);
  }
  
  /**
   * Adds the component to an attribute list
   * @param attributeList the attribute list to be extended
   * @param label the label of the component's row
   */
  public void addTo(AttributeList attributeList, String label) {
    attributeList.append(label, infoLink);
    attributeList.append(linkCallButton);
    attributeList.append(linkChooseButton);
    attributeList.append(directoryChooseButton);
  }
  
  public void setFileNotFolder() {
    fileOnly = true;
    directoryChooseButton.setVisible(false);
  }
  
  public boolean isFileOnly() {
    return fileOnly;
  }
  
  public void setNoOpen() {
    linkCallButton.setVisible(false);
  }

  /**
   * Enables or disables the choose buttons.
   * @param b whether or not this component is editable 
   */
  public void setEditable(boolean b) {
    // don't set infoLink editable because infoLink might call this method and cause a loop.
    linkChooseButton.setEnabled(b);
    directoryChooseButton.setEnabled(b);
  }
  
  public void setEnabled(boolean b) {
    infoLink.setEnabled(b);
    linkChooseButton.setEnabled(b);
    directoryChooseButton.setEnabled(b);
  }
  
}
