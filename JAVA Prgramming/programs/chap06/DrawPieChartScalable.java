
import javax.swing.JApplet;
import java.awt.Color;
import java.awt.Graphics;


/**
 Programming Exercise 2.20
 Write an applet that draws a pie chart with eight equal slices, all colored differenty
 @author Amit Jain
*/


public class DrawPieChartScalable extends JApplet
{

	public void paint (Graphics page)
	{
		int width = getWidth();
		int height = getHeight();

		int midx = width/2;
		int midy = height/2;

		// set the radius to be 1/4th of the smaller of width and height.
		int radius = Math.min(width, height)/4;

		page.setColor(Color.blue);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 0, 45);

		page.setColor(Color.yellow);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 45, 45);

		page.setColor(Color.green);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 90, 45);

		page.setColor(Color.red);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 135, 45);

		page.setColor(Color.orange);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 180, 45);

		page.setColor(Color.lightGray);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 225, 45);

		page.setColor(Color.cyan);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 270, 45);

		page.setColor(Color.pink);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 315, 45);

		page.setColor(Color.black);
		String name = "A Scalable Pie-Chart";
		int fontHeight = page.getFontMetrics().getHeight();
		int fontWidth = page.getFontMetrics().stringWidth(name);
		// center the label on the top
		page.drawString(name, (width - fontWidth)/2, fontHeight);

	}


}
