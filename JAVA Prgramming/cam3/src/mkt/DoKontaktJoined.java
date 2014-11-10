/*
 * Public Domain Sample Code 
 */
package mkt;

/**
 * Special class to allow group enquiry for those databases that do not
 * support "where in" like MySql.
 * @author Christoph Mueller
 */
public class DoKontaktJoined extends DoKontakt {

  private String additionalTables = "";

  public DoKontaktJoined() {
  }

  public String getTableName() {
    if (additionalTables.equals("")) return tableName;
    return tableName + ", " + additionalTables;
  }

  public void setAdditionalTables(String newAdditionalTables) {
    additionalTables = newAdditionalTables;
  }

  public String getAdditionalTables() {
    return additionalTables;
  }

}