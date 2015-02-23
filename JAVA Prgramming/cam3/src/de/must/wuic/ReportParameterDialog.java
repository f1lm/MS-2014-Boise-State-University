/*
 * Copyright (c) 1999-2003 Christoph Mueller. All rights reserved.
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

import de.must.middle.InterruptibleBatchThread;
import de.must.print.*;
import de.must.dataobj.ConnectionSpecification;
import javax.swing.*;
import java.awt.*;

/**
 * Parameter dialog with additional output option.
 * @author Christoph Mueller
 */
public abstract class ReportParameterDialog extends ParameterDialog {

  private JPanel printParmPanel = new JPanel();
  private ButtonGroup output = new ButtonGroup();
  private JRadioButton printer = new JRadioButton(getTranslation("TEXT_PRINTER"), true);
  private JRadioButton window = new JRadioButton(getTranslation("TEXT_SCREEN"), false);
  private JRadioButton hTML = new JRadioButton(getTranslation("TEXT_HTML_FILE"), false);
  protected DirectorySpecification outputDir;
  
  /**
   * Constructs a new report parameter dialog.
   * @param ownerFrame
   */
  public ReportParameterDialog(Frame ownerFrame) {
    this(ownerFrame, false);
  }

  /**
   * Constructs a report parameter dialog 
   * @param ownerFrame the frame which owns this dialog
   * @param htmlEnable whether html output is available or not
   */
  public ReportParameterDialog(Frame ownerFrame, boolean htmlEnabled) {
    this(ownerFrame, new boolean[] {true, true, htmlEnabled});
  }

  /**
   * Constructs a report parameter dialog 
   * @param ownerFrame the frame which owns this dialog
   * @param outputEnabled the available output: 
   * outputEnabled[0] printer 
   * outputEnabled[1] window 
   * outputEnabled[3] HTML 
   */
  public ReportParameterDialog(Frame ownerFrame, boolean[] outputEnabled) {
    super(ownerFrame);
    if (anythingToChoose(outputEnabled)) {
      printParmPanel.add(new JLabel(getTranslation("TEXT_OUTPUT") + ": "));
      output.add(printer);
      output.add(window);
      output.add(hTML);
    }
    // presselect the first enabled choice
    if (outputEnabled[0]) printer.setSelected(true);
    else if (outputEnabled[1]) window.setSelected(true);
    else if (outputEnabled[2]) hTML.setSelected(true);
    if (outputEnabled[0]) printParmPanel.add(printer);
    if (outputEnabled[1]) printParmPanel.add(window);
    if (outputEnabled[2]) printParmPanel.add(hTML);
    if (anythingToChoose(outputEnabled)) {
      panelBottom.add(printParmPanel, BorderLayout.NORTH);
    }
  }
  
  private boolean anythingToChoose(boolean[] outputEnabled) {
    int countChoices = 0;
    for (int i = 0; i < outputEnabled.length; i++) {
			if (outputEnabled[i]) countChoices++; 
		}
    return (countChoices > 1);
  }
  
  protected void preselectHtml() {
    hTML.setSelected(true);
  }

  /**
   * Returns true if output to window is requested by user.
   * @return true if output to window is requested by user
   */
  public boolean isOutputToWindow() {
    return window.isSelected();
  }

  /**
   * Returns true if output to HTML is requested by user.
   * @return true if output to HTML is requested by user
   */
  public boolean isOutputToHTML() {
    return hTML.isSelected();
  }

  /**
   * Prints the report.
   * @param reportName
   * @param connectionSpecification
   */
  protected void print(String reportName, ConnectionSpecification connectionSpecification) {
    print(reportName, connectionSpecification, null);
  }

  /**
   * Prints the report.
   * @param reportName
   * @param connectionSpecification
   * @param whereCondition
   */
  protected void print(String reportName, ConnectionSpecification connectionSpecification, String whereCondition) {
    print(reportName, connectionSpecification, whereCondition, false);
  }

  /**
   * Prints the report.
   * @param reportName
   * @param connectionSpecification
   * @param whereCondition
   * @param waitFor whether we should wait until the report is done or not
   */
  protected void print(String reportName, ConnectionSpecification connectionSpecification, String whereCondition, boolean waitFor) {
    Report report = new Report(reportName, connectionSpecification);
    report.setWhereCondition(whereCondition);
    if (isOutputToHTML()) {
      report.setOutputType(Report.OUTPUT_TO_HTML);
    }
    if (isOutputToWindow()) {
      report.setOutputType(Report.OUTPUT_TO_WINDOW);
    }
    if (waitFor) {
      report.executeAndWaitUntilDone();
    } else {
      report.execute();
    }
  }

  /**
   * Prints the report with cancel opportunity.
   * @param report the report to print
   */
  protected void print(ProportionalListReport report) {
    BatchThreadControllerFrame controller = new BatchThreadControllerFrame();
    controller.setTitle("Drucken");
    // report.addThreadDoneListener(this);
    report.setThreadController(controller);
    report.start();
  }
  
  /**
   * Starts a report thread controlled by a BatchThreadControllerFrame.
   * @param thread the thread to start
   * @param title the title of the controller frame
   */
  protected void startThreadWithControler(InterruptibleBatchThread thread, String title) {
    BatchThreadControllerFrame contr = new BatchThreadControllerFrame();
    contr.setTitle(title);
    thread.setThreadController(contr);
    thread.start();
  }

}
