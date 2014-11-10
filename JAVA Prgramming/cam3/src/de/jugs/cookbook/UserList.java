//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.markup.*;

/**
 * @author Christoph Mueller
 */
public final class UserList extends SimpleDataList {

  public UserList(SessionData sessionData) {
    super(sessionData);
    setTitle(sessionData.getResourceString("TEXT_ENQUIRY_RESULT"));
    setListDataObject(new DoUser(sessionData));
  }

  protected String getSelectionFields() {
    return "UserNi, UserId, UserState, LastName, FirstName";
  }

  protected String getOrderByFields() {
    return "LastName, FirstName";
  }

  public boolean isEditable() {
    // for let other users play and keep users consistent.
    try {
      if (listDataObject.getText("UserId").equals("admin")) return false;
    } catch(NullPointerException e) {} // if there is no user matching at all
    return super.isEditable();
  }

  public boolean isDeletable() {
    // for let other users play and keep users consistent.
    if (listDataObject.getText("UserId").equals("admin")) return false;
    return super.isDeletable();
  }

  public String getRowString() {
    return listDataObject.getText("FirstName") + " " + listDataObject.getText("LastName");
  }

  protected Class<? extends Invokable> getDataPresentationClass() {
    return UserPresentation.class;
  }

  protected Class<? extends Invokable> getDataAdministrationClass() {
    return UserAdministration.class;
  }

}
