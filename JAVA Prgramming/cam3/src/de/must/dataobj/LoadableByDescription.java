package de.must.dataobj;

/**
 * DataObject which is loadable by description.
 * E.g. this may be those tables presented in DataComboBoxes.
 * @author Christoph Mueller
 */
public interface LoadableByDescription {

  /**
   * Returns the name of the description column.
   * @return the name of the description column
   */
  public String getDescriptionColumnName();
  
}
