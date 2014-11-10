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

/**
 * A pseudo-GUI element able to become visible remotely (by an applet).
 * @author Christoph Mueller
 */
public abstract class RemoteElement implements RemoteContent {
  
  class Context {
    public String title;
    public String concerning;
    public String concerningSubLevel;
    public Context(String title, String concerning, String concerningSubLevel) {
      this.title = title;
      this.concerning = concerning;
      this.concerningSubLevel = concerningSubLevel;
    }
  }

  private static int counter = 0;
  
  private static synchronized String getUniqueName(Class<? extends RemoteElement> givenClass) {
    if (counter < Integer.MAX_VALUE) counter ++;
    else counter = 1;
    String baseName = givenClass.getName();
    int lastDot = baseName.lastIndexOf ('.');
    if (lastDot != -1){
      baseName = baseName.substring (lastDot + 1);    
    }
    return baseName + String.valueOf(counter);
  }

  protected SessionData sessionData;
  protected String name;
  protected Context context;
  protected String toolTipText;
  protected String nonstandardPanel;
  protected int nonstandardPosition = -1;
  private boolean visible = true; // default visibility = true
  private boolean lastVisibility = true;
  protected boolean editable = true;
  
  private RemoteElement() {
    
  }
  
  public RemoteElement(SessionData sessionData) {
    this(sessionData, null);
  }
  
  public RemoteElement(SessionData sessionData, String name) {
    this.sessionData = sessionData;
    this.name = name;
    context = new Context(sessionData.currentTitle, sessionData.currentConcerning, sessionData.currentConcerningSubLevel);
    if (this.name == null) {
      this.name = getUniqueName(getClass());
    }
  }
  
  @Override
  public void setToolTipText(String newToolTipText) {
    this.toolTipText = newToolTipText;
  }

  /**
   * Sets the flag that determines whether or not this component is editable.
   * This means: value may be changed by user. It does not mean, that user may type in 
   * characters. To allow this, use setEditableForUserTyping.
   * If the flag is set to true, this component becomes user editable.
   * If the flag is set to false, the cannot change the text of this text
   * component.
   * @param editable a flag indicating whether this component should be user editable
   * @see #setEditableForUserTyping
   */
  public void setEditable(boolean editable) {
    this.editable = editable;
    // super.setEditable(editableForUserTyping && editable);
  }

  public void setEnabled(boolean enabled) {
    sendContextToNextOutputs();
    sessionData.nextOutputs.add(Constants.ACTION_BEGIN_TAG);
    sessionData.nextOutputs.add(Constants.ID_TAG_BEGIN + name + Constants.ID_TAG_END);
    sessionData.nextOutputs.add(Constants.TODO_TAG_BEGIN + Constants.SET_ENABLED + Constants.TODO_TAG_END);
    sessionData.nextOutputs.add(Constants.VALUE_TAG_BEGIN + enabled + Constants.VALUE_TAG_END);
    sessionData.nextOutputs.add(Constants.ACTION_END_TAG);
  }

  /**
   * Returns the name of the input field.
   * @return the name of the input field
   */
  public String getName() {
    return name;
  }

  protected String getTranslation(String resourceKey) {
    return sessionData.getFrameworkResourceString(resourceKey);
  }
  
  public void requestFocus() {
    sendContextToNextOutputs();
    sessionData.nextOutputs.add(Constants.ACTION_BEGIN_TAG);
    sessionData.nextOutputs.add(Constants.ID_TAG_BEGIN + name + Constants.ID_TAG_END);
    sessionData.nextOutputs.add(Constants.TODO_TAG_BEGIN + Constants.REQUEST_FOCUS + Constants.TODO_TAG_END);
    sessionData.nextOutputs.add(Constants.ACTION_END_TAG);
  }

  public void selectAll() {
    sendContextToNextOutputs();
    sessionData.nextOutputs.add(Constants.ACTION_BEGIN_TAG);
    sessionData.nextOutputs.add(Constants.ID_TAG_BEGIN + name + Constants.ID_TAG_END);
    sessionData.nextOutputs.add(Constants.TODO_TAG_BEGIN + Constants.SELECT_ALL + Constants.TODO_TAG_END);
    sessionData.nextOutputs.add(Constants.ACTION_END_TAG);
  }
  
  private void sendContextToNextOutputs() {
    sessionData.nextOutputs.add(Constants.TITLE_BEGIN + context.title + Constants.TITLE_END);
    sessionData.nextOutputs.add(Constants.CONCERNING_BEGIN + context.concerning + Constants.CONCERNING_END);
    sessionData.nextOutputs.add(Constants.CONCERNING_SUBLEVEL1_BEGIN_TAG + context.concerningSubLevel + Constants.CONCERNING_SUBLEVEL1_END_TAG);
  }

  /**
   * Makes the component visible or invisible.
   * @param visible  true to make the component visible; false to make it invisible
   */
  public void setVisible(boolean visible) {
    this.visible = visible;
  }
  
  public void resetLastStatus() {
    lastVisibility = true;
  }

  public void beginAction(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.ID_TAG_BEGIN + name + Constants.ID_TAG_END);
    if (toolTipText != null) {
      out.println(Constants.VARIANT2_TAG_BEGIN + toolTipText + Constants.VARIANT2_TAG_END);
    }
    if (nonstandardPanel != null) {
      out.println(Constants.NONSTANDARD_PANEL_BEGIN + nonstandardPanel + Constants.NONSTANDARD_PANEL_END);
    }
    if (nonstandardPosition != -1) {
      out.println(Constants.NONSTANDARD_POSITION_BEGIN + Integer.toString(nonstandardPosition) + Constants.NONSTANDARD_POSITION_END);
    }
  }
  
  public void endAction(ToAppletWriter out) {
    out.println(Constants.ACTION_END_TAG);
  }
  
  @Override
  public void buildRemoteView(ToAppletWriter out) {
    if (visible != lastVisibility) {
      out.setVisible(name, visible);
      lastVisibility = visible;
    }
  }

  public void setValues(ToAppletWriter out) {
    if (visible != lastVisibility) {
      out.setVisible(name, visible);
      lastVisibility = visible;
    }
  }

}
