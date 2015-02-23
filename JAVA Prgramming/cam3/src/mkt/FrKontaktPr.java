//elementary!

/*
 * Public Domain Sample Code
 */
package mkt;

import de.must.dataobj.Identifier;
import de.must.util.Callback;
import de.must.wuic.*;

import java.awt.event.*;

/**
 * @author Christoph Mueller
 */
public class FrKontaktPr extends DataPropertyAdministration {
  
  private DoKontakt doKontaktForChoiceManager = new DoKontakt();

  private DataTextField dtfFirma;
  private DataTextField dtfPEJUKB;
  private DataTextField dtfADRZS1;
  private DataTextField dtfADRZS2;
  private DataTextField dtfNAMNAC;
  private DataTextField dtfNAMVOR;
  private DataTextField dtfAKGRID;
  private DataTextField dtfMOBINR;
  private DataTextField dtfBMRKNG;
  private DataTextField dtfABCKID;
  private DataTextField dtfTELENR;
  private DataTextField dtfFAXRNR;
  private DataTextField dtfFONPRV;
  private DataTextField dtfFAXPRV;
  private DataTextField dtfURL;
  private DataTextField dtfemail;
  private DataTextField dtfLANDID;
  private DataTextField dtfPLZ;
  private DataTextField dtfPLZPFC;
  private DataTextField dtfORTSBZ;
  private DataTextField dtfPSTFCH;
  private DataTextField dtfSTRASS;
  private DataTextArea notiz;
  private DataComboBox kontaktart;
  private DataDateField erfassDat;
  private DataTextField erfassAnw;

  public static FrKontaktPr getOrCreateMainInstance() {
    return (FrKontaktPr)getOrCreateMainInstance(FrKontaktPr.class);
  }

  public FrKontaktPr() {
    setTitle("Kontakt");
    setPreferredFocusField(dtfFirma);
    setMainDataObject(new DoKontakt());

    newPanel("Postadresse");
    dtfFirma = createTextField("Firma", "Firma", 40, doKontaktForChoiceManager);
    dtfPEJUKB = createTextField("PEJUKB"); setToolTipText("maßgeblich für die Sortierung der Ablage!");
    dtfADRZS1 = createTextField("Zusatzzeile 1", "ADRZS1", doKontaktForChoiceManager);
    dtfADRZS2 = createTextField("Zusatzzeile 2", "ADRZS2", doKontaktForChoiceManager);
    createTextField("Referenzdarstellung", "RefDarst");
    dtfNAMNAC = createTextField("Name, Vorname", "NAMNAC",  25, doKontaktForChoiceManager);
    dtfNAMVOR = createTextField("NAMVOR", 20, doKontaktForChoiceManager);
    createTextCheck("Geschlecht / Grad", "GESCID", new String[] {" ", "M", "W"}, new String[] {"?", "männlich", "weiblich"});
    dtfAKGRID = createTextField("AKGRID", doKontaktForChoiceManager); setToolTipText("z. B. Dr. oder Prof.");
    lastChoiceManager.setMinLengthForSearch(1);
    dtfSTRASS = createTextField("Strasse", "STRASS", 50);
    dtfLANDID = createTextField("Land/PLZ/Ort", "LANDID");
    dtfLANDID.setCapitalization(true);
    dtfPLZ = createTextField("PLZ");
    new ChoiceManagerByDataObject(dtfPLZ, doKontaktForChoiceManager, "PLZ", new Callback() {
      public void callback() {
        if (dtfORTSBZ.getText().length() == 0) {
          doKontaktForChoiceManager.select("ORTSBZ", "PLZ = '" + dtfPLZ.getText() +  "' and LANDID = '" + dtfLANDID.getText() +  "'");
          if (doKontaktForChoiceManager.nextRow()) {
            dtfORTSBZ.setText(doKontaktForChoiceManager.getText("ORTSBZ"));
          }
          doKontaktForChoiceManager.closeQuery();
        }
      }
    });
    dtfORTSBZ = createTextField("ORTSBZ", doKontaktForChoiceManager);
    dtfPLZPFC = createTextField("PLZ/Postfach", "PLZPFC");
    dtfPSTFCH = createTextField("PSTFCH");

    newPanel("URL / e-mail / Fon / Fax");
    dtfURL = createTextField("URL", "URL");
    dtfemail = createTextField("e-mail", "email");
    dtfTELENR = createTextField("Telefon", "TELENR");
    dtfFAXRNR = createTextField("Fax", "FAXRNR");
    dtfMOBINR = createTextField("Mobiltelefon", "MOBINR");
    dtfFONPRV = createTextField("Fon privat", "FONPRV");
    dtfFAXPRV = createTextField("Fax privat", "FAXPRV");

    newPanel("Sonstiges");
    dtfBMRKNG = createTextField("Bemerkung", "BMRKNG", doKontaktForChoiceManager);
    createTextCheck("ABC-Kategorie", "ABCKID", new String[] {" ", "A", "B", "C"}, new String[] {"?", "A", "B", "C"});
    kontaktart = createComboBox("Kontaktart", "KontartNI", new DoKontaktart(), "KontartBZ");
    appendKeyButton(FrKontaktart.class, Entitlement.TERRITORY_ORGANIZATION);
    createDateField("Letztes Update", "UpdateDat");
    erfassDat = createDateField("Erfassung", "ErfassDat");
    erfassDat.setEditable(false);
    erfassAnw = createTextField("Erf.-Anwender", "ErfassAnw");
    erfassAnw.setEditable(false);

    newPanel("Gruppen");
    createMultChoice("Firmengruppe",
      new DoGrPj(),
      new DoGzPj(),
      new String[] {"GRPJBZ"},
      new String[] {"Bezeichnung"}
    ).setPreferedColumnSize(new int[] {20,500});

    notiz = new DataTextArea(dataObjects[0], "NOTIZ");
    newPanel("Notizen", notiz);

    setFrameTitleNew("Neuer Kontakt");
    setFrameUpdateTitleField(new DataTextField[] {dtfAKGRID, dtfNAMVOR, dtfNAMNAC});

    dtfFirma.addFocusListener(new FocusListener() {
      public void focusGained(FocusEvent e) {}
      public void focusLost(FocusEvent e) {
        if (dtfPEJUKB.getText().trim().equals("") & !dtfFirma.getText().equals("")) dtfPEJUKB.setText(dtfFirma.getText());
      }
    });

    creationEnding();
  }

  public void copy(Identifier identifier) {
    super.copy(identifier);
    erfassDat.setDate(null); // to cause update by DataObject
    erfassAnw.setText(""); // to cause update by DataObject
  }

}

