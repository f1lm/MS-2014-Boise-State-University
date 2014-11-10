/*
 * Copyright (c) 2002-2014 Christoph Mueller. All rights reserved.
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

import java.sql.Date;

import de.must.io.Logger;

/**
 * A class to concatenate where conditions with automatically filled in "and".
 * "'" are replaced by "''" in column values. Thus, fragments like "don't ..."
 * may be searched without causing SQL failures. 
 * @author Christoph Mueller
 */
public class WhereCondition {
  
  public static int AND = 0;
  public static int OR = 1;
  private String[] combination = new String[]{"and", "or"};
  
  /**
   * Returns a where condition part searching for an expression as an entire word or word group separated by ';', ','.or '\n'
   * @param columnName  the name of the column to be searched in
   * @param word  the word or word group to be found
   * @param delimiters the chars separating one word from the other
   * @return the where-condition part
   */
  public static synchronized String getEntireWordCondition(String columnName, String word, String delimiters) {
    String whereCondition = columnName + " like \'" + word + "\'"; //$NON-NLS-1$ //$NON-NLS-2$ // avoid MS SQL Server text varchar equal to-operator inkompatibel when using "=" instead of "like"
    char[] delimChar = delimiters.toCharArray();
    for (int i = 0; i < delimChar.length; i++) {
      whereCondition += " or " + columnName + " like \'" + word + delimChar[i] + "%\'"; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
      whereCondition += " or " + columnName + " like \'%" + delimChar[i] + word + "\'"; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
      for (int j = 0; j < delimChar.length; j++) {
        whereCondition += " or " + columnName + " like \'%" + delimChar[i] + word + delimChar[j] + "%\'"; //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$
      }
    }
    return whereCondition;
  }
  
  private SqlDialect sqlDialect;
  private StringBuffer whereCondition = new StringBuffer();
  private boolean oracleIgnoreCase;
  
  public WhereCondition() {
    this(false);
  }
  
  public WhereCondition(DataObject dataObject) {
    this(dataObject.getSqlDialect() instanceof OracleDialect);
    this.sqlDialect = dataObject.getSqlDialect();
  }
  
  public WhereCondition(boolean oracleIgnoreCase) {
    this.oracleIgnoreCase = oracleIgnoreCase;
  }
  
  /**
   * Appends a condition fragment with automatic control of "equals" or "like".
   * Supports wildcards "*" and "%" at the end of the column value.
   * "'" are replaced by "''" in column values. Thus, fragments like "don't ..."
   * may be searched without causing SQL failures. 
   * @param columnName the name of the column to be used
   * @param columnValue the column value to be selected
   */
  public void append(String columnName, String columnValue) {
    append(columnName, null, columnValue);
  }
  
  /**
   * Appends a condition fragment with automatic control of "equals" or "like".
   * Supports wildcards "*" and "%" at the end of the column value.
   * "'" are replaced by "''" in column values. Thus, fragments like "don't ..."
   * may be searched without causing SQL failures. 
   * @param columnName the name of the column to be used
   * @param relation  the relation to be used (e.g. =, <>)
   * @param columnValue the column value to be selected
   */
  public void append(String columnName, String relation, String columnValue) {
    append(AND, null, columnName, relation, columnValue, true);
  }
  
  /**
   * Appends a condition fragment with automatic control of "equals" or "like".
   * Supports wildcards "*" and "%" at the end of the column value.
   * "'" are replaced by "''" in column values. Thus, fragments like "don't ..."
   * may be searched without causing SQL errors. 
   * @param columnName the name of the column to be used
   * @param columnValue the column value to be selected
   * @param emptyAlsoNull  whether or not null values in database should
   *                       be treated in the same way as empty strings 
   */
  public void append(String columnName, String columnValue, boolean emptyAlsoNull) {
    append(AND, null, columnName, null, columnValue, emptyAlsoNull);
  }
  
