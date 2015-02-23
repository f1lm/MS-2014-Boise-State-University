/*
 * Copyright (c) 2001-2010 Christoph Mueller. All rights reserved.
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
import de.must.middle.GlobalStd;

import java.lang.reflect.Constructor;
import java.util.*;
import javax.servlet.http.HttpServletRequest;

/**
 * Manager of the JSP session - independent from Servlet specifications.
 * Provider of "butlers" - one butler for each JSP is produced.
 * May control live cycle of assigned objects: Objects may be particularly
 * freed before the session is completely invalidated.
 * Manages locale specific languages.
 * Avoids visible parameters in URL: if cookies are disabled, only the session
 * ID has to be passed by parameters, all other parameters may be handled here. 
 * JavaServerPages which like to use this session option should begin like this:
 * <pre><code>
 * <%@ page import = "mypackage.JspSession" %>
 * <jsp:useBean id="jspSession" class = "mypackage.JspSession" scope="session"/>
 * <% jspSession.takeNote(request); %>
 *
 * <%@ page import = "mypackage.JspNameButler" %>
 * <% JspNameButler butler = (JspNameButler)jspSession.getButler(JspNameButler.class); %>
 *
 * <% if (butler.workCausesReturn(request, response)) return;%>
 * </code></pre>
 * mypackage.JspSession must extend de.must.markup.JspSessionStd
 * takeNote gives the session the chance to know the specific locale.
 * It's recommended to name the JspNameButler like the JSP plus "Butler".
 * @author Christoph Mueller
 * @see JspButler
 */
public abstract class JspSessionStd {

  private static boolean separateConnections = false;
  private static boolean automaticButlerCacheReorganization = false;
	
//	private int context = 0;
//	private Vector[] butlersInContext;
//	private int initialButlersInContextCapacity = 6;
  private boolean windowSeparating = false;
  private int windowCounter = 0;
  private int windowNbr;

  /**
   * Determines whether each session should use its own database connection or not.
   * Should be set to true, if commit / rollback is to be used.
   * @param separateConnections whether each session should use its own database connection or not
   */
  public static void setUseSeperateConnectionsForEachSession(boolean newSeparateConnections) {
    separateConnections = newSeparateConnections;
  }

  /**
   * Determines whether or not butler cache shall be reorganized automatically.
   * @param newAutomaticButlerCacheReorganization whether or not butler cache shall be reorganized automatically
   * @see JspButler#getButlerFriends
   */
  public static void setAutomaticButlerCacheReorganization(boolean newAutomaticButlerCacheReorganization) {
    automaticButlerCacheReorganization = newAutomaticButlerCacheReorganization;
  }

  /**
   * The session's public data.
   */
  protected SessionData sessionData = new SessionData(this);
  public Hashtable<String, JspButler> butlers = new Hashtable<String, JspButler>();

  /**
   * Constructs a new JSP session.
   * If the persistence functionality is to be used, main database connection is
   * created or reactivated.
   */
  public JspSessionStd() {
    sessionData.global = getGlobal();
    de.must.io.Logger.getInstance().debug(getClass(), "Creating new JSP session at " + new Date(System.currentTimeMillis()));
    if (getGlobal().isFrameworkPersistenceFunctionalityUsed()) { // if persistence is to be done by Cameleon OSP
      getGlobal().createOrCheckConnections();
      if (separateConnections) {
        try {
          sessionData.mainConnection = getGlobal().getPrivateConnection();
        } catch (ConnectionPoolExhaustedException e) {
        	de.must.io.Logger.getInstance().info(getClass(), "Connection pool exhausted. Using shared connection " + new Date(System.currentTimeMillis()));
					sessionData.mainConnection = getGlobal().getMainConnection();
        }
      } else {
        sessionData.mainConnection = getGlobal().getMainConnection();
      }
    }
  }

  /**
   * Returns the windowSeparating.
   * @return boolean
   */
  public boolean isWindowSeparating() {
    return windowSeparating;
  }

