/*
 * Copyright (c) 2005-2010 Christoph Mueller. All rights reserved.
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

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.print.Printable;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.plaf.basic.BasicComboBoxEditor;

import de.must.io.Logger;
import de.must.print.Previewer;
import de.must.print.ProportionalListReportDirectly;

/**
 * A frame to preview printout. 
 * @author Christoph Mueller
 */
public class PreviewFrame extends MustFrame implements Previewer {
  
  class DrawPanel extends JPanel {
    public DrawPanel() {
      setBackground(Color.WHITE);
    }
    public void paintComponent(Graphics g) {
      super.paintComponent(g);
      try {
        printable.print(g, null, currentPageIndex);
      } catch (PrinterException e) {
        Logger.getInstance().error(getClass(), e);
      }
    }
  }
  
  private JPanel panelHeader = new JPanel();
  private JButton printButton = new JButton("Print");
  private JComboBox<String> pageChooser = new JComboBox<String>();
  private DrawPanel drawPanel = new DrawPanel();
  private Printable printable;
  private int nbrOfPages;
  private int currentPageIndex;

  public PreviewFrame(Printable printable) {
    this.printable = printable;
    setTitle("Print Preview");
    pageChooser.addItemListener(new ItemListener() {
      public void itemStateChanged(ItemEvent e) {
        currentPageIndex = pageChooser.getSelectedIndex();
        drawPanel.repaint();
      }
    });
    printButton.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent e) {
        PrinterJob printerJob = PrinterJob.getPrinterJob();
        // first do your settings
//        if (false) {
//          if (!printerJob.printDialog()) return;
//        }
        ((ProportionalListReportDirectly)PreviewFrame.this.printable).setPrinterJob(printerJob);
        ((ProportionalListReportDirectly)PreviewFrame.this.printable).start(); // now we can do the rest as batch
      }
    });
    pageChooser.setEditor(new BasicComboBoxEditor());
    panelHeader.add(pageChooser);
    panelHeader.add(printButton);
    drawPanel.setPreferredSize(new Dimension(600, 740));
    getContentPane().setLayout(new BorderLayout());
    getContentPane().add(panelHeader, BorderLayout.NORTH);
    JScrollPane scrollPane = new JScrollPane(drawPanel);
    getContentPane().add(scrollPane, BorderLayout.CENTER);
    pack();
  }

  /* (non-Javadoc)
   * @see de.must.print.Previewer#setPageAmount(int)
   */
  public void setPageAmount(int nbrOfPages) {
    this.nbrOfPages = nbrOfPages;
    pageChooser.removeAllItems();
    for (int i = 1; i <= nbrOfPages; i++) {
      pageChooser.addItem("Page " + String.valueOf(i));
    }
  }

  @Override
  public boolean isClosingAllowed(int closeConfirmId) {
    return true;
  }
  
}
