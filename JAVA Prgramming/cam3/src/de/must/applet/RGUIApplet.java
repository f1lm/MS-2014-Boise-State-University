/*
 * Copyright (c) 2011-2012 Christoph Mueller. All rights reserved.
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

package de.must.applet;

import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Vector;

import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.JApplet;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.UIManager;
import javax.swing.border.BevelBorder;

// import netscape.javascript.JSObject;

import de.must.applet.AppletGlobal.Veto;
import de.must.io.Logger;
import de.must.print.BarcodePrint;
import de.must.util.Callback;
import de.must.util.Crypt;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.ClosableTabbedPane;
import de.must.wuic.LoginPanel;
import de.must.wuic.MustButton;
import de.must.wuic.MustDialog;
import de.must.wuic.MustStatusLabel;
import de.must.wuic.TabMenu;

/**
 * Applet to realize remote graphical user interface.
 * @author Christoph Mueller
 */
public class RGUIApplet extends JApplet implements HostLineInterpreter {
  
  class LogWatcher implements Logger.Watcher {
    private JTextArea logArea;
    public LogWatcher(JTextArea logArea) {
      this.logArea = logArea;
    }
    @Override
    public void inform(String line) {
      logArea.append(line + "\n");
    }
  }
  
  private JMenuBar menuBar;
  private JPanel panelToolbar;
  private JPanel mainPanel;
  private boolean noTabs;
  private ClosableTabbedPane tabs;
  private TabMenu tabMenu;
  private JPanel panelBottom;
  private MustStatusLabel statusLabel;
  private JLabel logoutInfo;
  private Vector<JMenu> menuStack;
  private String title;
  private String concerning;
  private String concerningSubLevel1;
  private Action action;
  private JTextArea logArea;
  private CenterGUI currentCenterGUI;
  private String currentTitle;
  private boolean loginMandatory;
  private LoginPanel loginPanel;
  
