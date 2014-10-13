
import javax.swing.JApplet;
import java.awt.Color;
import java.awt.Graphics;

/**

 Programming Exercise 2.20
 Write an applet that draws a pie chart with eight equal slices, all colored differently

 @author Amit Jain
*/


public class DrawPieChart extends JApplet
{

	public void paint (Graphics page)
	{

		page.setColor(Color.blue);
		page.fillArc(0,0,100,100,0,45);

		page.setColor(Color.yellow);
		page.fillArc(0,0,100,100,45,45);

		page.setColor(Color.green);
		page.fillArc(0,0,100,100,90,45);

		page.setColor(Color.red);
		page.fillArc(0,0,100,100,135,45);

		page.setColor(Color.orange);
		page.fillArc(0,0,100,100,180,45);

		page.setColor(Color.lightGray);
		page.fillArc(0,0,100,100,225,45);

		page.setColor(Color.cyan);
		page.fillArc(0,0,100,100,270,45);

		page.setColor(Color.pink);
		page.fillArc(0,0,100,100,315,45);
	}


}
