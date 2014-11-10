package de.must.applet;

import java.util.Hashtable;

import javax.swing.JPanel;

public class RemPanel extends JPanel {
  
  private String id;
  protected Hashtable<String, Identified> idComp;
  
  public RemPanel(String id, Hashtable<String, Identified> idComp) {
    this.id = id;
    this.idComp = idComp;
  }

}
