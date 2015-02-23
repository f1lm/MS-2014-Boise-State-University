/*
 * Copyright (c) 2001-2013 Christoph Mueller. All rights reserved.
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
package de.must.markup;

import de.must.dataobj.IdManager;
import de.must.dataobj.DataObjectConstructionDetails;
import de.must.io.Logger;

import java.sql.Connection;
import java.util.*;

/**
 * Container to share data between Session and Invokables.
 * Attributes to be shared are declared as public. Thus, they may be accessed as if
 * they were in the respective class. (Since java doesn't provide a read-only
 * pointer to an object, we found get/set formality useless here.)
 * Contains methods to retrieve resources softly: Instead of throwing exceptions
 * runtime errors are logged and the key is given back instead of the found
 * resource.
 * Session comprehensive data should be stored in de.must.middle.GlobalStd.
 * @see de.must.middle.GlobalStd
 * @author Christoph Mueller
 */
public class SessionData implements DataObjectConstructionDetails {

  private ResourceBundle resourceBundle;
  private ResourceBundle frameworkResourceBundle;

  // common stuff:
  public String userAgent;
  public int dialogNbr = 0;
  public de.must.middle.GlobalStd global;
  public Locale locale;
  public Connection mainConnection; // if connection should not be shared between sessions, e.g. because transaction control is wished
  public IdManager idManager;
  public LoggedInUser loggedInUser;
  public boolean transformAmp;

  // stuff for servlet support:
  public String actionForPost;
  public String sessionId;
  public String contextPath;
  public EntitlementStd entitlement;
  public String applicationTitle;
  public MustMenuBar menuBar;
  public MustToolBar toolBar;
  public String imageDirectory;
  public Class<? extends Invokable> classToInvokeNext;
  public int stackPointer = -1;
  public int activityNbr = 0;
  public Layout layout;
  public String messageForNextDialog;
  public String urlToBePresentedInNewWindowNextDialog;
  public boolean sessionClosingRequested;
  public GeneralizedRequest request; // to access arbitrary info of the request

  // stuff for JSP support:
  public JspSessionStd jspSession;
  public JspButler lastRedirectingButler;
  public JspButler lastProvidedButler;
  private Hashtable<Integer, String> currentURITable = new Hashtable<Integer, String>();
  private Hashtable<Integer, String> previousURITable = new Hashtable<Integer, String>();
  public String loginJspName; // automaticly called if not null and user is not logged in 
  public String afterLoginJspName; 
  
  // individual stuff:
  public SessionDataAddOn sessionDataAddOn;

  /**
   * Constructs a new SessionData object.
   */
  public SessionData() {
  }

  /**
   * Constructs a new SessionData object with reference to a JSP sesssion.
   */
  public SessionData(JspSessionStd jspSession) {
    this.jspSession = jspSession;
  }

  /**
   * Returns the base URL, which includes post action plus session identifier.
   * @return the base URL
   */
  public String getBaseURL() {
    return actionForPost + "?Sess=" + sessionId;
  }

  /**
   * Returns the image directory.
   * @return the image directory
   */
  public String getImageDirectory() {
    return imageDirectory;
  }

  public boolean isMobile() {
    return userAgent.indexOf("iPhone") != -1
        || userAgent.indexOf("Android") != -1
    ; 
  }

  /**
   * Sets the session's resource bundle.
   * @param resourceBundle the session's resource bundle
   */
  public void setResourceBundle(ResourceBundle resourceBundle) {
    this.resourceBundle = resourceBundle;
  }

  /**
   * Returns the indiviudal application resource of the specified key, which has to be a string.
   * @param resourceKey the key of the resource to retrieve
   * @return the found resource
   */
  public String getResourceString(String resourceKey) {
    Logger.getInstance().debug(getClass(), "Looking for string resource " + resourceKey);
    try {
      String value = resourceBundle.getString(resourceKey);
      if (value == null) {
        Logger.getInstance().info(getClass(), "Couldn't find string resource " + resourceKey);
        value = "?" + resourceKey;
      }
      Logger.getInstance().debug(getClass(), "Returning " + value);
      return value;
    } catch (MissingResourceException mre) {
      Logger.getInstance().info(getClass(), "Couldn't find string resource " + resourceKey);
      Logger.getInstance().debug(getClass(), mre);
      return "??" + resourceKey;
    } catch (Exception e) {
      Logger.getInstance().info(getClass(), "Couldn't find string resource " + resourceKey);
      Logger.getInstance().debug(getClass(), e);
      return "???" + resourceKey;
    }
  }

