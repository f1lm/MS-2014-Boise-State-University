//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

import de.must.wuic.*;
import de.must.dataobj.*;

/**
 * Sample for administrating simple tables meant to be used in ComboBoxes
 * @author Christoph Mueller
 */
public final class FrKontaktart extends DataTableAdministration {

  private DoKontakt doKontakt1;

  public static void openMainInstance() {
    getOrCreateMainInstance().open();
  }
  
  public static FrKontaktart getOrCreateMainInstance() {
    return (FrKontaktart)MustFrame.getOrCreateMainInstance(FrKontaktart.class);
  }

  public FrKontaktart() {
    this.setTitle("Kontaktarten");
  }

  protected DataObject getAssignedDataObject() {
    return new DoKontaktart();
  }

  protected String[] getColumnNames() {
    return new String[] {"KontartBZ", "position"};
  }

  protected boolean isInUse(Identifier keyIdentifier) {
    if  (doKontakt1 == null) doKontakt1 = new DoKontakt();
    return doKontakt1.contains(assignedDataObject.getUniqueKeyName(), keyIdentifier);
  }

}