  /**
   * Activates the window separating. This feature allows to separate different
   * instances of the same butler class in one session. Thus, the browser's
   * behavior of treating multiple browser windows as a single session can be
   * harmonized with need of separating two butler instances. This is essential 
   * if you want to leave two ore more administration JSPs open. Thus, the 
   * different GroupOfStorables may remain their individual former values.
   * needs hidden field "windownbr":
   * <code> 
   * <input type="hidden" name="windownbr" value="<%= butler.getWindowNbr() %>">
   * </code>
   * @param windowSeparating The windowSeparating to set
   */
  public void setWindowSeparating(boolean windowSeparating) {
    this.windowSeparating = windowSeparating;
  }

  /**
   * To be called by the JSP each time the JSP is loaded.
   * Helps providing the appropriate resource bundle and the back button among
   * others.
   */
  public void takeNote(HttpServletRequest request) {
    // de.must.io.Logger.getInstance().info(getClass(), "Session taking note of " + request.getRequestURI());
    sessionData.global.contextPath = request.getContextPath();
    regulateResourceBundles(request);
    determineWindowNbr(request);
    if (!request.getRequestURI().equals(sessionData.getCurrentURI(windowNbr))) {
      sessionData.setPreviousURI(sessionData.getCurrentURI(windowNbr), windowNbr);
      sessionData.setCurrentURI(request.getRequestURI(), windowNbr);
    }
    // de.must.io.Logger.getInstance().info(getClass(), "sessionData.currentURI: " + sessionData.currentURI);
    // de.must.io.Logger.getInstance().info(getClass(), "sessionData.previousURI: " + sessionData.previousURI);
    // terminateButlerActivity();
  }

  private void determineWindowNbr(HttpServletRequest request) {
    if (!windowSeparating) return;
    String windowNbrParam = request.getParameter("windownbr");
    de.must.io.Logger.getInstance().debug(getClass(), "looked for windownbr " + windowNbrParam);
    if (windowNbrParam == null) windowNbr = 0;
    else windowNbr = Integer.parseInt(windowNbrParam);
    de.must.io.Logger.getInstance().debug(getClass(), "found window nbr " + windowNbr);
    regulateWindowNbr();
  }

  private void regulateWindowNbr() {
    if (windowNbr > windowCounter) {
      // maybe old URL
      de.must.io.Logger.getInstance().debug(getClass(), "window nbr " + windowNbr + " corrected");
      windowNbr = windowCounter; 
    }
    if (windowNbr == 0) {
      windowCounter++;
      windowNbr = windowCounter;
      de.must.io.Logger.getInstance().debug(getClass(), "new window nbr " + windowNbr);
    } else {
      de.must.io.Logger.getInstance().debug(getClass(), "continuing in window nbr " + windowNbr);
    }
  }
  
