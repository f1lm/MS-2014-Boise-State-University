

import javax.swing.JApplet;
import java.awt.Graphics;
import java.awt.Color;
import java.util.Random;

/**
	BoxesApplet.java       Author: Lewis/Loftus/amit
  
	Demonstrates the use of conditionals and loops to guide drawing.
*/

@SuppressWarnings("serial")
public class BoxesApplet extends JApplet
{
   	private final int NUM_BOXES = 50, THICKNESS = 5, MAX_SIDE = 50;
   	private int max_x = 350, max_y = 250;
   	private Random generator;

	public void init() {
 		setBackground (Color.black);
	}


	/**
   		Paints boxes of random width and height in a random location.
   		Narrow or short boxes are highlighted with a fill color.
		@param page The Graphics object to draw upon.
	*/
   	public void paint(Graphics page)
   	{
   	   setBackground (Color.black);
   	   generator = new Random();

	   max_x = getWidth() - THICKNESS;
	   max_y = getHeight() - THICKNESS;
	
   	   int x, y, width, height;
	
   	   for (int count = 0; count < NUM_BOXES; count++)
   	   {
   	      x = generator.nextInt(max_x) + 1;
   	      y = generator.nextInt(max_y) + 1;
	
   	      width = generator.nextInt(MAX_SIDE) + 1;
   	      height = generator.nextInt(MAX_SIDE) + 1;
	
   	      if (width <= THICKNESS)  // check for narrow box
   	      {
   	         page.setColor (Color.yellow);
   	         page.fillRect (x, y, width, height);
   	      }
   	      else
   	         if (height <= THICKNESS)  // check for short box
   	         {
   	            page.setColor (Color.green);
   	            page.fillRect (x, y, width, height);
   	         }
   	         else
   	         {
   	            page.setColor (Color.white);
   	            page.drawRect (x, y, width, height);
   	         }
   	   }
   	}
}
