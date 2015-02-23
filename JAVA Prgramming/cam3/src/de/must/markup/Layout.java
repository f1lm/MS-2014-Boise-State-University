/*
 * Copyright (c) 2001-2013 Christoph Mueller. All rights reserved.
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
 * Liberal creator of the markup tag sequence. Collects information from all
 * actually active components including their state and layouts them.
 * The layout may be replaced during the execution and may differ from session
 * to session.
 * Implement your own Layout. It's more simple then designing many JSP!
 * And you cannot fail the links or get any other individually wrong code.
 * @see HostLayout
 * @author Christoph Mueller
 */
public abstract class Layout {

  static String generator = "Generator name";
  protected SessionData sessionData;
  protected Invokable invokable;
  protected HelpContext helpContext;
  protected Dialog dialog;
  protected String footerTagSequence;
  private boolean anyInputFields;
  private boolean focusToFirstButton;
  private boolean needsHiddenFieldPanel;
  private String hrefFragmentToSetFocusOn;

  /**
   * Sets the footer tag sequence.
   * @param footerTagSequence the footer tag sequence
   */
  public void setFooterTagSequence(String footerTagSequence) {
    this.footerTagSequence = footerTagSequence;
  }

  /**
   * Returns the markup tag sequence of the specified invokable.
   * Wishes to find a special layout method in subclass. If not found, it uses
   * the component's default layout informations.
   * @param sessionData the session's public data
   * @param invokable the invokable to be laid-out
   * @return the markup tag sequence
   */
  public String getTagSequence(SessionData sessionData, Invokable invokable) {
    this.sessionData = sessionData;
    this.invokable = invokable;
    helpContext = null;
    anyInputFields = true;
    focusToFirstButton = false;
    needsHiddenFieldPanel = false;
    hrefFragmentToSetFocusOn = null;
    // de.must.io.Logger.getInstance().info(getClass(), "Layouting " + invokable.getClass().getName());
    try {
      MustMenuBar mustMenuBar = (MustMenuBar)invokable;
      dialog = mustMenuBar;
      helpContext = mustMenuBar.getHelpContext();
      anyInputFields = false;
      return getSpecialTagSequence(mustMenuBar);
    } catch (ClassCastException cce) {}
    try {
      Enquiry enquiry = (Enquiry)invokable;
      dialog = enquiry;
      helpContext = enquiry.getHelpContext();
      return getSpecialTagSequence(enquiry);
    } catch (ClassCastException cce) {}
    try {
      DataTableAdministration dataTableAdministration = (DataTableAdministration)invokable;
      dialog = dataTableAdministration;
      helpContext = dataTableAdministration.getHelpContext();
      return getSpecialTagSequence(dataTableAdministration);
    } catch (ClassCastException cce) {}
    try {
      DataPropertyPresentation dataPropertyPresentation = (DataPropertyPresentation)invokable;
      dialog = dataPropertyPresentation;
      helpContext = dataPropertyPresentation.getHelpContext();
      anyInputFields = false;
      focusToFirstButton = true;
      return getSpecialTagSequence(dataPropertyPresentation);
    } catch (ClassCastException cce) {}
    try {
      DataPropertyAdministration dataPropertyAdministration = (DataPropertyAdministration)invokable;
      dialog = dataPropertyAdministration;
      helpContext = dataPropertyAdministration.getHelpContext();
      needsHiddenFieldPanel = needsHiddenFieldPanel || dataPropertyAdministration.hasMultiplePanels();
      return getSpecialTagSequence(dataPropertyAdministration);
    } catch (ClassCastException cce) {}
    try {
      PropertyAdministration propertyAdministration = (PropertyAdministration)invokable;
      dialog = propertyAdministration;
      helpContext = propertyAdministration.getHelpContext();
      needsHiddenFieldPanel = needsHiddenFieldPanel || propertyAdministration.hasMultiplePanels();
      return getSpecialTagSequence(propertyAdministration);
    } catch (ClassCastException cce) {}
    try {
      ColumnDataList columnDataList = (ColumnDataList)invokable;
      if (columnDataList.getLastProcessedActivityKey() > 0) {
        hrefFragmentToSetFocusOn = "ACT=" + columnDataList.getLastProcessedActivityKey();
      }
      dialog = columnDataList;
      helpContext = columnDataList.getHelpContext();
      anyInputFields = false;
      return getSpecialTagSequence(columnDataList);
    } catch (ClassCastException cce) {}
    try {
      SimpleDataList simpleDataList = (SimpleDataList)invokable;
      if (simpleDataList.getLastProcessedActivityKey() > 0) {
        hrefFragmentToSetFocusOn = "ACT=" + simpleDataList.getLastProcessedActivityKey();
      }
      dialog = simpleDataList;
      helpContext = simpleDataList.getHelpContext();
      anyInputFields = false;
      return getSpecialTagSequence(simpleDataList);
    } catch (ClassCastException cce) {}
    try {
      List list = (List)invokable;
      dialog = list;
      helpContext = list.getHelpContext();
      anyInputFields = false;
      return getSpecialTagSequence(list);
    } catch (ClassCastException cce) {}
    try {
      DataList dataList = (DataList)invokable;
      if (dataList == null) dataList = null; // dummy instruction to avoid warnings
      String error = "Please don't extend DataList. Extend SimmpleDataList or ColumnDataList instead.";
      de.must.io.Logger.getInstance().info(getClass(), error);
      return error;
    } catch (ClassCastException cce) {}
    try {
      dialog = (Dialog)invokable;
      helpContext = dialog.getHelpContext();
      anyInputFields = false;
      return getSpecialTagSequence(dialog);
    } catch (ClassCastException cce) {}
    String error = invokable.getClass().getName() + " could not be represented, because layout of super class " + invokable.getClass().getSuperclass().getName() + " is not implemented.";
    de.must.io.Logger.getInstance().info(getClass(), error);
    return error;
  }

