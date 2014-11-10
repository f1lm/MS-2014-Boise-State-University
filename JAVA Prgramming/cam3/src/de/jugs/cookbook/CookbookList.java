//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.markup.*;

/**
 * @author Christoph Mueller
 */
public final class CookbookList extends SimpleDataList {

  public CookbookList(SessionData sessionData) {
    super(sessionData);
    try {
      setTitle(sessionData.getResourceString("TEXT_ENQUIRY_RESULT"));
      setHelpContext("Operate", "showlist");
      setListDataObject(new DoCookbook(sessionData));
    }
    catch (Exception e) {
      e.printStackTrace();
    }
  }

  protected String getSelectionFields() {
    return "RezeptNI, RezeptBez, Zutaten, Zubereit, Quelle, Von";
  }

  protected String getOrderByFields() {
    return "RezeptBez";
  }

  public String getRowString() {
    return listDataObject.getText("RezeptBez");
  }

  protected Class<? extends Invokable> getDataPresentationClass() {
    return CookbookPresentation.class;
  }

  protected Class<? extends Invokable> getDataAdministrationClass() {
    return CookbookAdministration.class;
  }

}
