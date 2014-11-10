package de.must.io;

/**
 * Let reports name their output file name themselves but
 * let the caller define in which folder output should be written.
 * @author Christoph Mueller
 */
public interface FileDetermination {

  public String getFileName() ;
  
  public void setOutputFolder(String folder);
  
}
