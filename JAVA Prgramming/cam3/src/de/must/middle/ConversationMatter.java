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
 * Information to be a acknowledged by user and sound to wake him up.
 * @author Christoph Mueller
 */
public class ConversationMatter {

  protected String title;
  protected String[] lines;
  protected String soundToPlay;
  
  /**
   * Constructs a new conversation matter.
   * @param line the info line to be displayed 
   */
  public ConversationMatter(String line) {
    this(null, new String[]{line}, null);
  }
  
  /**
   * Constructs a new conversation matter.
   * @param lines the info lines to be displayed 
   */
  public ConversationMatter(String[] lines) {
    this(null, lines, null);
  }
  
  /**
   * Constructs a new conversation matter.
   * @param lines the info lines to be displayed 
   */
  public ConversationMatter(Vector<String> lines) {
    this(null, lines, null);
  }
  
  /**
   * Constructs a new conversation matter.
   * @param title the title of the dialog
   * @param lines the info lines to be displayed 
   * @param soundToPlay the sound to play when asking for confirmation
   */
  public ConversationMatter(String title, Vector<String> lines, String soundToPlay) {
    this(title, lines.toArray(new String[lines.size()]), soundToPlay);
  }
  
  /**
   * Constructs a new conversation matter.
   * @param title the title of the dialog
   * @param lines the info lines to be displayed 
   * @param soundToPlay the sound to play when asking for confirmation
   */
  public ConversationMatter(String title, String[] lines, String soundToPlay) {
    this.title = title;
    this.lines = lines;
    this.soundToPlay = soundToPlay;
  }

  public String getTitle() {
    return title;
  }

  public String[] getLines() {
    return lines;
  }

  public String getSoundToPlay() {
    return soundToPlay;
  }

}
