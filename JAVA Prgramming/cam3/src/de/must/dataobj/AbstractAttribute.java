/*
 * Copyright (c) 1998-2001 Christoph Mueller. All rights reserved.
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
 * Attribute for defining data structures in a liberal way. Neither database type
 * nor persistence paradigm in general is committed by using this attributing
 * syntax.
 * @author Christoph Mueller
 */
public abstract class AbstractAttribute {

  public static final int LOGICAL = -7;
  public static final int BOOLEAN = -7;
  public static final int MEMO = -1;
  public static final int NUMBER = 22;
  public static final int DECIMAL = 2;
  public static final int INTEGER = 4;
  public static final int BIGINT = 5;
  public static final int FLOAT = 7;
  public static final int CHAR = 121;
  public static final int VARCHAR = 122;
  public static final int DATE = 91;
  public static final int TIME = 92;
  public static final int TIMESTAMP = 931;
  public static final int DATETIME = 932;

  private String fieldName;
  private int type;
  private int length;
  private int scale;
  private String description;

  /**
   * Constructs a new attribute with the specified description, field name,
   * type, length and scale.
   * @param description the field description
   * @param fieldName the field name
   * @param type the column type
   * @param length the field length
   * @param scale the field scale
   */
  protected AbstractAttribute(String description, String fieldName, int type, int length, int scale) {
    this.fieldName = fieldName;
    this.type = type;
    this.description = description;
    this.length = length;
    this.scale = scale;
  }

  /**
   * Returns the field name.
   * @return the field name
   */
  public String getFieldName() {
    return fieldName;
  }

  /**
   * Returns the field type
   * @return the field type
   */
  public int getType() {
    return type;
  }

  /**
   * Returns the field length
   * @return the field length
   */
  public int getLength() {
    return length;
  }

  /**
   * Returns the field scale
   * @return the field scale
   */
  public int getScale() {
    return scale;
  }

  /**
   * Returns the field description.
   * @return the field description
   */
  public String getDescription() {
    return description;
  }

}
