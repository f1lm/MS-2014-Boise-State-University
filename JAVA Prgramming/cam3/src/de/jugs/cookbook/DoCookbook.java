//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.dataobj.*;

/**
 * @author Christoph Mueller
 */
public final class DoCookbook extends DataObject {

  public static final String tableName = "Cookbook";

  public static final AbstractAttribute cookNI = new NumericAttribute("Rezeptnummer intern", "RezeptNI");
  public static final AbstractAttribute title = new VarcharAttribute("Rezept-Bezeichnung", "RezeptBez", 80);
  public static final AbstractAttribute parts = new VarcharAttribute("Zutaten", "Zutaten", 2000);
  public static final AbstractAttribute preparation = new VarcharAttribute("Zubereitung", "Zubereit", 4000);

  public static final AbstractAttribute[] attributes = {
    cookNI,
    title,
    parts,
    preparation,
    new NumericAttribute("Portionen", "Portionen"),
    new NumericAttribute("Brennwert pro Portion", "Brennwert"),
    new NumericAttribute("Garzeit", "Garzeit"),
    new VarcharAttribute("Quelle", "Quelle", 254),
    new VarcharAttribute("Bereitgestellt von", "Von", 60),
    new DateAttribute("Bereitgestellt am (Datum)", "Vom"),
    new NumericAttribute("Rezepttyp", "Typ"),
    new BooleanAttribute("Für Diabetiker geeignet", "Diabetiker"),
  };

  public static final Index[] indices = {
    new Index (
      new IndexItem[] {
        new IndexItem("RezeptNI", IndexItem.ASCENDING),
      },
      Index.UNIQUE
    ),
  };

  public DoCookbook(DataObjectConstructionDetails dataObjectConstructionDetails) {
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
