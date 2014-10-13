
import javax.swing.JApplet;
import java.awt.Graphics;
import java.awt.Color;

/**

 Illustrates various methods for drawing geometric shapes from the Graphics class
 @author amit
*/


public class Shapes extends JApplet
{

	public void paint (Graphics page)
	{

		page.setColor(Color.blue);
		page.drawOval(10, 10, 100, 100);
		page.drawArc(50,50,200,200,315,45);
		page.drawRect(25,25,75,125);
		page.drawLine(0,0, 200, 200);
		page.drawString("The Shapes Applet", 200, 200);

		page.setColor(Color.orange);
		page.fillOval(110, 110, 50, 50);
		page.fillArc(200,200,250,250,315,45);
		page.fillRect(225,225,75,125);

	}


}