  /**
   * Appends a condition fragment with automatic control of "equals" or "like".
   * Supports wildcards "*" and "%" at the end of the column value.
   * "'" are replaced by "''" in column values. Thus, fragments like "don't ..."
   * may be searched without causing SQL errors. 
   * @param combination  the index of the combination with previous condition fragments
   * @see #AND
   * @see #OR
   * @param preamble  the preamble to be placed before the search fragment to be constructed, e.g. "myID in (select foreignID from AnotherTable where " - bracket may be closed automatically
   * @param columnName  the column name to be used for the comparison
   * @param relation  the relation to be used (e.g. =, <>)
   * @param columnValue the column value to be selected
   * @param emptyAlsoNull  whether or not null values in database should
   *                       be treated in the same way as empty strings 
   */
  public void append(int combination, String preamble, String columnName, String relation, String columnValue, boolean emptyAlsoNull) {
    StringBuffer conditionFragement = new StringBuffer();
    if (columnValue.length() == 0 && emptyAlsoNull) {
      conditionFragement.append("(" + columnName + " is null or ");
    }
    if (oracleIgnoreCase) conditionFragement.append("upper("); 
    conditionFragement.append(columnName);
    if (oracleIgnoreCase) conditionFragement.append(")"); 
    if (columnValue.startsWith("*") ) {
      columnValue = "%" + columnValue.substring(1);
    }
    if (columnValue.endsWith("*") ) {
      columnValue = columnValue.substring(0, columnValue.length() - 1) + "%";
    }
    if (relation != null) {
      conditionFragement.append(" " + relation + " ");
    } else if (columnValue.startsWith("%")
            || columnValue.endsWith("%")
            || sqlDialect instanceof MSSQLServerDialect
    ) {
      conditionFragement.append(" LIKE ");
    } else {
      conditionFragement.append(" = ");
    }
    if (oracleIgnoreCase) conditionFragement.append("upper("); 
    conditionFragement.append("'");
    conditionFragement.append(sqlSecure(columnValue));
    conditionFragement.append("'");
    if (oracleIgnoreCase) conditionFragement.append(")"); 
    if (columnValue.length() == 0 && emptyAlsoNull) {
      conditionFragement.append(")");
   }
    append(combination, preamble, conditionFragement.toString());
  }

  /**
   * Appends a condition fragment.
   * @param columnName  the name of the column to be used
   * @param columnValue  the column value to be selected
   */
  public void append(String columnName, int columnValue) {
    append(columnName, columnValue, true);
  }

  /**
   * Appends a condition fragment for a integer value.
   * @param columnName  the name of the column to be used
   * @param columnValue  the integer column value to be selected
   * @param zeroAlsoNull  whether or not null values in database should be 
   *                      treated in the same way as zero values 
   */
  public void append(String columnName, int columnValue, boolean zeroAlsoNull) {
    append(AND, columnName, null, columnValue, zeroAlsoNull);
  }
  
  /**
   * Appends a condition fragment for a integer value.
   * @param combination  the index of the combination with previous condition fragments
   * @see #AND
   * @see #OR
   * @param columnName  the name of the column to be used
   * @param relation  the relation to be used (e.g. =, <>)
   * @param columnValue  the numeric column value to select
   * @param zeroAlsoNull  whether or not null values should be treated as zero
   */
  public void append(int combination, String columnName, String relation, int columnValue, boolean zeroAlsoNull) {
    append(combination, columnName, relation, (double)columnValue, zeroAlsoNull);
  }
  
  /**
   * Appends a condition fragment for a integer value.
   * @param combination  the index of the combination with previous condition fragments
   * @see #AND
   * @see #OR
   * @param columnName  the column name to be used for the date comparison
   * @param relation  the relation to be used (e.g. =, <>)
   * @param columnValue  the numeric column value to select
   * @param zeroAlsoNull  whether or not null values should be treated as zero
   */
  public void append(int combination, String columnName, String relation, double columnValue, boolean zeroAlsoNull) {
    append(combination, null, columnName, relation, columnValue, zeroAlsoNull);
  }
    
