/*
 * Copyright (c) 2004 Christoph Mueller. All rights reserved.
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
package de.must.util;

/**
 * Something like a property / keyed by alphanumeric value.
 * @author Christoph Mueller
 * @see de.must.wuic.DataVariableChoice
 * @see de.must.wuic.VariableChoice
 */
public class KeyValuePairAlpha implements KeyValuePair {
  
  private String key;
  private String value;
  
  /**
   * Constructs a new pair of numeric key and its value.
	 * @param key the key of the pair
	 * @param value the value of the pair
	 */
	public KeyValuePairAlpha(String key, String value) {
    this.key = key;
    this.value = value;
  }

  /**
   * Returns the key of the pair.
   * @return the key of the pair
   */
  public String getKey() {
    return key;
  }

  /**
   * Returns the value of the pair.
   * @return the value of the pair
   */
  public String getValue() {
    return value;
  }

}
