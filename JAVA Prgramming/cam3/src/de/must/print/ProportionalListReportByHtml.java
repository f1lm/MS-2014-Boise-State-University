/*
 * Copyright (c) 2003-2012 Christoph Mueller. All rights reserved.
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

package de.must.print;

import java.io.IOException;
import java.util.Iterator;
import java.util.Vector;

import javax.swing.ImageIcon;

import de.must.middle.*;
import de.must.util.DateString;
import de.must.util.Miscellaneous;
import de.must.dataobj.DataObject;
import de.must.io.HtmlFile;

/**
 * HTML implementation of the report interface for lists with proportional
 * column definition.
 * @author Christoph Mueller
 */
public abstract class ProportionalListReportByHtml extends InterruptibleBatchThread implements ProportionalListReport {
  
  public static final int HEADER_LINE_ONE_AND_ONLY = 0;
  public static final int HEADER_LINE_FIRST = 1;
  public static final int HEADER_LINE_MIDDLE = 2;
  public static final int HEADER_LINE_LAST = 3;
  
  protected HtmlFile out;
  private int grid = 100;
  private int[] defaultProportion;
  private int leftMargin = 5; // %
  private int rightMargin = 3; // %
  private int tableWith = 96; // %
  private int columnSpace = 1; // columns
  private int[] alignment;
  
  /**
   * Constructs a new proportional list report
	 * @param fileName the name of the output file 
	 * @param title the title of the report
	 * @param generator the report's generator identification
   * @throws IOException
	 */
	public ProportionalListReportByHtml(String fileName, String title, String generator) throws IOException {
    out = new HtmlFile(fileName, title, generator);
  }
  
  /**
   * Sets the number of columns to be used to divide data columns.
   * @param i the number of columns to be used to divide data columns
   */
  public void setColumnSpace(int i) {
    columnSpace = i;
    computeGrid();
  }

  /**
   * Sets the left margin. When printed, this margin is added to the standard left margin. 
   * @param i the new left margin
   */
  public void setLeftMargin(int i) {
    leftMargin = i;
  }

  /**
   * Sets the right margin.
   * @param i the new right margin
   */
  public void setRightMargin(int i) {
    rightMargin = i;
  }
  
  /**
   * Sets the table width in %.
   * @param i the new table width in %
   */
  public void setTableWidth(int i) {
    tableWith = i;
  }
  
  /**
   * Sets the column default proportion to influence column width.  
	 * @param defaultProportion the proportion usually to be used 
	 */
	public void setDefaultProportion(int[] defaultProportion) {
    this.defaultProportion = defaultProportion;
    if (defaultProportion != null) {
      computeGrid();
      alignment = new int[defaultProportion.length];
    }
  }
  
  private void computeGrid() {
    if (defaultProportion == null) {
      // de.must.io.Logger.getInstance().info(getClass(), "can't compute due to missing defaultProportion");
      return;
    }
    grid = 0;
    for (int i = 0; i < defaultProportion.length; i++) {
			grid += defaultProportion[i];
		}
    grid += columnSpace * (defaultProportion.length - 1);
    // showComputed();
  }

  /**
   * Sets the alignment of a specific column.
   * @param columnIndex the index of the regarded column
   * @param alignType the align type of the specified column
   * @see ProportionalListReport#ALIGN_LEFT
   * @see ProportionalListReport#ALIGN_CENTER
   * @see ProportionalListReport#ALIGN_RIGHT
   */
  protected void setAlignment(int columnIndex, int alignType) {
    alignment[columnIndex] = alignType;
  }
  
  /**
   * Begins the HTML instruction set.
   */
  protected void beginHtml() {
    beginHtml(false);
  }
  
  /**
   * Begins the HTML instruction set.
   * @param printOnLoad whether body tag should include onLoad="print()"
   */
  protected void beginHtml(boolean printOnLoad) {
    out.outputHeader(printOnLoad, new String[] {"<style type=\"text/css\"> <!-- table {table-layout: fixed;} td {white-space: nowrap; overflow: hidden;} --> </style>"}); // cut cell content dynamically
    out.writeln("<div style=\"margin-left: " + leftMargin + "%; margin-right: " + rightMargin + "%;\">");
  }

  /**
   * Writes the title of the list.
   * @param title the title of the list
   */
  protected void outputTitle(String title) {
    out.writeln("<H1><CENTER>" + title + "</CENTER></H1>");
  }

  protected void outputParameter(String label, String value) {
    println(new String[]{Miscellaneous.getReplacement(label) + ": ", value});
  }

