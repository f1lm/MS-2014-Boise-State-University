/*
 * Copyright (c) 1999-2007 Christoph Mueller. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * THIS SOFTWARE IS PROVIDED BY CHRISTOPH MUELLER ``AS IS'' AND ANY
 * EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CHRISTOPH MUELLER OR
 * HIS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 */

package de.must.util;

import de.must.wuic.*;
import de.must.dataobj.*;
import javax.swing.*;
import java.awt.event.*;
import java.sql.*;

/**
 * @author Christoph Mueller
 */
public class FrDtaAcc extends SimpleDataListFrame {

  protected static int maxListEntries = 100;
  private Connection DbConn;
  private AttributeList attributeListTop = new AttributeList();
  protected MustTextField tfSelect = new MustTextField(20);
  protected MustTextField tfFrom = new MustTextField(20);
  protected JCheckBox cbOrder = new JCheckBox("Order");
  protected MustTextField tfWhere = new MustTextField(20);
  protected MustTextField tfUniKey = new MustTextField(20);
  protected MustButton buttonTables = new MustButton("...", "BtnTables", this);
  protected MustButton buttonCreatetSource = new MustButton("Source erstellen", "BtnCrtSrc", this);
  private String[] columns = new String[10];

  /**
   *
   * @param thisDbConn
   * @param
   * @param
   */
  public FrDtaAcc(Connection thisDbConn) {
    super(null);
    this.DbConn = thisDbConn;
    this.setTitle("Freier Datenzugriff");
    this.setAutoInitialListFill(false);
    panelTop.add(attributeListTop);
    attributeListTop.append("select", tfSelect);
    attributeListTop.append(cbOrder);
    attributeListTop.append("from", tfFrom);
    attributeListTop.append(buttonTables);
    attributeListTop.append("where", tfWhere);
    attributeListTop.append("Eindeutiges integer-Feld", tfUniKey);
    panelSelectButtons.add(buttonCreatetSource);
    panelButtons.add(buttonProperties);
    buttonProperties.setSelectDependence(centerList);
    panelButtons.add(buttonDelete);
    buttonDelete.setSelectDependence(centerList);
    panelButtons.add(buttonClose);
    buttonTables.setDefaultCapable(false);
    buttonCreatetSource.setDefaultCapable(false);
    this.setVisible(true);
    creationEnding();
  }

  /**
   *
   * @param e
   */
  public void actionPerformed(ActionEvent e) {
    String actCommand = e.getActionCommand();
    setMessage("");
    if (actCommand.equals("BtnTables")) {
      de.must.io.Logger.getInstance().info(getClass(), "Tables gewünscht");
      listTables();
    }
    if (actCommand.equals("BtnList")) {
      refreshList();
      this.setTitle(this.tfFrom.getText() + ", Freier Datenzugriff");
    }
    if (actCommand.equals("BtnNew")) {
      createPropertyGui() ;
      associatedPropertyAdministration.newInputIfVacant();
    }
    if (actCommand.equals("BtnCrtSrc")) {
      createSource();
    }
    if (actCommand.equals("BtnProp")) {
      setMessage("Lade einzelnen Eintrag...");
      createPropertyGui();
      associatedPropertyAdministration.loadValues(centerList.getSelectedIdentifier());
    }
    if (actCommand.equals("BtnDel")) {
      if (StandardDialog.deletionConfirmed(this, centerList.getSelectedItem())) {
        if (listDataObject.delete(centerList.getSelectedIdentifier())) {
          centerList.remove(centerList.getSelectedIndex());
          setMessageToKeep("Eintrag gelöscht.");
        }
        else setMessageToKeep("Eintrag konnte nicht gelöscht werden.");
      }
      else setMessageToKeep("Löschen abgebrochen.");
    }
    if (actCommand.equals("BtnClose")) {
      closeInstance();
    }
    generalActionEnding();
  }

  /**
   *
   */
  protected /* synchronized */ void fillList() { // synchronize problem with getTreeLcok() while fireSelectionChanged in MustList
    int pos;
    columns[0] = tfSelect.getText();
    if ((pos = columns[0].lastIndexOf(",")) > -1) {
      columns[0] = columns[0].substring(0, pos);
    }
    setListDataObject(new DirectDataObject(DbConn, tfFrom.getText()));
    listDataObject.setReadBigDecimalAsInt(true);
    setMessage("Lade Auswahl...");
    String queryString = "select " + listDataObject.unifyColumnName(tfUniKey.getText()) + ", " + tfSelect.getText() +  " from " + listDataObject.unifyTableName(tfFrom.getText());
    if (!tfWhere.getText().equals("")) queryString += " where " + tfWhere.getText();
    if (cbOrder.isSelected()) queryString += " order by " + tfSelect.getText();
    de.must.io.Logger.getInstance().info(getClass(), queryString);
    listDataObject.openQuery(queryString);
    removeAllOfTheList();
    beginListFill();
    int i = 0;
    while (++i <= maxListEntries & listDataObject.nextRow()) {
      int uniqueKey = listDataObject.getInt(listDataObject.unifyColumnName(tfUniKey.getText()));
      String rowText = listDataObject.getText(columns[0]);
      if (rowText.equals("")) {
        if (tfUniKey.getText().equals("")) rowText = "<ohne Angabe>";
        else rowText = tfUniKey.getText() + " " + uniqueKey;
      }
      centerList.addIndexedItem(rowText, new Identifier(uniqueKey));
    }
    listDataObject.closeQuery();
    completeListFill();
    switch (getListItemCount()) {
    case 0:
      setMessageToKeep(getNotFoundNotification());
      break;
    case 1:
      statusLabel.resetDefault();
      break;
    default:
      requestListingFocus();
      if (i > maxListEntries) {
        setMessageToKeep("(Teilauflistung)");
      } else {
        // StatusLabel.resetDefault();
        setMessageToKeep(i-1 + " Einträge");
      }
      break;
    }
  }

  private void createSource() {
    StandardDialog.presentText(this, TblAnalyzer.createCreationSource(DbConn, tfFrom.getText()), "Internal table definitions");
    StandardDialog.presentText(this, TblAnalyzer.createPropertyFrameCreationSource(DbConn, tfFrom.getText()), "Instructions for creating the PropertyAdministration");
  }

  private void createPropertyGui() {
    associatedPropertyAdministration = new FrDtaProp(new DirectDataObject(DbConn, tfFrom.getText(), listDataObject.unifyColumnName(tfUniKey.getText())));
    associatedPropertyAdministration.setVisible(true);
  }

  private void listTables() {
    try {
      DatabaseMetaData db = DbConn.getMetaData();
      de.must.io.Logger.getInstance().info(getClass(), "DatabaseProductName: " + db.getDatabaseProductName());
      ResultSet tables = db.getTables(null, null, null, null);
      while (tables.next()) {
        de.must.io.Logger.getInstance().info(getClass(), tables.getString(3));
      }
    }
    catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(getClass(), e2);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), e);
    }
  }

  /**
   *
   * @return
   */
  public String getSelectionFields() {return "";};

  /**
   *
   * @return
   */
  public String getWhereCondition() {return "";};

  /**
   *
   * @return
   */
  public String getOrderByFields() {return "";};

  /**
   *
   * @return
   */
  public String getRowString() {return "";};

}


