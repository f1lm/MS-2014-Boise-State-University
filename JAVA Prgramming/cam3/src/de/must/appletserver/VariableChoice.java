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

package de.must.appletserver;

import de.must.util.KeyValuePair;

/**
 * A JComboBox with statically filled content via keys and their descriptions.
 * @author Christoph Mueller
 */
public class VariableChoice extends MustComboBox {

  private String[][] content;
  private String nameForNoChoice = "<" + getTranslation("TEXT_NAME_FOR_NO_CHOICE") + ">";
  private boolean noChoicePossible = false;
  private boolean suppressKey = true;

  /**
   * Constructs an new variable choice with the specified content.
   * @param content the statically filled content, each line is a pair of key and value.
   */
  public VariableChoice(SessionData sessionData, String[][] content) {
    this(sessionData, content, false);
  }

  /**
   * Constructs an new variable choice with the specified content and offer control.
   * @param content the statically filled content, each line is a pair of key and value
   * @param noChoicePossible if true, an item is offered which represents the "no choice"
   */
  public VariableChoice(SessionData sessionData, String[][] content, boolean noChoicePossible) {
    this(sessionData, content, noChoicePossible, null);
  }

  /**
   * Constructs an new variable choice with the specified content and offer control.
   * @param content the statically filled content, each line is a pair of key and value
   * @param noChoicePossible if true, an item is offered which represents the "no choice"
   * @param suppressKey whether or not keys should be suppressed in ComboBox
   */
  public VariableChoice(SessionData sessionData, String[][] content, boolean noChoicePossible, boolean suppressKey) {
    this(sessionData, content, noChoicePossible, null, suppressKey);
  }

  /**
   * Constructs an new variable choice with the specified content and offer control.
   * @param content the statically filled content, each line is a pair of key and value
   * @param noChoicePossible if true, an item is offered which represents the "no choice"
   * @param nameForNoChoice the expression to be used to indicate "no choice"
   */
  public VariableChoice(SessionData sessionData, String[][] content, boolean noChoicePossible, String nameForNoChoice) {
    this(sessionData, content, noChoicePossible, null, false);
  }

  /**
   * Constructs an new variable choice with the specified content and offer control.
   * @param content the statically filled content, each line is a pair of key and value
   * @param noChoicePossible if true, an item is offered which represents the "no choice"
   * @param nameForNoChoice the expression to be used to indicate "no choice"
   * @param suppressKey whether or not keys should be suppressed in ComboBox
   */
  public VariableChoice(SessionData sessionData, String[][] content, boolean noChoicePossible, String nameForNoChoice, boolean suppressKey) {
    super(sessionData);
    this.content = content;
    this.noChoicePossible = noChoicePossible;
    this.suppressKey = suppressKey;
    if (nameForNoChoice != null) this.nameForNoChoice = nameForNoChoice;
    if (noChoicePossible) {
      addItem(this.nameForNoChoice);
    }
    for (int i = 0; i < content.length; i++) {
      addItem(getItem(i));
    }
  }
  
  private String getItem(int index) {
    if (suppressKey) {
      return content[index][1];
    } else {
      return content[index][0] + " = " + content[index][1];
    }
  }

  /**
   * Constructs an new variable choice with the specified content.
   * @param keyValuePairs the content as an array of key value pairs
   */
  public VariableChoice(SessionData sessionData,KeyValuePair[] keyValuePairs) {
    this(sessionData, keyValuePairs, false);
  }

  /**
   * Constructs an new variable choice with the specified content and offer control.
   * @param keyValuePairs the content as an array of key value pairs
   * @param noChoicePossible if true, an item is offered which represents the "no choice"
   */
  public VariableChoice(SessionData sessionData, KeyValuePair[] keyValuePairs, boolean noChoicePossible) {
    super(sessionData);
    this.content = new String[keyValuePairs.length][2];
    if (noChoicePossible) {
      addItem(nameForNoChoice);
    }
    for (int i = 0; i < keyValuePairs.length; i++) {
      this.content[i][0] = keyValuePairs[i].getKey();
      this.content[i][1] = keyValuePairs[i].getValue();
      if (suppressKey) {
        addItem(content[i][1]);
      } else {
        addItem(content[i][0] + " = " + content[i][1]);
      }
    }
  }

  /**
   * Returns a text in the corresponding language according to the locale
   * specific resource bundle of the package.
   * @param resourceKey the key of the resource to retrieve
   * @return the resource
   */
  protected String getTranslation(String resourceKey) {
    return sessionData.getFrameworkResourceString(resourceKey);
  }

  public int getSelectedIndex() {
    String value = (String)getSelectedItem();
    for (int i = 0; i < content.length; i++) {
      if (content[i][1].equals(value)) return i;
    }
    return -1; // not scheduled
  }

 /**
   * Returns the key of the selected item.
   * @return the key of the selected item
   */
  public String getSelectedItemKey() {
    if (suppressKey) {
      String value = (String)getSelectedItem();
      if (!isSpecialChoice()) return "";
      for (int i = 0; i < content.length; i++) {
        if (content[i][1].equals(value)) return content[i][0];
      }
      return "?????"; // not scheduled
    } else {
      String result = (String)getSelectedItem();
      if (result.equals(nameForNoChoice)) return "";
      int offset = result.indexOf(" = ");
      if (offset > 0) 
      result = result.substring(0, offset);
      return result;
    }
  }

  /**
   * Selects the item by its key.
   * @param key the key of the item to select
   */
  public void setSelectedItemKey(String key) {
    if (key.length() == 0) setSelectedItem(getItem(0));
    for (int i = 0; i < content.length; i++) {
      if (content[i][0].trim().equals(key)) {
        setSelectedItem(getItem(i));
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
