/*
 * Copyright (c) 1999 Christoph Mueller. All rights reserved.
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

package de.must.wuic;

import java.awt.*;

/**
 * @author Christoph Mueller
 */
public class AttrTable extends ScrollPane {

  private Panel mainPanel = new Panel();
  private FlowLayout leftFlow = new FlowLayout();
  private Panel panelGridRow[];
  private SizePanel lengthPanel[][];
  private int rows;
  private int cols = 9;

  /**
   * Constructs a new attribute-table initialized with rows.
   * @param rows the number of rows
   */
  public AttrTable(int rows) {
    this.rows = rows;
    try {
      jbInit();
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
  }

  private void jbInit() throws Exception{
    this.add(mainPanel);
    mainPanel.setLayout(new GridLayout(rows, 1));
    leftFlow.setAlignment(FlowLayout.LEFT);
    panelGridRow = new Panel[rows];
    lengthPanel = new SizePanel[rows][cols];

    for (int i = 0; i < rows; i++) {
      panelGridRow[i] = new Panel();
      panelGridRow[i].setLayout(leftFlow);
      mainPanel.add(panelGridRow[i]);
    }

  }

	/**
	 * @param col
	 * @param colLabel
	 * @param c
	 * @param width
	 */
  public void addColumn(int col, String colLabel, Component[] C, int width) {
    lengthPanel[0][col] = new SizePanel(width, 25);
    lengthPanel[0][col].setLayout(leftFlow);
    lengthPanel[0][col].add(new Label(colLabel));
    panelGridRow[0].add(lengthPanel[0][col]);
    for (int i = 0; i < rows-1; i++) {
      lengthPanel[i+1][col] = new SizePanel(width, 25);
      lengthPanel[i+1][col].setLayout(leftFlow);
      panelGridRow[i+1].add(lengthPanel[i+1][col]);
      if (C[i] != null) lengthPanel[i+1][col].add(C[i]);
    }
  }

}


