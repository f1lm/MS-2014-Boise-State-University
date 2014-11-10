/*
 * Public Domain Sample Code
 */
package de.jugs.cookbook.jsp;

import de.jugs.cookbook.Constants;
import de.jugs.cookbook.DoCookbook;
import de.jugs.cookbook.DoType;
import de.must.markup.*;

/**
 * Devoted butler of the cookbook detail presentation JSP.
 * See super class JspButler for documentation.
 * @author Christoph Mueller
 */
public class CbpresButler extends JspButler {

  private DoCookbook doCookbook;
  private DoType doType;
  private DataImageViewer sampleViewer;

  public CbpresButler(SessionData sessionData) {
    super(sessionData);
    doCookbook = new DoCookbook(sessionData);
    doType = new DoType(sessionData);
    sampleViewer = new DataImageViewer(sessionData, de.jugs.cookbook.Constants.SAMPLE_IMAGE_DIRECTORY, doCookbook);
  }

  protected void handle(GeneralizedRequest request) {
    try {
      doCookbook.load(Integer.parseInt(request.getParameter("ID")));
      sampleViewer.loadValue();
    }
    catch(Exception e) {
      setUriToGo(Constants.START_JSP_NAME); return;
    }
  }

  public String getRezeptBez() {
    return doCookbook.getText("RezeptBez");
  }

  public String getDiabetiker() {
    if (doCookbook.getBoolean("Diabetiker")) return " / " + sessionData.getResourceString("TEXT_DIABETIC_RECOMMENDATION");
    else return "";
  }

  public String getTyp() {
   if (doType.load(doCookbook.getInt("Typ"))) {
     return doType.getText("TypBez");
   } else {
     return "";
   }
  }

  public String getZutaten() {
    return doCookbook.getText("Zutaten");
  }

  public String getZubereit() {
    return doCookbook.getText("Zubereit");
  }

  public String getQuelle() {
    return doCookbook.getText("Quelle");
  }

  public String getVom() {
    java.sql.Date date = doCookbook.getDate("Vom");
    if (date == null) return "";
    return getEditableDateString(date);
  }

  public String getSampleImage() {
    return sampleViewer.getCreationTag();
  }

  private String getEditableDateString(java.sql.Date date) {
    de.must.util.DateString ds = new de.must.util.DateString(sessionData.locale, date);
    return ds.getEditableDateString();
  }

}
