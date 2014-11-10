//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.markup.*;

/**
 * @author Christoph Mueller
 */
public final class UserEnquiry extends Enquiry {

  private MustTextField lastName;
  private MustTextField firstName;

  public UserEnquiry() {
    this(null);
  }

  public UserEnquiry(SessionData sessionData) {
    super(sessionData);
    setTitle(sessionData.getResourceString("TEXT_USER_ENQUIRY"));
    lastName = createTextField(sessionData.getResourceString( "TEXT_LAST_NAME"), 40);
    firstName = createTextField(sessionData.getResourceString("TEXT_FIRST_NAME"), 40);
  }

  public Class<? extends Invokable> getDataListClass() {
    return UserList.class;
  }

  protected String getWhereCondition() {
    String whereCondition = "";
    if (!lastName.getText().equals("")) {
      if (!whereCondition.equals("")) whereCondition += " and ";
      whereCondition += "LastName like '%" + lastName.getText() + "%'";
    }
    if (!firstName.getText().equals("")) {
      if (!whereCondition.equals("")) whereCondition += " and ";
      whereCondition += "FirstName like '%" + firstName.getText() + "%'";
    }
    return whereCondition;
  }

}
