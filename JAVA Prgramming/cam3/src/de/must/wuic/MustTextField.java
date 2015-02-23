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

package de.must.wuic;

import javax.swing.*;

import de.must.io.Logger;

import java.awt.*;
import java.awt.event.*;
import java.util.Vector;

/* import java.io.*;
import java.awt.datatransfer.*;
import java.awt.dnd.*;  */

/**
 * JTextField without keystroke binding to VK_ENTER, with length control and
 * help context. The size is oriented to the char width of the char '0'
 * @author Christoph Mueller
 */
public class MustTextField extends JTextField implements ContextHelp, KeyListener, Undoable /*, DropTargetListener */ {

  static { // to get default button working!
    JTextField f = new JTextField();
    KeyStroke enter = KeyStroke.getKeyStroke(KeyEvent.VK_ENTER, 0);
    javax.swing.text.Keymap map = f.getKeymap();
    map.removeKeyStrokeBinding(enter);
  }

  private static boolean capitalizationByDefault = false;

  /**
   * Sets the default for capitalization.
   * @param capitalization whether capitalization should be default
   */
  public static void setCapitalizationByDefault(boolean capitalization) {
    capitalizationByDefault = capitalization;
  }

  protected boolean capitalization;
  private int columnWidth;
  private static final int maxColumns = 60;
  private boolean controlLength;
  private int maxChars;
  protected Toolkit thisToolkit;
  protected String textBefore = "";
  private String helpTopic;
  private String helpTarget;
  private boolean required = false;
  protected String editBeginValue = "";
  private boolean fileDropEnabled = false;
  protected MustTabbedPane locatedTabbedPane;
  protected int locatedTabbedPaneIndex;
  private Thread notificationThread;
  private boolean waitAgain;
  private VersionController versionController = new VersionController();
  private RightMouseProvider rightMouseProvider;

 /**
  * Constructs a new text field with a default size of 20 characters and no
  * length control.
  */
 public MustTextField() {
    this(20, 20, false);
  }

  /**
   * Constructs a new text field with the specified length.
   * @param length the length (size) of the text field
   * max char specification above
   */
  public MustTextField(int length) {
    this(length, length, false);
  }

  /**
   * Constructs a new text field with length, max chars and length control as specified.
   * length control.
   * @param length the length (size) of the text field
   * @param maxChars the max characters to be inserted
   * @param controlLength if true, characters are removed, if they exceed the
   * max char specification above
   */
  public MustTextField(int length, int maxChars, boolean controlLength) {
    super(length);
    if (length > maxColumns ) super.setColumns(maxColumns);
    this.maxChars = maxChars;
    this.controlLength = controlLength;
    setCapitalization(capitalizationByDefault);
    if (GlobalInWuicStd.fatCaret) setCaret(new MustCaret());
    try {
      addKeyListener(this);
      thisToolkit = getToolkit();
      // de.must.io.Logger.getInstance().info(getClass(), "setDropTarget in Init von " + getClass().getName());
      // For flat-rate use not mature!  setDropTarget(new DropTarget(this, (DropTargetListener)this));
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    };
    rightMouseProvider = RightMouseProvider.provide(this, versionController);
    if (versionController != null) versionController.reset("");
  }
  
  /**
   * Returns the right mouse provider.
   * @return the right mouse provider
   */
  public RightMouseProvider getRightMouseProvider() {
    return rightMouseProvider;
  }

  /**
   * Returns the maximum number of characters to be inserted.
   * @return the maximum number of characters to be inserted
   */
  public int getMaxChars() {
    return maxChars;
  }
  
  /**
   * Sets the maximum number of characters to be inserted
   * @param maxChars the max characters to be inserted
   */
  public void setMaxChars(int maxChars) {
    this.maxChars  = maxChars;
    controlLength = true;
  }
  
