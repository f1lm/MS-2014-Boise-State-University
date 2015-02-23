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

import java.io.*;
import java.util.*;
import java.text.SimpleDateFormat;
import javax.servlet.*;
import javax.servlet.http.*;

import de.must.io.Logger;

/**
 * Central servlet for all requests. It separates sessions from each
 * other and delegates the request to the appropriate Session object.
 * Inactive session will be removed.
 * @author Christoph Mueller
 */
public abstract class MainStd extends MustServlet {

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
    SessionStd currentSession = getCurrentSession(request);
    currentSession.handlePostOrGetWhatever(request, response);
    afterPostOrGet(currentSession);
  }

  private void afterPostOrGet(SessionStd currentSession) {
    if (currentSession.isToClose()) {
      Logger.getInstance().debug(getClass(), "Correctly closed session with Id " + currentSession.getSessionId() + " is going to be removed.");
      currentSession.destroy();
      sessions.remove(currentSession.getSessionId());
      System.gc();
    }
  }

  /**
   * Returns the current session of the request. If the session could not be
   * identified a new session is created.
   * @param request an HttpServletRequest object
   * @return the current session
   */
  public SessionStd getCurrentSession(GeneralizedRequest request) {
    String sessionId;
    SessionStd currentSession = null;
    sessionId = request.getParameter("Sess");
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
      try {
        // int randomInt = random.nextInt() * 99999;
        int randomInt = random.nextInt();
        if (randomInt < 0 ) randomInt = randomInt * -1;
        sessionId = Integer.toString(randomInt);
        Logger.getInstance().debug(getClass(), "creating new session with ID " + sessionId + " at " + dateFormat.format(now.getTime()) + " by MainStd Id " + hashCode());
        Logger.getInstance().debug(getClass(), "it's a guest from " + request.getStandardRequest().getRemoteAddr() + " / " + request.getStandardRequest().getRemoteHost() + " / " + request.getStandardRequest().getRemoteUser() +  " with locale " + request.getStandardRequest().getLocale() + " using " + request.getStandardRequest().getContextPath());
        Logger.getInstance().debug(getClass(), "User-Agent is " + request.getStandardRequest().getHeader("User-Agent"));
        currentSession = (SessionStd)getSessionClass().newInstance();
        // currentSession.setLocale(new Locale("en", "US")); // fake!
        currentSession.sessionData.userAgent = request.getStandardRequest().getHeader("User-Agent");
        String simagent = request.getParameter("simagent"); // simulate agent - test option
        if (simagent != null) currentSession.sessionData.userAgent = simagent;
        currentSession.setLocale(request.getStandardRequest().getLocale());
        currentSession.setContextPath(request.getStandardRequest().getContextPath());
        currentSession.setSessionId(sessionId);
        currentSession.buildAll();
        sessions.put(sessionId, currentSession);
      } catch (Exception e) {
        Logger.getInstance().error(getClass(), e);
      }
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
      try {
        Logger.getInstance().debug(getClass(), "creating new session . . .");
        currentSession = (SessionStd)getSessionClass().newInstance();
        sessions.put(sessionId, currentSession);
      } catch (Exception e) {
        Logger.getInstance().error(getClass(), e);
      }
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
  protected abstract Class<? extends SessionStd> getSessionClass();

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
