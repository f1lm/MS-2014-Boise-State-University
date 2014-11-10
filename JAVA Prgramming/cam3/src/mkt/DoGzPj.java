//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

import de.must.dataobj.*;

/**
 * @author Christoph Mueller
 */
public class DoGzPj extends AssoDataObject {

  public static final String tableName = "Gzpj";

  public static final AbstractAttribute[] attributes = {
    new NumericAttribute("Kontakt, int. Nr.", "KontaktNi"),
    new NumericAttribute("Gruppe", "GRPJNI"),
  };

  public static final Index[] indices = {
    new Index (
      new IndexItem[] {
        new IndexItem("KontaktNi", IndexItem.ASCENDING),
        new IndexItem("GRPJNI", IndexItem.ASCENDING),
      },
      Index.UNIQUE
    ),
    new Index (
      new IndexItem[] {
        new IndexItem("GRPJNI", IndexItem.ASCENDING),
        new IndexItem("KontaktNi", IndexItem.ASCENDING),
      },
      Index.DUPLICATES
    ),
  };
  
  public DoGzPj() {
    super(Global.getInstance());
  }

  public DoGzPj(java.sql.Connection connection) {
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

  public boolean isLinked(Identifier kontaktNi, Identifier grpjni) {
    return this.isAvailable("KontaktNi = " + kontaktNi.getIntIdentifier() + " and GRPJNI = " + grpjni.getIntIdentifier(), "KontaktNi, GRPJNI");
  }

  public void link(Identifier kontaktNi, Identifier grpjni) {
    newRow();
    setInt("KontaktNi", kontaktNi.getIntIdentifier());
    setInt("GRPJNI", grpjni.getIntIdentifier());
    insert();
  }

  public void unlink(Identifier kontaktNi, Identifier grpjni) {
    deleteFreeConditioned("KontaktNi = " + kontaktNi.getIntIdentifier() + " and GRPJNI = " + grpjni.getIntIdentifier());
  }

  public void unlinkAll(Identifier kontaktNi) {
    deleteFreeConditioned("KontaktNi = " + kontaktNi.getIntIdentifier());
  }

}


