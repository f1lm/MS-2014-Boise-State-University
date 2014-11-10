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


import java.util.StringTokenizer;
import java.util.Vector;

import de.must.io.Logger;
import de.must.middle.ApplConstStd;

/**
 * Abstract identifier of table entries - no matter what their primary key is.
 * The preferred way of accessing records is a unique key with one numeric field.
 * Anyhow, to support older database designs, there may be a need to identify
 * records via multiple key fields, maybe including different field types.
 * To avoid switches in many components, all primary key cases are wrapped in
 * this identifier class. Thus, only one type of object has to be passed.
 * @author Christoph Mueller
 * @see IdentifyTemplate
 * @see DataObject
 */
public class Identifier {

  public static final String ELEMENT_DELIMITER = "-";
  public static final int REPRESENTATIVE_FOR_NOTHING = 0;
  public static final int REPRESENTATIVE_FOR_NEW_ENTRY = -1;
  private int representative = -999;
  
  public static synchronized Vector<Identifier> parseToVector(String identifyString) {
    Vector<Identifier> result = new Vector<Identifier>();
    StringTokenizer tokenizer = new StringTokenizer(identifyString, ApplConstStd.MAIN_SEPARATOR, false);
    while (tokenizer.hasMoreTokens()) {
      result.add(parseString(tokenizer.nextToken()));
    }
    return result;
  }
  
  /**
   * Parses an identify string - made by toString - back to an identifier object.
   * @param identifyString the string to parse
   * @return the identify object
   * @see IdentifyTemplate#parseString(String)
   */
  public static synchronized Identifier parseString(String identifyString) {
    if (identifyString.startsWith("'") && identifyString.endsWith("'")) {
      return new Identifier(identifyString.substring(1, identifyString.length()-1));
    }
    try {
      return new Identifier(Integer.parseInt(identifyString));
    } catch (NumberFormatException e) {} // ignore
    // more cases ...
    Logger.getInstance().error(Identifier.class, new Exception("Identifier parsing of " + identifyString + " not implemented, yet"));
    return null;
  }

  private Object[] items;

  /**
   * Constructs a new identifier based upon a single integer primary key.
   * Special identifiers are REPRESENTATIVE_FOR_NOTHING
   * <code>{@link #REPRESENTATIVE_FOR_NOTHING}</code> and
   * <code>{@link #REPRESENTATIVE_FOR_NEW_ENTRY}</code>.
   * @param identifier the integer identify value
   */
  public Identifier(int identifier) {
    if (identifier == REPRESENTATIVE_FOR_NOTHING
      | identifier == REPRESENTATIVE_FOR_NEW_ENTRY)
    {
      representative = identifier;
    }
    items = new Object[1];
    items[0] = new Integer(identifier);
  }

  public Identifier(long identifier) {
    items = new Object[1];
    items[0] = new Long(identifier);
  }

  public Identifier(String identifier) {
    items = new Object[1];
    items[0] = identifier;
  }

  /**
   * Constructs a new identifier based on primary key based upon one or more
   * items with optional different column types.
   * @param items the value items of the primary key
   */
  public Identifier(Object[] items) {
    this.items = items;
  }

  /**
   * Returns the identifier in a way it is expected by an SQL where clause -
   * Strings are embedded in "'", numeric values aren't.
   * @return the identifier in a way it is expected by a SQL where clause
   * @see IdentifyTemplate#toString(Identifier)
   */
  public String toString() {
    StringBuffer result = new StringBuffer();
    for (int i = 0; i < items.length; i++) {
      if (i > 0) result.append(ELEMENT_DELIMITER);
      if (items[i] instanceof String) {
        result.append("'" + items[i].toString() + "'");
      } else if (items[i] instanceof Integer) {
        result.append(items[i].toString());
      } else if (items[i] instanceof Long) {
        result.append(items[i].toString());
      } else if (items[i] instanceof Float) {
        result.append(items[i].toString());
      } else if (items[i] instanceof Double) {
        result.append(items[i].toString());
      } else {
        result.append(items[i].toString());
        Logger.getInstance().debug(getClass(), "unhandled object type " + items[i].getClass());
      }
    }
    return result.toString();
  }

  public Object[] getItems() {
    return items;
  }

  /**
   * Returns the integer value of the first item.
   * @return the integer value of the first item
   */
  public int getIntIdentifier() {
    return getIntIdentifier(0);
  }

  /**
   * Returns the integer value of the item as specified by index.
   * @param index the index of the item value to be returned
   * @return the integer value of the item as specified by index
   */
  public int getIntIdentifier(int index) {
    if (items.length <= index) return -1;
    if (items[index] instanceof Integer) {
      return ((Integer)items[index]).intValue();
    } else if (items[index] instanceof Float) {
      return ((Float)items[index]).intValue();
    } else if (items[index] instanceof Double) {
      return ((Double)items[index]).intValue();
    } else if (items[index] instanceof Long) {
      return ((Long)items[index]).intValue();
    } else {
      Logger.getInstance().warn(getClass(), "getIntIdentifier without success");
      return -5; // just to locate possible problems
    }
  }

