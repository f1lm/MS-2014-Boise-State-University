/*
 * Public Domain Sample Code 
 */
package mkt;

import de.must.middle.InterruptibleBatchThread;
import de.must.wuic.*;

import java.awt.*;
import java.awt.event.*;
import java.io.IOException;

/**
 * @author Christoph Mueller
 */
public class FrAddrBufferSl extends SimpleDataListFrame {
  private DoAddressBuffer doAddressBuffer1 = new DoAddressBuffer();
  private MustTextField tfFirma;
  private MustTextField tfNachname;
  private static final int LIST_BY_COMPANY = 0;
  private static final int LIST_BY_LAST_NAME = 1;
  private int listMode = LIST_BY_COMPANY;

  public static void openMainInstance() {
    getOrCreateMainInstance().open();
  }
  
  public static FrAddrBufferSl getOrCreateMainInstance() {
    return (FrAddrBufferSl)getOrCreateMainInstance(FrAddrBufferSl.class);
  }

  public FrAddrBufferSl() {
    this(null);
  }

  public FrAddrBufferSl(Frame ParentFrame) {
    super(ParentFrame);
    this.setTitle("Adress-Puffer");
    this.setAutoInitialListFill(false);
    setMaxListEntries(1000);

    newPanel("Namen");
    tfFirma = createTextField("Firma", 20);
    tfNachname = createTextField("Nachname", 20);
    createTextFieldForGlobalSearch("Global", 30);

    newPanelWithExpertSearchTextArea("Expertenrecherche");
    if (!isLaidOut()) this.setSize((int)this.getSize().getWidth(), 500);

    setAssociatedPropertyAdministration(FrAddrBufferPr.class);
    setListDataObject(doAddressBuffer1);

    MustButton StandardLetterButton = new MustButton("SerBrief"); StandardLetterButton.setToolTipText("Serienbrief mit \"Serienbriefvorlage.dot\" für Suchergebnis");
    panelSelectButtons.add(StandardLetterButton);
    StandardLetterButton.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(java.awt.event.ActionEvent e) {
        // Access-Beispiele für Expertenrecherche:
        // KontaktNi in (select KontaktNi from Gzpj where GRPJNI = 16 or GRPJNI = 9 or GRPJNI = 15 or GRPJNI = 21 or GRPJNI = 31) and ErfassDat >= #2007-03-08#
        // KontaktNi in (select KontaktNi from Gzpj where GRPJNI = 9) and not KontaktNi in (select KontaktNi from Gzpj where GRPJNI = 30) and ErfassDat < #2007-04-01# 
//        AddressProtocol thread = new AddressProtocol();
//        BatchThreadControllerFrame controller = new BatchThreadControllerFrame();
//        controller.setTitle("Erzeuge Datei");
//        thread.setThreadController(controller);
//        thread.start();
        String vorlage = StandardDialog.getStringInput(null, "Name der Vorlage eingeben", "Serienbriefvorlage");
        if (!vorlage.equals("")) {
          StandardLetter thread = new StandardLetter(vorlage);
          BatchThreadControllerFrame controller = new BatchThreadControllerFrame();
          controller.setTitle("Serienbrief");
          thread.setThreadController(controller);
          thread.start();
        }
      }
    });

    MustButton EmailButton = new MustButton("@"); EmailButton.setToolTipText("e-mail verfassen");
    panelButtons.add(EmailButton);
    EmailButton.setSelectDependence(centerList);
    EmailButton.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        doAddressBuffer1.load(centerList.getSelectedIdentifier());
        de.must.util.Mail.editMail(doAddressBuffer1.getemail());
      }
    });

    MustButton LetterButton;
    panelButtons.add((LetterButton = MustButton.create("ComposeMail24.gif", "Mail")));
    LetterButton.setToolTipText("Einen Brief schreiben");
    LetterButton.setPreferredSize(buttonProperties.getPreferredSize());
    LetterButton.setSelectDependence(centerList);
    LetterButton.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        doAddressBuffer1.load(centerList.getSelectedIdentifier());
        String[] Temp = doAddressBuffer1.getAdresslines();
        de.must.util.WordProcessing.setNoteNotMatchingBookmarks(false);
        de.must.util.WordProcessing.createNewDocumentFromTemplateToSelectByUser();
        for (int i = 0; i < Temp.length; i++) {
          de.must.util.WordProcessing.typeTextAtBookmark("AddressLine" + (i+1), Temp[i]);
        }
        de.must.util.WordProcessing.typeTextAtBookmark("Salutation", doAddressBuffer1.getSalutation());
        for (int i = 0; i < Temp.length; i++) {
          de.must.util.WordProcessing.typeTextAtBookmark("AddressLine" + (i+1) + "b", Temp[i]);
        }
        de.must.util.WordProcessing.exec();
      }
    });

    MustButton EtikButton = new MustButton("E"); EtikButton.setToolTipText("Etikett drucken");
    panelButtons.add(EtikButton);
    EtikButton.setSelectDependence(centerList);
    EtikButton.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        doAddressBuffer1.load(centerList.getSelectedIdentifier());
        String[] Temp = doAddressBuffer1.getAdresslines();
        de.must.util.WordProcessing.createNewDocumentFromTemplate("MSEtikett");
        for (int i = 0; i < Temp.length; i++) {
          de.must.util.WordProcessing.typeTextAtBookmark("AddressLine" + (i+1), Temp[i]);
        }
        de.must.util.WordProcessing.printAndForget();
        de.must.util.WordProcessing.exec();
      }
    });

    creationEnding();
    panelSelectButtons.remove(buttonNew);
  }

  public String getSelectionFields() {
    return "KontaktNi, Firma, AKGRID, NAMNAC, NAMVOR";
  }

  public String getWhereCondition() {
    int countAddCon = -1;
    String[] additionalConditions = new String[20];
    listMode = LIST_BY_COMPANY;
    if (tfFirma.getText().equals("") & !tfNachname.getText().equals("")) listMode = LIST_BY_LAST_NAME;
    String whereCondition = "";
    whereCondition += " Firma like \'%" + tfFirma.getText() + "%\'";
    whereCondition += " and NAMNAC like \'" + tfNachname.getText() + "%\'";
    if (countAddCon > -1) {
      whereCondition += " and (";
      whereCondition += additionalConditions[0];
    }
    for (int i = 1; i <= countAddCon; i++) {
      whereCondition += " or ";
      whereCondition += additionalConditions[i];
    }
    if (countAddCon > -1) whereCondition += ")";

    return whereCondition;
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
      temp = doAddressBuffer1.getText("Firma");
      if (temp.equals("")) temp = "privat";
      return temp + " / " + doAddressBuffer1.getTitledFullName();
    default:
      temp = doAddressBuffer1.getTitledFullName();
      temp2 = doAddressBuffer1.getText("Firma");
      if (!temp2.equals("")) temp += " / " + temp2;
      return temp;
    }
  }

  class StandardLetter extends InterruptibleBatchThread {
    DoAddressBuffer doAddressBuffer1 = new DoAddressBuffer();
    private String templateName;
    public StandardLetter(String templateName) {
      this.templateName = templateName;
    }
    protected void runCore() {
      actLetter();
    }
    private void actLetter() {
      doAddressBuffer1.select("*", getElaboratedWhereCondition(), "LANDID, PLZ");
      try {
        de.must.util.BatchWordProcessing bwp = new de.must.util.BatchWordProcessing();
        int counter = 0;
        while (isToRun() && doAddressBuffer1.nextRow()) {
          setMessage("Bearbeite Kontakt " + counter++ );
          String[] Temp = doAddressBuffer1.getAdresslines();
          bwp.setNoteNotMatchingBookmarks(false);
          bwp.createNewDocumentFromTemplate(templateName);
          for (int i = 0; i < Temp.length; i++) {
            bwp.typeTextAtBookmark("AddressLine" + (i+1), Temp[i]);
          }
          bwp.typeTextAtBookmark("Salutation", doAddressBuffer1.getSalutation());
          for (int i = 0; i < Temp.length; i++) {
            bwp.typeTextAtBookmark("AddressLine" + (i+1) + "b", Temp[i]);
          }
          bwp.printAndForget();
        }
        bwp.quitApplicationAfterWaiting(2000);
        bwp.exec();
        doAddressBuffer1.closeQuery();
        clearMessage();
      }
      catch(Exception e) {
        Global.getInstance().mainLogger.error(getClass(), e);
      }
    }
  }

  class AddressProtocol extends InterruptibleBatchThread {
    DoAddressBuffer doAddressBuffer1 = new DoAddressBuffer();
    protected void runCore() {
      // String orderBy = "PLZ";
      String orderBy = "Firma";
      doAddressBuffer1.select("*", getElaboratedWhereCondition(), orderBy);
      try {
        de.must.io.Protocol out = new de.must.io.Protocol("Adressen.txt");
        int counter = 0;
        while (isToRun() && doAddressBuffer1.nextRow()) {
          setMessage("Bearbeite Kontakt " + counter++ );
          /* String[] Temp = doAddressBuffer1.getAdresslines();
          for (int i = 0; i < Temp.length; i++) {
            out.addEntry(Temp[i]);
          }
          out.addEntry("---------------------------------"); */
          out.addEntry(doAddressBuffer1.getText("Firma") + " - " + doAddressBuffer1.getText("ADRZS1")  + " - " + doAddressBuffer1.getText("ORTSBZ"));
        }
        out.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
      doAddressBuffer1.closeQuery();
      clearMessage();
    }
  }

}
