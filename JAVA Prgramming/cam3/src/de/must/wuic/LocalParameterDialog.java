/*
 * Copyright (c) 1999-2013 Christoph Mueller. All rights reserved.
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

package de.must.wuic;

import java.awt.*;
import java.sql.*;

import de.must.io.Logger;

/**
 * @author Christoph Mueller
 */
public abstract class LocalParameterDialog extends ParameterDialog {
  
  private static String errorMessage;

  public LocalParameterDialog(Frame ownerFrame) {
    super(ownerFrame);
  }

  public static synchronized boolean isConnectable(String url, String driverName, String login, String password) {
    boolean result = true;
    Connection testConnection = null;
    Statement st = null;
    try {
      Class.forName(driverName);
      DriverManager.setLoginTimeout(30);
      testConnection = DriverManager.getConnection(url,login,password);
      st = testConnection.createStatement();
      st.close();
      testConnection.close();

    }
    catch(Exception e){
      Logger.getInstance().error(LocalParameterDialog.class, e);
      errorMessage = e.getMessage();
      result = false;
    }
    finally {
      if (st != null) try { st.close(); } catch(Exception e) {}
      if (testConnection != null) try {testConnection.close(); } catch(Exception e) {}
    }
    return result;
  }

  /**
   * Return the message of the last error caused by checks via {@link #isConnectable(String, String, String, String)}.
   * @return the message of the last error caused by checks via {@link #isConnectable(String, String, String, String)}
   */
  public String getErrorMessage() {
    return errorMessage;
  }

}
