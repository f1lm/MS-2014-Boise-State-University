//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

import de.must.dataobj.*;

/**
 * @author Christoph Mueller
 */
public class DoUser extends DataObject {

  public static final String tableName = "User";

  public static final AbstractAttribute internalUserNbr = new NumericAttribute("Benutzernummer intern", "userni");
  public static final AbstractAttribute userDescription = new VarcharAttribute("Bezeichnung", "userbz", 60);
  public static final AbstractAttribute userId = new CharAttribute("Benutzer-ID", "userid", 20);
  public static final AbstractAttribute userGroup = new CharAttribute("Benutzergruppe", "dtagrpid", 1);

  public static final AbstractAttribute[] attributes = {
    internalUserNbr,
    userId,
    userDescription,
    userGroup,
  };

  public static final Index[] indices = {
    new Index (
      new IndexItem[] {
        new IndexItem("userni", IndexItem.ASCENDING),
      },
      Index.UNIQUE
    ),
    new Index (
      new IndexItem[] {
        new IndexItem("userid", IndexItem.ASCENDING),
      },
      Index.UNIQUE
    ),
    new Index (
      new IndexItem[] {
        new IndexItem("userbz", IndexItem.ASCENDING),
      },
      Index.DUPLICATES
    ),
  };

  public DoUser() {
    super(Global.getInstance());
  }

  public DoUser(java.sql.Connection connection) {
    super(connection);
  }

  public String getTableName() {
    return tableName;
  }

  public AbstractAttribute[] getAttributes() {
    return attributes;
  }

  public Index[] getIndices() {
    return indices;
  }

}
