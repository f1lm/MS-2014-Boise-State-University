/*
 * Copyright (c) 2002 Christoph Mueller. All rights reserved.
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

/**
 * A group of buttons to be laid-out in one line, e.g. to switch between 
 * different panel analogously to Swing's tabbed pane.
 * Used in pure Servlet context. JSP equivalent @see TabButtonGroupForJsp
 * @author Christoph Mueller
 */
public class TabButtonGroup extends MustInputField {
  
  public static final int TECHNOLOGY_SUBMIT_BUTTONS = 0;
  public static final int TECHNOLOGY_JAVA_SCRIPT_SUBMIT = 1;
  public static int defaultTechnology = TECHNOLOGY_JAVA_SCRIPT_SUBMIT;
  private int technology;
  
  private String formName = "formname"; // <form name ="formname">
  
  private MustButton[] tabButtons;
  private String[] tabLabels;
  private TabImage[] tabImages;
  private String[] toolTipTexts;
  private int countButtons = -1;
  private int activeButtonIndex = 0;
  private boolean used = false;

  /**
   * Sets the default technology to layout the tab buttons.
   * @param defaultTechnology the default technology to set
   * @see #TECHNOLOGY_SUBMIT_BUTTONS
   * @see #TECHNOLOGY_JAVA_SCRIPT_SUBMIT
   * @see #TECHNOLOGY_IMAGE_AND_JAVA_SCRIPT_SUBMIT
   */
  public static void setDefaultTechnology(int defaultTechnology) {
    TabButtonGroup.defaultTechnology = defaultTechnology;
  }

  /**
   * Constructs a new group of tab buttons.
   * @param nbrOfButtons the number of buttons in the group
   */
  public TabButtonGroup(int nbrOfButtons) {
    this(nbrOfButtons, defaultTechnology);
  }

	/**
	 * Construct a new group of tab buttons.
	 * @param nbrOfButtons the number of buttons in the group
	 */
  public TabButtonGroup(int nbrOfButtons, int technology) {
    super("tabButGr");
    this.technology = technology;
    switch(technology) {
    case TECHNOLOGY_SUBMIT_BUTTONS:
      tabButtons = new MustButton[nbrOfButtons];
      break;
    case TECHNOLOGY_JAVA_SCRIPT_SUBMIT:
      tabLabels = new String[nbrOfButtons];
      toolTipTexts = new String[nbrOfButtons];
      break;
    }
  }

	/**
	 * Sets the name of the form to be used to execute JavaScript.
	 * @param formName The formName to set
	 */
	public void setFormName(String formName) {
		this.formName = formName;
	}

  /**
   * Adds a button with the specified label to the group.
   * @param tabLabel the label to be used for the new button
   */
  public void addButton(String tabLabel) {
    addButton(tabLabel, null);
	}

	/**
	 * Adds a button with the specified label to the group.
	 * @param tabLabel the label to be used for the new button
   * @param toolTipText the tool tip text to show
	 */
  public void addButton(String tabLabel, String toolTipText) {
    countButtons++;
    switch(technology) {
    case TECHNOLOGY_SUBMIT_BUTTONS:
      tabButtons[countButtons] = new MustButton(tabLabel, "panel" + (countButtons + 1));
      break;
    case TECHNOLOGY_JAVA_SCRIPT_SUBMIT:
      tabLabels[countButtons] = tabLabel;
      toolTipTexts[countButtons] = toolTipText;
      break;
    }
  }

  /**
   * Adds a button with the specified label to the group.
   * @param tabImageActive the image to be used for active tab
   * @param tabImageInactive the image to be used for inactive tab
   */
  public void addButton(TabImage tabImage) {
    addButton(tabImage, null);
  }

  /**
   * Adds a button with the specified label to the group.
   * @param tabLabel the label to be used for the new button
   * @param toolTipText the tool tip text to show
   */
  public void addButton(TabImage tabImage, String toolTipText) {
    countButtons++;
    if (tabImages == null) tabImages = new TabImage[tabLabels.length];
    tabImages[countButtons] = tabImage;
    toolTipTexts[countButtons] = toolTipText;
  }

	/**
	 * @see de.must.markup.Markupable#getCreationTag()
	 */
	public String getCreationTag() {
    switch(technology) {
    case TECHNOLOGY_SUBMIT_BUTTONS:
      return getButtonCreationTag();
    case TECHNOLOGY_JAVA_SCRIPT_SUBMIT:
      return getScriptCreationTag();
    }
    return null;
  }  

  private String getButtonCreationTag() {
    StringBuffer tagSequence = new StringBuffer();
    for (int i = 0; i < tabButtons.length; i++) {
      tagSequence.append(tabButtons[i].getCreationTag());
    }
    return tagSequence.toString();
  }  

  private String getScriptCreationTag() {
    boolean useTable = tabImages == null;
    StringBuffer tagSequence = new StringBuffer();
    if (useTable) {
      tagSequence.append("<table BORDER BGCOLOR=\"#C0C0C0\">");
      // tagSequence.append("<table class=\"tabbedPane\">");
      tagSequence.append("<tr ALIGN=CENTER>");
    }
    for (int i = 0; i < tabLabels.length; i++) {
      String toolTipText = toolTipTexts[i];
      if (toolTipText == null) toolTipText = tabLabels[i];
      if (useTable) {
        if (i == activeButtonIndex) tagSequence.append("<td BGCOLOR=\"#C0C0D7\">");
        // if (i == activeButtonIndex) tagSequence.append("<td class=\"activeTab\">");
        else tagSequence.append("<td>");
      }
      tagSequence.append("<a href=\"javascript:void(document." + formName + ".panel.value='panel" + (i+1) + "'); void(document." + formName + ".submit())\"");
      if (toolTipText != null) {
        tagSequence.append(" onMouseOver=\"window.status='" + toolTipText + "';return true\" onMouseOut=\"window.status='';return true\"");
      }
      tagSequence.append(">");
      if (i == activeButtonIndex) {
        // tagSequence.append("<b>");
      }
      if (tabImages != null && tabImages[i] != null) {
        tagSequence.append(tabImages[i].getCreationTag(i == activeButtonIndex));
      } else {
        tagSequence.append(tabLabels[i]);
      }
      if (i == activeButtonIndex) {
        // tagSequence.append("</b>");
      }
      tagSequence.append("</a>");
      if (useTable) tagSequence.append("</td>");
    }
    if (useTable) {
      tagSequence.append("</tr>");
      tagSequence.append("</table>");
    }
    tagSequence.append("\n");
    return tagSequence.toString();
	}

	/**
	 * @see de.must.markup.Markupable#fetchYourValueFromRequest(GeneralizedRequest)
	 */
	public void fetchYourValueFromRequest(GeneralizedRequest request) {
    used = false;
    switch(technology) {
    case TECHNOLOGY_SUBMIT_BUTTONS:
	    for (int i = 0; i <= countButtons; i++) {
	      tabButtons[i].fetchYourValueFromRequest(request);
	      if (tabButtons[i].wasPressed()) {
	        used = true;
	        activeButtonIndex = i;
	      }
	    }
      break;
    case TECHNOLOGY_JAVA_SCRIPT_SUBMIT:
      String panelParameter = request.getParameter("panel");
      if (panelParameter != null && panelParameter.startsWith("panel")) {
        used = true;
        activeButtonIndex = Integer.parseInt(panelParameter.substring(5)) - 1;
      }
      break;
    }
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

	/**
	 * @see de.must.markup.Markupable#destroy()
	 */
	public void destroy() {
	}

}

