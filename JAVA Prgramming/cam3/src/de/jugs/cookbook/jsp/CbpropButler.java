/*
 * Public Domain Sample Code
 */
package de.jugs.cookbook.jsp;

import de.jugs.cookbook.DoCookbook;
import de.jugs.cookbook.DoType;
import de.must.markup.*;

/**
 * Devoted butler of the cookbook property administration JSP.
 * See super class JspButler for documentation.
 * @author Christoph Mueller
 */
public class CbpropButler extends JspButler {

  private DoCookbook doCookbook;
  private GroupOfStorables storables;

  public DataTextField rezeptBez;
  public DataComboBox typ;
  public DataCheckBox diabetiker;
  public DataTextArea zutaten;
  public DataTextArea zubereit;
  public DataTextField quelle;
  public DataDateField vom;
  public DataFileUploader imageFile;
  public OkButton okButton;
  public CancelButton cancelButton;

  private int counter;

  public CbpropButler(SessionData sessionData) {
    super(sessionData);
    doCookbook = new DoCookbook(sessionData);
    storables = new GroupOfStorables(doCookbook, sessionData);
    rezeptBez = storables.createTextField("RezeptBez");
    typ = storables.createComboBox(sessionData, "Typ", new DoType(sessionData), "TypBez");
    diabetiker = storables.createCheckBox("Diabetiker-Empfehlung", "Diabetiker");
    zutaten = storables.createTextArea("Zutaten");
    zubereit = storables.createTextArea("Zubereit");
    quelle = storables.createTextField("Quelle");
    vom = storables.createDateField("Vom");
    if (isMultipartAvailable()) imageFile = storables.createDataFileUploader(de.jugs.cookbook.Constants.SAMPLE_IMAGE_DIRECTORY);
    okButton = storables.createOkButton(sessionData);
    cancelButton = storables.createCancelButton(sessionData);
  }

  protected void handle(GeneralizedRequest request) {
    storables.fetchValuesFromRequest(request);
    if (okButton.wasPressed()) {
      if (storables.inputCheckOk() && isInputAccepted()) {
        storables.save();
        goBack(); return;
      }
    } else if (cancelButton.wasPressed()) {
      goBack(); return;
    } else {
      String idString = request.getParameter("ID");
      if (idString != null) {
        storables.loadValues(Integer.parseInt(idString));
      } else {
        storables.newInput();
      }
    }
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

  private boolean isInputAccepted() {
    if (rezeptBez.getText().length() == 0) {
      setMessageToKeep("Rezeptbezeichnung muss gef�llt sein.");
      return false;
    }
    return true;
  }

}