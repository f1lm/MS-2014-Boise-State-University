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
 * Resource file for the package markup for german locales.
 * @author Christoph Mueller
 */
public class Res_de_DE extends java.util.ListResourceBundle {
  static final Object[][] contents = new String[][]{
	{ "TEXT_NEW_ENTRY", "Neuer Eintrag" },
	{ "TEXT_MODIFY_ENTRY", "Eintrag bearbeiten" },
	{ "TEXT_COPY_ENTRY", "Eintrag kopieren" },
	{ "TEXT_VIEW_ENTRY", "Eintrag einsehen" },
	{ "TEXT_DELETE_ENTRY", "Eintrag löschen" },
	{ "TEXT_INPUT_NOT_ACCEPTED", "Eingabe nicht akzeptiert" },
	{ "TEXT_FORMALLY_INVALID", "Formal ungültig" },
	{ "TEXT_INPUT_REQUIRED", "Angabe erforderlich" },
	{ "TEXT_LIST_BUTTON", "Auflisten" },
	{ "TEXT_OK_BUTTON", "     OK     " },
	{ "TEXT_CANCEL_BUTTON", "Abbrechen" },
	{ "TEXT_BACK_BUTTON", "Zurück" },
	{ "TEXT_HELP_BUTTON", "Hilfe" },
	{ "TEXT_SEARCH_BUTTON", "Suche" },
  { "TEXT_BROWSE", "Details" },
	{ "TEXT_MODIFY", "Bearbeiten" },
	{ "TEXT_COPY", "Kopieren" },
	{ "TEXT_DELETE", "Löschen" },
	{ "TEXT_CLOSE_BUTTON", "Schließen" },
	{ "TEXT_SIGNS_OFF_AND_CLOSES_THE_WINDOW", "Abmelden und Fenster schließen" },
	{ "TEXT_NONE", "ohne" },
	{ "TEXT_ANY", "alle" },
	{ "TEXT_DESCRIPTION", "Beschreibung" },
	{ "TEXT_POS", "Pos" },
	{ "TEXT_ENTRY_IS_IN_USE", "Eintrag wird benutzt" },
	{ "TEXT_GOOD_BYE", "Abmeldung erfolgreich" },
  { "TEXT_SAVE_OR_CANCEL_YOUR_MODIFICATIONS", "Sichern Sie Ihre Änderungen oder verwerfen Sie durch Button Abrrechen" },
	{ "TEXT_NOT_LOGGED_IN_YET", "Noch nicht eingelogged" },
	{ "TEXT_OLD_PASSWORD_REQUIRED", "Altes Passwort erforderlich" },
	{ "TEXT_NEW_PASSWORD_REQUIRED", "Neues Passwort erforderlich" },
	{ "TEXT_NEW_PASSWORDS_NOT_EQUAL", "Neue Passwörter sind nicht gleich" },
  { "TEXT_TEXT_HELP_INDEX", "Help Index" },
  { "TEXT_LOGIN", "Login" },
  { "TEXT_USER", "Benutzer" },
  { "TEXT_PASSWORD", "Passwort" },
  { "TEXT_PAGE_NOT_VALID", "Diese Seite ist nicht mehr gültig." },
  };

  /**
   * Returns the resource content
   * @return the resource content
   */
  public Object[][] getContents() {
    return contents;
  }

}
