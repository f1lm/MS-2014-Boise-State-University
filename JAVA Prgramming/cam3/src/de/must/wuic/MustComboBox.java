/*
 * Copyright (c) 2005-2007 Christoph Mueller. All rights reserved.
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

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.*;
import javax.swing.text.JTextComponent;

/**
 * ComboBox with different meaning of being editable.
 * @author Christoph Mueller
 */
public class MustComboBox extends JComboBox<Object> implements ContextHelp {
  
//  private class UpperCaseComboBoxEditor implements ComboBoxEditor {
//    
//    private MustTextField textField;
//    
//    public UpperCaseComboBoxEditor() {
//      textField = new MustTextField();
//      textField.setCapitalization(true);
//    }
//
//    public void setItem(Object anObject) {
//      if (anObject != null) {
//        textField.setText(anObject.toString());
//      }
//    }
//
//    public Component getEditorComponent() {
//      return textField;
//    }
//
//    public Object getItem() {
//      return textField.getText();
//    }
//
//    public void selectAll() {
//      textField.selectAll();
//    }
//
//    public void addActionListener(ActionListener l) {
//      textField.addActionListener(l);
//    }
//
//    public void removeActionListener(ActionListener l) {
//      textField.removeActionListener(l);
//    }
//  }
  
  private String helpTopic;
  private String helpTarget;
  private boolean editableForUserTyping;
  private String formerContent;

  /**
   * Constructs a new MustComboBox.
   */
  public MustComboBox() {
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
   * Returns the target of the component's help context
   * @return the target of the component's help context
   */
  public String getHelpTarget() {
    return helpTarget;
  }

  /**
   * Sets the flag that determines whether or not user may type in characters and digits.
   * @param editable a flag indicating whether user may type in characters and digits
   */
  public void setEditableForUserTyping(boolean editable) {
    setEditableForUserTyping(editable, false);
  }

  /**
   * Sets the flag that determines whether or not user may type in characters and digits.
   * @param editable a flag indicating whether user may type in characters and digits
   * @param upperCase whether or not user input should be transformed to upper case  
   */
  public void setEditableForUserTyping(boolean editable, boolean upperCase) {
    setEditableForUserTyping(editable, upperCase, 0);
  }

  /**
   * Sets the flag that determines whether or not user may type in characters and digits.
   * @param editable a flag indicating whether user may type in characters and digits
   * @param upperCase whether or not user input should be transformed to upper case  
   * @param maxLength if > 0, user may enter even new input (values which are not in list) up to the given length  
   */
  public void setEditableForUserTyping(boolean editable, boolean upperCase, int maxLength) {
    this.editableForUserTyping = editable;
    if (editable) {
      setEditable(editable);
      final JTextComponent editor = (JTextComponent)getEditor().getEditorComponent();
      if (maxLength > 0) { 
        editor.setDocument(new MustDocument(upperCase, maxLength));
      } else {
        if (upperCase) editor.setDocument(new MustDocument(true));
        editor.addKeyListener(new KeyListener() {
          public void keyPressed(KeyEvent e) {
            String text = editor.getText();
            if (containsItemBeginningWith(text)) {
              formerContent = text;
            }
          }
          public void keyReleased(KeyEvent e) {
            String currentText = editor.getText();
            if (!containsItemBeginningWith(currentText)) {
              e.consume();
              editor.setText(formerContent);
              // check which item is most likely to the input and select this item
              int mostLikelyIndex = 0;
              int mostLikelyLength = 0;
              for (int i = 0; i < getItemCount(); i++) {
                for (int j = 1; j <= formerContent.length(); j++) {
                  if (((String)getItemAt(i)).startsWith(formerContent.substring(0, j))) {
                    if (j > mostLikelyLength) {
                      mostLikelyLength = j;
                      mostLikelyIndex = i;
                    }
                  }
                }
                setSelectedIndex(mostLikelyIndex);
              }
              setPopupVisible(true);
              getToolkit().beep();
            }
          }
          public void keyTyped(KeyEvent e) {
          }
        });
      }
    }
  }

	/**
	 * Returns true if there is any combobox item beginning with the specified value.
	 * @param value the value to be checked
	 * @return true if there is any combobox item beginning with the specified value
	 */
	public boolean containsItemBeginningWith(String value) {
		for (int i = 0; i < getItemCount(); i++) {
			if (((String)getItemAt(i)).startsWith(value)) {
				return true;
			}
		}
		return false;
	}
	
  /**
   * Sets the flag that determines whether or not this component is editable.
   * This means: value may be changed by user. It does not mean, that user may type in 
   * characters. To allow this, use setEditableForUserTyping.
   * If the flag is set to true, this component becomes user editable.
   * If the flag is set to false, the cannot change the text of this text
   * component.
   * @param editable a flag indicating whether this component should be user editable
   * @see #setEditableForUserTyping
   */
  public void setEditable(boolean editable) {
    this.setEnabled(editable);
    super.setEditable(editableForUserTyping && editable);
  }

}
