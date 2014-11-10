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

import java.util.Iterator;
import java.util.Vector;

import de.must.applet.Constants;
import de.must.middle.ConfirmationMatter;
import de.must.middle.ConversationMatter;
import de.must.util.Miscellaneous;

/**
 * A user interface to build remotely. Programmers perspective is being on the server,
 * building the user interface in a remote applet. 
 * @author Christoph Mueller
 */
public abstract class RemoteUserInterface implements RemotableControler {
  
  /**
   * Container to transfer abstract dependencies to the applet, causing
   * action without server contact.
   */
  class Dependency {
    public static final int DEPENDENCY_ENABLED_IF_FILLED = 0; 
    public static final int DEPENDENCY_FOCUS_SWITCH = 1; 
    Remotable rem1;
    Remotable rem2;
    Remotable rem3;
    int dependencyType = DEPENDENCY_ENABLED_IF_FILLED;
    public Dependency(Remotable rem1, Remotable rem2) {
      this.rem1 = rem1;
      this.rem2 = rem2;
    }
    public Dependency(Remotable rem1, Remotable rem2, Remotable rem3) {
      dependencyType = DEPENDENCY_FOCUS_SWITCH;
      this.rem1 = rem1;
      this.rem2 = rem2;
      this.rem3 = rem3;
    }
  }
  
  protected static synchronized RemoteUserInterface getInstance(SessionData sessionData, String tabId) {
    return sessionData.uis.get(tabId);
  }

  protected SessionData sessionData;
  protected ContextInfo contextInfo;
  protected String appellation;
  protected Vector<RemoteContent> remoteContents = new Vector<RemoteContent>();
  protected Vector<Dependency> dependencies = new Vector<Dependency>();
  protected Vector<AppearanceModifiable> appearanceModifiablePool = new Vector<AppearanceModifiable>();
  protected boolean buildDone = false;
  protected boolean isToRenew = false;
  protected ConfirmationMatter confirmationMatter;
  protected ConversationMatter infoMatter;
  protected String messageToKeep;
  protected String soundToPlay;
  public boolean visible = true; // after creation visible
  public String actionThatInvokesThis;

  public RemoteUserInterface(SessionData sessionData, ContextInfo contextInfo) {
    this.sessionData = sessionData;
    this.contextInfo = contextInfo;
    sessionData.currentTitle = contextInfo.getTabLabel();
    sessionData.currentConcerning = contextInfo.getConcerning();
    sessionData.currentConcerningSubLevel = getClass().getSimpleName();
  }
  
  /**
   * Returns the type of interface.
   * @return the type of interface
   * @see Constants#TOOLBAR
   * @see Constants#SEARCH_LIST_DETAIL_GUI
   * @see Constants#FREE_CENTER_GUI
   * @see Constants#DIALOG_FOR_PROPERTIES
   * @see Constants#DIALOG_FOR_OPTIONS_WITH_LIST_SELECTION
   * @see Constants#DIALOG_FOR_CHOOSING
   */
  public String getConcerning() {
    return contextInfo.getConcerning();
  }

  /**
   * Returns the ID of the tab or the window
   * @return the ID of the tab or the window
   */
  public String getTabId() {
    return contextInfo.getTabId();
  }

  /**
   * Returns the label of the tab or the title of the current window.
   * @return the label of the tab or the title of the current window
   */
  public String getTabLabel() {
    return contextInfo.getTabLabel();
  }

  /**
   * Sets the appellation of this user interface.
   * In case of applet inlay this appellation will cause a subhead.
   * In case of dialog this appellation will appear in window title.
   * @param appellation the appellation of the user interface
   */
  public void setAppellation(String appellation) {
    this.appellation = Miscellaneous.getReplacement(appellation);
  }

  public String getAppellation() {
    return appellation;
  }

  protected void registerRemotable(RemoteContent nextRemotable) {
    remoteContents.add(nextRemotable);
  }
  
  protected String getTranslation(String resourceKey) {
    return sessionData.getFrameworkResourceString(resourceKey);
  }
  
  public void addDependency(MustTextField textField, MustButton button) {
    dependencies.add(new Dependency(textField, button));
  }

  public void addDependency(MustTextField textField, MustButton button1, MustButton button2) {
    dependencies.add(new Dependency(textField, button1, button2));
  }

  /**
   * Sets the message to be read by the user, it is not reseted by
   * generalActionEnding when action completed. Thus, the user is able to notify
   * the message without pressing a confirmation button.
   * @param messageToKeep the message for the user
   */
  protected void setMessageToKeep(String messageToKeep) {
    this.messageToKeep = messageToKeep;
  }

  protected void setMessageToKeep(String messageToKeep, String soundToPlay) {
    this.messageToKeep = messageToKeep;
    this.soundToPlay = soundToPlay;
  }

  protected void setSoundToPlay(String soundToPlay) {
    this.soundToPlay = soundToPlay;
  }

  protected void setMessage(String messageToKeep) {
    this.messageToKeep = messageToKeep;
  }

  public boolean isVisible() {
    return visible;
  }

  public void setVisible(boolean visible) {
    this.visible = visible;
  }

  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    Iterator<RemoteContent> iterator = remoteContents.iterator();
    while (iterator.hasNext()) {
      RemoteContent content = iterator.next();
      content.fetchValuesFromRequest(request);
    }
  }
  
  @Override
  public void buildRemoteView(ToAppletWriter out) {
    if (!buildDone) {
      Iterator<Dependency> iterator = dependencies.iterator();
      while (iterator.hasNext()) {
        Dependency dependency = iterator.next();
        switch (dependency.dependencyType) {
        case Dependency.DEPENDENCY_ENABLED_IF_FILLED:
          out.setContentDependingEnabling((MustTextField)dependency.rem1, (MustButton)dependency.rem2);
          break;
        case Dependency.DEPENDENCY_FOCUS_SWITCH:
          out.switchFocus((MustTextField)dependency.rem1, (MustButton)dependency.rem2, (MustButton)dependency.rem3);
          break;
        }
      }
    }
    Iterator<AppearanceModifiable> iterator = appearanceModifiablePool.iterator();
    while (iterator.hasNext()) {
      ((AppearanceModifiable)iterator.next()).sendModifiedAppearanceTo(out);
    }
    if (messageToKeep != null) {
      out.setMessageToKeep(messageToKeep);
      messageToKeep = null;
    }
    if (soundToPlay != null) {
      out.setSoundToPlay(soundToPlay);
      soundToPlay = null;
    }
    if (confirmationMatter != null) {
      out.openConfirmation(confirmationMatter);
    }
    if (infoMatter != null) {
      out.openInfoDialog(infoMatter);
    }
    sendNextOutputs(out); // in case of dialogs, enabling, focus request and so on must be done right here
    out.setVisible(getTabId(), isVisible());
  }

  private void sendNextOutputs(ToAppletWriter out) {
    Iterator<String> iterator = sessionData.nextOutputs.iterator();
    while (iterator.hasNext()) {
      out.println(iterator.next());
    }
    sessionData.nextOutputs.clear();
  }

  @Override
  public void setToolTipText(String newToolTipText) {
  }

  @Override
  public void destroy() {
  }

}
