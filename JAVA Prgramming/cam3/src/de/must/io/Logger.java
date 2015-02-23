/*
 * Copyright (c) 2003-2013 Christoph Mueller. All rights reserved.
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
package de.must.io;

import java.io.*;
import java.util.Date;
import java.util.Iterator;
import java.util.Vector;

//import org.apache.log4j.*;

/**
 * Logger - an adapter to any logger you wish, e.g. log4j.
 * Why don't we use log4j directly? In some cases it might be pretty oversized 
 * if we have to deploy all stuff needed by log4j. With this adapter class
 * we may activate log4j or other logging tools without touching the entire
 * application.
 * Sample line of debug definition text file: de user=someone
 * @author Christoph Mueller
 */
public class Logger {
  
  public interface Watcher {
    public void inform(String line);
  }
  
  private static final boolean DEBUG_OF_DEBUG = false;
  private static boolean forcedDebug = false;
  private static Logger instance;
  private static Vector<String> debug;
  
//  static {
//    setDebugFilePath("debug.txt"); // standard debug specifications
//  }
  
  /**
   * Returns the logging type
   * @return the logging type
   * @see #LOGGING_TYPE_SIMPLE
   * @see #LOGGING_TYPE_LOG4J
   */
  public static int getLoggingType() {
    return loggingType;
  }

  /**
   * Sets the logging type
   * @param newLoggingType the logging type
   * @see #LOGGING_TYPE_SIMPLE
   * @see #LOGGING_TYPE_LOG4J
   */
  public static void setLoggingType(int newLoggingType) {
    loggingType = newLoggingType;
  }

  public static void setDebugFilePath(String debugFilePath) {
    String line;
      try {
        BufferedReader br = new BufferedReader(new FileReader(debugFilePath));
        debug = new Vector<String>();
        while ((line = br.readLine()) != null) {
          int index;
          if ((index = line.toLowerCase().indexOf("user=")) != -1) {
            String user = line.substring(index+5);
            if (user.equals(System.getProperty("user.name"))) {
              debug.add(line.substring(0, index).trim());
            }
          } else {
            debug.add(line);
          }
        }
        br.close();
        if (debug.size() == 0) debug = null; // more performance
      } catch (FileNotFoundException e) {
        // this is OK - it just means operator doesn't want debug information at all
      } catch (IOException e) {
        e.printStackTrace();
      }
  }

  /**
   * Causes output to log file as specified (LOGGING_TYPE_SIMPLE).
   * @param loggingFilePath the path to the log file to use
   */
  public static void setLoggingFilePath(String loggingFilePath, String initialInfo) {
    setLoggingFilePath(loggingFilePath, false, initialInfo);
  }

  /**
   * Causes output to log file as specified (LOGGING_TYPE_SIMPLE).
	 * @param loggingFilePath the path to the log file to use
   * @param append if <code>true</code>, then bytes will be written to the end of the file rather than the beginning
	 */
	public static void setLoggingFilePath(String loggingFilePath, boolean append, String initialInfo) {
	  getInstance().openOutput(loggingFilePath, append, initialInfo);
  }
	
	/**
	 * Forces application to debug in any case, no matter if there are debug file entries or not.
	 */
	public static void forceDebug() {
	  forcedDebug = true;
	}
  
  /**
   * Returns the default instance of the Logger.
	 * @return the default instance of the Logger
	 */
	public final static Logger getInstance() {
    if (instance == null) {
      instance = new Logger();
    }
    return instance;
  }

  public static final int LOGGING_TYPE_SIMPLE = 0;
  public static final int LOGGING_TYPE_LOG4J = 1;
  private static int loggingType = LOGGING_TYPE_SIMPLE;
//  private Category instanceLog4jLogger;
  private String instanceLoggerName;
  private Watcher watcher;
  private Vector<String> additionalOutBuffer;
  private PrintStream loggingFileStream;

  /**
   * Constructs a default logger.
    */
  public Logger() {
    this((String)null);
  }
  
