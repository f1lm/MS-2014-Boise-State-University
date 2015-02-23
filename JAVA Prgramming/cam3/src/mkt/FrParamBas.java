package mkt;

import de.must.wuic.*;
import de.must.dataobj.ConnectionHolder;
import de.must.dataobj.ConnectionSpecification;
import de.must.dataobj.TableCreatorStd;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

/**
 * @author Christoph Mueller
 */
public final class FrParamBas extends LocalParameterDialog implements ActionListener, ItemListener {

  private boolean isToConnect;
  private int previousAccessType;
  private String previousMdbFile;
  private String previousDataSourceName;
  private String previousUrl;
  private String previousDriver;
  private String previousUser;
  private String previousPassword;
  private JFrame dialogOwnerFrame;
  private JFileChooser fileDialog1;

  private ButtonGroup cgAccessType = new ButtonGroup();
  private JRadioButton cbMdb = new JRadioButton("Access", true);
  private JRadioButton cbOdbc = new JRadioButton("ODBC", true);
  private JRadioButton cbOther = new JRadioButton("Andere", false);
  private FileSpecification mdbFile;
  private MustTextField tfOdbcName;
  private MustChoice odbcChoice = new MustChoice();
  private MustTextField tfUrl;
  private MustTextField tfDriver;
  private MustTextField tfUser;
  private MustPasswordField tfPassword;
  private MustButton buttonConnect = new MustButton("Verbindung testen", "BtnConnect", this);

  private MustTextField tfBrowserPath;
  private MustButton buttonBrowseBp = new MustButton("Durchsuchen", "BtnBrowseBp", this);
  private JRadioButton jRadioButtonXy = new JRadioButton();
  private ButtonGroup cGSL = new ButtonGroup();
  private JRadioButton jRadioButtonSecL1 = new JRadioButton("Jeder darf alles", true);
  private JRadioButton jRadioButtonSecL2 = new JRadioButton("Benutzerregistrierung", false);
  private JRadioButton jRadioButtonSecL3 = new JRadioButton("Sachgebietstrennung", false);

  private MustTextField userName;

  public FrParamBas(Frame OwnerFrame) {
    super(OwnerFrame);
    setTitle("Basis-Parameter");

    cgAccessType.add(cbMdb);
    cgAccessType.add(cbOdbc);
    cgAccessType.add(cbOther);
    cGSL.add(jRadioButtonSecL1);
    cGSL.add(jRadioButtonSecL2);
    cGSL.add(jRadioButtonSecL3);

    newPanel("Datenbank");
    currentAttributeList.append("Zugriffsart", cbMdb);
    currentAttributeList.append(cbOdbc);
    currentAttributeList.append(cbOther);
//    if (Main.getSecurityLevel() == Main.SECURITY_NORMAL) {
//      cbOther.setEnabled(false);
//      cbOther.setToolTipText("Die Standardversion unterstützt nur ODBC");
//    }
    mdbFile = createFileSpecification("MDB-Datei", "");
    tfOdbcName = createTextField("Datenquellenname", 20);
    tfOdbcName.setToolTipText("Wie in Systemsteuerung, ODBC-Datenquellen definiert");
    odbcChoice.setToolTipText("Zur Zeit verfügbare ODBC-Quellen");
    currentAttributeList.append(odbcChoice);
    tfUrl = createTextField("URL", 30);
    tfDriver = createTextField("Treiber-Name", 30);
    tfUser = createTextField("Benutzer", 20);
    tfUser.setToolTipText("Zur Anmeldung an der Datenbank");
    currentAttributeList.append(new JLabel("(falls erforderlich)"));
    tfPassword = createPasswordField("Kennwort", 20);
    tfPassword.setToolTipText("Zur Anmeldung an der Datenbank");
    currentAttributeList.append(new JLabel("(falls erforderlich)"));
    currentAttributeList.append(buttonConnect);

    newPanel("Anwendungspfade");
    tfBrowserPath = createTextField("Browser", 50);
    currentAttributeList.append(buttonBrowseBp);

    newPanel("Sonstiges");
    userName = createTextField("Benutzer-Name", 20);
    userName.setToolTipText("Manueller Eintrag für Betriebssysteme, die keinen Benutzernamen erfragen");

    switch (ParamLoc.getAccessType()) {
    case ConnectionHolder.ODBC_ACCESS_BY_MDB_FILE_NAME:
      cbMdb.setSelected(true);
      break;
    case ConnectionHolder.ODBC_ACCESS:
      cbOdbc.setSelected(true);
      break;
    case ConnectionHolder.OTHER_ACCESS:
      cbOther.setSelected(true);
      break;
    }

    previousAccessType = ParamLoc.getAccessType();
    previousDataSourceName = ParamLoc.getOdbcName();
    previousUrl = ParamLoc.getUrl();
    previousDriver = ParamLoc.getDriverName();
    previousUser = ParamLoc.getDbUser();
    previousPassword = ParamLoc.getDbPassword();

    mdbFile.setFilePath(ParamLoc.getMdbFilePath());
    tfOdbcName.setText(ParamLoc.getOdbcName());
    odbcChoice.addItems(Main.getOdbcNames());
    odbcChoice.setSelectedItem(ParamLoc.getOdbcName());
    tfUrl.setText(ParamLoc.getUrl());
    tfDriver.setText(ParamLoc.getDriverName());
    tfUser.setText(ParamLoc.getDbUser());
    tfPassword.setText(ParamLoc.getDbPassword());
    tfBrowserPath.setText(ParamLoc.getBrowserPath());
    userName.setText(ParamLoc.getUserName());

    serveCbDependence();

    cbMdb.addItemListener(this);
    cbOdbc.addItemListener(this);
    cbOther.addItemListener(this);
    odbcChoice.addItemListener(new ItemListener() {
      public void itemStateChanged(ItemEvent e) {
        tfOdbcName.setText((String)odbcChoice.getSelectedItem());
      }
    });

    creationEnding();
  }

