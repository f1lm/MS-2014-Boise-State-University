/*
 * Copyright (c) 2001-2013 Christoph Mueller. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * THIS SOFTWARE IS PROVIDED BY CHRISTOPH MUELLER ``AS IS'' AND ANY
 * EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CHRISTOPH MUELLER OR
 * HIS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 */

package de.must.middle;

import de.must.dataobj.*;
import de.must.io.Logger;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.Locale;
import java.util.Properties;

import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.FloatControl;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.UnsupportedAudioFileException;


/**
 * Global objects of an application. E.g. a database connection may be the same
 * for multiple sessions. Thus, it is managed here. Use subclasses of GlobalStd
 * (e.g. named Global) to access these and individual globals as defined in
 * the subclass. Session specific attributes are stored in SessionData, which is
 * created by SessionStd or JspSessionStd.
 * respective JspSession.
 * @see de.must.markup.SessionData
 * @see de.must.markup.SessionStd
 * @see de.must.markup.JspSessionStd
 * @author Christoph Mueller
 */
public abstract class GlobalStd implements DataObjectConstructionDetails {
  
  public static boolean readOnly = false;
  public static Locale locale = Locale.getDefault();
  public static boolean suppressChangeLogToDB = false; // e.g. in case of database restore we won't synchronize 

  public static String getUserTempDir() {
    String userHome = System.getProperty("user.home");
    File userTemp = new File(userHome + File.separatorChar + "temp");
    if (userTemp.exists() && userTemp.isDirectory()) {
      return userTemp.getPath();
    } else {
      return userHome;
    }
  }
  
  public static String getBrowserPath() {
    return browserPath;
  }

  /** The specifications to connect to the essential or only database */
  public ConnectionSpecification connectionSpecification;

  /** The holder of the main connection, which may be the only connection or the session comprehensive connection */
  public ConnectionHolder mainConnectionHolder;

  /** The connection pool */
  public ConnectionPool connectionPool;

  /** The identity manager to get unique primary keys */
  public IdManager idManager;

  // stuff for servlet support:

  /**
   * The application's context path.
   * Can be accessed via request.getContextPath(), too. But sometimes we want
   * to know the context before a request occurred. E.g. we check exiting images
   * to present while constructing the DataPropertyPresentation.
   */
  public String contextPath;
  
  /**
   * Whether scroll divisions between header and buttons should be used. E.g.
   * Netscape 4 on Linux with used style sheets and input fields doesn't work.
   * This is a workaround feature. You may shut off scroll devision in the
   * constructor of Global:
   * <pre><code>
   * public Global() {
   *   useScrollDivision = false;
   * }
   * </code></pre>
   */
  public boolean useScrollDivision = true;
  
  /**
   * Whether passwords are to encrypt before they are stored into database.
   * Central configuration switch instead of switching individually:
   * - user administration
   * - login dialog
   * - password change dialog
   */
  public boolean encryptPasswords = false;

  public Logger mainLogger;
  
  public static String browserPath;
  public DecimalFormat twoDecimalFormat = (DecimalFormat)DecimalFormat.getInstance();

  /**
   * Constructs a new global objects container.
   */
  public GlobalStd() {
    this(null);
  }

  /**
   * Constructs a new global objects container.
   */
  public GlobalStd(String applicationName) {
    mainLogger = new Logger(applicationName);
    twoDecimalFormat.setMinimumFractionDigits(2);
    twoDecimalFormat.setMaximumFractionDigits(2);
  }
  
  public void playSound(String soundFileName) {
    playSound(soundFileName, 0);
  }
  
  public void playSound(String soundFileName, int decibelReducing) {
    AudioInputStream audioInputStream;
    try {
      if (soundFileName.indexOf(File.separator) == -1) {
        audioInputStream = AudioSystem.getAudioInputStream(new File(getSoundDirectory(), soundFileName));
      } else {
        audioInputStream = AudioSystem.getAudioInputStream(new File(soundFileName));
      }
      Clip clip = AudioSystem.getClip();
      clip.open(audioInputStream);
      if (decibelReducing != 0) ((FloatControl)clip.getControl(FloatControl.Type.MASTER_GAIN)).setValue(decibelReducing);
      clip.start();
    } catch (UnsupportedAudioFileException e) {
      Logger.getInstance().error(getClass(), e);
    } catch (IOException e) {
      Logger.getInstance().error(getClass(), e);
    } catch (LineUnavailableException e) {
      Logger.getInstance().error(getClass(), e);
    } catch (IllegalArgumentException e) { // happened once where sound interface wasn't available 
      Logger.getInstance().error(getClass(), e);
    } catch (Exception e) { // do not interrupt the process if any other problem occurs
      Logger.getInstance().error(getClass(), e);
    }
  }
  
