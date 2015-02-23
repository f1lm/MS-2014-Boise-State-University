/*
 * Copyright (c) 2001-2011 Christoph Mueller. All rights reserved.
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

import java.text.DecimalFormat;
import java.util.Iterator;
import java.util.Locale;

import de.must.middle.TextResource;

/**
 * Layout with host look and feel.
 * @author Christoph Mueller
 */
public class HostLayout extends Layout {

  protected static final boolean buttonsCentered = false;
  protected String presentImage;
  protected String editImage;
  protected String copyImage;
  protected String deleteImage;
  protected DecimalFormat decimalFormat = (DecimalFormat)DecimalFormat.getInstance();

  public HostLayout() {
    decimalFormat.setMinimumFractionDigits(2);
    // decimalFormat.setMaximumFractionDigits(2);
  }

  /**
   * Sets the present details image.
   * @param presentImage the present details image to set
   */
  public void setPresentImage(String presentImage) {
    this.presentImage = presentImage;
  }

  /**
   * Sets the copyImage.
   * @param copyImage The copyImage to set
   */
  public void setCopyImage(String copyImage) {
    this.copyImage = copyImage;
  }

  /**
   * Sets the deleteImage.
   * @param deleteImage The deleteImage to set
   */
  public void setDeleteImage(String deleteImage) {
    this.deleteImage = deleteImage;
  }

  /**
   * Sets the editImage.
   * @param editImage The editImage to set
   */
  public void setEditImage(String editImage) {
    this.editImage = editImage;
  }

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param menuBar the menu bar to be laid-out
   * @return the markup tag sequence
   */
  protected String getSpecialTagSequence(MustMenuBar menuBar) {
    int itemPointer = -1;
    MustMenuNode currentNode = menuBar.getCurrentMenuNode();
    StringBuffer tagSequence = new StringBuffer(getHeader("menu"));
    tagSequence.append(getToolBarTag());
    tagSequence.append("<font size=+1><b>" + currentNode.getDescription() + "</b></font><p>\n");
    int size = currentNode.size();
    while (++itemPointer < size) {
      MustMenuNode subNode = (MustMenuNode)currentNode.elementAt(itemPointer);
      if (subNode.isAllowed(sessionData)) {
        tagSequence.append(subNode.getCreationTag(menuBar, itemPointer, sessionData.getBaseURL()));
        tagSequence.append("\n<br>");
      }
    }
    tagSequence.append("\n<br>");
    if (buttonsCentered) tagSequence.append("<center>\n");
    if (menuBar.isBackAble(sessionData)) {
      tagSequence.append("<input type=\"submit\" Name=" + "\"" + Dialog.NAME_FOR_BACK_ACTION + "\"" + " value=\"" + sessionData.getFrameworkResourceString("TEXT_BACK_BUTTON") + "\">\n");
    }
    tagSequence.append(getHelpButtonIfAvailable());
    if (buttonsCentered) tagSequence.append("</center>\n");
    tagSequence.append("\n<br>");
    tagSequence.append(getFooter());
    return tagSequence.toString();
  }

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param PropertyAdministration the property administration dialog to be laid-out
   * @return the markup tag sequence
   */
  protected String getSpecialTagSequence(PropertyAdministration propertyAdministration) {
    StringBuffer tagSequence = new StringBuffer(getHeader());
    String title = propertyAdministration.getTitle();
    if (title != null) {
      tagSequence.append("<font size=+1><b>" + title + "</font></b><p>\n");
    }
    String subTitle = propertyAdministration.getSubTitle();
    if (subTitle != null) {
      tagSequence.append(subTitle + "<p>\n");
    }
    tagSequence.append(propertyAdministration.getAttributeList().getTagSequence());
    tagSequence.append("\n<br>");
    if (buttonsCentered) tagSequence.append("<center>\n");
    tagSequence.append(propertyAdministration.getOkButtonTagSequence());
    tagSequence.append("&nbsp;&nbsp;\n");
    tagSequence.append(propertyAdministration.getCancelButtonTagSequence());
    tagSequence.append(getHelpButtonIfAvailable());
    if (buttonsCentered) tagSequence.append("</center>\n");
    tagSequence.append(getFooter());
    return tagSequence.toString();
  }

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param enquiry the enquiry to be laid-out
   * @return the markup tag sequence
   */
  protected String getSpecialTagSequence(Enquiry enquiry) {
    StringBuffer tagSequence = new StringBuffer(getHeader());
    tagSequence.append(getToolBarTag());
    if (enquiry.getTitle() != null) tagSequence.append("<font size=+1><b>" + enquiry.getTitle() + "</font></b><p>\n");
    String subTitle = enquiry.getSubTitle();
    if (subTitle != null) {
      tagSequence.append(subTitle + "<p>\n");
    }
    // no: tagSequence.append("<div class='scroll_division_big'>\n";
    tagSequence.append(enquiry.getAttributeList().getTagSequence());
    // no: tagSequence.append("</div>\n");
    tagSequence.append("\n<br>");
    if (buttonsCentered) tagSequence.append("<center>\n");
    tagSequence.append("<input type=submit Name=" + "\"" + Dialog.NAME_FOR_LIST_ACTION + "\"" + " value=\"" + sessionData.getFrameworkResourceString("TEXT_LIST_BUTTON") + "\">\n");
    tagSequence.append(getBackButtonIfAvailable(enquiry));
    tagSequence.append(getHelpButtonIfAvailable());
    if (buttonsCentered) tagSequence.append("</center>\n");
    tagSequence.append(getFooter());
    return tagSequence.toString();
  }