  /**
   * Sets the capitalization flag. If set, all typed letters are automatically
   * transformed to upper case;
   * Size of the text field is increased.
	 * @param capitalization whether all typed letters should be automatically transformed via upperCase();
	 */
	public void setCapitalization(boolean capitalization) {
    this.capitalization = capitalization;
    if (capitalization) {
      FontMetrics metrics = getFontMetrics(getFont());
      columnWidth = metrics.charWidth('N');
    } 
    setDocument(new MustDocument(capitalization));
  }
  
  /**
   * Sets on 'SelectAll' on event 'focusGained'.
   * Useful for query fields which will be replaced by new entry in most of the cases.
   */
  public void setOnSelectAllOnFocusGained() {
    addFocusListener(new java.awt.event.FocusAdapter() {
      public void focusGained(FocusEvent e) {
        selectAll();
      }
    });
  }

  /**
   * Sets the text.
   * @param newText the new text
   */
  public void setText(String text) {
    if (text == null) {
      text = "";
      Logger.getInstance().warn("MustTextField.setText(null) is not accepted - changed to '' - check data constellation");
    }
    String controlledText = text;
    if (controlLength && text.length() > maxChars) {
      controlledText = text.substring(0, maxChars);
    }
    boolean realChange = !text.equals(getText());
    super.setText(controlledText);
    textBefore = controlledText;
    if (versionController != null) versionController.reset(text);
    if (realChange) {
      setCaretPosition(0);
      fireContentChanged();
    }
  }

  /**
   * Sets the font.
   * @param f the new font.
   */
  public void setFont(Font f) {
    super.setFont(f);
    columnWidth = 0;
  }

  /**
   * Returns the column width.
   * @return the column width
   */
  protected int getColumnWidth() {
    if (columnWidth == 0) {
      FontMetrics metrics = getFontMetrics(getFont());
      columnWidth = metrics.charWidth('0');
    }
    return columnWidth;
  }

  /**
   * Returns the preferred size.
   * @return the preferred size
   */
  public Dimension getPreferredSize() {
    synchronized (getTreeLock()) {
      Dimension size = super.getPreferredSize();
      if (getColumns() != 0) {
        size.width = getColumns() * getColumnWidth() + 14; // Windows XP needs even more space
      }
      return size;
    }
  }

  /* public void enableFileDropXy() {
    // de.must.io.Logger.getInstance().info(getClass(), "enableFileDrop in " + getClass().getName());
    // addDropTargetListener(this);
    // addDropTargetListener((DropTargetListener)this);
    // DropTarget DT = new DropTarget(this, (DropTargetListener)this);
    // de.must.io.Logger.getInstance().info(getClass(), DT.isActive());
    // setDropTarget(DT);
    fileDropEnabled = true;
  } */

