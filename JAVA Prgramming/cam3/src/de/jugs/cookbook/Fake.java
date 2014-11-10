package de.jugs.cookbook;

import java.io.IOException;

import de.must.markup.*;
import de.must.io.HtmlFile;
import de.must.util.Browser;

/**
 * Fake stuff.
 * For simulating things without any connection to a server.
 * @author Christoph Mueller
 */
public class Fake {

  public static void main(String[] args) {
    Global.getInstance().createOrCheckConnections();
    //  -----------=
    int testCase = 4;
    //  -----------=
    switch (testCase) {
      case 1: simulateUserAdministration(); break;
      case 3: simulateMenu(); break;
    }
    Global.getInstance().closeMainConnection();
  }

  public static void simulateUserAdministration() {
    HtmlFile htmlFile1;
    UserAdministration test = new UserAdministration(getFakedSessionData());
    test.loadValues(6);
    String fileName = "Simulation";
    try {
      htmlFile1 = new HtmlFile(fileName, "Simulation", "Cookbook");
      htmlFile1.outputHeader();
      htmlFile1.writeln(test.getTagSequence());
      htmlFile1.outputFooter();
      htmlFile1.close();
      String codeBase = System.getProperty("user.dir");
      Browser.visitURL("file://" + codeBase + "/" + fileName + ".html");
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public static void simulateMenu() {
    HtmlFile htmlFile1;
    HostLayout layout = new HostLayout();
    String fileName = "Simulation";
    try {
      htmlFile1 = new HtmlFile(fileName, "Simulation", "Cookbook");
      htmlFile1.outputHeader();
      htmlFile1.writelnNonConverted(layout.getStaticScriptReferences());
      // htmlFile1.writelnNonConverted(layout.getJavaScriptMenuBarTagSequence(test, sessionData));
      htmlFile1.outputFooter();
      htmlFile1.close();
      String codeBase = System.getProperty("user.dir");
      Browser.visitURL("file://" + codeBase + "/" + fileName + ".html");
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public static SessionData getFakedSessionData() {
    SessionData fakeSessionData = new SessionData();
    fakeSessionData.actionForPost = "fakePost";
    fakeSessionData.applicationTitle = "Fake title";
    fakeSessionData.setResourceBundle(new de.jugs.cookbook.Res());
    fakeSessionData.locale = new java.util.Locale("en", "US");
    fakeSessionData.sessionId = "0815";
    return fakeSessionData;
  }

}
