package de.must.applet;

import java.awt.event.ActionListener;

import de.must.wuic.MustButton;

public class RemButton extends MustButton implements AppearanceModifiable {

  private String id;

  public RemButton(String label, String tooltiptext, String actionCommand, ActionListener l) {
    super(label, tooltiptext, actionCommand, l);
    id = actionCommand;
  }

  @Override
  public String getId() {
    return id;
  }

}
