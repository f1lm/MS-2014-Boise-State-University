//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.markup.*;
import de.must.middle.GlobalStd;

/**
 * Session class. Assigned by class Main. This is a place to define the look
 * and feel for the sessions in general. For example, different sessions may
 * user different layouts.
 * @author Christoph Mueller
 */
public final class Session extends SessionStd {

  private Layout layout;

  public Session() {
    super(Constants.ACTION_FOR_POST, Constants.BASIC_TITLE);
  }

  protected void build(SessionData sessionData) {
    if (sessionData.locale.getLanguage().equals(java.util.Locale.GERMAN.getLanguage())) {
      sessionData.setResourceBundle(new de.jugs.cookbook.Res_de_DE());
    } else {
      sessionData.setResourceBundle(new de.jugs.cookbook.Res());
    }
    sessionData.imageDirectory = Constants.IMAGE_DIRECTORY;
    sessionData.entitlement = new Entitlement(sessionData);
    sessionData.menuBar = new MainMenu(sessionData);
    sessionData.toolBar = new ToolBar(sessionData);
    sessionData.layout = new HostLayout();
    sessionData.layout.setFooterTagSequence(Constants.FOOTER);
    baseInvoke(sessionData.menuBar);
    // CookBookLogin login = new CookBookLogin(sessionData);
    // baseInvoke(login);
  }

  protected GlobalStd getGlobal() {
    return Global.getInstance();
  }

}
