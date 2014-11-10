/*
 * Copyright (c) 2007-2012 Christoph Mueller. All rights reserved.
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
import java.util.Vector;

import javax.swing.JTable;

/**
 * Transfers table content from a GUI table to an HTML table as sorted.
 * @author Christoph Mueller
 */
public class TableToHTML extends ProportionalListReportByHtml {
  
  private JTable table;
  private String[] columnHeader;
  private int[] proportion;

  public TableToHTML(String fileName, String title, String generator, JTable table, String[] columnHeader, int[] proportion) throws IOException {
    super(fileName, title, generator);
    this.table = table;
    this.columnHeader = columnHeader;
    this.proportion = proportion;
 }

  protected void runCore() throws Exception {
    int[] items = table.getSelectedRows();
    if (items.length == 0) {
      int rows = table.getRowCount();
      items = new int[rows];
      for (int i = 0; i < rows; i++) {
        items[i] = table.getRowSorter().convertRowIndexToModel(i);
      }
    }
//    for (int i = 0; i < items.length; i++) {
//      System.out.println(table.getModel().getValueAt(items[i], 1));
//    }
    
    setDefaultProportion(proportion);
    beginHtml(true);
    beginTable();
    outputHead(columnHeader);

    setStatusInformation("Erstelle HTML ...");
    
    int columns = table.getModel().getColumnCount();

    for (int i = 0; i < items.length; i++) {
      Vector<Object> rowValues = new Vector<Object>();
      for (int j = 0; j < columns; j++) {
        rowValues.add(table.getModel().getValueAt(table.getRowSorter().convertRowIndexToModel(items[i]), j));
      }
      println(rowValues);
    }
    endTable();
    endHtml();
    presentInBrowser();
  }

}
