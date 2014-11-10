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

package de.must.print;

import de.must.dataobj.ConnectionSpecification;

/**
 * Interface to control report tools.
 * At the moment, Crystal Reports[TM] is supported. ODBC to the database is required.
 * See Crystal Reports[TM] select assistent for how to produce where conditions.
 * The current version of Report.exe is based upon Crystal Reports Version 7 VCL,
 * which seems to be unreliable concerning parameter passing. Any engagement 
 * concerning compiling and testing with a newer VCL Version is highly appreciated.
 * Hint: static methods are going to become deprecated. Prefere creating 
 * instances of the Report class. The advantage is the option that you may wait 
 * until the report is done.
 * @author Christoph Mueller
 */
public class Report {
  
  public static final int OUTPUT_TO_PRINTER = 0;
  public static final int OUTPUT_TO_WINDOW = 1;
  public static final int OUTPUT_TO_HTML = 2;

  /**
   * Executes a specified report.
   * @param reportName the name of the report to be executed
   * @param connectionSpecification the specification to connect to the database
   * @param outputToWindow indicates whether the output is to be presented on screen instead of printing
   * @return true if no error occurred
   */
  public static boolean exec(String reportName, ConnectionSpecification connectionSpecification, boolean outputToWindow) {
    return exec(reportName, connectionSpecification, outputToWindow, "");
  }

  /**
   * Executes a specified report.
   * If you downloaded the whole framework, it's recomended to use ConnectionSpecification.
   * @param reportName the name of the report to be executed
   * @param odbcName the name of the ODBC data source name to connect to
   * @param outputToWindow indicates whether the output is to be presented on screen instead of printing
   * @param whereCondition a filter definition in Crystal Reports syntax - sample: {tableName.columnName} like '*searchedFragment*'
   * @return true if no error occurred
   */
  public static synchronized boolean exec(String reportName, String odbcName, boolean outputToWindow, String whereCondition) {
    StringBuffer cmd = new StringBuffer();
    cmd.append("Report.exe Report[" + reportName + ".rpt] datasource[" + odbcName + "]");
    if (whereCondition != null && !whereCondition.equals("")) cmd.append(" where[" + whereCondition + "]");
    if (outputToWindow) {
      cmd.append(" Output[toWindow]");
      // cmd.append" State[wsNormal]"); // choose wsNormal or wsMaximized;
      cmd.append(" State[wsMaximized]"); // choose wsNormal or wsMaximized;
      cmd.append(" PrintSetupBtn[true]");  // activate if print setup button should be visible - to choose a printer e.g.
    }
    else cmd.append(" Output[toPrinter]");
    return exec(cmd.toString());
  }

  /**
   * Executes a specified report.
   * @param reportName the name of the report to be executed
   * @param connectionSpecification the specification to connect to the database
   * @param outputToWindow indicates whether the output is to be presented on screen instead of printing
   * @param whereCondition a filter definition in Crystal Reports syntax - sample: {tableName.columnName} like '*searchedFragment*'
   * @return true if no error occurred
   */
  public static synchronized boolean exec(String reportName, ConnectionSpecification connectionSpecification, boolean outputToWindow, String whereCondition) {
    return exec(reportName, connectionSpecification,  outputToWindow, whereCondition, (String[])null);
  }

  /**
   * Executes a specified report.
   * @param reportName the name of the report to be executed
   * @param connectionSpecification the specification to connect to the database
   * @param outputToWindow indicates whether the output is to be presented on screen instead of printing
   * @param whereCondition a filter definition in Crystal Reports syntax - sample: {tableName.columnName} like '*searchedFragment*'
   * @param parameters an array of paramters to be set in Crystal Reports
   * @return true if no error occurred
   */
  public static synchronized boolean exec(String reportName, ConnectionSpecification connectionSpecification, boolean outputToWindow, String whereCondition, String[] parameters) {
    int outputType = OUTPUT_TO_PRINTER;
    if (outputToWindow) outputType = OUTPUT_TO_WINDOW;
    return exec(reportName, connectionSpecification, outputType, whereCondition, parameters);
  }

  /**
   * Executes a specified report.
   * @param reportName the name of the report to be executed
   * @param connectionSpecification the specification to connect to the database
   * @param outputType OUTPUT_TO_PRINTER or OUTPUT_TO_WINDOW OR OUTPUT_TO_HTML;
   * @param whereCondition a filter definition in Crystal Reports syntax - sample: {tableName.columnName} like '*searchedFragment*'
   * @param parameters an array of paramters to be set in Crystal Reports
   * @return true if no error occurred
   */
  public static synchronized boolean exec(String reportName, ConnectionSpecification connectionSpecification, int outputType, String whereCondition, String[] parameters) {
    return exec(reportName, connectionSpecification, outputType, whereCondition, parameters, "C:\temp\report_output.html");
  }

  /**
   * Executes a specified report.
   * @param reportName the name of the report to be executed
   * @param connectionSpecification the specification to connect to the database
   * @param outputType OUTPUT_TO_PRINTER or OUTPUT_TO_WINDOW OR OUTPUT_TO_HTML;
   * @param whereCondition a filter definition in Crystal Reports syntax - sample: {tableName.columnName} like '*searchedFragment*'
   * @param parameters an array of paramters to be set in Crystal Reports
   * @param outputFileName the complete path of the output file (for HTML output)
   * @return true if no error occurred
   */
  public static synchronized boolean exec(String reportName, ConnectionSpecification connectionSpecification, int outputType, String whereCondition, String[] parameters, String outputFileName) {
		String cmd =
			getReportCmd(
				reportName,
				connectionSpecification,
				outputType,
				whereCondition,
				parameters,
				outputFileName);
    return exec(cmd.toString());
  }

