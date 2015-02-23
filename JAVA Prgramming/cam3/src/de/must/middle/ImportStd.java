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

package de.must.middle;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Hashtable;
import java.util.Locale;

import de.must.dataobj.AbstractAttribute;
import de.must.dataobj.DataObject;
import de.must.dataobj.DataTextObjectWithDelimiter;
import de.must.dataobj.LoadableByDescription;
import de.must.io.Logger;

/**
 * Standards to import from DataTextObjectWithDelimiter.
 * Parses fields automatically by description in first line of input file.
 * @see ExportStd
 * @author Christoph Mueller
 */
public abstract class ImportStd extends InterruptibleProcess {
  
  public class NoDataFoundException extends Exception {
    public NoDataFoundException(String message) {
      super(message);
    }
  }
  
  private String[] mandatoryHeaders;
  protected DataObject mainDataObject;
  protected DataTextObjectWithDelimiter inp;
  private Hashtable<String, DataObject> descColDOs = new Hashtable<String, DataObject>();
  private Hashtable<String, DataObject> refDOs = new Hashtable<String, DataObject>();
  protected String[] colHeaders;
  protected String[] colNames;
  protected int[] colTypes;
  private DateFormat[] dateFormats = new DateFormat[] {
    new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS"),
    new SimpleDateFormat("dd.MM.yyyy hh:mm"),
  };
  private int counter;
  
  public ImportStd(AliveConfirmer aliveConfirmer) {
    super(aliveConfirmer);
  }
  
  /**
   * Sets mandatory headers - if they are not found, NoDataException is thrown.
   * @param mandatoryHeaders the headers that must exist in first row
   */
  public void setMandatoryHeaders(String[] mandatoryHeaders) {
    this.mandatoryHeaders = mandatoryHeaders;
  }
  
  /**
   * Sets the file containing the rows to be imported.
   * @param inp the file containing the rows to be imported
   */
  protected void setDataTextObjectWithDelimiter(DataTextObjectWithDelimiter inp) {
    this.inp = inp;
  }
  
  /**
   * Set the main DataObject receiving the imported rows.
   * @param mainDataObject main DataObject receiving the imported rows
   */
  protected void setMainDataObject(DataObject mainDataObject) {
    this.mainDataObject = mainDataObject;
  }
  
//  protected void addDescDo(DataObject descDo) {
//    addDescDo(((LoadableByDescription)descDo).getDescriptionColumnName(), descDo);
//  }
  
  /**
   * Adds a DataObject implementing LoadableByDescription to delegate import to a table reference.
   * @param desc the description of the column
   * @param descDo DataObject implementing LoadableByDescription
   */
  protected void addDescDo(String desc, DataObject descDo) {
    descColDOs.put(desc, descDo);
  }
  
  /**
   * Adds a reference DataObject with single string identifier associated with the column.
   * Causes a new entry in the reference DataObject if not found.
   * @param keyColumn the key column name
   * @param refDo the reference data object
   */
  protected void addRefDo(String keyColumn, DataObject refDo) {
    refDOs.put(keyColumn, refDo);
  }
  
