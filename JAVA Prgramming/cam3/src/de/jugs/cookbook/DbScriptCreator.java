//elementary!

/*
 * Public Domain Sample Code 
 */

package de.jugs.cookbook;

import de.must.dataobj.*;
import de.must.io.*;

/**
 * Script creator to setup the cookbook database in MySQL.
 * Call it to get createDB.sql, adapt it to your needs, and run it by calling
 * mysql < createDB.sql on the server
 * @see TableCreator
 * @author Christoph Mueller
 */
public final class DbScriptCreator extends DbScriptCreatorStd {

  protected String getDatabaseName() {
    return "cookbook";
  }

  protected EntityInfo[] getAllEntityInfos() {
    return new EntityInfo[] {
      new DoIdent(null),
      new DoUser(null),
      new DoCookbook(null),
      new DoType(null),
    };
  }

  protected void outputIndividualStatements(Protocol out) {
    out.addEntry("insert into User (UserNi, UserId, Password, GroupId, LastName, FirstName) values (1, 'admin', 'admin', '9', 'Armdran', 'Armin');");
    out.addEntry("insert into User (UserNi, UserId, Password, GroupId, LastName, FirstName) values (2, 'org', 'org', '5', 'Organ', 'Olga');");
    out.addEntry("insert into User (UserNi, UserId, Password, GroupId, LastName, FirstName) values (3, 'standard', 'standard', '2', 'Stanford', 'Stanley');");
    out.addEntry("insert into Identity (Entity, IdentNr) values ('User', 3);");
    out.addEntry("use mysql;");
    out.addEntry("insert into db (Host, Db, User, Select_priv, Insert_priv, Update_priv, Delete_priv, Create_priv, Drop_priv, Grant_priv, References_priv, Index_priv, Alter_priv) values ('%', 'cookbook', '', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y');");
    out.addEntry("insert into user (Host, User, Password, Select_priv, Insert_priv, Update_priv, Delete_priv) values ('localhost','cook',password('pwd1'),'Y','Y','Y','Y');");
    out.addEntry("insert into user (Host, User, Password, Select_priv, Insert_priv, Update_priv, Delete_priv) values ('localhost.localdomain','cook',password('pwd1'),'Y','Y','Y','Y');");
  }

  static public void main(String[] args) {
    new DbScriptCreator();
  }

}
