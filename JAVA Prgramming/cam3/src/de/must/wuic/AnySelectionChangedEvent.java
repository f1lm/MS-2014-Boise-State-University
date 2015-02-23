/*
 * Copyright (c) 2000-2006 Christoph Mueller. All rights reserved.
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
package de.must.wuic;

import de.must.dataobj.Identifier;

/**
 * An event that characterizes a change of a selection.
 * @author Christoph Mueller
 */
public class AnySelectionChangedEvent {

  private int selectionCount;
  private boolean newSelectionState;
  private Identifier selectedIdentifier;

	/**
   * Constructs a new selection change event with the specified selection state.
	 * @param newSelectionState indicates whether after the change there is a
   * selection active or not.
	 */
  public AnySelectionChangedEvent(int selectionCount, boolean newSelectionState, Identifier selectedIdentifier) {
    this.selectionCount = selectionCount;
    this.newSelectionState = newSelectionState;
    this.selectedIdentifier = selectedIdentifier;
  }

  public int getSelectionCount() {
    return selectionCount;
  }

	/**
   * Returns the new selection state.
	 * @return true if there is a selection active now
	 */
  public boolean getNewSelectionState() {
    return newSelectionState;
  }

  public Identifier getSelectedIdentifier() {
    return selectedIdentifier;
  }

}

