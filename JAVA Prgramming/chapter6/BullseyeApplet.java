

import javax.swing.JApplet;
import java.awt.Graphics;
import java.awt.Color;

/**
	BullseyePanel.java       Author: Lewis/Loftus
 
  	Demonstrates the use of conditionals and loops to guide drawing.
*/

@SuppressWarnings("serial")
public class BullseyeApplet extends JApplet
{
   private final int MAX_WIDTH = 300, NUM_RINGS = 5, RING_WIDTH = 25;

    /**
        Sets up the bullseye panel.
    */
    public void init ()
    {
        setBackground(Color.cyan);
        setSize(MAX_WIDTH, MAX_WIDTH);
    }

	/**
    	Paints a bullseye target.
		@param page The graphics object to draw upon
	*/
    public void paint(Graphics page)
    {
       int x = 0, y = 0, diameter = MAX_WIDTH;

       page.setColor (Color.white);


//       for (int count = 0; count < NUM_RINGS; count++)
       int count = 0;
       while (count < NUM_RINGS)
       {
          if (page.getColor() == Color.black)  // alternate colors
             page.setColor (Color.white);
          else
             page.setColor (Color.black);
    
          page.fillOval (x, y, diameter, diameter);
    
          diameter -= (2 * RING_WIDTH);
          x += RING_WIDTH;
          y += RING_WIDTH;
          count++;
       }

       // Draw the red bullseye in the center
       page.setColor (Color.red);
       page.fillOval (x, y, diameter, diameter);
    }
}
