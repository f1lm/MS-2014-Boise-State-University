/*
 * Copyright (c) 2002-2013 Christoph Mueller. All rights reserved.
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

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.StringTokenizer;

import de.must.io.Logger;
import de.must.middle.ApplConstStd;

/**
 * A template how to identify a database entry.
 * @author Christoph Mueller
 * @see Identifier
 * @see DataObject
 */
public class IdentifyTemplate {

  public static final int IDENTIFIED_BY_INT = 0;
  public static final int IDENTIFIED_BY_LONG = 1;
  public static final int IDENTIFIED_BY_STRING = 2;
  public static final int IDENTIFIED_BY_MULTIPLE_COLUMNS = 3;
  public static final int IDENTIFIED_FREE_CONDITIONED = 4;

  public static final int TYPE_NUMERIC = 0;
  public static final int TYPE_TEXT = 1;
  public static final int TYPE_DATE = 2;

  private int identifyType = IDENTIFIED_FREE_CONDITIONED;

  private String[] identifyColumnNames;
  private int[] columnTypes;
  private DateFormat dateFormat;

  public IdentifyTemplate(Index index, AbstractAttribute[] attributes) {
    int i, j;
    IndexItem[] indexItems = index.getIndexItems();
    identifyColumnNames = new String[indexItems.length];
    columnTypes = new int[indexItems.length];

    if (index.isUnique() && indexItems.length == 1) {
      for (j = 0; j < attributes.length; j++) {
        if (attributes[j].getFieldName().equals(indexItems[0].getFieldName())) {
          switch (attributes[j].getType()) {
          case AbstractAttribute.NUMBER:
            identifyType = IDENTIFIED_BY_INT;
            break;
          case AbstractAttribute.INTEGER:
            identifyType = IDENTIFIED_BY_INT;
            break;
          case AbstractAttribute.FLOAT:
            identifyType = IDENTIFIED_BY_LONG;
            break;
          case AbstractAttribute.CHAR:
            identifyType = IDENTIFIED_BY_STRING;
            break;
          case AbstractAttribute.VARCHAR:
            identifyType = IDENTIFIED_BY_STRING;
            break;
          }
        }
      }
    }

    if (index.isUnique() && indexItems.length > 1) {
      identifyType = IDENTIFIED_BY_MULTIPLE_COLUMNS;
    }
    
    for (i = 0; i < indexItems.length; i++) {
      identifyColumnNames[i] =  indexItems[i].getFieldName();
      for (j = 0; j < attributes.length; j++) {
        if (attributes[j].getFieldName().equals(indexItems[i].getFieldName())) {
          switch (attributes[j].getType()) {
          case AbstractAttribute.INTEGER:
            columnTypes[i] = TYPE_NUMERIC;
            break;
          case AbstractAttribute.DECIMAL:
            columnTypes[i] = TYPE_NUMERIC;
            break;
          case AbstractAttribute.FLOAT:
            columnTypes[i] = TYPE_NUMERIC;
            break;
          case AbstractAttribute.NUMBER:
            columnTypes[i] = TYPE_NUMERIC;
            break;
          case AbstractAttribute.DATE:
            columnTypes[i] = TYPE_DATE;
            break;
          default:
            columnTypes[i] = TYPE_TEXT;
            break;
          }
        }
      }
    }
  }

  /**
   * Constructs a identification template.
	 * @param identifyColumnNames the names of the columns to be used as primary key
	 * @param columnTypes the types of the columns to be used as primary key
   */
  public IdentifyTemplate(String[] identifyColumnNames, int[] columnTypes) {
    this.identifyColumnNames = identifyColumnNames;
    this.columnTypes = columnTypes;
  }

  public int getIdentifyType() {
    return identifyType;
  }

  public String[] getIdentifyColumnNames() {
    return identifyColumnNames;
  }

  public int[] getColumnTypes() {
    return columnTypes;
  }

  /**
   * Builds a string representation of the specified identifier which may be parsed
   * to an identifier again later via parseString
   * @param identifier the identifier to be transformed
   * @return the string representation of the specified identifier
   */
  public synchronized String toString(Identifier identifier) {
    StringBuffer result = new StringBuffer();
    for (int i = 0; i < columnTypes.length; i++) {
      if (i > 0) result.append(Identifier.ELEMENT_DELIMITER);
      switch (columnTypes[i]) {
      case TYPE_NUMERIC:
        result.append(identifier.getItems()[i].toString());
        break;
      case TYPE_DATE:
        result.append(getDateFormat().format((Date)(identifier.getItems()[i])));
        break;
      default: // text
        Object item = identifier.getItems()[i];
        if (item == null) item = "";
        result.append(item);
        break;
      }
    }
    return result.toString();
  }
  
