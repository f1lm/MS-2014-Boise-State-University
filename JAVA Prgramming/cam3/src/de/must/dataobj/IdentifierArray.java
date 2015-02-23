/*
 * Copyright (c) 1999-2006 Christoph Mueller. All rights reserved.
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

/**
 * Identifier array with dynamic capacity extension.
 * @author Christoph Mueller
 */
public class IdentifierArray {

  public Identifier[] identifiers;
  private int capacity;
  private int size = -1;

  /**
   * Constructs a new int array with the default capacity of 500 items.
   */
  public IdentifierArray() {
    this(500);
  }

  /**
   * Constructs a new int array with the specified capacity.
   * @param baseCapacity the initial capacity
   */
  public IdentifierArray(int baseCapacity) {
    capacity = baseCapacity;
    identifiers = new Identifier[baseCapacity];
  }

  /**
   * Initializes the array.
   */
  public void init() {
    size = -1;
  }

  /**
   * Adds an item to the array
   * @param newIdentifier the identifier to insert
   */
  public void add(Identifier newIdentifier) {
    if (size >= capacity - 1) {
      identifiers = doubleCapacity(identifiers);
    }
    identifiers[++size] = newIdentifier;
  }

  /**
   * Inserts an identifier
   * @param newIdentifier the identifier to insert
   * @param itemIndex index (position of the identifier to insert)
   * @param maxRows the maximum of rows to be hold in the array - last item will vanish if size > maxRows
   */
  public void add(Identifier newIdentifier, int itemIndex, int maxRows) {
    if (size < maxRows - 1) ++size;
    for (int i=size+1; i >= itemIndex; i--) {
      identifiers[i+1] = identifiers[i];
    }
    identifiers[itemIndex] = newIdentifier;
  }
  
  /**
   * Removes an item and closes the gap.
   * @param itemIndex the index of the item to be removed
   */
  public void remove(int itemIndex) {
    for (int i=itemIndex; i < size; i++) {
      identifiers[i] = identifiers[i+1];
    }
    size--;
  }

  /**
   * Sets the value of an item.
   * @param item the index of the item to set
   * @param intValue the new int value
   */
  public void setIdentifier(int item, Identifier identifier) {
    if (item < 0) de.must.io.Logger.getInstance().info(getClass(), "setInt < 0 invalid");
    if (item > size) de.must.io.Logger.getInstance().info(getClass(), "setInt > size invalid");
    identifiers[item] = identifier;
  }

  /**
   * Returns the value of an item.
   * @param item the index of the regarded item
   * @return the value of the item
   */
  public Identifier getIdentifier(int item) {
    if (item < 0) return null;
    if (item > size) return null;
    return identifiers[item];
  }

  /**
   * Doubles the capacity of an Identifier array.
   * @param oldintArray the int array to double capacity
   * @return the capacity increased array
   */
  public Identifier[] doubleCapacity(Identifier[] oldIdentifierArray) {
    int i=0;
    int oldArrayCapacity = oldIdentifierArray.length;
    int newArrayCapacity = oldArrayCapacity * 2;
    Identifier[] newIdentifierArray = new Identifier[newArrayCapacity];
    while (i < oldArrayCapacity) {
      newIdentifierArray[i] = oldIdentifierArray[i];
      i++;
    }
    capacity = capacity * 2;
    return newIdentifierArray;
  }

}