  /**
   * Constructs a logger with the name of the specified class.
   * @param userClass the class that uses the logger
   */
  public Logger(Class<?> userClass) {
    this(userClass.getName());
  }
  
  /**
   * Constructs a logger with the name as specified.
	 * @param loggerName the name of the logger
	 */
	public Logger(String loggerName) {
    if (loggerName != null) instanceLoggerName = loggerName;
    instanceLoggerName = "default";
  }
	
	private void openOutput(String loggingFilePath, boolean append, String initialInfo) {
    try {
      FileOutputStream fos = new FileOutputStream(loggingFilePath, append);
      loggingFileStream = new PrintStream(fos);
      if (System.getProperty("user.dir").indexOf("workspace") == -1
       // no use: || System.getProperty("user.dir").indexOf("Tomcat") == -1
      ) {
        // production, not development:
        // no, we have duplicate entries this way: System.setOut(loggingFileStream);
        System.setErr(loggingFileStream); // runtime exceptions
      }
      loggingFileStream.println(initialInfo + " " + new Date());
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    }
	  
	}
  
  public void setWatcher(Watcher watcher) {
    this.watcher = watcher;
  }

  /**
   * Sets an additional out buffer for individual presentation issues.
   * @param additionalOutBuffer the additional out buffer to be informed.
   */
  public void setAdditionalOutBuffer(Vector<String> additionalOutBuffer) {
    this.additionalOutBuffer = additionalOutBuffer;
  }

  /**
   * Logs a message as information.
   * @param object the message (text) to log
   */
  public synchronized void info(Object object) {
    info(null, object);
  }

  /**
   * Logs a message as information.
   * @param sender the message sending class
   * @param object the message (text) to log
   */
  public synchronized void info(Class<?> sender, Object object) {
    switch (loggingType) {
      case LOGGING_TYPE_LOG4J:
//      if (isSpecialLoggerToUse(sender)) {
//        org.apache.log4j.Category specialLogger = org.apache.log4j.Category.getInstance(sender);
//        specialLogger.info(object);
//      } else {
//        getInstanceLog4jLogger().info(object);
//      }
      break;
      default:
      String message = null;
      if (object != null) message = object.toString();
      else message = "???";
      if (sender != null) message += " (Info from " + sender.getName() + " at " + getCurrTime() + ")";
      else message += " (" + getCurrTime() + ")";
      output(message);
      break;
    }
  }

  /**
   * Logs a message as a warning.
   * @param object the message (text) to log
   * @param throwable the exception to log
   */
  public synchronized void warn(Object object) {
    warn(null, object);
  }

  /**
   * Logs a message as warning.
   * @param sender the message sending class
   * @param object the message (text) to log
   */
  public synchronized void warn(Class<?> sender, Object object) {
    switch (loggingType) {
      case LOGGING_TYPE_LOG4J:
//    if (isSpecialLoggerToUse(sender)) {
//      org.apache.log4j.Category specialLogger = org.apache.log4j.Category.getInstance(sender);
//      specialLogger.warn(object);
//    } else {
//      getInstanceLog4jLogger().warn(object);
//    }
      break;
      default:
      String message = object.toString();
      if (sender != null) message += " (Error from " + sender.getName() + " at " + getCurrTime() + ")";
      output(message);
      (new Exception("Forced stack trace:")).printStackTrace();
      break;
    }
  }

  /**
   * Logs a message as an error.
   * @param object the message (text) to log
   */
  public synchronized void error(Object object) {
    error(null, object);
  }

  /**
   * Logs an exception as an error.
   * @param throwable the exception to log
   */
  public synchronized void error(Throwable throwable) {
    error(null, throwable);
  }

  /**
   * Logs an exception as an error.
   * @param sender the message sending class
   * @param throwable the exception to log
   */
  public synchronized void error(Class<?> sender, Throwable throwable) {
    String message = null;
    if (throwable != null) {
      message = throwable.getMessage();
    }
    if (message == null) message = "no message";
    error(sender, message, throwable);
  }

