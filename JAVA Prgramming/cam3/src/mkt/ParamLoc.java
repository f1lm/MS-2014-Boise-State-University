package mkt;

import de.must.dataobj.ConnectionSpecification;
import de.must.dataobj.ConnectionHolder;
import de.must.io.*;
import de.must.middle.GlobalStd;
import de.must.util.Crypt;

import java.io.*;

/**
 * Local Parameters.
 * @author Christoph Mueller
 */
public final class ParamLoc {

  private static final String PARAM_FILE_NAME = "BaseProperties.ser";
  private static File saveFile;
  private static ParmV001 parmdataV1;

  public ParamLoc() {
  }

  /**
   * Loads existing parameter values from user directory, if there already is one.
   * If not, parameters are loaded from Users Public directory. 
   * Changed parameters are stored in 'all user' or user directory, if there has been one before.
   */
  public static ParamLoc create() {
    File personalParamFile = new File(Global.getUserDataDir(),PARAM_FILE_NAME);
    File allUserDir = Global.getInstance().getAllUserDir();
    File publicParamFile = null;
    if (allUserDir != null) {
      publicParamFile = new File(allUserDir, PARAM_FILE_NAME);
      saveFile = publicParamFile;
    } else {
      saveFile = personalParamFile;
    }
    if (personalParamFile.exists()) { // personal setting have got priority
      parmdataV1 = (ParmV001) PermObject.read(personalParamFile);
      saveFile = personalParamFile;
    } else { // not personal
      if (publicParamFile != null && publicParamFile.exists()) {
        parmdataV1 = (ParmV001) PermObject.read(publicParamFile);
        if (!publicParamFile.canWrite()) {
          Logger.getInstance().info(ParamLoc.class, "Creating parameter copy from " + publicParamFile);
          saveFile = personalParamFile;
        }
      } else { // no parameter file at all yet
        File oldParamFile = new File("ParmV001.ser"); // until Windows XP this was in Program folder
        if (oldParamFile.exists()) {
          parmdataV1 = (ParmV001) PermObject.read(oldParamFile);
          updateParam();
          Logger.getInstance().info(ParamLoc.class, "Deletion of old parameter file " + oldParamFile.getPath() + " successful: " + oldParamFile.delete());
        }
      }
    }
    if (parmdataV1 == null) {
      parmdataV1 = new ParmV001();

      parmdataV1.parmBoolean[0] = true;
      parmdataV1.parmBoolean[1] = true;
      parmdataV1.parmBoolean[2] = true;
      parmdataV1.parmBoolean[3] = true;
      parmdataV1.parmBoolean[4] = true;
      parmdataV1.parmBoolean[5] = true;
      parmdataV1.parmBoolean[6] = true;
      parmdataV1.parmBoolean[7] = true;
      parmdataV1.parmBoolean[8] = true;
      parmdataV1.parmBoolean[9] = true;

      parmdataV1.parmInt[0] = 0;
      parmdataV1.parmInt[1] = 0;
      parmdataV1.parmInt[2] = 0;
      parmdataV1.parmInt[3] = 0;
      parmdataV1.parmInt[4] = 0;
      parmdataV1.parmInt[5] = 0;
      parmdataV1.parmInt[6] = 0;
      parmdataV1.parmInt[7] = 0;
      parmdataV1.parmInt[8] = 0;
      parmdataV1.parmInt[9] = 0;

      parmdataV1.parmString[0] = "Driver={Microsoft Access Driver (*.mdb)};DBQ=C:/Programme/Marketing/databases/Marketing.mdb";
      //parmdataV1.parmString[0] = "Marketing";
      parmdataV1.parmString[1] = "";
      parmdataV1.parmString[2] = "";
      parmdataV1.parmString[3] = "";
      parmdataV1.parmString[4] = "";
      parmdataV1.parmString[5] = "";
      parmdataV1.parmString[6] = "";
      parmdataV1.parmString[7] = "";
      parmdataV1.parmString[8] = "";
      parmdataV1.parmString[9] = "";
      parmdataV1.parmString[10] = "*AUTO"; // no suggested browser because we have args[1]
      parmdataV1.parmString[11] = "";
      parmdataV1.parmString[12] = "";
      parmdataV1.parmString[13] = "";
      parmdataV1.parmString[14] = "";
      parmdataV1.parmString[15] = "";
      parmdataV1.parmString[16] = "";
      parmdataV1.parmString[17] = "";
      parmdataV1.parmString[18] = "";
      parmdataV1.parmString[19] = "";
      parmdataV1.parmString[20] = "";
      parmdataV1.parmString[21] = "";
      parmdataV1.parmString[22] = "";
      parmdataV1.parmString[23] = "";
      parmdataV1.parmString[24] = "";
      parmdataV1.parmString[25] = "";
      parmdataV1.parmString[26] = "";
      parmdataV1.parmString[27] = "";
      parmdataV1.parmString[28] = "";
      parmdataV1.parmString[29] = "";

      updateParam();
    }
    return new ParamLoc();
  }

