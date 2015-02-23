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

package de.must.appletserver;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Vector;

import de.must.applet.Constants;
import de.must.middle.ApplConstStd;
import de.must.util.Miscellaneous;

public class MustButton implements Remotable, AppearanceModifiable, ActionInterpreter {

  public static final int TYPE_IN_SEQUENCE = 0;
  public static final int TYPE_BOTTOM = 1;
  
  private static int counter = 0;
  
  public static synchronized String getNextActionId () {
    if (counter < Integer.MAX_VALUE) counter ++;
    else counter = 1;
    return "buttonAct" + String.valueOf(counter);
  }

  protected int type;
  protected String todoAtion = Constants.CREATE_BOTTOM_BUTTON;
  protected int listDependenceType = ApplConstStd.LIST_DEPENDENCE_ACTIVE_SINGLE_SELECTION_ONLY;
  
  protected String imageName;
  protected String label;
  protected String actionID;
  protected String toolTipText;
  private ActionListener actionListener;
  private boolean enabled = true;
  private boolean visible = true;
  private boolean enableStateSend = true;
  private boolean visibleStateSend = true;

  /**
   * Constructs a new button.
   * @param label the label to be seen by the user
   */
  public MustButton(String label) {
    this(label, TYPE_IN_SEQUENCE);
  }
  
  /**
   * Constructs a new button.
   * @param label the label to be seen by the user
   */
  public MustButton(String label, int type) {
    this.label = Miscellaneous.getReplacement(label);
    this.type = type;
    create();
  }

  public MustButton(String imageName, String fallbackLabel) {
    this(imageName, fallbackLabel, TYPE_BOTTOM);
  }

  public MustButton(String imageName, String fallbackLabel, int type) {
    this.imageName = imageName;
    this.label = Miscellaneous.getReplacement(fallbackLabel);
    this.type = type;
    create();
  }
  
  private void create() {
    actionID = getNextActionId();
    switch (type) {
    case TYPE_IN_SEQUENCE:
      todoAtion = Constants.CREATE_BUTTON;
      break;
    }
  }

  /**
   * @param newListDependenceType
   * @see ApplConstStd#LIST_DEPENDENCE_WITHOUT
   * @see ApplConstStd#LIST_DEPENDENCE_ACTIVE_SINGLE_SELECTION_ONLY
   * @see ApplConstStd#LIST_DEPENDENCE_ACTIVE_MULTIPLE_SELECTION
   */
  public void setListDependenceType(int newListDependenceType) {
    this.listDependenceType = newListDependenceType;
  }

  /**
   * Sets the action listener (unique).
   * @param l the listener for actions
   */
  public void addActionListener(ActionListener l) {
    actionListener = l;
  }
  
  /**
   * Sets the button's text.
   * @param text the text (label) of the button
   */
  public void setText(String text) {
    this.label = text;
  }

  public String getActionID() {
    return actionID;
  }
  
  public int getType() {
    return type;
  }

  /**
   * Determines whether this button is enabled. An enabled component
   * can respond to user input and generate events. Buttons are
   * enabled initially by default. A component may be enabled or disabled by
   * calling its <code>setEnabled</code> method.
   * @return <code>true</code> if the button is enabled;
   * <code>false</code> otherwise.
   * @see #setEnabled
   */
  public boolean isEnabled() {
    return enabled;
  }

  /**
   * Enables or disables this button - to be used via {@link #setEnabled(boolean, Vector)} only
   * Thus, it is guaranteed responsibility to send modified state to the applet.  
   * @param enabled If <code>true</code>, this button is enabled;
   *        otherwise this button is disabled.
   */
  private void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  /**
   * Enables or disables this button, depending on the value of the
   * parameter <code>enabled</code>. An enabled button can respond to user
   * input and generate events. Components are enabled initially by default.
   * @param enabled If <code>true</code>, this button is enabled;
   *        otherwise this button is disabled.
   * @param appearanceControlPool the pool to control change of appearance to send
   * the modified state to the applet
   */
  public void setEnabled(boolean enabled, Vector<AppearanceModifiable> appearanceControlPool) {
    setEnabled(enabled);
    appearanceControlPool.add(this);
  }

  /**
	 * Sets the visibility of the component.
	 * @param visible whether or not the component should be visible
	 */
	public void setVisible(boolean visible) {
    this.visible = visible;
  }

  public void buildRemoteView(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.println(Constants.TODO_TAG_BEGIN + todoAtion + Constants.TODO_TAG_END);
    out.println(Constants.LABEL_BEGIN + label + Constants.LABEL_END);
    out.println(Constants.ID_TAG_BEGIN + actionID + Constants.ID_TAG_END);
    out.println(Constants.VARIANT3_TAG_BEGIN + listDependenceType + Constants.VARIANT3_TAG_END);
    if (imageName != null) {
      out.println(Constants.VARIANT1_TAG_BEGIN + imageName + Constants.VARIANT1_TAG_END);
    }
    if (toolTipText != null) {
      out.println(Constants.VARIANT2_TAG_BEGIN + toolTipText + Constants.VARIANT2_TAG_END);
    }
    out.println(Constants.ACTION_END_TAG);
    if (!enabled) {
      out.setEnabled(actionID, enabled);
      enableStateSend = enabled;
    }
  }

  @Override
  public void sendModifiedAppearanceTo(ToAppletWriter out) {
    if (enabled != enableStateSend) {
      out.setEnabled(actionID, enabled);
      enableStateSend = enabled;
    }
    if (visible != visibleStateSend) {
      out.setVisible(actionID, visible);
      visibleStateSend = visible;
    }
  }

  /**
   * Causes the component to read user input by calling request.getParameter and
   * update the internal mirrored value.
   * @param request the current request
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
  }

  public void destroy() {
  }

  @Override
  public void setToolTipText(String toolTipText) {
    this.toolTipText = toolTipText;
  }

  @Override
  public boolean perform(String action) {
    boolean result = action.equals(actionID);
    if (result) {
      performAction();
    }
    return result;
  }

  public void performAction() {
    actionListener.actionPerformed(new ActionEvent("Remote button", 0, actionID));
  }

}
