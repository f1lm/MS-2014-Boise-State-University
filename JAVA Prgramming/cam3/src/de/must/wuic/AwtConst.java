/*
 * Copyright (c) 1999 Christoph Mueller. All rights reserved.
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

package de.must.wuic;

import java.awt.*;

/**
 * @author Christoph Mueller
 */
public class AwtConst {

  public AwtConst() {
  }

	/**
	 * @return 
	 */
  public static int getSreeenWidth() {
    Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
    // return 800;
    return screenSize.width;
  }

	/**
	 * @return 
	 */
  public static int getSreeenHeight() {
    Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
    return screenSize.height;
    // return 600;
  }

	/**
	 * @param size
	 * @return 
	 */
  public static Point getCenterLocation(Dimension size) {
    return new Point(getSreeenWidth()/2-size.width/2,getSreeenHeight()/2-size.height/2);
  }

	/**
	 * @param c
	 * @param width
	 * @param height
	 */
  public static void setSizeAndCenter(Component c, int width, int height) {
    // c.setLocation(new Point(getSreeenWidth()/2-width/2,getSreeenHeight()/2-height/2));
    c.setLocation(getSreeenWidth()/2-width/2, getSreeenHeight()/2-height/2);
    // c.setLocation(width, height);
    c.setSize(width, height);
  }

}
