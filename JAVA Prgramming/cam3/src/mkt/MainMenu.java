package mkt;

import de.must.wuic.*;
import de.must.middle.ApplConstStd;
import de.must.middle.EntitlementStd;
import de.must.util.*;
import de.must.dataobj.*;
import java.awt.event.*;
import java.io.IOException;

/**
 * @author Christoph Mueller
 */
public class MainMenu extends MenuFrame {

  private MainShortCuts mainShortCuts1 = new MainShortCuts();

  public MainMenu() {
    setTitle("up-to-date Marketing");

    // new main menu -----------------------------------------------------------
    menuBar.addMenu("Datei");
    menuBar.addMenuItem("Persönliche Einstellungen", Entitlement.AREA_REC).addActionListener(new java.awt.event.ActionListener() { //$NON-NLS-1$
      public void actionPerformed(ActionEvent e) {
        new FrParamUser(MainMenu.this).setVisible(true);
      }
    });
    menuBar.addMenuItem(getTranslation("TEXT_DB_BACKUP"), Entitlement.AREA_REC).addActionListener(new java.awt.event.ActionListener() { //$NON-NLS-1$
      public void actionPerformed(ActionEvent e) {
        new FrSbBackup(MainMenu.this).setVisible(true);
      }
    });
    menuBar.addMenuItem("Beenden", Entitlement.AREA_REC).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        MainMenu.this.closeRequest();
      }
    });

    // new main menu -----------------------------------------------------------
    menuBar.addMenu("Kontakte");
    menuBar.addMenuItem("Bestehende Kontakte", Entitlement.AREA_REC, KeyEvent.VK_O, KeyEvent.CTRL_MASK).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        FrKontaktSl.openMainInstance();
      }
    });
    menuBar.addMenuItem("Neuer Kontakt", Entitlement.AREA_REC, KeyEvent.VK_N, KeyEvent.CTRL_MASK).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        FrKontaktPr.getOrCreateMainInstance().newInputIfVacant();
      }
    });
    menuBar.addMenuItem("Kontakt-Gruppen", Entitlement.AREA_REC).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        FrGrPj.openMainInstance();
      }
    });
    menuBar.addMenuItem("Kontakt-Arten", Entitlement.AREA_REC).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        FrKontaktart.openMainInstance();
      }
    });
    menuBar.addMenuItem("Adress-Puffer", Entitlement.AREA_REC).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        FrAddrBufferSl.openMainInstance();
      }
    });

    // new main menu -----------------------------------------------------------
    menuBar.addMenu("Auswertung");
    menuBar.addMenuItem("Telefonliste", Entitlement.AREA_REC).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        DoKontakt doKontakt1 = new DoKontakt();
        doKontakt1.select("*", "TELENR <> \'\'", "NAMNAC, NAMVOR");
        try {
          de.must.io.XmlFile XmlFile1 = new de.must.io.XmlFile("Fon", "Telefonliste", "MustMarketing");
          XmlFile1.list(doKontakt1, new String[] {"NAMNAC", "NAMVOR", "TELENR", "FONPRV"});
          XmlFile1.close();
          XmlFile1.presentInBrowser();
        } catch (IOException e1) {
          e1.printStackTrace();
        }
        doKontakt1.closeQuery();
      }
    });

    // new main menu -----------------------------------------------------------
    menuBar.addMenu("Administration");
    menuBar.addMenuItem("Basis-Parameter", Entitlement.AREA_ADM).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        new FrParamBas(MainMenu.this).setVisible(true);
      }
    });
    menuBar.addMenuItem("Anwendungsparameter", Entitlement.AREA_ADM).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        new FrParam(MainMenu.this).setVisible(true);
      }
    });
    menuBar.addMenuItem("Benutzer", Entitlement.AREA_REC).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        FrUserSl.openMainInstance();
      }
    });

    // new main menu -----------------------------------------------------------
    /* menuBar.addMenu("Import");
    menuBar.addMenuItem("Former Data", Entitlement.AREA_ADM).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        new Util().importFormerMarketing();
      }
    }); */

    // new main menu -----------------------------------------------------------
    menuBar.addMenu("Hilfe");
    menuBar.addMenuItem("Inhalt", Entitlement.AREA_REC, KeyEvent.VK_F1).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        Help.showTopic("Index");
      }
    });
    menuBar.addMenuItem("Info", Entitlement.AREA_REC).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        new FrInfo(MainMenu.this).setVisible(true);
      }
    });

    this.setJMenuBar(menuBar);

    // menu buttons ------------------------------------------------------------
    MustButton.addNewInstanceToPanel("Bestehende Kontakte", toolbarPanel).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        FrKontaktSl.openMainInstance();
      }
    });

    MustButton.addNewInstanceToPanel("Neuer Kontakt", toolbarPanel).addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        FrKontaktPr.getOrCreateMainInstance().newInputIfVacant();
      }
    });

    packIfNotLaidOut();

    if (!Global.getInstance().mainConnectionHolder.isConnected()) {
      HelpConn.open();
    }
  }

  @Override
  protected EntitlementStd getEntitlement() {
    return new Entitlement();
  }

  public void extendFunctions(int securityLevel) {
    if (securityLevel == ApplConstStd.SECURITY_EXTENDED) {
      menuBar.addMenu("Spezial");
      menuBar.addMenuItem("Freier Datenzugriff", Entitlement.AREA_REC).addActionListener(new java.awt.event.ActionListener() {
        public void actionPerformed(ActionEvent e) {
          FrDtaAcc frDtaAcc = new FrDtaAcc(Global.getInstance().getMainConnection());
          frDtaAcc.setLocation(0, MainMenu.this.getSize().height);
        }
      });
      menuBar.addMenuItem("Freies SQL", Entitlement.AREA_REC).addActionListener(new java.awt.event.ActionListener() {
        public void actionPerformed(ActionEvent e) {
          FrSqlExc frSqlExc1 = new FrSqlExc(Global.getInstance().getMainConnection());
          frSqlExc1.setLocation(0, MainMenu.this.getSize().height);
        }
      });
      menuBar.addMenuItem("Vergessene Tabelle neu erstellen", Entitlement.AREA_REC).addActionListener(new java.awt.event.ActionListener() {
        public void actionPerformed(ActionEvent e) {
          DbModifier dbModifier = new DbModifier();
          dbModifier.setDropBeforeCreation(true);
          dbModifier.createTable(Global.getInstance().getMainConnection(), new DoAddressBuffer());
        }
      });
      menuBar.addMenuItem("Property-Instruktionen erzeugen", Entitlement.AREA_REC).addActionListener(new java.awt.event.ActionListener() {
        public void actionPerformed(ActionEvent e) {
          FormBuilder.createPropertyInstructions("mkt." + StandardDialog.getStringInput(MainMenu.this, "Klassenname des Datenobjekts eingeben"));
        }
      });
    }
  }

  @Override
  protected void releaseExternalResources() {
    Global.getInstance().destroyGlobalDataObjects();
    Global.getInstance().connectionPool.closeAllConnections();
  }
  
}

