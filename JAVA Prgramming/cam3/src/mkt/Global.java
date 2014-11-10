package mkt;

import java.io.File;

import de.must.middle.GlobalStd;
import de.must.util.StringFunctions;

public class Global extends GlobalStd {

  public static final String DATABASE_NAME = "Marketing";
  private static Global instance;

  private ParamLoc paramLoc;
  private boolean globalDataObjectsActive = false;

  public final static Global getInstance() {
    if (instance == null) {
      instance = new Global();
    }
    return instance;
  }

  private Global() {
  }

  public static String getUserDataDir() {
    String homeDir = System.getProperty("user.home");
    return homeDir + "/Marketing";
  }

  public boolean isGlobalDataObjectsActive() {
    return globalDataObjectsActive;
  }

  public void createGlobalDataObjects() {
    CurrentUser.create();
    globalDataObjectsActive = true;
  }

  private static String PARAMETER_FILE_NAME = "parameter.properties";
  private ParametersFromPropertyFiles parametersFromPropertyFiles;
  public ParametersFromPropertyFiles getParametersFromPropertyFiles() {
    if (parametersFromPropertyFiles == null) {
      parametersFromPropertyFiles = new ParametersFromPropertyFiles(getApplicationUserDataDir() + "/" + PARAMETER_FILE_NAME, PARAMETER_FILE_NAME);
    }
    return parametersFromPropertyFiles;
  }

  public static String getApplicationUserDataDir() {
    String homeDir = System.getProperty("user.home");
    if (homeDir.indexOf("Christoph M?ller") >= 0) {
      // Logger.getInstance().info("User home will be manipulated: " + homeDir);
      homeDir = StringFunctions.replaceAll(homeDir, "Christoph M?ller", "Christoph Müller");
    }
    return homeDir + File.separator + "Marketing";
  }

  public static String getEigeneDateien() {
    String homeDir = System.getProperty("user.home");
    String eigeneDateien = homeDir + File.separator + "Documents"; // Windows 8
    File eigDatDir = new File(eigeneDateien);
    if (eigDatDir.exists() && eigDatDir.isDirectory()) return eigeneDateien;
    eigeneDateien = homeDir + File.separator + "Eigene Dateien"; // Windows XP
    eigDatDir = new File(eigeneDateien);
    if (eigDatDir.exists() && eigDatDir.isDirectory()) return eigeneDateien;
    return homeDir; // Linux or other cases
  }

/**
   * Destroys global data objects to release resources for e.g. database modifications.
   */
  public void destroyGlobalDataObjects() {
    Parameter.destroyInstance();
    CurrentUser.destroy();
    globalDataObjectsActive = false;
  }

  /**
   * Called by the garbage collector on an object when garbage collection
   * determines that there are no more references to the object.
   */
  protected void finalize() throws Throwable {
    destroyGlobalDataObjects();
    super.finalize();
  }

}