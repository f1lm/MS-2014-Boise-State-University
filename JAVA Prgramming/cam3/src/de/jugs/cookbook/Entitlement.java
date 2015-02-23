//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.markup.*;

/**
 * Entitlement manager.
 * <br> To guarantee each user may only do the things he is allowed to,
 * Cameleon OSP provides a 3 step entitlement regulation:
 * <br> 1.	Each functionallity of your application may be assigned to subject
 *          area. Done via implementing public static final int subjectArea.
 *          This variable is determined by using reflection.
 * <br> 2.	One the other side, each user may be assigned to a user group.
 *          This is done by editing the table user.
 * <br> 3.	In this class, the Framework is going to ask you, whether the
 *          logged in user is allowed to do something. Instead of answering
 *          yes or no, we answer the level to be done. Sample. Subject area XY
 *          may be viewed by the current user, but not edited.
 * @author Christoph Mueller
 */
public final class Entitlement extends EntitlementStd {

  private static final boolean verbose = false;

  public static final int AREA_COOKBOOK_GENERAL = 10;
  public static final int AREA_COOKBOOK_ORGANIZATION = 15;
  // public static final int AREA_SECTION2_GENERAL = 20;
  // public static final int AREA_SECTION2_ORGANIZATION = 25;
  // public static final int AREA_SECTION3_GENERAL = 30;
  // public static final int AREA_SECTION3_ORGANIZATION = 35;
  public static final int AREA_GLOBAL_ADMINISTRATION = 99;

  public Entitlement(SessionData sessionData) {
    super(sessionData);
  }

  /**
   * Returns what the logged in user may do in this context. This is
   * represented by the returned level.
   * Prefered way to regulate entitlement. This is a sample of the paradigm as
   * mentioned in class Main: The framework tells you, it's going to offer
   * functionallity to the user, which is part of a certain subject area. It
   * wants to know from you, whether you want to allow this user to access it.
   * And if so, whether he may view or modify it.
   * The way you implement this check is totally liberal. E.g. you may call LDAP
   * from here, if you like.
   * @param subjectArea the subject area of the context
   * @return the level - e.g. may be viewed only
   */
  public int getLevel(int subjectArea) {
    if (subjectArea >= 90) {
      if (sessionData.loggedInUser == null) return LEVEL_NOTHING;
      if (sessionData.loggedInUser.getUserGroup() == null) return LEVEL_NOTHING;
      if (!sessionData.loggedInUser.getUserGroup().equals("9")) return LEVEL_NOTHING;
    }
    String userGroup;
    if (sessionData.loggedInUser == null || (userGroup = sessionData.loggedInUser.getUserGroup()) == null) userGroup = "0";

    if (subjectArea == Entitlement.AREA_COOKBOOK_ORGANIZATION) {
      if (userGroup.equals("9")) return LEVEL_ALL;
      if (userGroup.equals("5")) return LEVEL_DELETE;
      if (userGroup.equals("2")) return LEVEL_VIEW;
      if (userGroup.equals("1")) return LEVEL_VIEW;
      return LEVEL_NOTHING;
    }

    if (userGroup.equals("9")) return LEVEL_ALL;
    if (userGroup.equals("5")) return LEVEL_DELETE;
    if (userGroup.equals("2")) return LEVEL_ADD;
    if (userGroup.equals("1")) return LEVEL_VIEW;

    return LEVEL_VIEW;
  }

}
