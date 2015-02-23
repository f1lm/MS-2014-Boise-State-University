package de.must.markup;

/**
 * JTabbedPane equivalent for JSPs. Helps to divide large pages into multiple
 * areas controlled by tab images.
 * Needs <form name ="formname"> and <%= butler.HIDDEN_PANEL_FIELD %> in JSP
 * What's specific to JSPs? It is not guaranteed that Butler and JSP grouping of 
 * input elements is synchronized. Therefore we do not assign input elements to
 * tab areas at all. Thus, the butler will ask components to fetch their values
 * from request which are not laid-out. They'll just keep their state.
 * Butler snippets:
 <pre><code>
  ...
  tabButtonGroup = new TabButtonGroupForJsp(new String[] {"../../images/tab1_aktiv.gif", "../../images/tab2_aktiv.gif"}, new String[] {"../../images/tab1_inaktiv.gif", "../../images/tab2_inaktiv.gif"});
  ...
  protected void handle(GeneralizedRequest request) {
    tabButtonGroup.fetchYourValueFromRequest(request);
    storables.fetchValuesFromRequest(request);
    if (okButton.wasPressed()) {
      if (storables.inputCheckOk() && isInputAccepted()) {
        storables.save();
        goBack(); return;
      }
    } else if (cancelButton.wasPressed()) {
      goBack(); return;
    } else if (tabButtonGroup.wasUsed()) {
      // nothing to do - and don't reload, we want to keep user input!
      return;
    } else {
      String idString = request.getParameter("ID");
      if (idString != null) {
        storables.loadValues(Integer.parseInt(idString));
      } else {
        storables.newInput();
      }
    }
  }
  ...
 </code></pre>
 * and JSP snippet:
 <pre><code> 
    <form method="POST" name="formname">
    <table COLS=2 WIDTH="100%" >
    <tr>
    <td colspan=2><%=butler.tabButtonGroup%></td>
    </tr>
    <%switch (butler.tabButtonGroup.getSelectedIndex()) { case 0: %>
    <tr>
    <td>Field 1:</td><td><%=butler.field1%></td>
    </tr><tr>
    <td>Field 2:</td><td><%=butler.field2%></td>
    </tr>
    <%break; case 1:%>
    <tr>
    <td>Field 3:</td><td><%=butler.field3%%></td>
    </tr><tr>
    <td>Field 4:</td><td><%=butler.field4%%></td>
    </tr>
    <%}%>
    </table>
    <p><%=butler.okButton%> <%=butler.cancelButton%>
    <%= butler.HIDDEN_PANEL_FIELD %>
    </form>
 </code></pre>
 * @author Christoph Mueller
 */
public class TabButtonGroupForJsp extends MustInputField {
  
  private String formName = "formname"; // <form name ="formname">
  private String parmName = "panel"; // <%= butler.HIDDEN_PANEL_FIELD %>
  private String[] activeTabImages;
  private String[] inactiveTabImages;
  private String[] toolTipTexts;
  private int selectedIndex;
  private String panelParameterValue;

  /**
   * Constructs a simple new tab button group without different images for active 
   * and inactive state.
   * @param unanimatedTabImages array of images to be used when item become active
   */
  public TabButtonGroupForJsp(String[] unanimatedTabImages) {
    this(unanimatedTabImages, unanimatedTabImages);
  }
  
	/**
   * Constructs a new tab button group with different images for active in 
   * inactive state.
	 * @param activeTabImages array of images to be used when item become active
	 * @param inactiveTabImages array of images to be used when item are inactive
	 */
	public TabButtonGroupForJsp(String[] activeTabImages, String[] inactiveTabImages) {
	  super("tabGroup");
    this.activeTabImages = activeTabImages;
    this.inactiveTabImages = inactiveTabImages;
    toolTipTexts = new String[activeTabImages.length];
	}

  /* (non-Javadoc)
   * @see de.must.markup.Markupable#setToolTipText(java.lang.String)
   */
  public void setToolTipText(String newToolTipText) {
    for (int i = 0; i < toolTipTexts.length; i++) {
			if (toolTipTexts == null) setToolTipText(i, newToolTipText);
		}
  }

  /**
   * Sets a tool tip text for tab icon as specified.
	 * @param index the index of the tab to be described
	 * @param newToolTipText the new tool tip text for the tab
	 */
	public void setToolTipText(int index, String newToolTipText) {
    toolTipTexts[index] = newToolTipText;
  }

	/**
   * Sets the selected Index.
	 * @param selectedIndex the new index to select
	 */
	public void setSelectedIndex(int selectedIndex) {
		this.selectedIndex = selectedIndex;
	}

	/**
   * Returns the selected index. 
	 * @return the selected index
	 */
	public int getSelectedIndex() {
		return selectedIndex;
	}

  public String getCreationTag() {
    StringBuffer tagSequence = new StringBuffer();
    for (int i = 0; i < activeTabImages.length; i++) {
      String toolTipText = toolTipTexts[i];
      // tagSequence.append("<a href=\"?" + parmName + "=" + i + "\""); // does not update field input!!!
      tagSequence.append("<a href=\"javascript:void(document." + formName + "." + parmName + ".value='" + (i) + "'); void(document." + formName + ".submit())\"");      tagSequence.append(">");
      if (i == selectedIndex) {
        tagSequence.append("<img src =\"" + activeTabImages[i] + "\" border=0");
      } else {
        tagSequence.append("<img src =\"" + inactiveTabImages[i] + "\" border=0");
      }
      if (toolTipText != null) {
        tagSequence.append(" title=\"" + toolTipText + "\" onMouseOver=\"window.status='" + toolTipText + "';return true\" onMouseOut=\"window.status='';return true\"");
      }
      tagSequence.append(">");
      tagSequence.append("</a>");
    }
    tagSequence.append("\n");
    return tagSequence.toString();
  }

	/* (non-Javadoc)
	 * @see de.must.markup.Markupable#fetchYourValueFromRequest(de.must.markup.GeneralizedRequest)
	 */
	public void fetchYourValueFromRequest(GeneralizedRequest request) {
    panelParameterValue = request.getParameter(parmName);
    if (wasUsed()) {
      selectedIndex = Integer.parseInt(panelParameterValue);
    }
	}
  
  /**
   * Returns true if user input was switching to any other tabbed pane.
   * In this case we must not reload form data because we want to keep user input.
	 * @return true if user input was switching to any other tabbed pane
	 */
	public boolean wasUsed() {
    return panelParameterValue != null && !panelParameterValue.equals("default");
  }

  /* (non-Javadoc)
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}
