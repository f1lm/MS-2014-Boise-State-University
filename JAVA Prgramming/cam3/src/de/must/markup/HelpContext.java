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
 * A couple of help context informations to provide suitable help in case of
 * user requests like e.g. F1.
 * @author Christoph Mueller
 */
public class HelpContext {

  private String topic;
  private String target;

  /**
   * Constructs a new help context with the specified topic and no target.
   * @param topic the topic of the help context
   */
  public HelpContext(String topic) {
    this.topic = topic;
  }

  /**
   * Constructs a new help context with the specified topic and target.
   * @param topic the topic of the help context
   * @param target the target of the help context
   */
  public HelpContext(String topic, String target) {
    this.topic = topic;
    this.target = target;
  }

  /**
   * Returns the topic of the help context
   * @return the topic of the help context
   */
  public String getTopic() {
    return topic;
  }

  /**
   * Returns the target of the help context
   * @return the target of the help context
   */
  public String getTarget() {
    return target;
  }

}