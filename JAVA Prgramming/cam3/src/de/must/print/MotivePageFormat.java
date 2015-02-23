/*
 * Copyright (c) 2007 Christoph Mueller. All rights reserved.
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

import java.awt.print.PageFormat;
import java.awt.print.Paper;

/**
 * A page format which differentiates between paper and motive size and position.
 * Allows to print motives smaller than imagable area with boundary hints for scissors.
 * @author Christoph Mueller
 */
public class MotivePageFormat {
  
  private PageFormat pageFormat;
  private int motiveWidth = -1;
  private int motiveHeight = -1;
  private int motiveOffsetX = -1;
  private int motiveOffsetY = -1;
  boolean boundaryHint = false;
  private int marginForBoundaryHintX = 10;
  private int marginForBoundaryHintY = 10;
  
  public MotivePageFormat() {
    this(new PageFormat());
  }

  public MotivePageFormat(PageFormat pageFormat) {
    this.pageFormat = pageFormat;
  }
  
  public PageFormat getPageFormat() {
    return pageFormat;
  }

  public int getMotiveWidth() {
    if (motiveWidth != -1) return motiveWidth;
    else return (int)pageFormat.getImageableWidth();
  }

  public void setMotiveWidth(int motiveWidth) {
    this.motiveWidth = motiveWidth;
  }

  public int getMotiveHeight() {
    if (motiveHeight != -1) return motiveHeight;
    else return (int)pageFormat.getImageableHeight();
  }

  public void setMotiveHeight(int motiveHeight) {
    this.motiveHeight = motiveHeight;
  }

  public int getMotiveOffsetX() {
    if (motiveOffsetX != -1) return motiveOffsetX;
    else return (int)pageFormat.getImageableX();
  }

  public void setMotiveOffsetX(int motiveOffsetX) {
    this.motiveOffsetX = motiveOffsetX;
  }

  public int getMotiveOffsetY() {
    if (motiveOffsetY != -1) return motiveOffsetY;
    else return (int)pageFormat.getImageableY();
  }

  public void setMotiveOffsetY(int motiveOffsetY) {
    this.motiveOffsetY = motiveOffsetY;
  }

  public boolean isBoundaryHint() {
    return boundaryHint;
  }

  public void setBoundaryHint(boolean boundaryHint) {
    this.boundaryHint = boundaryHint;
  }

  public int getMarginForBoundaryHintX() {
    return marginForBoundaryHintX;
  }

  public void setMarginForBoundaryHintX(int marginForBoundaryHintX) {
    this.marginForBoundaryHintX = marginForBoundaryHintX;
  }

  public int getMarginForBoundaryHintY() {
    return marginForBoundaryHintY;
  }

  public void setMarginForBoundaryHintY(int marginForBoundaryHintY) {
    this.marginForBoundaryHintY = marginForBoundaryHintY;
  }

  /**
   * Returns the width, in 1/72nds of an inch, of the page.
   * This method takes into account the orientation of the
   * page when determining the width.
   * @return the width of the page.
   */
  public double getWidth() {
    return pageFormat.getWidth();
  }
  
  /**
   * Returns the height, in 1/72nds of an inch, of the page.
   * This method takes into account the orientation of the
   * page when determining the height.
   * @return the height of the page.
   */
  public double getHeight() {
    return pageFormat.getHeight();
  }

  /**
   * Returns the width, in 1/72nds of an inch, of the imageable
   * area of the page. This method takes into account the orientation
   * of the page.
   * @return the width of the page.
   */
  public double getImageableWidth() {
    return pageFormat.getImageableWidth();
  }
  
  /**
   * Return the height, in 1/72nds of an inch, of the imageable
   * area of the page. This method takes into account the orientation
   * of the page.
   * @return the height of the page.
   */
  public double getImageableHeight() {
    return pageFormat.getImageableHeight();
  }
  
  /**
   * Sets the page orientation. <code>orientation</code> must be
   * one of the constants: PORTRAIT, LANDSCAPE,
   * or REVERSE_LANDSCAPE.
   * @param orientation the new orientation for the page
   * @throws IllegalArgumentException if 
   *    an unknown orientation was requested
   */
  public void setOrientation(int orientation) throws IllegalArgumentException {
    pageFormat.setOrientation(orientation);
  }

  /**
   * Sets the <code>Paper</code> object for this 
   * <code>PageFormat</code>.
   * @param paper the <code>Paper</code> object to which to set
   * the <code>Paper</code> object for this <code>PageFormat</code>.
   * @exception <code>NullPointerException</code>
   *        a null paper instance was passed as a parameter.
   */
   public void setPaper(Paper paper) {
     pageFormat.setPaper(paper);
   }

}
