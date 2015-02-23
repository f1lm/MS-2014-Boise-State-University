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
import de.must.appletserver.SessionData.Report;
import de.must.dataobj.ConnectionPoolExhaustedException;
import de.must.io.Logger;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;

/**
 * Image of the session with its dialog stack. Each dialog is represented by an
 * Remotable. When the session is reused, the current Remotable is asked to
 * check the request; it will induce among others stack movements to previous or
 * new dialog steps.
 * Remotable objects are created as singletons and are kept until the stack
 * place is used by another object.
 * @author Christoph Mueller
 */
public abstract class SessionStd {

  private int secondsForUnusedSessions = 600;
  private static final int secondsForOldSession = 3600;
  private static boolean separateConnections = false;

  /**
   * Determines whether each session should use its own database connection or not.
   * Should be set to true, if commit / rollback is to be used.
   * @param separateConnections whether each session should use its own database connection or not
   */
  public static void setUseSeperateConnectionsForEachSession(boolean newSeparateConnections) {
    separateConnections = newSeparateConnections;
  }

  protected SessionData sessionData;
  private long lastUseInSeconds;
  private boolean toClose = false;
  private boolean destroyed = false;
  private boolean menuBuild = false;

  /**
   * Constructs a new session.
   */
  public SessionStd() {
    Logger.getInstance().debug(getClass(), "Constructing Session");
    sessionData = createSessionData();
  }
  
  protected void connectToDb() {
    getGlobal().createOrCheckConnections();
    if (separateConnections) {
      try {
        sessionData.mainConnection = getGlobal().getPrivateConnection();
      } catch (ConnectionPoolExhaustedException e) {
        de.must.io.Logger.getInstance().info(getClass(), "Connection pool exhausted. Using shared connection");
        sessionData.mainConnection = getGlobal().getMainConnection();
      }
    } else {
      sessionData.mainConnection = getGlobal().getMainConnection();
    }

  }
  
  /**
   * Constructs session data.
   * Override to assign session data with additional fields for the specific application.
   * @return session data
   */
  protected SessionData createSessionData() {
    return new SessionData();
  }

  /**
   * Set the interval to treat a session as unused. 
   * @param secondsForUnusedSessions the interval to treat a session as unused
   */
  public void setSecondsForUnusedSessions(int secondsForUnusedSessions) {
    this.secondsForUnusedSessions = secondsForUnusedSessions;
  }

  /**
   * Returns the application's global objects class.
   */
  protected abstract de.must.middle.GlobalStd getGlobal();

  /**
   * Sets the context path.
   * @param contextPath the context path
   */
  public void setContextPath(String contextPath) {
    sessionData.contextPath = contextPath;
  }

  /**
   * Returns the context path.
   * @return the context path
   */
  public String getContextPath() {
    return sessionData.contextPath;
  }

  /**
   * Sets the session's id
   * @param sessionId the session's id
   */
  public void setSessionId(String sessionId) {
    sessionData.sessionId = sessionId;
  }

  /**
   * Returns the session's id
   * @return the session's id
   */
  public String getSessionId() {
    return sessionData.sessionId;
  }

  /**
   * Called from MainStd after instantiating the session to build things in
   * arbitrary sequence.
   */
  public void buildAll() {
    connectToDb();
    // opportunity to build standard staff
    build(sessionData); // opportunity to build individual staff
    // opportunity to build standard staff
  }

  /**
   * Build part to be done by the individual session object.
   * @param sessionData the session's public data
   */
  protected abstract void build(SessionData sessionData);

