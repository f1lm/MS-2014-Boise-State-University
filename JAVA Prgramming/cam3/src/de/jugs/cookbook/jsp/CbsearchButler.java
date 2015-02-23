/*
 * Public Domain Sample Code
 */
package de.jugs.cookbook.jsp;

import de.jugs.cookbook.*;
import de.must.markup.*;

/**
 * Devoted butler of the cookbook search JSP.
 * See super class JspButler for documentation.
 * @author Christoph Mueller
 */
public class CbsearchButler extends JspButler {

  private GroupOfMarkupables markupables;

  public MustTextField rezeptBez;
  public HalfDataComboBox typ;
  public MustTextField zutaten;
  public SearchButton searchButton;

  public CbsearchButler(SessionData sessionData) {
    super(sessionData);
    markupables = new GroupOfMarkupables(sessionData);
    rezeptBez = markupables.createTextField(40);
    zutaten = markupables.createTextField(40);
    typ = markupables.createComboBox(sessionData, new DoType(sessionData), "TypBez", "TypBez", getAnySymbol());
    searchButton = markupables.createSearchButton(sessionData);
  }

  /**
   * Returns the symbol for "any".
   * @return the symbol for "any"
   */
  private String getAnySymbol() {
    return "< " + sessionData.getFrameworkResourceString("TEXT_ANY") + " >";
  }

  public void init() {
    super.init();
    markupables.init();
  }

  protected void handle(GeneralizedRequest request) {
    markupables.fetchValuesFromRequest(request);
    if (searchButton.wasPressed()) {
      CblistButler listButler = (CblistButler)sessionData.jspSession.getButler(CblistButler.class);
      listButler.setWhereCondition(getWhereCondition());
      setUriToGo("cblist.jsp"); return;
    }
  }

  private String getWhereCondition() {
    String whereCondition = "";
    if (typ.isSpecialChoice()) {
      if (!whereCondition.equals("")) whereCondition += " and ";
      whereCondition += " Typ = " + typ.getSelectedIdentifier();
    }
    if (!rezeptBez.getText().equals("")) {
      if (!whereCondition.equals("")) whereCondition += " and ";
      whereCondition += "RezeptBez like '%" + rezeptBez.getText() + "%'";
    }
    if (!zutaten.getText().equals("")) {
      if (!whereCondition.equals("")) whereCondition += " and ";
      whereCondition += "Zutaten like '%" + zutaten.getText() + "%'";
    }
    return whereCondition;
  }

}
