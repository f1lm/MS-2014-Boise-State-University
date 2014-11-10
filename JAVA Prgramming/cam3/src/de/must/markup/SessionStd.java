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

import de.must.dataobj.ConnectionPoolExhaustedException;
import de.must.io.Logger;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.lang.reflect.Constructor;
import java.util.*;

/**
 * Image of the session with its dialog stack. Each dialog is represented by an
 * Invokable. When the session is reused, the current Invokable is asked to
 * check the request; it will induce among others stack movements to previous or
 * new dialog steps.
 * Invokable objects are created as singletons and are kept until the stack
 * place is used by another object.
 * @author Christoph Mueller
 */
public abstract class SessionStd {

  private static final int secondsForUnusedSessions = 300;
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

  protected SessionData sessionData = new SessionData();
  private long lastUseInSeconds;
  private int stackSize = 20;
  private Invokable[] stack = new Invokable[stackSize];
  private boolean firstGet = true;
  private boolean toClose = false;
  private boolean destroyed = false;

  /**
   * Constructs a new session.
   * @param actionForPost the action for the post operation, which is typically
   * the one and only servlet class, e.g. "de.jugs.cookbook.Main"
   * @param applicationTitle the title of the application
   */
  public SessionStd(String actionForPost, String applicationTitle) {
    Logger.getInstance().debug(getClass(), "Constructing Session");
    sessionData.global = getGlobal();
    sessionData.actionForPost = actionForPost;
    sessionData.applicationTitle = applicationTitle;
    getGlobal().createOrCheckConnections();
    if (separateConnections) {
			try {
				sessionData.mainConnection = getGlobal().getPrivateConnection();
			} catch (ConnectionPoolExhaustedException e) {
				Logger.getInstance().info(getClass(), "Connection pool exhausted. Using shared connection");
				sessionData.mainConnection = getGlobal().getMainConnection();
			}
    } else {
      sessionData.mainConnection = getGlobal().getMainConnection();
    }
  }

  /**
   * Returns the application's global objects class.
   */
  protected abstract de.must.middle.GlobalStd getGlobal();

