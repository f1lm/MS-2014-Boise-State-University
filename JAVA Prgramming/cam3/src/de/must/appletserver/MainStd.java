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

import java.io.*;
import java.util.*;
import java.text.SimpleDateFormat;
import javax.servlet.*;
import javax.servlet.http.*;

import de.must.applet.Constants;
import de.must.dataobj.DataObject;
import de.must.io.Logger;
import de.must.middle.GlobalStd;
import de.must.middle.Res;
import de.must.middle.Res_de_DE;

/**
 * Central servlet for all requests. It separates sessions from each
 * other and delegates the request to the appropriate Session object.
 * Inactive session will be removed.
 * @author Christoph Mueller
 */
public abstract class MainStd extends MustServlet {

  private ResourceBundle frameworkResourceBundleDe = new Res_de_DE();
  private ResourceBundle frameworkResourceBundleOther = new Res();
  private LoggedInUser loggedInUser;
  private Hashtable<String, SessionStd> sessions = new Hashtable<String, SessionStd>();
  private Random random = new Random(System.currentTimeMillis());
  private int previousNbrOfSessions = 0;
  private SimpleDateFormat dateFormat = new SimpleDateFormat();
  private Thread sessionKiller;

  /**
   * Constructs a new main servlet.
   */
  public MainStd() {
  }

  protected void handlePostOrGetWhatever(GeneralizedRequest request, HttpServletResponse response) throws IOException, ServletException {
    boolean delegateToSession = true;
    String sessionId = request.getParameter(Constants.SESSION);
    Locale locale = getForcedLocale();
    if (locale == null) {
      locale = request.getStandardRequest().getLocale();
    }
    if (sessionId == null) {
      getGlobal().createOrCheckConnections(); // new session, database connection could be closed meanwhile
      DataObject loginDataObject = getNewLoginDataObject(); // each session it's own login or login mandatory check object!
      if (loginDataObject != null && isLoginMandatory(loginDataObject)) {
        String user = (String)request.getParameter(Constants.USER_ID);
        String password = (String)request.getParameter(Constants.PASSWORD);
        // no, password in DB is encrypted! if (password != null) password = Crypt.decrypt(password); 
        if (MustServlet.UTF8) response.setContentType("text/html; charset=UTF-8");
        ToAppletWriter out = new ToAppletWriter(response.getWriter());
        if (user != null && password != null) {
          if ((loggedInUser = getLoggedInUser(loginDataObject, user, password)) != null) {
            out.sendTodoAction(Constants.INITITIAL_STATE_AFTER_LOGIN);
          } else {
            out.setMessageToKeep(getFrameworkResourceString("TEXT_USER_OR_PASSWORD_INVALID", locale));
            out.sendTodoAction(Constants.PEFORM_LOGIN);
            delegateToSession = false;
          }
        } else {
          out.sendTodoAction(Constants.PEFORM_LOGIN);
          delegateToSession = false;
        }
      }
    }
    if (delegateToSession) {
      SessionStd currentSession = getCurrentSession(sessionId, request);
      currentSession.handlePostOrGetWhatever(request, response);
      afterPostOrGet(currentSession);
    }
  }
  
  private String getFrameworkResourceString(String key, Locale locale) {
    if (locale.getLanguage().equals(Locale.GERMAN.getLanguage())) {
      return frameworkResourceBundleDe.getString(key);
    } else {
      return frameworkResourceBundleOther.getString(key);
    }
  }

  private void afterPostOrGet(SessionStd currentSession) {
    if (currentSession.isToClose()) {
      Logger.getInstance().debug(getClass(), "Correctly closed session with Id " + currentSession.getSessionId() + " is going to be removed.");
      currentSession.destroy();
      sessions.remove(currentSession.getSessionId());
      System.gc();
    }
  }

  protected Locale getForcedLocale() {
    return null;
  }
  
  /**
   * Returns the application's global objects class.
   */
  protected abstract GlobalStd getGlobal();

 /**
   * Return new data object used for login. This is called each first request
   * (without parameter session id).
   * If no login is required, null should be returned.
   * @return a new data object used for login
   */
  protected abstract DataObject getNewLoginDataObject();
  protected abstract boolean isLoginMandatory(DataObject loginDataObject);
  protected abstract LoggedInUser getLoggedInUser(DataObject loginDataObject, String user, String password);

