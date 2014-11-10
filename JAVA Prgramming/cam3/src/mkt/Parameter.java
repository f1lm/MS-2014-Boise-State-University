package mkt;

import de.must.dataobj.ParameterStd;
import de.must.middle.ParameterStore;

/**
 * @author Christoph Mueller
 */
public class Parameter extends ParameterStd {

  private static Parameter instance;
  public static final ParameterStore.Entry MAX_ENTRIES = register(new ParameterStore.Entry("maxEnt", "Listbegrenzung", 500));
  public static final ParameterStore.Entry BACKUP_DIRECTORY = register(new ParameterStore.Entry("backupDir", "Last backup directory", ""));
  public static final ParameterStore.Entry BACKUP_FILE = register(new ParameterStore.Entry("backupFile", "Last backup file name", ""));
  public static final ParameterStore.Entry BACKUP_TIME = register(new ParameterStore.Entry("backupDate", "Die_letzte_Datensicherung_erfolgte_am", ""));
  public static final ParameterStore.Entry BACKUP_REMINDER_DAYS = register(new ParameterStore.Entry("backupRem", "Backup to remind afer n days", 7));

  public final static Parameter getInstance() {
    if (instance == null) {
      instance = new Parameter();
    }
    return instance;
  }

  public static void destroyInstance() {
    if (instance != null) {
      instance.parameterDataObject.free();
    }
    instance = null;
  }

  private Parameter() {
    super(new DoParam());
  }

}
