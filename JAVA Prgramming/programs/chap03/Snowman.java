//********************************************************************
//  Snowman.java       Author: Lewis/Loftus
//
//  Demonstrates basic drawing methods and the use of color.
//********************************************************************

import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.*;

/**
 * Draws a snowman
 * @author Lewis/Loftus, converted to GUI by mvail
 */
public class Snowman extends JPanel
{

   	/**
   	 * @param page object on which drawing takes place
   	 */
   	public void paintComponent (Graphics page)
	{
      	final int MID = 150;
      	final int TOP = 50;
      	
      	page.setColor(Color.CYAN);
      	page.fillRect(0, 0, getWidth(), getHeight());
      	
      	Color myColor = new Color(127, 0, 64);

//      	page.setColor (Color.blue);
    	page.setColor (myColor);
      	page.fillRect (0, 175, 300, 50);  // ground

      	page.setColor (Color.yellow);
      	page.fillOval (260, -40, 80, 80);  // sun
      	//page.fillOval (-40, -40, 80, 80);  // sun

      	page.setColor (Color.white);
      	page.fillOval (MID-20, TOP, 40, 40);      // head
      	page.fillOval (MID-35, TOP+35, 70, 50);   // upper torso
      	page.fillOval (MID-50, TOP+80, 100, 60);  // lower torso

      	page.setColor (Color.black);
      	page.fillOval (MID-10, TOP+10, 5, 5);   // left eye
      	page.fillOval (MID+5, TOP+10, 5, 5);    // right eye

      	page.drawArc (MID-10, TOP+20, 20, 10, 10, 160);   // frown
      	//page.drawArc (MID-10, TOP+20, 20, 10, 190, 160);   // smile

      	page.drawLine (MID-25, TOP+60, MID-50, TOP+40);  // left arm
      	page.drawLine (MID+25, TOP+60, MID+55, TOP+60);  // right arm

      	page.drawLine (MID-20, TOP+5, MID+20, TOP+5);  // brim of hat
      	page.fillRect (MID-15, TOP-20, 30, 25);        // top of hat
   	}
   	
	/**
	 * Starting point for Snowman application.
	 * @param args unused
	 */
	public static void main (String[] args)
	{
		JFrame frame = new JFrame ("Snowman");
		frame.setDefaultCloseOperation (JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().add(new Snowman());
		frame.pack();
		frame.setVisible(true);
	}
	
	/**
	 * Constructor (panel initialization)
	 */
	public Snowman()
	{
		setBackground(Color.cyan);
		setPreferredSize(new Dimension(300, 200));
	}

}
