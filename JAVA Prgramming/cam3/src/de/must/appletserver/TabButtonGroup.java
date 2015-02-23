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

/**
 * A group of buttons to be laid-out in one line, e.g. to switch between 
 * different panel analogously to Swing's tabbed pane.
 * Used in pure Servlet context. JSP equivalent @see TabButtonGroupForJsp
 * @author Christoph Mueller
 */
public class TabButtonGroup implements Remotable {
  
  class TabButton {
    String label;
    String toolTipText;
    InlayCenterContent inlayCenterContent;
    public TabButton(String label) {
      this(label, null, null);
    }
    public TabButton(String label, String toolTipText, InlayCenterContent inlayCenterContent) {
      this.label = label;
      this.toolTipText = toolTipText;
      this.inlayCenterContent = inlayCenterContent;
    }
    public void buildRemoteView(ToAppletWriter out) {
      out.println(Constants.ACTION_BEGIN_TAG);
      out.println(Constants.TODO_TAG_BEGIN + Constants.CREATE_TAB + Constants.TODO_TAG_END);
      out.println(Constants.LABEL_BEGIN + label + Constants.LABEL_END);
      out.println(Constants.ACTION_END_TAG);
      if (inlayCenterContent != null) {
        inlayCenterContent.buildRemoteView(out);
      }
    }
  }
  
  public Vector<TabButton> tabButtons = new Vector<TabButton>();
  private int activeButtonIndex = 0;
  private boolean used = false;

  /**
   * Constructs a new group of tab buttons.
   */
  public TabButtonGroup() {
  }

  /**
   * Adds a button with the specified label to the group.
   * @param tabLabel the label to be used for the new button
   */
  public void addButton(String tabLabel) {
    tabButtons.add(new TabButton(tabLabel));
  }

  public void addButton(String tabLabel, InlayCenterContent inlayCenterContent) {
    addButton(tabLabel, null, inlayCenterContent);
  }
  
  /**
   * Adds a button with the specified label to the group.
   * @param tabLabel the label to be used for the new button
   * @param toolTipText the tool tip text to show
   */
  public void addButton(String tabLabel, String toolTipText, InlayCenterContent inlayCenterContent) {
    tabButtons.add(new TabButton(tabLabel, toolTipText, inlayCenterContent));
  }
  
  @Override
  public void buildRemoteView(ToAppletWriter out) {
    Iterator<TabButton> iterator1 = tabButtons.iterator();
    while (iterator1.hasNext()) {
      TabButton tabButton = iterator1.next();
      tabButton.buildRemoteView(out);
    }
  }

  @Override
	public void fetchValuesFromRequest(GeneralizedRequest request) {
//    used = false;
//    Iterator<TabButton> iterator = tabButtons.iterator();
//    while (iterator.hasNext()) {
//      TabButton button = iterator.next();
//      button.button.fetchValuesFromRequest(request);
////      if (button.wasPressed()) {
////        used = true;
////      }
//    }
	}
  
	/**
	 * Returns true if any of the buttons has been pressed in this dialog step.
	 * @return true if any of the buttons has been pressed
	 */
  public boolean hasBeenUsed() {
    return used;
  }
  
  /**
   * Returns the index of the currently active button. At the beginning, the
   * first button (index 0) is active.
   * @return the index of the currently active button
   */
  public int getActiveButtonIndex() {
    return activeButtonIndex;
  }

	public void destroy() {
	}

  @Override
  public void setToolTipText(String newToolTipText) {
  }

}

