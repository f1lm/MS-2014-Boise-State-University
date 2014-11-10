/*
 * Copyright (c) 2004-2010 Christoph Mueller. All rights reserved.
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

import java.util.Vector;

import de.must.dataobj.Identifier;

import javax.swing.DefaultListModel;

/**
 * Model to be used in JLists where each row represents one database record
 * identified by an identifier object.
 * @see de.must.dataobj.Identifier
 * @author Christoph Mueller
 */
public class IndentifierListModel extends DefaultListModel<String> {

  private Vector<Identifier> identifiers = new Vector<Identifier>();

	/**
	 * Constructs a new identifier list model.
	 */
	public IndentifierListModel() {
		super();
	}

  /**
   * Adds the specified text to the end of this list.
   * @param identifier the identifier of the added text
   * @param text the text to be added
   * @see Vector#addElement(Object)
   */
  public void addElement(Identifier identifier, String text) {
    identifiers.add(identifier);
    super.addElement(text);
  }

	/* (non-Javadoc)
	 * @see javax.swing.DefaultListModel#removeAllElements()
	 */
	public void removeAllElements() {
    identifiers.clear();
		super.removeAllElements();
	}

	/* (non-Javadoc)
	 * @see javax.swing.DefaultListModel#removeElementAt(int)
	 */
	public void removeElementAt(int index) {
    identifiers.remove(index);
		super.removeElementAt(index);
	}

  /**
   * Returns the identifier of the specified item.
   * @param listIndex the index of the item
   * @return the identifier of the item
   */
  public Identifier getIdentifier(int listIndex) {
    if (listIndex < 0) return null;
    if (listIndex >= identifiers.size()) return null;
    return identifiers.get(listIndex);
  }

}