  /**
   * Appends a condition fragment for a double value.
   * @param combination  the index of the combination with previous condition fragments
   * @see #AND
   * @see #OR
   * @param preamble  the preamble to be placed before the search fragment to be constructed, e.g. "myID in (select foreignID from AnotherTable where " - bracket may be closed automatically
   * @param columnName  the column name to be used for the date comparison
   * @param relation  the relation to be used (e.g. =, <>)
   * @param columnValue  the numeric column value to select
   * @param zeroAlsoNull  whether or not null values should be treated as zero
   */
  public void append(int combination, String preamble, String columnName, String relation, double columnValue, boolean zeroAlsoNull) {
    StringBuffer conditionFragement = new StringBuffer();
    if (columnValue == 0 && zeroAlsoNull) {
      conditionFragement.append("(" + columnName + " is null or ");
    }
    conditionFragement.append(columnName);
    if (relation != null) {
      conditionFragement.append(" " + relation + " ");
    } else {
      conditionFragement.append(" = ");
    }
    conditionFragement.append(columnValue);
    if (columnValue == 0 && zeroAlsoNull) {
      conditionFragement.append(")");
    }
    append(combination, preamble, conditionFragement.toString());
  }

  /**
   * Appends a condition fragment.
   * @param columnName the name of the column to be used
   * @param columnValue the column value to be selected
   */
  public void append(String columnName, boolean columnValue) {
    StringBuffer conditionFragement = new StringBuffer();
    conditionFragement.append(columnName);
    conditionFragement.append(" = ");
    if (columnValue) {
      conditionFragement.append("true");
    } else {
      conditionFragement.append("false");
    }
    append(conditionFragement.toString());
  }
  
  public void appendEntireWordSearch(String columnName, String word) {
    appendEntireWordSearch(columnName, word, false);
  }
  
  public void appendEntireWordSearch(String columnName, String word, boolean orInsteadOfAnd) {
    appendEntireWordSearch(columnName, word, " ,;.:/", orInsteadOfAnd);
  }
  
 /**
   * Appends a where-condition part searching for an expression as an entire word or word group separated by ';' or ','.
   * @param columnName  the name of the column to be searched in
   * @param word  the word or word group to be found
   */
  public void appendEntireWordSearch(String columnName, String word, String delimiters) {
    appendEntireWordSearch(columnName, word, delimiters, false);
  }
  
  /**
   * Appends a where-condition part searching for an expression as an entire word or word group separated by ';' or ','.
   * @param columnName  the name of the column to be searched in
   * @param word  the word or word group to be found
   * @param orInsteadOfAnd  if true, this condition fragment is combined with 'or' instead of 'and' with existing former fragments.
   */
  public void appendEntireWordSearch(String columnName, String word, String delimiters, boolean orInsteadOfAnd) {
    if (
        whereCondition.length() > 2 // already chained condition is not a real comparison but e.g. brackets
    && !whereCondition.toString().trim().endsWith("(") 
    && !whereCondition.toString().trim().toLowerCase().endsWith(" where") // where in e.g. 
    ) {
      if (orInsteadOfAnd) whereCondition.append(" or ");
      else whereCondition.append(" and ");
    }
    whereCondition.append("(" + getEntireWordCondition(columnName, word, delimiters) + ")");
  }

  /**
   * Replaces ' by '' to avoid SQL error.
   */
  private String sqlSecure(String stringField) {
    if (stringField.indexOf('\'') == -1) return stringField;
    int i, j;
    char[] oldChars = stringField.toCharArray();
    char[] newChars = new char[stringField.length() * 2];
    j = -1;
    for (i = 0; i < stringField.length(); i++) {
      j++;
      if (oldChars[i] == '\'') {
        newChars[j] = '\'';
        newChars[++j] = '\'';
      }
      else {
        newChars[j] = oldChars[i];
      }
    }
    return new String(newChars, 0, j+1);
  }

