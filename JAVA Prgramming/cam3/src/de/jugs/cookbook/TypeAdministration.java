/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.markup.*;
import de.must.dataobj.DataObject;
import de.must.dataobj.Identifier;

/**
 * @author Christoph Mueller
 */
public final class TypeAdministration extends DataTableAdministration {

  public static final int subjectArea = Entitlement.AREA_COOKBOOK_ORGANIZATION;
  public static final int standardLevel = Entitlement.LEVEL_CHANGE;

  private DoCookbook doCookbook1;

  public TypeAdministration(SessionData sessionData) {
    super(sessionData);
    setTitle(sessionData.getResourceString("TEXT_RECIPE_TYPES"));
    setHelpContext("Operate", "newcat");
  }

  protected DataObject getAssignedDataObject() {
    return new DoType(sessionData);
  }

  protected String[] getColumnNames() {
    return new String[] {"TypBez", "position"};
  }

  protected boolean isInUse(Identifier identifier) {
    if (doCookbook1 == null) doCookbook1 = new DoCookbook(sessionData);
    // return doCookbook1.contains(assignedDataObject.getUniqueKeyName(), identifier);
    return doCookbook1.contains("Typ", identifier);
  }

}
