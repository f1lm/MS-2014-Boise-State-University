/*
 * Copyright (c) 2004 Christoph Mueller. All rights reserved.
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

import de.must.dataobj.DataObject;
import de.must.middle.GlobalStd;
import de.must.util.DateString;
import de.must.util.MustDate;

/**
 * Database connected date field with data distributed in multiple columns
 * @author Christoph Mueller
 */
public class SegmentedDataDateField extends DataDateField {

  private String columnNameForCentury;
  private String columnNameForYear;
  private String columnNameForMonth;
  private String columnNameForDay;

  /**
    * Constructs a new database connected date field.
    * @param dataObject the data object to assign to
    * @param columnName the name of the column the text field is to assign to
    */
	private SegmentedDataDateField(DataObject dataObject, String columnName) {
		super(dataObject, columnName);
	}

  /**
    * Constructs a new database connected date field.
    * @param columnNameForCentury the name of the column for century storing
    * @param columnNameForYear the name of the column for year storing
    * @param columnNameForMonth the name of the column for month storing
    * @param columnNameForDay the name of the column for day storing
    */
  public SegmentedDataDateField(DataObject dataObject, String columnNameForCentury, String columnNameForYear, String columnNameForMonth, String columnNameForDay) {
    super(dataObject, null);
    this.columnNameForCentury = columnNameForCentury;
    this.columnNameForYear = columnNameForYear;
    this.columnNameForMonth = columnNameForMonth;
    this.columnNameForDay = columnNameForDay;
  }

	/* (non-Javadoc)
	 * @see de.must.wuic.DataComponent#loadValue()
	 */
	public void loadValue() {
    int century = getAssignedDataObject().getInt(columnNameForCentury);
    int year = getAssignedDataObject().getInt(columnNameForYear);
    int month = getAssignedDataObject().getInt(columnNameForMonth);
    int day = getAssignedDataObject().getInt(columnNameForDay);
    if (century == 0 || year == 0 || month == 0 || day == 0) {
      setEditBeginValue("");
      return;
    }
    java.sql.Date loadDate = new MustDate(
      century * 100 + year,
      month,
      day
    );
    DateString dateString = new DateString(GlobalStd.locale, loadDate);
    setEditBeginValue(dateString.getEditableDateString());
	}

	/* (non-Javadoc)
	 * @see de.must.wuic.DataComponent#saveValue()
	 */
	public void saveValue() {
    String dateText = this.getText();
    if (dateText.equals("")) {
      getAssignedDataObject().setInt(columnNameForCentury, 0);
      getAssignedDataObject().setInt(columnNameForYear, 0);
      getAssignedDataObject().setInt(columnNameForMonth, 0);
      getAssignedDataObject().setInt(columnNameForDay, 0);
    } else {
      DateString dateString = new DateString(GlobalStd.locale, getText());
      getAssignedDataObject().setInt(columnNameForCentury, Integer.parseInt(dateString.getYearAsString().substring(0, 2)));
      getAssignedDataObject().setInt(columnNameForYear, Integer.parseInt(dateString.getYearAsString().substring(2, 4)));
      getAssignedDataObject().setInt(columnNameForMonth, dateString.getMonthAsInt());
      getAssignedDataObject().setInt(columnNameForDay, dateString.getDayAsInt());
    }
	}

}
