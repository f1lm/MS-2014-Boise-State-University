package de.must.wuic;

import java.util.*;

import de.must.middle.FrameworkTextResource;
import de.must.middle.GlobalStd;
import de.must.middle.Res;
import de.must.middle.Res_de_DE;

public class WuicGlobal implements FrameworkTextResource {

  private static WuicGlobal instance;

  protected Locale locale;
  protected ResourceBundle res;

  public final static WuicGlobal getInstance() {
    return WuicGlobal.getInstance(GlobalStd.locale);
  }

  public final static WuicGlobal getInstance(Locale locale) {
    if (instance == null) {
      instance = new WuicGlobal(locale);
    }
    return instance;
  }

  private WuicGlobal(Locale locale) {
    this.locale = locale;
    // res = ResourceBundle.getBundle("de.must.wuic.Res", getLocale());
    de.must.io.Logger.getInstance().debug(getClass(), "locale.getLanguage() = " + locale.getLanguage());
    de.must.io.Logger.getInstance().debug(getClass(), "Locale.GERMAN.getLanguage() = " + Locale.GERMAN.getLanguage());
    if (locale.getLanguage().equals(Locale.GERMAN.getLanguage())) {
      res = new Res_de_DE();
    } else {
      res = new Res();
    }
  }
  
  /**
	 * Forces English to be used. Does not determine other issues like date format and so on.
	 */
	public void forceLanguageEn() {
    res = new Res();
  }

  /**
   * Returns a package specific resource as a string.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  public String getResourceString(String resourceKey) {
    try {
      String value = res.getString(resourceKey);
      if (value == null) {
        de.must.io.Logger.getInstance().info(getClass(), "Couldn't find framework string resource " + resourceKey);
        value = "?" + resourceKey;
      }
      return value;
    } catch (MissingResourceException mre) {
      de.must.io.Logger.getInstance().info(getClass(), "Couldn't find framework string resource " + resourceKey);
      return "??" + resourceKey;
    } catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "Couldn't find framework string resource " + resourceKey);
      return "???" + resourceKey;
    }
  }

}
