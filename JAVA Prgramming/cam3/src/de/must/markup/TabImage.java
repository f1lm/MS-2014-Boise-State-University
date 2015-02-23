/*
 * Copyright (c) 2002-2004 Christoph Mueller. All rights reserved.
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
package de.must.markup;

/**
 * A pair of images to be used as active / inactive tabulator.
 * @see TabButtonGroup
 * @author Christoph Mueller
 */
  
 public class TabImage {
  
  private String pathToActiveTabImage;
  private String pathToInactiveTabImage;
  
	/**
	 * Constructs a new tab image.
	 * @param pathToActiveTabImage the path to the image representing the active tabulator
	 * @param pathToInactiveTabImage the path to the image representing the inactive tabulator
	 */
  public TabImage(String pathToActiveTabImage, String pathToInactiveTabImage) {
    this.pathToActiveTabImage = pathToActiveTabImage;
    this.pathToInactiveTabImage = pathToInactiveTabImage;
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @param activeVariant whether the active variant is to be shown
   * @return the tag sequence to show the component
   */
  public String getCreationTag(boolean activeVariant) {
    StringBuffer tag = new StringBuffer();
    if (activeVariant) {
      tag.append("<img src=\"" + pathToActiveTabImage + "\" border=0");
    } else {
      tag.append("<img src=\"" + pathToInactiveTabImage + "\" border=0");
    }
    tag.append(">");
    return tag.toString();
  }

}

