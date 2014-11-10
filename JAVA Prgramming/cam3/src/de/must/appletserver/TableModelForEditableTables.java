package de.must.appletserver;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Iterator;

import de.must.applet.Constants;
import de.must.io.Logger;
import de.must.middle.ApplConstStd;

public class TableModelForEditableTables extends IdentifierTableModel {

  public static final String getParamKey(int row, int col) {
    return "Cell" + Constants.ELEMENT_DELIMITER + row + Constants.ELEMENT_DELIMITER + col;
  }
  
  private DateFormat dateFormat = new SimpleDateFormat(ApplConstStd.CAMELEON_TIMESTAMP_FORMAT);

  public TableModelForEditableTables(String[] columnNames) {
    super(columnNames);
  }

  public void fetchValuesFromRequest(GeneralizedRequest request) {
    int i = -1;
    Iterator<Object[]> iterator = getData().iterator();
    while (iterator.hasNext()) {
      i++;
      Object[] rowObjects = iterator.next();
      for (int j = 0; j < rowObjects.length; j++) {
        String fetchedValue = (String)request.getParameter(getParamKey(i, j));
        if (fetchedValue != null) {
          if (Constants.NULL_VALUE.equals(fetchedValue)) {
            setValueAt(null, i, j);
          } else {
            Object oriValue = getValueAt(i, j);
            if (oriValue != null && java.util.Date.class.equals(oriValue.getClass()) || java.sql.Date.class.equals(oriValue.getClass())) {
              try {
                java.util.Date date = ((java.util.Date)dateFormat.parseObject(fetchedValue));
                java.sql.Date sqlDate = new java.sql.Date(date.getTime());
                setValueAt(sqlDate, i, j);
              } catch (ParseException e) {
                Logger.getInstance().error(getClass(), e);
              }
            } else if (oriValue != null && Timestamp.class.equals(oriValue.getClass())) {
              try {
                java.util.Date date = ((java.util.Date)dateFormat.parseObject(fetchedValue));
                Timestamp timestamp = new Timestamp(date.getTime());
                setValueAt(timestamp, i, j);
              } catch (ParseException e) {
                Logger.getInstance().error(getClass(), e);
              }
            } else if (oriValue != null && Boolean.class.equals(oriValue.getClass())) {
              setValueAt(new Boolean(ApplConstStd.TRUE_STRING.equals(fetchedValue)), i, j);
            } else {
              setValueAt(fetchedValue, i, j);
            }
          }
        }
      }
    }
  }
  
}
