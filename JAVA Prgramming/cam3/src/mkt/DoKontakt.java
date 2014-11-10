//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

import de.must.dataobj.*;

/**
 * @author Christoph Mueller
 */
public class DoKontakt extends DataObject {

  public static final String tableName = "Kontakt";

  public static final AbstractAttribute[] attributes = {
    new NumericAttribute("Kontakt, int. Nr.", "KontaktNi"),
    new CharAttribute("Jur. Person, Kurzbezeichnung", "PEJUKB", 10),
    new VarcharAttribute("Firma", "Firma", 60),
    new VarcharAttribute("Adre�zusatz 1", "ADRZS1", 40),
    new VarcharAttribute("Adre�zusatz 2.", "ADRZS2", 40),
    new VarcharAttribute("Referenzdarstellung", "RefDarst", 254),
    new VarcharAttribute("Nachname", "NAMNAC", 30),
    new VarcharAttribute("Vorname", "NAMVOR", 30),
    new VarcharAttribute("Akademischer Grad", "AKGRID", 20),
    new CharAttribute("Geschlecht, ID", "GESCID", 1),
    new VarcharAttribute("Nr. Mobiltelefon", "MOBINR", 25),
    new VarcharAttribute("Bemerkung", "BMRKNG", 220),
    new CharAttribute("ABC-Kategorie", "ABCKID", 1),
    new VarcharAttribute("Telefonnummer", "TELENR", 25),
    new VarcharAttribute("Fax-Rufnummer", "FAXRNR", 25),
    new VarcharAttribute("Telefonnummer privat", "FONPRV", 25),
    new VarcharAttribute("Fax-Rufnummer privat", "FAXPRV", 25),
    new VarcharAttribute("URL", "URL", 120),
    new VarcharAttribute("e-mail-Adresse", "email", 120),
    new CharAttribute("Land-ID", "LANDID", 3),
    new VarcharAttribute("Postleitzahl", "PLZ", 5),
    new VarcharAttribute("PLZ bei Postfach", "PLZPFC", 5),
    new VarcharAttribute("Ortsbezeichnung", "ORTSBZ", 45),
    new VarcharAttribute("Postfach", "PSTFCH", 10),
    new VarcharAttribute("Stra�e", "STRASS", 60),
    new MemoAttribute("Notizen", "NOTIZ"),
    new NumericAttribute("Kontaktart", "KontartNI"),
    new DateAttribute("Datum letztes Update", "UpdateDat"),
    new DateAttribute("Erfassungsdatum", "ErfassDat"),
    new VarcharAttribute("Erfassungsanwender", "ErfassAnw", 20),
  };

  public static final Index[] indices = {
    new Index (
      new IndexItem[] {
        new IndexItem("KontaktNi", IndexItem.ASCENDING),
      },
      Index.UNIQUE
    ),
  };

  private String defaultCountryCode = null;
  // private String defaultCountryCode = "D";
  private DoGzPj doGzPj;

  public DoKontakt() {
    super(Global.getInstance());
  }

  public DoKontakt(java.sql.Connection connection) {
    super(connection);
  }

  public String getTableName() {
    return tableName;
  }

  public AbstractAttribute[] getAttributes() {
    return attributes;
  }

  public Index[] getIndices() {
    return indices;
  }

  public String getemail(int identifier) {
    setIdentityValue(identifier);
    load();
    return getemail();
  }

  public String getemail() {
    String temp;
    if ((temp = getText("email")).equals("")) return "";
    return getText("NAMVOR") + " " + getText("NAMNAC") + " <" + temp + ">";
  }

  public String[] getAdresslines(int identifier) {
    setIdentityValue(identifier);
    load();
    return getAdresslines();
  }