  /**
   * Returns the markup tag sequence from the invokable as specified.
   * @param dataList the data list to be laid-out
   * @return the markup tag sequence
   */
  protected String getSpecialTagSequence(ColumnDataList columnDataList) {
    boolean presentableOnly = columnDataList.isPresentable() && !columnDataList.isEditable() && !columnDataList.isDeletable();
    buildListTagSequence(columnDataList, presentableOnly);
    StringBuffer tagSequence = new StringBuffer(getHeader("list"));
    tagSequence.append(getToolBarTag());
    if (columnDataList.getTitle() != null) tagSequence.append("<font size=+1><b>" + columnDataList.getTitle() + "</font></b>");
    String subTitle = columnDataList.getSubTitle();
    if (subTitle != null) {
      tagSequence.append(subTitle);
    }
    if (columnDataList.isShowhits()) {
      tagSequence.append(" &nbsp;&nbsp;&nbsp; Anzahl Treffer: " + (columnDataList.isListCutted()?"mehr als ":"") + columnDataList.getNbrOfRows() + "<br>\n<br>");
    }
    if (subTitle != null || columnDataList.isShowhits()) {
      tagSequence.append("<p>\n");
    }
    tagSequence.append("<div class='scroll_division_big'>\n");
    tagSequence.append("<table border cellspacing=\"0.1\">\n");
    String[] columnHeaders = columnDataList.getColumnHeaders();
    tagSequence.append("<tr valign=\"top\">");
    if (!presentableOnly) {
      tagSequence.append("<th> </th>"); // column for handlers
    }
    for (int i = 0; i < columnHeaders.length; i++) {
      tagSequence.append("<th align=\"left\">" + columnHeaders[i] + "</th>");
    }
    tagSequence.append("</tr>\n");
    tagSequence.append(columnDataList.getListCache());
    if (columnDataList.isListEmpty()) {
      tagSequence.append("<tr><td colspan = 9>");
      tagSequence.append("Keine Einträge gefunden - bitte Suche weniger einschränken.");
      tagSequence.append("</td></tr>\n");
    }
    if (columnDataList.isListCutted()) {
      tagSequence.append("<tr><td colspan = 9>");
      tagSequence.append("Liste abgebrochen - bitte Suche weiter einschränken.");
      tagSequence.append("</td></tr>\n");
    }
    tagSequence.append("</table>\n");
    tagSequence.append("</div>\n");
    tagSequence.append("\n<br>");
    if (columnDataList.getBottomText() != null) {
      tagSequence.append(columnDataList.getBottomText() + "\n<br>\n<br>");
    }
    if (buttonsCentered) tagSequence.append("<center>\n");
    if (columnDataList.isExtendable()) {
      tagSequence.append("<input type=\"submit\" Name=" + "\"" + Dialog.NAME_FOR_NEW_ENTRY_ACTION + "\"" + " value=\"" + sessionData.getFrameworkResourceString("TEXT_NEW_ENTRY") + "\">\n");
    }
    tagSequence.append(getBackButtonIfAvailable(columnDataList));
    tagSequence.append(getHelpButtonIfAvailable());
    tagSequence.append(getAdditionalButtonSequence(columnDataList));
    if (buttonsCentered) tagSequence.append("</center>\n");
    tagSequence.append(getFooter());
    return tagSequence.toString();
  }

