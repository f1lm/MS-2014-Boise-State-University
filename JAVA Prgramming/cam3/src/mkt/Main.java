package mkt;

import java.awt.Font;
import java.io.File;

import de.must.wuic.*;
import de.must.dataobj.ConnectionHolder;
import de.must.dataobj.ConnectionSpecification;
import de.must.dataobj.TableCreatorStd;
import de.must.io.Logger;
import de.must.middle.GlobalStd;
import de.must.util.*;
import javax.swing.*;

/**
 * @author Christoph Mueller
 */
public final class Main extends MainStd {

  private static final String version = "2.3.2";
  private static final int licenceType = ApplLicence.STANDARD_LICENCE;
  private static MainMenu mainMenu;

  static public void main(String[] args) {
    int i, j, argLength;
    argLength = args.length;
    // if (argLength > 0 && args[0] != null) codeBase = args[0]; // not in use anymore!
    if (argLength > 1 && args[1] != null) GlobalStd.browserPath = args[1];
    if (argLength > 2) odbcNames = new String[argLength - 2]; else odbcNames = new String[0];
    j = -1;
    for (i=2; i < argLength; i++) {
      j++;
      if (args[i] != null) odbcNames[j] = args[i];
      else odbcNames[j] = "";
    }
    new Main();
  }

  public Main() {
    Logger.setDebugFilePath("debug.txt");
    Font refFont = (new JLabel()).getFont();
    setUIFont(new javax.swing.plaf.FontUIResource(new Font(refFont.getName(), refFont.getStyle(), Global.getInstance().getParametersFromPropertyFiles().getFontSize())));
    (new File(Global.getApplicationUserDataDir())).mkdirs();
    MustFrame.setDefaultIconImage(java.awt.Toolkit.getDefaultToolkit().getImage("bin/images/must16.png"));
    LoadFrame loadFrame = new LoadFrame();
    ParamLoc.create();
    loadFrame.setStatusText("Stelle Datenbankverbindung her ...");
    Global.getInstance().connectionSpecification = ParamLoc.getConnectionSpecification();
    if (Global.getInstance().connectionSpecification != null) {
      Global.getInstance().createOrCheckConnections();
    } else {
      guessDatabaseSpecifications();
    }
    int dataBaseState = TableCreatorStd.STATE_FULL_HAPPY;
    if (Global.getInstance().mainConnectionHolder.isConnected()) {
      TableCreator tableCreator = new TableCreator(); // needs Global
      int dbTodo = tableCreator.determineTodo();
      if (dbTodo < TableCreatorStd.UPDATE_NONE) {
        TableCreationUI ui = new TableCreationUI(loadFrame, tableCreator);
        dataBaseState = ui.perform(dbTodo);
        if (!ui.isUserVeto()) {
          Global.getInstance().closeMainConnection();
          Global.getInstance().createOrCheckConnections(); // update by separate connection could be unknown for this connection at the moment 
        }
      }
    }
    if (Global.getInstance().mainConnectionHolder.isConnected()
      && dataBaseState != TableCreatorStd.STATE_UNHAPPY
    ) {      loadFrame.setStatusText("Lade Parameter ...");
      Global.getInstance().createGlobalDataObjects();
      AbstractDataListFrame.setMaxListEntries(Parameter.getInstance().getValueAsInt(Parameter.MAX_ENTRIES));
    }
    loadFrame.setStatusText("Initialisiere ...");
    WinContr.create(Global.getApplicationUserDataDir()); // needs ParamLoc
    ApplLicence.setLicenceType(licenceType);
    MustStatusLabel.setDefaultStatustext(" ");
    if (ParamLoc.getBrowserPath().equals("*AUTO")) {
      Browser.setBrowserPath(GlobalStd.browserPath);
    }
    else {
      Browser.setBrowserPath(ParamLoc.getBrowserPath());
    }
    de.must.dataobj.DataObject.setRecordingUser(CurrentUser.getUserName());
    de.must.dataobj.DataObject.setChangeLog(new ChangeLog(Global.getInstance().getAllUserDir().getPath() + File.separatorChar + "MarketingChanges.csv"));
    loadFrame.setStatusText("Lade Menü ...");
    mainMenu = new MainMenu();
    // temporary:
      // mainMenu.extendFunctions(Main.SECURITY_EXTENDED);
    MainStd.setMainFrame((java.awt.Frame)mainMenu);
    mainMenu.setVisible(true);

    if (Global.getInstance().mainConnectionHolder.isConnected() && dataBaseState != TableCreatorStd.STATE_UNHAPPY) {
      loadFrame.setStatusText("Lade Kontakte ...");
      FrKontaktSl.openMainInstance();
    }

    loadFrame.setVisible(false);
    loadFrame.dispose();

  }

