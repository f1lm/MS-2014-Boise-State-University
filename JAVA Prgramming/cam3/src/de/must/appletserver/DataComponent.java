/*
 * Copyright (c) 2011 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.*;

/**
 * A handle to different types of components in one array.
 * This is important for the {@link de.must.appletserver.DataPropertyAdministration}.
 * These data components are swing components which are connected to a database.
 * @author Christoph Mueller
 * @see DataPropertyAdministration
 */
public interface DataComponent {

 /**
   * @return the assigned data object
   */
  public DataObject getAssignedDataObject(); 

 /**
   * Determines whether input is required (mandatory).
   * @param required if true, input is mandatory; otherwise, input is not mandatory
   */
  public void setRequired(boolean required);

  /**
   * Loads the component's database stored value.
   */
  public void loadValue();

  /**
   * Indicates whether the component has a value.
   * @return true if the component has a value
   */
  public boolean isFilled();

  /**
   * Indicates whether the component's value differs from its initial value.
   * @return true if the component's value differs from its initial value
   */
  public boolean isModified();

  /**
   * Indicates whether the component's value differs from its value at load time.
   * @return true if the component's value differs from its value at load time
   */
  public boolean isToSave();
  
  /**
   * Indicates whether the component's value is valid.
   * @return true if the component's value is valid
   */
  public boolean isContentValid();

  /**
   * Indicates whether the component's value is mandatory but not filled.
   * @return if mandatory input is unfulfilled
   */
  public boolean isRequirementUnfulfilled();

  /**
   * Selects all input of the component, if it is supported - e.g. in JTextField.
   * Allows easy new input, because the previous value is reseted when the
   * first key stroke occurs.
   */
  public void selectAll();

  /**
   * Set focus on the receiving component if isRequestFocusEnabled returns true.
   */
  public void requestFocus();

  /**
   * Stores the component's value.
   */
  public void saveValue();

 /**
   * Sets the flag that determines whether or not this component is editable.
   * If the flag is set to true, this component becomes user editable.
   * If the flag is set to false, the cannot change the text of this text
   * component.
   * @param editable a flag indicating whether this component should be user editable
   */
  public void setEditable(boolean editable);

 /**
   * Sets the component's tool tip text.
   * @param toolTipText the component's tool tip text
   */
  public void setToolTipText(String toolTipText);

//  /**
//   * Adds a component modification listener to this component.
//   * Needed e.g. for data components depending from a sublist.
//   * @param l component modification listener to add
//   */
//  public void addComponentModificationListener(ComponentModificationListener l);
//
//  /**
//   * Removes a component modification listener to this component.
//   * Needed e.g. for data components depending from a sublist.
//   * @param l component modification listener to add
//   * @see DataList
//   */
//  public void removeComponentModificationListener(ComponentModificationListener l);

 /**
   * Releases external resources.
   */
  public void free();

}
