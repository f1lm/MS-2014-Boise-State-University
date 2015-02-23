/*
 * Public Domain Sample Code
 */
package de.jugs.cookbook.jsp;

import de.jugs.cookbook.Constants;
import de.jugs.cookbook.DoCookbook;
import de.must.markup.*;

/**
 * Devoted butler of the cookbook list JSP.
 * See super class JspButler for documentation.
 * @author Christoph Mueller
 */
public class CblistButler extends JspButler {

  private DoCookbook doCookbook;
  private String whereCondition;
  private int rowCounter;

  public CblistButler(SessionData sessionData) {
    super(sessionData);
    doCookbook = new DoCookbook(sessionData);
  }

  public void setWhereCondition(String whereCondition) {
    this.whereCondition = whereCondition;
  }

  protected void handle(GeneralizedRequest request) {
    rowCounter = 0;
    String paramWhere = request.getParameter("where");
    if (paramWhere != null) {
      whereCondition = paramWhere;
    }
    if (whereCondition == null) {
      setUriToGo(Constants.START_JSP_NAME); return;
    }
    doCookbook.select("*", whereCondition, "RezeptBez" /*, 100 */);
  }

  public boolean isFurtherRowToAppend() {
    return (isToRun() && /* (++rowCounter <= 20) && */ doCookbook.nextRow());
  }

  public String getRezeptBez() {
    return (doCookbook.getText("RezeptBez"));
  }

  public String getRezeptBezWithLink() {
    return "<a href=\"" + encodeRedirectURL("cbpres.jsp") + "?ID=" + doCookbook.getIdentifyValueInt() + "\">" + getRezeptBez() + "</a>";
  }

}
