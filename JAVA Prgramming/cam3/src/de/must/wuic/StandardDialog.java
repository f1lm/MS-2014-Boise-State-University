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

import de.must.middle.ConfirmationMatter;
import de.must.middle.ConversationMatter;

import java.awt.*;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Locale;
import java.util.Vector;

/**
 * A pool of standard dialogs.
 * @author Christoph Mueller
 */
public class StandardDialog {

  protected static Cursor defaultCursor = new Cursor(Cursor.DEFAULT_CURSOR);
  protected static Cursor waitCursor = new Cursor(Cursor.WAIT_CURSOR);

  public StandardDialog() {
  }

  public static boolean deletionConfirmed(Frame ownerFrame) {
    causeWaitCursorInOwnerFrame(ownerFrame);
    DiDltDsimple dlg = new DiDltDsimple(optimize(ownerFrame));
    dlg.setVisible(true);
    releaseWaitCursorInOwnerFrame(ownerFrame);
    return dlg.isConfirmed();
  }

  /**
   * Ask the user whether he is sure to delete the named item
   * @param ownerFrame the frame which owns the dialog
   * @param toDelete
   * @return
   */
  public static boolean deletionConfirmed(Frame ownerFrame, String toDelete) {
    return deletionConfirmed(ownerFrame, new String[] {toDelete});
  }

  /**
   * Ask the user whether he is sure to delete the named items
   * @param ownerFrame the frame which owns the dialog
   * @param toDelete
   * @return
   */
  public static boolean deletionConfirmed(Frame ownerFrame, String[] toDelete) {
    causeWaitCursorInOwnerFrame(ownerFrame);
    DiDltD dlg = new DiDltD(optimize(ownerFrame));
    dlg.setSize(new Dimension(300, 200));
    dlg.setLocation(AwtConst.getCenterLocation(dlg.getSize()));
    dlg.setTitle(getTranslation(ownerFrame, "TEXT_CONFIRM_DELETION"));
    dlg.setToDelete(toDelete);
    dlg.setVisible(true);
    releaseWaitCursorInOwnerFrame(ownerFrame);
    return dlg.isConfirmed();
  }

  /**
   * Returns user's decision whether input should be saved, canceled or whether he wants to return to input form.
   * @param ownerFrame the frame which owns the dialog
   * @return user's decision whether input should be saved, canceled or whether he wants to return to input form
   */
  public static int saveCancelReturnDecision(Frame ownerFrame) {
    causeWaitCursorInOwnerFrame(ownerFrame);
    DiSaveCancelReturnD dlg = new DiSaveCancelReturnD(optimize(ownerFrame));
    dlg.setLocation(AwtConst.getCenterLocation(dlg.getSize()));
    dlg.setTitle(getTranslation(ownerFrame, "TEXT_CHANGES"));
    dlg.setVisible(true);
    releaseWaitCursorInOwnerFrame(ownerFrame);
    return dlg.getUserDecision();
  }

  public static boolean handle(Frame ownerFrame, ConversationMatter matter) {
    if (matter instanceof ConfirmationMatter) {
      return generalConfirme(optimize(ownerFrame), matter.getTitle(), matter.getLines());
    } else {
      presentText(ownerFrame, matter.getLines(), matter.getTitle());
      return true;
    }
  }

  private static boolean generalConfirme(Frame ownerFrame, ConfirmationMatter matter) {
    return generalConfirme(optimize(ownerFrame), matter.getTitle(), matter.getLines());
  }

  public static boolean generalConfirme(Frame ownerFrame, String[] presentText) {
    return generalConfirme(optimize(ownerFrame), getTranslation(ownerFrame, "TEXT_INFORMATION"), presentText);
  }

  /**
   * Presents a text to confirm and returns user's decision.
   * @param ownerFrame the frame which owns the dialog
   * @param title the window title
   * @param presentText the text to present, each item of the vector means one line
   * @return whether or not the user confirmed the described action
   */
  public static boolean generalConfirme(Frame ownerFrame, String title, Vector<String> presentText) {
    causeWaitCursorInOwnerFrame(ownerFrame);
    StandardConfirmDialog dlg = new StandardConfirmDialog(optimize(ownerFrame));
    Iterator<String> iterator = presentText.iterator();
    while (iterator.hasNext()) {
      dlg.addLine(iterator.next());
    }
    dlg.setLocation(AwtConst.getCenterLocation(dlg.getSize()));
    dlg.setTitle(title);
    dlg.setVisible(true);
    releaseWaitCursorInOwnerFrame(ownerFrame);
    return dlg.isConfirmed();
  }

  /**
   *
   * @param ownerFrame the frame which owns the dialog
   * @param title the window title
   * @param presentText
   * @return
   */
  public static boolean generalConfirme(Frame ownerFrame, String title, String[] presentText) {
    causeWaitCursorInOwnerFrame(ownerFrame);
    StandardConfirmDialog dlg = new StandardConfirmDialog(optimize(ownerFrame));
    for (int i=0; i<presentText.length; i++) {
      if (presentText[i] != null) dlg.addLine(presentText[i]);
    }
    dlg.setLocation(AwtConst.getCenterLocation(dlg.getSize()));
    dlg.setTitle(title);
    dlg.setVisible(true);
    releaseWaitCursorInOwnerFrame(ownerFrame);
    return dlg.isConfirmed();
  }

  /**
   *
   * @param ownerFrame the frame which owns the dialog
   * @param presentText
   */
  public static void presentText(Frame ownerFrame, String[] presentText) {
    presentText(optimize(ownerFrame), presentText, getTranslation(ownerFrame, "TEXT_INFORMATION"));
  }

  public static void presentText(Frame ownerFrame, String[] presentText, String title) {
    presentText(ownerFrame, presentText, title, null);
  }

