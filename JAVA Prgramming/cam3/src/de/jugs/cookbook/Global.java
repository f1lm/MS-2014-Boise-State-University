//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.middle.GlobalStd;
import de.must.dataobj.ConnectionSpecification;

//import java.io.InputStream;
//import java.util.Properties;
//import java.util.PropertyResourceBundle;

/**
 * Container for global objects. To be used for shared use of any objects.
 * This is session comprehensive. Sample: database connections or connections
 * pools may be stored here.
 * @author Christoph Mueller
 */
public class Global extends GlobalStd {

  private static Global instance;

  public final static Global getInstance() {
    if (instance == null) {
      instance = new Global();
    }
    return instance;
  }
  
  public Global() {
//    if (System.getProperty("user.name").equals("Christoph Müller")) {
//      connectionSpecification = new ConnectionSpecification(
//        "jdbc:mysql://192.168.1.36/cookbook", "org.gjt.mm.mysql.Driver", "cook", "pwd1"
//         // "cookbook", "cook", "pwd1"
//        );
//    } else {
//      connectionSpecification = new ConnectionSpecification(
//        "jdbc:mysql://localhost/cookbook", "org.gjt.mm.mysql.Driver", "cook", "pwd1"
//      );
//    }
    if (System.getProperty("os.name").toLowerCase().indexOf("linux")!= -1) {
      connectionSpecification = new ConnectionSpecification(
          "jdbc:mysql://localhost/cookbook", "org.gjt.mm.mysql.Driver", "cook", "pwd1"
        );
    } else {
      connectionSpecification = new ConnectionSpecification("Cookbook");
      encryptPasswords = false;
    }
  }

}
