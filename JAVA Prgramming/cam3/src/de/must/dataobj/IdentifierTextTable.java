/*
 * Copyright (c) 2002-2010 Christoph Mueller. All rights reserved.
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

package de.must.dataobj;

import java.util.Vector;
import java.util.Enumeration;

import de.must.io.Logger;

/**
 * A kind of hashtable to translate information into identifier and vice versa.
 * Used for connecting comboboxes to database tables.
 * The original hashtable could not be used, because a get of new Identifier(123)
 * doesn't find the entry of a previous new Identifier(123). Another advantage
 * is that a vector keeps the sorting, which is not provided by hashtable.
 * @see de.must.wuic.HalfDataComboBox
 * @see de.must.markup.HalfDataComboBox
 * @author Christoph Mueller
 */
public class IdentifierTextTable {

  private class IdentifierTextPair {
    public Identifier identifier;
    public String text;
    public IdentifierTextPair(Identifier identifier, String text) {
      this.identifier = identifier;
      this.text = text;
    }
  }

  private Vector<IdentifierTextPair> table = new Vector<IdentifierTextPair>();

  /**
   * Constructs a new identifier text table.
   */
  public IdentifierTextTable() {
  }

  public void put(Identifier identifier, String text) {
    table.addElement(new IdentifierTextPair(identifier, text));
  }

  public String get(Identifier identifier) {
    Enumeration<IdentifierTextPair> enumeration = table.elements();
    while (enumeration.hasMoreElements()) {
      IdentifierTextPair pair = enumeration.nextElement();
      if (pair.identifier.equals(identifier)) return pair.text;
    }
    return null;
  }

  public Identifier getIdentifier(Object object) {
    return getIdentifier((String)object);
  }

  public Identifier getIdentifier(String text) {
    Enumeration<IdentifierTextPair> enumeration = table.elements();
    while (enumeration.hasMoreElements()) {
      IdentifierTextPair pair = enumeration.nextElement();
      if (pair.text.equals(text)) {
        Logger.getInstance().debug(getClass(), "Item '" + text + "' has got identifier " + pair.identifier);
        return pair.identifier;
      }
    }
    Logger.getInstance().debug(getClass(), "Item '" + text + "' has got no identifier ");
    return null;
  }

  public void remove(Identifier identifier) {
    Enumeration<IdentifierTextPair> enumeration = table.elements();
    while (enumeration.hasMoreElements()) {
      IdentifierTextPair pair = enumeration.nextElement();
      if (pair.identifier.equals(identifier)) {
        table.remove(pair);
      }
    }
  }

  public int size() {
    return table.size();
  }

  public String getTextAt(int index) {
    return ((IdentifierTextPair)table.elementAt(index)).text;
  }

}