  public static void destroy() {
    parmdataV1 = null;
  }

/*******************************************************************************
assign string parameters
*******************************************************************************/

  public static String getOdbcName() {
    return parmdataV1.parmString[0];
  }
  public static void setOdbcName(String s) {
    parmdataV1.parmString[0] = s;
  }

//------------------------------------------------------------------------------

  public static String getUrl() {
    return parmdataV1.parmString[1];
  }
  public static void setUrl(String s) {
    parmdataV1.parmString[1] = s;
  }

//------------------------------------------------------------------------------

  public static String getDriverName() {
    return parmdataV1.parmString[2];
  }
  public static void setDriverName(String s) {
    parmdataV1.parmString[2] = s;
  }

//------------------------------------------------------------------------------

  public static String getDbUser() {
    return parmdataV1.parmString[3];
  }
  public static void setDbUser(String s) {
    parmdataV1.parmString[3] = s;
  }

//------------------------------------------------------------------------------

  public static String getDbPassword() {
    if (parmdataV1.parmString[4] == null) return null;
    return Crypt.decrypt(parmdataV1.parmString[4]);
  }
  public static void setDbPassword(String s) {
    parmdataV1.parmString[4] = Crypt.encrypt(s);
  }

//------------------------------------------------------------------------------

  public static String getUserName() {
    String systemUserName;
    try {
      systemUserName = System.getProperty("user.name");
    }
    catch (Exception e) {
      return parmdataV1.parmString[8];
    }
    if (systemUserName.equals("")) systemUserName = "unknown";
    if (systemUserName.equals("unknown")) return parmdataV1.parmString[8];
    else return systemUserName;
  }
  public static void setUserName(String s) {
    parmdataV1.parmString[8] = s;
  }

//------------------------------------------------------------------------------

  public static String getBrowserPath() {
    return parmdataV1.parmString[10];
  }
  public static void setBrowserPath(String s) {
    if (s.equals("")) {
      parmdataV1.parmString[10] = "*AUTO";
    }
    else {
      parmdataV1.parmString[10] = s;
    }
    if (parmdataV1.parmString[10].equals("*AUTO")) {
      de.must.util.Browser.setBrowserPath(GlobalStd.getBrowserPath());
    }
    else {
      de.must.util.Browser.setBrowserPath(getBrowserPath());
    }
  }

//------------------------------------------------------------------------------

  public static String getMdbFilePath() {
    return parmdataV1.parmString[13];
  }
  public static void setMdbFilePath(String s) {
    parmdataV1.parmString[13] = s;
  }

/*******************************************************************************
assign int parameters
*******************************************************************************/

  public static int getAccessType() {
    return parmdataV1.parmInt[0];
  }
  public static void setAccessType(int i) {
    parmdataV1.parmInt[0] = i;
  }

/*******************************************************************************
assign boolean parameters
*******************************************************************************/

/*******************************************************************************
combined stuff
*******************************************************************************/

  public static ConnectionSpecification getConnectionSpecification() {
    ConnectionSpecification spec = null;
    switch (getAccessType()) {
    case ConnectionHolder.ODBC_ACCESS_BY_MDB_FILE_NAME:
      spec = new ConnectionSpecification(new File(getMdbFilePath()), getDbUser(), getDbPassword());
      break;
    case ConnectionHolder.ODBC_ACCESS:
      if (getOdbcName().length() > 0) {
        spec = new ConnectionSpecification(getOdbcName(), getDbUser(), getDbPassword());
      }
      break;
    case ConnectionHolder.OTHER_ACCESS:
      spec = new ConnectionSpecification(getUrl(), getDriverName(), getDbUser(), getDbPassword());
      break;
    }
    return spec;
  }

/*******************************************************************************
update
*******************************************************************************/

  public static void updateParam() {
    PermObject.write(saveFile, (Object)parmdataV1);
  }

}


/*******************************************************************************
serializable parameter class version 1
*******************************************************************************/

class ParmV001 implements Serializable {

  public String parmString[] = new String[30];
  public int parmInt[] = new int[10];
  public boolean parmBoolean[] = new boolean[10];

  public ParmV001() {
  }

}