  public long getLongIdentifier() {
    if (items.length == 0) return -1;
    return ((Long)items[0]).longValue();
  }

  public String getStringIdentifier() {
    return getStringIdentifier(0);
  }

  public String getStringIdentifier(int index) {
    if (items.length <= index) return null;
    return (String)items[index];
  }

  public java.sql.Date getDateIdentifier() {
    return getDateIdentifier(0);
  }

  public java.sql.Date getDateIdentifier(int index) {
    if (items.length <= index) return null;
    return (java.sql.Date)items[index];
  }

  /**
   * Returns true if the identifier represents an entry to be build (inserted).
   * @return true if the identifier represents an entry to be build
   */
  public boolean isRepresentativeForNewEntry() {
    return (representative == REPRESENTATIVE_FOR_NEW_ENTRY);
  }

  /**
   * Returns true if the identifier represents "nothing" - no matter what
   * type of columns it contains nor the number of the columns.
   * @return true if the identifier represents "nothing"
   */
  public boolean isRepresentativeForNothing() {
    if (representative == REPRESENTATIVE_FOR_NOTHING) return true;
    if (items.length == 0) return true;
    for (int i = 0; i < items.length; i++) {
      if (items[i] instanceof String) {
        if (!items[i].toString().trim().equals("")) return false;
      } else if (items[i] instanceof Integer) {
        if (((Integer)items[i]).intValue() > 0) return false;
      } else if (items[i] instanceof Long) {
        if  (((Long)items[i]).longValue() > 0) return false;
      } else if (items[i] instanceof Float) {
        if (((Float)items[i]).floatValue() > 0) return false;
      } else if (items[i] instanceof Double) {
        if (((Double)items[i]).doubleValue() > 0) return false;
      } else if (items[i] != null) return false;
    }
    return true;
  }

  public String getIdentifyCondition(IdentifyTemplate identifyTemplate) {
    String identifyCondition = "";
    for (int i = 0; i < identifyTemplate.getIdentifyColumnNames() .length; i++) {
      if (i > 0) identifyCondition += " and ";
      switch (identifyTemplate.getColumnTypes()[i]) {
      case IdentifyTemplate.TYPE_NUMERIC:
        identifyCondition += identifyTemplate.getIdentifyColumnNames()[i] + " = " + items[i];
        break;
      case IdentifyTemplate.TYPE_TEXT:
        identifyCondition += identifyTemplate.getIdentifyColumnNames()[i] + " = '" + items[i] + "'";
        break;
      case IdentifyTemplate.TYPE_DATE:
        // to do: more than Oracle variant
        identifyCondition += identifyTemplate.getIdentifyColumnNames()[i] + " = TO_DATE('" + items[i] + "','YYYY-MM-DD')";
        break;
      }
    }
    return identifyCondition;
  }
  
  public boolean equals(Object object) {
    if (object instanceof Identifier) {
      return this.equals((Identifier)object);
    } else {
      return super.equals(object);
    }
  }

  public boolean equals(Identifier identifierToCompare) {
    if (identifierToCompare == null) {
      if (items.length == 0) return true;
      else return false;
    }
    if (isRepresentativeForNothing() & identifierToCompare.isRepresentativeForNothing()) return true;
    if (items.length != identifierToCompare.getItems().length) return false;
    for (int i = 0; i < items.length; i++) {
      int value1 = 0;
      int value2 = 0;
      Object item1 = identifierToCompare.getItems()[i];
      Object item2 = items[i];
      if (item1 instanceof Integer) {
        value1 = ((Integer)item1).intValue();
      }
      if (item2 instanceof Integer) {
        value2 = ((Integer)item2).intValue();
      }
      if (item1 instanceof Float) {
        value1 = ((Float)item1).intValue();
      }
      if (item2 instanceof Float) {
        value2 = ((Float)item2).intValue();
      }
      if (item1 instanceof Double) {
        value1 = ((Double)item1).intValue();
      }
      if (item2 instanceof Double) {
        value2 = ((Double)item2).intValue();
      }
      if (value1 > 0 & value2 > 0) {
        if (value1 != value2) return false;
      } else {
        if (!identifierToCompare.getItems()[i].equals(items[i])) return false;
      }
    }
    return true;
  }

  /* (non-Javadoc)
   * @see java.lang.Object#hashCode()
   */
  public int hashCode() {
    // System.out.println(toString() + " --> " + toString().hashCode());
    return toString().hashCode();
  }

}