  public final void init() {
    super.init();
    try {
      init2();
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
  private void init2() throws Exception {
    try {UIManager.setLookAndFeel(
      UIManager.getSystemLookAndFeelClassName());
    }
    catch (Exception e) { }
    Font refFont = (new JLabel()).getFont();
    setUIFont(new javax.swing.plaf.FontUIResource(new Font(refFont.getName(), refFont.getStyle(), 14)));
    MustDialog.storedLayout = false;
    AppletGlobal.getInstance().setApplet(this);
    String codeBase = getParameter("codebase");
    if (codeBase != null) AppletGlobal.getInstance().setCodeBase(codeBase);
    // AppletGlobal.getInstance().getApplet().getJMenuBar().add(new JLabel(AppletGlobal.getInstance().getImageIcon("icon16.png")));
//    try {
//      cookieTest1();
//      cookieTest2();
//    } catch (Exception e) {
//      Logger.getInstance().error(getClass(), e);
//    }
    startSession();
  }
  
  private void startSession() {
    startSession(null, null);
  }
  
  private void startSession(String userId, String password) {
    menuBar = new JMenuBar();
    setJMenuBar(menuBar);
    mainPanel = new JPanel();
    mainPanel.setLayout(new BorderLayout());
    mainPanel.add(new JLabel(AppletGlobal.getInstance().getImageIcon("start.png")), BorderLayout.CENTER);
    statusLabel = new MustStatusLabel();
    statusLabel.setFont(new Font(statusLabel.getFont().getName(), Font.BOLD, statusLabel.getFont().getSize()));
    logoutInfo = new JLabel();
    logoutInfo.setBorder(new BevelBorder(BevelBorder.LOWERED));
    panelBottom = new JPanel();
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(statusLabel, BorderLayout.CENTER);
    panelBottom.add(logoutInfo, BorderLayout.EAST);
    mainPanel.add(panelBottom, BorderLayout.SOUTH);
    setContentPane(mainPanel);
    menuStack = new Vector<JMenu>();
    AppletGlobal.getInstance().tasks = new Hashtable<String, AppletGlobal.Task>();
    try {
      Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
      if (userId != null) params.add(new KeyValuePairAlpha(Constants.USER_ID, userId));
      if (password != null) params.add(new KeyValuePairAlpha(Constants.PASSWORD, Crypt.encrypt(password)));
      AppletGlobal.getInstance().contactServer(params);
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
      AppletGlobal.getInstance().getApplet().setMessage(e.getMessage());
    }
    if (AppletGlobal.getInstance().tasks == null) {
      resetTabs();
    }
    if (AppletGlobal.debug) {
      logArea = new JTextArea();
      addTab("Log Content", new JScrollPane(logArea));
      Logger.getInstance().setWatcher(new LogWatcher(logArea));
    }
    AppletGlobal.getInstance().startLogoutControl(logoutInfo);
    AppletGlobal.getInstance().loggedOut = false;
    validate();
  }
  
//  private void cookieTest1() {
//    JSObject myBrowser = (JSObject) JSObject.getWindow(this);
//    JSObject myDocument =  (JSObject) myBrowser.getMember("document");
//    String myCookie = (String)myDocument.getMember("cookie");
//    Logger.getInstance().info(getClass(), "found cookie: >" +myCookie + "<");
//  }
//
//  private void cookieTest2() {
//    java.util.Calendar c = java.util.Calendar.getInstance();
//    c.add(java.util.Calendar.MONTH, 1);
//    String expires = "; expires=" + c.getTime().toString();
//    String s1 = "Mein Inhalt" + expires; 
//    Logger.getInstance().info(getClass(), s1);
//    JSObject myBrowser = JSObject.getWindow(this);
//    JSObject myDocument =  (JSObject) myBrowser.getMember("document");
//    myDocument.setMember("cookie", s1);
//  }
  
  /**
   * Sets the font for the user interface.
   * @param font the font for the user interface to use
   */
  protected void setUIFont(javax.swing.plaf.FontUIResource font) {
    Enumeration<?> keys = UIManager.getDefaults().keys();
    while (keys.hasMoreElements()) {
      Object key = keys.nextElement();
      Object value = UIManager.get(key);
      if (value instanceof javax.swing.plaf.FontUIResource) {
        UIManager.put(key, font);
      }
    }
  }
  
  public void resetTabs() {
    if (noTabs) return;
    resetTabDetails();
    recoverNoTabConstellation();
  }
  
  private void recoverNoTabConstellation() {
    mainPanel.removeAll();
    if (panelToolbar != null) mainPanel.add(panelToolbar, BorderLayout.NORTH);
    mainPanel.add(new JLabel(AppletGlobal.getInstance().getImageIcon("start.png")), BorderLayout.CENTER);
    mainPanel.add(panelBottom, BorderLayout.SOUTH);
    if (AppletGlobal.debug) {
      logArea = new JTextArea();
      addTab("Log Content", new JScrollPane(logArea));
      Logger.getInstance().setWatcher(new LogWatcher(logArea));
    }
    AppletGlobal.getInstance().tasks = new Hashtable<String, AppletGlobal.Task>();
    mainPanel.validate();
  }
  
  public void addTab(String title, JComponent component) {
    if (tabs == null) {
      tabs = new ClosableTabbedPane(AppletGlobal.getInstance());
      tabMenu = new TabMenu(tabs, AppletGlobal.getInstance());
      tabMenu.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent e) {
          int index = tabs.getSelectedIndex();
          closeTab(index, tabs.getTitleAt(index));
        }
      });
      mainPanel.removeAll();
      if (panelToolbar != null) mainPanel.add(panelToolbar, BorderLayout.NORTH);
      mainPanel.add(tabs, BorderLayout.CENTER);
      mainPanel.add(panelBottom, BorderLayout.SOUTH);
      mainPanel.validate();
    }
    tabs.addTab(title, component, new ClosableTabbedPane.CloseRequestReceiver() {
      public void close(int index) {
        closeTab(index, tabs.getTitleAt(index));
      }
    });
  }
  
  private void closeTab(int index, String title) {
    Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
    params.add(new KeyValuePairAlpha(Constants.TAB_OR_WINDOW_ID, title));
    params.add(new KeyValuePairAlpha(Constants.ACTION, Constants.ACTION_CLOSE_TAB));
    AppletGlobal.Task task = AppletGlobal.getInstance().tasks.get(title);
    if (task.gui instanceof ParamExtender) {
      ((ParamExtender)task.gui).extendParams(params);
    }
    try {
      Veto veto = null;
      if ((veto = AppletGlobal.getInstance().contactServer(params)) == null) {
        AppletGlobal.getInstance().tasks.remove(title);
        tabs.removeTabAt(index);
        currentTitle = null;
        currentCenterGUI = null;
        if (tabs.getTabCount() == 0) {
          resetTabDetails();
          recoverNoTabConstellation();
        }
      } else {
        setMessage(veto.message);
      }
    } catch (IOException e1) {
      Logger.getInstance().error(getClass(), e1);
    }
  }
  
  public void replaceUniqueContent(JComponent component) {
    mainPanel.removeAll();
    if (panelToolbar != null) mainPanel.add(panelToolbar, BorderLayout.NORTH);
    mainPanel.add(component, BorderLayout.CENTER);
    mainPanel.add(panelBottom, BorderLayout.SOUTH);
  }
  
  public void resetConcerning() {
    concerning = null;
    concerningSubLevel1 = null;
  }
  
  public void setMessage(String message) {
    statusLabel.setText(message);
  }
  
  @Override
  public void interpretLine(String line) {
    try {
      interpretLineE(line);
    } catch (RuntimeException e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
  private void interpretLineE(String line) throws RuntimeException {
    if (line.startsWith(Constants.ACTION_END_TAG)) {
      performAction();
    } else if (line.startsWith(Constants.ACTION_BEGIN_TAG)) {
      action = new Action();
    } else if (line.startsWith(Constants.TITLE_BEGIN)) {
      title = getContentBetween(line, Constants.TITLE_BEGIN, Constants.TITLE_END, 0);
    } else if (line.startsWith(Constants.TODO_TAG_BEGIN)) {
      action.toDo = getContentBetween(line, Constants.TODO_TAG_BEGIN, Constants.TODO_TAG_END, 0);
    } else if (line.startsWith(Constants.SOUND_TAG_BEGIN)) {
      AppletGlobal.getInstance().playSound(getContentBetween(line, Constants.SOUND_TAG_BEGIN, Constants.SOUND_TAG_END, 0));
    } else if (line.startsWith(Constants.CONCERNING_BEGIN)) {
      concerning = getContentBetween(line, Constants.CONCERNING_BEGIN, Constants.CONCERNING_END, 0);
    } else if (line.startsWith(Constants.CONCERNING_SUBLEVEL1_BEGIN_TAG)) {
      concerningSubLevel1 = getContentBetween(line, Constants.CONCERNING_SUBLEVEL1_BEGIN_TAG, Constants.CONCERNING_SUBLEVEL1_END_TAG, 0); 
    } else if (line.startsWith(Constants.NONSTANDARD_PANEL_BEGIN)) {
      action.nonstandardPanel = getContentBetween(line, Constants.NONSTANDARD_PANEL_BEGIN, Constants.NONSTANDARD_PANEL_END, 0);
    } else if (line.startsWith(Constants.NONSTANDARD_POSITION_BEGIN)) {
      action.nonstandardPos = Integer.valueOf(getContentBetween(line, Constants.NONSTANDARD_POSITION_BEGIN, Constants.NONSTANDARD_POSITION_END, 0));
    } else if (line.startsWith(Constants.LABEL_BEGIN)) {
      action.label = getContentBetween(line, Constants.LABEL_BEGIN, Constants.LABEL_END, 0);
    } else if (line.startsWith(Constants.ID_TAG_BEGIN)) {
      action.id = getContentBetween(line, Constants.ID_TAG_BEGIN, Constants.ID_TAG_END, 0);
    } else if (line.startsWith(Constants.FIELD_LENGTH_BEGIN)) {
      action.length = Integer.valueOf(getContentBetween(line, Constants.FIELD_LENGTH_BEGIN, Constants.FIELD_LENGTH_END, 0));
    } else if (line.startsWith(Constants.VALUE_TAG_BEGIN)) {
      action.value = getContentBetween(line, Constants.VALUE_TAG_BEGIN, Constants.VALUE_TAG_END, 0);
    } else if (line.startsWith(Constants.VARIANT1_TAG_BEGIN)) {
      action.variant1 = getContentBetween(line, Constants.VARIANT1_TAG_BEGIN, Constants.VARIANT1_TAG_END, 0);
    } else if (line.startsWith(Constants.VARIANT2_TAG_BEGIN)) {
      action.variant2 = getContentBetween(line, Constants.VARIANT2_TAG_BEGIN, Constants.VARIANT2_TAG_END, 0);
    } else if (line.startsWith(Constants.VARIANT3_TAG_BEGIN)) {
      action.variant3 = getContentBetween(line, Constants.VARIANT3_TAG_BEGIN, Constants.VARIANT3_TAG_END, 0);
    } else if (line.startsWith(Constants.VARIANT4_TAG_BEGIN)) {
      action.variant4 = getContentBetween(line, Constants.VARIANT4_TAG_BEGIN, Constants.VARIANT4_TAG_END, 0);
    } else if (line.startsWith(Constants.VARIANT5_TAG_BEGIN)) {
      action.variant5 = getContentBetween(line, Constants.VARIANT5_TAG_BEGIN, Constants.VARIANT5_TAG_END, 0);
    } else if (line.startsWith(Constants.VARIANT6_TAG_BEGIN)) {
      action.variant6 = getContentBetween(line, Constants.VARIANT6_TAG_BEGIN, Constants.VARIANT6_TAG_END, 0);
    } else if (line.startsWith(Constants.VARIANT7_TAG_BEGIN)) {
      action.variant7 = getContentBetween(line, Constants.VARIANT7_TAG_BEGIN, Constants.VARIANT7_TAG_END, 0);
    } else if (line.startsWith(Constants.VARIANT8_TAG_BEGIN)) {
      action.variant8 = getContentBetween(line, Constants.VARIANT8_TAG_BEGIN, Constants.VARIANT8_TAG_END, 0);
    } else if (line.startsWith(Constants.VARIANT9_TAG_BEGIN)) {
      action.variant9 = getContentBetween(line, Constants.VARIANT9_TAG_BEGIN, Constants.VARIANT9_TAG_END, 0);
    } else if (line.startsWith(Constants.VARIANT10_TAG_BEGIN)) {
      action.variant10 = getContentBetween(line, Constants.VARIANT10_TAG_BEGIN, Constants.VARIANT10_TAG_END, 0);
    } else if (line.startsWith(Constants.VARIANT11_TAG_BEGIN)) {
      action.variant11 = getContentBetween(line, Constants.VARIANT11_TAG_BEGIN, Constants.VARIANT11_TAG_END, 0);
    } else if (line.startsWith(Constants.VARIANT12_TAG_BEGIN)) {
      action.variant12 = getContentBetween(line, Constants.VARIANT12_TAG_BEGIN, Constants.VARIANT12_TAG_END, 0);
    }
  }
  
  private void performAction() throws RuntimeException {
    action.concerningSubLevel1 = concerningSubLevel1; 
    if (Constants.REMOVE_ALL_TABS.equals(action.toDo)) {
      resetTabs();
      AppletGlobal.getInstance().tasks.clear();
    } else if (Constants.SELECT_TAB.equals(action.toDo)) {
      tabs.setSelectedComponent(getCenterGUI(action.value, concerning));
    } else if (Constants.PEFORM_LOGIN.equals(action.toDo)) {
      loginMandatory = true;
      replaceUniqueContent(new JScrollPane(getLoginPanel()));
    } else if (Constants.INITITIAL_STATE_AFTER_LOGIN.equals(action.toDo)) {
      resetTabs();
    } else if (Constants.SET_NO_TABS.equals(action.toDo)) {
      noTabs = true;
    } else if (Constants.TOOLBAR.equals(concerning)) {
      if (panelToolbar == null) {
        panelToolbar = new JPanel();
        panelToolbar.setLayout(new FlowLayout(FlowLayout.LEFT));
        mainPanel.add(panelToolbar, BorderLayout.NORTH);
      }
      final MustButton button = new MustButton(action.label);
      button.setActionCommand(action.id);
      button.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent e) {
          try {
            AppletGlobal.getInstance().contactServer(new KeyValuePairAlpha(Constants.TOOLBAR_BUTTON_ACTION, button.getActionCommand()));
          } catch (IOException e1) {
            Logger.getInstance().error(getClass(), e1);
          }
        }
      });
      panelToolbar.add(button);
    } else if (Constants.CLEAR_APPLETCONTENT.equals(action.toDo)) {
      resetTabs();
    } else if (Constants.FINALIZE.equals(action.toDo)) {
      currentCenterGUI = null;
      currentTitle = null;
      logoutInfo();
    } else if (Constants.BEGIN_MENU.equals(action.toDo)) {
      JMenu menu = new JMenu(action.label);
      menuStack.add(menu);
      if (menuStack.size() == 1) {
        AppletGlobal.getInstance().getApplet().getJMenuBar().add(menu);
      } else {
        menuStack.elementAt(menuStack.size()-2).add(menu);
      }
    } else if (Constants.END_MENU.equals(action.toDo)) {
      menuStack.removeElementAt(menuStack.size()-1);
    } else if (Constants.CREATE_SEPARATOR.equals(action.toDo)) {
      menuStack.lastElement().addSeparator();
    } else if (Constants.CREATE_MENU_ITEM.equals(action.toDo)) {
      final JMenuItem item = new JMenuItem(action.label);
      menuStack.lastElement().add(item);
      item.setActionCommand(action.id);
      item.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent e) {
          try {
            AppletGlobal.getInstance().contactServer(new KeyValuePairAlpha(Constants.MENU_BUTTON_ACTION, item.getActionCommand()));
          } catch (IOException e1) {
            Logger.getInstance().error(getClass(), e1);
          }
        }
      });
    } else if (Constants.SET_SECONDS_BEFORE_AUTOMATIC_LOGOUT.equals(action.toDo)) {
      AppletGlobal.getInstance().secondsBeforeAutomaticLogout = action.length;
    } else if (Constants.SET_MESSAGE_TO_KEEP.equals(action.toDo) && (concerning == null || !concerning.startsWith("dialog"))) {
      statusLabel.setRemainStatus(action.value);
    } else if (Constants.OPEN_REPORT.equals(action.toDo)) {
      (new ReportPresentationTask(AppletGlobal.getInstance().getCodeBase() + action.value, action.length)).start();
    } else if (Constants.OPEN_HTML_DIALOG.equals(action.toDo)) {
      new HTMLDialogOpener(action.value);
    } else if (Constants.REMOVE_TAB.equals(action.toDo)) {
      removeTab(action.value);
      currentTitle = null;
      currentCenterGUI = null;
      // AppletGlobal.getInstance().tasks.get(title).gui.distroy;
      AppletGlobal.getInstance().tasks.remove(title);
    } else if (Constants.PRINT_BARCODE_LABELS.equals(action.toDo)) {
      BarcodePrint barcodePrint = new BarcodePrint(Integer.valueOf(action.id), Long.valueOf(action.variant1), action.getVariant2AsInt(), action.getVariant3AsInt(), action.variant4, action.getVariant5AsInt());
      if (action.variant7 != null) barcodePrint.setAdjustment(action.getVariant7AsInt(), action.getVariant8AsInt());
      barcodePrint.setBarcodeType(action.getVariant6AsInt());
      if (action.variant10 != null) barcodePrint.setFixtext(action.variant10, action.getVariant11AsInt());
//      String barcodeLogo = Parameter.getInstance().getBarcodeLogo();
//      if (barcodeLogo.length() > 0) {
//        barcodePrint.setImage(Toolkit.getDefaultToolkit().getImage(barcodeLogo));
//      }
      // ask in local applet dialog for next parameter if needed:
      if (action.variant12 != null) barcodePrint.setPrinter(action.variant12);
      barcodePrint.print();

      // end of actions handled right here
    // ------------------------------------------------------------------------
    } else if (Constants.TABLE.equals(concerning)) {
      getTableGUI(title).perform(action);
    } else if (Constants.DIALOG_FOR_PROPERTIES.equals(concerning)) {
      if (AppletGlobal.getInstance().currentDialog == null
      || !(AppletGlobal.getInstance().currentDialog instanceof RemPropertyDialog)
      ) {
        AppletGlobal.getInstance().currentDialog = new RemPropertyDialog();
      }
      AppletGlobal.getInstance().currentDialog.perform(action);
    } else if (Constants.DIALOG_FOR_CHOOSING.equals(concerning)) {
      if (AppletGlobal.getInstance().currentDialog == null
      || !(AppletGlobal.getInstance().currentDialog instanceof RemSelectDialog)
      ) {
        AppletGlobal.getInstance().currentDialog = new RemSelectDialog();
      }
      AppletGlobal.getInstance().currentDialog.perform(action);
    } else if (Constants.DIALOG_FOR_OPTIONS_WITH_LIST_SELECTION.equals(concerning)) {
      if (AppletGlobal.getInstance().currentDialog == null
      || !(AppletGlobal.getInstance().currentDialog instanceof RemOptionDialogWithListSelection)
      ) {
        AppletGlobal.getInstance().currentDialog = new RemOptionDialogWithListSelection();
      }
      AppletGlobal.getInstance().currentDialog.perform(action);
    } else if (Constants.DIALOG_FOR_DRAWING.equals(concerning)) {
      if (AppletGlobal.getInstance().currentDialog == null
      || !(AppletGlobal.getInstance().currentDialog instanceof RemDrawDialog)
      ) {
        AppletGlobal.getInstance().currentDialog = new RemDrawDialog();
      }
      AppletGlobal.getInstance().currentDialog.perform(action);
    } else if (Constants.DIALOG_FOR_STANDARD_INFO_PRESENTATION.equals(concerning)) {
      if (AppletGlobal.getInstance().currentDialog == null
      || !(AppletGlobal.getInstance().currentDialog instanceof RemStandardDialog)
      ) {
        AppletGlobal.getInstance().currentDialog = new RemStandardDialog();
      }
      AppletGlobal.getInstance().currentDialog.perform(action);
    } else if (Constants.PRINTING.equals(concerning)) {
      try {
        if (AppletGlobal.getInstance().currentPrinter == null) {
          Logger.getInstance().debug(getClass(), "before new Printer()");
          AppletGlobal.getInstance().currentPrinter = new Printer();
          Logger.getInstance().debug(getClass(), "after new Printer()");
        }
        AppletGlobal.getInstance().currentPrinter.perform(action);
      } catch (Exception e) {
        Logger.getInstance().error(getClass(), e);
      }
    } else if (Constants.OUTLINE_WINDOW.equals(concerning)) {
      if (AppletGlobal.getInstance().outlineWindow == null) {
        AppletGlobal.getInstance().outlineWindow = new RemStructureOutlineFrame();
      }
      AppletGlobal.getInstance().outlineWindow.perform(action);
    } else if (Constants.LISTSELECTION_WINDOW.equals(concerning)) {
      if (AppletGlobal.getInstance().selectionWindow == null) {
        AppletGlobal.getInstance().selectionWindow = new RemListSelectionFrame();
      }
      AppletGlobal.getInstance().selectionWindow.perform(action);
   // now default concerning - last case after other concerning cases!  
    } else if (title != null
            && concerning != null
            && getCenterGUI(title, concerning).perform(action)
    ) {
      // done in SLD GUI
    } else {
      if (Constants.INFORMATION_DIALOG.equals(action.toDo)) {
        RemInfoDialog dlg = new RemInfoDialog("no matter 1", "no matter 2");
        String title = action.variant1;
        if (title == null) title = getTranslation("TEXT_INFORMATION");
        dlg.setTitle(title);
        dlg.perform(action);
        dlg.setVisible(true);
      }
    }
  }
  
  private CenterGUI getCenterGUI(String title, String typeByConcerning) {
    if (title == null) {
      currentCenterGUI = null;
      return null;
    }
    if (title.equals(currentTitle)) {
      return currentCenterGUI;
    }
    AppletGlobal.Task task = AppletGlobal.getInstance().tasks.get(title);
    if (task == null) {
      if (Constants.UNIVERSAL_CENTER_GUI.equals(typeByConcerning)) {
        currentCenterGUI = new RemUniversalCenterGUI(title, statusLabel);
      } else if (Constants.FREE_CENTER_GUI.equals(typeByConcerning)) {
        currentCenterGUI = new FreeCenterGUI(title, statusLabel);
      } else if (Constants.SEARCH_LIST_DETAIL_GUI.equals(typeByConcerning)) {
        currentCenterGUI = new SearchListDetailGUI(title, statusLabel);
      } else {
        Logger.getInstance().warn("typeByConcerning " + typeByConcerning + " not supported.");
      }
      task = AppletGlobal.getInstance().new Task(title, currentCenterGUI);
      AppletGlobal.getInstance().tasks.put(title, task);
      if (!noTabs) {
        addTab(title, currentCenterGUI);
        tabs.setTitleAt(tabs.getTabCount() - 1, title);
      }
    } else {
      currentCenterGUI = (CenterGUI)task.gui;
    }
    currentTitle = title;
    if (noTabs) {
      replaceUniqueContent(currentCenterGUI);
      mainPanel.validate();
    } else {
      selectTabOf(title);
    }
    return currentCenterGUI;
  }
  
  private AppletGUIs getTableGUI(String title) {
    TableAdministration table = null;
    AppletGlobal.Task task = AppletGlobal.getInstance().tasks.get(title);
    if (task == null) {
      table = new TableAdministration(title, statusLabel);
      task = AppletGlobal.getInstance().new Task(title, table);
      AppletGlobal.getInstance().tasks.put(title, task);
      addTab(title, table);
//      JPanel panel = new JPanel();
//      panel.add(new JLabel(title));
//      panel.add(new JLabel("X"));
//      tabs.setComponentAt(tabs.getTabCount() - 1, panel);
      tabs.setTitleAt(tabs.getTabCount() - 1, title);
    } else {
      table = (TableAdministration)task.gui;
    }
    selectTabOf(title);
    return task.gui;
  }
  
  private void selectTabOf(String title) {
    for(int i = 0; i < tabs.getTabCount(); i++) {
      if (tabs.getTitleAt(i).equals(title)) {
        tabs.setSelectedIndex(i);
        return;
      }
    }
  }
  
  public void removeTab(String title) {
    for(int i = 0; i < tabs.getTabCount(); i++) {
      if (tabs.getTitleAt(i).equals(title)) {
        tabs.remove(i);
      }
    }
    if (tabs.getTabCount() == 0) {
      resetTabDetails();
      recoverNoTabConstellation();
    }
  }
  
  private void logoutInfo() {
    AppletGlobal.getInstance().sessionId = null;
    setJMenuBar(null);
    panelToolbar = null;
    resetTabDetails();
    if (loginMandatory) {
      replaceUniqueContent(new JScrollPane(getLoginPanel()));
      setMessage(AppletGlobal.getInstance().getResourceString("TEXT_LOGGED_OUT"));
    } else {
      JPanel boxPanel = new JPanel();
      boxPanel.setLayout(new BoxLayout(boxPanel, BoxLayout.Y_AXIS));
      boxPanel.add(Box.createVerticalGlue());
      boxPanel.add(new JLabel(AppletGlobal.getInstance().getImageIcon("start.png")));
      JPanel infoPanel = new JPanel();
      JLabel infoLabel = new JLabel(AppletGlobal.getInstance().getResourceString("TEXT_LOGGED_OUT"));
      infoLabel.setFont(new Font(infoLabel.getFont().getName(), infoLabel.getFont().getStyle(), infoLabel.getFont().getSize() + 5));
      infoPanel.add(infoLabel);
      MustButton restartButton = new MustButton(AppletGlobal.getInstance().getResourceString("TEXT_RESUME"));
      infoPanel.add(restartButton);
      restartButton.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent e) {
          startSession();
        }
      });
      boxPanel.add(infoPanel);
      setContentPane(new JScrollPane(boxPanel));
    }
    validate();
  }
  
  private JPanel getLoginPanel() {
    JPanel boxPanel = new JPanel();
    boxPanel.setLayout(new BoxLayout(boxPanel, BoxLayout.Y_AXIS));
    boxPanel.add(Box.createVerticalGlue());
    boxPanel.add(new JLabel(AppletGlobal.getInstance().getImageIcon("start.png")));
    loginPanel = new LoginPanel(getRootPane(), AppletGlobal.getInstance(), new Callback() {
      public void callback() {
        startSession(loginPanel.getUserId(), loginPanel.getPassword());
      }
    });
    JPanel flowPanel = new JPanel();
    flowPanel.add(loginPanel);
    boxPanel.add(flowPanel);
    return boxPanel;
  }
  
  private void resetTabDetails() {
    tabs = null;
    currentTitle = null;
    currentCenterGUI = null;
  }
  
  private String getContentBetween(String line, String from, String until, int starting) {
    return AppletGUIs.getContentBetween(line, from, until, starting);
  }

  protected String getTranslation(String key) {
    return AppletGlobal.getInstance().getResourceString(key);
  }

  @Override
  public void destroy() {
    if (!AppletGlobal.getInstance().loggedOut) AppletGlobal.getInstance().logout();
    super.destroy();
  }

}