 /**
   * Parses an identify string - made by toString - back to an identifier object.
   * @param identifyString the string to parse
   * @return the identify object
   */
  public synchronized Identifier parseString(String identifyString) {
    Object[] items = new Object[columnTypes.length];
    StringTokenizer tokenizer = new StringTokenizer(identifyString, "-");
    int i = -1;
    while (tokenizer.hasMoreTokens()) {
      i++;
      String item = tokenizer.nextToken();
      switch (columnTypes[i]) {
      case TYPE_NUMERIC:
        try {
          items[i] = new Integer(Integer.parseInt(item));
        } catch (NumberFormatException e1) {
          try {
            items[i] = new Long(Long.parseLong(item));
          } catch (NumberFormatException e) {
            try {
              items[i] = new Double(Double.parseDouble(item));
            } catch (NumberFormatException e2) {
              Logger.getInstance().error(getClass(), e2);
            }
          }
        }
        break;
      case TYPE_DATE:
        if (item == null || item.length() == 0) items[i] = null; 
        else try {
          items[i] = getDateFormat().parse(item);
        } catch (ParseException e) {
          Logger.getInstance().error(getClass(), e);
        }
        break;
      default: // text
        items[i] = item;
        break;
      }
    }
    return new Identifier(items);
  }
  
  private DateFormat getDateFormat() {
    if (dateFormat == null) dateFormat = new SimpleDateFormat(ApplConstStd.CAMELEON_TIMESTAMP_FORMAT);
    return dateFormat;
  }
  
 /**
   * Returns the identify condition for prepared statements, e.g.
   * where keyfield1 = ? and keyfield2 = ?  
	 * @return the identify condition for prepared statements
	 */
	public String getIdentifyConditionForPreparedStatements() {
    String identifyCondition = "";
    for (int i = 0; i < identifyColumnNames.length; i++) {
      if (i == 0) identifyCondition += " where ";
      else identifyCondition += " and ";
      identifyCondition += identifyColumnNames[i] + " = ?";
    }
    return identifyCondition;
  }

  /**
   * Sets the identifying fields to get a unique row by using prepared statements.
   * Use getIdentifyConditionForPreparedStatements to get the where condition 
   * part of the prepared statement query.
	 * @param ps the prepared statement to use
	 * @param ident the identifier to identify the wished row
   * @param lengths the length of identifier fields to fill them with spaces if they are defined as char
	 * @throws SQLException
   * @see #getIdentifyConditionForPreparedStatements()
	 */
  public void setIdentifier(PreparedStatement ps, Identifier ident, int[] lengths) throws SQLException {
    setIdentifier(ps, ident, lengths, 0);
  }
  
  /**
   * Sets the identifying fields to get a unique row by using prepared statements.
   * Use getIdentifyConditionForPreparedStatements to get the where condition 
   * part of the prepared statement query.
   * @param ps the prepared statement to use
   * @param ident the identifier to identify the wished row
   * @param lengths the length of identifier fields to fill them with spaces if they are defined as char
   * @param columnOffset  the offset of the key columns / the number of fields used in the prepared statements before the where condition fields
   * @throws SQLException
   * @see #getIdentifyConditionForPreparedStatements()
   */
	public void setIdentifier(PreparedStatement ps, Identifier ident, int[] lengths, int columnOffset) throws SQLException {
    for (int i = 0; i < columnTypes.length; i++) {
      switch (columnTypes[i]) {
      case IdentifyTemplate.TYPE_NUMERIC:
        ps.setInt(i+1+columnOffset, ident.getIntIdentifier(i));
        break;
      case IdentifyTemplate.TYPE_TEXT:
        String text = ident.getStringIdentifier(i);
        if (lengths != null) {
          while (text.length() < lengths[i]) {
            text += " ";
          }
        }
        ps.setString(i+1+columnOffset, text);
        break;
      case IdentifyTemplate.TYPE_DATE:
        ps.setDate(i+1+columnOffset, ident.getDateIdentifier(i));
        break;
      }
    }
  }

}