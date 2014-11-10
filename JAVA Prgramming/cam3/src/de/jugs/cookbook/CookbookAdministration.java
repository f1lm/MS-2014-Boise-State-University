//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.markup.*;

/**
 * @author Christoph Mueller
 */
public final class CookbookAdministration extends DataPropertyAdministration {

  public static final int subjectArea = Entitlement.AREA_COOKBOOK_GENERAL;
  public static final int standardLevel = Entitlement.LEVEL_ADD;

  private DataTextField Quelle;

  public CookbookAdministration(SessionData sessionData) {
    super(new DoCookbook(sessionData), sessionData);
    setHelpContext("Operate", "newrec");
    createTextField(sessionData.getResourceString("TEXT_RECIPE_TITLE"), "RezeptBez"); setRequired(true);
    createComboBox(sessionData.getResourceString("TEXT_RECIPE_TYPE"), "Typ", new DoType(sessionData), "TypBez");
    createCheckBox("Diabetiker", sessionData.getResourceString("TEXT_DIABETIC_RECOMMENDATION"));
    createTextArea(sessionData.getResourceString("TEXT_INGREDIENTS"), "Zutaten"); setToolTipText(sessionData.getResourceString("TEXT_EVERYTHING_THAT_IS_PART_OF_THE_DISH"));
    createTextArea(sessionData.getResourceString("TEXT_PREPARATION"), "Zubereit"); setToolTipText(sessionData.getResourceString("TEXT_THE_WAY_OF_PREPARING_THE_DISH"));
    Quelle = createTextField(sessionData.getResourceString("TEXT_SOURCE"), "Quelle"); setToolTipText(sessionData.getResourceString("TEXT_THE_SOURCE_OF_THE_RECIPE"));
    createDateField(sessionData.getResourceString("TEXT_OF_DATE"), "Vom");
    if (isMultipartAvailable()) createFileUploader(sessionData.getResourceString("TEXT_SAMPLE_IMAGE"), Constants.SAMPLE_IMAGE_DIRECTORY);

    setFrameUpdateTitleField(Quelle);
    setFrameTitleNew(sessionData.getResourceString("TEXT_NEW_RECIPE"));
  }
  
	/**
	 * Returns true if multipart request can be handled because add-on is available.
   * For easy demo installation only.
	 * @return true if multipart request can be handled because add-on is available
	 */
  private boolean isMultipartAvailable() {
		try {
			Class.forName("com.oreilly.servlet.multipart.MultipartParser");
		} catch (ClassNotFoundException e) {
      return false;
		}
    return true;
  }

}
