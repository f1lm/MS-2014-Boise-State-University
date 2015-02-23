/*
 * Copyright (C) 2006-2011 Christoph Mueller. All rights reserved.
 */

package mkt;

import de.must.middle.ParametersFromPropertyFilesStd;

public class ParametersFromPropertyFiles extends ParametersFromPropertyFilesStd {

  private static final String HEADER_PERS = "Marketing persönliche Einstellungen";
  private static final String HEADER_DEFAULT = "Marketing Einstellungen (Standardwerte)";
  
  public ParametersFromPropertyFiles(String defaultPropertyFileName) {
    super(defaultPropertyFileName);
  }
  
  public ParametersFromPropertyFiles(String propertyFileName, String defaultPropertyFileName) {
    super(propertyFileName, defaultPropertyFileName);
  }
  
  // -----------------------------------------------

  public void save() {
    saveProperties(HEADER_PERS, HEADER_DEFAULT);
  }

  private static final Entry FONT_SIZE = new Entry("FontSize", "Font size", 12);
  public int getFontSize() {
    return getValueAsInt(FONT_SIZE);
  }
  public void setFontSize(int value) {
    setValue(FONT_SIZE, value);
  }
  
}
