package mkt;

import de.must.wuic.*;
import javax.swing.*;
import java.awt.*;

/**
 * @author Christoph Mueller
 */
public class FrParam extends ParameterDialogWithStorage {

  private static FrParam mainInstance;

  public FrParam(Frame ownerFrame) {
    super(ownerFrame, Parameter.getInstance());
    setTitle("Anwendungsparameter");

    newPanel("Parameter");
    createIntField("Listbegrenzung", Parameter.MAX_ENTRIES);
    currentAttributeList.append(new JLabel("(max. Anzahl Einträge in Auswahl-Listen)"));
 
    creationEnding();

    loadValues();
  }

  public void saveValues() {
    super.saveValues();
    AbstractDataListFrame.setMaxListEntries(Parameter.getInstance().getValueAsInt(Parameter.MAX_ENTRIES));
  }

}


