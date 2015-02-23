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

package de.must.middle;

import java.util.Vector;

/**
 * Information to be confirmed by user and sound to wake him up.
 * @author Christoph Mueller
 */
public class ConfirmationMatter extends ConversationMatter {
  
  /**
   * Constructs a new confirmation matter.
   * @param line the info line to be displayed 
   */
  public ConfirmationMatter(String line) {
    super(null, new String[]{line}, null);
  }
  
  /**
   * Constructs a new confirmation matter.
   * @param lines the info lines to be displayed 
   */
  public ConfirmationMatter(Vector<String> lines) {
    super(null, lines, null);
  }
  
  /**
   * Constructs a new confirmation matter.
   * @param title the title of the confirm dialog
   * @param lines the info lines to be displayed 
   * @param soundToPlay the sound to play when asking for confirmation
   */
  public ConfirmationMatter(String title, Vector<String> lines, String soundToPlay) {
    super(title, lines.toArray(new String[lines.size()]), soundToPlay);
  }
  
  /**
   * Constructs a new confirmation matter.
   * @param title the title of the confirm dialog
   * @param lines the info lines to be displayed 
   * @param soundToPlay the sound to play when asking for confirmation
   */
  public ConfirmationMatter(String title, String[] lines, String soundToPlay) {
    super(title, lines, soundToPlay);
  }

}
