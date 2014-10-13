package gui;


import javax.swing.JPanel;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.util.Random;

/**
 * Demonstrates the use of conditionals and loops to guide drawing.
 * @author Lewis/Loftus/amit
 */
@SuppressWarnings("serial")
public class BoxesPanel extends JPanel
{
	private final int NUM_BOXES = 50, THICKNESS = 5, MAX_SIDE = 50;
	private final int MAX_X = 350, MAX_Y = 250;
	private Random generator;

	/**
	 * Sets up the drawing panel.
	 */
	public BoxesPanel()
	{
		generator = new Random();

		setBackground(Color.black);
		setPreferredSize(new Dimension(400, 300));
	}

	/* (non-Javadoc)
	 * @see javax.swing.JComponent#paintComponent(java.awt.Graphics)
	 */
	public void paintComponent(Graphics page)
	{
		super.paintComponent(page);
		// Paints boxes of random width and height in a random location.
		// Narrow or short boxes are highlighted with a fill color.

		int x, y, width, height;

		for (int count = 0; count < NUM_BOXES; count++) {
			x = generator.nextInt(MAX_X) + 1;
			y = generator.nextInt(MAX_Y) + 1;

			width = generator.nextInt(MAX_SIDE) + 1;
			height = generator.nextInt(MAX_SIDE) + 1;

			if (width <= THICKNESS) // check for narrow box
			{
				page.setColor(Color.yellow);
				page.fillRect(x, y, width, height);
			} else if (height <= THICKNESS) // check for short box
			{
				page.setColor(Color.green);
				page.fillRect(x, y, width, height);
			} else {
				page.setColor(Color.white);
				page.drawRect(x, y, width, height);
			}
		}
	}
}
