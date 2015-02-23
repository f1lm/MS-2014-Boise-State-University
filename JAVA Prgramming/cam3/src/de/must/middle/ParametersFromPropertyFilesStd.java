/*
 * Copyright (c) 2006-2009 Christoph Mueller. All rights reserved.
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

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

import de.must.io.Logger;

/**
 * Container for parameters, stored in property files. Differentiates between default (admin) parameters and personal parameters.
 * @author Christoph Mueller
 */
public abstract class ParametersFromPropertyFilesStd implements ParameterStore {

  private String personalPropertyFileName;
  private String defaultPropertyFileName;

  protected Properties personalProperties;
  protected Properties defaultProperties;
  
  public ParametersFromPropertyFilesStd(String defaultPropertyFileName) {
    this.personalPropertyFileName = null;
    this.defaultPropertyFileName = defaultPropertyFileName;
    personalProperties = null;
    defaultProperties = loadProperties(defaultPropertyFileName);
  }

  /**
   * Constructs a new parameter container.
   * @param propertyFileName
   * @param defaultPropertyFileName
   */
  public ParametersFromPropertyFilesStd(String propertyFileName, String defaultPropertyFileName) {
    this.personalPropertyFileName = propertyFileName;
    this.defaultPropertyFileName = defaultPropertyFileName;
    personalProperties = loadProperties(propertyFileName);
    defaultProperties = loadProperties(defaultPropertyFileName);
  }

  private Properties loadProperties(String propertyFileName) {
    Properties properties = new Properties();
    try {
      properties.load(new FileInputStream(propertyFileName));
    } catch (FileNotFoundException e) {
      // ignore
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    }
    return properties; 
  }
  
  public String getValue(Entry parmEntry) {
    String storedValue = null;
    if (personalProperties != null) { // personal, not admin usage
      storedValue = personalProperties.getProperty(parmEntry.getKey());
      if (storedValue != null) return storedValue;
    }
    storedValue = defaultProperties.getProperty(parmEntry.getKey());
    if (storedValue != null) return storedValue;
    return parmEntry.getDefaultValue();
  }
  
  @Override
  public String getValue(String key) {
    return getValue(key, "");
  }
  
  public String getValue(String key, String initialValue) {
    String storedValue = null;
    if (personalProperties != null) { // personal, not admin usage
      storedValue = personalProperties.getProperty(key);
      if (storedValue != null) return storedValue;
    }
    storedValue = defaultProperties.getProperty(key);
    if (storedValue != null) return storedValue;
    return initialValue;
  }
  
  @Override
  public void setValue(String key, String value) {
    if (personalProperties != null) {
      if (defaultProperties.get(key) != null && personalProperties.get(key) == null && defaultProperties.get(key).equals(value)) {
        // ignore it, it is the default value
      } else personalProperties.put(key, value);
    } else { // admin case
      defaultProperties.put(key, value);
    }
  }

  public int getValueAsInt(Entry parmEntry) {
    String storedValue = null;
    if (personalProperties != null) { // personal, not admin usage
      storedValue = personalProperties.getProperty(parmEntry.getKey());
      if (storedValue != null) return Integer.parseInt(storedValue);
    }
    storedValue = defaultProperties.getProperty(parmEntry.getKey());
    if (storedValue != null) return Integer.parseInt(storedValue);
    return Integer.parseInt(parmEntry.getDefaultValue());
  }
  
  @Override
  public int getValueAsInt(String key) {
    return getValue(key, 0);
  }

  public int getValue(String key, int initialValue) {
    String storedValue = null;
    if (personalProperties != null) { // personal, not admin usage
      storedValue = personalProperties.getProperty(key);
      if (storedValue != null) return Integer.parseInt(storedValue);
    }
    storedValue = defaultProperties.getProperty(key);
    if (storedValue != null) return Integer.parseInt(storedValue);
    return initialValue;
  }
  
  public boolean getValueAsBoolean(String key) {
    return getValue(key).equals("true");
  }
  
  public void setValue(Entry parmEntry, int value) {
    setValue(parmEntry.getKey(), value);
  }

  @Override
  public void setValue(String key, int value) {
    if (personalProperties != null) {
      if (defaultProperties.get(key) != null && personalProperties.get(key) == null && defaultProperties.get(key).equals(Integer.toString(value))) {
        // ignore it, it is the default value
      } else personalProperties.put(key, Integer.toString(value));
    } else { // admin case
      defaultProperties.put(key, Integer.toString(value));
    }
  }

  public void setValue(String key, boolean value) {
    if (personalProperties != null) {
      if (defaultProperties.get(key) != null && personalProperties.get(key) == null && defaultProperties.get(key).equals(value?"true":"false")) {
        // ignore it, it is the default value
      } else personalProperties.put(key, value?"true":"false");
    } else { // admin case
      defaultProperties.put(key, value?"true":"false");
    }
  }

  public void saveProperties(String headerPers, String headerDefault) {
    if (personalProperties != null) {
      savePersonalProperties(headerPers);
    } else {
      saveDefaultProperties(headerDefault);
    }
  }

  private void savePersonalProperties(String header) {
    try {
      personalProperties.store(new FileOutputStream(personalPropertyFileName), header);
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
    }
  }
  
  private void saveDefaultProperties(String header) {
    try {
      defaultProperties.store(new FileOutputStream(defaultPropertyFileName), header);
    } catch (Exception e) {
      Logger.getInstance().error(getClass(), e);
    }
  }

}