  protected boolean hasAnyInputFields() {
    return anyInputFields;
  }

  protected boolean isFocusOnFirstButton() {
    return focusToFirstButton;
  }

  /**
   * Returns the header.
   * @return the header
   */
  protected String getHeader() {
    return getHeader("default", false);
  }

  /**
   * Returns the header for the specified style sheet.
   * @param styleSheetName the name of the style sheet to use
   * @return the header
   */
  protected String getHeader(String styleSheetName) {
    return getHeader(styleSheetName, false);
  }

  /**
   * Returns the header.
   * @param uploadFunctionality whether or not upload elements are to provide
   * @return the header
   */
  protected String getHeader(boolean uploadFunctionality) {
    return getHeader("default", uploadFunctionality);
  }

  /**
   * Returns the header for the specified style sheet.
   * @param styleSheetName the name of the style sheet to use
   * @param uploadFunctionality whether or not upload elements are to provide
   * @return the header
   */
  protected String getHeader(String styleSheetName, boolean uploadFunctionality) {
    if (styleSheetName != null && sessionData.isMobile()) {
      styleSheetName = "m" + styleSheetName;
    }
    StringBuffer tagSequence = new StringBuffer("<html>\n");
    tagSequence.append("<head>\n");
    tagSequence.append("   <title>" + sessionData.applicationTitle + "</title>\n");
    if (styleSheetName != null) {
      tagSequence.append("   <link rel=\"stylesheet\" href=\"../styleSheets/" + styleSheetName + ".css\" type=\"text/css\">\n");
    }
    if (sessionData.isMobile()) {
      tagSequence.append("   <meta content=\"width=device-width, initial-scale=1\" name=\"viewport\">\n");
    }
    // tagSequence.append("   <link rel=\"stylesheet\" href=\"../styleSheets/menubar.css\" type=\"text/css\">\n");
    tagSequence.append("   <link rel=\"shortcut icon\" href=\"../images/favicon.ico\">\n");
    if (MustServlet.UTF8) tagSequence.append("   <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n");
    else tagSequence.append("   <meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">\n");
    tagSequence.append("   <meta name=\"GENERATOR\" content=\"" + generator + " [www.must.de]\">\n");
    tagSequence.append("</head>\n");
    // AS/400 look: tagSequence.append("<body text=\"#00CC00\" bgcolor=\"#000000\" link=\"#00CC00\" vlink=\"#00CC00\" alink=\"#00CC00\">\n");
    tagSequence.append("<body onLoad=\"onLoadExecution()\">\n");
    tagSequence.append(getStaticScriptReferences());
    //tagSequence.append(getJavaScriptMenuBarTagSequence());
    tagSequence.append(getScriptToExecute());
    tagSequence.append("<form action=\"" + sessionData.getBaseURL() + "\" method=\"POST\" name=\"formname\"");
    if (uploadFunctionality) tagSequence.append(" enctype=\"multipart/form-data\"");
    tagSequence.append(">\n");
    // tagSequence.append("<font face=\"Arial,Helvetica\">\n"); see style sheet
    return tagSequence.toString();
  }

  /**
   * Returns the tool bar's markup tag sequence.
   * @return the tool bar's markup tag sequence
   */
  protected String getToolBarTag() {
    if (sessionData.toolBar == null) return "\n";
    StringBuffer tagSequence = new StringBuffer("\n");
    int itemPointer = -1;
    MustMenuNode currentNode = sessionData.toolBar.getItems();
    int size = currentNode.size();
    while (++itemPointer < size) {
      MustMenuItem item = (MustMenuItem)currentNode.elementAt(itemPointer);
      if (sessionData.toolBar.isEntitled(item)) {
        tagSequence.append(item.getCreationTag(item.getDescription(), item.getActionId(), sessionData) + "\n");
      }
    }
    tagSequence.append("<hr WIDTH=\"100%\">\n");
    return tagSequence.toString();
  }

  /**
   * Returns the footer's tag sequence.
   * @return the footer's tag sequence
   */
  protected String getFooter() {
    StringBuffer tagSequence = new StringBuffer("\n");
    if (footerTagSequence != null) tagSequence.append(footerTagSequence);
    tagSequence.append("<input type=\"hidden\" name=" + "\"" + Dialog.NAME_FOR_DIALOG_NBR + "\"" + " value=\"" + sessionData.dialogNbr + "\">\n");
    if (needsHiddenFieldPanel) tagSequence.append("<input type=\"hidden\" name=" + "panel value=\"default\"");
    tagSequence.append("</form>\n");
    tagSequence.append("</body>\n");
    tagSequence.append("</html>\n");
    return tagSequence.toString();
  }

  /**
   * Returns the markup tag sequence of the page to say good bye
   * @param sessionData the session's public data
   * @return the tag sequence of the good bye page
   */
  public String getGoodByeTagSequence(SessionData sessionData) {
    this.sessionData = sessionData;
    anyInputFields = false;
    // java.util.ResourceBundle res = enquiry.getResourceBundle();
    StringBuffer tagSequence = new StringBuffer(getHeader());
    tagSequence.append(getCloseScript());
    tagSequence.append("<font size=+3><b>");
    tagSequence.append(sessionData.getFrameworkResourceString("TEXT_GOOD_BYE"));
    tagSequence.append("</b></font><p>");
    tagSequence.append(getFooter());
    return tagSequence.toString();
  }

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param menuBar the menu bar to be laid-out
   * @return the markup tag sequence
   */
  protected abstract String getSpecialTagSequence(MustMenuBar menuBar);

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param enquiry the enquiry to be laid-out
   * @return the markup tag sequence
   */
  protected abstract String getSpecialTagSequence(Enquiry enquiry);

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param dataList the data list to be laid-out
   * @return the markup tag sequence
   */
  protected abstract String getSpecialTagSequence(ColumnDataList columnDataList);

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param dataList the data list to be laid-out
   * @return the markup tag sequence
   */
  protected abstract String getSpecialTagSequence(SimpleDataList simpleDataList);

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param dialog the dialog to be laid-out
   * @return the markup tag sequence
   */
  protected abstract String getSpecialTagSequence(Dialog dialog);

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param dataList the data list to be laid-out
   * @return the markup tag sequence
   */
  protected abstract String getSpecialTagSequence(List list);

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param dataPropertyPresentation the data property presentation to be laid-out
   * @return the markup tag sequence
   */
  protected abstract String getSpecialTagSequence(DataPropertyPresentation dataPropertyPresentation);

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param dataPropertyAdministration the data property administration to be laid-out
   * @return the markup tag sequence
   */
  protected abstract String getSpecialTagSequence(DataPropertyAdministration dataPropertyAdministration);

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param propertyAdministration the property administration to be laid-out
   * @return the markup tag sequence
   */
  protected abstract String getSpecialTagSequence(PropertyAdministration propertyAdministration);

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param dataTableAdministration the data table administration to be laid-out
   * @return the markup tag sequence
   */
  protected abstract String getSpecialTagSequence(DataTableAdministration dataTableAdministration);

  /**
   * Returns the java script menu bar tag sequence. See brainjar.com
   * @return the java script menu bar tag sequence
   */
  public String getJavaScriptMenuBarTagSequence() {
    StringBuffer tagSequence = new StringBuffer();
    MustMenuNode rootNode = sessionData.menuBar.getRootNode();
    tagSequence.append("<div id=\"menuBar\">\n");
    for (int i = 0; i < rootNode.size(); i++) {
      tagSequence.append("<a class=\"menuButton\"\n");
      tagSequence.append("  href=\"" + "" + "\"\n");
      tagSequence.append("  onclick=\"return buttonClick(this, 'menu" + i + "');\";\n");
      tagSequence.append("  onmouseover=\"buttonMouseover(this, 'menu" + i + "');\";\n");
      tagSequence.append(">" + ((MustMenu)rootNode.elementAt(i)).getDescription() + "</a>\n");
    }
    tagSequence.append("</div>\n");

    tagSequence.append("\n\n");

    boolean newMenu = false;
    int stackPointer = 0;
    MustMenuNode[] stack = new MustMenuNode[10];
    stack[stackPointer] = sessionData.menuBar.getRootNode();
    int[] ii = new int[10];
    ii[stackPointer] = -1;
    while (stackPointer >= 0) {
      newMenu = false;
      int size = stack[stackPointer].size();
      while (!newMenu && ++ii[stackPointer] < size) {
        // de.must.io.Logger.getInstance().info(getClass(), tagSequence);
        // de.must.io.Logger.getInstance().info(getClass(), "layouting with stackPointer " + stackPointer + " and ii " + ii[stackPointer]);
        MustMenuNode currentNode = (MustMenuNode)stack[stackPointer].elementAt(ii[stackPointer]);
        switch (currentNode.getType()) {
        case MustMenuNode.TYPE_MENU:
          newMenu = true;
          MustMenu currentMenu = (MustMenu)currentNode;
          // de.must.io.Logger.getInstance().info(getClass(), "Neues Menü: " + currentMenu.getDescription());
          stackPointer++;
          if (stackPointer == 1) {
            tagSequence.append("<div id=\"menu" + ii[0] + "\" class=\"menu\">\n");
          } else {
            tagSequence.append("<div class=\"menuItemHdr\">" + currentMenu.getDescription() + "</div>\n");
          }
          stack[stackPointer] = currentMenu;
          ii[stackPointer] = -1;
          break;
        case MustMenuNode.TYPE_MENU_ITEM:
          tagSequence.append("<a class=\"menuItem\"");
          MustMenuItem currentMenuItem = (MustMenuItem)currentNode;
          tagSequence.append(" href=\"" + sessionData.getBaseURL() + "&Menu=" + getMenuAddress(stackPointer, ii) + "\">");
          tagSequence.append(currentMenuItem.getDescription() + "</a>\n");
          break;
        }
      }
      if (!newMenu) {
        if (stackPointer > 0) tagSequence.append("</div>\n\n");
        stackPointer--;
      }
    }
    return tagSequence.toString();
  }

  private String getMenuAddress(int stackPointer, int[] ii) {
     StringBuffer menuAddress = new StringBuffer();
     for (int i = 0; i <= stackPointer; i++) {
       menuAddress.append(ii[i]);
       if (i < stackPointer) {
         menuAddress.append("-");
       }
     }
     return menuAddress.toString();
  }

  /**
   * Returns the markup tag sequence of a back button if 
   * available.
   * @return the tag sequence of a back button
   */
  protected String getBackButtonIfAvailable(Dialog dialog) {
    if (sessionData.stackPointer > 0) {
      return dialog.getBackButtonTagSequence();
    } else return "";
  }
  
  /**
   * Returns the markup tag sequence of a help button, if context help is available.
   * @return the tag sequence of a help button
   */
  protected String getHelpButtonIfAvailable() {
    if (helpContext == null || sessionData.isMobile()) return "";
    return "&nbsp;&nbsp;<input type=\"button\" value=\"" + sessionData.getFrameworkResourceString("TEXT_HELP_BUTTON") + "\" onClick=\"showHelp()\">";
  }

  /**
   * Returns static script references as tag sequence.
   * @return static script references
   */
  public String getStaticScriptReferences() {
    StringBuffer tagSequence = new StringBuffer();
    // tagSequence.append("<script type=\"text/javascript\" src=\"../scripts/com.brainjar.js\"></script>");
    // tagSequence.append("<script type=\"text/javascript\" src=\"../scripts/de.must.js\"></script>");
    return tagSequence.toString();
  }

  /**
   * Returns the script to execute.
   * @return the script to execute
   */
  protected String getScriptToExecute() {
    StringBuffer scriptToExecute = new StringBuffer();
    String informationToBeShownModal = null;
    if (dialog != null) {
      informationToBeShownModal = sessionData.messageForNextDialog;
      if (dialog.getScriptToExecute() != null) scriptToExecute.append(dialog.getScriptToExecute() + "\n");
    }
    if (sessionData.urlToBePresentedInNewWindowNextDialog != null) {
      scriptToExecute.append("open('" + sessionData.urlToBePresentedInNewWindowNextDialog + "');\n");
      sessionData.urlToBePresentedInNewWindowNextDialog = null;
    }
    StringBuffer script = new StringBuffer("<script LANGUAGE=\"JavaScript\">\n<!--\n");
    script.append("function onLoadExecution() {\n");
    if (scriptToExecute != null) script.append(scriptToExecute + "\n");
    if (focusToFirstButton) {
      script.append("  for (i = 0 ; i < document.forms[0].elements.length; i++) {\n");
      script.append("    if (document.forms[0].elements[i].type == \"submit\") {\n");
      script.append("      document.forms[0].elements[i].focus();\n");
      script.append("      return;\n");
      script.append("    }\n");
      script.append("  }\n");
    } else if (hasAnyInputFields()) {
      script.append("  document.forms[0].elements[0].focus();\n");
    }
    if (hrefFragmentToSetFocusOn != null) {
      script.append("  for (i = 0 ; i < document.links.length; i++) {\n");
      script.append("    if (document.links[i].href.indexOf(\"" + hrefFragmentToSetFocusOn + "\") > 0) {\n");
      script.append("      document.links[i].focus();\n");
      script.append("      return;\n");
      script.append("    }\n");
      script.append("  }\n");
    }
    script.append("}\n");
    if (informationToBeShownModal != null) {
      script.append("function showModal() {\n");
      script.append("  alert(\"" + informationToBeShownModal + "\");\n");
      script.append("}\n");
      script.append("setTimeout(\"showModal()\", 1);\n");
    }
    if (helpContext != null) {
      script.append("function showHelp() {\n");
      script.append("  helpWindow = open('../help/");
      if (sessionData.locale.getLanguage().equals(java.util.Locale.GERMAN.getLanguage())) {
        script.append("german");
      } else {
        script.append("english");
      }
      script.append("/" + helpContext.getTopic() + ".htm");
      if (helpContext.getTarget() != null) {
        script.append("#" + helpContext.getTarget());
      }
      script.append("', 'help'");
      script.append(");\n");
      script.append("  helpWindow.focus();\n");
      script.append("}\n");
    }
    if (true) { // always give chance to show help index
      script.append("function showHelpIndex() {\n");
      script.append("  helpWindow = open('../help/");
      if (sessionData.locale.getLanguage().equals(java.util.Locale.GERMAN.getLanguage())) {
        script.append("german");
      } else {
        script.append("english");
      }
      script.append("/" + "Index" + ".htm");
      script.append("', 'help'");
      script.append(");\n");
      script.append("  helpWindow.focus();\n");
      script.append("  return false;\n");
      script.append("}\n");
    }
    script.append("//-->\n</script>\n");
    return script.toString();
  }

  /**
   * Return the closing script.
   * @return the closing script
   */
  protected String getCloseScript() {
    StringBuffer script = new StringBuffer("<script LANGUAGE=\"JavaScript\">\n<!--\n");
    script.append("function dealayedClosing() {\n");
    script.append("  window.close()\n");
    script.append("}\n");
    script.append("setTimeout(\"dealayedClosing()\", 1000);\n");
    script.append("//-->\n</script>");
    return script.toString();
  }

}
