/*
 * Copyright (c) 2011-2012 Christoph Mueller. All rights reserved.
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
package de.must.appletserver;

import de.must.middle.EntitlementStd;

/**
 * Menu to be used by MustMenuBar.
 * @author Christoph Mueller
 * @see MustMenuBar
 */
public class MustMenu extends MustMenuNode {

  private MustMenu fatherMenu;
  private int subjectArea;
  private int minimumLevel;

  /**
   * Constructs a new menu.
   * @param menuText the menu text
   * @param fatherMenu the father menu - null for root menu
   * @param subjectArea the subject area as specified in EntitlementStd and its subclasses
   * @param minimumLevel the minimum level assigned to the function - e.g. DataTableAdministrations always have minimum level LEVEL_CHANGE
   * @see EntitlementStd
   */
  public MustMenu(String menuText, MustMenu fatherMenu, int subjectArea) {
    this(menuText, fatherMenu, subjectArea, EntitlementStd.AREA_GENERAL);
  }
  
  /**
   * Constructs a new menu.
   * @param menuText the menu text
   * @param fatherMenu the father menu - null for root menu
   * @param subjectArea the subject area as specified in EntitlementStd and its subclasses
   * @param minimumLevel the minimum level assigned to the function - e.g. DataTableAdministrations always have minimum level LEVEL_CHANGE
   * @see EntitlementStd
   */
  public MustMenu(String menuText, MustMenu fatherMenu, int subjectArea, int minimumLevel) {
    super(menuText);
    this.fatherMenu = fatherMenu;
    this.subjectArea = subjectArea;
    this.minimumLevel = minimumLevel;
  }

  /**
   * Returns the father menu.
   * @return the father menu
   */
  public MustMenu getFatherMenu() {
    return fatherMenu;
  }

  /**
   * Returns the subject area.
   * @return the subject area
   * @see EntitlementStd
   */
  public int getSubjectArea() {
    return subjectArea;
  }

  /**
   * Returns the minimum level.
   * @return the minimum level
   * @see EntitlementStd
   */
  public int getMinimumLevel() {
    return minimumLevel;
  }

  /**
   * Adds a menu the current menu. If the current menu is the root menu, the
   * added menu is a main menu, otherwise a sub menu.
   * @param menu the menu to add
   */
  public void addMenu(MustMenu menu) {
    addElement(menu);
  }

}
