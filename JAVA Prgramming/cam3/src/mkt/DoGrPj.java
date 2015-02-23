//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

import de.must.dataobj.*;

/**
 * @author Christoph Mueller
 */
public class DoGrPj extends DataObject {

  public static final String tableName = "Grpj";

  public static final AbstractAttribute[] attributes = {
    new NumericAttribute("Identnummer", "GRPJNI"),
    new VarcharAttribute("Bezeichnung", "GRPJBZ", 60),
    new NumericAttribute("Pos", "position"),
  };

  public static final Index[] indices = {
    new Index (
      new IndexItem[] {
        new IndexItem("GRPJNI", IndexItem.ASCENDING),
      },
      Index.UNIQUE
    ),
    new Index (
      new IndexItem[] {
        new IndexItem("position", IndexItem.ASCENDING),
        new IndexItem("GRPJBZ", IndexItem.ASCENDING),
      },
      Index.DUPLICATES
    ),
  };

 public DoGrPj() {
    super(Global.getInstance());
  }

  public DoGrPj(java.sql.Connection connection) {
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
