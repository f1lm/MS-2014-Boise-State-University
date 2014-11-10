//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

import de.must.wuic.*;
import de.must.dataobj.*;

/**
 * @author Christoph Mueller
 */
public class FrGrPj extends DataTableAdministration {

  private DoGzPj doGzPj1;

  public static void openMainInstance() {
    getOrCreateMainInstance().open();
  }
  
  public static FrGrPj getOrCreateMainInstance() {
    return (FrGrPj)getOrCreateMainInstance(FrGrPj.class);
  }

  public FrGrPj() {
    this.setTitle("Kontakt-Gruppen");
  }

  protected DataObject getAssignedDataObject() {
    return new DoGrPj();
  }

  protected String[] getColumnNames() {
    return new String[] {"GRPJBZ", "position"};
  }

  protected boolean isInUse(Identifier keyIdentifier) {
    if  (doGzPj1 == null) doGzPj1 = new DoGzPj();
    return doGzPj1.contains("GRPJNI", keyIdentifier);
  }

}

