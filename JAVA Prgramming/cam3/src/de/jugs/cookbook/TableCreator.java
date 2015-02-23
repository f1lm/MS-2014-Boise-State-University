//elementary!

/*
 * Public Domain Sample Code
 */
package de.jugs.cookbook;

import de.must.dataobj.*;

/**
 * Table creator to setup the cookbook database for MS Access.
 * Performs create table and create index.
 * Create a database and DNS via ODBC and run this class to get the cookbook
 * database.
 * @see DbScripCreator
 * @author Christoph Mueller
 */
public class TableCreator extends TableCreatorStd {

  public TableCreator() {
    super(Global.getInstance());
  }

  protected EntityInfo[] getAllEntityInfos() {
    return new EntityInfo[] {
      new DoIdent(null),
      new DoUser(null),
      new DoCookbook(null),
      new DoType(null),
    };
  }

  @Override
  public boolean isCreationNecessary() {
    return true;
  }

  @Override
  public String getDatabaseName() {
    return "Cookbook";
  }

  @Override
  public int getUpdateLevel() {
    return UPDATE_NONE;
  }
  
  protected void updateDatabase(int updateLevel) {
  }

  static public void main(String[] args) {
    Global.getInstance().connectionSpecification = new ConnectionSpecification("Cookbook");
  	Global.getInstance().createOrCheckConnections();
  	TableCreator tableCreator = new TableCreator();
  	tableCreator.createTables();
  }

}
