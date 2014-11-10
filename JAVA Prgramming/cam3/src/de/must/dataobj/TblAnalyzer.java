/*
 * Copyright (c) 1999-2004 Christoph Mueller. All rights reserved.
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

package de.must.dataobj;

import java.sql.*;

/**
 * Class to analyze existing database tables. Creates internal data structure
 * definitions. These internal definitions may be used to create the table in a
 * different database context.
 * @author Christoph Mueller
 */
public class TblAnalyzer {

  static Connection dbConnection;
  static Statement st;
  static String entity;
  static ResultSet rs;
  static ResultSetMetaData metaData;
  static String ColumnName;
  static String[] result;
  static int resultStringCount;

  /**
   * Creates the instruction for a database neutral column definition of a table.
   * @param connection the database connection to be used
   * @param theEntity the name of the table to be analyzed
   * @return an array of instructions to create attributes
   * @see DataObject
   */
  public static String[] createCreationSource(Connection connection, String theEntitiy) {
    result = new String[500];
    String indent = "    ";
    dbConnection = connection;
    entity = theEntitiy;
    resultStringCount = -1;
    try {
      Statement st = dbConnection.createStatement();
      rs = st.executeQuery("select * from " + entity);
      ResultSetMetaData metaData = rs.getMetaData();

      int columnCount = metaData.getColumnCount();

      for (int i = 1; i <= columnCount; i++) {
        ColumnName = new String(metaData.getColumnName(i));
        int singleColumnType = metaData.getColumnType(i);
        switch (singleColumnType) {
        case -7:
          output(indent + "new BooleanAttribute(\"" + ColumnName + "\", \"" + ColumnName + "\"),");
          break;
        case -1:
          output(indent + "new VarcharAttribute(\"" + ColumnName + "\", \"" + ColumnName + "\"),");
          break;
        case 1:
          output(indent + "new CharAttribute(\"" + ColumnName + "\", \"" + ColumnName + "\", " + new Integer(metaData.getColumnDisplaySize(i)) + "),");
          break;
        case 2:
          output(indent + "new NumericAttribute(\"" + ColumnName + "\", \"" + ColumnName + "\"),");
          break;
        case 4:
          output(indent + "new NumericAttribute(\"" + ColumnName + "\", \"" + ColumnName + "\"),");
          break;
        case 5:
          output(indent + "new NumericAttribute(\"" + ColumnName + "\", \"" + ColumnName + "\"),");
          break;
        case 7:
          output(indent + "new NumericAttribute(\"" + ColumnName + "\", \"" + ColumnName + "\"),");
          break;
        case 8:
          output(indent + "new NumericAttribute(\"" + ColumnName + "\", \"" + ColumnName + "\",");
          break;
        case 12:
          output(indent + "new VarcharAttribute(\"" + ColumnName + "\", \"" + ColumnName + "\", " + new Integer(metaData.getColumnDisplaySize(i)) + "),");
          break;
        case 91:
          output(indent + "new DateAttribute(\"" + ColumnName + "\", \"" + ColumnName + "\"),");
          break;
        case 93:
          output(indent + "new DateAttribute(\"" + ColumnName + "\", \"" + ColumnName + "\"),");
          break;
        default:
          output(indent + "// " + ColumnName + " type " + String.valueOf(singleColumnType));
        }
      }
      st.close();
    }
    catch (SQLException e2) {
      de.must.io.Logger.getInstance().info(TblAnalyzer.class, e2);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().info(TblAnalyzer.class, e);
    }
  return result;
  }