  private void regulateResourceBundles(HttpServletRequest request) {
    Locale wishedLocale;
    if (request.getRequestURI().indexOf("/de/") > 0) wishedLocale = Locale.GERMAN;
    else if (request.getRequestURI().indexOf("/en/") > 0) wishedLocale = Locale.ENGLISH;
    else wishedLocale = request.getLocale();
    // de.must.io.Logger.getInstance().info(getClass(), "sessionData.locale: " + sessionData.locale);
    // de.must.io.Logger.getInstance().info(getClass(), "wishedLocale: " + wishedLocale);
    if (sessionData.locale == null || !sessionData.locale.equals(wishedLocale)) {
      // de.must.io.Logger.getInstance().info(getClass(), "changing locale to " + wishedLocale);
      sessionData.locale = wishedLocale;
      sessionData.createFrameworkResourceBundle();
      sessionData.setResourceBundle(getResourceBundle(wishedLocale));
      //butlers = new Hashtable(); // don't reuse butlers - they are locale specific
    }
  }

//	private synchronized void removeButlersWhichAreNotValidInThisContext(int context) {
//		de.must.io.Logger.getInstance().debug(getClass(), "Checking for removable butlers");
//    if (butlersInContext != null) {
//	    for(int i=0; i<butlersInContext.length; i++) {
//		  	de.must.io.Logger.getInstance().debug(getClass(), "checking context "+i);
//		  	if (butlersInContext[i] != null) {
//		  		de.must.io.Logger.getInstance().debug(getClass(), "Context "+i+" has elements...");
//					if (i>context) {
//		  	  	for(Iterator e = butlersInContext[i].listIterator(); e.hasNext();) {
//			    		String s = (String)e.next();
//			    		butlers.remove(s);
//			    		e.remove();
//		  	  		de.must.io.Logger.getInstance().debug(getClass(), "Will remove "+s+" out of context "+i);
//			    	}
//					}
//		  	} else {
//		  	  de.must.io.Logger.getInstance().debug(getClass(), "seems to have a null value");
//		  	}
//		  }
//    }
//	}

//  /**
//   * Creates a singleton JSP butler of the class as specified and returns it.
//   * Butler's init method is called each time the butler is newly used. This
//   * is the case when the previous butler is different and this previous
//   * butler is not modal. Sample: an error page may be modal. Thus, values
//   * already inputed are may not be initialized, when control comes back
//   * to the page.
//   * @param butlerClass the wished butlers class
//   * @param context the targeted context id
//   * @return a singleton JSP butler
//   */
//	public JspButler getButler(Class butlerClass, int context) {
//		de.must.io.Logger.getInstance().debug(getClass(), "getButler("+butlerClass.getName()+","+context+")");
//		setContext(context);
//		return getButler(butlerClass);
//	}

//	/**
//	 * Set the context id for sub-sequential getButler() calls
//	 * @param context
//	 */
//	public void setContext(int context) {
//		de.must.io.Logger.getInstance().debug(getClass(), "setContext("+context+")");
//		de.must.io.Logger.getInstance().debug(getClass(), "New context now: "+context);
//		if (this.context > context) {
//			removeButlersWhichAreNotValidInThisContext(context);
//		}
//		this.context = context;
//	  if (verbose) {
//	  	de.must.io.Logger.getInstance().info(getClass(), "");
//	  	de.must.io.Logger.getInstance().info(getClass(), "");
//	  	de.must.io.Logger.getInstance().info(getClass(), "");
//	  	de.must.io.Logger.getInstance().info(getClass(), "");
//	  	de.must.io.Logger.getInstance().info(getClass(), "Context overview [setContext]:");
//	  	if (butlersInContext != null) {
//		    for(int i=0; i<butlersInContext.length; i++) {
//	  	  	if (butlersInContext[i] != null) {
//	    	  	for(Enumeration e = butlersInContext[i].elements(); e.hasMoreElements();) {
//	  	  		  de.must.io.Logger.getInstance().info(getClass(), "  -- Context "+i+" contains "+(String)e.nextElement());
//	  	    	}
//	  	  	}
//	  	  }
//	  	}
//	  	de.must.io.Logger.getInstance().info(getClass(), "");
//	  	de.must.io.Logger.getInstance().info(getClass(), "Butlers overview [setContext]:");
//	  	if (butlers != null) {
//  	  	for(Enumeration e = butlers.keys(); e.hasMoreElements();) {
//	  		  de.must.io.Logger.getInstance().info(getClass(), "  -- butlers contains "+(String)e.nextElement());
//	    	}
//	  	}
//	  	de.must.io.Logger.getInstance().info(getClass(), "");
//	  	de.must.io.Logger.getInstance().info(getClass(), "");
//	  	de.must.io.Logger.getInstance().info(getClass(), "");
//	  	de.must.io.Logger.getInstance().info(getClass(), "");
//	  }
//		
//	}


	/**
	 * Clears all cached butlers
	 */
	public void clearButlers() {
		de.must.io.Logger.getInstance().debug(getClass(), "clearButlers()");
		butlers.clear();
//		butlersInContext = null;
	}


