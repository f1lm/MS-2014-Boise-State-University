//elementary!

/*
 * Public Domain Sample Code
 */
package mkt;

import de.must.dataobj.*;

/**
 * @author Christoph Mueller
 */
public final class CurrentUser implements DataChangeListener {
  private static CurrentUser mainInstance;
  private static DoUser doUser1;

  public static void create() {
    mainInstance = new CurrentUser();
    doUser1 = new DoUser();
    doUser1.addDataChangeListener((DataChangeListener)mainInstance);
    loadAll();
  }

  public static void destroy() {
    if (doUser1 != null) {
      doUser1.closeQuery();
      doUser1.removeDataChangeListener((DataChangeListener)mainInstance);
    }
    doUser1 = null;
    mainInstance = null;
  }

  public static void loadAll() {
    doUser1.select("*", "userid = \'" + ParamLoc.getUserName() + "\'");
  }

  public static String getUserName() {
    return ParamLoc.getUserName();
  }

  public static boolean isSystemIdentified() {
    String systemUserName;
    try {
      systemUserName = System.getProperty("user.name");
    }
    catch (Exception e) {
      return false;
    }
    if (systemUserName.equals("unknown") | systemUserName.equals("")) return false;
    return true;
  }

  public static boolean isAdmin() {
    if (!isSystemIdentified()) return false;
    if (getUserName().startsWith("Admin")) return true;
    if (getUserName().startsWith("admin")) return true;
    return false;
  }

  public CurrentUser() {
  }

  public void DataChangePerformed(DataChangedEvent e) {
    if (e.getEntityName().equals(doUser1.getTableName())) {
      loadAll();
    }
  }

}