  protected void processImport() throws NoDataFoundException {
    // get column headers
    inp.nextRow(); // first row column names
    colNames = new String[inp.getFieldCount()];
    colHeaders = new String[inp.getFieldCount()];
    colTypes = new int[inp.getFieldCount()];
    AbstractAttribute[] attr = mainDataObject.getAttributes();
    for (int i = 0; i < colNames.length; i++) {
      String colName = inp.getText(i+1).trim();
      colHeaders[i] = colName;
      boolean done = false;
      for (int j = 0; j < attr.length; j++) {
        if (attr[j].getFieldName().equals(colName)) {
          colNames[i] = attr[j].getFieldName();
          colTypes[i] = attr[j].getType();
          done = true;
          break;
        }
      }
      if (!done) for (int j = 0; j < attr.length; j++) {
        if (attr[j].getDescription().equals(colName)) {
          colNames[i] = attr[j].getFieldName();
          colTypes[i] = attr[j].getType();
          done = true;
          break;
        }
      }
    }
    // check if it is a suitable import file
    if (mandatoryHeaders != null) for (int i = 0; i < mandatoryHeaders.length; i++) {
      boolean found = false;
      for (int j = 0; j < colHeaders.length; j++) {
        if (colHeaders[j] != null && colHeaders[j].equalsIgnoreCase(mandatoryHeaders[i])) found = true;
      }
      if (!found) {
        String message = "\"" + mandatoryHeaders[0] + "\"";
        for (int j = 1; j < mandatoryHeaders.length; j++) {
          message += ", \"" + mandatoryHeaders[j] + "\"";
        }
        message += " in 1. Zeile erwartet - keine Daten gefunden.";
        throw new NoDataFoundException(message);
      }
    }
    // import data rows
    while(isToRun() && inp.nextRow()) {
      setStatusInformation(++counter + " rows imported");
      if (!load()) {
        mainDataObject.newRowWithNextIdentifierAllocation();
      }
      for (int i = 0; i < colNames.length; i++) {
        String text = inp.getText(i+1);
        if (text.length() > 0 && colNames[i] != null) {
          if (refDOs.containsKey(colNames[i])) {
            DataObject mustDO = refDOs.get(colNames[i]);
            if (!mustDO.load(text)) {
              mustDO.newRow();
              mustDO.setText(mustDO.getIdentifyTemplate().getIdentifyColumnNames()[0], text);
              mustDO.save();
            }
          }
          if (colNames[i].equalsIgnoreCase(mainDataObject.getIdentifyTemplate().getIdentifyColumnNames()[0])) {
            // ignore primary key field
          } else if (descColDOs.containsKey(colHeaders[i])) {
            DataObject dataObj = descColDOs.get(colHeaders[i]);
            mainDataObject.setInt(colNames[i], getNIbyDescription(dataObj, text));
          } else switch (colTypes[i]) {
          case AbstractAttribute.BOOLEAN:
            mainDataObject.setBoolean(colNames[i], text.equals("true"));
            break;
          case AbstractAttribute.CHAR:
            mainDataObject.setText(colNames[i], text);
            break;
          case AbstractAttribute.VARCHAR:
            mainDataObject.setText(colNames[i], text);
            break;
          case AbstractAttribute.MEMO:
            mainDataObject.setText(colNames[i], text);
            break;
          case AbstractAttribute.INTEGER:
            try {
                mainDataObject.setInt(colNames[i], Integer.parseInt(text));
              } catch (NumberFormatException e) {
                Logger.getInstance().error(getClass(), e);
              }
            break;
          case AbstractAttribute.NUMBER:
            try {
                mainDataObject.setInt(colNames[i], Integer.parseInt(text));
              } catch (NumberFormatException e) {
                Logger.getInstance().error(getClass(), e);
              }
            break;
          case AbstractAttribute.DECIMAL:
            try {
                mainDataObject.setDouble(colNames[i], Double.parseDouble(text));
              } catch (NumberFormatException e) {
                try {
                  NumberFormat germanNbrFmt = NumberFormat.getInstance(Locale.GERMAN);
                  mainDataObject.setDouble(colNames[i], germanNbrFmt.parse(text).doubleValue());
                } catch (ParseException e2) {
                  Logger.getInstance().error(getClass(), e2);
                }
              }
            break;
          case AbstractAttribute.DATE:
            boolean done = false;
            if (!done) try {
              mainDataObject.setDate(colNames[i], Date.valueOf(text));
              done = true;
            } catch (Exception e) {} // alert later
            if (!done) { 
              for (int j = 0; j < dateFormats.length; j++) {
                try {
                  mainDataObject.setDate(colNames[i], new Date(dateFormats[j].parse(text).getTime()));
                  done = true;
                  break;
                } catch (ParseException e) {} // alert later
              }
            }
            if (!done) Logger.getInstance().error(getClass(), "Couldn't parse " + text + " as date");
            break;
          case AbstractAttribute.TIMESTAMP:
            done = false;
            if (!done) try {
              mainDataObject.setTimestamp(colNames[i], Timestamp.valueOf(text));
              done = true;
            } catch (Exception e) {} // alert later
            if (!done) { 
              for (int j = 0; j < dateFormats.length; j++) {
                try {
                  mainDataObject.setDate(colNames[i], new Date(dateFormats[j].parse(text).getTime()));
                  done = true;
                  break;
                } catch (ParseException e) {} // alert later
              }
            }
            if (!done) Logger.getInstance().error(getClass(), "Couldn't parse " + text + " as date");
            if (!done) Logger.getInstance().error(getClass(), "Couldn't parse " + text + " as date");
            break;
          default:
            Logger.getInstance().info(getClass(), "Todo: column type " + colTypes[i] + " for column " + colNames[i]);
            break;
          }
        }
      }
      mainDataObject.save();
    }
  }
  
  /**
   * Returns true if a database record exists which matches the row to import.
   * Override it to use this feature.
   * @return true if a database record exists which matches the row to import
   */
  protected boolean load() {
    return false;
  }
  
  private int getNIbyDescription(DataObject dataObj, String value) {
    String descColName = ((LoadableByDescription)dataObj).getDescriptionColumnName();
    if (!loadByDescription(dataObj, descColName, value)) {
      dataObj.newRowWithNextIdentifierAllocation();
      dataObj.setText(descColName, value);
      dataObj.save();
    }
    loadByDescription(dataObj, ((LoadableByDescription)dataObj).getDescriptionColumnName(), value);
    return dataObj.getIdentifyValueInt();
  }
  
  private boolean loadByDescription(DataObject dataObj, String descColName, String value) {
    dataObj.select("*", descColName + " = '" + value + "'");
    boolean result = dataObj.nextRow();
    dataObj.closeQuery();
    return result;
  }

}
