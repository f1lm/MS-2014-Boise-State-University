/*
 * Copyright (c) 1999-2010 Christoph Mueller. All rights reserved.
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

public class Back implements Invokable {

/**
 * @author Christoph Mueller
 */
  public Back() {
  }

  public Class<? extends Invokable> getInvokableInAdvance() {
    return null;
  }
  
  /**
   * Initializes the invokable in order to reuse the component without garbage
   * from the previous use.
   */
  public void init() {
    // as a matter of form
  }

  /**
   * Returns the default tag sequence (as HTML).
   * Normally you should not call this method directly.
   * Use Layout implementing classes instead.
   * @return the default tag sequence (as HTML)
   * @see Layout
   */
  public String getTagSequence() {
    // as a matter of form
    return null;
  }

  /* (non-Javadoc)
   * @see de.must.markup.Invokable#afterOutput()
   */
  public void afterOutput() {
	// as a matter of form
  }

  /* (non-Javadoc)
   * @see de.must.markup.Invokable#beforeOutput()
   */
  public void beforeOutput() {
    // as a matter of form
  }
  
  /**
   * Indicates whether the invokable accepts to be canceled. E.g. if properties
   * are edited and jumping to another function is requested by using a toolbar
   * option, this may be stopped here.
   * @return true if the invokable accepts to be canceled
   */
  public boolean isCancelable() {
	// as a matter of form
    return true;
  }

  /**
   * Indicates whether the request fits to this dialog.
   * Useful to stop the user to use any back functions of the browser.
   * @param request the request to check
   * @return true if the request fits to this dialog
   */
  public boolean isSuitableDialog(GeneralizedRequest request) {
	// as a matter of form
    return true;
  }

  /**
   * Causes the invokable to delegate this function to all embedded markupables
   * to fetch their current value as edited by the user from the request.
   * @param request the request from where the values are to be fetched
   * @see Markupable#fetchYourValueFromRequest
   */
  public void fetchValuesFromRequest(GeneralizedRequest request) {
	// as a matter of form
  }

  /**
   * Allows the invokable to react to the request. Sample: saving data when Ok
   * button was pressed.
   * @param request the requeset to react to
   */
  public void process(GeneralizedRequest request) {
	// as a matter of form
  }

  /**
   * Informs this invokable, from which previous invokable it is submitted.
   * Technique to establish a bilateral communication between invokables.
   * @param submitter the invokable that submitted this invokable
   */
  public void setSubmitter(Invokable submitter) {
	// as a matter of form
  }

  /**
   * Informs the next invokable in stack about the submission details. E.g. a
   * PropertyAdminstration may call this method to receive the primary key of
   * the entry to be edited.
   * @return the submission details
   */
  public Submission getSubmission() {
	// as a matter of form
    return null;
  }

  /**
   * Returns the wished stack movement. E.g this if this invokable's work is
   * done it return -1 to return to the previous invokable in the stack.
   */
  public int getStackMovement() {
	// as a matter of form
    return 0;
  }

  /**
   * Returns true if the invokable wants to be finalized after request is worked off.
   * @return true if the invokable wants to be finalized
   */
  public boolean wantToBeFinalized() {
	// as a matter of form
    return false;
  }

  @Override
  public void destroy() {
  }

}
