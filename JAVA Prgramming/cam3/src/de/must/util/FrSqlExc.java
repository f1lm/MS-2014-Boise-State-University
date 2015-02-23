/*
 * Copyright (c) 1999-2009 Christoph Mueller. All rights reserved.
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

package de.must.util;

import de.must.wuic.*;
import java.awt.*;
import java.awt.event.*;
import java.sql.*;

/**
 * @author Christoph Mueller
 */
public class FrSqlExc extends PropertyAdministration {

  private Connection dbConn;
  private AttributeList attributeListTop = new AttributeList();
  private MustTextField tfStatement = new MustTextField(200);

  public FrSqlExc(Connection thisDbConn) {
    super(null);
    this.dbConn = thisDbConn;
    this.setTitle("Freie SQL-Ausführung");
    this.getContentPane().add(attributeListTop, BorderLayout.CENTER);
    attributeListTop.append("Statement", tfStatement);

    buttonCancel.setText("Schließen");
    buttonCancel.setPreferredWidth(90);
    tfStatement.requestFocus();
    this.setVisible(true);
    creationEnding();
  }
  public void actionPerformed(ActionEvent e) {
    String actCommand = e.getActionCommand();
    setMessageToKeep("");
    if (actCommand.equals("BtnOk")) {
      executeStatement(tfStatement.getText());
    } else if (actCommand.equals("BtnCancel")) {
      setVisible(false);
      dispose();
    }
  }

  public void executeStatement(String statement) {
    try {
      Statement st = dbConn.createStatement();
      st.executeUpdate(statement);
    }
    catch (SQLException e) {
      setMessageToKeep("Syntaxfehler");
      de.must.io.Logger.getInstance().info(getClass(), statement);
      de.must.io.Logger.getInstance().info(getClass(), e);
    }
  }

  @Override
  public boolean isClosingAllowed(int closeConfirmId) {
    return true;
  }

}

