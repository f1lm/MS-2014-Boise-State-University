//elementary!

/*
 * Public Domain Sample Code
 */
package mkt;

import de.must.dataobj.*;

/**
 * Data object for parameter persistence. Accessed by class Parameter.
 * @author Christoph Mueller
 * @see Parameter
 */
public class DoParam extends DataObject {

  public static final String tableName = "Parameter";

  public static final AbstractAttribute[] attributes = {
    new CharAttribute("Parameter-Id", "ParmId", 10),
    new VarcharAttribute("Parameterwert", "PaWert", 60),
  };

  public static final Index[] indices = {
    new Index (
      new IndexItem[] {
        new IndexItem("ParmId", IndexItem.ASCENDING),
      },
      Index.UNIQUE
    ),
  };

  public DoParam() {
    super(Global.getInstance());
  }

  public DoParam(java.sql.Connection connection) {
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
