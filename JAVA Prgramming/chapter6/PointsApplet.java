
import javax.swing.*;
import javax.swing.Timer;

import java.awt.*;
import java.awt.event.*;
import java.util.*;

public class PointsApplet extends JApplet
{
	private ArrayList<Point> points;
	private ArrayList<Color> colors;
	private Random rg;

	public void init()
	{
		points = new ArrayList<Point>();
		rg = new Random();

		initColors();

		setSize(new Dimension(600, 600));
		setBackground(Color.white);
		startAnimation();
	}

	// -----------------------------------------------------------------
	// Draws this panel by requesting that each circle draw itself.
	// -----------------------------------------------------------------
	public void paint(Graphics page)
	{
		Point newPoint = new Point(rg.nextInt(getWidth()),
				rg.nextInt(getHeight()));
		points.add(newPoint);

		for (Point p : points) {
			page.setColor(randomColor());
			page.fillOval(p.x, p.y, 20, 20);
		}
	}

	public Color randomColor()
	{
		return colors.get(rg.nextInt(colors.size()));
	}

	private void initColors()
	{
		// TODO Auto-generated method stub
		colors = new ArrayList<Color>();
		colors.add(new Color(200, 200, 200));
		colors.add(new Color(51, 153, 51));
		colors.add(new Color(102, 153, 51));
		colors.add(new Color(153, 153, 51));
		colors.add(new Color(153, 102, 51));
		colors.add(new Color(153, 51, 51));
		colors.add(new Color(153, 51, 102));
		colors.add(new Color(153, 51, 153));
		colors.add(new Color(102, 51, 153));
		colors.add(new Color(51, 51, 153));
		colors.add(new Color(51, 102, 153));
		colors.add(new Color(51, 153, 153));
		colors.add(new Color(51, 153, 102));
	}

	/**
	 * Create an animation thread that runs periodically
	 **/
	private void startAnimation()
	{
		ActionListener taskPerformer = new ActionListener() {
			public void actionPerformed(ActionEvent evt)
			{
				repaint();
			}
		};
		new Timer(500, taskPerformer).start();
	}

}
