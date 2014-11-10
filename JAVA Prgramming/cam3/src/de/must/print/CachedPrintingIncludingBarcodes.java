package de.must.print;

import java.awt.Graphics;
import java.awt.Graphics2D;

import de.must.print.PrintablePage.PrintableBarcodeItem;
import de.must.print.PrintablePage.PrintableItem;

/**
 * Cached printing with bar codes. This class exist to prevent from linking bar code jar file
 * each simple project which prints without bar code.
 * @author Christoph Mueller
 */
public abstract class CachedPrintingIncludingBarcodes extends CachedPrinting {

  private BarcodeDrawer barcodeDrawer;
  
  @Override
  protected void printItemGraphics(Graphics graphics, PrintableItem printableItem) {
    if (printableItem instanceof PrintableBarcodeItem) {
      if (barcodeDrawer == null) barcodeDrawer = new BarcodeDrawer();
      barcodeDrawer.drawBarcode((Graphics2D)graphics, printableItem.toString(), (int)printableItem.getPositionX(), (int)printableItem.getPositionY());
    } else {
      super.printItemGraphics(graphics, printableItem);
    }

  }
  
}
