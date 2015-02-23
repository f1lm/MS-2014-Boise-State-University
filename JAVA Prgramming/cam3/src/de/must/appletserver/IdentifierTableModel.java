/*
 * Copyright (c) 2012 Christoph Mueller. All rights reserved.
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
import de.must.appletserver.ColumnDataList.RemoteImageCell;
import de.must.dataobj.Identifier;
import de.must.util.StringFunctions;

public class IdentifierTableModel extends MustTableModel {

  private Vector<Identifier> identifiers;
  
  public IdentifierTableModel(String[] columnNames) {
    super(columnNames);
    identifiers = new Vector<Identifier>();
  }
  
  /**
   * Clears the table including the associated identifiers.
   */
  public void removeAll() {
    identifiers.clear();
    super.removeAll();
  }

  /**
   * Adds a row with an identifier.
   * @param visualItems  the cell values if the row
   * @param identifier  the identifier of the database table row
   */
  public void addIndexedRow(Object[] visualItems, Identifier identifier) {
    addRow(visualItems);
    identifiers.add(identifier);
  }

  @Override
  public void buildRemoteViewNewContent(ToAppletWriter out) {
    out.println(Constants.ACTION_BEGIN_TAG);
    // out.sendSubconcerning(subconcerning);
    out.addTodoTag(Constants.CLEAR_LIST);
    out.println(Constants.ACTION_END_TAG);
    int counter = -1;
    Iterator<Object[]> iterator = getData().iterator();
    while (iterator.hasNext()) {
      counter++;
      Identifier identifier = identifiers.elementAt(counter);
      Object[] rowObjects = iterator.next();
      for (int i = 0; i < rowObjects.length; i++) {
        addRowObjectAction(rowObjects[i], out, isCellEditable(counter, i));
      }
      applyRow(identifier, out);
    }
    out.sendTodoAction(Constants.APPLY_LIST);
  }
  
  private void applyRow(Identifier id, ToAppletWriter out) {
    applyRow(id, out, false);
  }
  
  private void applyRow(Identifier id, ToAppletWriter out, boolean checkUpdateCaseBeforeAppending) {
    out.println(Constants.ACTION_BEGIN_TAG);
    if (checkUpdateCaseBeforeAppending) {
      out.addTodoTag(Constants.APPLY_ROW_CHECKING_UPDATE);
    } else {
      out.addTodoTag(Constants.APPLY_ROW);
    }
    out.println(Constants.ID_TAG_BEGIN + id + Constants.ID_TAG_END);
    out.println(Constants.ACTION_END_TAG);
  }
  
  private void addRowObjectAction(Object rowObject, ToAppletWriter out, boolean editable) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.addTodoTag(Constants.ADD_ROW_OBJECT);
    if (rowObject instanceof RemoteImageCell) {
      RemoteImageCell ric = (RemoteImageCell)rowObject;
      out.addValueTag(ric.fallBackText);
      out.addVariant1Tag(ric.imageName);
    } else if (rowObject instanceof String) {
      out.addValueTag(StringFunctions.replaceAll(String.valueOf(rowObject),"\n", Constants.NEW_LINE));
    } else {
      out.addValueTag(rowObject.toString());
      if (rowObject != null) {
        out.addVariant2Tag(rowObject.getClass().getName());
      }
      if (editable) {
        out.addVariant3Tag("editable");
      }
    }
    out.println(Constants.ACTION_END_TAG);
  }
  
  /**
   * Return the identifier of the row as specified.
   * @param row  the row's index
   * @return the identifier of the row as specified
   */
  public Identifier getIdentifier(int row) {
    if (row < 0) return null;
    if (row >= getRowCount()) return null;
    return identifiers.get(row);
  }

}
