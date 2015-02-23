/*
 * Copyright (c) 1999-2009 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.*;
import javax.swing.*;
import javax.swing.table.*;

/**
 * A component to assign multiple keys via checkbox list.
 * @author Christoph Mueller
 */
public class MustMultChoice implements ContextHelp {

  protected JTable table;
  protected MustMultChoiceModel mainTableModel;
  private String helpTopic;
  private String helpTarget;
  private boolean required = false;

  /**
   * Constructs a new multiple choice component.
   * @param key the key containing data object, e.g. a group
   * @param keyColumns the columns of the key table to be displayed
   * @param keyHeaders the headers of the table which represents the keys
   */
  public MustMultChoice(DataObject Key, String[] keyColumns, String[] keyHeaders) {
    mainTableModel = new MustMultChoiceModel(
      Key,
      keyColumns,
      keyHeaders
    );
    table = new JTable(mainTableModel);
    // setPreferedColumnSize(new int[] {0, 50});
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
   * Returns the table e.g. to be added to a viewport.
   * @return the table e.g. to be added to a viewport
   */
  public JTable getTable() {
    return table;
  }

  /**
   * Sets the preferred column sizes of the table.
   * @param cs contains the sizes of the displayable columns from left to right
   */
  public void setPreferedColumnSize(int[] cs) {
    TableColumn column = null;
    for (int i = 0; i < cs.length; i++) {
      column = table.getColumnModel().getColumn(i);
      if (cs[i] != 0) {
         column.setMinWidth(cs[i]);
         column.setMaxWidth(cs[i]);
         // column.setPreferredWidth(cs[i]);
      }
    }
  }

  /**
   * Returns the multiple choice model.
   * @return the multiple choice model
   */
  public MustMultChoiceModel getModel() {
    return mainTableModel;
  }

  /**
   * Sets the previously added component to be mandatory.
   * @param required whether the component is mandatory or not
    */
  public void setRequired(boolean required) {
    this.required = required;
  }

  /**
   * Returns true if the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isValid() {return true;}

  /**
   * Returns true if the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled() {return false;}

  /**
   * Checks if there have been any modifications made on the current row.
   * @return true if there have been any modifications made on the current row
   */
  public boolean isModified() {return mainTableModel.isModified();}

  /**
   * Selects all input of the component, if it is supported - e.g. in JTextField.
   * Allows easy new input, because the previous value is reseted when the
   * first key stroke occurs.
   */
  public void selectAll() {}

  /**
   * Set focus on the receiving component if isRequestFocusEnabled returns true.
   */
  public void requestFocus() {}

  /**
   * Sets the flag that determines whether or not this component is editable.
   * If the flag is set to true, this component becomes user editable.
   * If the flag is set to false, the cannot change the text of this text
   * component.
   * @param editable a flag indicating whether this component should be user editable
   */
  public void setEditable(boolean editable) {}


  /**
   * Idea: set the Choice in PopertyFrame as previously selected in SelectionFrame
   */
  /**
   *
   * @param MustMultChoiceToSynchronize
   */
  public void synchronize(MustMultChoice MustMultChoiceToSynchronize) {
  }

  /**
   * Releases external resources.
   */
  public void free() {
  }

}