	private static synchronized String getReportCmd (
		String reportName,
		ConnectionSpecification connectionSpecification,
		int outputType,
		String whereCondition,
		String[] parameters,
		String outputFileName
    ) { // --------------
		StringBuffer cmd = new StringBuffer();
		cmd.append("Report.exe Report[" + reportName + ".rpt] datasource[" + connectionSpecification.getOdbcName() + "]");
		if (whereCondition != null && !whereCondition.equals("")) cmd.append(" where[" + whereCondition + "]");
		switch (outputType) {
		case OUTPUT_TO_WINDOW:
		  cmd.append(" Output[toWindow]");
		  // cmd.append" State[wsNormal]"; // choose wsNormal or wsMaximized;
		  cmd.append(" WindowState[wsMaximized]"); // choose wsNormal or wsMaximized;
		  cmd.append(" PrintSetupBtn[true]");  // activate if print setup button should be visible - to choose a printer e.g.
		  break;
		case OUTPUT_TO_HTML:
		  cmd.append(" Output[toHTML]");
		  break;
		default:
		  cmd.append(" Output[toPrinter]");
		} 
		if (connectionSpecification.getUserName() != null) {
		  cmd.append(" User[" + connectionSpecification.getUserName() + "]");
		}
		if (connectionSpecification.getPassword() != null) {
		  cmd.append(" Password[" + connectionSpecification.getPassword() + "]");
		}
		if (parameters != null) for (int i = 0; i < parameters.length; i++) {
		  cmd.append(" Parm" + (i+1) + "[" + parameters[i] + "]");
		}
		if (outputFileName != null) {
		  cmd.append(" FileName[" + outputFileName + "]");
		}
		return cmd.toString();
	}

  private static synchronized boolean exec(String cmd) {
    // de.must.io.Logger.getInstance().info(getClass(), cmd);
    try {
      Runtime.getRuntime().exec(cmd);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(Report.class, e);
      de.must.io.Logger.getInstance().info(Report.class, cmd + " could not be executed.");
      de.must.io.Logger.getInstance().info(Report.class, "Please ensure that Report.exe may be found by java.exe by putting it in an appropriate directory.");
      try {
        // inform user if there is a client context
        Class.forName("de.must.wuic.StandardDialog");
        de.must.wuic.StandardDialog.presentText(null, new String[] {"Cannot start reporting API Report.exe!"});
      } catch (ClassNotFoundException cnfe) {
      }
      return false;
    }
    return true;
  }
  
  //--------------------------------------------------------------------------
  
  private String reportName;
  private ConnectionSpecification connectionSpecification;
  private int outputType = OUTPUT_TO_PRINTER;
  private String whereCondition;
  private String[] parameters;
  private String outputFileName;

  /**
   * Constructs a new report. Useful for individual process completion wait.
   * @param reportName the name of the report to be executed
   * @param odbcName the name of the ODBC data source name to connect to
   */
  public Report(String reportName, String odbcName) {
    this(reportName, new ConnectionSpecification(odbcName));
  }
  
  /**
	 * Constructs a new report. Useful for individual process completion wait.
	 * @param reportName the name of the report to be executed
   * @param connectionSpecification the specification to connect to the database
	 */
	public Report(String reportName, ConnectionSpecification connectionSpecification) {
    this.reportName = reportName;
    this.connectionSpecification = connectionSpecification;
  }
  
  /**
   * Sets the outputType.
   * @param outputType The outputType to set
   */
  public void setOutputType(int outputType) {
    this.outputType = outputType;
  }

  /**
   * Sets the parameters.
   * @param parameters The parameters to set
   */
  public void setParameters(String[] parameters) {
    this.parameters = parameters;
  }

  /**
   * Sets the whereCondition.
   * @param whereCondition The whereCondition to set
   */
  public void setWhereCondition(String whereCondition) {
    this.whereCondition = whereCondition;
  }

  /**
   * Executes the report assynchroniously
   */
  public boolean execute() {
    return exec(false);
  }

  /**
   * Executes the report and waits until the report is done.
   */
  public boolean executeAndWaitUntilDone() {
    return exec(true);
  }

  private boolean exec(boolean waitForFlag) {
    String cmd =
      getReportCmd(
        reportName,
        connectionSpecification,
        outputType,
        whereCondition,
        parameters,
        outputFileName);
    return exec(cmd, waitForFlag);
  }

  private boolean exec(String cmd, boolean waitFor) {
    // de.must.io.Logger.getInstance().info(getClass(), cmd);
    try {
      Process reportProcess = Runtime.getRuntime().exec(cmd);
      if (waitFor) {
        reportProcess.waitFor();
        int exitValue = reportProcess.exitValue();
        if (exitValue != 0) {
          de.must.io.Logger.getInstance().info(getClass(), reportProcess.getErrorStream());
        }
      }
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
      de.must.io.Logger.getInstance().info(getClass(), cmd + " could not be executed.");
      de.must.io.Logger.getInstance().info(getClass(), "Please ensure that Report.exe may be found by java.exe by putting it in an appropriate directory.");
      try {
        // inform user if there is a client context
        Class.forName("de.must.wuic.StandardDialog");
        de.must.wuic.StandardDialog.presentText(null, new String[] {"Cannot start reporting API Report.exe!"});
      } catch (ClassNotFoundException cnfe) {
      }
      return false;
    }
    return true;
  }
  
}