  public static void presentText(Frame ownerFrame, String[] presentText, String title, Font font) {
    causeWaitCursorInOwnerFrame(ownerFrame);
    DiPrTxD dlg = new DiPrTxD(optimize(ownerFrame));
    if (font != null) dlg.centerTextArea.setFont(font);
    Vector<String> content = new Vector<String>();
    content.addAll(Arrays.asList(presentText));
    dlg.setContent(content);
    dlg.setLocation(AwtConst.getCenterLocation(dlg.getSize()));
    dlg.setTitle(title);
    dlg.setVisible(true);
    releaseWaitCursorInOwnerFrame(ownerFrame);
  }

  public static void presentText(Frame ownerFrame, Vector<String> presentText, String title) {
    presentText(ownerFrame, presentText, title, null);
  }

  public static void presentText(Frame ownerFrame, Vector<String> presentText, String title, Font font) {
    causeWaitCursorInOwnerFrame(ownerFrame);
    DiPrTxD dlg = new DiPrTxD(optimize(ownerFrame));
    if (font != null) dlg.centerTextArea.setFont(font);
    dlg.setContent(presentText);
    dlg.setLocation(AwtConst.getCenterLocation(dlg.getSize()));
    dlg.setTitle(title);
    dlg.setVisible(true);
    releaseWaitCursorInOwnerFrame(ownerFrame);
  }

  public static String getStringInput(Frame ownerFrame, String title) {
    return getStringInput(ownerFrame, title, "");
  }

  public static String getStringInput(Frame ownerFrame, String title, String defaultText) {
    causeWaitCursorInOwnerFrame(ownerFrame);
    DiGetTextD dlg = new DiGetTextD(optimize(ownerFrame));
    dlg.setLocation(AwtConst.getCenterLocation(dlg.getSize()));
    dlg.setTitle(title);
    dlg.setStartText(defaultText);
    dlg.setVisible(true);
    releaseWaitCursorInOwnerFrame(ownerFrame);
    return dlg.getEnterText();
  }

  public static Frame optimize(Frame ownerFrame) {
    if (ownerFrame != null) return ownerFrame;
    if (MainStd.getMainFrame() != null) return MainStd.getMainFrame();
    return null;
  }

  private static void causeWaitCursorInOwnerFrame(Frame ownerFrame) {
    Frame frameToControlCursor = null;
    if (ownerFrame != null) frameToControlCursor = ownerFrame;
    else if (MainStd.getMainFrame() != null) frameToControlCursor = MainStd.getMainFrame();
    if (frameToControlCursor != null) {
      frameToControlCursor.setCursor(waitCursor);
    }
  }

  private static void releaseWaitCursorInOwnerFrame(Frame ownerFrame) {
    Frame frameToControlCursor = null;
    if (ownerFrame != null) frameToControlCursor = ownerFrame;
    else if (MainStd.getMainFrame() != null) frameToControlCursor = MainStd.getMainFrame();
    if (frameToControlCursor != null) {
      frameToControlCursor.setCursor(defaultCursor);
    }
  }

  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected static String getTranslation(Frame ownerFrame, String resourceKey) {
    Locale locale = Locale.US;
    if (ownerFrame != null) {
      ownerFrame.getLocale();
    }
    return WuicGlobal.getInstance(locale).getResourceString(resourceKey);
  }

  //----------------------------------------------------------------------------


  static class StandardConfirmDialog extends JDialog implements java.awt.event.ActionListener {

    private boolean controledExternal = false;
    private JPanel panelTop = new JPanel();
    private JTextArea centerTextArea = new JTextArea();
    private JPanel panelBottom = new JPanel();
    private JPanel panelButtons = new JPanel();
    private JPanel panelButtonLine1 = new JPanel();
    private MustStatusLabel statusLabel = new MustStatusLabel();
    private MustButton buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), "BtnOk", this);
    private MustButton buttonCancel = new MustButton(getTranslation("TEXT_CANCEL_BUTTON"), "BtnCancel", this);
    private boolean confirmed = false;

    public StandardConfirmDialog(Frame ownerFrame) {
      super(ownerFrame, true);
      centerTextArea.setEditable(false);
      getContentPane().setLayout(new BorderLayout());
      setSize(new Dimension(400, 300));
      buttonOk.setPreferredWidth(70);
      getContentPane().add("North", panelTop);
      panelTop.setLayout(new BorderLayout());
      getContentPane().add(new JScrollPane(centerTextArea), BorderLayout.CENTER);
      getContentPane().add(panelBottom, BorderLayout.SOUTH);
      panelBottom.setLayout(new BorderLayout());
      panelBottom.add(panelButtons, BorderLayout.CENTER);
      panelButtons.add("North", panelButtonLine1);
      panelBottom.add(statusLabel, BorderLayout.SOUTH);
      panelButtons.add(buttonOk);
      panelButtons.add(buttonCancel);
    }

    /**
     * Returns a text in the corresponding language according to the locale
     * specific resource bundle of the package.
     * @param resourceKey the key of the resource to retrieve
     * @return the resource
     */
    protected String getTranslation(String resourceKey) {
      return WuicGlobal.getInstance(getLocale()).getResourceString(resourceKey);
    }

    public void addLine(String line) {
      centerTextArea.append(line + "\n");
    }

    public boolean isConfirmed() {
      return confirmed;
    }

    public void actionPerformed(java.awt.event.ActionEvent e) {
      String actCommand = e.getActionCommand();
      if (actCommand.equals("BtnOk")) {
        confirmed = true;
        setVisible(false);
        dispose();
      } else if (actCommand.equals("BtnCancel")) {
        confirmed = false;
        setVisible(false);
        dispose();
      }
    }

  }

}