  protected String getSoundDirectory() {
    return "./bin/";
  }

  protected Properties getProperties(String propertyFileName) {
    java.io.InputStream in;
    ClassLoader cl = getClass().getClassLoader();
    if (cl != null) {
      in = cl.getResourceAsStream(propertyFileName);
    } else {
      in = ClassLoader.getSystemResourceAsStream(propertyFileName);
    }
    if (in == null) {
      de.must.io.Logger.getInstance().info(getClass(), 
        "configuration file '" + propertyFileName + "' not found");
      return null;
    }
    try {
      Properties properties = new Properties();
      properties.load(in);
      return properties;
    } catch (Exception e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
      return null;
    } finally {
      // Always close the input stream
      if (in != null) {
        try {
          in.close();
        } catch (Exception e) {
          de.must.io.Logger.getInstance().error(getClass(), e);
        }
      }
    }
  }
  
  /**
   * Returns the directory for all users to write since May. 2010 there's no such property, yet.
   * @return the directory for all users to write
   */
  public File getAllUserDir() {
    File allUserDir;
    if (System.getProperty("os.name").toLowerCase().indexOf("linux")!= -1) {
      allUserDir = new File("/usr"); if (isOk(allUserDir)) return allUserDir;
      allUserDir = new File("/lib"); if (isOk(allUserDir)) return allUserDir;
      allUserDir = new File("/etc"); if (isOk(allUserDir)) return allUserDir;
    } else { // Windows
      // no, this is not 'All Users' allUserDir = new File("C:\\ProgramData"); if (isOk(allUserDir)) return allUserDir;
      // no, this is not 'All Users' allUserDir = new File("D:\\ProgramData"); if (isOk(allUserDir)) return allUserDir;
      File userDir = new File(System.getProperty("user.home"));
      File parent = userDir.getParentFile();
      if (parent == null) {
        return null;
      }
      allUserDir = new File(parent.getPath() + "\\Public"); if (isOk(allUserDir)) return allUserDir;
      allUserDir = new File(parent.getPath() + "\\All Users"); if (isOk(allUserDir)) return allUserDir;
      allUserDir = new File(parent.getPath() + "\\Alle"); if (isOk(allUserDir)) return allUserDir;
    }
    return null;
  }
  
  private boolean isOk(File dir) {
    if (dir != null) {
      Logger.getInstance().debug(getClass(), "Checking " + dir.getPath());
      if (dir.exists() && dir.isDirectory()) {
        if (dir.canWrite()) {
          return true;
        } else {
          Logger.getInstance().debug(getClass(), "Can't write " + dir.getPath());
        }
      }
    }
    return false;
  }

  public boolean isMainConnOracle() {
    try {
      return getMainConnection().getMetaData().getDatabaseProductName().indexOf("Oracle") > -1;
    } catch (SQLException e) {
      de.must.io.Logger.getInstance().error(getClass(), e);
      return false;
    }
  }
  
  /**
   * Returns true if framework persistence functionality is used.
   * @return true if framework persistence functionality is used
   */
  public boolean isFrameworkPersistenceFunctionalityUsed() {
    return (connectionSpecification != null);
  }

  /**
   * Invalidates the connection(s) that the have to be rebuild when needed next
   * time. Useful after database changes.
   */
  public void invalidateConnections() {
    de.must.io.Logger.getInstance().debug(getClass(), "invalidating connections");
    connectionSpecification = null;
    idManager = null;
    mainConnectionHolder = null;
  }

