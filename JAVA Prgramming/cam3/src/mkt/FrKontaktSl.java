package mkt;

import de.must.middle.InterruptibleBatchThread;
import de.must.print.PageDrawerPrinting;
import de.must.util.InteractiveWordProcessing;
import de.must.util.SearchItem;
import de.must.wuic.*;
import de.must.dataobj.*;

import java.awt.*;
import java.awt.event.*;
import java.io.IOException;

/**
 * @author Christoph Mueller
 */
public class FrKontaktSl extends SimpleDataListFrame {
  private DoKontaktJoined doKontaktForList = new DoKontaktJoined();
  private DoKontakt doKontaktForActions = new DoKontakt(); // no duplicate identifier
  private DoKontakt doKontaktForChoice = new DoKontakt();
  private MustTextField tfFirma;
  private MustTextField tfNachname;
  private MustTextField ort;
  private MustTextField plz;
  private MustMultChoice groupChoice;
  private HalfDataComboBox kontaktart;
  private static final int LIST_BY_COMPANY = 0;
  private static final int LIST_BY_LAST_NAME = 1;
  private int listMode = LIST_BY_COMPANY;

  public static void openMainInstance() {
    getOrCreateMainInstance().open();
  }
  
  public static FrKontaktSl getOrCreateMainInstance() {
    return (FrKontaktSl)getOrCreateMainInstance(FrKontaktSl.class);
  }

  public FrKontaktSl() {
    this(null);
  }

