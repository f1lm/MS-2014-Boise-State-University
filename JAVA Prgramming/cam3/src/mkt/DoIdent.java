//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

/*
 * This DataObject is only needed for tablecreation.
 * Regular access to this entity by IdManager!
 */

import de.must.dataobj.*;

/**
 * @author Christoph Mueller
 */
public class DoIdent extends DataObject {

  public static final String tableName = "Identity";

  public static final AbstractAttribute[] attributes = {
    new CharAttribute("Entity", "Entity", 10),
    new NumericAttribute("Identnummer",  "IdentNr"),
  };

  public static final Index[] indices = {
    new Index (
      new IndexItem[] {
        new IndexItem("Entity", IndexItem.ASCENDING),
      },
      Index.UNIQUE
    ),
  };

  public DoIdent() {
    super(Global.getInstance());
  }

  public DoIdent(java.sql.Connection connection) {
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