  /**
   * Creates the main connection or checks all connections.
   * Be sure you call this method after connection specifications have been made
   * available.
   * Use cases:
   * Case first use or use after specifications have been invalidated: actual
   * connection specifications are determined and everything is build new
   * Case reopen a controlled closed main connection: If the main database
   * connection was closed consciously by the application, it is reconnected
   * by using the same specifications as before.
   * Case check and reactivation of existing connections: To handle lost
   * database connections (e.g. happening once a day), all open connections are
   * checked and reactivated if broken.
   * @return whether or not the connection has been rebuild
   */
  public synchronized boolean createOrCheckConnections() {
    boolean rebuild = false;
    de.must.io.Logger.getInstance().debug(getClass(), "Checking global connection(s)");
    if (mainConnectionHolder == null) {
      de.must.io.Logger.getInstance().debug(getClass(), "main connection holder is null");
      if (connectionSpecification != null) { // if persistence is to be done by Cameleon OSP
        de.must.io.Logger.getInstance().debug(getClass(), "Connect with specs " + connectionSpecification);
        connectionPool = new ConnectionPool(connectionSpecification);
        de.must.io.Logger.getInstance().debug(getClass(), "getting new private connection from pool");
        try {
          mainConnectionHolder = connectionPool.getPrivateConnectionHolder();
          mainConnectionHolder.createConnection(connectionSpecification);
          idManager = new IdManager(mainConnectionHolder.getConnection());
        }
        catch(Exception e){
          de.must.io.Logger.getInstance().error(getClass(), e);
        }
      } else {
        de.must.io.Logger.getInstance().error(getClass(), "no connection specifications available while trying to connect to database");
      }
    } else {
      de.must.io.Logger.getInstance().debug(getClass(), "main connection holder connected? " + mainConnectionHolder.isConnected());
      if (mainConnectionHolder.isConnected()) {
        if (mainConnectionHolder.checkAndReactivateDbConnIfNecessary()) {
          idManager = new IdManager(mainConnectionHolder.getConnection());
          rebuildGlobalDataObjects();
          rebuild = true;
        } else if (anyOtherConnectionBrokenHint()) {
          try {
            mainConnectionHolder.createConnection(connectionSpecification);
            idManager = new IdManager(mainConnectionHolder.getConnection());
            rebuildGlobalDataObjects();
            rebuild = true;
          }
          catch(Exception e){
            de.must.io.Logger.getInstance().error(getClass(), e);
          }
        }
      } else {
        try {
          mainConnectionHolder.createConnection(connectionSpecification);
          idManager = new IdManager(mainConnectionHolder.getConnection());
        }
        catch(Exception e){
          de.must.io.Logger.getInstance().error(getClass(), e);
        }
      }
    }
    if (connectionPool != null) connectionPool.checkAndCleanUpPool();
    return rebuild;
  }
  
  /**
   * Any other reason connection is not usable any more? Override for special checks.
   * @return true if there is any other reason connection is not usable any more
   */
  protected boolean anyOtherConnectionBrokenHint() {
    return false;
  }
  
  /**
   * Rebuild global data objects. Called after broken connection has been recovered.
   * Override it to rebuild all objects based on the connection.
   */
  protected void rebuildGlobalDataObjects() {}

  /**
   * Returns the main connection.
   * @return the main connection
   */
  public Connection getMainConnection() {
    if (mainConnectionHolder == null) {
      Exception e = new Exception("No connection available. Maybe you forgot to set Global.connectionSpecification");
      de.must.io.Logger.getInstance().error(getClass(), e);
      return null;
    }
    return mainConnectionHolder.getConnection();
  }

  /**
   * Closes the main connection.
   */
  public void closeMainConnection() {
    mainConnectionHolder.closeConnection();
  }

  /**
   * Returns a private connection according to the main connection specifications.
   * @return a private connection according to the main connection specifications
   * @see #takeBackConnection
   */
  public java.sql.Connection getPrivateConnection() throws ConnectionPoolExhaustedException {
    ConnectionHolder connectionHolder = null;
    try {
      connectionHolder = connectionPool.getPrivateConnectionHolder();
      connectionHolder.createConnection();
    }
    catch(ConnectionPoolExhaustedException cpe){
      throw cpe;
    }
    catch(Exception e){
      de.must.io.Logger.getInstance().error(getClass(), e);
    }
    return connectionHolder.getConnection();
  }

  /**
   * Takes back a connection. To be done after a private connection is not
   * needed anymore.
   * @param connectionToGiveBack the connection to give back.
   * @see #getPrivateConnection
   */
  public void takeBackConnection(java.sql.Connection connectionToGiveBack) {
    connectionPool.takeBack(connectionToGiveBack);
  }

  /**
   * Returns the connection to use. Needed to fulfill the needs of DataObjectConstructionDetails.
   * @return the connection to use
   * @see DataObjectConstructionDetails
   */
  public Connection getConnection() {
    return getMainConnection();
  }

  /**
   * Returns the IdManager to use.
   * @return the IdManager to use
   */
  public IdManager getIdManager() {
    return idManager;
  }

  /**
   * Called by the garbage collector on an object when garbage collection
   * determines that there are no more references to the object.
   */
  protected void finalize() throws Throwable {
    if (connectionPool != null) {
      connectionPool.takeBack(mainConnectionHolder);
      connectionPool.closeAllConnections();
    }
    super.finalize();
  }

}
