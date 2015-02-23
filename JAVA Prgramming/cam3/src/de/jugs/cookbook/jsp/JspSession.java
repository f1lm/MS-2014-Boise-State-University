//elementary!

package de.jugs.cookbook.jsp;

import de.jugs.cookbook.Global;
import de.must.markup.JspSessionStd;
import de.must.middle.GlobalStd;
import java.util.*;

/**
 * Manager of the JSP session - see API doc of super class for more information.
 * @author Christoph Mueller
 */
public class JspSession extends JspSessionStd {

  public JspSession() {
  }

  protected GlobalStd getGlobal() {
    return Global.getInstance();
  }

  protected ResourceBundle getResourceBundle(Locale locale) {
    if (sessionData.locale.getLanguage().equals(java.util.Locale.GERMAN.getLanguage())) {
      return new de.jugs.cookbook.Res_de_DE();
    } else {
      return new de.jugs.cookbook.Res();
    }
  }

}