package de.must.appletserver;

/**
 * A component which may be created in the center of an inlay / an tab.
 * @author Christoph Mueller
 */
public interface InlayCenterContent {

  /**
   * Build remote view.
   * @param out the writer which will be read by the applet
   */
  public void buildRemoteView(ToAppletWriter out);
  
}
