/*
 * Copyright (c) 1999-2002 Christoph Mueller. All rights reserved.
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
 * License category.
 * @author Christoph Mueller
 */
public class Licence {

  public static final int DEMO_LICENCE = 0;
  public static final int PROFESSIONAL_DEMO_LICENCE = 1;
  public static final int LIGHT_LICENCE = 4; 
  public static final int STANDARD_LICENCE = 6; 
  public static final int PROFESSIONAL_LICENCE = 7;
  protected static int licenceType = STANDARD_LICENCE;

  /**
   * Returns the license type.
   * @return the license type
   */
  public static int getLicenceType() {
    return licenceType;
  }

  /**
   * Sets the license type.
   * @param newLicenceType the new license type
   */
  public static void setLicenceType(int newLicenceType) {
    licenceType = newLicenceType;
  }

  /**
   * Returns the license description.
   * @return the license description
   */
  public static String getLicenceDescription() {
    switch (licenceType) {
    case Licence.DEMO_LICENCE:
      return "Standard - Evaluation Version";
    case Licence.PROFESSIONAL_DEMO_LICENCE:
      return "Professional - Evaluation Version";
    case Licence.LIGHT_LICENCE:
      return "Light";
    case Licence.STANDARD_LICENCE:
      return "Standard";
    case Licence.PROFESSIONAL_LICENCE:
      return "Professional";
    default:
      return " - no licence - ";
    }
  }

  /**
   * Constructs a new license.
   */
  public Licence() {
  }

}
