//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

import de.must.dataobj.*;

/**
 * @author Christoph Mueller
 */
public final class DoKontaktart extends DataObject {

  public static final String tableName = "Kontaktart";

  public static final AbstractAttribute[] attributes = {
    new NumericAttribute("Kontaktart, interne Nummer", "KontartNI"),
    new VarcharAttribute("Dienststellen-Bezeichnung", "KontartBZ", 60),
    new NumericAttribute("Pos", "position"),
  };

  public static final Index[] indices = {
    new Index (
      new IndexItem[] {
        new IndexItem("KontartNI", IndexItem.ASCENDING),
      },
      Index.UNIQUE
    ),
    new Index (
      new IndexItem[] {
        new IndexItem("position", IndexItem.ASCENDING),
        new IndexItem("KontartBZ", IndexItem.ASCENDING),
      },
      Index.DUPLICATES
    ),
  };

  public DoKontaktart() {
    super(Global.getInstance());
  }

  public DoKontaktart(java.sql.Connection connection) {
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
