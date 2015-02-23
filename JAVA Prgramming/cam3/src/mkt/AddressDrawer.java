package mkt;

import java.awt.Font;
import java.awt.Graphics;
import java.awt.font.TextAttribute;
import java.awt.print.PageFormat;
import java.awt.print.Paper;
import java.awt.print.Printable;
import java.awt.print.PrinterJob;
import java.text.AttributedString;

import de.must.print.PageDrawer;
import de.must.print.MotivePageFormat;

public class AddressDrawer extends PageDrawer {
  
  // problems with Java 1.7: private String header = "MÜLLER UND STEIN software • Kärntner Str. 56 • 70469 Stuttgart";
  private String header = "MÜLLER UND STEIN software,  Kärntner Str. 56,  70469 Stuttgart"; // TODO parameter
  
  /**
   * Returns the page format for planning state that data may fit into form.
   * @return the page format for planning state
   */
  private static MotivePageFormat getPlanningPageFormat() {
    MotivePageFormat pageFormat = new MotivePageFormat();
    Paper paper = new Paper();
    // --------------------------------------
    // Ging schon einmal ohne Absturz für Adressetikett groß (99012)
    paper.setSize(108, 252);
    paper.setImageableArea(4, 10, 100, 225);
    pageFormat.setOrientation(PageFormat.LANDSCAPE);
    // --------------------------------------
    // Teststrecke für Adressetikett groß (99012)
    paper.setSize(103, 250);
    paper.setImageableArea(3, 5 , 97, 228);
    pageFormat.setOrientation(PageFormat.LANDSCAPE);
    // --------------------------------------
    pageFormat.setPaper(paper);
    return pageFormat;
  }
  
  public AddressDrawer() {
    setLineSpace(2);
  }

  private String[] addressLines;
  private Font headerFont;
  
  public void setData(String[] addressLines) {
    this.addressLines = addressLines;
  }

  public MotivePageFormat getPageFormat(PrinterJob printerJob) {
    return getPlanningPageFormat();
  }
  
  public int draw(Graphics graphics, int pageIndex) {
    if (pageIndex != 0) return Printable.NO_SUCH_PAGE;
    startFromBeginning();
    graphics.setFont(new Font(graphics.getFont().getFontName(), graphics.getFont().getStyle(), 10));
    if (headerFont == null) {
      originalFont = graphics.getFont();
      headerFont = new Font(graphics.getFont().getFontName(), graphics.getFont().getStyle(), 7);
    }
    AttributedString as = new AttributedString(header);
    as.addAttribute(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_ON);
    as.addAttribute(TextAttribute.FONT, headerFont);
    drawLine(graphics, as);
    for (int i = 0; i < addressLines.length; i++) {
      drawLine(graphics, addressLines[i]);
    }
    return Printable.PAGE_EXISTS;
  }

}
