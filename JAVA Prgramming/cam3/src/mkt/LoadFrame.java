//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

import de.must.wuic.*;
import javax.swing.*;
import java.awt.*;

/**
 * @author Christoph Mueller
 */
public class LoadFrame extends JFrame {
  private FlowLayout flowLayout1 = new FlowLayout();
  private JLabel infoLabel = new JLabel();

  public LoadFrame() {
    flowLayout1.setAlignment(FlowLayout.LEFT);
    getContentPane().setLayout(flowLayout1);
    getContentPane().add(infoLabel);
    setLocation(AwtConst.getSreeenWidth() / 2 - 300, AwtConst.getSreeenHeight() / 2 + 150);
    setUndecorated(true);
    infoLabel.setText(" ");
    pack();
    setSize(new Dimension(600, getSize().height));
    setVisible(true);
    setResizable(false);
  }

  public void setStatusText(String statusText) {
    infoLabel.setText(statusText);
  }

}