  public void itemStateChanged(ItemEvent e) {
    serveCbDependence();
  }

  private void serveCbDependence() {
    mdbFile.setEnabled(cbMdb.getModel().isSelected());
    tfOdbcName.setEnabled(cbOdbc.getModel().isSelected());
    odbcChoice.setEnabled(cbOdbc.getModel().isSelected());
    tfUrl.setEnabled(cbOther.getModel().isSelected());
    tfDriver.setEnabled(cbOther.getModel().isSelected());
  }

  protected void perform(ActionEvent e) {
    String actCommand = e.getActionCommand();
    if (actCommand.equals("BtnConnect")) {
      setMessage("Teste Verbindung ...");
      if (isConnectable()) {
        HelpConn.close();
        setMessageToKeep("Verbindung möglich.");
      }
      else setMessageToKeep("Verbindungtest nicht geglückt.");
    } else if (actCommand.equals("BtnBrowseBp")) {
      fileDialog1 = new JFileChooser();
      fileDialog1.setDialogTitle("Browser auswählen");
      if (fileDialog1.showOpenDialog(this) == JFileChooser.APPROVE_OPTION) tfBrowserPath.setText(fileDialog1.getSelectedFile().getPath());
    } else super.perform(e);
  }

  protected boolean isInputAccepted() {
    if (isToConnect() && !isConnectable()) {
      setMessageToKeep("Gewünschte Datenbankverbindung nicht akzeptiert" + ": " + getErrorMessage());
      return false;
    }
    return true;
  }

  private boolean isToConnect() {
    boolean result = false;
    if (!Global.getInstance().mainConnectionHolder.isConnected()) result = true;
    if (cbMdb.getModel().isSelected() && previousAccessType != ConnectionHolder.ODBC_ACCESS_BY_MDB_FILE_NAME) result = true;
    if (cbOdbc.getModel().isSelected() && previousAccessType != 0) result = true;
    if (cbOther.getModel().isSelected() && previousAccessType != 1) result = true;
    if (!mdbFile.getFileName().equals(previousMdbFile)) result = true;
    if (!tfOdbcName.getText().equals(previousDataSourceName)) result = true;
    if (!tfUrl.getText().equals(previousUrl)) result = true;
    if (!tfDriver.getText().equals(previousDriver)) result = true;
    if (!tfUser.getText().equals(previousUser)) result = true;
    if (!tfPassword.getPasswordText().equals(previousPassword)) result = true;
    return result;
  }

  protected void act() {
    parmUpdate();
    if (isToConnect()) {
      MustFrame.closeAll();
      Global.getInstance().destroyGlobalDataObjects();
      Global.getInstance().closeMainConnection();
      HelpConn.close();
      Global.getInstance().invalidateConnections(); // to recreate it
      Global.getInstance().connectionSpecification = ParamLoc.getConnectionSpecification();
      Global.getInstance().createOrCheckConnections();
      TableCreator tableCreator = new TableCreator();
      int dbTodo = tableCreator.determineTodo();
      if (tableCreator.determineTodo() < TableCreatorStd.UPDATE_NONE) {
        TableCreationUI ui = new TableCreationUI(ownerFrame, tableCreator);
        ui.perform(dbTodo);
      }
      Global.getInstance().createGlobalDataObjects();
    }
    CurrentUser.loadAll(); // userName may have changed
  }

  private boolean isConnectable() {
    String url;
    String driverName;
    if (cbMdb.getModel().isSelected()) {
      for (String accessDriver : ConnectionSpecification.ACCESS_DRIVER) {
        url = "jdbc:odbc:" + accessDriver + mdbFile.getFileName(); //$NON-NLS-1$
        driverName = "sun.jdbc.odbc.JdbcOdbcDriver"; //$NON-NLS-1$
        if (isConnectable(url, driverName, tfUser.getText(), tfPassword.getPasswordText())) {
          return true;
        }
      }
      return false;
    } else if (cbOdbc.getModel().isSelected()) {
      url = "jdbc:odbc:" + tfOdbcName.getText();
      driverName = "sun.jdbc.odbc.JdbcOdbcDriver";
      return isConnectable(url, driverName, tfUser.getText(), tfPassword.getPasswordText());
    }
    if (cbOther.getModel().isSelected()) {
      url = tfUrl.getText();
      driverName = tfDriver.getText();
      return isConnectable(url, driverName, tfUser.getText(), tfPassword.getPasswordText());
    }
    return false;
  }

  private void parmUpdate() {
    if (cbMdb.getModel().isSelected()) ParamLoc.setAccessType(ConnectionHolder.ODBC_ACCESS_BY_MDB_FILE_NAME);
    if (cbOdbc.getModel().isSelected()) ParamLoc.setAccessType(0);
    if (cbOther.getModel().isSelected()) ParamLoc.setAccessType(1);
    ParamLoc.setMdbFilePath(mdbFile.getFileName());
    ParamLoc.setOdbcName(tfOdbcName.getText());
    ParamLoc.setUrl(tfUrl.getText());
    ParamLoc.setDriverName(tfDriver.getText());
    ParamLoc.setDbUser(tfUser.getText());
    ParamLoc.setDbPassword(tfPassword.getPasswordText());
    ParamLoc.setBrowserPath(tfBrowserPath.getText());
    ParamLoc.setUserName(userName.getText());
    ParamLoc.updateParam();
  }

}