  /**
   * Creates a singleton JSP butler of the class as specified and returns it.
   * Butler's init method is called each time the butler is newly used. This
   * is the case when the previous butler is different and this previous
   * butler is not modal. Sample: an error page may be modal. Thus, values
   * already inputed are may not be initialized, when control comes back
   * to the page.
   * @param butlerClass the wished butlers class
   * @return a singleton JSP butler
   */
  public JspButler getButler(Class<? extends JspButler> butlerClass) {
//    if (butlersInContext == null) {
//      de.must.io.Logger.getInstance().debug(getClass(), "initializing butlersInContext");
//      butlersInContext = new Vector[initialButlersInContextCapacity];
//    }
//    if (butlersInContext[context] == null) {
//      de.must.io.Logger.getInstance().debug(getClass(), "initializing butlersInContext[context]");
//      butlersInContext[context] = new Vector();
//    }
//    if (!butlersInContext[context].contains(butlerClass.getName())) {
//      de.must.io.Logger.getInstance().debug(getClass(), "Adding "+butlerClass.getName()+" to context "+context);
//      butlersInContext[context].add(butlerClass.getName());
//    }
    String butlerId;
    if (windowSeparating) {
      regulateWindowNbr();
      butlerId = butlerClass.getName() + windowNbr;
    } else {
      butlerId = butlerClass.getName();
    }
    de.must.io.Logger.getInstance().debug(getClass(), "getButler("+butlerClass.getName()+") with window nbr " + windowNbr);
    JspButler butler = (JspButler)butlers.get(butlerId);
    clearInactiveButler(butlerId);
    if (butler == null) {
      butler = createButler(butlerClass);
      butler.setWindowNbr(windowNbr);
      butlers.put(butlerId, butler);
    }
    if (sessionData.lastProvidedButler == null
     || (butler != sessionData.lastProvidedButler
      && (
               sessionData.lastProvidedButler.getPreviousURI() == null
            || butler.getURI() == null
            || !sessionData.lastProvidedButler.getPreviousURI().equals(butler.getURI())
          )
        )
    ) {
      butler.init();
    }
    sessionData.lastProvidedButler = butler;
    if (automaticButlerCacheReorganization) reduceButlerCacheExcludingPassedButlerAndHisFriends(butler);
//    if (verbose) {
//      de.must.io.Logger.getInstance().info(getClass(), "");
//      de.must.io.Logger.getInstance().info(getClass(), "");
//      de.must.io.Logger.getInstance().info(getClass(), "");
//      de.must.io.Logger.getInstance().info(getClass(), "");
//      de.must.io.Logger.getInstance().info(getClass(), "Context overview [getButler]:");
//      for(int i=0; i<butlersInContext.length; i++) {
//        if (butlersInContext[i] != null) {
//          for(Enumeration e = butlersInContext[i].elements(); e.hasMoreElements();) {
//            de.must.io.Logger.getInstance().info(getClass(), "  -- Context "+i+" contains "+(String)e.nextElement());
//          }
//        }
//      }
//      de.must.io.Logger.getInstance().info(getClass(), "");
//      de.must.io.Logger.getInstance().info(getClass(), "Butlers overview [getButler]:");
//      if (butlers != null) {
//        for(Enumeration e = butlers.keys(); e.hasMoreElements();) {
//          de.must.io.Logger.getInstance().info(getClass(), "  -- butlers contains "+(String)e.nextElement());
//        }
//      }
//      de.must.io.Logger.getInstance().info(getClass(), "");
//      de.must.io.Logger.getInstance().info(getClass(), "");
//      de.must.io.Logger.getInstance().info(getClass(), "");
//      de.must.io.Logger.getInstance().info(getClass(), "");
//    }

    return butler;
  }

  private JspButler createButler(Class<? extends JspButler> butlerClass) {
    de.must.io.Logger.getInstance().debug(getClass(), "creating new butler");
    JspButler butler = null;
    Class<?>[] intArgsClass = new Class[] {SessionData.class};
    Object[] intArgs = new Object[] {sessionData};
    Constructor<? extends JspButler> intArgsConstructor;
    try {
      intArgsConstructor = butlerClass.getConstructor(intArgsClass);
      butler = (JspButler)intArgsConstructor.newInstance(intArgs);
      de.must.io.Logger.getInstance().debug(getClass(), "created butler = " + butler);
    } catch (java.lang.reflect.InvocationTargetException ite) {
      // important to find the original failure causing code piece
      de.must.io.Logger.getInstance().error(getClass(), ite.getTargetException());
    } catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    return butler;
  }

