/*
 * Copyright (c) 2012 Christoph Mueller. All rights reserved.
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

package de.must.print;

import java.awt.Font;

public class FontSpecification {
  
  private String name;
  private int style;
  private int size;
  
  public FontSpecification(int style, int size) {
    this(null, style, size);
  }
  
  public FontSpecification(String name, int style, int size) {
    this.name = name;
    this.style = style;
    this.size = size;
  }

  public FontSpecification(Font font) {
    this.name = font.getFontName();
    this.style = font.getStyle();
    this.size = font.getSize();
  }

  public String getName() {
    return name;
  }

  public int getStyle() {
    return style;
  }

  public int getSize() {
    return size;
  }

  @Override
  public boolean equals(Object obj) {
    if (obj == null) return false;
    if (!(obj instanceof FontSpecification)) return false;
    FontSpecification otherFS = (FontSpecification)obj;
    if (otherFS.name == null && name != null) return false;
    if (otherFS.name != null && name == null) return false;
    if (otherFS.name != null && name != null && !otherFS.name.equals(name)) return false;
    if (otherFS.style != style) return false;
    if (otherFS.size != size) return false;
    return true;
  }
  
  public Font changeFont(Font font) {
    String newName = font.getName();
    if (name != null) newName = name;
    return new Font(newName, style, size);
  }

}
