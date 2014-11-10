//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.markup.*;

/**
 * @author Christoph Mueller
 */
public final class UserAdministration extends DataPropertyAdministration {

  public static final int subjectArea = Entitlement.AREA_GLOBAL_ADMINISTRATION;

  private DataTextField lastName;

  public UserAdministration(SessionData sessionData) {
    super(new DoUser(sessionData), sessionData);
    setHelpContext("Operate", "newgrp");

    setTabSize(3);

    // newPanel("Basisdaten", 13, "Name, Gruppe + Adresse");
    newPanel(new TabImage(Constants.IMAGE_DIRECTORY + "/basisdaten_aktiv.gif", Constants.IMAGE_DIRECTORY + "/basisdaten_inaktiv.gif"), 13, "Name, Gruppe + Adresse");
    createTextField("User ID", "UserId");
    createPasswordField("User Password", "Password");
    // createTextField("User group ID", "GroupId");
    createChoice("User group", Constants.USER_GROUP, "GroupId");
    // createTextField("User state", "UserState");
    createChoice("User state", Constants.USER_STATES, "UserState");

    createTextField("Company", "Company");
    createTextField("Zusatzzeile 1", "AddrAdd1");
    createTextField("Zusatzzeile 2", "AddrAdd2");
    createTextField("Name, Vorname", "LastName");
    createTextField("FirstName");
    createTextCheck("Geschlecht / Grad", "SexId", new String[] {" ", "M", "W"}, new String[] {"?", "männlich", "weiblich"});
    createTextField("AcadTitle"); setToolTipText("z. B. Dr. oder Prof.");

    // sessionData.locale.getCountry() ...
    createTextField("Strasse", "Street");
    createTextField("Land/PLZ/Ort", "CountryId");
    createTextField("ZipCode");
    createTextField("City");
    createTextField("State", "State");
    createTextField("PLZ/Postfach", "BoxZip");
    createTextField("PoBox");

    // newPanel("URL / e-mail / Fon / Fax", 8);
    newPanel(new TabImage(Constants.IMAGE_DIRECTORY + "/url_aktiv.gif", Constants.IMAGE_DIRECTORY + "/url_inaktiv.gif"), 8);
    createTextField("URL", "URL");
    createTextField("e-mail", "email");
    createTextField("Telefon", "PhoneNbr");
    createTextField("Fax", "FaxNbr");
    createTextField("Mobiltelefon", "HandyNbr");
    createTextField("Fon privat", "PhonePriv");
    createTextField("Fax privat", "FaxPriv");

    // newPanel("Sonstiges", 8);
    newPanel(new TabImage(Constants.IMAGE_DIRECTORY + "/sonstiges_aktiv.gif", Constants.IMAGE_DIRECTORY + "/sonstiges_inaktiv.gif"), 8);
    createTextField("Bemerkung", "Remark");

    createTextArea("Notizen", "Notes");
    createDateField("Registrierung am", "RegistDate");

    setFrameUpdateTitleField(lastName);
    setFrameTitleNew(sessionData.getResourceString("TEXT_NEW_USER"));
    creationEnding();
  }

}
