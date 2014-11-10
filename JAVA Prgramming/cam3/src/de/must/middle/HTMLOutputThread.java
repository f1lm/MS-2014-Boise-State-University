package de.must.middle;

import de.must.io.HtmlFile;
import de.must.print.StandardHtnlReportSettings;

public abstract class HTMLOutputThread extends FileOutputThread implements StandardHtnlReportSettings {

  protected HtmlFile out;
  private int border = 0;
  
  protected int getBorder() {
    return border;
  }

  @Override
  public void setBorder(int border) {
    this.border = border;
  }

  protected void beginTable() {
    out.writeln("<TABLE ALIGN=BLEEDLEFT WIDTH=100% BORDER=" + getBorder() + ">");
  }
  
  protected void endTable() {
    out.writeln("</TABLE>");
  }

  protected void beginRow() {
    out.writeNonConverted("<TR VALIGN=TOP>");
  }
  
  protected void endRow() {
    out.writelnNonConverted("</TR>");
  }

  protected void outTDb(String cellValue) {
    out.write("<TD><B>"); out.writeNonConverted(cellValue); out.write("</B></TD>");
  }

  protected void outTDrb(String cellValue) {
    out.write("<TD align=right><B>"); out.writeNonConverted(cellValue); out.write("</B></TD>");
  }

  protected void outTD(int cellValue) {
    outTD(String.valueOf(cellValue));
  }

  protected void outTD(String cellValue) {
    outTD(cellValue, 0);
  }

  protected void outTD(String cellValue, int colspan) {
    String outValue = cellValue;
    if (cellValue.length() == 0 && getBorder() > 0) outValue = "&nbsp;";
    String colspanString = "";
    if (colspan > 1) colspanString = " colspan=" + colspan;
    out.write("<TD" + colspanString + ">"); out.writeNonConverted(outValue); out.write("</TD>");
  }

  protected void outTDr(int cellValue) {
    outTDr(String.valueOf(cellValue));
  }

  protected void outTDr(String cellValue) {
    String outValue = cellValue;
    if (cellValue.length() == 0 && getBorder() > 0) outValue = "&nbsp;";
    out.write("<TD align=right>"); out.writeNonConverted(outValue); out.write("</TD>");
  }

}