  /**
   * Appends a fragment to the where condition if not null and not an empty string.
   * Fills in " and " if necessary.
   * @param conditionFragement the condition fragment
   */
  public void append(String conditionFragement) {
    append(AND, conditionFragement);
  }
   
  /**
   * Appends a fragment to the where condition if not null and not an empty string.
   * @param preferredCombination  the index of the preferred combination - the specified combination will be added automatically if the search fragment doesn't already contain a combination expression.
   * @see #AND
   * @see #OR
   * @param conditionFragement  the condition fragment to be added to this where condition
   */
  public void append(int preferredCombination, String conditionFragement) {
    append(preferredCombination, null, conditionFragement);
  }
  
  /**
   * Appends a fragment to the where condition if not null and not an empty string.
   * @param preferredCombination  the index of the preferred combination - the specified combination will be added automatically if the search fragment doesn't already contain a combination expression.
   * @see #AND
   * @see #OR
   * @param preamble  the preamble to be placed before the search fragment to be constructed, e.g. "myID in (select foreignID from AnotherTable where " - bracket may be closed automatically
   * @param conditionFragement  the condition fragment to be added to this where condition
   */
  public void append(int preferredCombination, String preamble, String conditionFragement) {
    if (conditionFragement == null || conditionFragement.trim().equals("")) return;
    // add " and " except if condition fragment and already chained condition is a real comparison, not some brackets only
    if (
          whereCondition.length() > 2 // already chained condition is not a real comparison but e.g. brackets
      && !whereCondition.toString().trim().endsWith("(") 
      && !whereCondition.toString().trim().toLowerCase().endsWith(" where") // where in e.g. 
      && !conditionFragement.trim().toLowerCase().startsWith("or ")
      && !conditionFragement.trim().toLowerCase().startsWith("or(")  // condition fragment already starts with "or", but not with orandwhateverfollowsinname
      && !conditionFragement.trim().toLowerCase().startsWith("and ")
      && !conditionFragement.trim().toLowerCase().startsWith("and(")) { // condition fragment already starts with "and"
        whereCondition.append(" " + combination[preferredCombination] + " ");
      }
    if (preamble != null && preamble.indexOf('(') > -1) whereCondition.append(preamble);
    Logger.getInstance().debug(getClass(), "Appending " + conditionFragement);
    whereCondition.append(conditionFragement);
    if (preamble != null && preamble.indexOf('(') > -1) closeBracket();
  }

  /**
   * Appends a date lower equals condition fragment to the where condition if not null.
   * Fills in " and " if necessary.
   * Puts focus on date without time in case of MS Access to select all rows of the end date. Caution: seems not to work in case of join!
   * @param fieldName the name of the conditional date field
   * @param dateToCompare the date to compare
   * @param dataObject the data object whose SQL dialect is to be satisfied
   */
  public void appendLowerEqual(String columnName, java.sql.Date dateToCompare, DataObject dataObject) {
    if (dateToCompare == null) return;
    String relation = "<=";
    if (dataObject.getSqlDialect().getClass().equals(MSAccessDialect.class)) {
      append("DateValue(" + columnName + ")", relation, dateToCompare, dataObject);
    } else {
      append(columnName, relation, dateToCompare, dataObject);
    }
  }

  /**
   * Appends a date selection fragment to the where condition if not null and 
   * not empty.
   * Fills in " and " of necessary.
   * @param columnName  the column name to be used for the date comparison
   * @param dateToCompare  the date value to be compared with the column
   * @param dataObject  the data object to be used to format date comparison
   */
  public void append(String columnName, Date dateToCompare, DataObject dataObject) {
    append(columnName, "=", dateToCompare, dataObject);
  }

  /**
   * Appends a date selection fragment to the where condition.
   * Fills in " and " of necessary.
   * @param columnName  the column name to be used for the date comparison
   * @param relation  the relation to be used (e.g. =, <>)
   * @param dateToCompare  the date value to be compared with the column
   * @param dataObject  the data object to be used to format date comparison
   */
  public void append(String columnName, String relation, Date dateToCompare, DataObject dataObject) {
    append(AND, null, columnName, relation, dateToCompare, dataObject);
  }

