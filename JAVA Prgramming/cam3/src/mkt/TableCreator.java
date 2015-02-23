package mkt;

import java.sql.SQLException;

import de.must.dataobj.*;

public class TableCreator extends TableCreatorStd {

  public static final int UPDATE_UPDATEDAT = 1; // 2009
  public static final int UPDATE_REFDARST = 2; // 12.2009
  
  public TableCreator() {
    super(Global.getInstance());
  }

  public static DataObject[] getAllDataObjects() {
    return new DataObject[] {
      new DoIdent(),
      new DoParam(),
      new DoUser(),
      new DoKontakt(),
      new DoGrPj(),
      new DoGzPj(),
      new DoKontaktart(),
      new DoAddressBuffer(),
    };
  }

  @Override
  protected EntityInfo[] getAllEntityInfos() {
    return getAllDataObjects();
  }

  @Override
  public String getDatabaseName() {
    return "Marketing";
  }

  @Override
  public boolean isCreationNecessary() {
    boolean creationRequired = false;
    DoKontakt doKontakt = new DoKontakt();
    if (!doKontakt.openQuery("select * from " + doKontakt.getTableName())) {
      creationRequired = true;
    }
    doKontakt.closeQuery();
    return creationRequired;
  }

  public int getUpdateLevel() {
    // check in sequence from latest to earliest database modification! Thus, only one access is necessary in standard case.
    int updateLevel = UPDATE_NONE;
    // ------------------------------------------------
    DoKontakt doKontakt = new DoKontakt();
    if (!doKontakt.openQuery("select RefDarst from " + doKontakt.getTableName())) {
      updateLevel = UPDATE_REFDARST;
    } else doKontakt.closeQuery();
    doKontakt.free();
    doKontakt = null;
    // ------------------------------------------------
    if (updateLevel == UPDATE_NONE) return updateLevel; // Last modification was checked first. Thus, no further check is to be done here!
    // ------------------------------------------------
    doKontakt = new DoKontakt();
    if (!doKontakt.openQuery("select UpdateDat from " + doKontakt.getTableName())) {
      updateLevel = UPDATE_UPDATEDAT;
    } else doKontakt.closeQuery();
    doKontakt.free();
    doKontakt = null;
    // ------------------------------------------------
    return updateLevel;
  }
  
  protected void updateDatabase(int updateLevel) {
    if (updateLevel <= UPDATE_UPDATEDAT) {
      inform("updating " + DoKontakt.tableName +  " ..."); 
      dbModifier.updateTable(Global.getInstance().connectionSpecification, new DoKontakt());
      inform("updating " + DoAddressBuffer.tableName +  " ..."); 
      dbModifier.updateTable(Global.getInstance().connectionSpecification, new DoAddressBuffer());
    }
    if (updateLevel <= UPDATE_REFDARST) {
      inform("updating " + DoKontakt.tableName +  " ..."); 
      dbModifier.updateTable(Global.getInstance().connectionSpecification, new DoKontakt());
      inform("updating " + DoAddressBuffer.tableName +  " ..."); 
      dbModifier.updateTable(Global.getInstance().connectionSpecification, new DoAddressBuffer());
      initialFillRefDarst();
    }
  }
  
  private void initialFillRefDarst() {
    DoKontakt doKontakt;
    try {
      doKontakt = new DoKontakt(Global.getInstance().connectionSpecification.getConnection());
      doKontakt.select("*");
      while (doKontakt.nextRow()) {
        String refDarst = doKontakt.getText("Firma");
        String ort = doKontakt.getText("ORTSBZ");
        if (refDarst.indexOf(ort) == -1) {
          if (refDarst.length() > 0) {
            refDarst += " - ";
            refDarst += ort;
          }
        }
        doKontakt.setText("RefDarst", refDarst);
        doKontakt.save();
      }
      doKontakt.closeQuery();
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

}
