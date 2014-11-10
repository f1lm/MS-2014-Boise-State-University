/*
 * Public Domain Sample Code
 */
package mkt;

import de.must.wuic.*;

/**
 * @author Christoph Mueller
 */
public class FrAddrBufferPr extends DataPropertyAdministration {

  private DataTextField dtfFirma;
  private DataTextField dtfPEJUKB;
  private DataTextField dtfADRZS1;
  private DataTextField dtfADRZS2;
  private DataTextField dtfNAMNAC;
  private DataTextField dtfNAMVOR;
  private DataTextField dtfAKGRID;
  private DataTextField dtfemail;
  private DataTextField dtfLANDID;
  private DataTextField dtfPLZ;
  private DataTextField dtfPLZPFC;
  private DataTextField dtfORTSBZ;
  private DataTextField dtfPSTFCH;
  private DataTextField dtfSTRASS;
  private DataTextField dtfBMRKNG;
  private DataComboBox kontaktart;
  private DataDateField erfassDat;
  private DataTextField erfassAnw;

  public static FrAddrBufferPr getOrCreateMainInstance() {
    return (FrAddrBufferPr)getOrCreateMainInstance(FrAddrBufferPr.class);
  }

  public FrAddrBufferPr() {
    setTitle("Kontakt");
    setMainDataObject(new DoAddressBuffer());

    newPanel("Postadresse");
    dtfFirma = createTextField("Firma", "Firma", 40);
    dtfADRZS1 = createTextField("Zusatzzeile 1", "ADRZS1");
    dtfADRZS2 = createTextField("Zusatzzeile 2", "ADRZS2");
    dtfNAMNAC = createTextField("Name, Vorname", "NAMNAC",  25);
    dtfNAMVOR = createTextField("NAMVOR", 20);
    createTextCheck("Geschlecht / Grad", "GESCID", new String[] {" ", "M", "W"}, new String[] {"?", "männlich", "weiblich"});
    dtfAKGRID = createTextField("AKGRID"); setToolTipText("z. B. Dr. oder Prof.");
    dtfSTRASS = createTextField("Strasse", "STRASS", 50);
    dtfLANDID = createTextField("Land/PLZ/Ort", "LANDID");
    dtfPLZ = createTextField("PLZ");
    dtfORTSBZ = createTextField("ORTSBZ");
    dtfPLZPFC = createTextField("PLZ/Postfach", "PLZPFC");
    dtfPSTFCH = createTextField("PSTFCH");

    newPanel("e-mail / Fax");
    createTextField("e-mail", "email");
    createTextField("Fax", "FAXRNR");
    createTextField("Fax privat", "FAXPRV");
    createTextField("Bemerkung", "BMRKNG");
    createDateField("Letztes Update", "UpdateDat");

    newPanel("Sonstiges");
    dtfBMRKNG = createTextField("Bemerkung", "BMRKNG");
//    createTextCheck("ABC-Kategorie", "ABCKID", new String[] {" ", "A", "B", "C"}, new String[] {"?", "A", "B", "C"});
    kontaktart = createComboBox("Kontaktart", "KontartNI", new DoKontaktart(), "KontartBZ");
    appendKeyButton(FrKontaktart.class, Entitlement.TERRITORY_ORGANIZATION);
    createDateField("Letztes Update", "UpdateDat");
    erfassDat = createDateField("Erfassung", "ErfassDat");
    erfassDat.setEditable(false);
//    erfassAnw = createTextField("Erf.-Anwender", "ErfassAnw");
//    erfassAnw.setEditable(false);

    newPanel("Notizen", new DataTextArea(dataObjects[0], "NOTIZ"));

    setFrameUpdateTitleField(new DataTextField[] {dtfAKGRID, dtfNAMVOR, dtfNAMNAC});

    creationEnding();
  }

}