  /**
   * Returns the current session of the request. If the session could not be
   * identified a new session is created.
   * @param request an HttpServletRequest object
   * @return the current session
   */
  public SessionStd getCurrentSession(String sessionId, GeneralizedRequest request) {
    SessionStd currentSession = null;
    Calendar now = new GregorianCalendar();
    if (sessionId != null) {
      currentSession = (SessionStd)sessions.get(sessionId);
      if (currentSession == null) {
        Logger.getInstance().debug(getClass(), "session " + sessionId + " is no longer available");
      } else if (currentSession.isOld()) {
        Logger.getInstance().debug(getClass(), "session " + sessionId + " is available. Anyway we don't use it because it's too old.");
        currentSession.destroy();
        sessions.remove(sessionId);
      }
    }
    if (currentSession == null) {
      int randomInt = random.nextInt();
      if (randomInt < 0 ) randomInt = randomInt * -1;
      sessionId = Integer.toString(randomInt);
      Logger.getInstance().debug(getClass(), "creating new session with ID " + sessionId + " at " + dateFormat.format(now.getTime()) + " by MainStd Id " + hashCode());
      Logger.getInstance().debug(getClass(), "it's a guest from " + request.getStandardRequest().getRemoteAddr() + " / " + request.getStandardRequest().getRemoteHost() + " / " + request.getStandardRequest().getRemoteUser() +  " with locale " + request.getStandardRequest().getLocale() + " using " + request.getStandardRequest().getContextPath());
      currentSession = getNewSession();
      currentSession.sessionData.loggedInUser = loggedInUser;
      Locale locale = getForcedLocale();
      if (locale == null) {
        locale = request.getStandardRequest().getLocale();
      }
      if (locale.getLanguage().equals(Locale.GERMAN.getLanguage())) {
        currentSession.sessionData.frameworkTextResource = frameworkResourceBundleDe;
      } else {
        currentSession.sessionData.frameworkTextResource = frameworkResourceBundleOther;
      }
      currentSession.sessionData.setLocale(locale);
      currentSession.sessionData.setRealPath(request.getStandardRequest().getSession().getServletContext().getRealPath("/"));
      currentSession.setContextPath(request.getStandardRequest().getContextPath());
      currentSession.setSessionId(sessionId);
      currentSession.buildAll();
      sessions.put(sessionId, currentSession);
    }
    killOldSessionsExcept(currentSession);
    if (previousNbrOfSessions != sessions.size()) {
      Logger.getInstance().debug(getClass(), "current number of active sessions: " + sessions.size());
      previousNbrOfSessions = sessions.size();
    }
    Logger.getInstance().debug(getClass(), now.get(Calendar.HOUR_OF_DAY) + ":" + now.get(Calendar.MINUTE) + ":" + now.get(Calendar.SECOND) + " / ");
    return currentSession;
  }

  /**
   * Returns the current session of the request by using cookies.
   * If the session could not be identified a new session is created.
   * @param request an HttpServletRequest object
   * @return the current session
   */
  public SessionStd getCurrentSessionByCookie(GeneralizedRequest request) {
    Logger.getInstance().debug(getClass(), "want to know HttpSession");
    HttpSession httpSession = request.getStandardRequest().getSession();
    Logger.getInstance().debug(getClass(), "want to know HttpSession ID");
    String sessionId = httpSession.getId();
    SessionStd currentSession = (SessionStd)sessions.get(sessionId);
    if (currentSession == null) {
      Logger.getInstance().debug(getClass(), "creating new session . . .");
      currentSession = getNewSession();
      sessions.put(sessionId, currentSession);
    }
    killOldSessionsExcept(currentSession);
    if (previousNbrOfSessions != sessions.size()) {
      Logger.getInstance().debug(getClass(), "current number of active sessions: " + sessions.size());
      previousNbrOfSessions = sessions.size();
    }
    return currentSession;
  }

  /**
   * Returns the session class to use.
   */
  protected abstract SessionStd getNewSession();

  private void killOldSessionsExcept(SessionStd sessionToKeep) {
    if (sessionKiller == null) {
      final SessionStd finalSessionToKeep = sessionToKeep;
      Runnable killRun = new Runnable() {
        public void run() {
          int killCounter = 0;
          Enumeration<String> keyEnum = sessions.keys();
          Enumeration<? extends SessionStd> sessionEnum = sessions.elements();
          while (keyEnum.hasMoreElements() & sessionEnum.hasMoreElements()) {
            Object keyEnumElement = keyEnum.nextElement();
            Object sessionEnumElement = sessionEnum.nextElement();
            SessionStd watchedSession = (SessionStd)sessionEnumElement;
            if (!watchedSession.equals(finalSessionToKeep) && watchedSession.seemsToBeUnused()) {
              Logger.getInstance().debug(getClass(), "Removing session with Id " + watchedSession.getSessionId());
              watchedSession.destroy();
              sessions.remove(keyEnumElement);
              killCounter++;
            }
          }
          if (killCounter > 0) {
            System.gc();
          }
          sessionKiller = null;
        }
      };
      sessionKiller = new Thread(killRun);
      sessionKiller.start();
    }
  }

}
