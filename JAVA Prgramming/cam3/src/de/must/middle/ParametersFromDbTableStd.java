/*
 * Copyright (c) 2009 Christoph Mueller. All rights reserved.
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
 * Container for parameters, stored in property files. Differentiates between default (admin) parameters and personal parameters.
 * @author Christoph Mueller
 */
public abstract class ParametersFromDbTableStd implements ParameterStore {

  public ParametersFromDbTableStd(String defaultPropertyFileName) {
  }

  /* (non-Javadoc)
   * @see de.must.middle.ParameterStore#getValue(java.lang.String)
   */
  public String getValue(String key) {
    return getValue(key, "");
  }
  
  public String getValue(String key, String initialValue) {
    return "";
  }
  
  /* (non-Javadoc)
   * @see de.must.middle.ParameterStore#setValue(java.lang.String, java.lang.String)
   */
  public void setValue(String key, String value) {
  }

  /* (non-Javadoc)
   * @see de.must.middle.ParameterStore#getValueAsInt(java.lang.String)
   */
  public int getValueAsInt(String key) {
    return getValue(key, 0);
  }

  public int getValue(String key, int initialValue) {
    return 0;
  }
  
  public boolean getValueAsBoolean(String key) {
    return getValue(key).equals("true");
  }

  /* (non-Javadoc)
   * @see de.must.middle.ParameterStore#setValue(java.lang.String, int)
   */
  public void setValue(String key, int value) {
  }

  public void setValue(String key, boolean value) {
  }

  public void saveProperties(String headerPers, String headerDefault) {
  }

}
