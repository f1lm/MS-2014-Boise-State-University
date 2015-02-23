package de.must.applet;

import java.util.Vector;

import de.must.wuic.StandardDialog;

public final class RemStandardDialog extends StandardDialog implements AppletDialog {
  
  private String title;
  private Vector<String> messageLines;

  @Override
  public void perform(Action action) {
    if (Constants.SET_HEADER.equals(action.toDo)) {
      title = action.value;
    } else if (Constants.ADD_ITEM.equals(action.toDo)) {
      messageLines.add(action.value);
    } else if (Constants.SET_VISIBLE.equals(action.toDo)) {
      presentText(null, messageLines, title);
    }
  }

  @Override
  public void setVisible(boolean b) {
    // not in use here
  }

}
