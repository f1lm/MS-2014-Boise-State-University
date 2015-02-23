//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.markup.*;

/**
 * @author Christoph Mueller
 */
public final class UserPresentation extends DataPropertyPresentation {

  private DataTextPresenter Quelle;

  public UserPresentation(SessionData sessionData) {
    super(new DoUser(sessionData), sessionData);
    createTextPresenter("User ID", "UserId");
    createReferencePresenter("User group", "GroupId", Constants.USER_GROUP);
    createReferencePresenter("User state", "UserState", Constants.USER_STATES);
    createDatePresenter("Register date", "RegistDate");
    createTextPresenter("Company", "Company");
    createTextPresenter("Address addition 1", "AddrAdd1");
    createTextPresenter("Address addition 2", "AddrAdd2");
    createTextPresenter("Name, Vorname", "LastName");
    createTextPresenter("FirstName");
    createTextPresenter("Academic title", "AcadTitle");
    createReferencePresenter("Sex", "SexId", Constants.SEX);
    createTextPresenter("Handy phone Number", "HandyNbr");
    createTextPresenter("Remark", "Remark");
    createTextPresenter("Phone number", "PhoneNbr");
    createTextPresenter("Fax number", "FaxNbr");
    createTextPresenter("Private phone number", "PhonePriv");
    createTextPresenter("Private fax number", "FaxPriv");
    createTextPresenter("URL", "URL");
    createTextPresenter("e-mail address", "email");
    createTextPresenter("Country ID", "CountryId");
    createTextPresenter("Country name", "Country");
    createTextPresenter("State name", "State");
    createTextPresenter("Zip code", "ZipCode");
    createTextPresenter("Zip code at PO box", "BoxZip");
    createTextPresenter("City", "City");
    createTextPresenter("PO box", "PoBox");
    createTextPresenter("Street", "Street");
    createTextPresenter("Notes", "Notes");
  }

}