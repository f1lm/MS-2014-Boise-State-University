/*
 * Copyright (C) 2007-2011 Christoph Mueller. All rights reserved.
 */
package mkt;

import de.must.wuic.*;

import java.awt.*;

import javax.swing.DefaultComboBoxModel;

public final class FrParamUser extends ParameterDialogWithStorage {
  
  private ParametersFromPropertyFiles nonDBParameters = Global.getInstance().getParametersFromPropertyFiles();

  private MustComboBox fontSize;
  private int editBeginFontSize;
  
  public FrParamUser(Frame ownerFrame) {
    super(ownerFrame, Global.getInstance().getParametersFromPropertyFiles());
    setTitle("Persönliche Einstellungen");

    newPanel("Drucker");
    fontSize = new MustComboBox();
    fontSize.setModel(new DefaultComboBoxModel<Object>(new Object[]{"11", "12", "14", "16", "18", "20"}));
    currentAttributeList.append("Schriftgröße", fontSize);

    creationEnding();
  }

  protected boolean isInputAccepted() {
    return true;
  }

  @Override
  protected void loadValues() {
    super.loadValues();
    editBeginFontSize = nonDBParameters.getFontSize();
    fontSize.setSelectedItem(String.valueOf(editBeginFontSize));
  }

  @Override
  protected void saveValues() {
    super.saveValues();
    int newFontSize = Integer.valueOf((String)fontSize.getSelectedItem());
    nonDBParameters.setFontSize(newFontSize);
    nonDBParameters.save();
    if (newFontSize != editBeginFontSize) {
      WinContr.getInstance().reset();
    }
  }

}

