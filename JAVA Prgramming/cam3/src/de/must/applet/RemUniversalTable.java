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

package de.must.applet;

import java.awt.Color;
import java.awt.Component;
import java.awt.MediaTracker;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Vector;

import javax.swing.DefaultCellEditor;
import javax.swing.ImageIcon;
import javax.swing.JCheckBox;
import javax.swing.JTable;
import javax.swing.SwingConstants;
import javax.swing.UIManager;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.TableCellEditor;
import javax.swing.table.TableColumn;

import de.must.dataobj.Identifier;
import de.must.util.KeyValuePairAlpha;
import de.must.wuic.MustTable;

public class RemUniversalTable extends MustTable implements RemoteGUIComponent {
  
  private class Renderer extends DefaultTableCellRenderer {
    class Special {
      Color background;
    }
    Hashtable<String, Special> specials = new Hashtable<String, Special>();
    public Component getTableCellRendererComponent(JTable table, Object value, boolean isSelected, boolean hasFocus, int row, int column) {
      Component component = super.getTableCellRendererComponent(table, value, isSelected, hasFocus, row, column);
//      Special special = specials.get(value);
//      if (special != null) {
//        if (special.background != null) {
//          component.setForeground(special.background);
//        }
//      }
      return component;
    }
  }
  
  private ServerCaller serverCaller;
  private int estimatedMaxCols = 100;
  private Vector<String> columnNameVector;
  private Vector<Integer> columnWidth;
  private Renderer currentRenderer;
  private Vector<Object> rowValues;
  private String[] columnNames;
  protected Vector<Integer> editableColumns = new Vector<Integer>(); // entire column is editable
  private Renderer[] renderer;
  private TableCellEditor[] editors;
  protected TableModelForEditableTables tableModel;

  private double widthFactor = -1;

  public RemUniversalTable() {
    this(null);
  }

  public RemUniversalTable(ServerCaller serverCaller) {
    this.serverCaller = serverCaller;
    columnNameVector = new Vector<String>();
    columnWidth = new Vector<Integer>();
    rowValues = new Vector<Object>();
  }

  public void setColumnEditable(int column) {
    editableColumns.add(new Integer(column));
  }
  
  @Override
  public String getId() {
    return null; // not needed here
  }
 