  /**
   * Appends a date selection fragment to the where condition.
   * @param combination  the index of the combination with previous condition fragments
   * @see #AND
   * @see #OR
   * @param columnName  the column name to be used for the date comparison
   * @param relation  the relation to be used (e.g. =, <>)
   * @param dateToCompare  the date value to be compared with the column
   * @param dataObject  the data object to be used to format date comparison
   */
  public void append(int combination, String columnName, String relation, Date dateToCompare, DataObject dataObject) {
    append(combination, null, columnName, relation, dateToCompare, dataObject);
  }

  /**
   * Appends a date selection fragment to the where condition if not null and 
   * not empty.
   * Fills in " and " of necessary.
   * @param combination  the index of the combination with previous condition fragments
   * @see #AND
   * @see #OR
   * @param preamble  the preamble to be placed before the search fragment to be constructed, e.g. "myID in (select foreignID from AnotherTable where " - bracket may be closed automatically
   * @param columnName  the column name to be used for the date comparison
   * @param relation  the relation to be used (e.g. =, <>)
   * @param dateToCompare  the date value to be compared with the column
   * @param dataObject  the data object to be used to format date comparison
   */
  public void append(int combination, String preamble, String columnName, String relation, Date dateToCompare, DataObject dataObject) {
    append(combination, preamble, columnName, relation, dateToCompare, dataObject.getSqlDialect());
  }
  
  /**
   * Appends a date selection fragment to the where condition if not null and 
   * not empty.
   * Fills in " and " of necessary.
   * @param combination  the index of the combination with previous condition fragments
   * @see #AND
   * @see #OR
   * @param preamble  the preamble to be placed before the search fragment to be constructed, e.g. "myID in (select foreignID from AnotherTable where " - bracket may be closed automatically
   * @param columnName  the column name to be used for the date comparison
   * @param relation  the relation to be used (e.g. =, <>)
   * @param dateToCompare  the date value to be compared with the column
   * @param sqlDialact  the used SQL dialect
   */
  public void append(int combination, String preamble, String columnName, String relation, Date dateToCompare, SqlDialect sqlDialect) {
    String toAppend = "";
    if (dateToCompare != null) {
      if (relation.trim().endsWith("<")
       || relation.trim().endsWith("<=")
      ) { // treat missing date as very early date
        toAppend += "(" + columnName + " is null or " + columnName + " " + relation + " ";
        toAppend += sqlDialect.getSqlCompareString(dateToCompare); 
        toAppend += ")";
      } else if ("=".equals(relation)) {
        toAppend += sqlDialect.getWhereConditionFragementForExactDateComparison(columnName, dateToCompare);
      } else {
        toAppend += columnName + " " + relation + " ";
        toAppend += sqlDialect.getSqlCompareString(dateToCompare);  
      }
    } else {
      toAppend += columnName;
      if (missesComparation(columnName)) {
        toAppend += " is ";
      }
      toAppend += "null";
    }
    append(combination, preamble, toAppend);
  }
  
  private boolean missesComparation(String conditionFragement) {
    return (conditionFragement.indexOf('=') == -1
         && conditionFragement.indexOf('<') == -1
         && conditionFragement.indexOf('>') == -1
    );
  }

  /**
   * Opens a bracket. Combination " and " will be added automatically if necessary.
   */
  public void openBracket() {
    if (whereCondition.length() > 2) { // already chained condition is a real comparison and not e.g. brackets only
      whereCondition.append(" and ");
    }
    whereCondition.append("(");
  }

  /**
   * Closes the bracket by extending this where condition by ')'.
   */
  public void closeBracket() {
    whereCondition.append(")");
  }

  /**
   * Returns the complete where condition as a string.
   * @return the complete where condition as a string
   */
  public String toString() {
    return whereCondition.toString();
  }

}