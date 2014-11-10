package mkt;

import java.io.IOException;

import de.must.dataobj.*;
import de.must.io.*;

/**
 * @author Christoph Mueller
 */
public final class DbScriptCreator {

  public static void createScript() {
    // MySql version
    try {
      Protocol out = new Protocol("createDB.sql");
      out.addEntry("create database marketing;");
      out.addEntry("use marketing;");
      out.addEntry(MysqlDialect.getCreateStatement(DoIdent.tableName, DoIdent.attributes, DoIdent.indices) + ";");
      out.addEntry(MysqlDialect.getCreateStatement(DoUser.tableName, DoUser.attributes, DoUser.indices) + ";");
      out.addEntry(MysqlDialect.getCreateStatement(DoParam.tableName, DoParam.attributes, DoParam.indices) + ";");
      out.addEntry(MysqlDialect.getCreateStatement(DoKontakt.tableName, DoKontakt.attributes, DoKontakt.indices) + ";");
      out.addEntry(MysqlDialect.getCreateStatement(DoKontaktart.tableName, DoKontaktart.attributes, DoKontaktart.indices) + ";");
      out.addEntry(MysqlDialect.getCreateStatement(DoGrPj.tableName, DoGrPj.attributes, DoGrPj.indices) + ";");
      out.addEntry(MysqlDialect.getCreateStatement(DoGzPj.tableName, DoGzPj.attributes, DoGzPj.indices) + ";");

      out.addEntry("use mysql;");
      out.addEntry("-- remove what you think you don't need and modify what you need --");
      out.addEntry("insert into host (Host, Db, Select_priv, Insert_priv, Update_priv, Delete_priv, Create_priv, Drop_priv, Grant_priv, References_priv, Index_priv, Alter_priv) values ('localhost', 'marketing', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y');");
      out.addEntry("insert into host (Host, Db, Select_priv, Insert_priv, Update_priv, Delete_priv, Create_priv, Drop_priv, Grant_priv, References_priv, Index_priv, Alter_priv) values ('localhost.localdomain', 'marketing', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y');");
      out.addEntry("insert into db (Host, Db, User, Select_priv, Insert_priv, Update_priv, Delete_priv, Create_priv, Drop_priv, Grant_priv, References_priv, Index_priv, Alter_priv) values ('localhost', 'marketing', 'mktuser', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y');");
      out.addEntry("insert into db (Host, Db, User, Select_priv, Insert_priv, Update_priv, Delete_priv, Create_priv, Drop_priv, Grant_priv, References_priv, Index_priv, Alter_priv) values ('localhost.localdomain', 'marketing', 'mktuser', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y');");
      out.addEntry("insert into db (Host, Db, User, Select_priv, Insert_priv, Update_priv, Delete_priv, Create_priv, Drop_priv, Grant_priv, References_priv, Index_priv, Alter_priv) values ('%', 'marketing', 'mktuser', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y');");
      out.addEntry("insert into user (Host, User, Password, Select_priv, Insert_priv, Update_priv, Delete_priv, Create_priv, Drop_priv, Reload_priv, Shutdown_priv, Process_priv, File_priv, Grant_priv, References_priv, Index_priv, Alter_priv) values ('%', 'mktuser', password('mktpwd'), 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y');");
      out.addEntry("insert into user (Host, User, Password, Select_priv, Insert_priv, Update_priv, Delete_priv, Create_priv, Drop_priv, Reload_priv, Shutdown_priv, Process_priv, File_priv, Grant_priv, References_priv, Index_priv, Alter_priv) values ('localhost', 'mktuser', password('mktpwd'), 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y');");
      out.addEntry("insert into user (Host, User, Password, Select_priv, Insert_priv, Update_priv, Delete_priv, Create_priv, Drop_priv, Reload_priv, Shutdown_priv, Process_priv, File_priv, Grant_priv, References_priv, Index_priv, Alter_priv) values ('localhost.localdomain', 'mktuser', password('mktpwd'), 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y');");
      out.addEntry("-- don't forget mysqladmin reload! --");
      out.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public DbScriptCreator() {
  }

  static public void main(String[] args) {
    createScript();
  }

}