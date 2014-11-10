package de.must.appletserver;

import de.must.applet.Constants;

public abstract class IndependentJob implements Runnable, RemotableControler {
  
  public static final int STATE_VIRGIN = 0;
  public static final int STATE_STARTED = 1;
  public static final int STATE_CANCELED = 2;
  public static final int STATE_ENDED = 3;
  
  protected int state = STATE_VIRGIN;

  @Override
  public void buildRemoteView(ToAppletWriter out) {
    switch (state) {
    case STATE_VIRGIN:
      buildUserInterface(out);
      state = STATE_STARTED;
      break;
    case STATE_STARTED:
      updateProcessInfo(out);
      break;
    default:
      break;
    }
  }
  
  protected abstract void buildUserInterface(ToAppletWriter out);
  protected abstract void updateProcessInfo(ToAppletWriter out);
  
  protected void closeRemoteControler(ToAppletWriter out) {
    
  }

  @Override
  public void setToolTipText(String toolTipText) {
    // not needed here
  }

  @Override
  public void fetchValuesFromRequest(GeneralizedRequest request) {
    if (Constants.ACTION_CANCEL.equals(request.getParameter(Constants.ACTION))) {
      state = STATE_CANCELED;
    }
  }

  protected boolean isToRun() {
    return state != STATE_CANCELED;
  }
  
  @Override
  public void destroy() {
  }

}
