/*
 * Copyright (c) 2001 Christoph Mueller. All rights reserved.
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
 * Back button with automated locale specific label.
 * @author Christoph Mueller
 */
public class BackButton extends MustButton {

  public static String enforcedGeneralLabel = null;

	/**
	 * Sets the general label of the back button. Useful e.g. if now locale dynamic is opportune
	 * @param the label gererally to be used for the back button
	 */
	public static void setEnforcedGeneralLabel(String enforcedGeneralLabel) {
		BackButton.enforcedGeneralLabel = enforcedGeneralLabel;
	}

  /**
   * Constructs a new back button with the locale specific label.
   * @param the sessions public data to determine the language to be used.
   */
  public BackButton(SessionData sessionData) {
    this(enforcedGeneralLabel!=null?enforcedGeneralLabel:sessionData.getFrameworkResourceString("TEXT_BACK_BUTTON"));
  }

  /**
   * Constructs a new back button with the label as specified.
   * @param the buttons label
   */
  public BackButton(String label) {
    super(label, Dialog.NAME_FOR_BACK_ACTION);
  }

}
