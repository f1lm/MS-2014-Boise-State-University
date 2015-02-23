/*
 * Copyright (c) 2011-2014 Christoph Mueller. All rights reserved.
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

package de.must.applet;

import java.applet.AppletContext;
import java.applet.AudioClip;
import java.awt.Container;
import java.awt.Cursor;
import java.awt.Image;
import java.awt.MediaTracker;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;
import java.util.Vector;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;

import de.must.io.Logger;
import de.must.middle.FrameworkTextResource;
import de.must.middle.GlobalStd;
import de.must.middle.ImageResource;
import de.must.middle.Res;
import de.must.middle.Res_de_DE;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.MustButton;
import de.must.wuic.MustFrame;

public class AppletGlobal implements FrameworkTextResource, ImageResource {

  class LogoutControl extends Thread {
    private int seconds;
    private JLabel infoLabel;
    public LogoutControl(JLabel infoLabel) {
      seconds = secondsBeforeAutomaticLogout;
      this.infoLabel = infoLabel;
    }
    @Override
    public void run() {
      while (!loggedOut && seconds > 0) {
        int min = seconds / 60;
        int partSeconds = seconds - min * 60;
        String minString = String.valueOf(min);
        String secString = String.valueOf(partSeconds);
        while (minString.length() < 2) minString = "0" + minString; 
        while (secString.length() < 2) secString = "0" + secString; 
        infoLabel.setText(getResourceString("TEXT_REMAINING_TIME") + ": " + minString + ":" + secString);
        try {
          seconds--;
          sleep(1000);
        } catch (InterruptedException e) {
          seconds = 0;
        }
      }
      infoLabel.setText("");
      if (!loggedOut) logout();
    }
    public void reset() {
      seconds = secondsBeforeAutomaticLogout;
    }
  }
  
  class Task {
    String title;
    AppletGUIs gui;
    public Task(String title, AppletGUIs gui) {
      this.title = title;
      this.gui = gui;
    }
  }
  
  class Veto {
    public String message;
    public String soundToPlay;
    public Veto(String message) {
      this(message, null);
    }
    public Veto(String message, String soundToPlay) {
      this.message = message;
      this.soundToPlay = soundToPlay;
    }
  }

  public static final String APPLET_VERSION_INFO = "Abstract Remote GUI Canvas 2.1";
  private static AppletGlobal instance;
  public static final int START_IMAGE_TO_SHOW = 0;
  public static final int START_IMAGE_PRESENTED = 1;
  public static final int START_IMAGE_REPLACED = 2;

  public final static AppletGlobal getInstance() {
    if (instance == null) {
      instance = new AppletGlobal();
    }
    return instance;
  }
  
  public static boolean debug = false;
  public boolean verbose = false;

  private RGUIApplet applet;
  private AppletContext appletContext;
  private String codeBase;
  protected ResourceBundle res;
  private Container appletContainer;
  public int secondsBeforeAutomaticLogout = 600;
  private LogoutControl contr;
  public Hashtable<String, Task> tasks;
  public Hashtable<String, JFrame> windows;
  public AppletDialog currentDialog;
  public RemStructureOutlineFrame outlineWindow;
  public RemListSelectionFrame selectionWindow;
  public Printer currentPrinter;
  public Hashtable<String, RemoteGUIComponent> rgcs = new Hashtable<String, RemoteGUIComponent>();
  public Charset charset = Charset.forName("ISO-8859-1"); // important if we are on UTF-8 System, e.g. newer Debian or SuSE Linux
  public int timeout = 20000;
  public String sessionId;
  private Hashtable<String, ImageIcon> images = new Hashtable<String, ImageIcon>();
  private Hashtable<String, AudioClip> sounds = new Hashtable<String, AudioClip>();
  private int startImageStatus;
  protected Cursor DefaultCursor = new Cursor(Cursor.DEFAULT_CURSOR);
  protected Cursor WaitCursor = new Cursor(Cursor.WAIT_CURSOR);
  protected boolean loggedOut;

  public void setApplet(RGUIApplet applet) {
    this.applet = applet;
    appletContext = applet.getAppletContext();
    appletContainer = applet.getContentPane();
    setCodeBase(applet.getCodeBase().toString());
    if (applet.getLocale().getLanguage().equals(Locale.GERMAN.getLanguage())) {
      res = new Res_de_DE();
    } else {
      res = new Res();
    }
//    Locale[] locales = Locale.getAvailableLocales();
//    Logger.getInstance().info("Available locales:");
//    for (int i = 0; i < locales.length; i++) {
//      Logger.getInstance().info(locales[i].toString());
//    }
    GlobalStd.locale = applet.getLocale();
    ImageIcon icon = getImageIcon("icon16.png"); //$NON-NLS-1$
    if (icon != null) {
      MustFrame.setDefaultIconImage(icon.getImage());
    }
  }

  public RGUIApplet getApplet() {
    return applet;
  }

  public AppletContext getAppletContext() {
    return appletContext;
  }

  public Container getAppletContainer() {
    return appletContainer;
  }
  
  public void setCodeBase(String codeBase) {
    this.codeBase = codeBase;
    int pos;
    if ((pos = codeBase.indexOf("workspace")) != -1) {
      int projectBegin = pos + 10;
      int projectEnding = codeBase.indexOf("/", projectBegin + 1);
      this.codeBase = "http://127.1.1.0:8080/" + codeBase.substring(projectBegin, projectEnding) + "/";
    }
    if (!this.codeBase.endsWith("/")) {
      this.codeBase += "/";
    }
  }

  public String getCodeBase() {
    return codeBase;
  }
  
  public void startLogoutControl(JLabel infoLabel) {
    contr = new LogoutControl(infoLabel);
    contr.start();
  }
  
  public void setStatusLoggedOutToStopLogoutControl() {
    loggedOut = true;
  }
  
  public MustButton createButton(String imageName, String defaultLabel) {
    ImageIcon image = AppletGlobal.getInstance().getImageIcon(imageName);
    MustButton button;
    if (image != null) {
      button = new MustButton(image);
    } else {
      if (defaultLabel.length() > 0) {
        button = new MustButton(defaultLabel);
      } else {
        button = new MustButton(imageName + "?");
      }
    }
    return button;
  }
  
  public MustButton createButton(String imageName, String defaultLabel, String tooltiptext, String actionCommand, ActionListener l) {
    ImageIcon image = AppletGlobal.getInstance().getImageIcon(imageName);
    MustButton button;
    if (image != null) {
      button = new MustButton(image, tooltiptext, actionCommand, l);
    } else {
      if (defaultLabel.length() > 0) {
        button = new MustButton(defaultLabel, actionCommand, l);
      } else {
        button = new MustButton(imageName + "?", actionCommand, l);
      }
    }
    button.setToolTipText(tooltiptext);
    return button;
  }
  
  public ImageIcon getImageIcon(String imageName) {
    ImageIcon imageIcon = images.get(imageName);
    if (imageIcon != null) {
      return imageIcon;
    } else try {
      Image image = getAppletContext().getImage(new URL(codeBase + "images/" + imageName));
      if (image != null && (imageIcon = new ImageIcon(image)).getImageLoadStatus() != MediaTracker.ERRORED) {
        images.put(imageName, imageIcon);
      } else {
        Logger.getInstance().warn("Couldn't load image " + imageName);
        imageIcon = null;
      }
    } catch (MalformedURLException e) {
      Logger.getInstance().error(e);
    }
    return imageIcon;
  }
  
  public void playSound(String soundFileName) {
    AudioClip sound = sounds.get(soundFileName);
    if (sound == null) try {
      sound = getAppletContext().getAudioClip(new URL(codeBase + "sounds/" + soundFileName)); //$NON-NLS-1$
      if (sound != null) sounds.put(soundFileName, sound);
    } catch (Exception e) {
    }
    if (sound != null) sound.play();
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
  
  public void register(String id, RemoteGUIComponent remoteGUIComponent) {
    rgcs.put(id, remoteGUIComponent);
  }

  public RemoteGUIComponent getRemoteGUIComponent(String id) {
    return rgcs.get(id);
  }

  public Veto contactServer(KeyValuePairAlpha param) throws IOException {
    Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
    params.add(param);
    return contactServer(params);
  }
  
  public Veto contactServer(Vector<KeyValuePairAlpha> params) throws IOException {
    return contactServer(params, applet);
  }
  
  private Veto contactServer(Vector<KeyValuePairAlpha> params, HostLineInterpreter interpreter) throws IOException {
    String charsetName = Charset.defaultCharset().name();
    applet.resetConcerning();
    applet.setCursor(WaitCursor);
    applet.setMessage(getResourceString("TEXT_LOADING"));
    String urlString = AppletGlobal.getInstance().getCodeBase() + Constants.MAIN_SERVLET;
    if (sessionId == null) {
      urlString += "?" + Constants.APPLET_CODEBASE + "=" + URLEncoder.encode(AppletGlobal.getInstance().getCodeBase(), charsetName);
      if (charsetName != null) {
        urlString += "&" + Constants.CHARSET + "=" + charsetName;
      }
    } else {
      urlString += "?" + Constants.SESSION + "=" + sessionId;
    }
    if (params != null && params.size() > 0) {
      Iterator<KeyValuePairAlpha> iterator = params.iterator();
      while (iterator.hasNext()) {
        KeyValuePairAlpha keyValuePair = iterator.next();
        String value = keyValuePair.getValue();
        urlString += "&" + keyValuePair.getKey() + "=" + URLEncoder.encode(value, charsetName);
      }
    }
    URL url;
    // no proxy settings in applets
    if (debug || verbose) Logger.getInstance().info(getClass(), urlString);
    url = new URL(urlString);
    URLConnection con = url.openConnection();
    InputStream in = con.getInputStream();
    BufferedReader result = new BufferedReader(new InputStreamReader(in, AppletGlobal.getInstance().charset));
    switch (startImageStatus) {
    case START_IMAGE_TO_SHOW:
      startImageStatus = START_IMAGE_PRESENTED;
      break;
    case START_IMAGE_PRESENTED:
      AppletGlobal.getInstance().getApplet().resetTabs();
      startImageStatus = START_IMAGE_REPLACED;
      break;
    default:
      break;
    }
    applet.setMessage("");
    String line;
    while ((line = result.readLine()) != null) {
      if (debug || verbose) Logger.getInstance().info(getClass(), line);
      if (line.startsWith(Constants.SESSION_BEGIN_TAG)) {
        sessionId = AppletGUIs.getContentBetween(line, Constants.SESSION_BEGIN_TAG, Constants.SESSION_END_TAG, 0);
      } else if (line.startsWith(Constants.VETO_MESSAGE_TAG_BEGIN)) {
        String vetoMessage = AppletGUIs.getContentBetween(line, Constants.VETO_MESSAGE_TAG_BEGIN, Constants.VETO_MESSAGE_TAG_END, 0);
        if (vetoMessage != null) {
          String soundToPlay = null;
          while ((line = result.readLine()) != null) {
            if (line.startsWith(Constants.SOUND_TAG_BEGIN)) {
              soundToPlay = AppletGUIs.getContentBetween(line, Constants.SOUND_TAG_BEGIN, Constants.SOUND_TAG_END, 0);
            }
          }
          in.close();
          applet.setCursor(DefaultCursor);
          return new Veto(vetoMessage, soundToPlay);
        }
      } else {
        interpreter.interpretLine(line);
      }
    }
    in.close();
    applet.setCursor(DefaultCursor);
    if (contr != null) contr.reset();
    return null;
  }
  
  public void remove(AppletGUIs gui) {
    tasks.remove(gui.title);
    applet.removeTab(gui.title);
  }
  
  public void logout() {
    loggedOut = true; // yes, before contact - 2nd + 3rd call if not - see localhost_access_log
    if (currentDialog != null) {
      currentDialog.setVisible(false);
      currentDialog = null;
    }
    try {
      contactServer(new KeyValuePairAlpha(Constants.ACTION, Constants.ACTION_LOGOUT));
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
}
