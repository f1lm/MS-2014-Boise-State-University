/*
 * Copyright (c) 2007-2012 Christoph Mueller. All rights reserved.
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

import java.awt.Component;
import java.util.Date;
import java.sql.Timestamp;

import javax.swing.JTable;
import javax.swing.table.DefaultTableCellRenderer;

import de.must.io.Logger;
import de.must.util.DateString;

public class DefaultDateCellRenderer extends DefaultTableCellRenderer{
  
  public static final int FORMAT_SHORT = 0;
  public static final int FORMAT_LONG = 1;
  
  private boolean acceptOtherObjects = false;
  private int format = FORMAT_SHORT; 

  public DefaultDateCellRenderer() {
  }

  public DefaultDateCellRenderer(int format) {
    this.format = format;
  }

  public DefaultDateCellRenderer(boolean acceptOtherObjects) {
    this.acceptOtherObjects = acceptOtherObjects;
  }

  public DefaultDateCellRenderer(int format, boolean acceptOtherObjects) {
    this.format = format;
    this.acceptOtherObjects = acceptOtherObjects;
  }

  public Component getTableCellRendererComponent(JTable table, Object value, boolean isSelected, boolean hasFocus, int row, int column) {
    DefaultDateCellRenderer renderer = (DefaultDateCellRenderer)super.getTableCellRendererComponent(table, value, isSelected, hasFocus, row, column);
    if (value instanceof Timestamp) {
      Timestamp rTimeStamp = (Timestamp)value;
      DateString temp = new DateString(rTimeStamp);
      switch (format) {
      case FORMAT_LONG:
        renderer.setText(temp.getEditableDateString());
        break;
      default:
        renderer.setText(temp.getEditableDateStringShort());
        break;
      }
    } else {
      try {
        Date rDate = (Date)value;
        DateString temp = new DateString(rDate);
        switch (format) {
        case FORMAT_LONG:
          renderer.setText(temp.getEditableDateString());
          break;
        default:
          renderer.setText(temp.getEditableDateStringShort());
          break;
        }
      } catch (ClassCastException e) {
        if (!acceptOtherObjects) {
          renderer.setText(value.toString());
          Logger.getInstance().info(getClass(), "Value of column " + column + " = '" + value + "'");
          Logger.getInstance().error(getClass(), e);
        }
      }
    }
    return renderer;
  }
  
}
