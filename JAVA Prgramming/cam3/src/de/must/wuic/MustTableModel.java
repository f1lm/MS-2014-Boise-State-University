/*
 * Copyright (c) 2007-2011 Christoph Mueller. All rights reserved.
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

import javax.swing.table.*;

import de.must.util.Miscellaneous;

/**
 *
 * @author Christoph Mueller
 */
public class MustTableModel extends DefaultTableModel {
  
  private static synchronized String[] getEffectiveColumnNames(String[] columnNames) {
    String[] result = new String[columnNames.length];
    for (int i = 0; i < result.length; i++) {
      result[i] = Miscellaneous.getReplacement(columnNames[i]);
    }
    return result;
  }

  private static synchronized Object[] getEffectiveColumnObjects(Object[] columnObjects) {
    Object[] result = new String[columnObjects.length];
    for (int i = 0; i < result.length; i++) {
      if (columnObjects[i] instanceof String) {
        result[i] = Miscellaneous.getReplacement((String)columnObjects[i]);
      } else {
        result[i] = columnObjects[i];
      }
    }
    return result;
  }
  
  private Class<?>[] columnClasses;

  public MustTableModel(String[] columnNames) {
    super(getEffectiveColumnNames(columnNames), 0);
    columnClasses = new Class<?>[columnNames.length]; 
  }

  public MustTableModel(Object[][] data, Object[] columnNames) {
    super(data, getEffectiveColumnObjects(columnNames));
    columnClasses = new Class<?>[columnNames.length]; 
  }
  
  @Override
  public Class<?> getColumnClass(int columnIndex) {
    if (columnClasses[columnIndex] != null) {
      // Logger.getInstance().debug(getClass(), "column class info from buffer");
      return columnClasses[columnIndex];
    }
    for (int i = 0; i < getRowCount(); i++) {
      Object value = getValueAt(i, columnIndex);
      if (value != null) {
        // Logger.getInstance().debug(getClass(), "column class info from value");
        columnClasses[columnIndex] = value.getClass(); 
        return value.getClass();
      }
    }
    return super.getColumnClass(columnIndex); // no value, no class known
  }

}