  /**
   * Writes the head of the list with the default proportion.
   * @param columnHeaders the column headers
   * @see #setDefaultProportion
   */
  protected void outputHead(String[] columnHeaders) {
    outputHead(columnHeaders, defaultProportion);
  }

  /**
   * Writes the head of the list with the default proportion (single head line).
   * @param columnHeaders the column headers
   * @param proportion the used proportion for this table header
   * @param alignment the alignment of the table header
   */
  protected void outputHead(String[] columnHeaders, int[] proportion, int[] alignment) {
    outputHead(HEADER_LINE_ONE_AND_ONLY, columnHeaders, proportion, alignment);
  }

  /**
   * Writes the head of the list with the default proportion.
   * @param headerLineType see HEADER_LINE_*
   * @param columnHeaders the column headers
   * @param proportion the used proportion for this table header
   * @param alignment the alignment of the table header
   * @see #HEADER_LINE_ONE_AND_ONLY
   * @see #HEADER_LINE_FIRST
   * @see #HEADER_LINE_MIDDLE
   * @see #HEADER_LINE_LAST
   */
  protected void outputHead(int headerLineType, String[] columnHeaders, int[] proportion, int[] alignment) {
    this.alignment = alignment;
    outputHead(headerLineType, columnHeaders, proportion);
  }
  
  /**
   * Writes the head of the list with the default proportion.
   * @param columnHeaders  the column headers
   * @param proportion the column proportion to be used
   */
  protected void outputHead(String[] columnHeaders, int[] proportion) {
    outputHead(HEADER_LINE_ONE_AND_ONLY, columnHeaders, proportion);
  }

  /**
   * Writes the head of the list.
   * @param headerLineType the header line type
	 * @param columnHeaders the column headers
	 * @param proportion the column proportion to be used
   * @see #HEADER_LINE_ONE_AND_ONLY
   * @see #HEADER_LINE_FIRST
   * @see #HEADER_LINE_MIDDLE
   * @see #HEADER_LINE_LAST
	 */
	protected void outputHead(int headerLineType, String[] columnHeaders, int[] proportion) {
    for (int i = 0; i < columnHeaders.length; i++) {
      columnHeaders[i] = Miscellaneous.getReplacement(columnHeaders[i]);
    }
    int[] colspans = getColspans(proportion);
    if (headerLineType == HEADER_LINE_ONE_AND_ONLY || headerLineType == HEADER_LINE_FIRST) {
      out.writeln("<THEAD>");
      out.writelnNonConverted("<TR VALIGN=TOP><TD COLSPAN=" + grid + "><FONT SIZE=1>&nbsp;</FONT></TD></TR>");
    }
    out.writeln("<TR VALIGN=TOP>");
    for (int i = 0; i < columnHeaders.length; i++) {
      out.writeln("<TH" + getColspanString(colspans, i) + getAlignString(i) + "><B>" + columnHeaders[i] + "</B></TH>");
      if (i < columnHeaders.length -1) out.writeln("<TH COLSPAN=" + columnSpace + "> </TH>");
    }
    out.writeln("</TR>");
    if (headerLineType == HEADER_LINE_ONE_AND_ONLY || headerLineType == HEADER_LINE_LAST) {
      out.writeln("</THEAD>");
    }
  }

  /**
   * Outputs sub column headers.
   * @param columnHeaders the column headers 
   * @param proportion the column proportion to be used
   * @param alignment the alignment of these row cells
   */
  protected void outputSubHeaders(String[] columnHeaders, int[] proportion, int[] alignment) {
    this.alignment = alignment;
    outputSubHeaders(columnHeaders, proportion);
  }
  
  /**
   * Outputs sub column headers.
   * @param columnHeaders the column headers 
   * @param proportion the column proportion to be used
   */
  protected void outputSubHeaders(String[] columnHeaders, int[] proportion) {
    for (int i = 0; i < columnHeaders.length; i++) {
      columnHeaders[i] = Miscellaneous.getReplacement(columnHeaders[i]);
    }
    int[] colspans = getColspans(proportion);
    out.writeln("<TR VALIGN=TOP>");
    for (int i = 0; i < columnHeaders.length; i++) {
      out.writeln("<TD" + getColspanString(colspans, i) + getAlignString(i) + "><b>" + columnHeaders[i] + "</b></TD>");
      if (proportion != null && i < columnHeaders.length -1) out.writeln("<TD COLSPAN=" + columnSpace + "> </TD>");
    }
    out.writeln("</TR>");
  }
  