  /**
   * Sets the previously added component to be mandatory.
   * @param required whether the component is mandatory or not
   */
  public void setRequired(boolean required) {
    this.required = required;
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   */
  public void setHelpContext(String helpTopic) {
    setHelpContext(helpTopic, null);
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   * @param helpTarget the context help's target
   */
  public void setHelpContext(String helpTopic, String helpTarget) {
    this.helpTopic = helpTopic;
    this.helpTarget = helpTarget;
  }

  /**
   * Returns the topic of the component's help context.
   * @return the topic of the component's help context
   */
  public String getHelpTopic() {
    return helpTopic;
  }

  /**
   * Returns the target of the component's help context.
   * @return the target of the component's help context
   */
  public String getHelpTarget() {
    return helpTarget;
  }

  /**
   * Sets the component's location on the tabbed pane.
   * @param locatedTabbedPane the tabbed pane that contains this text field
   * @param locatedTabbedPaneIndex the page's index of the tabbed pane
   */
  public void setTabbedPaneLocation(MustTabbedPane locatedTabbedPane, int locatedTabbedPaneIndex) {
    this.locatedTabbedPane = locatedTabbedPane;
    this.locatedTabbedPaneIndex = locatedTabbedPaneIndex;
  }

  /**
   * Set focus on the receiving component if isRequestFocusEnabled returns true
   * and ensures, that the tabbed pane switches to the page where this text
   * field is located.
   */
  public void requestFocus() {
    if (locatedTabbedPane != null && locatedTabbedPaneIndex >= 0) {
      locatedTabbedPane.setSelectedIndex(locatedTabbedPaneIndex);
    }
    super.requestFocus();
  }

  /**
   * Returns true if the text field is specified as mandatory.
   * @return true if the text field is specified as mandatory
   */
  public boolean isRequired() {
    return required;
  }

  /**
   * Returns true if the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {
    if (required & getText().trim().equals("")) return true;
    return false;
  }

  /**
   * Sets the text as edit begin value which causes isModified to return false
   * as long as user doesn't change the value.
   * @param newText the new text
   */
  public void setTextAsEditBeginValue(String text) {
    setText(text);
    editBeginValue = text;
  }

  /**
   * Indicates whether the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled() {
    return(!getText().trim().equals(""));
  }

  public boolean isModified() {
    return(!getText().equals(editBeginValue));
  }
  
  /**
   * Returns the value of the text field before user started editing.
   * @return the value of the text field before user started editing
   */
  public String getEditBeginValue() {
    return editBeginValue;
  }

  @Override
  public void keyPressed(KeyEvent e) {
    de.must.wuic.ShortCutStd.interpret(e, this);
  }

  /**
   * Invoked when a key has been released. Used for length control.
   * @param e the key event
   */
  public void keyReleased(KeyEvent e) {
    if (isEditable()) {
      if (controlLength) {
        if (getText().length() > maxChars) {
          if (textBefore.length() == 0) {
            setText(getText().substring(0, maxChars));  // to cut if we paste in empty field - we don't want the field to be cleared in this case.
          } else {
            setText(textBefore);
          }
          thisToolkit.beep();
        }
      }
      if (versionController != null) versionController.interpret(e, getText(), (Undoable)this);
      if (!getText().equals(textBefore)) {
        fireContentChangedDelayed(e);
      }
      textBefore = getText();
    }
  }
  
  @Override
  public void keyTyped(KeyEvent e) {
  }
  
  /**
   * Returns true if the textfield is filled with more than spaces.
   * @return true if the textfield is filled with more than spaces
   */
  public boolean hasContent() {
    return getText().trim().length() > 0;
  }
  
  /**
   * Fires content change event after a delay. Thus, multiple typing may be treated as a single
   * content change.
   * @param e the key event causing the content change
   */
  protected void fireContentChangedDelayed(KeyEvent e) {
    if (contentChangeListener != null && contentChangeListener.size() > 0 &&
      (Character.isLetterOrDigit(e.getKeyChar())
        || e.getKeyCode() == KeyEvent.VK_DELETE
        || e.getKeyCode() == KeyEvent.VK_BACK_SPACE
        || e.isControlDown() && e.getKeyCode() == (int)'V'
        || e.isControlDown() && e.getKeyCode() == (int)'X'
      )
    ) {
      fireContentChangedDelayed();
    }
  }

  protected void fireContentChangedDelayed() {
    waitAgain = true;
    if (notificationThread == null) {
      notificationThread = new Thread(new Runnable() {
        public void run() {
          while (waitAgain) {
            try {
              waitAgain = false;
              Thread.sleep(200);
            } catch (InterruptedException e) {
              Logger.getInstance().error(getClass(), e);
            }
          }
          notificationThread = null;
          fireContentChanged();
        }
      });
      notificationThread.start();
    }
  }

//------------------------------------------------------------------------------

  private Vector<ContentChangeListener> contentChangeListener;

  /**
   * Adds the specified ContentChangeListener to receive content change events.
   */
  public synchronized void addContentChangeListener(ContentChangeListener l) {
    Vector<ContentChangeListener> v = contentChangeListener == null ? new Vector<ContentChangeListener>(2) : new Vector<ContentChangeListener>(contentChangeListener);
    if (!v.contains(l)) {
      v.addElement(l);
      contentChangeListener = v;
    }
  }

  /**
   * Removes the specified ContentChangeListener to receive data selection events
   * from this entity.
   * @see DataSelectionEvent
   */
  public synchronized void removeContentChangeListener(ContentChangeListener l) {
    if (contentChangeListener != null && contentChangeListener.contains(l)) {
      Vector<ContentChangeListener> v = new Vector<ContentChangeListener>(contentChangeListener);
      v.removeElement(l);
      contentChangeListener = v;
    }
  }

  protected void fireContentChanged() {
    if (contentChangeListener != null) {
      Vector<ContentChangeListener> listeners = contentChangeListener;
      int count = listeners.size();
      for (int i = 0; i < count; i++) {
        listeners.elementAt(i).contentChanged();
      }
    }
  }

  @Override
  public void undo() {
    if (versionController == null) return; 
    int caretPos = getCaretPosition();
    super.setText(versionController.getFormerContent());
    if (caretPos > getText().length()) {
      caretPos = getText().length();
    }
    setCaretPosition(caretPos);
  }

//------------------------------------------------------------------------------

  /* public void dragEnter(DropTargetDragEvent e) {
    if (isEnabled() & isEditable()) e.acceptDrag(DnDConstants.ACTION_COPY);
    else e.rejectDrag();
  }

  public void dragOver(DropTargetDragEvent e) {
    if (isEnabled() & isEditable()) e.acceptDrag(DnDConstants.ACTION_COPY);
    else e.rejectDrag();
  }

  public void dragExit(DropTargetEvent e) {}

  public void drop(DropTargetDropEvent e) {
    DropTargetContext targetContext = e.getDropTargetContext();

    if (isEnabled() & isEditable() & (e.getSourceActions() & DnDConstants.ACTION_COPY) != 0) {
      e.acceptDrop(DnDConstants.ACTION_COPY);
    }
    else {
      e.rejectDrop();
      return;
    }

    DataFlavor[] dataFlavors = e.getCurrentDataFlavors();
    DataFlavor transferDataFlavor = null;

    for (int i = 0; i < dataFlavors.length; i++) {
      if (dataFlavors[i].equals(DataFlavor.plainTextFlavor)) {
        transferDataFlavor = dataFlavors[i];
        Transferable t = e.getTransferable();
        InputStream is = null;
        try {
          is = (InputStream)t.getTransferData(transferDataFlavor);
        }
        catch (IOException ioe) {
          de.must.io.Logger.getInstance().error(getClass(), ioe);
          System.err.println(ioe.getMessage());
          targetContext.dropComplete(false);
          return;
        }
        catch (UnsupportedFlavorException ufe) {
          ufe.printStackTrace();
          System.err.println(ufe.getMessage());
          targetContext.dropComplete(false);
          return;
        }
        if (is == null) {
          targetContext.dropComplete(false);
        }
        else {
          try {
            Reader converter = new InputStreamReader(is);
            StringWriter sWriter = new StringWriter();
            int c;
            while ((c = converter.read()) != -1) {
              sWriter.write(c);
            }
            setText(sWriter.toString().trim());
          }
          catch (Exception ex) {
            de.must.io.Logger.getInstance().error(getClass(), ex);
            System.err.println(ex.getMessage());
            targetContext.dropComplete(false);
            return;
          }
        }
        break;
      }
      if (fileDropEnabled & dataFlavors[i].equals(DataFlavor.javaFileListFlavor)) {
        transferDataFlavor = dataFlavors[i];
        Transferable t  = e.getTransferable();
        try {
          java.util.List fl  = (java.util.List)t.getTransferData(transferDataFlavor);
          de.must.io.Logger.getInstance().info(getClass(), fl.get(0));
          File File1 = (File)fl.get(0);
          setText(File1.getPath());
        }
        catch (IOException ioe) {
          de.must.io.Logger.getInstance().error(getClass(), ioe);
          System.err.println(ioe.getMessage());
          targetContext.dropComplete(false);
          return;
        }
        catch (UnsupportedFlavorException ufe) {
          ufe.printStackTrace();
          System.err.println(ufe.getMessage());
          targetContext.dropComplete(false);
          return;
        }
        break;
      }
    }
    targetContext.dropComplete(true);
  }

  public void dropActionChanged(DropTargetDragEvent e) {}   */

}