  /**
   * Builds the kernel markup tag sequence from column data list.
   * @param dataList the data list to be laid-out
   * @return the markup tag sequence
   */
  protected void buildListTagSequence(ColumnDataList dataList, boolean presentableOnly) {
    int lessSizeOfPseudoButtons = 2;
    if (dataList.getListCache() != null) return;
    StringBuffer tagSequence = new StringBuffer();
    dataList.startListFromBeginning();
    while (dataList.isRowToListAvailable()) {
      tagSequence.append("<tr valign=\"top\">");
      if (!presentableOnly) {
        tagSequence.append("<td>");
        if (dataList.isPresentable()) {
          if (presentImage != null) tagSequence.append("<a href=\"" + dataList.getBrowseHref() + "\"><img SRC=\"" + presentImage + "\" border=0 ALT=\"" + sessionData.getFrameworkResourceString("TEXT_BROWSE") + "\"></a>");
          else tagSequence.append(" <font size=-" + lessSizeOfPseudoButtons + "><a href=\"" + dataList.getBrowseHref() + "\">" + "[" + sessionData.getFrameworkResourceString("TEXT_BROWSE") + "]" + "</a></font>");
        }
	      if (dataList.isEditable()) {
	        if (editImage != null) tagSequence.append("<a href=\"" + dataList.getEditHref() + "\"><img SRC=\"" + editImage + "\" border=0 ALT=\"" + sessionData.getFrameworkResourceString("TEXT_MODIFY") + "\"></a>");
          else tagSequence.append(" <font size=-" + lessSizeOfPseudoButtons + "><a href=\"" + dataList.getEditHref() + "\">" + "[" + sessionData.getFrameworkResourceString("TEXT_MODIFY") + "]" + "</a></font>");
	      }
	      /* if (dataList.isCopyable()) {
	        ...
	      } */
	      if (dataList.isDeletable()) {
	        if (deleteImage != null) tagSequence.append("<a href=\"" + dataList.getDeleteHref() + "\"><img SRC=\"" + deleteImage + "\" border=0 ALT=\"" + sessionData.getFrameworkResourceString("TEXT_DELETE") + "\"></a>");
          else tagSequence.append(" <font size=-" + lessSizeOfPseudoButtons + "><a href=\"" + dataList.getDeleteHref() + "\">" + "[" + sessionData.getFrameworkResourceString("TEXT_DELETE") + "]" + "</a></font>");
	      }
        tagSequence.append("</td>");
      }
      Object[] rowObjects = dataList.getRowObjects();
      for (int i = 0; i < rowObjects.length; i++) {
        // tagSequence.append("<a href=\"" + dataList.getBrowseHref() + "\">");
        Object cellValue = rowObjects[i];
        if (cellValue == null || cellValue.toString().trim().equals("")) cellValue = "&nbsp;"; // to guaranty border existence
        if (cellValue.getClass() == Double.class) {
          tagSequence.append("<td align=\"right\">");
          if (presentableOnly) { 
            tagSequence.append("<a href=\"" + dataList.getBrowseHref() + "\">");           }
          tagSequence.append(decimalFormat.format(cellValue)); 
          if (presentableOnly) { 
            tagSequence.append("</a>"); 
          }
          tagSequence.append("</td>");
        } else {
          tagSequence.append("<td>");
          if (presentableOnly) { 
            tagSequence.append("<a href=\"" + dataList.getBrowseHref() + "\">"); 
          }
          tagSequence.append(cellValue); 
          if (presentableOnly) { 
            tagSequence.append("</a>"); 
          }
          tagSequence.append("</td>");
        }
        // tagSequence.append("</a>");
      }
      tagSequence.append("</tr>\n");
    }
    dataList.setListCache(tagSequence.toString());
  }
  
