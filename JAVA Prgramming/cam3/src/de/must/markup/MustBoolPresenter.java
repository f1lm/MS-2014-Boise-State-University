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
 * A component to present a boolean information.
 * @author Christoph Mueller
 */
public class MustBoolPresenter implements Markupable {

  protected String name;
  protected String checkText;
  private String toolTipText;
  private String comment;
  private boolean checked = false;

  /**
   * Constructs a new boolean presenter
   * @param name the name of the field to be used for markup parameters   
   * @param checkText the text to present if the component is set to true
   */
   public MustBoolPresenter(String name, String checkText) {
    this.name = name;
    this.checkText = checkText;
  }

  /**
   * Sets the component's tool tip text.
   * @param newToolTipText the component's tool tip text
   */
  public void setToolTipText(String newToolTipText) {
    this.toolTipText = newToolTipText;
  }

  /**
   * Sets the component's comment text which will be presented to the right of
   * the component.
   * @param comment the component's comment text
   */
  public void setComment(String comment) {
    this.comment = comment;
  }

  /**
   * Returns the tag sequence that's needed to show this object in the user
   * interface.
   * @return the tag sequence to show the component
   */
  public String getCreationTag() {
    String tag = "";
    if (checked) tag = checkText;
    /* if (toolTipText != null) {
      tag += " onMouseOver=\"window.status='" + toolTipText + "';return true\"";
    } */
    // tag += ">";
    return tag;
  }

  /**
   * Returns true if the component is set to true.
   * @return true if the component is set to true
   */
  public boolean getChecked() {
    return checked;
  }

  /**
   * Sets the component to the state as specified by checked.
   * @param checked the new components state
   */
  public void setChecked(boolean checked) {
    this.checked = checked;
  }

  /**
   * @see de.must.markup.Markupable#destroy()
   */
  public void destroy() {
  }

}