  /**
   * Sets the locale of the session.
   * @param locale the locale of the session
   */
  public void setLocale(Locale locale) {
    sessionData.locale = locale;
  }

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
    sessionData.global.contextPath = request.getStandardRequest().getContextPath();
    if (firstGet) { // Yes, the first "GET" may be a "POST"! The browser cache does it!
      firstGet = false;
    } else { // not first get
      // update object`s values from parameters if it is the right dialog
      if (!stack[sessionData.stackPointer].isSuitableDialog(request)
      && request.getParameter("TBA") == null /* tool bar action */  ) {
        int index = sessionData.stackPointer;
        boolean suitable = false; // let's look for a previous suitable dialog in stack, maybe user used browser back functionality
        while (index > 0 && !(suitable = stack[--index].isSuitableDialog(request))) {}
        if (suitable) {
          sessionData.stackPointer = index;
        } else {
          sessionData.messageForNextDialog = sessionData.getFrameworkResourceString("TEXT_PAGE_NOT_VALID");
          sessionData.stackPointer = 0; // go to initial page
          writeOutput(request, response);
          return;
        }
      }
    }
    stack[sessionData.stackPointer].fetchValuesFromRequest(request);
    if (isToolBarCloseRequest(request)) { // check toolbar option close
      if (stack[sessionData.stackPointer].isCancelable()) {
        startEndOfSession();
        writeGoodByeOutput(request, response);
        return;
      } else {
        sessionData.messageForNextDialog = sessionData.getFrameworkResourceString("TEXT_SAVE_OR_CANCEL_YOUR_MODIFICATIONS");
        writeOutput(request, response);
        return;
      }
    }
    // check other toolbar options
    Class<? extends Invokable> requestedToolBarClass = getToolBarClass(request);
    if (requestedToolBarClass != null) {
      Logger.getInstance().debug(getClass(), "Requested from toolbar: " + requestedToolBarClass);
      Logger.getInstance().debug(getClass(), "isCancelable(): " + stack[sessionData.stackPointer] + (stack[sessionData.stackPointer].isCancelable()));
      if (stack[sessionData.stackPointer].isCancelable()) {
        invokeToolBarClass(requestedToolBarClass);
        writeOutput(request, response);
        return;
      } else {
        sessionData.messageForNextDialog = sessionData.getFrameworkResourceString("TEXT_SAVE_OR_CANCEL_YOUR_MODIFICATIONS");
        writeOutput(request, response);
        return;
      }
    }
    // handle regular form submission
    stack[sessionData.stackPointer].process(request);
    if (sessionData.sessionClosingRequested) {
      startEndOfSession();
      writeGoodByeOutput(request, response);
      return;
    }
    Logger.getInstance().debug(getClass(), "stackMovement: " + stack[sessionData.stackPointer].getStackMovement());
    handleStackMovement();
    writeOutput(request, response);
  }

  private boolean isToolBarCloseRequest(GeneralizedRequest request) {
    if (request.getParameter(Dialog.NAME_FOR_CLOSE_ACTION) != null) return true; // POST variant (button)
    String toolBarAction = request.getParameter("TBA");
    if (toolBarAction != null && toolBarAction.equals(Dialog.NAME_FOR_CLOSE_ACTION)) return true; // GET variant (image)
    return false;
  }

  /**
   * Returns true if the session is to close.
   * @return true if the session is to close
   */
  public boolean isToClose() {
    return toClose;
  }

  private Class<? extends Invokable> getToolBarClass(GeneralizedRequest request) {
    Class<? extends Invokable> toolBarClassToInvoke = sessionData.toolBar.getActionClass(request);
    Logger.getInstance().debug(getClass(), "Found toolBarClass: " + toolBarClassToInvoke);
    return toolBarClassToInvoke;
  }

  private void invokeToolBarClass(Class<? extends Invokable> toolBarClassToInvoke) {
    Logger.getInstance().debug(getClass(), "toolBarClassToInvoke: " + toolBarClassToInvoke);
    if (toolBarClassToInvoke != null) {
      if (toolBarClassToInvoke.equals(Back.class)) {
        Logger.getInstance().debug(getClass(), "toolBar back request");
        if (sessionData.stackPointer > 0 ) sessionData.stackPointer--;
      }
      else try {
        Invokable invokable = getOrCreateInvokable(toolBarClassToInvoke);
        if (stack[0].getClass().equals(toolBarClassToInvoke)) {
          sessionData.stackPointer = 0;
          for (int i = 1; i < stack.length; i++) {
            stack[i] = null; // don't reuse dialogs when user requested first page - dialog may be filled with values that are nor longer relevant
          }
        } else {
          sessionData.stackPointer = 1;
        }
        invoke(invokable);
      } catch (Exception e) {
        Logger.getInstance().error(getClass(), e);
      }
    }
  }

  private void handleStackMovement() {
    Invokable invokable;
    Logger.getInstance().debug(getClass(), "handling Stack Movement ..." );
    int movement = stack[sessionData.stackPointer].getStackMovement();
    switch (movement) {
    case -1:
      backInvoke();
      break;
    case 0:
      break;
    case 1:
      invokable = getOrCreateInvokable(sessionData.classToInvokeNext);
      Logger.getInstance().debug(getClass(), "invokable: " + invokable);
      if (invokable != null) {
        subInvoke(invokable);
      }
      break;
    case 99: // replace root and put classToInvokeNext at its place
      baseInvoke(sessionData.classToInvokeNext);
      break;
    default:
      if (movement < 1) {
        backInvoke(movement * -1);
      }
      else Logger.getInstance().info(getClass(), "stack movement not supported: " + movement);
      break;
    }
  }

  private void writeOutput(GeneralizedRequest request,
                           HttpServletResponse response)
    throws IOException, ServletException {
    if (MustServlet.UTF8) response.setContentType("text/html; charset=UTF-8");
    else response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    sessionData.dialogNbr++;
    stack[sessionData.stackPointer].beforeOutput();
    out.println(sessionData.layout.getTagSequence(sessionData, stack[sessionData.stackPointer]));
    stack[sessionData.stackPointer].afterOutput();
    sessionData.messageForNextDialog = null;
  }

  private void writeGoodByeOutput(GeneralizedRequest request,
                           HttpServletResponse response)
    throws IOException, ServletException {
    if (MustServlet.UTF8) response.setContentType("text/html; charset=UTF-8");
    else response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    stack[sessionData.stackPointer].beforeOutput();
    out.println(sessionData.layout.getGoodByeTagSequence(sessionData));
    stack[sessionData.stackPointer].afterOutput();
    sessionData.messageForNextDialog = null;
  }

  private Invokable getOrCreateInvokable(Class<? extends Invokable> classToInvoke) {
    Logger.getInstance().debug(getClass(), "Looking for reuse of " + classToInvoke);
    int upperPosition = sessionData.stackPointer + 1;
    while (upperPosition < stack.length && stack[upperPosition] != null ) {
      if (stack[upperPosition] != null && stack[upperPosition].getClass().equals(classToInvoke)) {
          Logger.getInstance().debug(getClass(), "reusing invokable " + stack[upperPosition].getClass());
          return stack[upperPosition];
      }
      upperPosition++;
    }
    for (int i = 0; i <= sessionData.stackPointer; i++) {
      if (stack[i].getClass().equals(classToInvoke)) {
        Logger.getInstance().debug(getClass(), "reusing invokable " + stack[i].getClass());
        return stack[i];
      }
    }
    // destroy not-reused invokables
    for (int i = sessionData.stackPointer + 1; i < stack.length; i++) {
      if (stack[i] != null) {
        stack[i].destroy();
        stack[i] = null;
      }
    }
    Logger.getInstance().debug(getClass(), "creating new invokable ");
    try {
      return createInvokable(classToInvoke);
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
      return null;
    }
  }

  /**
   * Invokes the specified menu bar as the root invokable of the stack.
   * @param menuBar the menu bar to invoke as root
   */
  public void baseInvoke(MustMenuBar menuBar) {
    sessionData.stackPointer = 0;
    invoke(menuBar);
  }

  /**
   * Invokes the specified menu bar as the root invokable of the stack.
   * @param menuBar the menu bar to invoke as root
   */
  public void baseInvoke(LoginDialog login) {
    sessionData.stackPointer = 0;
    invoke(login);
  }

  /**
   * Instantiates the class to be invoked, which must implement the interface
   * <code>{@link Invokable}</code>, and invokes it as the root of the stack.
   * @param classToBeInvoked the class to be invoked
   * @see Invokable
   */
  public void baseInvoke(Class<? extends Invokable> classToBeInvoked) {
    Invokable invokable = null;
    sessionData.stackPointer = 0;
    try {
      invokable = createInvokable(classToBeInvoked);
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
    }
    invoke(invokable);
  }

  /**
   * Invokes an invokable and puts it in the next position of stack order.
   * @param invokable to be invoked
   */
  public void subInvoke(Invokable invokable) {
    Logger.getInstance().debug(getClass(), "subInvoking " + invokable + " . . .");
    sessionData.stackPointer++;
    // if there is already an object, then now's the time to finalize it,
    // if it's not the object that we need here.
    invoke(invokable);
    Class<? extends Invokable> invokableInAdvance = invokable.getInvokableInAdvance();
    if (invokableInAdvance != null) {
      subInvoke(getOrCreateInvokable(invokableInAdvance));
    } else if (invokable.wantToBeFinalized()) {
      stack[sessionData.stackPointer] = null;
      sessionData.stackPointer--;
    }
  }

  /**
   * Goes one step back in stack and recovers the appropriate invokable.
   */
  public void backInvoke() {
    backInvoke(1);
  }

  /**
   * Goes one or more steps back in stack and recovers the appropriate invokable.
   * @param steps the amount of steps to go back in stack
   */
  public void backInvoke(int steps) {
    if (sessionData.stackPointer - steps < 0) {
      Logger.getInstance().info(getClass(), "Already at bottom of stack");
      return;
    }
    sessionData.stackPointer -= steps;
    while (sessionData.stackPointer > 0 && stack[sessionData.stackPointer].wantToBeFinalized()) {
      sessionData.stackPointer--;
    }
  }

  /**
   * Invokes an invokable and puts it in the current position of the stack order.
   * @param invokable to be invoked
   */
  public void invoke(Invokable invokable) {
    stack[sessionData.stackPointer] = invokable;
    if (sessionData.stackPointer > 0) {
      Logger.getInstance().debug(getClass(), "Setting submitter " + stack[sessionData.stackPointer-1].getClass().getName());
      invokable.setSubmitter(stack[sessionData.stackPointer-1]);
    }
    invokable.init();
  }

  private Invokable createInvokable(Class<? extends Invokable> classToInvoke) {
    Class<?>[] intArgsClass = new Class[] {SessionData.class};
    Object[] intArgs = new Object[] {sessionData};
    Constructor<? extends Invokable> intArgsConstructor;
    try {
      intArgsConstructor = classToInvoke.getConstructor(intArgsClass);
      return createInvokable(intArgsConstructor, intArgs);
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
      try {
        return (Invokable)classToInvoke.newInstance();
      } catch (Exception e2) {
        Logger.getInstance().error(getClass(), e2);
        return null;
      }
    }
  }

  private Invokable createInvokable(Constructor<? extends Invokable> constructor, Object[] arguments) {
    // System.out.println ("Constructor: " + constructor.toString());
    Invokable invokable = null;
    try {
      invokable = (Invokable)constructor.newInstance(arguments);
      return invokable;
    } catch (java.lang.reflect.InvocationTargetException ite) {
      Logger.getInstance().error(getClass(), ite);
      return null;
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
      return null;
    }
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
    return (System.currentTimeMillis() / 1000 - lastUseInSeconds > secondsForUnusedSessions);
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
    for (int i = 0; i < stack.length; i++) {
      if (stack[i] != null) stack[i].destroy();
    }
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