  /* (non-Javadoc)
   * @see de.must.markup.Layout#getSpecialTagSequence(de.must.markup.List)
   */
  protected String getSpecialTagSequence(List list) {
    buildListTagSequence(list);
    StringBuffer tagSequence = new StringBuffer(getHeader("list"));
    tagSequence.append(getToolBarTag());
    if (list.getTitle() != null) tagSequence.append("<font size=+1><b>" + list.getTitle() + "</font></b><p>\n");
    String subTitle = list.getSubTitle();
    if (subTitle != null) {
      tagSequence.append(subTitle + "<p>\n");
    }
    tagSequence.append("<div class='scroll_division_big'>\n");
    tagSequence.append("<table>\n");
    tagSequence.append(list.getListCache());
    if (list.isListEmpty()) {
      tagSequence.append("<tr><td>\n");
      tagSequence.append("Keine Einträge gefunden - bitte Suche weniger einschränken.\n");
      tagSequence.append("</td></tr>\n");
    }
    tagSequence.append("</table>\n");
    tagSequence.append("</div>\n");
    tagSequence.append("\n<br>");
    if (list.getBottomText() != null) {
      tagSequence.append(list.getBottomText() + "\n<br>\n<br>");
    }
    if (buttonsCentered) tagSequence.append("<center>\n");
    tagSequence.append(getBackButtonIfAvailable(list));
    tagSequence.append(getHelpButtonIfAvailable());
    tagSequence.append(getAdditionalButtonSequence(list));
    if (buttonsCentered) tagSequence.append("</center>\n");
    tagSequence.append(getFooter());
    return tagSequence.toString();
  }

  /**
   * Builds the kernel markup tag sequence of a simple data list.
   * @param dataList the data list to be laid-out
   */
  protected void buildListTagSequence(SimpleDataList dataList) {
    int lessSizeOfPseudoButtons = 2;
    if (dataList.getListCache() != null) return;
    StringBuffer tagSequence = new StringBuffer();
    dataList.startListFromBeginning();
    if (!dataList.hasSqlSyntaxError()) {
      while (dataList.isRowToListAvailable()) {
        tagSequence.append("<tr><td>\n");
        tagSequence.append("<a href=\"" + dataList.getBrowseHref() + "\">" + dataList.getRowString() + "</a>");
        tagSequence.append("&nbsp;&nbsp;&nbsp;\n");
        if (dataList.isEditable()) {
          if (editImage != null) tagSequence.append("<a href=\"" + dataList.getEditHref() + "\"><img SRC=\"" + editImage + "\" border=0 ALT=\"" + sessionData.getFrameworkResourceString("TEXT_MODIFY") + "\"></a>\n");
          else tagSequence.append(" <font size=-" + lessSizeOfPseudoButtons + "><a href=\"" + dataList.getEditHref() + "\">" + "[" + sessionData.getFrameworkResourceString("TEXT_MODIFY") + "]" + "</a></font>\n");
        }
        /* if (dataList.isCopyable()) {
          ...
        } */
        if (dataList.isDeletable()) {
          if (deleteImage != null) tagSequence.append("<a href=\"" + dataList.getDeleteHref() + "\"><img SRC=\"" + deleteImage + "\" border=0 ALT=\"" + sessionData.getFrameworkResourceString("TEXT_DELETE") + "\"></a>\n");
          else tagSequence.append(" <font size=-" + lessSizeOfPseudoButtons + "><a href=\"" + dataList.getDeleteHref() + "\">" + "[" + sessionData.getFrameworkResourceString("TEXT_DELETE") + "]" + "</a></font>\n");
        }
        tagSequence.append("</td></tr>\n");
      }
    }
    dataList.setListCache(tagSequence.toString());
  }
  
