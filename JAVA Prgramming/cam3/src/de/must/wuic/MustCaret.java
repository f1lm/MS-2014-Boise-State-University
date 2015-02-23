/*
 * Copyright (c) 2007-2010 Christoph Mueller based on sample at http://forum.java.sun.com/thread.jspa?threadID=210357&messageID=718736
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

import java.awt.Graphics;
import java.awt.Rectangle;

import javax.swing.plaf.TextUI;
import javax.swing.text.AbstractDocument;
import javax.swing.text.BadLocationException;
import javax.swing.text.DefaultCaret;
import javax.swing.text.Element;
import javax.swing.text.JTextComponent;

public class MustCaret extends DefaultCaret {

  transient private int[] flagXPoints = new int[3];
  transient private int[] flagYPoints = new int[3];
  
  public MustCaret() {
    setBlinkRate(500);
  }

  public void paint(Graphics g) {
    if(isVisible()) {
      JTextComponent component = this.getComponent();
      TextUI mapper = component.getUI();
      Rectangle r = null;
      try {
        r = mapper.modelToView(component, this.getDot());
      }
      catch(BadLocationException exc) {}
      g.drawLine(r.x, r.y, r.x, r.y + r.height - 1);
      g.drawLine(r.x+1, r.y, r.x+1, r.y + r.height - 1);
      javax.swing.text.Document doc = component.getDocument();
      if (doc instanceof AbstractDocument) {
        Element bidi = ((AbstractDocument)doc).getBidiRootElement();
        if ((bidi != null) && (bidi.getElementCount() > 1)) {
//        there are multiple directions present.
          flagXPoints[0] = r.x;
          flagYPoints[0] = r.y;
          flagXPoints[1] = r.x;
          flagYPoints[1] = r.y + 4;
          flagYPoints[2] = r.y;
          flagXPoints[2] = r.x + 5;
          g.fillPolygon(flagXPoints, flagYPoints, 3);
        }
      }
    }
  }
  
}
