/*
 * Copyright (c) 1999-2009 Christoph Mueller. All rights reserved.
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

package de.must.util;

import java.io.*;

/**
 * Handle to access browsers and to induce them to show URLs including targets.
 * Uses non-copyrighted sample code as found at
 * http://www.javaworld.com/javaworld/javatips/jw-javatip66.html,
 * written by Steven Spencer.
 * @author Christoph Mueller
 */
public class Browser {

  private static String[] unixBrowserNames = new String[] {
    "firefox", "mozilla", "mozilla-firefox", "iceweasel", "netscape9", "netscape8", "netscape7", "netscape6", "netscape", "konqueror"
  };

  private static String browserPath;

  /**
   * Sets the path of the browser to be used.
   * @param newBrowserPath the new browser path
   */
  public static void setBrowserPath(String newBrowserPath) {
    browserPath =  newBrowserPath;
  }

  /**
   * Causes the browser to visit the specified URL.
   * @param urlString the URL to visit as a string
   */
  public static boolean visitURL(String urlString) {
    int indexOfTarget = urlString.indexOf('#');
    if (indexOfTarget > 0 && isWindowsPlatform()) {
      if (browserPath != null) return visitURLUsingApplicationPath(urlString, browserPath);
      else { // we do not know any browser application path, so we try the default way without target specification
        String reducedUrlString = urlString.substring(0, indexOfTarget);
        return visitURLbyDefaultBrowser(reducedUrlString);
      }
    } 
    else return visitURLbyDefaultBrowser(urlString);
  }

  // we need that because there is no link to sample.html#withtarget
  private static boolean visitURLUsingApplicationPath(String urlString, String browserPath) {
    String cmd = "\"" + browserPath + "\" \"" + urlString + "\"";
    de.must.io.Logger.getInstance().info(Browser.class, cmd);
    try {
      Runtime.getRuntime().exec(cmd);
    }
    catch (Exception e2) {
      /*
      Since we have some few, not reproducible problems with this way of starting the browser,
      we will try visitURLbyDefaultBrowser, although it doesn't support targets yet.
      It's better to show the not exact help position than nothing.
      */
      de.must.io.Logger.getInstance().error(Browser.class, e2);
      de.must.io.Logger.getInstance().info(Browser.class, "Trying to show less exact help context now ...");
      int basicUrlLength = urlString.indexOf('#');
      String URLwithoutTarget = urlString.substring(0, basicUrlLength);
      return visitURLbyDefaultBrowser(URLwithoutTarget);
    }
    return true;
  }

  private static boolean visitURLbyDefaultBrowser(String urlString) {
    String cmd = null;
    try {
      if (isWindowsPlatform()) {
        // cmd = 'rundll32 url.dll,FileProtocolHandler http://...'
        // doesn't work sometimes: cmd = WIN_PATH + " " + WIN_FLAG + " " + urlString.replace('/', '\\');
        cmd = WIN_PATH + " " + WIN_FLAG + " " + urlString;
        Runtime.getRuntime().exec(cmd);
      } else {
        for (int i = 0; i < unixBrowserNames.length; i++) {
          if (tryUnixBrowserCall(unixBrowserNames[i], urlString)) return true;
        }
        de.must.io.Logger.getInstance().error(Browser.class, "No browser could be started");
        return false;
      }
    } catch(IOException e) {
      de.must.io.Logger.getInstance().error(Browser.class, e);
      return false;
    }
    return true;
  }
  
  private static boolean tryUnixBrowserCall(String applicationName, String url) {
		try {
			String cmd;
			// Under Unix, Netscape has to be running for the "-remote"
			// command to work.  So, we try sending the command and
			// check for an exit value.  If the exit command is 0,
			// it worked, otherwise we need to start the browser.
			// cmd = 'netscape -remote openURL(http://www.javaworld.com)'
			cmd = applicationName + " " + UNIX_FLAG + "(" + url + ")";
			Process p = Runtime.getRuntime().exec(cmd);
			try {
			  // wait for exit code -- if it's 0, command worked,
			  // otherwise we need to start the browser up.
			  int exitCode = p.waitFor();
			  if (exitCode != 0) {
			    // Command failed, start up the browser
			    // cmd = 'netscape http://www.javaworld.com'
			    cmd = applicationName + " "  + url;
			    p = Runtime.getRuntime().exec(cmd);
			  }
			} catch(InterruptedException e) {
			  de.must.io.Logger.getInstance().error(Browser.class, e);
			  return false;
			}
		} catch (IOException e) {
			de.must.io.Logger.getInstance().debug(Browser.class, applicationName +  " not found");
      return false;
		}
    return true;
  }

  /**
   * Try to determine whether this application is running under
   * Windows or some other platform by examining the "os.name" property.
   * @return true if this application is running under a Windows OS:
   */
   private static boolean isWindowsPlatform() {
     final String os = System.getProperty("os.name");
     return ( os != null && os.startsWith(WIN_ID));
   }

   // Used to identify the windows platform.
   private static final String WIN_ID = "Windows";
   // The default system browser under windows.
   private static final String WIN_PATH = "rundll32";
   // The flag to display a URL.
   private static final String WIN_FLAG = "url.dll,FileProtocolHandler";
   // The flag to display a URL.
   private static final String UNIX_FLAG = "-remote openURL";

  public Browser() {
  }

}