  /**
   * Returns the markup tag sequence from the invokable as specified.
   * @param dataList the data list to be laid-out
   * @return the markup tag sequence
   */
  protected String getSpecialTagSequence(SimpleDataList simpleDataList) {
    buildListTagSequence(simpleDataList);
    StringBuffer tagSequence = new StringBuffer(getHeader("list"));
    tagSequence.append(getToolBarTag());
    if (simpleDataList.getTitle() != null) tagSequence.append("<font size=+1><b>" + simpleDataList.getTitle() + "</font></b><p>\n");
    String subTitle = simpleDataList.getSubTitle();
    if (subTitle != null) {
      tagSequence.append(subTitle + "<p>\n");
    }
    if (simpleDataList.isShowhits()) {
      tagSequence.append("Anzahl Treffer: " + (simpleDataList.isListCutted()?"mehr als ":"") + simpleDataList.getNbrOfRows() + "<br>\n<br>");
    }
    tagSequence.append("<div class='scroll_division_big'>\n");
    tagSequence.append("<table>\n");
    tagSequence.append(simpleDataList.getListCache());
    if (simpleDataList.hasSqlSyntaxError()) {
      tagSequence.append("<tr><td>\n");
      tagSequence.append(getTranslation("TEXT_SYNTAX_ERROR_ACCORDING_TO_DB_DRIVER", simpleDataList.sessionData.locale) + ":");
      tagSequence.append("</td></tr>\n");
      tagSequence.append("<tr><td>\n");
      tagSequence.append(simpleDataList.listDataObject.getQueryException().getMessage());
      tagSequence.append("</td></tr>\n");
    } else if (simpleDataList.isListEmpty()) {
      tagSequence.append("<tr><td>\n");
      tagSequence.append("Keine Einträge gefunden - bitte Suche weniger einschränken.\n");
      tagSequence.append("</td></tr>\n");
    } else if (simpleDataList.isListCutted()) {
      tagSequence.append("<tr><td>\n");
      tagSequence.append("Liste abgebrochen - bitte Suche weiter einschränken.\n");
      tagSequence.append("</td></tr>\n");
    }
    tagSequence.append("</table>\n");
    tagSequence.append("</div>\n");
    tagSequence.append("\n<br>");
    if (simpleDataList.getBottomText() != null) {
      tagSequence.append(simpleDataList.getBottomText() + "\n<br>\n<br>");
    }
    if (buttonsCentered) tagSequence.append("<center>\n");
    if (simpleDataList.isExtendable()) {
      tagSequence.append("<input type=\"submit\" Name=" + "\"" + Dialog.NAME_FOR_NEW_ENTRY_ACTION + "\"" + " value=\"" + sessionData.getFrameworkResourceString("TEXT_NEW_ENTRY") + "\">\n");
    }
    tagSequence.append(getBackButtonIfAvailable(simpleDataList));
    tagSequence.append(getHelpButtonIfAvailable());
    tagSequence.append(getAdditionalButtonSequence(simpleDataList));
    if (buttonsCentered) tagSequence.append("</center>\n");
    tagSequence.append(getFooter());
    return tagSequence.toString();
  }

  /**
   * Builds the kernel markup tag sequence of a simple data list.
   * @param dataList the data list to be laid-out
   */
  protected void buildListTagSequence(List list) {
    if (list.getListCache() != null) return;
    StringBuffer tagSequence = new StringBuffer();
    list.startListFromBeginning();
    while (list.isRowToListAvailable()) {
      tagSequence.append("<tr><td>\n");
      tagSequence.append(list.getRowString());
      tagSequence.append("&nbsp;&nbsp;&nbsp;\n");
      tagSequence.append("</td></tr>\n");
    }
    list.setListCache(tagSequence.toString());
  }
  
  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param dataPropertyPresentation the data property presentation to be laid-out
   * @return the markup tag sequence
   */
  protected String getSpecialTagSequence(DataPropertyPresentation dataPropertyPresentation) {
    StringBuffer tagSequence = new StringBuffer(getHeader());
    tagSequence.append(getToolBarTag());
    String title = dataPropertyPresentation.getTitle();
    String subTitle = dataPropertyPresentation.getSubTitle();
    if (subTitle != null) {
      tagSequence.append(subTitle + "<p>\n");
    }
    if (title != null) {
      if (dataPropertyPresentation.getMode() == DataPropertyPresentation.MODE_DELETE) {
        tagSequence.append("<font size=+1 color=\"#CC0000\"><b>" + title + "</font></b><p>\n");
      } else {
        tagSequence.append("<font size=+1><b>" + title + "</font></b><p>\n");
      }
    }
    tagSequence.append("<div class='scroll_division_big'>\n");
    tagSequence.append(dataPropertyPresentation.getAttributeList().getTagSequence());
    tagSequence.append("</div>\n");
    tagSequence.append("\n<br>");
    if (buttonsCentered) tagSequence.append("<center>\n");
    tagSequence.append(dataPropertyPresentation.getOkButtonTagSequence());
    if (dataPropertyPresentation.isCancelToOffer()) {
      tagSequence.append("&nbsp;&nbsp;\n");
      tagSequence.append(dataPropertyPresentation.getCancelButtonTagSequence());
    }
    tagSequence.append(getAdditionalButtonSequence(dataPropertyPresentation));
    tagSequence.append(getHelpButtonIfAvailable());
    if (buttonsCentered) tagSequence.append("</center>\n");
    tagSequence.append(getFooter());
    return tagSequence.toString();
  }

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param dataPropertyAdministration the data property administration to be laid-out
   * @return the markup tag sequence
   */
  protected String getSpecialTagSequence(DataPropertyAdministration dataPropertyAdministration) {
    StringBuffer tagSequence = new StringBuffer(getHeader(dataPropertyAdministration.hasUploadFunctionality()));
    // tagSequence.append(getToolBarTag(); // no, leave via OK or Cancel!
    if (dataPropertyAdministration.getTitle() != null) tagSequence.append("<font size=+1><b>" + dataPropertyAdministration.getTitle() + "</font></b><p>\n");
    String subTitle = dataPropertyAdministration.getSubTitle();
    if (subTitle != null) {
      tagSequence.append(subTitle + "<p>\n");
    }
    String tabbedPaneTagSequence = dataPropertyAdministration.getTabbedPaneTagSequence();
    if (tabbedPaneTagSequence != null) tagSequence.append(tabbedPaneTagSequence + "\n");
    if (useScrollDivision()) tagSequence.append("<div class='scroll_division_big'>\n");
    tagSequence.append(dataPropertyAdministration.getAttributeList().getTagSequence());
    if (useScrollDivision()) tagSequence.append("</div>\n");
    tagSequence.append("\n<br>");
    if (buttonsCentered) tagSequence.append("<center>\n");
    tagSequence.append(dataPropertyAdministration.getOkButtonTagSequence());
    tagSequence.append("&nbsp;&nbsp;\n");
    tagSequence.append(dataPropertyAdministration.getCancelButtonTagSequence());
    tagSequence.append(getHelpButtonIfAvailable());
    if (buttonsCentered) tagSequence.append("</center>\n");
    tagSequence.append(getFooter());
    return tagSequence.toString();
  }

