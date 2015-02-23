//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.dataobj.*;

/**
 * Entity identy management. Needed for building primary keys.
 * @author Christoph Mueller
 */
public final class DoIdent extends DataObject {

  public static final String tableName = "Identity";

  public static final AbstractAttribute[] attributes = {
    new CharAttribute("Entity",       "Entity", 10),
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

  public DoIdent(DataObjectConstructionDetails dataObjectConstructionDetails) {
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
