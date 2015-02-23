/*
 * Copyright (c) 1999-2001 Christoph Mueller. All rights reserved.
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
 * @author Christoph Mueller
 * @deprecated
 * @use BooleanAttribute, CharAttribute and so on
 */
public class Attribute extends AbstractAttribute {

 /**
  *
  * @param fieldName
  * @param type
  * @deprecated
  */
  public Attribute(String fieldName, int type) {
    this(fieldName, fieldName, type, 0);
  }

/**
  *
  * @param description
  * @param fieldName
  * @param type
  * @deprecated
  */
  public Attribute(String description, String fieldName, int type) {
    this(description, fieldName, type, 0);
  }

/**
  *
  * @param fieldName
  * @param type
  * @param length
  * @deprecated
  */
  public Attribute(String fieldName, int type, int length) {
    this("", fieldName, type, length);
  }

/**
  *
  * @param description
  * @param fieldName
  * @param type
  * @param length
  * @deprecated
  */
  public Attribute(String description, String fieldName, int type, int length) {
    super(description, fieldName, type, length, 0);
  }

}
