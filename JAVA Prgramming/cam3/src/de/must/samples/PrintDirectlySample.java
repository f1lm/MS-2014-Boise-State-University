/*
 * Written 2005 by Christoph Mueller. Public Domain Sample Code.
 */
package de.must.samples;

import java.awt.Font;
import java.awt.print.PrinterJob;

import de.must.print.ProportionalListReportDirectly;
import de.must.wuic.PreviewFrame;

/**
 * Print sample.
 * @author Christoph Mueller
 */
public class PrintDirectlySample extends ProportionalListReportDirectly {
  
  private String header = "Sample: Easy Printing with Java Printable";
  
  private String[] continuousText = new String[] {
      "This is a way of printing by a view lines of code as done in de.must.samples.PrintDirectlySample. Word wrap of continuous text is supported as well as table printing.",
      "The paradigm of this sample is - back to the roots: Don't call me, I'll call you. This means e.g., I read some database tables, compute some stuff and put it out in the sequence as I am used to. The result is buffered, at the moment in Vectors. After that the result is provided in a sequence, the renderer (printer) wants to retrieve it (e.g. page 1, page 2, again page 1).",
      "",
      "Source may be downloaded from www.must.de/Jacompe.htm",
  };
  
  private int[] columnProportion1 = new int[] {6, 2, 3, 4};

  private String[] tableHeader1 = new String[] 
      {"Name", "Age", "Sex", "Drink"}
  ;

  private String[][] table1 = new String[][] {
      new String[] {"John", "57", "male", "beer"},
      new String[] {"Elisabeth truncated, you will see it is cutted", "5", "male", "milk"},
      new String[] {"Karin", "13", "female", "lemonade or any other sweet stuff"},
  };

  public static void main(String[] args) {
    PrintDirectlySample sample = new PrintDirectlySample();
    if (true) sample.preview();
//    else sample.print();
  }
  
  public PrintDirectlySample() {
  }
  
  @Override
  public String getPrinterJobName() {
    return "Camelon OSP Print Sample";
  }

  public void print() {
    PrinterJob printerJob = PrinterJob.getPrinterJob();
    // first do your settings
//    if (false) {
//      if (!printerJob.printDialog()) return;
//    }
    setPrinterJob(printerJob);
    start(); // now we can do the rest as batch
  }

  public void preview() {
    PreviewFrame previewFrame = new PreviewFrame(this);
    setPreviewer(previewFrame);
    previewFrame.setVisible(true);
  }

  /* (non-Javadoc)
   * @see de.must.print.ProportionalListReportDirectly#fillList()
   */
  protected void fillList() {
    setFont(new Font(getDefaultFont().getFamily(), Font.BOLD, getDefaultFont().getSize() + 2));
    add(header);
    resetFont(); 
    addEmptyLine();
    for (int i = 0; i < continuousText.length; i++) {
      add(continuousText[i]);
    }
    addEmptyLine();
    setDefaultProportion(columnProportion1);
    addTableHeader(tableHeader1);
    for (int i = 0; i < table1.length; i++) {
      add(table1[i]);
    }
    addEmptyLine();
    for (int i = 1; i <= 50; i++) {
      add("This is generated line # " + i);
    }
  }
  
}
