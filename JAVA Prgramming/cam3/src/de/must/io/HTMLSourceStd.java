/*
 * Copyright (c) 2013-2014 Christoph Mueller. All rights reserved.
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

package de.must.io;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Authenticator;
import java.net.MalformedURLException;
import java.net.PasswordAuthentication;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.Charset;
import java.util.Properties;

import de.must.io.Logger;

public class HTMLSourceStd {

  private class SimpleAuthenticator extends Authenticator {
    private String username, password;
     public SimpleAuthenticator(String username, String password) {
       this.username = username;
       this.password = password;
     }
     protected PasswordAuthentication getPasswordAuthentication() {
       return new PasswordAuthentication(username, password.toCharArray());
     }
  }

  protected static final boolean verbose = false;
  
  private boolean proxyToUse;
  private String proxyHost;
  private int proxyPort;
  private String proxyUser;
  private String proxyPassword;
  private Charset charset = Charset.forName("ISO-8859-1"); // important if we are on UTF-8 System, e.g. newer Debian or SuSE Linux
  private int timeout;
  
  public HTMLSourceStd() {
    this(false, null, 0, null, null);
  }
  
  public HTMLSourceStd(boolean proxyToUse, String proxyHost, int proxyPort, String proxyUser, String proxyPassword) {
    this.proxyToUse = proxyToUse;
    this.proxyHost = proxyHost;
    this.proxyPort = proxyPort;
    this.proxyUser = proxyUser;
    this.proxyPassword = proxyPassword;
  }
  
  public void setCharSet(Charset charset) {
    this.charset = charset;
  }
  
  public void setTimeout(int timeout) {
    this.timeout = timeout;
  }

  public BufferedReader getURLReader(String urlString) throws MalformedURLException, IOException {
    URL url = null;
    if (verbose) Logger.getInstance().info(getClass(), "trying " +  urlString);
    else Logger.getInstance().debug(getClass(), urlString);
    if (proxyToUse) {
      if (proxyUser != null && proxyUser.length() > 0) {
        Authenticator.setDefault(new SimpleAuthenticator(proxyUser, proxyPassword));
        url = new URL(urlString);
        Properties systemProperties = System.getProperties();
        systemProperties.setProperty("proxySet", "true");
        systemProperties.setProperty("http.proxyHost", proxyHost);
        systemProperties.setProperty("http.proxyPort", Integer.toString(proxyPort)); 
        systemProperties.setProperty("http.proxyUser", proxyUser);
        systemProperties.setProperty("http.proxyPassword", proxyPassword); 
      } else {
        url = new URL(urlString);
        Properties systemProperties = System.getProperties();
        systemProperties.setProperty("proxySet", "true");
        systemProperties.setProperty("http.proxyHost", proxyHost);
        systemProperties.setProperty("http.proxyPort", Integer.toString(proxyPort)); 
      }
    } else { 
      System.setProperty("proxySet", "false");
      url = new URL(urlString);
    }
    URLConnection urlConn = url.openConnection();
    urlConn.setReadTimeout(timeout);
    urlConn.connect();
    return new BufferedReader(new InputStreamReader(urlConn.getInputStream(), charset));
  }
  
}
