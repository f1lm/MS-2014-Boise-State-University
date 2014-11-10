//elementary!

/*
 * Public Domain Sample Code 
 */
package mkt;

import de.must.wuic.*;
import java.awt.*;

/**
 * @author Christoph Mueller
 */
public final class FrInfo extends InfoDialog {

  public FrInfo(Frame OwnerFrame) {
    super(OwnerFrame);
    setTitle("Informationen über Marketing v. F.");
    if (System.getProperty("os.name").equalsIgnoreCase("Linux")) {
      this.setSize(new Dimension(440, 260));
    } else {
      this.setSize(new Dimension(400, 250));
    }
    creationEnding();
  }

  protected void drawInfo(Graphics2D g2){
    g2.setColor(Color.black);

    g2.setFont(header1Font);
    g2.drawString("Marketing v. F.", leftMargin, (yPos = 50));

    g2.setFont(header2Font);
    g2.drawString("Version " + Main.getVersion(), leftMargin, (yPos = yPos + 30));

    g2.setFont(header3Font);
    g2.drawString(ApplLicence.getLicenceDescription(), leftMargin + 160, yPos);

    g2.setFont(standardFont);
    g2.drawString("Copyright   © MÜLLER UND STEIN software 1998-2013", leftMargin, 170);
  }

  protected String getNewVersionInfoLink() {
    return "http://www.must.de/Mktakt.htm";
  }

}
