/*
 * Copyright (c) 2011-2012 Christoph Mueller. All rights reserved.
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

package de.must.appletserver;

import de.must.applet.Constants;
import de.must.dataobj.IdManager;
import de.must.dataobj.DataObjectConstructionDetails;
import de.must.middle.ConversationMatter;
import de.must.middle.EntitlementStd;
import de.must.util.Callback;

import java.io.File;
import java.lang.ref.WeakReference;
import java.sql.Connection;
import java.util.*;

/**
 * Container to share data between Session and Remotables.
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
  
  public class Report {
    public String reportPath;
    public int openDelay;
    public Report (String reportPath) {
      this(reportPath, 0);
    }
    public Report (String reportPath, int openDelay) {
      this.reportPath = reportPath;
      this.openDelay = openDelay;
    }
  }
  
  public class ConditionalCallback {
    public String criteria;
    public WeakReference<Callback> callback;
    public ConditionalCallback(String criteria, Callback callback) {
      this.criteria = criteria;
      this.callback = new WeakReference<Callback>(callback);
    }
    /**
     * Call back if criteria fits.
     * @param criteria the criteria to check
     * @return true if weak object is still existing 
     */
    public boolean callbackConditionally(String criteria) {
      Object callbackObj = callback.get();
      if (callbackObj == null) {
        return false;
      }
      if (this.criteria.equals(criteria)) {
        ((Callback)callbackObj).callback();
      }
      return true;
    }
  }

  public ResourceBundle frameworkTextResource;
  private Locale locale;
  public Hashtable<String, RemoteUserInterface> uis;
  public RemoteUserInterface currentDialog;
  public RemoteUserInterface previousDialogToClose;
  public Vector<RemoteUserInterface> windows;
  public ProportionalListReportDirectly threadToDo;
  /** the tab ID/label or window id/title send by applet / identified by request.getParameter */
  public String tabOrWinIdByApplet;
  public Vector<String> tabIdsToBuild;
  public Vector<Report> newReports;
  public Vector<ConversationMatter> pendingInfosToPresent;
  public Hashtable<String, HTMLDialog> openHTMLDialogs;
  public String newHTMLDialog;
  public int transactionCounter = 0;
  public Connection mainConnection; // if connection should not be shared between sessions, e.g. because transaction control is wished
  public IdManager idManager;
  public LoggedInUser loggedInUser;
  public boolean transformAmp;

  public String appletCodebase;
  public String sessionId;
  public String clientCharset;
  public String action;
  public String actionSource;
  public String focusElementId;
  public String realPath;
  public String contextPath;
  public EntitlementStd entitlement;
  public MustMenuBar menuBar;
  public MustToolBar toolBar;
  public GeneralizedRequest request; // to access arbitrary info of the request
  public Vector<String> nextOutputs;
  public boolean logoutRequested;
  public ToAppletWriter curOut;
  /** The first level context criterion at server object construction time: the tab id or title of a window */
  public String currentTitle;
  /** The second level context criterion at server object construction time: @see Constants#SEARCH_LIST_DETAIL_GUI */
  public String currentConcerning;
  /** The third level context criterion at server object construction time: @see Constants#SEARCH @see Constants#LIST @see Constants#DETAIL */
  public String currentConcerningSubLevel;
  public Vector<Updatable> toUpdate;

  private static Vector<WeakReference<Callback>> tableChangeCallbacks;
  private static Vector<ConditionalCallback> tableChangeCondCallbacks;

  /**
   * Constructs a new SessionData object.
   */
  public SessionData() {
    uis = new Hashtable<String, RemoteUserInterface>();
    windows = new Vector<RemoteUserInterface>();
    tabIdsToBuild = new Vector<String>();
    nextOutputs = new Vector<String>();
    newReports = new Vector<Report>();
    openHTMLDialogs = new Hashtable<String, HTMLDialog>();
  }

  public void setLocale(Locale locale) {
    this.locale = locale;
  }

  public Locale getLocale() {
    return locale;
  }

  public void register(RemoteUserInterface rui) {
    uis.put(rui.getTabId(), rui);
  }
  
  public void removeDataTableAdministration(DataTableAdministration table) {
    uis.remove(table.getTabId());
    tabIdsToBuild.remove(table.getTabId());
  }
  
  public void removeAll() {
//    Enumeration<RemoteUserInterface> enumeration = uis.elements();
//    while (enumeration.hasMoreElements()) {
//      RemoteUserInterface remoteDialog = enumeration.nextElement();
//      if (!remoteDialog.isClosingAllowed()) {
//        return;
//      }
//    }
    uis.clear();
    tabIdsToBuild.clear();
    nextOutputs.add(Constants.ACTION_BEGIN_TAG);
    nextOutputs.add(Constants.TODO_TAG_BEGIN + Constants.REMOVE_ALL_TABS + Constants.TODO_TAG_END);
    nextOutputs.add(Constants.ACTION_END_TAG);
    Runtime.getRuntime().gc();
  }
  
  public void addRemoteElementToUpdate(Updatable remEle) {
    if (toUpdate == null) toUpdate = new Vector<Updatable>();
    toUpdate.add(remEle);
  }
  
  /**
   * Adds a conversation matter to present remotely.
   * @param matter the conversation matter to present
   */
  public void addInfoToPresent(ConversationMatter matter) {
    if (pendingInfosToPresent == null) pendingInfosToPresent = new Vector<ConversationMatter>();
    pendingInfosToPresent.add(matter);
  }
  
  /**
   * Returns the framework resource of the specified key, which has to be a string.
   * @param resourceKey the key of the resource to retrieve
   * @return the found resource
   */
  public String getFrameworkResourceString(String resourceKey) {
    de.must.io.Logger.getInstance().debug(getClass(), "Looking for framework string resource " + resourceKey);
    try {
      String value = (String)getFrameworkTextResource().getObject(resourceKey);
      if (value == null) {
        de.must.io.Logger.getInstance().info(getClass(), "Couldn't find framework string resource " + resourceKey);
        value = "?" + resourceKey;
      }
      de.must.io.Logger.getInstance().debug(getClass(), "Returning " + value);
      return value;
    } catch (MissingResourceException mre) {
      de.must.io.Logger.getInstance().info(getClass(), "Couldn't find framework string resource " + resourceKey);
      de.must.io.Logger.getInstance().debug(getClass(), mre);
      return "??" + resourceKey;
    } catch (Exception e) {
      de.must.io.Logger.getInstance().info(getClass(), "Couldn't find framework string resource " + resourceKey);
      de.must.io.Logger.getInstance().debug(getClass(), e);
      return "???" + resourceKey;
    }
  }

  private ResourceBundle getFrameworkTextResource() {
    return frameworkTextResource;
  }
  
  public void setRealPath(String realPath) {
    this.realPath = realPath;
    if (!this.realPath.endsWith("/") && !this.realPath.endsWith("\\")) this.realPath +=  + File.separatorChar;
  }
  
  public String getRealPath() {
    return realPath;
  }

  /**
   * Creates the session's temporary directory and returns it.
   * @return the session's temporary directory
   */
  public String getSessionTempDir() {
    String result = realPath + "temp" + File.separatorChar + sessionId;
    File outputDir = new File(result);
    outputDir.mkdirs();
    return result;
  }

  /**
   * Returns the connection to use.
   * @return the connection to use
   */
  public Connection getConnection() {
    return mainConnection;
  }

  /**
   * Returns the IdManager to use.
   * @return the IdManager to use
   */
  public IdManager getIdManager() {
    return idManager;
  }
  
  public void callIfTableContentHasBeenChanged(String tableName, Callback callback) {
    if (tableChangeCondCallbacks == null) {
      tableChangeCondCallbacks = new Vector<ConditionalCallback>();
    }
    tableChangeCondCallbacks.add(new ConditionalCallback(tableName, callback));
  }
  
  public void iChangendTableContent(String tableName) {
    if (tableChangeCondCallbacks != null) {
      Vector<ConditionalCallback> condCallbToRemove = null;
      Iterator<ConditionalCallback> iterator = tableChangeCondCallbacks.iterator();
      while (iterator.hasNext()) {
        ConditionalCallback conditionalCallback = iterator.next();
        if (!conditionalCallback.callbackConditionally(tableName)) {
          if (condCallbToRemove == null) {
            condCallbToRemove = new Vector<ConditionalCallback>();
            condCallbToRemove.add(conditionalCallback);
          }
        }
      }
      if (condCallbToRemove != null) {
        Iterator<ConditionalCallback> removeIterator = condCallbToRemove.iterator();
        while (iterator.hasNext()) {
          tableChangeCondCallbacks.remove(removeIterator.next());
        }
      }
    }
  }

}
