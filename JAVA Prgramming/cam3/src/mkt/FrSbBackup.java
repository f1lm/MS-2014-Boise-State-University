package mkt;

import de.must.dataobj.DataObject;
import de.must.wuic.*;

import java.awt.Frame;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public final class FrSbBackup extends BackupOnlyDialog {
  
  public FrSbBackup(Frame ownerFrame) {
    this(ownerFrame, false);
  }
  
  public FrSbBackup(Frame ownerFrame, boolean waitFor) {
    super(ownerFrame, waitFor);
//    dbCharset = createChoice("DB-Charset", ApplConst.CHARSETS);
//    dbCharset.setSelectedItemKey(ParamLoc.getDBcharSet());
    String dir = Parameter.getInstance().getValue(Parameter.BACKUP_DIRECTORY);
    if (dir.length() == 0) {
      dir = Global.getEigeneDateien();
    }
    dirSpec.setText(dir);
    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HHmmss");
    fileSpec.setText("marketing_backup_" + dateFormat.format(new Date()));
    creationEnding();
  }

  @Override
  protected String[] getInfoWhatsGoingToHappen() {
    return new String[] {
      "Sichert alle Daten in eine Zip-Datei.",
//      "Diese Sicherungsdatei kann über Menü Administration, Datenrücksicherung zur Wiederherstellung",
//      "verlorengegangener Daten verwendet werden.",
    };
  }
  
  @Override
  protected void act() {
    backup();
  }

  @Override
  protected DataObject[] getAllDataObjects() {
    return TableCreator.getAllDataObjects();
  }

  @Override
  protected void threadCompleted() {
    super.threadCompleted();
    if (thread.isToRun() && !backupDB.hasConflict()) {
      Parameter.getInstance().set(Parameter.BACKUP_DIRECTORY, dirSpec.getFileName());
      Parameter.getInstance().set(Parameter.BACKUP_FILE, fileSpec.getText() + ".zip");
      Parameter.getInstance().set(Parameter.BACKUP_TIME, System.currentTimeMillis());
    }
  }

}

