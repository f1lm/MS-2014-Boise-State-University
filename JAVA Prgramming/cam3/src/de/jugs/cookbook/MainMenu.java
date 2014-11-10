//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.markup.*;

/**
 * Hierarchical menu definition. Declare your menu structur via addMenu,
 * addMenuItem, addSubMenu and closeMenu. The framework will lead the user
 * through the menu tree.
 * @author Christoph Mueller
 */
public final class MainMenu extends MustMenuBar {

  public MainMenu(SessionData sessionData) {
    super(sessionData);
    setRootMenuDescription(sessionData.getResourceString("TEXT_COOKBOOK_MAIN_MENU"));

    addMenu(sessionData.getResourceString("TEXT_COOKBOOK"), Entitlement.AREA_COOKBOOK_GENERAL);
    addMenuItem(sessionData.getResourceString("TEXT_COOKBOOK_ENQUIRY"), CookbookEnquiry.class);
    addMenuItem(sessionData.getResourceString("TEXT_NEW_RECIPE"), CookbookAdministration.class);

    addMenu(sessionData.getResourceString("TEXT_CATEGORY"), Entitlement.AREA_COOKBOOK_ORGANIZATION, Entitlement.LEVEL_CHANGE);
    addMenuItem(sessionData.getResourceString("TEXT_RECIPE_TYPES"), TypeAdministration.class);

    addMenu(sessionData.getResourceString("TEXT_ADMINISTRATION"), Entitlement.AREA_GLOBAL_ADMINISTRATION);
    addSubMenu(sessionData.getResourceString("TEXT_USER_ADMINISTRATION"), Entitlement.AREA_GLOBAL_ADMINISTRATION);
    addMenuItem(sessionData.getResourceString("TEXT_USER_ENQUIRY"), UserEnquiry.class);
    addMenuItem(sessionData.getResourceString("TEXT_NEW_USER"), UserAdministration.class);
    closeMenu();
    // addMenuItem(sessionData.getResourceString("TEXT_CHANGE_LAYOUT"), LayoutChooser.class);
    closeMenu();

    addMenuItem(sessionData.getResourceString("TEXT_LOGIN_FOR_MORE_FUNCTIONALITY"), CookBookLogin.class);
    addMenuItem(sessionData.getResourceString("TEXT_CHANGE_PASSWORD"), PasswordChangeDialog.class);
    addMenuItem(sessionData.getResourceString("TEXT_HELP_INDEX"), new FreeAction("showHelpIndex()", sessionData.getResourceString("URI_HELP_INDEX")));
    addMenuItem("Info", new Href("./../must.html"));
    // addMenuItem(getResourceString(res, "TEXT_CHANGE_LANGUAGE"), LanguageChooser.class);
  }

}
