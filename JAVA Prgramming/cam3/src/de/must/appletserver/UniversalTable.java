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
import de.must.io.Logger;

public class UniversalTable extends RemoteElement {
  
  private MustTableModel tableModel;

  private Vector<String> colHeaders;
  protected Vector<Renderer> renderer;
  protected Vector<ColumnEditor> editors;
  private boolean columnDefinitionsSend = false;
  private int[] colWidth;

  public UniversalTable(SessionData sessionData, MustTableModel tableModel) {
    super(sessionData);
    this.tableModel = tableModel;
  }
  
  public void setHeaders(Vector<String> colHeaders) {
    this.colHeaders = colHeaders;
  }

  public void setPreferredWidth(int colIndex, int width) {
    if (colWidth == null) colWidth = new int[colHeaders.size()];
    colWidth[colIndex] = width;
  }
  
  public void addRenderer(Renderer newRenderer) {
    if (renderer == null) renderer = new Vector<Renderer>();
    renderer.add(newRenderer);
  }
  
  public void addEditor(ColumnEditor newEditor) {
    if (editors == null) editors = new Vector<ColumnEditor>();
    editors.add(newEditor);
  }
  
  public MustTableModel getModel() {
    return tableModel;
  }

  @Override
  public void selectAll() {
  }

  @Override
  public void requestFocus() {
  }

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    if (!columnDefinitionsSend) {
      out.sendTodoAction(Constants.CLEAR_LIST_COLUMNS);
      Iterator<String> iterator = colHeaders.iterator();
      int i = -1;
      while (iterator.hasNext()) {
        String colHeader = iterator.next();
        i++;
        int width = -2;
        if (colWidth != null && colWidth[i] != 0) {
          width = colWidth[i];
        }
        addColumn(colHeader, out, width);
      }
      out.sendTodoAction(Constants.APPLY_LIST_COLUMNS);
      if (renderer != null) {
        buildRenderer(out);
      }
      if (editors != null) {
        buildEditor(out);
      }
      columnDefinitionsSend = true;
    }
    tableModel.buildRemoteViewNewContent(out);
    super.buildRemoteView(out);
  }
  
  private void buildRenderer(ToAppletWriter out) {
    Iterator<Renderer> iterator = renderer.iterator();
    while (iterator.hasNext()) {
      Renderer renderer = iterator.next();
      out.println(Constants.ACTION_BEGIN_TAG);
      out.addTodoTag(Constants.CREATE_RENDERER);
      out.println(Constants.ACTION_END_TAG);
      Iterator<Renderer.Special> iter2 = renderer.specials.iterator();
      while (iter2.hasNext()) {
        Renderer.Special rendererSpecial = iter2.next();
        out.println(Constants.ACTION_BEGIN_TAG);
        out.addTodoTag(Constants.ADD_RENDERER_SPECIAL);
        out.addValueTag(Integer.toString(renderer.colIndex));
        if (rendererSpecial.value != null) {
          out.addIdTag(rendererSpecial.value);
        }
        if (rendererSpecial.className != null) {
          out.addValueTag(rendererSpecial.className);
        }
        if (rendererSpecial.background != null) {
          out.addVariant1Tag(Integer.toString(rendererSpecial.background.getRGB()));
        }
        out.println(Constants.ACTION_END_TAG);
      }
      out.println(Constants.ACTION_BEGIN_TAG);
      out.addTodoTag(Constants.APPLY_RENDERER);
      out.addValueTag(Integer.toString(renderer.colIndex));
      out.println(Constants.ACTION_END_TAG);
    }
  }
  
  private void buildEditor(ToAppletWriter out) {
    Iterator<ColumnEditor> iterator = editors.iterator();
    while (iterator.hasNext()) {
      ColumnEditor editor = iterator.next();
      out.println(Constants.ACTION_BEGIN_TAG);
      switch (editor.type) {
      case ColumnEditor.CHECKBOX:
        out.addTodoTag(Constants.SET_EDITOR_CHECKBOX);
        break;
      default:
        Logger.getInstance().warn("Unknown type in ColumnEditor");
        break;
      }
      out.addValueTag(Integer.toString(editor.colIndex));
      out.println(Constants.ACTION_END_TAG);
    }
  }

  private void addColumn(String column, ToAppletWriter out, int width) {
    out.println(Constants.ACTION_BEGIN_TAG);
    out.addTodoTag(Constants.ADD_LIST_COLUMN);
    out.addValueTag(column);
    if (width != -2) {
      out.println(Constants.VARIANT1_TAG_BEGIN + Integer.toString(width) + Constants.VARIANT1_TAG_END);
    }
    out.println(Constants.ACTION_END_TAG);
  }

  public void fetchValuesFromRequest(GeneralizedRequest request) {
    if (tableModel instanceof TableModelForEditableTables) {
      ((TableModelForEditableTables)tableModel).fetchValuesFromRequest(request);
    }
  }

  @Override
  public void destroy() {
  }

}
