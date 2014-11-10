/*
 * Copyright (c) 2001-2008 Christoph Mueller. All rights reserved.
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
 * Invokables are components to be invoked by SessionStd and put in stack to
 * control state maintaining and back functionality. Most of the invokables are
 * dialogs to be nested in order to support complex administration. They show
 * their face to the user via method <code>{@link #getTagSequence}</code>.
 * @author Christoph Mueller
 * @see SessionStd
 * @see Dialog
 */
public interface Invokable {

  /**
   * Initializes the invokable in order to reuse the component without garbage
   * from previous usage.
   */
  public void init();
  
  /**
   * Returns a Invokable class which is to be invoked before this Invokable can be shown.
   * Sample: if a function needs a login, this login is to be done in advance.
   * @return a Invokable class which is to be invoked before this Invokable can be shown
   */
  public Class<? extends Invokable> getInvokableInAdvance();

  /**
   * Called by SessionStd before the servlet response is written.
   * @see SessionStd
   */
  public void beforeOutput();

  /**
   * Called by SessionStd after the servlet response is written.
   * @see SessionStd
   */
  public void afterOutput();

  /**
   * Indicates whether the invokable accepts to be canceled. E.g. if properties
   * are edited and jumping to another function is requested by using a toolbar
   * option, this may be stopped here.
   * @return true if the invokable accepts to be canceled
   */
  public boolean isCancelable();

  /**
   * Indicates whether the request fits to this dialog.
   * Useful to stop the user to use any back functions of the browser. 
   * @param request the request to check
   * @return true if the request fits to this dialog
   */
  public boolean isSuitableDialog(GeneralizedRequest request);

  /**
   * Causes the invokable to delegate this function to all embedded markupables
   * to fetch their current value as edited by the user from the request.
   * @param request the request from where the values are to be fetched
   * @see Markupable#fetchYourValueFromRequest
   */
  public void fetchValuesFromRequest(GeneralizedRequest request);

  /**
   * Allows the invokable to react to the request. Sample: saving data when OK
   * button was pressed.
   * @param request the request to react to
   */
  public void process(GeneralizedRequest request);

  /**
   * Informs this invokable, from which previous invokable it is submitted.
   * Technique to establish a bilateral communication between invokables.
   * @param submitter the invokable that submitted this invokable
   */
  public void setSubmitter(Invokable submitter);

  /**
   * Informs the next invokable in stack about the submission details. E.g. a
   * PropertyAdminstration may call this method to receive the primary key of
   * the entry to be edited.
   * @return the submission details
   */
  public Submission getSubmission();

  /**
   * Returns the wished stack movement. E.g this if this invokable's work is
   * done it return -1 to return to the previous invokable in the stack.
   */
  public int getStackMovement();

  /**
   * Returns true if the invokable wants to be finalized after request is worked off.
   * Called by <code>{@link SessionStd}</code>
   * @return true if the invokable wants to be finalized
   */
  public boolean wantToBeFinalized();
  
  /**
   * Destroy this object in order to free resources and weak references more early than
   * garbage collector.
   */
  public void destroy();

}