  /**
   * Logs a message as an error.
   * @param object the message (text) to log
   * @param throwable the exception to log
   */
  public synchronized void error(Object object, Throwable throwable) {
    error(null, object, throwable);
  }

  /**
   * Logs a message as an error.
   * @param sender the message sending class
   * @param object the message (text) to log
   */
  public synchronized void error(Class<?> sender, Object object) {
    error(sender, object, null);
  }

  /**
   * Logs a message as an error.
	 * @param sender the message sending class
	 * @param object the message (text) to log
	 * @param throwable the exception to log
	 */
	public synchronized void error(Class<?> sender, Object object, Throwable throwable) {
    switch (loggingType) {
      case LOGGING_TYPE_LOG4J:
//      if (isSpecialLoggerToUse(sender)) {
//        org.apache.log4j.Category specialLogger = org.apache.log4j.Category.getInstance(sender);
//        specialLogger.error(object);
//      } else {
//        getInstanceLog4jLogger().error(object, throwable);
//      }
      break;
      default:
      String message = object.toString();
      if (sender != null) message += " (Error from " + sender.getName() + " at " + getCurrTime() + ")";
      output(message);
      if (throwable != null) {
        if (loggingFileStream != null) throwable.printStackTrace(loggingFileStream);
        throwable.printStackTrace(System.err);
      }
      break;
    }
  }

  /**
   * Logs a message as a debug information.
   * @param sender the message sending class
   * @param object the message (text) to log
   */
  public synchronized void debug(Class<?> sender, Object object) {
    switch (loggingType) {
      case LOGGING_TYPE_LOG4J:
      boolean ignoreDebug = false; // to have the opportunity to increase performance
      if (ignoreDebug) return;
//      if (isSpecialLoggerToUse(sender)) {
//        org.apache.log4j.Category specialLogger = org.apache.log4j.Category.getInstance(sender);
//        specialLogger.debug(object);
//      } else {
//        getInstanceLog4jLogger().debug(object);
//      }
      break;
    default:
      boolean out = forcedDebug;
      if (!out) {
        if (debug == null) return;
        Class<?> regardedClass = sender;
        while (regardedClass != Object.class) {
          // if (debug.contains(regardedClass.getName())) { // simple / not generic
          Iterator<String> iter = debug.iterator();
          while (iter.hasNext()) {
            String debugItem = iter.next();
            if (regardedClass.getName().startsWith(debugItem)) {
              out = true;
              break;
            }
          }
          regardedClass = regardedClass.getSuperclass();
        }
      }
      if (out) {
        String message = object.toString();
        if (sender != null) message += " (Debug from " + sender.getName() + " at " + getCurrTime() + ")";
        output(message);
      }
      break;
    }
  }
  
  private String getCurrTime() {
    return (new Date(System.currentTimeMillis())).toString();
  }

  private boolean isSpecialLoggerToUse(Class<?> sender) {
    return sender != null && !sender.getName().equals(instanceLoggerName);
  }
  
//  private org.apache.log4j.Category getInstanceLog4jLogger() {
//    if (instanceLog4jLogger == null) {
//      instanceLog4jLogger = org.apache.log4j.Category.getInstance(instanceLoggerName);
//    }
//    return instanceLog4jLogger;
//  }
  
  private void output(String string) {
    if (loggingFileStream != null) {
      loggingFileStream.println(string);
      // loggingFileStream.flush(); // only to get locks!
    }
    if (watcher != null) {
      watcher.inform(string);
    }
    if (additionalOutBuffer != null) {
      additionalOutBuffer.add(string);
    }
    System.out.println(string);
  }

  public void closeLoggingFile() {
    if (loggingFileStream != null) {
      if (DEBUG_OF_DEBUG) {
        info(getClass(), "Closing Logging File");
        error(getClass(),new Exception());
      }
      loggingFileStream.close();
    }
  }
  
  @Override
  protected void finalize() throws Throwable {
    closeLoggingFile();
    super.finalize();
  } 

}
