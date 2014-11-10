package de.must.wuic;

import java.awt.event.ActionListener;

import javax.swing.JPanel;

public abstract class TableAdministration extends MustFrame implements ActionListener {

  protected MustTable table;
  protected JPanel panelBottom = new JPanel();
  protected JPanel panelButtons = new JPanel();
  protected MustStatusLabel statusLabel = new MustStatusLabel();
  protected MustButton buttonDel = new MustButton(getTranslation("TEXT_REMOVE"), "BtnDel", this);
  protected MustButton buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), "BtnOk", this);
  protected MustButton buttonCancel = new MustButton(getTranslation("TEXT_CANCEL_BUTTON"), "BtnCancel", this);
  protected boolean isLaidOut;
  
  /**
   * Selects the specified row.
   * @param row the row to be selected
   */
  protected void select(int row) {
    table.setRowSelectionInterval(row, row);
    table.ensureIndexIsVisible(row);
  }

}