  /**
   * Creates the instruction for a building property administration frames.
   * @param connection the database connection to be used
   * @param theEntity the name of the table to be analyzed
   * @return an array of instructions to create a property administration
   * @see de.must.wuic.DataPropertyAdministration
   * @see de.must.markup.DataPropertyAdministration
   */
  public static String[] createPropertyFrameCreationSource(Connection connection, String theEntitiy) {
    result = new String[500];
    dbConnection = connection;
    entity = theEntitiy;
    resultStringCount = -1;
    try {
      Statement st = dbConnection.createStatement();
      rs = st.executeQuery("select * from " + entity);
      ResultSetMetaData metaData = rs.getMetaData();

      int columnCount = metaData.getColumnCount();

      output("Hint: Such instructions for creating the PropertyFrame can be created out of DataObject attribute definitions as well.");
      output("In this case you might already have optimized the field description.");
      output("");
      output("// declarations");

      for (int i = 1; i <= columnCount; i++) {
        ColumnName = new String(metaData.getColumnName(i));
        int singleColumnType = metaData.getColumnType(i);
        switch (singleColumnType) {
        case -7:
          output("  private DataCheckBox " + ColumnName + ";");
          break;
        case -1:
          output("  private DataTextArea " + ColumnName + ";");
          break;
        case 1:
          output("  private DataTextField " + ColumnName + ";");
          break;
        case 2:
          output("  private DataDecimalField " + ColumnName + ";");
          break;
        case 3: // AS/400 gepackt
          output("  private DataIntField " + ColumnName + ";");
          break;
        case 4:
          output("  private DataIntField " + ColumnName + ";");
          break;
        case 5:
          output("  private DataIntField " + ColumnName + ";");
          break;
        case 7:
          output("  private DataFloatField " + ColumnName + ";");
          break;
        case 8:
          output("  private DataDecimalField " + ColumnName + ";");
          break;
        case 12:
          output("  private DataTextField " + ColumnName + ";");
          break;
        case 91:
          output("  private DataDateField " + ColumnName + ";");
          break;
        case 93:
          output("  private DataDateField " + ColumnName + ";");
          break;
        default:
          de.must.io.Logger.getInstance().info(TblAnalyzer.class, "Column " + ColumnName + " with type " + singleColumnType + " not supported");
        }
      }
      output("");
      output("// creation");
      for (int i = 1; i <= columnCount; i++) {
        ColumnName = new String(metaData.getColumnName(i));
        int singleColumnType = metaData.getColumnType(i);
        switch (singleColumnType) {
        case -7:
          output("    " + ColumnName + " = createCheckBox(\"" + ColumnName + "\", \"" + ColumnName + "\");");
          break;
        case -1:
          output("    " + ColumnName + " = createTextArea(\"" + ColumnName + "\", \"" + ColumnName + "\");");
          break;
        case 1:
          output("    " + ColumnName + " = createTextField(\"" + ColumnName + "\", \"" + ColumnName + "\");");
          break;
        case 2:
          output("    " + ColumnName + " = createDecimalField(\"" + ColumnName + "\", \"" + ColumnName + "\");");
          break;
        case 3: // AS/400 gepackt
          output("    " + ColumnName + " = createIntField(\"" + ColumnName + "\", \"" + ColumnName + "\");");
          break;
        case 4:
          output("    " + ColumnName + " = createIntField(\"" + ColumnName + "\", \"" + ColumnName + "\");");
          break;
        case 5:
          output("    " + ColumnName + " = createIntField(\"" + ColumnName + "\", \"" + ColumnName + "\");");
          break;
        case 7:
          output("    " + ColumnName + " = createFloatField(\"" + ColumnName + "\", \"" + ColumnName + "\");");
          break;
        case 8:
          output("    " + ColumnName + " = createDecimalField(\"" + ColumnName + "\", \"" + ColumnName + "\");");
          break;
        case 12:
          output("    " + ColumnName + " = createTextField(\"" + ColumnName + "\", \"" + ColumnName + "\");");
          break;
        case 91:
          output("    " + ColumnName + " = createDateField(\"" + ColumnName + "\", \"" + ColumnName + "\");");
          break;
        case 93:
          output("    " + ColumnName + " = createDateField(\"" + ColumnName + "\", \"" + ColumnName + "\");");
          break;
        }
      }
      st.close();
    }
    catch (SQLException e2) {
      de.must.io.Logger.getInstance().error(TblAnalyzer.class, e2);
    }
    catch (Exception e) {
      de.must.io.Logger.getInstance().error(TblAnalyzer.class, e);
    }
  return result;
  }

  /**
   *
   * @param outputString
   */
  public static void output(String outputString) {
    resultStringCount++;
    result[resultStringCount] = outputString;
    // de.must.io.Logger.getInstance().info(getClass(), outputString);
  }

}