  private String getColspanString(int[] colspans, int i) {
    if (colspans == null) return "";
    else return " COLSPAN=" + colspans[i];
  }

	private String getAlignString(int i) {
    if (alignment == null) return "";
		String alignString = "";
		switch (alignment[i]) {
      case ALIGN_LEFT: alignString = "ALIGN=\"LEFT\""; break;
		  case ALIGN_CENTER: alignString = "ALIGN=\"CENTER\""; break;
		  case ALIGN_RIGHT: alignString = "ALIGN=\"RIGHT\""; break;
		}
		return " " + alignString;
	}
  
  /**
   * Prints a space line in a table / an empty row.
   */
  protected void printSpaceLine() {
    out.writelnNonConverted("<TR VALIGN=TOP><TD COLSPAN=" + grid + "><FONT SIZE=1>&nbsp;</FONT></TD></TR>");
  }
  
  /**
   * Outputs one data row of the list in default proportion.
   * @param values the row values
   */
  protected void println(String[] values) {
    println(values, defaultProportion);
  }
  
  /**
   * Outputs one data row of the list in default proportion.
   * @param values the row values
   * @param proportion the column proportion to be used
   * @param alignment the alignment of these row cells
   */
  protected void println(String[] values, int[] proportion, int[] alignment) {
    this.alignment = alignment;
    println(values, proportion);
  }
  
  /**
   * Outputs one data row of the list.
   * @param values the row values
   * @param proportion the column proportion to be used
   */
  protected void println(String[] values, int[] proportion) {
    int[] colspans = getColspans(proportion);
    out.writeln("<TR VALIGN=TOP>");
    for (int i = 0; i < values.length; i++) {
      out.writeln("<TD" + getColspanString(colspans, i) + getAlignString(i) + ">" + values[i] + "</TD>");
      if (proportion != null && i < values.length -1) out.writeln("<TD COLSPAN=" + columnSpace + "> </TD>");
		}
    out.writeln("</TR>");
  }
  
  protected void println(Vector<Object> values) {
    println(values, defaultProportion);
  }
  
  protected void println(Vector<Object> values, int[] proportion) {
    int[] colspans = getColspans(proportion);
    out.writeln("<TR VALIGN=TOP>");
    Iterator<Object> iterator = values.iterator();
    int i = -1;
    while (iterator.hasNext()) {
      Object object = iterator.next();
      i++;
      if (object instanceof ImageIcon) {
        ImageIcon icon = (ImageIcon)object;
        out.writeln("<TD" + getColspanString(colspans, i) + getAlignString(i) + ">" + icon.getDescription() + "</TD>");
      } else {
        out.writeln("<TD" + getColspanString(colspans, i) + getAlignString(i) + ">" + object + "</TD>");
      }
      if (proportion != null && i < values.size() -1) out.writeln("<TD COLSPAN=" + columnSpace + "> </TD>");
    }
    out.writeln("</TR>");
  }
  
  private int[] getColspans(int[] proportion) {
    // maybe once there is to be computed something
    return proportion;
  }
  
  /**
   * Starts a table in standard format / non-proportional usage. This may be useful to present parameters before the report table begins. 
   */
  protected void beginTableNormal() {
    out.writeln("<TABLE CELLSPACING=0 CELLPADDING=0 BORDER=0>");
  }
  
  /**
   * Starts a table in for proportional usage. 
   */
  protected void beginTable() {
    out.writeln("<TABLE ALIGN=BLEEDLEFT WIDTH=" + tableWith + "% CELLSPACING=0 CELLPADDING=0 BORDER=0>");
  }
  
  /**
   * Ends the current table.
   */
  protected void endTable() {
    out.writeln("</TABLE>");
  }
  
  /**
   * Returns a database table date in a formatted way.
   * @param dataObject the DataObject used to access the table
   * @param columnName the name of the column containing the date value
   * @return the formatted date
   */
  protected String getFormattedDate(DataObject dataObject, String columnName) {
    return getFormattedDate(dataObject.getDate(columnName));
  }
  
  /**
   * Formats a date and returns it.
   * @param the date to be formatted
   * @return the formatted date
   */
  protected String getFormattedDate(java.sql.Date date) {
    if (date == null) return "";
    return new DateString(date).getEditableDateStringShort();
  }
  
  /**
   * Ends the HTML instruction set.
   */
  protected void endHtml() {
    out.writeln("</div>");
    out.outputFooter();
    out.close();
  }

  /**
   * Presents the created file in the browser.
   */
  protected void presentInBrowser() {
    if (isToRun()) out.presentInBrowser();
  }
  
}
