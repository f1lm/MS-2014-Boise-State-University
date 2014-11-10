//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

import de.must.wuic.*;
import java.awt.*;

/**
 * @author Christoph Mueller
 */
public class FrUserPr extends DataPropertyAdministration {

  private DoUser doUser2;
  private DataIntField difuserni;
  private DataTextField dtfuserid;
  private DataTextField dtfuserbz;
  private DataComboBox dcbdtagrp;

  public static FrUserPr getOrCreateMainInstance() {
    return (FrUserPr)getOrCreateMainInstance(FrUserPr.class);
  }

  public FrUserPr() {
    setTitle("Benutzer");
    setPreferredFocusField(dtfuserbz);
    setDefaultSize(new Dimension(400, 300));
    setDefaultLocation(200, 100);

    setMainDataObject(new DoUser());
    doUser2 = new DoUser();

    newPanel();
    difuserni = createIntField("Interne ID", "userni");
    dtfuserid = createTextField("Identifikation", "userid"); setToolTipText("Benutzername für die Anmeldung an Windows"); setRequired(true);
    dtfuserbz = createTextField("Bezeichnung", "userbz"); setRequired(true);

    setFrameTitleNew("Neuer Benutzer");
    setFrameUpdateTitleField(dtfuserbz);
    difuserni.setEditable(false);
    creationEnding();
  }

  public boolean isInputAccepted() {
    doUser2.select("userni, userid", "userid = \'" + dtfuserid.getText() + "\'");
    if (doUser2.nextRow()) if (doUser2.getIdentifyValueInt() != Integer.valueOf(difuserni.getText()).intValue()) {
      setMessageToKeep("Benutzer bereits vorhanden");
      dtfuserid.requestFocus();
      // Global.getInstance().mainLogger.info(getClass(), doUser2.getIdentifyValueInt());
      // Global.getInstance().mainLogger.info(getClass(), Integer.valueOf(difuserni.getText()).intValue());
      doUser2.closeQuery();
      return false;
    }
    doUser2.closeQuery();
    return true;
  }

}