  public String[] getAdresslines() {
    boolean isPostbox = false;
    boolean sexUnKnown = false;
    String[] lines;
    String[] tempLines = new String[8];
    int countLines = -1;
    int i;
    String Firma, temp, temp2, temp3;

    if (!(Firma = getText("Firma")).equals("")) {
      tempLines[++countLines] = Firma;
    }
    if (!(temp = getText("ADRZS1")).equals("")) {
      tempLines[++countLines] = temp;
    }
    if (!(temp = getText("ADRZS2")).equals("")) {
      tempLines[++countLines] = temp;
    }
    if (!(temp = getText("NAMNAC")).equals("")) {
      if (getText("GESCID").equals("W")) {
        tempLines[++countLines] = "Frau ";
      } else if (getText("GESCID").equals("M")) {
        tempLines[++countLines] = "Herrn ";
      } else {
        sexUnKnown = true;
        if ((temp3 = getText("NAMVOR")).equals("")) {
          tempLines[++countLines] = "Herrn oder Frau ";
        } else {
          tempLines[++countLines] = "";
        }
      }
      if (!(temp2 = getText("AKGRID")).equals("")) {
        tempLines[countLines] += temp2.trim() + " ";
      }
      if ((sexUnKnown || Firma.equals("")) && !(temp3 = getText("NAMVOR")).equals("")) {
        tempLines[countLines] += temp3.trim() + " ";
      }
      tempLines[countLines] += temp;
    }
    if (!(temp = getText("PSTFCH")).equals("")) {
      isPostbox = true;
      tempLines[++countLines] = "Postfach";
      if (!temp.equals("!")) tempLines[countLines] += " " + temp;
    } else {
      tempLines[++countLines] = getText("STRASS");
    }
    if (countLines < 4) tempLines[++countLines] = ""; // empty line if enough space
    tempLines[++countLines] = "";
    if (!(temp = getText("LANDID").trim()).equals("")) {
      tempLines[countLines] += temp + "-";
    } else if (defaultCountryCode != null) {
      tempLines[countLines] += defaultCountryCode + "-"; 
    }
    if (isPostbox || getText("PLZ").trim().equals("")) { // letzteres = "Gro�kunden"
      tempLines[countLines] += getText("PLZPFC").trim() + " " + getText("ORTSBZ");
    } else {
      tempLines[countLines] += getText("PLZ").trim() + " " + getText("ORTSBZ");
    }
    lines = new String[countLines + 1];
    for (i = 0; i <= countLines; i++) {
      lines[i] = tempLines[i];
    }
    return lines;
  }

  public String getSalutation(int identifier) {
    setIdentityValue(identifier);
    load();
    return getSalutation();
  }

  public String getSalutation() {
    String result;
    String NAMNAC = getText("NAMNAC");
    String GESCID = getText("GESCID");
    if (NAMNAC.equals("")) return "Sehr geehrte Damen und Herren,";
    if (GESCID.equals("W")) {
      result = "Sehr geehrte Frau ";
    } else if (GESCID.equals("M")) {
      result = "Sehr geehrter Herr ";
    } else {
      return "Sehr geehrte Damen und Herren,";
    }
    String temp2;
    if (!(temp2 = getText("AKGRID").trim()).equals("")) {
      result += temp2 + " ";
    }
    result += NAMNAC + ",";
    return result;
  }

  public String getTitledFullName() {
    String resultString = "";
    String GESCID = getText("GESCID");
    if (GESCID.equals("W")) {
      resultString += "Frau ";
    } else if (GESCID.equals("M")) {
      resultString += "Herr ";
    }
    String title = getText("AKGRID").trim();
    if (!title.equals("")) resultString += title + " ";
    String firstName = getText("NAMVOR");
    if (!firstName.equals("")) resultString += firstName + " ";
    String lastName = getText("NAMNAC");
    if (!lastName.equals("")) resultString += lastName + " ";
    return resultString.trim();
  }

  @Override
  public boolean save() {
    if (getWorkedOnText("RefDarst").length() == 0) {
      String refDarst = getWorkedOnText("Firma");
      String ort = getWorkedOnText("ORTSBZ");
      if (refDarst.indexOf(ort) == -1) {
        if (refDarst.length() > 0) {
          refDarst += " - ";
          refDarst += ort;
        }
      }
      setText("RefDarst", refDarst);
    }
    return super.save();
  }

  @Override
  public boolean delete() {
    boolean result = super.delete();
    if (result) {
      if (doGzPj == null) doGzPj = new DoGzPj();
      doGzPj.unlinkAll(getIdentifier());
    }
    return result;
  }


}