  /**
   * Tries to find out how to access the database. Once the ODBC name is set 
   * this becomes inactive.
   * @return true if the database has been found and connected
   */
  private boolean guessDatabaseSpecifications() {
    Logger.getInstance().info("Trying ODBC DSN");
    if (tryConnection(new ConnectionSpecification(Global.DATABASE_NAME))) {
      ParamLoc.setOdbcName(Global.DATABASE_NAME);
      ParamLoc.updateParam();
      return true;
    }
//    Logger.getInstance().info("Trying SQL Server on localhost");
//    String url = "jdbc:sqlserver://localhost:1433;databaseName=Inventar;integratedSecurity=false";
//    String driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
//    String user = "ivtuser";
//    String password = "ivtpwd";
//    if (tryConnection(new ConnectionSpecification(url, driver, user, password))) {
//      ParamLoc.setAccessType(ConnectionHolder.OTHER_ACCESS);
//      ParamLoc.setUrl(url);
//      ParamLoc.setDriverName(driver);
//      ParamLoc.setDbUser(user);
//      ParamLoc.setDbPassword(password);
//      ParamLoc.updateParam();
//      return true;
//    }
//    Logger.getInstance().info("Trying MySQL on localhost");
//    url = "jdbc:mysql://localhost/inventar";
//    driver = "org.gjt.mm.mysql.Driver";
//    if (tryConnection(new ConnectionSpecification(url, driver, user, password))) {
//      ParamLoc.setAccessType(ConnectionHolder.OTHER_ACCESS);
//      ParamLoc.setUrl(url);
//      ParamLoc.setDriverName(driver);
//      ParamLoc.setDbUser(user);
//      ParamLoc.setDbPassword(password);
//      ParamLoc.updateParam();
//      return true;
//    }
    Logger.getInstance().info("Trying ODBC to database file in user home");
    File file = new File(System.getProperty("user.home") + File.separatorChar + Global.DATABASE_NAME + ".mdb");
    if (tryConnection(new ConnectionSpecification(file))) {
      ParamLoc.setAccessType(ConnectionHolder.ODBC_ACCESS_BY_MDB_FILE_NAME);
      ParamLoc.setMdbFilePath(file.getPath());
      ParamLoc.updateParam();
      return true;
    }
    Logger.getInstance().info("Trying ODBC to database file user public directory");
    File allUserDir = Global. getInstance().getAllUserDir();
    if (allUserDir != null) {
      file = new File(allUserDir, Global.DATABASE_NAME + ".mdb");
      if (tryConnection(new ConnectionSpecification(file))) {
        ParamLoc.setAccessType(ConnectionHolder.ODBC_ACCESS_BY_MDB_FILE_NAME);
        ParamLoc.setMdbFilePath(file.getPath());
        ParamLoc.updateParam();
        return true;
      }
    }
    Logger.getInstance().info("failed to guess database");
    Global.getInstance().connectionSpecification = null;
    return false;
  }
  
  private boolean tryConnection(ConnectionSpecification connectionSpecification) {
    Logger.getInstance().info(getClass(), "Trying to connect database with " + connectionSpecification);
    Global.getInstance().connectionSpecification = connectionSpecification;
    Global.getInstance().createOrCheckConnections();
    return Global.getInstance().mainConnectionHolder.isConnected();
  }

  public static String getVersion() {
    return version;
  }

  public static void extendFunctions(int newSecurityLevel) {
    securityLevel = newSecurityLevel;
    mainMenu.extendFunctions(newSecurityLevel);
  }

}


