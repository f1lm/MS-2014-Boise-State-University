package de.must.applet;

import java.util.Vector;

import javax.swing.JLabel;

import de.must.util.KeyValuePairAlpha;

public class RemTextPresenter extends JLabel implements RemoteGUIComponent {

  private String id;
  
  public RemTextPresenter(String id, String value) {
    this.id = id;
    setValue(value);
  }

  @Override
  public String getId() {
    return id;
  }
 
  @Override
  public void setEditable(boolean value) {
    // not needed here
  }

  @Override
  public void setValue(String value) {
    setText(value);
  }
  
  @Override
  public void extendParams(Vector<KeyValuePairAlpha> params) {
    // not needed here
  }

  @Override
  public boolean isModified() {
    return false;
  }

  @Override
  public void selectAll() {
    // not needed here
  }

}