  /**
   * Gets the markup tag sequence from the invokable as specified.
   * @param dataTableAdministration the data table administration to be laid-out
   * @return the markup tag sequence
   */
  protected String getSpecialTagSequence(DataTableAdministration dataTableAdministration) {
    StringBuffer tagSequence = new StringBuffer(getHeader());
    tagSequence.append(getToolBarTag());
    if (dataTableAdministration.getTitle() != null) tagSequence.append("<font size=+1><b>" + dataTableAdministration.getTitle() + "</font></b><p>\n");
    String subTitle = dataTableAdministration.getSubTitle();
    if (subTitle != null) {
      tagSequence.append(subTitle + "<p>\n");
    }
    if (useScrollDivision()) tagSequence.append("<div class='scroll_division_big'>\n");
    tagSequence.append("<table>\n");
    tagSequence.append(dataTableAdministration.getInnerTableTagSequence());
    tagSequence.append("</table>\n");
    if (useScrollDivision()) tagSequence.append("</div>\n");
    tagSequence.append("\n<br>");
    if (buttonsCentered) tagSequence.append("<center>\n");
    tagSequence.append(dataTableAdministration.getOkButtonTagSequence());
    tagSequence.append("&nbsp;&nbsp;\n");
    tagSequence.append(dataTableAdministration.getCancelButtonTagSequence());
    tagSequence.append(getHelpButtonIfAvailable());
    if (buttonsCentered) tagSequence.append("</center>\n");
    tagSequence.append(getFooter());
    return tagSequence.toString();
  }
  
  /* (non-Javadoc)
   * @see de.must.markup.Layout#getSpecialTagSequence(de.must.markup.Dialog)
   */
  protected String getSpecialTagSequence(Dialog dialog) {
    StringBuffer tagSequence = new StringBuffer(getHeader());
    tagSequence.append(getToolBarTag());
    String title = dialog.getTitle();
    String subTitle = dialog.getSubTitle();
    if (subTitle != null) {
      tagSequence.append(subTitle + "<p>\n");
    }
    if (title != null) {
      tagSequence.append("<font size=+1><b>" + title + "</font></b><p>\n");
    }
    tagSequence.append("\n<br>");
    if (buttonsCentered) tagSequence.append("<center>\n");
    tagSequence.append(dialog.getOkButtonTagSequence());
    tagSequence.append(getAdditionalButtonSequence(dialog));
    tagSequence.append(getHelpButtonIfAvailable());
    if (buttonsCentered) tagSequence.append("</center>\n");
    tagSequence.append(getFooter());
    return tagSequence.toString();
  }

  public String getAdditionalButtonSequence(Dialog dialog) {
    if (dialog.getAdditionalButtons() == null) return "";  
    StringBuffer result = new StringBuffer();
    Iterator<MustButton> iterator = dialog.getAdditionalButtons().iterator();
    while (iterator.hasNext()) {
      MustButton button = iterator.next();
      result.append(" " + button.getCreationTag());
    }
    return result.toString();
  }
  
  private boolean useScrollDivision() {
    return sessionData.global.useScrollDivision;
  }

  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey, Locale locale) {
    return TextResource.getText(resourceKey, locale);
  }

}
