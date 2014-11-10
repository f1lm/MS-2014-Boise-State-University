/*
 * Copyright (c) 1999-2011 Christoph Mueller. All rights reserved.
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

import de.must.util.Miscellaneous;

/**
 * Attribute list to layout components upon a panel line by line with a label
 * at the beginning of each line. After an attribute list is completely filled,
 * the labels may be packed according to the longest label via method
 * packlabel.
 * May be used e.g. to edit fields of a single database table record.
 * @author Christoph Mueller
 */
public class AttributeList {

  private boolean noEmptyValues = false;
  private int countRows = -1;
  private Row[] rows;

  /**
   * Constructs a new attribute list initialized with 100 rows.
   */
  public AttributeList() {
    this(200);
  }

  /**
   * Constructs a new attribute list initialized with the specified number of rows.
   * @param rowCapacity the maximum number of rows to be used
   */
  public AttributeList(int rowCapacity) {
    rows = new Row[rowCapacity];
  }

  //----------------------------------------------------------------------------

  /**
   * Adds a markupable with its label into a new line.
   * @param label the line label
   * @param markupable
   */
  public void append(String label, Markupable markupable) {
    if (countRows >= rows.length) de.must.io.Logger.getInstance().info(getClass(), "AttributeList out of range");
    else {
      rows[++countRows] = new Row(Miscellaneous.getReplacement(label), markupable);
    }
  }

  /**
   * Appends a markupable to the current line.
   * @param markupable the markupable to append
   */
  public void append(Markupable markupable) {
    rows[countRows].addMarkupable(markupable);
  }

  /**
   * Appends a string to the current line.
   * @param stringToAppend the string to append
   */
  public void append(String stringToAppend) {
    append(new MarkupableObject(stringToAppend));
  }

  /**
   * Appends a label and a string to a new line.
   * @param label the label to append
   * @param stringToAppend the string to append
   */
  protected void append(String label, String stringToAppend) {
    append(label, new MarkupableObject(stringToAppend));
  }

  /**
   * Sets the tool tip text to the last added component.
   * @param toolTipText the tool tip text to associate
   */
  protected void setLastComponentsToolTipText(String toolTipText) {
    rows[countRows].markupables[rows[countRows].countMarkupable].setToolTipText(toolTipText);
  }

  //----------------------------------------------------------------------------

  /**
   * Returns the tag sequence to represent this object in markup language
   * interpreting tools like browsers.
   * @return the representing tag sequence
   */
  public String getTagSequence() {
    StringBuffer tagSequence = new StringBuffer("<table>\n");
    tagSequence.append(getInnerTableTagSequence());
    tagSequence.append("</table>\n");
    return tagSequence.toString();
  }

  /**
   * Returns the tag sequence to represent this object in markup language
   * interpreting tools like browsers without enclosing table tags.
   * @return the representing tag sequence without enclosing table tags
   */
  public String getInnerTableTagSequence() {
    boolean anyValue;
    StringBuffer tagSequence = new StringBuffer();
    for (int i = 0; i <= countRows; i++) {
      StringBuffer lineTagSequence = new StringBuffer();
      anyValue = false;
      Row row = rows[i];
      lineTagSequence.append("<tr><td valign=top>");
      if (!row.label.equals("")) lineTagSequence.append(row.label + ":");
      lineTagSequence.append("</td><td>");
      for (int j = 0; j <= row.countMarkupable; j++) {
        if (j > 0 && anyValue) lineTagSequence.append("&nbsp;");
        String value = row.markupables[j].getCreationTag();
        if (!value.equals("")) anyValue = true;
        lineTagSequence.append(value);
      }
      lineTagSequence.append("</td></tr>\n");
      if (anyValue || !noEmptyValues) {
        tagSequence.append(lineTagSequence.toString()); // toString() for compatibility with jdk 1.3.1 
      }
    }
    tagSequence.append("</td></tr>\n");
    return tagSequence.toString();
  }

  /**
   * Controls synchronization of user input and mirroring object values.
   * To be called after each POST action to update object values by user input.
   * @param request
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    for (int i = 0; i <= countRows; i++) {
      Row row = rows[i];
      for (int j = 0; j <= row.countMarkupable; j++) {
        if (row.markupables[j] instanceof MustInputField) {
          ((MustInputField)row.markupables[j]).fetchYourValueFromRequest(request);
        }
      }
    }
  }

  public void setNoEmptyValues(boolean newNoEmptyValues) {
    noEmptyValues = newNoEmptyValues;
  }

  public boolean isNoEmptyValues() {
    return noEmptyValues;
  }

  class Row {
    String label;
    int countMarkupable = -1;
    Markupable[] markupables = new Markupable[10];
    Row(String label, Markupable firstMarkupable) {
      this.label = label;
      this.markupables[++countMarkupable] = firstMarkupable;
    }
    void addMarkupable(Markupable MarkupableToAdd) {
      this.markupables[++countMarkupable] = MarkupableToAdd;
    }
  }

}
