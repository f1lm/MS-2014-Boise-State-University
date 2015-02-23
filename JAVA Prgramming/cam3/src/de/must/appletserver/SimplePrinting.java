/*
 * Copyright (c) 2012 Christoph Mueller. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * THIS SOFTWARE IS PROVIDED BY CHRISTOPH MUELLER ``AS IS'' AND ANY
 * EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CHRISTOPH MUELLER OR
 * HIS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 */
package de.must.appletserver;

/**
 * Simple remote printing.
 * @author Christoph Mueller
 */
/**
 * @author Christoph Mueller
 */
public abstract class SimplePrinting extends RemotePrint {

  public static final int PRINT_DIALOG_NEVER = 0;
  public static final int PRINT_DIALOG_ONCE = 1;
  public static final int PRINT_DIALOG_EACH_GROUP = 2;
  public static final int PRINT_DIALOG_ALWAYS = 3;
  
  protected int printDialogChoice = PRINT_DIALOG_NEVER;
  protected boolean groupStart;
  protected int rightPrintEnding;
  protected int topPrintStart;
  protected int bottomPrintEnding;
  
  public SimplePrinting(SessionData sessionData) {
    super(sessionData);
  }
  
  /**
   * Sets the type of wished printer dialog.
   * @param printerDialogWished the the type of wished printer dialog
   * @see #PRINT_DIALOG_NEVER
   * @see #PRINT_DIALOG_ONCE
   * @see #PRINT_DIALOG_EACH_GROUP
   * @see #PRINT_DIALOG_ALWAYS
   */
  public void setPrinterDialog(int printerDialogWished) {
    this.printDialogChoice = printerDialogWished;
  }
  
  public void startGroup() {
    groupStart = true;
  }
  
  /**
	 * Called before printing is started - override this method to load data.
	 */
	protected void beforePrinting() {
  }
	
}
