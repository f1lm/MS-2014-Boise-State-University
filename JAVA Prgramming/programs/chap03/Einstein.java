//********************************************************************
//  Einstein.java       Author: Lewis/Loftus
//
//  Demonstrates a basic drawing using Graphics methods.
//********************************************************************

import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Color;

/**
 * Demonstrates basic drawing methods from Graphics class
 * @author mvail converted applet to GUI
 */
public class Einstein extends JPanel
{
   //-----------------------------------------------------------------
   //  Draws a quotation by Albert Einstein among some shapes.
   //-----------------------------------------------------------------
   public void paintComponent (Graphics page)
   {
      page.drawRect (50, 50, 40, 40);    // square
      page.drawRect (60, 80, 225, 30);   // rectangle
      page.drawOval (75, 65, 20, 20);    // circle
      page.drawLine (35, 60, 100, 120);  // line

      page.drawString ("Out of clutter, find simplicity.", 110, 70);
      page.drawString ("-- Albert Einstein", 130, 100);
   }

   /**
    * sets up a JFrame and the Einstein panel
    * @param args unused
    */
   public static void main(String[] args) {
      JFrame frame = new JFrame("Einstein");
      frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      frame.getContentPane().add(new Einstein());
      frame.pack();
      frame.setVisible(true);
   }

   /**
    * Constructor (panel initialization)
    */
   public Einstein() {
      this.setBackground(Color.white);
      this.setPreferredSize(new Dimension(350,175));
   }
}