  protected void handlePostOrGetWhatever(GeneralizedRequest request,
                     HttpServletResponse response)
    throws IOException, ServletException {
    setLastUse();
    sessionData.request = request; // to access arbitrary info of the request
    // to make the context available in early phases like e.g. construction of objects:
    getGlobal().contextPath = request.getStandardRequest().getContextPath();
    String appletCodebase = (String)request.getParameter(Constants.APPLET_CODEBASE);
    if (appletCodebase != null) sessionData.appletCodebase = appletCodebase; // one time sufficient
    String charsetName = (String)request.getParameter(Constants.CHARSET);
    if (charsetName != null) sessionData.clientCharset = charsetName; // one time sufficient
    String htmlDialogId = request.getParameter(Constants.HTML_DIALOG_ID);
    sessionData.action = (String)request.getParameter(Constants.ACTION);
    sessionData.actionSource = (String)request.getParameter(Constants.ACTION_SOURCE);
    sessionData.focusElementId = (String)request.getParameter(Constants.FOCUS_ELEMENT_ID);
    sessionData.tabOrWinIdByApplet = (String)request.getParameter(Constants.TAB_OR_WINDOW_ID);
    if (sessionData.tabOrWinIdByApplet != null) {
      sessionData.tabIdsToBuild.add(sessionData.tabOrWinIdByApplet);
    }
    if (MustServlet.UTF8) response.setContentType("text/html; charset=UTF-8");
    else response.setContentType("text/html");
    ToAppletWriter out = new ToAppletWriter(response.getWriter());
    sessionData.curOut = out;
    if (Constants.ACTION_LOGOUT.equals(sessionData.action)) {
      sessionData.logoutRequested = true;
    }
    if (htmlDialogId != null) {
      HTMLDialog htmlD = sessionData.openHTMLDialogs.get(htmlDialogId);
      if (htmlD != null) {
        if (htmlD.isBuildDone()) {
          htmlD.fetchValuesFromRequest(request);
          htmlD.process(request);
        }
        htmlD.buildRemoteView(out);
      } else {
        out.println("Site not valid any more.");
      }
      return;
    } else if (sessionData.currentDialog != null) {
      sessionData.currentDialog.fetchValuesFromRequest(request);
      sessionData.currentDialog.process(request);
    } else {
      if (sessionData.menuBar != null) sessionData.menuBar.fetchValuesFromRequest(request);
      if (sessionData.toolBar != null) sessionData.toolBar.fetchValuesFromRequest(request);
      if (sessionData.tabOrWinIdByApplet != null) {
        RemoteUserInterface remDlg = sessionData.uis.get(sessionData.tabOrWinIdByApplet);
        if (Constants.ACTION_CLOSE_TAB.equals(sessionData.action)) {
          if (remDlg != null) {
            remDlg.fetchValuesFromRequest(request);
            if (remDlg instanceof MajorRemoteUserInterface
              && !((MajorRemoteUserInterface)remDlg).isClosingAllowed()
            ) {
              out.sendVeto(getTranslation("TEXT_SAVE_OR_CANCEL"));
            } else {
              sessionData.uis.remove(sessionData.tabOrWinIdByApplet);
              sessionData.tabIdsToBuild.remove(sessionData.tabOrWinIdByApplet);
            }
          }
        } else {
          if (remDlg != null) {
            remDlg.fetchValuesFromRequest(request);
            remDlg.process(request);
          }
        }
      }
    }
    Iterator<RemoteUserInterface> ruiIterator = sessionData.windows.iterator();
    while (ruiIterator.hasNext()) {
      RemoteUserInterface rui = ruiIterator.next();
      if (rui.isVisible()) {
        rui.fetchValuesFromRequest(request);
        rui.process(request);
      }
    }
    sessionData.transactionCounter++;
    out.println(Constants.SESSION_BEGIN_TAG + sessionData.sessionId + Constants.SESSION_END_TAG);
    if (sessionData.logoutRequested) {
      toClose = true;
      out.sendTodoAction(Constants.FINALIZE);
      return;
    }
    if (!menuBuild) {
      out.println(Constants.ACTION_BEGIN_TAG);
      out.println(Constants.TODO_TAG_BEGIN + Constants.SET_SECONDS_BEFORE_AUTOMATIC_LOGOUT + Constants.TODO_TAG_END);
      out.println(Constants.FIELD_LENGTH_BEGIN + secondsForUnusedSessions + Constants.FIELD_LENGTH_END);
      out.println(Constants.ACTION_END_TAG);
      if (sessionData.menuBar != null) sessionData.menuBar.buildRemoteView(out);
      if (sessionData.toolBar != null) sessionData.toolBar.buildRemoteView(out);
      menuBuild = true;
    }
    Iterator<String> tabIterator = sessionData.tabIdsToBuild.iterator();
    while (tabIterator.hasNext()) {
      String tabIdToBuild = tabIterator.next();
      RemoteUserInterface rui = sessionData.uis.get(tabIdToBuild);
      if (rui != null && rui.isVisible()) { // null if rui is dialog, not tab for example
        rui.buildRemoteView(out);
      }
    }
    sessionData.tabIdsToBuild.clear();
    // --------------------------------------------------
    ruiIterator = sessionData.windows.iterator();
    while (ruiIterator.hasNext()) {
      RemoteUserInterface rui = ruiIterator.next();
      if (rui.isVisible()) {
        rui.buildRemoteView(out);
      }
    }
    if (sessionData.threadToDo != null) {
      ((ProportionalListReportDirectly)sessionData.threadToDo).start(out);
      sessionData.threadToDo = null;
    }
    Iterator<Report> iterator2 = sessionData.newReports.iterator();
    while (iterator2.hasNext()) {
      Report report = iterator2.next();
      out.open(report);
    }
    sessionData.newReports.clear();
    if (sessionData.newHTMLDialog != null) {
      out.open(sessionData.openHTMLDialogs.get(sessionData.newHTMLDialog));
      sessionData.newHTMLDialog = null;
    }
    // --------------------------------------------------
    if (sessionData.toUpdate != null) {
      Iterator<Updatable> updIterator = sessionData.toUpdate.iterator();
      while (updIterator.hasNext()) {
        Updatable updatable = updIterator.next();
        updatable.updateRemoteView(out);
      }
      sessionData.toUpdate = null;
    }
    if (sessionData.pendingInfosToPresent != null && sessionData.pendingInfosToPresent.size() > 0) {
      if (sessionData.pendingInfosToPresent.firstElement().getSoundToPlay() != null) {
        out.setSoundToPlay(sessionData.pendingInfosToPresent.firstElement().getSoundToPlay());
      }
      out.openInfoDialog(sessionData.pendingInfosToPresent.firstElement());
      sessionData.pendingInfosToPresent.remove(0);
    }
    // --------------------------------------------------
    // dialog at the end - after everything is created - dialog may cause new server contact!
    if (sessionData.currentDialog != null) {
      if (sessionData.previousDialogToClose != null) {
        out.sendConcerning(sessionData.previousDialogToClose.getConcerning());
        out.setVisible(sessionData.previousDialogToClose.getTabId(), false);
        sessionData.previousDialogToClose = null;
      }
      sessionData.currentDialog.buildRemoteView(out);
    }
    // --------------------------------------------------
    sendNextOutputs(out);
  }
  
