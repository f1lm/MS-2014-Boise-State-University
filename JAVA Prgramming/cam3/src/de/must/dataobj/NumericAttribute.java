/*
 * Copyright (c) 1999-2006 Christoph Mueller. All rights reserved.
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

/**
 * Attribute of an entity with numeric association capability.
 * @author Christoph Mueller
 */
public class NumericAttribute extends AbstractAttribute {

  /**
   * Constructs a new numeric attribute with default length and scale.
   * @param description the description of the attribute
   * @param fieldName the field name / column name
   */
  public NumericAttribute(String description, String fieldName) {
    this(description, fieldName, 0);
  }

  /**
   * Constructs a new numeric attribute with the specified length.
   * @param description the description of the attribute
   * @param fieldName the field name / column name
   * @param length the maximum length of the field
   */
  public NumericAttribute(String description, String fieldName, int length) {
    this(description, fieldName, length, 0);
  }

  /**
   * Constructs a new numeric attribute with the specified length and scale.
   * @param description the description of the attribute
   * @param fieldName the field name / column name
   * @param length the maximum length of the field
   * @param scale the scale to be used
   */
  public NumericAttribute(String description, String fieldName, int length, int scale) {
    super(description, fieldName, NUMBER, length, scale);
  }

  protected NumericAttribute(String description, String fieldName, int type, int length, int scale) {
    super(description, fieldName, type, length, scale);
  }

}
