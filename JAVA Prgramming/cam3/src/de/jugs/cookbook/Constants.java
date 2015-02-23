//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

/**
 * @author Christoph Mueller
 */
public final class Constants {

  public static final String ACTION_FOR_POST = "main";
  public static final String IMAGE_DIRECTORY = "../images";
  public static final String SAMPLE_IMAGE_DIRECTORY = "images/sample";
  public static final String BASIC_TITLE = "Kochbuch";
  public static final String FOOTER = "<font size=-2><hr WIDTH=\"100%\">Powered by <a href=\"http://www.must.de/cameleon.html\" TARGET=\"__blank\">Cameleon OSP</a> by <a href=\"http://www.must.de\" TARGET=\"__blank\">M&Uuml;LLER UND STEIN software</a></font>";
  public static final String START_JSP_NAME = "start.jsp";

  public static final int SUBJECT_AREA_ADMINISTRATION = 789;

  public static final String[][] USER_GROUP = {
    {" ", "< keine Angabe >"},
    {"1", "Guest"},
    {"2", "Standard user"},
    {"5", "Organizer"},
    {"9", "Admin"},
  };

  public static final String[][] USER_STATES = {
    {" ", "< keine Angabe >"},
    {"1", "pending"},
    {"5", "active"},
    {"9", "banned"},
  };

  public static final String[][] SEX = {
    {" ", "?"},
    {"M", "männlich"},
    {"W", "weiblich"},
  };

}
