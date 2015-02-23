package gui;


import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;

import javax.swing.JPanel;

/**
 * Demonstrates the use of conditionals and loops to guide drawing.
 * @author Lewis/Loftus/amit
 *
 */
@SuppressWarnings("serial")
public class BullseyePanel extends JPanel
{
	private final int NUM_RINGS = 12, RING_WIDTH = 25;
	private final int MAX_WIDTH = (NUM_RINGS + 1) * (RING_WIDTH  * 2);
	
	/**
	 * Sets up the bullseye panel.
	 */
	public BullseyePanel()
	{
		setBackground(Color.cyan);
		setPreferredSize(new Dimension(MAX_WIDTH, MAX_WIDTH));
	}

	/* (non-Javadoc)
	 * @see javax.swing.JComponent#paintComponent(java.awt.Graphics)
	 */
	public void paintComponent(Graphics page)
	{
		super.paintComponent(page);

		int x = 0, y = 0, diameter = MAX_WIDTH;

		page.setColor(Color.white);

		for (int count = 0; count < NUM_RINGS; count++) {
			if (page.getColor() == Color.black) // alternate colors
				page.setColor(Color.white);
			else
				page.setColor(Color.black);

			page.fillOval(x, y, diameter, diameter);

			diameter -= (2 * RING_WIDTH);
			x += RING_WIDTH;
			y += RING_WIDTH;
		}

		// Draw the red bullseye in the center
		page.setColor(Color.red);
		page.fillOval(x, y, diameter, diameter);
	}
}