  private void terminateButlerActivity() {
  	de.must.io.Logger.getInstance().debug(getClass(), "terminateButlerActivity()");
    Enumeration<JspButler> butlerElements = butlers.elements();
    while(butlerElements.hasMoreElements()) {
      ((JspButler)butlerElements.nextElement()).setToRun(false);
    }
  }

  /**
   * Reduces the butler cache by throwing out any butler but the specified
   * butler to exclude and his friends. E.g. a butler who called me may be a
   * friend of mine, whose state should be kept.
   * @param excludeButler the butler to exclude
   */
  private synchronized void reduceButlerCacheExcludingPassedButlerAndHisFriends(JspButler excludeButler) {
    de.must.io.Logger.getInstance().debug(getClass(), "reduceButlerCacheExcludingPassedButlerAndHisFriends("+excludeButler.toString()+")");
    Class<?>[] butlerFriends = excludeButler.getButlerFriends();
    for (Enumeration<String> e = butlers.keys() ; e.hasMoreElements() ;) {
      String iteratedButlerName = e.nextElement();
      boolean toDecache = true;
      if (iteratedButlerName.equals(excludeButler.getClass().getName())) {
        toDecache = false;
      }
      if (butlerFriends != null) {
      	for(int i = 0; i < butlerFriends.length; i++){
          if (butlerFriends[i].getName().equals(iteratedButlerName)) {
            toDecache = false;
            // de.must.io.Logger.getInstance().info(getClass(), "excluding friend " + iteratedButlerName);
          }
      	}
      }
    	if (toDecache) {
        // de.must.io.Logger.getInstance().info(getClass(), "remove " + iteratedButlerName);
    	  butlers.remove(iteratedButlerName);
    	}
    }
  }

  private synchronized void clearInactiveButler(String excludeButlerId) {
    long limit = System.currentTimeMillis() - 300000;
    de.must.io.Logger.getInstance().debug(getClass(), "clearing inactive butlers");
    for (Enumeration<String> e = butlers.keys() ; e.hasMoreElements() ;) {
      String iteratedButlerName = e.nextElement();
      boolean toDecache = false;
      if (!iteratedButlerName.equals(excludeButlerId)) {
        de.must.io.Logger.getInstance().debug(getClass(), "checking " + iteratedButlerName);
        JspButler regardedButler = (JspButler)butlers.get(iteratedButlerName);
        if (regardedButler.isInvalidated()) {
          de.must.io.Logger.getInstance().debug(getClass(), iteratedButlerName + " has been invalidated");
          toDecache = true;
        } 
        if (regardedButler.getLastUse() < limit) {
          de.must.io.Logger.getInstance().debug(getClass(), iteratedButlerName + " is old");
          toDecache = true;
        } 
      }
      if (toDecache) {
        de.must.io.Logger.getInstance().debug(getClass(), "removing " + iteratedButlerName);
        butlers.remove(iteratedButlerName);
      }
    }
    de.must.io.Logger.getInstance().debug(getClass(), butlers.size() + " butlers are still active");
  }
  /**
   * Returns the application's specific global objects class.
   * @return the application's specific global objects class
   */
  protected abstract GlobalStd getGlobal();

  /**
   * Returns the resource bundle for the locale as specified.
   * @return the resource bundle
   */
  protected abstract ResourceBundle getResourceBundle(Locale locale);

  /**
   * Called by the garbage collector on an object when garbage collection
   * determines that there are no more references to the object.
   */
  protected void finalize() throws Throwable {
    de.must.io.Logger.getInstance().debug(getClass(), "Finalizing JSP session at " + new Date(System.currentTimeMillis()));
    if (separateConnections) {
      getGlobal().takeBackConnection(sessionData.mainConnection);
    }
    super.finalize();
  }

}
