package gui;

import javax.swing.JPanel;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Dimension;

/**
 Draw a scalable Pie Chart on a panel.
 @author amit
*/


@SuppressWarnings("serial")
public class PieChartPanel extends JPanel
{
	public PieChartPanel()
	{
		setPreferredSize(new Dimension(400, 400));
	}

	public void paintComponent (Graphics page)
	{
		super.paintComponent(page);

		int width = getWidth();
		int height = getHeight();

		int midx = width/2;
		int midy = height/2;

		// set the radius to be 1/4th of the smaller of width and height.
		int radius = Math.min(width, height)/4;

		page.setColor(Color.yellow);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 0, 45);

		page.setColor(Color.red);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 45, 45);

		page.setColor(Color.black);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 90, 45);

		page.setColor(Color.blue);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 135, 45);

		page.setColor(Color.green);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 180, 45);

		page.setColor(Color.cyan);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 225, 45);

		page.setColor(Color.magenta);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 270, 45);

		page.setColor(Color.white);
		page.fillArc(midx - radius, midy - radius, 2*radius, 2*radius, 315, 45);

		page.setColor(Color.black);
		String name = "A Scalable Pie-Chart";
		int fontHeight = page.getFontMetrics().getHeight();
		int fontWidth = page.getFontMetrics().stringWidth(name);
		// center the label on the top
		page.drawString(name, (width - fontWidth)/2, fontHeight);

	}

}
