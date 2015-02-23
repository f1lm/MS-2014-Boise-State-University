package de.must.applet;

import java.awt.BorderLayout;
import java.awt.event.ActionListener;
import java.awt.event.WindowListener;

import javax.swing.JPanel;

import de.must.wuic.MustButton;
import de.must.wuic.MustStatusLabel;

public abstract class RemOptionDialog extends BasicAppletDialog implements ActionListener, WindowListener {

  protected JPanel panelButtons = new JPanel();
  protected JPanel panelBottom = new JPanel();
  protected MustButton buttonOk;
  protected MustButton buttonCancel;
  protected MustStatusLabel statusLabel;
  
  public RemOptionDialog() {
    buttonOk = new MustButton(getTranslation("TEXT_OK_BUTTON"), Constants.ACTION_OK, this);
    buttonOk.setPreferredWidth(70);
    panelButtons.add(buttonOk);
    buttonCancel = new MustButton(getTranslation("TEXT_CANCEL_BUTTON"), Constants.ACTION_CANCEL, this);    
    panelButtons.add(buttonCancel);
    panelBottom.setLayout(new BorderLayout());
    panelBottom.add(panelButtons, BorderLayout.CENTER);
    statusLabel = new MustStatusLabel();
    panelBottom.add(statusLabel, java.awt.BorderLayout.SOUTH);
    AppletGlobal.getInstance().getApplet().getRootPane().setDefaultButton(buttonOk);
  }
  
}
