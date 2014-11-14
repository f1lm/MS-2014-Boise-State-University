/*
 * Public Domain Sample Code 
 */
package mkt;

import de.must.dataobj.*;

/**
 * @author Christoph Mueller
 */
public class DoAddressBuffer extends DataObject {

  public static final String tableName = "AdrPuffer";

  public static final AbstractAttribute[] attributes = {
    new NumericAttribute("Kontakt, int. Nr.", "KontaktNi"),
    new VarcharAttribute("Firma", "Firma", 60),
    new VarcharAttribute("Adre�zusatz 1", "ADRZS1", 40),
    new VarcharAttribute("Adre�zusatz 2.", "ADRZS2", 40),
    new VarcharAttribute("Referenzdarstellung", "RefDarst", 254),
    new VarcharAttribute("Nachname", "NAMNAC", 30),
    new VarcharAttribute("Vorname", "NAMVOR", 30),
    new VarcharAttribute("Akademischer Grad", "AKGRID", 20),
    new CharAttribute("Geschlecht, ID", "GESCID", 1),
    new CharAttribute("Land-ID", "LANDID", 3),
    new VarcharAttribute("Postleitzahl", "PLZ", 5),
    new VarcharAttribute("PLZ bei Postfach", "PLZPFC", 5),
    new VarcharAttribute("Ortsbezeichnung", "ORTSBZ", 45),
    new VarcharAttribute("Postfach", "PSTFCH", 10),
    new VarcharAttribute("Stra�e", "STRASS", 60),
    new VarcharAttribute("e-mail-Adresse", "email", 120),
    new VarcharAttribute("Fax-Rufnummer", "FAXRNR", 25),
    new VarcharAttribute("Fax-Rufnummer privat", "FAXPRV", 25),
    new VarcharAttribute("URL", "URL", 120),
    new VarcharAttribute("Bemerkung", "BMRKNG", 220),
    new MemoAttribute("Notizen", "NOTIZ"),
    new NumericAttribute("Kontaktart", "KontartNI"),
    new DateAttribute("Datum letztes Update", "UpdateDat"),
  };

  public static final Index[] indices = {
    new Index (
      new IndexItem[] {
        new IndexItem("KontaktNi", IndexItem.ASCENDING),
      },
      Index.UNIQUE
    ),
  };

  public DoAddressBuffer() {
    super(Global.getInstance());
  }

  public DoAddressBuffer(java.sql.Connection connection) {
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

  public void clear() {
    super.deleteFreeConditioned("ALL");
  }

  public String getemail(int identifier) {
    this.setIdentityValue(identifier);
    this.load();
    return this.getemail();
  }

  public String getemail() {
    String temp;
    if ((temp = this.getText("email")).equals("")) return "";
    return this.getText("NAMVOR") + " " + this.getText("NAMNAC") + " <" + temp + ">";
  }

  public String[] getAdresslines(int identifier) {
    this.setIdentityValue(identifier);
    this.load();
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

    if (!(Firma = this.getText("Firma")).equals("")) {
      tempLines[++countLines] = Firma;
    }
    if (!(temp = this.getText("ADRZS1")).equals("")) {
      tempLines[++countLines] = temp;
    }
    if (!(temp = this.getText("ADRZS2")).equals("")) {
      tempLines[++countLines] = temp;
    }
    if (!(temp = this.getText("NAMNAC")).equals("")) {
      if (this.getText("GESCID").equals("W")) {
        tempLines[++countLines] = "Frau ";
      } else if (this.getText("GESCID").equals("M")) {
        tempLines[++countLines] = "Herrn ";
      } else {
        sexUnKnown = true;
        if ((temp3 = this.getText("NAMVOR")).equals("")) {
          tempLines[++countLines] = "Herrn oder Frau ";
        } else {
          tempLines[++countLines] = "";
        }
      }
      if (!(temp2 = this.getText("AKGRID")).equals("")) {
        tempLines[countLines] += temp2.trim() + " ";
      }
      if ((sexUnKnown || Firma.equals("")) && !(temp3 = this.getText("NAMVOR")).equals("")) {
        tempLines[countLines] += temp3.trim() + " ";
      }
      tempLines[countLines] += temp;
    }
    if (!(temp = this.getText("PSTFCH")).equals("")) {
      isPostbox = true;
      tempLines[++countLines] = "Postfach";
      if (!temp.equals("!")) tempLines[countLines] += " " + temp;
    } else {
      tempLines[++countLines] = this.getText("STRASS");
    }
    tempLines[++countLines] = ""; // empty line
    tempLines[++countLines] = "";
    if (!(temp = this.getText("LANDID").trim()).equals("")) {
      tempLines[countLines] += temp + "-";
    }
    if (isPostbox || this.getText("PLZ").trim().equals("")) { // letzteres = "Gro�kunden"
      tempLines[countLines] += this.getText("PLZPFC") + " " + this.getText("ORTSBZ");
    } else {
      tempLines[countLines] += this.getText("PLZ") + " " + this.getText("ORTSBZ");
    }
    lines = new String[countLines + 1];
    for (i = 0; i <= countLines; i++) {
      lines[i] = tempLines[i];
    }
    return lines;
  }

  public String getSalutation(int identifier) {
    this.setIdentityValue(identifier);
    this.load();
    return getSalutation();
  }

  public String getSalutation() {
    String result;
    String NAMNAC = this.getText("NAMNAC");
    String GESCID = this.getText("GESCID");
    if (NAMNAC.equals("")) return "Sehr geehrte Damen und Herren,";
    if (GESCID.equals("W")) {
      result = "Sehr geehrte Frau ";
    } else if (GESCID.equals("M")) {
      result = "Sehr geehrter Herr ";
    } else {
      return "Sehr geehrte Damen und Herren,";
    }
    String temp2;
    if (!(temp2 = this.getText("AKGRID").trim()).equals("")) {
      result += temp2 + " ";
    }
    result += NAMNAC + ",";
    return result;
  }

  public String getTitledFullName() {
    String resultString = "";
    String title = this.getText("AKGRID").trim();
    if (!title.equals("")) resultString += title;
    String firstName = this.getText("NAMVOR");
    if (!resultString.equals("")) resultString += " ";
    if (!firstName.equals("")) resultString += firstName;
    String lastName = this.getText("NAMNAC");
    if (!resultString.equals("")) resultString += " ";
    if (!lastName.equals("")) resultString += lastName;
    return resultString;
  }

}