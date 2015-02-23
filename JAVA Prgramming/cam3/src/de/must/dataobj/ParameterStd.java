/*
 * Copyright (c) 1999-2013 Christoph Mueller. All rights reserved.
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

import java.util.Hashtable;

import de.must.io.Logger;
import de.must.middle.ApplConstStd;
import de.must.middle.ParameterStore;

/**
 * The standard of all parameter providers. Returns defined values or default
 * values. Usage sample:
 * <pre><code>
 * public String getDefaultCurrency() {
 *   if (load("dftCur")) return getText();
 *   else return "EUR";
 * }
 * public void setDefaultCurrency(String defaultCurrency) {
 *   set("dftCur", defaultCurrency);
 * }
 * </code></pre>
 * @author Christoph Mueller
 */
public class ParameterStd implements ParameterStore {
  
  private static final String valueColumnName = "PaWert";
  private static Hashtable<String, ParameterStore.Entry> parameterDefinitions = new Hashtable<String, ParameterStore.Entry>();
 
  public static final ParameterStore.Entry HTML_TABLE_BORDER = register(new ParameterStore.Entry("htmlTabBor", "Show table grid", true));

  /**
   * Registers a parameter entry and returns it. Maybe used like that:
   * public static final Entry MY_PROPERTY_ENTRY = register(new Entry("MyPropEntr", "Description of MyPropEntr", "default value of MyPropEntr"));
   * Default values will be returned if property hasn't been set, yet. 
   * @param entry the entry to registered
   * @return the entry to be assigned to static final variable
   */
  public static ParameterStore.Entry register(ParameterStore.Entry entry) {
    parameterDefinitions.put(entry.getKey(), entry);
    return entry;
  }
  
  protected DataObject parameterDataObject;

  public ParameterStd(DataObject parameterDataObject) {
    this.parameterDataObject = parameterDataObject;
  }

  protected boolean load(String key) {
    if (parameterDataObject.load(key)) return true;
    else return false;
  }

  protected String getText() {
    return parameterDataObject.getText(valueColumnName);
  }
  protected String getText(ParameterStore.Entry parm) {
    return getText(parm.getKey(), parm.getDefaultValue());
  }
  /**
   * Thread-safe retrieval of parameter values.
   * @param key the parameter key
   * @param defaultValue the parameters default value
   * @return the parameter value
   */
  protected String getText(String key, String defaultValue) {
    synchronized(parameterDataObject) {
      if (load(key)) return parameterDataObject.getText(valueColumnName);
      else return defaultValue;
    }
  }
  protected void set(String key, String value) {
    synchronized(parameterDataObject) {
      parameterDataObject.updateOrInsert(key, valueColumnName, value);
    }
  }
  public void set(ParameterStore.Entry parm, String value) {
    synchronized(parameterDataObject) {
      parameterDataObject.updateOrInsert(parm.getKey(), valueColumnName, value);
    }
  }
  public void set(ParameterStore.Entry parm, boolean value) {
    synchronized(parameterDataObject) {
      set(parm.getKey(), value);
    }
  }

  protected int getInt() {
    return Integer.parseInt(getText());
  }
  
  protected void set(String key, int value) {
    synchronized(parameterDataObject) {
      parameterDataObject.updateOrInsert(key, valueColumnName, Integer.toString(value));
    }
  }
  public void set(ParameterStore.Entry parm, int value) {
    synchronized(parameterDataObject) {
      parameterDataObject.updateOrInsert(parm.getKey(), valueColumnName, Integer.toString(value));
    }
  }

  protected long getLong() {
    return Long.parseLong(getText());
  }
  
  protected void set(String key, long value) {
    synchronized(parameterDataObject) {
      parameterDataObject.updateOrInsert(key, valueColumnName, Long.toString(value));
    }
  }
  public void set(ParameterStore.Entry parm, long value) {
    synchronized(parameterDataObject) {
      parameterDataObject.updateOrInsert(parm.getKey(), valueColumnName, Long.toString(value));
    }
  }

  protected boolean getBoolean() {
    if (getText().equals(ApplConstStd.TRUE_STRING)) return true;
    else return false;
  }
  protected boolean getBoolean(ParameterStore.Entry entry) {
    return getText(entry).equals(ApplConstStd.TRUE_STRING);
  }
  protected void set(String key, boolean value) {
    synchronized(parameterDataObject) {
      if (value) parameterDataObject.updateOrInsert(key, valueColumnName, ApplConstStd.TRUE_STRING);
      else parameterDataObject.updateOrInsert(key, valueColumnName, ApplConstStd.FALSE_STRING);
    }
  }

  protected java.sql.Date getDate() {
    if (getText().length() == 0) return null;
    else return java.sql.Date.valueOf(getText());
  }
  
  protected void set(String key, java.sql.Date value) {
    synchronized(parameterDataObject) {
      if (value == null) parameterDataObject.updateOrInsert(key, valueColumnName, "");
      else parameterDataObject.updateOrInsert(key, valueColumnName, value.toString());
    }
  }

  // -------- above manual access methods, below methods used by interface ParameterStore
  
  public String getValue(ParameterStore.Entry parmEntry) {
    synchronized(parameterDataObject) {
      if (load(parmEntry.getKey())) return getText();
      else return parmEntry.getDefaultValue();
    }
  }
  
  public String getValue(String key) {
    synchronized(parameterDataObject) {
      if (load(key)) {
        String text = getText();
        if (text != null) return text;
        else {
          Logger.getInstance().warn("Parameter " + key + " is null!");
          return "";
        }
      }
      else if (parameterDefinitions.containsKey(key)) return parameterDefinitions.get(key).getDefaultValue();
      else return "";
    }
  }

  public boolean getValueAsBoolean(ParameterStore.Entry parmEntry) {
    return getValue(parmEntry).equalsIgnoreCase(ApplConstStd.TRUE_STRING);
  }

  public boolean getValueAsBoolean(String key) {
    return getValue(key).equalsIgnoreCase(ApplConstStd.TRUE_STRING);
  }

  public long getValueAsLong(ParameterStore.Entry parmEntry) {
    String stringValue = getValue(parmEntry);
    if (stringValue.length() == 0) return 0;
    try {
      return Long.parseLong(stringValue);
    } catch (NumberFormatException e) {
      Logger.getInstance().error(getClass(), e);
      return Long.parseLong(parmEntry.getDefaultValue());
    }
  }

  public int getValueAsInt(ParameterStore.Entry parmEntry) {
    String stringValue = getValue(parmEntry);
    if (stringValue.length() == 0) return 0;
    try {
      return Integer.parseInt(stringValue);
    } catch (NumberFormatException e) {
      Logger.getInstance().error(getClass(), e);
      return Integer.parseInt(parmEntry.getDefaultValue());
    }
  }

  public int getValueAsInt(String key) {
    String stringValue = getValue(key);
    if (stringValue.length() == 0) return 0;
    try {
      return Integer.parseInt(stringValue);
    } catch (NumberFormatException e) {
      Logger.getInstance().error(getClass(), e);
      return 0;
    }
  }

  public void setValue(String key, String value) {
    synchronized(parameterDataObject) {
      set(key, value);
      parameterDataObject.save();
    }
  }

  public void setValue(String key, int value) {
    synchronized(parameterDataObject) {
      set(key, value);
      parameterDataObject.save();
    }
  }

  public void setValue(String key, boolean value) {
    synchronized(parameterDataObject) {
      set(key, value);
      parameterDataObject.save();
    }
  }

}