  public FrKontaktSl(Frame ownerFrame) {
    super(ownerFrame);
    setTitle("Kontaktauswahl");
    setAutoInitialListFill(false);

    MustButton initButton = new MustButton("Grundst."); initButton.setToolTipText("Löscht die Auswahlangaben");
    panelSelectButtons.add(initButton);
    initButton.addActionListener(new ActionListener() {
      public void actionPerformed(java.awt.event.ActionEvent e) {
        generalActionBeginnung();
        reset();
      }
    });

    newPanel("Namen");
    tfFirma = createTextField("Firma", 20, doKontaktForChoice, "Firma");
    tfNachname = createTextField("Nachname", 20, doKontaktForChoice, "NAMNAC");
    ort = createTextField("Ort", 20, doKontaktForChoice, "ORTSBZ");
    plz = createTextField("PLZ", 5, doKontaktForChoice, "PLZ");
    createTextFieldForGlobalSearch("Global", 30, true);

    groupChoice = new MustMultChoice(new DoGrPj(), new String[] {"GRPJBZ"}, new String[] {"Bezeichnung"});
    newPanel("Gruppen", groupChoice, new Dimension (200, 80));
    groupChoice.setPreferedColumnSize(new int[] {30, 300});

    newPanel("Kontaktart");
    kontaktart = createComboBox("Kontaktart", new DoKontaktart(), "KontartBZ");

    newDynamicSearchPanel("Dynamische Recherche", 4, new SearchItem[] {
      new SearchItem("Jur. Person, Kurzbezeichnung", "PEJUKB"),
      new SearchItem("Firma", "Firma"),
      new SearchItem("Adreßzusatz 1", "ADRZS1"),
      new SearchItem("Adreßzusatz 2.", "ADRZS2"),
      new SearchItem("Referenzdarstellung", "RefDarst"),
      new SearchItem("Nachname", "NAMNAC"),
      new SearchItem("Vorname", "NAMVOR"),
      new SearchItem("Akademischer Grad", "AKGRID"),
      new SearchItem("Geschlecht, ID", "GESCID"),
      new SearchItem("Nr. Mobiltelefon", "MOBINR"),
      new SearchItem("Bemerkung", "BMRKNG"),
      new SearchItem("ABC-Kategorie", "ABCKID"),
      new SearchItem("Telefonnummer", "TELENR"),
      new SearchItem("Fax-Rufnummer", "FAXRNR"),
      new SearchItem("Telefonnummer privat", "FONPRV"),
      new SearchItem("Fax-Rufnummer privat", "FAXPRV"),
      new SearchItem("URL", "URL"),
      new SearchItem("e-mail-Adresse", "email"),
      new SearchItem("Land-ID", "LANDID"),
      new SearchItem("Postleitzahl", "PLZ"),
      new SearchItem("PLZ bei Postfach", "PLZPFC"),
      new SearchItem("Ortsbezeichnung", "ORTSBZ"),
      new SearchItem("Postfach", "PSTFCH"),
      new SearchItem("Straße", "STRASS"),
      new SearchItem("Notizen", "NOTIZ"),
      // new SearchItem("Kontaktart", "KontartNI"),
      new SearchItem("Datum letztes Update", "UpdateDat", SearchElement.TYPE_DATE),
      new SearchItem("Erfassungsdatum", "ErfassDat", SearchElement.TYPE_DATE),
      new SearchItem("Erfassungsanwender", "ErfassAnw"),
    });

    newPanelWithExpertSearchTextArea("Expertenrecherche");
    if (!isLaidOut()) this.setSize((int)this.getSize().getWidth(), 500);

    setAssociatedPropertyAdministration(FrKontaktPr.class);
    setListDataObject(doKontaktForList);

    MustButton expButton = new MustButton("Exp"); expButton.setToolTipText("Export in Textdatei");
    panelSelectButtons.add(expButton);
    expButton.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(java.awt.event.ActionEvent e) {
        ExportFile thread = new ExportFile();
        BatchThreadControllerFrame controller = new BatchThreadControllerFrame();
        controller.setTitle("Erzeuge Datei");
        thread.setThreadController(controller);
        thread.start();
      }
    });

    MustButton BufferButton = new MustButton("Puffer"); BufferButton.setToolTipText("Puffern für Serienbrief etc.");
    panelSelectButtons.add(BufferButton);
    BufferButton.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(java.awt.event.ActionEvent e) {
        Buffering buffering = new Buffering();
        BatchThreadControllerFrame controller = new BatchThreadControllerFrame();
        controller.setTitle("Auswahl in Puffer kopieren");
        buffering.setThreadController(controller);
        buffering.start();
      }
    });

    MustButton EmailButton = new MustButton("@"); EmailButton.setToolTipText("e-mail verfassen");
    panelButtons.add(EmailButton);
    EmailButton.setSelectDependence(centerList);
    EmailButton.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        doKontaktForActions.load(centerList.getSelectedIdentifier());
        de.must.util.Mail.editMail(doKontaktForActions.getemail());
      }
    });

    MustButton LetterButton;
    panelButtons.add((LetterButton = MustButton.create("ComposeMail24.gif", "Mail")));
    LetterButton.setToolTipText("Einen Brief schreiben");
    LetterButton.setPreferredSize(buttonProperties.getPreferredSize());
    LetterButton.setSelectDependence(centerList);
    LetterButton.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        try {
          InteractiveWordProcessing iwp = new InteractiveWordProcessing();
          doKontaktForActions.load(centerList.getSelectedIdentifier());
          String[] Temp = doKontaktForActions.getAdresslines();
          iwp.setNoteNotMatchingBookmarks(false);
          iwp.createNewDocumentFromTemplateToSelectByUser();
          for (int i = 0; i < Temp.length; i++) {
            iwp.typeTextAtBookmark("AddressLine" + (i+1), Temp[i]);
          }
          iwp.typeTextAtBookmark("Salutation", doKontaktForActions.getSalutation());
          for (int i = 0; i < Temp.length; i++) {
            iwp.typeTextAtBookmark("AddressLine" + (i+1) + "b", Temp[i]);
          }
          iwp.exec();
        } catch(java.io.IOException ioe) {
          Global.getInstance().mainLogger.error(getClass(), ioe);
        }
      }
    });

    MustButton EtikButton = new MustButton("E"); EtikButton.setToolTipText("Etikett drucken");
    panelButtons.add(EtikButton);
    EtikButton.setSelectDependence(centerList);
    EtikButton.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        boolean directPrint = true;
        if (directPrint) {
          doKontaktForActions.load(centerList.getSelectedIdentifier());
          AddressDrawer drawer = new AddressDrawer();
          drawer.setData(doKontaktForActions.getAdresslines());
          PageDrawerPrinting print = new PageDrawerPrinting(drawer);
          print.setPrinter("DYMO LabelWriter 400");
          print.print();
        } else {
          try {
            de.must.util.BatchWordProcessing wp = new de.must.util.BatchWordProcessing();
            doKontaktForActions.load(centerList.getSelectedIdentifier());
            String[] temp = doKontaktForActions.getAdresslines();
            wp.createNewDocumentFromTemplate("MSEtikett");
            // wp.createNewDocumentFromTemplate("PrivatEtikett");
            for (int i = 0; i < temp.length; i++) {
              wp.typeTextAtBookmark("AddressLine" + (i+1), temp[i]);
            }
            wp.printAndForget();
            wp.exec();
          } catch(java.io.IOException ioe) {
            Global.getInstance().mainLogger.error(getClass(), ioe);
          }
        }
      }
    });

    creationEnding();
  }

  protected void delayedInititialActions() {
    tfFirma.requestFocus(); // ??
  }

  protected void reset() {
    tfFirma.setText(""); //$NON-NLS-1$
    tfNachname.setText(""); //$NON-NLS-1$
    ort.setText(""); //$NON-NLS-1$
    plz.setText(""); //$NON-NLS-1$
    // groupChoice.set??;
    kontaktart.setSelectedIndex(0); //$NON-NLS-1$
    super.reset();
  }

  protected void ChooseListDataObject() {
    doKontaktForList.setAdditionalTables("");
  }

  public String getSelectionFields() {
    return "Kontakt.KontaktNi, Firma, AKGRID, NAMNAC, NAMVOR, GESCID";
  }

  public String getWhereCondition() {
    int countAddCon = -1;
    String[] additionalConditions = new String[20];
    listMode = LIST_BY_COMPANY;
    if (tfFirma.getText().equals("") & !tfNachname.getText().equals("")) listMode = LIST_BY_LAST_NAME;
    WhereCondition whereCondition = new WhereCondition(Global.getInstance().isMainConnOracle());
    if (tfFirma.getText().length() > 0) {
      whereCondition.append("Firma", "%" + tfFirma.getText() + "%");
    }
    if (tfNachname.getText().length() > 0) {
      whereCondition.append("NAMNAC", tfNachname.getText() + "%");
    }
    if (ort.getText().length() > 0) {
      whereCondition.append("ORTSBZ", ort.getText() + "%");
    }
    if (plz.getText().length() > 0) {
      whereCondition.append("PLZ", plz.getText() + "%");
    }
    String whereCondition2 = "";
    if (countAddCon > -1) {
      whereCondition2 += "(" + additionalConditions[0];
    }
    for (int i = 1; i <= countAddCon; i++) {
      whereCondition2 += " or ";
      whereCondition2 += additionalConditions[i];
    }
    if (countAddCon > -1) whereCondition2 += ")";
    if (whereCondition2.length() > 0) {
      whereCondition.append(whereCondition2);
    }
 
    String groupSelection = groupChoice.getModel().getSelectedIdentifierCondition("GRPJNI");

    if (!groupSelection.equals("")) {
      // doKontaktForList.setAdditionalTables("Gzpj"); // variant without "where in" for MySQL
      // whereCondition += " and Kontakt.KontaktNi = Gzpj.KontaktNi and "; // variant without "where in" for MySQL
      whereCondition.append("KontaktNi in (select KontaktNi from Gzpj where ");
      whereCondition.append(groupSelection + ")");
    }

    if (kontaktart.isSpecialChoice()) {
      whereCondition.append("KontartNI = " + kontaktart.getSelectedIdentifier());
    }

    return whereCondition.toString();
  }

  public String getOrderByFields() {
    switch (listMode) {
    case LIST_BY_LAST_NAME:
      return "NAMNAC, NAMVOR";
    }
    return "Firma, NAMNAC, NAMVOR";
  }

  public String getRowString() {
    String temp, temp2;
    switch (listMode) {
    case LIST_BY_COMPANY:
      temp = doKontaktForList.getText("Firma");
      if (temp.equals("")) temp = "privat";
      return temp + " / " + doKontaktForList.getTitledFullName();
    default:
      temp = doKontaktForList.getTitledFullName();
      temp2 = doKontaktForList.getText("Firma");
      if (!temp2.equals("")) temp += " / " + temp2;
      return temp;
    }
  }

  class Buffering extends InterruptibleBatchThread {
    protected void runCore() {
      DoKontakt doKontakt = new DoKontakt();
      DoAddressBuffer doAddressBuffer1 = new DoAddressBuffer();
      doAddressBuffer1.clear();
      doKontakt.select("*", getElaboratedWhereCondition(), "PLZ");
      int counter = 0;
      while (isToRun() && doKontakt.nextRow()) {
        statusLabel.setStatus("Bearbeite Kontakt " + counter++ );
        doAddressBuffer1.newRow();
        DataUtil.moveCorr(doKontakt, doAddressBuffer1);
        doAddressBuffer1.insert();
      }
      doKontakt.closeQuery();
      statusLabel.resetDefault();
    }
  }

  class ExportFile extends InterruptibleBatchThread {
    DoKontakt doKontakt = new DoKontakt();
    protected void runCore() {
      String orderBy = "LANDID, PLZ";
      // String orderBy = "Firma";
      doKontakt.select("*", getElaboratedWhereCondition(), orderBy);
      try {
        de.must.io.Protocol out = new de.must.io.Protocol("Adressen.csv");
        int counter = 0;
        while (isToRun() && doKontakt.nextRow()) {
          setMessage("Bearbeite Kontakt " + counter++ );
          String land = doKontakt.getText("LANDID");
          String plz = doKontakt.getText("PLZ");
          if (plz.length() == 0) {
            plz = doKontakt.getText("PLZPFC");
          }
          if (land.length() > 0) {
            plz = land + "-" + plz;
          }
          /* String[] Temp = doAddressBuffer1.getAdresslines();
          for (int i = 0; i < Temp.length; i++) {
            out.addEntry(Temp[i]);
          }
          out.addEntry("---------------------------------"); */
          out.addEntry("\"" + plz + "\";" + doKontakt.getText("refDarst"));
        }
        out.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
      doKontakt.closeQuery();
      clearMessage();
    }
  }

}
