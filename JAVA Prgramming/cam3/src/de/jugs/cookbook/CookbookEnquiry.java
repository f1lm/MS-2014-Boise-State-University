//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.markup.*;

/**
 * @author Christoph Mueller
 */
public final class CookbookEnquiry extends Enquiry {

  private HalfDataComboBox typ;
  private MustTextField titel;
  private MustTextField zutaten;
  private MustTextField quelle;

  public CookbookEnquiry() {
    this(null);
  }

  public CookbookEnquiry(SessionData sessionData) {
    super(sessionData);
    setTitle(sessionData.getResourceString("TEXT_COOKBOOK_ENQUIRY"));
    setHelpContext("Operate", "Search");

    typ = createComboBox(sessionData.getResourceString("TEXT_RECIPE_TYPES") , new DoType(sessionData), "TypBez", "position, TypBez");
    titel = createTextField(sessionData.getResourceString( "TEXT_RECIPE_DESCRIPTION"), 40); setToolTipText(sessionData.getResourceString("TEXT_TITLE_OR_FRAGMENT_OF_IT"));
    zutaten = createTextField(sessionData.getResourceString("TEXT_INGREDIENTS"), 40); setToolTipText(sessionData.getResourceString("TEXT_ENTER_A_SEARCHED_INGREDIENT"));
    quelle = createTextField(sessionData.getResourceString("TEXT_SOURCE"), 40); setToolTipText(sessionData.getResourceString("TEXT_THE_SOURCE_OF_THE_RECIPE"));
  }

  public Class<? extends Invokable> getDataListClass() {
    return CookbookList.class;
  }

  protected String getWhereCondition() {
    String whereCondition = "";
    if (typ.isSpecialChoice()) {
      if (!whereCondition.equals("")) whereCondition += " and ";
      whereCondition += " Typ = " + typ.getSelectedIdentifier().getIntIdentifier();
    }
    if (!titel.getText().equals("")) {
      if (!whereCondition.equals("")) whereCondition += " and ";
      whereCondition += "RezeptBez like '%" + titel.getText() + "%'";
    }
    if (!zutaten.getText().equals("")) {
      if (!whereCondition.equals("")) whereCondition += " and ";
      whereCondition += "Zutaten like '%" + zutaten.getText() + "%'";
    }
    if (!quelle.getText().equals("")) {
      if (!whereCondition.equals("")) whereCondition += " and ";
      whereCondition += "Quelle like '%" + quelle.getText() + "%'";
    }
    return whereCondition;
  }

}
