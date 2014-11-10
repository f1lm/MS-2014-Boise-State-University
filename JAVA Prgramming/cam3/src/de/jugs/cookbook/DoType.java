//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.dataobj.*;

/**
 * @author Christoph Mueller
 */
public final class DoType extends DataObject {

  public static final String tableName = "Type";

  public static final AbstractAttribute[] attributes = {
    new NumericAttribute("Rezepttyp, interne Nummer", "TypNI"),
    new VarcharAttribute("Rezepttyp-Bezeichnung", "TypBez", 60),
    new NumericAttribute("Pos", "position"),
  };

  public static final Index[] indices = {
    new Index (
      new IndexItem[] {
        new IndexItem("TypNI", IndexItem.ASCENDING),
      },
      Index.UNIQUE
    ),
    new Index (
      new IndexItem[] {
        new IndexItem("position", IndexItem.ASCENDING),
        new IndexItem("TypBez", IndexItem.ASCENDING),
      },
      Index.DUPLICATES
    ),
  };

  public DoType(DataObjectConstructionDetails dataObjectConstructionDetails) {
    super(dataObjectConstructionDetails);
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
