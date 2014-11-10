package de.must.appletserver;

import java.awt.Color;
import java.util.Vector;

public class Renderer {

  public class Special {
    String value;
    String className;
    Color background;
    public Special(String value, String className) {
      this(value, className, null);
    }
    public Special(String value, String className, Color background) {
      this.value = value;
      this.className = className;
      this.background = background;
    }
  }
  
  int colIndex;
  public Vector<Special> specials = new Vector<Special>();
  
  public Renderer(int colIndex) {
    this.colIndex = colIndex;
  }

}
