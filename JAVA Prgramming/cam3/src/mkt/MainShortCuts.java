//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

import java.awt.event.*;

/**
 * @author Christoph Mueller
 */
public class MainShortCuts extends de.must.wuic.ShortCutStd {

  public MainShortCuts() {
  }

  protected final boolean interpretControlModifiedKeys(int KeyEventVKcode) {
    switch (KeyEventVKcode) {
    case KeyEvent.VK_N:
      FrKontaktPr.getOrCreateMainInstance().newInputIfVacant();
      return true;
    case KeyEvent.VK_O:
      FrKontaktSl.openMainInstance();
      return true;
    }
    return false;
  }

}
