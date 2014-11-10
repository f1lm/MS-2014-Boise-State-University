/*
 * Copyright (c) 2004-2013 Christoph Mueller. All rights reserved.
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

import de.must.util.KeyValuePairNum;

import javax.swing.*;

/**
 * A JComboBox with statically filled content via numeric keys and their descriptions.
 * @author Christoph Mueller
 */
public class VariableChoiceNumKey extends JComboBox<String> implements ContextHelp {

  private KeyValuePairNum[] keyValuePairs;
  private boolean noChoicePossible = false;
  private String nameForNoChoice = "<alle>";
  private String helpTopic;
  private String helpTarget;

  /**
   * Constructs an new variable choice with the specified content and offer control.
   * @param keyValuePairs the content as an array of key value pairs
   */
  public VariableChoiceNumKey(KeyValuePairNum[] keyValuePairs) {
    this(keyValuePairs, false);
  }

   /**
    * Constructs an new variable choice with the specified content and offer control.
    * @param keyValuePairs the content as an array of key value pairs
    * @param noChoicePossible if true, an item is offered which represents the "no choice"
    */
  public VariableChoiceNumKey(KeyValuePairNum[] keyValuePairs, boolean noChoicePossible) {
    this.keyValuePairs = keyValuePairs;
    this.noChoicePossible = noChoicePossible;
    if (noChoicePossible) addItem(nameForNoChoice);
    fillItems(keyValuePairs);
  }

  /**
   * Constructs an new variable choice with the specified content and offer control.
   * @param keyValuePairs the content as an array of key value pairs
   * @param nameForNoChoice the name for "no choice"
   */
  public VariableChoiceNumKey(KeyValuePairNum[] keyValuePairs, String nameForNoChoice) {
    this.keyValuePairs = keyValuePairs;
    this.nameForNoChoice = nameForNoChoice;
    this.noChoicePossible = true;
    addItem(nameForNoChoice);
		fillItems(keyValuePairs);
  }

	private void fillItems(KeyValuePairNum[] keyValuePairs) {
		for (int i = 0; i < keyValuePairs.length; i++) {
			addItem(/*keyValuePairs[i].getKey() + " = " +*/ keyValuePairs[i].getValue());
		}
	}

  /**
   * Sets the name for "no choice", e.g. "<all>"
   * @param noChoiceName the name for "no choice"
   */
  public void setNameForNoChoice(String noChoiceName) {
    nameForNoChoice = noChoiceName;
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   */
  public void setHelpContext(String helpTopic) {
    setHelpContext(helpTopic, null);
  }

  /**
   * Sets the component's context help.
   * @param helpTopic the context help's topic
   * @param helpTarget the context help's target
   */
  public void setHelpContext(String helpTopic, String helpTarget) {
    this.helpTopic = helpTopic;
    this.helpTarget = helpTarget;
  }

  /**
   * @return the topic of the component's help context
   */
  public String getHelpTopic() {
    return helpTopic;
  }

  /**
   * @return the target of the component's help context
   */
  public String getHelpTarget() {
    return helpTarget;
  }

  /**
   * Returns the key of the selected item.
   * @return the key of the selected item
   */
  public int getSelectedItemKey() {
    int realIndex = -1;
    if (noChoicePossible) {
      realIndex = getSelectedIndex() -1;
    } else {
      realIndex = getSelectedIndex();
    }
    if (realIndex < 0) return realIndex;
    return keyValuePairs[realIndex].getKey();
  }

  /**
   * Selects the item by its key.
   * @param key the key of the item to select
   */
  public void setSelectedItemKey(int key) {
    for (int i = 0; i < keyValuePairs.length; i++) {
      if (keyValuePairs[i].getKey() == key) {
        int realIndex = -1;
        if (noChoicePossible) {
          realIndex = i + 1;
        } else {
          realIndex = i;
        }
        setSelectedIndex(realIndex);
      }
    }
  }

  /**
   * Returns true if the selected item is not the placeholder for "none" or "any".
   * @return true if the selected item is not the placeholder for "none" or "any"
   */
  public boolean isSpecialChoice() {
    try {
      return !getSelectedItem().equals(nameForNoChoice);
    }
    catch (Exception e) {
      return false;
    }
  }

  /**
   * Selects the item to be used to indicate "no special choice"
   */
  public void setNoSpecialChoice() {
    if (nameForNoChoice != null) setSelectedItem(nameForNoChoice);
  }

}
