/*
 * Copyright (c) 2001-2004 Christoph Mueller. All rights reserved.
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
 * Default resource file for the package markup.
 * @author Christoph Mueller
 */
public class Res extends java.util.ListResourceBundle {
  static final Object[][] contents = new String[][]{
	{ "TEXT_NEW_ENTRY", "New Entry" },
	{ "TEXT_MODIFY_ENTRY", "Modify Entry" },
	{ "TEXT_COPY_ENTRY", "Copy Entry" },
	{ "TEXT_VIEW_ENTRY", "View Entry" },
	{ "TEXT_DELETE_ENTRY", "Delete Entry" },
	{ "TEXT_INPUT_NOT_ACCEPTED", "Input not accepted" },
	{ "TEXT_FORMALLY_INVALID", "Formally invalid" },
	{ "TEXT_INPUT_REQUIRED", "Input required" },
	{ "TEXT_LIST_BUTTON", "   List   " },
	{ "TEXT_OK_BUTTON", "     OK     " },
	{ "TEXT_CANCEL_BUTTON", "Cancel" },
	{ "TEXT_BACK_BUTTON", "Back" },
	{ "TEXT_HELP_BUTTON", "Help" },
	{ "TEXT_SEARCH_BUTTON", "Search" },
  { "TEXT_BROWSE", "Browse" },
	{ "TEXT_MODIFY", "Modify" },
	{ "TEXT_COPY", "Copy" },
	{ "TEXT_DELETE", "Delete" },
	{ "TEXT_CLOSE_BUTTON", "Close" },
	{ "TEXT_SIGNS_OFF_AND_CLOSES_THE_WINDOW", "Signs off and closes the window" },
	{ "TEXT_NONE", "none" },
	{ "TEXT_ANY", "any" },
	{ "TEXT_DESCRIPTION", "Description" },
	{ "TEXT_POS", "Pos" },
	{ "TEXT_ENTRY_IS_IN_USE", "Entry is in use" },
	{ "TEXT_GOOD_BYE", "Logout successful" },
  { "TEXT_SAVE_OR_CANCEL_YOUR_MODIFICATIONS", "Save or cancel your modifications" },
	{ "TEXT_NOT_LOGGED_IN_YET", "Not logged in yet" },
	{ "TEXT_OLD_PASSWORD_REQUIRED", "Old password required" },
	{ "TEXT_NEW_PASSWORD_REQUIRED", "New password required" },
	{ "TEXT_NEW_PASSWORDS_NOT_EQUAL", "New passwords aren't equal" },
  { "TEXT_TEXT_HELP_INDEX", "Help index" },
  { "TEXT_LOGIN", "Login" },
  { "TEXT_USER", "User" },
  { "TEXT_PASSWORD", "Password" },
  { "TEXT_PAGE_NOT_VALID", "Page is not valid anymore." },
  };

  /**
   * Returns the resource content
   * @return the resource content
   */
  public Object[][] getContents() {
    return contents;
  }

}
