//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

import de.must.wuic.*;
import java.awt.*;

/**
 * @author Christoph Mueller
 */
public class FrUserSl extends SimpleDataListFrame {
  private DoUser doUser1 = new DoUser();
  private MustTextField tfUserBz;
  private MustTextField tfUserId;
  private static final int LIST_BY_USERID = 0;
  private static final int LIST_BY_USERBZ = 1;
  private int listMode = LIST_BY_USERID;

  public static void openMainInstance() {
    getOrCreateMainInstance().open();
  }
  
  public static FrUserSl getOrCreateMainInstance() {
    return (FrUserSl)getOrCreateMainInstance(FrUserSl.class);
  }

  public FrUserSl() {
    this(null);
  }

  public FrUserSl(Frame ParentFrame) {
    super(ParentFrame);
    this.setTitle("Benutzer des Marketing-Systems");

    newPanel("Allg.");
    tfUserId = createTextField("Benutzer-ID", 20);
    tfUserBz = createTextField("Name", 20);
    setAssociatedPropertyAdministration(FrUserPr.class);
    setListDataObject(doUser1);
    tfUserId.requestFocus();

    creationEnding();
  }

  public String getSelectionFields() {
    return "userni, userid, userbz";
  }

  public String getWhereCondition() {
    listMode = LIST_BY_USERID;
    return "userid like \'" + tfUserId.getText() + "%\'";
  }

  public String getOrderByFields() {
    switch (listMode) {
    case LIST_BY_USERID:
      return "userid";
    case LIST_BY_USERBZ:
      return "userbz";
    }
    return "";
  }

  public String getRowString() {
    switch (listMode) {
    case LIST_BY_USERBZ:
      return doUser1.getText("userbz");
    default:
      return doUser1.getText("userid");
    }
  }

}