  /**
   * Returns the framework resource of the specified key, which has to be a string.
   * @param resourceKey the key of the resource to retrieve
   * @return the found resource
   */
  public String getFrameworkResourceString(String resourceKey) {
    Logger.getInstance().debug(getClass(), "Looking for framework string resource " + resourceKey);
    try {
      String value = getFrameworkResourceBundle().getString(resourceKey);
      if (value == null) {
        Logger.getInstance().info(getClass(), "Couldn't find framework string resource " + resourceKey);
        value = "?" + resourceKey;
      }
      Logger.getInstance().debug(getClass(), "Returning " + value);
      return value;
    } catch (MissingResourceException mre) {
      Logger.getInstance().info(getClass(), "Couldn't find framework string resource " + resourceKey);
      Logger.getInstance().debug(getClass(), mre);
      return "??" + resourceKey;
    } catch (Exception e) {
      Logger.getInstance().info(getClass(), "Couldn't find framework string resource " + resourceKey);
      Logger.getInstance().debug(getClass(), e);
      return "???" + resourceKey;
    }
  }

  private ResourceBundle getFrameworkResourceBundle() {
    if (frameworkResourceBundle == null) {
      createFrameworkResourceBundle();
    }
    return frameworkResourceBundle;
  }
  
  /**
   * Forces the locale to be provided as specified, no matter where the session
   * is initialized from
	 * @param locale the forced locale
	 */
	public void forceLocale(Locale locale) {
    this.locale = locale;
    createFrameworkResourceBundle();
  }

  public void createFrameworkResourceBundle() {
    // Logger.getInstance().info(getClass(), "Got locale " + sessionData.locale + " in constructor of " + getClass().getName());
    // markupResource = ResourceBundle.getBundle("de.must.markup.Res", getLocale());
    // Logger.getInstance().info(getClass(), getLocale().getLanguage());
    // Logger.getInstance().info(getClass(), Locale.GERMAN);
    if (locale.getLanguage().equals(Locale.GERMAN.getLanguage())) {
      frameworkResourceBundle = new de.must.markup.Res_de_DE();
    } else {
      frameworkResourceBundle = new de.must.markup.Res();
    }
  }

  /**
   * Returns the connection to use.
   * @return the connection to use
   */
  public Connection getConnection() {
    return mainConnection;
  }

	/**
	 * Method sets the current URI.
	 * @param currentURI the current URI to set
   * @param windowNbr the number of the relevant window (window separating must be true)
	 */
	protected void setCurrentURI(String currentURI, int windowNbr) {
    if (currentURI != null) {
		  currentURITable.put(new Integer(windowNbr), currentURI);
    } else {
      currentURITable.remove(new Integer(windowNbr));
    }
	}

	/**
	 * Returns the current URI.
   * @param windowNbr the number of the relevant window (window separating must be true)
	 * @return the current URI
	 */
	public String getCurrentURI(int windowNbr) {
    Object currentURIObject = currentURITable.get(new Integer(windowNbr));
    if (currentURIObject == null) return null;
		return (String)currentURIObject;
	}

	/**
	 * Sets the previous URI.
	 * @param previousURI the previous URI to set
   * @param windowNbr the number of the relevant window (window separating must be true)
	 */
	protected void setPreviousURI(String previousURI, int windowNbr) {
    if (previousURI != null) {
      previousURITable.put(new Integer(windowNbr), previousURI);
    } else {
      previousURITable.remove(new Integer(windowNbr));
    }
	}

  /**
	 * Returns the previous URI.
	 * @param windowNbr the number of the relevant window (window separating must be true)
	 * @return the previous URI
	 */
	public String getPreviousURI(int windowNbr) {
    Object previouURIObject = previousURITable.get(new Integer(windowNbr));
    if (previouURIObject == null) return null;
    return (String)previouURIObject;
  }

  /**
   * Returns the IdManager to use.
   * @return the IdManager to use
   */
  public IdManager getIdManager() {
    return idManager;
  }

}
