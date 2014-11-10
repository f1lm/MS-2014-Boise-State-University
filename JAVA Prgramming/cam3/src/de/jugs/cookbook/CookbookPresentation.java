//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.markup.*;

/**
 * @author Christoph Mueller
 */
public final class CookbookPresentation extends DataPropertyPresentation {

  private DataTextPresenter quelle;

  public CookbookPresentation(SessionData sessionData) {
    super(new DoCookbook(sessionData), sessionData);
    setDeleteHelpContext("Operate", "delrec");

    createTextPresenter(sessionData.getResourceString("TEXT_RECIPE_TITLE"), "RezeptBez");
    createReferencePresenter(sessionData.getResourceString("TEXT_RECIPE_TYPE"), "Typ", new DoType(sessionData), "TypBez");
    createBoolPresenter(sessionData.getResourceString("TEXT_DIABETIC_RECOMMENDATION"), "Diabetiker");
    createTextPresenter(sessionData.getResourceString("TEXT_INGREDIENTS"), "Zutaten");
    createTextPresenter(sessionData.getResourceString("TEXT_PREPARATION"), "Zubereit");
    quelle = createTextPresenter(sessionData.getResourceString("TEXT_SOURCE"), "Quelle");
    createDatePresenter(sessionData.getResourceString("TEXT_OF_DATE"), "Vom");
    createImagePresenter(sessionData.getResourceString("TEXT_SAMPLE_IMAGE"), Constants.SAMPLE_IMAGE_DIRECTORY);

  }

}
