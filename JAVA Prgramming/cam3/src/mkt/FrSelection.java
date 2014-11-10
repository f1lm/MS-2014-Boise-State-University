//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

import de.must.wuic.*;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

/**
 * @author Christoph Mueller
 */
public class FrSelection extends SimpleDataListFrame {
  private static FrSelection mainInstance;

  // private DoBfLetter doBfLetter1 = new DoBfLetter();
  // private DoKuAnsp doBfLetter1 = new DoKuAnsp();
  // private FrKundePr frKundePr1 = new FrKundePr();
  // private FrContrPr frContrPr1;
  private MustTextField tfGlobal = new MustTextField(30);
  private MustTextField firma = new MustTextField(30);
  private MustTextField tfNachname = new MustTextField(30);
  private JCheckBox cbGroup1 = new JCheckBox();
  private JCheckBox cbGroup2 = new JCheckBox();
  private static final int LIST_BY_COMPANY = 0;
  private static final int LIST_BY_LAST_NAME = 1;
  private int listMode = LIST_BY_LAST_NAME;

  public static void open(int xPos, int yPos) {
     if (!Global.getInstance().mainConnectionHolder.isConnected()) {
      HelpConn.open();
      return;
    }
    if (mainInstance == null) {
      mainInstance = new FrSelection ();
    }
    else {
      mainInstance.toFront();
      mainInstance.requestFocus();
    }
    mainInstance.setVisible(true);
  }

  public static void close() {
    if (mainInstance != null) {
      mainInstance.setVisible(false);
      mainInstance.dispose();
      mainInstance = null;
    }
  }

  public FrSelection() {
    this(null);
  }

  public FrSelection(Frame ParentFrame) {
    super(ParentFrame);
    this.setTitle("Brief-Puffer");

    newPanel("Namen");
    currentAttributeList.append("Nachname", tfNachname);
    currentAttributeList.append("Firma", firma);
    currentAttributeList.append("Global", tfGlobal);

    newPanel("Gruppen");
    currentAttributeList.append("Gruppe 1", cbGroup1);
    currentAttributeList.append("Gruppe 2", cbGroup2);

    // setAssociatedPropertyFrame(frKundePr1);
    // setListDataObject(doBfLetter1);

    MustButton Temp;
    panelButtons.add((Temp = new MustButton("Brief")));
    Temp.addActionListener(new java.awt.event.ActionListener() {
      public void actionPerformed(ActionEvent e) {
        // new FrLtCo(doBfLetter1);
      }
    });

    firma.requestFocus();
    refreshList();
    generalActionEnding();
  }

  public String getSelectionFields() {
    return "BfLtNi, ANSP_NR, KD_NUMMER, NAME, VORNAME";
  }

  public String getWhereCondition() {
    String whereCondition = "NAME like \'" + tfNachname.getText() + "%\'";
    return whereCondition;
  }

  public String getOrderByFields() {
    return "NAME, VORNAME";
  }

  public String getRowString() {
    String temp;
    temp = ""; // doBfLetter1.getText("NAME") +  ", " + doBfLetter1.getText("VORNAME");
    return temp;
  }

  protected void loadPropertyFrame() {
    /* int kdNumber;
    int CV_NUMMER = 0;
    int aspNumber;
    doBfLetter1.load(CenterList.getSelectedIdentifier());
    if ((kdNumber = doBfLetter1.getInt("KD_NUMMER")) > 0) {
      if (associatedPropertyFrame.isCancelAllowed()) {
        setMessageToKeep("Lade einzelnen Eintrag...");
        CreateOrRecoverPropertyFramme();
        associatedPropertyFrame.loadValues(kdNumber);
      }
    } else if ((CV_NUMMER = doBfLetter1.getInt("CV_NUMMER")) > 0) {
      if (frContrPr1 == null) frContrPr1 = new FrContrPr();
      setMessage("Lade einzelnen Eintrag...");
      frContrPr1.setVisible(true);
      frContrPr1.setCursor();
      frContrPr1.loadValues(CV_NUMMER);
    }  */
  }

  public void closeInstance() {
    super.closeInstance();
    close();
  }

}