  private void sendNextOutputs(ToAppletWriter out) {
    Iterator<String> iterator = sessionData.nextOutputs.iterator();
    while (iterator.hasNext()) {
      out.println(iterator.next());
    }
    sessionData.nextOutputs.clear();
  }

  protected boolean specialHandling(GeneralizedRequest request) {
    return false;
  }
  
  /**
   * Returns true if the session is to close.
   * @return true if the session is to close
   */
  public boolean isToClose() {
    return toClose;
  }

  private void setLastUse() {
    lastUseInSeconds = System.currentTimeMillis() / 1000;
  }

  private long getLastUse() {
    return lastUseInSeconds;
  }

  /**
   * Returns true if this session seems to be unused.
   * @return true if this session seems to be unused
   */
  public boolean seemsToBeUnused() {
    return (System.currentTimeMillis() / 1000 - lastUseInSeconds > (secondsForUnusedSessions + 20)); // the client counter may start later, don't kill the session while client seems to be alive for the end user
  }

  /**
   * Returns true if this session is old.
   * Why do we check this? We do not kill a one and only session even if it seems to be unused.
   * But MySQL loves to renew connections once a day. Therefore, an old session might have open 
   * tables with connection no longer valid.
   * @return true if this session is old
   */
  public boolean isOld() {
    return (System.currentTimeMillis() / 1000 - lastUseInSeconds > secondsForOldSession);
  }

  private void startEndOfSession() {
    toClose = true;
    if (separateConnections) {
      getGlobal().takeBackConnection(sessionData.mainConnection);
    }
  }

  /**
   * Destroy this object in order to free resources and weak references more early than
   * garbage collector.
   */
  public void destroy() {
    if (destroyed) return; // already done - thus, we don't have to carefully avoid multiple calls
    free();
    destroyed = true;
  }
  
  /**
   * Frees (releases) references caused by this frame, particularly static 
   * register entries. To be called via destroy() to prevent multiple call.
   * Override it to do additional releases and don't forget to call 
   * super.free() at the end.
   * @see #destroy()
   */
  protected void free() {
    sessionData.uis.clear();
    sessionData.tabIdsToBuild.clear();
    deleteDirectory(new File(sessionData.getSessionTempDir()));
  }
  
  private void deleteDirectory(File directory) {
    for (File file : directory.listFiles()) {
      if (file.isDirectory()) {
        deleteDirectory(file);
      } else {
        file.delete();
      }
    }
    directory.delete();
  }

  protected String getTranslation(String resourceKey) {
    return sessionData.getFrameworkResourceString(resourceKey);
  }
  
  /**
   * Called by the garbage collector on an object when garbage collection
   * determines that there are no more references to the object.
   */
  protected void finalize() throws Throwable {
    if (separateConnections && toClose == false) { // has not yet been given back
      getGlobal().takeBackConnection(sessionData.mainConnection);
    }
    Logger.getInstance().debug(getClass(), "finalize called in " +  getClass().getName());
    super.finalize();
  }

}
