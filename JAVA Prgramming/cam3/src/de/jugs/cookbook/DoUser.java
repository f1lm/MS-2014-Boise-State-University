//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.dataobj.*;

/**
 * @author Christoph Mueller
 */
public final class DoUser extends DataObject {

  public static final String tableName = "User";

  public static final AbstractAttribute internalUserNbr = new NumericAttribute("Internal user number", "UserNi");
  public static final AbstractAttribute userId = new CharAttribute("User ID", "UserId", 20);
  public static final AbstractAttribute userPassword = new CharAttribute("User password", "Password", 20);
  public static final AbstractAttribute userGroup = new CharAttribute("User group ID", "GroupId", 1);
  public static final AbstractAttribute userState = new CharAttribute("User state", "UserState", 1);
  public static final AbstractAttribute registerDate = new DateAttribute("Register date", "RegistDate");

  public static final AbstractAttribute[] attributes = {
    internalUserNbr,
    userId,
    userPassword,
    userGroup,
    userState,
    registerDate,
    new VarcharAttribute("Company", "Company", 60),
    new VarcharAttribute("Address addition 1", "AddrAdd1", 40),
    new VarcharAttribute("Address addition 2", "AddrAdd2", 40),
    new VarcharAttribute("Last name", "LastName", 30),
    new VarcharAttribute("First name", "FirstName", 30),
    new VarcharAttribute("Academic title", "AcadTitle", 20),
    new CharAttribute("Sex, ID", "SexId", 1),
    new VarcharAttribute("Handy phone Number", "HandyNbr", 20),
    new VarcharAttribute("Remark", "Remark", 220),
    new VarcharAttribute("Phone number", "PhoneNbr", 20),
    new VarcharAttribute("Fax number", "FaxNbr", 20),
    new VarcharAttribute("Private phone number", "PhonePriv", 20),
    new VarcharAttribute("Private fax number", "FaxPriv", 20),
    new VarcharAttribute("URL", "URL", 120),
    new VarcharAttribute("e-mail address", "email", 120),
    new CharAttribute("Country ID", "CountryId", 3),
    new VarcharAttribute("Country name", "Country", 30),
    new VarcharAttribute("State name", "State", 30),
    new VarcharAttribute("Zip code", "ZipCode", 5),
    new VarcharAttribute("Zip code at PO box", "BoxZip", 5),
    new VarcharAttribute("City", "City", 45),
    new VarcharAttribute("PO box", "PoBox", 10),
    new VarcharAttribute("Street", "Street", 60),
    new VarcharAttribute("Notes", "Notes", 6000),
  };

  public static final Index[] indices = {
    new Index (
      new IndexItem[] {
        new IndexItem(internalUserNbr.getFieldName(), IndexItem.ASCENDING),
      },
      Index.UNIQUE
    ),
    new Index (
      new IndexItem[] {
        new IndexItem("LastName", IndexItem.ASCENDING),
        new IndexItem("FirstName", IndexItem.ASCENDING),
      },
      Index.DUPLICATES
    ),
  };

  public DoUser(DataObjectConstructionDetails dataObjectConstructionDetails) {
    super(dataObjectConstructionDetails);
  }

  public String getTableName() {
    return tableName;
  }

  public AbstractAttribute[] getAttributes() {
    return attributes;
  }

  public Index[] getIndices() {
    return indices;
  }

}
