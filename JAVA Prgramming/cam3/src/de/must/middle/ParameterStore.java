/*
 * Copyright (c) 2007-2009 Christoph Mueller. All rights reserved.
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

/**
 * Interface to any parameter storing object, independent from which storage technology is used.
 * @author Christoph Mueller
 */
public interface ParameterStore {

  /**
   * Class to statically specify one single parameter (property) with description default value.
   * static final Entry MY_PROPERTY_ENRY = new Entry("MyPropEntr", "Description of MyPropEntr", "default value of MyPropEntr")
   * @author Christoph Mueller
   */
  public static class Entry {
    private String key;
    private String description;
    private String defaultValue;
    public Entry(String key, String description, boolean defaultValue) {
      this(key, description, defaultValue?ApplConstStd.TRUE_STRING:ApplConstStd.FALSE_STRING);
    }
    public Entry(String key, String description, int defaultValue) {
      this(key, description, Integer.toString(defaultValue));
    }
    public Entry(String key, String description, String defaultValue) {
      this.key = key;
      this.description = description;
      this.defaultValue = defaultValue;
    }
    public String getKey() {
      return key;
    }
    public String getDescription() {
      return description;
    }
    public String getDefaultValue() {
      return defaultValue;
    }
  }

  /**
   * Returns the parameter value associated with the specified key.
   * @param key the key of the parameter to be retrieved
   * @return the parameter value
   */
  public String getValue(String key);
  
  /**
   * Returns the parameter value associated with the specified key as integer.
   * @param key the key of the parameter to be retrieved
   * @return the parameter value
   */
  public int getValueAsInt(String key);
  
  /**
   * Returns the parameter value associated with the specified key as boolean.
   * @param key the key of the parameter to be retrieved
   * @return the parameter value
   */
  public boolean getValueAsBoolean(String key);
  
  /**
   * Sets the parameter value.
   * @param key the key of the parameter to set
   * @param value the value of the parameter to set
   */
  public void setValue(String key, String value);
  
  /**
   * Sets the parameter value.
   * @param key the key of the parameter to set
   * @param value the value of the parameter to set
   */
  public void setValue(String key, int value);
  
  /**
   * Sets the parameter value.
   * @param key the key of the parameter to set
   * @param value the value of the parameter to set
   */
  public void setValue(String key, boolean value);
  
}