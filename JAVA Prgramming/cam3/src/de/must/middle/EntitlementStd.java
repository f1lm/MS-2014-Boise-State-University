/*
 * Copyright (c) 2001-2012 Christoph Mueller. All rights reserved.
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
 * Class determine rights for territories or areas.
 * Due to different needs, territories and areas exist as alternatives,
 * depending on individual advantages of numeric or alphanumeric classification.
 * Hints:
 * - Territories aren't imperatively hierarchical, they may be compared by startsWith.
 * - Subclasses may define additional territories and areas.
 * @author Christoph Mueller
 */
public abstract class EntitlementStd {

  public static final int AREA_GENERAL = 0;
  public static final int AREA_REC = 4;
  public static final int AREA_REC_NEW_ONLY = 5;
  public static final int AREA_ORGANIZE = 6;
  public static final int AREA_ADM = 8;
  public static final int AREA_SUP = 9;
  
  /** administration territory */
  public static final String TERRITORY_ADMINISTRATION = "1";
  /** organization territory */
  public static final String TERRITORY_ORGANIZATION = "2";
  /** everything that is 'standard work' with the application */
  public static final String TERRITORY_STANDARD = "5";

  /** right to write and delete */ public static final int RIGHT_WRITE = 1;  
  /** right to read */ public static final int RIGHT_READ = 5;  
  /** no rights at all */ public static final int RIGHT_NONE = 9;

  public EntitlementStd() {
  }

  /**
   * Returns true if user is entitled for this area.
   * Override it by subclass.
   * @param area  the area to be accessed.
   * @return  true if user is entitled for this area
   */
  public boolean isEntitled(int area) {
    return true;  // default value unless it is reduced by overriding this method
  }

  /**
   * Returns true if user's role allows at least read access.
   * @param territory the territory the user requests to enter
   * @return the right of the user in this territory
   */
  public boolean isEntitled(String territory) {
    return getRight(territory) <= RIGHT_READ;
  }
  
  public boolean isEditable(String territory) {
    return getRight(territory) <= RIGHT_WRITE;
  }

  /**
   * Returns the right of the user in this territory.
   * Override it by subclass.
   * @param territory the territory the user requests to enter
   * @return the right of the user in this territory
   */
  public int getRight(String territory) {
    return RIGHT_WRITE; // default value unless it is reduced by overriding this method
  }

}
