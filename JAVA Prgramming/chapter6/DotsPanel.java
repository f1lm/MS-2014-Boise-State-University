package gui;


import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Point;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.ArrayList;
import javax.swing.JPanel;

/**
 * Represents the primary panel for the Dots program.
 * @author Lewis/Loftus/amit
 *
 */
@SuppressWarnings("serial")
public class DotsPanel extends JPanel
{
	private final int SIZE = 6; // radius of each dot

	private ArrayList<Point> pointList;

	/**
	 * Constructor: Sets up this panel to listen for mouse events.
	 */
	public DotsPanel()
	{
		pointList = new ArrayList<Point>();

		addMouseListener(new DotsListener());

		setBackground(Color.black);
		setPreferredSize(new Dimension(300, 200));
	}

	
	/* (non-Javadoc)
	 * @see javax.swing.JComponent#paintComponent(java.awt.Graphics)
	 */
	public void paintComponent(Graphics page)
	{
		super.paintComponent(page);
		// Draws all of the dots stored in the list.
		page.setColor(Color.green);

		for (Point spot : pointList)
			page.fillOval(spot.x - SIZE, spot.y - SIZE, SIZE * 2, SIZE * 2);

		page.drawString("Count: " + pointList.size(), 5, 15);
	}


	/**
	 * Represents the listener for mouse events.
	 *
	 */
	private class DotsListener implements MouseListener
	{
		/* (non-Javadoc)
		 * @see java.awt.event.MouseListener#mousePressed(java.awt.event.MouseEvent)
		 */
		public void mousePressed(MouseEvent event)
		{
			// Adds the current point to the list of points and redraws
			// the panel whenever the mouse button is pressed.
			pointList.add(event.getPoint());
			repaint();
		}

		// --------------------------------------------------------------
		// Provide empty definitions for unused event methods.
		// --------------------------------------------------------------
		public void mouseClicked(MouseEvent event)	{	}

		public void mouseReleased(MouseEvent event)	{	}

		public void mouseEntered(MouseEvent event)	{	}

		public void mouseExited(MouseEvent event)	{	}
	}
}