  public boolean perform (Action action) {
    // if (action.fatherid != null && action.fatherid != id) return false;  // no delegation due to wrong ID
    if (Constants.CLEAR_LIST_COLUMNS.equals(action.toDo)) {
      columnNameVector.clear();
      columnWidth.clear();
    } else if (Constants.ADD_LIST_COLUMN.equals(action.toDo)) {
      columnNameVector.add(action.value);
      int width = -2;
      if (action.variant1 != null) {
        width = Integer.parseInt(action.variant1);
      }
      columnWidth.add(new Integer(width));
    } else if (Constants.APPLY_LIST_COLUMNS.equals(action.toDo)) {
      columnNames = new String[columnNameVector.size()];
      columnNames = columnNameVector.toArray(columnNames);
      tableModel = new TableModelForEditableTables(columnNames, editableColumns);
      applyColumnWidth();
    } else if (Constants.CREATE_RENDERER.equals(action.toDo)) {
      currentRenderer = new Renderer();
    } else if (Constants.ADD_RENDERER_SPECIAL.equals(action.toDo)) {
      Renderer.Special special = currentRenderer.new Special();
      if (action.variant1 != null) {
        special.background = new Color(action.getVariant1AsInt());
      }
      currentRenderer.specials.put(action.id, special);
    } else if (Constants.APPLY_RENDERER.equals(action.toDo)) {
      if (renderer == null) {
        renderer = new Renderer[estimatedMaxCols];
      }
      renderer[action.getValueAsInt()] = currentRenderer;
    } else if (Constants.SET_EDITOR_CHECKBOX.equals(action.toDo)) {
      if (editors == null) {
        editors = new TableCellEditor[estimatedMaxCols];
      }
      final JCheckBox checkBox = new JCheckBox();
      checkBox.addActionListener(new ActionListener() {
        public void actionPerformed(ActionEvent e) {
          Vector<KeyValuePairAlpha> params = new Vector<KeyValuePairAlpha>();
          params.add(new KeyValuePairAlpha(Constants.ACTION, Constants.ACTION_ITEM_SELECTED));
          params.add(new KeyValuePairAlpha(Constants.ACTION_SOURCE, Constants.TABLE));
          serverCaller.contactServer(params);
        }
      });
      checkBox.setHorizontalAlignment(SwingConstants.CENTER);
      editors[action.getValueAsInt()] = new DefaultCellEditor(checkBox);
    } else if (Constants.CLEAR_LIST.equals(action.toDo)) {
      tableModel = new TableModelForEditableTables(columnNames, editableColumns);
    } else if (Constants.ADD_ROW_OBJECT.equals(action.toDo)) {
      String className = action.variant2;
      ImageIcon icon = null;
      if (action.variant1 != null 
      && (icon = AppletGlobal.getInstance().getImageIcon(action.variant1))!= null
      && icon.getImageLoadStatus() != MediaTracker.ERRORED
      ) {
        rowValues.add(icon);  
      } else if (Boolean.class.getName().equals(className)) {
        rowValues.add(Boolean.valueOf(action.value));
      } else if (Date.class.getName().equals(className)) {
        rowValues.add(Date.valueOf(action.value));
      } else  if (Timestamp.class.equals(className)) {
        if (action.value.length() == 0) rowValues.add(null);
        else rowValues.add(Timestamp.valueOf(action.value));
      } else  if (Integer.class.equals(className)) {
        if (action.value.length() == 0) rowValues.add(null);
        else rowValues.add(action.getValueAsInt());
      } else if (Double.class.equals(className)) {
        if (action.value.length() == 0) rowValues.add(null);
        else rowValues.add(Double.valueOf(action.value));
      } else {
        rowValues.add(action.value);
      }
      if (action.variant3 != null) {
        tableModel.setCellEditable(tableModel.getRowCount(), rowValues.size()-1, true);
      }
    } else if (Constants.APPLY_ROW.equals(action.toDo)) {
      tableModel.addIndexedRow(rowValues.toArray(new Object[rowValues.size()]), Identifier.parseString(action.id));
      rowValues.clear();
    } else if (Constants.APPLY_LIST.equals(action.toDo)) {
      tableModel.setEditBeginState();
      applyColumnWidth();
      setModel(tableModel);
//      for (int i = 0; i < renderer.length; i++) {
//        if (renderer[i] != null) {
//          getColumnModel().getColumn(i).setCellRenderer(renderer[i]);
//        }
//      }
      if (editors != null) for (int i = 0; i < editors.length; i++) {
         if (editors[i] != null) {
          getColumnModel().getColumn(i).setCellEditor(editors[i]);
        }
      }
      tableModel.setRowSorter(this);
    } else { // none of the above
      return false; // no delegation due to action not suitable
    }
    return true;
  }
  
  private void applyColumnWidth() {
    setModel(tableModel);
    int i = -1;
    Iterator<Integer> iterator = columnWidth.iterator();
    while (iterator.hasNext()) {
      i++;
      int width = iterator.next().intValue();
      TableColumn column = getColumnModel().getColumn(i);
      column.setPreferredWidth(getEffectiveWidth(width));
    }
  }

  private int getEffectiveWidth(int baseWidth) {
    if (widthFactor == -1) { // first time
      Object value = UIManager.get("Table.font");
      if (value instanceof javax.swing.plaf.FontUIResource) {
        int tableFontSize = ((javax.swing.plaf.FontUIResource)value).getSize();
        widthFactor = (double)tableFontSize / 11;
      } else {
        widthFactor = 1;
      }
    }
    return (int)(baseWidth * widthFactor);
  }

  @Override
  public void setValue(String value) {
  }

  @Override
  public void setEditable(boolean value) {
  }

  @Override
  public boolean isModified() {
    return false;
  }

  @Override
  public void extendParams(Vector<KeyValuePairAlpha> params) {
    tableModel.extendParams(params);
  }

}
