//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

/**
 * @author Christoph Mueller
 */
public final class Res extends java.util.ListResourceBundle {
  static final Object[][] contents = new String[][]{
	{ "TEXT_MENU", "Menu" },
	{ "TEXT_ENQUIRY", "Enquiry" },
	{ "TEXT_NEW_RECIPE", "New Recipe" },
	{ "TEXT_RECIPE_TYPES", "Recipe Types" },
	{ "TEXT_RECIPE_TITLE", "Recipe Title" },
	{ "TEXT_RECIPE_TYPE", "Recipe Type" },
	{ "TEXT_DIABETIC_RECOMMENDATION", "Diabetic recommendation" },
	{ "TEXT_INGREDIENTS", "Ingredients" },
	{ "TEXT_EVERYTHING_THAT_IS_PART_OF_THE_DISH", "Everything that is part of the dish" },
	{ "TEXT_PREPARATION", "Preparation" },
	{ "TEXT_THE_WAY_OF_PREPARING_THE_DISH", "How the dish is prepared" },
	{ "TEXT_SOURCE", "Source" },
	{ "TEXT_THE_SOURCE_OF_THE_RECIPE", "The source of the recipe" },
	{ "TEXT_OF_DATE", "Origine (Date)" },
	{ "TEXT_COOKBOOK_ENQUIRY", "Cookbook Enquiry" },
	{ "TEXT_RECIPE_DESCRIPTION", "Recipe Description" },
	{ "TEXT_TITLE_OR_FRAGMENT_OF_IT", "Title or part of it" },
	{ "TEXT_ENTER_A_SEARCHED_INGREDIENT", "Enter a searched ingredient" },
	{ "TEXT_ENQUIRY_RESULT", "Enquiry Result" },
	{ "TEXT_COOKBOOK_MAIN_MENU", "Cookbook Main Menu" },
	{ "TEXT_COOKBOOK", "Cookbook" },
	{ "TEXT_CATEGORY", "Categories" },
	{ "TEXT_ADMINISTRATION", "Administration" },
	{ "TEXT_CHANGE_LAYOUT", "Change Layout" },
	{ "TEXT_CHANGE_LANGUAGE", "Change Language" },
	{ "TEXT_LOOKING_FOR_EXISTING_RECEIPTS", "Looking for extisting receipts" },
	{ "TEXT_ENTER_NEW_RECEIPT", "Enter new receipt" },
	{ "TEXT_CREATE_OR_MODIFY_RECEIPT_TYPES", "Create or modify receipt types" },
	{ "TEXT_NEW_USER", "New user" },
	{ "TEXT_USER_ENQUIRY", "User enquiry" },
	{ "TEXT_USER_ADMINISTRATION", "User administration" },
	{ "TEXT_LOGIN_FOR_MORE_FUNCTIONALITY", "Login for more functionality" },
	{ "TEXT_LAST_NAME", "Last name" },
	{ "TEXT_FIRST_NAME", "First name" },
	{ "TEXT_HELP_INDEX", "Help Index" },
	{ "URI_HELP_INDEX", "../help/english/Index.htm" },
	{ "TEXT_SAMPLE_IMAGE", "Sample image" },
	{ "TEXT_LOGIN_FAILED", "Login failed" },
	{ "TEXT_OLD_PASSWORD_INCORRECT", "Old password incorrect" },
  { "TEXT_CHANGE_PASSWORD", "Change password" },
  };

  public Object[][] getContents() {
    return contents;
  }

}
